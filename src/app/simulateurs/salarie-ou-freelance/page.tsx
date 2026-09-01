import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  ScaleIcon,
  ShieldIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import SalarieFreelanceApercuCard from "@/components/simulateurs/SalarieFreelanceApercuCard";
import { SalarieFreelanceProvider } from "@/components/simulateurs/SalarieFreelanceContext";
import SalarieFreelanceSimulator from "@/components/simulateurs/SalarieFreelanceSimulator";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import {
  comparerSalarieFreelance,
  SALARIE_FREELANCE_DEFAULTS,
} from "@/lib/calculators/salarie-freelance";

// Cas type rendu côté serveur pour le contenu éditorial : mêmes valeurs par
// défaut que le simulateur, donc mêmes chiffres que ce que voit l'utilisateur.
const ref = comparerSalarieFreelance(SALARIE_FREELANCE_DEFAULTS);
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const portageRef = ref.freelance.find((f) => f.statut === "portage")!;

export const metadata: Metadata = {
  title: "Salarié ou freelance : le comparateur qui répond en net",
  description: `CDI à ${EUR.format(SALARIE_FREELANCE_DEFAULTS.brutAnnuel)} bruts contre ${EUR.format(SALARIE_FREELANCE_DEFAULTS.tjm)} de TJM : net annuel des deux côtés, pour 4 statuts d'indépendant, et le TJM exact qu'il faut facturer pour ne rien perdre. Calculé avec les cotisations 2026.`,
  alternates: { canonical: "/simulateurs/salarie-ou-freelance" },
  openGraph: {
    title: "Salarié ou freelance : le comparateur qui répond en net",
    description: "Ton net en CDI face à ton net en freelance, 4 statuts, et le TJM d'équivalence.",
    url: "/simulateurs/salarie-ou-freelance",
  },
};

const faq = [
  {
    q: "Quel TJM faut-il facturer pour gagner autant qu'en CDI ?",
    r: `C'est exactement ce que calcule la colonne « TJM pour égaler le CDI » : par bissection, l'outil cherche pour chaque statut le taux journalier qui produit le même net annuel que ton salaire. Sur le cas type — ${EUR.format(SALARIE_FREELANCE_DEFAULTS.brutAnnuel)} bruts cadre, ${SALARIE_FREELANCE_DEFAULTS.joursParMois} jours facturés par mois —, il faut ${EUR.format(portageRef.tjmEquivalent)} par jour en portage salarial pour retrouver ${EUR.format(ref.cdi.netApresAnnuel)} nets. La seconde valeur ajoute 25 % de marge : c'est le TJM que nous conseillons réellement de viser, pour financer ce que le CDI couvre gratuitement.`,
  },
  {
    q: "Pourquoi comparer sur 18 jours par mois et pas 20 ou 22 ?",
    r: "Parce qu'un indépendant ne facture jamais tous les jours ouvrés. Congés (un salarié en a 25 payés, un freelance zéro), jours fériés, intermissions entre deux missions, prospection, administratif, formation, maladie : en mission à temps plein, 18 jours facturés par mois — 216 par an — est une hypothèse déjà optimiste. Beaucoup de freelances établis tournent entre 160 et 200 jours. Le curseur est libre : teste 15 jours pour voir ce qu'une année avec deux mois d'intermission fait au résultat.",
  },
  {
    q: "Le comparateur tient-il compte du chômage, de la retraite et de la mutuelle ?",
    r: "Il compare des revenus nets à prélèvements égaux, pas des protections. Or les différences sont majeures : le CDI cotise à l'assurance chômage (l'indépendant non, sauf en portage), valide des trimestres de retraite à plein sur tout le brut (le micro-entrepreneur valide moins à revenu égal), et bénéficie d'une mutuelle financée à 50 % au moins par l'employeur. Ces éléments ne sont pas monétisés dans les chiffres — ils sont listés dans la section « ce que les chiffres ne disent pas », et c'est précisément ce que la marge de 25 % sur le TJM est censée financer.",
  },
  {
    q: "Pourquoi le taux d'impôt est-il le même des deux côtés ?",
    r: "Pour comparer des choses comparables. Ton taux de prélèvement à la source dépend de ton foyer, pas de ton statut ; à revenu égal, l'impôt est quasi identique que tu sois salarié ou indépendant en société. Appliquer le même taux aux deux colonnes isole l'effet du statut — cotisations, frais de gestion, frais de comptabilité — de l'effet fiscal. Seule exception réelle : le versement libératoire du micro-entrepreneur, qui peut modifier la donne pour les petits revenus et n'est pas modélisé ici.",
  },
  {
    q: "Mon employeur me coûte 65 000 € : pourquoi ne pas facturer ce montant-là ?",
    r: `Le coût employeur affiché sous la carte CDI (${EUR.format(ref.cdi.coutEmployeurAnnuel)} sur le cas type) est un excellent point d'ancrage pour négocier avec lui une bascule en freelance : c'est ce qu'il dépense déjà pour ton travail. Mais ce n'est pas ton net : une fois indépendant, ce montant redevient ton chiffre d'affaires, sur lequel tu paies tes propres cotisations. Facturer ton coût employeur te laisse, selon le statut, un net proche de ton net actuel — pas le double. La bonne nouvelle : c'est justement l'ordre de grandeur du TJM d'équivalence avec marge.`,
  },
];

const etapes = [
  { n: 1, t: "Renseigne ton CDI", d: "Brut annuel, statut cadre ou non-cadre, et ton taux de prélèvement à la source si tu veux comparer en net après impôt." },
  { n: 2, t: "Décris ton projet", d: "Le TJM que tu penses pouvoir facturer, le nombre réaliste de jours facturés par mois, et tes frais professionnels." },
  { n: 3, t: "Lis les deux colonnes", d: "Le net de chaque statut face à ton CDI, l'écart en euros et en %, et le TJM à facturer pour égaler — puis dépasser — ta situation actuelle." },
];

const nonChiffre = [
  { t: "Assurance chômage", cdi: "Cotisée, droits ARE en cas de rupture", free: "Aucune en micro, SASU ou EURL. Seul le portage salarial cotise.", lien: { label: "Guide portage et chômage", href: "/guides/portage-salarial-chomage" } },
  { t: "Congés payés", cdi: "25 jours ouvrés payés, minimum légal", free: "Chaque jour non facturé est un jour non payé — déjà intégré via les jours facturés, mais pas le droit au repos.", lien: { label: "Congés payés en portage", href: "/guides/conges-payes-portage-salarial" } },
  { t: "Retraite", cdi: "Trimestres et points sur tout le brut, part employeur comprise", free: "Variable selon le statut : le micro-entrepreneur valide moins à revenu égal, la SASU cotise comme un salarié, l'EURL au régime des indépendants.", lien: { label: "Comparer SASU et EURL", href: "/simulateurs/sasu-eurl" } },
  { t: "Mutuelle et prévoyance", cdi: "Mutuelle obligatoire financée à 50 % minimum par l'employeur, prévoyance cadre", free: "À souscrire et financer soi-même — comptez 50 à 150 € par mois, à intégrer dans les frais pro.", lien: null },
  { t: "Sécurité du revenu", cdi: "Salaire mensuel garanti, préavis, indemnités de rupture", free: "Revenu dépendant du carnet de commandes ; intermissions non financées.", lien: { label: "Indemnité de rupture conventionnelle", href: "/guides/indemnite-rupture-conventionnelle" } },
  { t: "Capacité d'emprunt", cdi: "Trois bulletins de paie suffisent aux banques", free: "Deux à trois bilans exigés ; le portage salarial est l'exception, ses bulletins étant des bulletins de salaire.", lien: { label: "Guide portage salarial", href: "/guides/portage-salarial" } },
];

const sources = [
  { label: "URSSAF — taux de cotisations salariales et patronales 2026", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" },
  { label: "URSSAF — auto-entrepreneur : taux de cotisations 2026", href: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html" },
  { label: "Unédic — droits des dirigeants et indépendants", href: "https://www.unedic.org/la-reglementation/fiches-thematiques" },
  { label: "Code du travail — congés payés, art. L3141-3 (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020687" },
];

const tocItems = [
  { id: "simulateur", label: "Simulateur" },
  { id: "resultats", label: "Résultats" },
  { id: "utilisation", label: "Comment utiliser" },
  { id: "non-chiffre", label: "Ce que les chiffres ne disent pas" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

export default function SalarieOuFreelancePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Comparateur salarié ou freelance 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      datePublished: "2026-08-23",
      dateModified: "2026-09-01",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description: "Compare le net annuel d'un CDI au net de quatre statuts d'indépendant, et calcule le TJM d'équivalence.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.r } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Simulateurs", item: `${SITE_URL}/simulateurs` },
        { "@type": "ListItem", position: 3, name: "Salarié ou freelance", item: `${SITE_URL}/simulateurs/salarie-ou-freelance` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <SalarieFreelanceProvider>
          <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
                <Link href="/" className="transition hover:text-primary">Accueil</Link>
                <span aria-hidden>›</span>
                <Link href="/simulateurs" className="transition hover:text-primary">Simulateurs</Link>
                <span aria-hidden>›</span>
                <span className="text-foreground">Salarié ou freelance</span>
              </nav>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
                <CalendarIcon className="h-3.5 w-3.5" />
                À jour septembre 2026
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Salarié ou freelance ?
              </h1>
              <p className="mt-3 text-2xl font-semibold text-accent sm:text-3xl">
                La réponse en net, pas en intuition
              </p>

              <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                <p>
                  Tu hésites à quitter ton CDI. La question n&apos;est pas
                  « est-ce que je gagnerais plus ? » mais « à partir de quel
                  TJM, avec quel statut, et en renonçant à quoi ? ». Cet outil
                  met ton salaire actuel face à quatre statuts d&apos;indépendant,
                  avec les vraies cotisations 2026 des deux côtés.
                </p>
                <p>
                  Sur le cas type — {EUR.format(SALARIE_FREELANCE_DEFAULTS.brutAnnuel)} bruts
                  cadre contre {EUR.format(SALARIE_FREELANCE_DEFAULTS.tjm)} de TJM sur{" "}
                  {SALARIE_FREELANCE_DEFAULTS.joursParMois} jours —, le CDI laisse{" "}
                  {EUR.format(ref.cdi.netApresAnnuel)} nets par an, le meilleur statut
                  freelance {EUR.format(ref.meilleur.netApresImpot)}. Le reste de la
                  décision se joue sur ce que les chiffres ne disent pas.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SalarieFreelanceApercuCard />
            </div>
          </section>

          <div className="mt-16 flex gap-12">
            <div className="min-w-0 flex-1 space-y-16">
              <SalarieFreelanceSimulator />

              <section id="utilisation" className="scroll-mt-24">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                  <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                    <IconBadge><CalculatorIcon className="h-4 w-4" /></IconBadge>
                    Comment utiliser cet outil
                  </h2>
                  <ol className="mt-8 grid gap-4 md:grid-cols-3">
                    {etapes.map((step) => (
                      <li key={step.n} className="group flex gap-4 rounded-xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                        <div aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-sm">{step.n}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{step.t}</h3>
                          <p className="mt-1 text-base leading-relaxed text-foreground/80">{step.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8 rounded-r-lg border-l-4 border-primary bg-muted p-4 text-sm leading-relaxed text-foreground/80">
                    <strong className="text-foreground">Comment lire le TJM d&apos;équivalence.</strong>{" "}
                    La première valeur est le taux journalier qui reproduit ton
                    net actuel, à l&apos;euro près. La seconde ajoute 25 % : c&apos;est
                    la marge qui finance ce que ton employeur couvre aujourd&apos;hui
                    sans que tu le voies — intermissions, absence de chômage,
                    mutuelle, jours de prospection. Viser la première, c&apos;est
                    accepter de perdre en protection à revenu égal ; viser la
                    seconde, c&apos;est se donner les moyens de l&apos;indépendance.
                  </div>
                </div>
              </section>

              <section id="non-chiffre" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge><ShieldIcon className="h-4 w-4" /></IconBadge>
                  Ce que les chiffres ne disent pas
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  Six différences structurelles entre les deux statuts, qui
                  n&apos;apparaissent sur aucun bulletin mais pèsent sur dix ans.
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
                  <table className="w-full min-w-[44rem] text-left text-sm">
                    <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-5 py-4">&nbsp;</th>
                        <th className="px-5 py-4">En CDI</th>
                        <th className="px-5 py-4">En freelance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nonChiffre.map((l) => (
                        <tr key={l.t} className="border-b border-border align-top last:border-b-0">
                          <td className="px-5 py-4 font-semibold text-foreground">{l.t}</td>
                          <td className="px-5 py-4 text-foreground/80">{l.cdi}</td>
                          <td className="px-5 py-4 text-foreground/80">
                            {l.free}
                            {l.lien && (
                              <Link href={l.lien.href} className="mt-1 block text-xs font-semibold text-primary underline-offset-4 hover:underline">
                                {l.lien.label} →
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                  <p className="flex items-start gap-3 text-base leading-relaxed text-foreground/80">
                    <ScaleIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>
                      Le portage salarial occupe une place à part dans ce
                      tableau : c&apos;est le seul statut d&apos;indépendant qui
                      conserve l&apos;essentiel de la colonne CDI — chômage,
                      bulletins de salaire, prévoyance — au prix des frais de
                      gestion. Si la protection pèse lourd dans ta décision,{" "}
                      <Link href="/simulateurs/portage-salarial" className="font-semibold text-primary underline-offset-4 hover:underline">
                        le simulateur portage
                      </Link>{" "}
                      détaille ce compromis société par société.
                    </span>
                  </p>
                </div>
              </section>

              <section id="faq" className="scroll-mt-24">
                <h2 className="flex items-center text-3xl font-bold tracking-tight text-foreground">
                  <IconBadge><MessageCircleIcon className="h-4 w-4" /></IconBadge>
                  Questions fréquentes
                </h2>
                <div className="mt-6 flex flex-col gap-4">
                  {faq.map((item) => (
                    <details key={item.q} className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-foreground">
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
                    {sources.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline-offset-4 transition hover:underline">
                          {s.label}<span aria-hidden className="ml-1 text-xs">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs italic text-muted-foreground">
                    Dernière mise à jour : septembre 2026. Cet outil réutilise les
                    calculs et constantes des simulateurs brut/net et TJM
                    freelance ; il ne se substitue pas à l&apos;avis d&apos;un
                    expert-comptable pour une décision de changement de statut.
                  </p>
                </div>
              </section>
            </div>

            <TocSidebar items={tocItems} />
          </div>
        </SalarieFreelanceProvider>
      </div>
    </>
  );
}
