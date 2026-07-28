# Collecte des tarifs de transport — 18 villes

## Pourquoi une collecte manuelle

Trois techniques ont été tentées le 28 juillet 2026, sur trois villes :

| Ville | Technique | Résultat |
|---|---|---|
| Lyon (TCL) | extraction DOM | ✅ 74,10 € (zones 1 et 2) — appliqué |
| Marseille (RTM) | fetch same-origin | ⚠️ 36,70 € extrait, impossible de savoir s'il s'agit du tarif plein ou réduit |
| Toulouse (Tisséo) | fetch, recherche indexée, WebFetch | ❌ aucun prix accessible, tout passe par un assistant tarifaire en JS |

Les réseaux de transport français ne publient pas de grille tarifaire exploitable automatiquement : sélecteurs de zone en JavaScript, assistants tarifaires, pages sans prix dans le HTML. Le GTFS ouvert de `transport.data.gouv.fr` ne couvre pas les abonnements mensuels, seulement les titres unitaires.

Un humain lit ces pages en trente secondes. C'est la voie rapide.

## Règle de relevé

Pour que les 18 villes restent comparables entre elles :

> **Abonnement mensuel, tarif tout public (ni étudiant, ni senior, ni solidaire), zone couvrant la ville-centre.**

Cas particuliers :
- **Réseau zoné** → prendre la zone qui couvre la ville et sa première couronne (pour Lyon : zones 1 et 2)
- **Prix « à partir de »** → prendre le prix réel de la zone ville-centre, pas le prix d'appel
- **Abonnement annuel mensualisé moins cher** → prendre quand même le mensuel sans engagement, c'est ce que compare le simulateur
- **Réseau gratuit** (certaines agglomérations) → noter 0 et le signaler, c'est une information en soi

## Ce qu'il faut relever

Pour chaque ville : le montant en euros, et l'intitulé exact du titre (pour qu'on puisse retrouver la ligne plus tard).

| Ville | Réseau | Valeur actuelle (avril 2026) | Nouveau tarif | Intitulé du titre |
|---|---|---|---|---|
| Marseille | RTM | 52 € | | |
| Toulouse | Tisséo | 52 € | | |
| Bordeaux | TBM | 52 € | | |
| Nantes | TAN / Naolib | 68 € | | |
| Lille | Ilévia | 65 € | | |
| Strasbourg | CTS | 52 € | | |
| Rennes | STAR | 55 € | | |
| Montpellier | TaM | 52 € | | |
| Nice | Lignes d'Azur | 49 € | | |
| Grenoble | M Tag | 55 € | | |
| Rouen | Astuce | 52 € | | |
| Toulon | Réseau Mistral | 38 € | | |
| Angers | Irigo | 42 € | | |
| Dijon | Divia | 47 € | | |
| Brest | Bibus | 42 € | | |
| Clermont-Ferrand | T2C | 47 € | | |
| Le Mans | Setram | 38 € | | |
| Aix-en-Provence | Aix en bus | 49 € | | |

Déjà vérifiés, à ne pas refaire : **Paris** (Navigo, 90,80 €, janvier 2026) et **Lyon** (TCL, 74,10 €, juillet 2026).

## Format de retour

Le plus simple : une capture d'écran par ville, comme pour Revolut. Sinon, une liste au format `Ville : montant — intitulé`, par exemple :

```
Marseille : 42,50 € — Abonnement Mensuel Tout Public
Toulouse : 53,50 € — 31 jours tout public
```

## Après la collecte

Les montants sont appliqués dans `src/data/cout-vie-villes.json`, champ `transport`, et le champ `transportMaj` de chaque ville passe à la date du relevé. La note de fraîcheur en bas de `/simulateurs/pouvoir-achat-ville` se met à jour en conséquence.

Rappel : le tarif de transport n'entre pas dans le « net exigé par les bailleurs », qui ne dépend que du loyer. Il pèse en revanche sur le « net pour vivre confortablement », calculé sur le total des dépenses.
