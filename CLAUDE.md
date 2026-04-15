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

Structure App Router, répertoire `src/` :

```
src/
├── app/
│   ├── layout.tsx                             # Root layout : Header + Footer globaux, Inter, metadata SEO
│   ├── page.tsx                               # Home : hub simulateurs + personas + maillage interne
│   ├── globals.css                            # Palette Salairia via @theme inline (Tailwind v4)
│   └── simulateurs/
│       ├── page.tsx                           # Hub des simulateurs
│       └── portage-salarial/page.tsx          # Simulateur portage
├── components/
│   ├── layout/
│   │   ├── Header.tsx                         # Wordmark + tagline (global via layout.tsx)
│   │   └── Footer.tsx                         # Footer 4 colonnes (global via layout.tsx)
│   └── simulateurs/
│       ├── PortageContext.tsx                 # Provider + hook usePortage (state partagé)
│       ├── PortageSimulator.tsx               # Client : inputs + résultats + comparatif
│       ├── ApercuCard.tsx                     # Client : preview 3 KPI dans le hero
│       └── TocSidebar.tsx                     # Sommaire flottant desktop
└── lib/
    └── calculators/
        └── portage.ts                         # Logique pure, testable sans React
```

Le **`Header` et le `Footer` sont rendus une seule fois** dans `src/app/layout.tsx`. Les pages ne doivent **pas** les rendre elles-mêmes. Chaque page retourne son contenu dans un `<div className="mx-auto w-full max-w-6xl px-6 py-…">` (ou plusieurs `<section>` si elle a des bandeaux pleine largeur comme la home).

## Pages disponibles

- **Home (`/`)** — V1 du 2026-04-15. Hub principal : hero (H1 + carte données de référence 2026) + segmentation 4 personas + grille 9 simulateurs (1 dispo, 8 « Bientôt ») + 3 engagements EEAT + 12 recherches populaires pour maillage interne + bandeau sources. JSON-LD `Organization` + `WebSite` avec `SearchAction` + `BreadcrumbList`. Pattern visuel cohérent avec `/simulateurs/portage-salarial` (cards `rounded-2xl shadow-md`, palette CLAUDE.md, hero grid 12 cols). À re-scrapper quand de nouveaux simulateurs sont publiés (maj du tableau `simulateurs` dans `page.tsx` + cartes `Footer.tsx`).
- **Hub simulateurs (`/simulateurs`)** — liste des simulateurs disponibles. Un seul pour l'instant (portage).
- **Portage salarial (`/simulateurs/portage-salarial`)** — premier simulateur, voir plus bas.

Pas d'abstractions prématurées au-delà de `Header`/`Footer` et du contexte portage. Les abstractions supplémentaires (layout de section, primitives UI) s'introduiront quand un deuxième écran en aura vraiment besoin.

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

## Décisions UX/UI

Pattern visuel **verrouillé V3 (avril 2026)**, à répliquer sur les futurs simulateurs :

- **Hero de page** : grid `lg:grid-cols-12`. Colonne gauche (`lg:col-span-7`) contient breadcrumb, badge pill « 📅 À jour avril 2026 » (`bg-muted` + `text-primary`), H1 en `text-5xl`/`text-6xl`, sous-titre `text-primary` `text-2xl`/`3xl`, paragraphes intro en `text-foreground/80`. Colonne droite (`lg:col-span-5`) contient la carte « Aperçu en temps réel » (`ApercuCard`). Stack vertical en mobile/tablet. Breadcrumb avec séparateur `›`.
- **Carte « Aperçu instantané »** (hero right col) : `rounded-2xl` `shadow-lg` `p-8`, fond `bg-gradient-to-br from-primary/5 to-accent/5`, bordure `border-primary/10`. Label en haut `text-xs uppercase tracking-widest`. Trois chiffres : CA HT (`text-2xl`), Net mensuel (`text-3xl text-primary`, le héros), Taux de retour (`text-xl text-accent`, calculé `net / CA × 100`). Ligne dynamique en italique rappelant les inputs. Bouton CTA `bg-primary` « Affiner ma simulation ↓ » avec ancre `#simulateur`. Cette carte **partage le state** du simulateur principal.
- **Partage de state** : via `PortageContext` (client component `src/components/simulateurs/PortageContext.tsx`). `PortageProvider` enveloppe tout ce qui a besoin des inputs (hero right col + simulator + comparatif). Hook `usePortage()` expose `{ inputs, debouncedInputs, update }`. Le debounce (150 ms) vit dans le provider, pas dans les consumers. **Convention à reprendre pour chaque simulateur** : `<Nom>Context.tsx` → `<Nom>Provider` + `use<Nom>()`, defaults exportés en constante, state lifted dès qu'un second composant (preview, badge, sommaire dynamique…) a besoin de lire les inputs.
- **Cards** : toutes les sections (paramètres, résultats, comparatif, étapes, FAQ, sources) vivent dans des cards `bg-white` `border border-border` `rounded-2xl` `shadow-md` `hover:shadow-lg` `p-6 sm:p-8`. Espacement vertical `space-y-16` entre sections.
- **Résultat principal** : rendu en carte héros `bg-primary` `text-primary-foreground` `rounded-2xl` `p-8` `shadow-lg`, chiffre en `text-5xl font-bold tabular-nums`, label en `text-xs uppercase tracking-wider`. Lignes intermédiaires du calcul dans une liste discrète au-dessus. Labels avec middle-dot pour les pourcentages (`· 43%`, `· 22%`) et `whitespace-nowrap` pour éviter le wrap disgracieux.
- **Comparatif** : **TABLEAU** (`<table>`) dans une card, 4 colonnes `Société / Frais de gestion / Salaire brut / Net mensuel estimé`. Ligne gagnante surlignée `bg-accent/5` + `border-l-4 border-accent` (sur la première `<td>`) + badge « Meilleur net » `bg-accent text-accent-foreground` à côté du nom. Nom en `font-semibold`, frais en `text-muted-foreground`, salaire brut `text-muted-foreground` (donnée secondaire), net mensuel `text-lg font-bold` (la donnée héros). Padding `px-6 py-4`, hover row en `bg-muted/50`. Tri : gagnant en haut, puis frais croissants. _(La V2 en grille de cards était jugée moins lisible — ne pas y revenir.)_
- **Alertes** : `border-l-4` + `rounded-r-lg`. Rouge = `border-destructive` `bg-destructive/10` `text-destructive` avec icône `⚠️`. Orange = `border-amber-500` `bg-amber-50` `text-amber-900` avec icône `ℹ️`.
- **Emojis — parcimonie** : 1 emoji max en préfixe de titre H2 fort (`🧮 Comprendre…`, `💬 Questions fréquentes`, `📚 Sources`). Le hero utilise `📅` dans son badge. **Interdit** : aucun emoji dans les labels d'input, dans la carte de résultats, dans les noms de sociétés du comparatif, ni dans les valeurs numériques.
- **Sommaire flottant** (desktop `lg+` uniquement) : sidebar sticky à droite (`w-56`), ancres vers les sections (id `simulateur`, `comparatif`, `etapes`, `faq`, `sources`), item actif surligné avec `border-l-2 border-primary` via `IntersectionObserver`. Composant : `src/components/simulateurs/TocSidebar.tsx`.
- **FAQ** : `<details>` natifs stylés, une card par question, icône `+` qui tourne en `×` via `group-open:rotate-45`.
- **Sources** : liens externes cliquables (`target="_blank"` `rel="noopener noreferrer"`), couleur `text-primary` `underline-offset-4` `hover:underline`, flèche `↗` en suffixe.
- **Inputs** : `border-2 border-border` `rounded-xl` `px-4 py-3 text-base`, focus en `border-primary` + `ring-4 ring-ring`.
- **Scroll smooth** : `scroll-smooth` sur `<html>` (dans `layout.tsx`) pour les ancres internes (bouton « Affiner ma simulation ↓ », TOC).

À chaque nouveau simulateur, reprendre ce même moule avant d'envisager un écart. Les exceptions doivent être discutées explicitement.

## Simulateurs disponibles

Tous les simulateurs vivent sous `/simulateurs/*`. La logique de calcul pure est isolée dans `src/lib/calculators/<nom>.ts` (testable sans React), le composant UI client dans `src/components/simulateurs/<Nom>Simulator.tsx`, et la page éditoriale (Server Component, metadata + JSON-LD) dans `src/app/simulateurs/<slug>/page.tsx`. Le hub `/simulateurs` liste les simulateurs disponibles.

### Portage salarial — `/simulateurs/portage-salarial`

Route créée session 2 (2026-04-15). Lib : `src/lib/calculators/portage.ts`. UI : `src/components/simulateurs/PortageSimulator.tsx`.

Constantes 2026 (codées en dur, à mettre à jour chaque année) :

- PASS mensuel : 4 005 €
- Charges patronales : 43 % (moyenne marché, pas un barème URSSAF officiel)
- Charges salariales : 22 % (idem)
- Salaire minimum conventionnel : 70 % PASS junior, 75 % PASS senior, 85 % PASS forfait jours

Ordre de calcul (à ne pas modifier) :
1. CA HT = TJM × jours travaillés
2. Frais de gestion = CA HT × taux (4 à 10 %, défaut 8 %)
3. Base cotisations = CA HT − frais gestion − frais pro non refacturables
4. Charges patronales = base × 43 %
5. Salaire brut = base − charges patronales
6. Charges salariales = brut × 22 %
7. Net avant impôt = brut − charges salariales
8. Net après impôt = net avant impôt × (1 − taux PAS), seulement si PAS > 0
9. Total perçu = net final + frais refacturables (remboursés hors charges)

Comparateur de 5 sociétés (frais de gestion fixes, relevés avril 2026) : CEGELEM 4 %, ABC Portage 5 %, OpenWork 6 %, Cadres en Mission 8 %, ITG 10 %. La ligne qui maximise le net est surlignée.

Alertes UI : TJM < 250 € → rouge (conseiller l'auto-entrepreneur) ; salaire brut < minimum conventionnel du statut → orange. Les taux sont documentés comme indicatifs à plusieurs endroits de la page et dans le code.

## Prochaines étapes

À définir dans les sessions suivantes. Typiquement : simulateur salaire brut/net salarié, simulateur auto-entrepreneur, guides, sitemap, robots, analytics. Chaque session indiquera précisément son périmètre.
