"use client";

import { useMemo } from "react";
import { calculerPortage } from "@/lib/calculators/portage";
import { usePortage } from "./PortageContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function ApercuCard() {
  const { inputs, debouncedInputs } = usePortage();

  const result = useMemo(
    () => calculerPortage(debouncedInputs),
    [debouncedInputs],
  );

  const net = result.salaireNetApresImpot ?? result.salaireNetAvantImpot;
  const tauxRetour =
    result.caHT > 0 ? Math.round((net / result.caHT) * 100) : 0;

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Aperçu instantané
      </p>

      <dl className="mt-6 flex flex-col gap-5">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            CA mensuel HT
          </dt>
          <dd className="mt-1 text-2xl font-bold tabular-nums text-foreground">
            {EUR0.format(result.caHT)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Net mensuel
          </dt>
          <dd className="mt-1 text-3xl font-bold tabular-nums text-primary">
            {EUR0.format(net)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Taux de retour
          </dt>
          <dd className="mt-1 text-xl font-bold tabular-nums text-accent">
            {tauxRetour}%
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs italic text-muted-foreground">
        Basé sur tes paramètres : TJM {inputs.tjm} €, {inputs.joursTravailles}{" "}
        jours, frais {inputs.tauxFraisGestion}%.
      </p>

      <a
        href="#simulateur"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Affiner ma simulation ↓
      </a>
    </div>
  );
}
