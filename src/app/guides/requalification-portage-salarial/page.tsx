import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, AlertTriangleIcon, ScaleIcon, ShieldIcon, InfoIcon } from "@/components/icons";
import { salaireMinimumMensuel } from "@/lib/calculators/portage";

const MIN_JUNIOR = salaireMinimumMensuel("junior");
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "requalification-portage-salarial",
  titre: "Requalification du portage salarial en CDI : quand le risque devient réel",
  sousTitre: "Le portage protège tant qu'il reste du portage — voici les six signaux qui font basculer un juge",
  chapo: "Le portage salarial est parfaitement légal et strictement encadré depuis l'ordonnance de 2015. Mais il a une frontière : dès lors que le consultant se comporte comme un salarié du client — horaires imposés, lien de subordination, intégration dans les équipes —, un juge peut requalifier la relation en contrat de travail avec l'entreprise cliente. Voici ce qui déclenche la requalification, qui la demande, et ce qu'elle coûte de chaque côté.",
  filAriane: "Requalification",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "cadre", label: "Ce que la loi autorise" },
    { id: "signaux", label: "Les six signaux de risque" },
    { id: "consequences", label: "Ce que ça change" },
    { id: "eviter", label: "Comment sécuriser sa mission" },
  ],
  faq: [
    {
      q: "Le portage salarial peut-il être requalifié en CDI ?",
      r: "Oui, dans deux directions distinctes. La requalification la plus redoutée vise la relation avec l'entreprise cliente : si le consultant travaille dans les conditions d'un salarié — subordination, horaires imposés, moyens fournis, intégration hiérarchique —, le juge peut considérer que le contrat de prestation masque un contrat de travail avec le client. La seconde vise la société de portage elle-même : un CDD de mission irrégulier (durée dépassée, mentions manquantes, recours injustifié) se requalifie en CDI de portage. Les deux relèvent du conseil de prud'hommes.",
    },
    {
      q: "Quel est le critère décisif retenu par les juges ?",
      r: "Le lien de subordination, comme dans tout contentieux de qualification du contrat de travail. La Cour de cassation le caractérise par l'exécution d'un travail sous l'autorité d'un employeur qui a le pouvoir de donner des ordres et des directives, d'en contrôler l'exécution et de sanctionner les manquements. Peu importe le nom donné au contrat : c'est la réalité des conditions d'exercice qui compte. Un consultant qui pointe, suit les horaires de l'entreprise, reçoit des consignes quotidiennes de son « manager » et figure dans l'organigramme coche toutes les cases, quel que soit le contrat signé.",
    },
    {
      q: "Quelles activités sont interdites en portage salarial ?",
      r: `Le Code du travail exclut expressément les services à la personne et la garde d'enfants du champ du portage. Il interdit aussi le recours au portage pour remplacer un salarié gréviste ou pour effectuer des travaux particulièrement dangereux. Enfin, le portage suppose une prestation qui ne relève pas de l'activité normale et permanente de l'entreprise cliente : porter quelqu'un sur un poste structurel, à temps plein, pendant des années, fragilise la construction. S'y ajoute le plancher de rémunération conventionnel — ${EUR.format(MIN_JUNIOR)} par mois minimum pour un junior en 2026 — dont le non-respect est en soi une irrégularité.`,
    },
    {
      q: "Qui peut demander la requalification, et dans quel délai ?",
      r: "Le salarié porté, en saisissant le conseil de prud'hommes. L'URSSAF peut aussi requalifier lors d'un contrôle, avec un angle différent : le redressement de cotisations. L'action prud'homale en requalification se prescrit par deux ans à compter de la rupture pour les demandes liées à l'exécution du contrat, et par trois ans pour les rappels de salaire. En pratique, la demande émane presque toujours d'un consultant dont la mission s'arrête brutalement et qui découvre qu'il travaillait, de fait, comme un salarié.",
    },
    {
      q: "Que risque l'entreprise cliente en cas de requalification ?",
      r: "Beaucoup : la relation devient un CDI depuis l'origine. L'entreprise doit alors les rappels de salaire sur la différence entre ce qui a été facturé et ce qu'aurait perçu un salarié à poste équivalent, les congés payés afférents, les cotisations sociales sur toute la période, et — si la rupture est intervenue — les indemnités de licenciement sans cause réelle et sérieuse. S'y ajoute le risque pénal du travail dissimulé si la dissimulation est caractérisée. C'est pour cela que les grandes entreprises encadrent strictement le recours au portage : le risque est chez elles, pas chez le consultant.",
    },
  ],
  sources: [
    { label: "Code du travail, art. L1254-1 à L1254-31 — portage salarial (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
    { label: "Code du travail, art. L1254-3 à L1254-5 — activités et cas interdits (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000030431803" },
    { label: "Cour de cassation — critères du lien de subordination", href: "https://www.courdecassation.fr/" },
    { label: "service-public.fr — portage salarial", href: "https://entreprendre.service-public.fr/vosdroits/F31620" },
  ],
};

export const metadata: Metadata = {
  title: "Requalification du portage salarial en CDI : les 6 signaux de risque",
  description: "Le portage est légal, mais la subordination au client peut le faire requalifier en contrat de travail. Les critères retenus par les juges, les activités interdites, les délais de prescription et ce que la requalification coûte au client comme au consultant.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Requalification du portage salarial : quand le risque devient réel",
    description: "Les six signaux qui font basculer un juge, et comment sécuriser sa mission.",
    url: `/guides/${meta.slug}`,
  },
};

const SIGNAUX = [
  { t: "Horaires imposés par le client", d: "Vous devez être présent de 9 h à 18 h, badger, ou justifier vos absences auprès du client. Le consultant en portage organise son temps ; il s'engage sur un résultat, pas sur une présence." },
  { t: "Lien hiérarchique visible", d: "Vous avez un « manager » chez le client, figurez dans l'organigramme, participez aux entretiens annuels ou aux réunions d'équipe internes au même titre que les salariés." },
  { t: "Moyens intégralement fournis", d: "Poste de travail permanent, badge nominatif, adresse e-mail au nom du client, matériel fourni. Ce faisceau est très regardé — un accès ponctuel aux outils du projet est normal, une intégration complète ne l'est pas." },
  { t: "Mission qui remplace un poste", d: "Vous occupez un emploi qui relève de l'activité normale et permanente de l'entreprise, souvent à la suite d'un salarié parti. C'est le cas le plus fragile juridiquement." },
  { t: "Durée qui s'éternise", d: "Trois ans à temps plein chez le même client, renouvelée sans discontinuer, ressemble davantage à un emploi qu'à une mission. La durée seule ne suffit pas, mais elle aggrave tout le reste." },
  { t: "Absence d'autonomie commerciale", d: "C'est la société de portage ou le client qui vous a trouvé la mission, fixe le prix et décide de la suite. Le portage suppose que vous prospectiez et négociiez vous-même — c'est ce qui vous distingue d'un intérimaire." },
];

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="cadre" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Ce que la loi autorise — et ce qu&apos;elle exclut
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Depuis l&apos;ordonnance du 2 avril 2015 et la convention
            collective de 2017, le portage salarial est un statut à part
            entière, sécurisé. Le risque de requalification n&apos;est pas un
            risque « du portage » : c&apos;est le risque de{" "}
            <strong>ne plus faire du portage</strong> tout en gardant le
            contrat.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le Code du travail pose quatre garde-fous : le consultant doit
            justifier d&apos;une <strong>expertise, d&apos;une qualification
            et d&apos;une autonomie</strong> lui permettant de chercher ses
            clients et de négocier ses conditions ; la prestation ne doit pas
            relever de l&apos;activité normale et permanente de
            l&apos;entreprise cliente ; certaines activités sont exclues
            (services à la personne, garde d&apos;enfants) ; et une
            rémunération minimale conventionnelle doit être respectée —{" "}
            {EUR.format(MIN_JUNIOR)} par mois pour un junior en 2026, comme
            détaillé dans notre{" "}
            <Link href="/guides/contrat-portage-salarial" className="text-primary underline-offset-4 hover:underline">
              guide du contrat de portage
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="signaux" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Les six signaux qui font basculer un juge
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Aucun de ces éléments ne suffit isolément : les juges raisonnent par{" "}
          <strong>faisceau d&apos;indices</strong>. Mais leur accumulation
          dessine une subordination, et la subordination fait le contrat de
          travail.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SIGNAUX.map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="flex items-baseline gap-3 font-semibold text-foreground">
                <span aria-hidden className="text-destructive">{i + 1}.</span>
                {s.t}
              </p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="consequences" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Ce que la requalification change, des deux côtés
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="font-semibold text-foreground">Pour le consultant</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              La relation devient un CDI avec le client{" "}
              <strong>depuis l&apos;origine</strong>. À la clé : rappels de
              salaire sur la différence avec un salarié de poste équivalent,
              congés payés afférents, ancienneté reconstituée et — si la
              mission s&apos;est arrêtée — indemnités pour licenciement sans
              cause réelle et sérieuse. C&apos;est pourquoi la demande émane
              presque toujours du consultant.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Pour l&apos;entreprise cliente</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Elle devient l&apos;employeur rétroactivement : rappels de
              salaire, cotisations sociales sur toute la période, indemnités de
              rupture, et risque pénal de travail dissimulé si la dissimulation
              est caractérisée. Le coût dépasse largement l&apos;économie
              réalisée — d&apos;où les politiques internes strictes des grands
              comptes sur le recours au portage.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          À noter : la société de portage n&apos;est pas épargnée. Un CDD de
          mission irrégulier — durée dépassant 18 mois, mentions obligatoires
          absentes, recours injustifié — se requalifie en CDI de portage, à sa
          charge.
        </p>
      </section>

      <section id="eviter" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Sécuriser sa mission : cinq réflexes
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Contractualiser sur un livrable</strong>, pas sur une présence. Le contrat de prestation doit décrire un résultat attendu, un périmètre, des jalons — pas un nombre d&apos;heures hebdomadaires.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Garder son autonomie d&apos;organisation</strong> : vous décidez de vos horaires et de vos méthodes. Participer aux rituels du projet est normal ; être soumis au règlement intérieur du client ne l&apos;est pas.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Conserver plusieurs clients</strong>, ou au moins la capacité d&apos;en avoir. Un consultant mono-client à temps plein depuis trois ans est le profil le plus exposé.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>Vérifier les mentions du contrat de prestation</strong> : objet, durée, prix, conditions d&apos;exécution. Un contrat vague est une pièce à charge — voir notre <Link href="/guides/contrat-portage-salarial" className="text-primary underline-offset-4 hover:underline">guide du contrat</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">5.</span>
              <span><strong>Interroger la durée</strong>. Si la mission dure et se transforme en poste, le vrai sujet n&apos;est pas juridique mais économique : mieux vaut négocier une embauche, ou comparer honnêtement les deux options avec notre <Link href="/guides/portage-salarial-ou-cdi" className="text-primary underline-offset-4 hover:underline">guide portage ou CDI</Link>.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Cette page décrit le cadre général et ne remplace pas l&apos;avis
            d&apos;un avocat en droit du travail sur une situation précise. Si
            vous pensez être dans un cas de requalification, faites analyser
            votre dossier avant d&apos;agir : la prescription court.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
