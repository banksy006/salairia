import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  IconBadge,
  CalendarIcon,
  BuildingIcon,
  CalculatorIcon,
  ScaleIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import villesData from "@/data/cout-vie-villes.json";
import { calculerNetVersBrut } from "@/lib/calculators/salaire-brut-net";
import { calculerPercentile } from "@/lib/calculators/percentile-salaire";

// Les 5 plus grandes villes du jeu de données. Les 15 autres restent servies
// par le simulateur — on n'ouvre une page dédiée qu'aux volumes de recherche
// qui la justifient, pour éviter le contenu dupliqué à faible valeur.
const SLUGS = ["paris", "lyon", "marseille", "toulouse", "bordeaux"] as const;

interface Ville {
  id: string;
  nom: string;
  region: string;
  loyerT2: number;
  transport: number;
  alimentation: number;
  charges: number;
  transportMaj?: string;
}
const villes = villesData.villes as Ville[];
const getVille = (slug: string) => villes.find((v) => v.id === slug);

function computeVille(v: Ville) {
  const total = v.loyerT2 + v.transport + v.alimentation + v.charges;
  const budgetVie = Math.round(total / 0.7);
  const exigeBailleur = Math.round(v.loyerT2 / 0.3);
  const brut = Math.round(
    calculerNetVersBrut({
      salaire: budgetVie,
      mode: "net-vers-brut",
      periodicite: "mensuel",
      statut: "non-cadre",
      tauxPAS: 0,
    }).brutMensuel,
  );
  const pct = calculerPercentile({ salaireMensuelNet: budgetVie, csp: "Tous", age: "Tous" });
  const rang = [...villes].sort(
    (a, b) => b.loyerT2 + b.transport + b.alimentation + b.charges - (a.loyerT2 + a.transport + a.alimentation + a.charges),
  ).findIndex((x) => x.id === v.id) + 1;
  return { total, budgetVie, exigeBailleur, brut, pct, rang };
}

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function generateStaticParams() {
  return SLUGS.map((ville) => ({ ville }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const v = getVille(ville);
  if (!v) return {};
  const c = computeVille(v);
  return {
    title: `Quel salaire pour vivre à ${v.nom} en 2026 ? ${EUR.format(c.budgetVie)} net calculés`,
    description: `Vivre confortablement à ${v.nom} demande environ ${EUR.format(c.budgetVie)} nets par mois (${EUR.format(c.brut)} bruts) : loyer T2 ${EUR.format(v.loyerT2)}, transport, alimentation et charges détaillés. Et ${EUR.format(c.exigeBailleur)} de revenu exigé par les bailleurs.`,
    alternates: { canonical: `/villes/${v.id}` },
    openGraph: {
      title: `Quel salaire pour vivre à ${v.nom} en 2026 ?`,
      description: `${EUR.format(c.budgetVie)} nets par mois pour vivre confortablement, ${EUR.format(c.exigeBailleur)} exigés par les bailleurs. Détail calculé poste par poste.`,
      url: `/villes/${v.id}`,
    },
  };
}

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const v = getVille(ville);
  if (!v || !SLUGS.includes(v.id as (typeof SLUGS)[number])) notFound();
  const c = computeVille(v);
  const autres = SLUGS.filter((s) => s !== v.id).map((s) => {
    const x = getVille(s)!;
    return { v: x, c: computeVille(x) };
  });

  const repartition: BarDatum[] = [
    { label: "Loyer T2 (45 m²)", hint: `MeilleursAgents, juillet 2026`, value: v.loyerT2 },
    { label: "Alimentation", value: v.alimentation },
    { label: "Charges courantes", hint: "énergie, assurances, télécom", value: v.charges },
    { label: "Transports en commun", hint: v.transportMaj === "2026-04" ? "ordre de grandeur, avril 2026" : "tarif vérifié 2026", value: Math.round(v.transport) },
  ];

  const faq = [
    {
      q: `Quel salaire faut-il pour vivre à ${v.nom} ?`,
      r: `Nos calculs donnent deux repères. Pour vivre confortablement — couvrir ${EUR.format(c.total)} de dépenses mensuelles en gardant 30 % de marge — il faut environ ${EUR.format(c.budgetVie)} nets par mois, soit ${EUR.format(c.brut)} bruts pour un non-cadre. Pour convaincre un bailleur, la règle des trois fois le loyer exige ${EUR.format(c.exigeBailleur)} nets. Le second montant est ${c.exigeBailleur > c.budgetVie ? "plus élevé" : "plus faible"} : ${c.exigeBailleur > c.budgetVie ? "passer un dossier de location demande plus que ce qu'il faut pour vivre" : "à " + v.nom + ", le loyer pèse relativement moins que le reste du budget"}.`,
    },
    {
      q: `Ce salaire est-il courant en France ?`,
      r: `${EUR.format(c.budgetVie)} nets mensuels placent au ${c.pct.percentile}e percentile de la distribution française des salaires du privé (INSEE 2024, médiane à ${EUR.format(c.pct.mediane)}). ${c.pct.percentile > 50 ? `Autrement dit, plus de la moitié des salariés français gagnent moins que le budget de confort à ${v.nom} — ce qui explique les arbitrages : colocation, périphérie, ou surface plus petite.` : `C'est un niveau accessible à une majorité de salariés à temps plein.`}`,
    },
    {
      q: `D'où viennent les chiffres de cette page ?`,
      r: `Le loyer est le loyer moyen au m² publié par MeilleursAgents pour ${v.nom} au 1er juillet 2026, appliqué à un T2 de référence de 45 m². ${v.transportMaj === "2026-04" ? "Le poste transport est un ordre de grandeur relevé en avril 2026 — il pèse environ " + EUR.format(v.transport) + " sur un budget de " + EUR.format(c.total) + ", une imprécision de quelques euros y est sans effet matériel." : "Le tarif de transport a été vérifié sur la grille officielle du réseau en 2026."} Alimentation et charges sont des estimations INSEE ajustées par ville. Les conversions net-brut et le percentile sortent de nos simulateurs, avec les taux 2026.`,
    },
    {
      q: `Vaut-il mieux négocier son salaire ou chercher moins cher à ${v.nom} ?`,
      r: `Les deux leviers n'ont pas la même ampleur. Le loyer représente ${Math.round((v.loyerT2 / c.total) * 100)} % du budget type à ${v.nom} : dix pour cent de loyer en moins (quartier, surface, colocation) économisent ${EUR.format(v.loyerT2 * 0.1)} par mois nets d'impôt. Obtenir l'équivalent par le salaire suppose une augmentation brute supérieure, puisque cotisations et impôt s'en prélèvent une partie. Notre simulateur de négociation aide à situer votre marge réelle.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Quel salaire pour vivre à ${v.nom} en 2026 ?`,
      description: `Budget mensuel détaillé et salaire nécessaire pour vivre à ${v.nom}, calculés poste par poste.`,
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-08-19",
      dateModified: "2026-08-19",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/villes/${v.id}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Salaire par ville", item: `${SITE_URL}/villes` },
        { "@type": "ListItem", position: 3, name: v.nom, item: `${SITE_URL}/villes/${v.id}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/villes" className="transition hover:text-primary">Salaire par ville</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">{v.nom}</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour août 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Quel salaire pour vivre à {v.nom} ?
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          {EUR.format(c.budgetVie)} nets par mois pour vivre confortablement — {EUR.format(c.exigeBailleur)} pour convaincre un bailleur
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          {v.nom} est la {c.rang === 1 ? "ville la plus chère" : `${c.rang}e ville la plus chère`} des
          20 que nous suivons, avec {EUR.format(c.total)} de dépenses mensuelles
          incompressibles pour une personne seule en T2. Voici le budget poste
          par poste, les deux salaires de référence qui en découlent, et la
          comparaison avec les autres grandes villes — tout est calculé, rien
          n&apos;est estimé à la louche.
        </p>

        <div className="mt-12 space-y-16">
          <section id="budget" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><BuildingIcon className="w-4 h-4" /></IconBadge>
              Le budget mensuel à {v.nom}, poste par poste
            </h2>
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <BarChart
                caption={`Dépenses mensuelles type — personne seule, T2 de 45 m²`}
                data={repartition}
                footnote={`Total : ${EUR.format(c.total)} par mois. Loyer : ${EUR.format(v.loyerT2 / 45)}/m² × 45 m² (MeilleursAgents, 1er juillet 2026).`}
              />
              <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Les deux salaires de référence</p>
                <div className="mt-4 space-y-5">
                  <div>
                    <p className="text-sm text-muted-foreground">Vivre confortablement ({EUR.format(c.total)} de dépenses + 30 % de marge)</p>
                    <p className="text-3xl font-bold tabular-nums text-primary">{EUR.format(c.budgetVie)} <span className="text-base font-normal text-muted-foreground">net/mois</span></p>
                    <p className="text-sm text-muted-foreground">soit ~{EUR.format(c.brut)} bruts (non-cadre, taux 2026)</p>
                  </div>
                  <div className="border-t border-border pt-5">
                    <p className="text-sm text-muted-foreground">Revenu exigé par les bailleurs (3× le loyer)</p>
                    <p className="text-2xl font-bold tabular-nums text-foreground">{EUR.format(c.exigeBailleur)} <span className="text-base font-normal text-muted-foreground">net/mois</span></p>
                  </div>
                  <div className="border-t border-border pt-5">
                    <p className="text-sm text-muted-foreground">Où ce budget de confort se situe en France</p>
                    <p className="text-2xl font-bold tabular-nums text-foreground">{c.pct.percentile}e <span className="text-base font-normal text-muted-foreground">percentile des salaires du privé (INSEE 2024)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="comparaison" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
              {v.nom} face aux autres grandes villes
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
              <table className="w-full min-w-[38rem] text-left text-sm">
                <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Ville</th>
                    <th className="px-5 py-4 text-right">Loyer T2</th>
                    <th className="px-5 py-4 text-right">Budget mensuel</th>
                    <th className="px-5 py-4 text-right">Net pour vivre</th>
                    <th className="px-5 py-4 text-right">Écart vs {v.nom}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-accent/5">
                    <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">{v.nom}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{EUR.format(v.loyerT2)}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{EUR.format(c.total)}</td>
                    <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(c.budgetVie)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">—</td>
                  </tr>
                  {autres.map(({ v: x, c: cx }) => (
                    <tr key={x.id} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-3 font-semibold text-foreground">
                        <Link href={`/villes/${x.id}`} className="text-primary underline-offset-4 hover:underline">{x.nom}</Link>
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums">{EUR.format(x.loyerT2)}</td>
                      <td className="px-5 py-3 text-right tabular-nums">{EUR.format(cx.total)}</td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(cx.budgetVie)}</td>
                      <td className={`px-5 py-3 text-right tabular-nums ${cx.budgetVie < c.budgetVie ? "text-accent" : "text-foreground/70"}`}>
                        {cx.budgetVie === c.budgetVie ? "=" : `${cx.budgetVie < c.budgetVie ? "−" : "+"} ${EUR.format(Math.abs(cx.budgetVie - c.budgetVie))}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
              Les 20 villes — dont les moyennes comme Rennes, Dijon ou Brest —
              sont comparables deux à deux dans notre{" "}
              <Link href="/simulateurs/pouvoir-achat-ville" className="text-primary underline-offset-4 hover:underline">
                comparateur de pouvoir d&apos;achat
              </Link>
              , qui recalcule ces montants en direct.
            </p>
          </section>

          <section id="situer" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
              Et votre salaire à vous ?
            </h2>
            <div className="mt-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
              <p className="max-w-3xl text-base leading-relaxed text-foreground/80">
                Cette page décrit un budget type. Le vôtre dépend de votre
                loyer réel, de votre statut et de votre taux d&apos;imposition.
                Trois outils pour passer du cas type à votre cas :
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/simulateurs/salaire-brut-net" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
                  Convertir mon brut en net →
                </Link>
                <Link href="/simulateurs/ou-se-situe-mon-salaire" className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary">
                  Me situer dans la distribution française
                </Link>
                <Link href="/simulateurs/negociation-salariale" className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary">
                  Estimer ma marge de négociation
                </Link>
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
              Questions fréquentes
            </h2>
            <div className="mt-6 space-y-3">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-semibold text-foreground">
                    {f.q}
                    <span aria-hidden className="mt-1 shrink-0 text-xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">{f.r}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="sources" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
              Sources
            </h2>
            <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
              <ul className="space-y-3">
                <li><a href="https://www.meilleursagents.com" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">MeilleursAgents — loyers moyens au m² ({v.nom}, 1er juillet 2026)<span aria-hidden> ↗</span></a></li>
                <li><a href="https://www.insee.fr/fr/statistiques/8657156" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">INSEE — Les salaires dans le secteur privé en 2024<span aria-hidden> ↗</span></a></li>
                <li><a href="https://www.insee.fr" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">INSEE — indices des prix à la consommation<span aria-hidden> ↗</span></a></li>
              </ul>
              <p className="mt-6 text-xs italic text-muted-foreground">
                Dernière mise à jour : août 2026. Budget type pour une personne
                seule en T2 de 45 m², moyennes sur l&apos;ensemble de la ville.
                Les écarts entre quartiers peuvent être importants. Une erreur ?{" "}
                <Link href="/contact" className="text-primary underline-offset-4 hover:underline">Signalez-la</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
