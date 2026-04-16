"use client";

import { useMemo } from "react";
import {
  calculerBrutVersNet,
  calculerNetVersBrut,
  type Mode,
  type Periodicite,
  type Statut,
} from "@/lib/calculators/salaire-brut-net";
import { useBrutNet } from "./BrutNetContext";
import { EuroIcon, PercentIcon, TagIcon, CalendarIcon } from "@/components/icons";

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const PCT = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 1,
});

const inputCls =
  "w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring";

export default function SalaireBrutNetSimulator() {
  const { inputs, debouncedInputs, update } = useBrutNet();

  const result = useMemo(
    () =>
      debouncedInputs.mode === "brut-vers-net"
        ? calculerBrutVersNet(debouncedInputs)
        : calculerNetVersBrut(debouncedInputs),
    [debouncedInputs],
  );

  return (
    <div className="flex flex-col gap-16">
      <section id="simulateur" className="scroll-mt-24">
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="inline-flex rounded-xl border border-border bg-white p-1 shadow-sm">
            <Pill
              active={inputs.mode === "brut-vers-net"}
              onClick={() => update("mode", "brut-vers-net" as Mode)}
            >
              Brut → Net
            </Pill>
            <Pill
              active={inputs.mode === "net-vers-brut"}
              onClick={() => update("mode", "net-vers-brut" as Mode)}
            >
              Net → Brut
            </Pill>
          </div>
          <div className="inline-flex rounded-xl border border-border bg-white p-1 shadow-sm">
            <Pill
              active={inputs.periodicite === "mensuel"}
              onClick={() => update("periodicite", "mensuel" as Periodicite)}
            >
              Mensuel
            </Pill>
            <Pill
              active={inputs.periodicite === "annuel"}
              onClick={() => update("periodicite", "annuel" as Periodicite)}
            >
              Annuel
            </Pill>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Tes paramètres
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {inputs.mode === "brut-vers-net"
                ? "Entre ton salaire brut, on calcule ton net."
                : "Entre ton salaire net souhaité, on calcule le brut nécessaire."}
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <Field
                label={
                  <span className="flex items-center gap-2">
                    <EuroIcon className="h-4 w-4 text-muted-foreground" />
                    {inputs.mode === "brut-vers-net"
                      ? `Salaire brut ${inputs.periodicite === "annuel" ? "annuel" : "mensuel"} (€)`
                      : `Salaire net souhaité ${inputs.periodicite === "annuel" ? "annuel" : "mensuel"} (€)`}
                  </span>
                }
                htmlFor="salaire"
              >
                <input
                  id="salaire"
                  type="number"
                  min={0}
                  step={100}
                  value={inputs.salaire}
                  onChange={(e) =>
                    update("salaire", Number(e.target.value) || 0)
                  }
                  className={inputCls}
                />
              </Field>

              <Field
                label={
                  <span className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                    Statut
                  </span>
                }
                htmlFor="statut"
              >
                <select
                  id="statut"
                  value={inputs.statut}
                  onChange={(e) =>
                    update("statut", e.target.value as Statut)
                  }
                  className={inputCls}
                >
                  <option value="non-cadre">Non-cadre</option>
                  <option value="cadre">Cadre</option>
                </select>
              </Field>

              <Field
                label={
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <PercentIcon className="h-4 w-4 text-muted-foreground" />
                      Taux prélèvement à la source
                    </span>
                    <span className="text-primary tabular-nums">
                      {inputs.tauxPAS}%
                    </span>
                  </span>
                }
                htmlFor="pas"
                help="Laisse 0 pour voir le net avant impôt. Ton taux est sur impots.gouv.fr."
              >
                <input
                  id="pas"
                  type="range"
                  min={0}
                  max={45}
                  step={0.5}
                  value={inputs.tauxPAS}
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
              Ton résultat
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Détail des cotisations salariales 2026.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-background">
                <Row
                  label="Salaire brut mensuel"
                  value={EUR.format(result.brutMensuel)}
                  strong
                />

                <GroupHeader label="Sécurité sociale" />
                <Row
                  label={<TwoLine main="Vieillesse plafonnée" sub="6,90 % plafonné PASS" />}
                  value={EUR.format(-result.cotisations.vieillessePlafonnee)}
                  muted
                />
                <Row
                  label={<TwoLine main="Vieillesse déplafonnée" sub="0,40 % totalité" />}
                  value={EUR.format(-result.cotisations.vieillesseDeplafonee)}
                  muted
                />
                <Row
                  label="Sous-total sécu"
                  value={EUR.format(-result.totalSecu)}
                  sub
                />

                <GroupHeader label="Retraite complémentaire" />
                <Row
                  label={<TwoLine main="AGIRC-ARRCO T1" sub="3,15 % tranche 1" />}
                  value={EUR.format(-result.cotisations.arrcoT1)}
                  muted
                />
                {result.cotisations.arrcoT2 > 0 && (
                  <Row
                    label={<TwoLine main="AGIRC-ARRCO T2" sub="8,64 % tranche 2" />}
                    value={EUR.format(-result.cotisations.arrcoT2)}
                    muted
                  />
                )}
                <Row
                  label={<TwoLine main="CEG" sub={result.cotisations.cegT2 > 0 ? "T1 + T2" : "T1 uniquement"} />}
                  value={EUR.format(-(result.cotisations.cegT1 + result.cotisations.cegT2))}
                  muted
                />
                {result.cotisations.cet > 0 && (
                  <Row label="CET" value={EUR.format(-result.cotisations.cet)} muted />
                )}
                {result.cotisations.apec > 0 && (
                  <Row label="APEC (cadre)" value={EUR.format(-result.cotisations.apec)} muted />
                )}
                <Row
                  label="Sous-total retraite"
                  value={EUR.format(-result.totalRetraite)}
                  sub
                />

                <GroupHeader label="CSG / CRDS" />
                <Row
                  label={<TwoLine main="CSG déductible" sub="6,80 % sur 98,25 % du brut" />}
                  value={EUR.format(-result.cotisations.csgDeductible)}
                  muted
                />
                <Row
                  label={<TwoLine main="CSG non déductible + CRDS" sub="2,90 % sur 98,25 % du brut" />}
                  value={EUR.format(-(result.cotisations.csgNonDeductible + result.cotisations.crds))}
                  muted
                />
                <Row
                  label="Sous-total CSG/CRDS"
                  value={EUR.format(-result.totalCsgCrds)}
                  sub
                />

                <Row
                  label={
                    <TwoLine
                      main="Total cotisations salariales"
                      sub={`Taux effectif : ${PCT.format(result.tauxEffectif)}`}
                    />
                  }
                  value={EUR.format(-result.totalCotisationsSalariales)}
                  highlight
                />

                <Row
                  label="Net avant impôt"
                  value={EUR.format(result.netAvantImpotMensuel)}
                  strong
                />

                {inputs.tauxPAS > 0 && (
                  <Row
                    label={<TwoLine main="Prélèvement à la source" sub={`${inputs.tauxPAS} %`} />}
                    value={EUR.format(-result.montantPAS)}
                    muted
                  />
                )}
              </ul>

              <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Net après impôt / mois
                </p>
                <p className="mt-2 text-5xl font-bold tabular-nums">
                  {EUR.format(result.netApresMensuel)}
                </p>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  soit {EUR.format(result.netApresAnnuel)} / an
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 inline h-3.5 w-3.5" />
                Coût total employeur : ~{EUR.format(result.coutEmployeurMensuel)}{" "}
                / mois ({EUR.format(result.coutEmployeurAnnuel)} / an).
              </p>

              <p className="text-xs text-muted-foreground">
                Estimation indicative. Le montant exact dépend de votre
                convention collective, de votre mutuelle et de votre situation
                fiscale.
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

function GroupHeader({ label }: { label: string }) {
  return (
    <li className="bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </li>
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
  sub,
}: {
  label: React.ReactNode;
  value: string;
  strong?: boolean;
  muted?: boolean;
  highlight?: boolean;
  sub?: boolean;
}) {
  const rowCls = highlight ? "bg-muted/60" : "";
  const labelCls = strong
    ? "font-semibold text-foreground"
    : highlight
      ? "font-medium text-foreground"
      : sub
        ? "font-medium text-foreground/80 text-sm"
        : muted
          ? "text-muted-foreground"
          : "text-foreground";
  const valueCls = strong || highlight
    ? "font-semibold text-foreground"
    : sub
      ? "font-medium text-foreground/80 text-sm"
      : muted
        ? "text-muted-foreground"
        : "text-foreground";
  return (
    <li className={`flex items-center justify-between gap-4 px-4 py-3 text-base ${rowCls}`}>
      <span className={labelCls}>{label}</span>
      <span className={`whitespace-nowrap tabular-nums ${valueCls}`}>{value}</span>
    </li>
  );
}
