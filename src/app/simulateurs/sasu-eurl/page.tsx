import type { Metadata } from "next";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ScaleIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import SasuEurlApercuCard from "@/components/simulateurs/SasuEurlApercuCard";
import { SasuEurlProvider } from "@/components/simulateurs/SasuEurlContext";
import SasuEurlSimulator from "@/components/simulateurs/SasuEurlSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";

export const metadata: Metadata = {
  title:
    "Simulateur SASU vs EURL 2026 — Comparez charges, dividendes et revenu net",
  description:
    "Quel statut rapporte le plus ? Comparez SASU et EURL côte à côte : charges sociales, IS, dividendes et revenu net total. Simulateur gratuit avec taux 2026.",
  alternates: { canonical: "/simulateurs/sasu-eurl" },
  openGraph: {
    title:
      "Simulateur SASU vs EURL 2026 — Comparez charges, dividendes et revenu net",
    description:
      "Quel statut rapporte le plus ? Comparez SASU et EURL côte à côte : charges sociales, IS, dividendes et revenu net total. Simulateur gratuit avec taux 2026.",
    url: "/simulateurs/sasu-eurl",
  },
};

const faq = [
  {
    q: "Quelle est la principale différence entre SASU et EURL ?",
    r: "Le régime social du dirigeant. En SASU, le président est assimilé-salarié (régime général) : il bénéficie de la même couverture qu'un cadre, mais les charges sociales totales atteignent ~62 % du brut. En EURL, le gérant est Travailleur Non Salarié (TNS) : cotisations ~45 % du net, protection plus légère (pas de chômage, prévoyance à compléter via Madelin). À CA et rémunération identiques, l'EURL laisse souvent un net légèrement supérieur, mais avec une couverture sociale inférieure.",
  },
  {
    q: "Pourquoi les charges sociales sont-elles plus élevées en SASU ?",
    r: "Parce que le président de SASU cotise au régime général exactement comme un salarié cadre : sécurité sociale, AGIRC-ARRCO, CSG/CRDS, prévoyance. Ces cotisations financent une meilleure retraite complémentaire et des indemnités journalières maladie plus élevées. En contrepartie, le coût est supérieur de 15 à 20 points par rapport au régime TNS de l'EURL.",
  },
  {
    q: "Les dividendes sont-ils vraiment non imposables en SASU ?",
    r: "Non, les dividendes SASU sont imposés à la flat tax de 30 % (12,8 % d'IR + 17,2 % de prélèvements sociaux). Mais — et c'est l'avantage clé — ils ne sont pas soumis aux cotisations sociales. En EURL, les dividendes dépassant 10 % du capital social sont requalifiés en revenu et soumis aux cotisations TNS (~45 %). Avec un capital de 1 000 €, quasiment tous vos dividendes EURL subiront cette double taxation.",
  },
  {
    q: "Peut-on passer de EURL à SASU (ou l'inverse) ?",
    r: "Oui, mais cela nécessite une transformation juridique : modification des statuts, publication d'annonce légale, formalités au greffe. Comptez 500 à 1 500 € et 3 à 6 semaines. La transformation EURL → SASU est la plus fréquente quand le dirigeant veut optimiser sa stratégie de dividendes ou préparer l'entrée d'investisseurs.",
  },
  {
    q: "Quel statut choisir si je veux maintenir mon ARE (chômage) ?",
    r: "Ni la SASU ni l'EURL ne cotisent au chômage pour le dirigeant. Cependant, si vous êtes actuellement bénéficiaire de l'ARE (allocation chômage) et que vous créez une société, la SASU est souvent préférée : vous pouvez ne pas vous verser de salaire et cumuler intégralement votre ARE avec les dividendes. En EURL, les dividendes au-delà de 10 % du capital sont assimilés à un revenu et peuvent réduire votre ARE.",
  },
  {
    q: "Faut-il un expert-comptable en SASU ou EURL ?",
    r: "Ce n'est pas légalement obligatoire, mais fortement recommandé. Les deux statuts imposent une comptabilité d'engagement (bilan, compte de résultat, liasse fiscale). Un expert-comptable en ligne coûte entre 80 et 200 €/mois. En SASU, il gère aussi les fiches de paie du président (obligatoires). Notre simulateur utilise un coût comptable moyen de 1 500 €/an dans ses calculs.",
  },
];

const differences = [
  ["Statut du dirigeant", "Assimilé-salarié (régime général)", "Travailleur Non Salarié (TNS)"],
  ["Charges sociales sur salaire", "~62 % du brut (~82 % du net)", "~45 % du net"],
  ["Protection sociale", "Complète (comme un cadre)", "Partielle (compléter Madelin)"],
  ["Cotisations sans rémunération", "Aucune (0 €)", "Minimales (~1 200 €/an)"],
  ["Dividendes", "Flat tax 30 %, zéro cotisations", "Flat tax 30 % ≤ 10 % capital, cotisations TNS au-delà"],
  ["Assurance chômage", "Non", "Non"],
  ["Fiche de paie", "Obligatoire", "Non"],
  ["IS", "15 % ≤ 42 500 € puis 25 %", "15 % ≤ 42 500 € puis 25 %"],
  ["Évolution (associés)", "Facile (→ SAS)", "Plus complexe (→ SARL)"],
  ["Idéal pour", "Fort CA, stratégie dividendes, levée de fonds", "CA modéré, charges réduites, simplicité"],
] as const;

const sourcesLinks = [
  { label: "service-public.fr — impôt sur les sociétés", href: "https://www.service-public.fr" },
  { label: "URSSAF — cotisations dirigeants", href: "https://www.urssaf.fr" },
  { label: "lecoindesentrepreneurs.fr — comparatif SASU/EURL", href: "https://www.lecoindesentrepreneurs.fr" },
  { label: "LégiSocial — taux cotisations TNS 2026", href: "https://www.legisocial.fr" },
  { label: "impots.gouv.fr — flat tax (PFU)", href: "https://www.impots.gouv.fr" },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "scenarios", label: "3 scénarios" },
  { id: "differences", label: "SASU vs EURL" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function SasuEurlPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simulateur SASU vs EURL 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description: "Comparateur SASU vs EURL côte à côte : charges sociales, IS, dividendes et revenu net total.",
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://salairia.fr/" },
        { "@type": "ListItem", position: 2, name: "Simulateurs", item: "https://salairia.fr/simulateurs" },
        { "@type": "ListItem", position: 3, name: "SASU / EURL", item: "https://salairia.fr/simulateurs/sasu-eurl" },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <SasuEurlProvider>
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
                <Link href="/" className="transition hover:text-primary">Accueil</Link>
                <span aria-hidden>›</span>
                <Link href="/simulateurs" className="transition hover:text-primary">Simulateurs</Link>
                <span aria-hidden>›</span>
                <span className="text-foreground">SASU / EURL</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="h-3.5 w-3.5" />
                À jour avril 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Simulateur SASU vs EURL 2026
              </h1>
              <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
                Quel statut rapporte le plus pour votre activité ?
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  SASU ou EURL : ce simulateur compare les deux structures côte à côte, avec le même chiffre d&apos;affaires, les mêmes charges et la même rémunération souhaitée. Vous voyez instantanément l&apos;impact sur votre revenu net total (salaire + dividendes) après charges sociales, IS et flat tax.
                </p>
                <p>
                  Taux 2026 vérifiés sur les sources officielles (URSSAF, service-public.fr, LégiSocial). Estimation simplifiée — consultez un expert-comptable pour une optimisation précise.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SasuEurlApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <SasuEurlSimulator />

              <section id="differences" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><ScaleIcon className="h-4 w-4" /></IconBadge>
                    SASU vs EURL : les vraies différences
                  </h2>

                  <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="px-5 py-3">Critère</th>
                          <th className="px-5 py-3">SASU</th>
                          <th className="px-5 py-3">EURL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {differences.map(([critere, sasu, eurl]) => (
                          <tr key={critere} className="border-b border-border last:border-b-0">
                            <td className="px-5 py-3 font-semibold text-foreground">{critere}</td>
                            <td className="px-5 py-3 text-foreground/80">{sasu}</td>
                            <td className="px-5 py-3 text-foreground/80">{eurl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge><MessageCircleIcon className="h-4 w-4" /></IconBadge>
                  Questions fréquentes
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Les questions les plus courantes sur le choix SASU ou EURL.
                </p>
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
                    Dernière mise à jour : avril 2026. Estimation simplifiée basée sur des taux moyens. Les cotisations TNS réelles dépendent du niveau de revenu (taux progressifs). Les cotisations SASU dépendent de la convention collective. Pour une optimisation précise, consultez un expert-comptable.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </SasuEurlProvider>
      </div>
    </>
  );
}
