# STATUS — état du site

> Référence factuelle de ce qui existe. À relire avant toute tâche qui touche la structure du site, et à mettre à jour à chaque ajout de route.
> **Dernière mise à jour : 28 juillet 2026.**

## En un coup d'œil

| | |
|---|---|
| Routes publiées | 32 |
| URLs au sitemap | 32 |
| Calculateurs | 9 |
| Domaine | `salairia.com` (le `.fr` renvoie une erreur Vercel 436, non traité) |
| Analytics | Plausible, sans cookie |
| Monétisation | **Non branchée** — liens partenaires encore en placeholder |

## Indexation (Search Console, 24 juillet 2026)

- **4 pages indexées** sur 23 alors connues : `/`, `/simulateurs/net-apres-impot`, `/simulateurs/pouvoir-achat-ville`, `/guides/portage-salarial`
- **17 pages** en « Détectée, actuellement non indexée »
- 3 URLs en « page avec redirection » : variantes `http://` et `www` de la home, redirections 301 normales — **rien à corriger**
- Sitemap soumis dans GSC le 28 juillet 2026

**Checkpoint M3 de la roadmap : ROUGE sur les deux critères** (17,4 % de pages indexées pour un seuil de 30 %, ~105 visites pour un seuil de 300). L'audit technique prescrit a été réalisé le 27 juillet : rendu serveur, canonicals, sitemap, robots, tout est propre. Le blocage est l'absence d'autorité externe, pas la technique — ne pas re-auditer.

## Trafic (Plausible, 91 jours au 27 juillet 2026)

105 visiteurs uniques, dont 58 via Google. `/simulateurs/pouvoir-achat-ville` concentre 56 visiteurs, soit plus de la moitié — c'est aussi la seule page à ne relever d'aucun cluster prioritaire.

## Routes

### Simulateurs — 9/9
`/simulateurs` (hub) · portage-salarial · tjm-freelance · auto-entrepreneur · salaire-brut-net · sasu-eurl · net-apres-impot · negociation-salariale · pouvoir-achat-ville · ou-se-situe-mon-salaire

### Guides — 5
`/guides` (hub) · portage-salarial · tjm-freelance · auto-entrepreneur · sasu-eurl · salaire-brut-net

### Comparateurs — 4 (tous disponibles)
`/comparateurs` (hub)
- **portage-salarial** — 10 sociétés, frais relevés avril 2026 ⚠️
- **banques-pro** — 5 comptes, offres d'entrée, juillet 2026
- **comptabilite** — 5 solutions, séparées en outils autonomes / cabinets, juillet 2026
- **creation-societe** — 5 plateformes, honoraires + frais obligatoires de 246,86 €, juillet 2026

### Actualités — 3
`/actualites` (hub)
- smic-juin-2026-et-bareme-pas-mai-2026
- cotisations-auto-entrepreneur-hausse-2026
- acre-2026-exoneration-reduite-delai-60-jours

### Institutionnel et légal
`/a-propos` · `/methodologie` · `/contact` · `/mentions-legales` · `/politique-confidentialite` · `/politique-cookies`

## Fraîcheur des données

| Jeu de données | Dernière vérification | État |
|---|---|---|
| Constantes fiscales (URSSAF, IS, PASS, PAS, SMIC) | 27 juillet 2026 | ✅ à jour |
| Loyers T2 des 20 villes (MeilleursAgents) | 1er juillet 2026 | ✅ à jour |
| Tarifs banques pro | 28 juillet 2026 | ✅ à jour |
| Tarifs comptabilité | 28 juillet 2026 | ✅ à jour |
| Tarifs création de société | 28 juillet 2026 | ✅ à jour |
| Tarif Navigo | janvier 2026 | ✅ à jour |
| **Transports des 19 autres villes** | avril 2026 | ⚠️ à revalider |
| **Frais du comparateur portage** | avril 2026 | ⚠️ à revalider |
| **Fourchettes de négociation (APEC)** | 2024-2025 | ⚠️ à revalider |
| **Percentiles INSEE DADS** | 2023 | ⚠️ à revalider |

## Identité visuelle

Logo SVG : trois barres ascendantes, la plus haute en émeraude (`public/logo-mark.svg`, `src/app/icon.svg`, `src/app/apple-icon.tsx`). Images Open Graph générées par `src/lib/og.tsx` — une par section, héritées par les pages enfants.

## Outils

- `.claude/agents/linkedin-salairia.md` — rédacteur de posts LinkedIn, recalcule tout chiffre depuis les calculateurs
- `.claude/launch.json` — prévisualisation locale
- `src/components/charts/BarChart.tsx` — barres CSS sans dépendance, utilisé dans le guide TJM et l'article d'actualité

## Backlog, par priorité

1. **Frais du comparateur portage** — 10 sociétés, données d'avril, le plus ancien jeu restant
2. **Transports des 19 villes** — tarifs zonés, arbitrage éditorial requis par réseau
3. **Revolut Business** à ajouter au comparateur banques pro
4. **Données négociation (APEC 2024-25) et percentile (INSEE DADS 2023)** à re-sourcer
5. **`salairia.fr`** — hors repo : à rediriger en 301 ou abandonner depuis le dashboard Vercel

Audit des chiffres éditoriaux : **terminé sur les 5 guides** (28 juillet 2026). Quatre
guides sur cinq publiaient des montants contredisant leurs propres calculateurs ; tout est
désormais dérivé des calculateurs et se met à jour au build.

## Ce qui bloque réellement

Aucun de ces items ne débloque le trafic. Le site n'a pas de backlinks. Tant qu'aucun site externe ne le cite, les pages non indexées le resteront. Priorité absolue : lien depuis SprintJob, LinkedIn 3×/semaine, Sourcee en quotidien, et l'étude propriétaire à partir de la base SprintJob. Voir la compétence `seo-salairia` pour la roadmap complète.
