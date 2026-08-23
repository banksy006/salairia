"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  comparerSalarieFreelance,
  MARGE_SECURITE_TJM,
} from "@/lib/calculators/salarie-freelance";
import { useSalarieFreelance } from "./SalarieFreelanceContext";
import {
  EuroIcon,
  BriefcaseIcon,
  CalendarIcon,
  ReceiptIcon,
  PercentIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "@/components/icons";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8">
      {children}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: React.ReactNode;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function num(v: string): number {
  const n = parseFloat(v.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export default function SalarieFreelanceSimulator() {
  const { inputs, debouncedInputs, update } = useSalarieFreelance();
  const r = useMemo(
    () => comparerSalarieFreelance(debouncedInputs),
    [debouncedInputs],
  );

  const rows = [...r.freelance].sort((a, b) => b.netApresImpot - a.netApresImpot);
  const allWarnings = r.freelance.flatMap((f) =>
    f.warnings.map((w) => ({ ...w, statut: f.label })),
  );
  const dangers = allWarnings.filter((w) => w.severity === "danger");
  const warns = allWarnings.filter((w) => w.severity === "warning");

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Ta situation actuelle (CDI)
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ce que tu gagnes aujourd&apos;hui, tel qu&apos;indiqué sur ton
              contrat.
            </p>
            <div className="mt-6 flex flex-col gap-5">
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <EuroIcon className="h-4 w-4 text-muted-foreground" />
                    Salaire brut annuel
                  </span>
                }
                htmlFor="brutAnnuel"
                hint="Fixe + variable garanti, 13e mois inclus s'il existe."
              >
                <input
                  id="brutAnnuel"
                  type="number"
                  min={0}
                  step={500}
                  value={inputs.brutAnnuel}
                  onChange={(e) => update("brutAnnuel", num(e.target.value))}
                  className={inputCls}
                />
              </Field>
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                    Statut
                  </span>
                }
                htmlFor="statutCDI"
              >
                <select
                  id="statutCDI"
                  value={inputs.statutCDI}
                  onChange={(e) =>
                    update("statutCDI", e.target.value as "cadre" | "non-cadre")
                  }
                  className={inputCls}
                >
                  <option value="cadre">Cadre</option>
                  <option value="non-cadre">Non-cadre</option>
                </select>
              </Field>
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <PercentIcon className="h-4 w-4 text-muted-foreground" />
                    Taux de prélèvement à la source
                  </span>
                }
                htmlFor="tauxPAS"
                hint="Appliqué des deux côtés pour une comparaison équitable. 0 = comparer les nets avant impôt."
              >
                <input
                  id="tauxPAS"
                  type="number"
                  min={0}
                  max={45}
                  step={0.5}
                  value={inputs.tauxPAS}
                  onChange={(e) => update("tauxPAS", num(e.target.value))}
                  className={inputCls}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Ton projet freelance
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ce que tu pourrais facturer. Les quatre statuts sont calculés
              en parallèle.
            </p>
            <div className="mt-6 flex flex-col gap-5">
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <EuroIcon className="h-4 w-4 text-muted-foreground" />
                    TJM envisagé (€ HT / jour)
                  </span>
                }
                htmlFor="tjm"
              >
                <input
                  id="tjm"
                  type="number"
                  min={0}
                  step={10}
                  value={inputs.tjm}
                  onChange={(e) => update("tjm", num(e.target.value))}
                  className={inputCls}
                />
              </Field>
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    Jours facturés par mois
                  </span>
                }
                htmlFor="joursParMois"
                hint="18 jours = mission à temps plein avec congés, intermissions et prospection déduits."
              >
                <input
                  id="joursParMois"
                  type="number"
                  min={0}
                  max={23}
                  step={1}
                  value={inputs.joursParMois}
                  onChange={(e) => update("joursParMois", num(e.target.value))}
                  className={inputCls}
                />
              </Field>
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
                    Frais professionnels mensuels
                  </span>
                }
                htmlFor="fraisProMensuels"
                hint="Matériel, logiciels, assurance RC pro, déplacements non refacturés."
              >
                <input
                  id="fraisProMensuels"
                  type="number"
                  min={0}
                  step={50}
                  value={inputs.fraisProMensuels}
                  onChange={(e) =>
                    update("fraisProMensuels", num(e.target.value))
                  }
                  className={inputCls}
                />
              </Field>
            </div>
          </Card>
        </div>
      </section>

      <section id="resultats" className="scroll-mt-24">
        <Card>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Le verdict, à taux d&apos;impôt identique
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-muted p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                CDI · {inputs.statutCDI === "cadre" ? "cadre" : "non-cadre"}
              </p>
              <p className="mt-2 text-4xl font-bold tabular-nums text-foreground">
                {EUR0.format(r.cdi.netApresAnnuel)}
              </p>
              <p className="text-sm text-muted-foreground">
                net par an · {EUR0.format(r.cdi.netMensuel)} / mois
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Coût total pour ton employeur : {EUR0.format(r.cdi.coutEmployeurAnnuel)}
              </p>
            </div>
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                Freelance · {r.meilleur.label}
              </p>
              <p className="mt-2 text-4xl font-bold tabular-nums">
                {EUR0.format(r.meilleur.netApresImpot)}
              </p>
              <p className="text-sm opacity-80">
                net par an · {EUR0.format(r.meilleur.netMensuel)} / mois
              </p>
              <p className="mt-3 text-xs opacity-80">
                Pour {EUR0.format(r.meilleur.caHT)} facturés sur {r.joursFacturesAnnuel} jours
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Net annuel</th>
                  <th className="px-4 py-3 text-right">Écart vs CDI</th>
                  <th className="px-4 py-3 text-right">
                    <span className="block">TJM pour égaler le CDI</span>
                    <span className="text-[10px] font-normal normal-case">puis avec {Math.round(MARGE_SECURITE_TJM * 100)} % de marge</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((f) => {
                  const best = f.statut === r.meilleur.statut;
                  const off = !f.eligible;
                  return (
                    <tr key={f.statut} className={`border-b border-border last:border-b-0 ${best ? "bg-accent/5" : off ? "opacity-50" : "hover:bg-muted/50"}`}>
                      <td className={`px-4 py-4 font-semibold text-foreground ${best ? "border-l-4 border-accent" : ""}`}>
                        {f.label}
                        {best && (
                          <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase text-accent-foreground">
                            Meilleur net
                          </span>
                        )}
                        {off && (
                          <span className="ml-2 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-destructive">
                            Inapplicable
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right text-lg font-bold tabular-nums text-foreground">
                        {EUR0.format(f.netApresImpot)}
                      </td>
                      <td className={`px-4 py-4 text-right tabular-nums ${f.ecart >= 0 ? "text-accent" : "text-destructive"}`}>
                        {f.ecart >= 0 ? "+" : "−"} {EUR0.format(Math.abs(f.ecart))}
                        <span className="block text-xs opacity-80">
                          {f.ecartPct >= 0 ? "+" : ""}{f.ecartPct.toFixed(0)} %
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right tabular-nums">
                        <span className="block font-semibold text-foreground">{EUR0.format(f.tjmEquivalent)} / j</span>
                        <span className="text-xs text-muted-foreground">{EUR0.format(f.tjmAvecMarge)} / j</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {dangers.map((w, i) => (
            <div key={`d${i}`} className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-destructive bg-destructive/10 p-4 text-sm text-destructive">
              <AlertTriangleIcon className="h-5 w-5 shrink-0" />
              <span><strong>{w.statut} :</strong> {w.message}</span>
            </div>
          ))}
          {warns.map((w, i) => (
            <div key={`w${i}`} className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
              <InfoIcon className="h-5 w-5 shrink-0" />
              <span><strong>{w.statut} :</strong> {w.message}</span>
            </div>
          ))}

          <p className="mt-6 text-xs italic text-muted-foreground">
            Calculs indicatifs. Côté CDI : cotisations salariales détaillées
            2026 du{" "}
            <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
              simulateur brut/net
            </Link>
            . Côté freelance : constantes 2026 du{" "}
            <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
              simulateur TJM
            </Link>{" "}
            (frais de gestion 8 % en portage, 1 500 €/an de comptabilité en
            société). Les avantages non monétaires ne sont pas chiffrés ici —
            ils sont détaillés plus bas.
          </p>
        </Card>
      </section>
    </div>
  );
}
