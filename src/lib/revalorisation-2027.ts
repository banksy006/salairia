/**
 * Coefficient de revalorisation des pensions de base et de l'ASPA au
 * 1er janvier 2027, tel que le fixe la règle légale (art. L161-25 et
 * L161-23-1 du Code de la sécurité sociale) : évolution de la moyenne des
 * douze derniers indices mensuels des prix à la consommation hors tabac,
 * rapportée à la moyenne des douze mois précédents.
 *
 * Source des indices : INSEE, série 011814056 (IPC base 2025, ensemble des
 * ménages, France, ensemble hors tabac), lue le 16 novembre 2026 via l'API
 * BDM après la publication définitive de l'indice d'octobre 2026 (Informations
 * rapides n° 271, 13 novembre 2026).
 *
 * C'est un CALCUL Salairia appliquant la règle légale, pas le coefficient
 * officiel : la CNAV le publie par circulaire, et le PLFSS 2027 en cours de
 * vote prévoit de n'appliquer ce coefficient qu'aux petites pensions.
 */
const INDICES_HORS_TABAC: Record<string, number> = {
  "2024-11": 99.03, "2024-12": 99.22, "2025-01": 99.32, "2025-02": 99.33,
  "2025-03": 99.52, "2025-04": 100.09, "2025-05": 99.96, "2025-06": 100.35,
  "2025-07": 100.56, "2025-08": 100.99, "2025-09": 99.99, "2025-10": 100.06,
  "2025-11": 99.87, "2025-12": 99.95, "2026-01": 99.57, "2026-02": 100.2,
  "2026-03": 101.18, "2026-04": 102.24, "2026-05": 102.37, "2026-06": 102.09,
  "2026-07": 102.67, "2026-08": 103.35, "2026-09": 103.07, "2026-10": 103.46,
};

const mois = Object.keys(INDICES_HORS_TABAC).sort();
const moyenne = (m: string[]) => m.reduce((s, k) => s + INDICES_HORS_TABAC[k], 0) / m.length;

// Arrondi au millième, comme les coefficients publiés (1,009 en 2026).
export const COEF_REVALO_2027 = Math.round((moyenne(mois.slice(12)) / moyenne(mois.slice(0, 12))) * 1000) / 1000;
export const TAUX_REVALO_2027 = Math.round((COEF_REVALO_2027 - 1) * 1000) / 1000;
// Glissement sur un an d'octobre 2026, celui que cite la presse : ce n'est
// pas lui qui fixe la revalorisation.
export const GLISSEMENT_OCTOBRE_2026 = 0.034;
export const DATE_PUBLICATION_INSEE = "13 novembre 2026";
