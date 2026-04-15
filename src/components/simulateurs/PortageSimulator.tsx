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

const EUR0 = new Intl.NumberFormat("fr-FR", {
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
  const comparatifRaw = useMemo(
    () => comparerSocietes(debounced),
    [debounced],
  );

  const meilleurNet = Math.max(...comparatifRaw.map((c) => c.netFinal));
  const comparatif = [...comparatifRaw].sort((a, b) => {
    if (a.netFinal === meilleurNet && b.netFinal !== meilleurNet) return -1;
    if (b.netFinal === meilleurNet && a.netFinal !== meilleurNet) return 1;
    return a.societe.tauxFraisGestion - b.societe.tauxFraisGestion;
  });

  function update<K extends keyof PortageInputs>(
    key: K,
    value: PortageInputs[K],
  ) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

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
                label={
                  <span className="flex items-center justify-between gap-2">
                    <span>Frais de gestion société</span>
                    <span className="text-primary tabular-nums">
                      {inputs.tauxFraisGestion}%
                    </span>
                  </span>
                }
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
                    update(
                      "fraisProRefacturables",
                      Number(e.target.value) || 0,
                    )
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
                    update(
                      "fraisProNonRefacturables",
                      Number(e.target.value) || 0,
                    )
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
                  onChange={(e) =>
                    update("tauxPAS", Number(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Ton résultat mensuel
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Estimation basée sur les taux moyens 2026.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {result.tjmTropBas && (
                <Alert tone="destructive">
                  TJM trop bas pour le portage salarial. Considère le statut
                  auto-entrepreneur, plus adapté en dessous de 250 €/jour.
                </Alert>
              )}
              {!result.tjmTropBas && result.sousMinimum && (
                <Alert tone="warning">
                  Attention : avec ces paramètres, ton salaire brut
                  n&apos;atteint pas le minimum conventionnel de ton statut (
                  {EUR0.format(result.salaireMinimumConventionnel)}/mois). La
                  société de portage pourra refuser la mission.
                </Alert>
              )}

              <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-background">
                <DetailRow
                  label="Chiffre d'affaires HT"
                  value={EUR0.format(result.caHT)}
                />
                <DetailRow
                  label="− Frais de gestion"
                  value={EUR0.format(-result.fraisGestion)}
                  muted
                />
                {inputs.fraisProNonRefacturables > 0 && (
                  <DetailRow
                    label="− Frais pro non refacturables"
                    value={EUR0.format(-inputs.fraisProNonRefacturables)}
                    muted
                  />
                )}
                <DetailRow
                  label="− Charges patronales (43 %)"
                  value={EUR0.format(-result.chargesPatronales)}
                  muted
                />
                <DetailRow
                  label="Salaire brut"
                  value={EUR0.format(result.salaireBrut)}
                  highlight
                />
                <DetailRow
                  label="− Charges salariales (22 %)"
                  value={EUR0.format(-result.chargesSalariales)}
                  muted
                />
                <DetailRow
                  label="Salaire net avant impôt"
                  value={EUR0.format(result.salaireNetAvantImpot)}
                  strong
                />
                {result.salaireNetApresImpot !== null && (
                  <>
                    <DetailRow
                      label={`− Impôt à la source (${inputs.tauxPAS}%)`}
                      value={EUR0.format(
                        -(
                          result.salaireNetAvantImpot -
                          result.salaireNetApresImpot
                        ),
                      )}
                      muted
                    />
                    <DetailRow
                      label="Salaire net après impôt"
                      value={EUR0.format(result.salaireNetApresImpot)}
                      strong
                    />
                  </>
                )}
                {inputs.fraisProRefacturables > 0 && (
                  <DetailRow
                    label="+ Remboursement frais refacturables"
                    value={EUR0.format(result.fraisRefactures)}
                  />
                )}
              </ul>

              <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Total perçu / mois
                </p>
                <p className="mt-2 text-5xl font-bold tabular-nums">
                  {EUR0.format(result.totalPercu)}
                </p>
                {result.salaireNetApresImpot !== null && (
                  <p className="mt-2 text-sm text-primary-foreground/70">
                    Net après impôt · prélèvement à la source {inputs.tauxPAS}{" "}
                    %
                  </p>
                )}
                {inputs.fraisProRefacturables > 0 && (
                  <p className="mt-1 text-sm text-primary-foreground/70">
                    Inclut {EUR0.format(inputs.fraisProRefacturables)} de frais
                    pro remboursés.
                  </p>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Calcul indicatif. Les taux réels varient selon la société de
                portage, la mutuelle et la prévoyance choisies.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section id="comparatif" className="scroll-mt-24">
        <Card>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Comparatif de 5 sociétés de portage
          </h3>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            Salaire net estimé avec tes paramètres actuels, pour chaque société
            selon ses frais de gestion. L&apos;offre qui maximise ton net est
            mise en avant.
          </p>

          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {comparatif.map(({ societe, result: r, netFinal }) => {
              const best = netFinal === meilleurNet;
              return (
                <li key={societe.nom}>
                  <div
                    className={`group relative flex h-full flex-col gap-4 rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                      best
                        ? "border-2 border-accent bg-accent/5"
                        : "border-border bg-white"
                    }`}
                  >
                    {best && (
                      <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-sm">
                        Meilleur net
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        aria-hidden
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-lg font-bold text-accent"
                      >
                        {societe.nom.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-foreground">
                          {societe.nom}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Frais de gestion · {societe.tauxFraisGestion} %
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Net mensuel estimé
                      </p>
                      <p className="mt-1 text-3xl font-bold tabular-nums text-foreground">
                        {EUR0.format(netFinal)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Brut : {EUR0.format(r.salaireBrut)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-xs text-muted-foreground">
            Taux de frais de gestion relevés en avril 2026 sur les sites
            publics de chaque société. Certaines proposent des paliers
            dégressifs selon le chiffre d&apos;affaires — vérifie toujours
            l&apos;offre commerciale avant de t&apos;engager.
          </p>
        </Card>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

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

function DetailRow({
  label,
  value,
  strong,
  muted,
  highlight,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
  highlight?: boolean;
}) {
  const rowCls = highlight
    ? "bg-muted/60"
    : "";
  const textCls = strong
    ? "font-semibold text-foreground"
    : muted
      ? "text-muted-foreground"
      : "text-foreground";
  const valueCls = highlight ? "font-semibold text-foreground" : textCls;
  const labelCls = highlight ? "font-medium text-foreground" : textCls;
  return (
    <li
      className={`flex items-center justify-between gap-4 px-4 py-3 text-base ${rowCls}`}
    >
      <span className={`${labelCls}`}>{label}</span>
      <span className={`tabular-nums ${valueCls}`}>{value}</span>
    </li>
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
      ? "border-destructive bg-destructive/10 text-destructive"
      : "border-amber-500 bg-amber-50 text-amber-900";
  const icon = tone === "destructive" ? "⛔" : "⚠️";
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
