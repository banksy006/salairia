import Link from "next/link";
import partenaires from "@/data/partenaires-portage.json";
import societes from "@/data/societes-portage.json";
import { AwardIcon } from "@/components/icons";

interface Partenaire {
  slug: string;
  actif: boolean;
  debut: string;
  fin: string;
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
      className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 p-6 shadow-md sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
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
      <div className="mt-4 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div>
          <p className="text-2xl font-bold text-foreground">
            {s.nom}{" "}
            <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 align-middle text-sm font-bold text-primary">
              {s.fraisGestion}
            </span>
          </p>
          <p className="mt-2 text-base text-foreground/80">{p.accroche}</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground/80">
            {p.avantages.map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <span aria-hidden className="text-accent">✅</span> {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={p.url}
            target="_blank"
            rel="noopener nofollow sponsored"
            data-partenaire={s.nom}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-base font-semibold text-accent-foreground shadow-md transition hover:opacity-90"
          >
            {p.ctaLabel} ↗
          </a>
          <Link
            href={`/comparateurs/portage-salarial/${s.slug}`}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Voir la fiche et les avis
          </Link>
        </div>
      </div>
    </aside>
  );
}
