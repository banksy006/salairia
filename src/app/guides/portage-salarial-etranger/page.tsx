import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CompassIcon, ShieldIcon, AlertTriangleIcon, ScaleIcon } from "@/components/icons";

const meta: GuideMeta = {
  slug: "portage-salarial-etranger",
  titre: "Portage salarial et missions à l'étranger : ce qui est possible, ce qui ne l'est pas",
  sousTitre: "Client étranger depuis la France, détachement en Europe, expatriation : trois situations, trois régimes",
  chapo: "Le portage salarial est souvent présenté comme la solution évidente pour travailler avec des clients étrangers. C'est vrai dans un cas — facturer depuis la France — et beaucoup plus nuancé dès qu'il s'agit de s'installer ailleurs. La confusion vient de ce que trois situations très différentes portent le même nom. Voici ce que chacune implique en matière de sécurité sociale, de fiscalité et de contrat.",
  filAriane: "Portage à l'étranger",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "trois", label: "Trois situations distinctes" },
    { id: "detachement", label: "Le détachement en Europe" },
    { id: "hors-ue", label: "Hors Union européenne" },
    { id: "verifier", label: "Les questions à poser" },
  ],
  faq: [
    {
      q: "Peut-on facturer un client étranger en portage salarial ?",
      r: "Oui, et c'est le cas le plus simple : vous restez en France, vous travaillez depuis la France, votre client est à l'étranger. La société de portage facture ce client selon les règles de territorialité de la TVA — hors taxe avec autoliquidation pour un professionnel de l'Union européenne, hors champ pour un client hors UE. Votre contrat de travail, votre protection sociale et votre fiscalité restent entièrement français. Aucune démarche particulière n'est requise de votre part.",
    },
    {
      q: "Peut-on être détaché à l'étranger en portage salarial ?",
      r: "Oui au sein de l'Union européenne, de l'EEE et de la Suisse, grâce aux règlements de coordination : la société de portage demande un certificat A1 qui atteste de votre maintien au régime français de sécurité sociale pendant la mission. Le détachement est limité dans le temps — 24 mois en principe, prolongeables sur accord. Sans ce certificat, vous risquez une double affiliation, et l'entreprise cliente une sanction. Toutes les sociétés de portage ne pratiquent pas le détachement : c'est un critère de choix si votre activité est internationale.",
    },
    {
      q: "Et pour une mission au Japon, au Canada ou dans un pays lointain ?",
      r: "Hors Union européenne, tout dépend de l'existence d'une convention bilatérale de sécurité sociale entre la France et le pays concerné. Avec convention, un mécanisme proche du détachement est possible, dans les limites prévues par le texte. Sans convention, vous relevez en principe du régime local dès lors que vous y travaillez, et le maintien au régime français passe par une affiliation volontaire à la Caisse des Français de l'étranger — une démarche distincte, à la charge de l'employeur ou du salarié. La liste des conventions est tenue par le CLEISS.",
    },
    {
      q: "Le portage permet-il d'obtenir un visa de travail ?",
      r: "Non, et c'est un contresens fréquent. Un contrat de portage avec une société française ne constitue pas un titre de séjour ni une autorisation de travail dans un pays tiers. Chaque pays applique ses propres règles d'immigration : travailler physiquement sur son territoire suppose le visa ou le permis correspondant, que la société de portage ne peut pas délivrer. À l'inverse, un ressortissant étranger déjà titulaire d'un titre de séjour autorisant le travail en France peut, lui, être salarié porté comme n'importe quel salarié.",
    },
    {
      q: "Où paie-t-on ses impôts en cas de mission longue à l'étranger ?",
      r: "La question fiscale est indépendante de la question sociale, et c'est l'erreur la plus coûteuse. La résidence fiscale se détermine selon les critères du Code général des impôts et de la convention fiscale bilatérale applicable : foyer, lieu de séjour principal, centre des intérêts économiques. Vous pouvez parfaitement rester affilié à la sécurité sociale française via un détachement tout en devenant résident fiscal du pays d'accueil. Pour toute mission dépassant quelques mois, faites vérifier votre situation par un fiscaliste — le coût de l'erreur dépasse largement celui de la consultation.",
    },
  ],
  sources: [
    { label: "CLEISS — conventions bilatérales de sécurité sociale", href: "https://www.cleiss.fr/particuliers/venir/index.html" },
    { label: "Règlement (CE) n° 883/2004 — coordination des systèmes de sécurité sociale (EUR-Lex)", href: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32004R0883" },
    { label: "URSSAF — le détachement de salariés à l'étranger", href: "https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries.html" },
    { label: "impots.gouv.fr — je pars à l'étranger, ma résidence fiscale", href: "https://www.impots.gouv.fr/particulier/questions/je-pars-letranger-que-dois-je-faire" },
  ],
};

export const metadata: Metadata = {
  title: "Portage salarial à l'étranger : client étranger, détachement, expatriation",
  description: "Trois situations à ne pas confondre : facturer un client étranger depuis la France (simple), être détaché en Europe avec un certificat A1 (24 mois), ou travailler hors UE (convention bilatérale ou CFE). Le portage ne délivre pas de visa — et la résidence fiscale suit ses propres règles.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Portage salarial et missions à l'étranger",
    description: "Trois situations, trois régimes de sécurité sociale et de fiscalité.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="trois" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Trois situations que tout le monde confond
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "1. Client étranger, vous en France",
              d: "Vous travaillez depuis la France pour un client basé ailleurs. Contrat, protection sociale et fiscalité restent français ; la société gère la TVA. C'est simple, courant, et sans démarche pour vous.",
              ok: "accent",
            },
            {
              t: "2. Détachement temporaire",
              d: "Vous partez en mission chez le client, en Europe ou dans un pays conventionné. Vous restez au régime français grâce à un certificat A1 ou à la convention bilatérale, pour une durée limitée.",
              ok: "primary",
            },
            {
              t: "3. Installation durable",
              d: "Vous vivez et travaillez à l'étranger. Le portage français n'est plus le bon véhicule : régime local, question du visa, résidence fiscale. C'est là que la promesse commerciale dépasse souvent la réalité.",
              ok: "muted",
            },
          ].map((c) => (
            <div
              key={c.t}
              className={`rounded-2xl border p-6 shadow-md ${c.ok === "accent" ? "border-accent bg-accent/5" : "border-border bg-white"}`}
            >
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La première situation ne pose aucune difficulté : c&apos;est
          exactement le portage salarial ordinaire, avec un client dont
          l&apos;adresse de facturation est à l&apos;étranger. La TVA suit les
          règles de territorialité, gérées par la société — voir notre{" "}
          <Link href="/guides/tva-portage-salarial" className="text-primary underline-offset-4 hover:underline">
            guide TVA et portage
          </Link>
          . Les deux suivantes demandent de la vigilance.
        </p>
      </section>

      <section id="detachement" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Le détachement en Europe : le certificat A1
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Au sein de l&apos;Union européenne, de l&apos;Espace économique
            européen et de la Suisse, les règlements de coordination
            garantissent qu&apos;on ne cotise que dans un seul État. Le{" "}
            <strong>certificat A1</strong> est le document qui l&apos;atteste :
            demandé par la société de portage à l&apos;URSSAF avant le départ,
            il prouve que vous restez affilié au régime français pendant la
            mission.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Durée</strong> : 24 mois en principe, avec possibilité de prolongation sur accord entre les États concernés.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Ce qu&apos;il préserve</strong> : maladie, retraite, chômage — vous continuez d&apos;accumuler des trimestres et des points français, comme expliqué dans notre <Link href="/guides/portage-salarial-retraite" className="text-primary underline-offset-4 hover:underline">guide portage et retraite</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">⚠️</span>
              <span><strong>Sans A1</strong>, l&apos;entreprise cliente s&apos;expose à des sanctions pour travail non déclaré dans son pays, et vous à une double affiliation. Ce document se demande <em>avant</em> le départ, pas après.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Toutes les sociétés de portage ne pratiquent pas le détachement :
            certaines l&apos;annoncent comme une spécialité, d&apos;autres ne le
            font pas du tout. Si votre activité est internationale, c&apos;est
            un critère de sélection à part entière — notre{" "}
            <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
              comparatif des sociétés
            </Link>{" "}
            signale celles qui affichent un accompagnement international.
          </p>
        </div>
      </section>

      <section id="hors-ue" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Hors Union européenne : convention ou rien
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            En dehors de l&apos;espace européen, il n&apos;existe pas de
            mécanisme automatique. Tout dépend de la{" "}
            <strong>convention bilatérale de sécurité sociale</strong> entre la
            France et le pays concerné — la France en a signé une quarantaine,
            dont la liste et le contenu sont tenus par le CLEISS.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <p className="font-semibold text-foreground">Avec convention</p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80">
                Un mécanisme proche du détachement s&apos;applique, dans les
                limites de durée et de branches prévues par le texte —
                attention, une convention peut ne couvrir que l&apos;assurance
                vieillesse, pas la maladie.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <p className="font-semibold text-foreground">Sans convention</p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80">
                Vous relevez du régime local du pays où vous travaillez. Le
                maintien d&apos;une couverture française passe par une
                adhésion volontaire à la Caisse des Français de
                l&apos;étranger, à financer en plus.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-r-lg border-l-4 border-destructive bg-destructive/10 p-4 text-destructive">
            <p className="flex gap-3 text-base leading-relaxed">
              <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                <strong>Le portage ne délivre aucun visa.</strong> Un contrat
                avec une société française n&apos;est ni un titre de séjour, ni
                une autorisation de travail dans un pays tiers. Si vous devez
                être physiquement présent chez le client, c&apos;est la
                réglementation locale d&apos;immigration qui s&apos;applique, et
                elle seule. Toute offre laissant entendre le contraire mérite la
                plus grande méfiance.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="verifier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Les cinq questions à poser avant de partir
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Vais-je travailler depuis la France ou sur place ?</strong> C&apos;est la question qui détermine tout le reste. Une mission menée à distance depuis la France, même pour un client de Tokyo, reste du portage français ordinaire.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>La société demande-t-elle le certificat A1 ?</strong> Si elle ne connaît pas le sujet, ce n&apos;est pas la bonne société pour une mission européenne.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Existe-t-il une convention bilatérale ?</strong> À vérifier sur le site du CLEISS, et à lire : la couverture varie fortement d&apos;une convention à l&apos;autre.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>Ai-je le droit de travailler sur place ?</strong> Visa, permis de travail : c&apos;est votre responsabilité et celle du client, pas celle de la société de portage.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">5.</span>
              <span><strong>Où serai-je résident fiscal ?</strong> Question distincte de la sécurité sociale, et souvent la plus coûteuse en cas d&apos;erreur. Au-delà de quelques mois, consultez un fiscaliste.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Ce guide décrit le cadre général. Chaque pays, chaque convention et
            chaque durée de mission ont leurs particularités : il ne remplace ni
            l&apos;avis du CLEISS sur votre situation sociale, ni celui d&apos;un
            fiscaliste sur votre résidence. Pour le reste — combien vous
            laissera votre mission en net —, le{" "}
            <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
              simulateur de portage
            </Link>{" "}
            fonctionne à l&apos;identique, quel que soit le pays du client.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
