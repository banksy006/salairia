"use client";

import { useMemo } from "react";
import {
  comparerSasuEurl,
  type Scenario,
  type StatutResult,
  type Warning as CalcWarning,
} from "@/lib/calculators/sasu-eurl";
import { useSasuEurl } from "./SasuEurlContext";
import {
  EuroIcon,
  ReceiptIcon,
  BuildingIcon,
  AlertTriangleIcon,
  InfoIcon,
  LightbulbIcon,
} from "@/components/icons";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const PCT1 = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 1,
});

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

export default function SasuEurlSimulator() {
  const { inputs, debouncedInputs, update } = useSasuEurl();
  const r = useMemo(
    () => comparerSasuEurl(debouncedInputs),
    [debouncedInputs],
  );

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24 space-y-6">
        <Card>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Tes paramètres
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Les mêmes entrées sont appliquées aux deux statuts pour une
            comparaison juste.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field
              label={
                <span className="flex items-center gap-2">
                  <EuroIcon className="h-4 w-4 text-muted-foreground" />
                  CA HT annuel (€)
                </span>
              }
              htmlFor="ca"
            >
              <input
                id="ca"
                type="number"
                min={0}
                step={5000}
                value={inputs.caAnnuel}
                onChange={(e) =>
                  update("caAnnuel", Number(e.target.value) || 0)
                }
                className={inputCls}
              />
            </Field>

            <Field
              label={
                <span className="flex items-center gap-2">
                  <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
                  Charges d&apos;exploitation / an (€)
                </span>
              }
              htmlFor="charges"
              help="Loyer, outils, sous-traitance, assurance, comptable…"
            >
              <input
                id="charges"
                type="number"
                min={0}
                step={1000}
                value={inputs.chargesExploitation}
                onChange={(e) =>
                  update("chargesExploitation", Number(e.target.value) || 0)
                }
                className={inputCls}
              />
            </Field>

            <Field
              label={
                <span className="flex items-center gap-2">
                  <EuroIcon className="h-4 w-4 text-muted-foreground" />
                  Rémunération nette souhaitée / an (€)
                </span>
              }
              htmlFor="rem"
              help="Le salaire net que tu veux te verser. Le reste part en dividendes."
            >
              <input
                id="rem"
                type="number"
                min={0}
                step={1000}
                value={inputs.remunerationNette}
                onChange={(e) =>
                  update("remunerationNette", Number(e.target.value) || 0)
                }
                className={inputCls}
              />
            </Field>

            <Field
              label={
                <span className="flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                  Capital social (€)
                </span>
              }
              htmlFor="capital"
              help="Seuil dividendes EURL = 10 % du capital."
            >
              <input
                id="capital"
                type="number"
                min={1}
                step={100}
                value={inputs.capitalSocial}
                onChange={(e) =>
                  update("capitalSocial", Number(e.target.value) || 1)
                }
                className={inputCls}
              />
            </Field>
          </div>
        </Card>

        <WarningsList warnings={r.warnings} />

        <div className="grid gap-6 lg:grid-cols-2">
          <ResultCard
            label="SASU"
            sublabel="Président assimilé-salarié"
            result={r.sasu}
            isBest={r.meilleur === "sasu"}
          />
          <ResultCard
            label="EURL"
            sublabel="Gérant TNS"
            result={r.eurl}
            isBest={r.meilleur === "eurl"}
          />
        </div>
      </section>

      <section id="scenarios" className="scroll-mt-24">
        <Card>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            3 scénarios de répartition
          </h3>
          <p className="mt-2 text-base text-muted-foreground">
            Quel mix salaire / dividendes maximise ton net total ? Les
            scénarios sont calculés avec ton CA et tes charges actuels.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ScenarioTable label="SASU" scenarios={r.scenariosSasu} />
            <ScenarioTable label="EURL" scenarios={r.scenariosEurl} />
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Le scénario « 100 % dividendes » en SASU implique zéro
            couverture sociale. En EURL, des cotisations minimales de
            1 200 €/an s&apos;appliquent même sans rémunération.
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
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
      {help && <span className="text-xs text-muted-foreground">{help}</span>}
    </div>
  );
}

function ResultCard({
  label,
  sublabel,
  result,
  isBest,
}: {
  label: string;
  sublabel: string;
  result: StatutResult;
  isBest: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-md sm:p-8 ${
        isBest
          ? "border-2 border-accent bg-accent/5"
          : "border-border bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="text-xl font-bold text-foreground">{label}</h4>
          <p className="text-sm text-muted-foreground">{sublabel}</p>
        </div>
        {isBest && (
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            Meilleur net
          </span>
        )}
      </div>

      <ul className="mt-5 flex flex-col divide-y divide-border rounded-xl border border-border bg-background text-sm">
        <Row label="Rémunération nette" value={EUR0.format(result.remunerationNette)} />
        <Row
          label={<TwoLine main="Charges sociales" sub={`Coût total société : ${EUR0.format(result.coutRemuneration)}`} />}
          value={EUR0.format(-result.chargesSociales)}
          muted
        />
        <Row label="Bénéfice avant IS" value={EUR0.format(result.beneficeAvantIS)} />
        <Row label="Impôt sur les sociétés" value={EUR0.format(-result.is)} muted />
        <Row label="Dividendes bruts" value={EUR0.format(result.dividendesBruts)} />
        <Row
          label={<TwoLine main="Taxes dividendes" sub="Flat tax 30 % + cotisations éventuelles" />}
          value={EUR0.format(-result.taxeDividendes)}
          muted
        />
        <Row label="Dividendes nets" value={EUR0.format(result.dividendesNets)} />
      </ul>

      <div
        className={`mt-4 rounded-xl p-6 shadow-lg ${
          isBest ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
          Net total / an · Retour {PCT1.format(result.tauxRetour)}
        </p>
        <p className="mt-1 text-4xl font-bold tabular-nums">
          {EUR0.format(result.netTotal)}
        </p>
        <p className="mt-1 text-sm opacity-70">
          soit {EUR0.format(result.netTotal / 12)} / mois
        </p>
      </div>
    </div>
  );
}

function ScenarioTable({
  label,
  scenarios,
}: {
  label: string;
  scenarios: Scenario[];
}) {
  const bestNet = Math.max(...scenarios.map((s) => s.netTotal));
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3" colSpan={4}>
              {label}
            </th>
          </tr>
          <tr className="border-t border-border">
            <th className="px-4 py-2">Scénario</th>
            <th className="px-4 py-2 text-right">Salaire</th>
            <th className="px-4 py-2 text-right">Dividendes</th>
            <th className="px-4 py-2 text-right">Net total</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s) => {
            const best = Math.abs(s.netTotal - bestNet) < 10;
            return (
              <tr
                key={s.label}
                className={`border-b border-border last:border-b-0 ${best ? "bg-accent/5 font-semibold" : ""}`}
              >
                <td className={`px-4 py-3 ${best ? "border-l-4 border-accent" : ""}`}>
                  {s.label}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {EUR0.format(s.remunerationNette)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {EUR0.format(s.dividendesNets)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-bold">
                  {EUR0.format(s.netTotal)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
  muted,
}: {
  label: React.ReactNode;
  value: string;
  muted?: boolean;
}) {
  return (
    <li
      className={`flex items-center justify-between gap-3 px-4 py-2.5 ${
        muted ? "text-muted-foreground" : "text-foreground"
      }`}
    >
      <span>{label}</span>
      <span className="whitespace-nowrap tabular-nums">{value}</span>
    </li>
  );
}

function WarningsList({ warnings }: { warnings: CalcWarning[] }) {
  if (warnings.length === 0) return null;
  return (
    <ul className="flex flex-col gap-3">
      {warnings.map((w, i) => (
        <li key={i}>
          <Alert
            tone={
              w.severity === "danger"
                ? "destructive"
                : w.severity === "warning"
                  ? "warning"
                  : "info"
            }
          >
            {w.message}
          </Alert>
        </li>
      ))}
    </ul>
  );
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
    tone === "destructive" ? (
      <AlertTriangleIcon className="h-4 w-4" />
    ) : tone === "warning" ? (
      <InfoIcon className="h-4 w-4" />
    ) : (
      <LightbulbIcon className="h-4 w-4" />
    );
  return (
    <div
      className={`flex items-start gap-3 rounded-r-lg border-l-4 p-4 text-sm ${cls}`}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}
