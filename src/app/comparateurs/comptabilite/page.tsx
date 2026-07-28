import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ScaleIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  InfoIcon,
  ShieldIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import data from "@/data/compta-freelance.json";

export const metadata: Metadata = {
  title: "Comparatif comptabilité freelance 2026 : outils et cabinets en ligne",
  description:
    "Comparatif indépendant des solutions comptables pour freelances : Indy, Pennylane, L'Expert-Comptable, Dougs, Keobiz. Tarifs relevés en juillet 2026 sur les grilles officielles.",
  alternates: { canonical: "/comparateurs/comptabilite" },
  openGraph: {
    title: "Comparatif comptabilité freelance 2026 : outils et cabinets en ligne",
    description:
      "Outils autonomes de 0 à 24 € ou cabinets d'expertise comptable de 39 à 159 € : deux marchés différents, comparés séparément.",
    url: "/comparateurs/comptabilite",
  },
};

const outils = [...data.outils].sort((a, b) => a.prixMensuelHT - b.prixMensuelHT);
const cabinets = [...data.cabinets].sort(
  (a, b) => (a.prixMensuelHT ?? 9_999) - (b.prixMensuelHT ?? 9_999),
);

const faq = [
  {
    q: "Un freelance a-t-il besoin d'un expert-comptable ?",
    r: "En micro-entreprise, non : la comptabilité se limite à un livre de recettes, et la déclaration de chiffre d'affaires se fait en quelques clics sur le site de l'Urssaf. Un outil à 0-15 €/mois suffit largement. En société (SASU, EURL), c'est une autre affaire : bilan, compte de résultat, liasse fiscale et dépôt des comptes sont obligatoires, et une erreur se paie. L'expert-comptable n'est pas légalement obligatoire, mais il engage sa responsabilité professionnelle — ce qu'un logiciel ne fait pas.",
  },
  {
    q: "Pourquoi un écart de 1 à 10 entre les solutions ?",
    r: "Parce qu'il ne s'agit pas du même service. Indy ou Pennylane vendent un logiciel : vous restez responsable de votre comptabilité, l'outil l'automatise. Dougs, L'Expert-Comptable ou Keobiz vendent l'intervention d'un expert-comptable inscrit à l'Ordre, qui produit et signe vos comptes. Comparer un outil à 9 € avec un cabinet à 79 € n'a pas de sens : la question n'est pas le prix, c'est de savoir qui porte la responsabilité.",
  },
  {
    q: "Peut-on changer de solution en cours d'année ?",
    r: "Oui, mais le moment compte. Le changement est simple entre deux exercices comptables ; en cours d'exercice, il faut récupérer l'ensemble des écritures déjà saisies et s'assurer que le nouveau prestataire les reprend. La plupart des acteurs proposent un accompagnement à la reprise. Vérifiez surtout la durée d'engagement : plusieurs offres se présentent comme « sans engagement » mais sont facturées annuellement.",
  },
  {
    q: "Que change la facturation électronique obligatoire ?",
    r: "La réforme impose de passer par une plateforme agréée pour émettre et recevoir les factures. Tous les acteurs de ce comparatif s'y sont adaptés : Indy et Dougs sont plateformes agréées, Pennylane intègre la conformité dans ses offres, L'Expert-Comptable passe par Tiime. Ce n'est donc plus un critère de différenciation, mais c'en était un jusqu'à récemment.",
  },
  {
    q: "Pourquoi Keobiz n'a-t-il pas de prix affiché ?",
    r: "Keobiz ne publie pas de grille tarifaire : son tarif s'obtient par devis, après échange sur votre situation. Ce n'est pas nécessairement défavorable — un devis peut être mieux ajusté qu'un forfait — mais cela empêche toute comparaison a priori, et c'est la raison pour laquelle la ligne reste sans montant dans notre tableau.",
  },
];

const tocItems = [
  { id: "outils", label: "Outils autonomes" },
  { id: "cabinets", label: "Cabinets en ligne" },
  { id: "choisir", label: "Lequel choisir" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const prixLabel = (p: number | null) =>
  p === null ? "Sur devis" : p === 0 ? "Gratuit" : EUR.format(p);


interface LigneCompta {
  slug: string;
  nom: string;
  offreEntree: string;
  prixMensuelHT: number | null;
  cible: string;
  inclus: string;
  autresPaliers: string;
  urlTarifs: string;
}

function Tableau({
    lignes,
    titre,
}: {
  lignes: LigneCompta[];
  titre: string;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <caption className="sr-only">{titre}</caption>
        <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-4">Solution</th>
            <th className="px-5 py-4">Offre d&apos;entrée</th>
            <th className="px-5 py-4 text-right">Prix / mois HT</th>
            <th className="px-5 py-4">Cible</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((s) => (
            <tr
              key={s.slug}
              id={s.slug}
              className="border-b border-border transition last:border-b-0 hover:bg-muted/50"
            >
              <td className="px-5 py-4 font-semibold text-foreground">{s.nom}</td>
              <td className="px-5 py-4 text-muted-foreground">{s.offreEntree}</td>
              <td className="whitespace-nowrap px-5 py-4 text-right text-lg font-bold tabular-nums">
                {s.prixMensuelHT === null || s.prixMensuelHT === 0 ? (
                  <span className={s.prixMensuelHT === 0 ? "text-accent" : "text-muted-foreground"}>
                    {prixLabel(s.prixMensuelHT)}
                  </span>
                ) : (
                  prixLabel(s.prixMensuelHT)
                )}
              </td>
              <td className="px-5 py-4 text-foreground/80">{s.cible}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

function Fiches({ lignes }: { lignes: LigneCompta[] }) {
  return (
    <div className="mt-6 space-y-4">
      {lignes.map((s) => (
        <div key={s.slug} className="rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-bold text-foreground">
            {s.nom} · {s.offreEntree}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-foreground/80">{s.inclus}.</p>
          <p className="mt-3 text-sm text-muted-foreground">Autres paliers : {s.autresPaliers}</p>
          <a
            href={s.urlTarifs}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Grille tarifaire officielle <span aria-hidden>↗</span>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function ComparateurComptabilitePage() {
  const tous = [...outils, ...cabinets];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Comparatif des solutions comptables pour freelances 2026",
      description:
        "Comparatif indépendant des outils de comptabilité et des cabinets d'expertise comptable en ligne pour indépendants.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-07-28",
      dateModified: "2026-07-28",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/comparateurs/comptabilite`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Solutions comptables pour freelances 2026",
      numberOfItems: tous.length,
      itemListElement: tous.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.nom,
        url: `${SITE_URL}/comparateurs/comptabilite#${s.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Comparateurs", item: `${SITE_URL}/comparateurs` },
        { "@type": "ListItem", position: 3, name: "Comptabilité", item: `${SITE_URL}/comparateurs/comptabilite` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/comparateurs" className="transition hover:text-primary">Comparateurs</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Comptabilité</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour juillet 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Comparatif comptabilité freelance
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Un outil à 9 € ou un expert-comptable à 79 € : ce ne sont pas les mêmes métiers
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          La plupart des comparatifs alignent ces solutions dans un même
          classement, ce qui donne un écart de prix incompréhensible. Nous les
          séparons en <strong>deux familles</strong>, parce que la question
          n&apos;est pas le tarif mais <strong>qui porte la responsabilité de tes
          comptes</strong>. Tarifs relevés le{" "}
          {new Date(data.dateReleve).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          .
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-16">
            <section id="outils" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
                Les outils de comptabilité autonome
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
                Ce sont des <strong>logiciels</strong>. Ils automatisent la
                saisie, préparent les déclarations et éditent les factures, mais
                c&apos;est toi qui restes responsable de ta comptabilité. Adapté
                à la micro-entreprise, où les obligations sont légères.
              </p>
              <Tableau lignes={outils} titre="Outils de comptabilité autonome" />
              <Fiches lignes={outils} />
            </section>

            <section id="cabinets" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
                Les cabinets d&apos;expertise comptable en ligne
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
                Ici, un <strong>expert-comptable inscrit à l&apos;Ordre</strong>{" "}
                produit et signe tes comptes, et engage sa responsabilité
                professionnelle. C&apos;est ce que tu paies — pas le logiciel,
                qui est souvent équivalent. Pertinent dès que tu passes en
                société.
              </p>
              <Tableau lignes={cabinets} titre="Cabinets d'expertise comptable en ligne" />
              <Fiches lignes={cabinets} />
            </section>

            <section id="choisir" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
                Lequel choisir
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu es en micro-entreprise</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Un outil suffit. Tes obligations se résument à un livre de
                    recettes et à ta déclaration de CA. Payer 79 €/mois un
                    expert-comptable pour ça n&apos;a pas de sens. Situe
                    d&apos;abord tes charges avec notre{" "}
                    <Link href="/simulateurs/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
                      simulateur auto-entrepreneur
                    </Link>
                    .
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu es en SASU ou EURL</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Bilan, liasse fiscale et dépôt des comptes deviennent
                    obligatoires. Un cabinet est vivement recommandé — le coût se
                    compare à celui d&apos;une erreur, pas à celui d&apos;un
                    logiciel. Vérifie d&apos;abord que le statut te convient avec
                    notre{" "}
                    <Link href="/simulateurs/sasu-eurl" className="text-primary underline-offset-4 hover:underline">
                      comparateur SASU / EURL
                    </Link>
                    .
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu hésites entre les deux statuts</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Intègre le coût comptable dans ton arbitrage : environ 1 000
                    à 2 000 € HT par an en société, contre presque rien en micro.
                    C&apos;est un des postes que notre{" "}
                    <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
                      simulateur TJM
                    </Link>{" "}
                    prend en compte.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu cherches aussi un compte pro</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Plusieurs de ces solutions embarquent un compte pro, ce qui
                    peut rendre un abonnement bancaire séparé redondant. Notre{" "}
                    <Link href="/comparateurs/banques-pro" className="text-primary underline-offset-4 hover:underline">
                      comparatif des banques pro
                    </Link>{" "}
                    aide à trancher.
                  </p>
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
                  {tous.map((s) => (
                    <li key={s.slug}>
                      <a href={s.urlTarifs} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                        {s.nom} — grille tarifaire officielle<span aria-hidden> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : juillet 2026. Comparatif limité aux
                  offres d&apos;entrée publiques. Salairia n&apos;est pas un
                  cabinet d&apos;expertise comptable : ces informations sont
                  documentaires et ne constituent pas un conseil. Une erreur ?{" "}
                  <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                    Signale-la
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
