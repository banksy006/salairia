/**
 * Calculateur comparatif SASU vs EURL — taux indicatifs 2026.
 *
 * Sources : service-public.fr, LégiSocial, lecoindesentrepreneurs.fr,
 * Compta-Online, URSSAF. Vérifiés le 16 avril 2026.
 *
 * Attention : les taux sont des moyennes simplifiées. Les cotisations
 * TNS réelles sont progressives et les cotisations SASU dépendent de
 * la convention collective. Pour une optimisation précise, consultez
 * un expert-comptable.
 */

export const SASU_EURL_2026 = {
  IS_TAUX_REDUIT: 0.15,
  IS_SEUIL_REDUIT: 42_500,
  IS_TAUX_NORMAL: 0.25,

  SASU_TAUX_CHARGES_SALARIALES: 0.22,
  SASU_TAUX_CHARGES_PATRONALES: 0.42,

  EURL_TAUX_COTISATIONS_TNS: 0.45,
  EURL_COTISATIONS_MINIMALES: 1_200,

  PFU_TOTAL: 0.3,
  EURL_SEUIL_DIVIDENDES_CAPITAL: 0.1,

  CAPITAL_SOCIAL_DEFAUT: 1_000,
} as const;

export interface SasuEurlInputs {
  caAnnuel: number;
  chargesExploitation: number;
  remunerationNette: number;
  capitalSocial: number;
}

export type WarningSeverity = "danger" | "warning" | "info";

export interface Warning {
  severity: WarningSeverity;
  message: string;
}

export interface StatutResult {
  remunerationNette: number;
  chargesSociales: number;
  coutRemuneration: number;
  beneficeAvantIS: number;
  is: number;
  beneficeApresIS: number;
  dividendesBruts: number;
  taxeDividendes: number;
  dividendesNets: number;
  netTotal: number;
  tauxRetour: number;
}

export interface Scenario {
  label: string;
  remunerationNette: number;
  dividendesNets: number;
  netTotal: number;
}

export interface ComparaisonResult {
  resultatBrut: number;
  sasu: StatutResult;
  eurl: EurlResult;
  meilleur: "sasu" | "eurl" | "egal";
  ecart: number;
  scenariosSasu: Scenario[];
  scenariosEurl: Scenario[];
  warnings: Warning[];
}

interface EurlResult extends StatutResult {
  seuilDividendesSansCharges: number;
}

function calculIS(benefice: number): number {
  if (benefice <= 0) return 0;
  const S = SASU_EURL_2026;
  if (benefice <= S.IS_SEUIL_REDUIT) return benefice * S.IS_TAUX_REDUIT;
  return (
    S.IS_SEUIL_REDUIT * S.IS_TAUX_REDUIT +
    (benefice - S.IS_SEUIL_REDUIT) * S.IS_TAUX_NORMAL
  );
}

function calculerSASU(
  resultatBrut: number,
  remunerationNette: number,
  ca: number,
): StatutResult {
  const S = SASU_EURL_2026;
  const brut = remunerationNette / (1 - S.SASU_TAUX_CHARGES_SALARIALES);
  const chargesPatronales = brut * S.SASU_TAUX_CHARGES_PATRONALES;
  const chargesSalariales = brut * S.SASU_TAUX_CHARGES_SALARIALES;
  const chargesSociales = chargesPatronales + chargesSalariales;
  const coutRemuneration = brut + chargesPatronales;

  const beneficeAvantIS = Math.max(0, resultatBrut - coutRemuneration);
  const is = calculIS(beneficeAvantIS);
  const beneficeApresIS = beneficeAvantIS - is;

  const dividendesBruts = beneficeApresIS;
  const taxeDividendes = dividendesBruts * S.PFU_TOTAL;
  const dividendesNets = dividendesBruts - taxeDividendes;

  const netTotal = remunerationNette + dividendesNets;
  const tauxRetour = ca > 0 ? netTotal / ca : 0;

  return {
    remunerationNette,
    chargesSociales,
    coutRemuneration,
    beneficeAvantIS,
    is,
    beneficeApresIS,
    dividendesBruts,
    taxeDividendes,
    dividendesNets,
    netTotal,
    tauxRetour,
  };
}

function calculerEURL(
  resultatBrut: number,
  remunerationNette: number,
  capitalSocial: number,
  ca: number,
): EurlResult {
  const S = SASU_EURL_2026;
  const cotisationsTNS = remunerationNette * S.EURL_TAUX_COTISATIONS_TNS;
  const chargesSociales = Math.max(
    remunerationNette > 0 ? cotisationsTNS : 0,
    remunerationNette > 0 ? S.EURL_COTISATIONS_MINIMALES : S.EURL_COTISATIONS_MINIMALES,
  );
  const coutRemuneration =
    remunerationNette > 0
      ? remunerationNette + cotisationsTNS
      : S.EURL_COTISATIONS_MINIMALES;

  const beneficeAvantIS = Math.max(0, resultatBrut - coutRemuneration);
  const is = calculIS(beneficeAvantIS);
  const beneficeApresIS = beneficeAvantIS - is;

  const dividendesBruts = beneficeApresIS;
  const seuil = capitalSocial * S.EURL_SEUIL_DIVIDENDES_CAPITAL;

  let taxeDividendes: number;
  if (dividendesBruts <= seuil) {
    taxeDividendes = dividendesBruts * S.PFU_TOTAL;
  } else {
    const taxeSousSeuil = seuil * S.PFU_TOTAL;
    const surplus = dividendesBruts - seuil;
    const cotisationsSurplus = surplus * S.EURL_TAUX_COTISATIONS_TNS;
    const flatTaxSurplus = surplus * S.PFU_TOTAL;
    taxeDividendes = taxeSousSeuil + Math.max(cotisationsSurplus, flatTaxSurplus);
  }
  const dividendesNets = dividendesBruts - taxeDividendes;

  const netTotal = remunerationNette + dividendesNets;
  const tauxRetour = ca > 0 ? netTotal / ca : 0;

  return {
    remunerationNette,
    chargesSociales,
    coutRemuneration,
    beneficeAvantIS,
    is,
    beneficeApresIS,
    dividendesBruts,
    taxeDividendes,
    dividendesNets,
    netTotal,
    tauxRetour,
    seuilDividendesSansCharges: seuil,
  };
}

function scenariosSASU(resultatBrut: number, ca: number): Scenario[] {
  const S = SASU_EURL_2026;
  const maxBrut = resultatBrut / (1 + S.SASU_TAUX_CHARGES_PATRONALES);
  const maxNet = Math.max(0, maxBrut * (1 - S.SASU_TAUX_CHARGES_SALARIALES));
  const s100sal = calculerSASU(resultatBrut, maxNet, ca);
  const s100div = calculerSASU(resultatBrut, 0, ca);
  return [
    {
      label: "100 % salaire",
      remunerationNette: s100sal.remunerationNette,
      dividendesNets: 0,
      netTotal: s100sal.remunerationNette,
    },
    {
      label: "100 % dividendes",
      remunerationNette: 0,
      dividendesNets: s100div.dividendesNets,
      netTotal: s100div.netTotal,
    },
  ];
}

function scenariosEURL(
  resultatBrut: number,
  capitalSocial: number,
  ca: number,
): Scenario[] {
  const S = SASU_EURL_2026;
  const maxNet = Math.max(
    0,
    resultatBrut / (1 + S.EURL_TAUX_COTISATIONS_TNS),
  );
  const s100sal = calculerEURL(resultatBrut, maxNet, capitalSocial, ca);
  const s100div = calculerEURL(resultatBrut, 0, capitalSocial, ca);
  return [
    {
      label: "100 % salaire",
      remunerationNette: s100sal.remunerationNette,
      dividendesNets: 0,
      netTotal: s100sal.remunerationNette,
    },
    {
      label: "100 % dividendes",
      remunerationNette: 0,
      dividendesNets: s100div.dividendesNets,
      netTotal: s100div.netTotal,
    },
  ];
}

export function comparerSasuEurl(inputs: SasuEurlInputs): ComparaisonResult {
  const resultatBrut = Math.max(
    0,
    inputs.caAnnuel - inputs.chargesExploitation,
  );
  const remNette = Math.max(0, inputs.remunerationNette);

  const sasu = calculerSASU(resultatBrut, remNette, inputs.caAnnuel);
  const eurl = calculerEURL(
    resultatBrut,
    remNette,
    inputs.capitalSocial,
    inputs.caAnnuel,
  );

  const ecart = Math.abs(sasu.netTotal - eurl.netTotal);
  const meilleur: "sasu" | "eurl" | "egal" =
    ecart < 10
      ? "egal"
      : sasu.netTotal > eurl.netTotal
        ? "sasu"
        : "eurl";

  const mixSasu: Scenario = {
    label: "Mix actuel",
    remunerationNette: sasu.remunerationNette,
    dividendesNets: sasu.dividendesNets,
    netTotal: sasu.netTotal,
  };
  const mixEurl: Scenario = {
    label: "Mix actuel",
    remunerationNette: eurl.remunerationNette,
    dividendesNets: eurl.dividendesNets,
    netTotal: eurl.netTotal,
  };

  const sSasu = scenariosSASU(resultatBrut, inputs.caAnnuel);
  const sEurl = scenariosEURL(
    resultatBrut,
    inputs.capitalSocial,
    inputs.caAnnuel,
  );

  const scenariosSasuFull = [sSasu[0], mixSasu, sSasu[1]];
  const scenariosEurlFull = [sEurl[0], mixEurl, sEurl[1]];

  const warnings: Warning[] = [];
  const coutMinSasu =
    remNette / (1 - SASU_EURL_2026.SASU_TAUX_CHARGES_SALARIALES) *
    (1 + SASU_EURL_2026.SASU_TAUX_CHARGES_PATRONALES);
  const coutMinEurl =
    remNette * (1 + SASU_EURL_2026.EURL_TAUX_COTISATIONS_TNS);

  if (resultatBrut < coutMinSasu && resultatBrut < coutMinEurl) {
    warnings.push({
      severity: "danger",
      message:
        "Ton CA ne couvre pas cette rémunération. Réduis le salaire ou augmente le CA.",
    });
  }

  if (remNette === 0) {
    warnings.push({
      severity: "warning",
      message:
        "Sans rémunération, tu n'as aucune couverture sociale (maladie, retraite, prévoyance) en SASU. En EURL, des cotisations minimales de 1 200 €/an s'appliquent.",
    });
  }

  if (
    eurl.dividendesBruts > eurl.seuilDividendesSansCharges &&
    eurl.dividendesBruts > 0
  ) {
    warnings.push({
      severity: "warning",
      message: `En EURL, les dividendes dépassant 10 % du capital (${EUR0(eurl.seuilDividendesSansCharges)}) sont soumis aux cotisations TNS. C'est pourquoi les dividendes sont moins avantageux en EURL qu'en SASU.`,
    });
  }

  if (meilleur === "sasu") {
    warnings.push({
      severity: "info",
      message: `La SASU est plus avantageuse dans ton cas (+${EUR0(ecart)} / an) grâce aux dividendes non soumis aux cotisations sociales.`,
    });
  } else if (meilleur === "eurl") {
    warnings.push({
      severity: "info",
      message: `L'EURL est plus avantageuse dans ton cas (+${EUR0(ecart)} / an) grâce aux cotisations TNS plus faibles.`,
    });
  }

  return {
    resultatBrut,
    sasu,
    eurl,
    meilleur,
    ecart,
    scenariosSasu: scenariosSasuFull,
    scenariosEurl: scenariosEurlFull,
    warnings,
  };
}

function EUR0(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}
