"use client";

import { useMemo } from "react";
import {
  calculerNegociation,
  getMetiersList,
  EXPERIENCE_OPTIONS,
  REGION_OPTIONS,
} from "@/lib/calculators/negociation";
import { useNegociation } from "./NegociationContext";
import {
  TagIcon,
  BriefcaseIcon,
  BuildingIcon,
  EuroIcon,
  InfoIcon,
} from "@/components/icons";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function formatK(val: number): string {
  return `${Math.round(val / 1000).toLocaleString("fr-FR")} k€`;
}

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

const metiers = getMetiersList();
const categoriesMap = new Map<string, typeof metiers>();
for (const m of metiers) {
  const arr = categoriesMap.get(m.categorie) ?? [];
  arr.push(m);
  categoriesMap.set(m.categorie, arr);
}
const groupedMetiers = Array.from(categoriesMap.entries());

export default function NegociationSimulator() {
  const { state, debouncedState, update } = useNegociation();

  const result = useMemo(
    () => calculerNegociation(debouncedState),
    [debouncedState],
  );

  const { fourchette, salaireActuel, position, margeNego, mediane } = result;
  const [low, high] = fourchette;
  const range = high - low || 1;

  const barMin = Math.min(low, salaireActuel) - range * 0.1;
  const barMax = Math.max(high, salaireActuel) + range * 0.1;
  const barRange = barMax - barMin || 1;

  const lowPct = ((low - barMin) / barRange) * 100;
  const highPct = ((high - barMin) / barRange) * 100;
  const salPct = Math.min(
    100,
    Math.max(0, ((salaireActuel - barMin) / barRange) * 100),
  );

  const barColor =
    position === "sous"
      ? "bg-destructive/20"
      : position === "dans"
        ? "bg-accent/20"
        : "bg-primary/20";

  const markerColor =
    position === "sous"
      ? "bg-destructive"
      : position === "dans"
        ? "bg-accent"
        : "bg-primary";

  const positionLabel =
    position === "sous"
      ? "Ton salaire est sous la fourchette"
      : position === "dans"
        ? "Ton salaire est dans la fourchette"
        : "Ton salaire est au-dessus de la fourchette";

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Tes paramètres
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Sélectionne ton métier, ton expérience et ta région pour
              découvrir ta fourchette de marché.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                    Métier
                  </span>
                }
                htmlFor="metierId"
              >
                <select
                  id="metierId"
                  value={state.metierId}
                  onChange={(e) => update("metierId", e.target.value)}
                  className={inputCls}
                >
                  {groupedMetiers.map(([cat, items]) => (
                    <optgroup key={cat} label={cat}>
                      {items.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </Field>

              <Field
                label={
                  <span className="flex items-center gap-2">
                    <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                    Expérience
                  </span>
                }
                htmlFor="experience"
              >
                <select
                  id="experience"
                  value={state.experience}
                  onChange={(e) =>
                    update(
                      "experience",
                      e.target.value as typeof state.experience,
                    )
                  }
                  className={inputCls}
                >
                  {EXPERIENCE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label={
                  <span className="flex items-center gap-2">
                    <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                    Région
                  </span>
                }
                htmlFor="region"
              >
                <select
                  id="region"
                  value={state.region}
                  onChange={(e) =>
                    update("region", e.target.value as typeof state.region)
                  }
                  className={inputCls}
                >
                  {REGION_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label={
                  <span className="flex items-center gap-2">
                    <EuroIcon className="h-4 w-4 text-muted-foreground" />
                    Salaire brut annuel actuel (€)
                  </span>
                }
                htmlFor="salaireActuel"
              >
                <input
                  id="salaireActuel"
                  type="number"
                  min={0}
                  step={1000}
                  value={state.salaireActuel}
                  onChange={(e) =>
                    update("salaireActuel", Number(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>
            </div>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Ta position sur le marché
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.metierLabel} — {state.region === "idf" ? "Île-de-France" : "Province"}
              </p>

              <div className="mt-6">
                <div className="relative h-10 w-full rounded-full bg-muted">
                  <div
                    className={`absolute top-0 h-full rounded-full ${barColor}`}
                    style={{
                      left: `${lowPct}%`,
                      width: `${highPct - lowPct}%`,
                    }}
                  />

                  <div
                    className={`absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md ${markerColor}`}
                    style={{ left: `${salPct}%` }}
                  />

                  <span
                    className="absolute -top-6 -translate-x-1/2 text-xs font-medium text-muted-foreground"
                    style={{ left: `${lowPct}%` }}
                  >
                    {formatK(low)}
                  </span>
                  <span
                    className="absolute -top-6 -translate-x-1/2 text-xs font-medium text-muted-foreground"
                    style={{ left: `${highPct}%` }}
                  >
                    {formatK(high)}
                  </span>
                </div>
              </div>

              <p className="mt-8 text-center text-2xl font-bold tabular-nums text-foreground">
                {EUR0.format(low)} – {EUR0.format(high)}{" "}
                <span className="text-base font-medium text-muted-foreground">
                  brut/an
                </span>
              </p>

              <p
                className={`mt-3 text-center text-lg font-semibold ${
                  position === "sous"
                    ? "text-destructive"
                    : position === "dans"
                      ? "text-accent"
                      : "text-primary"
                }`}
              >
                {positionLabel}
              </p>

              {position === "sous" && (
                <p className="mt-2 text-center text-base font-semibold text-accent">
                  Tu as une marge de négociation de +{formatK(margeNego)}
                </p>
              )}
              {position === "dans" && (
                <p className="mt-2 text-center text-base text-muted-foreground">
                  Tu es bien positionné
                </p>
              )}
              {position === "au-dessus" && (
                <p className="mt-2 text-center text-base text-muted-foreground">
                  Tu es au-dessus du marché pour ce profil
                </p>
              )}
            </Card>

            <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                Médiane du marché
              </p>
              <p className="mt-2 text-5xl font-bold tabular-nums">
                {EUR0.format(mediane)}
              </p>
              <p className="mt-3 text-sm text-primary-foreground/80">
                {result.metierLabel}
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <span aria-hidden className="shrink-0 text-primary">
                <InfoIcon className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ces données sont des moyennes de marché (APEC, INSEE,
                Glassdoor). Votre salaire réel dépend de votre entreprise et de
                vos compétences spécifiques.
              </p>
            </div>
          </div>
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
