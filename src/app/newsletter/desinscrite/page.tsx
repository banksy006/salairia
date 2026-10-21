import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Désinscription prise en compte",
  robots: { index: false, follow: false },
};

export default function DesinscritePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 text-center shadow-md">
        <h1 className="text-4xl font-bold text-foreground">Tu es désinscrit</h1>
        <p className="mt-4 text-lg text-foreground/80">
          Tu ne recevras plus aucun mail de Salairia. Ton adresse est retirée de
          la liste et supprimée lors du prochain nettoyage.
        </p>
        <p className="mt-6 text-base text-muted-foreground">
          Changement d&apos;avis ? Tu peux te réinscrire à tout moment depuis la{" "}
          <Link href="/newsletter" className="text-primary underline-offset-4 hover:underline">
            page newsletter
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
