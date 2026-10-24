"use client";

import { useState } from "react";
import { AF_2026, calculerAF } from "@/lib/calculators/allocations-familiales";
import { CalculatorIcon, EuroIcon, UserIcon } from "@/components/icons";

const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export default function AllocationsFamilialesCalc() {
  const [enfants, setEnfants] = useState(2);
  const [revenus, setRevenus] = useState(45_000);
  const [majores, setMajores] = useState(0);
  const r = calculerAF(enfants, revenus, majores);
  const libelle = r.tranche === "plein" ? "taux plein" : r.tranche === "moitie" ? "montant divisé par 2" : "montant divisé par 4";

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-lg sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dans ta situation</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <UserIcon className="h-4 w-4 text-primary" /> Enfants à charge
          </span>
          <select
            value={enfants}
            onChange={(e) => setEnfants(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-ring"
          >
            {[2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>{n} enfants</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <EuroIcon className="h-4 w-4 text-primary" /> Revenus {AF_2026.ANNEE_REVENUS} du foyer
          </span>
          <input
            type="number"
            min={0}
            step={1000}
            value={revenus}
            onChange={(e) => setRevenus(Math.max(0, Number(e.target.value)))}
            className="mt-2 w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-ring"
          />
          <span className="mt-1 block text-xs text-muted-foreground">revenu net catégoriel annuel, avant abattements</span>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CalculatorIcon className="h-4 w-4 text-primary" /> Enfants de 14 ans et plus
          </span>
          <select
            value={majores}
            onChange={(e) => setMajores(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-ring"
          >
            {Array.from({ length: enfants + 1 }, (_, i) => i).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-muted-foreground">18 ans pour les enfants nés depuis le 1er mars 2012</span>
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
        <p className="text-xs uppercase tracking-wider opacity-80">Allocations familiales par mois · {libelle}</p>
        <p className="mt-1 text-4xl font-bold tabular-nums sm:text-5xl">{EUR2.format(r.total)}</p>
        <p className="mt-2 text-sm opacity-90">
          soit {EUR.format(r.total * 12)} par an.{" "}
          {r.majorations > 0 && `Dont ${EUR2.format(r.majorations)} de majoration pour âge. `}
          {r.complementDegressif > 0 && `Dont ${EUR2.format(r.complementDegressif)} de complément dégressif, parce que tes revenus dépassent de peu le plafond. `}
          Plafonds pour {enfants} enfants : {EUR.format(r.plafonds[0])} (taux plein) et {EUR.format(r.plafonds[1])} (moitié).
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Barème CAF au 1er avril 2026, revenus {AF_2026.ANNEE_REVENUS}. Calcul indicatif : la CAF applique le revenu net catégoriel exact de ton avis d&apos;imposition et peut tenir compte d&apos;un changement de situation récent.
      </p>
    </div>
  );
}
