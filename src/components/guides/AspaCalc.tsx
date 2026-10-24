"use client";

import { useState } from "react";
import { ASPA_2026, calculerAspa, type SituationAspa } from "@/lib/calculators/aspa";
import { EuroIcon, UserIcon, BuildingIcon, BriefcaseIcon } from "@/components/icons";

const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const champ =
  "mt-2 w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-ring";

export default function AspaCalc() {
  const [situation, setSituation] = useState<SituationAspa>("seul");
  const [ressources, setRessources] = useState(720);
  const [activite, setActivite] = useState(0);
  const [patrimoine, setPatrimoine] = useState(0);
  const r = calculerAspa({ situation, ressourcesMensuelles: ressources, revenusActiviteMensuels: activite, patrimoine });

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-lg sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dans ta situation</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><UserIcon className="h-4 w-4 text-primary" /> Situation</span>
          <select value={situation} onChange={(e) => setSituation(e.target.value as SituationAspa)} className={champ}>
            <option value="seul">Personne seule</option>
            <option value="couple">Couple (mariage, Pacs ou concubinage)</option>
          </select>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><EuroIcon className="h-4 w-4 text-primary" /> Pensions et autres ressources par mois</span>
          <input type="number" min={0} step={10} value={ressources} onChange={(e) => setRessources(Math.max(0, Number(e.target.value)))} className={champ} />
          <span className="mt-1 block text-xs text-muted-foreground">retraites de base et complémentaires, réversion, invalidité, pension alimentaire{situation === "couple" ? ", pour les deux" : ""}</span>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><BriefcaseIcon className="h-4 w-4 text-primary" /> Revenus d&apos;activité par mois</span>
          <input type="number" min={0} step={10} value={activite} onChange={(e) => setActivite(Math.max(0, Number(e.target.value)))} className={champ} />
          <span className="mt-1 block text-xs text-muted-foreground">abattement de {EUR.format(situation === "couple" ? ASPA_2026.ABATTEMENT_ACTIVITE_COUPLE_12M : ASPA_2026.ABATTEMENT_ACTIVITE_SEUL_12M)} par an appliqué automatiquement</span>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><BuildingIcon className="h-4 w-4 text-primary" /> Patrimoine hors résidence principale</span>
          <input type="number" min={0} step={1000} value={patrimoine} onChange={(e) => setPatrimoine(Math.max(0, Number(e.target.value)))} className={champ} />
          <span className="mt-1 block text-xs text-muted-foreground">épargne, placements, bien locatif : comptés pour 3 % de leur valeur par an</span>
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
        <p className="text-xs uppercase tracking-wider opacity-80">ASPA estimée par mois</p>
        <p className="mt-1 text-4xl font-bold tabular-nums sm:text-5xl">{EUR2.format(r.allocationMensuelle)}</p>
        <p className="mt-2 text-sm opacity-90">
          {r.eligible
            ? `Plafond de ${EUR2.format(r.plafondMensuel)} moins ${EUR2.format(r.ressourcesRetenues)} de ressources retenues, soit ${EUR.format(r.allocationAnnuelle)} par an. Avec l'ASPA, tes ressources atteignent exactement le plafond.`
            : `Tes ressources retenues (${EUR2.format(r.ressourcesRetenues)}) dépassent le plafond de ${EUR2.format(r.plafondMensuel)} : pas de droit à l'ASPA sur ces bases.`}
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Valeurs au 1er janvier 2026. Calcul indicatif : la caisse examine les ressources des 3 derniers mois (ou 12 mois), exclut certaines prestations, et peut réviser l&apos;évaluation du patrimoine.
      </p>
    </div>
  );
}
