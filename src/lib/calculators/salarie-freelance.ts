/**
 * Comparaison salariat (CDI) vs indépendant, à revenu net comparable.
 *
 * Ne contient aucune constante propre : le côté CDI est calculé par le
 * simulateur brut/net (cotisations détaillées 2026), le côté freelance par
 * le simulateur TJM (4 statuts, constantes TJM_2026). Les deux côtés
 * utilisent le même taux de prélèvement à la source pour rester comparables.
 */

import { calculerBrutVersNet } from "./salaire-brut-net";
import {
  calculerTous,
  findTJMForNetCible,
  STATUT_LABELS,
  type StatutFreelance,
  type Warning,
} from "./tjm-freelance";

export type StatutCDI = "cadre" | "non-cadre";

export interface SalarieFreelanceInputs {
  brutAnnuel: number;
  statutCDI: StatutCDI;
  tjm: number;
  joursParMois: number;
  fraisProMensuels: number;
  tauxPAS: number;
}

export const SALARIE_FREELANCE_DEFAULTS: SalarieFreelanceInputs = {
  brutAnnuel: 45_000,
  statutCDI: "cadre",
  tjm: 500,
  joursParMois: 18,
  fraisProMensuels: 150,
  tauxPAS: 0,
};

// Marge de sécurité conseillée sur le TJM d'équivalence : l'indépendant
// finance lui-même intermissions, congés, absence d'assurance chômage et
// prospection. Heuristique de conseil, pas une constante réglementaire.
export const MARGE_SECURITE_TJM = 0.25;

export interface LigneFreelance {
  statut: StatutFreelance;
  label: string;
  caHT: number;
  netApresImpot: number;
  netMensuel: number;
  ecart: number;
  ecartPct: number;
  tjmEquivalent: number;
  tjmAvecMarge: number;
  warnings: Warning[];
  /** false si un warning « danger » rend le statut inapplicable (ex. plafond micro dépassé). */
  eligible: boolean;
}

export interface SalarieFreelanceResult {
  cdi: {
    brutAnnuel: number;
    netAvantImpotAnnuel: number;
    netApresAnnuel: number;
    netMensuel: number;
    coutEmployeurAnnuel: number;
  };
  freelance: LigneFreelance[];
  meilleur: LigneFreelance;
  joursFacturesAnnuel: number;
}

export function comparerSalarieFreelance(
  inputs: SalarieFreelanceInputs,
): SalarieFreelanceResult {
  const brutAnnuel = Math.max(0, inputs.brutAnnuel);
  const cdiCalc = calculerBrutVersNet({
    salaire: brutAnnuel / 12,
    mode: "brut-vers-net",
    periodicite: "mensuel",
    statut: inputs.statutCDI,
    tauxPAS: inputs.tauxPAS,
  });
  const cdi = {
    brutAnnuel,
    netAvantImpotAnnuel: cdiCalc.netAvantImpotMensuel * 12,
    netApresAnnuel: cdiCalc.netApresMensuel * 12,
    netMensuel: cdiCalc.netApresMensuel,
    coutEmployeurAnnuel: cdiCalc.coutEmployeurMensuel * 12,
  };

  const params = {
    joursTravailles: Math.max(0, inputs.joursParMois),
    fraisProMensuels: Math.max(0, inputs.fraisProMensuels),
    tauxPAS: inputs.tauxPAS,
  };

  const freelance: LigneFreelance[] = calculerTous({
    ...params,
    tjm: Math.max(0, inputs.tjm),
  }).map((r) => {
    const tjmEquivalent = findTJMForNetCible(cdi.netApresAnnuel, r.statut, params);
    const ecart = r.netApresImpot - cdi.netApresAnnuel;
    return {
      statut: r.statut,
      label: STATUT_LABELS[r.statut],
      caHT: r.caHT,
      netApresImpot: r.netApresImpot,
      netMensuel: r.netMensuel,
      ecart,
      ecartPct: cdi.netApresAnnuel > 0 ? (ecart / cdi.netApresAnnuel) * 100 : 0,
      tjmEquivalent,
      tjmAvecMarge: tjmEquivalent * (1 + MARGE_SECURITE_TJM),
      warnings: r.warnings,
      eligible: !r.warnings.some((w) => w.severity === "danger"),
    };
  });

  // Un statut frappé d'un warning bloquant (plafond micro dépassé…) ne peut
  // pas être désigné « meilleur » : on choisit parmi les éligibles, et on ne
  // retombe sur l'ensemble que si aucun ne l'est.
  const candidats = freelance.filter((f) => f.eligible);
  const meilleur = (candidats.length ? candidats : freelance).reduce((a, b) =>
    b.netApresImpot > a.netApresImpot ? b : a,
  );

  return {
    cdi,
    freelance,
    meilleur,
    joursFacturesAnnuel: params.joursTravailles * 12,
  };
}
