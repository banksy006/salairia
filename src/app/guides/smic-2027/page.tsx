import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import NewsletterForm from "@/components/NewsletterForm";
import SondageProfil from "@/components/SondageProfil";
import { IconBadge, CalendarIcon, CalculatorIcon, PercentIcon, InfoIcon, BarChartIcon, TargetIcon, ScaleIcon, CompassIcon, AlertTriangleIcon, ReceiptIcon } from "@/components/icons";
import { SMIC_DEC_2026, smicJanvier2026, smicEnVigueur, smicDecembre2026, gainSmicDecembre } from "@/lib/smic-annonce";

// Tous les montants « au 1er décembre » viennent de src/lib/smic-annonce.ts :
// taux horaire en vigueur × 1,016, puis notre simulateur brut/net. Ils restent
// des estimations tant que le décret n'est pas publié.
const avant = smicEnVigueur;
const apres = smicDecembre2026;
const gain = gainSmicDecembre;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const PCT1 = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const HAUSSE = PCT1(SMIC_DEC_2026.HAUSSE * 100);

// Apprenti de 18 à 20 ans en première année : 43 % du SMIC (grille légale,
// détaillée dans le guide salaire-apprenti-2027).
const PCT_APPRENTI = 0.43;

const meta: GuideMeta = {
  slug: "smic-2027",
  titre: `SMIC 2027 : +${HAUSSE} % dès le 1er décembre 2026`,
  sousTitre: `Environ ${EUR.format(apres.net)} nets par mois, ${EUR2.format(apres.horaire)} bruts de l'heure : la hausse annoncée le 9 novembre, en chiffres`,
  chapo: `La revalorisation attendue pour le 1er janvier 2027 arrive un mois plus tôt. Le ministre du Travail a annoncé le 9 novembre 2026 une hausse du SMIC de ${HAUSSE} % au 1er décembre 2026. Le salaire minimum passerait de ${EUR2.format(avant.mensuel)} à environ ${EUR2.format(apres.mensuel)} bruts par mois, soit près de ${EUR.format(apres.net)} nets : le SMIC franchit pour la première fois les 1 500 € nets. Le décret n'est pas encore paru au Journal officiel : les montants ci-dessous sont calculés à partir du taux annoncé, et cette page sera corrigée au centime près le jour de sa publication.`,
  filAriane: "SMIC 2027",
  datePublished: "2026-08-23",
  dateModified: "2026-11-11",
  tocItems: [
    { id: "montants", label: "Les nouveaux montants" },
    { id: "officiel", label: "Ce qui est officiel" },
    { id: "janvier", label: "Et au 1er janvier 2027 ?" },
    { id: "paie", label: "Sur votre fiche de paie" },
    { id: "annee", label: "Trois hausses en 2026" },
    { id: "formule", label: "La formule légale" },
    { id: "effets", label: "Ce que la hausse déclenche" },
  ],
  faq: [
    {
      q: "Quel est le montant du SMIC au 1er décembre 2026 ?",
      r: `Le gouvernement a annoncé le 9 novembre 2026 une hausse de ${HAUSSE} % au 1er décembre. Appliquée au taux en vigueur (${EUR2.format(avant.horaire)} de l'heure), elle donne ${EUR2.format(apres.horaire)} bruts de l'heure, soit ${EUR2.format(apres.mensuel)} bruts par mois pour 35 heures et environ ${EUR.format(apres.net)} nets avant impôt d'après notre simulateur. Ces montants sont calculés : le taux horaire officiel sera celui du décret, pas encore publié au Journal officiel le 11 novembre 2026.`,
    },
    {
      q: "Quel sera le SMIC au 1er janvier 2027 ?",
      r: `Sauf décision contraire, le même qu'au 1er décembre 2026 : le gouvernement présente cette hausse comme l'anticipation de la revalorisation annuelle du 1er janvier. Le Code du travail continue toutefois d'imposer un minimum légal à cette date (inflation des ménages modestes et moitié du gain de pouvoir d'achat du salaire ouvrier). Si ce calcul donnait plus que le niveau atteint en décembre, un complément serait dû en janvier. Le rapport du groupe d'experts, attendu fin novembre, donnera le chiffre.`,
    },
    {
      q: "Combien gagne-t-on en plus avec la hausse du SMIC de décembre 2026 ?",
      r: `Pour un temps plein de 35 heures : environ ${EUR2.format(gain.brutMensuel)} bruts de plus par mois, soit près de ${EUR.format(gain.netMensuel)} nets, ou ${EUR.format(gain.netAnnuel)} nets sur douze mois. En 2026, un seul mois est concerné : décembre. À temps partiel, le gain est proportionnel aux heures travaillées, à raison de ${EUR2.format(gain.horaire)} bruts de plus par heure.`,
    },
    {
      q: "Quand la hausse apparaîtra-t-elle sur ma fiche de paie ?",
      r: "Sur le bulletin de décembre 2026, versé selon les entreprises entre la fin décembre et les premiers jours de janvier. Le nouveau taux s'applique aux heures travaillées à compter du 1er décembre : le salaire de novembre, lui, reste calculé sur l'ancien taux, même s'il est payé début décembre.",
    },
    {
      q: "Mon salaire est juste au-dessus du SMIC : vais-je être augmenté ?",
      r: `Pas automatiquement. Seuls les salaires qui passeraient sous le nouveau minimum sont relevés : si vous gagnez moins de ${EUR2.format(apres.mensuel)} bruts pour 35 heures, votre employeur doit vous aligner au 1er décembre. Au-dessus, rien n'est dû par décret. C'est la négociation, dans l'entreprise ou dans la branche, qui répercute la hausse sur le reste de la grille.`,
    },
    {
      q: "S'agit-il d'un coup de pouce du gouvernement ?",
      r: `En partie, d'après la presse : la hausse de ${HAUSSE} % regrouperait la revalorisation automatique attendue en janvier et un complément décidé par le gouvernement. La répartition exacte n'a pas été publiée et ne sera connue qu'avec le décret et le rapport du groupe d'experts sur le SMIC. Si un complément est confirmé, ce serait le premier coup de pouce depuis juillet 2012.`,
    },
  ],
  sources: [
    { label: "franceinfo — SMIC : une hausse à 1 502 euros net dès le 1er décembre (9 novembre 2026)", href: "https://www.franceinfo.fr/economie/pouvoir-achat/smic-une-hausse-a-1-502-euros-net-des-le-1er-decembre-les-syndicats-reclament-davantage_8274533.html" },
    { label: "Business France — Revalorisation du Smic au 1er décembre 2026", href: "https://welcome.businessfrance.fr/actualites/19339/" },
    { label: "Service-Public.fr — SMIC : montants en vigueur (vérifié le 1er juin 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300" },
    { label: "Arrêté du 22 mai 2026 portant relèvement du SMIC (Légifrance)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054126589" },
    { label: "Code du travail, art. L3231-4 à L3231-12 — modalités de fixation du SMIC (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006177908/" },
    { label: "Journal officiel — pour vérifier la parution du décret", href: "https://www.journal-officiel.gouv.fr/pages/accueil/" },
  ],
};

export const metadata: Metadata = {
  title: `SMIC 2027 : +${HAUSSE} % dès le 1er décembre 2026, environ ${EUR.format(apres.net)} nets`,
  description: `Hausse du SMIC annoncée le 9 novembre 2026 : +${HAUSSE} % au 1er décembre, soit ${EUR2.format(apres.horaire)} de l'heure, ${EUR2.format(apres.mensuel)} bruts et environ ${EUR.format(apres.net)} nets par mois. Ce qui est officiel, ce qui attend le décret, et ce qui se passe au 1er janvier 2027.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: `SMIC : +${HAUSSE} % au 1er décembre 2026, environ ${EUR.format(apres.net)} nets`,
    description: "Les nouveaux montants calculés, la paie de décembre, et ce qui reste à confirmer par décret.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Et dans ta situation ?"
        intro="Le SMIC est un plancher. Trois outils pour passer du chiffre annoncé à ta fiche de paie."
        liens={[
          { href: "/simulateurs/salaire-brut-net", label: "Ton brut en net", desc: "Cotisations détaillées, cadre ou non-cadre", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/simulateurs/ou-se-situe-mon-salaire", label: "Où se situe ton salaire ?", desc: "Ton percentile parmi les salariés français", icon: <BarChartIcon className="h-4 w-4" /> },
          { href: "/simulateurs/net-apres-impot", label: "Ton net après impôt", desc: "Avec le prélèvement à la source", icon: <PercentIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="montants" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Les nouveaux montants au 1er décembre 2026
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: EUR2.format(apres.horaire), l: "bruts de l'heure", d: `+ ${EUR2.format(gain.horaire)}` },
            { v: EUR2.format(apres.mensuel), l: "bruts par mois (35 h)", d: `+ ${EUR2.format(gain.brutMensuel)}` },
            { v: `≈ ${EUR.format(apres.net)}`, l: "nets par mois avant impôt", d: `+ ${EUR.format(gain.netMensuel)} environ` },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-3xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.l}</p>
              <p className="mt-2 text-sm font-semibold tabular-nums text-accent">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">SMIC, temps plein</th>
                <th className="px-5 py-4 text-right">Jusqu&apos;au 30 novembre</th>
                <th className="px-5 py-4 text-right">Au 1er décembre 2026*</th>
                <th className="px-5 py-4 text-right">Écart</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Horaire brut", EUR2.format(avant.horaire), EUR2.format(apres.horaire), `+ ${EUR2.format(gain.horaire)}`],
                ["Mensuel brut (35 h)", EUR2.format(avant.mensuel), EUR2.format(apres.mensuel), `+ ${EUR2.format(gain.brutMensuel)}`],
                ["Annuel brut", EUR2.format(avant.annuel), EUR2.format(apres.annuel), `+ ${EUR2.format(apres.annuel - avant.annuel)}`],
                ["Mensuel net avant impôt", EUR2.format(avant.net), `≈ ${EUR.format(apres.net)}`, `+ ${EUR.format(gain.netMensuel)} environ`],
              ].map(([l, a, b, e]) => (
                <tr key={l} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{l}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{a}</td>
                  <td className="px-5 py-3 text-right text-base font-bold tabular-nums text-foreground">{b}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-accent whitespace-nowrap">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          * Montants calculés par Salairia : taux horaire en vigueur
          ({EUR2.format(avant.horaire)}) majoré de {HAUSSE} % et arrondi au
          centime, mensualisé sur 35 heures ; net obtenu avec notre simulateur
          brut/net, pour un salarié non cadre. Le taux horaire officiel sera
          celui du décret.
        </p>
      </section>

      <SondageProfil page="/guides/smic-2027" question="Tu consultes le SMIC en tant que…" />

      <section id="officiel" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce qui est officiel, ce qui ne l&apos;est pas encore
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;annonce a été faite le <strong>lundi 9 novembre 2026</strong>{" "}
            par le ministre du Travail, Jean-Pierre Farandou, à l&apos;issue de
            la conférence sociale réunie à Matignon sur les salaires et le
            pouvoir d&apos;achat. Selon le ministre, le SMIC aura ainsi
            progressé de 5,3 % sur l&apos;ensemble de l&apos;année 2026, soit
            75 € nets de plus : un chiffre qui inclut la revalorisation du 1er
            janvier 2026, en plus de celles de juin et de décembre.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Annoncé par le gouvernement</strong> : le taux de {HAUSSE} % et la date d&apos;effet, le 1er décembre 2026.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Calculé, pas encore officiel</strong> : le taux horaire de {EUR2.format(apres.horaire)}, le mensuel de {EUR2.format(apres.mensuel)}{" "}et le net d&apos;environ {EUR.format(apres.net)}. Les médias donnent entre 1 501 et 1 502 € nets selon leur méthode d&apos;arrondi.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Pas encore connu</strong> : la part de revalorisation automatique et la part de coup de pouce dans ces {HAUSSE} %, le montant applicable à Mayotte et le nouveau minimum garanti.</span>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            <strong>Le décret n&apos;est pas paru.</strong>{" "}Au 11 novembre 2026,
            aucun texte n&apos;a été publié au Journal officiel et la fiche
            SMIC de Service-Public.fr affiche toujours{" "}
            {EUR2.format(avant.horaire)}{" "}de l&apos;heure. Une annonce ne modifie
            pas le droit : c&apos;est le décret qui fixera le taux horaire au
            centime. Calculs indicatifs, à ne pas utiliser pour établir un
            bulletin de paie avant sa publication.
          </p>
        </div>
        <div className="mt-6">
          <NewsletterForm
            categorie="smic"
            titre="Reçois le montant officiel le jour du décret"
            texte="Le taux horaire publié au Journal officiel, le net calculé par notre simulateur et le lien vers le texte, dans ta boîte mail le jour même."
            page="/guides/smic-2027"
          />
        </div>
      </section>

      <section id="janvier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Et au 1er janvier 2027 ?
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La hausse de décembre est présentée comme{" "}
            <strong>l&apos;anticipation de la revalorisation annuelle</strong>{" "}
            qui serait intervenue le 1er janvier 2027. En clair : il ne faut
            pas s&apos;attendre à une seconde hausse de {HAUSSE} % un mois plus
            tard. Le SMIC du 1er janvier 2027 devrait être celui du 1er
            décembre 2026.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Une réserve, tout de même. Le Code du travail fixe un minimum légal
            pour la revalorisation de janvier, calculé par une formule (voir
            plus bas). Si ce calcul aboutissait à un niveau supérieur à celui
            atteint en décembre, le complément serait dû au 1er janvier. Le
            rapport du groupe d&apos;experts sur le SMIC, attendu fin novembre,
            publiera le chiffre de cette revalorisation mécanique.
          </p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["9 novembre 2026", `Annonce de la hausse de ${HAUSSE} % à l'issue de la conférence sociale.`],
                ["Novembre 2026", "Publication attendue du décret au Journal officiel : le taux horaire devient officiel. Cette page est corrigée ce jour-là."],
                ["Fin novembre 2026", "Rapport annuel du groupe d'experts sur le SMIC : chiffrage de la revalorisation mécanique du 1er janvier."],
                ["1er décembre 2026", "Entrée en vigueur du nouveau SMIC, répercussion immédiate sur la grille des apprentis."],
                ["1er janvier 2027", "Pas de nouvelle hausse attendue, sauf si le minimum légal dépasse le niveau de décembre."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-48 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="paie" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Ce que cela change sur votre fiche de paie
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Vous êtes payé au SMIC</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Votre bulletin de décembre affiche {EUR2.format(apres.horaire)}{" "}de
              l&apos;heure. À temps plein, environ {EUR.format(gain.netMensuel)}{" "}
              nets de plus, soit {EUR.format(gain.netAnnuel)}{" "}sur douze mois.
              Rien à demander : l&apos;alignement est une obligation de
              l&apos;employeur.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Vous êtes à temps partiel</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Le gain suit vos heures : {EUR2.format(gain.horaire)}{" "}bruts de
              plus par heure travaillée. Pour 24 heures par semaine, cela
              représente environ {EUR2.format(gain.horaire * 24 * 52 / 12)}{" "}
              bruts de plus par mois.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Vous êtes apprenti</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Votre rémunération est un pourcentage du SMIC : elle suit le même
              jour. À 43 % du SMIC (18 à 20 ans, première année), on passe de{" "}
              {EUR.format(avant.mensuel * PCT_APPRENTI)}{" "}à environ{" "}
              {EUR.format(apres.mensuel * PCT_APPRENTI)}{" "}bruts. La grille
              complète est dans notre{" "}
              <Link href="/guides/salaire-apprenti-2027" className="text-primary underline-offset-4 hover:underline">guide du salaire apprenti</Link>.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le nouveau taux vaut pour les heures travaillées à partir du 1er
          décembre. La paie de novembre, même versée début décembre, reste
          calculée sur {EUR2.format(avant.horaire)}. Pour vérifier un bulletin
          ou partir d&apos;un autre brut, le{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">simulateur brut/net</Link>{" "}
          détaille chaque cotisation.
        </p>
      </section>

      <section id="annee" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><BarChartIcon className="w-4 h-4" /></IconBadge>
          Trois niveaux de SMIC en 2026
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Avec la hausse de décembre, le SMIC aura connu trois niveaux dans la
          même année. Entre le 1er janvier et le 1er décembre 2026, le taux
          horaire progresse de {PCT1(gain.pctDepuisJanvier)} %.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">À compter du</th>
                <th className="px-5 py-4 text-right">Horaire brut</th>
                <th className="px-5 py-4 text-right">Mensuel brut</th>
                <th className="px-5 py-4 text-right">Net estimé</th>
                <th className="px-5 py-4">Origine</th>
              </tr>
            </thead>
            <tbody>
              {[
                { d: "1er janvier 2026", n: smicJanvier2026, o: "Revalorisation annuelle", est: false },
                { d: "1er juin 2026", n: avant, o: "Hausse automatique (inflation supérieure à 2 %)", est: false },
                { d: "1er décembre 2026", n: apres, o: `Hausse annoncée de ${HAUSSE} %, décret attendu`, est: true },
              ].map((r) => (
                <tr key={r.d} className={`border-b border-border last:border-b-0 ${r.est ? "bg-accent/5" : ""}`}>
                  <td className={`px-5 py-3 font-semibold text-foreground whitespace-nowrap ${r.est ? "border-l-4 border-accent" : ""}`}>{r.d}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{EUR2.format(r.n.horaire)}{r.est ? "*" : ""}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{EUR2.format(r.n.mensuel)}{r.est ? "*" : ""}</td>
                  <td className="px-5 py-3 text-right font-bold tabular-nums">≈ {EUR.format(r.n.net)}</td>
                  <td className="px-5 py-3 text-foreground/80">{r.o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          * Calculé à partir du taux annoncé. Nets avant impôt estimés par
          notre simulateur avec les taux de cotisations 2026, pour un salarié
          non cadre à temps plein.
        </p>
      </section>

      <section id="formule" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          La formule légale, et ce que le gouvernement y ajoute
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La revalorisation annuelle du SMIC n&apos;est pas discrétionnaire :
            le Code du travail impose un plancher, auquel le gouvernement peut
            ajouter ce qu&apos;il veut.
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>L&apos;inflation des ménages modestes</strong> : l&apos;évolution de l&apos;indice des prix à la consommation (hors tabac) des 20 % de ménages aux revenus les plus faibles, plus sensible à l&apos;alimentation et à l&apos;énergie que l&apos;indice général.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>+ la moitié du gain de pouvoir d&apos;achat du salaire ouvrier et employé</strong>, pour que le SMIC suive les progrès salariaux généraux et pas seulement les prix.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>± le « coup de pouce »</strong> : la part que le gouvernement ajoute au-delà du minimum. Aucun n&apos;avait été accordé depuis juillet 2012.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La hausse de juin 2026 avait déjà « consommé » une partie de
            l&apos;inflation de l&apos;année : la revalorisation mécanique de
            janvier 2027 se calcule depuis juin, pas depuis janvier 2026.
            C&apos;est ce qui explique que plusieurs médias situent la part
            automatique autour de 1 %, le reste des {HAUSSE} % relevant de la
            décision du gouvernement. Cette répartition reste à confirmer.
          </p>
        </div>
      </section>

      <section id="effets" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que la hausse déclenche, et ce qu&apos;elle ne déclenche pas
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Relèvement automatique</strong> des salaires inférieurs au nouveau minimum, de la <Link href="/guides/salaire-apprenti" className="text-primary underline-offset-4 hover:underline">grille des apprentis</Link> (pourcentages du SMIC) et des seuils exprimés en multiples du SMIC.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span><strong>Aucun effet automatique</strong> sur les salaires au-dessus du minimum : un salarié à 1 950 € bruts ne gagne rien de plus par décret. C&apos;est la négociation, individuelle ou de branche, qui répercute ou non.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le tassement des grilles</strong> : à chaque hausse, des minima de branche passent sous le SMIC et doivent être renégociés. Si votre salaire s&apos;est fait rattraper par le SMIC en quelques années, c&apos;est un argument objectif de négociation. Notre <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">simulateur de négociation</Link> vous aide à le chiffrer, et <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">« où se situe mon salaire »</Link> à le situer dans la distribution française.</span>
            </li>
          </ul>
        </div>
      </section>
      <GuideCta
        titre="Freelance ou indépendant ?"
        intro="Si tu factures, le SMIC ne te concerne pas directement : ce qui compte, c'est ton TJM et ton statut."
        accent
        liens={[
          { href: "/simulateurs/tjm-freelance", label: "Calculer ton TJM", desc: "Le tarif journalier pour viser un net donné", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/comparateurs/portage-salarial", label: "Comparer les sociétés de portage", desc: "Frais de gestion et net estimé, 10 sociétés", icon: <ScaleIcon className="h-4 w-4" /> },
          { href: "/simulateurs/salarie-ou-freelance", label: "Salarié ou freelance ?", desc: "Même net, deux statuts comparés", icon: <CompassIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
