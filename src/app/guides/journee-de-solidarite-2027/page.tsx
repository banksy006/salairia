import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, ScaleIcon, EuroIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// La CSA (0,30 % de la masse salariale) finance la journée. Le coût pour le
// salarié : 7 heures travaillées non rémunérées, chiffrées ici sur le SMIC.
const SMIC_HORAIRE = SALAIRE_2026.SMIC_MENSUEL_BRUT / 151.67;
const HEURES = 7;
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "journee-de-solidarite-2027",
  titre: "Journée de solidarité 2027 : lundi 17 mai, sauf décision contraire",
  sousTitre: "Sept heures travaillées non payées — mais votre employeur choisit la date, et le lundi de Pentecôte n'est plus obligatoire",
  chapo: "C'est l'une des règles les plus mal comprises du droit du travail français : la journée de solidarité n'est plus attachée au lundi de Pentecôte depuis 2008. En 2027, ce lundi tombe le 17 mai — beaucoup d'entreprises y positionneront la journée par habitude, d'autres la placeront ailleurs, d'autres encore l'auront déjà déduite de vos RTT sans que vous l'ayez remarqué. Voici la règle exacte, ce que ça coûte, et comment savoir ce qui s'applique chez vous.",
  filAriane: "Journée de solidarité 2027",
  datePublished: "2026-08-29",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "date", label: "La date en 2027" },
    { id: "regle", label: "Qui décide, et comment" },
    { id: "cout", label: "Ce que ça coûte vraiment" },
    { id: "cas", label: "Les cas particuliers" },
  ],
  faq: [
    {
      q: "Quelle est la date de la journée de solidarité en 2027 ?",
      r: "En l'absence d'accord d'entreprise ou de branche, elle est fixée au lundi de Pentecôte — soit le lundi 17 mai 2027. Mais cette date n'est qu'un principe supplétif : depuis la loi du 16 avril 2008, l'employeur peut la placer n'importe quel autre jour habituellement non travaillé, à l'exception du 1er mai. Beaucoup d'entreprises la répartissent en heures sur l'année, ou suppriment un jour de RTT. Pour connaître la vôtre, la réponse est dans votre accord d'entreprise ou la décision unilatérale affichée par l'employeur — pas dans le calendrier.",
    },
    {
      q: "Le lundi de Pentecôte est-il férié ou travaillé en 2027 ?",
      r: "Il reste un jour férié légal — la loi ne l'a jamais retiré de la liste. Ce qui a changé en 2008, c'est qu'il peut être travaillé au titre de la journée de solidarité, comme n'importe quel autre férié hors 1er mai. En pratique : dans les entreprises qui y ont placé leur journée de solidarité, vous travaillez le 17 mai 2027 sans rémunération supplémentaire ; dans les autres, c'est un férié chômé ordinaire, et le week-end de Pentecôte dure trois jours.",
    },
    {
      q: "Suis-je payé pour la journée de solidarité ?",
      r: "Non, et c'est tout son principe : sept heures de travail supplémentaires dans l'année, sans rémunération additionnelle, pour les salariés à temps plein. En contrepartie, l'employeur verse la contribution solidarité autonomie (0,30 % de la masse salariale) qui finance l'autonomie des personnes âgées et handicapées. Les heures effectuées ce jour-là ne comptent pas comme des heures supplémentaires et ne donnent droit à aucune majoration, dans la limite de sept heures.",
    },
    {
      q: "Comment ça marche pour un temps partiel ?",
      r: "La durée est proratisée : un salarié à 80 % doit 5 h 36 au lieu de 7 heures, un mi-temps 3 h 30. Le calcul se fait au prorata de la durée contractuelle par rapport à 35 heures. Si la journée de solidarité tombe un jour que vous ne travaillez habituellement pas, l'employeur doit vous proposer une autre modalité — il ne peut pas vous imposer de venir un jour hors de votre planning contractuel sans respecter les règles de modification des horaires.",
    },
    {
      q: "Peut-on refuser de travailler la journée de solidarité ?",
      r: "Non : le refus constitue une absence injustifiée, sanctionnable et non rémunérée. La seule exception concerne les salariés ayant déjà accompli une journée de solidarité chez un précédent employeur la même année — ils peuvent refuser la seconde, et si elle est travaillée, elle doit alors être payée et compter en heures supplémentaires. Gardez votre attestation de fin de contrat : c'est elle qui prouve que vous l'avez déjà faite.",
    },
  ],
  sources: [
    { label: "Code du travail, art. L3133-7 à L3133-12 — journée de solidarité (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006195613/" },
    { label: "service-public.fr — journée de solidarité", href: "https://www.service-public.fr/particuliers/vosdroits/F32044" },
    { label: "Ministère du Travail — la journée de solidarité", href: "https://travail-emploi.gouv.fr/la-journee-de-solidarite" },
    { label: "URSSAF — contribution solidarité autonomie", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" },
  ],
};

export const metadata: Metadata = {
  title: "Journée de solidarité 2027 : date, règles, ce que ça coûte",
  description:
    "En 2027, la journée de solidarité tombe le lundi 17 mai (Pentecôte) — sauf décision contraire de votre employeur, libre de la placer ailleurs depuis 2008. Sept heures non payées, proratisées à temps partiel, et les règles exactes pour savoir ce qui s'applique chez vous.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Journée de solidarité 2027 : lundi 17 mai, sauf décision contraire",
    description: "La règle exacte, le coût réel, et les cas particuliers.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="date" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          La date en 2027 : lundi 17 mai — mais seulement par défaut
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le Code du travail prévoit que la journée de solidarité est fixée
            au <strong>lundi de Pentecôte</strong> lorsqu&apos;aucun accord
            n&apos;en dispose autrement. En 2027, ce lundi tombe le{" "}
            <strong>17 mai</strong>. Mais depuis la loi du 16 avril 2008,
            c&apos;est un principe supplétif, pas une obligation : trois
            modalités coexistent aujourd&apos;hui dans les entreprises
            françaises, et elles donnent des résultats très différents pour le
            salarié.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Le 17 mai travaillé", d: "L'entreprise maintient la tradition : vous travaillez le lundi de Pentecôte sans rémunération supplémentaire." },
              { t: "Un autre jour férié", d: "N'importe quel jour habituellement non travaillé convient, sauf le 1er mai — un pont, un jour de fermeture." },
              { t: "Un RTT ou des heures", d: "La modalité la plus fréquente en pratique : un jour de RTT supprimé, ou sept heures réparties sur l'année." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-background p-5">
                <p className="font-semibold text-foreground">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            Autrement dit : votre lundi de Pentecôte 2027 sera chômé ou
            travaillé selon une décision d&apos;entreprise, pas selon le
            calendrier. La réponse se trouve dans votre accord collectif ou
            dans la décision unilatérale que l&apos;employeur doit porter à
            votre connaissance — et non dans les articles qui annoncent « le
            lundi de Pentecôte 2027 est travaillé ».
          </p>
        </div>
      </section>

      <section id="regle" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Qui décide, et dans quelles limites
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>L&apos;accord d&apos;entreprise ou de branche prime.</strong> S&apos;il fixe une date ou une modalité, elle s&apos;impose à tous.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>À défaut, l&apos;employeur décide seul</strong>, après consultation du CSE lorsqu&apos;il existe. Il n&apos;a pas besoin de l&apos;accord des salariés.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Une seule interdiction absolue : le 1er mai.</strong> Aucune journée de solidarité ne peut y être placée, ce férié étant obligatoirement chômé.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Sept heures, pas une de plus.</strong> Au-delà, les heures redeviennent des heures de travail ordinaires, rémunérées et éventuellement majorées — voir notre <Link href="/guides/heures-supplementaires" className="text-primary underline-offset-4 hover:underline">guide des heures supplémentaires</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les cadres au forfait jours</strong> doivent une journée entière de travail supplémentaire, pas sept heures — leur décompte étant en jours.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="cout" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Ce que ça coûte vraiment, des deux côtés
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Pour le salarié</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Sept heures de travail non rémunérées. Au SMIC
              ({EUR2.format(SMIC_HORAIRE)} de l&apos;heure), cela représente{" "}
              <strong>{EUR2.format(SMIC_HORAIRE * HEURES)}</strong> de travail
              offert ; au salaire médian, autour de 90 €. Le salaire mensuel
              reste identique — c&apos;est une journée de travail en plus, pas
              une retenue sur paie.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Pour l&apos;employeur</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              La <strong>contribution solidarité autonomie</strong> : 0,30 % de
              la masse salariale, versée à l&apos;URSSAF toute l&apos;année,
              qui finance la Caisse nationale de solidarité pour
              l&apos;autonomie. Elle est due que la journée soit effectivement
              travaillée ou non — d&apos;où l&apos;intérêt, pour
              l&apos;entreprise, de l&apos;organiser réellement.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Un détail qui échappe souvent : la journée de solidarité{" "}
          <strong>n&apos;apparaît pas sur le bulletin de paie</strong> du
          salarié. Ni ligne, ni mention — ce qui explique qu&apos;autant de
          gens la découvrent en constatant qu&apos;il leur manque un RTT. Si
          vous voulez vérifier ce que valent vos heures, notre{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          donne votre taux horaire réel.
        </p>
      </section>

      <section id="cas" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Les cas particuliers
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Temps partiel</strong> : durée proratisée — 5 h 36 à 80 %, 3 h 30 à mi-temps.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Changement d&apos;employeur en cours d&apos;année</strong> : si vous l&apos;avez déjà accomplie, vous pouvez refuser la seconde ; si vous la travaillez, elle est payée et compte en heures supplémentaires.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Apprentis et alternants</strong> : soumis à la journée de solidarité comme les autres salariés, sauf s&apos;ils ont moins de 18 ans — le travail des jours fériés leur étant interdit, l&apos;employeur doit alors choisir un autre jour. Voir notre <Link href="/guides/salaire-apprenti" className="text-primary underline-offset-4 hover:underline">guide du salaire d&apos;apprenti</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Fonction publique</strong> : le principe est le même mais les modalités relèvent de chaque employeur public — souvent un jour de RTT ou de congé annuel.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Indépendants et salariés portés</strong> : la journée ne concerne que le travail salarié classique. Un freelance ne la doit pas — mais un <Link href="/guides/portage-salarial" className="text-primary underline-offset-4 hover:underline">salarié porté</Link>, étant salarié de sa société de portage, y est en principe soumis selon les modalités de celle-ci.</span>
            </li>
          </ul>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le reste du calendrier 2027 — les onze jours fériés, les quatre
          perdus le week-end et les deux ponts qui valent le coup — est dans
          notre{" "}
          <Link href="/guides/jours-feries-2027" className="text-primary underline-offset-4 hover:underline">
            guide des jours fériés 2027
          </Link>
          .
        </p>
      </section>
    </GuideShell>
  );
}
