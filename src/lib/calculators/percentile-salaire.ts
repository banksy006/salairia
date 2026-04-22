/**
 * Calculateur de percentile salarial — données INSEE DADS 2023.
 *
 * Source : INSEE, Déclarations Annuelles de Données Sociales (DADS),
 * salaires nets mensuels temps plein. Consulté avril 2026.
 *
 * Attention : ces données sont des moyennes nationales. Votre situation
 * réelle dépend de votre secteur, convention collective et localisation.
 */

import distributionData from "@/data/distribution-salaires.json";

export type CSP =
  | "Tous"
  | "Cadres"
  | "Professions intermédiaires"
  | "Employés"
  | "Ouvriers";

export type TrancheAge =
  | "Tous"
  | "18-25 ans"
  | "26-35 ans"
  | "36-45 ans"
  | "46-55 ans"
  | "56 ans et +";

export const CSP_OPTIONS: readonly CSP[] = [
  "Tous",
  "Cadres",
  "Professions intermédiaires",
  "Employés",
  "Ouvriers",
];

export const AGE_OPTIONS: readonly TrancheAge[] = [
  "Tous",
  "18-25 ans",
  "26-35 ans",
  "36-45 ans",
  "46-55 ans",
  "56 ans et +",
];

interface Percentiles {
  P10: number;
  P25: number;
  P50: number;
  P75: number;
  P90: number;
  P95?: number;
  P99?: number;
}

export interface PercentileInputs {
  salaireMensuelNet: number;
  csp: CSP;
  age: TrancheAge;
}

export interface PercentileResult {
  percentile: number;
  label: string;
  mediane: number;
  ecartMediane: number;
  distribution: Percentiles;
}

function getDistribution(csp: CSP, age: TrancheAge): Percentiles {
  if (csp !== "Tous") {
    const d = distributionData.parCSP[csp as keyof typeof distributionData.parCSP];
    if (d) return d as Percentiles;
  }
  if (age !== "Tous") {
    const d = distributionData.parAge[age as keyof typeof distributionData.parAge];
    if (d) return d as Percentiles;
  }
  return distributionData.general as Percentiles;
}

function interpolatePercentile(salary: number, dist: Percentiles): number {
  const points: [number, number][] = [
    [0, dist.P10 * 0.5],
    [10, dist.P10],
    [25, dist.P25],
    [50, dist.P50],
    [75, dist.P75],
    [90, dist.P90],
  ];
  if (dist.P95) points.push([95, dist.P95]);
  if (dist.P99) points.push([99, dist.P99]);
  points.push([100, (dist.P99 ?? dist.P90) * 1.5]);

  if (salary <= points[0][1]) return 1;
  if (salary >= points[points.length - 1][1]) return 99;

  for (let i = 1; i < points.length; i++) {
    const [pPrev, sPrev] = points[i - 1];
    const [pCurr, sCurr] = points[i];
    if (salary <= sCurr) {
      const ratio = (salary - sPrev) / (sCurr - sPrev);
      return Math.round(pPrev + ratio * (pCurr - pPrev));
    }
  }
  return 99;
}

function getLabel(percentile: number): string {
  if (percentile <= 10) return "Parmi les 10 % les moins élevés";
  if (percentile <= 25) return "En dessous de la médiane";
  if (percentile <= 40) return "Légèrement sous la médiane";
  if (percentile <= 60) return "Autour de la médiane";
  if (percentile <= 75) return "Au-dessus de la médiane";
  if (percentile <= 90) return "Parmi les 25 % les plus élevés";
  if (percentile <= 95) return "Parmi les 10 % les plus élevés";
  return "Parmi les 5 % les plus élevés";
}

export function calculerPercentile(
  inputs: PercentileInputs,
): PercentileResult {
  const dist = getDistribution(inputs.csp, inputs.age);
  const sal = Math.max(0, inputs.salaireMensuelNet);
  const percentile = interpolatePercentile(sal, dist);

  return {
    percentile,
    label: getLabel(percentile),
    mediane: dist.P50,
    ecartMediane: sal - dist.P50,
    distribution: dist,
  };
}
