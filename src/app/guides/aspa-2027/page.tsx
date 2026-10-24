import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import AspaCalc from "@/components/guides/AspaCalc";
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
  CoinIcon,
  BriefcaseIcon,
  FileTextIcon,
} from "@/components/icons";
import { ASPA_2026, calculerAspa, recuperationSuccession } from "@/lib/calculators/aspa";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const PCT1 = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// Revalorisation du 1er janvier 2027 : coefficient de l'article L. 161-23-1 CSS,
// moyenne des IPC hors tabac de novembre 2025 à octobre 2026 rapportée aux
// douze mois précédents. Onze indices sur douze sont connus (INSEE, IPC de
// septembre 2026 publié le 15 octobre) : fourchette 1,7 à 1,8 % selon
// l'indice d'octobre, publié mi-novembre. Estimation, pas un chiffre officiel.
const REVALO_2027_BASSE = 0.017;
const REVALO_2027_HAUTE = 0.018;
const mensuel2027 = (annuel: number, taux: number) => (annuel * (1 + taux)) / 12;

// Historique, circulaires Cnav 2023-03, 2023-34, 2024-39, 2025-29.
const HISTORIQUE = [
  { annee: 2023, seul: 961.08, couple: 1_492.08, taux: "+0,8 % (après +4 % en juillet 2022)" },
  { annee: 2024, seul: 1_012.02, couple: 1_571.16, taux: "+5,3 %" },
  { annee: 2025, seul: 1_034.28, couple: 1_605.73, taux: "+2,2 %" },
  { annee: 2026, seul: ASPA_2026.SEUL_MENSUEL, couple: ASPA_2026.COUPLE_MENSUEL, taux: "+0,9 %" },
];

const EX_SEUL = calculerAspa({ situation: "seul", ressourcesMensuelles: 720, revenusActiviteMensuels: 0, patrimoine: 0 });
const EX_COUPLE = calculerAspa({ situation: "couple", ressourcesMensuelles: 1_300, revenusActiviteMensuels: 0, patrimoine: 20_000 });
const EX_SUCC = recuperationSuccession("seul", 130_000, 6);

const meta: GuideMeta = {
  slug: "aspa-2027",
  titre: "ASPA 2027 : montant du minimum vieillesse, plafonds et calcul",
  sousTitre: `${EUR2.format(ASPA_2026.SEUL_MENSUEL)} par mois pour une personne seule, ${EUR2.format(ASPA_2026.COUPLE_MENSUEL)} pour un couple en 2026 — et une revalorisation d'environ 1,7 à 1,8 % attendue au 1er janvier 2027`,
  chapo: `L'allocation de solidarité aux personnes âgées, l'ex-minimum vieillesse, complète les ressources des retraités de 65 ans et plus jusqu'à un plafond. Elle n'est pas automatique, elle se calcule par différence, et elle peut être reprise sur la succession au-delà d'un certain patrimoine. Cette page donne les montants 2026, un calcul dans votre situation, la règle de la succession chiffrée, et ce que 2027 réserve : la revalorisation de janvier, et la raison pour laquelle le gel des pensions prévu par le budget de la Sécurité sociale ne devrait pas s'appliquer à l'ASPA.`,
  filAriane: "ASPA 2027",
  datePublished: "2026-10-24",
  dateModified: "2026-10-24",
  tocItems: [
    { id: "montants", label: "Montants et plafonds 2026" },
    { id: "calcul", label: "Dans votre situation" },
    { id: "conditions", label: "Conditions et ressources" },
    { id: "succession", label: "La récupération sur succession" },
    { id: "2027", label: "Ce qui change en 2027" },
    { id: "evolution", label: "Évolution depuis 2023" },
  ],
  faq: [
    {
      q: "Quel sera le montant de l'ASPA en 2027 ?",
      r: `Il n'est pas encore fixé. L'ASPA est revalorisée chaque 1er janvier comme les pensions de base, sur l'inflation hors tabac des douze mois arrêtés en octobre. Onze indices sur douze sont connus : la hausse devrait se situer entre 1,7 et 1,8 %, soit environ ${EUR.format(mensuel2027(ASPA_2026.SEUL_ANNUEL, REVALO_2027_BASSE))} à ${EUR.format(mensuel2027(ASPA_2026.SEUL_ANNUEL, REVALO_2027_HAUTE))} par mois pour une personne seule et ${EUR.format(mensuel2027(ASPA_2026.COUPLE_ANNUEL, REVALO_2027_BASSE))} à ${EUR.format(mensuel2027(ASPA_2026.COUPLE_ANNUEL, REVALO_2027_HAUTE))} pour un couple. Le chiffre officiel est publié par instruction interministérielle en décembre ; cette page l'affichera ce jour-là.`,
    },
    {
      q: "L'ASPA est-elle concernée par le gel des retraites prévu en 2027 ?",
      r: "A priori non. L'article 35 du projet de loi de financement de la Sécurité sociale pour 2027 déroge à la revalorisation des « pensions de vieillesse servies par les régimes obligatoires de base » au-dessus de 1 260 € par mois. L'ASPA n'est pas une pension : c'est une allocation différentielle, revalorisée par un autre article du code, et le texte ne la cite nulle part. Le ministre a indiqué que le minimum vieillesse n'était pas visé. Par ailleurs, l'Assemblée nationale a rejeté le projet le 23 octobre 2026 avant même d'examiner cet article ; le Sénat s'en saisit à partir du 9 novembre.",
    },
    {
      q: "Comment est calculée l'ASPA ?",
      r: `Par différence : plafond moins ressources. Pour une personne seule, ${EUR2.format(ASPA_2026.SEUL_MENSUEL)} moins le total des pensions et autres ressources retenues. Un retraité qui perçoit 720 € de pension touche donc ${EUR2.format(EX_SEUL.allocationMensuelle)} d'ASPA, et ses ressources atteignent exactement le plafond. Les revenus d'activité bénéficient d'un abattement, le patrimoine hors résidence principale est compté pour 3 % de sa valeur par an, et plusieurs prestations (APL, AAH, prestations familiales) sont exclues du calcul.`,
    },
    {
      q: "L'ASPA est-elle récupérée sur la succession ?",
      r: `Oui, mais seulement si l'actif net de la succession dépasse ${EUR2.format(ASPA_2026.SEUIL_SUCCESSION)} en métropole (150 000 € outre-mer), et dans la limite de ${EUR2.format(ASPA_2026.RECUPERABLE_PAR_AN_SEUL)} par année de versement pour une personne seule. Seule la part de l'actif au-dessus du seuil est reprise. La résidence principale compte dans cet actif. Pour une succession de 130 000 € après six ans d'ASPA, la caisse reprend ${EUR.format(EX_SUCC)}.`,
    },
    {
      q: "Faut-il demander l'ASPA ou est-elle versée automatiquement ?",
      r: "Il faut la demander, auprès de la caisse qui verse la retraite principale (Assurance retraite, MSA…) ou, sans retraite, auprès du Saspa. Demandée dans les trois mois qui suivent la notification de la retraite, elle prend effet à la même date ; au-delà, elle démarre le premier jour du mois suivant la demande, sans rétroactivité. Il faut d'abord avoir fait liquider toutes ses retraites, françaises et étrangères, y compris celles du conjoint.",
    },
  ],
  sources: [
    { label: "Cnav — circulaire 2025-29 du 22 décembre 2025 : montants et plafonds au 1er janvier 2026", href: "https://legislation.lassuranceretraite.fr/Pdf/circulaire_cnav_2025_29_22122025.pdf" },
    { label: "service-public.gouv.fr — Allocation de solidarité aux personnes âgées (F16871)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16871" },
    { label: "L'Assurance retraite — Améliorer ses ressources à la retraite", href: "https://www.lassuranceretraite.fr/portail-info/home/retraite/vie-retraite-bien-vieillir/ameliorer-ressources-retraite.html" },
    { label: "Assemblée nationale — PLFSS 2027 (n° 3211), article 35", href: "https://www.assemblee-nationale.fr/dyn/opendata/PRJLANR5L17B3211.pdf" },
    { label: "Assemblée nationale — Dossier législatif PLFSS 2027, rejet du 23 octobre 2026", href: "https://www.assemblee-nationale.fr/dyn/17/dossiers/plfss_2027" },
    { label: "INSEE — Indice des prix à la consommation, septembre 2026", href: "https://www.insee.fr/fr/statistiques/9080209" },
    { label: "DREES — Fiche 25, le minimum vieillesse (édition 2025)", href: "https://drees.solidarites-sante.gouv.fr/sites/default/files/2025-07/Fiche%2025%20-%20Le%20minimum%20vieillesse%20et%20l%27allocation%20suppl%C3%A9mentaire%20d%27invalidit%C3%A9.pdf" },
    { label: "Cnav — circulaire 2024-39 (valeurs 2025) et 2023-34 (valeurs 2024)", href: "https://legislation.lassuranceretraite.fr/Pdf/circulaire_cnav_2024_39_23122024.pdf" },
  ],
};

export const metadata: Metadata = {
  title: "ASPA 2027 : montant du minimum vieillesse, plafonds, calcul et succession",
  description: `ASPA (minimum vieillesse) : ${EUR2.format(ASPA_2026.SEUL_MENSUEL)} par mois pour une personne seule et ${EUR2.format(ASPA_2026.COUPLE_MENSUEL)} pour un couple en 2026, revalorisation estimée à 1,7-1,8 % en janvier 2027, calcul par différence dans votre situation, ressources prises en compte, récupération sur succession au-delà de ${EUR.format(ASPA_2026.SEUIL_SUCCESSION)}.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "ASPA 2027 : montant, plafonds, calcul et succession",
    description: "Le minimum vieillesse en 2026 et 2027, calculé dans votre situation.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Et dans ta situation ?"
        intro="L'ASPA complète une pension. Trois outils pour connaître la pension elle-même."
        liens={[
          { href: "/guides/retraite-brut-net", label: "Pension brute en net", desc: "CSG, CRDS, Casa : les prélèvements sur ta retraite", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/revalorisation-retraites-2027", label: "Revalorisation 2027", desc: "Base et Agirc-Arrco : qui est concerné, de combien", icon: <CoinIcon className="h-4 w-4" /> },
          { href: "/guides/calendrier-paiement-retraite-2027", label: "Dates de paiement 2027", desc: "Les 24 virements de l'année", icon: <CalendarIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="montants" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Les montants et plafonds en vigueur en 2026
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { l: "Personne seule", m: ASPA_2026.SEUL_MENSUEL, a: ASPA_2026.SEUL_ANNUEL },
            { l: "Couple", m: ASPA_2026.COUPLE_MENSUEL, a: ASPA_2026.COUPLE_ANNUEL },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.l}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-primary">{EUR2.format(c.m)} <span className="text-base font-medium text-muted-foreground">par mois</span></p>
              <p className="mt-1 text-sm text-muted-foreground">{EUR2.format(c.a)} par an — montant maximal et plafond de ressources</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ces montants sont en vigueur depuis le 1er janvier 2026, après une
          revalorisation de 0,9 %, l&apos;inflation hors tabac constatée sur
          les douze mois arrêtés en octobre 2025. Ils ont une double nature :
          c&apos;est à la fois le <strong>maximum</strong> que l&apos;allocation
          peut atteindre, pour quelqu&apos;un qui n&apos;a aucune ressource, et
          le <strong>plafond</strong> au-delà duquel on n&apos;y a plus droit.
          Entre les deux, l&apos;ASPA comble la différence. Le couple
          s&apos;entend au sens large : mariage, Pacs ou concubinage, et le
          plafond s&apos;apprécie sur les ressources des deux, même si un seul
          remplit la condition d&apos;âge.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Combien d&apos;ASPA dans votre situation ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          L&apos;ASPA est une allocation différentielle : elle vaut le plafond
          moins vos ressources. Le calculateur applique les règles de 2026,
          l&apos;abattement sur les revenus d&apos;activité et l&apos;évaluation
          forfaitaire du patrimoine à 3 % par an.
        </p>
        <div className="mt-6">
          <AspaCalc />
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Deux exemples. Une retraitée seule avec 720 € de pension par mois
          reçoit <strong>{EUR2.format(EX_SEUL.allocationMensuelle)} d&apos;ASPA</strong>,
          ce qui porte ses ressources à {EUR2.format(ASPA_2026.SEUL_MENSUEL)}.
          Un couple avec 1 300 € de pensions cumulées et 20 000 € d&apos;épargne
          voit cette épargne comptée pour {EUR.format(20_000 * ASPA_2026.TAUX_PATRIMOINE)} par
          an, soit {EUR2.format((20_000 * ASPA_2026.TAUX_PATRIMOINE) / 12)} par mois ; il
          perçoit <strong>{EUR2.format(EX_COUPLE.allocationMensuelle)}</strong>. La
          caisse examine d&apos;abord les ressources des trois derniers mois ;
          si elles dépassent le plafond, elle refait le calcul sur douze mois,
          ce qui lisse un revenu exceptionnel.
        </p>
      </section>

      <section id="conditions" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Conditions, ressources comptées et ressources exclues
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Quatre conditions ouvrent le droit. <strong>L&apos;âge</strong> :
            65 ans, ramenés à 62 ans en cas d&apos;inaptitude au travail,
            d&apos;incapacité permanente d&apos;au moins 50 %, ou de retraite
            anticipée pour carrière longue ou handicap. <strong>La
            résidence</strong> : vivre en France de façon stable, plus de neuf
            mois par an ; les étrangers hors Union européenne doivent détenir
            un titre de séjour autorisant à travailler depuis au moins dix ans,
            sauf réfugiés et protégés subsidiaires. <strong>Les
            ressources</strong> sous le plafond. Et <strong>toutes les
            retraites liquidées</strong> : il faut avoir demandé l&apos;ensemble
            de ses pensions, françaises et étrangères, de base et
            complémentaires, y compris la réversion, avant de demander
            l&apos;ASPA.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">Comptées</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li>Pensions de retraite, de réversion, d&apos;invalidité</li>
                <li>Revenus d&apos;activité, après abattement de {EUR.format(ASPA_2026.ABATTEMENT_ACTIVITE_SEUL_12M)} par an (seul) ou {EUR.format(ASPA_2026.ABATTEMENT_ACTIVITE_COUPLE_12M)} (couple)</li>
                <li>Pensions alimentaires fixées par un juge</li>
                <li>Biens mobiliers et immobiliers hors résidence principale, pour 3 % de leur valeur par an</li>
                <li>Biens donnés au cours des dix dernières années, sous conditions</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">Exclues</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li>La résidence principale, même en cas d&apos;hospitalisation longue</li>
                <li>APL et allocation de logement sociale</li>
                <li>AAH (sauf cas particuliers), APA, PCH, majoration tierce personne</li>
                <li>Prestations familiales</li>
                <li>Allocation de reconnaissance du combattant, aides des descendants non fixées par un juge</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">
              Le délai qui coûte le plus cher : l&apos;ASPA n&apos;est jamais
              versée rétroactivement. Demandée dans les trois mois qui suivent
              la notification de la retraite, elle démarre avec elle ; demandée
              plus tard, elle ne démarre que le mois suivant la demande. Chaque
              mois d&apos;hésitation est un mois perdu.
            </p>
          </div>
        </div>
      </section>

      <section id="succession" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><FileTextIcon className="w-4 h-4" /></IconBadge>
          La récupération sur succession, chiffrée
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            C&apos;est la raison pour laquelle beaucoup de retraités éligibles
            renoncent à l&apos;ASPA, souvent à tort. La règle : au décès
            du bénéficiaire, la caisse peut reprendre les sommes versées{" "}
            <strong>uniquement si l&apos;actif net de la succession dépasse{" "}
            {EUR2.format(ASPA_2026.SEUIL_SUCCESSION)}</strong> en métropole
            (150 000 € dans les départements d&apos;outre-mer, à Saint-Martin et
            Saint-Barthélemy, seuil figé jusqu&apos;en 2029). L&apos;actif net
            s&apos;entend après déduction des dettes et des frais funéraires ;
            la résidence principale en fait partie.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Trois limites protègent les héritiers. La reprise porte sur la{" "}
            <strong>seule part de l&apos;actif au-dessus du seuil</strong>. Elle
            est <strong>plafonnée par année de versement</strong> :{" "}
            {EUR2.format(ASPA_2026.RECUPERABLE_PAR_AN_SEUL)} pour une personne
            seule, {EUR2.format(ASPA_2026.RECUPERABLE_PAR_AN_COUPLE)} pour un
            couple, en 2026. Et elle peut être <strong>reportée</strong> au décès
            du conjoint survivant, ou tant qu&apos;un héritier d&apos;au moins
            65 ans vivant au foyer a des ressources sous le plafond de
            l&apos;ASPA. La caisse dispose de cinq ans pour réclamer.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Actif net de la succession</th>
                  <th className="px-4 py-3">Années d&apos;ASPA (personne seule)</th>
                  <th className="px-4 py-3">Montant repris</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [100_000, 10],
                  [110_000, 4],
                  [130_000, 6],
                  [200_000, 6],
                ].map(([actif, annees]) => (
                  <tr key={`${actif}-${annees}`} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground">{EUR.format(actif)}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground/80">{annees} ans</td>
                    <td className="whitespace-nowrap px-4 py-3 text-lg font-bold tabular-nums text-primary">{EUR.format(recuperationSuccession("seul", actif, annees))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Le seuil est indexé sur l&apos;inflation chaque 1er janvier depuis
            2024 ; service-public.gouv.fr affiche 108 586,14 €, un euro de plus
            que la circulaire de la Cnav, que nous retenons.
          </p>
        </div>
      </section>

      <section id="2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Ce qui change au 1er janvier 2027
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;ASPA et ses plafonds sont revalorisés chaque 1er janvier avec
            le même coefficient que les pensions de base : l&apos;évolution de
            la moyenne des indices des prix hors tabac de novembre 2025 à
            octobre 2026, rapportée aux douze mois précédents. Onze indices sur
            douze sont publiés ; celui de septembre 2026 affiche +3,1 % sur un
            an, tiré par l&apos;énergie, mais la moyenne glissante reste bien
            plus sage : <strong>la hausse devrait se situer entre{" "}
            {PCT1(REVALO_2027_BASSE * 100)} et {PCT1(REVALO_2027_HAUTE * 100)} %</strong>,
            selon l&apos;indice d&apos;octobre publié mi-novembre.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Par mois</th>
                  <th className="px-4 py-3">2026</th>
                  <th className="px-4 py-3">2027 à +{PCT1(REVALO_2027_BASSE * 100)} %</th>
                  <th className="px-4 py-3">2027 à +{PCT1(REVALO_2027_HAUTE * 100)} %</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { l: "Personne seule", a: ASPA_2026.SEUL_ANNUEL, m: ASPA_2026.SEUL_MENSUEL },
                  { l: "Couple", a: ASPA_2026.COUPLE_ANNUEL, m: ASPA_2026.COUPLE_MENSUEL },
                ].map((c) => (
                  <tr key={c.l} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{c.l}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground">{EUR2.format(c.m)}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">≈ {EUR2.format(mensuel2027(c.a, REVALO_2027_BASSE))}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">≈ {EUR2.format(mensuel2027(c.a, REVALO_2027_HAUTE))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            Le budget de la Sécurité sociale pour 2027 prévoit, à son article
            35, une revalorisation réduite ou nulle des pensions de base
            au-dessus de 1 260 € par mois. <strong>L&apos;ASPA ne devrait pas
            être touchée</strong> : l&apos;article ne vise que « les pensions de
            vieillesse servies par les régimes obligatoires de base », et
            l&apos;allocation, qui n&apos;est pas une pension, est revalorisée
            par un autre article du code que le texte ne modifie pas. Le
            ministre l&apos;a confirmé oralement. Il s&apos;agit toutefois
            d&apos;une lecture du périmètre, pas d&apos;une exclusion écrite.
            Et le débat est suspendu : l&apos;Assemblée nationale a rejeté le
            projet en première lecture le 23 octobre 2026, sans examiner la
            partie dépenses ; le Sénat l&apos;examine à partir du 9 novembre.
            Pour les pensions elles-mêmes, notre guide sur la{" "}
            <Link href="/guides/revalorisation-retraites-2027" className="text-primary underline-offset-4 hover:underline">
              revalorisation des retraites 2027
            </Link>{" "}
            suit le texte étape par étape.
          </p>
        </div>
        <div className="mt-6">
          <NewsletterForm
            categorie="retraite"
            titre="Reçois le montant 2027 de l'ASPA dès sa publication"
            texte="Le coefficient officiel de janvier, le nouveau plafond et le seuil de succession, envoyés le jour de la circulaire."
            page="/guides/aspa-2027"
          />
        </div>
      </section>

      <section id="evolution" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          L&apos;évolution du minimum vieillesse depuis 2023
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">1er janvier</th>
                <th className="px-5 py-3">Personne seule</th>
                <th className="px-5 py-3">Couple</th>
                <th className="px-5 py-3">Revalorisation</th>
              </tr>
            </thead>
            <tbody>
              {HISTORIQUE.map((h) => (
                <tr key={h.annee} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">{h.annee}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{EUR2.format(h.seul)}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{EUR2.format(h.couple)}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-foreground/80">{h.taux}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          En quatre ans, le montant pour une personne seule a progressé de{" "}
          {PCT1(((ASPA_2026.SEUL_MENSUEL / HISTORIQUE[0].seul) - 1) * 100)} %, au
          rythme de l&apos;inflation, sans coup de pouce depuis la hausse de
          100 € par mois étalée sur 2018-2020. Le seuil de récupération sur
          succession, lui, a fait un bond : 39 000 € jusqu&apos;en août 2023,
          100 000 € ensuite, puis indexé chaque année jusqu&apos;aux{" "}
          {EUR2.format(ASPA_2026.SEUIL_SUCCESSION)} de 2026. C&apos;est ce
          relèvement qui a levé, pour la plupart des petits patrimoines, la
          crainte de léser ses héritiers.
        </p>
      </section>

      <GuideCta
        accent
        titre="Travailler pendant la retraite ?"
        intro="Les revenus d'activité sont comptés après abattement : un complément modeste ne fait pas toujours perdre l'ASPA."
        liens={[
          { href: "/guides/portage-salarial-retraite", label: "Portage salarial et retraite", desc: "Cumuler une mission et sa pension", icon: <BriefcaseIcon className="h-4 w-4" /> },
          { href: "/simulateurs/auto-entrepreneur", label: "Auto-entrepreneur retraité", desc: "Ce que rapporte un complément d'activité", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/retraite-brut-net", label: "Pension brute en net", desc: "Les prélèvements selon ton revenu fiscal", icon: <CoinIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
