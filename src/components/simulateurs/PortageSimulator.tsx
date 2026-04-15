"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculerPortage,
  comparerSocietes,
  type PortageInputs,
  type StatutPortage,
} from "@/lib/calculators/portage";

const DEFAULTS: PortageInputs = {
  tjm: 500,
  joursTravailles: 18,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
};

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function PortageSimulator() {
  const [inputs, setInputs] = useState<PortageInputs>(DEFAULTS);
  const debounced = useDebounced(inputs, 150);

  const result = useMemo(() => calculerPortage(debounced), [debounced]);
  const comparatif = useMemo(() => comparerSocietes(debounced), [debounced]);

  const meilleurNet = Math.max(...comparatif.map((c) => c.netFinal));

  function update<K extends keyof PortageInputs>(
    key: K,
    value: PortageInputs[K],
  ) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-8 rounded-2xl border border-border bg-muted/40 p-6 md:grid-cols-2 md:p-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-foreground">
            Tes paramètres
          </h2>

          <Field label="TJM (€ HT)" htmlFor="tjm">
            <input
              id="tjm"
              type="number"
              min={0}
              step={10}
              value={inputs.tjm}
              onChange={(e) => update("tjm", Number(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>

          <Field label="Jours travaillés / mois" htmlFor="jours">
            <input
              id="jours"
              type="number"
              min={0}
              max={31}
              step={0.5}
              value={inputs.joursTravailles}
              onChange={(e) =>
                update("joursTravailles", Number(e.target.value) || 0)
              }
              className={inputCls}
            />
          </Field>

          <Field
            label={`Frais de gestion société : ${inputs.tauxFraisGestion}%`}
            htmlFor="gestion"
          >
            <input
              id="gestion"
              type="range"
              min={4}
              max={10}
              step={0.5}
              value={inputs.tauxFraisGestion}
              onChange={(e) =>
                update("tauxFraisGestion", Number(e.target.value))
              }
              className="w-full accent-[color:var(--primary)]"
            />
          </Field>

          <Field
            label="Frais pro refacturables (€ / mois)"
            htmlFor="refact"
            help="Remboursés par le client, non soumis à charges"
          >
            <input
              id="refact"
              type="number"
              min={0}
              step={10}
              value={inputs.fraisProRefacturables}
              onChange={(e) =>
                update("fraisProRefacturables", Number(e.target.value) || 0)
              }
              className={inputCls}
            />
          </Field>

          <Field
            label="Frais pro non refacturables (€ / mois)"
            htmlFor="nonrefact"
            help="À ta charge, déduits du CA avant cotisations"
          >
            <input
              id="nonrefact"
              type="number"
              min={0}
              step={10}
              value={inputs.fraisProNonRefacturables}
              onChange={(e) =>
                update("fraisProNonRefacturables", Number(e.target.value) || 0)
              }
              className={inputCls}
            />
          </Field>

          <Field label="Statut" htmlFor="statut">
            <select
              id="statut"
              value={inputs.statut}
              onChange={(e) =>
                update("statut", e.target.value as StatutPortage)
              }
              className={inputCls}
            >
              <option value="junior">Junior (&lt; 3 ans)</option>
              <option value="senior">Senior (≥ 3 ans)</option>
              <option value="forfait_jours">Forfait jours</option>
            </select>
          </Field>

          <Field
            label="Taux de prélèvement à la source (%)"
            htmlFor="pas"
            help="Laisse 0 pour ne pas appliquer"
          >
            <input
              id="pas"
              type="number"
              min={0}
              max={45}
              step={0.1}
              value={inputs.tauxPAS}
              onChange={(e) => update("tauxPAS", Number(e.target.value) || 0)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            Ton résultat mensuel
          </h2>

          {result.tjmTropBas && (
            <Alert tone="destructive">
              TJM trop bas pour le portage salarial. Considère le statut
              auto-entrepreneur, plus adapté en dessous de 250 €/jour.
            </Alert>
          )}
          {!result.tjmTropBas && result.sousMinimum && (
            <Alert tone="warning">
              Attention : avec ces paramètres, ton salaire brut n&apos;atteint
              pas le minimum conventionnel de ton statut (
              {EUR.format(result.salaireMinimumConventionnel)}/mois). La société
              de portage pourra refuser la mission.
            </Alert>
          )}

          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <table className="w-full text-sm">
              <tbody>
                <Row label="Chiffre d'affaires HT" value={result.caHT} />
                <Row
                  label="− Frais de gestion"
                  value={-result.fraisGestion}
                  muted
                />
                <Row
                  label="− Frais pro non refacturables"
                  value={-inputs.fraisProNonRefacturables}
                  muted
                />
                <Row
                  label="− Charges patronales (43%)"
                  value={-result.chargesPatronales}
                  muted
                />
                <Row
                  label="Salaire brut"
                  value={result.salaireBrut}
                  strong
                />
                <Row
                  label="− Charges salariales (22%)"
                  value={-result.chargesSalariales}
                  muted
                />
                <Row
                  label="Salaire net avant impôt"
                  value={result.salaireNetAvantImpot}
                  strong
                />
                {result.salaireNetApresImpot !== null && (
                  <Row
                    label={`− Impôt à la source (${inputs.tauxPAS}%)`}
                    value={
                      result.salaireNetAvantImpot -
                      result.salaireNetApresImpot
                    }
                    muted
                    negative
                  />
                )}
                {result.salaireNetApresImpot !== null && (
                  <Row
                    label="Salaire net après impôt"
                    value={result.salaireNetApresImpot}
                    strong
                  />
                )}
                {inputs.fraisProRefacturables > 0 && (
                  <Row
                    label="+ Remboursement frais refacturables"
                    value={result.fraisRefactures}
                  />
                )}
                <tr className="bg-primary text-primary-foreground">
                  <td className="px-4 py-3 text-left font-semibold">
                    Total perçu / mois
                  </td>
                  <td className="px-4 py-3 text-right text-base font-bold tabular-nums">
                    {EUR.format(result.totalPercu)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground">
            Calcul indicatif basé sur des taux moyens 2026 (charges patronales
            43 %, salariales 22 %). Les taux réels varient selon la société de
            portage, la mutuelle et la prévoyance.
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Comparatif de 5 sociétés de portage
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Salaire net estimé selon les frais de gestion appliqués par chaque
            société, avec tes paramètres actuels. La meilleure offre est
            surlignée.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Société</th>
                <th className="px-4 py-3 text-right">Frais de gestion</th>
                <th className="px-4 py-3 text-right">Salaire brut</th>
                <th className="px-4 py-3 text-right">Net mensuel</th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map(({ societe, result: r, netFinal }) => {
                const best = netFinal === meilleurNet;
                return (
                  <tr
                    key={societe.nom}
                    className={
                      best
                        ? "bg-accent/10 font-semibold"
                        : "border-t border-border"
                    }
                  >
                    <td className="px-4 py-3 text-left">
                      {societe.nom}
                      {best && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                          Meilleur net
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {societe.tauxFraisGestion}%
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {EUR.format(r.salaireBrut)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {EUR.format(netFinal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground">
          Taux de frais de gestion relevés en avril 2026 sur les sites publics
          de chaque société. Certaines proposent des paliers dégressifs selon
          le chiffre d&apos;affaires — vérifie toujours l&apos;offre
          commerciale avant de t&apos;engager.
        </p>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring";

function Field({
  label,
  htmlFor,
  help,
  children,
}: {
  label: string;
  htmlFor: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {help && <span className="text-xs text-muted-foreground">{help}</span>}
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  muted,
  negative,
}: {
  label: string;
  value: number;
  strong?: boolean;
  muted?: boolean;
  negative?: boolean;
}) {
  const display = negative ? -Math.abs(value) : value;
  return (
    <tr className="border-b border-border last:border-b-0">
      <td
        className={`px-4 py-2.5 text-left ${
          strong ? "font-semibold text-foreground" : ""
        } ${muted ? "text-muted-foreground" : ""}`}
      >
        {label}
      </td>
      <td
        className={`px-4 py-2.5 text-right tabular-nums ${
          strong ? "font-semibold text-foreground" : ""
        } ${muted ? "text-muted-foreground" : ""}`}
      >
        {EUR.format(display)}
      </td>
    </tr>
  );
}

function Alert({
  tone,
  children,
}: {
  tone: "destructive" | "warning";
  children: React.ReactNode;
}) {
  const cls =
    tone === "destructive"
      ? "border-destructive/40 bg-destructive/10 text-destructive"
      : "border-amber-400/50 bg-amber-50 text-amber-900";
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${cls}`}>
      {children}
    </div>
  );
}
