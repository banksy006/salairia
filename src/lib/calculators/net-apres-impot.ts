/**
 * Calculateur Net après impôt — barème PAS taux neutre 2026.
 *
 * Source : BOFiP, impots.gouv.fr — grille de taux par défaut
 * (taux neutre) applicable en métropole à compter du 1er mai 2026.
 *
 * Attention : le taux neutre est une estimation. Le taux réel dépend
 * de votre situation fiscale (parts, revenus du foyer). Consultez
 * votre espace impots.gouv.fr pour votre taux personnalisé.
 */

// Barème taux neutre métropole — base mensuelle net imposable.
// Applicable à compter du 1er mai 2026 (limites de tranches réajustées par la
// loi n° 2026-103 du 19 février 2026 de finances pour 2026, art. 4).
// Sources : BOFiP BOI-BAREME-000037 et CGI art. 204 H (Legifrance).
// Vérifié le 27 juillet 2026.
//
// `max` = borne haute INCLUSE en euros entiers : le barème officiel énonce
// « supérieure ou égale à N et inférieure à N+1 », d'où max = borne_suivante − 1.
export const BAREME_TAUX_NEUTRE_2026 = [
  { max: 1_634, taux: 0 },
  { max: 1_697, taux: 0.005 },
  { max: 1_806, taux: 0.013 },
  { max: 1_927, taux: 0.021 },
  { max: 2_059, taux: 0.029 },
  { max: 2_169, taux: 0.035 },
  { max: 2_314, taux: 0.041 },
  { max: 2_737, taux: 0.053 },
  { max: 3_134, taux: 0.075 },
  { max: 3_570, taux: 0.099 },
  { max: 4_018, taux: 0.119 },
  { max: 4_689, taux: 0.138 },
  { max: 5_623, taux: 0.158 },
  { max: 7_036, taux: 0.179 },
  { max: 8_788, taux: 0.20 },
  { max: 12_199, taux: 0.24 },
  { max: 16_522, taux: 0.28 },
  { max: 25_936, taux: 0.33 },
  { max: 55_557, taux: 0.38 },
  { max: Infinity, taux: 0.43 },
] as const;

export type ModeImpot = "taux-neutre" | "taux-personnalise";

export interface NetImpotInputs {
  netAvantImpot: number;
  mode: ModeImpot;
  tauxPerso: number;
}

export interface NetImpotResult {
  netAvantImpot: number;
  tauxApplique: number;
  montantPAS: number;
  netApresImpot: number;
  netApresImpotAnnuel: number;
  trancheBareme: string;
}

export function getTauxNeutre(netImposableMensuel: number): number {
  for (const tranche of BAREME_TAUX_NEUTRE_2026) {
    if (netImposableMensuel <= tranche.max) return tranche.taux;
  }
  return 0.43;
}

export function getTrancheLabel(netImposableMensuel: number): string {
  for (let i = 0; i < BAREME_TAUX_NEUTRE_2026.length; i++) {
    const t = BAREME_TAUX_NEUTRE_2026[i];
    if (netImposableMensuel <= t.max) {
      const min = i === 0 ? 0 : BAREME_TAUX_NEUTRE_2026[i - 1].max + 1;
      const max = t.max === Infinity ? "+" : `${t.max.toLocaleString("fr-FR")} €`;
      return `${min.toLocaleString("fr-FR")} – ${max}`;
    }
  }
  return "55 558 € +";
}

export function calculerNetApresImpot(
  inputs: NetImpotInputs,
): NetImpotResult {
  const net = Math.max(0, inputs.netAvantImpot);

  const tauxApplique =
    inputs.mode === "taux-personnalise"
      ? inputs.tauxPerso / 100
      : getTauxNeutre(net);

  const montantPAS = net * tauxApplique;
  const netApresImpot = net - montantPAS;

  return {
    netAvantImpot: net,
    tauxApplique,
    montantPAS,
    netApresImpot,
    netApresImpotAnnuel: netApresImpot * 12,
    trancheBareme:
      inputs.mode === "taux-neutre" ? getTrancheLabel(net) : "Taux personnalisé",
  };
}
