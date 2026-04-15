"use client";

import { useMemo } from "react";
import {
  calculerTous,
  calculerTousPourNetCible,
  STATUT_LABELS,
} from "@/lib/calculators/tjm-freelance";
import { useTJM } from "./TJMContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function TJMApercuCard() {
  const { state, debouncedState } = useTJM();

  const preview = useMemo(() => {
    if (debouncedState.mode === "tjm") {
      const results = calculerTous(debouncedState);
      const sorted = [...results].sort(
        (a, b) => b.netApresImpot - a.netApresImpot,
      );
      return { mode: "tjm" as const, top: sorted[0] };
    }
    const results = calculerTousPourNetCible(
      debouncedState.netCible,
      debouncedState,
    );
    const sorted = [...results].sort((a, b) => a.tjm - b.tjm);
    return { mode: "net" as const, top: sorted[0] };
  }, [debouncedState]);

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Aperçu instantané
      </p>

      {preview.mode === "net" ? (
        <dl className="mt-6 flex flex-col gap-5">
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              Statut optimal
            </dt>
            <dd className="mt-1 text-2xl font-bold text-foreground">
              {STATUT_LABELS[preview.top.statut]}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              TJM minimum nécessaire
            </dt>
            <dd className="mt-1 text-3xl font-bold tabular-nums text-primary">
              {EUR0.format(preview.top.tjm)} / j
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              CA HT annuel à facturer
            </dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-accent">
              {EUR0.format(preview.top.caHT)}
            </dd>
          </div>
        </dl>
      ) : (
        <dl className="mt-6 flex flex-col gap-5">
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              Statut optimal
            </dt>
            <dd className="mt-1 text-2xl font-bold text-foreground">
              {STATUT_LABELS[preview.top.statut]}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              Net annuel maximal
            </dt>
            <dd className="mt-1 text-3xl font-bold tabular-nums text-primary">
              {EUR0.format(preview.top.netApresImpot)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              Net mensuel
            </dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-accent">
              {EUR0.format(preview.top.netMensuel)}
            </dd>
          </div>
        </dl>
      )}

      <p className="mt-6 text-xs italic text-muted-foreground">
        {state.mode === "net"
          ? `Basé sur ${EUR0.format(state.netCible)} net/an, ${state.joursTravailles} j/mois, ${EUR0.format(state.fraisProMensuels)}/mois de frais pro.`
          : `Basé sur un TJM de ${EUR0.format(state.tjm)}, ${state.joursTravailles} j/mois, ${EUR0.format(state.fraisProMensuels)}/mois de frais pro.`}
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
