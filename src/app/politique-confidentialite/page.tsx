import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Salairia",
  description:
    "Comment Salairia protège vos données : aucun cookie traceur, aucune collecte personnelle. Conformité RGPD totale.",
  alternates: {
    canonical: "/politique-confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Politique de confidentialité | Salairia",
    description:
      "Comment Salairia protège vos données : aucun cookie traceur, aucune collecte personnelle. Conformité RGPD totale.",
    url: "/politique-confidentialite",
  },
};

export default function PolitiqueConfidentialitePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://salairia.fr/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Politique de confidentialité",
        item: "https://salairia.fr/politique-confidentialite",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <nav
          aria-label="Fil d'Ariane"
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition hover:text-primary">
            Accueil
          </Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Politique de confidentialité</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <span aria-hidden>📅</span>
          Mis à jour avril 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Politique de confidentialité
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-foreground/80">
          Comment Salairia protège vos données personnelles.
        </p>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 p-8 shadow-md sm:p-10">
          <span aria-hidden className="text-4xl">
            🛡️
          </span>
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            L&apos;essentiel en 3 points
          </h2>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground">
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-0.5 text-accent">
                ✅
              </span>
              <span>
                Salairia n&apos;utilise aucun cookie traceur, aucun pixel
                publicitaire, aucun script tiers de profilage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-0.5 text-accent">
                ✅
              </span>
              <span>
                Aucune donnée personnelle n&apos;est collectée à votre insu :
                ni nom, ni email, ni IP enrichie.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-0.5 text-accent">
                ✅
              </span>
              <span>
                Vos calculs dans les simulateurs sont effectués localement
                dans votre navigateur, jamais envoyés à un serveur Salairia.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-12 space-y-8">
          <Section title="Responsable du traitement">
            <p>
              Le responsable du traitement des données est Nizar Laghrifi,
              éditeur de Salairia (voir{" "}
              <Link
                href="/mentions-legales"
                className="text-primary underline-offset-4 transition hover:underline"
              >
                Mentions légales
              </Link>
              ). Pour toute question relative à vos données : <MailLink />.
            </p>
          </Section>

          <Section title="Données collectées">
            <p>Salairia collecte le strict minimum :</p>

            <h3 className="pt-2 text-lg font-semibold text-foreground">
              1. Données techniques anonymisées (analytics)
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>Pages visitées</li>
              <li>Source de visite (ex. moteur de recherche, lien direct)</li>
              <li>Type d&apos;appareil (mobile, desktop, tablette)</li>
              <li>Pays d&apos;origine (jamais ville ni adresse précise)</li>
            </ul>
            <p>
              Ces données sont collectées via Plausible Analytics, un outil
              européen (basé en Allemagne) conforme RGPD qui n&apos;utilise
              aucun cookie ni identifiant personnel. Les données sont
              agrégées et anonymisées, impossible de reconstituer un parcours
              individuel.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-foreground">
              2. Données fournies volontairement
            </h3>
            <p>
              Si vous nous écrivez à <MailLink />, nous conservons votre email
              et le contenu de votre message uniquement pour vous répondre.
              Pas de réutilisation marketing, pas de transfert à des tiers.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-foreground">
              3. Données NON collectées
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                Aucun nom, prénom, adresse postale, numéro de téléphone
              </li>
              <li>Aucune donnée bancaire ni de paiement</li>
              <li>
                Aucune donnée saisie dans les simulateurs (TJM, salaires,
                jours travaillés…) n&apos;est enregistrée : tous les calculs
                sont effectués localement dans votre navigateur
              </li>
            </ul>
          </Section>

          <Section title="Cookies et traceurs">
            <p>
              Salairia n&apos;utilise <strong>aucun cookie traceur ni
              publicitaire</strong>.
            </p>
            <p>
              Plausible Analytics (notre outil de mesure d&apos;audience)
              fonctionne sans cookie : il identifie les visites uniques par
              hash quotidien anonyme, supprimé chaque nuit. Aucun consentement
              cookie n&apos;est donc requis sur Salairia.
            </p>
            <p>
              Si vous suivez un lien d&apos;affiliation depuis Salairia vers
              un partenaire externe (société de portage, banque pro, etc.),
              ce partenaire peut déposer ses propres cookies sur votre
              navigateur. Consultez la{" "}
              <Link
                href="/politique-cookies"
                className="text-primary underline-offset-4 transition hover:underline"
              >
                politique de cookies
              </Link>{" "}
              de chaque partenaire.
            </p>
          </Section>

          <Section title="Liens d'affiliation">
            <p>
              Certains liens présents sur Salairia (notamment dans nos
              comparateurs) peuvent être des liens d&apos;affiliation. Cela
              signifie que si vous cliquez sur ce lien et souscrivez ensuite
              au service du partenaire, Salairia peut percevoir une
              commission, sans surcoût pour vous.
            </p>
            <p>
              <strong>Cette commission ne biaise jamais notre
              classement.</strong>{" "}
              Nos comparatifs sont basés exclusivement sur des critères
              objectifs (frais, services inclus, qualité de
              l&apos;accompagnement) issus des grilles publiques. L&apos;ordre
              d&apos;affichage est déterminé par la pertinence pour
              l&apos;utilisateur, pas par le taux de commission.
            </p>
            <p>
              Cette transparence est un engagement éditorial fondamental de
              Salairia (voir notre page{" "}
              <Link
                href="/a-propos"
                className="text-primary underline-offset-4 transition hover:underline"
              >
                À propos
              </Link>
              ).
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD) et à la loi Informatique et Libertés, vous disposez des
              droits suivants :
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Droit d&apos;accès</strong> : obtenir confirmation de
                la collecte de vos données et copie de celles-ci
              </li>
              <li>
                <strong>Droit de rectification</strong> : corriger des
                données inexactes
              </li>
              <li>
                <strong>Droit à l&apos;effacement</strong> (« droit à
                l&apos;oubli ») : demander la suppression de vos données
              </li>
              <li>
                <strong>Droit d&apos;opposition</strong> : vous opposer au
                traitement de vos données
              </li>
              <li>
                <strong>Droit à la portabilité</strong> : récupérer vos
                données dans un format réutilisable
              </li>
            </ul>
            <p>
              Pour exercer ces droits : <MailLink />. Réponse sous 30 jours
              maximum.
            </p>
            <p>
              En cas de désaccord persistant, vous pouvez saisir la CNIL :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 transition hover:underline"
              >
                https://www.cnil.fr
              </a>
            </p>
          </Section>

          <Section title="Sécurité">
            <p>
              Salairia met en œuvre toutes les mesures techniques et
              organisationnelles raisonnables pour protéger vos données :
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>HTTPS obligatoire sur l&apos;ensemble du site</li>
              <li>
                Hébergement sur infrastructure Vercel (sécurité de niveau
                entreprise)
              </li>
              <li>
                Données analytics hébergées en Europe (Plausible, Allemagne)
              </li>
              <li>
                Aucun stockage de données utilisateur côté Salairia (pas de
                base de données contenant des informations personnelles)
              </li>
            </ul>
          </Section>

          <Section title="Modifications de cette politique">
            <p>
              Cette politique de confidentialité peut être mise à jour pour
              refléter les évolutions du site (nouveaux outils, nouvelles
              fonctionnalités) ou les évolutions réglementaires. La date de
              dernière mise à jour est indiquée en haut de page. Les
              modifications substantielles seront annoncées sur la page
              d&apos;accueil pendant 30 jours.
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

function MailLink() {
  return (
    <a
      href="mailto:contact@salairia.com"
      className="text-primary underline-offset-4 transition hover:underline"
    >
      contact@salairia.com
    </a>
  );
}
