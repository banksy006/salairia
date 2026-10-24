import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import ChequeEnergieCalc from "@/components/guides/ChequeEnergieCalc";
import NewsletterForm from "@/components/NewsletterForm";
import {
  IconBadge,
  EuroIcon,
  CalculatorIcon,
  CalendarIcon,
  AlertTriangleIcon,
  InfoIcon,
  PercentIcon,
  ZapIcon,
  FileTextIcon,
  CompassIcon,
  BarChartIcon,
} from "@/components/icons";
import { CHEQUE_ENERGIE_2026, calculerChequeEnergie, unitesConsommation } from "@/lib/calculators/cheque-energie";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

// Crédits 2027 : projet annuel de performances, mission Écologie, programme
// 174, action 02 (chèque énergie « particuliers », crédits de paiement).
const CREDITS_2027_CP = 698.6;
const BENEFICIAIRES_2027 = 5.1;

const EX_SEUL = calculerChequeEnergie(9_800, 1);
const EX_FAMILLE = calculerChequeEnergie(16_500, 4);
const EX_LIMITE = calculerChequeEnergie(16_400, 2);

const meta: GuideMeta = {
  slug: "cheque-energie-2027",
  titre: "Chèque énergie 2027 : montant, conditions, date d'envoi en janvier",
  sousTitre: `De ${EUR.format(48)} à ${EUR.format(277)} selon le revenu fiscal et la taille du foyer — une campagne 2027 annoncée pour janvier, trois mois plus tôt qu'en 2026`,
  chapo: `Le chèque énergie aide les foyers modestes à payer leurs factures d'électricité, de gaz, de fioul ou de bois. Son barème n'a pas bougé depuis 2019, mais tout le reste a changé : depuis 2025, il n'est plus envoyé automatiquement à partir de la taxe d'habitation mais à partir du contrat d'électricité, ce qui a fait disparaître un bénéficiaire sur quatre. Cette page donne le barème en vigueur, le calcul dans votre situation, la procédure de demande, et ce qui est connu pour 2027 : un envoi annoncé en janvier, des crédits en hausse de 7 % dans le projet de budget, et un article qui élargit les croisements de fichiers pour retrouver 100 000 foyers oubliés.`,
  filAriane: "Chèque énergie 2027",
  datePublished: "2026-10-24",
  dateModified: "2026-10-24",
  tocItems: [
    { id: "bareme", label: "Le barème" },
    { id: "calcul", label: "Dans votre situation" },
    { id: "reforme", label: "Automatique ou sur demande" },
    { id: "2027", label: "Ce qui est connu pour 2027" },
    { id: "usages", label: "Comment l'utiliser" },
    { id: "evolution", label: "Évolution depuis 2018" },
  ],
  faq: [
    {
      q: "Quand sera envoyé le chèque énergie 2027 ?",
      r: "Le site officiel chequeenergie.gouv.fr annonce que « la campagne 2027 du chèque énergie sera lancée en janvier 2027 », sans date précise. Le gouvernement a indiqué en septembre 2026 vouloir avancer le versement d'avril à janvier, sous réserve du vote du budget. En 2026, les chèques ont été envoyés du 1er au 20 avril, puis une seconde vague le 1er mai ; en 2025, seulement en novembre, à cause d'une loi de finances tardive. Cette page sera mise à jour dès l'annonce des dates par département.",
    },
    {
      q: "Quel est le montant du chèque énergie ?",
      r: `Entre ${EUR.format(48)} et ${EUR.format(277)}, selon le revenu fiscal de référence par unité de consommation et la taille du foyer. Une personne seule dont le revenu fiscal est inférieur à 5 700 € reçoit 194 € ; un couple avec deux enfants (2,1 unités de consommation) dans la même tranche reçoit 277 €. Le montant moyen était de ${EUR.format(CHEQUE_ENERGIE_2026.MONTANT_MOYEN)} en 2026. Le barème 2027 n'est pas encore publié ; les montants cités pour 2027 par la presse sont ceux de 2026.`,
    },
    {
      q: "Pourquoi n'ai-je pas reçu mon chèque énergie alors que j'y ai droit ?",
      r: "Depuis 2025, le chèque est attribué au titulaire du contrat d'électricité du logement, identifié en croisant le numéro de point de livraison, le numéro fiscal et le revenu fiscal de référence. Si le contrat n'est pas à votre nom, si votre fournisseur n'a pas transmis les bonnes données, ou si vous avez déménagé, vous n'êtes pas sur la liste. Il faut alors faire une demande sur chequeenergie.gouv.fr, avec une attestation de contrat d'électricité de moins de trois mois, avant le 31 décembre de l'année de la campagne.",
    },
    {
      q: "Quelle année de revenus compte pour le chèque énergie 2027 ?",
      r: "La règle est celle de l'année N−2 : le chèque 2026 est calculé sur le revenu fiscal de référence 2024, figurant sur l'avis d'imposition reçu en 2025. Pour 2027, ce serait donc le revenu de 2025, sur l'avis reçu en 2026 — logique mais pas encore confirmée par un texte officiel pour la campagne 2027.",
    },
    {
      q: "Peut-on payer son carburant ou ses travaux avec le chèque énergie ?",
      r: "Non. Le carburant automobile n'a jamais été éligible. Les travaux de rénovation énergétique ne le sont plus pour les chèques émis depuis le 15 février 2025 ; les anciens chèques « travaux » restent utilisables jusqu'à leur date d'expiration. Restent éligibles les factures d'électricité, de gaz, de fioul, de bois et autres combustibles, ainsi que les charges de chauffage dans certains logements-foyers et logements sociaux.",
    },
  ],
  sources: [
    { label: "chequeenergie.gouv.fr — FAQ bénéficiaire : barème, unités de consommation, usages", href: "https://chequeenergie.gouv.fr/beneficiaire/faq" },
    { label: "chequeenergie.gouv.fr — Annonce de la campagne 2027", href: "https://chequeenergie.gouv.fr/" },
    { label: "service-public.gouv.fr — Chèque énergie (F33667)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33667" },
    { label: "economie.gouv.fr — Chèque énergie 2026 : envoi des chèques et ouverture du guichet au 1er avril", href: "https://www.economie.gouv.fr/actualites/cheque-energie-2026-envoi-des-cheques-et-ouverture-du-guichet-de-demande-au-1er-avril" },
    { label: "Assemblée nationale — Projet de loi de finances pour 2027 (n° 3210), article 81", href: "https://www.assemblee-nationale.fr/dyn/opendata/PRJLANR5L17B3210.html" },
    { label: "Assemblée nationale — Projet annuel de performances 2027, mission Écologie (programme 174)", href: "https://www.assemblee-nationale.fr/dyn/contenu/visualisation/1128225/file/PAP%202027%20-%20Ecologie%20d%C3%A9veloppement%20et%20mobilit%C3%A9s%20durables.pdf" },
    { label: "Journal officiel — Arrêté du 31 juillet 2025 fixant les critères d'éligibilité au chèque énergie", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052019353" },
    { label: "DREES — Fiche 36, le chèque énergie (Minima sociaux et prestations sociales, édition 2024)", href: "https://drees.solidarites-sante.gouv.fr/sites/default/files/2024-10/MS24%20-%20Fiche%2036%20-%20Le%20ch%C3%A8que%20%C3%A9nergie.pdf" },
  ],
};

export const metadata: Metadata = {
  title: "Chèque énergie 2027 : montant (48 à 277 €), conditions, calcul et envoi en janvier",
  description: `Barème du chèque énergie selon le revenu fiscal par unité de consommation, plafond de ${EUR.format(CHEQUE_ENERGIE_2026.PLAFOND_RFR_UC)}, calcul dans votre situation, envoi automatique ou demande en ligne, et ce qui est annoncé pour 2027 : campagne en janvier, crédits en hausse de 7 %, 100 000 bénéficiaires à retrouver.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Chèque énergie 2027 : montant, conditions, envoi en janvier",
    description: "Le barème, le calcul dans votre situation et ce qui est annoncé pour 2027.",
    url: `/guides/${meta.slug}`,
  },
};

const TRANCHES = ["moins de 5 700 €", "5 700 à 6 799 €", "6 800 à 7 849 €", "7 850 à 10 999 €"];
const TAILLES: { k: "1" | "1-2" | "2+"; l: string; ex: string }[] = [
  { k: "1", l: "1 unité", ex: "personne seule" },
  { k: "1-2", l: "entre 1 et 2 unités", ex: "couple, parent avec un enfant" },
  { k: "2+", l: "2 unités et plus", ex: "couple avec deux enfants ou plus" },
];

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Et dans ta situation ?"
        intro="Le chèque énergie se calcule sur le revenu fiscal du foyer. Trois outils pour le connaître et le situer."
        liens={[
          { href: "/guides/seuil-imposition-2027", label: "Seuil d'imposition 2027", desc: "Ton revenu fiscal et ce qu'il déclenche", icon: <PercentIcon className="h-4 w-4" /> },
          { href: "/simulateurs/pouvoir-achat-ville", label: "Pouvoir d'achat par ville", desc: "Énergie, loyer, transports : le reste à vivre", icon: <CompassIcon className="h-4 w-4" /> },
          { href: "/guides/prime-activite-2027", label: "Prime d'activité 2027", desc: "L'aide que 30 % des ayants droit ne demandent pas", icon: <EuroIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="bareme" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Le barème : de 48 à 277 € selon le revenu et le foyer
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le montant dépend de deux choses : le revenu fiscal de référence du
          foyer divisé par son nombre d&apos;unités de consommation, et la
          taille du foyer. Les unités sont propres au chèque énergie : 1 pour la
          première personne, 0,5 pour la deuxième, 0,3 pour chacune des
          suivantes, divisées par deux pour un enfant mineur en résidence
          alternée. Le plafond est un revenu fiscal par unité{" "}
          <strong>strictement inférieur à {EUR.format(CHEQUE_ENERGIE_2026.PLAFOND_RFR_UC)}</strong>.
          Barème de la campagne 2026, identique à celui de 2025 :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Foyer</th>
                {TRANCHES.map((t) => <th key={t} className="px-5 py-3">RFR/UC {t}</th>)}
              </tr>
            </thead>
            <tbody>
              {TAILLES.map((t) => (
                <tr key={t.k} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="px-5 py-3">
                    <span className="font-semibold text-foreground">{t.l}</span>
                    <span className="block text-xs text-muted-foreground">{t.ex}</span>
                  </td>
                  {CHEQUE_ENERGIE_2026.MONTANTS[t.k].map((m, i) => (
                    <td key={i} className={`whitespace-nowrap px-5 py-3 tabular-nums ${i === 0 ? "text-lg font-bold text-primary" : "text-foreground"}`}>{EUR.format(m)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le ratio est arrondi à l&apos;unité avant comparaison aux seuils,
          comme le fait l&apos;Agence de services et de paiement : un revenu de
          10 500 € pour 1,8 unité donne 5 833 €, donc 176 €. Un seul chèque est
          émis par logement, au nom du titulaire du contrat d&apos;électricité.
          Le montant moyen s&apos;est établi à{" "}
          {EUR.format(CHEQUE_ENERGIE_2026.MONTANT_MOYEN)} en 2026, contre 150 €
          les années précédentes : ce n&apos;est pas une revalorisation, les
          montants n&apos;ont pas changé depuis 2019, mais un effet de
          composition des bénéficiaires.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Votre chèque énergie, calculé
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le revenu fiscal de référence figure en première page de votre avis
          d&apos;imposition. Le calculateur compte les unités de consommation,
          arrondit le ratio et applique le barème.
        </p>
        <div className="mt-6">
          <ChequeEnergieCalc />
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Trois cas. Une retraitée seule avec {EUR.format(9_800)} de revenu
          fiscal est à {EUR.format(EX_SEUL.ratio)} par unité : elle reçoit{" "}
          <strong>{EUR.format(EX_SEUL.montant)}</strong>. Un couple avec deux
          enfants et {EUR.format(16_500)} de revenu fiscal compte{" "}
          {unitesConsommation(4).toLocaleString("fr-FR")} unités, soit{" "}
          {EUR.format(EX_FAMILLE.ratio)} par unité : il reçoit{" "}
          <strong>{EUR.format(EX_FAMILLE.montant)}</strong>. Un couple sans enfant
          à {EUR.format(16_400)} est à {EUR.format(EX_LIMITE.ratio)} par unité,
          juste sous le plafond : {EUR.format(EX_LIMITE.montant)}, le montant
          minimal. À {EUR.format(16_500)}, le ratio atteint 11 000 et le droit
          disparaît : le seuil est un couperet, sans dégressivité.
        </p>
      </section>

      <section id="reforme" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ZapIcon className="w-4 h-4" /></IconBadge>
          Automatique ou sur demande : la réforme de 2025
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Jusqu&apos;en 2024, la liste des bénéficiaires venait de la taxe
            d&apos;habitation, qui reliait chaque logement à un foyer fiscal.
            Sa suppression a cassé ce lien. Depuis la campagne 2025, en
            application de la loi de finances pour 2025 et du décret du 31
            juillet 2025, l&apos;Agence de services et de paiement croise{" "}
            <strong>le numéro de point de livraison d&apos;électricité du
            logement</strong>, transmis par les gestionnaires de réseau, avec
            le numéro fiscal du titulaire du contrat et son revenu fiscal
            N−2. Le chèque est attribué au titulaire du contrat, et à lui
            seul.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le résultat est brutal : selon l&apos;exposé des motifs du projet de
            loi de finances pour 2027, le nombre de bénéficiaires est passé de
            5,7 millions en 2024 à 4,2 millions en 2025. En 2026, 3,8 millions
            de foyers ont reçu le chèque automatiquement entre le 1er et le 20
            avril, puis 700 000 autres à partir du 1er mai, soit 4,5 millions.
            Les autres doivent le demander.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">Vous le recevez sans rien faire si</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li>le contrat d&apos;électricité de votre résidence principale est à votre nom ;</li>
                <li>votre revenu fiscal par unité est sous le plafond ;</li>
                <li>le fournisseur a transmis votre numéro fiscal et votre point de livraison.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">Vous devez le demander si</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li>le contrat est au nom de quelqu&apos;un d&apos;autre (conjoint, bailleur, colocataire) ;</li>
                <li>vous avez déménagé ou changé de fournisseur ;</li>
                <li>vous n&apos;avez rien reçu alors que vous êtes éligible.</li>
              </ul>
              <p className="mt-3 text-sm text-foreground/80">Sur chequeenergie.gouv.fr ou par courrier, avec une pièce d&apos;identité, une attestation de contrat d&apos;électricité de moins de trois mois et votre avis d&apos;imposition. Guichet ouvert jusqu&apos;au 31 décembre.</p>
            </div>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">
              Les résidents de logements-foyers, d&apos;EHPAD et de résidences
              sociales, qui n&apos;ont pas de contrat à leur nom, relèvent
              d&apos;une « aide spécifique » de 192 € par an, versée au
              gestionnaire et déduite de leurs charges.
            </p>
          </div>
        </div>
      </section>

      <section id="2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Ce qui est connu pour 2027
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-4 text-base leading-relaxed text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Une campagne en janvier.</strong> Le site officiel annonce son lancement « en janvier 2027 », modalités à venir. En septembre 2026, la ministre chargée de l&apos;Énergie a indiqué vouloir avancer l&apos;envoi d&apos;avril à janvier, sous réserve du vote du budget. Ce serait la première fois que le chèque arrive en plein hiver.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Des crédits en hausse.</strong> Le projet de budget prévoit {CREDITS_2027_CP.toLocaleString("fr-FR")} millions d&apos;euros de crédits de paiement pour le chèque des particuliers (+7 % selon le dossier de presse), plus 50 millions pour l&apos;aide spécifique, pour {BENEFICIAIRES_2027.toLocaleString("fr-FR")} millions de bénéficiaires attendus. Ni suppression, ni fusion, ni changement de barème.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>L&apos;article 81 du projet de loi de finances</strong> élargit les données que les gestionnaires de réseau et les fournisseurs transmettent à l&apos;Agence (adresse du logement, anciens bénéficiaires, numéro de téléphone et adresse électronique sur demande), pour retrouver « environ 100 000 bénéficiaires supplémentaires » perdus par la réforme.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">○</span>
              <span><strong>Ce qui n&apos;est pas connu</strong> : le barème 2027, qui n&apos;a pas été publié (les montants cités par la presse sont ceux de 2026), l&apos;année de revenus retenue (en principe 2025), les dates d&apos;envoi par département et de fermeture du guichet. Un amendement adopté en commission à l&apos;Assemblée le 21 octobre propose de tripler le montant, pour 2,7 milliards d&apos;euros ; un vote en commission n&apos;engage pas le texte final.</span>
            </li>
          </ul>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            Le calendrier dépend entièrement de la loi de finances : en 2025,
            son adoption tardive avait repoussé l&apos;envoi à novembre. Les
            chèques 2026 émis en avril restent utilisables jusqu&apos;au 31 mars
            2027, selon la règle générale de validité ; vérifiez la date
            imprimée sur le chèque.
          </p>
        </div>
        <div className="mt-6">
          <NewsletterForm
            categorie="general"
            titre="Reçois les dates d'envoi 2027 dès leur publication"
            texte="Le calendrier par département, le barème 2027 et l'ouverture du guichet, envoyés le jour de l'annonce officielle."
            page="/guides/cheque-energie-2027"
          />
        </div>
      </section>

      <section id="usages" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><FileTextIcon className="w-4 h-4" /></IconBadge>
          Comment l&apos;utiliser, et pour quoi
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base leading-relaxed text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Électricité et gaz</strong> : en ligne sur chequeenergie.gouv.fr avec le numéro du chèque et la référence client, ou par courrier au fournisseur. Vous pouvez demander la pré-affectation : les années suivantes, le montant est déduit directement de la facture, ce que choisissent près d&apos;un bénéficiaire sur deux.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Fioul, bois, GPL, autres combustibles</strong> : remis en main propre au vendeur, qui l&apos;encaisse. Pas de rendu de monnaie : un chèque de 194 € sur une livraison de 150 € perd 44 €.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Charges de chauffage</strong> en logement-foyer, en EHPAD ou en logement social conventionné : remis au gestionnaire ou au bailleur ; le solde n&apos;est remboursé qu&apos;en fin de contrat.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span><strong>Carburant</strong> : jamais éligible. <strong>Travaux de rénovation énergétique</strong> : plus éligibles pour les chèques émis depuis le 15 février 2025.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le chèque donne aussi des droits annexes auprès du fournisseur :
            mise en service gratuite, réduction de 80 % sur les frais de
            déplacement en cas de coupure, protection renforcée en cas
            d&apos;impayé. Ils s&apos;activent avec l&apos;attestation jointe au
            chèque, valable jusqu&apos;au 30 avril de l&apos;année suivante.
          </p>
        </div>
      </section>

      <section id="evolution" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><BarChartIcon className="w-4 h-4" /></IconBadge>
          Un barème figé depuis 2019
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Année</th>
                <th className="px-5 py-3">Plafond RFR/UC</th>
                <th className="px-5 py-3">Montants</th>
                <th className="px-5 py-3">Ce qui change</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["2018", "7 700 €", "48 à 227 €", "Généralisation, remplace les tarifs sociaux de l'énergie"],
                ["2019", "10 700 €", "48 à 277 €", "+50 € sur chaque tranche, quatrième tranche créée"],
                ["2021-2022", "10 800 €", "inchangés", "Chèques exceptionnels de 100 € (2021) puis 100 ou 200 € (2022)"],
                ["2023", "11 000 €", "inchangés", "Plafond relevé, plus aucun chèque exceptionnel depuis"],
                ["2025", "11 000 €", "inchangés", "Attribution par le contrat d'électricité ; envoi en novembre"],
                ["2026", "11 000 €", "inchangés", "Envoi dès le 1er avril, guichet jusqu'au 31 décembre"],
              ].map(([a, p, m, c]) => (
                <tr key={a} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                  <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">{a}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{p}</td>
                  <td className="whitespace-nowrap px-5 py-3 tabular-nums text-foreground">{m}</td>
                  <td className="px-5 py-3 text-foreground/80">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Sept ans sans revalorisation des montants, pendant que les prix de
          l&apos;électricité ont augmenté de plus de moitié : en valeur réelle,
          le chèque a perdu près d&apos;un quart de son pouvoir d&apos;achat.
          Le plafond, lui, n&apos;a bougé que deux fois, en 2019 et 2023, alors
          que le <Link href="/guides/smic-2027" className="text-primary underline-offset-4 hover:underline">SMIC</Link> et
          les minima sociaux sont indexés chaque année : un salarié au SMIC à
          temps plein, seul, dépasse le plafond depuis longtemps. C&apos;est ce
          décalage que l&apos;amendement de triplement, voté en commission,
          entend corriger — sans garantie d&apos;aboutir.
        </p>
      </section>

      <GuideCta
        accent
        titre="Indépendant ?"
        intro="Pour un auto-entrepreneur, le revenu fiscal de référence est le chiffre d'affaires après abattement, pas le net encaissé."
        liens={[
          { href: "/simulateurs/auto-entrepreneur", label: "Simulateur auto-entrepreneur", desc: "CA, abattement et revenu fiscal qui en résulte", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/plafonds-micro-entreprise-2027", label: "Plafonds micro 2027", desc: "Les seuils de chiffre d'affaires et de TVA", icon: <PercentIcon className="h-4 w-4" /> },
          { href: "/simulateurs/ou-se-situe-mon-salaire", label: "Où se situe ton salaire ?", desc: "Ton percentile parmi les salariés français", icon: <BarChartIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
