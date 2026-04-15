# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Projet

**Salairia** — site SEO français sur la rémunération (salaire, freelance, portage, auto-entrepreneur, SASU). Modèle économique : **affiliation**. Public : salariés, freelances, dirigeants, auto-entrepreneurs.

- **Tagline** : « Votre rémunération, sans zone d'ombre »
- **Hébergement cible** : Vercel
- **Pas de base de données au MVP** : tout est en JSON statique + ISR
- **Ton UI** : tutoiement pour l'interface et les CTA. Le vouvoiement est réservé aux contenus YMYL (à venir).

## Stack

| Couche | Choix |
|---|---|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Langage | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Polices | `next/font/google` — Inter |
| Lint | ESLint (config par défaut `eslint-config-next`) |
| Alias import | `@/*` → `./src/*` |
| Déploiement | Vercel |

## Commandes

```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # build production
npm run start    # servir le build
npm run lint     # eslint
```

## Architecture

Structure App Router classique, répertoire `src/` :

```
src/app/
├── layout.tsx      # Root layout : <html lang="fr">, Inter, metadata SEO
├── page.tsx        # Home : header wordmark + hero + CTA + footer
└── globals.css     # Palette Salairia via @theme inline (Tailwind v4)
```

Pas d'abstractions prématurées. Tant que la home est le seul écran, **pas de layout imbriqué, pas de composants partagés** — on extraira quand un deuxième écran en aura besoin.

## Charte graphique

Palette centralisée dans `src/app/globals.css`. Chaque couleur est exposée :
1. comme **variable CSS** sous `:root` (valeur source)
2. puis remappée dans `@theme inline` pour générer les utilitaires Tailwind (`bg-primary`, `text-muted-foreground`, etc.)

| Token | Valeur | Usage |
|---|---|---|
| `--primary` | `#1E40AF` | Bleu confiance — wordmark, titres, liens |
| `--primary-foreground` | `#FAFAF9` | Texte sur fond primary |
| `--accent` | `#059669` | Vert émeraude — CTA, succès |
| `--accent-foreground` | `#FFFFFF` | Texte sur fond accent |
| `--background` | `#FAFAF9` | Fond global (blanc cassé chaud) |
| `--foreground` | `#0F172A` | Texte principal (slate 900) |
| `--muted` | `#F1F5F9` | Cards et sections secondaires |
| `--muted-foreground` | `#475569` | Texte secondaire (slate 600) |
| `--destructive` | `#DC2626` | Erreurs, actions destructives |
| `--destructive-foreground` | `#FFFFFF` | Texte sur destructive |
| `--border` | `#E2E8F0` | Bordures (slate 200) |
| `--ring` | `rgb(30 64 175 / 0.4)` | Focus ring (primary 40 %) |

**Mode clair uniquement.** Pas de dark mode au MVP — à rajouter plus tard si le besoin se confirme.

**Police** : Inter via `next/font/google`, chargée dans `layout.tsx`, variable CSS `--font-inter` exposée à `@theme inline` en tant que `--font-sans`.

## Convention de commits

Préfixes à utiliser (type conventional commits allégé) :

- `chore:` — setup, config, tooling
- `feat:` — nouvelle fonctionnalité (page, simulateur, composant)
- `fix:` — correction de bug
- `docs:` — documentation (CLAUDE.md, README, commentaires)
- `refactor:` — refacto sans changement fonctionnel
- `style:` — changements visuels CSS/UI

On travaille **directement sur `main`**, sans branche ni PR (projet solo, déploiement continu via Vercel).

## Conventions de code

- **TypeScript strict**, pas de `any` sans justification.
- **Server Components par défaut**, `"use client"` uniquement quand on a besoin d'état, d'événements, ou d'APIs navigateur.
- **Apostrophes françaises** dans le JSX : toujours `&apos;` (ex. `d&apos;ombre`) pour éviter les warnings ESLint `react/no-unescaped-entities`.
- **Metadata SEO** : se déclare dans chaque route via l'export `metadata` de Next ; on ne touche pas `<head>` manuellement.
- **Liens internes** : `next/link`, pas de `<a>`.
- **Pas de commentaires décoratifs.** On ne commente que les choses contre-intuitives (le « pourquoi »).
- **Pas d'abstraction prématurée.** Trois lignes répétées valent mieux qu'un helper prématuré.

## Décisions techniques verrouillées

Décisions prises et à ne **pas** remettre en question sans discussion explicite :

- **Next.js 16**, pas 15.
  Décidé session 1 (2026-04-15). `create-next-app@latest` fournit Next 16 + React 19 ; on a gardé le plus moderne plutôt que de downgrader.

- **Tailwind CSS v4 CSS-first**, pas v3 + `tailwind.config.ts`.
  Décidé session 1 (2026-04-15). Toute la config thème est dans `src/app/globals.css` via `@theme inline`. Il n'existe **pas** de `tailwind.config.ts` dans ce projet et il ne faut pas en créer un. Pour ajouter une couleur ou un token, on édite `globals.css`.

- **shadcn/ui : reporté, pas en session 1.**
  Raison : en avril 2026, `shadcn init` réécrit `globals.css` avec son propre `@theme inline` basé sur un preset (par défaut `nova`), ce qui écraserait la palette Salairia. Les anciens flags `--style` et `--base-color` n'existent plus dans la CLI. Quand on voudra shadcn, il faudra soit préparer un **preset custom** qui respecte les tokens ci-dessus, soit lancer `init` puis remettre la palette à la main. À trancher en session dédiée.

- **Pas de base de données au MVP.**
  Contenu en JSON statique, rendu statique + ISR. Introduire une DB change le modèle de déploiement et se décide explicitement.

- **Mode clair uniquement.**
  Pas de dark mode tant que le besoin n'est pas prouvé. Éviter d'ajouter des classes `dark:*` sans discussion.

## Prochaines étapes

À définir dans les sessions suivantes. Typiquement : routes `/simulateurs`, premier simulateur (salaire brut/net), guides, schema.org, sitemap, robots, analytics. Chaque session indiquera précisément son périmètre.
