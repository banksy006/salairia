"use client";

import { useMemo } from "react";
import {
  calculerTous,
  calculerTousPourNetCible,
  STATUT_LABELS,
  type NetCibleResult,
  type StatutFreelance,
  type StatutResult,
  type Warning as CalcWarning,
} from "@/lib/calculators/tjm-freelance";
import { useTJM } from "./TJMContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

export default function TJMSimulator() {
  const { state, debouncedState, update } = useTJM();
  const { mode } = state;

  const tjmResults = useMemo(
    () => calculerTous(debouncedState),
    [debouncedState],
  );
  const netResults = useMemo(
    () =>
      calculerTousPourNetCible(debouncedState.netCible, debouncedState),
    [debouncedState],
  );

  const sortedTjm = useMemo(
    () => [...tjmResults].sort((a, b) => b.netApresImpot - a.netApresImpot),
    [tjmResults],
  );
  const sortedNet = useMemo(
    () => [...netResults].sort((a, b) => a.tjm - b.tjm),
    [netResults],
  );

  const bestTjm = sortedTjm[0];
  const bestNet = sortedNet[0];

  const globalWarnings = useMemo<CalcWarning[]>(() => {
    const warnings: CalcWarning[] = [];
    const effectiveTjm =
      mode === "tjm"
        ? debouncedState.tjm
        : Math.min(...netResults.map((r) => r.tjm || Infinity));
    if (effectiveTjm > 0 && effectiveTjm < 250) {
      warnings.push({
        severity: "warning",
        message:
          "TJM bas. Le statut auto-entrepreneur reste le plus simple pour débuter.",
      });
    }
    const maxCA = Math.max(
      ...(mode === "tjm"
        ? tjmResults.map((r) => r.caHT)
        : netResults.map((r) => r.caHT)),
    );
    if (maxCA > 200_000) {
      warnings.push({
        severity: "info",
        message:
          "À ce niveau de CA, consultez un expert-comptable pour optimiser salaire / dividendes en SASU.",
      });
    }
    return warnings;
  }, [mode, debouncedState, tjmResults, netResults]);

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24">
        <div className="mb-6 inline-flex rounded-xl border border-border bg-white p-1 shadow-sm">
          <ToggleBtn
            active={mode === "net"}
            onClick={() => update("mode", "net")}
          >
            Quel TJM pour mon net ?
          </ToggleBtn>
          <ToggleBtn
            active={mode === "tjm"}
            onClick={() => update("mode", "tjm")}
          >
            Quel net pour mon TJM ?
          </ToggleBtn>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Tes paramètres
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "net"
                ? "Indique ton revenu net annuel cible. On calcule le TJM nécessaire pour chaque statut."
                : "Indique ton TJM. On calcule ton net annuel pour chaque statut."}
            </p>

            <div className="mt-6 flex flex-col gap-5">
              {mode === "net" ? (
                <Field label="Net annuel cible (€)" htmlFor="netCible">
                  <input
                    id="netCible"
                    type="number"
                    min={0}
                    step={1000}
                    value={state.netCible}
                    onChange={(e) =>
                      update("netCible", Number(e.target.value) || 0)
                    }
                    className={inputCls}
                  />
                </Field>
              ) : (
                <Field label="TJM (€ HT)" htmlFor="tjm">
                  <input
                    id="tjm"
                    type="number"
                    min={0}
                    step={10}
                    value={state.tjm}
                    onChange={(e) =>
                      update("tjm", Number(e.target.value) || 0)
                    }
                    className={inputCls}
                  />
                </Field>
              )}

              <Field
                label={
                  <span className="flex items-center justify-between gap-2">
                    <span>Jours travaillés / mois</span>
                    <span className="text-primary tabular-nums">
                      {state.joursTravailles}
                    </span>
                  </span>
                }
                htmlFor="jours"
              >
                <input
                  id="jours"
                  type="range"
                  min={12}
                  max={22}
                  step={1}
                  value={state.joursTravailles}
                  onChange={(e) =>
                    update("joursTravailles", Number(e.target.value))
                  }
                  className="w-full accent-[color:var(--primary)]"
                />
              </Field>

              <Field
                label="Frais pro mensuels (€)"
                htmlFor="fraispro"
                help="Logiciels, matériel, local, téléphone, assurance…"
              >
                <input
                  id="fraispro"
                  type="number"
                  min={0}
                  step={10}
                  value={state.fraisProMensuels}
                  onChange={(e) =>
                    update(
                      "fraisProMensuels",
                      Number(e.target.value) || 0,
                    )
                  }
                  className={inputCls}
                />
              </Field>

              <Field
                label={
                  <span className="flex items-center justify-between gap-2">
                    <span>Taux prélèvement à la source</span>
                    <span className="text-primary tabular-nums">
                      {state.tauxPAS}%
                    </span>
                  </span>
                }
                htmlFor="pas"
                help="Laisse 0 pour afficher le net avant impôt."
              >
                <input
                  id="pas"
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={state.tauxPAS}
                  onChange={(e) =>
                    update("tauxPAS", Number(e.target.value))
                  }
                  className="w-full accent-[color:var(--primary)]"
                />
              </Field>
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {mode === "net"
                ? "Statut le plus efficace"
                : "Statut le plus rentable"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Le comparatif complet des 4 statuts est disponible juste
              en-dessous.
            </p>

            <div className="mt-6 rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                {mode === "net" ? "TJM minimum requis" : "Net annuel estimé"}
              </p>
              <p className="mt-2 text-5xl font-bold tabular-nums">
                {mode === "net"
                  ? `${EUR0.format(bestNet?.tjm ?? 0)} / j`
                  : EUR0.format(bestTjm?.netApresImpot ?? 0)}
              </p>
              <p className="mt-3 text-sm text-primary-foreground/80">
                via{" "}
                <strong>
                  {STATUT_LABELS[
                    (mode === "net"
                      ? bestNet?.statut
                      : bestTjm?.statut) ?? "auto-entrepreneur"
                  ]}
                </strong>
              </p>
              {mode === "net" ? (
                <p className="mt-1 text-sm text-primary-foreground/70">
                  CA HT à facturer :{" "}
                  {EUR0.format(bestNet?.caHT ?? 0)} / an
                </p>
              ) : (
                <p className="mt-1 text-sm text-primary-foreground/70">
                  Net mensuel :{" "}
                  {EUR0.format(bestTjm?.netMensuel ?? 0)}
                </p>
              )}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Calcul indicatif basé sur les taux moyens 2026. Les taux réels
              varient selon votre situation. Consultez un expert-comptable
              pour toute décision importante.
            </p>
          </Card>
        </div>
      </section>

      <section id="comparatif" className="scroll-mt-24">
        <Card>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Comparatif des 4 statuts freelance
          </h3>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            {mode === "net"
              ? `TJM nécessaire pour atteindre ${EUR0.format(debouncedState.netCible)} nets par an, selon chaque statut. L'offre qui demande le TJM le plus bas est mise en avant.`
              : "Net annuel estimé pour chaque statut avec tes paramètres actuels. L'offre qui maximise ton net est mise en avant."}
          </p>

          <WarningsList
            globalWarnings={globalWarnings}
            perStatut={
              mode === "net"
                ? sortedNet.flatMap((r) =>
                    r.warnings.map((w) => ({ ...w, statut: r.statut })),
                  )
                : sortedTjm.flatMap((r) =>
                    r.warnings.map((w) => ({ ...w, statut: r.statut })),
                  )
            }
          />

          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
            {mode === "net" ? (
              <NetCibleTable rows={sortedNet} bestStatut={bestNet?.statut} />
            ) : (
              <TjmCibleTable rows={sortedTjm} bestStatut={bestTjm?.statut} />
            )}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Sources des taux : URSSAF, BOSS.gouv.fr, Legifrance. Les taux
            utilisés sont des moyennes 2026 indicatives, à des fins
            d&apos;orientation. Pour une décision importante, consultez un
            expert-comptable.
          </p>
        </Card>
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
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      {children}
      {help && <span className="text-xs text-muted-foreground">{help}</span>}
    </div>
  );
}

function ToggleBtn({
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

function NetCibleTable({
  rows,
  bestStatut,
}: {
  rows: NetCibleResult[];
  bestStatut: StatutFreelance | undefined;
}) {
  return (
    <table className="w-full text-left">
      <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <tr>
          <th className="px-6 py-4">Statut</th>
          <th className="whitespace-nowrap px-6 py-4 text-right">
            TJM nécessaire
          </th>
          <th className="whitespace-nowrap px-6 py-4 text-right">
            CA HT annuel
          </th>
          <th className="whitespace-nowrap px-6 py-4 text-right">
            Net atteint
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const best = r.statut === bestStatut;
          return (
            <tr
              key={r.statut}
              className={`border-b border-border transition last:border-b-0 hover:bg-muted/50 ${
                best ? "bg-accent/5" : ""
              }`}
            >
              <td
                className={`px-6 py-4 ${
                  best ? "border-l-4 border-accent" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {STATUT_LABELS[r.statut]}
                  </span>
                  {best && (
                    <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                      Meilleur choix
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right text-lg font-bold tabular-nums text-foreground">
                {EUR0.format(r.tjm)} / j
              </td>
              <td className="px-6 py-4 text-right text-base tabular-nums text-muted-foreground">
                {EUR0.format(r.caHT)}
              </td>
              <td className="px-6 py-4 text-right text-base tabular-nums text-muted-foreground">
                {EUR0.format(r.netAtteint)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TjmCibleTable({
  rows,
  bestStatut,
}: {
  rows: StatutResult[];
  bestStatut: StatutFreelance | undefined;
}) {
  return (
    <table className="w-full text-left">
      <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <tr>
          <th className="px-6 py-4">Statut</th>
          <th className="whitespace-nowrap px-6 py-4 text-right">
            CA HT annuel
          </th>
          <th className="whitespace-nowrap px-6 py-4 text-right">
            Charges + frais
          </th>
          <th className="whitespace-nowrap px-6 py-4 text-right">
            Net annuel
          </th>
          <th className="whitespace-nowrap px-6 py-4 text-right">
            Net mensuel
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const best = r.statut === bestStatut;
          return (
            <tr
              key={r.statut}
              className={`border-b border-border transition last:border-b-0 hover:bg-muted/50 ${
                best ? "bg-accent/5" : ""
              }`}
            >
              <td
                className={`px-6 py-4 ${
                  best ? "border-l-4 border-accent" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {STATUT_LABELS[r.statut]}
                  </span>
                  {best && (
                    <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                      Meilleur net
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right text-base tabular-nums text-muted-foreground">
                {EUR0.format(r.caHT)}
              </td>
              <td className="px-6 py-4 text-right text-base tabular-nums text-muted-foreground">
                {EUR0.format(r.deductionsTotales)}
              </td>
              <td className="px-6 py-4 text-right text-lg font-bold tabular-nums text-foreground">
                {EUR0.format(r.netApresImpot)}
              </td>
              <td className="px-6 py-4 text-right text-base tabular-nums text-muted-foreground">
                {EUR0.format(r.netMensuel)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function WarningsList({
  globalWarnings,
  perStatut,
}: {
  globalWarnings: CalcWarning[];
  perStatut: (CalcWarning & { statut: StatutFreelance })[];
}) {
  const seen = new Set<string>();
  const dedupedPerStatut = perStatut.filter((w) => {
    const key = `${w.statut}|${w.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (globalWarnings.length === 0 && dedupedPerStatut.length === 0) {
    return null;
  }

  return (
    <ul className="mt-6 flex flex-col gap-3">
      {globalWarnings.map((w, i) => (
        <li key={`g-${i}`}>
          <Alert tone={mapSeverity(w.severity)}>{w.message}</Alert>
        </li>
      ))}
      {dedupedPerStatut.map((w, i) => (
        <li key={`s-${i}`}>
          <Alert tone={mapSeverity(w.severity)}>
            <strong>{STATUT_LABELS[w.statut]} — </strong>
            {w.message}
          </Alert>
        </li>
      ))}
    </ul>
  );
}

function mapSeverity(
  severity: CalcWarning["severity"],
): "destructive" | "warning" | "info" {
  if (severity === "danger") return "destructive";
  if (severity === "warning") return "warning";
  return "info";
}

function Alert({
  tone,
  children,
}: {
  tone: "destructive" | "warning" | "info";
  children: React.ReactNode;
}) {
  const cls =
    tone === "destructive"
      ? "border-destructive bg-destructive/10 text-destructive"
      : tone === "warning"
        ? "border-amber-500 bg-amber-50 text-amber-900"
        : "border-primary/40 bg-primary/5 text-primary";
  const icon =
    tone === "destructive" ? "⚠️" : tone === "warning" ? "ℹ️" : "💡";
  return (
    <div
      className={`flex items-start gap-3 rounded-r-lg border-l-4 p-4 text-sm ${cls}`}
    >
      <span aria-hidden className="text-base leading-none">
        {icon}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}
