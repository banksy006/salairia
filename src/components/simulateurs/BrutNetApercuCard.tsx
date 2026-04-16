"use client";

import { useMemo } from "react";
import {
  calculerBrutVersNet,
  calculerNetVersBrut,
} from "@/lib/calculators/salaire-brut-net";
import { useBrutNet } from "./BrutNetContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function BrutNetApercuCard() {
  const { inputs, debouncedInputs } = useBrutNet();

  const result = useMemo(
    () =>
      debouncedInputs.mode === "brut-vers-net"
        ? calculerBrutVersNet(debouncedInputs)
        : calculerNetVersBrut(debouncedInputs),
    [debouncedInputs],
  );

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Aperçu instantané
      </p>

      <dl className="mt-6 flex flex-col gap-5">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Brut mensuel
          </dt>
          <dd className="mt-1 text-2xl font-bold tabular-nums text-foreground">
            {EUR0.format(result.brutMensuel)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Net après impôt
          </dt>
          <dd className="mt-1 text-3xl font-bold tabular-nums text-primary lg:text-4xl">
            {EUR0.format(result.netApresMensuel)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Net annuel
          </dt>
          <dd className="mt-1 text-xl font-bold tabular-nums text-accent">
            {EUR0.format(result.netApresAnnuel)}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs italic text-muted-foreground">
        {inputs.statut === "cadre" ? "Cadre" : "Non-cadre"},{" "}
        {inputs.tauxPAS > 0 ? `PAS ${inputs.tauxPAS} %` : "avant impôt"}.
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
