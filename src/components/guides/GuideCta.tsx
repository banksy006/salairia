import Link from "next/link";
import type { ReactNode } from "react";

export interface GuideCtaLien {
  href: string;
  label: string;
  desc: string;
  icon: ReactNode;
}

// Bloc de redirection des pages « chiffre 2027 » vers les simulateurs et
// comparateurs. Ces pages font 84 % du trafic avec un lecteur qui lit un
// chiffre et repart : le bloc lui propose le calcul « dans sa situation »
// avant qu'il ne parte, et irrigue les pages qui rapportent.
export default function GuideCta({
  titre,
  intro,
  liens,
  accent = false,
}: {
  titre: string;
  intro?: string;
  liens: GuideCtaLien[];
  accent?: boolean;
}) {
  return (
    <aside
      aria-label={titre}
      className={
        accent
          ? "rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 p-6 shadow-md sm:p-8"
          : "rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8"
      }
    >
      <p className="text-xl font-bold text-foreground sm:text-2xl">{titre}</p>
      {intro && <p className="mt-2 text-base text-foreground/80">{intro}</p>}
      <ul className={`mt-5 grid gap-3 ${liens.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {liens.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full flex-col gap-2 rounded-xl border-2 border-border bg-white p-4 transition hover:border-primary hover:shadow-md"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                {l.icon}
              </span>
              <span className="font-semibold text-foreground group-hover:text-primary">
                {l.label}&nbsp;<span aria-hidden>→</span>
              </span>
              <span className="text-sm text-muted-foreground">{l.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
