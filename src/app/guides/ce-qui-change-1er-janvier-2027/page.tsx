import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, EuroIcon, CompassIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// Valeurs prévisionnelles et mesures des projets de textes déposés le 1er
// octobre 2026 (PLF n° 3210, PLFSS n° 3211). Elles ne sont pas votées : les
// simulateurs continuent d'appliquer les constantes 2026.
// PASS 2027 : estimation de la Commission des comptes de la Sécurité sociale
// (octobre 2026), relayée par la Revue fiduciaire le 7 octobre 2026.
const PASS_2027_M = 4_075;
const PASS_2027_A = 48_900;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

type Statut = "acquis" | "projet" | "estimation" | "attente";

const STATUTS: Record<Statut, { label: string; className: string }> = {
  acquis: { label: "Acquis", className: "bg-accent/10 text-accent" },
  projet: { label: "Projet de loi", className: "bg-amber-100 text-amber-900" },
  estimation: { label: "Estimation officielle", className: "bg-primary/10 text-primary" },
  attente: { label: "Texte attendu", className: "bg-muted text-muted-foreground" },
};

const meta: GuideMeta = {
  slug: "ce-qui-change-1er-janvier-2027",
  titre: "Ce qui change pour votre argent au 1er janvier 2027",
  sousTitre: "Impôt, retraites, plafond Sécu, PPV, indemnités, micro-entreprise : ce que prévoient les textes déposés le 1er octobre, mis à jour texte par texte",
  chapo: "Chaque 1er janvier, une dizaine de paramètres qui pilotent votre paie, vos cotisations et votre impôt sont refixés. Pour 2027, la photo s'est précisée le 1er octobre 2026 avec le dépôt du projet de loi de finances et du projet de loi de financement de la Sécurité sociale : barème de l'impôt relevé de 2,1 %, revalorisation des retraites réservée aux petites pensions, plafond unique pour les indemnités de rupture, prime d'activité gelée. Cette page distingue ce qui est acquis, ce qui n'est encore qu'un projet, et ce qui reste à publier — avec un lien vers notre analyse détaillée de chaque sujet.",
  filAriane: "1er janvier 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "salaries", label: "Pour les salariés" },
    { id: "independants", label: "Pour les indépendants" },
    { id: "impots", label: "Impôts, retraites, prestations" },
    { id: "calendrier", label: "Le calendrier des annonces" },
  ],
  faq: [
    {
      q: "Que contient le budget 2027 présenté le 1er octobre 2026 ?",
      r: "Pour les ménages, cinq mesures principales : l'indexation de 2,1 % du barème de l'impôt sur le revenu, une revalorisation des pensions de base réservée aux retraités dont l'ensemble des pensions ne dépasse pas 1 260 € par mois (gel par défaut au-delà), un plafond unique d'exonération des indemnités de rupture égal au plafond de la Sécurité sociale, le plafonnement à 3 000 € de l'abattement de 10 % des retraités, et l'absence de revalorisation de la prime d'activité en 2027. Ce sont des projets : le Parlement peut les modifier jusqu'au vote définitif.",
    },
    {
      q: "Quels changements sont déjà certains au 1er janvier 2027 ?",
      r: "Peu, à ce stade. Sont acquis parce que déjà votés : la fin du régime simplifié de TVA (loi de finances pour 2025), qui fait passer les entreprises concernées à des déclarations trimestrielles, et le maintien des plafonds de la micro-entreprise jusqu'en 2028. Sont certains dans leur principe mais pas encore chiffrés : la revalorisation du SMIC (décret de mi-décembre) et celle du plafond de la Sécurité sociale (arrêté de fin d'année, estimé à 4 075 € par mois). Tout le reste — barème, retraites, indemnités de rupture, prime de partage de la valeur — dépend du vote des lois de finances.",
    },
    {
      q: "Mon salaire net va-t-il changer au 1er janvier 2027 ?",
      r: `Trois mécanismes peuvent le faire bouger sans que rien ne change sur votre contrat : une modification des cotisations ou de leurs assiettes (aucune hausse de taux salariale n'est prévue dans le PLFSS 2027), le déplacement de la frontière tranche 1 / tranche 2 avec le nouveau plafond de la Sécurité sociale — ${EUR.format(PASS_2027_M)} par mois selon l'estimation officielle, contre ${EUR.format(SALAIRE_2026.PASS_MENSUEL)} — et les grilles de taux neutre du prélèvement à la source, relevées par le PLF, si votre employeur n'a pas de taux personnalisé. Votre taux de PAS personnalisé, lui, ne change pas en janvier : il a été fixé en septembre.`,
    },
    {
      q: "Les plafonds et les taux de la micro-entreprise changent-ils en 2027 ?",
      r: "Non. Les plafonds de chiffre d'affaires sont figés pour 2026-2028 (83 600 € pour les services et professions libérales, 203 100 € pour la vente), le PLFSS 2027 ne contient aucune mesure sur les taux de cotisations, et les seuils de franchise de TVA ont été pérennisés par une loi du 3 novembre 2025 — le seuil unique à 25 000 € est abandonné. Le changement concret est déclaratif : les micro-entrepreneurs qui facturent la TVA passent à des déclarations trimestrielles au 1er janvier 2027.",
    },
    {
      q: "Et pour les retraités ?",
      r: "Deux rendez-vous distincts. La complémentaire Agirc-Arrco est revalorisée au 1er novembre 2026, sur décision des partenaires sociaux attendue mi-octobre. Pour les pensions de base du 1er janvier 2027, le PLFSS déroge à la règle d'indexation : revalorisation sur l'inflation seulement si le total de vos pensions (base et complémentaires) ne dépasse pas 1 260 € par mois, lissage jusqu'à 1 281 €, et au-delà gel par défaut, sauf coefficients fixés par décret. S'y ajoute, côté impôt, le plafonnement à 3 000 € par foyer de l'abattement de 10 % sur les pensions, dès les revenus 2026.",
    },
    {
      q: "Quand tous les montants seront-ils connus ?",
      r: "L'essentiel se joue entre mi-novembre et fin décembre : inflation d'octobre (qui fixe le coefficient légal des retraites), rapport du groupe d'experts sur le SMIC, arrêté PASS et décret SMIC à la mi-décembre, puis vote et promulgation des lois de finances. Ce dernier point n'est pas garanti avant le 31 décembre : les budgets 2025 et 2026 ont été promulgués en février. Cette page est mise à jour à chaque publication au Journal officiel.",
    },
  ],
  sources: [
    { label: "Projet de loi de finances pour 2027, n° 3210 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf" },
    { label: "Projet de loi de financement de la Sécurité sociale pour 2027, n° 3211 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi" },
    { label: "Revue fiduciaire — le plafond de la Sécurité sociale pour 2027 pourrait s'établir à 4 075 € par mois", href: "https://www.revue-fiduciaire.com/actualite/article/le-plafond-de-la-securite-sociale-pour-2027-pourrait-s-etablir-a-4-075-par-mois" },
    { label: "impots.gouv.fr — le régime simplifié de TVA est supprimé à compter du 1er janvier 2027", href: "https://www.impots.gouv.fr/actualite/le-regime-simplifie-dimposition-la-tva-est-supprime-compter-du-1er-janvier-2027" },
    { label: "Légifrance — Journal officiel (décrets et arrêtés de fin d'année)", href: "https://www.legifrance.gouv.fr/" },
    { label: "URSSAF — taux et barèmes", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" },
  ],
};

export const metadata: Metadata = {
  title: "Ce qui change au 1er janvier 2027 : impôt, retraites, PASS, PPV, micro",
  description: "Le récapitulatif de ce qui bouge au 1er janvier 2027, mis à jour avec le budget déposé le 1er octobre : barème de l'impôt +2,1 %, retraites revalorisées sous 1 260 € seulement, PASS estimé à 4 075 €, indemnités de rupture plafonnées à 1 PASS, PPV, titres-restaurant, micro-entreprise. Ce qui est acquis, ce qui n'est qu'un projet.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Ce qui change pour votre argent au 1er janvier 2027",
    description: "Impôt, retraites, PASS, PPV, micro : ce que prévoit le budget 2027, et ce qui est déjà acquis.",
    url: `/guides/${meta.slug}`,
  },
};

interface Ligne {
  quoi: string;
  statut: Statut;
  actuel: string;
  prevu: string;
  href: string;
  lien: string;
}

function Tableau({ lignes }: { lignes: Ligne[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-4">Paramètre</th>
            <th className="px-5 py-4">Aujourd&apos;hui</th>
            <th className="px-5 py-4">Ce qui est prévu pour 2027</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((l) => (
            <tr key={l.quoi} className="border-b border-border align-top last:border-b-0">
              <td className="px-5 py-4 font-semibold text-foreground">
                {l.quoi}
                <span className={`mt-2 block w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${STATUTS[l.statut].className}`}>
                  {STATUTS[l.statut].label}
                </span>
                <Link href={l.href} className="mt-2 block text-xs font-semibold text-primary underline-offset-4 hover:underline">
                  {l.lien} →
                </Link>
              </td>
              <td className="px-5 py-4 tabular-nums text-foreground/80">{l.actuel}</td>
              <td className="px-5 py-4 text-foreground/80">{l.prevu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <div className="flex flex-wrap gap-2 text-xs">
        {(Object.keys(STATUTS) as Statut[]).map((s) => (
          <span key={s} className={`rounded-full px-2 py-0.5 font-semibold ${STATUTS[s].className}`}>
            {STATUTS[s].label}
          </span>
        ))}
        <span className="self-center text-muted-foreground">
          — « projet de loi » : mesure du PLF ou du PLFSS 2027 déposés le 1er octobre 2026, modifiable jusqu&apos;au vote.
        </span>
      </div>

      <section id="salaries" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Pour les salariés
        </h2>
        <Tableau lignes={[
          {
            quoi: "SMIC",
            statut: "attente",
            actuel: `${EUR2.format(SALAIRE_2026.SMIC_MENSUEL_BRUT)} bruts/mois (12,31 €/h) depuis le 1er juin 2026`,
            prevu: "Décret mi-décembre. Revalorisation légale : inflation des ménages modestes + ½ du gain de pouvoir d'achat ouvrier. La hausse de juin 2026 a déjà « consommé » une partie de l'inflation.",
            href: "/guides/smic-2027",
            lien: "Notre analyse SMIC 2027",
          },
          {
            quoi: "Plafond de la Sécurité sociale",
            statut: "estimation",
            actuel: `${EUR.format(SALAIRE_2026.PASS_MENSUEL)}/mois — ${EUR.format(SALAIRE_2026.PASS_ANNUEL)}/an`,
            prevu: `${EUR.format(PASS_2027_M)}/mois et ${EUR.format(PASS_2027_A)}/an (+1,7 %), selon l'estimation de la Commission des comptes de la Sécurité sociale d'octobre 2026. Arrêté attendu fin décembre.`,
            href: "/guides/plafond-securite-sociale-2027",
            lien: "Notre analyse PASS 2027",
          },
          {
            quoi: "Indemnités de rupture",
            statut: "projet",
            actuel: "Exonérées de cotisations jusqu'à 2 PASS et d'impôt jusqu'à 6 PASS (selon conditions) ; CSG due au-delà du montant légal",
            prevu: "Plafond unique d'exonération égal à 1 PASS pour les cotisations, la CSG et l'impôt (PLFSS art. 6, PLF art. 2), pour les ruptures à compter du 1er janvier 2027 — l'impôt dès les revenus 2026 dans la version déposée.",
            href: "/guides/indemnite-rupture-conventionnelle",
            lien: "Notre guide rupture conventionnelle",
          },
          {
            quoi: "Prime de partage de la valeur",
            statut: "projet",
            actuel: "Exonérée de cotisations jusqu'à 3 000 € (6 000 € avec intéressement) ; exonération totale, CSG et impôt compris, sous 3 SMIC dans les entreprises de moins de 50 salariés, jusqu'au 31 décembre 2026",
            prevu: "PLFSS (art. 7) : exonération de cotisations pérennisée, plafond fixé par décret dans la limite d'1/15 du PASS. Dans les moins de 50 salariés, CSG-CRDS toujours exonérée pour les primes versées en 2027 — mais l'exonération d'impôt n'est pas prolongée.",
            href: "/guides/prime-partage-valeur",
            lien: "Notre guide PPV",
          },
          {
            quoi: "Titres-restaurant",
            statut: "projet",
            actuel: "Exonération patronale jusqu'à 7,32 €/titre ; courses alimentaires autorisées jusqu'au 31 décembre 2026",
            prevu: "Proposition de loi n° 2892, examinée à l'Assemblée le 12 octobre 2026 : usage pour tout produit alimentaire pérennisé et titre entièrement dématérialisé. Sans adoption définitive d'ici décembre, fin de l'usage en supermarché au 1er janvier.",
            href: "/guides/titres-restaurant",
            lien: "Notre guide titres-restaurant",
          },
          {
            quoi: "Indemnités journalières",
            statut: "projet",
            actuel: "CSG à 6,2 % ; IJ d'affection de longue durée exonérées d'impôt, IJ d'accident du travail imposables à 50 %",
            prevu: "PLF (art. 2) : CSG à 9,2 % sur les IJ versées à compter du 1er janvier 2027 ; IJ d'ALD imposables à 50 % et IJ d'AT/MP à 100 %, dès les revenus 2026.",
            href: "/guides/arret-maladie-salaire",
            lien: "Arrêt maladie : ce que vous touchez",
          },
        ]} />
      </section>

      <section id="independants" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Pour les indépendants
        </h2>
        <Tableau lignes={[
          {
            quoi: "Micro-entreprise : plafonds, taux, TVA",
            statut: "acquis",
            actuel: "83 600 € (services/BNC) et 203 100 € (vente) — taux 12,3 / 21,2 / 25,6 % — franchise TVA 37 500 / 85 000 €",
            prevu: "Rien ne bouge : plafonds figés jusqu'en 2028, aucune mesure sur les taux dans le PLFSS 2027, seuils de TVA pérennisés par la loi du 3 novembre 2025 (le seuil à 25 000 € est abrogé).",
            href: "/guides/plafonds-micro-entreprise-2027",
            lien: "Ce que le budget change, et ce qu'il ne change pas",
          },
          {
            quoi: "Déclarations de TVA",
            statut: "acquis",
            actuel: "Régime simplifié : une déclaration annuelle CA12 et deux acomptes",
            prevu: "Régime simplifié supprimé au 1er janvier 2027 (LF 2025, art. 38) : déclarations CA3 trimestrielles sous 1 M€ de CA, bascule automatique. Dernière CA12 au plus tard le 4 mai 2027.",
            href: "/guides/plafonds-micro-entreprise-2027",
            lien: "Le détail pour les micro-entrepreneurs",
          },
          {
            quoi: "Facturation électronique",
            statut: "acquis",
            actuel: "Depuis le 1er septembre 2026 : obligation de pouvoir recevoir des factures électroniques",
            prevu: "1er septembre 2027 : obligation d'émettre pour les TPE, PME et micro-entreprises. L'année 2027 est celle du choix d'une plateforme agréée.",
            href: "/actualites/facturation-electronique-1er-septembre-2026",
            lien: "Notre article sur la réforme",
          },
          {
            quoi: "Barème kilométrique",
            statut: "attente",
            actuel: "Barème inchangé depuis 2024 (5 CV : d × 0,636 jusqu'à 5 000 km) ; +20 % pour les électriques",
            prevu: "Arrêté publié vers mars 2027, pour la déclaration des revenus 2026. Gel reconduit ou revalorisation : notre page est mise à jour à la publication.",
            href: "/guides/bareme-kilometrique",
            lien: "Le barème et son calcul",
          },
        ]} />
      </section>

      <section id="impots" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Impôts, retraites et prestations
        </h2>
        <Tableau lignes={[
          {
            quoi: "Barème de l'impôt sur le revenu",
            statut: "projet",
            actuel: "Tranches à 0/11/30/41/45 % : 11 600 € / 29 579 € / 84 577 € / 181 917 €",
            prevu: "PLF (art. 2) : +2,1 % sur toutes les tranches — 11 844 € / 30 200 € / 86 353 € / 185 737 € ; décote à 915 € (personne seule) et 1 513 € (couple) ; grilles du taux neutre relevées.",
            href: "/guides/bareme-impot-2027",
            lien: "Le barème proposé, chiffré",
          },
          {
            quoi: "Abattement de 10 % des retraités",
            statut: "projet",
            actuel: "Plafonné à 4 439 € par foyer",
            prevu: "PLF (art. 3) : plafond ramené à 3 000 € pour les pensions de retraite, dès les revenus 2026. Sans effet sous environ 30 000 € de pensions annuelles ; 4,6 millions de foyers concernés.",
            href: "/guides/revalorisation-retraites-2027",
            lien: "Retraites : ce qui change en 2027",
          },
          {
            quoi: "Pensions de retraite de base",
            statut: "projet",
            actuel: "Revalorisation annuelle automatique sur l'inflation (novembre à octobre)",
            prevu: "PLFSS (art. 35) : revalorisation sur l'inflation seulement si le total des pensions ne dépasse pas 1 260 €/mois, lissage jusqu'à 1 281 € ; au-delà, gel par défaut sauf décret. L'Agirc-Arrco décide séparément pour le 1er novembre 2026.",
            href: "/guides/revalorisation-retraites-2027",
            lien: "Les deux revalorisations",
          },
          {
            quoi: "Prime d'activité",
            statut: "projet",
            actuel: `Montant forfaitaire ${EUR2.format(638.28)} depuis avril 2026`,
            prevu: "PLF (art. 74) : pas de revalorisation en 2027, sauf décret contraire. Le RSA, l'AAH et l'ASPA restent indexés sur l'inflation.",
            href: "/guides/prime-activite-2027",
            lien: "Montants et conditions",
          },
          {
            quoi: "Avance de crédits d'impôt",
            statut: "acquis",
            actuel: "60 % des crédits récurrents versés mi-janvier, calculés sur la dernière déclaration",
            prevu: "Versement autour du 15 janvier 2027. Modulable à la baisse jusqu'à mi-décembre 2026 si vos dépenses ont chuté — sous peine de remboursement l'été suivant.",
            href: "/guides/avance-credit-impot-janvier",
            lien: "Le mécanisme de l'avance",
          },
        ]} />
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier des annonces, semaine par semaine
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["1er octobre 2026 ✓", "Dépôt du PLF 2027 et du PLFSS 2027 à l'Assemblée nationale : premiers chiffres officiels."],
                ["Début octobre 2026 ✓", "Rapport de la Commission des comptes de la Sécurité sociale : PASS 2027 estimé à 4 075 € par mois."],
                ["12 octobre 2026", "Examen en séance de la proposition de loi sur les titres-restaurant."],
                ["Mi-octobre 2026", "Décision du conseil d'administration de l'Agirc-Arrco pour le 1er novembre."],
                ["Mi-novembre 2026", "Inflation d'octobre publiée par l'INSEE : coefficient légal de revalorisation des retraites."],
                ["Fin novembre 2026", "Rapport du groupe d'experts sur le SMIC : premier chiffrage de la hausse de janvier."],
                ["Mi-décembre 2026", "Décret SMIC et arrêté PASS au Journal officiel. Date limite pour moduler l'avance de crédits d'impôt."],
                ["Fin décembre 2026", "Date visée pour la promulgation des lois de finances 2027 — les budgets 2025 et 2026 ne l'avaient été qu'en février."],
                ["1er janvier 2027", "Entrée en vigueur. Cette page bascule des « prévus » aux montants définitifs, et les constantes de nos simulateurs sont mises à jour le même jour."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-48 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Pour mesurer l&apos;effet de ces changements sur votre situation
          plutôt que dans l&apos;absolu, nos simulateurs appliquent toujours
          les valeurs en vigueur :{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">brut/net</Link>,{" "}
          <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">net après impôt</Link>,{" "}
          <Link href="/simulateurs/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">auto-entrepreneur</Link>{" "}
          et{" "}
          <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">portage salarial</Link>.
        </p>
      </section>
    </GuideShell>
  );
}
