import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import BarChart, { type BarDatum } from "@/components/charts/BarChart";
import { IconBadge, ScaleIcon, AlertTriangleIcon, CompassIcon } from "@/components/icons";
import { calculerPortage } from "@/lib/calculators/portage";
import { SALAIRE_2026, calculerBrutVersNet } from "@/lib/calculators/salaire-brut-net";

// Comparaison à budget employeur identique : le CA facturé en portage est
// assimilé au coût total qu'un employeur consacrerait à un CDI. Les deux
// branches passent par les calculateurs du site.
const TJM = 500;
const JOURS = 18;
const budgetMensuel = TJM * JOURS;

const portage = calculerPortage({
  tjm: TJM,
  joursTravailles: JOURS,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
});

// En CDI cadre, coût employeur = brut × (1 + taux patronal).
const brutCdi = budgetMensuel / (1 + SALAIRE_2026.TAUX_PATRONAL_CADRE);
const cdi = calculerBrutVersNet({
  salaire: brutCdi,
  mode: "brut-vers-net",
  periodicite: "mensuel",
  statut: "cadre",
  tauxPAS: 0,
});

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const ecart = cdi.netAvantImpotMensuel - portage.salaireNetAvantImpot;

const chart: BarDatum[] = [
  { label: "Net mensuel en CDI cadre", hint: `brut ${EUR.format(brutCdi)}`, value: Math.round(cdi.netAvantImpotMensuel), highlight: true },
  { label: "Net mensuel en portage salarial", hint: "frais de gestion 8 %", value: Math.round(portage.salaireNetAvantImpot) },
];

const meta: GuideMeta = {
  slug: "portage-salarial-ou-cdi",
  titre: "Portage salarial ou CDI classique",
  sousTitre: `À budget employeur égal, le CDI verse ${EUR.format(ecart)} de plus — voici ce que le portage achète avec cet écart`,
  chapo: `Comparer un TJM à un salaire n'a de sens qu'à budget identique : ce que l'entreprise dépense pour vous. Pour ${EUR.format(budgetMensuel)} mensuels, un CDI cadre verse ${EUR.format(cdi.netAvantImpotMensuel)} nets, le portage ${EUR.format(portage.salaireNetAvantImpot)}. L'écart finance une liberté réelle — et il faut savoir ce qu'elle coûte pour décider en connaissance de cause.`,
  filAriane: "Portage ou CDI",
  datePublished: "2026-08-19",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "comparaison", label: "À budget égal" },
    { id: "differences", label: "Ce qui diffère vraiment" },
    { id: "requalification", label: "La requalification en CDI" },
    { id: "choisir", label: "Comment trancher" },
  ],
  faq: [
    {
      q: "Le portage salarial est-il un CDI ?",
      r: "Le plus souvent, oui : le salarié porté signe un CDI (parfois un CDD) avec la société de portage. Mais c'est un CDI d'un genre particulier — la rémunération n'est due que si vous facturez. Entre deux missions, le contrat subsiste sans salaire. C'est la différence structurelle avec le CDI classique, où l'employeur doit le salaire que l'activité soit pleine ou non.",
    },
    {
      q: "Pourquoi le net est-il plus faible en portage qu'en CDI à coût égal ?",
      r: `Deux prélèvements s'ajoutent : les frais de gestion de la société de portage (4 à 10 % du CA) et un taux de charges patronales légèrement supérieur en moyenne. Sur un budget de ${EUR.format(budgetMensuel)}, cela représente environ ${EUR.format(ecart)} nets mensuels d'écart. En contrepartie, le porté choisit ses clients, ses tarifs et son rythme — ce que le CDI n'offre pas.`,
    },
    {
      q: "Qu'est-ce que la requalification d'un portage en CDI ?",
      r: "Quand un client utilise le portage pour masquer ce qui est en réalité un emploi salarié — horaires imposés, subordination directe, poste permanent, matériel fourni, intégration complète à l'équipe — le juge peut requalifier la relation en CDI de droit commun avec ce client. C'est le client qui s'expose alors : rappels de salaires, indemnités, cotisations. Le Code du travail interdit d'ailleurs le recours au portage pour remplacer un salarié gréviste ou pour des activités de services à la personne.",
    },
    {
      q: "Un consultant en portage peut-il revenir en CDI facilement ?",
      r: "Oui, et c'est un des atouts du portage face à la création de société : il n'y a rien à fermer ni à liquider. Vous terminez votre mission, votre contrat de portage prend fin (rupture conventionnelle ou fin de CDD), et vous signez un CDI ailleurs. Les périodes en portage comptent par ailleurs comme de l'expérience salariée aux yeux des recruteurs — et ouvrent des droits au chômage entre les deux.",
    },
    {
      q: "Le portage donne-t-il les mêmes droits que le CDI pour un crédit immobilier ?",
      r: "Les banques reconnaissent le CDI de portage, et des bulletins réguliers facilitent le dossier — c'est nettement plus favorable qu'un statut d'indépendant. Mais un banquier regardera la stabilité de votre facturation sur 12 à 24 mois, pas seulement l'intitulé du contrat : un CDI de portage avec six mois d'intermission pèse moins qu'un CDI classique au même brut.",
    },
  ],
  sources: [
    { label: "Code du travail — portage salarial (L1254-1 à L1254-31)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
    { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
    { label: "Ministère du Travail — le portage salarial", href: "https://travail-emploi.gouv.fr/droit-du-travail/les-contrats-de-travail/article/le-portage-salarial" },
    { label: "URSSAF — cotisations sociales", href: "https://www.urssaf.fr" },
  ],
};

export const metadata: Metadata = {
  title: "Portage salarial ou CDI : comparaison à budget égal (2026)",
  description: `À ${EUR.format(budgetMensuel)} de budget employeur mensuel, un CDI cadre verse ${EUR.format(cdi.netAvantImpotMensuel)} nets contre ${EUR.format(portage.salaireNetAvantImpot)} en portage. Ce que l'écart achète, ce qui diffère vraiment, et le risque de requalification.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Portage salarial ou CDI : comparaison à budget égal",
    description: "Le vrai comparatif : même budget employeur, deux nets différents, et une liberté qui a un prix chiffré.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="comparaison" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          À budget employeur égal
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La seule comparaison honnête part de ce que l&apos;entreprise dépense.
          Un client qui paie {TJM} € par jour sur {JOURS} jours consacre{" "}
          {EUR.format(budgetMensuel)} par mois à votre prestation — c&apos;est
          aussi, à peu de chose près, le <strong>coût employeur</strong>{" "}
          qu&apos;il supporterait en vous embauchant. Voici où va cet argent
          dans chaque branche, calculé par nos simulateurs :
        </p>
        <div className="mt-6">
          <BarChart
            caption={`Net mensuel avant impôt pour ${EUR.format(budgetMensuel)} de budget employeur`}
            data={chart}
            footnote={`CDI : brut de ${EUR.format(brutCdi)} (budget ÷ 1,45 de charges patronales cadre), cotisations salariales détaillées 2026. Portage : frais de gestion 8 % puis charges moyennes 2026. L'écart de ${EUR.format(ecart)} par mois est le prix chiffré de l'indépendance.`}
          />
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          L&apos;écart annuel ressort à <strong>{EUR.format(ecart * 12)}</strong>.
          Ce n&apos;est ni négligeable, ni rédhibitoire : c&apos;est le budget
          de votre liberté de choisir clients, tarifs et rythme. La vraie
          question est de savoir si vous l&apos;utilisez.
        </p>
      </section>

      <section id="differences" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Ce qui diffère vraiment
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Critère</th>
                <th className="px-5 py-4">CDI classique</th>
                <th className="px-5 py-4">Portage salarial</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Salaire garanti", "Oui, dû même sans activité pleine", "Non — pas de mission, pas de salaire"],
                ["Choix des missions et clients", "Non, l'employeur décide", "Oui, entièrement"],
                ["Négociation du tarif", "Revalorisations encadrées", "À chaque mission, librement"],
                ["Chômage, retraite, mutuelle", "Oui", "Oui — mêmes régimes"],
                ["Congés payés financés par", "L'employeur", "Votre propre facturation"],
                ["Lien de subordination", "Oui, avec l'employeur", "Non vis-à-vis du client"],
                ["Évolution interne, formation d'entreprise", "Oui", "À votre charge"],
              ].map(([c, a, b]) => (
                <tr key={c} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{c}</td>
                  <td className="px-5 py-3 text-foreground/80">{a}</td>
                  <td className="px-5 py-3 text-foreground/80">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Notez ce que le tableau ne dit pas : la protection sociale est{" "}
          <strong>identique</strong>. Chômage — détaillé dans notre{" "}
          <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">
            guide portage et chômage
          </Link>{" "}
          —, retraite de base et complémentaire, prévoyance : le porté cotise
          aux mêmes régimes que le salarié classique. La différence n&apos;est
          pas dans les droits, elle est dans la garantie de revenu.
        </p>
      </section>

      <section id="requalification" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          La requalification en CDI : le risque du faux portage
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Certaines entreprises utilisent le portage pour occuper un{" "}
            <strong>poste permanent</strong> sans embaucher : horaires imposés,
            manager direct, matériel fourni, présence obligatoire, mission
            reconduite indéfiniment. Ce montage est fragile — devant les
            prud&apos;hommes, un faisceau d&apos;indices de subordination peut
            conduire à la <strong>requalification de la relation en CDI de
            droit commun avec le client</strong>, avec rappels de salaires et
            indemnités à sa charge.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le cadre légal est explicite : le salarié porté doit disposer
            d&apos;une <strong>expertise, d&apos;une qualification et d&apos;une
            autonomie</strong> lui permettant de trouver lui-même ses clients et
            de convenir de son prix (article L1254-2 du Code du travail). Le
            portage est aussi interdit pour remplacer un gréviste ou pour les
            services à la personne.
          </p>
          <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
            <p className="text-sm leading-relaxed">
              Si votre quotidien ressemble en tout point à celui des salariés de
              votre client — mêmes horaires, même manager, même poste depuis
              deux ans — vous êtes peut-être dans un faux portage. C&apos;est
              une information à double tranchant : un levier de négociation pour
              vous, un risque juridique pour le client.
            </p>
          </div>
        </div>
      </section>

      <section id="choisir" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Comment trancher
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Le portage se justifie si…</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              vous facturez au-dessus de 300 € par jour, vous avez — ou pouvez
              construire — un flux de missions, et l&apos;autonomie a de la
              valeur pour vous. L&apos;écart de {EUR.format(ecart)} par mois
              s&apos;achète alors une liberté que vous utilisez réellement.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Le CDI se justifie si…</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              la stabilité prime — crédit en cours, famille, marché incertain —
              ou si votre « indépendance » se résume en pratique à un seul
              client permanent. Dans ce dernier cas, vous payez le prix du
              portage sans en avoir les bénéfices.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
          <p className="text-base text-foreground/80">
            Comparez les deux branches sur vos propres chiffres — TJM réel,
            jours facturables réalistes, salaire CDI proposé :
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/simulateurs/portage-salarial" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              Simuler mon net en portage →
            </Link>
            <Link href="/simulateurs/salaire-brut-net" className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary">
              Simuler le net d&apos;un CDI
            </Link>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
