/**
 * Calculateur Net après impôt — barème PAS taux neutre 2026.
 *
 * Source : BOFiP, impots.gouv.fr — grille de taux par défaut
 * (taux neutre) applicable en métropole au 1er janvier 2026.
 *
 * Attention : le taux neutre est une estimation. Le taux réel dépend
 * de votre situation fiscale (parts, revenus du foyer). Consultez
 * votre espace impots.gouv.fr pour votre taux personnalisé.
 */

// Barème taux neutre métropole 2026 — base mensuelle net imposable
// Source : BOFiP, impots.gouv.fr, consulté avril 2026
export const BAREME_TAUX_NEUTRE_2026 = [
  { max: 1_591, taux: 0 },
  { max: 1_653, taux: 0.005 },
  { max: 1_759, taux: 0.013 },
  { max: 1_877, taux: 0.021 },
  { max: 2_006, taux: 0.029 },
  { max: 2_113, taux: 0.035 },
  { max: 2_253, taux: 0.041 },
  { max: 2_666, taux: 0.053 },
  { max: 3_052, taux: 0.075 },
  { max: 3_476, taux: 0.099 },
  { max: 3_913, taux: 0.119 },
  { max: 4_566, taux: 0.138 },
  { max: 5_475, taux: 0.158 },
  { max: 6_851, taux: 0.179 },
  { max: 8_557, taux: 0.20 },
  { max: 11_877, taux: 0.24 },
  { max: 16_087, taux: 0.28 },
  { max: 25_251, taux: 0.33 },
  { max: 46_557, taux: 0.38 },
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
  return "46 558 € +";
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
