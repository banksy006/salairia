# Collecte des témoignages

## Règle

Un témoignage n'est publié que si les trois conditions sont réunies :

1. **La personne a réellement utilisé l'outil** qu'elle cite. Pas « un ami qui trouve le site sympa » — quelqu'un qui a saisi ses chiffres et lu un résultat.
2. **Elle a écrit ou validé le texte elle-même.** On peut couper pour la longueur, jamais réécrire le fond ni ajouter un superlatif.
3. **Elle a donné son accord explicite** pour la forme publiée (nom affiché, rôle, ville).

## Pourquoi cette rigueur

Salairia se vend sur « comparatifs indépendants, sources officielles, sans zone d'ombre ». Un faux témoignage détruit exactement l'actif que le reste du site construit. Les faux avis sont aussi traités comme du spam par Google, et la DGCCRF sanctionne les avis trompeurs (pratique commerciale trompeuse, art. L121-2 du Code de la consommation).

Le coût d'un vrai témoignage est un mail et trois jours d'attente. Le coût d'un faux, c'est la crédibilité du site.

## Pas de balisage Review

Le composant `src/components/Temoignages.tsx` n'émet **aucun** schema.org `Review` ou `AggregateRating`. Google exclut les avis auto-hébergés des rich results et le balisage expose à une action manuelle. Ne pas l'ajouter « pour les étoiles ».

## Message d'approche

À envoyer aux utilisateurs SprintJob, aux freelances de ton réseau, et aux visiteurs qui écrivent via `/contact`. Adapter le prénom et l'outil selon l'interlocuteur.

> Objet : **Tu peux tester un truc pour moi ? (5 min)**
>
> Salut [Prénom],
>
> J'ai construit Salairia, un site de simulateurs de rémunération — brut/net, TJM freelance, portage, charges auto-entrepreneur. C'est gratuit, sans compte et sans cookie.
>
> Je cherche des retours honnêtes avant de le pousser plus loin. Est-ce que tu peux prendre 5 minutes pour essayer celui qui correspond à ta situation ?
>
> [lien vers le simulateur le plus pertinent pour cette personne]
>
> Et me dire ce que tu en as pensé — y compris si un truc t'a paru faux, confus ou inutile. Les retours négatifs m'aident autant que les autres.
>
> Merci,
> Nizar

## Questions de relance

Une fois la personne a testé, ces quatre questions produisent des verbatims utilisables. Poser en une fois, laisser répondre librement.

1. **Qu'est-ce que tu cherchais à savoir en arrivant ?** — donne le contexte d'usage
2. **Est-ce que tu as eu ta réponse, et en combien de temps ?** — donne le bénéfice concret
3. **Est-ce qu'un chiffre t'a surpris ou t'a paru faux ?** — sert la qualité du produit, pas la com
4. **Tu le recommanderais à qui, et pour quoi ?** — donne la phrase la plus citable

Le meilleur verbatim vient presque toujours de la question 2 ou 4.

## Demande d'accord

Ne jamais publier sans cette étape.

> Ton retour sur [outil] m'a beaucoup aidé. Est-ce que je peux le citer sur le site ?
>
> Ça s'afficherait comme ça :
>
> « [texte exact] »
> — [Prénom + initiale], [rôle], [ville]
>
> Dis-moi si tu veux changer la formulation, réduire ce qui est affiché (juste le prénom, pas de ville), ou si tu préfères qu'on laisse tomber. Aucun souci dans tous les cas.

## Ajout dans le code

Ajouter l'objet dans `src/data/temoignages.json`, tableau `temoignages` :

```json
{
  "id": "prenom-initiale-2026-08",
  "nomAffiche": "Marie L.",
  "role": "Consultante indépendante",
  "ville": "Lyon",
  "texte": "Texte exact validé par la personne.",
  "outilUtilise": "/simulateurs/tjm-freelance",
  "outilLabel": "Simulateur TJM freelance",
  "date": "2026-08-14"
}
```

La section apparaît automatiquement dès le premier témoignage — elle ne rend rien tant que le tableau est vide, pour ne jamais afficher une section « Ils nous font confiance » désespérément vide.

## Preuve sociale disponible sans témoignage

En attendant, ce qui est vrai et vérifiable dès aujourd'hui :

- **Chaque chiffre relié à sa source officielle** (URSSAF, BOSS, Legifrance, INSEE), avec date de dernière vérification affichée
- **Aucun cookie de traçage**, calculs exécutés dans le navigateur — vérifiable en F12
- **Éditeur identifié**, page À propos et page Contact réelles
- **Méthodologie publiée** et signalement d'erreur ouvert

C'est moins flatteur qu'une étoile mais c'est ce qui distingue réellement le site de ses concurrents, qui ont tous Google Analytics et aucun auteur identifiable.

**Ne pas afficher de compteur de visites tant que les volumes sont faibles.** « 105 visiteurs ce trimestre » est un signal négatif, pas une preuve sociale.
