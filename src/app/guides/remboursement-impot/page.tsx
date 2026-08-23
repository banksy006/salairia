import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, EuroIcon, InfoIcon, AlertTriangleIcon } from "@/components/icons";

// Slug volontairement sans millésime : la page sera mise à jour chaque été
// (dates + montants de l'année) en conservant l'URL et son ancienneté.
const meta: GuideMeta = {
  slug: "remboursement-impot",
  titre: "Remboursement d'impôt 2026",
  sousTitre: "Qui est remboursé, quand tombe le virement, et pourquoi ce montant-là",
  chapo: "Chaque été, la DGFiP rembourse les foyers qui ont payé trop d'impôt à la source ou qui ont droit à des crédits d'impôt. En 2026, le virement « REMB IMPOT REVENUS » est parti le 24 ou le 31 juillet pour 12,6 millions de foyers — 1 057 € en moyenne. Voici qui est concerné, le calendrier complet, et comment vérifier que le montant est le bon.",
  filAriane: "Remboursement d'impôt",
  datePublished: "2026-08-23",
  dateModified: "2026-08-23",
  tocItems: [
    { id: "qui", label: "Qui est remboursé" },
    { id: "calendrier", label: "Le calendrier 2026" },
    { id: "verifier", label: "Vérifier le montant" },
    { id: "solde", label: "Et si vous devez payer" },
  ],
  faq: [
    {
      q: "Quand le remboursement d'impôt 2026 est-il versé ?",
      r: "Les virements ont été effectués le vendredi 24 juillet ou le vendredi 31 juillet 2026, selon les foyers, sous le libellé « REMB IMPOT REVENUS » émis par « DGFIP FINANCES PUBLIQUES ». Les foyers dont l'administration ne connaît pas les coordonnées bancaires reçoivent un chèque par courrier, courant août. La date précise de votre remboursement figure sur votre avis d'imposition, dans votre espace particulier sur impots.gouv.fr. Aucune démarche n'est nécessaire : tout est automatique.",
    },
    {
      q: "Pourquoi ai-je droit à un remboursement ?",
      r: "Deux causes possibles, cumulables. Un : le prélèvement à la source appliqué sur vos salaires en 2025 s'est révélé supérieur à l'impôt réellement dû — baisse de revenus, changement de situation familiale non signalé, taux surestimé. Deux : vous bénéficiez de réductions ou crédits d'impôt (emploi à domicile, garde d'enfants, dons, cotisations syndicales) dont le solde est restitué l'été suivant la déclaration. Le remboursement moyen 2026 s'élève à 1 057 €.",
    },
    {
      q: "Je n'ai rien reçu fin juillet : est-ce anormal ?",
      r: "Pas nécessairement. Trois explications banales : votre avis n'est pas encore disponible (la mise en ligne s'étale de fin juillet à début septembre), vos coordonnées bancaires ne sont pas renseignées et un chèque arrivera courant août, ou votre situation ne donne tout simplement pas lieu à restitution cette année. Vérifiez d'abord la date indiquée sur votre avis dans votre espace particulier. Si la date est passée de plus de quelques jours ouvrés et que rien n'est arrivé, contactez votre centre des finances publiques.",
    },
    {
      q: "Le remboursement est-il imposable ? Dois-je le déclarer ?",
      r: "Non. Il ne s'agit pas d'un revenu mais d'une restitution : l'administration vous rend un trop-versé. Il n'apparaîtra dans aucune déclaration future et ne modifie pas votre taux de prélèvement à la source. En revanche, la cause du remboursement peut mériter une action : si votre taux de PAS était trop élevé, il a été recalculé au 1er septembre 2026 — vérifiez votre bulletin de paie de septembre.",
    },
    {
      q: "Qu'est-ce que l'avance de crédits d'impôt de janvier ?",
      r: "Si vous bénéficiez de crédits d'impôt récurrents (emploi à domicile, garde d'enfants, dons), l'administration vous verse mi-janvier une avance de 60 % calculée sur la situation de l'année précédente. Le solde arrive l'été, après la déclaration. C'est pour cela qu'un même foyer peut recevoir deux virements de la DGFiP dans l'année — janvier et juillet — et c'est aussi pour cela qu'un crédit d'impôt qui disparaît (fin d'un emploi à domicile, par exemple) peut créer un remboursement à rendre l'été suivant : l'avance de janvier était trop élevée.",
    },
  ],
  sources: [
    { label: "economie.gouv.fr — impôt sur le revenu : remboursement ou solde à payer, qui est concerné ?", href: "https://www.economie.gouv.fr/particuliers/impots-et-fiscalite/gerer-mon-impot-sur-le-revenu/impot-sur-le-revenu-remboursement-ou-solde-payer-qui-est-concerne" },
    { label: "impots.gouv.fr — mon avis d'impôt sur le revenu", href: "https://www.impots.gouv.fr/particulier/mon-avis-dimpot-sur-le-revenu" },
    { label: "service-public.gouv.fr — remboursement et paiement du solde de l'impôt 2026", href: "https://www.service-public.gouv.fr/particuliers/actualites" },
    { label: "impots.gouv.fr — j'ai droit à un remboursement, que dois-je faire ?", href: "https://www.impots.gouv.fr/particulier/questions" },
  ],
};

export const metadata: Metadata = {
  title: "Remboursement d'impôt 2026 : dates, montant moyen, qui est concerné",
  description: "Virement « REMB IMPOT REVENUS » du 24 ou 31 juillet 2026, chèque courant août : 12,6 millions de foyers remboursés, 1 057 € en moyenne. Pourquoi vous êtes remboursé, comment vérifier le montant, et le calendrier si vous devez payer un solde.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Remboursement d'impôt 2026 : dates et montants",
    description: "Qui est remboursé, quand, pourquoi — et le calendrier du solde à payer.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="qui" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Qui est remboursé, et pourquoi
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le prélèvement à la source est une avance, pas un décompte final.
            Chaque mois de 2025, votre employeur (ou votre caisse de retraite,
            ou l&apos;URSSAF pour les indépendants) a prélevé l&apos;impôt à un
            taux calculé sur vos revenus <em>passés</em>. La déclaration du
            printemps 2026 a ensuite établi l&apos;impôt <em>réellement dû</em>{" "}
            sur vos revenus 2025. Quand l&apos;avance dépasse le dû,
            l&apos;administration rembourse la différence — automatiquement.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            En 2026, <strong>12,6 millions de foyers</strong> sont dans ce cas,
            pour un remboursement moyen de <strong>1 057 €</strong>. Les deux
            causes dominantes : un taux de PAS devenu trop élevé (revenus en
            baisse, enfant rattaché, mariage non signalé) et le solde des{" "}
            <strong>réductions et crédits d&apos;impôt</strong> — emploi à
            domicile, garde d&apos;enfants, dons — que le prélèvement mensuel
            ne prend pas en compte.
          </p>
        </div>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier 2026, date par date
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Ce qui se passe</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Mi-janvier 2026", "Avance de 60 % des crédits d'impôt récurrents pour les foyers concernés."],
                ["Avril – juin 2026", "Déclaration des revenus 2025 (dates limites échelonnées par département)."],
                ["24 ou 31 juillet 2026", "Virement « REMB IMPOT REVENUS » pour les foyers remboursés dont le RIB est connu."],
                ["Courant août 2026", "Envoi des chèques aux foyers sans coordonnées bancaires enregistrées."],
                ["Fin juillet – début septembre", "Mise à disposition des avis d'imposition dans l'espace particulier."],
                ["1er septembre 2026", "Application du nouveau taux de prélèvement à la source, issu de la déclaration."],
                ["25 septembre 2026", "Prélèvement du solde pour les foyers qui doivent un complément ≤ 300 €."],
                ["Septembre – décembre 2026", "Solde > 300 € : prélèvement étalé automatiquement en quatre mensualités."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="verifier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Vérifier que le montant est le bon
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Votre avis d&apos;imposition détaille le calcul : impôt sur les
            revenus 2025, moins les réductions et crédits, moins le total déjà
            prélevé à la source en 2025, moins l&apos;avance de janvier le cas
            échéant. Le remboursement est la différence, ligne « montant qui
            vous sera remboursé ». Trois vérifications utiles :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le total prélevé à la source</strong> correspond-il au cumul de vos bulletins de paie 2025 (ligne « impôt sur le revenu prélevé à la source ») ? Les erreurs sont rares mais réelles, notamment après un changement d&apos;employeur.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Vos crédits d&apos;impôt</strong> sont-ils tous présents ? Un justificatif d&apos;emploi à domicile ou un don déclaré tardivement se corrige via la déclaration rectificative en ligne, ouverte jusqu&apos;à début décembre.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Votre taux de septembre</strong> reflète-t-il votre situation actuelle ? Un remboursement massif signale souvent un taux trop élevé toute l&apos;année — de la trésorerie prêtée gratuitement à l&apos;État. Notre <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">simulateur net après impôt</Link> vous montre l&apos;effet du taux sur votre net mensuel.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="solde" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le cas inverse : vous devez un solde
        </h2>
        <div className="mt-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Si le prélèvement 2025 s&apos;est révélé <em>insuffisant</em> —
            revenus en hausse, crédit d&apos;impôt disparu alors que
            l&apos;avance de janvier a été versée —, le complément est prélevé
            automatiquement : <strong>en une fois le 25 septembre 2026</strong>{" "}
            si le montant est inférieur ou égal à 300 €,{" "}
            <strong>en quatre mensualités de septembre à décembre</strong>{" "}
            au-delà. L&apos;étalement est appliqué d&apos;office, sans
            démarche. Anticipez la trésorerie : quatre prélèvements
            d&apos;affilée en fin d&apos;année, cela se prépare — notre{" "}
            <Link href="/actualites/nouveau-taux-prelevement-source-septembre-2026" className="underline underline-offset-4">
              article sur le nouveau taux de septembre
            </Link>{" "}
            détaille ce qui change sur votre bulletin au même moment.
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Cette page est mise à jour chaque année avec les dates et montants de
          la campagne en cours. Les dates 2027 seront publiées ici dès leur
          annonce par la DGFiP, au printemps 2027.
        </p>
      </section>
    </GuideShell>
  );
}
