/**
 * Calculateur TJM Freelance — taux indicatifs 2026.
 *
 * Compare 4 statuts : auto-entrepreneur (BNC libéral), portage salarial,
 * SASU (assimilé salarié), EURL (gérant TNS).
 *
 * Attention : les taux et hypothèses ci-dessous sont des moyennes 2026
 * documentées (URSSAF, BOSS.gouv.fr, Legifrance) à des fins
 * d'orientation. Ce ne sont pas des barèmes URSSAF officiels exhaustifs.
 * Pour une décision importante (changement de statut, optimisation
 * fiscale), consultez un expert-comptable.
 */

export const TJM_2026 = {
  // Auto-entrepreneur (BNC libéral non réglementé)
  AE_COTISATIONS_TAUX: 0.218,
  AE_PLAFOND_BNC: 77_700,
  AE_FRANCHISE_TVA_PLAFOND: 39_100,

  // Portage salarial
  PORTAGE_FRAIS_GESTION: 0.08,
  PORTAGE_CHARGES_PATRONALES: 0.43,
  PORTAGE_CHARGES_SALARIALES: 0.22,

  // SASU (président assimilé salarié)
  SASU_CHARGES_PATRONALES_TAUX: 0.42,
  SASU_CHARGES_SALARIALES_TAUX: 0.22,
  SASU_FRAIS_COMPTA_ANNUEL: 1_500,

  // EURL (gérant TNS)
  EURL_COTISATIONS_TNS_TAUX: 0.45,
  EURL_FRAIS_COMPTA_ANNUEL: 1_500,
} as const;

export type StatutFreelance =
  | "auto-entrepreneur"
  | "portage"
  | "sasu"
  | "eurl";

export const STATUTS_FREELANCE: readonly StatutFreelance[] = [
  "auto-entrepreneur",
  "portage",
  "sasu",
  "eurl",
] as const;

export const STATUT_LABELS: Record<StatutFreelance, string> = {
  "auto-entrepreneur": "Auto-entrepreneur",
  portage: "Portage salarial",
  sasu: "SASU",
  eurl: "EURL",
};

export interface TJMInputs {
  tjm: number;
  joursTravailles: number;
  fraisProMensuels: number;
  tauxPAS: number;
}

export type WarningSeverity = "danger" | "warning" | "info";

export interface Warning {
  severity: WarningSeverity;
  message: string;
}

export interface StatutResult {
  statut: StatutFreelance;
  caHT: number;
  fraisProAnnuel: number;
  fraisGestion: number;
  fraisCompta: number;
  cotisations: number;
  deductionsTotales: number;
  netAvantImpot: number;
  netApresImpot: number;
  netMensuel: number;
  warnings: Warning[];
}

export function calculerStatut(
  statut: StatutFreelance,
  inputs: TJMInputs,
): StatutResult {
  const caHT = Math.max(0, inputs.tjm * inputs.joursTravailles * 12);
  const fraisProAnnuel = Math.max(0, inputs.fraisProMensuels * 12);
  const pasMultiplier = 1 - inputs.tauxPAS / 100;

  let fraisGestion = 0;
  let fraisCompta = 0;
  let cotisations = 0;
  let netAvantImpot = 0;
  const warnings: Warning[] = [];

  switch (statut) {
    case "auto-entrepreneur": {
      cotisations = caHT * TJM_2026.AE_COTISATIONS_TAUX;
      netAvantImpot = caHT - cotisations - fraisProAnnuel;

      if (caHT > TJM_2026.AE_PLAFOND_BNC) {
        warnings.push({
          severity: "danger",
          message: `CA annuel > plafond auto-entrepreneur (${TJM_2026.AE_PLAFOND_BNC.toLocaleString("fr-FR")} €). La SASU ou l'EURL est plus adaptée.`,
        });
      } else if (caHT > TJM_2026.AE_FRANCHISE_TVA_PLAFOND) {
        warnings.push({
          severity: "warning",
          message: `CA > ${TJM_2026.AE_FRANCHISE_TVA_PLAFOND.toLocaleString("fr-FR")} € : TVA à 20 % obligatoire (franchise dépassée).`,
        });
      }
      break;
    }

    case "portage": {
      fraisGestion = caHT * TJM_2026.PORTAGE_FRAIS_GESTION;
      const base = Math.max(0, caHT - fraisGestion - fraisProAnnuel);
      const chargesPat = base * TJM_2026.PORTAGE_CHARGES_PATRONALES;
      const salaireBrut = base - chargesPat;
      const chargesSal = salaireBrut * TJM_2026.PORTAGE_CHARGES_SALARIALES;
      netAvantImpot = salaireBrut - chargesSal;
      cotisations = chargesPat + chargesSal;
      break;
    }

    case "sasu": {
      fraisCompta = TJM_2026.SASU_FRAIS_COMPTA_ANNUEL;
      const resultat = Math.max(0, caHT - fraisProAnnuel - fraisCompta);
      // Tout le résultat est versé en rémunération.
      // brut + chargesPat = resultat avec chargesPat = brut × 42 %
      // → brut = resultat / 1.42
      const brut = resultat / (1 + TJM_2026.SASU_CHARGES_PATRONALES_TAUX);
      const chargesPat = brut * TJM_2026.SASU_CHARGES_PATRONALES_TAUX;
      const chargesSal = brut * TJM_2026.SASU_CHARGES_SALARIALES_TAUX;
      netAvantImpot = brut - chargesSal;
      cotisations = chargesPat + chargesSal;
      break;
    }

    case "eurl": {
      fraisCompta = TJM_2026.EURL_FRAIS_COMPTA_ANNUEL;
      const resultat = Math.max(0, caHT - fraisProAnnuel - fraisCompta);
      // TNS : cotisations assises sur la rémunération nette
      // net + net × 45 % = resultat → net = resultat / 1.45
      const remNette = resultat / (1 + TJM_2026.EURL_COTISATIONS_TNS_TAUX);
      cotisations = remNette * TJM_2026.EURL_COTISATIONS_TNS_TAUX;
      netAvantImpot = remNette;
      break;
    }
  }

  netAvantImpot = Math.max(0, netAvantImpot);
  const netApresImpot = netAvantImpot * pasMultiplier;
  const netMensuel = netApresImpot / 12;
  const deductionsTotales = caHT - netAvantImpot;

  return {
    statut,
    caHT,
    fraisProAnnuel,
    fraisGestion,
    fraisCompta,
    cotisations,
    deductionsTotales,
    netAvantImpot,
    netApresImpot,
    netMensuel,
    warnings,
  };
}

export function calculerTous(inputs: TJMInputs): StatutResult[] {
  return STATUTS_FREELANCE.map((s) => calculerStatut(s, inputs));
}

/**
 * Bissection : trouve le TJM qui produit approximativement le net cible
 * pour un statut donné. Convergence à ±0,5 €/j.
 */
export function findTJMForNetCible(
  netCible: number,
  statut: StatutFreelance,
  params: Omit<TJMInputs, "tjm">,
): number {
  if (netCible <= 0) return 0;
  let low = 0;
  let high = 10_000;
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const r = calculerStatut(statut, { ...params, tjm: mid });
    if (r.netApresImpot < netCible) {
      low = mid;
    } else {
      high = mid;
    }
    if (high - low < 0.5) break;
  }
  return (low + high) / 2;
}

export interface NetCibleResult {
  statut: StatutFreelance;
  tjm: number;
  caHT: number;
  netAtteint: number;
  netMensuel: number;
  warnings: Warning[];
}

export function calculerTousPourNetCible(
  netCible: number,
  params: Omit<TJMInputs, "tjm">,
): NetCibleResult[] {
  return STATUTS_FREELANCE.map((statut) => {
    const tjm = findTJMForNetCible(netCible, statut, params);
    const result = calculerStatut(statut, { ...params, tjm });
    return {
      statut,
      tjm,
      caHT: result.caHT,
      netAtteint: result.netApresImpot,
      netMensuel: result.netMensuel,
      warnings: result.warnings,
    };
  });
}
