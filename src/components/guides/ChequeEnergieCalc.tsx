"use client";

import { useState } from "react";
import { CHEQUE_ENERGIE_2026, calculerChequeEnergie } from "@/lib/calculators/cheque-energie";
import { EuroIcon, UserIcon } from "@/components/icons";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const champ =
  "mt-2 w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-ring";

export default function ChequeEnergieCalc() {
  const [rfr, setRfr] = useState(12_000);
  const [personnes, setPersonnes] = useState(2);
  const r = calculerChequeEnergie(rfr, personnes);

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-lg sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dans ta situation</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><EuroIcon className="h-4 w-4 text-primary" /> Revenu fiscal de référence {CHEQUE_ENERGIE_2026.ANNEE_REVENUS}</span>
          <input type="number" min={0} step={100} value={rfr} onChange={(e) => setRfr(Math.max(0, Number(e.target.value)))} className={champ} />
          <span className="mt-1 block text-xs text-muted-foreground">sur l&apos;avis d&apos;imposition reçu en 2025</span>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><UserIcon className="h-4 w-4 text-primary" /> Personnes dans le foyer fiscal</span>
          <select value={personnes} onChange={(e) => setPersonnes(Number(e.target.value))} className={champ}>
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="mt-1 block text-xs text-muted-foreground">soit {r.uc.toLocaleString("fr-FR")} unité{r.uc > 1 ? "s" : ""} de consommation</span>
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
        <p className="text-xs uppercase tracking-wider opacity-80">Chèque énergie estimé</p>
        <p className="mt-1 text-4xl font-bold tabular-nums sm:text-5xl">{r.eligible ? EUR.format(r.montant) : "0 €"}</p>
        <p className="mt-2 text-sm opacity-90">
          Revenu fiscal par unité de consommation : {EUR.format(r.ratio)}.{" "}
          {r.eligible
            ? `C'est sous le plafond de ${EUR.format(CHEQUE_ENERGIE_2026.PLAFOND_RFR_UC)} : tu es éligible, et le chèque arrive automatiquement si le contrat d'électricité du logement est à ton nom.`
            : `C'est au-dessus du plafond de ${EUR.format(CHEQUE_ENERGIE_2026.PLAFOND_RFR_UC)} : pas de chèque sur ces revenus. Si tes revenus ont baissé depuis, c'est le revenu fiscal de l'année suivante qui comptera.`}
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Barème de la campagne 2026, identique depuis 2019. Le ratio est arrondi à l&apos;unité comme le fait l&apos;Agence de services et de paiement. Pour 2027, le barème n&apos;est pas encore publié.
      </p>
    </div>
  );
}
