"use client";

import { useMemo } from "react";
import {
  calculerNetApresImpot,
  BAREME_TAUX_NEUTRE_2026,
  getTauxNeutre,
} from "@/lib/calculators/net-apres-impot";
import type { ModeImpot } from "@/lib/calculators/net-apres-impot";
import { useNetImpot } from "./NetImpotContext";
import {
  EuroIcon,
  PercentIcon,
  AlertTriangleIcon,
  InfoIcon,
  LightbulbIcon,
} from "@/components/icons";

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const PCT1 = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 1,
});
const EUR_FULL = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

export default function NetApresImpotSimulator() {
  const { inputs, debouncedInputs, update } = useNetImpot();

  const result = useMemo(
    () => calculerNetApresImpot(debouncedInputs),
    [debouncedInputs],
  );

  const userTauxNeutre = useMemo(
    () => getTauxNeutre(debouncedInputs.netAvantImpot),
    [debouncedInputs.netAvantImpot],
  );

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24">
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="inline-flex rounded-xl border border-border bg-white p-1 shadow-sm">
            <Pill
              active={inputs.mode === "taux-neutre"}
              onClick={() => update("mode", "taux-neutre" as ModeImpot)}
            >
              Taux neutre (grille officielle)
            </Pill>
            <Pill
              active={inputs.mode === "taux-personnalise"}
              onClick={() => update("mode", "taux-personnalise" as ModeImpot)}
            >
              Mon taux personnalisé
            </Pill>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Tes paramètres
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {inputs.mode === "taux-neutre"
                ? "Entre ton net avant impôt, on applique le barème officiel."
                : "Entre ton net avant impôt et ton taux personnalisé."}
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <EuroIcon className="h-4 w-4 text-muted-foreground" />
                    Net avant impôt mensuel (€)
                  </span>
                }
                htmlFor="netAvantImpot"
              >
                <input
                  id="netAvantImpot"
                  type="number"
                  min={0}
                  step={100}
                  value={inputs.netAvantImpot}
                  onChange={(e) =>
                    update("netAvantImpot", Number(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>

              {inputs.mode === "taux-personnalise" && (
                <Field
                  label={
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <PercentIcon className="h-4 w-4 text-muted-foreground" />
                        Taux personnalisé
                      </span>
                      <span className="text-primary tabular-nums">
                        {inputs.tauxPerso} %
                      </span>
                    </span>
                  }
                  htmlFor="tauxPerso"
                  help="Ton taux est sur impots.gouv.fr, rubrique « Gérer mon prélèvement à la source »."
                >
                  <input
                    id="tauxPerso"
                    type="range"
                    min={0}
                    max={43}
                    step={0.5}
                    value={inputs.tauxPerso}
                    onChange={(e) =>
                      update("tauxPerso", Number(e.target.value))
                    }
                    className="w-full accent-[color:var(--primary)]"
                  />
                </Field>
              )}

              {inputs.mode === "taux-neutre" && (
                <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                  <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-foreground/80">
                    Le taux neutre est calculé automatiquement à partir de la
                    grille officielle 2026. Pour{" "}
                    {EUR.format(debouncedInputs.netAvantImpot)} net/mois, le
                    taux est de {PCT1.format(userTauxNeutre)}.
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Ton résultat
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Détail du prélèvement à la source 2026.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-background">
                <Row
                  label="Net avant impôt"
                  value={EUR.format(result.netAvantImpot)}
                  strong
                />
                <Row
                  label={
                    <TwoLine
                      main="Taux appliqué"
                      sub={
                        inputs.mode === "taux-neutre"
                          ? `Barème neutre — tranche ${result.trancheBareme}`
                          : "Taux personnalisé"
                      }
                    />
                  }
                  value={PCT1.format(result.tauxApplique)}
                  muted
                />
                <Row
                  label="Montant PAS"
                  value={`-${EUR.format(result.montantPAS)}`}
                  highlight
                />
              </ul>

              <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Net après impôt / mois
                </p>
                <p className="mt-2 text-5xl font-bold tabular-nums">
                  {EUR.format(result.netApresImpot)}
                </p>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  soit {EUR.format(result.netApresImpotAnnuel)} / an
                </p>
              </div>

              {inputs.mode === "taux-neutre" && result.tauxApplique === 0 && (
                <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
                  <LightbulbIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm text-foreground/80">
                    Avec un net de {EUR.format(debouncedInputs.netAvantImpot)}/mois,
                    le taux neutre est à 0 %. Cela ne signifie pas que vous
                    n&apos;êtes pas imposable : un régularisation peut
                    intervenir à la déclaration.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <p className="text-sm text-foreground/80">
                  Estimation indicative. Le taux neutre ne tient pas compte de
                  votre situation familiale ni de vos autres revenus. Consultez
                  votre espace impots.gouv.fr pour votre taux réel.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="scroll-mt-24">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          Barème taux neutre 2026 — toutes les tranches
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Ta tranche est surlignée en vert.
        </p>

        <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tranche</th>
                <th className="px-4 py-3">Net imposable mensuel</th>
                <th className="px-4 py-3 text-right">Taux</th>
              </tr>
            </thead>
            <tbody>
              {BAREME_TAUX_NEUTRE_2026.map((tranche, i) => {
                const min =
                  i === 0
                    ? 0
                    : BAREME_TAUX_NEUTRE_2026[i - 1].max + 1;
                const isActive =
                  inputs.mode === "taux-neutre" &&
                  debouncedInputs.netAvantImpot >= min &&
                  debouncedInputs.netAvantImpot <= tranche.max;
                const maxLabel =
                  tranche.max === Infinity
                    ? "et plus"
                    : `${EUR_FULL.format(tranche.max)}`;
                return (
                  <tr
                    key={i}
                    className={`border-b border-border last:border-b-0 ${
                      isActive
                        ? "bg-accent/10 font-semibold text-accent"
                        : "text-foreground/80"
                    }`}
                  >
                    <td className="px-4 py-3 tabular-nums">{i + 1}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {EUR_FULL.format(min)} – {maxLabel}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {PCT1.format(tranche.taux)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg sm:p-8">
      {children}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  help,
  children,
}: {
  label: React.ReactNode;
  htmlFor: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
      {help && <span className="text-xs text-muted-foreground">{help}</span>}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function TwoLine({ main, sub }: { main: string; sub: string }) {
  return (
    <span className="flex flex-col">
      <span>{main}</span>
      <span className="text-xs text-muted-foreground">{sub}</span>
    </span>
  );
}

function Row({
  label,
  value,
  strong,
  muted,
  highlight,
}: {
  label: React.ReactNode;
  value: string;
  strong?: boolean;
  muted?: boolean;
  highlight?: boolean;
}) {
  const rowCls = highlight ? "bg-muted/60" : "";
  const labelCls = strong
    ? "font-semibold text-foreground"
    : highlight
      ? "font-medium text-foreground"
      : muted
        ? "text-muted-foreground"
        : "text-foreground";
  const valueCls = strong || highlight
    ? "font-semibold text-foreground"
    : muted
      ? "text-muted-foreground"
      : "text-foreground";
  return (
    <li
      className={`flex items-center justify-between gap-4 px-4 py-3 text-base ${rowCls}`}
    >
      <span className={labelCls}>{label}</span>
      <span className={`whitespace-nowrap tabular-nums ${valueCls}`}>
        {value}
      </span>
    </li>
  );
}
