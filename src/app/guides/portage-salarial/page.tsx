import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ShieldIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  RocketIcon,
  BriefcaseIcon,
  AlertTriangleIcon,
  ScaleIcon,
  CompassIcon,
  InfoIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Portage salarial : le guide complet 2026 | Salairia",
  description:
    "Tout savoir sur le portage salarial en 2026 : fonctionnement, salaire, avantages, inconvénients, cotisations, chômage. Guide indépendant + simulateur gratuit.",
  alternates: {
    canonical: "/guides/portage-salarial",
  },
  openGraph: {
    title: "Portage salarial : le guide complet 2026 | Salairia",
    description:
      "Tout savoir sur le portage salarial en 2026 : fonctionnement, salaire, avantages, inconvénients, cotisations, chômage.",
    url: "/guides/portage-salarial",
  },
};

const faq = [
  {
    q: "Le portage salarial est-il fait pour moi ?",
    r: "Si vous êtes consultant, formateur ou expert avec un TJM supérieur à 300 €/jour et que vous souhaitez bénéficier de la sécurité du salariat (chômage, retraite, mutuelle) sans créer de société, le portage est probablement adapté. Si votre CA est inférieur à 3 000 €/mois, l'auto-entreprise sera plus avantageuse financièrement.",
  },
  {
    q: "Combien coûte le portage salarial ?",
    r: "Les frais de gestion varient de 5 à 10 % du CA selon la société. En ajoutant les cotisations sociales (~45 %), vous conservez environ 45-55 % de votre chiffre d'affaires en salaire net. Pour un TJM de 500 €, cela représente environ 3 700 € net mensuel.",
  },
  {
    q: "Le portage salarial donne-t-il droit au chômage ?",
    r: "Oui. En tant que salarié porté en CDI, vous cotisez à l'assurance chômage. En cas de rupture conventionnelle ou de fin de mission prolongée, vous pouvez bénéficier de l'ARE dans les mêmes conditions qu'un salarié classique.",
  },
  {
    q: "Peut-on cumuler portage salarial et auto-entreprise ?",
    r: "Oui, à condition que les deux activités soient différentes. Vous ne pouvez pas facturer le même client via les deux statuts. Le cumul est courant chez les consultants qui ont une activité principale en portage et une activité secondaire en micro-entreprise.",
  },
  {
    q: "Le CDI en portage permet-il d'obtenir un crédit immobilier ?",
    r: "Oui, c'est l'un des arguments majeurs du portage. Les banques reconnaissent le CDI en portage salarial. Vos bulletins de paie réguliers et votre stabilité contractuelle facilitent l'accès au crédit, ce qui est beaucoup plus difficile en auto-entreprise ou en SASU.",
  },
  {
    q: "Quelle est la différence entre portage salarial et intérim ?",
    r: "En intérim, c'est l'agence qui vous trouve des missions et qui fixe les conditions. En portage salarial, c'est vous qui trouvez vos clients, négociez vos tarifs et choisissez vos missions. La société de portage ne gère que l'administratif et la paie.",
  },
  {
    q: "Faut-il un diplôme pour le portage salarial ?",
    r: "La convention collective exige un niveau Bac+2 minimum ou 3 ans d'expérience significative dans votre secteur d'activité. Cette condition vise à garantir que le salarié porté a l'autonomie nécessaire pour trouver et mener ses missions.",
  },
  {
    q: "Le portage salarial existe-t-il à l'international ?",
    r: "Oui. Certaines sociétés de portage (comme Ad'missions ou ITG) accompagnent les consultants sur des missions à l'étranger. La facturation se fait via la société française, et le consultant conserve sa protection sociale française. Les modalités varient selon le pays et la durée de la mission.",
  },
  {
    q: "Combien de temps pour devenir salarié porté ?",
    r: "Le délai moyen entre la prise de contact avec une société de portage et la signature du contrat de travail se situe entre 48 heures et 2 semaines. Il dépend de la rapidité à réunir votre dossier (pièce d'identité, diplômes, RIB, justificatif de domicile) et de la disponibilité de la société. Certaines sociétés proposent une signature 100 % en ligne sous 48 heures ; d'autres imposent un entretien préalable.",
  },
  {
    q: "Quel contrat choisir entre CDI et CDD en portage ?",
    r: "Le CDI s'impose dans la grande majorité des cas : carrière pérenne, accès au crédit immobilier, continuité des droits au chômage. Le CDD reste pertinent pour une mission unique de moins de 18 mois sans intention de poursuivre, ou pour tester le statut avant un autre choix. La plupart des sociétés de portage proposent spontanément un CDI, même pour une première mission courte.",
  },
  {
    q: "Quelle est la durée maximale d'un CDD en portage salarial ?",
    r: "La durée maximale d'un CDD en portage salarial est de 18 mois, renouvellement compris, selon l'article L1254-12 du Code du travail. L'article L1254-13 autorise une dérogation de 3 mois supplémentaires pour permettre au salarié porté de décrocher une nouvelle mission, soit 21 mois maximum. Il n'existe pas de dérogation à 36 mois, contrairement à ce qu'on lit parfois.",
  },
  {
    q: "Comment fonctionne le détachement en portage salarial ?",
    r: "Le détachement permet au salarié porté d'exercer à l'étranger tout en restant affilié au régime français de sécurité sociale. La société de portage demande un certificat A1 (UE, EEE ou Suisse) ou un certificat de mobilité internationale (pays à accord bilatéral) à l'URSSAF via le service ILASS. Le détachement est limité à 24 mois en UE, renouvelable sous conditions. Pendant la mission, vous continuez à cotiser en France (retraite, chômage, assurance maladie).",
  },
];

const sourcesLinks = [
  { label: "service-public.fr — portage salarial", href: "https://www.service-public.fr" },
  { label: "Legifrance — ordonnance du 2 avril 2015", href: "https://www.legifrance.gouv.fr" },
  { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
  { label: "Code du travail — articles L1254-1 à L1254-31 (portage)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
  { label: "URSSAF — cotisations sociales", href: "https://www.urssaf.fr" },
  { label: "URSSAF — service mobilité internationale (ILASS)", href: "https://www.urssaf.fr/accueil/services/travail-etranger-mobilite.html" },
  { label: "CLEISS — accords bilatéraux de sécurité sociale", href: "https://www.cleiss.fr" },
  { label: "CFE — Caisse des Français de l'Étranger", href: "https://www.cfe.fr" },
  { label: "PEPS — syndicat professionnel du portage", href: "https://www.peps-syndicat.fr" },
  { label: "INSEE — données marché du portage salarial", href: "https://www.insee.fr" },
];

const tocItems = [
  { id: "definition", label: "Définition" },
  { id: "fonctionnement", label: "Fonctionnement" },
  { id: "lancement", label: "Se lancer" },
  { id: "avantages", label: "Avantages" },
  { id: "inconvenients", label: "Inconvénients" },
  { id: "salaire", label: "Salaire" },
  { id: "cotisations", label: "Cotisations" },
  { id: "contrats", label: "CDI vs CDD" },
  { id: "chomage", label: "Chômage et ARE" },
  { id: "eligibilite", label: "Éligibilité" },
  { id: "comparatif", label: "vs autres statuts" },
  { id: "choisir", label: "Choisir sa société" },
  { id: "simuler", label: "Simuler" },
  { id: "international", label: "International" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function GuidePortageSalarialPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Portage salarial : le guide complet 2026",
      description: "Tout savoir sur le portage salarial en 2026 : fonctionnement, salaire, avantages, inconvénients, cotisations, chômage.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: `${SITE_URL}` },
      datePublished: "2026-04-17",
      dateModified: "2026-04-23",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/guides/portage-salarial`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: "Portage salarial", item: `${SITE_URL}/guides/portage-salarial` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Hero */}
        <section>
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
            <Link href="/" className="transition hover:text-primary">Accueil</Link>
            <span aria-hidden>›</span>
            <Link href="/guides" className="transition hover:text-primary">Guides</Link>
            <span aria-hidden>›</span>
            <span className="text-foreground">Portage salarial</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="h-3.5 w-3.5" />
            À jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Portage salarial : le guide complet 2026
          </h1>
          <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            Fonctionnement, salaire, avantages et simulation
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              Le portage salarial permet à un professionnel indépendant de
              facturer ses clients tout en bénéficiant du statut de salarié :
              protection sociale complète, droit au chômage, bulletins de paie.
              Le secteur connaît une forte croissance — la fédération
              professionnelle PEPS, qui revendique environ 80 % du marché,
              fédère à elle seule autour de 50 000 consultants adhérents. Ce
              guide couvre tout ce que vous devez savoir pour décider si le
              portage est adapté à votre situation.
            </p>
            <p className="text-sm text-muted-foreground">
              ⏱ Lecture : 12 min · Données vérifiées sur les{" "}
              <Link href="/methodologie" className="text-primary hover:underline">
                sources officielles
              </Link>
            </p>
          </div>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">

            {/* 1. Définition */}
            <section id="definition" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Qu&apos;est-ce que le portage salarial ?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Le portage salarial est une relation contractuelle <strong>tripartite</strong> entre
                  un consultant indépendant, une société de portage et une entreprise cliente.
                  Le consultant trouve ses missions et négocie ses tarifs librement. La société de
                  portage l&apos;embauche en CDI ou CDD, facture le client, et lui reverse un salaire
                  après déduction des frais de gestion et des cotisations sociales.
                </p>
                <p>
                  Ce statut est encadré par le Code du travail depuis l&apos;ordonnance du 2 avril 2015
                  et la convention collective du 22 mars 2017 (IDCC 3219).
                </p>
              </div>

              {/* Schéma tripartite */}
              <div className="mt-8 rounded-xl bg-muted/30 p-6 sm:p-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                  <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border-2 border-primary bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-primary">Consultant</span>
                    <span className="mt-1 text-xs text-muted-foreground">Trouve les missions</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="hidden sm:block">←</span>
                    <span>Contrat de travail (CDI)</span>
                    <span>Convention de portage</span>
                    <span className="hidden sm:block">→</span>
                  </div>
                  <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border-2 border-accent bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-accent">Société de portage</span>
                    <span className="mt-1 text-xs text-muted-foreground">Facture et paie</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                    <span className="hidden sm:block">←</span>
                    <span>Contrat commercial</span>
                    <span className="hidden sm:block">→</span>
                  </div>
                  <div className="flex h-28 w-44 flex-col items-center justify-center rounded-xl border-2 border-border bg-white p-4 text-center shadow-sm">
                    <span className="text-sm font-bold text-foreground">Entreprise cliente</span>
                    <span className="mt-1 text-xs text-muted-foreground">Reçoit la prestation</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Fonctionnement */}
            <section id="fonctionnement" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Comment fonctionne le portage salarial ?
              </h2>
              <p className="mt-2 text-base text-muted-foreground">Le processus en 5 étapes.</p>

              <ol className="mt-8 flex flex-col gap-0">
                {[
                  { t: "Vous trouvez une mission", d: "Vous prospectez et négociez directement avec votre client (TJM, durée, conditions). La société de portage n'intervient pas dans la recherche." },
                  { t: "La société de portage contractualise", d: "Elle signe un contrat commercial avec votre client et un contrat de travail (CDI ou CDD) avec vous." },
                  { t: "Vous réalisez votre mission", d: "Vous travaillez en autonomie chez le client. Vous remplissez un compte-rendu d'activité mensuel (CRA)." },
                  { t: "La société facture et encaisse", d: "Elle émet la facture au client, gère les relances et le recouvrement." },
                  { t: "Vous recevez votre salaire", d: "Après déduction des frais de gestion (5-10 % du CA) et des cotisations sociales (~45 % du restant), la société vous verse un salaire net chaque mois." },
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 border-l-2 border-primary pb-8 pl-6 last:border-l-0 last:pb-0">
                    <div className="-ml-9 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{step.t}</h3>
                      <p className="mt-1 text-base leading-relaxed text-foreground/80">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* 3. Se lancer en portage */}
            <section id="lancement" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><RocketIcon className="h-4 w-4" /></IconBadge>
                Les étapes pour se lancer en portage salarial
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Devenir salarié porté prend en général <strong>entre 48 heures et deux semaines</strong>,
                selon la société choisie et la complexité de la première mission. Le parcours est encadré
                par la convention collective de branche (IDCC 3219) et les articles L1254-1 à L1254-31 du
                Code du travail. Chaque étape répond à un cadre juridique précis.
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    1. Vérifier que votre profil est éligible
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Le portage salarial est réservé aux <strong>prestations intellectuelles</strong> :
                    conseil, expertise, formation, management de transition, développement informatique.
                    La convention collective impose un niveau Bac+2 minimum ou 3 ans d&apos;expérience
                    significative dans le domaine de la mission. Les activités commerciales, artisanales
                    ou relevant des professions réglementées (avocat, médecin, architecte) sont exclues.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Avant de vous lancer, trois questions à trancher :
                  </p>
                  <ul className="mt-3 space-y-2 text-base text-foreground/80">
                    <li>• <strong>Quel TJM pouvez-vous défendre sur le marché ?</strong> En dessous de 250 €/jour, le portage devient rarement viable économiquement — utilisez <Link href="/simulateurs/portage-salarial" className="text-primary hover:underline">notre simulateur portage</Link> pour vérifier.</li>
                    <li>• <strong>Avez-vous une mission identifiée ou des pistes sérieuses ?</strong> La société de portage ne prospecte pas à votre place.</li>
                    <li>• <strong>Quelle est votre priorité ?</strong> Le portage excelle sur la simplicité administrative et le droit au chômage ; l&apos;<Link href="/simulateurs/auto-entrepreneur" className="text-primary hover:underline">auto-entreprise</Link> sur l&apos;optimisation du revenu net.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    2. Choisir votre société de portage
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Une cinquantaine de sociétés se partagent le marché français. Cinq critères sont
                    standardisés dans la sélection :
                  </p>
                  <ul className="mt-3 space-y-2 text-base text-foreground/80">
                    <li>• <strong>Frais de gestion</strong> — entre 4 % et 10 % du CA HT. Tout taux supérieur à 10 % interroge.</li>
                    <li>• <strong>Label PEPS</strong> — l&apos;adhésion au syndicat professionnel est un filtre de sérieux. Les sociétés non labellisées ne sont pas à écarter automatiquement, mais l&apos;absence doit se justifier.</li>
                    <li>• <strong>Avance sur salaire</strong> — certaines sociétés paient le consultant sans attendre le règlement du client (30 à 60 jours). C&apos;est l&apos;un des critères les plus discriminants.</li>
                    <li>• <strong>Accompagnement</strong> — interlocuteur dédié vs plateforme purement administrative.</li>
                    <li>• <strong>Services inclus</strong> — mutuelle, prévoyance, assurance RC pro, formation continue.</li>
                  </ul>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Notre <Link href="/comparateurs/portage-salarial" className="font-semibold text-primary hover:underline">comparateur de 10 sociétés de portage salarial</Link> croise ces critères sur les acteurs les plus connus (ITG, Cadres en Mission, OpenWork, ABC Portage, CEGELEM et 5 autres).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    3. Signer la convention d&apos;adhésion, puis le contrat de travail
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Le dossier administratif demandé par la société de portage comprend en général :
                  </p>
                  <ul className="mt-3 space-y-1 text-base text-foreground/80">
                    <li>• Pièce d&apos;identité en cours de validité</li>
                    <li>• RIB</li>
                    <li>• Justificatif de domicile de moins de 3 mois</li>
                    <li>• Diplômes ou certifications (pour les métiers techniques)</li>
                    <li>• CV et description de la prestation envisagée</li>
                  </ul>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Une fois le dossier validé, deux signatures se succèdent :
                  </p>
                  <ol className="mt-3 space-y-2 text-base text-foreground/80">
                    <li><strong>1. Convention d&apos;adhésion</strong> — contrat-cadre entre vous et la société de portage, qui définit les conditions commerciales (frais de gestion, services inclus). Ce n&apos;est pas encore un contrat de travail.</li>
                    <li><strong>2. Contrat de travail</strong> — signé pour chaque mission, soit en CDI (forme très majoritaire), soit en CDD (cas spécifiques détaillés plus bas). Il comporte une période d&apos;essai dont la durée est fixée par la CCN IDCC 3219.</li>
                  </ol>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Une fois le contrat de travail signé, vous êtes légalement salarié de la société
                    de portage dès le premier jour de mission.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    4. Contractualiser votre première mission
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    La société de portage émet un <strong>contrat commercial de prestation</strong> avec
                    votre client final. Il précise l&apos;objet de la mission et les livrables, la durée
                    prévue et les conditions de renouvellement, le TJM convenu et le volume de jours,
                    les conditions de facturation (généralement mensuelle) et de paiement.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Parallèlement, votre contrat de travail chez la société de portage reprend ces
                    éléments côté salarié : salaire brut, durée du travail, convention applicable.
                    La mission démarre une fois les deux contrats signés. <strong>Le premier bulletin
                    de paie arrive généralement entre 30 et 45 jours</strong> après le début de mission,
                    selon les modalités de facturation convenues avec le client.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    5. La vie quotidienne du salarié porté
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Chaque mois, vous remplissez un <strong>Compte-rendu d&apos;Activité (CRA)</strong> :
                    nombre de jours travaillés, congés pris, précisions sur l&apos;avancement. Le CRA
                    valide la facturation au client et déclenche votre bulletin de paie.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Les <strong>notes de frais professionnels</strong> (déplacements, repas clients,
                    matériel) réduisent votre base de cotisations : elles augmentent donc mécaniquement
                    votre net effectif, contrairement à l&apos;auto-entreprise où les frais sortent
                    intégralement de votre poche.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    En cas de retard de paiement côté client, les sociétés qui proposent
                    l&apos;<strong>avance sur salaire</strong> vous versent votre net dans les délais
                    habituels sans attendre l&apos;encaissement. Ce service, encore loin d&apos;être
                    universel, change considérablement le confort de trésorerie.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Avantages */}
            <section id="avantages" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                Les avantages du portage salarial
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: ShieldIcon, t: "Protection sociale complète", d: "Assurance maladie, retraite complémentaire, mutuelle d'entreprise, prévoyance. Même couverture qu'un salarié cadre." },
                  { icon: ScaleIcon, t: "Droit au chômage", d: "Vous cotisez à l'assurance chômage. En cas de fin de mission, vous pouvez toucher l'ARE." },
                  { icon: BriefcaseIcon, t: "CDI pour emprunter", d: "Un CDI en portage est reconnu par les banques pour un crédit immobilier. Argument souvent décisif." },
                  { icon: CalculatorIcon, t: "Zéro gestion administrative", d: "Facturation, déclarations URSSAF, bulletins de paie : la société de portage s'occupe de tout." },
                  { icon: RocketIcon, t: "Pas de création de société", d: "Démarrage immédiat, pas de frais de création, pas de comptabilité, pas de CFE." },
                  { icon: ExternalLinkIcon, t: "Frais professionnels déductibles", d: "Repas, transport, matériel : vos frais réduisent votre base de cotisations, contrairement à l'auto-entreprise." },
                ].map((a) => (
                  <li key={a.t} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-foreground">{a.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{a.d}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Inconvénients */}
            <section id="inconvenients" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><AlertTriangleIcon className="h-4 w-4" /></IconBadge>
                Les inconvénients du portage salarial
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  { t: "Coût total élevé", d: "Entre les frais de gestion (5-10 %) et les cotisations sociales (~45 %), vous conservez environ 45-55 % de votre CA. En auto-entreprise, c'est 75-80 %." },
                  { t: "TJM minimum requis", d: "La convention collective impose un salaire minimum (75 % du PASS). En pratique, un TJM inférieur à 300-350 €/jour rend le portage peu viable économiquement." },
                  { t: "Pas de patrimoine d'entreprise", d: "Contrairement à une SASU ou EURL, vous ne construisez pas de société que vous pouvez revendre ou transmettre." },
                  { t: "Limité aux prestations intellectuelles", d: "Le portage est réservé aux activités de conseil, formation, expertise. Pas d'activité commerciale, artisanale ou de négoce." },
                ].map((inc) => (
                  <li key={inc.t} className="flex gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
                    <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                      <p className="font-semibold text-amber-900">{inc.t}</p>
                      <p className="mt-1 text-sm text-amber-800">{inc.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Salaire */}
            <section id="salaire" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Salaire et rémunération en portage salarial
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Voici la cascade de déductions pour un TJM de 500 €, 18 jours travaillés par mois :
              </p>

              {/* Waterfall chart */}
              <div className="mt-6 space-y-2">
                {[
                  { label: "CA HT mensuel", value: "9 000 €", pct: 100, color: "bg-primary" },
                  { label: "− Frais de gestion (7 %)", value: "−630 €", pct: 93, color: "bg-primary/80" },
                  { label: "− Charges patronales (~43 %)", value: "−3 599 €", pct: 53, color: "bg-primary/60" },
                  { label: "= Salaire brut", value: "4 771 €", pct: 53, color: "bg-accent" },
                  { label: "− Charges salariales (~22 %)", value: "−1 050 €", pct: 41, color: "bg-accent/70" },
                  { label: "= Salaire net avant impôt", value: "~3 721 €", pct: 41, color: "bg-accent" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="w-56 shrink-0 text-right text-sm text-foreground/80">{row.label}</span>
                    <div className="flex-1">
                      <div className={`h-7 rounded ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-20 text-right text-sm font-semibold tabular-nums text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Taux de restitution : environ <strong>41 %</strong> du CA. Les taux réels varient selon la société de portage.
              </p>

              <div className="mt-6 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm text-primary">
                  <strong>Salaire minimum légal :</strong> La convention collective impose une rémunération minimale de 75 % du PASS pour un junior (soit ~2 517 €/mois brut en 2026), 80 % pour un senior et 85 % pour un forfait jours.
                </p>
              </div>

              <p className="mt-4 text-base text-foreground/80">
                <strong>Calcule ton salaire exact</strong> avec{" "}
                <Link href="/simulateurs/portage-salarial" className="text-primary hover:underline">
                  notre simulateur de salaire en portage
                </Link>.
              </p>
            </section>

            {/* 6. Cotisations */}
            <section id="cotisations" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                Cotisations sociales en portage salarial
              </h2>
              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Catégorie</th>
                      <th className="px-5 py-3 text-right">Taux approx.</th>
                      <th className="px-5 py-3">Base</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Charges patronales", "~42-45 %", "Salaire brut", true],
                      ["  dont sécurité sociale", "~30 %", "", false],
                      ["  dont retraite complémentaire", "~10 %", "", false],
                      ["  dont prévoyance/mutuelle", "~2-3 %", "", false],
                      ["Charges salariales", "~21-23 %", "Salaire brut", true],
                      ["  dont CSG/CRDS", "~9,7 %", "98,25 % du brut", false],
                      ["  dont retraite complémentaire", "~4 %", "", false],
                      ["  dont sécurité sociale", "~7 %", "", false],
                    ].map(([cat, taux, base, bold]) => (
                      <tr key={cat as string} className="border-b border-border last:border-b-0">
                        <td className={`px-5 py-2.5 ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {cat as string}
                        </td>
                        <td className="px-5 py-2.5 text-right tabular-nums text-foreground/80">{taux as string}</td>
                        <td className="px-5 py-2.5 text-xs text-muted-foreground">{base as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Ces taux sont des moyennes — les cotisations exactes dépendent de la convention collective et du niveau de rémunération. Consultez notre{" "}
                <Link href="/methodologie" className="text-primary hover:underline">page méthodologie</Link> pour les sources.
              </p>
            </section>

            {/* 7. CDI vs CDD en portage */}
            <section id="contrats" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Les types de contrats en portage salarial (CDI vs CDD)
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Le portage salarial admet deux formes de contrat de travail : le CDI et le CDD. Leurs
                règles, leurs durées et leurs cas d&apos;emploi diffèrent sensiblement. La convention
                collective (IDCC 3219) et les articles L1254-1 à L1254-31 du Code du travail
                encadrent strictement leur usage. Le choix entre CDI et CDD a des conséquences
                directes sur votre protection sociale, votre accès au crédit et votre capacité à
                enchaîner des missions.
              </p>

              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Critère</th>
                      <th className="px-5 py-3">CDI en portage</th>
                      <th className="px-5 py-3">CDD en portage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Durée", "Indéterminée", "18 mois max, renouvelable 1 fois dans cette limite"],
                      ["Dérogation", "—", "+3 mois pour décrocher une nouvelle mission (L1254-13)"],
                      ["Motif obligatoire", "Non", "Oui (article L1254-10)"],
                      ["Indemnité fin de contrat", "Non", "10 % des salaires bruts versés"],
                      ["Chômage en fin de contrat", "Oui (rupture conventionnelle ou licenciement)", "Oui"],
                      ["Crédit immobilier", "Accès facilité", "Difficile"],
                      ["Missions successives", "Oui, en continu", "Non, un seul CDD par cadre"],
                    ].map(([critere, cdi, cdd]) => (
                      <tr key={critere} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-2.5 font-semibold text-foreground">{critere}</td>
                        <td className="px-5 py-2.5 text-foreground/80">{cdi}</td>
                        <td className="px-5 py-2.5 text-foreground/80">{cdd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Le CDI en portage salarial : le contrat standard
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Le CDI est la forme de contrat <strong>très majoritaire</strong> en portage
                    salarial. Il se distingue du CDI classique sur un point : le salaire et la charge
                    de travail sont rythmés par les missions successives. Entre deux missions, vous
                    pouvez traverser une <strong>période d&apos;intermission</strong> pendant laquelle
                    vous restez salarié de la société de portage, mais ne percevez pas de salaire sauf
                    accord spécifique ou recours à une réserve financière constituée pendant les missions.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Atouts du CDI en portage :
                  </p>
                  <ul className="mt-3 space-y-2 text-base text-foreground/80">
                    <li>• <strong>Accès facilité au crédit immobilier</strong> — les banques reconnaissent le CDI comme un contrat stable, y compris en portage salarial.</li>
                    <li>• <strong>Pas de date butoir</strong> — vous enchaînez les missions sans contrainte de durée légale.</li>
                    <li>• <strong>Continuité des droits au chômage</strong> — cotisation ininterrompue tant que vous êtes sous contrat.</li>
                    <li>• <strong>Réserve financière</strong> possible via votre compte d&apos;activité : une partie du salaire peut être mise en réserve pour lisser les périodes creuses.</li>
                  </ul>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Point de vigilance : le CDI en portage ne garantit pas un salaire minimum en continu.
                    Votre rémunération dépend toujours de votre capacité à signer des missions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Le CDD en portage salarial : cas d&apos;usage et limites
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Le CDD en portage répond à des cas précis. L&apos;<strong>article L1254-12 du Code
                    du travail</strong> fixe une durée maximale de <strong>18 mois, renouvellement
                    compris</strong>. Le contrat peut être renouvelé une seule fois, à condition que la
                    somme des périodes ne dépasse pas ces 18 mois.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    L&apos;<strong>article L1254-13</strong> autorise une dérogation de <strong>3 mois
                    supplémentaires</strong> pour permettre au salarié porté de décrocher une nouvelle
                    mission — soit <strong>21 mois grand maximum</strong>. Il n&apos;existe pas de
                    dérogation à 36 mois en portage salarial, contrairement à ce qu&apos;on lit parfois
                    (règle applicable à d&apos;autres formes de CDD, pas au portage).
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Comme tout CDD, il doit comporter un <strong>motif de recours</strong> (article
                    L1254-10) : mission ponctuelle chez un client identifié, remplacement, accroissement
                    temporaire d&apos;activité.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Le CDD donne droit à une <strong>indemnité de fin de contrat</strong> de 10 % des
                    salaires bruts versés, sauf en cas de refus d&apos;un CDI proposé par la société
                    de portage ou de rupture anticipée à l&apos;initiative du salarié.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Comment choisir entre CDI et CDD en portage
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Le <strong>CDI s&apos;impose dans la grande majorité des cas</strong> : carrière
                    pérenne en portage, perspective d&apos;enchaîner plusieurs missions, projet
                    immobilier à financer, continuité de cotisation à l&apos;assurance chômage.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Le <strong>CDD</strong> devient pertinent dans trois situations précises :
                  </p>
                  <ul className="mt-3 space-y-2 text-base text-foreground/80">
                    <li>• <strong>Mission unique courte</strong> (moins de 18 mois), sans intention de poursuivre en portage au-delà.</li>
                    <li>• <strong>Test du statut</strong> avant de basculer vers un CDI portage ou vers un autre statut (<Link href="/simulateurs/sasu-eurl" className="text-primary hover:underline">SASU</Link>, <Link href="/simulateurs/sasu-eurl" className="text-primary hover:underline">EURL</Link>).</li>
                    <li>• <strong>Activité secondaire</strong> ponctuelle, par exemple en cumul avec un emploi principal ailleurs.</li>
                  </ul>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    En pratique, la plupart des sociétés de portage proposent spontanément un CDI,
                    y compris pour une première mission courte. Vous pouvez en discuter lors de la
                    négociation de votre convention d&apos;adhésion.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Chômage */}
            <section id="chomage" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                Portage salarial et chômage
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Cotiser au chômage en portage</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Oui, le salarié porté cotise à l&apos;assurance chômage comme tout salarié. C&apos;est l&apos;un des avantages majeurs par rapport à l&apos;auto-entreprise ou la SASU, où aucune cotisation chômage n&apos;est prélevée.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Toucher l&apos;ARE en portage</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    En cas de rupture conventionnelle ou de fin de CDD, vous pouvez bénéficier de l&apos;ARE (Allocation de Retour à l&apos;Emploi). Le montant dépend de votre salaire brut des 24 derniers mois. Il est possible de cumuler ARE et revenus d&apos;activité portée, sous conditions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Portage salarial après un licenciement</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Vous pouvez démarrer en portage tout en percevant vos allocations chômage existantes. Le cumul est possible tant que le total (ARE + salaire porté) ne dépasse pas votre ancien salaire de référence.
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
                  <AlertTriangleIcon className="mb-1 inline h-4 w-4 text-amber-500" /> Le maintien ou le cumul des droits au chômage dépend de votre situation individuelle. Consultez France Travail (ex-Pôle Emploi) pour une simulation personnalisée.
                </div>
              </div>
            </section>

            {/* 8. Éligibilité */}
            <section id="eligibilite" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Qui peut bénéficier du portage salarial ?
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-accent/40 bg-accent/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-accent">✅ Éligible</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Consultants, formateurs, experts, coaches</li>
                    <li>Profils IT (développeurs, chefs de projet, data)</li>
                    <li>Managers de transition</li>
                    <li>Professions libérales non réglementées</li>
                    <li>Cadres en reconversion</li>
                    <li>Retraités actifs</li>
                    <li className="font-medium text-foreground">Condition : Bac+2 minimum OU 3 ans d&apos;expérience</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-destructive">❌ Non éligible</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>Activités commerciales / achat-revente</li>
                    <li>Artisanat et métiers manuels</li>
                    <li>Professions réglementées (médecin, avocat, architecte)</li>
                    <li>Services à la personne (ménage, garde d&apos;enfants)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 9. Comparatif statuts */}
            <section id="comparatif" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Portage salarial vs autres statuts
              </h2>
              <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-3 py-3 sm:px-5">Critère</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">Portage</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">Auto-entr.</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">SASU</th>
                      <th className="whitespace-nowrap px-3 py-3 sm:px-5">EURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Protection sociale", "Complète", "Minimale", "Assimilé-salarié", "TNS"],
                      ["Chômage", "Oui", "Non", "Non", "Non"],
                      ["Plafond CA", "Aucun", "77 700 €", "Aucun", "Aucun"],
                      ["Frais déductibles", "Oui", "Non", "Oui", "Oui"],
                      ["Gestion admin", "Zéro", "Simple", "Compta oblig.", "Compta oblig."],
                      ["Coût total", "~50 % CA", "~22-25 % CA", "~60-65 % net", "~45 % net"],
                      ["Patrimoine", "Non", "Non", "Oui", "Oui"],
                    ].map(([critere, ...vals]) => (
                      <tr key={critere} className="border-b border-border last:border-b-0">
                        <td className="px-3 py-2.5 font-semibold text-foreground sm:px-5">{critere}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="px-3 py-2.5 text-foreground/80 sm:px-5">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Link href="/simulateurs/tjm-freelance" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Compare ton revenu selon les 4 statuts →
                </Link>
                <Link href="/simulateurs/sasu-eurl" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  SASU ou EURL : le comparatif détaillé →
                </Link>
                <Link href="/simulateurs/auto-entrepreneur" className="rounded-xl border border-border bg-white p-4 text-sm font-medium text-primary shadow-sm transition hover:shadow-md hover:border-primary">
                  Simulateur auto-entrepreneur →
                </Link>
              </div>
            </section>

            {/* 10. Choisir sa société */}
            <section id="choisir" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
                Comment choisir sa société de portage
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/80">
                <p>
                  Le choix de votre société de portage repose sur 5 critères principaux :
                  les frais de gestion (5 à 10 % du CA), le label PEPS (gage de sérieux),
                  la qualité de l&apos;accompagnement (interlocuteur dédié vs plateforme),
                  les avis des portés actuels et les services inclus (mutuelle, avance sur
                  salaire, RC Pro).
                </p>
                <p>
                  Nous avons analysé les 10 sociétés les plus connues dans notre{" "}
                  <Link href="/comparateurs/portage-salarial" className="font-semibold text-primary hover:underline">
                    comparatif indépendant des sociétés de portage salarial
                  </Link>.
                </p>
              </div>
            </section>

            {/* 11. CTA Simuler */}
            <section id="simuler" className="scroll-mt-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Simule ton revenu en portage salarial
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Tu connais maintenant le fonctionnement du portage. Utilise notre simulateur
                  pour estimer ton salaire net selon ton TJM.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link href="/simulateurs/portage-salarial" className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                    Simuler mon salaire →
                  </Link>
                  <Link href="/comparateurs/portage-salarial" className="inline-flex items-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5">
                    Comparer les sociétés
                  </Link>
                </div>
              </div>
            </section>

            {/* 12. International */}
            <section id="international" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><CompassIcon className="h-4 w-4" /></IconBadge>
                Le portage salarial à l&apos;international
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Le portage salarial est compatible avec les missions réalisées <strong>depuis
                l&apos;étranger</strong> ou <strong>pour un client étranger</strong>, sous certaines
                conditions. La société de portage reste française : elle facture en euros depuis la
                France, déclare les cotisations à l&apos;URSSAF, et verse le salaire en France. Ce qui
                change, c&apos;est le cadre juridique et social qui s&apos;applique à vous pendant la
                mission.
              </p>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">
                Trois régimes distincts selon la géographie :
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Missions dans l&apos;UE, l&apos;EEE et en Suisse (détachement A1)
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Les règlements européens de coordination de la sécurité sociale (CE 883/2004 et
                    CE 987/2009) permettent le <strong>détachement</strong> d&apos;un salarié porté
                    depuis la France vers un pays de l&apos;Union européenne, de l&apos;Espace
                    économique européen (Islande, Liechtenstein, Norvège) ou en Suisse.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Le mécanisme :
                  </p>
                  <ul className="mt-3 space-y-2 text-base text-foreground/80">
                    <li>• La société de portage demande un <strong>certificat A1</strong> à l&apos;URSSAF via le service en ligne <strong>ILASS</strong> (Instruction de la Législation Applicable à la Sécurité Sociale).</li>
                    <li>• Le certificat A1 atteste que vous restez affilié au régime français de sécurité sociale pendant toute la mission.</li>
                    <li>• La durée maximale du détachement est fixée à <strong>24 mois</strong>, renouvelable sous conditions avec accord préalable des autorités du pays d&apos;accueil.</li>
                  </ul>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Pendant toute la durée du détachement, vous continuez à cotiser à l&apos;Assurance
                    Maladie, à la retraite et à l&apos;assurance chômage françaises. Votre carte
                    Vitale reste active et la <strong>carte européenne d&apos;assurance maladie
                    (CEAM)</strong> couvre les soins courants dans le pays d&apos;accueil.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Missions dans les pays à accord bilatéral
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Hors UE/EEE/Suisse, la France a signé des accords bilatéraux de sécurité sociale
                    avec environ <strong>41 pays ou territoires</strong> : États-Unis, Canada,
                    Québec, Royaume-Uni (accord post-Brexit), Japon, Corée du Sud, Maroc, Tunisie,
                    Algérie, Sénégal, Brésil, Argentine, Chili, entre autres.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Le principe est proche du détachement européen : la société de portage demande un
                    <strong> certificat de mobilité internationale</strong> à l&apos;URSSAF, qui maintient
                    votre affiliation française pendant la durée prévue par l&apos;accord (souvent de
                    2 à 5 ans selon les conventions). Les démarches passent également par le service
                    mobilité internationale de l&apos;URSSAF.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    La liste à jour des pays à accord bilatéral est tenue par le <strong>CLEISS</strong>
                    (Centre des Liaisons Européennes et Internationales de Sécurité Sociale).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Missions dans les pays sans accord (CFE, complémentaire internationale)
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Dans les pays où la France n&apos;a pas d&apos;accord bilatéral (la majeure partie
                    de l&apos;Asie du Sud-Est, une large part de l&apos;Afrique subsaharienne,
                    plusieurs pays du Moyen-Orient), la sécurité sociale française ne vous couvre pas
                    automatiquement pendant la mission. Trois options existent :
                  </p>
                  <ul className="mt-3 space-y-2 text-base text-foreground/80">
                    <li>• <strong>Adhésion à la Caisse des Français de l&apos;Étranger (CFE)</strong> — organisme public qui maintient vos droits à l&apos;assurance maladie, maternité, invalidité, accident du travail et retraite depuis l&apos;étranger. Cotisation volontaire, additionnelle aux cotisations habituelles.</li>
                    <li>• <strong>Complémentaire santé internationale</strong> — souscrite directement par vous ou via la société de portage pour couvrir les frais médicaux locaux.</li>
                    <li>• <strong>Affiliation au régime local</strong> — possible dans certains pays, mais complexifie le portage car vous n&apos;êtes plus strictement affilié en France.</li>
                  </ul>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Certaines sociétés de portage proposent des offres dédiées aux missions longue
                    durée hors UE, souvent couplées à la CFE. Vérifiez cette ligne spécifique avant
                    de signer si vous envisagez une mission hors zone UE/EEE/Suisse/accord bilatéral.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Fiscalité et double imposition
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Votre revenu net de portage reste déclarable à l&apos;impôt sur le revenu en
                    France tant que vous êtes <strong>résident fiscal français</strong> : plus de
                    183 jours de présence annuelle sur le territoire, foyer fiscal en France, ou
                    centre des intérêts économiques en France (un seul de ces critères suffit).
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    Pour éviter la double imposition, la France a signé des <strong>conventions
                    fiscales bilatérales</strong> avec plus de 120 pays. Ces conventions désignent
                    quel État a le droit d&apos;imposer chaque type de revenu. Concrètement : vous
                    êtes imposé en France sur le salaire versé par la société de portage, mais
                    certains pays d&apos;accueil peuvent également taxer une partie du revenu si vous
                    y résidez durablement. La convention évite que le même revenu soit taxé deux fois.
                  </p>
                  <div className="mt-4 rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-sm">
                    <p className="flex items-start gap-2 text-primary">
                      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        Pour les missions longues (plus de 6 mois) ou les expatriations complètes,
                        la bascule de résidence fiscale change la donne. Dans ce cas, consulter un
                        expert-comptable ou un avocat fiscaliste <strong>avant le départ</strong> est
                        fortement recommandé.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 12. FAQ */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><MessageCircleIcon className="h-4 w-4" /></IconBadge>
                Questions fréquentes
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                {faq.map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-foreground">
                      <span>{item.q}</span>
                      <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xl text-primary transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-foreground/80">{item.r}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* 13. Sources */}
            <section id="sources" className="scroll-mt-24">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <h2 className="flex items-center text-2xl font-bold tracking-tight text-foreground">
                  <IconBadge><ExternalLinkIcon className="h-4 w-4" /></IconBadge>
                  Sources
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {sourcesLinks.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline-offset-4 transition hover:underline">
                        {s.label}<span aria-hidden className="ml-1 text-xs">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : avril 2026. Ce guide est à vocation informative. Pour une
                  analyse adaptée à votre situation, consultez un expert-comptable ou un avocat spécialisé.
                  Rédigé par{" "}
                  <Link href="/a-propos" className="text-primary hover:underline">Nizar Laghrifi</Link>,
                  fondateur de Salairia.
                </p>
              </div>
            </section>
          </div>

          <TocSidebar items={tocItems} />
        </div>
      </div>
    </>
  );
}
