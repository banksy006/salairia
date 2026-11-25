import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import { IconBadge, InfoIcon, ScaleIcon, ReceiptIcon, AlertTriangleIcon, CalculatorIcon, TargetIcon, CompassIcon, CalendarIcon, CoinIcon, FileTextIcon, UserIcon } from "@/components/icons";
import { SMIC_DEC_2026, smicDecembre2026 } from "@/lib/smic-annonce";
import { COEF_REVALO_2027, TAUX_REVALO_2027 } from "@/lib/revalorisation-2027";

// Régime général. Plafond de ressources : 2 080 fois le SMIC horaire en
// vigueur au 1er janvier, 1,6 fois ce montant pour un ménage (art. D. 353-1-1
// du Code de la sécurité sociale, cité par la circulaire Cnav 2025-33 du
// 23 décembre 2025, point 2.1). La circulaire Cnav 2026-16 du 12 juin 2026
// confirme que la hausse du SMIC en cours d'année ne modifie pas le plafond.
const HEURES_PLAFOND = 2_080;
const COEF_MENAGE = 1.6;
const centime = (x: number) => Math.round(x * 100) / 100;
const plafond = (smicHoraire: number) => {
  const seul = centime(HEURES_PLAFOND * smicHoraire);
  return { seul, menage: centime(seul * COEF_MENAGE), seulTrim: centime(seul / 4), menageTrim: centime((seul * COEF_MENAGE) / 4) };
};
const PLAFOND_2026 = plafond(SMIC_DEC_2026.HORAIRE_JANVIER_2026);
// Hypothèse 2027 : SMIC horaire du 1er décembre 2026 (annoncé, calculé dans
// smic-annonce.ts) encore en vigueur au 1er janvier 2027.
const PLAFOND_2027 = plafond(smicDecembre2026.horaire);

// Montants 2026. Sources : Service-Public, fiche F13104 (vérifiée le
// 1er janvier 2026) ; circulaires Cnav 2025-29 du 22 décembre 2025 (minimum,
// majorations) et 2026-01 du 5 janvier 2026 (maximum).
const REV_2026 = {
  TAUX: 0.54,
  AGE_MIN: 55,
  MINIMUM_AN: 4_019.13,
  MINIMUM_MOIS: 334.92,
  MAXIMUM_AN: 12_976.2,
  MAXIMUM_MOIS: 1_081.35,
  MAJ_ENFANT_MOIS: 113.59,
  MAJ_11_PLAFOND_TRIM: 3_020.07,
  MAJ_11_PLAFOND_MOIS: 1_006.69,
  AGE_MAJ_11: 67,
} as const;

// Maximum : 54 % de la moitié du plafond annuel de la Sécurité sociale
// (art. D. 353-1 CSS). PASS 2027 estimé à 48 900 € par la Commission des
// comptes de la Sécurité sociale (Revue fiduciaire, 7 octobre 2026) : c'est
// une estimation tant que l'arrêté n'est pas paru.
const PASS_2027_ESTIME = 48_900;
const maximum2027An = centime(REV_2026.TAUX * 0.5 * PASS_2027_ESTIME);
const minimum2027An = centime(REV_2026.MINIMUM_AN * COEF_REVALO_2027);

// Agirc-Arrco : valeur de service du point au 1er novembre 2026 (circulaire
// Agirc-Arrco 2026-3-DT du 21 octobre 2026).
const POINT_AGIRC = 1.4587;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const PCT = (x: number) => (x * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 });

// Exemple chiffré : hypothèses choisies pour l'illustration, montants calculés.
const EX_PENSION_DEFUNT = 1_400;
const EX_RESSOURCES = 1_700;
const exReversion = centime(EX_PENSION_DEFUNT * REV_2026.TAUX);
const exPlafondMois = centime(PLAFOND_2026.seul / 12);
const exDepassement = Math.max(0, centime(exReversion + EX_RESSOURCES - exPlafondMois));
const exVersee = centime(exReversion - exDepassement);
const hausseplafond = PLAFOND_2027.seul - PLAFOND_2026.seul;

const meta: GuideMeta = {
  slug: "pension-de-reversion-2027",
  titre: "Pension de réversion 2027 : plafond de ressources, montants et démarches",
  sousTitre: `${EUR2.format(PLAFOND_2026.seul)} de ressources par an aujourd'hui, ${EUR2.format(PLAFOND_2027.seul)} au 1er janvier 2027 si la hausse du SMIC annoncée est confirmée`,
  chapo: `La pension de réversion du régime général représente ${PCT(REV_2026.TAUX)} % de la retraite de base du conjoint décédé, mais elle n'est versée que si vos ressources restent sous un plafond. Ce plafond vaut ${HEURES_PLAFOND.toLocaleString("fr-FR")} fois le SMIC horaire en vigueur au 1er janvier : ${EUR2.format(PLAFOND_2026.seul)} par an pour une personne seule en 2026. La hausse du SMIC du 1er juin 2026 ne l'a pas modifié, et celle annoncée pour le 1er décembre ne le modifiera pas non plus avant le 1er janvier 2027. À cette date, il passerait à ${EUR2.format(PLAFOND_2027.seul)} si le SMIC horaire est alors de ${EUR2.format(smicDecembre2026.horaire)} : c'est un calcul, le décret n'étant pas paru. Ce guide détaille le plafond, les montants minimum et maximum, les règles des régimes complémentaires et de la fonction publique, et la demande.`,
  filAriane: "Pension de réversion 2027",
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  tocItems: [
    { id: "plafond", label: "Le plafond de ressources" },
    { id: "montant", label: "Montant, minimum, maximum" },
    { id: "exemple", label: "Exemple chiffré" },
    { id: "regimes", label: "Agirc-Arrco et fonction publique" },
    { id: "demande", label: "Faire la demande" },
  ],
  faq: [
    {
      q: "Quel est le plafond de ressources de la pension de réversion en 2027 ?",
      r: `Il n'est pas encore officiel. Le plafond vaut ${HEURES_PLAFOND.toLocaleString("fr-FR")} fois le SMIC horaire en vigueur au 1er janvier. Si le SMIC horaire est de ${EUR2.format(smicDecembre2026.horaire)} au 1er janvier 2027, comme le donne la hausse de 1,6 % annoncée pour le 1er décembre 2026, le plafond sera de ${EUR2.format(PLAFOND_2027.seul)} par an pour une personne seule et de ${EUR2.format(PLAFOND_2027.menage)} pour un couple. En 2026, il est de ${EUR2.format(PLAFOND_2026.seul)} et de ${EUR2.format(PLAFOND_2026.menage)}.`,
    },
    {
      q: "La hausse du SMIC au 1er décembre 2026 change-t-elle le plafond tout de suite ?",
      r: `Non. Le plafond est calculé sur le SMIC en vigueur au 1er janvier et reste fixe toute l'année. La Cnav l'a confirmé après la hausse du SMIC du 1er juin 2026 : les valeurs du plafond sont restées celles du 1er janvier. Le plafond de ${EUR2.format(PLAFOND_2026.seul)} s'applique donc jusqu'au 31 décembre 2026.`,
    },
    {
      q: "Quel est le montant de la pension de réversion ?",
      r: `Au régime général, ${PCT(REV_2026.TAUX)} % de la retraite de base que percevait ou aurait pu percevoir le conjoint décédé. En 2026, elle ne peut pas dépasser ${EUR2.format(REV_2026.MAXIMUM_MOIS)} par mois, et elle ne peut pas être inférieure à ${EUR2.format(REV_2026.MINIMUM_MOIS)} par mois si le défunt totalisait au moins 60 trimestres au régime général. Elle est réduite si, ajoutée à vos ressources, elle dépasse le plafond.`,
    },
    {
      q: "Faut-il avoir été marié pour toucher la pension de réversion ?",
      r: "Oui. Le Pacs et le concubinage n'ouvrent pas droit à la pension de réversion. Si le défunt a été marié plusieurs fois, la pension est partagée entre le conjoint survivant et les ex-conjoints divorcés, en proportion de la durée de chaque mariage.",
    },
    {
      q: "À quel âge peut-on demander la pension de réversion ?",
      r: `À partir de ${REV_2026.AGE_MIN} ans au régime général et à l'Agirc-Arrco. Dans la fonction publique d'État, aucune condition d'âge n'est exigée.`,
    },
    {
      q: "La réversion de l'Agirc-Arrco est-elle soumise à un plafond de ressources ?",
      r: "Non. La réversion complémentaire Agirc-Arrco, égale à 60 % des droits du conjoint décédé, est attribuée sans condition de ressources. Elle est en revanche définitivement supprimée en cas de remariage. Elle n'entre pas dans les ressources retenues pour la réversion du régime général.",
    },
  ],
  sources: [
    { label: "Service-Public — pension de réversion du régime général (fiche F13104, vérifiée le 1er janvier 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13104" },
    { label: "Cnav — circulaire 2025-33 du 23 décembre 2025 : plafonds de ressources au 1er janvier 2026 (PDF)", href: "https://legislation.lassuranceretraite.fr/Pdf/circulaire_cnav_2025_33_23122025.pdf" },
    { label: "Cnav — circulaire 2026-16 du 12 juin 2026 : SMIC au 1er juin 2026, valeurs inchangées (PDF)", href: "https://legislation.lassuranceretraite.fr/Pdf/circulaire_cnav_2026_16_12062026.pdf" },
    { label: "Cnav — circulaire 2025-29 du 22 décembre 2025 : minimum et majorations (PDF)", href: "https://legislation.lassuranceretraite.fr/Pdf/circulaire_cnav_2025_29_22122025.pdf" },
    { label: "Cnav — circulaire 2026-01 du 5 janvier 2026 : montant maximum de la pension de réversion (PDF)", href: "https://legislation.lassuranceretraite.fr/Pdf/circulaire_cnav_2026_01_05012026.pdf" },
    { label: "Agirc-Arrco — réversion des conjoints (fiche réglementaire)", href: "https://reglementation.agirc-arrco.fr/home/liste-fiche-reglementaires/listes-area/liste-de-fiches-reglementaires/reversion-des-conjoints.html" },
    { label: "Agirc-Arrco — valeur de service du point au 1er novembre 2026", href: "https://reglementation.agirc-arrco.fr/home/baremes/listes-area/baremes-1/valeur-de-service-du-point-agirc-arrco.html" },
    { label: "Retraites de l'État — la réversion : veuve, veuf et ex-conjoints", href: "https://retraitesdeletat.gouv.fr/deces/la-reversion-les-droits/la-veuve-le-veuf-et-les-ex-conjoints" },
    { label: "L'Assurance retraite — demander sa retraite de réversion", href: "https://www.lassuranceretraite.fr/portail-info/hors-menu/annexe/services-en-ligne/demande-retraite-reversion.html" },
    { label: "Code du travail numérique — SMIC : une augmentation au 1er décembre 2026 (17 novembre 2026)", href: "https://code.travail.gouv.fr/actualite/smic-une-augmentation-au-1er-decembre-2026-quelles-consequences-sur-les-salaires" },
  ],
};

export const metadata: Metadata = {
  title: "Pension de réversion 2027 : plafond de ressources, montants, démarches",
  description: `Plafond de ressources de la réversion : ${EUR2.format(PLAFOND_2026.seul)} par an en 2026, ${EUR2.format(PLAFOND_2027.seul)} calculés pour 2027 avec le SMIC annoncé. Taux de ${PCT(REV_2026.TAUX)} %, minimum, maximum, majorations, Agirc-Arrco, fonction publique et démarches.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Pension de réversion 2027 : plafond de ressources et montants",
    description: "Le plafond suit le SMIC du 1er janvier : ce qu'il vaut aujourd'hui et ce qu'il vaudrait en 2027.",
    url: `/guides/${meta.slug}`,
  },
};

const card = "rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8";
const para = "text-base leading-relaxed text-foreground/80";
const h2 = "flex items-center text-2xl font-bold text-foreground sm:text-3xl";

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Ta situation, chiffres en main"
        intro="La réversion s'ajoute à ta propre retraite. Trois pages pour faire le total."
        liens={[
          { href: "/guides/retraite-brut-net", label: "Ta retraite nette", desc: "CSG, CRDS, Casa : du brut au net", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/revalorisation-retraites-2027", label: "La hausse de 2027", desc: "Taux de revalorisation et pensions concernées", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/calendrier-paiement-retraite-2027", label: "Les dates de versement", desc: "Base et complémentaire, mois par mois", icon: <CalendarIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="plafond" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Le plafond de ressources : 2026 et 2027
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4 text-right">2026 (en vigueur)</th>
                <th className="px-5 py-4 text-right">2027 (calculé)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SMIC horaire au 1er janvier", EUR2.format(SMIC_DEC_2026.HORAIRE_JANVIER_2026), `${EUR2.format(smicDecembre2026.horaire)} (annoncé)`],
                ["Personne seule, par an", EUR2.format(PLAFOND_2026.seul), EUR2.format(PLAFOND_2027.seul)],
                ["Personne seule, par trimestre", EUR2.format(PLAFOND_2026.seulTrim), EUR2.format(PLAFOND_2027.seulTrim)],
                ["Couple, par an", EUR2.format(PLAFOND_2026.menage), EUR2.format(PLAFOND_2027.menage)],
                ["Couple, par trimestre", EUR2.format(PLAFOND_2026.menageTrim), EUR2.format(PLAFOND_2027.menageTrim)],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-semibold tabular-nums">{a}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums text-foreground/80">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            La colonne 2027 est un <strong>calcul Salairia</strong>, pas un
            montant officiel. Elle suppose que le SMIC horaire sera de{" "}
            {EUR2.format(smicDecembre2026.horaire)}{" "}au 1er janvier 2027,
            c&apos;est-à-dire que la hausse de 1,6 % annoncée pour le
            1er décembre 2026 sera confirmée par décret et qu&apos;aucune
            autre revalorisation n&apos;interviendra au 1er janvier. Le
            décret n&apos;était pas publié le 25 novembre 2026. Les montants
            officiels figureront dans la circulaire de la Cnav, habituellement
            publiée fin décembre.
          </p>
        </div>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            La règle tient en une ligne : le plafond annuel d&apos;une
            personne seule est égal à{" "}
            <strong>{HEURES_PLAFOND.toLocaleString("fr-FR")} fois le SMIC
            horaire en vigueur au 1er janvier</strong>, et celui d&apos;un
            couple à 1,6 fois ce montant. Le plafond « couple »
            s&apos;applique si vous vivez de nouveau en couple, que ce soit
            par mariage, Pacs ou concubinage : les ressources du ménage sont
            alors prises en compte.
          </p>
          <p className={`mt-4 ${para}`}>
            Le point souvent mal compris est la date. Le
            plafond est fixé une fois pour l&apos;année, sur le SMIC du
            1er janvier. Quand le SMIC est passé de{" "}
            {EUR2.format(SMIC_DEC_2026.HORAIRE_JANVIER_2026)}{" "}à{" "}
            {EUR2.format(SMIC_DEC_2026.HORAIRE_EN_VIGUEUR)}{" "}au 1er juin
            2026, la Cnav a précisé que les valeurs du plafond restaient
            inchangées. La hausse annoncée pour le 1er décembre 2026 suivra
            la même règle : elle ne relèvera le plafond qu&apos;au
            1er janvier 2027, de {EUR2.format(hausseplafond)}{" "}par an pour
            une personne seule si le calcul ci-dessus se confirme.
          </p>
          <p className={`mt-4 ${para}`}>
            Toutes vos ressources ne comptent pas. Les pensions de réversion
            des régimes complémentaires sont exclues, de même que les revenus
            d&apos;activité du défunt et les biens reçus de lui. Vos propres
            revenus d&apos;activité ne sont retenus qu&apos;à hauteur de
            70 % à partir de 55 ans. La caisse examine les ressources des
            trois mois civils précédant la date d&apos;attribution ; si
            elles dépassent le quart du plafond annuel, elle retient celles
            des douze derniers mois.
          </p>
        </div>
      </section>

      <section id="montant" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><CoinIcon className="w-4 h-4" /></IconBadge>
          Montant, minimum et maximum
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: `${PCT(REV_2026.TAUX)} %`, t: "Taux de la réversion", d: "De la retraite de base que percevait ou aurait pu percevoir le conjoint décédé." },
            { v: EUR2.format(REV_2026.MINIMUM_MOIS), t: "Minimum mensuel 2026", d: `${EUR2.format(REV_2026.MINIMUM_AN)} par an, si le défunt totalisait au moins 60 trimestres au régime général ; réduit en proportion en dessous.` },
            { v: EUR2.format(REV_2026.MAXIMUM_MOIS), t: "Maximum mensuel 2026", d: `${EUR2.format(REV_2026.MAXIMUM_AN)} par an, soit ${PCT(REV_2026.TAUX)} % de la moitié du plafond de la Sécurité sociale.` },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            Trois majorations peuvent s&apos;ajouter. La pension est majorée
            de <strong>10 %</strong>{" "}si vous avez eu au moins trois
            enfants. Une majoration forfaitaire de{" "}
            <strong>{EUR2.format(REV_2026.MAJ_ENFANT_MOIS)}{" "}par mois</strong>{" "}est
            versée pour chaque enfant à charge. Enfin, une majoration de{" "}
            <strong>11,1 %</strong>{" "}est accordée à partir de{" "}
            {REV_2026.AGE_MAJ_11} ans si l&apos;ensemble de vos retraites et
            réversions ne dépasse pas{" "}
            {EUR2.format(REV_2026.MAJ_11_PLAFOND_TRIM)}{" "}par trimestre, soit{" "}
            {EUR2.format(REV_2026.MAJ_11_PLAFOND_MOIS)}{" "}par mois.
          </p>
          <p className={`mt-4 ${para}`}>
            Pour 2027, deux de ces montants peuvent déjà être approchés. Le
            maximum dépend du plafond de la Sécurité sociale : avec
            l&apos;estimation de {EUR.format(PASS_2027_ESTIME)}{" "}par an
            retenue par la Commission des comptes de la Sécurité sociale, il
            atteindrait {EUR2.format(maximum2027An)}{" "}par an, soit{" "}
            {EUR2.format(maximum2027An / 12)}{" "}par mois. Le minimum est
            revalorisé comme les pensions de base : si la règle légale
            s&apos;applique, soit +{PCT(TAUX_REVALO_2027)} % selon notre
            calcul sur les indices de l&apos;INSEE, il passerait à{" "}
            {EUR2.format(minimum2027An)}{" "}par an, soit{" "}
            {EUR2.format(minimum2027An / 12)}{" "}par mois. Ces deux chiffres
            sont des estimations : l&apos;arrêté fixant le plafond de la
            Sécurité sociale n&apos;est pas paru, et le budget de la
            Sécurité sociale pour 2027, qui décide de la revalorisation,
            n&apos;est pas définitivement adopté. Notre page sur la{" "}
            <Link href="/guides/revalorisation-retraites-2027" className="text-primary underline-offset-4 hover:underline">revalorisation des retraites 2027</Link>
            {" "}suit ce dossier.
          </p>
        </div>
      </section>

      <section id="exemple" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Exemple : quand la pension est réduite
        </h2>
        <div className={`mt-6 ${card}`}>
          <p className={para}>
            Dépasser le plafond ne supprime pas forcément la réversion : elle
            est réduite du montant du dépassement. Prenons une personne
            seule dont le conjoint percevait une retraite de base de{" "}
            {EUR.format(EX_PENSION_DEFUNT)}{" "}par mois, et qui dispose
            elle-même de {EUR.format(EX_RESSOURCES)}{" "}de ressources
            mensuelles retenues.
          </p>
          <ul className="mt-4 space-y-2 text-base text-foreground/80">
            <li className="flex justify-between gap-4 border-b border-border pb-2"><span>Réversion théorique ({PCT(REV_2026.TAUX)} % de {EUR.format(EX_PENSION_DEFUNT)})</span><span className="whitespace-nowrap font-semibold tabular-nums">{EUR2.format(exReversion)}</span></li>
            <li className="flex justify-between gap-4 border-b border-border pb-2"><span>Ressources personnelles retenues</span><span className="whitespace-nowrap font-semibold tabular-nums">{EUR2.format(EX_RESSOURCES)}</span></li>
            <li className="flex justify-between gap-4 border-b border-border pb-2"><span>Total</span><span className="whitespace-nowrap font-semibold tabular-nums">{EUR2.format(exReversion + EX_RESSOURCES)}</span></li>
            <li className="flex justify-between gap-4 border-b border-border pb-2"><span>Plafond 2026 ramené au mois</span><span className="whitespace-nowrap font-semibold tabular-nums">{EUR2.format(exPlafondMois)}</span></li>
            <li className="flex justify-between gap-4 border-b border-border pb-2"><span>Dépassement</span><span className="whitespace-nowrap font-semibold tabular-nums">{EUR2.format(exDepassement)}</span></li>
          </ul>
          <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
            <p className="text-xs uppercase tracking-wider">Réversion versée</p>
            <p className="mt-1 text-4xl font-bold tabular-nums">{EUR2.format(exVersee)}{" "}<span className="text-base font-normal">par mois</span></p>
          </div>
          <p className="mt-4 text-xs italic text-muted-foreground">
            Hypothèses choisies pour l&apos;illustration, montants calculés
            avec le plafond 2026 et hors majorations. Le calcul réel de la
            caisse se fait sur les ressources trimestrielles ou annuelles.
          </p>
        </div>
      </section>

      <section id="regimes" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><UserIcon className="w-4 h-4" /></IconBadge>
          Agirc-Arrco et fonction publique : d&apos;autres règles
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4">Régime général</th>
                <th className="px-5 py-4">Agirc-Arrco</th>
                <th className="px-5 py-4">Fonction publique d&apos;État</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Taux", `${PCT(REV_2026.TAUX)} %`, "60 % des droits", "50 %"],
                ["Âge minimum", `${REV_2026.AGE_MIN} ans`, "55 ans, sans condition d'âge avec deux enfants à charge ou en cas d'invalidité", "Aucun"],
                ["Condition de ressources", "Oui, plafond annuel", "Non", "Non"],
                ["Durée du mariage", "Mariage exigé", "Mariage exigé", "Quatre ans de mariage, ou un enfant issu du mariage, ou mariage deux ans avant la retraite"],
                ["Remariage", "Ressources du nouveau ménage prises en compte", "Réversion définitivement supprimée", "Droit perdu, y compris en cas de vie maritale"],
              ].map(([k, a, b, c]) => (
                <tr key={k} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{a}</td>
                  <td className="px-5 py-3 text-foreground/80">{b}</td>
                  <td className="px-5 py-3 text-foreground/80">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            Un ancien salarié du privé a cotisé à deux étages : le régime
            général et la complémentaire Agirc-Arrco. Son conjoint peut donc
            toucher deux réversions, qui n&apos;obéissent pas aux mêmes
            règles. Celle de l&apos;Agirc-Arrco n&apos;est soumise à aucun
            plafond de ressources : un conjoint survivant qui dépasse le
            plafond du régime général garde entièrement la réversion
            complémentaire. Elle se calcule en points, dont la valeur est de{" "}
            {POINT_AGIRC.toLocaleString("fr-FR", { minimumFractionDigits: 4 })}{" "}€
            depuis le 1er novembre 2026, après une revalorisation de 1,4 %.
          </p>
          <p className={`mt-4 ${para}`}>
            La contrepartie est le remariage : il supprime définitivement la
            réversion Agirc-Arrco, alors qu&apos;au régime général il ne
            fait que modifier le plafond applicable. C&apos;est un point à
            vérifier avant de se remarier.
          </p>
        </div>
      </section>

      <section id="demande" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><FileTextIcon className="w-4 h-4" /></IconBadge>
          Faire la demande
        </h2>
        <div className={`mt-6 ${card}`}>
          <p className={para}>
            La pension de réversion n&apos;est jamais versée
            automatiquement : il faut la demander. Une seule demande suffit
            pour tous les régimes de base et complémentaires, depuis votre
            compte retraite sur info-retraite.fr, ou par formulaire papier
            auprès de votre caisse.
          </p>
          <p className={`mt-4 ${para}`}>
            La date de dépôt compte. Si vous faites la demande dans les douze
            mois qui suivent le décès, la pension peut démarrer au premier
            jour du mois suivant le décès. Passé ce délai, elle ne démarre
            qu&apos;au premier jour du mois suivant le dépôt de la demande :
            les mois écoulés sont perdus. Sans réponse de la caisse au bout
            de quatre mois, la demande est considérée comme refusée, et vous
            pouvez contester.
          </p>
        </div>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Vos ressources sont contrôlées à l&apos;attribution, et la
            pension peut être révisée à la hausse ou à la baisse si elles
            changent. Elle ne peut plus l&apos;être trois mois après la date
            à laquelle vous percevez toutes vos retraites personnelles, de
            base et complémentaires. D&apos;ici là, signalez
            tout changement à votre caisse pour éviter d&apos;avoir à
            rembourser un trop-perçu. Ce guide est informatif : seule votre
            caisse de retraite peut calculer vos droits.
          </p>
        </div>
      </section>

      <GuideCta
        accent
        titre="Les autres montants de 2027"
        intro="La réversion n'est pas le seul chiffre qui bouge au 1er janvier pour les retraités."
        liens={[
          { href: "/guides/aspa-2027", label: "ASPA 2027", desc: "Le minimum vieillesse : montants et plafonds", icon: <CoinIcon className="h-4 w-4" /> },
          { href: "/guides/smic-2027", label: "Le SMIC 2027", desc: "Le chiffre dont dépend le plafond de la réversion", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/mutuelle-retraite", label: "Mutuelle à la retraite", desc: "Loi Évin, C2S ou contrat individuel", icon: <CompassIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
