import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ShieldIcon, ScaleIcon, ReceiptIcon, InfoIcon } from "@/components/icons";

// Part patronale minimale imposée par l'ANI de 2013, généralisée en 2016.
const PART_EMPLOYEUR_MIN = 0.5;
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "mutuelle-entreprise",
  titre: "Mutuelle d'entreprise : obligatoire, financée à moitié, et imposable",
  sousTitre: "Un avantage réel de plusieurs centaines d'euros par an — avec une contrepartie fiscale que personne n'annonce",
  chapo: "Depuis 2016, tout employeur du privé doit proposer une complémentaire santé collective et en financer au moins la moitié. C'est l'un des avantages les mieux valorisés du salariat — et l'un des plus mal compris : l'adhésion est obligatoire sauf cas de dispense précis, la part patronale est imposable même si vous ne la touchez pas, et la portabilité vous couvre gratuitement après le départ. Le point complet.",
  filAriane: "Mutuelle d'entreprise",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "obligation", label: "Ce que l'employeur doit" },
    { id: "dispenses", label: "Les cas de dispense" },
    { id: "fiscal", label: "L'effet fiscal méconnu" },
    { id: "portabilite", label: "La portabilité après le départ" },
  ],
  faq: [
    {
      q: "La mutuelle d'entreprise est-elle obligatoire pour le salarié ?",
      r: "Oui par principe : depuis la généralisation de 2016, l'adhésion au contrat collectif est obligatoire pour tous les salariés du secteur privé, sans condition d'ancienneté. Des cas de dispense existent, mais ils sont limitativement prévus par les textes et par l'acte instituant le régime : bénéficiaire de la complémentaire santé solidaire, salarié déjà couvert en tant qu'ayant droit par le contrat obligatoire de son conjoint, contrat court, temps très partiel dont la cotisation excéderait 10 % de la rémunération, ou salarié présent avant la mise en place du régime par décision unilatérale.",
    },
    {
      q: "Quelle part l'employeur doit-il financer ?",
      r: "Au minimum 50 % de la cotisation du salarié pour le socle obligatoire du contrat — la couverture des ayants droit et les garanties optionnelles restant en principe à votre charge, sauf disposition plus favorable. De nombreuses conventions collectives et accords d'entreprise vont au-delà : 60, 70, voire 100 %. La part patronale apparaît sur votre bulletin de paie, en général dans la partie basse, avec la mention de la cotisation salariale correspondante.",
    },
    {
      q: "Pourquoi la mutuelle augmente-t-elle mon revenu imposable ?",
      r: "Parce que depuis 2013, la part patronale de la complémentaire santé est réintégrée dans le net imposable du salarié. L'employeur paie, vous ne touchez rien, et vous êtes pourtant imposé sur ce montant. Pour une part patronale de 40 € par mois, cela représente 480 € ajoutés à votre revenu imposable annuel — de l'ordre de 50 à 145 € d'impôt supplémentaire selon votre tranche marginale. La cotisation salariale, elle, reste déductible du revenu imposable.",
    },
    {
      q: "Que devient ma mutuelle quand je quitte l'entreprise ?",
      r: "La portabilité vous maintient gratuitement dans le contrat collectif après la rupture, pour une durée égale à celle de votre dernier contrat, dans la limite de 12 mois. Deux conditions : la rupture doit ouvrir droit à l'indemnisation chômage — la démission simple en est donc exclue — et vos droits doivent avoir été ouverts avant la fin du contrat. C'est un filet précieux entre deux emplois, et il faut penser à en informer l'organisme : la mise en œuvre n'est pas toujours automatique.",
    },
    {
      q: "Et si je deviens indépendant ?",
      r: "Vous perdez la mutuelle collective à la fin de la portabilité et devez souscrire un contrat individuel, entièrement à votre charge — comptez 50 à 150 € par mois selon l'âge et les garanties. C'est l'un des coûts invisibles du passage à l'indépendance, à intégrer dans vos frais professionnels. Exception notable : le salarié porté reste salarié et conserve la mutuelle collective de sa société de portage, ce qui fait partie des contreparties des frais de gestion.",
    },
  ],
  sources: [
    { label: "service-public.fr — complémentaire santé d'entreprise", href: "https://www.service-public.fr/particuliers/vosdroits/F20739" },
    { label: "Code de la sécurité sociale, art. L911-7 — couverture minimale (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028497843" },
    { label: "URSSAF — protection sociale complémentaire", href: "https://www.urssaf.fr/accueil/employeur/beneficier-exonerations.html" },
    { label: "service-public.fr — portabilité de la complémentaire santé", href: "https://www.service-public.fr/particuliers/vosdroits/F21542" },
  ],
};

export const metadata: Metadata = {
  title: "Mutuelle d'entreprise : obligation, part employeur 50 %, effet fiscal",
  description: "L'employeur doit proposer une complémentaire santé et en financer au moins 50 %. L'adhésion est obligatoire sauf dispense limitativement prévue. La part patronale est réintégrée dans le net imposable — et la portabilité vous couvre gratuitement jusqu'à 12 mois après le départ.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Mutuelle d'entreprise : obligatoire, financée à moitié, et imposable",
    description: "L'obligation, les cas de dispense, l'effet fiscal méconnu et la portabilité.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="obligation" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Ce que l&apos;employeur doit — et ce qu&apos;il ne doit pas
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: `${PART_EMPLOYEUR_MIN * 100} %`, l: "de la cotisation du socle obligatoire, à la charge de l'employeur au minimum" },
            { v: "Tous", l: "les salariés du privé sont concernés, sans condition d'ancienneté" },
            { v: "12 mois", l: "de portabilité gratuite maximum après le départ" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-3xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;obligation porte sur le <strong>socle obligatoire</strong> du
            contrat, c&apos;est-à-dire la couverture du seul salarié. Étendre
            la protection au conjoint et aux enfants, ou souscrire des options
            renforcées, reste à votre charge — sauf si votre convention
            collective ou votre accord d&apos;entreprise prévoit mieux, ce qui
            est fréquent. Beaucoup d&apos;employeurs financent 60, 70, voire
            100 % : c&apos;est un élément de package à regarder au même titre
            que le salaire.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le contrat doit par ailleurs respecter un{" "}
            <strong>panier de soins minimum</strong> : prise en charge
            intégrale du ticket modérateur sur les consultations et actes
            remboursés, forfait journalier hospitalier sans limitation de
            durée, et planchers en optique et dentaire. Un contrat collectif
            ne peut pas descendre en dessous.
          </p>
        </div>
      </section>

      <section id="dispenses" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les cas de dispense : limitativement prévus
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            On ne refuse pas la mutuelle d&apos;entreprise « parce qu&apos;on
            en a déjà une ». La dispense doit entrer dans un cas prévu par les
            textes ou par l&apos;acte instituant le régime, et se demander{" "}
            <strong>par écrit</strong> :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            {[
              ["Ayant droit du contrat obligatoire du conjoint", "le cas le plus courant. Attention : être couvert par un contrat individuel du conjoint ne suffit pas — il doit s'agir d'un contrat collectif obligatoire couvrant les ayants droit."],
              ["Bénéficiaire de la complémentaire santé solidaire", "la dispense vaut jusqu'à la fin du droit."],
              ["Contrat court ou temps très partiel", "notamment lorsque la cotisation représenterait au moins 10 % de la rémunération."],
              ["Salarié présent avant la mise en place", "lorsque le régime a été institué par décision unilatérale de l'employeur et prévoit une participation salariale."],
              ["Apprenti ou salarié en contrat de mission", "sous conditions de durée, selon l'acte instituant le régime."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="text-primary">→</span>
                <span><strong>{t}</strong> — {d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Le calcul à faire avant de demander une dispense :</strong>{" "}
              refuser la mutuelle d&apos;entreprise, c&apos;est renoncer à la
              part patronale — soit au minimum la moitié d&apos;une cotisation
              que vous paierez de toute façon ailleurs. Sauf couverture par le
              conjoint réellement équivalente, la dispense est presque toujours
              défavorable financièrement.
            </p>
          </div>
        </div>
      </section>

      <section id="fiscal" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          L&apos;effet fiscal que personne n&apos;annonce
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Depuis 2013, la <strong>part patronale de la complémentaire santé
            est réintégrée dans votre net imposable</strong>. Votre employeur la
            paie, vous ne la touchez jamais, et vous êtes pourtant imposé
            dessus. C&apos;est l&apos;une des deux grandes causes d&apos;écart
            entre le net à payer et le net imposable, avec la CSG non
            déductible — le mécanisme complet est dans notre{" "}
            <Link href="/guides/net-imposable" className="text-primary underline-offset-4 hover:underline">
              guide du net imposable
            </Link>
            .
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Part patronale mensuelle</th>
                  <th className="px-5 py-4 text-right">Ajouté au revenu imposable</th>
                  <th className="px-5 py-4 text-right">Coût fiscal à 11 %</th>
                  <th className="px-5 py-4 text-right">à 30 %</th>
                </tr>
              </thead>
              <tbody>
                {[25, 40, 60].map((p) => (
                  <tr key={p} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3 font-semibold tabular-nums text-foreground">{EUR.format(p)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(p * 12)} / an</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(p * 12 * 0.11)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(p * 12 * 0.3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            À l&apos;inverse, votre <strong>cotisation salariale reste
            déductible</strong> du revenu imposable, dans les limites prévues
            pour les contrats collectifs obligatoires. Le solde reste largement
            positif : une part patronale de {EUR.format(40)} par mois vous
            coûte au maximum {EUR.format(40 * 12 * 0.3)} d&apos;impôt par an
            pour {EUR.format(40 * 12)} de couverture financée. L&apos;avantage
            demeure — il est simplement moins net qu&apos;il n&apos;y paraît.
          </p>
        </div>
      </section>

      <section id="portabilite" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          La portabilité : douze mois de couverture gratuite
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            À la fin de votre contrat, vous restez couvert{" "}
            <strong>gratuitement</strong> par le contrat collectif, pour une
            durée égale à celle de votre dernier contrat de travail, dans la
            limite de <strong>12 mois</strong>. Deux conditions : la rupture
            doit ouvrir droit à l&apos;assurance chômage — licenciement,{" "}
            <Link href="/guides/indemnite-rupture-conventionnelle" className="text-primary underline-offset-4 hover:underline">
              rupture conventionnelle
            </Link>
            , fin de CDD, mais pas la démission simple — et vos droits doivent
            avoir été ouverts avant la fin du contrat.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Prévenez l&apos;organisme</strong> : la mise en œuvre n&apos;est pas toujours automatique, et l&apos;employeur doit mentionner la portabilité dans votre certificat de travail — un point à vérifier dans les documents remis avec votre <Link href="/guides/solde-de-tout-compte" className="text-primary underline-offset-4 hover:underline">solde de tout compte</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Elle s&apos;interrompt</strong> si vous retrouvez un emploi couvert, si vous cessez d&apos;être indemnisé par France Travail, ou au terme des 12 mois.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Après, tout est à votre charge.</strong> Pour un indépendant, comptez 50 à 150 € par mois de contrat individuel — un coût à intégrer aux frais professionnels, et l&apos;un des postes que chiffre notre <Link href="/simulateurs/salarie-ou-freelance" className="text-primary underline-offset-4 hover:underline">comparateur salarié ou freelance</Link>. Seul le <Link href="/guides/portage-salarial" className="text-primary underline-offset-4 hover:underline">salarié porté</Link> conserve une mutuelle collective, celle de sa société de portage.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
