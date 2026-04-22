"use client";

import { useMemo } from "react";
import {
  calculerPercentile,
  CSP_OPTIONS,
  AGE_OPTIONS,
  type CSP,
  type TrancheAge,
} from "@/lib/calculators/percentile-salaire";
import { usePercentile } from "./PercentileContext";
import { EuroIcon, TagIcon, CalendarIcon } from "@/components/icons";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

const PERCENTILE_LABELS: readonly { key: string; label: string }[] = [
  { key: "P10", label: "P10" },
  { key: "P25", label: "P25" },
  { key: "P50", label: "P50 (m\u00e9diane)" },
  { key: "P75", label: "P75" },
  { key: "P90", label: "P90" },
];

export default function PercentileSimulator() {
  const { state, debouncedState, update } = usePercentile();

  const result = useMemo(
    () => calculerPercentile(debouncedState),
    [debouncedState],
  );

  const top = 100 - result.percentile;

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Tes param&egrave;tres
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Indique ton salaire net mensuel et affine par cat&eacute;gorie ou
              tranche d&apos;&acirc;ge.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <EuroIcon className="h-4 w-4 text-muted-foreground" />
                    Salaire net mensuel (&euro;)
                  </span>
                }
                htmlFor="salaireMensuelNet"
              >
                <input
                  id="salaireMensuelNet"
                  type="number"
                  min={0}
                  step={100}
                  value={state.salaireMensuelNet}
                  onChange={(e) =>
                    update("salaireMensuelNet", Number(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>

              <Field
                label={
                  <span className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                    Cat&eacute;gorie socioprofessionnelle
                  </span>
                }
                htmlFor="csp"
              >
                <select
                  id="csp"
                  value={state.csp}
                  onChange={(e) => update("csp", e.target.value as CSP)}
                  className={inputCls}
                >
                  {CSP_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c === "Tous" ? "Toutes cat\u00e9gories" : c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label={
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    Tranche d&apos;&acirc;ge
                  </span>
                }
                htmlFor="age"
              >
                <select
                  id="age"
                  value={state.age}
                  onChange={(e) => update("age", e.target.value as TrancheAge)}
                  className={inputCls}
                >
                  {AGE_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a === "Tous" ? "Tous \u00e2ges" : a}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Ta position
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              O&ugrave; te situes-tu dans la distribution des salaires en France
              ?
            </p>

            <div className="mt-6 rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                Tu es dans le
              </p>
              <p className="mt-2 text-5xl font-bold tabular-nums">
                TOP {top} %
              </p>
              <p className="mt-3 text-sm text-primary-foreground/80">
                {result.label}
              </p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-foreground">
                Tu te situes au{" "}
                <span className="text-primary">
                  {result.percentile}<sup>e</sup> percentile
                </span>
              </p>

              <div className="relative">
                <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-4 rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${result.percentile}%` }}
                  />
                </div>

                <div
                  className="absolute top-0 h-4 w-0.5 bg-foreground"
                  style={{ left: `${result.percentile}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-background">
                    {result.percentile}%
                  </div>
                </div>

                <div className="relative mt-1 flex h-4 w-full text-[10px] text-muted-foreground">
                  <span className="absolute" style={{ left: "10%" }}>
                    P10
                  </span>
                  <span className="absolute" style={{ left: "25%" }}>
                    P25
                  </span>
                  <span className="absolute" style={{ left: "50%" }}>
                    P50
                  </span>
                  <span className="absolute" style={{ left: "75%" }}>
                    P75
                  </span>
                  <span className="absolute" style={{ left: "90%" }}>
                    P90
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground">
                La m&eacute;diane est de{" "}
                <strong className="text-foreground">
                  {EUR0.format(result.mediane)}
                </strong>{" "}
                &mdash; tu es{" "}
                <strong
                  className={
                    result.ecartMediane >= 0 ? "text-accent" : "text-destructive"
                  }
                >
                  {EUR0.format(Math.abs(result.ecartMediane))}{" "}
                  {result.ecartMediane >= 0 ? "au-dessus" : "en dessous"}
                </strong>
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Percentile</th>
                    <th className="px-4 py-3 text-right">Salaire net</th>
                  </tr>
                </thead>
                <tbody>
                  {PERCENTILE_LABELS.map(({ key, label }) => {
                    const value =
                      result.distribution[
                        key as keyof typeof result.distribution
                      ];
                    if (value === undefined) return null;
                    const pNum = parseInt(key.slice(1), 10);
                    const isUser =
                      result.percentile >= pNum - 7 &&
                      result.percentile <= pNum + 7;
                    return (
                      <tr
                        key={key}
                        className={`border-b border-border last:border-b-0 ${
                          isUser ? "bg-primary/5" : ""
                        }`}
                      >
                        <td
                          className={`px-4 py-3 font-semibold ${
                            isUser
                              ? "border-l-4 border-primary text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {label}
                          {isUser && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                              Toi
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-foreground/80">
                          {EUR0.format(value)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Donn&eacute;es INSEE DADS 2023, salaires nets mensuels temps
              plein. Calcul indicatif.
            </p>
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
