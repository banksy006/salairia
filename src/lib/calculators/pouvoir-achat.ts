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
import { calculerNetVersBrut } from "./salaire-brut-net";

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
  /** Revenu net exigé par les bailleurs : règle des 3× le loyer. */
  revenuExigeBailleur: number;
  revenuExigeBailleurAnnuel: number;
  /** Net permettant de couvrir les dépenses courantes en gardant 30 % de marge. */
  budgetVieNet: number;
  budgetVieNetAnnuel: number;
  /** Brut correspondant au revenu exigé, via le calculateur brut/net (non-cadre). */
  brutPourRevenuExige: number;
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

  // Deux lectures distinctes, volontairement séparées car elles répondent à
  // deux questions différentes et donnent des montants très différents :
  //  - la règle des 3× le loyer, exigée par la plupart des bailleurs à la
  //    signature du bail (elle ne dépend QUE du loyer) ;
  //  - le net réellement nécessaire pour couvrir les dépenses courantes en
  //    conservant 30 % de marge (épargne, loisirs, imprévus).
  const revenuExigeBailleur = Math.round(ville.loyerT2 / 0.3);
  const budgetVieNet = Math.round(totalMensuel / 0.7);

  // Passe par le calculateur brut/net plutôt qu'un ratio net/brut forfaitaire :
  // le taux de cotisations varie avec le PASS et divergeait de ~1,2 pt.
  const brutPourRevenuExige = Math.round(
    calculerNetVersBrut({
      salaire: revenuExigeBailleur,
      mode: "net-vers-brut",
      periodicite: "mensuel",
      statut: "non-cadre",
      tauxPAS: 0,
    }).brutMensuel,
  );

  return {
    ville,
    totalMensuel,
    revenuExigeBailleur,
    revenuExigeBailleurAnnuel: revenuExigeBailleur * 12,
    budgetVieNet,
    budgetVieNetAnnuel: budgetVieNet * 12,
    brutPourRevenuExige,
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
