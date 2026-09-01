import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ReceiptIcon, ScaleIcon, AlertTriangleIcon, CalendarIcon } from "@/components/icons";

const meta: GuideMeta = {
  slug: "solde-de-tout-compte",
  titre: "Solde de tout compte : ce qu'on vous doit vraiment en partant",
  sousTitre: "Six lignes à vérifier, et six mois pour contester si vous avez signé",
  chapo: "Le solde de tout compte est le dernier document que l'on signe en quittant une entreprise — souvent vite, dans un moment où l'on a la tête ailleurs. C'est une erreur : sa signature déclenche un délai de contestation de six mois seulement, contre trois ans sans elle. Voici les six lignes qui doivent y figurer, ce qui est souvent oublié, et la marche à suivre si le compte n'y est pas.",
  filAriane: "Solde de tout compte",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "contenu", label: "Ce qu'il doit contenir" },
    { id: "oublis", label: "Les oublis fréquents" },
    { id: "signature", label: "Signer ou ne pas signer" },
    { id: "documents", label: "Les autres documents dus" },
  ],
  faq: [
    {
      q: "Qu'est-ce que le solde de tout compte ?",
      r: "C'est un document remis par l'employeur à la fin du contrat de travail, quel que soit le motif de rupture, qui fait l'inventaire des sommes versées au salarié à cette occasion. Il est établi en double exemplaire, dont un vous est remis. Il n'est pas une quittance générale : il ne vaut reçu que pour les sommes qui y sont expressément mentionnées. C'est une nuance capitale — ce qui n'y figure pas reste dû.",
    },
    {
      q: "Que doit-on retrouver dans un solde de tout compte ?",
      r: "Six éléments principaux : le dernier salaire au prorata des jours travaillés, l'indemnité compensatrice de congés payés non pris, l'indemnité compensatrice de préavis s'il n'est pas exécuté, l'indemnité de rupture le cas échéant (licenciement, rupture conventionnelle), les primes dues au prorata (13e mois, primes conventionnelles), et les contreparties financières éventuelles comme l'indemnité de non-concurrence. S'y ajoutent les jours de RTT ou de compte épargne-temps non consommés selon les accords d'entreprise.",
    },
    {
      q: "Suis-je obligé de signer le solde de tout compte ?",
      r: "Non, la signature n'est jamais obligatoire — et le refus de signer ne vous prive d'aucune somme : l'employeur doit payer ce qu'il doit, signature ou pas. La signature a un seul effet juridique, mais il est majeur : elle fait courir un délai de dénonciation de six mois, au-delà duquel le reçu devient libératoire pour les sommes qui y sont mentionnées. Sans signature, vous conservez le délai de prescription de droit commun — trois ans pour les rappels de salaire.",
    },
    {
      q: "J'ai signé et je découvre une erreur : que faire ?",
      r: "Vous disposez de six mois à compter de la signature pour dénoncer le solde de tout compte, par lettre recommandée avec accusé de réception adressée à l'employeur, en motivant précisément les sommes contestées. Ce délai est strict. Passé six mois, le reçu devient libératoire pour les seules sommes qui y étaient mentionnées — ce qui laisse ouverte la contestation de tout élément absent du document. C'est pourquoi vérifier ce qui manque compte autant que vérifier les montants.",
    },
    {
      q: "Une mention « pour solde de tout compte » me fait-elle renoncer à mes droits ?",
      r: "Non. Le reçu pour solde de tout compte n'est pas une transaction et n'emporte aucune renonciation à agir sur des demandes qui n'y sont pas chiffrées : heures supplémentaires non payées, requalification, harcèlement, discrimination. La jurisprudence est constante sur ce point. Attention en revanche à ne pas confondre ce document avec un protocole transactionnel, qui, lui, comporte une renonciation réciproque à recours — et se signe en toute connaissance de cause, idéalement après avis d'un avocat.",
    },
  ],
  sources: [
    { label: "Code du travail, art. L1234-20 — reçu pour solde de tout compte (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019071120" },
    { label: "service-public.fr — solde de tout compte", href: "https://www.service-public.fr/particuliers/vosdroits/F1132" },
    { label: "Code du travail, art. L3245-1 — prescription des salaires (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027565269" },
    { label: "service-public.fr — documents remis à la fin du contrat", href: "https://www.service-public.fr/particuliers/vosdroits/F1140" },
  ],
};

export const metadata: Metadata = {
  title: "Solde de tout compte : les 6 lignes à vérifier avant de signer",
  description: "Salaire au prorata, congés payés non pris, préavis, indemnité de rupture, primes proratisées, non-concurrence : ce que le solde de tout compte doit contenir. La signature ouvre un délai de contestation de 6 mois seulement — contre 3 ans sans elle.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Solde de tout compte : ce qu'on vous doit vraiment en partant",
    description: "Les six lignes obligatoires, les oublis fréquents, et l'effet de la signature.",
    url: `/guides/${meta.slug}`,
  },
};

const LIGNES = [
  { t: "Le salaire du dernier mois", d: "Au prorata des jours réellement travaillés, primes mensuelles comprises. Vérifiez le nombre de jours retenu : c'est l'erreur la plus banale." },
  { t: "L'indemnité de congés payés", d: "Pour tous les jours acquis et non pris, y compris ceux de la période en cours. Elle se calcule au plus favorable entre le dixième de la rémunération et le maintien de salaire." },
  { t: "L'indemnité compensatrice de préavis", d: "Due si l'employeur vous dispense d'exécuter le préavis. Si c'est vous qui demandez la dispense, elle ne l'est pas — la nuance vaut plusieurs milliers d'euros." },
  { t: "L'indemnité de rupture", d: "Licenciement ou rupture conventionnelle : au moins l'indemnité légale, davantage si la convention collective le prévoit. Le calcul complet est dans notre guide dédié." },
  { t: "Les primes au prorata", d: "13e mois, prime de vacances, prime conventionnelle : proratisés au temps de présence, sauf clause de présence à la date de versement." },
  { t: "La contrepartie de non-concurrence", d: "Si votre contrat comporte une clause de non-concurrence et que l'employeur ne l'a pas levée dans les délais, la contrepartie financière est due — souvent oubliée." },
];

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="contenu" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Les six lignes qui doivent y figurer
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {LIGNES.map((l, i) => (
            <div key={l.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="flex items-baseline gap-3 font-semibold text-foreground">
                <span aria-hidden className="text-primary">{i + 1}.</span>
                {l.t}
              </p>
              <p className="mt-2 text-base leading-relaxed text-foreground/80">{l.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          S&apos;y ajoutent, selon votre entreprise, les jours de RTT non pris,
          le solde d&apos;un compte épargne-temps, l&apos;épargne salariale
          disponible et — point souvent négligé — les{" "}
          <Link href="/guides/titres-restaurant" className="text-primary underline-offset-4 hover:underline">
            titres-restaurant
          </Link>{" "}
          non attribués, dont la part salariale doit vous être remboursée.
        </p>
      </section>

      <section id="oublis" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Les oublis qui coûtent le plus cher
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">→</span>
              <span><strong>Les congés payés de la période en cours.</strong> Beaucoup de soldes ne comptent que les congés de la période antérieure. Ceux acquis depuis le 1er juin de l&apos;année en cours sont pourtant dus eux aussi.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">→</span>
              <span><strong>La contrepartie de non-concurrence.</strong> Si l&apos;employeur veut vous en libérer, il doit le faire dans le délai prévu au contrat — souvent 15 jours après la notification de la rupture. Passé ce délai, il doit payer, parfois pendant deux ans.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">→</span>
              <span><strong>Le 13e mois au prorata.</strong> Sauf clause de présence expresse à la date de versement, il est dû au prorata du temps de présence — le mécanisme est détaillé dans notre <Link href="/guides/13e-mois" className="text-primary underline-offset-4 hover:underline">guide du 13e mois</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">→</span>
              <span><strong>Les heures supplémentaires non payées.</strong> Elles ne figurent presque jamais dans un solde de tout compte, et restent réclamables sur trois ans — voir notre <Link href="/guides/heures-supplementaires" className="text-primary underline-offset-4 hover:underline">guide dédié</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">→</span>
              <span><strong>En portage salarial</strong>, le solde du compte d&apos;activité et la réserve financière constituée vous reviennent : demandez-en le détail écrit, ils ne figurent pas toujours dans le solde de tout compte classique.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="signature" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Signer ou ne pas signer : ce que ça change vraiment
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Si vous signez</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Vous disposez de <strong>six mois</strong> pour dénoncer le reçu,
              par lettre recommandée motivée. Au-delà, il devient libératoire
              pour les sommes qui y sont <em>mentionnées</em>. Tout ce qui n&apos;y
              figure pas reste contestable dans les délais de droit commun.
            </p>
          </div>
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="font-semibold text-foreground">Si vous ne signez pas</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Vous conservez <strong>trois ans</strong> pour réclamer un rappel
              de salaire, et l&apos;employeur doit malgré tout vous verser ce
              qu&apos;il vous doit : la signature n&apos;est pas une condition
              de paiement. Refuser de signer n&apos;a aucune conséquence
              négative.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-5">
          <p className="text-base leading-relaxed text-foreground/80">
            <strong className="text-foreground">La solution intermédiaire</strong>{" "}
            existe et elle est parfaitement admise : signer en portant la
            mention manuscrite « sous réserve de mes droits ». Vous prenez
            possession du document et des sommes sans renoncer à contester. En
            cas de doute sur un montant, c&apos;est le réflexe à avoir plutôt
            que de signer sans lire — ou de refuser en bloc.
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Un point à ne pas confondre : le reçu pour solde de tout compte{" "}
          <strong>n&apos;est pas une transaction</strong>. Il n&apos;emporte
          aucune renonciation à agir sur ce qu&apos;il ne chiffre pas. Un
          protocole transactionnel, lui, comporte une renonciation réciproque à
          recours — ne signez jamais l&apos;un en croyant signer l&apos;autre.
        </p>
      </section>

      <section id="documents" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Les trois autres documents que l&apos;employeur vous doit
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>L&apos;attestation destinée à France Travail</strong> : indispensable pour ouvrir vos droits au chômage. Elle est transmise directement par l&apos;employeur, mais gardez votre exemplaire — c&apos;est elle qui fixe le salaire de référence de votre allocation, comme expliqué dans notre <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">guide sur le calcul de l&apos;ARE</Link>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le certificat de travail</strong> : dates d&apos;entrée et de sortie, emplois occupés. Document simple mais exigé par tout futur employeur.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>L&apos;état récapitulatif de l&apos;épargne salariale</strong>, si vous en aviez : participation, intéressement, PEE. Vos avoirs restent disponibles après le départ, mais les frais de tenue de compte peuvent basculer à votre charge.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Si vous partez par rupture conventionnelle, notre{" "}
            <Link href="/guides/indemnite-rupture-conventionnelle" className="text-primary underline-offset-4 hover:underline">
              guide du calcul de l&apos;indemnité
            </Link>{" "}
            détaille le montant minimum qui doit figurer dans votre solde — et
            si vous envisagez de basculer vers l&apos;indépendance, notre{" "}
            <Link href="/simulateurs/salarie-ou-freelance" className="text-primary underline-offset-4 hover:underline">
              comparateur salarié ou freelance
            </Link>{" "}
            chiffre ce que la suite vous rapporterait.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
