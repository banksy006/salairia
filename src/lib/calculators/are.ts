/**
 * Calcul de l'allocation d'aide au retour à l'emploi (ARE).
 *
 * Sources : Unédic, « Paramètres utiles » ; France Travail, « Comment est
 * calculé le montant de mon allocation ». Vérifié le 15 octobre 2026.
 *
 * Les paramètres ci-dessous sont ceux en vigueur depuis le 1er juillet 2025 :
 * le conseil d'administration de l'Unédic a décidé le 30 juin 2026 de ne pas
 * revaloriser les allocations au 1er juillet 2026, donc de les reconduire.
 *
 * Attention : ce calcul est une estimation. Le montant réel dépend de la
 * période de référence exacte retenue par France Travail, des jours non
 * travaillés, et de votre situation personnelle. Seule France Travail fait foi.
 */

export const ARE_2026 = {
  // France Travail retient le plus avantageux des deux modes de calcul.
  TAUX_PROPORTIONNEL: 0.404,
  PARTIE_FIXE_JOUR: 13.18,
  TAUX_ALTERNATIF: 0.57,
  // Planchers et plafonds exprimés en euros bruts par jour.
  ALLOCATION_MINIMALE_JOUR: 32.13,
  PLAFOND_PART_SJR: 0.75,

  // Conditions d'affiliation. Le seuil primo-entrant a été abaissé pour les
  // fins de contrat intervenues à compter du 1er avril 2026.
  JOURS_TRAVAILLES_REQUIS: 130,
  HEURES_TRAVAILLEES_REQUISES: 910,
  JOURS_REQUIS_PRIMO_ENTRANT: 108,
  HEURES_REQUISES_PRIMO_ENTRANT: 758,
  PERIODE_REFERENCE_MOIS: 24,
  PERIODE_REFERENCE_MOIS_SENIOR: 36,
  // Période de référence de 36 mois à partir de 55 ans à la fin du contrat
  // (57 ans avant le 1er avril 2025 ; 53 ans n'a jamais été le seuil de la
  // période de référence). Source : circulaire Unédic n° 2025-03 du 1er avril
  // 2025 ; fiche Unédic « Durée d'indemnisation », avril 2025. Vérifié le
  // 15 octobre 2026.
  AGE_PERIODE_ALLONGEE: 55,
} as const;

export interface AreResult {
  sjr: number;
  allocationJournaliere: number;
  allocationMensuelle: number;
  modeRetenu: "proportionnel" | "alternatif" | "minimum";
  tauxRemplacement: number;
}

/**
 * @param brutAnnuel salaire brut perçu sur la période de référence (12 mois)
 */
export function calculerAre(brutAnnuel: number): AreResult {
  const brut = Math.max(0, brutAnnuel);
  // Le salaire journalier de référence rapporte le salaire de référence au
  // nombre de jours calendaires de la période, pas aux seuls jours travaillés.
  const sjr = brut / 365;

  const proportionnel = sjr * ARE_2026.TAUX_PROPORTIONNEL + ARE_2026.PARTIE_FIXE_JOUR;
  const alternatif = sjr * ARE_2026.TAUX_ALTERNATIF;

  let allocation = Math.max(proportionnel, alternatif);
  let mode: AreResult["modeRetenu"] =
    proportionnel >= alternatif ? "proportionnel" : "alternatif";

  if (allocation < ARE_2026.ALLOCATION_MINIMALE_JOUR) {
    allocation = ARE_2026.ALLOCATION_MINIMALE_JOUR;
    mode = "minimum";
  }

  const plafond = sjr * ARE_2026.PLAFOND_PART_SJR;
  if (allocation > plafond) allocation = plafond;

  return {
    sjr,
    allocationJournaliere: allocation,
    allocationMensuelle: allocation * 30,
    modeRetenu: mode,
    tauxRemplacement: sjr > 0 ? allocation / sjr : 0,
  };
}
