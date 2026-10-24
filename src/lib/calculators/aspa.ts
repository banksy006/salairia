// ASPA (minimum vieillesse) — valeurs au 1er janvier 2026.
// Source : circulaire Cnav 2025-29 du 22 décembre 2025 (art. D. 815-1 à D. 815-3 CSS)
//   https://legislation.lassuranceretraite.fr/Pdf/circulaire_cnav_2025_29_22122025.pdf
// Abattements sur revenus d'activité : service-public.gouv.fr F16871
//   https://www.service-public.gouv.fr/particuliers/vosdroits/F16871
// Vérifié le 24 octobre 2026.
export const ASPA_2026 = {
  SEUL_ANNUEL: 12_523.14,
  SEUL_MENSUEL: 1_043.59,
  COUPLE_ANNUEL: 19_442.21,
  COUPLE_MENSUEL: 1_620.18,
  REVALORISATION: 0.009,
  // Abattement sur les revenus professionnels, apprécié sur 12 mois
  ABATTEMENT_ACTIVITE_SEUL_12M: 6_562.91,
  ABATTEMENT_ACTIVITE_COUPLE_12M: 10_938.2,
  // Biens mobiliers et immobiliers (hors résidence principale) : 3 % de la valeur vénale par an
  TAUX_PATRIMOINE: 0.03,
  // Récupération sur succession (métropole), art. L. 815-13 et D. 815-3
  SEUIL_SUCCESSION: 108_585.14,
  SEUIL_SUCCESSION_OUTRE_MER: 150_000,
  RECUPERABLE_PAR_AN_SEUL: 8_463.42,
  RECUPERABLE_PAR_AN_COUPLE: 11_322.77,
} as const;

export type SituationAspa = "seul" | "couple";

export interface AspaInputs {
  situation: SituationAspa;
  // Pensions, revenus de remplacement et autres ressources prises en compte, par mois
  ressourcesMensuelles: number;
  // Revenus d'activité bruts par mois (abattement appliqué avant comparaison)
  revenusActiviteMensuels: number;
  // Patrimoine hors résidence principale (valeur vénale) : 3 % par an
  patrimoine: number;
}

export interface AspaResult {
  plafondMensuel: number;
  ressourcesRetenues: number;
  allocationMensuelle: number;
  allocationAnnuelle: number;
  eligible: boolean;
}

export function calculerAspa(i: AspaInputs): AspaResult {
  const couple = i.situation === "couple";
  const plafondMensuel = couple ? ASPA_2026.COUPLE_MENSUEL : ASPA_2026.SEUL_MENSUEL;
  const abattement12 = couple ? ASPA_2026.ABATTEMENT_ACTIVITE_COUPLE_12M : ASPA_2026.ABATTEMENT_ACTIVITE_SEUL_12M;
  const activiteRetenue = Math.max(0, i.revenusActiviteMensuels * 12 - abattement12) / 12;
  const patrimoineRetenu = (Math.max(0, i.patrimoine) * ASPA_2026.TAUX_PATRIMOINE) / 12;
  const ressourcesRetenues = Math.max(0, i.ressourcesMensuelles) + activiteRetenue + patrimoineRetenu;
  const allocationMensuelle = Math.max(0, plafondMensuel - ressourcesRetenues);
  return {
    plafondMensuel,
    ressourcesRetenues,
    allocationMensuelle,
    allocationAnnuelle: allocationMensuelle * 12,
    eligible: allocationMensuelle > 0,
  };
}

// Montant que la caisse peut reprendre sur la succession : plafonné par année
// de versement et limité à la part d'actif net au-dessus du seuil.
export function recuperationSuccession(
  situation: SituationAspa,
  actifNet: number,
  anneesVersement: number,
  outreMer = false,
): number {
  const seuil = outreMer ? ASPA_2026.SEUIL_SUCCESSION_OUTRE_MER : ASPA_2026.SEUIL_SUCCESSION;
  if (actifNet <= seuil) return 0;
  const plafondAnnuel = situation === "couple" ? ASPA_2026.RECUPERABLE_PAR_AN_COUPLE : ASPA_2026.RECUPERABLE_PAR_AN_SEUL;
  return Math.min(actifNet - seuil, plafondAnnuel * Math.max(0, anneesVersement));
}
