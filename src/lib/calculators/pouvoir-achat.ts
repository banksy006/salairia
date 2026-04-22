/**
 * Calculateur Pouvoir d'achat par ville — estimations 2026.
 *
 * Sources : MeilleursAgents (loyers moyens T2, avril 2026),
 * tarifs officiels transports en commun 2026, INSEE (alimentation
 * moyenne, charges courantes).
 *
 * Attention : ces montants sont des estimations moyennes. Le coût
 * réel dépend de votre quartier, mode de vie, et situation familiale.
 */

import villesData from "@/data/cout-vie-villes.json";

export interface VilleData {
  id: string;
  nom: string;
  region: string;
  loyerT2: number;
  transport: number;
  alimentation: number;
  charges: number;
}

export function getVillesList(): VilleData[] {
  return villesData.villes as VilleData[];
}

export function getVille(id: string): VilleData | undefined {
  return (villesData.villes as VilleData[]).find((v) => v.id === id);
}

export interface PouvoirAchatInputs {
  villeId: string;
  villeCompareId: string;
}

export interface VilleResult {
  ville: VilleData;
  totalMensuel: number;
  salaireNetNecessaire: number;
  salaireNetNecessaireAnnuel: number;
  salaireBrutEstime: number;
  repartition: {
    loyer: number;
    transport: number;
    alimentation: number;
    charges: number;
  };
}

export interface PouvoirAchatResult {
  principale: VilleResult;
  comparaison: VilleResult | null;
  ecartMensuel: number;
  ecartPourcent: number;
}

function calculerVille(ville: VilleData): VilleResult {
  const totalMensuel =
    ville.loyerT2 + ville.transport + ville.alimentation + ville.charges;
  // Salaire net nécessaire = dépenses / 0.70 (loyer ≤ 30% du revenu = règle bancaire)
  const salaireNetNecessaire = Math.round(ville.loyerT2 / 0.3);
  const salaireBrutEstime = Math.round(salaireNetNecessaire / 0.78);

  return {
    ville,
    totalMensuel,
    salaireNetNecessaire,
    salaireNetNecessaireAnnuel: salaireNetNecessaire * 12,
    salaireBrutEstime,
    repartition: {
      loyer: ville.loyerT2,
      transport: ville.transport,
      alimentation: ville.alimentation,
      charges: ville.charges,
    },
  };
}

export function calculerPouvoirAchat(
  inputs: PouvoirAchatInputs,
): PouvoirAchatResult {
  const villePrincipale = getVille(inputs.villeId);
  const villeCompare =
    inputs.villeCompareId && inputs.villeCompareId !== inputs.villeId
      ? getVille(inputs.villeCompareId)
      : undefined;

  const principale = villePrincipale
    ? calculerVille(villePrincipale)
    : calculerVille(getVillesList()[0]);

  const comparaison = villeCompare ? calculerVille(villeCompare) : null;

  const ecartMensuel = comparaison
    ? principale.totalMensuel - comparaison.totalMensuel
    : 0;
  const ecartPourcent =
    comparaison && comparaison.totalMensuel > 0
      ? (ecartMensuel / comparaison.totalMensuel) * 100
      : 0;

  return { principale, comparaison, ecartMensuel, ecartPourcent };
}
