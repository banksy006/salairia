import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import { CalendarIcon, ShieldIcon } from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Politique cookies | Salairia",
  description:
    "Salairia n'utilise aucun cookie de traçage ni publicitaire. Découvrez notre engagement de respect total de votre vie privée.",
  alternates: {
    canonical: "/politique-cookies",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Politique cookies | Salairia",
    description:
      "Salairia n'utilise aucun cookie de traçage ni publicitaire. Découvrez notre engagement de respect total de votre vie privée.",
    url: "/politique-cookies",
  },
};

const tocItems = [
  { id: "hero-cookie", label: "Aucun cookie" },
  { id: "pourquoi", label: "Pourquoi pas de cookie" },
  { id: "technique", label: "Cookies techniques" },
  { id: "tiers", label: "Cookies tiers" },
  { id: "verifier", label: "Comment vérifier" },
] as const;

export default function PolitiqueCookiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Politique cookies",
        item: `${SITE_URL}/politique-cookies`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <section>
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-2 text-sm text-foreground/70"
          >
            <Link href="/" className="transition hover:text-primary">
              Accueil
            </Link>
            <span aria-hidden>›</span>
            <span className="text-foreground">Politique cookies</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="w-3.5 h-3.5" />
            Mis à jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Politique relative aux cookies
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-foreground/80">
            Salairia n&apos;utilise aucun cookie traceur.
          </p>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-8">
            <div id="hero-cookie" className="scroll-mt-24 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-10 text-center shadow-md sm:p-12">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto">
                <ShieldIcon className="w-8 h-8" />
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Aucun cookie de traçage sur Salairia
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground sm:text-lg">
                Vous pouvez naviguer librement sur Salairia sans donner aucun
                consentement. Nous ne déposons aucun cookie publicitaire,
                analytique traceur, ou de profilage sur votre navigateur.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                C&apos;est l&apos;engagement de Salairia : respect total de votre
                vie privée.
              </p>
            </div>

            <Section title="Pourquoi pas de cookie ?" id="pourquoi">
              <p>
                La plupart des sites utilisent des cookies pour suivre leurs
                visiteurs (Google Analytics, Facebook Pixel, services
                publicitaires, etc.). Cela impose un bandeau de consentement
                intrusif et collecte des données personnelles.
              </p>
              <p>
                Nous avons fait le choix inverse : aucun cookie traceur, aucun
                service tiers de profilage. Pour mesurer notre audience, nous
                utilisons Plausible Analytics (Allemagne), un outil RGPD-by-
                design qui fonctionne sans cookie ni identifiant personnel.
              </p>
            </Section>

            <Section title="Cookies techniques essentiels" id="technique">
              <p>
                Salairia ne dépose <strong>aucun</strong> cookie technique (pas
                même de session). Si vous utilisez nos simulateurs, vos données
                restent uniquement dans votre navigateur le temps de votre
                visite, et ne sont jamais transmises à nos serveurs.
              </p>
            </Section>

            <Section title="Cookies tiers (liens d'affiliation)" id="tiers">
              <p>
                Si vous cliquez sur un lien partenaire depuis Salairia (lien
                d&apos;affiliation vers une société de portage, une banque pro,
                etc.), le site partenaire peut déposer ses propres cookies sur
                votre navigateur, indépendamment de Salairia.
              </p>
              <p>
                Consultez la politique cookies de chaque partenaire pour
                comprendre ces traceurs et exercer vos choix.
              </p>
            </Section>

            <Section title="Comment vérifier" id="verifier">
              <p>
                Vous pouvez vérifier vous-même qu&apos;aucun cookie n&apos;est
                déposé par Salairia :
              </p>
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  Ouvrez les outils développeur de votre navigateur (touche F12
                  sur Chrome/Firefox)
                </li>
                <li>
                  Allez dans l&apos;onglet « Application » (Chrome) ou
                  « Stockage » (Firefox)
                </li>
                <li>
                  Section « Cookies » &gt; « salairia.com »
                </li>
                <li>Vous ne devriez voir aucun cookie listé.</li>
              </ol>
              <p>
                Cette transparence est un engagement éditorial fort de Salairia.
              </p>
            </Section>
          </div>

          <TocSidebar items={tocItems} />
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`rounded-2xl border border-border bg-white p-8 shadow-sm${id ? " scroll-mt-24" : ""}`}
    >
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}
