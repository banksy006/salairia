"use client";

import { useMemo } from "react";
import { calculerNegociation } from "@/lib/calculators/negociation";
import { useNegociation } from "./NegociationContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function formatK(val: number): string {
  return `${Math.round(val / 1000)} k€`;
}

export default function NegociationApercuCard() {
  const { state, debouncedState } = useNegociation();

  const result = useMemo(
    () => calculerNegociation(debouncedState),
    [debouncedState],
  );

  const margeLabel =
    result.margeNego > 0 ? `+${formatK(result.margeNego)}` : "—";

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Aperçu instantané
      </p>

      <dl className="mt-6 flex flex-col gap-5">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Ton salaire
          </dt>
          <dd className="mt-1 text-2xl font-bold text-foreground">
            {EUR0.format(state.salaireActuel)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Fourchette marché
          </dt>
          <dd className="mt-1 text-3xl font-bold tabular-nums text-primary lg:text-4xl">
            {formatK(result.fourchette[0])} – {formatK(result.fourchette[1])}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Marge de négo
          </dt>
          <dd className="mt-1 text-xl font-bold tabular-nums text-accent">
            {margeLabel}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs italic text-muted-foreground">
        {result.metierLabel}, {state.region === "idf" ? "Île-de-France" : "Province"},{" "}
        profil {state.experience}.
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
