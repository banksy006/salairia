import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import { CalendarIcon } from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Mentions légales | Salairia",
  description:
    "Informations légales relatives à Salairia : éditeur, hébergeur, propriété intellectuelle, limites de responsabilité.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mentions légales | Salairia",
    description:
      "Informations légales relatives à Salairia : éditeur, hébergeur, propriété intellectuelle, limites de responsabilité.",
    url: "/mentions-legales",
  },
};

const tocItems = [
  { id: "editeur", label: "Éditeur" },
  { id: "hebergeur", label: "Hébergeur" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "responsabilite", label: "Responsabilité" },
  { id: "liens", label: "Liens externes" },
  { id: "droit", label: "Droit applicable" },
] as const;

export default function MentionsLegalesPage() {
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
        name: "Mentions légales",
        item: `${SITE_URL}/mentions-legales`,
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
            <span className="text-foreground">Mentions légales</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
            <CalendarIcon className="w-3.5 h-3.5" />
            Mis à jour avril 2026
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Mentions légales
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-foreground/80">
            Informations légales relatives à Salairia.
          </p>
        </section>

        <div className="mt-16 flex gap-12">
          <div className="min-w-0 flex-1 space-y-8">
            <Section title="Éditeur du site" id="editeur">
              <ul className="space-y-2">
                <Dt label="Nom">Nizar Laghrifi</Dt>
                <Dt label="Statut">
                  Entreprise individuelle en cours d&apos;immatriculation
                </Dt>
                <Dt label="Adresse">
                  Paris, France (adresse précise communiquée sur demande à{" "}
                  <MailLink />)
                </Dt>
                <Dt label="Email">
                  <MailLink />
                </Dt>
                <Dt label="Directeur de la publication">Nizar Laghrifi</Dt>
              </ul>
            </Section>

            <Section title="Hébergeur du site" id="hebergeur">
              <ul className="space-y-2">
                <Dt label="Hébergeur">Vercel Inc.</Dt>
                <Dt label="Adresse">
                  340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                </Dt>
                <Dt label="Site web">
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 transition hover:underline"
                  >
                    https://vercel.com
                  </a>
                </Dt>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Vercel utilise une infrastructure CDN globale. Les données sont
                temporairement traitées dans plusieurs régions du monde, dont
                l&apos;Europe, conformément aux Standard Contractual Clauses
                (SCC) approuvées par la Commission européenne pour les
                transferts hors UE.
              </p>
            </Section>

            <Section title="Propriété intellectuelle" id="propriete">
              <p>
                L&apos;ensemble des contenus présents sur Salairia (textes,
                simulateurs, méthodologies de calcul, design, code source,
                marque « Salairia ») sont la propriété exclusive de Nizar
                Laghrifi, à l&apos;exception des données issues de sources
                publiques (URSSAF, BOSS, INSEE, Legifrance, DARES) qui restent
                la propriété de leurs émetteurs respectifs et sont citées avec
                attribution.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication
                ou adaptation totale ou partielle des éléments du site est
                interdite sans autorisation écrite préalable, sauf exceptions
                prévues à l&apos;article L.122-5 du Code de la propriété
                intellectuelle (courte citation avec mention de la source,
                etc.).
              </p>
              <p>
                Vous êtes invités à reproduire et partager les chiffres et
                études publiés par Salairia avec mention de la source
                («&nbsp;Source&nbsp;: Salairia.com&nbsp;») et lien retour vers
                la page d&apos;origine.
              </p>
            </Section>

            <Section title="Limites de responsabilité" id="responsabilite">
              <p>
                Salairia met tout en œuvre pour fournir des informations
                exactes et à jour, en s&apos;appuyant sur les sources
                officielles (URSSAF, BOSS.gouv.fr, Legifrance, INSEE, DARES).
                Toutefois :
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Tous les calculs et simulations sont{" "}
                  <strong>indicatifs</strong> et ne se substituent pas aux
                  décomptes officiels de l&apos;URSSAF, l&apos;administration
                  fiscale, votre employeur ou tout autre organisme habilité.
                </li>
                <li>
                  Salairia ne saurait être tenu responsable des décisions
                  prises sur la base des informations publiées sur le site.
                </li>
                <li>
                  Pour toute décision importante (changement de statut
                  juridique, négociation salariale, optimisation fiscale), nous
                  recommandons de consulter un expert-comptable, un avocat ou
                  un conseiller spécialisé.
                </li>
                <li>
                  En cas d&apos;erreur détectée dans nos contenus ou calculs,
                  merci de nous en informer à <MailLink /> pour correction sous
                  48h ouvrées.
                </li>
              </ul>
            </Section>

            <Section title="Liens externes" id="liens">
              <p>
                Salairia peut contenir des liens hypertextes vers d&apos;autres
                sites internet (sources officielles, sociétés de portage,
                banques pro, services de comptabilité, etc.). Ces sites sont
                indépendants de Salairia, qui ne saurait être responsable de
                leur contenu, de leur disponibilité ou des éventuels préjudices
                résultant de leur consultation ou utilisation.
              </p>
              <p>
                Certains liens peuvent être des liens d&apos;affiliation : voir
                notre page{" "}
                <Link
                  href="/politique-confidentialite"
                  className="text-primary underline-offset-4 transition hover:underline"
                >
                  Politique de confidentialité
                </Link>{" "}
                pour plus de détails sur leur fonctionnement et leurs
                implications.
              </p>
            </Section>

            <Section title="Droit applicable" id="droit">
              <p>
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige, et après tentative de résolution
                amiable, les tribunaux français seront seuls compétents. Pour
                toute question, contactez-nous à <MailLink />.
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

function Dt({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <span className="font-semibold text-foreground">{label} :</span>{" "}
      {children}
    </li>
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
