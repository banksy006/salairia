import type { Metadata } from "next";
import Link from "next/link";
import ArticleShell, { type ArticleMeta } from "@/components/ArticleShell";
import { IconBadge, CalendarIcon, AlertTriangleIcon, ReceiptIcon, InfoIcon } from "@/components/icons";
import data from "@/data/actualites.json";

const article = data.articles.find(
  (a) => a.slug === "facturation-electronique-1er-septembre-2026",
)! as ArticleMeta;

export const metadata: Metadata = {
  title: "Facturation électronique : ce qui change au 1er septembre 2026",
  description:
    "Au 1er septembre 2026, toutes les entreprises assujetties à la TVA — micro-entrepreneurs en franchise compris — doivent pouvoir recevoir des factures électroniques via une plateforme agréée. L'obligation d'émettre arrive en 2027 pour les TPE-PME.",
  alternates: { canonical: `/actualites/${article.slug}` },
  openGraph: {
    title: "Facturation électronique : ce qui change au 1er septembre 2026",
    description:
      "Recevoir d'abord, émettre ensuite : le calendrier réel de la réforme, et ce que doit faire un freelance avant la date.",
    url: `/actualites/${article.slug}`,
    type: "article",
  },
};

const calendrier = [
  {
    date: "1er septembre 2026",
    qui: "Toutes les entreprises assujetties à la TVA",
    quoi: "Obligation de pouvoir RECEVOIR des factures électroniques via une plateforme agréée. Les grandes entreprises et ETI doivent en plus les ÉMETTRE.",
    now: true,
  },
  {
    date: "1er septembre 2027",
    qui: "TPE, PME et micro-entreprises",
    quoi: "Obligation d'ÉMETTRE ses factures au format électronique pour les opérations entre professionnels.",
    now: false,
  },
];

export default function Page() {
  return (
    <ArticleShell article={article} filAriane="Facturation électronique">
      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Recevoir d&apos;abord, émettre ensuite
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          La réforme est presque toujours résumée par « il faudra facturer en
          électronique ». C&apos;est vrai, mais pas encore : la marche du{" "}
          <strong>1er septembre 2026</strong> porte sur la{" "}
          <strong>réception</strong>. À cette date, toute entreprise assujettie
          à la TVA doit être en mesure de recevoir une facture électronique par
          une plateforme agréée — indépendamment de sa taille et de son régime
          fiscal.
        </p>
        <div className="mt-6 space-y-4">
          {calendrier.map((c) => (
            <div
              key={c.date}
              className={`rounded-2xl border p-6 shadow-md ${
                c.now ? "border-accent bg-accent/5" : "border-border bg-white"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.now ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {c.date}
                </span>
                <span className="text-sm font-semibold text-foreground">{c.qui}</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">{c.quoi}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Oui, les micro-entrepreneurs en franchise de TVA sont concernés
        </h2>
        <div className="mt-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            C&apos;est le contresens le plus répandu. Être en{" "}
            <strong>franchise en base de TVA</strong> (article 293 B du CGI)
            signifie que vous ne facturez pas la TVA — pas que vous échappez aux
            obligations qui pèsent sur les assujettis. Un micro-entrepreneur qui
            facture des clients professionnels{" "}
            <strong>entre bien dans le champ de la réforme</strong>, et doit
            donc pouvoir recevoir des factures électroniques dès le 1er
            septembre 2026.
          </p>
        </div>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          En pratique, la contrainte reste modeste à cette première étape :
          il s&apos;agit de choisir une plateforme agréée et de s&apos;y
          rattacher, pour que vos fournisseurs professionnels puissent vous
          adresser leurs factures. C&apos;est en 2027, quand l&apos;émission
          deviendra obligatoire, que votre manière de facturer changera
          vraiment.
        </p>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;est une « plateforme agréée »
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md">
          <p className="text-base leading-relaxed text-foreground/80">
            Les factures entre professionnels devront transiter par une
            plateforme agréée par l&apos;administration, dans un format
            structuré — <strong>Factur-X</strong>, <strong>UBL</strong> ou{" "}
            <strong>CII</strong>. Un PDF envoyé par e-mail, même signé, ne
            constituera plus une facture électronique au sens de la réforme.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La direction générale des Finances publiques publie la liste des
            plateformes agréées. La plupart des outils de facturation et de
            comptabilité destinés aux indépendants se sont mis en conformité ou
            s&apos;y préparent — c&apos;est le premier critère à vérifier si
            vous choisissez un outil en ce moment. Notre{" "}
            <Link href="/comparateurs/comptabilite" className="text-primary underline-offset-4 hover:underline">
              comparateur de solutions comptables
            </Link>{" "}
            recense les acteurs du marché et leurs tarifs.
          </p>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;il y a à faire avant le 1er septembre
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span>
                <strong>Vérifier si vous êtes concerné</strong> : facturez-vous
                des clients professionnels établis en France ? Si oui, vous
                l&apos;êtes — franchise de TVA ou non. Les prestations aux
                particuliers relèvent d&apos;un régime distinct
                (l&apos;e-reporting).
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span>
                <strong>Choisir une plateforme agréée</strong> et vous y
                rattacher. Si vous utilisez déjà un outil de facturation ou un
                cabinet comptable, la question à leur poser est simple : « êtes-vous
                plateforme agréée, ou raccordé à l&apos;une d&apos;elles ? »
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span>
                <strong>Vérifier vos données d&apos;identification</strong> —
                SIREN, adresse, numéro de TVA intracommunautaire le cas échéant.
                Les plateformes s&apos;appuient sur l&apos;annuaire officiel :
                une donnée erronée bloque la réception.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span>
                <strong>Ne pas anticiper 2027 dans la précipitation.</strong>{" "}
                L&apos;obligation d&apos;émettre vous concernera dans un an :
                vous avez le temps de choisir un outil sur ses mérites plutôt
                que dans l&apos;urgence.
              </span>
            </li>
          </ul>
        </div>
        <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
          Le calendrier de cette réforme a déjà été décalé par le passé. Les
          dates ci-dessus sont celles en vigueur à la date de publication de cet
          article ; en cas de doute, la page Urssaf citée en source fait foi.
        </p>
      </section>
    </ArticleShell>
  );
}
