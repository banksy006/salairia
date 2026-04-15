import type { Metadata } from "next";
import Link from "next/link";
import PortageSimulator from "@/components/simulateurs/PortageSimulator";

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

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-primary"
          >
            Salairia
          </Link>
          <span className="text-sm text-muted-foreground">
            Votre rémunération, sans zone d&apos;ombre
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <Link href="/simulateurs" className="hover:text-primary">
            Simulateurs
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Portage salarial</span>
        </nav>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Simulateur Portage Salarial 2026 — Calculez votre salaire net
        </h1>

        <div className="mt-6 max-w-3xl space-y-3 text-base text-muted-foreground sm:text-lg">
          <p>
            Le portage salarial permet à un indépendant de facturer ses clients
            tout en gardant le statut de salarié : une société de portage
            encaisse le chiffre d&apos;affaires, prélève ses frais de gestion,
            puis verse un salaire après cotisations patronales et salariales.
          </p>
          <p>
            Ce simulateur estime votre salaire net mensuel à partir de votre
            TJM, et compare automatiquement cinq sociétés de portage parmi les
            plus connues : ITG, Cadres en Mission, OpenWork, ABC Portage et
            CEGELEM.
          </p>
          <p>
            Les taux utilisés sont des moyennes indicatives 2026 : 43 % de
            charges patronales, 22 % de charges salariales, et un PASS mensuel
            de 4 005 €. Les montants réels dépendent de votre société, de
            votre mutuelle et de votre prévoyance.
          </p>
        </div>

        <div className="mt-12">
          <PortageSimulator />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Comprendre le calcul en 6 étapes
          </h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Voici, étape par étape, comment votre chiffre d&apos;affaires se
            transforme en salaire net. Chaque déduction suit un ordre précis :
            toute erreur de séquence fausse le résultat final.
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
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
            ].map((step) => (
              <li
                key={step.n}
                className="rounded-xl border border-border bg-muted/30 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.n}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {step.t}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{step.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Questions fréquentes
          </h2>
          <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-background">
            {faq.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-foreground">
                  {item.q}
                  <span className="text-primary transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.r}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl space-y-2 px-6 py-8 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Sources</p>
          <ul className="list-inside list-disc space-y-1">
            <li>URSSAF.fr — taux de cotisations 2026</li>
            <li>BOSS.gouv.fr — Bulletin officiel de la Sécurité sociale</li>
            <li>
              Convention collective nationale du portage salarial (IDCC 3219)
            </li>
            <li>
              Grilles tarifaires publiques 2026 : ITG, Cadres en Mission,
              OpenWork, ABC Portage, CEGELEM
            </li>
          </ul>
          <p className="pt-2 text-xs">
            Dernière mise à jour : 15 avril 2026. Les taux de charges sont des
            moyennes indicatives, pas un barème URSSAF exhaustif.
          </p>
        </div>
      </footer>
    </>
  );
}
