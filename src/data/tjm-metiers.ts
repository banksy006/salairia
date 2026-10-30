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
];

export const getTjmMetier = (slug: string) => TJM_METIERS.find((m) => m.slug === slug);
