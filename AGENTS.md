<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Playbook d'exécution Salairia

Ce fichier décrit **ce que tu fais et ne fais pas** quand tu travailles sur Salairia. À lire avant CLAUDE.md, à chaque tâche.

## Priorité des lectures

1. **AGENTS.md** (ce fichier) — règles opérationnelles
2. **docs/GUARDRAILS.md** — règles YMYL et publication (**bloquantes**)
3. **CLAUDE.md** — contexte projet, conventions code, charte graphique, pattern V4
4. **docs/STATUS.md** — état du site (référence, pas besoin à chaque tâche)

## Règles hard — tu ne les enfreins jamais

### YMYL — données chiffrées
- Aucune modification d'un taux, plafond ou pourcentage dans `src/lib/calculators/*.ts` sans source officielle (URSSAF, BOSS, Legifrance, INSEE, DARES) citée en commentaire **au-dessus** de la constante
- Aucun chiffre généré dans le contenu éditorial (guides, pages) qui ne sort pas d'un appel au calculator. Si un guide affiche "pour TJM 500€ → net 3 681€", ce chiffre doit venir de `calculerPortage(...)` avec paramètres documentés, pas d'une approximation
- Aucune suppression de warning existant (border-amber, AlertTriangleIcon, disclaimer "calculs indicatifs") même pour "simplifier"

### Publication
- Maximum 3 pages YMYL publiées en une session sans validation explicite du PDG
- Aucun contenu thin (< 1 500 mots pour un guide, < 800 mots de contenu éditorial pour une page simulateur hors UI)
- Aucune page sans : metadata Next.js complète, JSON-LD, breadcrumb, canonical, 2+ liens internes, 2+ sources officielles si YMYL

### Git
- Travail direct sur `main` (projet solo, pas de PR)
- Commits au format `type: description` (feat/fix/docs/refactor/style/chore)
- `npm run build` + `npm run lint` passent avant chaque push
- Pas de `git push --force`, pas de `git reset --hard` sans demande explicite

## Workflow par défaut (chaque tâche)

### Avant
1. Lis `docs/GUARDRAILS.md`
2. Si la tâche touche un simulateur, lis `docs/simulators/<nom>.md` s'il existe
3. Vérifie le pattern V4 à respecter (CLAUDE.md section "Décisions UX/UI")
4. Si nouvelles constantes nécessaires, crée le calculator AVANT la page

### Pendant
- Server Component par défaut, `"use client"` uniquement si état/événements/API navigateur
- Apostrophes françaises JSX : `&apos;`
- Pas de `any` non justifié
- Pas d'abstraction prématurée (3 lignes répétées valent mieux qu'un helper)

### Avant de push
1. `npm run build` → clean
2. `npm run lint` → clean
3. Récap au PDG avec : routes créées/modifiées, diff en lignes, points d'attention, **chiffres affichés + leur source de calcul**
4. Attendre feu vert avant `git push`

## Ce que tu fais sans demander

- Créer des fichiers dans `src/`, `docs/`, `scripts/`, `public/`
- Lancer `npm run dev`, `npm run build`, `npm run lint`
- Lire n'importe quel fichier du repo
- Lire la doc Next.js dans `node_modules/next/dist/docs/`
- Fixer bugs TypeScript et ESLint

## Ce que tu NE fais PAS sans demander

- Installer une nouvelle dépendance npm
- Modifier `package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`
- Modifier une constante `*_2026` dans un calculator
- Supprimer un fichier
- Modifier un schéma JSON-LD sur une page existante
- Modifier la charte graphique (`globals.css`)
- Créer plus de 3 pages YMYL dans la même session

## Scripts npm

```bash
npm run dev              # Dev server localhost:3000
npm run build            # Build prod (lancer avant chaque push)
npm run lint             # ESLint
npm run seo:health       # [À créer] Audit Search Console
npm run validate:consts  # [À créer] Vérif constantes vs sources
```

## Red flags — tu stop et tu remontes

- Tu dois modifier une constante 2026 sans source sous les yeux
- Tu dois écrire un chiffre public dont tu ne peux pas retracer l'origine
- Le build casse après une modif qui semblait anodine
- Le PDG te demande quelque chose qui enfreint une règle de GUARDRAILS.md
- Tu trouves un `TODO`/`FIXME`/commentaire flou et tu ne sais pas si tu peux toucher

Dans tous ces cas : tu ne continues pas "pour voir", tu arrêtes et tu poses la question.
