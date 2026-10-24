// Allocations familiales — barème en vigueur au 1er avril 2026.
// Source montants : CAF, barème « Au 1er avril 2026 »
//   https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-allocations-familiales
// Source plafonds (revenus 2024, applicables en 2026) : service-public.gouv.fr F13213
//   https://www.service-public.gouv.fr/particuliers/vosdroits/F13213
// service-public affiche des arrondis différents d'un centime sur cinq cases ;
// on retient le barème de l'organisme payeur (CAF). Vérifié le 24 octobre 2026.
export const AF_2026 = {
  BMAF: 478.16, // base mensuelle, +0,8 % au 1er avril 2026 (solidarites.gouv.fr)
  // Montant mensuel taux plein par nombre d'enfants à charge (2 à 5), puis par enfant au-delà
  MONTANTS: { 2: 152.25, 3: 347.32, 4: 542.38, 5: 737.45 } as Record<number, number>,
  PAR_ENFANT_SUPPLEMENTAIRE: 195.07,
  MAJORATION_AGE: 76.13, // par enfant de 14 ans et plus (18 ans pour les enfants nés depuis le 1er mars 2012)
  // Plafonds annuels de ressources (revenu net catégoriel 2024) : [taux plein jusqu'à, moitié jusqu'à]
  PLAFONDS: { 2: [79_980, 106_604], 3: [86_644, 113_268], 4: [93_308, 119_932], 5: [99_972, 126_596] } as Record<number, [number, number]>,
  PLAFOND_PAR_ENFANT_SUPPLEMENTAIRE: 6_664,
  ANNEE_REVENUS: 2024,
} as const;

export type TrancheAF = "plein" | "moitie" | "quart";

export function plafondsAF(nbEnfants: number): [number, number] {
  const n = Math.max(2, Math.floor(nbEnfants));
  if (n <= 5) return AF_2026.PLAFONDS[n];
  const extra = (n - 5) * AF_2026.PLAFOND_PAR_ENFANT_SUPPLEMENTAIRE;
  return [AF_2026.PLAFONDS[5][0] + extra, AF_2026.PLAFONDS[5][1] + extra];
}

export function montantPleinAF(nbEnfants: number): number {
  const n = Math.max(2, Math.floor(nbEnfants));
  if (n <= 5) return AF_2026.MONTANTS[n];
  return AF_2026.MONTANTS[5] + (n - 5) * AF_2026.PAR_ENFANT_SUPPLEMENTAIRE;
}

export function trancheAF(nbEnfants: number, revenus: number): TrancheAF {
  const [p1, p2] = plafondsAF(nbEnfants);
  if (revenus <= p1) return "plein";
  if (revenus <= p2) return "moitie";
  return "quart";
}

export interface AFResult {
  tranche: TrancheAF;
  diviseur: 1 | 2 | 4;
  base: number;
  majorations: number;
  total: number;
  // Complément dégressif : évite qu'un euro de revenu au-dessus du plafond ne
  // fasse perdre plus que cet euro (article D521-3 du CSS, lissage sur 12 mois).
  complementDegressif: number;
  plafonds: [number, number];
}

// Pour une famille de 2 enfants, l'aîné n'ouvre jamais droit à la majoration
// pour âge : la CAF ne la verse qu'à partir du deuxième enfant concerné.
export function calculerAF(nbEnfants: number, revenus: number, enfantsMajores: number): AFResult {
  const n = Math.max(2, Math.floor(nbEnfants));
  const tranche = trancheAF(n, revenus);
  const diviseur: 1 | 2 | 4 = tranche === "plein" ? 1 : tranche === "moitie" ? 2 : 4;
  const majorables = n === 2 ? Math.max(0, Math.min(enfantsMajores, 1)) : Math.max(0, Math.min(enfantsMajores, n));
  const base = montantPleinAF(n) / diviseur;
  const majorations = (majorables * AF_2026.MAJORATION_AGE) / diviseur;
  const plafonds = plafondsAF(n);

  // Lissage : si le dépassement de plafond coûte plus (sur 12 mois) que ce
  // dépassement, la différence est reversée en complément dégressif.
  let complementDegressif = 0;
  if (tranche !== "plein") {
    const plafond = tranche === "moitie" ? plafonds[0] : plafonds[1];
    const diviseurPrecedent = tranche === "moitie" ? 1 : 2;
    const montantPrecedent = (montantPleinAF(n) + majorables * AF_2026.MAJORATION_AGE) / diviseurPrecedent;
    const perteAnnuelle = (montantPrecedent - (base + majorations)) * 12;
    const depassement = revenus - plafond;
    if (depassement < perteAnnuelle) {
      complementDegressif = (perteAnnuelle - depassement) / 12;
    }
  }

  const total = base + majorations + complementDegressif;
  return { tranche, diviseur, base, majorations, total, complementDegressif, plafonds };
}
