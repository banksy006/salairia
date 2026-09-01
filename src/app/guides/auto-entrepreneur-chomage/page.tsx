import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, AlertTriangleIcon, ShieldIcon, CompassIcon, CalculatorIcon } from "@/components/icons";

// Paramètres ATI — France Travail / Unédic, vérifiés le 19 août 2026.
const ATI = {
  MIN_JOUR: 19.73,
  MAX_JOUR: 26.3,
  DUREE_JOURS: 182,
  REVENU_MIN_ANNUEL: 10_000,
  ANNEES_ACTIVITE: 2,
};
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "auto-entrepreneur-chomage",
  titre: "Auto-entrepreneur et chômage",
  sousTitre: "Pas d'ARE, une ATI très restrictive — et un vrai levier dans l'autre sens",
  chapo: `Le micro-entrepreneur ne cotise pas à l'assurance chômage : arrêter son activité n'ouvre droit à aucune ARE. Il existe bien une allocation dédiée, l'ATI — plafonnée à environ ${EUR.format(ATI.MAX_JOUR * 30)} par mois pendant six mois, sous des conditions que peu remplissent. Le vrai jeu se joue dans l'autre sens : cumuler des droits au chômage déjà acquis avec une micro-entreprise. Les deux mécaniques, précisément.`,
  filAriane: "Auto-entrepreneur et chômage",
  datePublished: "2026-08-19",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "pas-are", label: "Pourquoi pas d'ARE" },
    { id: "ati", label: "L'ATI en détail" },
    { id: "cumul", label: "Cumuler ARE et micro" },
    { id: "comparer", label: "Si le chômage compte" },
  ],
  faq: [
    {
      q: "Un auto-entrepreneur qui arrête son activité touche-t-il le chômage ?",
      r: "Pas l'ARE, non : aucune cotisation chômage n'est prélevée sur le chiffre d'affaires d'un micro-entrepreneur, donc aucun droit ne se constitue. La seule allocation accessible est l'ATI — Allocation des Travailleurs Indépendants — dont les conditions sont restrictives : au moins deux ans d'activité continue dans la même entreprise, environ 10 000 € de revenus annuels sur au moins une des deux dernières années, une cessation liée à une activité non viable, et des ressources personnelles inférieures au RSA.",
    },
    {
      q: "Combien verse l'ATI, et pendant combien de temps ?",
      r: `Entre ${EUR2.format(ATI.MIN_JOUR)} et ${EUR2.format(ATI.MAX_JOUR)} par jour selon vos revenus antérieurs — soit environ ${EUR.format(ATI.MIN_JOUR * 30)} à ${EUR.format(ATI.MAX_JOUR * 30)} par mois — pendant ${ATI.DUREE_JOURS} jours maximum, environ six mois, non renouvelables. C'est un filet de dernier recours, pas un revenu de transition comparable à l'ARE d'un salarié.`,
    },
    {
      q: "Je suis au chômage : est-ce que créer une micro-entreprise supprime mon ARE ?",
      r: "Non — et c'est le mécanisme le plus utile de ce guide. Vos droits ARE, acquis au titre d'un emploi salarié antérieur, se cumulent avec les revenus de la micro-entreprise : France Travail déduit une partie de vos revenus d'activité de l'allocation mensuelle, et les jours non indemnisés sont reportés en fin de droits. Vous ne perdez pas vos droits, vous les étalez. Un mois sans chiffre d'affaires est indemnisé plein pot.",
    },
    {
      q: "Vaut-il mieux prendre l'ARCE ou garder le cumul mensuel ?",
      r: "L'ARCE verse 60 % de vos droits restants en deux fois, en capital, contre l'abandon du versement mensuel. Elle a du sens si votre activité démarre vite et a besoin de trésorerie immédiate. Le cumul mensuel protège mieux si le lancement est incertain : chaque mois creux reste indemnisé. Beaucoup de créateurs regrettent une ARCE prise trop tôt — une fois choisie, on ne revient pas au cumul.",
    },
    {
      q: "Le portage salarial est-il une meilleure option si je veux cotiser au chômage ?",
      r: "C'est le seul statut d'indépendant qui cotise réellement à l'assurance chômage : le salarié porté ouvre des droits ARE calculés sur son salaire brut, comme n'importe quel salarié. Le prix de cette sécurité est un taux de prélèvement global plus élevé qu'en micro. Si la couverture chômage est un critère décisif — crédit en cours, famille, marché instable — la comparaison mérite d'être faite chiffres en main avec notre simulateur multi-statuts.",
    },
  ],
  sources: [
    { label: "France Travail — l'allocation des travailleurs indépendants (ATI)", href: "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/aides-financieres-et-autres-allo/autres-allocations/lallocation-pour-les-travailleur.html" },
    { label: "Unédic — allocation des travailleurs indépendants", href: "https://www.unedic.org/la-reglementation/fiches-thematiques/allocation-des-travailleurs-independants-ati" },
    { label: "Unédic — cumul allocation et salaire", href: "https://www.unedic.org/la-reglementation/fiches-thematiques/cumul-allocation-salaire" },
    { label: "France Travail — site dédié ATI", href: "https://chomage-independant.francetravail.fr/accueil_ati" },
  ],
};

export const metadata: Metadata = {
  title: "Auto-entrepreneur et chômage : ATI, cumul ARE, ce qui existe vraiment (2026)",
  description: `Pas d'ARE pour le micro-entrepreneur. L'ATI : ${EUR2.format(ATI.MIN_JOUR)} à ${EUR2.format(ATI.MAX_JOUR)}/jour pendant 6 mois sous conditions strictes. Et le cumul ARE + micro-entreprise, le mécanisme qui fonctionne vraiment.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Auto-entrepreneur et chômage : ce qui existe vraiment",
    description: "ATI, cumul ARE-micro, ARCE : les trois mécanismes détaillés.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="pas-are" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Pourquoi le micro-entrepreneur n&apos;a pas d&apos;ARE
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le taux global de cotisations du micro-entrepreneur — 25,6 % en BNC,
            21,2 % en services BIC, 12,3 % en vente — couvre la maladie, la
            retraite, les allocations familiales et la CSG.{" "}
            <strong>Aucune fraction n&apos;alimente l&apos;assurance
            chômage.</strong> La logique est la même que pour tous les
            travailleurs indépendants : pas de lien de subordination, pas
            d&apos;affiliation à l&apos;Unédic, pas de droits.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Concrètement : une activité qui s&apos;arrête — perte du client
            principal, marché qui se retourne — ne déclenche{" "}
            <strong>aucune indemnisation</strong>, quel que soit le chiffre
            d&apos;affaires des années précédentes. C&apos;est le revers du
            taux de prélèvement réduit du régime micro, et il doit être
            provisionné comme un risque réel.
          </p>
        </div>
      </section>

      <section id="ati" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          L&apos;ATI : le filet, et ses mailles larges
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Créée en 2019, l&apos;Allocation des Travailleurs Indépendants est la
          seule allocation chômage accessible aux indépendants. Ses paramètres,
          vérifiés auprès de France Travail :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <tbody>
              {[
                ["Montant journalier", `${EUR2.format(ATI.MIN_JOUR)} à ${EUR2.format(ATI.MAX_JOUR)} selon les revenus antérieurs`],
                ["Équivalent mensuel", `environ ${EUR.format(ATI.MIN_JOUR * 30)} à ${EUR.format(ATI.MAX_JOUR * 30)}`],
                ["Durée", `${ATI.DUREE_JOURS} jours (~6 mois), non renouvelable`],
                ["Ancienneté exigée", `${ATI.ANNEES_ACTIVITE} ans d'activité continue dans la même entreprise`],
                ["Revenus exigés", `au moins ${EUR.format(ATI.REVENU_MIN_ANNUEL)} sur une des deux dernières années`],
                ["Cessation", "activité non viable économiquement (ou liquidation/redressement)"],
                ["Ressources", "inférieures au montant du RSA"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-border last:border-b-0">
                  <td className="w-56 px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La combinaison des conditions — deux ans dans la même entreprise,{" "}
          {EUR.format(ATI.REVENU_MIN_ANNUEL)} de revenus <em>et</em> des
          ressources sous le RSA — exclut la grande majorité des
          micro-entrepreneurs qui arrêtent. L&apos;ATI protège contre
          l&apos;effondrement d&apos;une activité établie, pas contre un simple
          creux. À noter : en cours d&apos;ATI, une reprise d&apos;activité est
          intégralement cumulable pendant trois mois.
        </p>
      </section>

      <section id="cumul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Le mécanisme qui marche : cumuler ARE et micro-entreprise
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le sens utile du cumul n&apos;est pas « micro vers chômage » mais{" "}
            <strong>« chômage vers micro »</strong> : un salarié qui perd son
            emploi, ouvre ses droits ARE puis crée sa micro-entreprise conserve
            ses allocations. Chaque mois, France Travail déduit une partie des
            revenus d&apos;activité déclarés ; les jours non indemnisés sont{" "}
            <strong>reportés en fin de droits</strong>, pas perdus. Un mois sans
            chiffre d&apos;affaires reste indemnisé intégralement.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            C&apos;est le meilleur amortisseur de lancement qui existe : la
            micro-entreprise démarre sans pression de revenu, l&apos;ARE
            s&apos;ajuste à la réalité de chaque mois. L&apos;alternative — l&apos;ARCE,
            60 % des droits versés en capital — échange cette souplesse contre
            de la trésorerie immédiate. Le choix dépend du profil de démarrage :
            carnet de commandes déjà rempli, ARCE défendable ; lancement
            incertain, cumul mensuel.
          </p>
          <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Ne confondez pas les
              dispositifs :</strong> l&apos;ACRE (réduction de 25 % des
              cotisations la première année) se cumule avec tout ce qui précède
              — mais depuis 2026 elle doit être demandée dans les 60 jours du
              début d&apos;activité. Notre{" "}
              <Link href="/actualites/acre-2026-exoneration-reduite-delai-60-jours" className="underline underline-offset-4">
                article sur la réforme ACRE
              </Link>{" "}
              détaille le piège du délai.
            </p>
          </div>
        </div>
      </section>

      <section id="comparer" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Si la couverture chômage est un critère décisif
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Trois statuts d&apos;indépendant, trois réalités : la
            micro-entreprise n&apos;ouvre aucun droit, la SASU non plus — son
            président est exclu de l&apos;assurance chômage, voir notre{" "}
            <Link href="/guides/sasu-chomage-dirigeant" className="text-primary underline-offset-4 hover:underline">
              guide dédié
            </Link>{" "}
            —, et seul le{" "}
            <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">
              portage salarial
            </Link>{" "}
            cotise et ouvre une vraie ARE. Cette sécurité a un prix : environ
            la moitié du chiffre d&apos;affaires part en prélèvements, contre
            un quart en micro.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            L&apos;arbitrage se fait chiffres en main, pas sur le principe :
          </p>
          <Link href="/simulateurs/tjm-freelance" className="mt-4 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            Comparer micro, portage, SASU et EURL sur mon TJM →
          </Link>
        </div>
      </section>
    </GuideShell>
  );
}
