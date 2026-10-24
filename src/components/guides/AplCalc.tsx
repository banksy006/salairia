"use client";

import { useState } from "react";
import { APL_2026, depenseLogement, type ZoneApl } from "@/lib/calculators/apl";
import { EuroIcon, UserIcon, BuildingIcon, CompassIcon } from "@/components/icons";

const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const champ =
  "mt-2 w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-ring";

export default function AplCalc() {
  const [zone, setZone] = useState<ZoneApl>(2);
  const [foyer, setFoyer] = useState<"seul" | "couple">("seul");
  const [charges, setCharges] = useState(0);
  const [loyer, setLoyer] = useState(550);
  const [colocation, setColocation] = useState(false);
  const r = depenseLogement(loyer, zone, foyer === "couple", charges, colocation);

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-lg sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dans ta situation</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><CompassIcon className="h-4 w-4 text-primary" /> Zone du logement</span>
          <select value={zone} onChange={(e) => setZone(Number(e.target.value) as ZoneApl)} className={champ}>
            <option value={1}>Zone 1 — Paris et petite couronne</option>
            <option value={2}>Zone 2 — grandes agglomérations, Corse</option>
            <option value={3}>Zone 3 — reste du territoire</option>
          </select>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><UserIcon className="h-4 w-4 text-primary" /> Foyer</span>
          <select value={foyer} onChange={(e) => setFoyer(e.target.value as "seul" | "couple")} className={champ}>
            <option value="seul">Personne seule</option>
            <option value="couple">Couple</option>
          </select>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><BuildingIcon className="h-4 w-4 text-primary" /> Personnes à charge</span>
          <select value={charges} onChange={(e) => setCharges(Number(e.target.value))} className={champ}>
            {[0, 1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground"><EuroIcon className="h-4 w-4 text-primary" /> Loyer mensuel hors charges</span>
          <input type="number" min={0} step={10} value={loyer} onChange={(e) => setLoyer(Math.max(0, Number(e.target.value)))} className={champ} />
        </label>
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm text-foreground">
        <input type="checkbox" checked={colocation} onChange={(e) => setColocation(e.target.checked)} className="h-4 w-4 rounded border-border accent-primary" />
        Colocation (plafond réduit à 75 %, forfait de charges divisé par deux)
      </label>

      <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
        <p className="text-xs uppercase tracking-wider opacity-80">Loyer plafond pour ce foyer</p>
        <p className="mt-1 text-4xl font-bold tabular-nums sm:text-5xl">{EUR2.format(r.loyerPlafond)}</p>
        <p className="mt-2 text-sm opacity-90">
          {r.loyerAuDessusDuPlafond
            ? `Ton loyer de ${EUR2.format(loyer)} dépasse le plafond : l'APL est calculée sur ${EUR2.format(r.loyerRetenu)}, la part au-dessus reste entièrement à ta charge. `
            : `Ton loyer de ${EUR2.format(loyer)} est sous le plafond : il est retenu en totalité. `}
          Dépense de logement retenue : {EUR2.format(r.loyerRetenu)} + {EUR2.format(r.forfaitCharges)} de forfait de charges = {EUR2.format(r.depenseRetenue)}.
          Participation minimale à ta charge : {EUR2.format(r.participationMinimale)}.
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Paramètres de l&apos;arrêté du 28 septembre 2026, en vigueur depuis le 1er octobre 2026. Le montant final de l&apos;APL dépend ensuite de tes ressources des 12 derniers mois : le{" "}
        <a href="https://www.caf.fr/allocataires/mes-services-en-ligne/estimer-mes-droits" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">simulateur de la CAF</a>{" "}
        le calcule à partir de ces mêmes paramètres, moins {EUR2.format(APL_2026.RETENUE)} de retenue mensuelle.
      </p>
    </div>
  );
}
