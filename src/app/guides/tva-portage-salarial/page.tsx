import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ReceiptIcon, CalculatorIcon, InfoIcon, ScaleIcon } from "@/components/icons";
import { calculerPortage } from "@/lib/calculators/portage";

const TJM = 500;
const JOURS = 18;
const r = calculerPortage({
  tjm: TJM,
  joursTravailles: JOURS,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
});
const TVA = 0.2;
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "tva-portage-salarial",
  titre: "TVA et portage salarial : pourquoi elle ne vous concerne pas (ou presque)",
  sousTitre: "C'est la société de portage qui facture, collecte et déclare — vous, vous raisonnez en HT",
  chapo: `La TVA est l'une des grandes simplifications du portage salarial, et pourtant l'une de ses questions les plus fréquentes. La réponse tient en une phrase : vous n'êtes pas assujetti, c'est la société de portage qui facture le client en TTC, collecte la TVA et la reverse. Votre chiffre d'affaires de référence est toujours le HT, votre salaire se calcule dessus. Reste un point qui vaut de l'argent : la récupération de TVA sur vos frais professionnels.`,
  filAriane: "TVA et portage",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "qui", label: "Qui facture la TVA" },
    { id: "calcul", label: "HT, TTC et votre salaire" },
    { id: "frais", label: "La récupération sur vos frais" },
    { id: "cas", label: "Les cas particuliers" },
  ],
  faq: [
    {
      q: "Le salarié porté est-il assujetti à la TVA ?",
      r: "Non. Vous êtes salarié, pas entrepreneur : vous n'avez ni numéro de TVA intracommunautaire, ni déclaration à déposer, ni obligation de facturation. C'est la société de portage qui est l'assujettie : elle facture votre client en TTC au nom de sa propre structure, collecte la TVA et la reverse à l'administration fiscale. Cette différence avec la micro-entreprise est majeure : un auto-entrepreneur doit surveiller ses seuils de franchise et bascule dans la TVA en cours d'année s'il les dépasse — un salarié porté, jamais.",
    },
    {
      q: "Mon TJM doit-il s'entendre HT ou TTC ?",
      r: `Toujours HT. C'est le montant hors taxe qui sert de base à tout : frais de gestion, charges patronales, salaire brut. La société de portage ajoute la TVA au moment de facturer le client. Concrètement, un TJM de ${EUR.format(TJM)} HT sur ${JOURS} jours donne ${EUR.format(r.caHT)} de chiffre d'affaires HT, facturés ${EUR.format(r.caHT * (1 + TVA))} TTC au client — mais c'est bien sur ${EUR.format(r.caHT)} que se calcule votre rémunération. Quand un client vous demande votre tarif, précisez toujours « HT » : l'ambiguïté coûte 20 %.`,
    },
    {
      q: "Puis-je récupérer la TVA sur mes frais professionnels ?",
      r: "Pas vous directement — mais la société de portage le peut, et cela peut vous profiter. Lorsque vous engagez un achat professionnel (matériel, logiciel, formation) et qu'il est traité comme un achat de la société de portage sur facture à son nom, elle récupère la TVA. Les pratiques divergent fortement : certaines sociétés vous remboursent le montant TTC et gardent la TVA récupérée, d'autres vous en font bénéficier. C'est une question précise à poser avant de signer, et elle représente 20 % sur des achats parfois conséquents.",
    },
    {
      q: "Et si mon client est à l'étranger ?",
      r: "La société de portage applique les règles de territorialité de la TVA. Pour une prestation de services à un client professionnel établi dans un autre État membre de l'Union européenne, la facture est en principe émise hors taxe avec autoliquidation par le client (mention obligatoire sur la facture). Pour un client hors UE, la prestation est généralement hors champ de la TVA française. Dans tous les cas, ce n'est pas votre affaire : la société gère, et votre salaire reste calculé sur le HT.",
    },
    {
      q: "La facturation électronique change-t-elle quelque chose pour moi ?",
      r: "Non, et c'est encore un avantage du portage. La réforme de la facturation électronique, dont la première marche est tombée au 1er septembre 2026, s'adresse aux entreprises assujetties à la TVA — donc à votre société de portage, pas à vous. Un micro-entrepreneur doit s'y conformer lui-même, y compris en franchise de TVA ; un salarié porté n'a aucune démarche à effectuer. Notre article sur la réforme détaille qui est concerné et à quelles dates.",
    },
  ],
  sources: [
    { label: "CGI, art. 259 — territorialité des prestations de services (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000021658185" },
    { label: "impots.gouv.fr — la TVA sur les prestations de services", href: "https://www.impots.gouv.fr/professionnel/tva" },
    { label: "Code du travail, art. L1254-1 et suivants — portage salarial (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
    { label: "service-public.fr — franchise en base de TVA", href: "https://entreprendre.service-public.fr/vosdroits/F21746" },
  ],
};

export const metadata: Metadata = {
  title: "TVA et portage salarial : qui facture, qui récupère, ce que ça change",
  description: `Le salarié porté n'est pas assujetti à la TVA : la société de portage facture le client en TTC et reverse la taxe. Votre TJM s'entend toujours HT — ${EUR.format(TJM)} HT font ${EUR.format(TJM * (1 + TVA))} TTC. La récupération sur les frais professionnels, les clients étrangers et la facturation électronique.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "TVA et portage salarial : pourquoi elle ne vous concerne pas",
    description: "Qui facture, qui collecte, et le point qui vaut vraiment de l'argent : la récupération sur les frais.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="qui" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Qui facture la TVA dans la relation à trois
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le portage salarial fait intervenir trois acteurs, et un seul est
            assujetti à la TVA : <strong>la société de portage</strong>.
            C&apos;est elle qui émet la facture au client, au nom de sa propre
            structure, TVA comprise. Elle collecte cette TVA et la reverse à
            l&apos;administration. Vous, salarié porté, n&apos;avez ni numéro
            de TVA, ni facture à émettre, ni déclaration à déposer.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            C&apos;est l&apos;écart le plus net avec la micro-entreprise. Un
            auto-entrepreneur doit surveiller ses seuils de franchise, basculer
            dans la TVA en cours d&apos;année s&apos;il les dépasse, refaire
            ses devis et déclarer — le mécanisme est détaillé dans notre{" "}
            <Link href="/guides/plafonds-micro-entreprise-2027" className="text-primary underline-offset-4 hover:underline">
              guide des plafonds micro
            </Link>
            . En portage, ce sujet n&apos;existe simplement pas, quel que soit
            votre volume d&apos;affaires.
          </p>
        </div>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          HT, TTC, et ce sur quoi votre salaire se calcule
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <tbody>
              {[
                [`TJM négocié avec le client`, `${EUR.format(TJM)} HT`, "C'est toujours du HT. Précisez-le : l'ambiguïté coûte 20 %."],
                [`Chiffre d'affaires du mois (${JOURS} jours)`, `${EUR.format(r.caHT)} HT`, "La base de tous les calculs suivants."],
                [`Montant facturé au client`, `${EUR.format(r.caHT * (1 + TVA))} TTC`, "La société ajoute 20 % de TVA et la reverse à l'État."],
                [`Base de votre rémunération`, `${EUR.format(r.caHT)}`, "Le HT, jamais le TTC. La TVA ne transite que par la société."],
                [`Votre salaire brut`, `${EUR.format(r.salaireBrut)}`, "Après frais de gestion et charges patronales."],
              ].map(([l, v, note]) => (
                <tr key={l as string} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{l}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-bold tabular-nums text-primary">{v}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La TVA n&apos;apparaît nulle part dans votre bulletin de paie ni dans
          votre compte d&apos;activité : elle transite par la société sans
          jamais entrer dans votre rémunération. Le détail du passage du CA au
          net est dans notre{" "}
          <Link href="/guides/simulation-tjm-portage-salarial" className="text-primary underline-offset-4 hover:underline">
            guide de simulation du TJM
          </Link>
          , et le{" "}
          <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
            simulateur
          </Link>{" "}
          raisonne évidemment en HT.
        </p>
      </section>

      <section id="frais" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Le seul point qui vaut de l&apos;argent : vos frais professionnels
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Quand vous achetez du matériel, un logiciel ou une formation dans le
            cadre de votre activité, la société de portage peut{" "}
            <strong>récupérer la TVA</strong> sur cet achat — à condition que la
            facture soit établie à son nom et que la dépense soit engagée pour
            son compte. Sur un ordinateur à 2 000 € TTC, cela représente environ
            333 € de TVA.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Ce que les sociétés en font varie, et c&apos;est rarement mis en
            avant :
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span><strong>Certaines vous font bénéficier de la récupération</strong> : votre compte d&apos;activité n&apos;est débité que du montant HT, la TVA récupérée revient dans votre enveloppe.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-muted-foreground">→</span>
              <span><strong>D&apos;autres débitent le TTC</strong> et conservent la TVA récupérée. Ce n&apos;est pas illégal, mais c&apos;est un coût caché de 20 % sur tous vos achats professionnels.</span>
            </li>
          </ul>
          <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">La question à poser avant de signer :</strong>{" "}
              « quand j&apos;engage un frais professionnel, mon compte
              d&apos;activité est-il débité du HT ou du TTC ? » Sur un
              consultant qui investit 3 000 € par an en matériel et logiciels,
              l&apos;écart atteint 500 €. Notre{" "}
              <Link href="/guides/frais-professionnels-portage-salarial" className="underline underline-offset-4">
                guide des frais professionnels
              </Link>{" "}
              détaille l&apos;arbitrage complet entre refacturable et déduit.
            </p>
          </div>
        </div>
      </section>

      <section id="cas" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Clients étrangers, facturation électronique
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Missions à l&apos;étranger</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Pour un client professionnel dans un autre pays de l&apos;Union
              européenne, la facture est en principe émise hors taxe, le client
              autoliquidant la TVA dans son pays. Hors UE, la prestation est
              généralement hors champ de la TVA française. Dans les deux cas, la
              société de portage applique les règles — c&apos;est même l&apos;un
              des intérêts du statut pour les missions internationales, détaillé
              dans notre{" "}
              <Link href="/guides/portage-salarial-etranger" className="text-primary underline-offset-4 hover:underline">
                guide du portage à l&apos;étranger
              </Link>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Facturation électronique</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              La réforme entrée en vigueur au 1er septembre 2026 vise les
              entreprises assujetties à la TVA : votre société de portage, pas
              vous. Là où un micro-entrepreneur doit choisir une plateforme
              agréée et s&apos;y raccorder — même en franchise de TVA —, le
              salarié porté n&apos;a rien à faire. Le calendrier complet est
              dans{" "}
              <Link href="/actualites/facturation-electronique-1er-septembre-2026" className="text-primary underline-offset-4 hover:underline">
                notre article
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
