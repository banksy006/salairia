// Chèque énergie — barème de la campagne 2026, inchangé depuis 2019 pour les
// montants et depuis 2023 pour le plafond.
// Sources : chequeenergie.gouv.fr, FAQ bénéficiaire (barème, UC, règle
// d'arrondi) https://chequeenergie.gouv.fr/beneficiaire/faq ; service-public
// F33667 https://www.service-public.gouv.fr/particuliers/vosdroits/F33667 ;
// arrêté du 31 juillet 2025 (NOR ECOR2519755A) pour le plafond de 11 000 €.
// Vérifié le 24 octobre 2026.
export const CHEQUE_ENERGIE_2026 = {
  PLAFOND_RFR_UC: 11_000,
  SEUILS: [5_700, 6_800, 7_850] as const, // bornes des tranches de RFR/UC
  // Montants par tranche de RFR/UC (croissante) et par taille de foyer
  MONTANTS: {
    "1": [194, 146, 98, 48],
    "1-2": [240, 176, 113, 63],
    "2+": [277, 202, 126, 76],
  } as Record<"1" | "1-2" | "2+", readonly [number, number, number, number]>,
  ANNEE_REVENUS: 2024,
  MONTANT_MOYEN: 153,
} as const;

// Unités de consommation propres au chèque énergie : 1 pour la première
// personne, 0,5 pour la deuxième, 0,3 pour chacune des suivantes.
export function unitesConsommation(personnes: number): number {
  const n = Math.max(1, Math.floor(personnes));
  if (n === 1) return 1;
  if (n === 2) return 1.5;
  return 1.5 + (n - 2) * 0.3;
}

export interface ChequeEnergieResult {
  uc: number;
  ratio: number; // RFR / UC, arrondi à l'unité comme le fait l'ASP
  eligible: boolean;
  montant: number;
  tranche: 0 | 1 | 2 | 3 | null;
}

export function calculerChequeEnergie(rfr: number, personnes: number): ChequeEnergieResult {
  const uc = unitesConsommation(personnes);
  const ratio = Math.round(Math.max(0, rfr) / uc);
  if (ratio >= CHEQUE_ENERGIE_2026.PLAFOND_RFR_UC) {
    return { uc, ratio, eligible: false, montant: 0, tranche: null };
  }
  const [s1, s2, s3] = CHEQUE_ENERGIE_2026.SEUILS;
  const tranche: 0 | 1 | 2 | 3 = ratio < s1 ? 0 : ratio < s2 ? 1 : ratio < s3 ? 2 : 3;
  const taille: "1" | "1-2" | "2+" = uc === 1 ? "1" : uc < 2 ? "1-2" : "2+";
  return { uc, ratio, eligible: true, montant: CHEQUE_ENERGIE_2026.MONTANTS[taille][tranche], tranche };
}
