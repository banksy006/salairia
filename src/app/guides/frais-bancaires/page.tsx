import type { Metadata } from "next";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import { IconBadge, InfoIcon, ScaleIcon, ReceiptIcon, ShieldIcon, AlertTriangleIcon, CalculatorIcon, TargetIcon, CompassIcon, LightbulbIcon, CoinIcon } from "@/components/icons";

// Plafonds légaux des frais d'incident. Source : Service-Public, fiche F18777
// « Incidents de paiement » (art. R312-4-1, R312-4-2, D131-25 et D133-6 du
// Code monétaire et financier), lue le 25 novembre 2026.
const PLAFONDS = {
  INTERVENTION_OP: 8,
  INTERVENTION_MOIS: 80,
  INTERVENTION_FRAGILE_OP: 4,
  INTERVENTION_FRAGILE_MOIS: 20,
  REJET_CHEQUE_PETIT: 30, // chèque de 50 € ou moins
  REJET_CHEQUE_GRAND: 50,
  REJET_PRELEVEMENT: 20, // et jamais plus que le montant rejeté
} as const;

// Offre spécifique « clientèle fragile ». Source : Banque de France, « Le
// plafonnement des frais bancaires et l'offre clientèle fragile », lue le
// 25 novembre 2026.
const OCF = {
  PRIX_MAX_MOIS: 3,
  PLAFOND_MOIS: 20,
  PLAFOND_AN: 200,
  PLAFOND_FRAGILE_SANS_OFFRE_MOIS: 25,
} as const;

// Prix moyens pondérés au 1er avril 2026. Source : Observatoire des tarifs
// bancaires (CCSF), 15e rapport publié le 30 juin 2026, 102 établissements.
const OTB = {
  TENUE_COMPTE: 22.39,
  CARTE_IMMEDIAT: 44.61,
  CARTE_DIFFERE: 44.53,
  CARTE_AUTORISATION: 29.02,
  BANQUE_A_DISTANCE: 0.3,
  RETRAITS_GRATUITS_MOIS: 2.57,
  RETRAIT_PAYANT: 1.01,
  VIREMENT_AGENCE: 5.3,
  INTERVENTION_MOYENNE: 6.45,
  OCF_MOYENNE_AN: 11.26,
} as const;

// Frais de succession : plafond de 1 % des avoirs, dans la limite de 857 €
// depuis le 1er janvier 2026 (Service-Public, actualité A18753 du 6 janvier
// 2026). Les cas de gratuité ont été censurés par le Conseil constitutionnel
// (décision n° 2026-1207 QPC, effet au 20 juin 2026).
const SUCCESSION_PLAFOND = 857;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const socle = OTB.TENUE_COMPTE + OTB.CARTE_IMMEDIAT;
const pireMoisAn = PLAFONDS.INTERVENTION_MOIS * 12;

const meta: GuideMeta = {
  slug: "frais-bancaires",
  titre: "Frais bancaires 2027 : les plafonds légaux, les prix moyens et comment payer moins",
  sousTitre: `${EUR.format(PLAFONDS.INTERVENTION_OP)} par incident, ${EUR.format(PLAFONDS.INTERVENTION_MOIS)} par mois au maximum, et ${EUR.format(OCF.PRIX_MAX_MOIS)} par mois pour l'offre réservée aux budgets fragiles`,
  chapo: `Une banque ne facture pas ce qu'elle veut. Les commissions d'intervention sont plafonnées à ${EUR.format(PLAFONDS.INTERVENTION_OP)} par opération et ${EUR.format(PLAFONDS.INTERVENTION_MOIS)} par mois, un prélèvement rejeté ne peut pas coûter plus de ${EUR.format(PLAFONDS.REJET_PRELEVEMENT)}, et les clients en difficulté ont droit à une offre à ${EUR.format(OCF.PRIX_MAX_MOIS)} par mois qui limite l'ensemble des frais d'incident à ${EUR.format(OCF.PLAFOND_MOIS)} par mois. En face, le compte courant ordinaire coûte en moyenne ${EUR2.format(socle)} par an pour la tenue de compte et la carte, selon le dernier rapport de l'Observatoire des tarifs bancaires. Ce guide réunit les plafonds en vigueur, les prix moyens constatés et les quatre leviers qui font réellement baisser la facture.`,
  filAriane: "Frais bancaires",
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  tocItems: [
    { id: "plafonds", label: "Les plafonds légaux" },
    { id: "fragile", label: "L'offre à 3 € par mois" },
    { id: "prix", label: "Les prix moyens" },
    { id: "reduire", label: "Payer moins" },
    { id: "succession", label: "Succession et découvert" },
  ],
  faq: [
    {
      q: "Quel est le plafond des commissions d'intervention ?",
      r: `${EUR.format(PLAFONDS.INTERVENTION_OP)} par opération et ${EUR.format(PLAFONDS.INTERVENTION_MOIS)} par mois pour un client ordinaire. Pour un client qui bénéficie de l'offre spécifique « clientèle fragile » ou d'un compte ouvert par la procédure du droit au compte, le plafond tombe à ${EUR.format(PLAFONDS.INTERVENTION_FRAGILE_OP)} par opération et ${EUR.format(PLAFONDS.INTERVENTION_FRAGILE_MOIS)} par mois. En pratique, l'Observatoire des tarifs bancaires relève un prix moyen de ${EUR2.format(OTB.INTERVENTION_MOYENNE)} par opération au 1er avril 2026.`,
    },
    {
      q: "Combien une banque peut-elle facturer un prélèvement rejeté ?",
      r: `Au maximum le montant du prélèvement rejeté, sans jamais dépasser ${EUR.format(PLAFONDS.REJET_PRELEVEMENT)}. Un prélèvement de 12 € rejeté ne peut donc pas coûter plus de 12 € de frais. Si le même prélèvement est présenté une seconde fois et de nouveau rejeté, la banque ne doit pas facturer de nouveaux frais. Pour un chèque, le plafond est de ${EUR.format(PLAFONDS.REJET_CHEQUE_PETIT)} s'il est de 50 € ou moins, et de ${EUR.format(PLAFONDS.REJET_CHEQUE_GRAND)} au-delà.`,
    },
    {
      q: "Qui a droit à l'offre clientèle fragile ?",
      r: "Les clients que leur banque identifie comme étant en situation de fragilité financière : ressources faibles associées à des incidents répétés pendant trois mois consécutifs ou à au moins cinq incidents au cours d'un même mois, inscription de plus de trois mois au fichier central des chèques, ou dossier de surendettement jugé recevable. Les banques membres de l'Observatoire de l'inclusion bancaire se sont en outre engagées à l'accorder à tout client qui s'estime fragile et la demande.",
    },
    {
      q: "Changer de banque est-il payant ?",
      r: "Non. Le service d'aide à la mobilité bancaire est gratuit : la nouvelle banque se charge de transférer vos prélèvements et virements réguliers, et les deux banques disposent de 22 jours ouvrés pour le faire. La clôture de l'ancien compte est gratuite elle aussi. Ce service concerne les comptes courants de particuliers.",
    },
    {
      q: "Combien coûte un compte bancaire en moyenne ?",
      r: `Au 1er avril 2026, la tenue de compte coûte en moyenne ${EUR2.format(OTB.TENUE_COMPTE)} par an et une carte à débit immédiat ${EUR2.format(OTB.CARTE_IMMEDIAT)} par an, soit ${EUR2.format(socle)} pour ce socle. Ces moyennes viennent du rapport 2026 de l'Observatoire des tarifs bancaires, qui suit 102 établissements. Elles ne comptent ni les frais d'incident ni les services à l'unité.`,
    },
    {
      q: "Les frais bancaires de succession sont-ils encore gratuits pour les petites successions ?",
      r: `Plus obligatoirement. La loi du 13 mai 2025 prévoyait la gratuité dans trois cas (défunt mineur, petits avoirs, succession simple), mais le Conseil constitutionnel a censuré ces trois cas : depuis le 20 juin 2026, les banques ne sont plus tenues de les appliquer. Le plafond, lui, est maintenu : les frais ne peuvent pas dépasser 1 % des avoirs, dans la limite de ${EUR.format(SUCCESSION_PLAFOND)} en 2026.`,
    },
  ],
  sources: [
    { label: "Service-Public — incidents de paiement : frais maximum (fiche F18777)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F18777" },
    { label: "Service-Public — frais bancaires : information du client, relevé annuel (fiche F848, vérifiée le 8 octobre 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F848" },
    { label: "Banque de France — le plafonnement des frais bancaires et l'offre clientèle fragile", href: "https://www.banque-france.fr/fr/a-votre-service/particuliers/connaitre-pratiques-bancaires-assurance/compte-frais/le-plafonnement-des-frais-bancaires-et-loffre-clientele-fragile" },
    { label: "Observatoire des tarifs bancaires (CCSF) — rapport 2026, publié le 30 juin 2026 (PDF)", href: "https://www.banque-france.fr/system/files/2026-06/OTB_2026.pdf" },
    { label: "Service-Public — droit au compte (fiche F2417, vérifiée le 19 octobre 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2417" },
    { label: "Service-Public — changer de banque : mobilité bancaire (fiche F33881, vérifiée le 21 septembre 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33881" },
    { label: "Service-Public — clôture d'un compte bancaire (fiche F2909, vérifiée le 6 novembre 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2909" },
    { label: "Service-Public — frais bancaires de succession : plafond 2026 (actualité du 6 janvier 2026)", href: "https://www.service-public.gouv.fr/particuliers/actualites/A18753" },
    { label: "Conseil constitutionnel — décision n° 2026-1207 QPC (frais bancaires de succession)", href: "https://www.conseil-constitutionnel.fr/decision/2026/20261207QPC.htm" },
    { label: "Service-Public — découvert bancaire (fiche F31423, vérifiée le 20 novembre 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31423" },
  ],
};

export const metadata: Metadata = {
  title: "Frais bancaires 2027 : plafonds légaux, prix moyens, comment payer moins",
  description: `Commissions d'intervention plafonnées à ${EUR.format(PLAFONDS.INTERVENTION_OP)} par opération et ${EUR.format(PLAFONDS.INTERVENTION_MOIS)} par mois, rejet de prélèvement à ${EUR.format(PLAFONDS.REJET_PRELEVEMENT)} au plus, offre clientèle fragile à ${EUR.format(OCF.PRIX_MAX_MOIS)} par mois, prix moyens 2026 de la carte et de la tenue de compte, changement de banque gratuit.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Frais bancaires : les plafonds légaux et comment payer moins",
    description: "Ce qu'une banque a le droit de facturer, ce que coûte un compte en moyenne, et les leviers pour réduire la note.",
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
        titre="Ton budget, chiffres en main"
        intro="Les frais bancaires pèsent d'autant plus que le revenu est serré. Trois outils pour savoir où tu en es."
        liens={[
          { href: "/simulateurs/salaire-brut-net", label: "Ton salaire net", desc: "Du brut au net, cotisation par cotisation", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/smic-2027", label: "Le SMIC 2027", desc: "Montants brut et net, hausse de décembre", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/prime-activite-2027", label: "La prime d'activité", desc: "Le complément de revenu des salaires modestes", icon: <CoinIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="plafonds" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;une banque a le droit de facturer
        </h2>
        <p className={`mt-4 max-w-3xl ${para}`}>
          Les frais d&apos;incident sont les plus encadrés, parce que ce sont
          eux qui s&apos;accumulent quand le compte est à découvert. Le Code
          monétaire et financier fixe un maximum pour chacun.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Frais</th>
                <th className="px-5 py-4">Plafond de droit commun</th>
                <th className="px-5 py-4">Client fragile ou droit au compte</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Commission d'intervention", `${EUR.format(PLAFONDS.INTERVENTION_OP)} par opération, ${EUR.format(PLAFONDS.INTERVENTION_MOIS)} par mois`, `${EUR.format(PLAFONDS.INTERVENTION_FRAGILE_OP)} par opération, ${EUR.format(PLAFONDS.INTERVENTION_FRAGILE_MOIS)} par mois`],
                ["Rejet d'un prélèvement ou d'un virement", `Le montant rejeté, au plus ${EUR.format(PLAFONDS.REJET_PRELEVEMENT)}`, "Même plafond, compris dans le plafond global ci-dessous"],
                ["Rejet d'un chèque de 50 € ou moins", `${EUR.format(PLAFONDS.REJET_CHEQUE_PETIT)} au plus`, "Même plafond"],
                ["Rejet d'un chèque de plus de 50 €", `${EUR.format(PLAFONDS.REJET_CHEQUE_GRAND)} au plus`, "Même plafond"],
                ["Ensemble des frais d'incident", "Pas de plafond global", `${EUR.format(OCF.PLAFOND_MOIS)} par mois et ${EUR.format(OCF.PLAFOND_AN)} par an avec l'offre spécifique ; ${EUR.format(OCF.PLAFOND_FRAGILE_SANS_OFFRE_MOIS)} par mois sans elle`],
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
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            La <strong>commission d&apos;intervention</strong> est la somme
            que la banque prélève chaque fois qu&apos;elle traite une
            opération qui dépasse votre solde ou votre découvert autorisé. Le
            plafond mensuel de {EUR.format(PLAFONDS.INTERVENTION_MOIS)}{" "}
            paraît lointain, mais il représente {EUR.format(pireMoisAn)}{" "}sur
            une année pour un compte en difficulté permanente : c&apos;est
            plus de dix fois le prix moyen d&apos;un compte et de sa carte.
          </p>
          <p className={`mt-4 ${para}`}>
            Deux règles sont moins connues. Les frais de rejet d&apos;un
            prélèvement ne peuvent jamais dépasser le montant du prélèvement
            lui-même : un abonnement de 9 € rejeté coûte au plus 9 €. Et si le
            créancier représente le même prélèvement et qu&apos;il est de
            nouveau rejeté, la banque n&apos;a pas le droit de facturer une
            seconde fois. Vous pouvez en demander le remboursement, relevé à
            l&apos;appui.
          </p>
          <p className={`mt-4 ${para}`}>
            La banque doit aussi vous prévenir : les frais d&apos;incident
            figurent sur votre relevé au moins quatorze jours avant
            d&apos;être prélevés, et vous recevez chaque mois de janvier un
            récapitulatif de tous les frais payés l&apos;année précédente.
            C&apos;est le document à lire avant toute négociation.
          </p>
        </div>
      </section>

      <section id="fragile" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          L&apos;offre à {EUR.format(OCF.PRIX_MAX_MOIS)}{" "}par mois, pour les budgets fragiles
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: `${EUR.format(OCF.PRIX_MAX_MOIS)} / mois`, t: "Prix maximum", d: `Hors frais d'incident. En pratique, la moyenne constatée est de ${EUR2.format(OTB.OCF_MOYENNE_AN)} par an, et quelques établissements la proposent gratuitement.` },
            { v: `${EUR.format(OCF.PLAFOND_MOIS)} / mois`, t: "Plafond des frais d'incident", d: `Tous frais d'incident confondus, dans la limite de ${EUR.format(OCF.PLAFOND_AN)} par an.` },
            { v: `${EUR.format(OCF.PLAFOND_FRAGILE_SANS_OFFRE_MOIS)} / mois`, t: "Sans souscrire l'offre", d: "Plafond appliqué aux clients identifiés comme fragiles qui gardent leur compte habituel." },
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
            Toute banque doit proposer cette « offre spécifique » aux clients
            qu&apos;elle identifie comme étant en situation de fragilité
            financière. Elle comprend au moins dix services : la tenue du
            compte, une carte à autorisation systématique (le solde est
            vérifié à chaque paiement), les dépôts et retraits en agence,
            quatre virements par mois, des prélèvements en nombre illimité,
            deux chèques de banque par mois, la consultation du compte à
            distance, des alertes sur le solde. Le chéquier n&apos;en fait pas
            partie, et l&apos;autorisation de découvert en est très souvent
            exclue : c&apos;est le principe même de l&apos;offre.
          </p>
          <p className={`mt-4 ${para}`}>
            Les critères de fragilité sont fixés par décret : des ressources
            faibles associées à des incidents répétés pendant trois mois
            consécutifs ou à cinq incidents au moins sur un même mois, une
            inscription de plus de trois mois au fichier central des chèques,
            ou un dossier de surendettement recevable. Le seuil de ressources
            est défini par chaque banque.
          </p>
          <p className={`mt-4 ${para}`}>
            Vous n&apos;avez pas à attendre que la banque vous la propose. Les
            établissements membres de l&apos;Observatoire de l&apos;inclusion
            bancaire se sont engagés à l&apos;accorder à tout client qui
            s&apos;estime fragile et en fait la demande. Une demande écrite à
            votre conseiller suffit.
          </p>
        </div>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Les plafonds de {EUR.format(OCF.PLAFOND_MOIS)}{" "}et de{" "}
            {EUR.format(OCF.PLAFOND_FRAGILE_SANS_OFFRE_MOIS)}{" "}par mois
            reposent sur un engagement de la profession bancaire, repris dans
            une charte homologuée par arrêté, et non sur un article de loi.
            Les frais de saisie n&apos;y sont pas inclus.
          </p>
        </div>
      </section>

      <section id="prix" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Ce que coûte un compte en moyenne
        </h2>
        <p className={`mt-4 max-w-3xl ${para}`}>
          L&apos;Observatoire des tarifs bancaires, rattaché au Comité
          consultatif du secteur financier, relève chaque année les tarifs de
          102 établissements. Son rapport publié le 30 juin 2026 donne les
          prix moyens au 1er avril 2026, pondérés par le nombre de clients.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4 text-right">Prix moyen au 1er avril 2026</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Tenue de compte", `${EUR2.format(OTB.TENUE_COMPTE)} par an`],
                ["Carte à débit immédiat", `${EUR2.format(OTB.CARTE_IMMEDIAT)} par an`],
                ["Carte à débit différé", `${EUR2.format(OTB.CARTE_DIFFERE)} par an`],
                ["Carte à autorisation systématique", `${EUR2.format(OTB.CARTE_AUTORISATION)} par an`],
                ["Abonnement à la banque à distance", `${EUR2.format(OTB.BANQUE_A_DISTANCE)} par an`],
                ["Retrait dans une autre banque, après les retraits gratuits", `${EUR2.format(OTB.RETRAIT_PAYANT)} le retrait`],
                ["Virement occasionnel fait en agence", `${EUR2.format(OTB.VIREMENT_AGENCE)} le virement`],
                ["Commission d'intervention", `${EUR2.format(OTB.INTERVENTION_MOYENNE)} l'opération`],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 text-foreground">{k}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-semibold tabular-nums">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Source : Observatoire des tarifs bancaires, rapport 2026. Moyennes
          pondérées, hors offres groupées et hors promotions. Votre banque
          peut être très au-dessus ou très au-dessous.
        </p>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            Le socle, tenue de compte et carte à débit immédiat, revient donc
            à <strong>{EUR2.format(socle)}{" "}par an en moyenne</strong>. La
            tenue de compte est le poste qui monte le plus vite : le rapport
            relève une hausse de 3,71 % en trois mois, entre le 31 décembre
            2025 et le 1er avril 2026. À l&apos;inverse, la consultation du
            compte en ligne est devenue presque partout gratuite : 98
            établissements sur 102 ne la facturent pas.
          </p>
          <p className={`mt-4 ${para}`}>
            Les retraits au distributeur d&apos;une autre banque restent
            gratuits pour les premiers du mois, {OTB.RETRAITS_GRATUITS_MOIS.toLocaleString("fr-FR")}{" "}en
            moyenne, un chiffre en baisse. Au-delà, chaque retrait est
            facturé environ un euro.
          </p>
          <p className={`mt-4 ${para}`}>
            Sur l&apos;écart entre banques en ligne et banques à réseau, le
            rapport ne publie pas de moyenne séparée. Il donne deux
            décomptes : la tenue de compte est gratuite dans 10 établissements
            sur 102, dont 6 banques en ligne, et la carte à débit immédiat est
            gratuite dans 4 établissements, dont 3 banques en ligne. Il
            précise que trois de ces quatre établissements conditionnent
            cette gratuité à une utilisation minimale de la carte chaque
            mois. Une carte « gratuite » peut donc devenir payante si vous
            vous en servez peu : la condition figure dans la brochure
            tarifaire, pas dans la publicité.
          </p>
        </div>
      </section>

      <section id="reduire" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><LightbulbIcon className="w-4 h-4" /></IconBadge>
          Quatre leviers pour payer moins
        </h2>
        <ol className="mt-6 space-y-4">
          {[
            { t: "Lire le récapitulatif annuel de janvier", d: "Il additionne tout ce que vous avez payé l'année précédente, poste par poste. Deux lignes concentrent en général l'essentiel : la cotisation de l'offre groupée et les frais d'incident. C'est sur elles qu'il faut agir, pas sur les services à l'unité." },
            { t: "Sortir de l'offre groupée si elle ne sert à rien", d: "Les « packages » réunissent carte, assurance des moyens de paiement et services divers. Comparez leur prix à celui de la carte et de la tenue de compte prises séparément dans la brochure tarifaire de votre banque, qui est publique. La banque doit vous informer de toute hausse de tarif deux mois à l'avance, et vous pouvez alors résilier sans frais." },
            { t: "Demander l'offre spécifique si les incidents se répètent", d: `Elle coûte ${EUR.format(OCF.PRIX_MAX_MOIS)} par mois au plus et plafonne les frais d'incident à ${EUR.format(OCF.PLAFOND_MOIS)} par mois. Pour un compte qui subit plusieurs rejets par mois, l'économie se compte en centaines d'euros par an. La contrepartie : pas de chéquier, et le plus souvent pas de découvert autorisé.` },
            { t: "Changer de banque, sans frais ni démarches", d: "La mobilité bancaire est un service gratuit prévu par la loi : vous signez un mandat auprès de la nouvelle banque, qui récupère la liste de vos prélèvements et virements réguliers et prévient vos créanciers. Les deux banques ont 22 jours ouvrés pour finir le transfert, et la clôture de l'ancien compte est gratuite." },
          ].map((e, i) => (
            <li key={e.t} className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-md">
              <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
              <div>
                <p className="font-semibold text-foreground">{e.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{e.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            Avant de choisir une banque moins chère, vérifiez trois points
            dans sa brochure tarifaire : les conditions de la gratuité de la
            carte (utilisation minimale, revenu ou versement exigé), le prix
            des opérations que vous faites réellement (retraits, virements,
            chèques, dépôt d&apos;espèces) et les frais d&apos;incident, qui
            sont plafonnés partout mais ne sont pas partout au plafond. Une
            banque sans agence ne convient pas à qui dépose souvent des
            espèces ou des chèques.
          </p>
          <p className={`mt-4 ${para}`}>
            Si une banque refuse de vous ouvrir un compte, la{" "}
            <strong>procédure du droit au compte</strong>{" "}s&apos;applique :
            avec la lettre de refus, ou après quinze jours sans réponse, vous
            saisissez la Banque de France, qui désigne sous un jour ouvré un
            établissement tenu d&apos;ouvrir le compte. Les services
            bancaires de base y sont gratuits.
          </p>
        </div>
      </section>

      <section id="succession" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Deux changements de 2026 à connaître
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className={card}>
            <p className="font-semibold text-foreground">Frais de succession : le plafond reste, la gratuité tombe</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Depuis le 13 novembre 2025, les frais prélevés par une banque
              sur les comptes d&apos;une personne décédée ne peuvent pas
              dépasser 1 % des avoirs, dans la limite de{" "}
              {EUR.format(SUCCESSION_PLAFOND)}{" "}en 2026, montant revalorisé
              chaque 1er janvier. La même loi prévoyait la gratuité pour les
              défunts mineurs, les petits avoirs et les successions simples :
              le Conseil constitutionnel a censuré ces trois cas, et depuis le
              20 juin 2026 les banques ne sont plus obligées de les
              appliquer. Les plans d&apos;épargne en actions et les
              comptes-titres ne sont pas couverts par le plafond.
            </p>
          </div>
          <div className={card}>
            <p className="font-semibold text-foreground">Découvert : un crédit à la consommation depuis le 20 novembre</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Toutes les autorisations de découvert accordées à partir du
              20 novembre 2026 sont soumises aux règles du crédit à la
              consommation, quels que soient leur montant et leur durée. La
              banque doit donc vérifier votre capacité à rembourser avant de
              l&apos;accorder. Les autorisations plus anciennes ne sont pas
              remises en cause par cette date ; la fiche Service-Public citée
              en source détaille les cas.
            </p>
          </div>
        </div>
      </section>

      <GuideCta
        accent
        titre="Le reste de ton budget 2027"
        intro="Les frais bancaires ne sont qu'une ligne. Les montants qui changent au 1er janvier pèsent davantage."
        liens={[
          { href: "/guides/ce-qui-change-1er-janvier-2027", label: "Ce qui change au 1er janvier", desc: "SMIC, retraites, impôt, aides : le récapitulatif", icon: <CompassIcon className="h-4 w-4" /> },
          { href: "/guides/revalorisation-retraites-2027", label: "Retraites 2027", desc: "Le taux de revalorisation et qui est concerné", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/compte-bancaire-auto-entrepreneur", label: "Compte d'auto-entrepreneur", desc: "Obligatoire ou non, et lequel choisir", icon: <ScaleIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
