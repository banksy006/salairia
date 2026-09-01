import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ScaleIcon, CalendarIcon, SearchIcon, InfoIcon } from "@/components/icons";

// Slug sans millésime : le dossier va s'étaler de 2026 à 2028, la page suit
// le processus de transposition et sera mise à jour à chaque étape.
const meta: GuideMeta = {
  slug: "transparence-salaires",
  titre: "Transparence des salaires : ce qui va changer en France",
  sousTitre: "Fourchette obligatoire dans les offres d'emploi, interdiction de demander votre salaire actuel, droit de connaître les écarts",
  chapo: "La directive européenne 2023/970 va renverser le rapport de force salarial : fourchette de rémunération obligatoire dans les offres d'emploi, interdiction pour l'employeur de demander votre salaire précédent, droit d'obtenir les niveaux moyens par catégorie et par sexe. La France devait la transposer avant le 7 juin 2026 ; le projet de loi a été transmis au Conseil d'État à cette date, pour un vote attendu fin 2026 et une entrée en vigueur visée au 1er janvier 2028. Voici ce que le texte prévoit, et ce que ça change concrètement pour votre prochaine négociation.",
  filAriane: "Transparence des salaires",
  datePublished: "2026-08-29",
  dateModified: "2026-08-29",
  tocItems: [
    { id: "quoi", label: "Ce que la directive impose" },
    { id: "calendrier", label: "Où en est la France" },
    { id: "candidat", label: "Ce que ça change pour vous" },
    { id: "employeur", label: "Ce que ça change pour les entreprises" },
  ],
  faq: [
    {
      q: "Les entreprises devront-elles afficher les salaires dans leurs offres d'emploi ?",
      r: "Oui. La directive impose que le candidat connaisse, avant l'entretien, la rémunération initiale ou sa fourchette, ainsi que les dispositions conventionnelles applicables au poste. L'information doit figurer dans l'offre d'emploi ou être communiquée avant le premier entretien. C'est le changement le plus visible du texte : la fin des offres « rémunération selon profil », qui restent aujourd'hui la norme en France.",
      },
    {
      q: "Un recruteur pourra-t-il encore me demander mon salaire actuel ?",
      r: "Non, et c'est sans doute la disposition la plus structurante. La directive interdit à l'employeur de demander au candidat son historique de rémunération — ni son salaire actuel, ni ses salaires précédents. La logique est claire : ancrer une proposition sur le salaire passé reproduit et amplifie les écarts existants, notamment entre femmes et hommes. Une personne sous-payée dans son poste actuel le restait mécaniquement en changeant d'entreprise ; ce mécanisme disparaît.",
    },
    {
      q: "Quelles entreprises sont concernées ?",
      r: "Toutes, sans seuil d'effectif, pour les obligations liées au recrutement (fourchette dans l'offre, interdiction de demander l'historique) et pour le droit à l'information des salariés. En revanche, l'obligation de reporting sur les écarts de rémunération entre femmes et hommes est graduée selon la taille : les grandes entreprises publieront les premières, avec des seuils et une périodicité qui s'élargiront ensuite aux structures plus petites. Le détail exact des seuils français dépendra de la loi de transposition.",
    },
    {
      q: "Que se passe-t-il si un écart injustifié est constaté ?",
      r: "La directive prévoit un déclencheur chiffré : lorsqu'un écart de rémunération d'au moins 5 % entre femmes et hommes est constaté dans une catégorie de postes et n'est pas justifié par des critères objectifs et neutres, l'employeur doit y remédier — au besoin par une évaluation conjointe avec les représentants du personnel. Autre renversement majeur : la charge de la preuve pèse sur l'employeur, qui doit démontrer l'absence de discrimination, et non sur le salarié qui l'allègue.",
    },
    {
      q: "Quand cela s'appliquera-t-il concrètement en France ?",
      r: "Le calendrier a pris du retard. La date limite de transposition était fixée au 7 juin 2026 ; c'est ce jour-là que le projet de loi français a été transmis au Conseil d'État. Le vote est attendu d'ici la fin 2026, pour une entrée en vigueur visée au 1er janvier 2028 — un délai destiné à laisser aux entreprises le temps d'adapter leurs grilles et leurs processus de recrutement. Ce calendrier reste indicatif tant que la loi n'est pas promulguée : cette page sera mise à jour à chaque étape parlementaire.",
    },
  ],
  sources: [
    { label: "Directive (UE) 2023/970 du 10 mai 2023 — transparence des rémunérations (EUR-Lex)", href: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32023L0970" },
    { label: "Commission européenne — égalité de rémunération et transparence", href: "https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/gender-equality/equal-pay_fr" },
    { label: "travail-emploi.gouv.fr — égalité professionnelle et index de l'égalité", href: "https://travail-emploi.gouv.fr/index-egalite-professionnelle-calcul-questions-reponses-et-services-d-accompagnement" },
    { label: "service-public.fr — égalité de rémunération femmes-hommes", href: "https://entreprendre.service-public.fr/vosdroits/F1631" },
  ],
};

export const metadata: Metadata = {
  title: "Transparence des salaires : fourchettes obligatoires, ce qui change en France",
  description:
    "La directive européenne 2023/970 impose la fourchette de salaire dans les offres d'emploi, interdit de demander votre rémunération actuelle et ouvre un droit d'information sur les écarts. Transposition française : projet de loi au Conseil d'État depuis juin 2026, entrée en vigueur visée au 1er janvier 2028.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Transparence des salaires : ce qui va changer en France",
    description: "Fourchettes obligatoires, fin de la question du salaire actuel, droit à l'information.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="quoi" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les quatre obligations qui changent tout
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              t: "Fourchette dans l'offre d'emploi",
              d: "Le candidat doit connaître la rémunération initiale ou sa fourchette, et la convention collective applicable, avant le premier entretien. Fin du « selon profil ».",
            },
            {
              t: "Interdiction de demander le salaire actuel",
              d: "L'employeur ne peut plus interroger le candidat sur ses rémunérations passées. C'est ce qui brise la reproduction des écarts d'un emploi au suivant.",
            },
            {
              t: "Droit à l'information des salariés",
              d: "Chaque salarié peut demander son niveau de rémunération et les niveaux moyens, ventilés par sexe, pour les catégories de postes de valeur égale.",
            },
            {
              t: "Reporting des écarts et correction",
              d: "Un écart d'au moins 5 % non justifié dans une catégorie déclenche une obligation d'évaluation conjointe et de correction.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-5">
          <p className="text-base leading-relaxed text-foreground/80">
            <strong className="text-foreground">Le renversement le plus lourd est procédural :</strong>{" "}
            la charge de la preuve passe du salarié à l&apos;employeur. En cas
            de contestation, ce n&apos;est plus à vous de démontrer la
            discrimination, mais à l&apos;entreprise de prouver que
            l&apos;écart repose sur des critères objectifs et neutres. Une
            entreprise qui n&apos;a pas documenté sa politique salariale ne
            pourra pas se défendre.
          </p>
        </div>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Où en est la France
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["10 mai 2023", "Adoption de la directive (UE) 2023/970 par le Parlement européen et le Conseil."],
                ["7 juin 2026", "Date limite de transposition en droit national. Le projet de loi français est transmis au Conseil d'État ce jour-là."],
                ["Fin 2026", "Vote attendu du texte de transposition — c'est lui qui fixera les seuils d'effectif et le calendrier de reporting propres à la France."],
                ["1er janvier 2028", "Entrée en vigueur visée, pour laisser aux entreprises le temps d'adapter grilles et processus."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-40 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les dates postérieures à la transmission au Conseil d&apos;État sont
          des objectifs annoncés, pas des certitudes : tant que la loi
          n&apos;est pas promulguée, seuils, obligations et délais peuvent
          bouger au fil des débats. Cette page est mise à jour à chaque étape —
          comme les autres échéances suivies dans notre{" "}
          <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
            récapitulatif du 1er janvier 2027
          </Link>
          .
        </p>
      </section>

      <section id="candidat" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><SearchIcon className="w-4 h-4" /></IconBadge>
          Ce que ça change quand vous négociez
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Aujourd&apos;hui, la négociation salariale française repose sur une
            asymétrie d&apos;information presque totale : l&apos;employeur
            connaît sa grille, son budget et souvent votre salaire actuel ;
            vous ne connaissez rien. La directive inverse méthodiquement chacun
            de ces points.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Vous entrez en entretien en connaissant la fourchette</strong> — la discussion porte sur votre positionnement dedans, plus sur un chiffre que vous devez deviner.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Votre salaire actuel devient hors sujet</strong>. Une personne sous-payée cesse de traîner son historique d&apos;un poste au suivant.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>En poste, vous pourrez demander les niveaux moyens</strong> de votre catégorie, par sexe. Un argument de rattrapage autrement plus solide qu&apos;une estimation de marché.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            D&apos;ici là, la meilleure préparation reste de s&apos;ancrer sur
            des données externes : notre{" "}
            <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">
              simulateur de négociation
            </Link>{" "}
            situe votre métier dans une fourchette de marché, et{" "}
            <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">
              « où se situe mon salaire »
            </Link>{" "}
            vous donne votre percentile dans la distribution française. Deux
            chiffres qui remplacent, en attendant, la fourchette que
            l&apos;employeur ne publie pas encore.
          </p>
        </div>
      </section>

      <section id="employeur" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que les entreprises doivent préparer
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le chantier est plus lourd qu&apos;il n&apos;y paraît, et c&apos;est
            pourquoi le délai court jusqu&apos;en 2028. Publier une fourchette
            suppose d&apos;en avoir une : beaucoup de PME françaises
            rémunèrent au cas par cas, sans grille formalisée. Or dès que les
            fourchettes deviennent publiques, les écarts internes le
            deviennent aussi — un salarié en poste verra ce que
            l&apos;entreprise propose pour son propre métier.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Cartographier les postes de valeur égale</strong> selon des critères objectifs (compétences, responsabilités, conditions de travail) — c&apos;est la base de tout le dispositif.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Mesurer les écarts avant qu&apos;ils ne soient publics</strong>, et documenter ce qui les justifie objectivement. Le seuil de 5 % est le déclencheur à surveiller.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Reprendre les processus de recrutement</strong> : retirer la question du salaire actuel des trames d&apos;entretien et des formulaires de candidature.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>Anticiper l&apos;effet interne</strong> : la première offre publiée avec fourchette sera lue par vos salariés en poste. Mieux vaut avoir traité les écarts avant.</span>
            </li>
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ce mouvement rejoint une tendance plus large : après l&apos;index de
          l&apos;égalité professionnelle, la transparence salariale devient la
          norme européenne. Pour les salariés, c&apos;est le changement le plus
          favorable en matière de rémunération depuis des années — et
          précisément la raison d&apos;être de Salairia : savoir ce que vous
          touchez, et ce que vous vaudriez ailleurs.
        </p>
      </section>
    </GuideShell>
  );
}
