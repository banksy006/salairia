import { SALAIRE_2026, calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";

/**
 * Hausse du SMIC annoncée pour le 1er décembre 2026.
 *
 * Source : annonce du ministre du Travail, Jean-Pierre Farandou, le 9 novembre
 * 2026 à l'issue de la conférence sociale de Matignon (franceinfo, Business
 * France, Hellowork du 9 novembre 2026). Seul le taux de +1,6 % est annoncé.
 *
 * Le décret n'était PAS publié au Journal officiel le 11 novembre 2026 : les
 * montants ci-dessous sont donc CALCULÉS (taux horaire en vigueur × 1,016,
 * arrondi au centime), pas officiels. `SALAIRE_2026.SMIC_MENSUEL_BRUT` n'est
 * volontairement pas modifié : il reste le SMIC en vigueur jusqu'au 30 novembre
 * et ne changera qu'avec le décret sous les yeux.
 *
 * À la parution du décret : passer `DECRET_PUBLIE` à true, remplacer le taux
 * horaire calculé par le taux officiel, mettre à jour `SALAIRE_2026`, puis
 * relire les pages qui importent ce fichier.
 */
export const SMIC_DEC_2026 = {
  HAUSSE: 0.016,
  DATE_ANNONCE: "2026-11-09",
  DATE_EFFET: "2026-12-01",
  DECRET_PUBLIE: false,
  // Arrêté du 22 mai 2026 : 12,31 €/h au 1er juin 2026.
  HORAIRE_EN_VIGUEUR: 12.31,
  // Valeur au 1er janvier 2026 : 12,02 €/h, soit 1 823,03 €/mois (rappelée dans
  // salaire-brut-net.ts et dans l'arrêté du 22 mai 2026).
  HORAIRE_JANVIER_2026: 12.02,
} as const;

// Durée légale mensualisée : 35 h × 52 semaines / 12 mois. C'est ce calcul,
// et non 151,67 arrondi, qui donne le mensuel officiel (12,31 → 1 867,02 €).
const HEURES_MENSUELLES = (35 * 52) / 12;
const HEURES_ANNUELLES = 35 * 52;
const centime = (x: number) => Math.round(x * 100) / 100;

const net = (brut: number) =>
  calculerBrutVersNet({ salaire: brut, mode: "brut-vers-net", periodicite: "mensuel", statut: "non-cadre", tauxPAS: 0 })
    .netAvantImpotMensuel;

function niveau(horaire: number) {
  const mensuel = centime(horaire * HEURES_MENSUELLES);
  return { horaire, mensuel, annuel: centime(horaire * HEURES_ANNUELLES), net: net(mensuel) };
}

export const smicJanvier2026 = niveau(SMIC_DEC_2026.HORAIRE_JANVIER_2026);
export const smicEnVigueur = { ...niveau(SMIC_DEC_2026.HORAIRE_EN_VIGUEUR), mensuel: SALAIRE_2026.SMIC_MENSUEL_BRUT, net: net(SALAIRE_2026.SMIC_MENSUEL_BRUT) };
export const smicDecembre2026 = niveau(centime(SMIC_DEC_2026.HORAIRE_EN_VIGUEUR * (1 + SMIC_DEC_2026.HAUSSE)));

export const gainSmicDecembre = {
  horaire: centime(smicDecembre2026.horaire - smicEnVigueur.horaire),
  brutMensuel: centime(smicDecembre2026.mensuel - smicEnVigueur.mensuel),
  netMensuel: smicDecembre2026.net - smicEnVigueur.net,
  netAnnuel: (smicDecembre2026.net - smicEnVigueur.net) * 12,
  // Progression du taux horaire entre le 1er janvier et le 1er décembre 2026.
  pctDepuisJanvier: (smicDecembre2026.horaire / smicJanvier2026.horaire - 1) * 100,
};
