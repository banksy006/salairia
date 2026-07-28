import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  MailIcon,
  AlertTriangleIcon,
  BriefcaseIcon,
  FileTextIcon,
  ShieldIcon,
  MessageCircleIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter Salairia : signaler une erreur de calcul, poser une question sur un simulateur, solliciter une interview ou une donnée pour un article de presse.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact | Salairia",
    description:
      "Signaler une erreur, poser une question sur un calcul, ou solliciter une donnée pour un article.",
    url: "/contact",
  },
};

const tocItems = [
  { id: "erreur", label: "Signaler une erreur" },
  { id: "question", label: "Question sur un calcul" },
  { id: "presse", label: "Presse et médias" },
  { id: "partenariat", label: "Partenariats" },
  { id: "donnees", label: "Données personnelles" },
] as const;

const EMAIL = "contact@salairia.com";

export default function ContactPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Salairia",
      description:
        "Page de contact de Salairia : signalement d'erreur, questions sur les calculs, demandes presse et partenariats.",
      url: `${SITE_URL}/contact`,
      inLanguage: "fr-FR",
      datePublished: "2026-07-27",
      dateModified: "2026-07-27",
      publisher: {
        "@type": "Organization",
        name: "Salairia",
        url: SITE_URL,
        email: EMAIL,
        founder: {
          "@type": "Person",
          name: "Nizar Laghrifi",
          url: `${SITE_URL}/a-propos`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: EMAIL,
          contactType: "customer support",
          availableLanguage: ["fr"],
          areaServed: "FR",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav
          aria-label="Fil d'Ariane"
          className="flex items-center gap-2 text-sm text-foreground/70"
        >
          <Link href="/" className="transition hover:text-primary">
            Accueil
          </Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Contact</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          Mis à jour juillet 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Contact
        </h1>
        <p className="mt-3 max-w-3xl text-xl text-muted-foreground">
          Une seule adresse, lue par la personne qui écrit le site.
        </p>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Adresse unique
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-2 inline-flex items-center gap-3 text-2xl font-bold text-primary underline-offset-4 hover:underline sm:text-3xl"
          >
            <MailIcon className="h-7 w-7 shrink-0" />
            {EMAIL}
          </a>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
            Salairia est édité par une seule personne,{" "}
            <Link
              href="/a-propos"
              className="text-primary underline-offset-4 hover:underline"
            >
              Nizar Laghrifi
            </Link>
            . Il n&apos;y a ni formulaire, ni service client, ni numéro de
            téléphone : tu écris, je lis. Compte en général deux à trois jours
            ouvrés pour une réponse — davantage en période de mise à jour des
            barèmes.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-12">
            <section id="erreur" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge>
                  <AlertTriangleIcon className="w-4 h-4" />
                </IconBadge>
                Signaler une erreur de calcul
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  C&apos;est le message le plus utile que tu puisses envoyer.
                  Salairia publie des chiffres qui servent à prendre des
                  décisions financières : un taux périmé ou une formule fausse a
                  des conséquences réelles, et une erreur signalée est corrigée
                  en priorité sur tout le reste.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Pour que la correction soit rapide, précise dans ton message :
                </p>
                <ul className="mt-4 space-y-2 text-base text-foreground/80">
                  <li className="flex gap-3">
                    <span aria-hidden className="text-accent">
                      ✅
                    </span>
                    la page concernée (son adresse suffit) ;
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-accent">
                      ✅
                    </span>
                    les valeurs que tu as saisies dans le simulateur ;
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-accent">
                      ✅
                    </span>
                    le résultat obtenu et celui que tu attendais ;
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-accent">
                      ✅
                    </span>
                    si possible, ta source (URSSAF, BOSS, Legifrance, INSEE).
                  </li>
                </ul>
                <p className="mt-6 text-base leading-relaxed text-foreground/80">
                  Nos taux et leur provenance sont détaillés sur la page{" "}
                  <Link
                    href="/methodologie"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Méthodologie
                  </Link>{" "}
                  — elle répond peut-être déjà à ta question.
                </p>
              </div>
            </section>

            <section id="question" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge>
                  <MessageCircleIcon className="w-4 h-4" />
                </IconBadge>
                Question sur un calcul
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Chaque simulateur a sa propre FAQ en bas de page, et chaque
                  guide détaille les mécanismes de calcul. Commence par là :
                  c&apos;est plus rapide qu&apos;un aller-retour par mail.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/simulateurs"
                    className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition hover:border-primary hover:shadow-md"
                  >
                    Tous les simulateurs
                  </Link>
                  <Link
                    href="/guides"
                    className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition hover:border-primary hover:shadow-md"
                  >
                    Tous les guides
                  </Link>
                  <Link
                    href="/comparateurs"
                    className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition hover:border-primary hover:shadow-md"
                  >
                    Comparateurs
                  </Link>
                </div>
                <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
                  <p className="text-sm leading-relaxed">
                    <strong>Ce que je ne peux pas faire :</strong> te donner un
                    conseil personnalisé sur ta situation fiscale ou sociale.
                    Salairia publie des outils et de la documentation, pas des
                    recommandations individuelles. Pour un arbitrage qui engage
                    ton argent — changement de statut, optimisation de
                    rémunération — passe par un expert-comptable.
                  </p>
                </div>
              </div>
            </section>

            <section id="presse" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge>
                  <FileTextIcon className="w-4 h-4" />
                </IconBadge>
                Presse et médias
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Journalistes, rédactions, podcasts : je réponds volontiers sur
                  la rémunération des indépendants, le portage salarial, les
                  statuts freelance et le calcul du salaire net. Réponse sous
                  24 h pour les demandes avec deadline — précise-la dans
                  l&apos;objet du mail.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Les chiffres publiés sur le site sont réutilisables avec
                  citation de la source et lien vers la page d&apos;origine.
                  Chaque donnée est reliée à sa source officielle, et les dates
                  de dernière vérification sont affichées sur chaque page.
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=Demande%20presse`}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  <MailIcon className="h-4 w-4" />
                  Demande presse
                </a>
              </div>
            </section>

            <section id="partenariat" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge>
                  <BriefcaseIcon className="w-4 h-4" />
                </IconBadge>
                Partenariats et affiliation
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Sociétés de portage, banques professionnelles, cabinets
                  comptables : les propositions de partenariat sont les
                  bienvenues, à une condition non négociable.
                </p>
                <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
                  <p className="text-sm leading-relaxed text-foreground/80">
                    <strong className="text-foreground">
                      Le classement ne s&apos;achète pas.
                    </strong>{" "}
                    Nos comparatifs sont ordonnés sur des critères objectifs —
                    frais, services inclus, garanties. Une rémunération
                    d&apos;affiliation finance le site, elle ne modifie jamais
                    l&apos;ordre des résultats ni le contenu d&apos;un avis.
                    Toute demande visant à faire remonter une société dans un
                    classement sera déclinée.
                  </p>
                </div>
                <p className="mt-5 text-base leading-relaxed text-foreground/80">
                  Si tu repères une donnée inexacte sur ta société dans l&apos;un
                  de nos comparatifs — un tarif qui a changé, un service ajouté —
                  écris-nous : c&apos;est traité comme un signalement
                  d&apos;erreur, gratuitement et sans contrepartie.
                </p>
              </div>
            </section>

            <section id="donnees" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge>
                  <ShieldIcon className="w-4 h-4" />
                </IconBadge>
                Données personnelles
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Salairia ne dépose aucun cookie de traçage et ne collecte
                  aucune donnée saisie dans les simulateurs : tous les calculs
                  s&apos;exécutent dans ton navigateur et rien n&apos;est envoyé
                  sur un serveur. Concrètement, nous n&apos;avons pas de compte
                  à ton nom, donc rien à te transmettre ni à supprimer.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Si tu nous as écrit, ton adresse email figure évidemment dans
                  notre boîte de réception — tu peux demander sa suppression à
                  tout moment à la même adresse. Le détail est sur la{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    politique de confidentialité
                  </Link>{" "}
                  et la{" "}
                  <Link
                    href="/politique-cookies"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    politique cookies
                  </Link>
                  .
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  L&apos;identité de l&apos;éditeur et de l&apos;hébergeur est
                  publiée sur les{" "}
                  <Link
                    href="/mentions-legales"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    mentions légales
                  </Link>
                  .
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
