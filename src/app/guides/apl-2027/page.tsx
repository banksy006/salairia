import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import AplCalc from "@/components/guides/AplCalc";
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
  CompassIcon,
  BuildingIcon,
  GraduationCapIcon,
} from "@/components/icons";
import { APL_2026, depenseLogement, loyerPlafond } from "@/lib/calculators/apl";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

// Historique des revalorisations d'octobre (IRL du 2e trimestre). 2023 : taux
// plafonné par le « bouclier loyer » (arrêté du 22 septembre 2023) ; 2025 :
// arrêté du 5 septembre 2025 ; 2026 : arrêté du 28 septembre 2026.
const HISTORIQUE = [
  { date: "1er octobre 2023", taux: "+3,5 %", note: "plafonné par le bouclier loyer" },
  { date: "1er octobre 2024", taux: "+3,26 %", note: "IRL du 2e trimestre 2024" },
  { date: "1er octobre 2025", taux: "+1,04 %", note: "IRL du 2e trimestre 2025" },
  { date: "1er octobre 2026", taux: "+1,15 %", note: "IRL du 2e trimestre 2026 : 148,37" },
  { date: "1er octobre 2027", taux: "0 % (projet)", note: "article 74 du PLF 2027, si adopté" },
];

const EX_PARIS = depenseLogement(900, 1, false, 0);
const EX_LYON = depenseLogement(620, 2, true, 1);

const meta: GuideMeta = {
  slug: "apl-2027",
  titre: "APL 2027 : plafonds de loyer, revalorisation et gel prévu par le budget",
  sousTitre: `Les paramètres relevés de 1,15 % au 1er octobre 2026 — ${EUR2.format(APL_2026.PLAFONDS[1].seul)} de loyer plafond à Paris pour une personne seule — et un projet de loi de finances qui veut sauter la revalorisation de 2027`,
  chapo: `Les aides personnelles au logement concernent 5,6 millions de ménages, pour un montant moyen de 235 € par mois en APL. Leur calcul repose sur des plafonds de loyer par zone, un forfait de charges et une participation personnelle, revalorisés chaque 1er octobre sur l'indice de référence des loyers. Cette page donne les paramètres en vigueur depuis le 1er octobre 2026, lus dans l'arrêté du 28 septembre 2026, un calcul du loyer plafond dans votre situation, et ce que le projet de loi de finances pour 2027 prévoit : aucune revalorisation en octobre 2027, et la fin de l'APL pour les étudiants rattachés à un foyer fiscal aisé.`,
  filAriane: "APL 2027",
  datePublished: "2026-10-24",
  dateModified: "2026-10-24",
  tocItems: [
    { id: "plafonds", label: "Plafonds de loyer 2026" },
    { id: "calcul", label: "Dans votre situation" },
    { id: "mecanique", label: "Comment l'APL est calculée" },
    { id: "2027", label: "Ce que prévoit le budget 2027" },
    { id: "etudiants", label: "Étudiants et colocation" },
    { id: "evolution", label: "Évolution depuis 2023" },
  ],
  faq: [
    {
      q: "Les APL vont-elles augmenter en 2027 ?",
      r: "Pas au 1er octobre 2027 si l'article 74 du projet de loi de finances pour 2027 est adopté tel quel : il suspend pour un an la revalorisation des paramètres de l'aide (plafonds de loyer, forfait de charges), avec une économie attendue de 101 millions d'euros, partagée avec la prime d'activité. Un décret pourrait la rétablir. La dernière revalorisation, de 1,15 %, date du 1er octobre 2026 ; la suivante de droit commun tomberait le 1er octobre 2028. Les paramètres de ressources, révisés au 1er janvier, ne sont pas visés par cet article. Rien n'est voté : le texte est en cours d'examen.",
    },
    {
      q: "Quel est le plafond de loyer pris en compte pour l'APL ?",
      r: `Depuis le 1er octobre 2026 : ${EUR2.format(APL_2026.PLAFONDS[1].seul)} en zone 1, ${EUR2.format(APL_2026.PLAFONDS[2].seul)} en zone 2 et ${EUR2.format(APL_2026.PLAFONDS[3].seul)} en zone 3 pour une personne seule ; ${EUR2.format(APL_2026.PLAFONDS[1].couple)}, ${EUR2.format(APL_2026.PLAFONDS[2].couple)} et ${EUR2.format(APL_2026.PLAFONDS[3].couple)} pour un couple sans personne à charge. La part du loyer au-dessus du plafond n'est pas prise en compte : c'est pour cela qu'une hausse de 1,15 % des paramètres ne change presque rien pour les locataires des grandes villes, dont le loyer dépasse largement le plafond.`,
    },
    {
      q: "Quels revenus la CAF retient-elle pour l'APL ?",
      r: "Les ressources de l'ensemble du foyer sur les douze derniers mois, actualisées automatiquement tous les trois mois à partir des données transmises par les employeurs et France Travail. C'est le système dit « en temps réel », en vigueur depuis janvier 2021. Le patrimoine du foyer est pris en compte dès qu'il dépasse 30 000 €. Les étudiants sont soumis à un plancher de ressources forfaitaire, qu'ils aient ou non des revenus.",
    },
    {
      q: "Quelle est la différence entre APL, ALF et ALS ?",
      r: "Les trois aides se calculent de la même façon et ne se cumulent pas. L'APL s'applique aux logements conventionnés, c'est-à-dire la quasi-totalité du parc social et une partie du parc privé ; l'allocation de logement familiale (ALF) aux ménages avec enfants ou jeunes couples dans un logement non conventionné ; l'allocation de logement sociale (ALS) aux autres, étudiants compris. En 2025, 2,67 millions de ménages percevaient l'APL, 2,15 millions l'ALS et 0,82 million l'ALF.",
    },
    {
      q: "Pourquoi 5 € sont-ils retirés chaque mois de mon APL ?",
      r: "C'est la retenue forfaitaire de 5 € instaurée le 1er octobre 2017 sur toutes les aides au logement, jamais supprimée depuis. Elle s'applique après le calcul, quel que soit le montant de l'aide. Elle explique une partie de l'écart entre le résultat d'un simulateur et le virement effectif.",
    },
  ],
  sources: [
    { label: "Journal officiel — Arrêté du 28 septembre 2026 relatif au calcul des aides personnelles au logement (NOR VLOL2620735A)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054913928" },
    { label: "INSEE — Indice de référence des loyers, 2e trimestre 2026 (+1,15 %)", href: "https://www.insee.fr/fr/statistiques/9022797" },
    { label: "service-public.gouv.fr — Aide personnalisée au logement (F12006)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12006" },
    { label: "Assemblée nationale — Projet de loi de finances pour 2027 (n° 3210), articles 74 et 78", href: "https://www.assemblee-nationale.fr/dyn/opendata/PRJLANR5L17B3210.html" },
    { label: "Assemblée nationale — Projet annuel de performances 2027, mission Cohésion des territoires (programme 109)", href: "https://www.assemblee-nationale.fr/dyn/contenu/visualisation/1128212/file/PAP%202027%20-%20Coh%C3%A9sion%20des%20territoires.pdf" },
    { label: "Journal officiel — Arrêté du 5 septembre 2025 (paramètres au 1er octobre 2025)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052212770" },
    { label: "CAF — Estimer mes droits (simulateur officiel)", href: "https://www.caf.fr/allocataires/mes-services-en-ligne/estimer-mes-droits" },
  ],
};

export const metadata: Metadata = {
  title: "APL 2027 : plafonds de loyer par zone, revalorisation 2026 et gel prévu en 2027",
  description: `Plafonds de loyer APL depuis le 1er octobre 2026 (${EUR2.format(APL_2026.PLAFONDS[1].seul)} à ${EUR2.format(APL_2026.PLAFONDS[3].seul)} pour une personne seule selon la zone), forfait de charges, participation minimale, calcul dans votre situation, et ce que le budget 2027 prévoit : pas de revalorisation en octobre 2027 et la fin de l'APL pour les étudiants de foyers aisés.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "APL 2027 : plafonds, revalorisation et gel prévu",
    description: "Les paramètres lus dans l'arrêté du 28 septembre 2026, et le projet de gel pour 2027.",
    url: `/guides/${meta.slug}`,
  },
};

const ZONES: { z: 1 | 2 | 3; l: string }[] = [
  { z: 1, l: "Zone 1 — Paris, petite couronne" },
  { z: 2, l: "Zone 2 — agglomérations de plus de 100 000 habitants, Corse" },
  { z: 3, l: "Zone 3 — reste du territoire" },
];

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Et dans ta situation ?"
        intro="L'APL dépend de tes ressources des douze derniers mois. Trois outils pour les connaître."
        liens={[
          { href: "/simulateurs/salaire-brut-net", label: "Ton brut en net", desc: "Ce que la CAF voit dans les déclarations de ton employeur", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/simulateurs/pouvoir-achat-ville", label: "Pouvoir d'achat par ville", desc: "Loyer et reste à vivre dans 20 villes", icon: <CompassIcon className="h-4 w-4" /> },
          { href: "/guides/prime-activite-2027", label: "Prime d'activité 2027", desc: "L'autre aide de la CAF visée par le même gel", icon: <EuroIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="plafonds" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Les plafonds de loyer depuis le 1er octobre 2026
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          L&apos;arrêté du 28 septembre 2026, publié au Journal officiel du 30
          septembre, relève tous les paramètres de 1,15 %, la hausse de
          l&apos;indice de référence des loyers au deuxième trimestre 2026
          (148,37). Il s&apos;applique aux prestations dues à compter du 1er
          octobre, donc au virement du 5 novembre. Voici les plafonds de loyer
          mensuels, hors charges, tels qu&apos;ils figurent à l&apos;article 7
          de l&apos;arrêté.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Zone</th>
                <th className="px-5 py-3">Personne seule</th>
                <th className="px-5 py-3">Couple</th>
                <th className="px-5 py-3">1 personne à charge</th>
                <th className="px-5 py-3">Par personne en plus</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map(({ z, l }) => (
                <tr key={z} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="px-5 py-3 font-semibold text-foreground">{l}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-lg font-bold tabular-nums text-primary">{EUR2.format(APL_2026.PLAFONDS[z].seul)}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{EUR2.format(APL_2026.PLAFONDS[z].couple)}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{EUR2.format(APL_2026.PLAFONDS[z].uneCharge)}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground/80">+{EUR2.format(APL_2026.PLAFONDS[z].parChargeSup)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { l: "Forfait de charges", v: EUR2.format(APL_2026.FORFAIT_CHARGES), n: `+ ${EUR2.format(APL_2026.FORFAIT_CHARGES_PAR_CHARGE)} par personne à charge` },
            { l: "Participation minimale", v: EUR2.format(APL_2026.PARTICIPATION_MINIMALE), n: "ou 8,5 % de la dépense retenue si c'est plus" },
            { l: "Retenue forfaitaire", v: EUR2.format(APL_2026.RETENUE), n: "par mois sur chaque aide, depuis 2017" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-5 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.l}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.n}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ces plafonds sont loin des loyers réels des grandes villes, et
          c&apos;est volontaire : l&apos;aide est calculée sur le loyer
          plafonné, jamais sur le loyer payé. Un studio à {EUR.format(900)} à Paris
          est retenu pour {EUR2.format(EX_PARIS.loyerRetenu)} ; la hausse de
          1,15 % n&apos;y ajoute que {EUR2.format(EX_PARIS.loyerPlafond - EX_PARIS.loyerPlafond / 1.0115)} par
          mois, et la participation minimale augmente en même temps. Pour les
          locataires dont le loyer dépasse le plafond, l&apos;essentiel de
          l&apos;aide se joue donc sur les ressources, pas sur le loyer.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Votre loyer plafond et votre dépense retenue
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le calculateur applique les paramètres de l&apos;arrêté à votre
          situation : zone, composition du foyer, loyer, colocation. Il donne la
          première moitié du calcul officiel, celle qui dépend du logement ; la
          seconde dépend de vos ressources, et seul le simulateur de la CAF
          dispose du barème complet.
        </p>
        <div className="mt-6">
          <AplCalc />
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Exemple : un couple avec un enfant qui loue {EUR.format(620)} hors
          charges à Lyon (zone 2) a un loyer plafond de{" "}
          {EUR2.format(EX_LYON.loyerPlafond)}. Le loyer est retenu pour{" "}
          {EUR2.format(EX_LYON.loyerRetenu)}, auxquels s&apos;ajoute un forfait de
          charges de {EUR2.format(EX_LYON.forfaitCharges)} : la dépense retenue
          est de {EUR2.format(EX_LYON.depenseRetenue)}, et la participation
          minimale de {EUR2.format(EX_LYON.participationMinimale)}. Le reste de
          la participation croît avec les revenus du foyer ; l&apos;aide est la
          différence, moins {EUR2.format(APL_2026.RETENUE)}.
        </p>
      </section>

      <section id="mecanique" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Comment l&apos;APL est calculée
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La formule tient en une ligne : <strong>aide = loyer plafonné +
            forfait de charges − participation personnelle</strong>, moins la
            retenue de 5 €. La participation personnelle est la part de la
            dépense que le foyer est censé assumer seul ; elle comprend un
            minimum ({EUR2.format(APL_2026.PARTICIPATION_MINIMALE)} ou 8,5 % de la
            dépense) et une part proportionnelle aux ressources au-delà d&apos;un
            abattement, appelé R0, qui dépend de la composition du foyer :{" "}
            {EUR.format(APL_2026.R0.seul)} pour une personne seule,{" "}
            {EUR.format(APL_2026.R0.couple)} pour un couple,{" "}
            {EUR.format(APL_2026.R0.uneCharge)} avec une personne à charge. Ces
            valeurs, révisées au 1er janvier, ont été reconduites à
            l&apos;identique pour 2026 par le décret du 28 décembre 2025.
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Ressources en temps réel</strong> : les revenus des douze derniers mois, actualisés tous les trois mois à partir des déclarations des employeurs et de France Travail. Une baisse de revenus se répercute en trois mois au plus, une hausse aussi.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Patrimoine</strong> : pris en compte au-delà de 30 000 € (épargne, placements, biens immobiliers hors résidence principale), sous forme d&apos;un revenu fictif ajouté aux ressources.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Dégressivité</strong> : au-delà d&apos;un multiple du loyer plafond, l&apos;aide diminue, puis s&apos;annule — une règle de 2016 pensée pour les loyers manifestement élevés au regard des ressources, dont sont exemptés les bénéficiaires de l&apos;AAH.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Hausse de loyer</strong> : non prise en compte en cours d&apos;année, intégrée au 1er janvier suivant sur la base du loyer de juillet.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Ce que le budget 2027 prévoit pour les APL
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le projet de loi de finances pour 2027, déposé le 1er octobre 2026,
            contient deux mesures. <strong>L&apos;article 74</strong> dispose
            que la révision annuelle des paramètres « n&apos;est pas appliquée
            en 2027 », pour les aides au logement comme pour la prime
            d&apos;activité, un décret pouvant « toutefois rétablir » cette
            revalorisation. L&apos;économie attendue est de 101 millions
            d&apos;euros pour les deux dispositifs. Concrètement, les plafonds
            ci-dessus resteraient figés du 1er octobre 2026 au 1er octobre
            2028, alors que les loyers continueront de suivre l&apos;IRL. Le
            même gel avait été envisagé pour 2026 et retiré par amendement.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            <strong>L&apos;article 78</strong> retire l&apos;APL, à compter du
            1er septembre 2027, aux étudiants rattachés au foyer fiscal de leurs
            parents — ou bénéficiaires d&apos;une pension alimentaire déduite —
            lorsque le revenu fiscal de référence par part de ce foyer dépasse
            la limite de la deuxième tranche du barème de l&apos;impôt, soit
            30 200 € dans le barème proposé pour 2027. L&apos;économie attendue
            est de 72 millions d&apos;euros. Les étudiants concernés devront
            choisir entre le rattachement, qui fait gagner une demi-part à
            leurs parents, et l&apos;aide au logement.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">
              Rien n&apos;est voté. Le vote de la première partie du budget,
              prévu le 20 octobre, a été reporté faute d&apos;avoir épuisé les
              amendements ; ces deux articles relèvent de la seconde partie,
              examinée ensuite, puis le texte passe au Sénat en novembre. Le programme budgétaire qui finance les aides
              passe de 16,57 à 16,52 milliards d&apos;euros, soit −0,3 %. Cette
              page sera mise à jour à chaque vote.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <NewsletterForm
            categorie="general"
            titre="Reçois le sort du gel des APL dès le vote"
            texte="Les articles 74 et 78, les paramètres 2027 et la prochaine revalorisation, envoyés le jour de leur publication."
            page="/guides/apl-2027"
          />
        </div>
      </section>

      <section id="etudiants" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><GraduationCapIcon className="w-4 h-4" /></IconBadge>
          Étudiants et colocation
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            En colocation, chaque colocataire peut percevoir l&apos;aide sur sa
            part de loyer, mais le plafond est ramené à 75 % du plafond
            normal : {EUR2.format(APL_2026.COLOCATION[1].seul)} en zone 1,{" "}
            {EUR2.format(APL_2026.COLOCATION[2].seul)} en zone 2,{" "}
            {EUR2.format(APL_2026.COLOCATION[3].seul)} en zone 3 pour une
            personne seule, avec un forfait de charges divisé par deux
            ({EUR2.format(APL_2026.FORFAIT_CHARGES_COLOCATION)}). Les étudiants
            sont soumis à un plancher de ressources forfaitaire, qu&apos;ils
            aient ou non un revenu, plus bas pour les boursiers. Depuis le 1er
            juillet 2026, les étudiants étrangers hors Union européenne
            titulaires d&apos;un titre « étudiant » n&apos;ont droit à l&apos;aide
            que s&apos;ils sont boursiers sur critères sociaux, salariés ou en
            alternance.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Un étudiant en alternance est un salarié : ses ressources sont
            celles de son contrat, et notre guide du{" "}
            <Link href="/guides/salaire-apprenti-2027" className="text-primary underline-offset-4 hover:underline">
              salaire d&apos;apprenti 2027
            </Link>{" "}
            donne les montants par âge et par année. Pour un stagiaire, la{" "}
            <Link href="/guides/gratification-stage-2027" className="text-primary underline-offset-4 hover:underline">
              gratification de stage
            </Link>{" "}
            n&apos;est pas un salaire et n&apos;entre pas dans les ressources
            au même titre.
          </p>
        </div>
      </section>

      <section id="evolution" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Les revalorisations depuis 2023
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {HISTORIQUE.map((h) => (
                <tr key={h.date} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="w-48 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{h.date}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-lg font-bold tabular-nums text-primary">{h.taux}</td>
                  <td className="px-5 py-3 text-foreground/80">{h.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le plafond de loyer d&apos;une personne seule en zone 2 est passé de{" "}
          {EUR2.format(loyerPlafond(2, false, 0) / 1.0115 / 1.0104)} en 2024 à{" "}
          {EUR2.format(loyerPlafond(2, false, 0))} aujourd&apos;hui. Sur la même
          période, l&apos;IRL a progressé du même pourcentage, par construction ;
          les loyers des nouveaux baux, eux, ne sont pas plafonnés par
          l&apos;IRL. Le gel de 2027 creuserait cet écart d&apos;une
          année supplémentaire.
        </p>
      </section>

      <GuideCta
        accent
        titre="Indépendant et locataire ?"
        intro="Pour un auto-entrepreneur, la CAF retient le chiffre d'affaires après abattement, pas le net encaissé."
        liens={[
          { href: "/simulateurs/auto-entrepreneur", label: "Simulateur auto-entrepreneur", desc: "Ce que la CAF voit de ton activité", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/comparateurs/banques-pro", label: "Banque pro", desc: "Les justificatifs de revenus que demande un bailleur", icon: <BuildingIcon className="h-4 w-4" /> },
          { href: "/simulateurs/ou-se-situe-mon-salaire", label: "Où se situe ton salaire ?", desc: "Ton percentile parmi les salariés français", icon: <BarChartIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
