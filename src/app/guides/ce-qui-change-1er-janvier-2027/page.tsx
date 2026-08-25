import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, EuroIcon, CompassIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "ce-qui-change-1er-janvier-2027",
  titre: "Ce qui change pour votre argent au 1er janvier 2027",
  sousTitre: "SMIC, plafond Sécu, barème de l'impôt, PPV, retraites : le récapitulatif tenu à jour texte par texte",
  chapo: "Chaque 1er janvier, une dizaine de paramètres qui pilotent votre paie, vos cotisations et votre impôt sont refixés — par décret, arrêté ou loi de finances, pour l'essentiel entre fin novembre et fin décembre. Cette page rassemble tout ce qui bougera au 1er janvier 2027, avec les valeurs actuelles, le texte attendu, et un lien vers notre analyse détaillée de chaque sujet. Elle est mise à jour au fil des publications officielles.",
  filAriane: "1er janvier 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-08-25",
  tocItems: [
    { id: "salaries", label: "Pour les salariés" },
    { id: "independants", label: "Pour les indépendants" },
    { id: "impots", label: "Impôts et prestations" },
    { id: "calendrier", label: "Le calendrier des annonces" },
  ],
  faq: [
    {
      q: "Quels changements sont déjà certains au 1er janvier 2027 ?",
      r: "Trois sont acquis dans leur principe, seuls les montants manquent : la revalorisation du SMIC (décret de mi-décembre, formule légale d'indexation), celle du plafond de la Sécurité sociale (arrêté de fin d'année, indexé sur le salaire moyen), et l'indexation du barème de l'impôt (loi de finances de fin décembre). Un quatrième est certain et déjà chiffré : la fin du régime de faveur de la prime de partage de la valeur dans les entreprises de moins de 50 salariés — à partir du 1er janvier 2027, la PPV supporte partout CSG-CRDS et impôt sur le revenu.",
    },
    {
      q: "Les plafonds de la micro-entreprise vont-ils changer en 2027 ?",
      r: "Non pour les plafonds de chiffre d'affaires : ils sont revalorisés tous les trois ans, et la période 2026-2028 est déjà fixée (83 600 € pour les services et professions libérales, 203 100 € pour la vente). En revanche, les taux de cotisations peuvent bouger par la loi de financement de la Sécurité sociale — la hausse du taux BNC de 24,6 % à 25,6 % au 1er janvier 2026 en est le précédent — et les seuils de franchise de TVA relèvent de la loi de finances. Notre guide sur les plafonds micro 2027 détaille ce qui est figé et ce qui reste ouvert.",
    },
    {
      q: "Mon salaire net va-t-il changer au 1er janvier 2027 ?",
      r: "Trois mécanismes peuvent le faire bouger sans qu'il se passe rien sur votre contrat : une modification des taux de cotisations ou de leurs assiettes (LFSS), le déplacement de la frontière tranche 1 / tranche 2 avec le nouveau plafond de la Sécurité sociale (surtout si votre brut dépasse environ 4 000 €), et les grilles de taux neutre du prélèvement à la source si votre employeur n'a pas reçu de taux personnalisé. Votre taux de PAS personnalisé, lui, ne change pas en janvier — il a été fixé en septembre.",
    },
    {
      q: "Et pour les retraités ?",
      r: "Deux rendez-vous distincts, souvent confondus. Les pensions complémentaires Agirc-Arrco sont revalorisées au 1er novembre 2026, sur décision des partenaires sociaux. Les pensions de base sont revalorisées au 1er janvier 2027, automatiquement, sur l'inflation moyenne constatée de novembre 2025 à octobre 2026. Les deux hausses ne sont ni simultanées ni identiques — notre guide sur la revalorisation des retraites détaille les deux mécaniques et leurs estimations.",
    },
    {
      q: "Quand tous les montants seront-ils connus ?",
      r: "L'essentiel se joue sur cinq semaines : rapport du groupe d'experts SMIC fin novembre, arrêté PASS courant décembre, décret SMIC mi-décembre, loi de finances et LFSS votées puis promulguées entre mi et fin décembre. Cette page est mise à jour à chaque publication au Journal officiel — au 1er janvier, tous les « attendus » ci-dessous seront remplacés par les montants définitifs.",
    },
  ],
  sources: [
    { label: "Légifrance — Journal officiel (décrets et arrêtés de fin d'année)", href: "https://www.legifrance.gouv.fr/" },
    { label: "URSSAF — taux et barèmes", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" },
    { label: "BOSS — plafond de la Sécurité sociale", href: "https://boss.gouv.fr/" },
    { label: "economie.gouv.fr — projet de loi de finances", href: "https://www.economie.gouv.fr/" },
  ],
};

export const metadata: Metadata = {
  title: "Ce qui change au 1er janvier 2027 : SMIC, PASS, impôt, PPV, retraites",
  description: "Le récapitulatif des paramètres qui bougent au 1er janvier 2027 — SMIC, plafond Sécurité sociale, barème de l'impôt, fin du régime doré de la PPV, plafonds micro, retraites — avec les valeurs actuelles et les textes attendus. Mis à jour à chaque publication officielle.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Ce qui change pour votre argent au 1er janvier 2027",
    description: "SMIC, PASS, impôt, PPV, micro, retraites : tout au même endroit, mis à jour texte par texte.",
    url: `/guides/${meta.slug}`,
  },
};

interface Ligne {
  quoi: string;
  actuel: string;
  attendu: string;
  href: string;
  lien: string;
}

function Tableau({ lignes }: { lignes: Ligne[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-4">Paramètre</th>
            <th className="px-5 py-4">Valeur actuelle</th>
            <th className="px-5 py-4">Ce qui est attendu</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((l) => (
            <tr key={l.quoi} className="border-b border-border align-top last:border-b-0">
              <td className="px-5 py-4 font-semibold text-foreground">
                {l.quoi}
                <Link href={l.href} className="mt-1 block text-xs font-semibold text-primary underline-offset-4 hover:underline">
                  {l.lien} →
                </Link>
              </td>
              <td className="px-5 py-4 tabular-nums text-foreground/80">{l.actuel}</td>
              <td className="px-5 py-4 text-foreground/80">{l.attendu}</td>
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
      <section id="salaries" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Pour les salariés
        </h2>
        <Tableau lignes={[
          {
            quoi: "SMIC",
            actuel: `${EUR2.format(SALAIRE_2026.SMIC_MENSUEL_BRUT)} bruts/mois (12,31 €/h) depuis le 1er juin 2026`,
            attendu: "Décret mi-décembre. Revalorisation légale : inflation des ménages modestes + ½ du gain de pouvoir d'achat ouvrier. La hausse de juin 2026 a déjà « consommé » une partie de l'inflation.",
            href: "/guides/smic-2027",
            lien: "Notre analyse SMIC 2027",
          },
          {
            quoi: "Plafond de la Sécurité sociale",
            actuel: `${EUR.format(SALAIRE_2026.PASS_MENSUEL)}/mois — ${EUR.format(SALAIRE_2026.PASS_ANNUEL)}/an`,
            attendu: "Arrêté de fin d'année, indexé sur le salaire moyen par tête. Déplace la frontière tranche 1/tranche 2, les minima du portage et les plafonds d'exonération des indemnités.",
            href: "/guides/plafond-securite-sociale-2027",
            lien: "Notre analyse PASS 2027",
          },
          {
            quoi: "Prime de partage de la valeur",
            actuel: "Exonération totale (impôt et CSG compris) sous 3 SMIC dans les entreprises de moins de 50 salariés",
            attendu: "Fin du régime de faveur au 31 décembre 2026 : à partir de 2027, CSG-CRDS et impôt sur le revenu partout. C'est le seul changement déjà certain ET chiffrable.",
            href: "/guides/prime-partage-valeur",
            lien: "Notre guide PPV",
          },
          {
            quoi: "Titres-restaurant",
            actuel: "Exonération patronale jusqu'à 7,32 €/titre ; courses alimentaires autorisées jusqu'au 31 décembre 2026",
            attendu: "Nouveau plafond d'exonération indexé, et surtout : sans prolongation votée d'ici décembre, fin de l'usage en supermarché au 1er janvier.",
            href: "/guides/titres-restaurant",
            lien: "Notre guide titres-restaurant",
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
            quoi: "Plafonds micro-entreprise",
            actuel: "83 600 € (services/BNC) et 203 100 € (vente) — fixés pour 2026-2028",
            attendu: "Pas de changement des plafonds de CA (revalorisation triennale). À surveiller en revanche : taux de cotisations (LFSS) et seuils de franchise de TVA (LF).",
            href: "/guides/plafonds-micro-entreprise-2027",
            lien: "Ce qui est figé, ce qui peut bouger",
          },
          {
            quoi: "Facturation électronique",
            actuel: "Depuis le 1er septembre 2026 : obligation de pouvoir recevoir des factures électroniques",
            attendu: "1er septembre 2027 : obligation d'émettre pour les TPE, PME et micro-entreprises. L'année 2027 est celle du choix d'une plateforme agréée.",
            href: "/actualites/facturation-electronique-1er-septembre-2026",
            lien: "Notre article sur la réforme",
          },
          {
            quoi: "Barème kilométrique",
            actuel: "Barème inchangé depuis 2024 (5 CV : d × 0,636 jusqu'à 5 000 km) ; +20 % pour les électriques",
            attendu: "Arrêté publié vers mars 2027, pour la déclaration des revenus 2026. Gel reconduit ou revalorisation : notre page est mise à jour à la publication.",
            href: "/guides/bareme-kilometrique",
            lien: "Le barème et son calcul",
          },
        ]} />
      </section>

      <section id="impots" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Impôts et prestations
        </h2>
        <Tableau lignes={[
          {
            quoi: "Barème de l'impôt sur le revenu",
            actuel: "Tranches à 0/11/30/41/45 %, seuils indexés de +0,9 % en 2026 (11 600 € / 29 579 € / 84 577 € / 181 917 €)",
            attendu: "Indexation votée en loi de finances fin décembre — le gel du barème est l'un des débats récurrents de chaque automne budgétaire.",
            href: "/guides/bareme-impot-2027",
            lien: "Notre analyse barème 2027",
          },
          {
            quoi: "Avance de crédits d'impôt",
            actuel: "60 % des crédits récurrents versés mi-janvier, calculés sur la dernière déclaration",
            attendu: "Versement autour du 15 janvier 2027. Modulable à la baisse jusqu'à mi-décembre 2026 si vos dépenses ont chuté — sous peine de remboursement l'été suivant.",
            href: "/guides/avance-credit-impot-janvier",
            lien: "Le mécanisme de l'avance",
          },
          {
            quoi: "Pensions de retraite de base",
            actuel: "Revalorisation annuelle automatique sur l'inflation (novembre à octobre)",
            attendu: "Hausse au 1er janvier 2027, estimée autour de +1,6 % à date — chiffre définitif avec l'inflation d'octobre. L'Agirc-Arrco, elle, bouge dès le 1er novembre 2026.",
            href: "/guides/revalorisation-retraites-2027",
            lien: "Les deux revalorisations",
          },
          {
            quoi: "Prime d'activité",
            actuel: `Montant forfaitaire ${EUR2.format(638.28)} depuis avril 2026`,
            attendu: "Revalorisation légale au 1er avril 2027 (pas au 1er janvier). La réforme des bases de calcul issue de la LF 2026 continue de monter en charge.",
            href: "/guides/prime-activite-2027",
            lien: "Montants et conditions",
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
                ["Fin septembre 2026", "Présentation du PLF 2027 et du PLFSS 2027 : premiers chiffres officiels (barème, taux de cotisations)."],
                ["Automne 2026", "Avis de la Commission des comptes de la Sécurité sociale — prépare l'arrêté PASS."],
                ["1er novembre 2026", "Revalorisation Agirc-Arrco (décision des partenaires sociaux)."],
                ["Fin novembre 2026", "Rapport du groupe d'experts sur le SMIC : premier chiffrage de la hausse de janvier."],
                ["Mi-décembre 2026", "Décret SMIC et arrêté PASS au Journal officiel. Date limite pour moduler l'avance de crédits d'impôt."],
                ["Fin décembre 2026", "Promulgation LF 2027 et LFSS 2027 : barème IR, taux micro, mesures diverses."],
                ["1er janvier 2027", "Tout entre en vigueur. Cette page bascule des « attendus » aux montants définitifs, et les constantes de nos simulateurs sont mises à jour le même jour."],
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
