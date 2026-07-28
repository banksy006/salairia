/**
 * Estimateur de fourchette salariale par métier.
 *
 * Ancrage vérifié : APEC, Baromètre 2025 de la rémunération des cadres
 * (enquête juin 2025, 26 000 cadres) — médiane 55 k€ brut annuel, 80 % des
 * cadres entre 38 et 95 k€. Vérifié le 28 juillet 2026.
 *
 * Les fourchettes par métier sont en revanche des ESTIMATIONS de marché
 * recoupées, pas des données APEC par métier : l'APEC publie ses grilles dans
 * une étude non exploitable automatiquement. Ne pas les présenter comme un
 * référentiel officiel.
 *
 * Attention : ces fourchettes sont des moyennes de marché. Votre
 * salaire réel dépend de votre entreprise, secteur, compétences
 * spécifiques et négociation.
 */

import metiersData from "@/data/salaires-metiers.json";

export type Experience = "junior" | "confirme" | "senior" | "expert";
export type Region = "idf" | "province";

export const EXPERIENCE_OPTIONS: readonly {
  value: Experience;
  label: string;
}[] = [
  { value: "junior", label: "0-2 ans (Junior)" },
  { value: "confirme", label: "3-5 ans (Confirmé)" },
  { value: "senior", label: "6-10 ans (Senior)" },
  { value: "expert", label: "10+ ans (Expert)" },
];

export const REGION_OPTIONS: readonly { value: Region; label: string }[] = [
  { value: "idf", label: "Île-de-France" },
  { value: "province", label: "Province" },
];

export interface MetierEntry {
  id: string;
  label: string;
  categorie: string;
}

export function getMetiersList(): MetierEntry[] {
  return metiersData.metiers.map((m) => ({
    id: m.id,
    label: m.label,
    categorie: m.categorie,
  }));
}

export interface NegociationInputs {
  metierId: string;
  experience: Experience;
  region: Region;
  salaireActuel: number;
}

export interface NegociationResult {
  metierLabel: string;
  fourchette: [number, number];
  mediane: number;
  salaireActuel: number;
  position: "sous" | "dans" | "au-dessus";
  margeNego: number;
  ecartMediane: number;
}

export function calculerNegociation(
  inputs: NegociationInputs,
): NegociationResult {
  const metier = metiersData.metiers.find((m) => m.id === inputs.metierId);
  if (!metier) {
    return {
      metierLabel: "Métier inconnu",
      fourchette: [0, 0],
      mediane: 0,
      salaireActuel: inputs.salaireActuel,
      position: "dans",
      margeNego: 0,
      ecartMediane: 0,
    };
  }

  const regionData =
    inputs.region === "idf" ? metier.idf : metier.province;
  const range = regionData[inputs.experience] as [number, number];
  const low = range[0] * 1000;
  const high = range[1] * 1000;
  const mediane = (low + high) / 2;
  const sal = inputs.salaireActuel;

  let position: "sous" | "dans" | "au-dessus";
  if (sal < low) position = "sous";
  else if (sal > high) position = "au-dessus";
  else position = "dans";

  const margeNego = Math.max(0, high - sal);

  return {
    metierLabel: metier.label,
    fourchette: [low, high],
    mediane,
    salaireActuel: sal,
    position,
    margeNego,
    ecartMediane: sal - mediane,
  };
}
