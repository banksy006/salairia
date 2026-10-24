// Aides personnelles au logement — paramètres au 1er octobre 2026.
// Source : arrêté du 28 septembre 2026 (NOR VLOL2620735A, JORF n° 0228 du
// 30 septembre 2026, JORFTEXT000054913928), lu dans l'open data DILA le
// 24 octobre 2026 : plafonds de loyer (art. 7 de l'arrêté du 27 septembre 2019
// modifié), colocation (art. 16), forfait de charges (art. 9), participation
// minimale (art. 13). Revalorisation : IRL du 2e trimestre 2026, +1,15 %
// (INSEE, 10 juillet 2026, https://www.insee.fr/fr/statistiques/9022797).
export const APL_2026 = {
  REVALORISATION: 0.0115,
  IRL_T2_2026: 148.37,
  // Plafonds de loyer mensuels par zone, en euros
  PLAFONDS: {
    1: { seul: 336.97, couple: 406.4, uneCharge: 459.32, parChargeSup: 66.65 },
    2: { seul: 293.68, couple: 359.47, uneCharge: 404.49, parChargeSup: 58.88 },
    3: { seul: 275.25, couple: 333.67, uneCharge: 374.13, parChargeSup: 53.62 },
  } as Record<1 | 2 | 3, { seul: number; couple: number; uneCharge: number; parChargeSup: number }>,
  COLOCATION: {
    1: { seul: 252.73, couple: 304.8, uneCharge: 344.49, parChargeSup: 49.99 },
    2: { seul: 220.26, couple: 269.6, uneCharge: 303.37, parChargeSup: 44.16 },
    3: { seul: 206.44, couple: 250.25, uneCharge: 280.6, parChargeSup: 40.22 },
  } as Record<1 | 2 | 3, { seul: number; couple: number; uneCharge: number; parChargeSup: number }>,
  FORFAIT_CHARGES: 61.29,
  FORFAIT_CHARGES_PAR_CHARGE: 13.9,
  FORFAIT_CHARGES_COLOCATION: 30.64,
  PARTICIPATION_MINIMALE: 40.01,
  PARTICIPATION_MINIMALE_TAUX: 0.085,
  // Retenue forfaitaire de 5 € par mois sur chaque aide (depuis octobre 2017)
  RETENUE: 5,
  // Paramètres de ressources R0, inchangés depuis le 1er janvier 2025
  // (décret n° 2025-1401 du 28 décembre 2025). Source secondaire, cf. page.
  R0: { seul: 5_235, couple: 7_501, uneCharge: 8_947 },
} as const;

export type ZoneApl = 1 | 2 | 3;

// Loyer plafond retenu pour un foyer, hors et en colocation.
export function loyerPlafond(zone: ZoneApl, couple: boolean, personnesACharge: number, colocation = false): number {
  const g = (colocation ? APL_2026.COLOCATION : APL_2026.PLAFONDS)[zone];
  const n = Math.max(0, Math.floor(personnesACharge));
  if (n === 0) return couple ? g.couple : g.seul;
  return g.uneCharge + (n - 1) * g.parChargeSup;
}

export function forfaitCharges(personnesACharge: number, colocation = false): number {
  const base = colocation ? APL_2026.FORFAIT_CHARGES_COLOCATION : APL_2026.FORFAIT_CHARGES;
  return base + Math.max(0, Math.floor(personnesACharge)) * APL_2026.FORFAIT_CHARGES_PAR_CHARGE;
}

export interface DepenseLogement {
  loyerPlafond: number;
  loyerRetenu: number;
  forfaitCharges: number;
  depenseRetenue: number;
  participationMinimale: number;
  loyerAuDessusDuPlafond: boolean;
}

// Première brique du calcul officiel : L + C, puis la participation minimale
// P0. Le reste de la participation personnelle dépend des ressources selon
// un barème (R0, taux de participation) que l'arrêté ne publie pas sous une
// forme réutilisable : on s'arrête à la dépense retenue, et on renvoie au
// simulateur de la CAF pour le montant final.
export function depenseLogement(loyer: number, zone: ZoneApl, couple: boolean, personnesACharge: number, colocation = false): DepenseLogement {
  const plafond = loyerPlafond(zone, couple, personnesACharge, colocation);
  const loyerRetenu = Math.min(Math.max(0, loyer), plafond);
  const charges = forfaitCharges(personnesACharge, colocation);
  const depenseRetenue = loyerRetenu + charges;
  const participationMinimale = Math.max(APL_2026.PARTICIPATION_MINIMALE, depenseRetenue * APL_2026.PARTICIPATION_MINIMALE_TAUX);
  return {
    loyerPlafond: plafond,
    loyerRetenu,
    forfaitCharges: charges,
    depenseRetenue,
    participationMinimale,
    loyerAuDessusDuPlafond: loyer > plafond,
  };
}
