import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, PercentIcon, InfoIcon, ScaleIcon, CalculatorIcon } from "@/components/icons";

// Revalorisation différenciée des pensions de base pour 2027 : PLFSS 2027,
// art. 35 (Assemblée nationale n° 3211, déposé le 1er octobre 2026). Seuils
// appréciés sur le montant mensuel total, au 31 décembre 2026, de toutes les
// pensions de l'assuré (base et complémentaires). Vérifié le 8 octobre 2026.
const SEUIL_PLEIN = 1_260;
const SEUIL_LISSAGE = 1_281;
const SEUIL_HAUT = 2_034;
// Abattement de 10 % sur les pensions : plafond actuel par foyer et sous-plafond
// proposé par le PLF 2027, art. 3, dès l'imposition des revenus 2026.
const PLAFOND_ABATTEMENT_ACTUEL = 4_439;
const PLAFOND_ABATTEMENT_PLF = 3_000;

// Barème proposé par le PLF 2027 (art. 2) pour l'impôt sur les revenus 2026,
// décote « couple » comprise — utilisé pour l'exemple de l'abattement.
const BAREME_2027_PLF = [
  { jusqu: 11_844, taux: 0 },
  { jusqu: 30_200, taux: 0.11 },
  { jusqu: 86_353, taux: 0.3 },
  { jusqu: 185_737, taux: 0.41 },
  { jusqu: Infinity, taux: 0.45 },
];
const DECOTE_COUPLE_2027 = 1_513;

function impotCouple(revenuImposable: number): number {
  const parPart = revenuImposable / 2;
  let brut = 0;
  let bas = 0;
  for (const t of BAREME_2027_PLF) {
    if (parPart > bas) brut += (Math.min(parPart, t.jusqu) - bas) * t.taux;
    bas = t.jusqu;
  }
  brut *= 2;
  const net = Math.max(0, brut - Math.max(0, DECOTE_COUPLE_2027 - 0.4525 * brut));
  return net < 61 ? 0 : Math.round(net);
}

// Couple de retraités : 1 800 € de pensions imposables chacun par mois.
const PENSIONS_COUPLE = 2 * 1_800 * 12;
const abattement = (plafond: number) => Math.min(PENSIONS_COUPLE * 0.1, plafond);
const IMPOT_ACTUEL = impotCouple(PENSIONS_COUPLE - abattement(PLAFOND_ABATTEMENT_ACTUEL));
const IMPOT_PLF = impotCouple(PENSIONS_COUPLE - abattement(PLAFOND_ABATTEMENT_PLF));

// Trois profils : ce que vaut chaque point de revalorisation sur la pension de
// base, et ce que le texte en laisse par défaut.
const PROFILS = [
  { label: "Petite pension", base: 850, compl: 300 },
  { label: "Non-cadre, carrière complète", base: 1_200, compl: 600 },
  { label: "Ancien cadre", base: 1_400, compl: 1_400 },
].map((p) => {
  const total = p.base + p.compl;
  return { ...p, total, parPoint: p.base * 0.01, plein: total <= SEUIL_PLEIN };
});

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "revalorisation-retraites-2027",
  titre: "Revalorisation des retraites 2027 : qui sera augmenté, qui sera gelé",
  sousTitre: `Le budget 2027 réserve la hausse de janvier aux pensions jusqu'à ${EUR.format(SEUIL_PLEIN)} par mois et gèle par défaut les autres — l'Agirc-Arrco, elle, décide seule pour le 1er novembre`,
  chapo: `Chaque automne, la même question : de combien les retraites vont-elles augmenter ? Pour 2027, le projet de loi de financement de la Sécurité sociale, déposé le 1er octobre 2026, change la réponse selon votre niveau de pension. Les pensions de base ne suivraient l'inflation que si l'ensemble de vos retraites ne dépasse pas ${EUR.format(SEUIL_PLEIN)} par mois ; au-delà de ${EUR.format(SEUIL_LISSAGE)}, elles seraient gelées par défaut. La complémentaire Agirc-Arrco, qui n'est pas concernée, est revalorisée séparément au 1er novembre. Et côté impôt, l'abattement de 10 % des retraités serait plafonné à ${EUR.format(PLAFOND_ABATTEMENT_PLF)}. Voici le mécanisme exact, profil par profil.`,
  filAriane: "Retraites 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "deux", label: "Les deux revalorisations" },
    { id: "base", label: "La base : ce que prévoit le PLFSS" },
    { id: "complementaire", label: "L'Agirc-Arrco" },
    { id: "impot", label: "L'abattement de 10 %" },
    { id: "concret", label: "Ce que ça change, profil par profil" },
  ],
  faq: [
    {
      q: "Les retraites vont-elles augmenter en janvier 2027 ?",
      r: `Pas toutes, si le budget est voté en l'état. L'article 35 du PLFSS 2027 déroge à l'indexation automatique : les pensions de base seraient revalorisées sur l'inflation si le total mensuel de vos pensions — base et complémentaires — ne dépasse pas ${EUR.format(SEUIL_PLEIN)} au 31 décembre 2026. Entre ${EUR.format(SEUIL_PLEIN)} et ${EUR.format(SEUIL_LISSAGE)}, une hausse réduite, fixée par décret, évite un effet de seuil. Au-delà, le coefficient serait fixé à 1 — c'est-à-dire aucune hausse — tant qu'un décret n'en décide pas autrement. C'est un projet de loi : le Parlement peut le modifier, comme il l'a fait pour le budget 2026.`,
    },
    {
      q: "Comment savoir si je suis sous le seuil de 1 260 € ?",
      r: "Le texte retient le montant mensuel total, au 31 décembre 2026, de toutes les pensions de vieillesse servies par les régimes légaux ou légalement obligatoires : votre retraite de base, mais aussi l'Agirc-Arrco ou l'Ircantec, les pensions de réversion, ainsi que leurs majorations et accessoires — à l'exception de la majoration pour tierce personne. C'est donc le cumul qui compte, pas la seule pension de base. Selon l'exposé des motifs, le seuil de 1 281 € correspond au niveau de pension garanti après une carrière complète.",
    },
    {
      q: "Le gel est-il certain pour les pensions au-dessus de 1 281 € ?",
      r: `Non, à deux titres. D'abord, c'est un projet : en 2025, le budget 2026 prévoyait déjà un gel des pensions, finalement abandonné au Parlement — les pensions de base ont été revalorisées de 0,9 % au 1er janvier 2026. Ensuite, le texte permet au gouvernement de fixer par décret une hausse partielle, entre 0 et l'inflation, éventuellement dégressive jusqu'à ${EUR.format(SEUIL_HAUT)} de pension totale. Un tel décret pourrait intervenir en cours d'année et s'appliquer rétroactivement au 1er janvier 2027. Sans décret au 31 octobre 2027, le gel deviendrait définitif pour l'année.`,
    },
    {
      q: "L'Agirc-Arrco est-elle concernée par ce gel ?",
      r: "Non : l'article 35 vise les régimes de base. La complémentaire Agirc-Arrco est pilotée par les partenaires sociaux, qui fixent la valeur du point au 1er novembre dans le cadre de leur accord — l'inflation prévue, minorée le cas échéant d'un facteur de soutenabilité pouvant aller jusqu'à 0,4 point. La décision pour le 1er novembre 2026 est attendue mi-octobre, après une année 2025 sans revalorisation. En revanche, le montant de votre Agirc-Arrco compte dans le total qui détermine si votre pension de base est revalorisée.",
    },
    {
      q: "Les retraités paieront-ils plus d'impôt en 2027 ?",
      r: `Une partie d'entre eux. L'article 3 du projet de loi de finances plafonnerait à ${EUR.format(PLAFOND_ABATTEMENT_PLF)} par foyer l'abattement de 10 % sur les pensions de retraite, contre ${EUR.format(PLAFOND_ABATTEMENT_ACTUEL)} aujourd'hui, dès l'imposition des revenus 2026. La mesure est sans effet en dessous d'environ 30 000 € de pensions annuelles par foyer ; elle toucherait 4,6 millions de foyers selon l'évaluation du gouvernement. Les pensions d'invalidité et les pensions alimentaires ne sont pas concernées.`,
    },
  ],
  sources: [
    { label: "Projet de loi de financement de la Sécurité sociale pour 2027, n° 3211, art. 35 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi" },
    { label: "Projet de loi de finances pour 2027, n° 3210, art. 3 — abattement des retraités (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf" },
    { label: "Code de la sécurité sociale, art. L161-25 — revalorisation sur l'inflation (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033715437" },
    { label: "Agirc-Arrco — la valeur du point", href: "https://www.agirc-arrco.fr/ma-retraite/valeur-du-point/" },
    { label: "service-public.fr — montant et revalorisation de la retraite", href: "https://www.service-public.fr/particuliers/vosdroits/N381" },
  ],
};

export const metadata: Metadata = {
  title: "Revalorisation des retraites 2027 : hausse sous 1 260 €, gel au-delà (PLFSS)",
  description: `Le PLFSS 2027 réserve la revalorisation de janvier aux retraités dont l'ensemble des pensions ne dépasse pas ${EUR.format(SEUIL_PLEIN)} par mois, avec un gel par défaut au-delà de ${EUR.format(SEUIL_LISSAGE)}. L'Agirc-Arrco décide séparément pour le 1er novembre. Abattement de 10 % plafonné à ${EUR.format(PLAFOND_ABATTEMENT_PLF)}. Mécanisme, seuils et effet chiffré par profil.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Retraites 2027 : qui sera augmenté, qui sera gelé",
    description: "Hausse réservée aux pensions jusqu'à 1 260 €, gel par défaut au-delà : ce que prévoit le budget 2027.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="deux" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Deux revalorisations, deux logiques
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4">Pension de base (CNAV…)</th>
                <th className="px-5 py-4">Complémentaire Agirc-Arrco</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Date", "1er janvier 2027", "1er novembre 2026"],
                ["Qui décide", "La loi — mais le PLFSS 2027 déroge à l'indexation automatique pour 2027", "Le conseil d'administration paritaire du régime"],
                ["Sur quelle base", "Inflation moyenne hors tabac, novembre 2025 → octobre 2026 (chiffre connu mi-novembre)", "Inflation prévue, minorée d'un facteur de soutenabilité (jusqu'à −0,4 pt)"],
                ["Ce qui est prévu", `Hausse pleine si pensions totales ≤ ${EUR.format(SEUIL_PLEIN)}/mois ; gel par défaut au-delà de ${EUR.format(SEUIL_LISSAGE)}, sauf décret`, "Décision attendue mi-octobre 2026"],
                ["Précédents récents", "Gel proposé pour 2026 puis abandonné : +0,9 % au 1er janvier 2026", "0 % en novembre 2025"],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{a}</td>
                  <td className="px-5 py-3 text-foreground/80">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="base" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          La base : une revalorisation à trois étages
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: `≤ ${EUR.format(SEUIL_PLEIN)}`, t: "Revalorisation pleine", d: "La pension de base suit le coefficient légal : l'inflation moyenne hors tabac de novembre 2025 à octobre 2026, publiée par l'INSEE mi-novembre." },
            { v: `${EUR.format(SEUIL_PLEIN)} – ${EUR.format(SEUIL_LISSAGE)}`, t: "Hausse réduite", d: "Quatre paliers (1 265, 1 270, 1 275 et 1 281 €) avec un coefficient réduit fixé par décret, pour éviter qu'un euro de pension en plus fasse perdre toute la hausse." },
            { v: `> ${EUR.format(SEUIL_LISSAGE)}`, t: "Gel par défaut", d: `Coefficient fixé à 1, sauf décret prévoyant une hausse partielle — éventuellement dégressive jusqu'à ${EUR.format(SEUIL_HAUT)}, puis plus faible encore au-delà.` },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le seuil s&apos;apprécie sur le <strong>montant mensuel total de
            toutes vos pensions</strong> au 31 décembre 2026 — base,
            complémentaires et réversion comprises —, pas sur la seule pension
            de base. Les éventuels décrets ne peuvent qu&apos;améliorer la
            revalorisation, jamais faire baisser une pension, et peuvent
            s&apos;appliquer rétroactivement au 1er janvier 2027. Le
            gouvernement chiffre l&apos;économie à 4 milliards d&apos;euros en
            2027 si les pensions au-delà de {EUR.format(SEUIL_LISSAGE)} restent
            gelées toute l&apos;année.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La réserve habituelle s&apos;applique : ce n&apos;est qu&apos;un
            projet. Le budget 2026 prévoyait déjà un gel des pensions, abandonné
            pendant les débats ; les pensions de base avaient finalement été
            revalorisées de 0,9 % au 1er janvier 2026. Nous suivons ce dossier
            jusqu&apos;au vote dans notre{" "}
            <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
              récapitulatif du 1er janvier 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="complementaire" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          L&apos;Agirc-Arrco : un régime qui décide, pas une formule qui s&apos;applique
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La complémentaire des salariés du privé fonctionne par{" "}
            <strong>points</strong> : la pension = nombre de points × valeur
            de service du point. Chaque automne, syndicats et patronat fixent
            cette valeur pour le 1er novembre, dans le cadre de leur accord :
            référence à l&apos;inflation prévisionnelle, minorée le cas échéant
            d&apos;un <strong>facteur de soutenabilité</strong> allant
            jusqu&apos;à 0,4 point, pour préserver les réserves du régime.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La conséquence pratique : l&apos;Agirc-Arrco peut décider{" "}
            <strong>zéro</strong> — elle l&apos;a fait en novembre 2025.
            L&apos;article 35 du PLFSS ne la concerne pas : sa décision pour le
            1er novembre 2026, attendue mi-octobre, sera intégrée ici dès sa
            publication. Rappel utile : la valeur d&apos;<em>achat</em> du point
            (pour les actifs qui cotisent) évolue séparément — une hausse de la
            première n&apos;améliore pas le rendement de la seconde.
          </p>
        </div>
      </section>

      <section id="impot" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Côté impôt : l&apos;abattement de 10 % plafonné à {EUR.format(PLAFOND_ABATTEMENT_PLF)}
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les pensions de retraite bénéficient d&apos;un abattement de 10 %
            avant le calcul de l&apos;impôt, plafonné aujourd&apos;hui à{" "}
            {EUR.format(PLAFOND_ABATTEMENT_ACTUEL)} par foyer. Le projet de loi
            de finances (article 3) ajouterait un sous-plafond de{" "}
            <strong>{EUR.format(PLAFOND_ABATTEMENT_PLF)}</strong> pour les
            pensions de retraite, dès l&apos;impôt payé en 2027 sur les revenus
            2026. Sans effet en dessous d&apos;environ 30 000 € de pensions
            annuelles par foyer ; 4,6 millions de foyers concernés selon
            l&apos;évaluation préalable.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Exemple : un couple de retraités percevant chacun 1 800 € de
            pensions imposables par mois, soit {EUR.format(PENSIONS_COUPLE)} par
            an. Son abattement passerait de{" "}
            {EUR.format(abattement(PLAFOND_ABATTEMENT_ACTUEL))} à{" "}
            {EUR.format(abattement(PLAFOND_ABATTEMENT_PLF))}. Avec le barème
            proposé pour 2027, son impôt passerait de{" "}
            {EUR.format(IMPOT_ACTUEL)} à <strong>{EUR.format(IMPOT_PLF)}</strong>,
            soit {EUR.format(IMPOT_PLF - IMPOT_ACTUEL)} de plus — la décote, qui
            se réduit quand l&apos;impôt augmente, amplifie l&apos;effet à ce
            niveau de revenu.
          </p>
        </div>
      </section>

      <section id="concret" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que ça change, profil par profil
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le coefficient légal ne sera connu qu&apos;à la mi-novembre. Pour
          raisonner dès maintenant, voici ce que vaut chaque point de
          revalorisation sur la pension de base de trois profils — et ce que le
          texte leur laisse par défaut, sans décret :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Profil</th>
                <th className="px-5 py-4 text-right">Base + complémentaire</th>
                <th className="px-5 py-4 text-right">1 point d&apos;inflation vaut</th>
                <th className="px-5 py-4 text-right">En janvier 2027, par défaut</th>
              </tr>
            </thead>
            <tbody>
              {PROFILS.map((p) => (
                <tr key={p.label} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{p.label}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                    {EUR.format(p.base)} + {EUR.format(p.compl)}
                    <span className="block text-xs text-muted-foreground">total {EUR.format(p.total)}</span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">+{EUR2.format(p.parPoint)} / mois</td>
                  <td className="px-5 py-3 text-right">
                    {p.plein ? (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">hausse pleine</span>
                    ) : (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">gel sauf décret</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Lecture : pour le profil non-cadre, chaque point d&apos;inflation
            non répercuté représente {EUR2.format(PROFILS[1].parPoint)} par mois,
            soit {EUR.format(PROFILS[1].parPoint * 12)} par an — à multiplier
            par le coefficient connu mi-novembre. Le gel ne fait pas baisser la
            pension en euros, mais il la fait baisser en pouvoir d&apos;achat
            du montant de l&apos;inflation.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Deux rappels pour lire son relevé : les montants s&apos;entendent{" "}
            <strong>bruts</strong> — CSG (taux selon le revenu fiscal de
            référence), CRDS et Casa s&apos;appliquent ensuite, comme expliqué
            dans notre guide{" "}
            <Link href="/guides/retraite-brut-net" className="text-primary underline-offset-4 hover:underline">
              retraite brut et net
            </Link>{" "}
            ; et le versement de janvier de la base arrive début février
            (paiement à terme échu), là où l&apos;Agirc-Arrco paie d&apos;avance
            début novembre — toutes les dates sont dans notre{" "}
            <Link href="/guides/calendrier-paiement-retraite-2027" className="text-primary underline-offset-4 hover:underline">
              calendrier de paiement 2027
            </Link>
            . Pour les actifs qui préparent leur propre retraite, le paramètre
            qui pilote la pension par points est le{" "}
            <Link href="/guides/plafond-securite-sociale-2027" className="text-primary underline-offset-4 hover:underline">
              plafond de la Sécurité sociale
            </Link>
            .
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
