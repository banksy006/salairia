import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, AlertTriangleIcon, ShieldIcon, CompassIcon } from "@/components/icons";
import { calculerPortage } from "@/lib/calculators/portage";
import { calculerAre } from "@/lib/calculators/are";

// Point de comparaison : ce qu'un consultant équivalent obtient en portage,
// où les cotisations chômage existent. Calculé, pas affirmé.
const portage = calculerPortage({
  tjm: 500,
  joursTravailles: 18,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
});
const are = calculerAre(portage.salaireBrut * 12);
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "sasu-chomage-dirigeant",
  titre: "SASU et chômage du dirigeant",
  sousTitre: "« Assimilé salarié » ne veut pas dire assuré chômage — et presque personne ne le sait avant de créer",
  chapo: "C'est l'angle mort le plus coûteux du statut SASU. Le président cotise au régime général, reçoit un bulletin de paie, paie des charges comparables à celles d'un salarié — mais ne cotise pas à l'assurance chômage et n'ouvre aucun droit à l'ARE si la société s'arrête. Voici pourquoi, les exceptions réelles, et les alternatives qui existent.",
  filAriane: "SASU et chômage",
  datePublished: "2026-08-19",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "pourquoi", label: "Pourquoi pas de chômage" },
    { id: "exceptions", label: "Les vraies exceptions" },
    { id: "alternatives", label: "Les alternatives" },
    { id: "comparaison", label: "Face au portage" },
  ],
  faq: [
    {
      q: "Le président de SASU cotise-t-il à l'assurance chômage ?",
      r: "Non. En tant que mandataire social, il exerce sans lien de subordination — le critère qui fonde l'affiliation à l'assurance chômage. Ses bulletins de paie comportent bien des cotisations (maladie, retraite, CSG), mais pas la cotisation chômage. Conséquence directe : si la société cesse son activité, il ne perçoit aucune ARE, quels que soient les salaires qu'il s'est versés.",
    },
    {
      q: "Et si le président se verse un vrai salaire chaque mois ?",
      r: "Cela ne change rien au chômage. Le montant et la régularité de la rémunération du mandat n'ouvrent aucun droit à l'ARE, car le problème n'est pas le salaire mais l'absence de contrat de travail subordonné. Le salaire du président crée des droits à la retraite et à la maladie — pas au chômage. C'est la nuance exacte du statut « assimilé salarié » : assimilé pour la Sécurité sociale, pas pour l'Unédic.",
    },
    {
      q: "Un président peut-il cumuler son mandat avec un contrat de travail dans sa propre SASU ?",
      r: "En théorie oui, et c'est la seule voie interne vers l'assurance chômage : un contrat de travail portant sur des fonctions techniques distinctes du mandat, avec un lien de subordination réel. En pratique, dans une SASU où le président est l'unique associé, ce lien de subordination est presque impossible à caractériser — on ne peut pas être son propre subordonné. France Travail peut se prononcer en amont via une demande de rescrit, avec réponse sous deux mois : c'est la seule façon d'avoir une certitude.",
    },
    {
      q: "Je touche l'ARE et je crée une SASU : est-ce que je perds mes droits ?",
      r: "Non — c'est le scénario inverse, et il fonctionne bien. Un demandeur d'emploi indemnisé qui crée sa SASU peut maintenir son ARE (réduite en fonction de la rémunération qu'il se verse — d'où l'intérêt du salaire zéro au démarrage) ou opter pour l'ARCE, le versement de 60 % de ses droits en capital. Ce sont des droits acquis au titre d'un emploi salarié antérieur, pas des droits créés par la SASU. Une fois ces droits épuisés, la SASU n'en régénère aucun.",
    },
    {
      q: "L'assurance chômage privée pour dirigeant vaut-elle le coup ?",
      r: "Elle existe — des contrats type GSC ou équivalents — et c'est la seule couverture perte d'emploi accessible à un président de SASU. Comptez plusieurs points de pourcentage du revenu en cotisation annuelle, des délais de carence de 12 mois ou plus, et des indemnisations plafonnées dans le temps. Utile pour un dirigeant dont la famille dépend du revenu ; rarement souscrite par les solo-entrepreneurs en début d'activité, qui préfèrent provisionner eux-mêmes une réserve de sécurité.",
    },
  ],
  sources: [
    { label: "Unédic — je suis dirigeant et salarié de mon entreprise, ai-je droit aux allocations ?", href: "https://www.unedic.org/l-assurance-chomage-et-vous/demandeur-d-emploi-ou-salarie/mes-droits-en-fonction-de-mon-statut-professionnel/je-suis-dirigeant-et-salarie-de-mon-entreprise-ai-je-droit-aux-allocations-chomage" },
    { label: "Unédic — mandataires sociaux et assurance chômage", href: "https://www.unedic.org/publications/mandataires-sociaux-dans-quelles-situations-peuvent-ils-ou-non-beneficier-de" },
    { label: "France Travail — je suis dirigeant d'entreprise, associé", href: "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/a-chaque-situation-son-allocatio/quel-est-mon-metier-mon-secteur/je-suis-dirigeante-dentreprise-a.html" },
    { label: "Bpifrance Création — le dirigeant assimilé salarié", href: "https://bpifrance-creation.fr/encyclopedie/statut-du-dirigeant-son-conjoint/regime-social-du-dirigeant/dirigeant-assimile-salarie" },
    { label: "Bpifrance Création — cumul d'un mandat social et d'un contrat de travail", href: "https://bpifrance-creation.fr/encyclopedie/statut-du-dirigeant-son-conjoint/situation-pluriactifs/cumul-dun-mandat-social-dun" },
  ],
};

export const metadata: Metadata = {
  title: "SASU et chômage : le président n'a pas droit à l'ARE (2026)",
  description: "Le président de SASU est assimilé salarié mais ne cotise pas à l'assurance chômage : aucune ARE si la société s'arrête. Les exceptions réelles, le rescrit France Travail, l'assurance privée, et la comparaison chiffrée avec le portage.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "SASU : pourquoi le président n'a pas droit au chômage",
    description: "L'angle mort le plus coûteux du statut, les exceptions et les alternatives.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="pourquoi" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Pourquoi « assimilé salarié » exclut le chômage
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;assurance chômage couvre les personnes liées par un{" "}
            <strong>contrat de travail</strong>, c&apos;est-à-dire placées dans
            un lien de subordination envers un employeur. Le président de SASU
            exerce un <strong>mandat social</strong> : il dirige, il ne se
            subordonne à personne. L&apos;Unédic est constante sur ce point —
            les mandataires sociaux ne relèvent pas, en principe, de
            l&apos;assurance chômage.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La confusion vient du terme « assimilé salarié », qui ne vaut que
            pour la <strong>Sécurité sociale</strong> : maladie, maternité,
            retraite de base et complémentaire. Le bulletin de paie du président
            ressemble à celui d&apos;un salarié — mais la ligne « assurance
            chômage » n&apos;y figure pas, et aucun droit ne se constitue. On
            découvre souvent cette réalité au pire moment : quand la société
            ferme.
          </p>
        </div>
      </section>

      <section id="exceptions" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Les exceptions réelles — et leurs limites
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Le cumul mandat + contrat de travail</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Un président qui exerce <em>en plus</em> des fonctions techniques
              distinctes, sous subordination réelle, peut être couvert au titre
              de ce contrat. Dans une SASU unipersonnelle, cette subordination
              est presque impossible à établir — on ne se donne pas
              d&apos;ordres à soi-même. Le <strong>rescrit France Travail</strong>{" "}
              permet de faire trancher la question en amont, sous deux mois.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les droits antérieurs à la création</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Un salarié qui quitte son emploi puis crée sa SASU conserve ses
              droits ARE acquis — il peut les percevoir en parallèle (réduits
              selon sa rémunération de président) ou en capital via
              l&apos;ARCE. Ce filet existe, mais il s&apos;épuise : la SASU
              elle-même n&apos;en régénérera jamais.
            </p>
          </div>
        </div>
      </section>

      <section id="alternatives" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Se couvrir autrement
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-4 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span>
                <strong>L&apos;assurance perte d&apos;emploi privée</strong>{" "}
                (contrats de type GSC) : la seule vraie couverture, au prix de
                cotisations significatives, de carences longues et de
                conditions strictes. À étudier sérieusement si un foyer dépend
                de votre revenu.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span>
                <strong>L&apos;auto-assurance</strong> : provisionner en société
                ou à titre personnel l&apos;équivalent de 6 à 12 mois de
                dépenses. C&apos;est la stratégie la plus répandue chez les
                solo-entrepreneurs — elle demande de la discipline, pas de
                paperasse.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span>
                <strong>Choisir un statut qui cotise</strong> : si la sécurité
                chômage est un critère décisif pour vous, le portage salarial
                est le seul statut d&apos;indépendant qui la fournit réellement.
                La comparaison chiffrée est ci-dessous.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section id="comparaison" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Ce que le portage offre et que la SASU n&apos;offre pas
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Un consultant à 500 € de TJM sur 18 jours en portage salarial
            construit, lui, de vrais droits : sur un an à ce rythme, son salaire
            brut de {EUR.format(portage.salaireBrut * 12)} lui ouvrirait une ARE
            d&apos;environ{" "}
            <strong>{EUR.format(are.allocationMensuelle)} bruts par mois</strong>{" "}
            — calculée par notre simulateur avec les paramètres Unédic 2026. Le
            président de SASU au même niveau d&apos;activité : zéro.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Ce n&apos;est pas un argument pour ou contre la SASU — le portage
            coûte plus cher en prélèvements, la SASU offre les dividendes et une
            liberté de structure. C&apos;est un paramètre à mettre dans la
            balance <em>avant</em> de créer, pas après. Nos guides{" "}
            <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">
              portage et chômage
            </Link>{" "}
            et{" "}
            <Link href="/guides/salaire-president-sasu" className="text-primary underline-offset-4 hover:underline">
              salaire du président de SASU
            </Link>{" "}
            détaillent chaque branche.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/simulateurs/tjm-freelance" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              Comparer les 4 statuts sur mes chiffres →
            </Link>
            <Link href="/simulateurs/sasu-eurl" className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary">
              Simuler ma SASU
            </Link>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
