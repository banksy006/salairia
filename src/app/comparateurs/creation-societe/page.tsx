import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import {
  IconBadge,
  CalendarIcon,
  ScaleIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  AlertTriangleIcon,
  CompassIcon,
} from "@/components/icons";
import TocSidebar from "@/components/simulateurs/TocSidebar";
import data from "@/data/creation-societe.json";

export const metadata: Metadata = {
  title: "Comparatif création SASU / EURL 2026 : le vrai coût des plateformes",
  description:
    "Legalstart, Captain Contrat, Qonto, Indy, Dougs : honoraires réels et frais obligatoires pour créer une SASU ou une EURL. Le « à partir de 0 € » ne couvre jamais les 246,86 € de greffe et d'annonce légale.",
  alternates: { canonical: "/comparateurs/creation-societe" },
  openGraph: {
    title: "Comparatif création SASU / EURL 2026 : le vrai coût",
    description:
      "Le « 0 € » affiché ne couvre que les honoraires. Le plancher réel est de 246,86 € quel que soit le prestataire.",
    url: "/comparateurs/creation-societe",
  },
};

const plateformes = [...data.plateformes].sort(
  (a, b) => a.honorairesHT - b.honorairesHT,
);

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const EUR2 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

const FRAIS = data.fraisIncompressibles;

const faq = [
  {
    q: "Pourquoi toutes les plateformes affichent-elles « à partir de 0 € » ?",
    r: `Parce que ce montant ne désigne que leurs honoraires, pas le coût de la création. Les frais de greffe et d'annonce légale — ${EUR2.format(FRAIS)} — sont fixés par l'administration et dus quoi qu'il arrive. Une création de SASU ou d'EURL ne peut donc pas coûter moins que cette somme, même avec une plateforme gratuite. C'est la raison pour laquelle notre tableau affiche les deux colonnes séparément.`,
  },
  {
    q: "Les créations « offertes » le sont-elles vraiment ?",
    r: "Elles sont offertes en échange d'un abonnement. Qonto offre les formalités si vous prenez un forfait bancaire, Indy si vous prenez un abonnement Premium, Dougs si vous souscrivez à sa comptabilité. Sur douze mois, un abonnement à 79 € HT représente près de 950 € : la création n'est pas gratuite, elle est intégrée à un contrat plus large. Ce n'est pas malhonnête — c'est souvent avantageux si vous aviez de toute façon besoin du service — mais il faut raisonner en coût total sur l'année.",
  },
  {
    q: "Faut-il vraiment passer par une plateforme ?",
    r: "Non. Vous pouvez déposer votre dossier vous-même sur le Guichet Unique de l'INPI et publier votre annonce légale en direct. Vous ne payez alors que les frais obligatoires. Une plateforme achète du temps et une garantie contre le rejet du greffe — un rejet fait perdre plusieurs semaines. Si vos statuts sont standards et que vous êtes à l'aise avec l'administratif, faire seul est parfaitement réalisable.",
  },
  {
    q: "Quelle différence entre une plateforme et un avocat ?",
    r: "Les plateformes emploient des juristes-formalistes qui remplissent des modèles de statuts et gèrent les formalités. Elles ne fournissent pas de conseil juridique personnalisé : la loi du 31 décembre 1971 le réserve aux avocats, et Legalstart le précise explicitement sur ses pages. Si votre situation sort du standard — plusieurs associés, pacte d'associés, apport en nature, clause particulière — un avocat est nécessaire, et le budget change d'ordre de grandeur.",
  },
  {
    q: "Le dépôt de capital est-il inclus ?",
    r: "Rarement dans l'offre d'entrée. Qonto le facture 69 €, Indy 59 € sans abonnement. Certaines banques traditionnelles le font gratuitement mais avec des délais plus longs. C'est un poste à vérifier, car il apparaît souvent en fin de parcours.",
  },
];

const tocItems = [
  { id: "comparatif", label: "Le comparatif" },
  { id: "vrai-cout", label: "Le vrai coût" },
  { id: "choisir", label: "Comment choisir" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
] as const;

export default function ComparateurCreationSocietePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Comparatif des plateformes de création de SASU et EURL 2026",
      description:
        "Comparatif indépendant des honoraires réels et des frais obligatoires pour créer une société.",
      author: { "@type": "Person", name: "Nizar Laghrifi", url: `${SITE_URL}/a-propos` },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-07-28",
      dateModified: "2026-07-28",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/comparateurs/creation-societe`,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Plateformes de création de société 2026",
      numberOfItems: plateformes.length,
      itemListElement: plateformes.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.nom,
        url: `${SITE_URL}/comparateurs/creation-societe#${p.slug}`,
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
        { "@type": "ListItem", position: 3, name: "Création SASU / EURL", item: `${SITE_URL}/comparateurs/creation-societe` },
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
          <span className="text-foreground">Création SASU / EURL</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour août 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Créer sa SASU ou son EURL : comparatif des plateformes
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Le « à partir de 0 € » ne couvre jamais la totalité
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            <strong>Le chiffre que personne n&apos;affiche en gros :</strong>{" "}
            les frais de greffe et d&apos;annonce légale s&apos;élèvent à{" "}
            <strong>{EUR2.format(FRAIS)}</strong>. Ils sont fixés par
            l&apos;administration et dus quel que soit le prestataire choisi. Une
            création de société ne peut donc pas coûter moins que ça —
            les tarifs affichés par les plateformes ne concernent que leurs
            propres honoraires.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-16">
            <section id="comparatif" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
                Le comparatif
              </h2>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
                <table className="w-full min-w-[46rem] text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Plateforme</th>
                      <th className="px-5 py-4">Offre d&apos;entrée</th>
                      <th className="px-5 py-4 text-right">Honoraires HT</th>
                      <th className="px-5 py-4 text-right">Coût réel minimum</th>
                      <th className="px-5 py-4">Modèle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plateformes.map((p) => (
                      <tr key={p.slug} id={p.slug} className="border-b border-border transition last:border-b-0 hover:bg-muted/50">
                        <td className="px-5 py-4 font-semibold text-foreground">{p.nom}</td>
                        <td className="px-5 py-4 text-muted-foreground">{p.offreEntree}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-right font-bold tabular-nums">
                          {p.honorairesHT === 0 ? (
                            <span className="text-accent">Gratuit</span>
                          ) : (
                            EUR.format(p.honorairesHT)
                          )}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-lg font-bold tabular-nums text-foreground">
                          {EUR.format(p.honorairesHT + FRAIS)}
                        </td>
                        <td className="px-5 py-4 text-foreground/80">{p.modele}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs italic text-muted-foreground">
                Trié par honoraires croissants. La colonne « coût réel minimum »
                additionne les honoraires de la plateforme et les{" "}
                {EUR2.format(FRAIS)} de frais administratifs obligatoires. Tarifs
                relevés le {new Date(data.dateReleve).toLocaleDateString("fr-FR")}{" "}
                pour une SASU ou une EURL.
              </p>

              <div className="mt-8 space-y-4">
                {plateformes.map((p) => (
                  <div key={p.slug} className="rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                    <h3 className="text-lg font-bold text-foreground">
                      {p.nom} · {p.offreEntree}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-foreground/80">{p.inclus}.</p>
                    {p.conditionGratuite && (
                      <p className="mt-3 rounded-r-lg border-l-4 border-primary bg-muted p-3 text-sm text-foreground/80">
                        <strong className="text-foreground">Condition :</strong>{" "}
                        {p.conditionGratuite}.
                      </p>
                    )}
                    <p className="mt-3 text-sm text-muted-foreground">Autres options : {p.autresPaliers}</p>
                    <a href={p.urlTarifs} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline">
                      Page tarifaire officielle <span aria-hidden>↗</span>
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section id="vrai-cout" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
                Le vrai coût, sur douze mois
              </h2>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  Trois des cinq plateformes offrent la création{" "}
                  <strong>en échange d&apos;un abonnement</strong>. C&apos;est le
                  point à regarder de près, parce que le coût se déplace : il ne
                  disparaît pas.
                </p>
                <ul className="mt-5 space-y-3 text-base text-foreground/80">
                  <li className="flex gap-3">
                    <span aria-hidden className="text-primary">→</span>
                    <span>
                      Une création « offerte » avec un abonnement compta à{" "}
                      <strong>79 € HT/mois</strong> représente{" "}
                      <strong>{EUR.format(79 * 12)}</strong> sur douze mois.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-primary">→</span>
                    <span>
                      La même avec un forfait bancaire à{" "}
                      <strong>9 € HT/mois</strong> ne représente que{" "}
                      <strong>{EUR.format(9 * 12)}</strong>.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="text-primary">→</span>
                    <span>
                      Une formule payante sans abonnement, à 99 € HT, revient à{" "}
                      <strong>{EUR.format(99 + FRAIS)}</strong> tout compris et
                      s&apos;arrête là.
                    </span>
                  </li>
                </ul>
                <p className="mt-5 text-base leading-relaxed text-foreground/80">
                  La bonne question n&apos;est donc pas « quelle création est la
                  moins chère », mais <strong>« ai-je de toute façon besoin de ce
                  service pendant un an ? »</strong>. Si tu comptes prendre un
                  compte pro et un outil de compta, la création offerte est un
                  vrai gain. Sinon, une formule payante ponctuelle coûte moins
                  cher.
                </p>
              </div>
            </section>

            <section id="choisir" className="scroll-mt-24">
              <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
                <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
                Comment choisir
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu veux le coût le plus bas</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Fais les démarches toi-même sur le Guichet Unique de
                    l&apos;INPI : tu ne paies que les {EUR2.format(FRAIS)}{" "}
                    obligatoires. Réaliste si tes statuts sont standards.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu veux aller vite et sans risque</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Une formule payante avec garantie anti-rejet du greffe. Un
                    rejet coûte plusieurs semaines de retard, ce qui vaut souvent
                    les 99 à 199 € d&apos;honoraires.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu prends aussi compta et banque</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Les offres groupées deviennent intéressantes. Compare
                    d&apos;abord les services eux-mêmes via nos comparatifs{" "}
                    <Link href="/comparateurs/banques-pro" className="text-primary underline-offset-4 hover:underline">
                      banques pro
                    </Link>{" "}
                    et{" "}
                    <Link href="/comparateurs/comptabilite" className="text-primary underline-offset-4 hover:underline">
                      comptabilité
                    </Link>
                    , pas l&apos;inverse.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                  <p className="font-semibold text-foreground">Tu hésites encore sur le statut</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/80">
                    Ne crée rien avant d&apos;avoir tranché. Notre{" "}
                    <Link href="/simulateurs/sasu-eurl" className="text-primary underline-offset-4 hover:underline">
                      simulateur SASU vs EURL
                    </Link>{" "}
                    compare le net réel des deux formes sur tes propres chiffres.
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
                  {plateformes.map((p) => (
                    <li key={p.slug}>
                      <a href={p.urlTarifs} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                        {p.nom} — page tarifaire officielle<span aria-hidden> ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-foreground/80">
                  Montant des frais obligatoires : {data.sourceFraisIncompressibles}
                </p>
                <p className="mt-6 text-xs italic text-muted-foreground">
                  Dernière mise à jour : août 2026. Comparatif limité aux
                  offres d&apos;entrée publiques pour une SASU ou une EURL.
                  Salairia n&apos;exerce ni le conseil juridique ni
                  l&apos;expertise comptable : ces informations sont
                  documentaires. Une erreur ?{" "}
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
