# STATUS — état du site

> Référence factuelle de ce qui existe. À relire avant toute tâche qui touche la structure du site, et à mettre à jour à chaque ajout de route.
> **Dernière mise à jour : 19 août 2026.**

## En un coup d'œil

| | |
|---|---|
| Routes publiées | 151 |
| URLs au sitemap | 151 |
| Calculateurs | 11 |
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

### Simulateur ajouté le 23 août 2026
`/simulateurs/salarie-ou-freelance` — comparateur CDI vs 4 statuts d'indépendant à taux d'impôt égal, avec TJM d'équivalence par bissection (+25 % de marge conseillée). Lib `src/lib/calculators/salarie-freelance.ts` sans constante propre : réutilise brut/net et TJM. Répond à la FAQ du hub qui disait « aucun simulateur ne fait cette comparaison ».

### Batch du 1er septembre 2026 — 12 guides

**Approfondissement du cluster portage (6)**, qui concentre les impressions non exploitées : **portage-salarial-retraite** (213 impr GSC, aucune page auparavant — le plus gros gisement restant) · **contrat-portage-salarial** (~108 impr sur les variantes CDI/CDD/contrat) · **portage-salarial-etranger** (61, dont « portage salarial japon » à 53) · **requalification-portage-salarial** (37) · **tva-portage-salarial** (28) · **portage-salarial-fonctionnaire** (14, en synergie avec le guide point d'indice).

**Extension au public salarié (6)** : **arret-maladie-salaire** (plafond IJSS abaissé de 1,8 à 1,4 SMIC en avril 2025, max 42,97 €/j depuis juillet 2026) · **retraite-brut-net** (4 taux de CSG selon le RFR, calcul distinct du salaire) · **net-imposable** (CSG non déductible, dérivé de calculerBrutVersNet) · **solde-de-tout-compte** · **indemnite-teletravail** (barèmes URSSAF 2,70 €/j) · **mutuelle-entreprise**.

Dates d'actualisation passées en septembre 2026 sur 34 fichiers, dateModified JSON-LD au 2026-09-01 sur 57. Les dates de vérification des sources et les faits datés (chèques d'août, bulletin d'exemple) restent inchangés.

### Fiches sociétés de portage — 10 (nouveau, 29 août 2026)
`/comparateurs/portage-salarial/[societe]` × 10, générées depuis `societes-portage.json`.

Requêtes de marque mesurées dans GSC (~300 impressions cumulées, positions 15-58) : « abc portage » et variantes ~110 impr, « umalis portage avis » 79, « innoven portage simulation » 52, « cipres » 24, « ventoris » 23, « coq portage » 3 impr et 1 clic en position 17,7. Intentions d'achat = le bas de l'entonnoir qui convertira en affiliation.

Deux règles produit :
1. **Aucune fiche pour une société sans données vérifiées** (umalis, cipres, ventoris, innoven, infoportage, agc ne sont pas dans le JSON — pas de page inventée).
2. **Pas d'avis maison, pas d'AggregateRating** : les notes sont reprises des plateformes tierces, attribuées et datées, avec une mention explicite « Salairia ne collecte pas d'avis ». Le JSON-LD est un `Article`, jamais un `Review`.

Différenciateur : chaque fiche calcule le net réel avec le taux de frais de la société (cas type commun 500 €/j × 18 j) et le compare aux neuf autres. Jump, qui facture un abonnement fixe, est converti en taux équivalent (1,1 % sur 9 000 € de CA) pour rester comparable.

### Salaires par métier — 21 (nouveau, 1er septembre 2026)
`/metiers` (hub) + `/metiers/[metier]` × 20, générées depuis `salaires-metiers.json` via `src/lib/metiers.ts`.

Inspiré de l'analyse du concurrent salerya.fr (742 URLs, dont 273 pages métiers) — mais avec deux angles qu'il n'a pas : la **conversion en net** de chaque fourchette (calculerBrutVersNet, taux cadres) et surtout le **TJM freelance d'équivalence** calculé par bissection (findTJMForNetCible en portage, 18 j/mois, 150 € de frais pro), affiché pour les 4 niveaux avec la marge conseillée de 25 %.

Seules les fourchettes de brut viennent du JSON ; net, percentile INSEE, coût employeur et TJM sont calculés — une mise à jour des constantes se propage donc aux 20 pages. Le disclaimer distingue explicitement les estimations de marché (fourchettes, ancrées APEC) des valeurs calculées.

### Brut en net par montant — 31 (nouveau, 29 août 2026)
`/salaire` (hub) + `/salaire/[montant]` × 30 (19 mensuels de 1 500 à 5 000 €, 11 annuels de 25 000 à 75 000 €).

Déclenché par une anomalie GSC : le site est en **position 1** sur des dizaines de requêtes « X brut en net » (2000 : 18 impr, 1600 : 10, 33000/35000 : 5, plus ~40 requêtes à 1-3 impressions) avec **zéro clic** — aucune page ne répondait à l'intention, seul le simulateur générique remontait. Chaque page affiche la réponse dès le titre et le H1, puis le détail des cotisations, 3 scénarios de PAS, le percentile INSEE et le coût employeur. Liste des montants dans `src/lib/salaire-montants.ts`, tout dérivé de `calculerBrutVersNet`.

Règle produit : sous le plafond de la Sécurité sociale, le net cadre est identique au non-cadre (seule l'APEC à 0,024 % les sépare). La page bascule alors sur une carte unique avec mention explicite — afficher deux montants identiques laisserait croire à un bug, et les FAQ affirmaient un écart inexistant.

### Guides — 39

Batch « calendrier 2027 » du 25 août 2026, déclenché par la validation mesurée de la stratégie d'anticipation (smic-2027 : 30 visiteurs organiques/jour à J+2, première page Google) : **ce-qui-change-1er-janvier-2027** (hub d'agrégation) · **jours-feries-2027** (4 fériés perdus le week-end, jours calculés en code) · **bareme-kilometrique** (slug sans millésime, tableau vérifié BOFiP) · **plafonds-micro-entreprise-2027** (angle : plafonds triennaux figés jusqu'en 2028) · **prime-activite-2027** · **prime-de-noel-2026** · **titres-restaurant** (dérogation courses expire 31/12/2026) · **revalorisation-retraites-2027** (Agirc nov. vs base janv.) · **avance-credit-impot-janvier** (slug sans millésime) · **calendrier-impots-2027**. Estimations 2027 systématiquement présentées comme telles ; pages à compléter aux publications officielles (échéances listées dans chaque page).

### Guides précédents — 27
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
