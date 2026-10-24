import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import AllocationsFamilialesCalc from "@/components/guides/AllocationsFamilialesCalc";
import NewsletterForm from "@/components/NewsletterForm";
import {
  IconBadge,
  EuroIcon,
  CalculatorIcon,
  ScaleIcon,
  CalendarIcon,
  AlertTriangleIcon,
  InfoIcon,
  PercentIcon,
  BarChartIcon,
  UserIcon,
} from "@/components/icons";
import { AF_2026, calculerAF, montantPleinAF, plafondsAF } from "@/lib/calculators/allocations-familiales";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

// Inflation hors tabac en moyenne annuelle 2025 : +0,9 % (INSEE, Informations
// rapides n° 8 du 15 janvier 2026). C'est l'indice qui revalorise les plafonds
// au 1er janvier 2027 (article D521-3 du CSS : avant-dernière année). Projection
// arithmétique, l'arrêté de décembre 2026 fixera les montants exacts.
const INFLATION_2025 = 0.009;
const plafonds2027 = (n: number) => plafondsAF(n).map((p) => Math.round(p * (1 + INFLATION_2025))) as [number, number];

// Exemple fil rouge : deux enfants, 45 000 € de revenus 2024, aucun de 14 ans.
const EX = calculerAF(2, 45_000, 0);
const EX_TROIS = calculerAF(3, 90_000, 1);

const meta: GuideMeta = {
  slug: "allocations-familiales-2027",
  titre: "Allocations familiales 2027 : montants, plafonds de ressources et gel annoncé",
  sousTitre: `${EUR2.format(AF_2026.MONTANTS[2])} par mois pour deux enfants au taux plein, ${EUR2.format(AF_2026.MONTANTS[3])} pour trois — et un budget 2027 qui veut les figer`,
  chapo: `Les allocations familiales sont versées dès le deuxième enfant, sans condition d'activité, mais leur montant dépend des revenus du foyer depuis 2015 : taux plein, moitié ou quart selon deux plafonds. Cette page donne le barème en vigueur au 1er avril 2026, les plafonds 2026 et leur valeur probable au 1er janvier 2027, un calcul dans votre situation, et l'état exact du « gel » que le projet de budget de la Sécurité sociale pour 2027 prévoit — un projet que l'Assemblée nationale a rejeté le 23 octobre, et qui repart au Sénat.`,
  filAriane: "Allocations familiales 2027",
  datePublished: "2026-10-24",
  dateModified: "2026-10-24",
  tocItems: [
    { id: "montants", label: "Les montants 2026" },
    { id: "calcul", label: "Dans votre situation" },
    { id: "plafonds", label: "Plafonds 2026 et 2027" },
    { id: "majoration", label: "La majoration pour âge" },
    { id: "gel", label: "Le gel de 2027" },
    { id: "autres", label: "ARS, PAJE, complément familial" },
  ],
  faq: [
    {
      q: "Quel est le montant des allocations familiales pour 2 enfants en 2027 ?",
      r: `Jusqu'au 31 mars 2027, le montant est celui du barème d'avril 2026 : ${EUR2.format(AF_2026.MONTANTS[2])} par mois au taux plein, ${EUR2.format(AF_2026.MONTANTS[2] / 2)} si les revenus 2024 du foyer dépassent ${EUR.format(AF_2026.PLAFONDS[2][0])}, et ${EUR2.format(AF_2026.MONTANTS[2] / 4)} au-delà de ${EUR.format(AF_2026.PLAFONDS[2][1])}. À partir d'avril 2027, soit le montant est revalorisé de l'inflation, soit il est gelé si le Parlement adopte la mesure inscrite dans le projet de budget de la Sécurité sociale. Rien n'est voté à ce jour.`,
    },
    {
      q: "Les allocations familiales vont-elles être gelées en 2027 ?",
      r: "C'est le projet du gouvernement : l'annexe du projet de loi de financement de la Sécurité sociale pour 2027 prévoit « le maintien des prestations familiales à leur niveau de 2026 », pour 0,5 milliard d'euros d'économie, avec un retour à l'indexation normale en 2028. Mais aucun article du texte ne porte cette mesure, et l'Assemblée nationale a rejeté le projet en première lecture le 23 octobre 2026. Le texte est examiné au Sénat à partir du 9 novembre. Un gel analogue avait été écarté pour 2026 : la base de calcul avait finalement été revalorisée de 0,8 %.",
    },
    {
      q: "Quels revenus la CAF prend-elle en compte en 2027 ?",
      r: "Les revenus de l'année N−2 : en 2027, ce sont vos revenus de 2025, tels qu'ils figurent sur l'avis d'imposition reçu en 2026 (revenu net catégoriel, avant les abattements fiscaux). En 2026, la CAF regarde vos revenus de 2024. Un changement de situation récent — séparation, perte d'emploi, naissance — peut déclencher une réévaluation sans attendre.",
    },
    {
      q: "À partir de quel âge la majoration s'applique-t-elle ?",
      r: `La majoration pour âge est de ${EUR2.format(AF_2026.MAJORATION_AGE)} par mois au taux plein. Elle s'applique à 14 ans pour les enfants nés avant le 1er mars 2012, et seulement à 18 ans pour ceux nés à partir de cette date, en application du décret du 27 février 2026. Pour une famille de deux enfants, l'aîné n'y ouvre jamais droit.`,
    },
    {
      q: "Faut-il faire une demande pour toucher les allocations familiales ?",
      r: "Non si vous êtes déjà allocataire de la CAF ou de la MSA : la prestation est ouverte automatiquement à la naissance ou à l'arrivée du deuxième enfant, à condition que votre dossier soit à jour, notamment la déclaration de situation. Si vous n'avez jamais été allocataire, il faut créer votre dossier sur caf.fr. Les allocations sont versées le 5 du mois suivant, à terme échu.",
    },
  ],
  sources: [
    { label: "CAF — barème des allocations familiales au 1er avril 2026", href: "https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-allocations-familiales" },
    { label: "service-public.gouv.fr — Allocations familiales : montants et plafonds (F13213)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13213" },
    { label: "solidarites.gouv.fr — Revalorisation des prestations sociales au 1er avril 2026 (+0,8 %)", href: "https://solidarites.gouv.fr/revalorisation-annuelle-des-prestations-sociales-au-1er-avril-2026" },
    { label: "solidarites.gouv.fr — Ce qui change au 1er janvier 2026 (plafonds +1,8 %)", href: "https://solidarites.gouv.fr/ce-qui-change-au-1er-janvier-2026-dans-le-champ-des-solidarites" },
    { label: "Assemblée nationale — Projet de loi de financement de la Sécurité sociale pour 2027 (n° 3211)", href: "https://www.assemblee-nationale.fr/dyn/opendata/PRJLANR5L17B3211.pdf" },
    { label: "Assemblée nationale — Dossier législatif PLFSS 2027 (rejet du 23 octobre 2026)", href: "https://www.assemblee-nationale.fr/dyn/17/dossiers/plfss_2027" },
    { label: "INSEE — Indice des prix à la consommation, moyenne annuelle 2025", href: "https://www.insee.fr/fr/statistiques/8726461" },
    { label: "INSEE — Indice des prix à la consommation, septembre 2026", href: "https://www.insee.fr/fr/statistiques/9080209" },
    { label: "service-public.gouv.fr — Allocation de rentrée scolaire (F1878)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1878" },
    { label: "service-public.gouv.fr — Complément familial (F13214)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F13214" },
  ],
};

export const metadata: Metadata = {
  title: "Allocations familiales 2027 : montants, plafonds de ressources et gel annoncé",
  description: `Montants des allocations familiales au 1er avril 2026 (${EUR2.format(AF_2026.MONTANTS[2])} pour 2 enfants, ${EUR2.format(AF_2026.MONTANTS[3])} pour 3), plafonds de ressources 2026 et estimation 2027, majoration pour âge, calcul dans votre situation, et l'état du gel prévu par le budget 2027 après le rejet du texte à l'Assemblée.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Allocations familiales 2027 : montants, plafonds et gel annoncé",
    description: "Le barème en vigueur, les plafonds 2027, un calcul dans votre situation et l'état du gel voulu par le budget 2027.",
    url: `/guides/${meta.slug}`,
  },
};

const LIGNES = [2, 3, 4, 5].map((n) => ({
  n,
  plein: montantPleinAF(n),
  plafonds: plafondsAF(n),
  plafonds2027: plafonds2027(n),
}));

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Et dans ta situation ?"
        intro="Les allocations ne sont qu'une ligne du budget d'une famille. Trois outils pour le reste."
        liens={[
          { href: "/guides/prime-activite-2027", label: "Prime d'activité 2027", desc: "Versée par la CAF aussi, et souvent oubliée", icon: <EuroIcon className="h-4 w-4" /> },
          { href: "/simulateurs/net-apres-impot", label: "Ton net après impôt", desc: "Quotient familial et prélèvement à la source", icon: <PercentIcon className="h-4 w-4" /> },
          { href: "/simulateurs/ou-se-situe-mon-salaire", label: "Où se situe ton salaire ?", desc: "Ton percentile parmi les salariés français", icon: <BarChartIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="montants" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Les montants en vigueur depuis le 1er avril 2026
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les allocations familiales sont calculées à partir d&apos;une base
          mensuelle, la BMAF, revalorisée chaque 1er avril. Elle vaut{" "}
          <strong>{EUR2.format(AF_2026.BMAF)}</strong> depuis le 1er avril 2026,
          après une hausse de 0,8 % — l&apos;inflation hors tabac de 2025. Chaque
          prestation en est un pourcentage : 32 % pour deux enfants, 73 % pour
          trois, puis 41 points par enfant supplémentaire. Les montants
          ci-dessous sont ceux du barème de la CAF, l&apos;organisme payeur ;
          service-public.gouv.fr affiche des arrondis différents d&apos;un
          centime sur quelques cases.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Enfants à charge</th>
                <th className="px-5 py-3">Taux plein</th>
                <th className="px-5 py-3">Divisé par 2</th>
                <th className="px-5 py-3">Divisé par 4</th>
              </tr>
            </thead>
            <tbody>
              {LIGNES.map((l) => (
                <tr key={l.n} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">{l.n} enfants</td>
                  <td className="whitespace-nowrap px-5 py-3 text-lg font-bold tabular-nums text-primary">{EUR2.format(l.plein)}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground/80">{EUR2.format(l.plein / 2)}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground/80">{EUR2.format(l.plein / 4)}</td>
                </tr>
              ))}
              <tr className="hover:bg-muted/50">
                <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">Par enfant au-delà du 5e</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-primary">+{EUR2.format(AF_2026.PAR_ENFANT_SUPPLEMENTAIRE)}</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground/80">+{EUR2.format(AF_2026.PAR_ENFANT_SUPPLEMENTAIRE / 2)}</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground/80">+{EUR2.format(AF_2026.PAR_ENFANT_SUPPLEMENTAIRE / 4)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Trois règles encadrent ces montants. Il faut <strong>au moins deux
          enfants à charge</strong> de moins de 20 ans : un enfant unique
          n&apos;ouvre aucun droit en métropole. La prestation est{" "}
          <strong>versée le 5 du mois suivant</strong>, à terme échu : la
          revalorisation d&apos;avril se voit sur le virement de mai. Et depuis
          le 1er juillet 2015, le montant est <strong>modulé selon les
          ressources</strong> du foyer, par deux plafonds détaillés plus bas.
          Les montants restent les mêmes que vous soyez salarié, indépendant,
          sans activité ou retraité : contrairement à la prime d&apos;activité,
          aucune condition d&apos;emploi n&apos;est exigée.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Combien pour votre famille ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le calcul tient en trois questions : combien d&apos;enfants à charge,
          quels revenus en {AF_2026.ANNEE_REVENUS}, et combien d&apos;enfants ont
          atteint l&apos;âge de la majoration. Le calculateur applique le
          barème ci-dessus, les plafonds de ressources et le complément
          dégressif prévu quand les revenus dépassent de peu un plafond.
        </p>
        <div className="mt-6">
          <AllocationsFamilialesCalc />
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Deux exemples pour fixer les idées. Un couple avec deux enfants de 8
          et 11 ans et {EUR.format(45_000)} de revenus 2024 perçoit{" "}
          <strong>{EUR2.format(EX.total)} par mois</strong>, le taux plein,
          puisqu&apos;il reste sous le premier plafond de{" "}
          {EUR.format(AF_2026.PLAFONDS[2][0])}. Une famille de trois enfants dont
          un lycéen de 16 ans né en 2010, avec {EUR.format(90_000)} de revenus,
          dépasse le premier plafond de {EUR.format(AF_2026.PLAFONDS[3][0])} :
          elle touche le montant divisé par deux, majoration comprise, soit{" "}
          <strong>{EUR2.format(EX_TROIS.total)} par mois</strong>. Si ses revenus
          n&apos;avaient dépassé le plafond que de quelques centaines
          d&apos;euros, un complément dégressif aurait comblé l&apos;essentiel
          de la perte : la modulation est conçue pour qu&apos;un euro de revenu
          supplémentaire ne coûte jamais plus d&apos;un euro d&apos;allocation.
        </p>
      </section>

      <section id="plafonds" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les plafonds de ressources 2026, et leur valeur probable en 2027
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les plafonds sont annuels et dépendent du nombre d&apos;enfants. En
          2026, ils s&apos;appliquent aux revenus de 2024 — le revenu net
          catégoriel de l&apos;avis d&apos;imposition, avant l&apos;abattement
          de 10 % — et ont été relevés de 1,8 % au 1er janvier. Ils suivent
          l&apos;inflation de l&apos;avant-dernière année : les plafonds 2027
          devraient donc progresser de 0,9 %, l&apos;inflation moyenne de 2025
          mesurée par l&apos;INSEE. L&apos;arrêté qui les fixe paraît en
          décembre ; la colonne 2027 est une projection arithmétique, arrondie
          à l&apos;euro, que l&apos;arrêté peut décaler de quelques euros.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Enfants</th>
                <th className="px-5 py-3">Taux plein jusqu&apos;à (2026)</th>
                <th className="px-5 py-3">Moitié jusqu&apos;à (2026)</th>
                <th className="px-5 py-3">Taux plein 2027 (estim.)</th>
                <th className="px-5 py-3">Moitié 2027 (estim.)</th>
              </tr>
            </thead>
            <tbody>
              {LIGNES.map((l) => (
                <tr key={l.n} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">{l.n} enfants</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{EUR.format(l.plafonds[0])}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{EUR.format(l.plafonds[1])}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-muted-foreground">≈ {EUR.format(l.plafonds2027[0])}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-muted-foreground">≈ {EUR.format(l.plafonds2027[1])}</td>
                </tr>
              ))}
              <tr className="hover:bg-muted/50">
                <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">Par enfant supplémentaire</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">+{EUR.format(AF_2026.PLAFOND_PAR_ENFANT_SUPPLEMENTAIRE)}</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">+{EUR.format(AF_2026.PLAFOND_PAR_ENFANT_SUPPLEMENTAIRE)}</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-muted-foreground">≈ +{EUR.format(Math.round(AF_2026.PLAFOND_PAR_ENFANT_SUPPLEMENTAIRE * (1 + INFLATION_2025)))}</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-muted-foreground">≈ +{EUR.format(Math.round(AF_2026.PLAFOND_PAR_ENFANT_SUPPLEMENTAIRE * (1 + INFLATION_2025)))}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Au-dessous du premier plafond, le taux plein. Entre les deux, le
          montant est divisé par deux. Au-dessus du second, par quatre : une
          famille de deux enfants à {EUR.format(120_000)} de revenus perçoit
          encore {EUR2.format(AF_2026.MONTANTS[2] / 4)} par mois. Contrairement
          à la PAJE ou au complément familial, les allocations familiales
          n&apos;ont pas de plafond majoré pour les couples à deux revenus ni
          pour les parents isolés : la grille est la même pour tous. Un
          changement de situation en cours d&apos;année — séparation, chômage
          de plus de deux mois, départ à la retraite — permet de demander à la
          CAF de neutraliser une partie des revenus de référence.
        </p>
      </section>

      <section id="majoration" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><UserIcon className="w-4 h-4" /></IconBadge>
          La majoration pour âge : 14 ou 18 ans selon la date de naissance
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Chaque enfant qui atteint l&apos;âge de la majoration ajoute{" "}
            <strong>{EUR2.format(AF_2026.MAJORATION_AGE)}</strong> par mois au
            taux plein ({EUR2.format(AF_2026.MAJORATION_AGE / 2)} et{" "}
            {EUR2.format(AF_2026.MAJORATION_AGE / 4)} dans les tranches
            supérieures). La règle a changé en 2026 : le décret du 27 février
            2026 repousse l&apos;âge de 14 à <strong>18 ans pour les enfants nés
            à partir du 1er mars 2012</strong>, c&apos;est-à-dire ceux qui
            auraient eu 14 ans à compter du 1er mars 2026. Les enfants nés avant
            conservent la majoration à 14 ans. Le budget 2027 chiffre
            l&apos;économie à 0,6 milliard d&apos;euros sur l&apos;année.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Une exception tient depuis l&apos;origine : dans une famille de deux
            enfants, <strong>l&apos;aîné n&apos;ouvre jamais droit à la
            majoration</strong>. Elle ne se déclenche qu&apos;à partir du
            deuxième enfant concerné — donc, pour deux enfants, uniquement
            quand le cadet atteint l&apos;âge requis. À partir de trois
            enfants, chaque enfant compte.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">
              Concrètement, un enfant né en janvier 2012 a touché la majoration
              à ses 14 ans en janvier 2026 ; son cousin né en avril 2012 ne la
              touchera qu&apos;en avril 2030. Entre deux familles identiques,
              l&apos;écart atteint {EUR.format(AF_2026.MAJORATION_AGE * 48)} sur
              quatre ans.
            </p>
          </div>
        </div>
      </section>

      <section id="gel" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le gel de 2027 : ce que prévoit le budget, et où il en est
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            En temps normal, la BMAF est revalorisée chaque 1er avril de
            l&apos;inflation hors tabac constatée sur douze mois, en application
            de l&apos;article L161-25 du Code de la sécurité sociale, et ne peut
            jamais baisser. Pour avril 2027, le coefficient dépendra des indices
            de février 2026 à janvier 2027 : avec une inflation à 3,1 % sur un
            an en septembre 2026, portée par l&apos;énergie, la revalorisation
            mécanique serait nettement supérieure aux 0,8 % d&apos;avril 2026.
            Le chiffre exact ne sera connu qu&apos;en février 2027.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            C&apos;est précisément cette revalorisation que le gouvernement veut
            suspendre. L&apos;annexe du projet de loi de financement de la
            Sécurité sociale pour 2027, déposé le 1er octobre, prévoit « le
            maintien des prestations familiales à leur niveau de 2026 », pour
            0,5 milliard d&apos;euros d&apos;économie, un recentrage de
            l&apos;allocation de rentrée scolaire pour 0,6 milliard, et un
            retour à l&apos;indexation normale en 2028. Trois choses sont à
            savoir avant d&apos;en tirer des conclusions.
          </p>
          <ol className="mt-4 space-y-3 text-base leading-relaxed text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="font-bold text-primary">1.</span>
              <span><strong>Aucun article du texte ne porte le gel.</strong> Il figure dans la trajectoire financière annexée, pas dans le dispositif. Le chapitre consacré aux prestations familiales contient deux mesures : une allocation de remplacement pour les non-salariés agricoles, et une condition d&apos;un an de résidence pour les étrangers hors Union européenne. Le gel devra donc passer par un amendement du gouvernement, ou par une mesure réglementaire dont la forme n&apos;est pas connue.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="font-bold text-primary">2.</span>
              <span><strong>L&apos;Assemblée nationale a rejeté le projet.</strong> La commission des affaires sociales l&apos;a repoussé le 16 octobre ; en séance, les députés ont rejeté la partie recettes le 23 octobre 2026, par 115 voix contre 1, ce qui vaut rejet de l&apos;ensemble en première lecture. La partie dépenses, où figuraient les mesures famille, n&apos;a pas été examinée. Le texte est transmis au Sénat dans sa version initiale, pour un examen à partir du 9 novembre.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="font-bold text-primary">3.</span>
              <span><strong>Le précédent de 2026 plaide pour la prudence.</strong> Un gel comparable avait été proposé pour 2026 et écarté par le Parlement ; la BMAF avait finalement été revalorisée de 0,8 %. Rien n&apos;interdit le même scénario, ni l&apos;inverse par ordonnance ou en nouvelle lecture.</span>
            </li>
          </ol>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Pour une famille de deux enfants au taux plein, l&apos;enjeu est de
            l&apos;ordre de {EUR.format(Math.round(AF_2026.MONTANTS[2] * 0.03 * 12))} sur
            l&apos;année si la revalorisation avait atteint 3 % ; pour trois
            enfants, environ {EUR.format(Math.round(AF_2026.MONTANTS[3] * 0.03 * 12))}.
            Cette page sera mise à jour à chaque étape : vote du Sénat, nouvelle
            lecture, promulgation, puis publication du coefficient d&apos;avril
            2027.
          </p>
        </div>
        <div className="mt-6">
          <NewsletterForm
            categorie="general"
            titre="Reçois les montants 2027 dès qu'ils sont fixés"
            texte="Le sort du gel, le coefficient d'avril 2027 et les plafonds de janvier, envoyés le jour de leur publication officielle."
            page="/guides/allocations-familiales-2027"
          />
        </div>
      </section>

      <section id="autres" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Les autres prestations familiales concernées
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le gel annoncé vise « les prestations familiales » dans leur
            ensemble, c&apos;est-à-dire toutes celles qui se calculent à partir
            de la BMAF. Les montants 2026, vérifiés sur service-public.gouv.fr :
          </p>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Allocation de rentrée scolaire 2026</strong> : 426,87 € de 6 à 10 ans, 450,41 € de 11 à 14 ans, 466,02 € de 15 à 18 ans, sous plafond de 28 956 € pour un enfant (+6 682 € par enfant supplémentaire), versée à partir du 18 août 2026. C&apos;est elle que le budget 2027 veut « recentrer », pour 0,6 milliard d&apos;euros.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Complément familial</strong> (trois enfants et plus de 3 ans, ressources modestes) : 198,16 € par mois, ou 297,27 € en montant majoré ; plafond 2026 pour trois enfants de 44 735 € pour un couple à un revenu, 54 724 € pour deux revenus ou un parent isolé.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>PAJE, allocation de base</strong> (enfant de moins de 3 ans) : 198,16 € par mois au taux plein, 99,08 € au taux partiel ; plafond pour un enfant de 37 118 € (un revenu) ou 49 054 € (deux revenus ou parent isolé), revenus 2024.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La <Link href="/guides/prime-activite-2027" className="text-primary underline-offset-4 hover:underline">prime d&apos;activité</Link>, elle, n&apos;est pas une prestation familiale : elle suit sa propre règle de revalorisation, que le projet de loi de finances propose aussi de suspendre en avril 2027. Et pour savoir si votre foyer paiera l&apos;impôt sur le revenu avec ces prestations — qui ne sont pas imposables —, le <Link href="/guides/seuil-imposition-2027" className="text-primary underline-offset-4 hover:underline">seuil d&apos;imposition 2027</Link> détaille les cas par nombre de parts.
          </p>
        </div>
      </section>

      <GuideCta
        accent
        titre="Parent et indépendant ?"
        intro="Pour un auto-entrepreneur ou un dirigeant, la CAF retient le bénéfice ou le chiffre d'affaires abattu, pas le salaire."
        liens={[
          { href: "/simulateurs/auto-entrepreneur", label: "Simulateur auto-entrepreneur", desc: "Le revenu retenu par la CAF est le CA après abattement", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/simulateurs/sasu-eurl", label: "SASU ou EURL", desc: "Salaire ou dividendes : ce que voit la CAF", icon: <ScaleIcon className="h-4 w-4" /> },
          { href: "/guides/seuil-imposition-2027", label: "Seuil d'imposition 2027", desc: "Quotient familial et parts fiscales", icon: <PercentIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
