"use client";

import { useMemo } from "react";
import { calculerPercentile } from "@/lib/calculators/percentile-salaire";
import { usePercentile } from "./PercentileContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function PercentileApercuCard() {
  const { state, debouncedState } = usePercentile();

  const result = useMemo(
    () => calculerPercentile(debouncedState),
    [debouncedState],
  );

  const top = 100 - result.percentile;

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Aper&ccedil;u instantan&eacute;
      </p>

      <dl className="mt-6 flex flex-col gap-5">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Ton salaire
          </dt>
          <dd className="mt-1 text-2xl font-bold tabular-nums text-foreground">
            {EUR0.format(state.salaireMensuelNet)} / mois
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Tu es dans le
          </dt>
          <dd className="mt-1 text-3xl font-bold tabular-nums text-primary lg:text-4xl">
            top {top} %
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            M&eacute;diane
          </dt>
          <dd className="mt-1 text-xl font-bold tabular-nums text-accent">
            {EUR0.format(result.mediane)}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs italic text-muted-foreground">
        Bas&eacute; sur {EUR0.format(state.salaireMensuelNet)} net/mois
        {state.csp !== "Tous" ? `, ${state.csp}` : ""}
        {state.age !== "Tous" ? `, ${state.age}` : ""}.
      </p>

      <a
        href="#simulateur"
        className="mt-6 hidden items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:inline-flex"
      >
        Affiner ma simulation &darr;
      </a>
    </div>
  );
}
