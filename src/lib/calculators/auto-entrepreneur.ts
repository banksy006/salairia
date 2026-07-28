/**
 * Calculateur Auto-entrepreneur — taux officiels 2026.
 *
 * Sources : autoentrepreneur.urssaf.fr, urssaf.fr, economie.gouv.fr
 * (revalidés le 27 juillet 2026 : taux, plafonds de CA, seuils de
 * franchise TVA et taux de versement libératoire inchangés depuis
 * le 1er janvier 2026).
 *
 * Attention : certaines professions CIPAV spécifiques ou situations
 * DOM-TOM ont des taux différents. Pour un cas particulier, vérifiez
 * sur autoentrepreneur.urssaf.fr ou consultez un expert-comptable.
 */

export const AE_2026 = {
  PLAFOND_BIC_VENTE: 203_100,
  PLAFOND_BIC_SERVICES: 83_600,
  PLAFOND_BNC: 83_600,

  TAUX_BIC_VENTE: 0.123,
  TAUX_BIC_SERVICES: 0.212,
  TAUX_BNC_REGIME_GENERAL: 0.256,
  TAUX_BNC_CIPAV: 0.232,

  CFP_BIC_VENTE: 0.001,
  CFP_BIC_SERVICES: 0.003,
  CFP_BNC: 0.002,

  VL_BIC_VENTE: 0.01,
  VL_BIC_SERVICES: 0.017,
  VL_BNC: 0.022,

  // ACRE micro-social : taux de cotisation ramené à 75 % du taux de droit
  // commun, soit 25 % d'exonération. Contrairement au régime réel, le micro
  // n'est PAS soumis à la dégressivité selon le revenu (seuils 75 % / 100 % du
  // PASS de l'article D131-6-1 CSS) : le taux réduit est forfaitaire.
  // Source : urssaf.fr et autoentrepreneur.urssaf.fr, vérifié le 28 juillet 2026.
  ACRE_EXONERATION: 0.25,
  // Durée réelle : jusqu'à la fin du 3e trimestre civil suivant l'immatriculation,
  // soit 9 à 12 mois selon la date de début. Cette constante n'entre dans aucun
  // calcul, elle ne sert que de repère documentaire.
  ACRE_DUREE_MOIS: 12,

  FRANCHISE_TVA_SERVICES: 37_500,
  FRANCHISE_TVA_SERVICES_TOLERANCE: 41_250,
  FRANCHISE_TVA_VENTE: 85_000,
  FRANCHISE_TVA_VENTE_TOLERANCE: 93_500,
} as const;

export type AECategorie =
  | "BIC_VENTE"
  | "BIC_SERVICES"
  | "BNC_REGIME_GENERAL"
  | "BNC_CIPAV";

export const AE_CATEGORIES: readonly AECategorie[] = [
  "BIC_VENTE",
  "BIC_SERVICES",
  "BNC_REGIME_GENERAL",
  "BNC_CIPAV",
] as const;

export const AE_CATEGORIE_LABELS: Record<AECategorie, string> = {
  BIC_VENTE: "BIC Vente de marchandises",
  BIC_SERVICES: "BIC Prestation de services",
  BNC_REGIME_GENERAL: "BNC Profession libérale – Régime général",
  BNC_CIPAV: "BNC Profession libérale – CIPAV",
};

interface CategorieConfig {
  tauxURSSAF: number;
  tauxCFP: number;
  tauxVL: number;
  plafondCA: number;
  seuilTVA: number;
  seuilTVATolerance: number;
}

const CONFIGS: Record<AECategorie, CategorieConfig> = {
  BIC_VENTE: {
    tauxURSSAF: AE_2026.TAUX_BIC_VENTE,
    tauxCFP: AE_2026.CFP_BIC_VENTE,
    tauxVL: AE_2026.VL_BIC_VENTE,
    plafondCA: AE_2026.PLAFOND_BIC_VENTE,
    seuilTVA: AE_2026.FRANCHISE_TVA_VENTE,
    seuilTVATolerance: AE_2026.FRANCHISE_TVA_VENTE_TOLERANCE,
  },
  BIC_SERVICES: {
    tauxURSSAF: AE_2026.TAUX_BIC_SERVICES,
    tauxCFP: AE_2026.CFP_BIC_SERVICES,
    tauxVL: AE_2026.VL_BIC_SERVICES,
    plafondCA: AE_2026.PLAFOND_BIC_SERVICES,
    seuilTVA: AE_2026.FRANCHISE_TVA_SERVICES,
    seuilTVATolerance: AE_2026.FRANCHISE_TVA_SERVICES_TOLERANCE,
  },
  BNC_REGIME_GENERAL: {
    tauxURSSAF: AE_2026.TAUX_BNC_REGIME_GENERAL,
    tauxCFP: AE_2026.CFP_BNC,
    tauxVL: AE_2026.VL_BNC,
    plafondCA: AE_2026.PLAFOND_BNC,
    seuilTVA: AE_2026.FRANCHISE_TVA_SERVICES,
    seuilTVATolerance: AE_2026.FRANCHISE_TVA_SERVICES_TOLERANCE,
  },
  BNC_CIPAV: {
    tauxURSSAF: AE_2026.TAUX_BNC_CIPAV,
    tauxCFP: AE_2026.CFP_BNC,
    tauxVL: AE_2026.VL_BNC,
    plafondCA: AE_2026.PLAFOND_BNC,
    seuilTVA: AE_2026.FRANCHISE_TVA_SERVICES,
    seuilTVATolerance: AE_2026.FRANCHISE_TVA_SERVICES_TOLERANCE,
  },
};

export function getCategorieConfig(cat: AECategorie): CategorieConfig {
  return CONFIGS[cat];
}

export interface AEInputs {
  caAnnuel: number;
  categorie: AECategorie;
  acre: boolean;
  versementLiberatoire: boolean;
  fraisProAnnuels: number;
}

export type WarningSeverity = "danger" | "warning" | "info";

export interface Warning {
  severity: WarningSeverity;
  message: string;
}

export interface AEResult {
  caAnnuel: number;
  tauxURSSAFEffectif: number;
  cotisationsURSSAF: number;
  cfp: number;
  fraisPro: number;
  revenuAvantImpot: number;
  montantVL: number;
  revenuNetApresImpot: number;
  netMensuel: number;
  tauxRetour: number;
  warnings: Warning[];
}

export function calculerAutoEntrepreneur(inputs: AEInputs): AEResult {
  const ca = Math.max(0, inputs.caAnnuel);
  const config = CONFIGS[inputs.categorie];

  const tauxURSSAFEffectif = inputs.acre
    ? config.tauxURSSAF * (1 - AE_2026.ACRE_EXONERATION)
    : config.tauxURSSAF;

  const cotisationsURSSAF = ca * tauxURSSAFEffectif;
  const cfp = ca * config.tauxCFP;
  const fraisPro = Math.max(0, inputs.fraisProAnnuels);

  const revenuAvantImpot = Math.max(0, ca - cotisationsURSSAF - cfp - fraisPro);

  const montantVL = inputs.versementLiberatoire ? ca * config.tauxVL : 0;
  const revenuNetApresImpot = Math.max(0, revenuAvantImpot - montantVL);
  const netMensuel = revenuNetApresImpot / 12;
  const tauxRetour = ca > 0 ? revenuNetApresImpot / ca : 0;

  const warnings = getAlertes(inputs, config, ca);

  return {
    caAnnuel: ca,
    tauxURSSAFEffectif,
    cotisationsURSSAF,
    cfp,
    fraisPro,
    revenuAvantImpot,
    montantVL,
    revenuNetApresImpot,
    netMensuel,
    tauxRetour,
    warnings,
  };
}

function getAlertes(
  inputs: AEInputs,
  config: CategorieConfig,
  ca: number,
): Warning[] {
  const warnings: Warning[] = [];

  if (ca > config.plafondCA) {
    warnings.push({
      severity: "danger",
      message: `CA annuel (${ca.toLocaleString("fr-FR")} €) > plafond auto-entrepreneur (${config.plafondCA.toLocaleString("fr-FR")} €). Vous devez passer en régime réel (EI, EURL ou SASU).`,
    });
  }

  if (ca > config.seuilTVATolerance) {
    warnings.push({
      severity: "warning",
      message: `Dépassement critique du seuil de tolérance TVA (${config.seuilTVATolerance.toLocaleString("fr-FR")} €). Vous basculez en TVA obligatoire.`,
    });
  } else if (ca > config.seuilTVA) {
    warnings.push({
      severity: "warning",
      message: `CA > franchise TVA (${config.seuilTVA.toLocaleString("fr-FR")} €). Vous devez facturer la TVA à 20 %. Ce simulateur ne calcule pas la TVA collectée/reversée.`,
    });
  }

  if (inputs.acre) {
    warnings.push({
      severity: "info",
      message: `Avec l'ACRE, vos taux URSSAF sont réduits de 25 % (au lieu de 50 % avant 2026). L'exonération court jusqu'à la fin du 3e trimestre civil suivant votre immatriculation — soit 9 à 12 mois selon votre date de début. Depuis le 1er janvier 2026, la demande doit être faite à l'Urssaf dans les 60 jours suivant le début d'activité.`,
    });
  }

  if (inputs.versementLiberatoire && ca > 50_000) {
    warnings.push({
      severity: "info",
      message:
        "Le versement libératoire n'est pas toujours avantageux. Il l'est principalement pour les revenus modestes. Vérifiez avec un expert-comptable.",
    });
  }

  return warnings;
}
