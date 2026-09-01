import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ScaleIcon, CalculatorIcon, AlertTriangleIcon } from "@/components/icons";
import { calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";
import { calculerAutoEntrepreneur } from "@/lib/calculators/auto-entrepreneur";

// Cas type : CDI à 2 800 € brut + activité micro BNC à 1 000 €/mois de CA.
const BRUT_CDI = 2_800;
const CA_MICRO_MENSUEL = 1_000;

const cdi = calculerBrutVersNet({
  salaire: BRUT_CDI,
  mode: "brut-vers-net",
  periodicite: "mensuel",
  statut: "non-cadre",
  tauxPAS: 0,
});
const micro = calculerAutoEntrepreneur({
  caAnnuel: CA_MICRO_MENSUEL * 12,
  categorie: "BNC_REGIME_GENERAL",
  acre: false,
  versementLiberatoire: false,
  fraisProAnnuels: 0,
});
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const totalMensuel = cdi.netAvantImpotMensuel + micro.revenuAvantImpot / 12;

const meta: GuideMeta = {
  slug: "cumul-salarie-auto-entrepreneur",
  titre: "Cumuler salariat et micro-entreprise",
  sousTitre: `CDI + side business : ${EUR.format(totalMensuel)} nets mensuels sur notre cas type — et trois clauses à vérifier avant de facturer`,
  chapo: `Le cumul d'un emploi salarié et d'une micro-entreprise est légal, sans plafond de revenus, et fiscalement simple. Les vrais obstacles sont ailleurs : la clause d'exclusivité de votre contrat de travail, l'obligation de loyauté envers l'employeur, et quelques professions incompatibles. Le point complet, avec le calcul du revenu combiné.`,
  filAriane: "Cumul salarié + micro",
  datePublished: "2026-08-19",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "droit", label: "Ce que dit le droit" },
    { id: "clauses", label: "Les 3 clauses à vérifier" },
    { id: "calcul", label: "Le revenu combiné, calculé" },
    { id: "protection", label: "Cotisations : qui couvre quoi" },
  ],
  faq: [
    {
      q: "Ai-je le droit de créer une micro-entreprise en étant en CDI ?",
      r: "Oui, par principe : la liberté d'entreprendre s'applique aussi aux salariés, sans autorisation préalable de l'employeur ni plafond de revenus. Trois limites l'encadrent : une éventuelle clause d'exclusivité dans votre contrat, l'obligation de loyauté (ne pas concurrencer votre employeur, ne pas utiliser son temps ou ses moyens), et les incompatibilités propres à certaines professions — fonctionnaires soumis à autorisation, professions réglementées.",
    },
    {
      q: "Dois-je prévenir mon employeur ?",
      r: "Légalement, non — sauf si votre contrat ou votre convention collective l'exige explicitement. En pratique, tout dépend de la proximité entre vos deux activités : un développeur salarié qui fait du développement en micro pour des clients tiers navigue près de l'obligation de loyauté, et une transparence choisie vaut souvent mieux qu'une découverte subie. Un graphiste salarié qui vend des céramiques le week-end n'a aucune raison particulière d'en parler.",
    },
    {
      q: "Vais-je payer deux fois des cotisations retraite et maladie ?",
      r: "Vous cotisez bien dans les deux régimes — c'est proportionnel aux revenus de chaque activité, il n'y a pas de « double peine » sur un même euro. Pour la maladie, un seul régime vous couvre (en principe celui de l'activité salariée, votre régime historique). Pour la retraite, les deux cotisations comptent, mais vous ne pouvez pas valider plus de 4 trimestres par an tous régimes confondus : au-delà d'un certain revenu salarié, les cotisations retraite de la micro n'ajoutent plus de trimestres — seulement des points au régime complémentaire des indépendants.",
    },
    {
      q: "Le versement libératoire est-il intéressant en cumul ?",
      r: "Souvent oui, et c'est un cas d'école : le versement libératoire (2,2 % du CA en BNC) remplace l'impôt au barème sur les revenus micro. Or, en cumul, votre salaire occupe déjà les tranches basses du barème — les revenus micro s'ajoutent « par-dessus », dans votre tranche marginale, souvent 11 % ou 30 %. Payer 2,2 % du CA à la place peut être nettement plus doux. Condition d'accès : le revenu fiscal de référence du foyer ne doit pas dépasser un plafond, vérifiez-le avant d'opter.",
    },
    {
      q: "Mon employeur peut-il me licencier pour ma micro-entreprise ?",
      r: "Pas pour son existence même, si aucune clause ne l'interdit. En revanche, concurrencer son employeur, prospecter ses clients, utiliser son matériel ou travailler pour soi sur son temps de travail constituent des manquements à l'obligation de loyauté, sanctionnables jusqu'au licenciement pour faute. La frontière est simple à énoncer : votre micro-activité doit vivre sur votre temps, vos moyens et votre marché.",
    },
  ],
  sources: [
    { label: "service-public.fr — cumul d'activités du salarié", href: "https://www.service-public.fr/particuliers/vosdroits/F2687" },
    { label: "Bpifrance Création — cumul salariat et création d'entreprise", href: "https://bpifrance-creation.fr/encyclopedie/statut-du-dirigeant-son-conjoint/situation-pluriactifs/cumul-dun-mandat-social-dun" },
    { label: "autoentrepreneur.urssaf.fr — l'essentiel du statut", href: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html" },
    { label: "impots.gouv.fr — versement libératoire", href: "https://www.impots.gouv.fr" },
  ],
};

export const metadata: Metadata = {
  title: "Cumul CDI + micro-entreprise : règles, clauses et revenu combiné (2026)",
  description: `Cumuler salariat et auto-entreprise est légal sans plafond. Cas type calculé : CDI ${EUR.format(BRUT_CDI)} brut + ${EUR.format(CA_MICRO_MENSUEL)} de CA micro = ${EUR.format(totalMensuel)} nets/mois. Clause d'exclusivité, loyauté, versement libératoire.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Cumuler CDI et micro-entreprise : le mode d'emploi chiffré",
    description: "Légal, sans plafond — mais trois clauses à vérifier avant la première facture.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="droit" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Ce que dit le droit : oui, par défaut
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Aucun texte n&apos;interdit à un salarié — CDI, CDD, temps partiel —
            d&apos;immatriculer une micro-entreprise. Il n&apos;y a{" "}
            <strong>ni autorisation à demander, ni plafond de cumul de
            revenus</strong> : les plafonds du régime micro (83 600 € de CA en
            services et BNC) s&apos;apprécient indépendamment de votre salaire.
            L&apos;employeur n&apos;a pas non plus à être informé, sauf
            stipulation contractuelle contraire.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Les exceptions tiennent au métier : les fonctionnaires relèvent
            d&apos;un régime d&apos;autorisation spécifique, certaines
            professions réglementées (santé, droit, comptabilité) encadrent ou
            interdisent l&apos;exercice indépendant parallèle, et les salariés à
            temps plein de certaines conventions collectives ont des clauses
            particulières. Pour le salarié du privé « standard », la voie est
            libre — sous trois réserves contractuelles.
          </p>
        </div>
      </section>

      <section id="clauses" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Les trois clauses à vérifier avant la première facture
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">La clause d&apos;exclusivité</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Si votre contrat en contient une, elle interdit toute autre
              activité professionnelle. Bonne nouvelle : elle est{" "}
              <strong>inopposable pendant un an</strong> à compter de la
              création de votre entreprise — le temps de tester. Au-delà, il
              faut renégocier ou choisir.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">L&apos;obligation de loyauté</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Elle existe même sans clause : ne pas concurrencer
              l&apos;employeur, ne pas démarcher ses clients, ne rien faire sur
              son temps ni avec ses moyens. C&apos;est elle — pas la
              micro-entreprise en soi — qui fonde les licenciements en la
              matière.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">La clause de non-concurrence</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Elle joue <strong>après</strong> le contrat : si vous quittez
              votre CDI pour développer la micro, une clause de non-concurrence
              valide (limitée, indemnisée) peut restreindre votre activité sur
              votre ancien marché. À anticiper avant la démission, pas après.
            </p>
          </div>
        </div>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le revenu combiné, calculé
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Cas type calculé par nos deux simulateurs : un CDI non-cadre à{" "}
          {EUR.format(BRUT_CDI)} bruts, plus une activité BNC facturant{" "}
          {EUR.format(CA_MICRO_MENSUEL)} par mois.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Activité</th>
                <th className="px-5 py-4 text-right">Base</th>
                <th className="px-5 py-4 text-right">Prélèvements</th>
                <th className="px-5 py-4 text-right">Net mensuel</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">CDI non-cadre</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR.format(BRUT_CDI)} brut</td>
                <td className="px-5 py-3 text-right tabular-nums text-foreground/70">
                  {EUR.format(BRUT_CDI - cdi.netAvantImpotMensuel)} de cotisations
                </td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(cdi.netAvantImpotMensuel)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-3 font-semibold text-foreground">Micro-entreprise BNC</td>
                <td className="px-5 py-3 text-right tabular-nums">{EUR.format(CA_MICRO_MENSUEL)} de CA</td>
                <td className="px-5 py-3 text-right tabular-nums text-foreground/70">
                  {EUR.format((micro.cotisationsURSSAF + micro.cfp) / 12)} URSSAF + CFP
                </td>
                <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(micro.revenuAvantImpot / 12)}</td>
              </tr>
              <tr className="bg-accent/5">
                <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">Total combiné</td>
                <td className="px-5 py-3" />
                <td className="px-5 py-3" />
                <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">{EUR.format(totalMensuel)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Montants avant impôt sur le revenu. Point d&apos;attention fiscal :
          les revenus micro s&apos;ajoutent <em>au-dessus</em> de votre salaire
          dans le barème — ils sont donc taxés à votre tranche marginale. C&apos;est
          précisément le cas où le versement libératoire (2,2 % du CA en BNC)
          mérite un calcul, détaillé dans notre{" "}
          <Link href="/guides/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
            guide auto-entrepreneur
          </Link>
          .
        </p>
      </section>

      <section id="protection" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Cotisations doubles : qui couvre quoi
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Vous cotisez dans les deux régimes, chacun sur ses revenus — mais
            les protections ne s&apos;additionnent pas toutes :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Maladie</strong> : un seul régime sert les prestations — votre régime salarié, en principe. Les cotisations maladie de la micro ne créent pas une seconde couverture.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Retraite</strong> : les deux comptent, mais le plafond de 4 trimestres par an est global. Un temps plein salarié les valide déjà — la micro ajoute alors des points complémentaires, pas des trimestres.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Chômage</strong> : seule l&apos;activité salariée cotise et ouvre des droits. Si vous quittez le CDI, vos droits ARE se calculent sur le seul salaire — et se cumulent ensuite avec la micro, comme détaillé dans notre <Link href="/guides/auto-entrepreneur-chomage" className="text-primary underline-offset-4 hover:underline">guide auto-entrepreneur et chômage</Link>.</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link href="/simulateurs/auto-entrepreneur" className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              Simuler mes revenus micro →
            </Link>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
