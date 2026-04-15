import type { Metadata } from "next";
import Link from "next/link";
import ApercuCard from "@/components/simulateurs/ApercuCard";
import { PortageProvider } from "@/components/simulateurs/PortageContext";
import PortageSimulator from "@/components/simulateurs/PortageSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "Simulateur Portage Salarial 2026 : calculez votre salaire net (5 sociétés)",
  description:
    "Simulateur gratuit et neutre pour calculer votre salaire net en portage salarial. Comparez ITG, OpenWork, Cadres en Mission, ABC Portage, CEGELEM. Taux 2026.",
  openGraph: {
    title:
      "Simulateur Portage Salarial 2026 : calculez votre salaire net (5 sociétés)",
    description:
      "Simulateur gratuit et neutre pour calculer votre salaire net en portage salarial. Comparez ITG, OpenWork, Cadres en Mission, ABC Portage, CEGELEM. Taux 2026.",
  },
};

const faq = [
  {
    q: "Combien je touche en portage avec un TJM de 500 € ?",
    r: "Avec un TJM de 500 € HT et 18 jours travaillés par mois, vous réalisez 9 000 € de chiffre d'affaires HT. Après 8 % de frais de gestion, environ 43 % de charges patronales puis 22 % de charges salariales, il vous reste environ 3 700 € nets avant impôt. Ce montant varie selon la société de portage, votre mutuelle et votre prévoyance.",
  },
  {
    q: "Quel est le salaire minimum en portage salarial ?",
    r: "La convention collective du portage salarial (IDCC 3219) impose un salaire brut minimum calculé en pourcentage du PASS mensuel : 70 % pour un junior, 75 % pour un senior, 85 % pour un salarié en forfait jours. En 2026, avec un PASS mensuel de 4 005 €, cela représente respectivement 2 803,50 €, 3 003,75 € et 3 404,25 € bruts mensuels.",
  },
  {
    q: "Quelle différence entre portage salarial et freelance ?",
    r: "Le freelance (micro-entreprise, EI, EURL) facture directement ses clients et gère lui-même ses cotisations. Le porté salarié, lui, signe un contrat de travail avec une société de portage qui facture le client et lui reverse un salaire après déduction des charges et des frais de gestion. Le porté bénéficie du statut de salarié (chômage, retraite, prévoyance) mais paye beaucoup plus de charges qu'un auto-entrepreneur.",
  },
  {
    q: "Comment choisir sa société de portage ?",
    r: "Trois critères comptent : le taux de frais de gestion (de 4 à 10 % en général), les services inclus (mutuelle, prévoyance, assurance RC pro, formation) et la qualité de l'accompagnement. Un taux bas n'est pas toujours le meilleur choix : certaines sociétés facturent des frais cachés ou offrent moins de services. Utilisez notre comparateur ci-dessus comme point de départ.",
  },
  {
    q: "Le portage salarial est-il avantageux fiscalement ?",
    r: "Non, le portage est plus coûteux en charges que la micro-entreprise ou la SASU à l'IS. Son intérêt est ailleurs : ouverture des droits au chômage, couverture sociale complète de salarié, simplicité administrative (pas de compta à gérer), et accès à des missions qui exigent un statut salarié. Pour une pure optimisation fiscale, d'autres statuts sont plus adaptés.",
  },
];

const etapes = [
  {
    n: 1,
    t: "Chiffre d'affaires HT",
    d: "TJM × nombre de jours travaillés dans le mois. C'est le montant que la société de portage facture à votre client final.",
  },
  {
    n: 2,
    t: "Frais de gestion",
    d: "La société de portage prélève entre 4 et 10 % du CA HT. Ce pourcentage rémunère ses services : facturation, paie, accompagnement, assurance.",
  },
  {
    n: 3,
    t: "Charges patronales",
    d: "Environ 43 % sont prélevés sur la base restante (CA − frais de gestion − frais professionnels non refacturables). Ce sont les cotisations employeur : URSSAF, retraite, chômage, prévoyance.",
  },
  {
    n: 4,
    t: "Salaire brut",
    d: "Ce qu'il reste après les charges patronales. C'est le salaire qui apparaît sur votre bulletin de paie avant cotisations salariales.",
  },
  {
    n: 5,
    t: "Charges salariales",
    d: "Environ 22 % du salaire brut : cotisations salariales de retraite, chômage, CSG/CRDS. Elles sont prélevées directement sur la fiche de paie.",
  },
  {
    n: 6,
    t: "Salaire net",
    d: "Le montant versé sur votre compte bancaire. Si vous avez renseigné un taux de prélèvement à la source, l'impôt est retiré pour obtenir le net après impôt.",
  },
];

const sources = [
  {
    label: "URSSAF.fr — taux de cotisations 2026",
    href: "https://www.urssaf.fr",
  },
  {
    label: "BOSS.gouv.fr — Bulletin officiel de la Sécurité sociale",
    href: "https://boss.gouv.fr",
  },
  {
    label: "Convention collective du portage salarial (IDCC 3219)",
    href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/",
  },
  { label: "ITG — grille tarifaire", href: "https://www.itg.fr" },
  {
    label: "Cadres en Mission — grille tarifaire",
    href: "https://www.cadresenmission.com",
  },
  { label: "OpenWork — grille tarifaire", href: "https://www.openwork.cc" },
  {
    label: "ABC Portage — grille tarifaire",
    href: "https://www.abcportage.fr",
  },
  { label: "CEGELEM — grille tarifaire", href: "https://www.cegelem.fr" },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "comparatif", label: "Comparatif sociétés" },
  { id: "etapes", label: "Comprendre le calcul" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function PortageSalarialPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur Portage Salarial 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description:
        "Simulateur gratuit pour calculer son salaire net en portage salarial à partir de son TJM, avec comparatif des principales sociétés.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.r,
        },
      })),
    },
    {
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
          name: "Simulateurs",
          item: "https://salairia.fr/simulateurs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Portage salarial",
          item: "https://salairia.fr/simulateurs/portage-salarial",
        },
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
        <PortageProvider>
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <nav
                aria-label="Fil d'Ariane"
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Link href="/" className="transition hover:text-primary">
                  Accueil
                </Link>
                <span aria-hidden>›</span>
                <Link
                  href="/simulateurs"
                  className="transition hover:text-primary"
                >
                  Simulateurs
                </Link>
                <span aria-hidden>›</span>
                <span className="text-foreground">Portage salarial</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <span aria-hidden>📅</span>
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simulateur Portage Salarial 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Calculez votre salaire net en temps réel
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Le portage salarial permet à un indépendant de facturer ses
                  clients tout en gardant le statut de salarié : une société de
                  portage encaisse le chiffre d&apos;affaires, prélève ses
                  frais de gestion, puis verse un salaire après cotisations
                  patronales et salariales.
                </p>
                <p>
                  Ce simulateur estime votre salaire net mensuel à partir de
                  votre TJM, et compare automatiquement cinq sociétés parmi
                  les plus connues : ITG, Cadres en Mission, OpenWork, ABC
                  Portage et CEGELEM. Taux moyens 2026.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <PortageSimulator />

              <section id="etapes" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    📐 Comprendre le calcul en 6 étapes
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                    Voici, étape par étape, comment votre chiffre
                    d&apos;affaires se transforme en salaire net.
                    L&apos;ordre des déductions est imposé par la
                    réglementation : toute erreur de séquence fausse le
                    résultat.
                  </p>

                  <ol className="mt-8 grid gap-4 md:grid-cols-2">
                    {etapes.map((step) => (
                      <li
                        key={step.n}
                        className="group flex gap-4 rounded-xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                      >
                        <div
                          aria-hidden
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-sm"
                        >
                          {step.n}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {step.t}
                          </h3>
                          <p className="mt-1 text-base leading-relaxed text-foreground/80">
                            {step.d}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  💬 Questions fréquentes
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Les questions qu&apos;on nous pose le plus souvent sur le
                  portage salarial.
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  {faq.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-foreground">
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

              <section id="sources" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    📚 Sources
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les données utilisées dans ce simulateur proviennent des
                    publications officielles et des grilles tarifaires
                    publiques des sociétés de portage.
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {sources.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary underline-offset-4 transition hover:underline"
                        >
                          {s.label}
                          <span aria-hidden className="ml-1 text-xs">
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Dernière mise à jour : 15 avril 2026. Les taux de charges
                    sont des moyennes indicatives, pas un barème URSSAF
                    exhaustif.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </PortageProvider>
      </div>
    </>
  );
}
