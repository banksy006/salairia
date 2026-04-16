/**
 * Calculateur Salaire Brut/Net — taux 2026.
 *
 * Sources : URSSAF, LégiSocial, AGIRC-ARRCO, service-public.fr.
 * Vérifiés le 16 avril 2026.
 *
 * Attention : les taux utilisés sont des références moyennes 2026.
 * Le montant exact dépend de votre convention collective, mutuelle
 * d'entreprise et situation fiscale. Consultez votre fiche de paie.
 */

export const SALAIRE_2026 = {
  PASS_ANNUEL: 48_060,
  PASS_MENSUEL: 4_005,
  SMIC_MENSUEL_BRUT: 1_823.03,

  // Cotisations salariales
  SAL_VIEILLESSE_PLAFONNEE: 0.069,
  SAL_VIEILLESSE_DEPLAFONNEE: 0.004,
  SAL_ARRCO_T1: 0.0315,
  SAL_ARRCO_T2: 0.0864,
  SAL_CEG_T1: 0.0086,
  SAL_CEG_T2: 0.0108,
  SAL_CET: 0.0014,
  SAL_APEC: 0.00024,

  // CSG/CRDS
  CSG_CRDS_BASE: 0.9825,
  CSG_DEDUCTIBLE: 0.068,
  CSG_NON_DEDUCTIBLE: 0.024,
  CRDS: 0.005,

  // Patronales simplifiées
  TAUX_PATRONAL_NON_CADRE: 0.42,
  TAUX_PATRONAL_CADRE: 0.45,
} as const;

export type Statut = "non-cadre" | "cadre";
export type Mode = "brut-vers-net" | "net-vers-brut";
export type Periodicite = "mensuel" | "annuel";

export interface BrutNetInputs {
  salaire: number;
  mode: Mode;
  periodicite: Periodicite;
  statut: Statut;
  tauxPAS: number;
}

export interface CotisationsDetail {
  vieillessePlafonnee: number;
  vieillesseDeplafonee: number;
  arrcoT1: number;
  arrcoT2: number;
  cegT1: number;
  cegT2: number;
  cet: number;
  apec: number;
  csgDeductible: number;
  csgNonDeductible: number;
  crds: number;
}

export interface BrutNetResult {
  brutMensuel: number;
  brutAnnuel: number;
  cotisations: CotisationsDetail;
  totalSecu: number;
  totalRetraite: number;
  totalCsgCrds: number;
  totalCotisationsSalariales: number;
  tauxEffectif: number;
  netAvantImpotMensuel: number;
  netAvantImpotAnnuel: number;
  montantPAS: number;
  netApresMensuel: number;
  netApresAnnuel: number;
  coutEmployeurMensuel: number;
  coutEmployeurAnnuel: number;
}

export function calculerBrutVersNet(inputs: BrutNetInputs): BrutNetResult {
  const brutMensuel =
    inputs.periodicite === "annuel"
      ? Math.max(0, inputs.salaire) / 12
      : Math.max(0, inputs.salaire);

  return computeFromBrut(brutMensuel, inputs.statut, inputs.tauxPAS);
}

export function calculerNetVersBrut(inputs: BrutNetInputs): BrutNetResult {
  const netCibleMensuel =
    inputs.periodicite === "annuel"
      ? Math.max(0, inputs.salaire) / 12
      : Math.max(0, inputs.salaire);

  let low = 0;
  let high = netCibleMensuel * 3;
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const r = computeFromBrut(mid, inputs.statut, inputs.tauxPAS);
    if (r.netApresMensuel < netCibleMensuel) {
      low = mid;
    } else {
      high = mid;
    }
    if (high - low < 0.01) break;
  }

  return computeFromBrut((low + high) / 2, inputs.statut, inputs.tauxPAS);
}

function computeFromBrut(
  brutMensuel: number,
  statut: Statut,
  tauxPAS: number,
): BrutNetResult {
  const S = SALAIRE_2026;
  const pass = S.PASS_MENSUEL;
  const t1 = Math.min(brutMensuel, pass);
  const t2 = Math.max(0, brutMensuel - pass);

  const vieillessePlafonnee = t1 * S.SAL_VIEILLESSE_PLAFONNEE;
  const vieillesseDeplafonee = brutMensuel * S.SAL_VIEILLESSE_DEPLAFONNEE;

  const arrcoT1 = t1 * S.SAL_ARRCO_T1;
  const arrcoT2 = t2 * S.SAL_ARRCO_T2;
  const cegT1 = t1 * S.SAL_CEG_T1;
  const cegT2 = t2 * S.SAL_CEG_T2;
  const cet = t2 > 0 ? brutMensuel * S.SAL_CET : 0;
  const apec = statut === "cadre" ? brutMensuel * S.SAL_APEC : 0;

  const baseCsg = brutMensuel * S.CSG_CRDS_BASE;
  const csgDeductible = baseCsg * S.CSG_DEDUCTIBLE;
  const csgNonDeductible = baseCsg * S.CSG_NON_DEDUCTIBLE;
  const crds = baseCsg * S.CRDS;

  const cotisations: CotisationsDetail = {
    vieillessePlafonnee,
    vieillesseDeplafonee,
    arrcoT1,
    arrcoT2,
    cegT1,
    cegT2,
    cet,
    apec,
    csgDeductible,
    csgNonDeductible,
    crds,
  };

  const totalSecu = vieillessePlafonnee + vieillesseDeplafonee;
  const totalRetraite = arrcoT1 + arrcoT2 + cegT1 + cegT2 + cet + apec;
  const totalCsgCrds = csgDeductible + csgNonDeductible + crds;
  const totalCotisationsSalariales = totalSecu + totalRetraite + totalCsgCrds;
  const tauxEffectif =
    brutMensuel > 0 ? totalCotisationsSalariales / brutMensuel : 0;

  const netAvantImpotMensuel = brutMensuel - totalCotisationsSalariales;
  const netImposable = netAvantImpotMensuel + csgNonDeductible + crds;
  const montantPAS = netImposable * (tauxPAS / 100);
  const netApresMensuel = netAvantImpotMensuel - montantPAS;

  const tauxPatronal =
    statut === "cadre"
      ? S.TAUX_PATRONAL_CADRE
      : S.TAUX_PATRONAL_NON_CADRE;
  const coutEmployeurMensuel = brutMensuel * (1 + tauxPatronal);

  return {
    brutMensuel,
    brutAnnuel: brutMensuel * 12,
    cotisations,
    totalSecu,
    totalRetraite,
    totalCsgCrds,
    totalCotisationsSalariales,
    tauxEffectif,
    netAvantImpotMensuel,
    netAvantImpotAnnuel: netAvantImpotMensuel * 12,
    montantPAS,
    netApresMensuel,
    netApresAnnuel: netApresMensuel * 12,
    coutEmployeurMensuel,
    coutEmployeurAnnuel: coutEmployeurMensuel * 12,
  };
}
