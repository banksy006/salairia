/**
 * Calculateur Portage Salarial — taux indicatifs 2026.
 *
 * Attention : les taux de charges ci-dessous sont des moyennes 2026 observées
 * sur les sites des principales sociétés de portage (OpenWork, ABC Portage,
 * Cadres en Mission, ITG, CEGELEM). Ce sont des estimations indicatives,
 * pas des taux URSSAF officiels exhaustifs. La valeur réelle dépend du contrat,
 * de la mutuelle, de la prévoyance, et de la société de portage choisie.
 */

import societesData from "@/data/societes-portage.json";

export const PORTAGE_2026 = {
  // Plafond de la Sécurité sociale 2026, valeur mensuelle (annuel : 48 060 €).
  // Source : arrêté du 22 décembre 2025 (JORF), urssaf.fr. Revalidé le 27 juillet 2026.
  PASS_MENSUEL: 4005,
  CHARGES_PATRONALES_TAUX: 0.43,
  CHARGES_SALARIALES_TAUX: 0.22,
  SALAIRE_MIN_JUNIOR_RATIO: 0.7,
  SALAIRE_MIN_SENIOR_RATIO: 0.75,
  SALAIRE_MIN_FORFAIT_JOURS_RATIO: 0.85,
} as const;

export type StatutPortage = "junior" | "senior" | "forfait_jours";

export interface PortageInputs {
  tjm: number;
  joursTravailles: number;
  tauxFraisGestion: number; // en pourcentage (ex: 8 = 8%)
  fraisProRefacturables: number;
  fraisProNonRefacturables: number;
  statut: StatutPortage;
  tauxPAS: number; // en pourcentage, 0 = ne pas appliquer
}

export interface PortageResult {
  caHT: number;
  fraisGestion: number;
  baseCotisations: number;
  chargesPatronales: number;
  salaireBrut: number;
  chargesSalariales: number;
  salaireNetAvantImpot: number;
  salaireNetApresImpot: number | null;
  fraisRefactures: number;
  totalPercu: number;
  salaireMinimumConventionnel: number;
  sousMinimum: boolean;
  tjmTropBas: boolean;
}

export function salaireMinimumMensuel(statut: StatutPortage): number {
  const ratio =
    statut === "junior"
      ? PORTAGE_2026.SALAIRE_MIN_JUNIOR_RATIO
      : statut === "senior"
        ? PORTAGE_2026.SALAIRE_MIN_SENIOR_RATIO
        : PORTAGE_2026.SALAIRE_MIN_FORFAIT_JOURS_RATIO;
  return PORTAGE_2026.PASS_MENSUEL * ratio;
}

export function calculerPortage(
  inputs: PortageInputs,
  opts?: { tauxFraisGestionOverride?: number },
): PortageResult {
  const tauxGestionPct =
    opts?.tauxFraisGestionOverride ?? inputs.tauxFraisGestion;

  const caHT = Math.max(0, inputs.tjm * inputs.joursTravailles);
  const fraisGestion = caHT * (tauxGestionPct / 100);

  const baseCotisations = Math.max(
    0,
    caHT - fraisGestion - inputs.fraisProNonRefacturables,
  );

  const chargesPatronales =
    baseCotisations * PORTAGE_2026.CHARGES_PATRONALES_TAUX;
  const salaireBrut = baseCotisations - chargesPatronales;

  const chargesSalariales =
    salaireBrut * PORTAGE_2026.CHARGES_SALARIALES_TAUX;
  const salaireNetAvantImpot = salaireBrut - chargesSalariales;

  const salaireNetApresImpot =
    inputs.tauxPAS > 0
      ? salaireNetAvantImpot * (1 - inputs.tauxPAS / 100)
      : null;

  const fraisRefactures = inputs.fraisProRefacturables;

  const netPourTotal = salaireNetApresImpot ?? salaireNetAvantImpot;
  const totalPercu = netPourTotal + fraisRefactures;

  const minConv = salaireMinimumMensuel(inputs.statut);

  return {
    caHT,
    fraisGestion,
    baseCotisations,
    chargesPatronales,
    salaireBrut,
    chargesSalariales,
    salaireNetAvantImpot,
    salaireNetApresImpot,
    fraisRefactures,
    totalPercu,
    salaireMinimumConventionnel: minConv,
    sousMinimum: salaireBrut < minConv,
    tjmTropBas: inputs.tjm < 250,
  };
}

export interface SocietePortage {
  nom: string;
  tauxFraisGestion: number;
  url?: string;
}

// Source unique : src/data/societes-portage.json, qui alimente aussi le
// comparateur. Les deux divergeaient (CEGELEM à 4 % ici et 5 % là-bas, entre
// autres) : le simulateur et le comparateur affichaient des taux différents
// pour la même société. Dériver du JSON supprime la duplication à la racine.
// Les sociétés sans taux proportionnel modélisable (abonnement fixe) sont
// écartées du comparatif du simulateur.
export const SOCIETES_PORTAGE: readonly SocietePortage[] = (
  societesData as { nom: string; site?: string; tauxEstimePct: number | null }[]
)
  .filter((s) => typeof s.tauxEstimePct === "number")
  .map((s) => ({
    nom: s.nom,
    tauxFraisGestion: s.tauxEstimePct as number,
    url: s.site,
  }))
  .sort((a, b) => a.tauxFraisGestion - b.tauxFraisGestion);

export interface ComparatifLigne {
  societe: SocietePortage;
  result: PortageResult;
  netFinal: number;
}

export function comparerSocietes(inputs: PortageInputs): ComparatifLigne[] {
  return SOCIETES_PORTAGE.map((societe) => {
    const result = calculerPortage(inputs, {
      tauxFraisGestionOverride: societe.tauxFraisGestion,
    });
    const netFinal = result.salaireNetApresImpot ?? result.salaireNetAvantImpot;
    return { societe, result, netFinal };
  });
}
