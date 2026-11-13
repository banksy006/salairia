import Image from "next/image";
import Link from "next/link";
import partenaires from "@/data/partenaires-portage.json";
import societes from "@/data/societes-portage.json";
import { AwardIcon } from "@/components/icons";

interface Partenaire {
  slug: string;
  actif: boolean;
  debut: string;
  fin: string;
  // Logo fourni par le partenaire, dans public/partenaires/. Dimensions
  // d'origine du fichier, pour que next/image réserve la bonne place.
  logo: { src: string; largeur: number; hauteur: number } | null;
  accroche: string;
  avantages: string[];
  ctaLabel: string;
  url: string;
}

// Emplacement payant, toujours signalé comme tel (article L111-7 du Code de la
// consommation : un comparateur doit indiquer les placements rémunérés). Il
// vit à côté du classement, jamais dedans : l'ordre du tableau reste fondé sur
// les frais et les services. Un seul partenaire affiché, le premier actif dont
// les dates couvrent aujourd'hui.
export function partenaireActif(today = new Date()): Partenaire | null {
  const iso = today.toISOString().slice(0, 10);
  return (partenaires as Partenaire[]).find((p) => p.actif && p.debut <= iso && iso <= p.fin) ?? null;
}

export default function PartenaireEncart({ slugFiche }: { slugFiche?: string }) {
  const p = partenaireActif();
  if (!p) return null;
  if (slugFiche && slugFiche !== p.slug) return null;
  const s = (societes as { slug: string; nom: string; fraisGestion: string }[]).find((x) => x.slug === p.slug);
  if (!s) return null;

  return (
    <aside
      aria-label={`Partenaire : ${s.nom}`}
      className="overflow-hidden rounded-2xl border-2 border-accent/30 bg-white shadow-md"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-accent/20 bg-gradient-to-r from-accent/10 to-primary/5 px-6 py-3 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
          <AwardIcon className="h-3.5 w-3.5" /> Partenaire Salairia
        </span>
        <span className="text-xs text-muted-foreground">
          Emplacement rémunéré · n&apos;influence pas le classement ·{" "}
          <Link href="/methodologie" className="underline-offset-4 hover:underline">
            notre méthode
          </Link>
        </span>
      </div>

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        {p.logo && (
          <div className="flex h-20 w-full items-center justify-center rounded-xl border border-border bg-white px-5 lg:w-48">
            <Image
              src={p.logo.src}
              alt={`Logo ${s.nom}`}
              width={p.logo.largeur}
              height={p.logo.hauteur}
              unoptimized
              className="h-auto max-h-10 w-auto max-w-full"
            />
          </div>
        )}

        <div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xl font-bold text-foreground">
            {s.nom}
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary whitespace-nowrap">
              {s.fraisGestion} de frais de gestion
            </span>
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/80">{p.accroche}</p>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm text-foreground/80">
            {p.avantages.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2">
                <span aria-hidden className="text-accent">✅</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 lg:items-end">
          <a
            href={p.url}
            target="_blank"
            rel="noopener nofollow sponsored"
            data-partenaire={s.nom}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90 whitespace-nowrap"
          >
            {p.ctaLabel} ↗
          </a>
          <Link
            href={`/comparateurs/portage-salarial/${s.slug}`}
            className="text-center text-sm font-semibold text-primary underline-offset-4 hover:underline lg:text-right"
          >
            Voir la fiche et les avis
          </Link>
        </div>
      </div>
    </aside>
  );
}
