# STATUS — état du site

> Référence factuelle de ce qui existe. À relire avant toute tâche qui touche la structure du site, et à mettre à jour à chaque ajout de route.
> **Dernière mise à jour : 19 août 2026.**

## En un coup d'œil

| | |
|---|---|
| Routes publiées | 63 |
| URLs au sitemap | 63 |
| Calculateurs | 10 |
| Domaine | `salairia.com` (le `.fr` renvoie une erreur Vercel 436, non traité) |
| Analytics | Plausible, sans cookie |
| Monétisation | **Non branchée** — liens partenaires encore en placeholder |

## Performance Search Console — 19 août 2026 (92 jours)

**94 clics · 9 083 impressions · CTR 1,03 % · 14 pages servies**

Évolution depuis les corrections du 28 juillet :

| Quinzaine | Impressions | Clics |
|---|---|---|
| début juillet | 683 | 8 |
| fin juillet | 1 644 | 18 |
| début août | **3 723** | **29** |

Les impressions ont été multipliées par 5,5 et le nombre de pages servies est passé de 4 à 14. La position moyenne se dégrade (9,9 → 45,3) : c'est **mécanique**, dix nouvelles pages entrent en position 40-90. Ne pas interpréter comme une régression — suivre les clics et le CTR par page.

**AI Overviews : 1 231 impressions, 13,4 % du site.** `/simulateurs/net-apres-impot` en tire 934 sur 1 473, soit **63 % de ses impressions**. Conséquence : position 1,2 sur « remboursement impot 2026 » pour 374 impressions et 1 clic. Cette page ne convertira pas — ne pas y investir.

**Leçon stratégique mesurée :** `/pouvoir-achat-ville` (9 % d'IA) fait 5,12 % de CTR et 71 clics ; `/net-apres-impot` (63 % d'IA) fait 0,34 % et 5 clics, à position comparable. Les réponses **personnalisées** résistent à l'IA, les réponses **factuelles** non. Orienter les futurs contenus vers « dans MA situation ».

**Bruit de marque :** 406 impressions viennent de recherches « sprintjob », soit 63 % des impressions de la home. Le CTR de 0,93 % de la page d'accueil n'est donc pas un problème de titre.

**Gisement portage : 3 454 impressions (38 % du site) pour 4 clics.** Sous-thèmes mesurés : chômage 620 impr (pos 64), comparatif/avis 757 (pos 33), TJM 533 (pos 90), fiche de paie 260 (pos 48), congés payés 175 (pos 81).

## Trafic (Plausible, 91 jours au 27 juillet 2026)

105 visiteurs uniques, dont 58 via Google. `/simulateurs/pouvoir-achat-ville` concentre 56 visiteurs, soit plus de la moitié — c'est aussi la seule page à ne relever d'aucun cluster prioritaire.

## Routes

### Simulateurs — 9/9
`/simulateurs` (hub) · portage-salarial · tjm-freelance · auto-entrepreneur · salaire-brut-net · sasu-eurl · net-apres-impot · negociation-salariale · pouvoir-achat-ville · ou-se-situe-mon-salaire

### Guides — 27
`/guides` (hub) · portage-salarial · portage-salarial-chomage · conges-payes-portage-salarial · **simulation-tjm-portage-salarial** · **fiche-de-paie-portage-salarial** · **portage-salarial-ou-cdi** · **frais-gestion-portage-salarial** · **frais-professionnels-portage-salarial** · **salaire-president-sasu** · **sasu-chomage-dirigeant** · **dividendes-sasu-ou-salaire** · **auto-entrepreneur-chomage** · **cumul-salarie-auto-entrepreneur** · tjm-freelance · auto-entrepreneur · sasu-eurl · salaire-brut-net

Batch du 23 août 2026 (10 guides calendrier + evergreen) : **remboursement-impot** (slug sans millésime, mis à jour chaque été — répond au cluster GSC « remboursement impot 2026 », 600 impr. en position 1,4 sans page dédiée) · **cfe-auto-entrepreneur** (échéance 15 déc) · **heures-supplementaires** · **indemnite-rupture-conventionnelle** · **salaire-apprenti** · **prime-partage-valeur** (fin du régime de faveur 31 déc 2026) · **13e-mois** (pic de recherche nov-déc) · **smic-2027** · **bareme-impot-2027** · **plafond-securite-sociale-2027** (3 pages d'anticipation : mécanique + valeurs actuelles, à compléter à la publication des décrets/LF mi-déc 2026 et de l'arrêté PASS).

Les 10 guides du batch du 19 août 2026 ciblent les clusters mesurés dans GSC : simulation TJM portage (645 impr, pos 88), fiche de paie (143 impr), portage vs CDI (63 impr dont requalification), plus les angles morts SASU/AE à fort caractère conditionnel (résistants aux AI Overviews). Chrome partagé : `src/components/GuideShell.tsx`.

### Villes — 6 (nouveau, 19 août 2026)
`/villes` (hub) · paris · lyon · marseille · toulouse · bordeaux

Réplication de la formule de la page gagnante (/pouvoir-achat-ville, 76 % des clics du site) : réponse personnalisée-comparative, tous les montants dérivés de cout-vie-villes.json + calculerNetVersBrut + calculerPercentile. Route dynamique `/villes/[ville]` limitée volontairement à 5 villes — les 15 autres restent servies par le simulateur pour éviter le quasi-doublon à faible valeur.

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
| Transports (18 villes hors Paris et Lyon) | avril 2026 | ◻️ ordres de grandeur, impact non matériel |
| Frais du comparateur portage | 28 juillet 2026 | ✅ à jour |
| Fourchettes de négociation | 28 juillet 2026 | ◻️ ancrées sur l'APEC 2025, fourchettes par métier estimées |
| Percentiles de salaires | 28 juillet 2026 | ✅ INSEE 2024, seules les valeurs publiées sont stockées |

## Identité visuelle

Logo SVG : trois barres ascendantes, la plus haute en émeraude (`public/logo-mark.svg`, `src/app/icon.svg`, `src/app/apple-icon.tsx`). Images Open Graph générées par `src/lib/og.tsx` — une par section, héritées par les pages enfants.

## Outils

- `.claude/agents/linkedin-salairia.md` — rédacteur de posts LinkedIn, recalcule tout chiffre depuis les calculateurs
- `.claude/launch.json` — prévisualisation locale
- `src/components/charts/BarChart.tsx` — barres CSS sans dépendance, utilisé dans le guide TJM et l'article d'actualité

## Backlog, par priorité

1. **Transports des 19 villes** — tarifs zonés, arbitrage éditorial requis par réseau
2. **Données négociation (APEC 2024-25) et percentile (INSEE DADS 2023)** à re-sourcer
3. **`salairia.fr`** — hors repo : à rediriger en 301 ou abandonner depuis le dashboard Vercel

**Revolut Business : écarté du comparateur banques pro, volontairement.** Son site
bloque l'accès automatisé (403 sur fetch, timeouts sur navigateur, le 28 juillet 2026)
et les seuls tarifs disponibles proviennent de sources secondaires, dont le blog d'un
concurrent direct. Ajouter une ligne ainsi sourcée affaiblirait un comparatif dont
l'argument est le relevé sur grilles officielles. À reprendre si la page redevient
accessible.

**Frais de portage : 6 sociétés sur 10 ne publient aucune grille tarifaire** (ITG,
ABC Portage, Ad'missions, Cadres en Mission, 2i Portage, OpenWork — vérifié le
28 juillet 2026). Leurs taux affichés sont des estimations de marché, signalées comme
telles sur leurs fiches. Ne pas les présenter comme des tarifs relevés.

Audit des chiffres éditoriaux : **terminé sur les 5 guides** (28 juillet 2026). Quatre
guides sur cinq publiaient des montants contredisant leurs propres calculateurs ; tout est
désormais dérivé des calculateurs et se met à jour au build.

## Ce qui bloque réellement

Aucun de ces items ne débloque le trafic. Le site n'a pas de backlinks. Tant qu'aucun site externe ne le cite, les pages non indexées le resteront. Priorité absolue : lien depuis SprintJob, LinkedIn 3×/semaine, Sourcee en quotidien, et l'étude propriétaire à partir de la base SprintJob. Voir la compétence `seo-salairia` pour la roadmap complète.
