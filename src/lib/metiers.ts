/**
 * Données métier enrichies pour les pages `/metiers/[metier]`.
 *
 * Le JSON ne contient que des fourchettes de brut annuel en k€. Tout le reste
 * — net mensuel, percentile, TJM freelance d'équivalence — est calculé par les
 * simulateurs du site, ce qui garantit qu'une mise à jour des constantes se
 * propage automatiquement à ces 20 pages.
 */

import metiersData from "@/data/salaires-metiers.json";
import { calculerBrutVersNet } from "./calculators/salaire-brut-net";
import { calculerPercentile } from "./calculators/percentile-salaire";
import { findTJMForNetCible } from "./calculators/tjm-freelance";

export type Niveau = "junior" | "confirme" | "senior" | "expert";
export type Zone = "idf" | "province";

export const NIVEAUX: { id: Niveau; label: string; annees: string }[] = [
  { id: "junior", label: "Junior", annees: "0 à 2 ans" },
  { id: "confirme", label: "Confirmé", annees: "3 à 6 ans" },
  { id: "senior", label: "Senior", annees: "7 à 12 ans" },
  { id: "expert", label: "Expert", annees: "12 ans et plus" },
];

interface MetierRaw {
  id: string;
  label: string;
  categorie: string;
  idf: Record<Niveau, [number, number]>;
  province: Record<Niveau, [number, number]>;
}

export const METIERS = metiersData.metiers as unknown as MetierRaw[];
export const ANCRAGE_APEC = metiersData.ancrageApec;

export const getMetier = (slug: string) => METIERS.find((m) => m.id === slug);

/** Milieu de fourchette, en euros bruts annuels. */
export const median = (f: [number, number]) => ((f[0] + f[1]) / 2) * 1_000;

export function netMensuel(brutAnnuel: number): number {
  return calculerBrutVersNet({
    salaire: brutAnnuel,
    mode: "brut-vers-net",
    periodicite: "annuel",
    statut: "cadre",
    tauxPAS: 0,
  }).netAvantImpotMensuel;
}

export function coutEmployeurAnnuel(brutAnnuel: number): number {
  return calculerBrutVersNet({
    salaire: brutAnnuel,
    mode: "brut-vers-net",
    periodicite: "annuel",
    statut: "cadre",
    tauxPAS: 0,
  }).coutEmployeurAnnuel;
}

export function percentile(brutAnnuel: number): number {
  return calculerPercentile({
    salaireMensuelNet: netMensuel(brutAnnuel),
    csp: "Tous",
    age: "Tous",
  }).percentile;
}

/**
 * TJM à facturer en portage salarial pour retrouver le même net annuel.
 * Hypothèse : 18 jours facturés par mois, 150 € de frais pro mensuels —
 * les mêmes que le comparateur salarié/freelance, pour rester cohérent.
 */
export function tjmEquivalent(brutAnnuel: number): number {
  const netAnnuel = netMensuel(brutAnnuel) * 12;
  return findTJMForNetCible(netAnnuel, "portage", {
    joursTravailles: 18,
    fraisProMensuels: 150,
    tauxPAS: 0,
  });
}

/** Les autres métiers de la même catégorie, pour le maillage interne. */
export function memeCategorie(slug: string): MetierRaw[] {
  const m = getMetier(slug);
  if (!m) return [];
  return METIERS.filter((x) => x.categorie === m.categorie && x.id !== slug);
}

/** Slug d'URL lisible : « salaire-developpeur-web ». */
export const slugMetier = (id: string) => id;
