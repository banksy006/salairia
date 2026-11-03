/**
 * Dossiers « TJM par métier » (`/guides/tjm-<metier>`).
 *
 * Les TJM de marché reprennent la grille publiée dans le guide TJM freelance
 * (agrégat Malt 2026, Free-Work, Silkhom, Hays) : mêmes valeurs, pour qu'un
 * lecteur passant d'une page à l'autre ne voie pas deux chiffres différents.
 * Tout le reste (net salarié, TJM d'équivalence, net par statut, coût
 * employeur) est calculé par les simulateurs via `src/lib/metiers.ts`.
 */

export interface TjmMetier {
  slug: string;
  /** id dans `salaires-metiers.json`, d'où viennent les fourchettes de salaire. */
  metierId: string;
  nom: string;
  nomTitre: string;
  /** Ligne de la grille du guide TJM freelance utilisée comme référence marché. */
  ligneBarometre: string;
  marche: { junior: number; confirme: number; senior: number };
  datePublished: string;
  contexte: string[];
  leviers: { t: string; d: string }[];
  faqMetier: { q: string; r: string }[];
}

export const TJM_METIERS: TjmMetier[] = [
  {
    slug: "tjm-developpeur-web",
    metierId: "dev-web",
    nom: "développeur web",
    nomTitre: "Développeur web",
    ligneBarometre: "Développeur fullstack",
    marche: { junior: 400, confirme: 550, senior: 750 },
    datePublished: "2026-10-30",
    contexte: [
      "Le développement web est le premier marché du freelancing tech en France, en volume de missions comme en nombre d'indépendants. C'est aussi le plus concurrentiel : un développeur fullstack confirmé facture autour de 550 € par jour, mais la dispersion est forte entre une mission WordPress en agence et une mission React ou Node chez un éditeur SaaS. Le TJM se négocie d'abord sur la stack, ensuite sur l'autonomie — un profil qui livre seul une fonctionnalité de bout en bout, tests et déploiement compris, se vend plus cher qu'un exécutant de tickets.",
      "La majorité des missions passent par des plateformes (Malt, Free-Work, Comet) ou des ESN en sous-traitance, qui prennent entre 10 et 20 % de marge sur le tarif payé par le client final. Un TJM « plateforme » de 550 € correspond donc souvent à un budget client de 620 à 680 € : c'est ce chiffre qu'il faut avoir en tête quand on contracte en direct.",
      "Côté statut, le développeur web est le cas d'école de la micro-entreprise : peu de frais, peu de matériel, une activité de prestation intellectuelle en BNC. Le plafond de 83 600 € de chiffre d'affaires est atteint dès 390 € par jour sur 18 jours facturés, ce qui pousse la plupart des profils confirmés vers le portage salarial ou la SASU dès la deuxième année.",
    ],
    leviers: [
      { t: "La stack avant l'ancienneté", d: "TypeScript, React ou Vue côté front, Node, Go ou Python côté back : les missions sur stack moderne se négocient 50 à 100 € au-dessus d'un profil PHP ou jQuery à expérience égale." },
      { t: "Le périmètre livré", d: "Facturer une fonctionnalité livrée (conception, code, tests, mise en production) plutôt que des heures de présence justifie le haut de la fourchette." },
      { t: "Le contrat en direct", d: "Sortir de l'intermédiation d'une ESN récupère la marge du milieu — 10 à 20 % du budget client — sans changer le travail." },
      { t: "La durée de mission", d: "Une mission de six mois à temps plein vaut une remise de 5 à 10 % ; en dessous de deux mois, le TJM doit couvrir le temps d'intégration et la recherche de la mission suivante." },
    ],
    faqMetier: [
      {
        q: "Un développeur junior peut-il se lancer en freelance ?",
        r: "Techniquement oui, mais le marché le rémunère autour de 400 € par jour, et surtout il obtient moins de missions : les clients cherchent des profils autonomes. Deux à trois ans en poste, un portfolio de projets livrés et un réseau de recruteurs ou de chefs de projet constituent le socle minimal pour tenir un TJM de 500 € et un taux d'occupation correct.",
      },
      {
        q: "Faut-il facturer plus cher en remote ?",
        r: "Non, mais pas moins cher non plus. Le remote total a tiré les tarifs vers une grille nationale : un développeur en province facture aujourd'hui les mêmes 500 à 600 € qu'un parisien sur une mission à distance. L'écart régional existe sur les salaires, beaucoup moins sur les TJM.",
      },
    ],
  },
  {
    slug: "tjm-data-scientist",
    metierId: "data-scientist",
    nom: "data scientist",
    nomTitre: "Data scientist",
    ligneBarometre: "Data scientist / ML engineer",
    marche: { junior: 500, confirme: 750, senior: 950 },
    datePublished: "2026-10-30",
    contexte: [
      "Le data scientist freelance se situe dans le haut des tarifs tech : 750 € par jour pour un profil confirmé, près de 1 000 € pour un senior capable de mettre un modèle en production. La demande vient des grands comptes (banque, assurance, retail, énergie) et des scale-ups, souvent pour des missions longues de six à douze mois. L'arrivée des modèles de langage a déplacé la valeur : la prédiction classique se banalise, l'industrialisation (MLOps, évaluation, mise en production d'agents) se vend cher.",
      "La confusion data scientist, data analyst et ML engineer pèse directement sur le TJM. Un analyste BI se négocie autour de 550 €, un ML engineer qui déploie et surveille des modèles dépasse 900 €. Le titre de la mission et le livrable attendu comptent autant que le profil : c'est le périmètre d'industrialisation qui fait basculer la grille.",
      "À ce niveau de tarif, la micro-entreprise est hors jeu dès les premiers mois : 750 € sur 18 jours font 162 000 € de chiffre d'affaires annuel, le double du plafond BNC. Le choix se joue entre le portage salarial (chômage, pas de gestion) et la SASU (optimisation salaire-dividendes), et le portage perd du terrain à mesure que le TJM monte, parce que ses frais de gestion sont proportionnels.",
    ],
    leviers: [
      { t: "La mise en production", d: "Un modèle qui tourne en production, surveillé, avec ses pipelines de données, se facture 150 à 250 € de plus par jour que le même modèle dans un notebook." },
      { t: "Le secteur", d: "Banque, assurance et pharma paient le haut de la fourchette et exigent souvent une habilitation ou une expérience réglementaire ; le e-commerce et les médias sont plus volatils." },
      { t: "L'IA générative", d: "RAG, évaluation de modèles, fine-tuning : les missions estampillées IA générative dépassent fréquemment 900 € par jour en 2026, avec une prime pour les profils qui savent chiffrer le coût d'inférence." },
      { t: "La durée et le temps partiel", d: "Les missions à trois ou quatre jours par semaine sont fréquentes en data : le TJM y est plus élevé, mais le nombre de jours facturés baisse — le net annuel se calcule sur les deux." },
    ],
    faqMetier: [
      {
        q: "Data scientist freelance : SASU ou portage salarial ?",
        r: "À 750 € par jour, le portage prélève environ 8 % de frais de gestion sur 162 000 € de chiffre d'affaires, soit près de 13 000 € par an. Une SASU coûte 1 500 à 2 500 € de comptabilité et permet d'arbitrer salaire et dividendes. Le portage reste pertinent si vous voulez le chômage, zéro gestion et une mission unique longue ; au-delà de 700 € par jour sur plusieurs années, la SASU l'emporte généralement en net.",
      },
      {
        q: "Les missions data sont-elles compatibles avec le temps partiel ?",
        r: "Oui, plus que dans le développement : beaucoup de clients cherchent un data scientist deux ou trois jours par semaine pour cadrer, puis industrialiser. Le TJM se négocie alors au-dessus du temps plein, mais vérifiez que 12 jours facturés par mois suffisent à votre net cible — le tableau des jours facturés ci-dessus fait ce calcul.",
      },
    ],
  },
  {
    slug: "tjm-devops",
    metierId: "devops",
    nom: "DevOps",
    nomTitre: "DevOps",
    ligneBarometre: "DevOps / SRE",
    marche: { junior: 500, confirme: 700, senior: 950 },
    datePublished: "2026-10-30",
    contexte: [
      "Le DevOps, et son cousin SRE, est l'un des profils les plus recherchés en freelance : chaque entreprise qui met du logiciel en production a besoin de quelqu'un pour fiabiliser la chaîne de déploiement, et ces compétences restent rares. Un DevOps confirmé facture autour de 700 € par jour, un senior ou un cloud architect approche les 1 000 €. Les missions sont souvent longues, en régie, chez des clients qui ont déjà une plateforme à faire tenir.",
      "Le TJM dépend fortement du cloud et de l'outillage : Kubernetes en production, Terraform, GitOps et observabilité forment le socle qui donne accès au haut de la grille. Les certifications AWS, GCP ou Azure de niveau professionnel ou architecte sont parmi les rares diplômes qui se traduisent directement en euros par jour en freelance, parce que les clients les exigent dans les appels d'offres.",
      "Comme pour la data, le niveau de tarif ferme la porte de la micro-entreprise : 700 € sur 18 jours représentent 151 000 € de chiffre d'affaires, bien au-delà du plafond. Le DevOps freelance travaille en portage salarial ou en société, et il porte une particularité : les astreintes. Une astreinte de production se facture en plus du TJM, et un contrat qui ne le prévoit pas est un contrat à renégocier.",
    ],
    leviers: [
      { t: "Kubernetes et l'infra as code", d: "Un profil qui opère un cluster Kubernetes en production, avec Terraform et une chaîne GitOps, se situe 100 à 200 € au-dessus d'un administrateur système qui automatise des scripts." },
      { t: "Les certifications cloud", d: "AWS Solutions Architect Professional, GCP Professional Cloud Architect ou CKA : exigées dans beaucoup d'appels d'offres, elles justifient le haut de la fourchette." },
      { t: "Les astreintes facturées", d: "Une astreinte de nuit ou de week-end se chiffre à part — forfait d'astreinte plus heures d'intervention — jamais noyée dans le TJM." },
      { t: "La sécurité et la conformité", d: "Les missions DevSecOps, ou celles qui touchent à la conformité (ISO 27001, DORA pour la finance), se négocient au prix du conseil, pas de la production." },
    ],
    faqMetier: [
      {
        q: "DevOps freelance : comment facturer les astreintes ?",
        r: "Séparez trois choses dans le contrat : le TJM pour les jours travaillés, un forfait par période d'astreinte (une semaine de nuit, un week-end) et un tarif horaire majoré pour chaque intervention réelle. En portage salarial, vérifiez que la société de portage accepte de les intégrer au bulletin ; en SASU, elles sont du chiffre d'affaires comme le reste.",
      },
      {
        q: "Un administrateur système peut-il devenir DevOps freelance ?",
        r: "C'est le parcours le plus courant. Le passage se joue sur trois compétences : un cloud public maîtrisé en profondeur, l'infrastructure as code (Terraform) et une chaîne CI/CD complète. Un administrateur système confirmé facture autour de 450 à 500 € ; avec ces trois briques en production, la grille DevOps à 700 € devient accessible en deux ou trois ans.",
      },
    ],
  },
  {
    slug: "tjm-product-manager",
    metierId: "product-manager",
    nom: "product manager",
    nomTitre: "Product manager",
    ligneBarometre: "Product manager / Product owner",
    marche: { junior: 500, confirme: 700, senior: 900 },
    datePublished: "2026-11-03",
    contexte: [
      "Le product manager freelance est un profil plus récent sur le marché de l'indépendance que le développeur, et plus discuté : beaucoup d'entreprises considèrent encore le produit comme une fonction à internaliser. Le marché existe pourtant, porté par les scale-ups qui structurent une équipe produit, les grands comptes qui lancent un programme de transformation et les éditeurs qui cherchent un PM de transition entre deux recrutements. Un product manager confirmé facture autour de 700 € par jour, un head of product ou un PM senior sur un sujet plateforme ou data dépasse 900 €.",
      "La frontière entre product owner et product manager pèse sur le tarif. Les missions de PO en régie, souvent dans des ESN ou des DSI de grands groupes, se négocient entre 500 et 600 € : elles consistent à tenir un backlog et animer les cérémonies. Les missions de product management — discovery, stratégie, arbitrage avec le business, pilotage des indicateurs — se vendent au prix du conseil. Le titre de la mission et le niveau d'interlocuteur (CPO, direction générale) sont les premiers signaux du budget.",
      "À 700 € par jour, le plafond de la micro-entreprise est dépassé dès le septième mois d'activité pleine. Le product manager freelance travaille donc en portage salarial — fréquent pour les profils venus du salariat qui veulent garder le chômage entre deux missions longues — ou en SASU. Les missions à temps partiel, deux à quatre jours par semaine, sont plus courantes qu'en développement : le TJM y est plus élevé mais le nombre de jours facturés baisse.",
    ],
    leviers: [
      { t: "Le périmètre produit, pas le backlog", d: "Une mission de discovery, de stratégie ou de pilotage d'indicateurs se facture 100 à 200 € de plus par jour qu'une mission de product owner qui tient un backlog." },
      { t: "Le domaine", d: "Fintech, santé, B2B SaaS et marketplaces paient le haut de la grille ; les missions de PM en agence ou en e-commerce généraliste sont plus proches du bas." },
      { t: "Le niveau d'interlocuteur", d: "Un PM qui reporte au CPO ou à la direction générale négocie au prix du conseil ; un PM rattaché à un chef de projet IT négocie au prix de la régie." },
      { t: "Le temps partiel assumé", d: "Trois jours par semaine chez un client à 750 € valent souvent mieux que cinq jours à 650 € — à condition de remplir les deux autres jours, ou de les compter dans le net cible." },
    ],
    faqMetier: [
      {
        q: "Product owner ou product manager freelance : quelle différence de TJM ?",
        r: "Les baromètres placent le product owner en régie entre 500 et 600 € par jour, le product manager confirmé autour de 700 € et le senior autour de 900 €. L'écart tient au périmètre : exécution et animation d'une équipe d'un côté, stratégie, discovery et responsabilité des résultats de l'autre. Beaucoup de missions dites « PM » sont en réalité des missions de PO : lisez le livrable attendu avant de fixer votre tarif.",
      },
      {
        q: "Peut-on être product manager freelance sans expérience en poste ?",
        r: "Rarement. Le product management s'apprend dans une équipe, avec des utilisateurs et des développeurs, et les clients achètent une expérience de cas similaires. Trois à cinq ans en poste, idéalement avec un lancement ou une refonte mesurable à présenter, sont le socle habituel d'une première mission à 600 € ou plus.",
      },
    ],
  },
  {
    slug: "tjm-designer-ux",
    metierId: "designer-ux",
    nom: "designer UX/UI",
    nomTitre: "Designer UX/UI",
    ligneBarometre: "UX / UI designer",
    marche: { junior: 400, confirme: 600, senior: 800 },
    datePublished: "2026-11-03",
    contexte: [
      "Le design d'interface est l'un des métiers où le freelancing est le plus ancré : une part importante des designers UX/UI travaillent en indépendant, pour des agences, des studios, des éditeurs et des équipes produit. Un designer confirmé facture autour de 600 € par jour, un senior ou un lead design autour de 800 €. La grille est plus étalée vers le bas que celle des développeurs : les missions d'exécution graphique en agence se négocient parfois sous 400 €, les missions de recherche utilisateur et de design system chez un éditeur au-dessus de 700 €.",
      "Deux marchés coexistent. Celui des agences et des studios, qui achètent des jours de production à des tarifs serrés mais avec un flux régulier. Celui des équipes produit, qui cherchent un designer intégré à une squad pour plusieurs mois, au prix d'un développeur confirmé. Le passage de l'un à l'autre est le principal levier de revenu d'un designer freelance, plus que l'ancienneté.",
      "À 600 € sur 18 jours, le chiffre d'affaires annuel dépasse 129 000 € : la micro-entreprise ne tient qu'à temps partiel ou en début d'activité. Le designer en mission longue chez un éditeur se retrouve dans la même situation qu'un développeur, en portage salarial ou en société. Le designer qui enchaîne des projets courts pour plusieurs clients, lui, garde souvent la micro-entreprise sous le plafond, au prix d'un net plus bas et d'aucune déduction de matériel ni de logiciels.",
    ],
    leviers: [
      { t: "La recherche et le design system", d: "Une mission de recherche utilisateur, de tests ou de construction d'un design system se facture 100 à 200 € de plus par jour que la production de maquettes." },
      { t: "L'équipe produit plutôt que l'agence", d: "Le même designer, intégré à une squad chez un éditeur, est payé au tarif d'un développeur confirmé ; en agence, au tarif d'un jour de production." },
      { t: "Le portfolio avec résultats", d: "Un cas qui montre l'effet mesuré d'une refonte — conversion, activation, support — vaut plus que dix écrans soignés." },
      { t: "Les forfaits sur les projets courts", d: "Sur un site vitrine ou une application simple, un forfait calibré sur votre TJM réel évite de brader les jours de révision et d'échanges." },
    ],
    faqMetier: [
      {
        q: "Designer UX/UI freelance : agence ou équipe produit ?",
        r: "Les agences achètent des jours de production à 400 à 500 € mais apportent un flux de missions sans prospection ; les équipes produit intègrent un designer à 600 € ou plus pour plusieurs mois, avec un périmètre plus large. Le choix dépend de votre tolérance à la prospection : la mission longue chez un éditeur paie mieux, mais il faut la trouver, et la suivante.",
      },
      {
        q: "Faut-il facturer au forfait ou à la journée ?",
        r: "À la journée pour les missions intégrées à une équipe, au forfait pour les projets délimités (site, application, identité). Dans les deux cas, partez de votre TJM cible : un forfait se construit en jours estimés multipliés par le TJM, avec une marge pour les allers-retours. Un forfait fixé « au prix du marché » sans ce calcul est la première cause de TJM réel effondré chez les designers.",
      },
    ],
  },
  {
    slug: "tjm-chef-de-projet-it",
    metierId: "chef-projet-it",
    nom: "chef de projet IT",
    nomTitre: "Chef de projet IT",
    ligneBarometre: "Chef de projet tech / PMO",
    marche: { junior: 450, confirme: 600, senior: 800 },
    datePublished: "2026-11-03",
    contexte: [
      "Le chef de projet IT freelance — et ses variantes scrum master, PMO, coach agile — occupe un marché large et très intermédié : la majorité des missions passent par des ESN ou des cabinets qui placent des profils en régie chez des grands comptes, banques, assurances, industrie et secteur public. Un chef de projet confirmé facture autour de 600 € par jour, un directeur de projet ou un PMO sur un programme de transformation approche 800 €. Les missions sont longues, souvent un an ou plus, ce qui donne à ce métier l'un des meilleurs taux d'occupation du freelancing.",
      "La contrepartie de ce confort est une pression sur le tarif : les ESN prennent 15 à 25 % entre le prix client et le TJM du freelance, et les acheteurs des grands comptes comparent des grilles. Le levier principal est donc de sortir de l'intermédiation ou de monter dans la chaîne — de chef de projet à directeur de projet, de scrum master à coach ou à PMO de programme.",
      "À 600 € par jour sur 18 jours, le chiffre d'affaires annuel atteint 129 600 € : hors plafond micro, sauf à temps partiel. Le portage salarial est très répandu dans ce métier, parce que beaucoup de chefs de projet viennent du salariat en ESN, que les grands comptes le connaissent et que le chômage entre deux missions longues a de la valeur. La SASU reprend l'avantage au-delà de deux ou trois ans d'activité continue.",
    ],
    leviers: [
      { t: "Le niveau dans la chaîne", d: "Directeur de projet, PMO de programme ou coach agile de plusieurs équipes se négocient 150 à 250 € au-dessus d'un chef de projet d'équipe." },
      { t: "Le secteur réglementé", d: "Banque, assurance et pharma paient le haut de la grille et exigent des références sectorielles — un projet réglementaire mené à bout vaut un argument de prix." },
      { t: "Les certifications", d: "PMP, Prince2, PSM II ou SAFe sont demandées dans les appels d'offres des grands comptes ; elles ne font pas le tarif, mais elles ouvrent la porte des missions qui le font." },
      { t: "Le contrat en direct", d: "Récupérer les 15 à 25 % de marge d'une ESN en contractant directement avec le client final est le levier le plus rentable — et le plus lent, parce qu'il suppose un réseau." },
    ],
    faqMetier: [
      {
        q: "Scrum master, PMO, chef de projet : quel TJM pour quel rôle ?",
        r: "Les baromètres regroupent ces rôles dans une même grille, de 450 € en junior à 800 € en senior. Dans la pratique, le scrum master d'une équipe se situe en bas de la fourchette confirmé, le chef de projet IT au milieu, le PMO de programme et le directeur de projet en haut. Le facteur décisif est le nombre d'équipes ou le budget piloté, davantage que le titre.",
      },
      {
        q: "Pourquoi le portage salarial est-il si fréquent chez les chefs de projet freelance ?",
        r: "Parce que ce métier vient massivement du salariat en ESN, que les grands comptes connaissent et acceptent le portage dans leurs référencements, et que les missions longues rendent précieuse l'assurance chômage entre deux contrats. À 600 € par jour, le portage prélève environ 8 % de frais de gestion ; c'est le prix de cette protection, à comparer avec une SASU dès que l'activité est stable.",
      },
    ],
  },
];

export const getTjmMetier = (slug: string) => TJM_METIERS.find((m) => m.slug === slug);
