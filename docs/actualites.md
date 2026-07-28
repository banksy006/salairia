# Rubrique Actualités — processus éditorial

## Ce que c'est, ce que ce n'est pas

**C'est** une veille réglementaire : chaque article documente un **changement officiel** (taux, plafond, barème, règle) avec sa date d'effet, sa source et son impact chiffré.

**Ce n'est pas** un blog. Pas de listicles, pas de « 5 conseils pour négocier », pas de tribune d'opinion. Ces formats sont absorbés par les AI Overviews, n'apportent aucun lien entrant, et diluent l'autorité que les guides et simulateurs construisent.

Le test avant d'écrire : *est-ce qu'un journaliste ou un freelance pourrait citer cet article comme source ?* Si non, ne pas publier.

## Ce qui déclenche un article

Par ordre de valeur :

1. **Revalorisation du SMIC** (janvier, et toute revalorisation en cours d'année)
2. **Loi de finances** — barèmes IR, taux neutre du PAS, IS
3. **PLFSS** — taux de cotisations, PASS, plafonds micro
4. **Réforme d'un statut** — micro-entreprise, portage, TNS
5. **Décision URSSAF / BOSS** modifiant une assiette ou un taux

Une bonne source de veille : les pages « actualités » d'urssaf.fr, boss.gouv.fr, entreprendre.service-public.fr et les publications BOFiP.

## Règle absolue sur les chiffres

Identique au reste du site (voir `docs/GUARDRAILS.md`) : **aucun montant écrit à la main**. Chaque chiffre cité doit être calculé par un calculateur de `src/lib/calculators/`, importé directement dans la page de l'article — qui est un Server Component, donc peut appeler les calculateurs au build.

L'article `smic-juin-2026-et-bareme-pas-mai-2026` sert de modèle : il importe `calculerBrutVersNet` et `getTauxNeutre`, et tous ses montants sont dérivés, jamais saisis.

Corollaire important : quand un taux est corrigé dans un calculateur, **les articles se mettent à jour tout seuls** au prochain build. C'est la raison d'être de cette contrainte.

## Étapes de publication

1. **Vérifier la source officielle** — Légifrance pour le texte, Urssaf/BOFiP pour l'interprétation. Deux sources concordantes si le chiffre est structurant.
2. **Mettre à jour la constante** dans le calculateur concerné, avec la source en commentaire au-dessus.
3. **Écrire l'article** en important le calculateur pour tous les montants.
4. **Ajouter l'entrée** dans `src/data/actualites.json` (slug, titre, chapô, date, catégorie, sources, liens internes).
5. **Ajouter les 2 URL au sitemap** (`src/app/sitemap.ts`) — l'article et, la première fois, le hub.
6. **`npm run build` et `npm run lint`** avant push.
7. **Demander l'indexation** dans Search Console : un article d'actualité perd sa valeur s'il est indexé trois semaines plus tard.

## Rythme

Pas de calendrier fixe. Un article quand il y a un vrai changement — probablement 6 à 10 par an compte tenu du calendrier réglementaire français, avec des pics en janvier (loi de finances + SMIC) et à l'automne (PLFSS).

Publier à vide pour « tenir un rythme » est contre-productif : mieux vaut trois articles cités que vingt ignorés.

## Réutilisation

Chaque article est un angle LinkedIn immédiat — c'est même le meilleur format pour l'agent `linkedin-salairia`, puisque les chiffres sont déjà vérifiés et sourcés. Publier l'article, puis le post, en renvoyant vers l'article.
