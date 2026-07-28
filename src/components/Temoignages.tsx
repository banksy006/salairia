import Link from "next/link";
import { IconBadge, MessageCircleIcon } from "@/components/icons";
import data from "@/data/temoignages.json";

export interface Temoignage {
  id: string;
  nomAffiche: string;
  role: string;
  ville?: string;
  texte: string;
  outilUtilise: string;
  outilLabel: string;
  date: string;
}

// Pas de balisage schema.org Review ici, volontairement : Google exclut les avis
// auto-hébergés (une entité qui publie des avis sur elle-même) des rich results,
// et le balisage expose à une action manuelle. Le HTML reste sémantique.
export default function Temoignages() {
  const temoignages = data.temoignages as Temoignage[];

  // Tant qu'aucun témoignage réel n'a été collecté, la section ne s'affiche pas.
  if (temoignages.length === 0) return null;

  return (
    <section id="temoignages" className="scroll-mt-24">
      <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
        <IconBadge>
          <MessageCircleIcon className="w-4 h-4" />
        </IconBadge>
        Ils utilisent Salairia
      </h2>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        Des retours d&apos;utilisateurs réels, publiés avec leur accord. Chacun
        précise l&apos;outil utilisé et la date.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {temoignages.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            <blockquote className="flex-1 text-base leading-relaxed text-foreground/85">
              « {t.texte} »
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <p className="text-sm font-semibold text-foreground">
                {t.nomAffiche}
              </p>
              <p className="text-sm text-muted-foreground">
                {t.role}
                {t.ville ? ` · ${t.ville}` : ""}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                <Link
                  href={t.outilUtilise}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {t.outilLabel}
                </Link>
                {" · "}
                <time dateTime={t.date}>
                  {new Date(t.date).toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
