import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, EuroIcon, CalendarIcon, InfoIcon, CalculatorIcon } from "@/components/icons";

// Montant forfaitaire depuis le 1er avril 2026 (+0,8 %) — CAF, décret de revalorisation.
const FORFAIT_2026 = 638.28;
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "prime-activite-2027",
  titre: "Prime d'activité 2027 : montants, conditions, revalorisation",
  sousTitre: `Base de calcul à ${EUR2.format(FORFAIT_2026)} depuis avril 2026 — et une réforme qui monte en charge`,
  chapo: "La prime d'activité complète chaque mois les revenus de plus de 4,5 millions de foyers de travailleurs modestes — salariés, indépendants, apprentis majeurs. Sa prochaine revalorisation légale tombera au 1er avril 2027, pas au 1er janvier, et la réforme des bases de calcul votée en loi de finances 2026 continue de déployer ses effets. Qui y a droit, comment le montant se calcule vraiment, et pourquoi tant d'ayants droit ne la demandent jamais.",
  filAriane: "Prime d'activité 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "qui", label: "Qui y a droit" },
    { id: "calcul", label: "Comment elle se calcule" },
    { id: "calendrier", label: "Le calendrier 2027" },
    { id: "non-recours", label: "Le non-recours massif" },
  ],
  faq: [
    {
      q: "Quel est le montant de la prime d'activité en ce moment ?",
      r: `Il n'existe pas de montant unique : la prime est différentielle, calculée sur les ressources du foyer. Sa brique de base — le montant forfaitaire — s'élève à ${EUR2.format(FORFAIT_2026)} par mois pour une personne seule depuis le 1er avril 2026 (revalorisation de +0,8 %), majoré selon la composition du foyer. À ce forfait s'ajoutent 61 % des revenus professionnels et d'éventuelles bonifications individuelles, puis on soustrait les ressources du foyer : le résultat est votre prime. En pratique, elle va de quelques dizaines d'euros à plus de 300 € mensuels pour un célibataire au SMIC.`,
    },
    {
      q: "Qui peut toucher la prime d'activité ?",
      r: "Toute personne de 18 ans ou plus qui travaille — salarié, indépendant, fonctionnaire — et dont le foyer a des ressources modestes. Ordres de grandeur pour un célibataire sans enfant : des revenus d'activité jusqu'à environ 1 800-1 900 € nets mensuels peuvent ouvrir un droit, davantage avec enfants ou loyer à charge. Les étudiants salariés et apprentis y ont droit s'ils gagnent au moins ~1 100 € nets par mois. Le seul verdict fiable est le simulateur officiel de la CAF : cinq minutes, aucune inscription.",
    },
    {
      q: "La prime d'activité sera-t-elle revalorisée en 2027 ?",
      r: "Oui, mécaniquement : le montant forfaitaire est revalorisé chaque 1er avril en fonction de l'inflation constatée. La hausse d'avril 2026 était de +0,8 % ; celle d'avril 2027 dépendra de l'inflation moyenne mesurée d'ici là. S'y ajoute un chantier plus structurel issu de la loi de finances 2026 : la réforme dite de la « solidarité à la source », qui modifie les bases de calcul avec des déclarations pré-remplies à partir du « montant net social » des bulletins de paie — objectif affiché : moins d'erreurs, moins de non-recours.",
    },
    {
      q: "Les indépendants et micro-entrepreneurs y ont-ils droit ?",
      r: "Oui, et ils l'oublient massivement. Pour un micro-entrepreneur, la CAF retient le chiffre d'affaires après abattement fiscal (71 %, 50 % ou 34 % selon l'activité) comme revenu professionnel. Un freelance BNC qui facture 2 000 € par mois est ainsi considéré comme gagnant 1 320 € — un niveau qui ouvre fréquemment un droit à plusieurs dizaines d'euros mensuels, surtout en début d'activité. La déclaration se fait trimestriellement, comme pour les salariés.",
    },
    {
      q: "La prime d'activité est-elle imposable ? Compte-t-elle pour la retraite ?",
      r: "Non et non : elle n'est pas imposable, n'entre pas dans le revenu fiscal de référence, et n'ouvre aucun droit social — ni retraite, ni chômage. C'est un complément de revenu net d'impôt, versé le 5 du mois environ. Revers de la médaille : elle n'est pas non plus prise en compte par les banques dans la capacité d'emprunt, contrairement au salaire qu'elle complète.",
    },
  ],
  sources: [
    { label: "CAF — la prime d'activité augmente en 2026", href: "https://www.caf.fr/allocataires/actualites/actualites-nationales/la-prime-d-activite-augmente-en-2026" },
    { label: "CAF — le simulateur officiel de la prime d'activité", href: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-professionnelle/la-prime-d-activite" },
    { label: "service-public.fr — prime d'activité", href: "https://www.service-public.fr/particuliers/vosdroits/F2882" },
    { label: "Code de la sécurité sociale, art. L841-1 et suivants (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006073189/" },
  ],
};

export const metadata: Metadata = {
  title: `Prime d'activité 2027 : montant forfaitaire ${EUR2.format(FORFAIT_2026)}, conditions, revalorisation d'avril`,
  description: "Qui a droit à la prime d'activité, comment le montant se calcule (forfait + 61 % des revenus − ressources), la revalorisation du 1er avril 2027, le cas des indépendants — et le non-recours qui prive des centaines de milliers d'ayants droit.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Prime d'activité 2027 : montants et conditions",
    description: "Le calcul réel, le calendrier de revalorisation, et le réflexe simulateur CAF.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="qui" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Qui y a droit — plus de monde qu&apos;on ne croit
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La prime d&apos;activité s&apos;adresse à{" "}
            <strong>tous les travailleurs</strong> de 18 ans et plus aux
            revenus modestes : salariés du privé et du public, indépendants,
            micro-entrepreneurs, exploitants agricoles. Les critères
            s&apos;apprécient au niveau du <strong>foyer</strong> — un
            célibataire au SMIC y a presque toujours droit, un couple avec
            deux salaires moyens rarement, mais la présence d&apos;enfants ou
            d&apos;un seul revenu déplace fortement les seuils.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Trois profils y ont droit sans le savoir : les{" "}
            <strong>apprentis et étudiants salariés</strong> dès ~1 100 € nets
            mensuels (voir notre{" "}
            <Link href="/guides/salaire-apprenti" className="text-primary underline-offset-4 hover:underline">
              guide du salaire d&apos;apprenti
            </Link>
            ), les <strong>indépendants en début d&apos;activité</strong>,
            dont le revenu retenu est le CA après abattement, et les{" "}
            <strong>temps partiels</strong>, pour qui la prime compense une
            partie de la quotité manquante.
          </p>
        </div>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Comment elle se calcule vraiment
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <div className="rounded-xl bg-muted p-5 text-center">
            <p className="font-semibold text-foreground">
              Prime = (montant forfaitaire majoré + 61 % des revenus pro + bonifications) − ressources du foyer
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le montant forfaitaire</strong> : {EUR2.format(FORFAIT_2026)} pour une personne seule depuis avril 2026, majoré de 50 % pour la première personne supplémentaire du foyer, 30 % par personne suivante, et davantage pour les parents isolés.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>61 % des revenus professionnels</strong> s&apos;ajoutent — c&apos;est ce coefficient qui fait que travailler plus augmente (presque) toujours le total revenu + prime, l&apos;esprit même du dispositif.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>La bonification individuelle</strong> monte en puissance entre 0,5 et 1 SMIC de revenu personnel — elle culmine à environ 180 € pour un salarié autour du SMIC à temps plein.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>On soustrait toutes les ressources</strong> : salaires, revenus indépendants, allocations logement (via un forfait), pensions… Le résultat, s&apos;il dépasse un seuil de versement minimal, est versé le 5 du mois environ, et recalculé chaque trimestre sur votre déclaration.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Ordre de grandeur utile : un célibataire au SMIC à temps plein
            touche autour de <strong>250 à 300 € par mois</strong>. Seul le
            simulateur de la CAF donne un chiffre opposable — le nôtre ne
            couvre pas cette prestation, précisément parce que le calcul
            dépend de paramètres de foyer que nous ne collectons pas.
          </p>
        </div>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier 2027
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["Chaque trimestre", "Déclaration trimestrielle de ressources — le montant est recalculé pour les trois mois suivants. Progressivement pré-remplie avec le « montant net social » du bulletin de paie."],
                ["1er avril 2027", "Revalorisation légale du montant forfaitaire sur l'inflation constatée (avril 2026 : +0,8 %). Le chiffre sera publié par décret fin mars — page mise à jour à ce moment."],
                ["Courant 2027", "Poursuite du déploiement de la « solidarité à la source » (LF 2026) : bases de calcul harmonisées, déclarations pré-remplies, avec pour objectif déclaré de réduire erreurs et non-recours."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-44 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          À noter : contrairement au SMIC ou au PASS, <strong>rien ne change
          au 1er janvier</strong> pour la prime d&apos;activité — son
          rendez-vous annuel est en avril. Notre{" "}
          <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
            récapitulatif du 1er janvier 2027
          </Link>{" "}
          la mentionne pour cette raison précise : éviter la confusion des
          calendriers.
        </p>
      </section>

      <section id="non-recours" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Le non-recours : des centaines d&apos;euros laissés à la CAF
        </h2>
        <div className="mt-4 rounded-2xl border-l-4 border-primary bg-muted p-6">
          <p className="text-base leading-relaxed text-foreground/80">
            Les études publiques (DREES) estiment qu&apos;une part
            substantielle des ayants droit ne demande jamais la prime — de
            l&apos;ordre de 30 % selon les dernières évaluations disponibles.
            Les profils les plus touchés : jeunes actifs qui pensent que
            « c&apos;est pour les autres », indépendants qui ignorent que leur
            CA abattu compte comme revenu, salariés dont la situation a changé
            (temps partiel, séparation) sans refaire de simulation. Le
            réflexe : <strong>une simulation CAF par an</strong>, et à chaque
            changement de situation. Cinq minutes, potentiellement plusieurs
            centaines d&apos;euros par an — et pour situer votre salaire
            lui-même, notre simulateur{" "}
            <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">
              « où se situe mon salaire »
            </Link>{" "}
            complète le tableau.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
