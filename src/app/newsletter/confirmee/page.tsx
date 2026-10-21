import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inscription confirmée",
  robots: { index: false, follow: false },
};

export default function ConfirmeePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">C&apos;est confirmé</p>
        <h1 className="mt-3 text-4xl font-bold text-foreground">Tu recevras le chiffre le jour J</h1>
        <p className="mt-4 text-lg text-foreground/80">
          Merci. Nous ne t&apos;écrirons que lorsqu&apos;un montant deviendra
          officiel, avec sa source. En attendant, les simulateurs sont à jour
          des valeurs en vigueur.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/simulateurs" className="rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90">
            Voir les simulateurs
          </Link>
          <Link href="/guides/ce-qui-change-1er-janvier-2027" className="rounded-xl border-2 border-border bg-white px-5 py-3 text-base font-semibold text-primary transition hover:border-primary">
            Ce qui change au 1er janvier 2027
          </Link>
        </div>
      </div>
    </div>
  );
}
