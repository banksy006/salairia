"use client";

import { useMemo } from "react";
import {
  AE_CATEGORIE_LABELS,
  AE_CATEGORIES,
  calculerAutoEntrepreneur,
  type AECategorie,
  type Warning as CalcWarning,
} from "@/lib/calculators/auto-entrepreneur";
import { useAE } from "./AEContext";

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

export default function AutoEntrepreneurSimulator() {
  const { inputs, debouncedInputs, update } = useAE();
  const result = useMemo(
    () => calculerAutoEntrepreneur(debouncedInputs),
    [debouncedInputs],
  );

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Tes paramètres
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ajuste tes entrées, le résultat se met à jour en direct.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <Field label="Chiffre d'affaires annuel (€)" htmlFor="ca">
                <input
                  id="ca"
                  type="number"
                  min={0}
                  step={1000}
                  value={inputs.caAnnuel}
                  onChange={(e) =>
                    update("caAnnuel", Number(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>

              <Field label="Catégorie d'activité" htmlFor="categorie">
                <select
                  id="categorie"
                  value={inputs.categorie}
                  onChange={(e) =>
                    update("categorie", e.target.value as AECategorie)
                  }
                  className={inputCls}
                >
                  {AE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {AE_CATEGORIE_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Frais professionnels annuels (€)"
                htmlFor="fraispro"
                help="Matériel, logiciels, assurance RC pro, comptable…"
              >
                <input
                  id="fraispro"
                  type="number"
                  min={0}
                  step={100}
                  value={inputs.fraisProAnnuels}
                  onChange={(e) =>
                    update("fraisProAnnuels", Number(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>

              <Toggle
                id="acre"
                label="ACRE active (1re année)"
                checked={inputs.acre}
                onChange={(v) => update("acre", v)}
                help="Réduction 25 % des taux URSSAF pendant 12 mois"
              />

              <Toggle
                id="vl"
                label="Versement libératoire"
                checked={inputs.versementLiberatoire}
                onChange={(v) => update("versementLiberatoire", v)}
                help="L'impôt sur le revenu est prélevé en % du CA au lieu des tranches IR classiques"
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Ton résultat annuel
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Estimation basée sur les taux officiels URSSAF 2026.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <WarningsList warnings={result.warnings} />

              <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-background">
                <DetailRow
                  label="Chiffre d'affaires annuel"
                  value={EUR0.format(result.caAnnuel)}
                />
                <DetailRow
                  label={`− Cotisations URSSAF · ${PCT1.format(result.tauxURSSAFEffectif)}`}
                  value={EUR0.format(-result.cotisationsURSSAF)}
                  muted
                />
                <DetailRow
                  label="− CFP"
                  value={EUR0.format(-result.cfp)}
                  muted
                />
                <DetailRow
                  label="− Frais professionnels"
                  value={EUR0.format(-result.fraisPro)}
                  muted
                />
                <DetailRow
                  label="Revenu avant impôt"
                  value={EUR0.format(result.revenuAvantImpot)}
                  highlight
                />
                {inputs.versementLiberatoire && (
                  <DetailRow
                    label="− Versement libératoire"
                    value={EUR0.format(-result.montantVL)}
                    muted
                  />
                )}
                {!inputs.versementLiberatoire && (
                  <li className="px-4 py-2.5 text-sm italic text-muted-foreground">
                    Impôt sur le revenu à calculer séparément selon votre
                    tranche
                  </li>
                )}
              </ul>

              <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                  {inputs.versementLiberatoire
                    ? "Net annuel après VL"
                    : "Revenu avant IR"}{" "}
                  · Taux de retour {PCT1.format(result.tauxRetour)}
                </p>
                <p className="mt-2 text-5xl font-bold tabular-nums">
                  {EUR0.format(result.revenuNetApresImpot)}
                </p>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  Soit{" "}
                  <strong>{EUR0.format(result.netMensuel)}</strong> / mois
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Calcul indicatif basé sur les taux officiels URSSAF 2026.
                Pour votre situation personnelle, vérifiez sur
                autoentrepreneur.urssaf.fr.
              </p>
            </div>
          </Card>
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

function Toggle({
  id,
  label,
  checked,
  onChange,
  help,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  help?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center justify-between gap-3"
      >
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
            checked ? "bg-accent" : "bg-border"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </label>
      {help && <span className="text-xs text-muted-foreground">{help}</span>}
    </div>
  );
}

function DetailRow({
  label,
  value,
  muted,
  highlight,
}: {
  label: string;
  value: string;
  muted?: boolean;
  highlight?: boolean;
}) {
  const rowCls = highlight ? "bg-muted/60" : "";
  const textCls = highlight
    ? "font-medium text-foreground"
    : muted
      ? "text-muted-foreground"
      : "text-foreground";
  const valueCls = highlight ? "font-semibold text-foreground" : textCls;
  return (
    <li
      className={`flex items-center justify-between gap-4 px-4 py-3 text-base ${rowCls}`}
    >
      <span className={`whitespace-nowrap ${textCls}`}>{label}</span>
      <span className={`tabular-nums ${valueCls}`}>{value}</span>
    </li>
  );
}

function WarningsList({ warnings }: { warnings: CalcWarning[] }) {
  if (warnings.length === 0) return null;
  return (
    <ul className="flex flex-col gap-3">
      {warnings.map((w, i) => (
        <li key={i}>
          <Alert tone={w.severity === "danger" ? "destructive" : w.severity}>
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
