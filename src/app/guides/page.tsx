import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon, CompassIcon, FileTextIcon } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides pratiques 2026",
  description:
    "Guides complets et indépendants sur la rémunération en France : portage salarial, statut freelance, fiche de paie, auto-entrepreneur. Sources officielles, données 2026.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides pratiques 2026 · Salairia",
    description:
      "Guides complets et indépendants sur la rémunération en France.",
    url: "/guides",
  },
};

const guides = [
  {
    titre: "Portage salarial",
    desc:
      "Le portage salarial convient aux consultants, formateurs et experts qui veulent facturer leurs clients tout en gardant le statut de salarié : CDI, protection sociale complète, droit au chômage. Ce guide couvre le fonctionnement tripartite, le calcul du salaire net, les cotisations détaillées, le chômage, les contrats CDI/CDD, les missions à l'international et le comparatif avec les autres statuts freelance.",
    href: "/guides/portage-salarial",
    audience: "Consultants, formateurs, experts, managers de transition",
    lecture: "12 min",
  },
  {
    titre: "Portage salarial et chômage",
    desc:
      "Le salarié porté cotise à l'assurance chômage et ouvre de vrais droits à l'ARE — c'est l'argument numéro un du portage face à l'auto-entreprise. Ce guide détaille les conditions d'affiliation 2026, dont l'assouplissement du 1er avril pour les primo-entrants, le calcul de l'allocation, les modalités de rupture qui ouvrent des droits, et le cumul ARE-mission. Avec le point que presque personne n'explique : l'allocation se calcule sur le salaire brut, pas sur le chiffre d'affaires facturé.",
    href: "/guides/portage-salarial-chomage",
    audience: "Consultants en portage, entre deux missions ou en fin de contrat",
    lecture: "8 min",
  },
  {
    titre: "Congés payés en portage salarial",
    desc:
      "Le salarié porté acquiert 2,5 jours ouvrables par mois, comme tout salarié. L'indemnité correspond au plus avantageux entre le dixième de la rémunération brute et le maintien de salaire. Ce guide explique l'acquisition, le calcul, les deux modes de versement possibles, et la nuance propre au portage : les congés sont financés par votre propre facturation, pas par un employeur tiers.",
    href: "/guides/conges-payes-portage-salarial",
    audience: "Salariés portés, en mission ou en cours de signature",
    lecture: "5 min",
  },
  {
    titre: "Remboursement d'impôt",
    desc:
      "Chaque été, la DGFiP rembourse les foyers qui ont payé trop d'impôt à la source ou détiennent des crédits d'impôt : 12,6 millions de foyers en 2026, 1 057 € en moyenne, virement du 24 ou 31 juillet. Qui est concerné, le calendrier complet de l'été fiscal, comment vérifier le montant — et le régime du solde à payer, étalé d'office au-delà de 300 €.",
    href: "/guides/remboursement-impot",
    audience: "Tous les foyers fiscaux, salariés au prélèvement à la source",
    lecture: "6 min",
  },
  {
    titre: "CFE auto-entrepreneur",
    desc:
      "L'impôt local que presque tous les micro-entrepreneurs découvrent trop tard : pas de courrier, un avis déposé en silence dans l'espace professionnel impots.gouv.fr, une échéance unique le 15 décembre. Le calcul par base minimale (243 à 2 433 € selon le CA), les trois exonérations — année de création, première imposition réduite de moitié, CA sous 5 000 € — et les réflexes anti-majoration.",
    href: "/guides/cfe-auto-entrepreneur",
    audience: "Micro-entrepreneurs, créateurs récents",
    lecture: "7 min",
  },
  {
    titre: "Heures supplémentaires",
    desc:
      "Majoration d'au moins 25 %, réduction de cotisations salariales de 11,31 points, zéro impôt jusqu'à 7 500 € par an : l'heure sup est l'heure la mieux payée de votre mois, et le guide le chiffre au centime sur un cas type. Avec les plafonds (contingent de 220 h, durées maximales), le cas des heures complémentaires, et le piège du repos compensateur.",
    href: "/guides/heures-supplementaires",
    audience: "Salariés du privé, employeurs de TPE-PME",
    lecture: "8 min",
  },
  {
    titre: "Indemnité de rupture conventionnelle",
    desc:
      "Un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, un tiers au-delà : la formule exacte du minimum légal, cinq cas chiffrés de 3 à 15 ans d'ancienneté, la fiscalité de chaque tranche — et le différé France Travail que déclenche toute indemnité supra-légale, jusqu'à 150 jours sans ARE. De quoi négocier en net réel, pas en brut affiché.",
    href: "/guides/indemnite-rupture-conventionnelle",
    audience: "Salariés en négociation de départ, RH",
    lecture: "8 min",
  },
  {
    titre: "Salaire d'un apprenti",
    desc:
      "La grille légale croisant l'âge (16-17, 18-20, 21-25, 26 et plus) et l'année de contrat, convertie en euros avec le SMIC de juin 2026 : de 504 € à 1 867 € bruts. Pourquoi le net est quasi égal au brut (exonération jusqu'à 50 % du SMIC), la règle du changement de tranche au mois suivant l'anniversaire, et l'exonération d'impôt jusqu'au SMIC annuel.",
    href: "/guides/salaire-apprenti",
    audience: "Apprentis, alternants, employeurs et CFA",
    lecture: "6 min",
  },
  {
    titre: "Prime de partage de la valeur",
    desc:
      "Jusqu'à 3 000 € — 6 000 € avec un accord d'intéressement — et une exonération totale (impôt et CSG compris) qui vit ses quatre derniers mois : le régime de faveur des entreprises de moins de 50 salariés s'éteint le 31 décembre 2026. Qui est exonéré de quoi, l'option épargne salariale, et pourquoi une prime ne remplace jamais une augmentation.",
    href: "/guides/prime-partage-valeur",
    audience: "Salariés de TPE-PME, dirigeants employeurs",
    lecture: "7 min",
  },
  {
    titre: "13e mois",
    desc:
      "Aucune loi ne l'impose — mais dès qu'une convention, un accord, un contrat ou un usage le prévoit, c'est un droit. D'où vient le vôtre, le prorata d'année incomplète, les droits des temps partiels et des CDD, ce qu'il laisse en net, et les trois cas qui fâchent : salaire annoncé « sur 13 mois », prime substituée, condition de présence au versement.",
    href: "/guides/13e-mois",
    audience: "Salariés du privé, candidats en négociation d'embauche",
    lecture: "7 min",
  },
  {
    titre: "SMIC 2027",
    desc:
      "Le montant n'existe pas encore — le décret tombera mi-décembre — mais la formule qui le fixera est publique : inflation des ménages modestes plus la moitié du gain de pouvoir d'achat du salaire ouvrier moyen. Les valeurs en vigueur (1 867,02 € bruts, ~1 478 € nets), le calendrier jusqu'au 1er janvier, et ce qu'une hausse déclenche vraiment. Page mise à jour le jour du décret.",
    href: "/guides/smic-2027",
    audience: "Salariés au SMIC, employeurs, apprentis",
    lecture: "7 min",
  },
  {
    titre: "Barème de l'impôt 2027",
    desc:
      "Le barème des revenus 2026 sera voté fin décembre avec la loi de finances 2027. En attendant : les tranches en vigueur (0 à 45 %, seuils indexés de +0,9 % cette année), la différence entre tranche marginale et taux réel, l'enjeu de l'indexation — la « progression à froid » — et le calendrier parlementaire. Tranches 2027 publiées ici dès la promulgation.",
    href: "/guides/bareme-impot-2027",
    audience: "Tous les contribuables, salariés et indépendants",
    lecture: "7 min",
  },
  {
    titre: "Plafond de la Sécurité sociale 2027",
    desc:
      "Le paramètre le plus discret de la paie française : le PASS (4 005 €/mois en 2026) borne les cotisations plafonnées, découpe les tranches AGIRC-ARRCO, plafonne les indemnités de rupture exonérées et fixe les minima du portage salarial. Comment sa valeur 2027 sera fixée à l'automne, et tout ce qui bougera avec elle au 1er janvier.",
    href: "/guides/plafond-securite-sociale-2027",
    audience: "Cadres, salariés portés, gestionnaires de paie",
    lecture: "7 min",
  },
  {
    titre: "Simulation TJM en portage salarial",
    desc:
      "Le net réel calculé pour six niveaux de TJM, de 300 à 800 € par jour : chiffre d'affaires, brut, net avant impôt. Avec la mécanique complète du calcul — pourquoi les pourcentages se composent au lieu de s'additionner — et les trois paramètres qui changent vraiment le résultat : frais de gestion, jours facturés, frais professionnels.",
    href: "/guides/simulation-tjm-portage-salarial",
    audience: "Freelances qui évaluent le portage, consultants en négociation de TJM",
    lecture: "7 min",
  },
  {
    titre: "Fiche de paie en portage salarial",
    desc:
      "Le bulletin du salarié porté ressemble à celui d'un salarié classique, mais son brut est le résultat d'un calcul qui part de la facturation. Chaque ligne expliquée avec un exemple complet, les quatre points à contrôler chaque mois — salaire minimum conventionnel, cohérence CA-brut, frais refacturables, taux de PAS — et le rôle du relevé de compte d'activité.",
    href: "/guides/fiche-de-paie-portage-salarial",
    audience: "Salariés portés, en poste ou en cours de signature",
    lecture: "7 min",
  },
  {
    titre: "Portage salarial ou CDI",
    desc:
      "La seule comparaison honnête part du budget employeur : à dépense identique, le CDI verse davantage de net, et l'écart chiffre le prix de l'indépendance. Tableau des différences réelles — la protection sociale est identique, la garantie de revenu non —, le risque de requalification du faux portage, et les critères pour trancher selon votre situation.",
    href: "/guides/portage-salarial-ou-cdi",
    audience: "Salariés qui hésitent à se lancer, consultants qu'on veut internaliser",
    lecture: "8 min",
  },
  {
    titre: "Frais de gestion en portage",
    desc:
      "De 4 à 10 % du CA selon la société : c'est la seule variable du portage que vous choisissez, et l'écart atteint plusieurs milliers d'euros par an. Les trois modèles décryptés — pourcentage simple, plafonné, abonnement fixe —, l'impact calculé société par société, et les questions à poser avant de signer.",
    href: "/guides/frais-gestion-portage-salarial",
    audience: "Freelances qui comparent les sociétés de portage",
    lecture: "7 min",
  },
  {
    titre: "Frais professionnels en portage",
    desc:
      "Refacturables au client ou déduits du chiffre d'affaires : deux régimes aux effets très différents. 300 € de frais non refacturables ne coûtent qu'environ 150 € de net réel — le mécanisme chiffré, la récupération de TVA que peu de sociétés mettent en avant, et l'arbitrage avec vos droits futurs.",
    href: "/guides/frais-professionnels-portage-salarial",
    audience: "Salariés portés avec matériel, déplacements ou formation à financer",
    lecture: "6 min",
  },
  {
    titre: "Salaire du président de SASU",
    desc:
      "De zéro à la totalité du résultat : le président fixe librement sa rémunération, et chaque euro suit un chemin fiscal différent selon qu'il part en salaire ou en dividende. Trois scénarios calculés sur un cas type, les critères d'arbitrage — revenu régulier, retraite, couverture santé — et le piège du salaire zéro prolongé.",
    href: "/guides/salaire-president-sasu",
    audience: "Présidents de SASU, créateurs en réflexion sur leur rémunération",
    lecture: "8 min",
  },
  {
    titre: "SASU et chômage du dirigeant",
    desc:
      "« Assimilé salarié » ne veut pas dire assuré chômage : le président de SASU ne cotise pas à l'assurance chômage et n'ouvre aucun droit à l'ARE, quel que soit son salaire. Pourquoi, les exceptions réelles — cumul avec un contrat de travail, rescrit France Travail —, les alternatives, et la comparaison chiffrée avec le portage.",
    href: "/guides/sasu-chomage-dirigeant",
    audience: "Créateurs de SASU, dirigeants qui découvrent l'angle mort",
    lecture: "7 min",
  },
  {
    titre: "Dividendes en SASU",
    desc:
      "La flat tax de 30 % ne raconte que la moitié de l'histoire : un euro de bénéfice paie d'abord l'impôt sur les sociétés, puis le PFU — soit environ 40 % de prélèvements combinés sur la première tranche. Le trajet complet chiffré, l'option du barème avec abattement de 40 %, et la règle des 10 % du capital qui change tout en EURL.",
    href: "/guides/dividendes-sasu-ou-salaire",
    audience: "Dirigeants de SASU et d'EURL qui arbitrent leur distribution",
    lecture: "7 min",
  },
  {
    titre: "Auto-entrepreneur et chômage",
    desc:
      "Le micro-entrepreneur ne cotise pas à l'assurance chômage : pas d'ARE en cas d'arrêt. L'ATI existe — environ 600 à 800 € par mois pendant six mois — mais ses conditions excluent la plupart des candidats. Le mécanisme qui fonctionne vraiment : cumuler des droits ARE déjà acquis avec une micro-entreprise, ARE mensuelle ou ARCE en capital.",
    href: "/guides/auto-entrepreneur-chomage",
    audience: "Micro-entrepreneurs, demandeurs d'emploi qui créent leur activité",
    lecture: "7 min",
  },
  {
    titre: "Cumuler salariat et micro-entreprise",
    desc:
      "Légal, sans plafond, sans autorisation — mais trois clauses à vérifier avant la première facture : exclusivité, loyauté, non-concurrence. Le revenu combiné calculé sur un cas type CDI + side business, la question des cotisations doubles, et le cas d'école du versement libératoire quand le salaire occupe déjà les tranches basses du barème.",
    href: "/guides/cumul-salarie-auto-entrepreneur",
    audience: "Salariés avec un projet parallèle, side businesses en démarrage",
    lecture: "7 min",
  },
  {
    titre: "Auto-entrepreneur",
    desc:
      "L'auto-entreprise (micro-entreprise) est le statut le plus simple et le moins coûteux pour démarrer une activité en France. Ce guide détaille la création, les quatre catégories de cotisations URSSAF (BIC vente, BIC services, BNC régime général, BNC CIPAV), l'ACRE 2026, les plafonds de chiffre d'affaires, les seuils de franchise TVA et le versement libératoire.",
    href: "/guides/auto-entrepreneur",
    audience: "Freelances qui démarrent, activités secondaires, petits CA",
    lecture: "10 min",
  },
  {
    titre: "SASU vs EURL",
    desc:
      "SASU et EURL sont les deux formes de société à un seul associé. Ce guide compare leur fonctionnement : charges sociales (assimilé-salarié vs TNS), impôt sur les sociétés, versement de dividendes, flat tax, protection sociale. Il couvre les trois scénarios types (100 % salaire, mix, 100 % dividendes) et précise le point de bascule qui avantage l'un ou l'autre selon votre situation.",
    href: "/guides/sasu-eurl",
    audience: "Dirigeants, freelances avec CA élevé, transition AE vers société",
    lecture: "11 min",
  },
  {
    titre: "Salaire brut et net",
    desc:
      "Ce guide explique ligne à ligne le passage du salaire brut au salaire net en France : cotisations salariales (sécurité sociale, retraite AGIRC-ARRCO, CSG/CRDS, APEC), tranches T1 et T2 selon le PASS, coût employeur, prélèvement à la source. Il couvre les différences cadre/non-cadre et donne les clés pour comprendre sa fiche de paie et négocier son salaire.",
    href: "/guides/salaire-brut-net",
    audience: "Salariés, candidats en négociation, dirigeants employeurs",
    lecture: "9 min",
  },
  {
    titre: "TJM freelance",
    desc:
      "Le Taux Journalier Moyen conditionne le revenu d'un freelance, son positionnement marché et sa capacité à encaisser les périodes creuses. Ce guide couvre la formule de calcul (3 méthodes), les grilles de TJM par métier en 2026 (dev, data, design, conseil), les variations par statut juridique et par zone géographique, et les leviers concrets pour négocier et augmenter son TJM.",
    href: "/guides/tjm-freelance",
    audience: "Freelances tech, consultants, designers, rédacteurs",
    lecture: "11 min",
  },
] as const;

export default function GuidesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Guides Salairia 2026",
      itemListElement: guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${g.href}`,
        name: g.titre,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <nav
          aria-label="Fil d'Ariane"
          className="flex items-center gap-2 text-sm text-foreground/70"
        >
          <Link href="/" className="transition hover:text-primary">
            Accueil
          </Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">Guides</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour août 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Guides pratiques 2026
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Comprendre votre rémunération, statut par statut
        </p>

        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/80">
          <p>
            Les guides Salairia expliquent en profondeur chacun des statuts et
            régimes de rémunération accessibles en France : portage salarial,
            auto-entreprise, SASU, EURL, salaire brut et net. Chaque guide est
            construit pour répondre à la même question sous deux angles —
            comprendre la mécanique (cotisations, plafonds, règles) et agir sur
            votre situation (choisir, simuler, comparer).
          </p>
          <p>
            Ces guides sont complémentaires de nos{" "}
            <Link href="/simulateurs" className="text-primary hover:underline">
              simulateurs
            </Link>
            . Un simulateur répond en quelques secondes à la question
            «&nbsp;combien ?&nbsp;» ; un guide répond au «&nbsp;comment ?&nbsp;»
            et au «&nbsp;pourquoi ?&nbsp;». Avant d&apos;utiliser un simulateur,
            le guide vous aide à savoir quel statut correspond à votre
            situation ; après, il vous donne les clés pour appliquer le
            résultat dans le monde réel.
          </p>
          <p>
            Tous nos guides reposent sur des sources officielles : URSSAF,
            BOSS.gouv.fr, Légifrance, Code du travail, INSEE, DARES. Les
            chiffres clés (taux de cotisations, plafonds, seuils, PASS) sont
            datés de 2026 et centralisés dans nos calculators pour garantir la
            cohérence entre chaque page.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {guides.map((g) => (
            <li key={g.titre}>
              <Link href={g.href} className="block h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-foreground">
                      {g.titre}
                    </h2>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                      <FileTextIcon className="h-3 w-3" />
                      {g.lecture}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {g.desc}
                  </p>
                  <p className="text-xs italic text-foreground/60">
                    Pour qui : {g.audience}
                  </p>
                  <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                    Lire le guide →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CompassIcon className="h-4 w-4" />
            </span>
            Notre méthodologie
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>
              Chaque guide Salairia est construit selon trois principes :
            </p>
            <ul className="space-y-2">
              <li>
                • <strong>Sources officielles uniquement</strong> — chaque
                chiffre (taux, plafond, seuil) provient des publications
                URSSAF, BOSS.gouv.fr, Legifrance, INSEE ou DARES. Les sources
                sont citées en bas de chaque guide.
              </li>
              <li>
                • <strong>Constantes centralisées</strong> — les taux et
                plafonds 2026 utilisés dans les guides sont les mêmes que ceux
                de nos simulateurs, garantissant la cohérence chiffre à chiffre
                entre les pages.
              </li>
              <li>
                • <strong>Revue annuelle</strong> — les guides sont relus
                chaque janvier pour intégrer les évolutions fiscales et
                sociales de l&apos;année. Les mises à jour intermédiaires sont
                faites dès publication d&apos;un texte réglementaire nouveau.
              </li>
            </ul>
            <p>
              Pour le détail complet des sources, du processus de rédaction et
              de la gestion des erreurs, voir notre{" "}
              <Link
                href="/methodologie"
                className="text-primary hover:underline"
              >
                page méthodologie
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
