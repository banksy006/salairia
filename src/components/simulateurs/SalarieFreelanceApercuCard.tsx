"use client";

import { useMemo } from "react";
import { comparerSalarieFreelance } from "@/lib/calculators/salarie-freelance";
import { useSalarieFreelance } from "./SalarieFreelanceContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function SalarieFreelanceApercuCard() {
  const { inputs, debouncedInputs } = useSalarieFreelance();
  const r = useMemo(
    () => comparerSalarieFreelance(debouncedInputs),
    [debouncedInputs],
  );
  const ecart = r.meilleur.ecart;

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Aperçu instantané
      </p>

      <dl className="mt-6 flex flex-col gap-5">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Ton net annuel en CDI
          </dt>
          <dd className="mt-1 text-2xl font-bold tabular-nums text-foreground">
            {EUR0.format(r.cdi.netApresAnnuel)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Meilleur net freelance · {r.meilleur.label}
          </dt>
          <dd className="mt-1 text-3xl font-bold tabular-nums text-primary lg:text-4xl">
            {EUR0.format(r.meilleur.netApresImpot)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Écart annuel
          </dt>
          <dd
            className={`mt-1 text-xl font-bold tabular-nums ${ecart >= 0 ? "text-accent" : "text-destructive"}`}
          >
            {ecart >= 0 ? "+" : "−"} {EUR0.format(Math.abs(ecart))}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs italic text-muted-foreground">
        CDI à {EUR0.format(inputs.brutAnnuel)} bruts vs {EUR0.format(inputs.tjm)}/jour
        × {inputs.joursParMois} jours. Même taux d&apos;impôt des deux côtés.
      </p>

      <a
        href="#simulateur"
        className="mt-6 hidden items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:inline-flex"
      >
        Affiner ma simulation ↓
      </a>
    </div>
  );
}
