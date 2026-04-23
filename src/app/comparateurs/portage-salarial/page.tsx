import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  ShieldIcon,
  AlertTriangleIcon,
  BriefcaseIcon,
  ScaleIcon,
  InfoIcon,
} from "@/components/icons";
import PortageTable from "@/components/comparateurs/PortageTable";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import data from "@/data/societes-portage.json";

export const metadata: Metadata = {
  title:
    "Comparatif portage salarial 2026 : 10 sociétés analysées | Salairia",
  description:
    "Comparatif indépendant des 10 meilleures sociétés de portage salarial en 2026. Frais, avis, services : trouvez la société adaptée à votre profil.",
  alternates: {
    canonical: "/comparateurs/portage-salarial",
  },
  openGraph: {
    title:
      "Comparatif portage salarial 2026 : 10 sociétés analysées | Salairia",
    description:
      "Comparatif indépendant des 10 meilleures sociétés de portage salarial en 2026. Frais, avis, services : trouvez la société adaptée à votre profil.",
    url: "/comparateurs/portage-salarial",
  },
};

const faq = [
  {
    q: "Comment choisir sa société de portage salarial ?",
    r: "Comparez sur 4 critères principaux : les frais de gestion (entre 5 et 10 % du CA), la qualité de l'accompagnement (interlocuteur dédié ou plateforme en ligne), les services inclus (mutuelle, RC Pro, avance sur salaire) et les avis des portés actuels. Le label PEPS (syndicat professionnel) est un gage de sérieux supplémentaire. Votre choix dépendra aussi de votre profil : un consultant senior avec un CA élevé privilégiera des frais plafonnés, tandis qu'un indépendant débutant aura besoin d'un accompagnement personnalisé.",
  },
  {
    q: "Quels sont les frais de gestion moyens en portage salarial en 2026 ?",
    r: "Les frais de gestion se situent entre 5 % et 10 % du chiffre d'affaires HT facturé. La moyenne du marché est autour de 7-8 %. Certaines sociétés proposent des frais plafonnés (par exemple 600 €/mois), ce qui devient très avantageux au-delà d'un certain CA. Une alternative récente est l'abonnement fixe (comme Jump à 99 €/mois), qui supprime la commission proportionnelle. Attention : des frais bas ne signifient pas toujours un meilleur salaire net — les services inclus et la qualité de l'accompagnement comptent aussi.",
  },
  {
    q: "Quelle est la différence entre portage salarial et auto-entrepreneur ?",
    r: "Le portage salarial vous donne le statut de salarié (CDI, protection sociale complète, chômage, retraite complémentaire) en échange de frais de gestion et de charges sociales plus élevées (~50 % du CA). L'auto-entrepreneur conserve 75-80 % de son CA mais n'a pas d'assurance chômage, une retraite minimale et pas de mutuelle d'entreprise. Le portage est généralement plus intéressant au-delà de 3 000 € de CA mensuel et pour ceux qui veulent sécuriser un crédit immobilier.",
  },
  {
    q: "Peut-on changer de société de portage en cours de contrat ?",
    r: "Oui, vous pouvez changer de société de portage. Le processus implique une rupture conventionnelle ou une démission de votre contrat actuel, puis la signature d'un nouveau contrat avec la société choisie. Vos droits acquis (chômage, retraite) sont conservés puisqu'ils sont liés à votre statut de salarié, pas à une société en particulier. Prévoyez un délai de 1 à 3 mois pour la transition.",
  },
  {
    q: "Le portage salarial donne-t-il droit au chômage ?",
    r: "Oui, c'est l'un des principaux avantages du portage salarial. En tant que salarié porté en CDI, vous cotisez à l'assurance chômage. En cas de rupture conventionnelle ou de fin de mission, vous pouvez bénéficier de l'ARE (Allocation de Retour à l'Emploi) dans les mêmes conditions qu'un salarié classique. Le montant dépend de votre salaire brut des 24 derniers mois.",
  },
  {
    q: "Ce comparatif est-il indépendant ?",
    r: "Oui. Salairia est un site indépendant édité par Nizar Laghrifi, fondateur de SprintJob.co. Aucune société de portage ne nous rémunère pour apparaître ou être mise en avant dans ce comparatif. Notre analyse repose sur des critères objectifs et publiquement vérifiables : frais affichés sur les sites officiels, avis clients sur Google et Trustpilot, labels professionnels. Salairia peut percevoir une commission si vous souscrivez via nos liens partenaires, sans surcoût pour vous. Cela n'influence ni le classement ni les avis présentés.",
  },
  {
    q: "Est-ce qu'une société sans label PEPS est à éviter ?",
    r: "Non, pas automatiquement. Le label PEPS signale une adhésion au syndicat professionnel et un engagement déontologique : transparence des frais, respect de la convention collective IDCC 3219, médiation en cas de litige. C'est un filtre pertinent pour écarter les structures les plus opaques. Cela dit, certaines sociétés sérieuses font le choix de ne pas adhérer pour rester plus indépendantes. Dans ce cas, il faut être plus exigeant sur les autres critères : ancienneté, avis vérifiés, transparence des frais, nombre de portés accompagnés.",
  },
  {
    q: "Frais en pourcentage ou abonnement fixe : lequel est plus avantageux ?",
    r: "Le modèle en commission (4 à 10 % du CA) est linéaire avec votre chiffre d'affaires. L'abonnement fixe (par exemple Jump à 99 €/mois) supprime la commission mais inclut généralement moins de services. Le croisement se fait autour de 20 000-30 000 € de CA annuel : en deçà, la commission reste moins chère ; au-delà, le forfait fixe devient avantageux. Un troisième modèle, la commission plafonnée (par exemple Régie Portage à 5 % max 600 €/mois), cumule les deux approches : proportionnel en début de CA, plafonné au-delà.",
  },
  {
    q: "Comment vérifier moi-même les informations de ce comparatif ?",
    r: "Tous les chiffres sont vérifiables publiquement. Les frais de gestion figurent sur les sites officiels des sociétés (section tarifs ou grille). Les avis clients sont consultables sur Google My Business ou Trustpilot — nous indiquons la plateforme et le nombre d'avis dans chaque fiche. Le label PEPS est vérifiable sur peps-syndicat.fr dans la section des adhérents. La convention collective IDCC 3219 est consultable sur Legifrance. La date de dernière mise à jour est affichée en haut de page et dans chaque fiche.",
  },
];

const sourcesLinks = [
  { label: "PEPS — syndicat du portage salarial", href: "https://www.peps-syndicat.fr" },
  { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
  { label: "Code du travail — articles L1254-1 à L1254-31 (portage)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
  { label: "URSSAF — cotisations portage salarial", href: "https://www.urssaf.fr" },
  { label: "Google My Business — avis publics", href: "https://www.google.com/business/" },
  { label: "Trustpilot — avis vérifiés", href: "https://fr.trustpilot.com" },
  { label: "Sites officiels de chaque société (liens dans les fiches)", href: "#comparatif" },
];

const tocItems = [
  { id: "qu-est-ce", label: "Société de portage ?" },
  { id: "comparatif", label: "Comparatif" },
  { id: "methodologie-comparatif", label: "Méthodologie" },
  ...data.map((s) => ({ id: s.slug, label: s.nom })),
  { id: "simuler", label: "Simuler ton revenu" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function PortageSalarialComparateurPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Comparateurs", item: `${SITE_URL}/comparateurs` },
        { "@type": "ListItem", position: 3, name: "Portage salarial", item: `${SITE_URL}/comparateurs/portage-salarial` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Meilleures sociétés de portage salarial 2026",
      description: "Comparatif indépendant de 10 sociétés de portage salarial",
      numberOfItems: data.length,
      itemListElement: data.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.nom,
        url: `${SITE_URL}/comparateurs/portage-salarial#${s.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.r },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Hero */}
        <section>
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-sm text-foreground/70"
          >
            <Link href="/" className="transition hover:text-primary">Accueil</Link>
            <span aria-hidden>›</span>
            <Link href="/comparateurs" className="transition hover:text-primary">Comparateurs</Link>
            <span aria-hidden>›</span>
            <span className="text-foreground">Portage salarial</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="h-3.5 w-3.5" />
            À jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Comparatif des meilleures sociétés de portage salarial 2026
          </h1>
          <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
            10 sociétés analysées sur 8 critères objectifs
          </p>

          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              Quelle société de portage salarial choisir en 2026 ? Ce
              comparatif indépendant analyse les 10 acteurs les plus reconnus
              du marché français sur des critères factuels et vérifiables.
            </p>
            <p className="text-base text-muted-foreground">
              Nous avons analysé chaque société sur 8 critères factuels :
              frais de gestion, plafonnement, avis clients, label PEPS,
              ancienneté, nombre de portés, services inclus et réseau
              d&apos;agences. Aucune société ne nous rémunère pour apparaître
              dans ce classement. Le badge « Choix Salairia » est attribué à
              la société offrant le meilleur rapport qualité-prix objectif
              (frais plafonnés + note client élevée + label PEPS).
            </p>
          </div>
        </section>

        {/* Section éditoriale — qu'est-ce qu'une société de portage */}
        <section id="qu-est-ce" className="mt-16 scroll-mt-24">
          <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
            <IconBadge><BriefcaseIcon className="h-4 w-4" /></IconBadge>
            Qu&apos;est-ce qu&apos;une société de portage salarial ?
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/80">
            <p>
              Une société de portage salarial est une entreprise qui{" "}
              <strong>embauche un consultant indépendant en CDI ou CDD</strong>{" "}
              pour le compte de clients auprès desquels ce consultant mène des
              missions. Elle signe deux contrats : un contrat de travail avec
              le salarié porté, et un contrat commercial avec l&apos;entreprise
              cliente finale. Elle facture la prestation, collecte le paiement,
              prélève ses frais de gestion (généralement 4 à 10 % du CA) et
              les cotisations sociales, puis verse un salaire net au
              consultant.
            </p>
            <p>
              Le périmètre de la société de portage est{" "}
              <strong>administratif et juridique</strong>. Elle ne prospecte
              pas les clients, ne recrute pas les missions et n&apos;intervient
              pas dans la relation commerciale entre le consultant et son
              client. Le consultant reste pilote de son activité, de ses
              tarifs et de sa charge de travail.
            </p>
            <p>
              Le marché français compte une cinquantaine de sociétés dont
              l&apos;activité est significative, selon les données du syndicat
              professionnel PEPS. La majorité des acteurs sérieux adhère à ce
              syndicat, qui impose un cadre déontologique commun :
              transparence des frais, respect de la{" "}
              <a
                href="https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                convention collective IDCC 3219
              </a>
              , médiation en cas de litige. L&apos;adhésion n&apos;est pas
              obligatoire, mais elle constitue un filtre pertinent pour
              écarter les structures les plus opaques.
            </p>
            <p>
              Le choix d&apos;une société de portage est structurant : elle
              vous accompagne pendant toute la durée de votre activité de
              salarié porté, gère vos bulletins de paie, vos cotisations et
              vos démarches. Un mauvais choix se paie en frais non plafonnés
              sur plusieurs mois, en accompagnement insuffisant au démarrage,
              ou en fiscalité confuse en fin d&apos;année. D&apos;où
              l&apos;importance d&apos;un comparatif méthodique, appuyé sur
              des critères objectifs. Pour mieux comprendre le statut
              lui-même, consultez notre{" "}
              <Link href="/guides/portage-salarial" className="text-primary hover:underline">
                guide complet du portage salarial
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Tableau + En bref — pleine largeur, hors du flex ToC */}
        <div className="mt-16 space-y-16">
          <section id="comparatif" className="scroll-mt-24">
            <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
              <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
              Tableau comparatif
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Triez par frais, note client ou ancienneté. Cliquez sur un
              nom pour accéder à sa fiche détaillée.
            </p>
            <div className="mt-6">
              <PortageTable />
            </div>
          </section>

          <section className="scroll-mt-24">
            <div className="rounded-xl border-l-4 border-primary bg-primary/5 p-6 sm:p-8">
                <p className="text-lg font-bold text-foreground">
                  💡 En bref — 3 profils, 3 recommandations
                </p>
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-foreground/80">
                  <li>
                    <strong>Tu factures plus de 10 000 €/mois ?</strong> →{" "}
                    <a href="#regie-portage" className="font-semibold text-primary hover:underline">
                      Régie Portage
                    </a>{" "}
                    (5 % plafonné à 600 €, tu économises sur les frais dès que ton CA augmente)
                  </li>
                  <li>
                    <strong>Tu veux un accompagnement humain et de proximité ?</strong> →{" "}
                    <a href="#admissions" className="font-semibold text-primary hover:underline">
                      Ad&apos;missions
                    </a>{" "}
                    (18 agences en France, 28 000 portés accompagnés depuis 1997)
                  </li>
                  <li>
                    <strong>Tu es autonome et tu veux un coût fixe prévisible ?</strong> →{" "}
                    <a href="#jump" className="font-semibold text-primary hover:underline">
                      Jump
                    </a>{" "}
                    (99 €/mois, zéro commission sur ton CA, 100 % digital)
                  </li>
                </ul>
              </div>
          </section>
        </div>

        {/* Fiches + FAQ + Sources — retour layout avec ToC */}
        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-16">
            {/* Méthodologie de comparaison */}
            <section id="methodologie-comparatif" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                Notre méthodologie de comparaison
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  Nous avons retenu <strong>10 sociétés de portage
                  salarial</strong> parmi les plus reconnues du marché
                  français, sur trois critères de présélection : ancienneté
                  supérieure à 5 ans, activité représentative (au moins 1 000
                  portés accompagnés), présence en ligne permettant la
                  vérification des frais et des avis.
                </p>
                <p>
                  Chaque société est analysée sur <strong>8 critères
                  objectifs</strong> :
                </p>
                <ul className="space-y-2">
                  <li>• <strong>Frais de gestion</strong> — taux affiché publiquement, éventuel plafond, modalité (pourcentage ou forfait).</li>
                  <li>• <strong>Plafonnement</strong> — existence d&apos;un cap de frais au-delà d&apos;un certain CA.</li>
                  <li>• <strong>Avis clients</strong> — note moyenne et nombre d&apos;avis, plateforme indiquée (Google, Trustpilot).</li>
                  <li>• <strong>Label PEPS</strong> — adhésion vérifiée sur le site peps-syndicat.fr.</li>
                  <li>• <strong>Ancienneté</strong> — année de création de la société.</li>
                  <li>• <strong>Nombre de portés accompagnés</strong> — déclaratif par la société, à titre indicatif.</li>
                  <li>• <strong>Services inclus</strong> — mutuelle, prévoyance, RC pro, avance sur salaire, accompagnement dédié, frais refacturables.</li>
                  <li>• <strong>Réseau d&apos;agences</strong> — national ou franciliencentré, proximité terrain.</li>
                </ul>
                <p>
                  Les <strong>données sont relevées manuellement</strong> sur
                  les sites officiels et les plateformes d&apos;avis publiques.
                  Elles sont vérifiées tous les trimestres, ou dès qu&apos;un
                  acteur annonce un changement majeur de son offre. Chaque
                  chiffre est recoupable en cliquant sur le lien vers le site
                  officiel de la société dans sa fiche détaillée.
                </p>
                <p>
                  Le badge «&nbsp;Choix Salairia&nbsp;» n&apos;est pas un
                  classement général : c&apos;est une recommandation pour un
                  profil-type précis (ici, les hauts CA via frais plafonnés +
                  label PEPS + note supérieure ou égale à 4,5/5). Il
                  n&apos;engage pas à choisir cette société ; il indique
                  l&apos;option la plus cohérente pour ce profil, sur la base
                  des critères affichés.
                </p>
                <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-sm">
                  <p className="flex items-start gap-2 text-primary">
                    <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <strong>Indépendance éditoriale</strong> — aucune société
                      de portage ne rémunère Salairia pour apparaître ou être
                      mieux positionnée dans ce comparatif. Le classement
                      repose uniquement sur les critères publiés. Des liens
                      d&apos;affiliation peuvent être activés à terme ; ils
                      sont signalés sur chaque lien (<code>rel=&quot;sponsored&quot;</code>)
                      et ne modifient jamais l&apos;ordre du classement.
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* Fiches individuelles */}
            {data.map((s, index) => (
              <section
                key={s.id}
                id={s.slug}
                className="scroll-mt-24"
              >
                <div
                  className={`rounded-2xl border p-6 sm:p-8 ${
                    s.choixSalairia
                      ? "border-2 border-accent"
                      : "border-border"
                  } ${index % 2 === 0 ? "bg-white" : "bg-muted/20"}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {s.nom}
                        {s.choixSalairia && (
                          <span className="ml-3 inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                            Choix Salairia
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fondée en {s.creation}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                        {s.fraisGestion}
                      </span>
                      <a
                        href={s.site}
                        target="_blank"
                        rel="noopener nofollow sponsored"
                        data-affiliate="placeholder"
                        className="affiliate-cta hidden text-sm text-primary hover:underline sm:inline"
                      >
                        Visiter le site →
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="text-xs text-muted-foreground">Frais</dt>
                        <dd className="text-foreground">{s.fraisDetail}</dd>
                      </div>
                      {s.plafond && (
                        <div>
                          <dt className="text-xs text-muted-foreground">Plafond</dt>
                          <dd className="font-semibold text-accent">{s.plafond}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-xs text-muted-foreground">Avis</dt>
                        <dd className="text-foreground">
                          {s.avisNote}/5 ({s.avisNombre} avis {s.avisPlateforme})
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Label PEPS</dt>
                        <dd>
                          {s.labelPEPS ? (
                            <span className="flex items-center gap-1 text-accent">
                              <ShieldIcon className="h-3.5 w-3.5" /> Labellisé
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Non</span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Portés accompagnés</dt>
                        <dd className="text-foreground">{s.portesTotal}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-muted-foreground">Réseau</dt>
                        <dd className="text-foreground">{s.reseau}</dd>
                      </div>
                    </dl>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Services inclus
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-foreground">
                        {s.services.map((svc) => (
                          <li key={svc} className="flex items-start gap-2">
                            <span className="mt-0.5 text-accent">✅</span>
                            {svc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        Points forts
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        {s.points_forts.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-foreground">
                            <span className="mt-0.5 shrink-0 text-accent">✓</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                        Points faibles
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        {s.points_faibles.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-foreground/80">
                            <AlertTriangleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-4 text-sm">
                    <strong>Idéal pour :</strong>{" "}
                    <span className="text-foreground/80">{s.idealPour}</span>
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href={s.site}
                      target="_blank"
                      rel="noopener nofollow sponsored"
                      data-affiliate="placeholder"
                      className="affiliate-cta inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                      Découvrir {s.nom} ↗
                    </a>
                    <a
                      href="#comparatif"
                      className="text-sm text-muted-foreground transition hover:text-primary"
                    >
                      ↑ Retour au comparatif
                    </a>
                  </div>
                </div>
              </section>
            ))}

            {/* CTA simulateur */}
            <section id="simuler" className="scroll-mt-24">
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-md sm:p-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Simule ton revenu en portage salarial
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80">
                  Tu connais maintenant les différences entre les sociétés.
                  Utilise notre simulateur pour estimer ton salaire net selon
                  ton TJM et la société de portage.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/simulateurs/portage-salarial"
                    className="inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                  >
                    Simuler mon salaire en portage →
                  </Link>
                  <Link
                    href="/simulateurs/tjm-freelance"
                    className="inline-flex items-center rounded-xl border-2 border-primary bg-transparent px-6 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5"
                  >
                    Comparer les 4 statuts freelance
                  </Link>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                <IconBadge><MessageCircleIcon className="h-4 w-4" /></IconBadge>
                Questions fréquentes
              </h2>
              <div className="mt-6 flex flex-col gap-4">
                {faq.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-foreground">
                      <span>{item.q}</span>
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xl text-primary transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-base leading-relaxed text-foreground/80">
                      {item.r}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Sources */}
            <section id="sources" className="scroll-mt-24">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <h2 className="flex items-center text-2xl font-bold tracking-tight text-foreground">
                  <IconBadge><ExternalLinkIcon className="h-4 w-4" /></IconBadge>
                  Sources
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {sourcesLinks.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary underline-offset-4 transition hover:underline"
                      >
                        {s.label}
                        <span aria-hidden className="ml-1 text-xs">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : avril 2026. Frais et avis relevés
                  sur les sites officiels de chaque société et les plateformes
                  d&apos;avis publics. Les offres peuvent évoluer sans
                  préavis.
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
