# GUARDRAILS.md — Règles bloquantes YMYL et publication

Ce fichier définit les règles qui **bloquent** une action. En cas de tension entre une règle ici et une instruction du PDG : tu stop et tu poses la question avant d'agir.

## Pourquoi ces règles existent

Salairia est un site YMYL (Your Money Your Life). Google applique un standard plus strict sur l'EEAT pour les sites qui parlent d'argent. Un taux arrondi "pour faire propre", un chiffre estimé sans calcul, un warning supprimé "pour simplifier" — ce sont les trois façons classiques de faire dérailler un site YMYL en 6 mois. Ces règles empêchent ça.

---

## Règle 1 — Validation des chiffres publiés

Tout chiffre affiché sur une page publique (guide, simulateur, comparateur, home, hub) doit satisfaire **les trois conditions** :

1. **Sortir d'un calculator** (`src/lib/calculators/*.ts`) OU d'une source officielle citée en commentaire JSX
2. **Être reproductible** : on retrouve le chiffre en exécutant le calculator avec les paramètres documentés
3. **Si c'est un exemple illustratif**, les paramètres sont affichés : "TJM 500 €, 18 jours, frais gestion 8 %"

**Procédure bloquante avant publication d'un contenu chiffré :**
- Lister au PDG tous les chiffres affichés sur la page
- Indiquer la source de chaque chiffre (calculator + params, ou URL officielle)
- Si un chiffre est une estimation/arrondi, le dire explicitement
- Attendre validation avant push

**Exemple de bonne pratique dans le code :**
```tsx
// Calculé via calculerPortage({ tjm: 500, joursTravailles: 18, tauxFraisGestion: 8, ... })
const exempleNet = 3681; // et non "environ 3 700" ou "~3 721"
```

---

## Règle 2 — Constantes de calcul

Les constantes dans `src/lib/calculators/` (PASS, taux URSSAF, plafonds CA, etc.) sont le cœur YMYL du site. Elles évoluent chaque année.

**Pour modifier ou ajouter une constante :**
1. Source officielle citée **au-dessus** de la constante en commentaire, avec URL + date de consultation
2. Nom de la constante reflète l'année : en 2027, c'est `PORTAGE_2027`, pas un override de `PORTAGE_2026`
3. Commit dédié : `fix(calc): update [constant] — source [URSSAF/BOSS/...]`, pas mélangé à autre chose

**Interdits :**
- Arrondir pour "faire plus lisible" (25,6 % reste 25,6 %, pas 25 %)
- Commenter/désactiver une constante
- Modifier une constante via un script bulk

---

## Règle 3 — Rythme de publication

Phase actuelle : nouveau domaine, construction d'autorité (4-6 premiers mois).

**Limites hebdomadaires par défaut :**

| Type de contenu | Max par session | Max par semaine |
|---|---|---|
| Guide pilier / page simulateur / comparateur | 3 | 10 |
| Pages pSEO templatisées (phase 2 seulement) | 50 | 150 |

**Override** : le PDG peut autoriser un push plus large en le disant explicitement dans son message. Sans cet OK, on respecte les limites.

**Raison** : Google observe le rythme de publication sur les nouveaux domaines. Un passage de 10 à 150 pages en 48h sur un domaine < 6 mois déclenche un signal "content farm" et ralentit l'indexation du site entier.

---

## Règle 4 — Checklist pré-publication par page

Avant de dire "c'est prêt", vérifier que la page a :

### Technique
- [ ] `export const metadata` complet : title ≤ 60 caractères, description 140-160 caractères, canonical, openGraph
- [ ] JSON-LD : au minimum `BreadcrumbList` + schéma pertinent (`Article`, `FAQPage`, `SoftwareApplication`)
- [ ] Breadcrumb visuel en haut de page
- [ ] 2+ liens internes via `next/link` (pas de `<a href>` interne)
- [ ] Apostrophes échappées (`&apos;`)
- [ ] Pas de `console.log`, pas de `any` sans commentaire
- [ ] Nouvelle URL ajoutée dans `src/app/sitemap.ts`

### Contenu YMYL
- [ ] H1 unique et clair (1 seul par page)
- [ ] Hiérarchie H2/H3 cohérente
- [ ] Date de mise à jour visible (format "avril 2026")
- [ ] Section "Sources" avec 2+ liens officiels (URSSAF, BOSS, Legifrance, INSEE, DARES)
- [ ] Disclaimer "calculs indicatifs" présent si chiffres financiers affichés
- [ ] Pas de promesse absolue ("vous gagnerez X") — toujours conditionnel ("vous pourriez", "estimation")
- [ ] Signature fondateur + lien `/a-propos` sur les guides longs

### Build
- [ ] `npm run build` → 0 erreur, 0 warning bloquant
- [ ] `npm run lint` → clean

---

## Règle 5 — Affiliation et neutralité

Le modèle économique de Salairia repose sur l'affiliation. Cela ne doit pas corrompre le contenu.

**Règles :**
- Tout lien partenaire (Qonto, Indy, Legalstart, sociétés de portage…) doit être **identifié visuellement** comme tel : mention "lien partenaire", "affiliation", ou équivalent
- Les classements dans les comparateurs sont basés sur critères objectifs (frais, services, transparence), **jamais** sur le taux de commission
- Le texte éditorial ne peut pas dire "le meilleur" sans nuance factuelle derrière
- Pattern Wirecutter / Selectra : l'affiliation finance le projet, elle ne modifie pas l'ordre

**Interdit** : revendiquer "aucune société ne nous finance" ou équivalent. La formule correcte est "comparatifs indépendants" ou "classement basé sur critères objectifs".

---

## Règle 6 — Red flags STOP

Dans ces situations, tu n'avances pas, tu remontes au PDG :

- Tu dois modifier une constante 2026 sans source officielle sous les yeux
- Tu dois écrire un chiffre public dont tu ne peux pas retracer l'origine
- Tu dois supprimer un warning, un disclaimer, ou un lien vers `/methodologie`
- Le build casse de façon inattendue après une modif qui semblait anodine
- Le PDG te demande quelque chose qui enfreint une règle ci-dessus
- Tu vois un commentaire `TODO`/`FIXME`/`temporaire` dans le code existant et tu n'es pas sûr de pouvoir toucher

Dans ces cas : **tu ne continues pas "pour voir"**, tu arrêtes et tu poses la question.

---

## Rappel : esprit de ces règles

Ces règles ne sont pas là pour ralentir — elles sont là pour que le rythme **tienne 12 mois** au lieu de 3. Un site YMYL sans garde-fous se désindexe silencieusement ; un site avec garde-fous grandit en continu.
