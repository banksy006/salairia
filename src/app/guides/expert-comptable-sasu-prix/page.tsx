import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import { IconBadge, CalculatorIcon, ScaleIcon, InfoIcon, ReceiptIcon, AlertTriangleIcon, TargetIcon, CompassIcon, PercentIcon } from "@/components/icons";
import { calculerStatut, TJM_2026 } from "@/lib/calculators/tjm-freelance";

// Cas type : consultant à 550 €/j sur 18 jours, 150 €/mois de frais pro,
// toute la marge versée en rémunération (calcul SASU du simulateur TJM).
// Les honoraires comptables sont déductibles : on les fait varier en
// ajustant les frais pro, ce qui reproduit exactement la formule du
// calculateur (résultat = CA − frais pro − frais de comptabilité).
const TJM = 550;
const JOURS = 18;
const FRAIS_PRO = 150;
const netSasu = (honorairesAnnuels: number) =>
  calculerStatut("sasu", {
    tjm: TJM,
    joursTravailles: JOURS,
    fraisProMensuels: FRAIS_PRO + (honorairesAnnuels - TJM_2026.SASU_FRAIS_COMPTA_ANNUEL) / 12,
    tauxPAS: 0,
  }).netMensuel;

// Tarifs publics relevés le 12 novembre 2026 (pages citées en source).
const KEOBIZ_MIN = 79;
const KEOBIZ_MAX = 179;
const KEOBIZ_PAIE_MANDATAIRE = 15;
const LEC_FREELANCE = 69;
const LEC_COMMERCE = 109;
const CABINET_ANNUEL_MIN = 1_200;

const scenarios = [
  { label: "Tu tiens ta compta seul", annuel: 0, detail: "Logiciel non compté" },
  { label: `Offre en ligne d'entrée (${KEOBIZ_MIN} € HT/mois)`, annuel: KEOBIZ_MIN * 12, detail: "Hors paie du dirigeant" },
  { label: `Même offre + paie du président (${KEOBIZ_PAIE_MANDATAIRE} € HT/mois)`, annuel: (KEOBIZ_MIN + KEOBIZ_PAIE_MANDATAIRE) * 12, detail: "Cas d'un président rémunéré" },
  { label: "Hypothèse de nos simulateurs", annuel: TJM_2026.SASU_FRAIS_COMPTA_ANNUEL, detail: "1 500 € par an" },
  { label: `Offre en ligne haut de gamme (${KEOBIZ_MAX} € HT/mois)`, annuel: KEOBIZ_MAX * 12, detail: "Dépôt des comptes inclus" },
  { label: "Cabinet de proximité, dossier plus lourd", annuel: 3_000, detail: "Ordre de grandeur" },
].map((s) => ({ ...s, net: netSasu(s.annuel) }));

const netSansCompta = scenarios[0].net;
const coutNetHypothese = (netSansCompta - netSasu(TJM_2026.SASU_FRAIS_COMPTA_ANNUEL)) * 12;
const partNette = coutNetHypothese / TJM_2026.SASU_FRAIS_COMPTA_ANNUEL;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

// Landing partenaire Keobiz (Affilae, partenariat accepté le 30 oct. 2026) :
// elle porte le suivi et le mois d'honoraires offert aux clients recommandés.
const LIEN_KEOBIZ = "https://www.keobiz.fr/programme-affiliation-keobiz-2/?utm_campaign=affilie940&utm_medium=lp&utm_source=affilie&ae=940";

const meta: GuideMeta = {
  slug: "expert-comptable-sasu-prix",
  titre: "Expert-comptable pour une SASU : combien ça coûte vraiment",
  sousTitre: `De ${KEOBIZ_MIN} à plus de ${KEOBIZ_MAX} € HT par mois, et ce que ça retire réellement de ton net`,
  chapo: `Un expert-comptable n'est pas obligatoire pour une SASU, mais presque tous les présidents en prennent un. Les offres en ligne démarrent autour de ${LEC_FREELANCE} à ${KEOBIZ_MIN} € HT par mois, les cabinets de proximité à partir de ${EUR.format(CABINET_ANNUEL_MIN)} par an. Comme les honoraires sont déductibles, leur coût réel sur ton revenu est plus faible que le prix affiché : sur notre cas type, ${EUR.format(TJM_2026.SASU_FRAIS_COMPTA_ANNUEL)} d'honoraires annuels retirent environ ${EUR.format(coutNetHypothese)} de ton net. Voici les obligations réelles, les prix publics et le calcul.`,
  filAriane: "Expert-comptable SASU",
  datePublished: "2026-11-12",
  dateModified: "2026-11-12",
  tocItems: [
    { id: "obligatoire", label: "Est-ce obligatoire ?" },
    { id: "prix", label: "Les prix publics" },
    { id: "net", label: "Le coût sur ton net" },
    { id: "seul", label: "Seul ou accompagné" },
    { id: "choisir", label: "Bien choisir" },
  ],
  faq: [
    {
      q: "Un expert-comptable est-il obligatoire pour une SASU ?",
      r: "Non. Service-Public le dit sans ambiguïté : la société peut tenir elle-même sa comptabilité. En revanche, si elle la confie à un professionnel, ce doit être un expert-comptable inscrit au tableau de l'ordre. Les obligations, elles, ne disparaissent pas : tenue d'une comptabilité, comptes annuels, approbation, dépôt au greffe, liasse fiscale et déclarations de TVA.",
    },
    {
      q: "Combien coûte un expert-comptable en ligne pour une SASU ?",
      r: `Les offres publiques relevées le 12 novembre 2026 démarrent à ${LEC_FREELANCE} € HT par mois chez L-Expert-Comptable (formule consultants et freelances) et à ${KEOBIZ_MIN} € HT par mois chez Keobiz, jusqu'à ${KEOBIZ_MAX} € HT pour les formules les plus complètes. La paie du président est souvent facturée à part : ${KEOBIZ_PAIE_MANDATAIRE} € HT par mois chez Keobiz pour un bulletin mensuel au plus.`,
    },
    {
      q: "Les honoraires d'expert-comptable sont-ils déductibles ?",
      r: `Oui, ce sont des charges de la société. Ils réduisent le résultat, donc la rémunération ou les dividendes que tu peux te verser, mais aussi les cotisations et l'impôt correspondants. Sur notre cas type, chaque euro d'honoraires ne te coûte qu'environ ${Math.round(partNette * 100)} centimes de net.`,
    },
    {
      q: "Quels documents une SASU doit-elle déposer chaque année ?",
      r: "Le bilan, le compte de résultat et, sauf dispense des micro-entreprises, une annexe, avec la décision d'affectation du résultat. Le dépôt se fait au greffe dans le mois qui suit l'approbation, ou dans les deux mois en cas de dépôt électronique. L'associé unique qui préside seul n'a pas à déposer la décision d'approbation. Une petite entreprise peut demander la confidentialité de son compte de résultat.",
    },
    {
      q: "Peut-on changer d'expert-comptable en cours d'année ?",
      r: "Oui. La lettre de mission fixe un préavis, souvent de trois mois, et le nouveau cabinet se charge généralement de la reprise du dossier avec l'ancien. Le moment le plus simple reste la clôture de l'exercice : le nouveau cabinet démarre sur un exercice vierge.",
    },
  ],
  sources: [
    { label: "Service-Public Entreprendre — obligations comptables d'une société commerciale (vérifié le 7 septembre 2026)", href: "https://entreprendre.service-public.gouv.fr/vosdroits/F37169" },
    { label: "Service-Public Entreprendre — dépôt des comptes annuels d'une société", href: "https://entreprendre.service-public.gouv.fr/vosdroits/F31214" },
    { label: "Keobiz — tarifs publics (relevés le 12 novembre 2026)", href: "https://www.keobiz.fr/nos-tarifs/" },
    { label: "L-Expert-Comptable — tarifs publics (relevés le 12 novembre 2026)", href: "https://www.l-expert-comptable.com/tarifs.html" },
    { label: "LegalPlace — coût d'un comptable (mis à jour le 17 juin 2026)", href: "https://www.legalplace.fr/guides/cout-comptable/" },
  ],
};

export const metadata: Metadata = {
  title: "Expert-comptable SASU : prix 2026 et coût réel sur ton net",
  description: `Prix d'un expert-comptable pour une SASU : de ${LEC_FREELANCE} à ${KEOBIZ_MAX} € HT par mois en ligne, ${EUR.format(CABINET_ANNUEL_MIN)} par an et plus en cabinet. Obligations officielles, coût réel après déduction calculé par notre simulateur, et quand faire seul.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Expert-comptable pour une SASU : combien ça coûte vraiment",
    description: "Les prix publics, les obligations officielles et le coût réel sur ton revenu.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Avant de choisir ton comptable"
        intro="Le statut et la rémunération pèsent bien plus lourd que les honoraires. Trois outils pour les chiffrer."
        liens={[
          { href: "/simulateurs/sasu-eurl", label: "SASU ou EURL ?", desc: "Les deux statuts sur les mêmes chiffres", icon: <ScaleIcon className="h-4 w-4" /> },
          { href: "/simulateurs/tjm-freelance", label: "Ton net selon ton TJM", desc: "Micro, portage, SASU, EURL", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/dividendes-sasu-ou-salaire", label: "Salaire ou dividendes", desc: "L'arbitrage du président, chiffré", icon: <PercentIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="obligatoire" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Un expert-comptable est-il obligatoire ?
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Non. La règle est posée par Service-Public : une société
            commerciale <strong>peut tenir elle-même sa comptabilité</strong>.
            Ce n&apos;est que si elle la confie à un professionnel qu&apos;elle
            doit s&apos;adresser à un expert-comptable inscrit au tableau de
            l&apos;ordre. Aucun texte n&apos;impose donc un cabinet au
            président d&apos;une SASU.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Ce qui est obligatoire, en revanche, c&apos;est le travail
            lui-même. Une SASU doit :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3"><span aria-hidden className="text-primary">1.</span><span><strong>tenir une comptabilité</strong> d&apos;engagement, avec livre-journal et grand-livre, simplifiée si elle relève du régime réel simplifié ;</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">2.</span><span><strong>établir chaque année ses comptes</strong> : bilan, compte de résultat et annexe. Les micro-entreprises au sens comptable sont dispensées d&apos;annexe ;</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">3.</span><span><strong>faire approuver les comptes</strong> par l&apos;associé unique, en pratique dans les six mois suivant la clôture ;</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">4.</span><span><strong>les déposer au greffe</strong> dans le mois qui suit l&apos;approbation, ou deux mois en dépôt électronique, sous peine d&apos;une amende pénale de 1 500 € ;</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">5.</span><span><strong>produire la liasse fiscale</strong> et la déclaration d&apos;impôt sur les sociétés, déclarer la TVA et, si tu te rémunères, établir la paie du président et ses déclarations sociales ;</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">6.</span><span><strong>conserver les pièces</strong> au moins dix ans à compter de la clôture.</span></li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            C&apos;est cette liste, et non une obligation légale, qui pousse la
            grande majorité des présidents de SASU vers un cabinet. La question
            n&apos;est pas « suis-je obligé ? » mais « combien vaut mon temps sur
            ces six tâches, et combien me coûte une erreur ? ».
          </p>
        </div>
      </section>

      <section id="prix" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Les prix publics, relevés le 12 novembre 2026
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les honoraires d&apos;expert-comptable ne sont pas réglementés.
          Quelques cabinets en ligne publient leur grille ; la plupart des
          cabinets traditionnels chiffrent sur devis. Voici ce qui est affiché
          publiquement, sans négociation.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Acteur et formule</th>
                <th className="px-5 py-4 text-right">Prix affiché</th>
                <th className="px-5 py-4">Ce qu&apos;il faut savoir</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["L-Expert-Comptable, consultants et freelances", `dès ${LEC_FREELANCE} € HT/mois`, "Formule d'entrée en ligne. La formule commerçants à 109 € HT mentionne explicitement la liasse IS et la CFE : vérifie ce que couvre la tienne."],
                ["L-Expert-Comptable, commerçants et BTP", `dès ${LEC_COMMERCE} € HT/mois`, "Inclut liasse fiscale, solde d'IS et CFE."],
                ["Keobiz, formules d'entrée", `dès ${KEOBIZ_MIN} € HT/mois`, "Bilan validé par un expert-comptable, liasse et TVA télédéclarées. La page d'accueil annonce « dès 89 € » pour les sociétés : demande le prix exact pour ta SASU."],
                ["Keobiz, formules complètes", `dès ${KEOBIZ_MAX} € HT/mois`, "Dépôt des comptes au greffe inclus à partir de la formule Plus."],
                ["Keobiz, paie du président", `${KEOBIZ_PAIE_MANDATAIRE} € HT/mois`, "Option pour 0 à 1 bulletin par mois, en plus de la formule comptable."],
                ["Cabinet de proximité (ordre de grandeur LegalPlace)", `dès ${EUR.format(CABINET_ANNUEL_MIN)}/an`, "Pour une TPE, sur devis. Jusqu'à 5 000 € par an pour un dossier plus lourd."],
              ].map(([a, p, n]) => (
                <tr key={a} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{a}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-bold tabular-nums text-foreground">{p}</td>
                  <td className="px-5 py-3 text-foreground/80">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Prix « à partir de », hors taxes, relevés sur les pages tarifs
          publiques citées en source. Ils évoluent et dépendent du volume
          d&apos;opérations, du régime de TVA et des options : seul un devis
          sur ton dossier fait foi.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Trois postes font varier la facture plus que la formule elle-même :
          le <strong>nombre de pièces</strong> à traiter chaque mois, le{" "}
          <strong>régime de TVA</strong> (mensuel, trimestriel ou franchise) et
          la <strong>paie du président</strong>, souvent facturée à part. Un
          consultant qui émet trois factures par mois et paie peu de frais
          reste dans les formules d&apos;entrée ; une activité avec stock,
          salariés ou nombreux achats n&apos;y tient pas.
        </p>
      </section>

      <section id="net" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Ce que les honoraires retirent vraiment de ton net
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le prix affiché n&apos;est pas ce que tu paies de ta poche. Les
          honoraires sont une charge de la société : ils réduisent le résultat,
          donc la rémunération que tu peux te verser, mais aussi les
          cotisations qui s&apos;appliquent dessus. Calcul sur notre cas type :
          un consultant à {TJM} € par jour sur {JOURS} jours par mois, avec{" "}
          {FRAIS_PRO} € de frais professionnels mensuels, qui se verse tout le
          résultat en rémunération.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Comptabilité</th>
                <th className="px-5 py-4 text-right">Honoraires annuels</th>
                <th className="px-5 py-4 text-right">Net mensuel</th>
                <th className="px-5 py-4 text-right">Écart vs seul</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr key={s.label} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3">
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="block text-xs text-muted-foreground">{s.detail}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums text-muted-foreground">{EUR.format(s.annuel)}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right text-lg font-bold tabular-nums">{EUR.format(s.net)}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums text-muted-foreground">
                    {s.annuel === 0 ? "—" : `− ${EUR.format(netSansCompta - s.net)}/mois`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Calcul du simulateur TJM, statut SASU, taux 2026 indicatifs (charges
          patronales 42 %, salariales 22 %), net avant impôt sur le revenu,
          sans dividendes. Le temps passé à tenir la comptabilité seul et le
          prix d&apos;un logiciel ne sont pas comptés dans la première ligne.
        </p>
        <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Le chiffre à retenir</p>
          <p className="mt-2 text-3xl font-bold tabular-nums sm:text-4xl">
            {EUR.format(TJM_2026.SASU_FRAIS_COMPTA_ANNUEL)} d&apos;honoraires ≈ {EUR.format(coutNetHypothese)} de net en moins
          </p>
          <p className="mt-3 text-base opacity-90">
            Sur ce cas type, chaque euro d&apos;honoraires ne te coûte
            qu&apos;environ {Math.round(partNette * 100)} centimes de net : le
            reste aurait de toute façon été absorbé par les cotisations.
          </p>
        </div>
      </section>

      <section id="seul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Faire seul ou se faire accompagner
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Faire seul tient la route si…</p>
            <ul className="mt-3 space-y-2 text-base leading-relaxed text-foreground/80">
              <li>tu as peu d&apos;opérations : quelques factures et quelques achats par mois ;</li>
              <li>tu ne te verses pas de salaire, donc pas de paie ni de déclarations sociales ;</li>
              <li>tu as une formation en gestion ou un logiciel qui produit la liasse fiscale ;</li>
              <li>tu acceptes de consacrer plusieurs jours par an à la clôture.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Un cabinet devient rentable si…</p>
            <ul className="mt-3 space-y-2 text-base leading-relaxed text-foreground/80">
              <li>tu te rémunères en salaire : la paie du président suppose des déclarations mensuelles ou trimestrielles ;</li>
              <li>tu arbitres entre salaire et dividendes, un choix qui pèse des milliers d&apos;euros par an ;</li>
              <li>tu factures à {TJM} € par jour : deux jours de clôture faits seul valent déjà plus d&apos;un an d&apos;offre d&apos;entrée ;</li>
              <li>tu veux un interlocuteur en cas de contrôle fiscal ou Urssaf.</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le calcul du temps est souvent décisif. À {TJM} € par jour, deux
          journées de clôture représentent {EUR.format(TJM * 2)}{" "}de chiffre
          d&apos;affaires non facturé, soit plus qu&apos;une année entière de
          formule d&apos;entrée en ligne ({EUR.format(KEOBIZ_MIN * 12)}{" "}HT).
          Faire seul est surtout pertinent au démarrage, quand l&apos;activité
          est faible et que chaque euro de trésorerie compte.
        </p>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Le régime de la micro-entreprise n&apos;a rien à voir : un
            micro-entrepreneur n&apos;établit ni bilan ni liasse, et un
            expert-comptable lui est rarement utile. Si tu hésites encore sur
            le statut, compare d&apos;abord avec notre{" "}
            <Link href="/simulateurs/tjm-freelance" className="font-semibold underline underline-offset-4">simulateur TJM</Link>.
          </p>
        </div>
      </section>

      <section id="choisir" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Bien choisir : cinq questions à poser avant de signer
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3"><span aria-hidden className="text-primary">1.</span><span><strong>Le dépôt des comptes au greffe est-il inclus</strong>, frais de greffe compris ? Chez plusieurs cabinets en ligne, il ne l&apos;est que dans les formules supérieures.</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">2.</span><span><strong>La paie du président est-elle comprise ?</strong> Sinon, combien par bulletin, et à quelle fréquence ?</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">3.</span><span><strong>Combien de pièces par mois</strong> la formule couvre-t-elle, et que coûte le dépassement ?</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">4.</span><span><strong>Qui est ton interlocuteur</strong> : un expert-comptable nommé, ou une équipe tournante ? Peut-il te conseiller sur l&apos;arbitrage salaire et dividendes ?</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">5.</span><span><strong>Quelle durée d&apos;engagement et quel préavis</strong> figurent dans la lettre de mission ?</span></li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Compare ensuite le prix annuel tout compris, pas le tarif mensuel
            d&apos;appel : bilan, liasse, TVA, paie, dépôt et options.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lien partenaire</p>
          <p className="mt-2 text-lg font-bold text-foreground">Demander un devis à Keobiz</p>
          <p className="mt-2 text-base leading-relaxed text-foreground/80">
            Keobiz publie ses tarifs, propose des formules pour les SASU et
            offre un mois d&apos;honoraires aux clients qui passent par ce lien.
            Salairia peut être rémunéré si tu deviens client, sans surcoût pour
            toi. Cela ne change rien à l&apos;analyse ci-dessus : compare
            plusieurs devis avec les cinq questions avant de signer.
          </p>
          <a
            href={LIEN_KEOBIZ}
            target="_blank"
            rel="sponsored noopener noreferrer"
            data-partenaire="Keobiz"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
          >
            Obtenir un devis Keobiz
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <GuideCta
        titre="Pas encore en société ?"
        intro="Avant de payer un expert-comptable, vérifie que la SASU est le bon statut pour ton activité."
        accent
        liens={[
          { href: "/simulateurs/salarie-ou-freelance", label: "Salarié ou freelance ?", desc: "Même net, deux statuts comparés", icon: <CompassIcon className="h-4 w-4" /> },
          { href: "/comparateurs/portage-salarial", label: "Comparer le portage", desc: "Sans comptabilité à tenir, 10 sociétés", icon: <ScaleIcon className="h-4 w-4" /> },
          { href: "/comparateurs/banques-pro", label: "Choisir un compte pro", desc: "Indispensable pour ta SASU", icon: <ReceiptIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
