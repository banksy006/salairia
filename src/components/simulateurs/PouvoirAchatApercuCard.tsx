"use client";

import { useMemo } from "react";
import { calculerPouvoirAchat } from "@/lib/calculators/pouvoir-achat";
import { usePouvoirAchat } from "./PouvoirAchatContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function PouvoirAchatApercuCard() {
  const { debouncedInputs } = usePouvoirAchat();
  const r = useMemo(
    () => calculerPouvoirAchat(debouncedInputs),
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
            Coût de la vie · {r.principale.ville.nom}
          </dt>
          <dd className="mt-1 text-2xl font-bold tabular-nums text-foreground">
            {EUR0.format(r.principale.totalMensuel)} / mois
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Salaire net nécessaire
          </dt>
          <dd className="mt-1 text-3xl font-bold tabular-nums text-primary lg:text-4xl">
            {EUR0.format(r.principale.salaireNetNecessaire)}
          </dd>
        </div>
        {r.comparaison && (
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              Écart vs {r.comparaison.ville.nom}
            </dt>
            <dd className="mt-1 text-xl font-bold tabular-nums text-accent">
              {r.ecartMensuel > 0 ? "+" : ""}
              {EUR0.format(r.ecartMensuel)} / mois
            </dd>
          </div>
        )}
      </dl>

      <p className="mt-6 text-xs italic text-muted-foreground">
        Règle bancaire : loyer ≤ 30 % du salaire net.
      </p>

      <a
        href="#simulateur"
        className="mt-6 hidden items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 lg:inline-flex"
      >
        Affiner ma simulation ↓
      </a>
    </div>
  );
}
