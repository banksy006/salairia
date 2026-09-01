/**
 * Montants de salaire ouvrant une page dédiée « X € brut en net ».
 *
 * La liste n'est pas arbitraire : elle reprend les montants pour lesquels
 * Search Console montre déjà des impressions sur salairia.com (souvent en
 * position 1), complétés des paliers ronds voisins que les internautes
 * tapent naturellement. Convention : un montant < 10 000 € est mensuel,
 * au-delà il est annuel — c'est ainsi que les requêtes sont formulées.
 */

export const MONTANTS_MENSUELS: readonly number[] = [
  1_500, 1_600, 1_700, 1_800, 1_900, 2_000, 2_100, 2_200, 2_300, 2_400,
  2_500, 2_600, 2_700, 2_800, 2_900, 3_000, 3_500, 4_000, 5_000,
];

export const MONTANTS_ANNUELS: readonly number[] = [
  25_000, 28_000, 30_000, 32_000, 35_000, 38_000, 40_000, 45_000, 50_000,
  60_000, 75_000,
];

export const SEUIL_ANNUEL = 10_000;

export const TOUS_MONTANTS: number[] = [
  ...MONTANTS_MENSUELS,
  ...MONTANTS_ANNUELS,
];

export const estAnnuel = (montant: number) => montant >= SEUIL_ANNUEL;

export const slugMontant = (montant: number) => `${montant}-euros-brut-en-net`;

export function parseSlugMontant(slug: string): number | null {
  const m = /^(\d+)-euros-brut-en-net$/.exec(slug);
  if (!m) return null;
  const n = Number(m[1]);
  return TOUS_MONTANTS.includes(n) ? n : null;
}

/** Les deux montants voisins, pour le maillage entre pages. */
export function voisins(montant: number): number[] {
  const liste = estAnnuel(montant)
    ? [...MONTANTS_ANNUELS]
    : [...MONTANTS_MENSUELS];
  const i = liste.indexOf(montant);
  return [liste[i - 1], liste[i + 1]].filter(
    (v): v is number => typeof v === "number",
  );
}
