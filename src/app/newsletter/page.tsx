import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { AlertTriangleIcon, CalendarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Newsletter : ce qui change pour ton argent",
  description:
    "Reçois le SMIC 2027, le plafond de la Sécurité sociale, le barème de l'impôt et la revalorisation des retraites le jour où ils deviennent officiels. Un mail par événement, pas de publicité, désinscription en un clic.",
  alternates: { canonical: "/newsletter" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Newsletter Salairia : ce qui change pour ton argent",
    description:
      "Les chiffres officiels de 2027, le jour de leur publication, directement dans ta boîte mail.",
    url: "/newsletter",
  },
};

const ALERTES = [
  { href: "/guides/smic-2027", label: "SMIC 2027", quand: "décret de mi-décembre" },
  { href: "/guides/plafond-securite-sociale-2027", label: "Plafond de la Sécurité sociale 2027", quand: "arrêté de fin décembre" },
  { href: "/guides/bareme-impot-2027", label: "Barème de l'impôt 2027", quand: "promulgation de la loi de finances" },
  { href: "/guides/revalorisation-retraites-2027", label: "Revalorisation des retraites", quand: "montants de janvier" },
];

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
      <nav aria-label="Fil d'Ariane" className="text-sm text-foreground/70">
        <Link href="/" className="hover:text-primary">Accueil</Link>
        <span className="mx-2">›</span>
        <span>Newsletter</span>
      </nav>

      {erreur && (
        <div className="mt-8 flex items-start gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            {erreur === "lien"
              ? "Ce lien n'est pas valide ou a été modifié. Réinscris-toi ci-dessous pour en recevoir un nouveau."
              : "Un problème technique nous empêche de traiter ta demande. Réessaie dans quelques minutes ou écris-nous à contact@salairia.com."}
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium text-primary">
            <CalendarIcon className="h-4 w-4" /> Les chiffres officiels, le jour J
          </span>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            Ce qui change pour ton argent
          </h1>
          <p className="mt-4 text-2xl font-semibold text-primary lg:text-3xl">
            Un mail quand un chiffre devient officiel. Rien d&apos;autre.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Chaque fin d&apos;année, les montants qui comptent pour ta paie, ta
            pension ou ton impôt sont fixés par décret ou par arrêté, souvent
            entre deux jours fériés. Nous les lisons au Journal officiel et nous
            t&apos;envoyons le chiffre, le calcul et le lien vers la source.
          </p>
          <ul className="mt-8 space-y-3">
            {ALERTES.map((a) => (
              <li key={a.href} className="flex items-start gap-3 text-base text-foreground/80">
                <span aria-hidden className="text-accent">✅</span>
                <span>
                  <Link href={a.href} className="font-semibold text-primary underline-offset-4 hover:underline">
                    {a.label}
                  </Link>{" "}
                  — {a.quand}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base leading-relaxed text-foreground/80">
            Pas de publicité, pas de revente d&apos;adresse, pas de relance. Tu
            te désinscris en un clic depuis n&apos;importe quel mail, et ton
            adresse est alors supprimée.
          </p>
        </div>

        <div className="lg:col-span-5">
          <NewsletterForm
            categorie="general"
            titre="Je veux les chiffres officiels"
            texte="Une alerte à chaque publication officielle, et un récapitulatif mensuel de ce qui change pour ta rémunération."
            page="/newsletter"
          />
        </div>
      </div>
    </div>
  );
}
