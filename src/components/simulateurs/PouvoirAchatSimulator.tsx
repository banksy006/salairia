"use client";

import { useMemo } from "react";
import {
  calculerPouvoirAchat,
  getVillesList,
  type VilleResult,
} from "@/lib/calculators/pouvoir-achat";
import { usePouvoirAchat } from "./PouvoirAchatContext";
import { BuildingIcon, ScaleIcon } from "@/components/icons";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const villes = getVillesList();

export default function PouvoirAchatSimulator() {
  const { inputs, debouncedInputs, update } = usePouvoirAchat();
  const r = useMemo(
    () => calculerPouvoirAchat(debouncedInputs),
    [debouncedInputs],
  );

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24 space-y-6">
        <Card>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Choisis tes villes
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Sélectionne une ville principale et une ville de comparaison pour
            voir l&apos;écart de coût de la vie.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label={
                <span className="flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                  Ville principale
                </span>
              }
              htmlFor="ville1"
            >
              <select
                id="ville1"
                value={inputs.villeId}
                onChange={(e) => update("villeId", e.target.value)}
                className={selectCls}
              >
                {villes.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.nom}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label={
                <span className="flex items-center gap-2">
                  <ScaleIcon className="h-4 w-4 text-muted-foreground" />
                  Comparer avec
                </span>
              }
              htmlFor="ville2"
            >
              <select
                id="ville2"
                value={inputs.villeCompareId}
                onChange={(e) => update("villeCompareId", e.target.value)}
                className={selectCls}
              >
                {villes.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.nom}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <VilleCard result={r.principale} isPrimary />
          {r.comparaison && <VilleCard result={r.comparaison} />}
        </div>

        {r.comparaison && (
          <Card>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Écart mensuel
              </p>
              <p
                className={`text-4xl font-bold tabular-nums ${
                  r.ecartMensuel > 0 ? "text-destructive" : "text-accent"
                }`}
              >
                {r.ecartMensuel > 0 ? "+" : ""}
                {EUR0.format(r.ecartMensuel)} / mois
              </p>
              <p className="text-sm text-muted-foreground">
                {r.principale.ville.nom} est{" "}
                {Math.abs(r.ecartPourcent).toFixed(0)} %{" "}
                {r.ecartMensuel > 0 ? "plus chère" : "moins chère"} que{" "}
                {r.comparaison.ville.nom}
              </p>
              <p className="mt-2 text-sm text-foreground/80">
                Salaire net nécessaire : {EUR0.format(r.principale.salaireNetNecessaire)}{" "}
                vs {EUR0.format(r.comparaison.salaireNetNecessaire)} (écart de{" "}
                {EUR0.format(
                  Math.abs(
                    r.principale.salaireNetNecessaire -
                      r.comparaison.salaireNetNecessaire,
                  ),
                )}
                )
              </p>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}

function VilleCard({
  result,
  isPrimary,
}: {
  result: VilleResult;
  isPrimary?: boolean;
}) {
  const total = result.totalMensuel;
  const pcts = {
    loyer: (result.repartition.loyer / total) * 100,
    transport: (result.repartition.transport / total) * 100,
    alimentation: (result.repartition.alimentation / total) * 100,
    charges: (result.repartition.charges / total) * 100,
  };

  return (
    <div
      className={`rounded-2xl border p-6 shadow-md sm:p-8 ${
        isPrimary ? "border-2 border-primary bg-primary/5" : "border-border bg-white"
      }`}
    >
      <h4 className="text-xl font-bold text-foreground">
        {result.ville.nom}
      </h4>
      <p className="text-sm text-muted-foreground">{result.ville.region}</p>

      <ul className="mt-5 flex flex-col divide-y divide-border rounded-xl border border-border bg-background text-sm">
        <li className="flex items-center justify-between gap-3 px-4 py-2.5">
          <span className="text-foreground">🏠 Loyer T2 moyen</span>
          <span className="whitespace-nowrap font-semibold tabular-nums text-foreground">
            {EUR0.format(result.repartition.loyer)}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 px-4 py-2.5 text-muted-foreground">
          <span>🚇 Transport</span>
          <span className="whitespace-nowrap tabular-nums">
            {EUR0.format(result.repartition.transport)}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 px-4 py-2.5 text-muted-foreground">
          <span>🛒 Alimentation</span>
          <span className="whitespace-nowrap tabular-nums">
            {EUR0.format(result.repartition.alimentation)}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 px-4 py-2.5 text-muted-foreground">
          <span>⚡ Charges courantes</span>
          <span className="whitespace-nowrap tabular-nums">
            {EUR0.format(result.repartition.charges)}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 bg-muted/60 px-4 py-2.5 font-semibold text-foreground">
          <span>Total mensuel</span>
          <span className="whitespace-nowrap tabular-nums">
            {EUR0.format(result.totalMensuel)}
          </span>
        </li>
      </ul>

      {/* Stacked bar */}
      <div className="mt-4 flex h-4 overflow-hidden rounded-full">
        <div
          className="bg-primary"
          style={{ width: `${pcts.loyer}%` }}
          title={`Loyer ${pcts.loyer.toFixed(0)} %`}
        />
        <div
          className="bg-accent"
          style={{ width: `${pcts.transport}%` }}
          title={`Transport ${pcts.transport.toFixed(0)} %`}
        />
        <div
          className="bg-amber-400"
          style={{ width: `${pcts.alimentation}%` }}
          title={`Alimentation ${pcts.alimentation.toFixed(0)} %`}
        />
        <div
          className="bg-muted-foreground/30"
          style={{ width: `${pcts.charges}%` }}
          title={`Charges ${pcts.charges.toFixed(0)} %`}
        />
      </div>
      <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          Loyer
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Transport
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
          Alimentation
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/30" />
          Charges
        </span>
      </div>

      <div
        className={`mt-5 rounded-xl p-5 shadow-lg ${
          isPrimary
            ? "bg-primary text-primary-foreground"
            : "bg-foreground text-background"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
          Salaire net nécessaire
        </p>
        <p className="mt-1 text-3xl font-bold tabular-nums">
          {EUR0.format(result.salaireNetNecessaire)} / mois
        </p>
        <p className="mt-1 text-sm opacity-70">
          soit ~{EUR0.format(result.salaireBrutEstime)} brut · règle 30 %
          loyer
        </p>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
      {children}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

const selectCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";
