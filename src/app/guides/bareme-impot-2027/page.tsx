import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, PercentIcon, CalendarIcon, CalculatorIcon, InfoIcon, ScaleIcon } from "@/components/icons";

interface Tranche {
  jusqu: number | null;
  taux: number;
}

// Barème IR 2026 (revenus 2025), LF 2026 — seuils indexés de +0,9 %.
// Sources : loi de finances pour 2026 ; impots.gouv.fr. Vérifié le 23 août 2026.
const BAREME_2026: Tranche[] = [
  { jusqu: 11_600, taux: 0 },
  { jusqu: 29_579, taux: 11 },
  { jusqu: 84_577, taux: 30 },
  { jusqu: 181_917, taux: 41 },
  { jusqu: null, taux: 45 },
];
const DECOTE_SEUL_2026 = 897;

// Barème proposé pour 2027 (revenus 2026) : PLF 2027, art. 2, H — seuils
// relevés de 2,1 %. Décote et quotient familial : même article, H 2° et 3°.
// Source : projet de loi de finances pour 2027, Assemblée nationale n° 3210,
// déposé le 1er octobre 2026. Vérifié le 8 octobre 2026. Ce sont des montants
// PROPOSÉS : ils ne sont pas encore votés et ne sont pas utilisés par les
// simulateurs, qui appliquent le droit en vigueur.
const BAREME_2027_PLF: Tranche[] = [
  { jusqu: 11_844, taux: 0 },
  { jusqu: 30_200, taux: 11 },
  { jusqu: 86_353, taux: 30 },
  { jusqu: 185_737, taux: 41 },
  { jusqu: null, taux: 45 },
];
const INDEXATION_PLF = 0.021;
const DECOTE_SEUL_2027 = 915;
const DECOTE_COUPLE_2027 = 1_513;
const DEMI_PART_2027 = 1_845;
// Grille du taux neutre (métropole) : PLF 2027, art. 2, I — applicable aux
// revenus perçus à compter du 1er janvier 2027. Taux nul sous 1 669 € de base
// mensuelle, contre 1 635 € dans la grille en vigueur.
const SEUIL_TAUX_NEUTRE_2026 = 1_635;
const SEUIL_TAUX_NEUTRE_2027 = 1_669;
const SEUIL_RECOUVREMENT = 61;
const DECOTE_TAUX = 0.4525;

function impotBrut(revenu: number, bareme: Tranche[]): number {
  let impot = 0;
  let bas = 0;
  for (const t of bareme) {
    const haut = t.jusqu ?? Infinity;
    if (revenu > bas) impot += (Math.min(revenu, haut) - bas) * (t.taux / 100);
    bas = haut;
  }
  return impot;
}

/** Impôt d'une personne seule (1 part), décote et seuil de recouvrement compris. */
function impotDu(revenu: number, bareme: Tranche[], decote: number): number {
  const brut = impotBrut(revenu, bareme);
  const net = Math.max(0, brut - Math.max(0, decote - DECOTE_TAUX * brut));
  return net < SEUIL_RECOUVREMENT ? 0 : Math.round(net);
}

// Revenus imposables 2025 d'une personne seule ; le revenu 2026 est supposé
// progresser comme l'inflation retenue par le PLF.
const CAS = [20_000, 30_000, 45_000, 80_000].map((r) => {
  const r2026 = Math.round(r * (1 + INDEXATION_PLF));
  const avant = impotDu(r, BAREME_2026, DECOTE_SEUL_2026);
  const plf = impotDu(r2026, BAREME_2027_PLF, DECOTE_SEUL_2027);
  const gel = impotDu(r2026, BAREME_2026, DECOTE_SEUL_2026);
  return { r, r2026, avant, plf, gel };
});
const GEL_MIN = Math.min(...CAS.map((c) => c.gel - c.plf));
const GEL_MAX = Math.max(...CAS.map((c) => c.gel - c.plf));
const EX = 40_000;
const EX_2026 = impotDu(EX, BAREME_2026, DECOTE_SEUL_2026);
const EX_2027 = impotDu(EX, BAREME_2027_PLF, DECOTE_SEUL_2027);

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

function libelle(bareme: Tranche[], i: number): string {
  const t = bareme[i];
  const prev = i === 0 ? 0 : (bareme[i - 1].jusqu as number);
  if (t.jusqu === null) return `Au-delà de ${EUR.format(prev)}`;
  if (i === 0) return `Jusqu'à ${EUR.format(t.jusqu)}`;
  return `De ${EUR.format(prev + 1)} à ${EUR.format(t.jusqu)}`;
}

const meta: GuideMeta = {
  slug: "bareme-impot-2027",
  titre: "Barème de l'impôt 2027 : les tranches du projet de loi de finances",
  sousTitre: `Toutes les tranches relevées de 2,1 % : 0 % jusqu'à ${EUR.format(11_844)}, puis 11, 30, 41 et 45 % — ce que propose le PLF 2027, et ce qui peut encore bouger`,
  chapo: "Le projet de loi de finances pour 2027, déposé à l'Assemblée nationale le 1er octobre 2026, donne la première version officielle du barème qui s'appliquera à vos revenus de 2026, déclarés au printemps 2027 : toutes les tranches relevées de 2,1 %, l'inflation que le gouvernement prévoit pour 2026. La décote, le quotient familial et les grilles du prélèvement à la source suivent le mouvement. Rien n'est définitif avant le vote — mais voici le barème proposé, son effet chiffré sur votre impôt, et les autres mesures du texte qui touchent salariés et retraités.",
  filAriane: "Barème impôt 2027",
  datePublished: "2026-08-23",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "plf", label: "Le barème proposé" },
    { id: "effet", label: "L'effet sur votre impôt" },
    { id: "autres", label: "Les autres mesures du PLF" },
    { id: "mecanique", label: "Tranche marginale ≠ taux réel" },
    { id: "calendrier", label: "Le calendrier jusqu'au vote" },
  ],
  faq: [
    {
      q: "Quelles seront les tranches d'imposition en 2027 ?",
      r: "Selon l'article 2 du projet de loi de finances pour 2027, déposé le 1er octobre 2026 : 0 % jusqu'à 11 844 € de revenu imposable par part, 11 % de 11 845 à 30 200 €, 30 % de 30 201 à 86 353 €, 41 % de 86 354 à 185 737 €, et 45 % au-delà. Ce barème s'appliquera aux revenus de 2026, déclarés d'avril à juin 2027. Les taux sont inchangés depuis 2020 ; seuls les seuils bougent. Il s'agit d'un projet : le Parlement peut modifier ces montants par amendement jusqu'au vote définitif.",
    },
    {
      q: "Pourquoi une hausse de 2,1 % des tranches ?",
      r: "C'est l'indexation sur l'inflation : le texte relève les seuils du barème de la prévision d'évolution des prix à la consommation hors tabac entre 2025 et 2026, soit 2,1 %. Sans elle, un salaire simplement revalorisé du coût de la vie paierait plus d'impôt — la « progression à froid ». Selon l'exposé des motifs, cette indexation évite une hausse d'impôt de près de 4 milliards d'euros pour 20 millions de ménages et l'entrée dans l'impôt d'environ 500 000 foyers.",
    },
    {
      q: "Vais-je payer moins d'impôt en 2027 ?",
      r: `À revenu identique, oui : un célibataire à ${EUR.format(EX)} de revenu imposable paierait ${EUR.format(EX_2027)} avec le barème proposé, contre ${EUR.format(EX_2026)} avec le barème actuel. Mais si votre revenu a progressé comme l'inflation, l'indexation ne fait que maintenir votre impôt stable en pouvoir d'achat — elle ne crée pas de baisse réelle. Ce qu'elle évite, en revanche, c'est la hausse qu'aurait provoquée un gel : notre tableau la chiffre pour quatre niveaux de revenu.`,
    },
    {
      q: "La décote et le quotient familial changent-ils aussi ?",
      r: `Oui, dans le même article. La décote passerait de 897 à ${EUR.format(DECOTE_SEUL_2027)} pour une personne seule et de 1 483 à ${EUR.format(DECOTE_COUPLE_2027)} pour un couple soumis à imposition commune — des montants inscrits dans le texte, légèrement en dessous d'une hausse de 2,1 % pile. Le plafond de l'avantage procuré par chaque demi-part de quotient familial passerait de 1 807 à ${EUR.format(DEMI_PART_2027)}, et celui de la part entière du premier enfant d'un parent isolé de 4 262 à 4 352 €. Notre guide sur le seuil d'imposition recalcule le revenu maximal sans impôt avec ces paramètres.`,
    },
    {
      q: "Mon prélèvement à la source va-t-il changer en janvier 2027 ?",
      r: `Votre taux personnalisé, non : il a été recalculé en septembre 2026 sur vos revenus 2025 et reste en place jusqu'en août 2027. En revanche, le PLF remplace les grilles du taux neutre — celui appliqué quand l'employeur n'a pas reçu de taux personnalisé — pour les revenus perçus à compter du 1er janvier 2027. En métropole, le taux nul s'appliquerait jusqu'à ${EUR.format(SEUIL_TAUX_NEUTRE_2027 - 1)} de base mensuelle, contre ${EUR.format(SEUIL_TAUX_NEUTRE_2026 - 1)} aujourd'hui, et toutes les tranches de la grille sont relevées en proportion du barème.`,
    },
  ],
  sources: [
    { label: "Projet de loi de finances pour 2027, n° 3210 — texte déposé le 1er octobre 2026 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf" },
    { label: "PLF 2027 — évaluations préalables des articles (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/contenu/visualisation/1128179/file/PLF%202027%20-%20Evaluations%20pr%C3%A9alables.pdf" },
    { label: "CGI, art. 197 — barème de l'impôt (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050809514" },
    { label: "impots.gouv.fr — les tranches et taux de l'impôt sur le revenu", href: "https://www.impots.gouv.fr/particulier/questions/comment-calculer-mon-taux-dimposition-dapres-le-bareme-progressif" },
    { label: "service-public.fr — impôt sur le revenu : tranches et taux", href: "https://www.service-public.fr/particuliers/vosdroits/F1419" },
  ],
};

export const metadata: Metadata = {
  title: "Barème impôt 2027 : les nouvelles tranches du PLF (+2,1 %)",
  description: `Le projet de loi de finances 2027 relève toutes les tranches de 2,1 % : 0 % jusqu'à 11 844 €, 11 % jusqu'à 30 200 €, 30 % jusqu'à 86 353 €, 41 % jusqu'à 185 737 €, 45 % au-delà. Décote à ${EUR.format(DECOTE_SEUL_2027)}, quotient familial, taux neutre du prélèvement à la source, effet chiffré sur votre impôt et calendrier du vote.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Barème de l'impôt 2027 : les tranches du projet de loi de finances",
    description: "+2,1 % sur toutes les tranches, décote, quotient familial — et ce que ça change sur votre impôt.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="plf" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Le barème proposé pour les revenus 2026
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Taux</th>
                <th className="px-5 py-4">Barème en vigueur (revenus 2025)</th>
                <th className="px-5 py-4">Proposé par le PLF 2027 (revenus 2026)</th>
              </tr>
            </thead>
            <tbody>
              {BAREME_2027_PLF.map((t, i) => (
                <tr key={t.taux} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 text-lg font-bold tabular-nums text-primary">{t.taux} %</td>
                  <td className="px-5 py-3 tabular-nums text-foreground/70">{libelle(BAREME_2026, i)}</td>
                  <td className="px-5 py-3 font-semibold tabular-nums text-foreground">{libelle(BAREME_2027_PLF, i)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les seuils s&apos;entendent <strong>par part de quotient
          familial</strong> : le revenu imposable du foyer est divisé par le
          nombre de parts avant d&apos;être confronté au barème, puis
          l&apos;impôt par part est remultiplié, avec un plafonnement de
          l&apos;avantage par demi-part — {EUR.format(DEMI_PART_2027)} dans le
          projet. Les cinq taux sont identiques depuis 2020 : comme chaque
          année, seule la hauteur des marches change.
        </p>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Ces montants sont ceux du <strong>projet de loi</strong>, déposé
              le 1er octobre 2026. Ils peuvent être modifiés par amendement
              pendant l&apos;examen parlementaire et ne deviendront officiels
              qu&apos;à la promulgation de la loi de finances. Nos simulateurs
              continuent d&apos;appliquer le barème en vigueur jusque-là.
            </span>
          </p>
        </div>
      </section>

      <section id="effet" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Ce que l&apos;indexation change sur votre impôt
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Quatre célibataires (1 part), dont le revenu imposable progresse en
          2026 exactement comme l&apos;inflation prévue (+2,1 %). Impôt calculé
          avec la décote et le seuil de recouvrement de{" "}
          {SEUIL_RECOUVREMENT} €, arrondi à l&apos;euro :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Revenu 2025</th>
                <th className="px-5 py-4 text-right">Impôt 2026</th>
                <th className="px-5 py-4">Revenu 2026</th>
                <th className="px-5 py-4 text-right">Impôt 2027 (PLF)</th>
                <th className="px-5 py-4 text-right">Si le barème était gelé</th>
              </tr>
            </thead>
            <tbody>
              {CAS.map((c) => (
                <tr key={c.r} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold tabular-nums text-foreground">{EUR.format(c.r)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(c.avant)}</td>
                  <td className="px-5 py-3 tabular-nums text-foreground/80">{EUR.format(c.r2026)}</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{EUR.format(c.plf)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                    {EUR.format(c.gel)}
                    <span className="block text-xs text-destructive">+{EUR.format(c.gel - c.plf)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Lecture : avec le barème proposé, l&apos;impôt progresse à peu près
          comme le revenu — c&apos;est le but. La dernière colonne montre ce
          qu&apos;aurait coûté un gel du barème, scénario régulièrement évoqué
          dans les débats budgétaires : de {EUR.format(GEL_MIN)} à{" "}
          {EUR.format(GEL_MAX)} de plus par an pour une personne seule, et
          l&apos;effet est le plus fort, en proportion, pour les revenus
          modestes — {Math.round(((CAS[0].gel - CAS[0].plf) / CAS[0].plf) * 100)} %
          d&apos;impôt en plus à {EUR.format(CAS[0].r)}, contre{" "}
          {Math.round(((CAS[3].gel - CAS[3].plf) / CAS[3].plf) * 100)} % à{" "}
          {EUR.format(CAS[3].r)}. Pour un couple ou une famille, notre guide sur
          le{" "}
          <Link href="/guides/seuil-imposition-2027" className="text-primary underline-offset-4 hover:underline">
            seuil d&apos;imposition 2027
          </Link>{" "}
          recalcule le revenu maximal sans impôt par situation.
        </p>
      </section>

      <section id="autres" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les autres mesures du PLF qui touchent votre impôt
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              t: "Indemnités de rupture : exonération limitée à 1 PASS",
              d: "Licenciement, rupture conventionnelle : un plafond unique d'exonération d'impôt égal au plafond annuel de la Sécurité sociale (48 060 € en 2026) remplacerait les règles actuelles, qui vont jusqu'à 6 PASS. Selon le gouvernement, 95 % des salariés ne seraient pas concernés.",
              href: "/guides/indemnite-rupture-conventionnelle",
              lien: "Notre guide rupture conventionnelle",
            },
            {
              t: "Retraités : abattement de 10 % plafonné à 3 000 €",
              d: "Le plafond de l'abattement sur les pensions de retraite passerait de 4 439 € à 3 000 € par foyer, dès les revenus 2026 (PLF, art. 3). Sans effet sous environ 30 000 € de pensions annuelles ; 4,6 millions de foyers seraient concernés selon l'évaluation préalable.",
              href: "/guides/revalorisation-retraites-2027",
              lien: "Retraites : ce qui change en 2027",
            },
            {
              t: "Indemnités journalières : plus imposées, plus de CSG",
              d: "Les indemnités versées au titre d'une affection de longue durée deviendraient imposables à 50 % (elles sont exonérées aujourd'hui), celles d'accident du travail ou de maladie professionnelle à 100 % (50 % aujourd'hui), dès les revenus 2026. Leur CSG passerait de 6,2 % à 9,2 % au 1er janvier 2027.",
              href: "/guides/arret-maladie-salaire",
              lien: "Arrêt maladie : ce que vous touchez",
            },
            {
              t: "Prime carburant 2026 : jusqu'à 1 000 € sans impôt",
              d: "Pour 2026 seulement, la prise en charge des frais de carburant par l'employeur serait exonérée d'impôt jusqu'à 1 000 € (600 € pour les véhicules électriques, hybrides rechargeables ou à hydrogène), et ouverte à tous les salariés qui prennent leur véhicule pour aller travailler.",
              href: "/guides/bareme-kilometrique",
              lien: "Le barème kilométrique",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
              <Link href={c.href} className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
                {c.lien} →
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Côté prélèvement à la source, le texte relève aussi la grille du{" "}
          <strong>taux neutre</strong> pour les revenus perçus à partir du 1er
          janvier 2027 : en métropole, aucun prélèvement jusqu&apos;à{" "}
          {EUR.format(SEUIL_TAUX_NEUTRE_2027 - 1)} de base mensuelle, contre{" "}
          {EUR.format(SEUIL_TAUX_NEUTRE_2026 - 1)} aujourd&apos;hui. Seuls les
          salariés sans taux personnalisé transmis à l&apos;employeur sont
          concernés — nouvelle embauche, premier emploi. Le{" "}
          <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
            simulateur net après impôt
          </Link>{" "}
          basculera sur la nouvelle grille une fois la loi promulguée.
        </p>
      </section>

      <section id="mecanique" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Tranche marginale ≠ taux réel
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le barème est progressif : chaque taux ne s&apos;applique
            qu&apos;à la fraction de revenu comprise dans sa tranche. Avec le
            barème proposé, un célibataire (1 part) à {EUR.format(EX)}{" "}
            imposables paierait 0 € sur ses 11 844 premiers euros, 11 % sur
            les {EUR.format(30_200 - 11_844)} suivants et 30 % sur les{" "}
            {EUR.format(EX - 30_200)} restants — soit {EUR.format(EX_2027)},
            un taux moyen de{" "}
            {((EX_2027 / EX) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %,
            très loin des « 30 % » de sa tranche.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Les deux notions servent à des choses différentes : le{" "}
            <strong>taux moyen</strong> mesure ce que vous payez ; la{" "}
            <strong>tranche marginale</strong> pilote vos décisions — ce que
            rapporte réellement une augmentation, ce que défiscalise un
            versement PER, ce que coûte un revenu exceptionnel. Notre{" "}
            <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
              simulateur net après impôt
            </Link>{" "}
            fait la traduction en net mensuel réel.
          </p>
        </div>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier jusqu&apos;au vote
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["1er octobre 2026 ✓", "Dépôt du projet de loi de finances 2027 à l'Assemblée nationale (n° 3210) : barème relevé de 2,1 %."],
                ["Octobre – décembre", "Examen parlementaire, Assemblée puis Sénat : le barème peut évoluer au fil des amendements, rien n'est définitif."],
                ["Fin décembre 2026", "Date visée pour la promulgation et la publication au Journal officiel. Cette page sera mise à jour ce jour-là."],
                ["Avril – juin 2027", "Déclaration des revenus 2026 : première application concrète du barème voté."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-52 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La fin décembre n&apos;est pas garantie : les budgets 2025 et 2026
          n&apos;ont été promulgués qu&apos;en février, après une loi spéciale
          qui autorise à prélever l&apos;impôt en attendant. Le barème est
          alors voté plus tard, sans conséquence pour votre déclaration de
          printemps. En attendant, votre impôt courant reste piloté par votre
          taux de prélèvement à la source — recalculé au 1er septembre 2026,
          comme expliqué dans{" "}
          <Link href="/actualites/nouveau-taux-prelevement-source-septembre-2026" className="text-primary underline-offset-4 hover:underline">
            notre article dédié
          </Link>
          . Et si la déclaration 2026 vous a valu un remboursement ou un solde,
          le mécanisme est détaillé dans le guide{" "}
          <Link href="/guides/remboursement-impot" className="text-primary underline-offset-4 hover:underline">
            remboursement d&apos;impôt
          </Link>
          .
        </p>
      </section>
    </GuideShell>
  );
}
