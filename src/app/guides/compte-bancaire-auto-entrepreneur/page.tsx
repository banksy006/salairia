import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import { IconBadge, InfoIcon, ScaleIcon, ReceiptIcon, CompassIcon, AlertTriangleIcon, CalculatorIcon, TargetIcon } from "@/components/icons";
import data from "@/data/banques-pro.json";

// Règle légale : fiche Service-Public Entreprendre F35991, vérifiée le 28 mai
// 2026 (art. L613-10 du Code de la sécurité sociale, art. L123-24 du Code de
// commerce). Seuil : 10 000 € de chiffre d'affaires deux années consécutives.
const SEUIL_CA = 10_000;

// Offres d'entrée : mêmes données que le comparateur banques pro. Les offres
// en extinction (Blank, Propulse) sont écartées : on ne peut plus y ouvrir.
const offres = data.banques
  .filter((b) => !b.arret)
  .sort((a, b) => (a.prixMensuelHT ?? 999) - (b.prixMensuelHT ?? 999));
const gratuites = offres.filter((b) => b.prixMensuelHT === 0);
const payantes = offres.filter((b) => (b.prixMensuelHT ?? 0) > 0);
const prixPayantMin = Math.min(...payantes.map((b) => b.prixMensuelHT as number));
const dateReleve = new Date(data.dateReleve).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "compte-bancaire-auto-entrepreneur",
  titre: "Compte bancaire auto-entrepreneur 2027 : obligatoire ou non, et lequel choisir",
  sousTitre: `Un compte dédié devient obligatoire au-delà de ${EUR.format(SEUIL_CA)} de chiffre d'affaires deux années de suite, mais pas forcément un compte « pro »`,
  chapo: `Un auto-entrepreneur n'est pas obligé d'ouvrir un compte bancaire professionnel. La loi lui impose seulement un compte dédié à son activité, et seulement si son chiffre d'affaires dépasse ${EUR.format(SEUIL_CA)} pendant deux années consécutives, ou dès le départ pour une activité commerciale. Ce compte dédié peut être un simple compte courant personnel, séparé de celui de la vie privée. En pratique, les banques tolèrent mal l'usage professionnel d'un compte personnel, et des comptes pro gratuits existent : ${gratuites.map((b) => `${b.nom} ${b.offreEntree}`).join(" et ")} sont à 0 € par mois, les offres payantes démarrent à ${EUR.format(prixPayantMin)} HT. Voici la règle exacte, ce que coûte chaque option, et comment choisir selon votre activité.`,
  filAriane: "Compte bancaire auto-entrepreneur",
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  tocItems: [
    { id: "obligatoire", label: "Est-ce obligatoire ?" },
    { id: "perso-ou-pro", label: "Compte perso dédié ou compte pro" },
    { id: "prix", label: "Ce que ça coûte" },
    { id: "choisir", label: "Lequel choisir" },
    { id: "refus", label: "En cas de refus" },
  ],
  faq: [
    {
      q: "Un auto-entrepreneur doit-il ouvrir un compte bancaire professionnel ?",
      r: `Non. Selon Service-Public, l'ouverture d'un compte bancaire professionnel n'est pas obligatoire en micro-entreprise. Ce qui devient obligatoire, c'est un compte dédié à l'activité, professionnel ou personnel, lorsque le chiffre d'affaires dépasse ${EUR.format(SEUIL_CA)} pendant deux années consécutives. Exception : pour une activité commerciale, le compte dédié est obligatoire quel que soit le chiffre d'affaires.`,
    },
    {
      q: "Peut-on utiliser son compte personnel pour son auto-entreprise ?",
      r: `Tant que le chiffre d'affaires reste sous ${EUR.format(SEUIL_CA)} deux années de suite et que l'activité n'est pas commerciale, la loi ne l'interdit pas. Au-delà, il faut un compte séparé, qui peut être un second compte courant personnel. Attention : Service-Public précise que ce compte doit porter la mention « entrepreneur individuel » ou « EI », ce qui complique l'ouverture d'un simple compte courant, et que certaines banques limitent l'usage professionnel de leurs comptes personnels.`,
    },
    {
      q: "Existe-t-il un compte pro gratuit pour auto-entrepreneur ?",
      r: `Oui. Au ${dateReleve}, ${gratuites.map((b) => `${b.nom} (offre ${b.offreEntree})`).join(" et ")} proposent une offre à 0 € par mois, avec des limites : ${gratuites.map((b) => `${b.nom} : ${b.virementsInclus}`).join(" ; ")}. Ces offres conviennent à un démarrage ou à un faible volume d'opérations. Vérifiez la grille tarifaire officielle avant d'ouvrir : les conditions changent.`,
    },
    {
      q: "Quand faut-il ouvrir le compte dédié après avoir dépassé le seuil ?",
      r: `L'obligation naît quand le chiffre d'affaires a dépassé ${EUR.format(SEUIL_CA)} pendant deux années consécutives. Service-Public indique qu'il convient alors de prendre contact avec un établissement bancaire pour ouvrir le compte. Il recommande d'en ouvrir un même sous le seuil, pour ne pas mélanger dépenses personnelles et professionnelles.`,
    },
    {
      q: "Que faire si la banque refuse d'ouvrir le compte ?",
      r: "La banque doit vous remettre une attestation ou une lettre de refus. Avec ce document, vous saisissez la Banque de France, qui désigne un établissement obligé de vous ouvrir un compte avec les services de base : c'est la procédure du droit au compte, ouverte à toute personne physique.",
    },
  ],
  sources: [
    { label: "Service-Public Entreprendre — compte bancaire du micro-entrepreneur (fiche F35991, vérifiée le 28 mai 2026)", href: "https://entreprendre.service-public.gouv.fr/vosdroits/F35991" },
    { label: "Code de la sécurité sociale, art. L613-10 — seuil de 10 000 € deux années consécutives (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038586837" },
    { label: "Code de commerce, art. L123-24 — compte obligatoire pour les commerçants (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006219343/" },
    ...offres.map((b) => ({ label: `${b.nom} — grille tarifaire officielle`, href: b.urlTarifs })),
  ],
};

export const metadata: Metadata = {
  title: "Compte bancaire auto-entrepreneur 2027 : obligatoire ? Lequel choisir",
  description: `Compte dédié obligatoire au-delà de ${EUR.format(SEUIL_CA)} de chiffre d'affaires deux années de suite, mais pas forcément un compte pro. La règle officielle, les comptes pro gratuits et payants comparés (de 0 à ${EUR.format(Math.max(...payantes.map((b) => b.prixMensuelHT as number)))} HT par mois), et comment choisir.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Compte bancaire auto-entrepreneur : obligatoire ou non ?",
    description: "La règle des 10 000 €, le compte perso dédié face au compte pro, et les offres comparées.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Avant le compte, les chiffres"
        intro="Le bon compte dépend de ton chiffre d'affaires et de ton statut. Trois outils pour les poser."
        liens={[
          { href: "/simulateurs/auto-entrepreneur", label: "Ton revenu net en micro", desc: "Cotisations, ACRE, versement libératoire", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/plafonds-micro-entreprise-2027", label: "Les plafonds 2027", desc: "Chiffre d'affaires et franchise de TVA", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/comparateurs/banques-pro", label: "Le comparatif complet", desc: "Toutes les offres d'entrée, ligne à ligne", icon: <ScaleIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="obligatoire" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Le compte bancaire est-il obligatoire ?
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: "Non", t: "Compte professionnel", d: "Aucun texte n'impose un compte « pro » à un micro-entrepreneur, quel que soit son chiffre d'affaires." },
            { v: `> ${EUR.format(SEUIL_CA)}`, t: "Compte dédié obligatoire", d: "Si le chiffre d'affaires dépasse ce seuil pendant deux années consécutives. Le compte peut être personnel ou professionnel." },
            { v: "Toujours", t: "Activité commerciale", d: "Pour une activité commerciale, le compte dédié est obligatoire, que le seuil soit dépassé ou non." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La règle vient de la loi Pacte de 2019 et figure à l&apos;article
            L613-10 du Code de la sécurité sociale. Service-Public la résume
            ainsi : l&apos;ouverture d&apos;un compte bancaire professionnel
            n&apos;est pas obligatoire en micro-entreprise, mais il est
            obligatoire d&apos;avoir <strong>un compte dédié à l&apos;activité
            professionnelle</strong> si le chiffre d&apos;affaires annuel
            dépasse {EUR.format(SEUIL_CA)}{" "}durant deux années consécutives.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Deux précisions changent la lecture. D&apos;abord, le seuil
            s&apos;apprécie sur deux années de suite : une seule année
            au-dessus ne déclenche rien. Ensuite, les activités commerciales
            (achat-revente, par exemple) relèvent d&apos;une règle plus
            stricte du Code de commerce : le compte dédié est obligatoire dès
            le départ, sans condition de chiffre d&apos;affaires.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Sous le seuil, rien n&apos;est imposé, mais Service-Public
            recommande d&apos;ouvrir un compte dédié malgré tout, pour éviter
            de mélanger dépenses personnelles et professionnelles. C&apos;est
            aussi ce qui rend le suivi du chiffre d&apos;affaires simple le
            jour d&apos;une déclaration ou d&apos;un contrôle.
          </p>
        </div>
      </section>

      <section id="perso-ou-pro" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Compte personnel dédié ou compte professionnel
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          « Dédié » ne veut pas dire « professionnel ». La loi demande un
          compte séparé de celui de la vie privée ; elle ne dit pas lequel.
          Les deux options existent, avec des contraintes différentes.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4">Second compte courant personnel</th>
                <th className="px-5 py-4">Compte professionnel</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Conforme à la loi", "Oui, s'il est réservé à l'activité", "Oui"],
                ["Mention « EI »", "Exigée en pratique, ce qui complique l'ouverture", "Prévue d'origine"],
                ["Tolérance de la banque", "Certaines banques limitent l'usage professionnel d'un compte personnel", "Conçu pour cet usage"],
                ["Outils", "Aucun outil de gestion", "Facturation, suivi, export comptable selon l'offre"],
                ["Coût", "Souvent gratuit en banque en ligne", `De 0 à ${EUR.format(Math.max(...payantes.map((b) => b.prixMensuelHT as number)))} HT par mois en offre d'entrée`],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{a}</td>
                  <td className="px-5 py-3 text-foreground/80">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Avant d&apos;utiliser un compte courant personnel pour votre
            activité, lisez les conditions générales de la banque : beaucoup
            réservent leurs comptes particuliers à un usage privé et peuvent
            clôturer un compte utilisé à titre professionnel. C&apos;est ce
            point, plus que la loi, qui pousse vers un compte professionnel.
          </p>
        </div>
      </section>

      <section id="prix" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Ce que coûte un compte pro : les offres d&apos;entrée
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Voici les offres d&apos;entrée des comptes professionnels en ligne
          ouverts aux micro-entrepreneurs, triées par prix. Ce sont les mêmes
          données que notre{" "}
          <Link href="/comparateurs/banques-pro" className="text-primary underline-offset-4 hover:underline">comparateur des banques pro</Link>
          , qui détaille aussi les paliers supérieurs.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Compte</th>
                <th className="px-5 py-4 text-right">Prix mensuel HT</th>
                <th className="px-5 py-4 text-right">Sur un an</th>
                <th className="px-5 py-4">Virements inclus</th>
                <th className="px-5 py-4">Carte</th>
              </tr>
            </thead>
            <tbody>
              {offres.map((b) => (
                <tr key={b.slug} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">
                    {b.nom}
                    <span className="block text-xs font-normal text-muted-foreground">offre {b.offreEntree}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right text-lg font-bold tabular-nums">
                    {b.prixMensuelHT === 0 ? <span className="text-accent">Gratuit</span> : EUR.format(b.prixMensuelHT as number)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums text-muted-foreground">{EUR.format((b.prixMensuelHT as number) * 12)}</td>
                  <td className="px-5 py-3 text-foreground/80">{b.virementsInclus}</td>
                  <td className="px-5 py-3 text-foreground/80">{b.cartePhysique}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Tarifs HT des offres d&apos;entrée relevés le {dateReleve}{" "}sur les
          grilles officielles ; ceux de Shine et de Qonto ont été relus le 25
          novembre 2026. Les prix affichés par les banques supposent parfois
          un engagement annuel, et des promotions temporaires peuvent
          s&apos;y ajouter. Vérifiez la grille officielle avant d&apos;ouvrir.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {offres.filter((b) => b.lienPartenaire).map((b) => (
            <div key={b.slug} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lien partenaire</p>
              <p className="mt-2 text-lg font-bold text-foreground">{b.nom} · {b.offreEntree}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{b.specificite}.</p>
              <a
                href={b.lienPartenaire as string}
                target="_blank"
                rel="sponsored noopener noreferrer"
                data-partenaire={b.nom}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
              >
                Ouvrir un compte {b.nom}
                <span aria-hidden>↗</span>
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                Salairia peut être rémunéré si vous ouvrez un compte, sans surcoût pour vous.
                {b.offrePartenaire ? ` ${b.offrePartenaire}.` : ""}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Les deux encadrés ci-dessus sont des liens partenaires. Le tableau,
          lui, est trié par prix et comprend aussi les banques sans
          partenariat : la rémunération ne change ni l&apos;ordre ni les
          chiffres.
        </p>
      </section>

      <section id="choisir" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Lequel choisir selon votre activité
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Vous démarrez, peu d&apos;opérations</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Quelques factures par mois, des clients qui paient par virement.
              Une offre gratuite suffit. Regardez le nombre de virements
              inclus : c&apos;est la première limite que vous atteindrez.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Activité régulière</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Des dizaines d&apos;opérations par mois, des abonnements, une
              carte utilisée souvent. Une offre payante à{" "}
              {EUR.format(prixPayantMin)}{" "}HT par mois, soit{" "}
              {EUR.format(prixPayantMin * 12)}{" "}par an, coûte moins que les
              frais à l&apos;opération d&apos;une offre gratuite dépassée.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Commerce, espèces, chèques</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Le compte dédié est obligatoire dès le départ. Vérifiez avant
              tout le dépôt d&apos;espèces et de chèques : beaucoup de comptes
              en ligne le facturent ou ne le proposent pas. Une banque à
              agences peut rester le bon choix.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Trois questions tranchent presque toujours : combien de virements
          émettez-vous par mois, encaissez-vous des chèques ou des espèces, et
          avez-vous besoin d&apos;outils de facturation intégrés ? Le prix
          mensuel vient après. Et si vous approchez des plafonds de la
          micro-entreprise, anticipez : le passage en société impose un compte
          au nom de la société, et changer de banque à ce moment-là est une
          démarche de plus. Notre{" "}
          <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">simulateur TJM</Link>{" "}
          compare les statuts sur vos chiffres.
        </p>
      </section>

      <section id="refus" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ouverture, pièces à fournir et refus
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les pièces demandées sont en général les mêmes pour un compte
            personnel dédié et pour un compte professionnel : un justificatif
            d&apos;identité (carte d&apos;identité, passeport ou titre de
            séjour) et un justificatif de domiciliation de la micro-entreprise
            de moins de trois mois. Certaines banques demandent en plus le
            numéro Siren ou un prévisionnel d&apos;activité, surtout pour un
            compte professionnel.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Si la banque refuse, elle doit vous remettre une attestation de
            refus. Ce document permet de saisir la Banque de France, qui
            désigne un établissement tenu de vous ouvrir un compte avec les
            services de base : tenue de compte, encaissements, virements,
            carte de paiement. C&apos;est le <strong>droit au compte</strong>,
            prévu par le Code monétaire et financier. Un refus ne vous laisse
            donc jamais sans solution.
          </p>
        </div>
      </section>

      <GuideCta
        titre="Tu passes bientôt en société ?"
        intro="Au-delà des plafonds de la micro-entreprise, le compte, la comptabilité et le statut changent ensemble."
        accent
        liens={[
          { href: "/simulateurs/sasu-eurl", label: "SASU ou EURL ?", desc: "Les deux statuts sur les mêmes chiffres", icon: <ScaleIcon className="h-4 w-4" /> },
          { href: "/guides/expert-comptable-sasu-prix", label: "Le prix d'un expert-comptable", desc: "Et ce qu'il retire vraiment de ton net", icon: <ReceiptIcon className="h-4 w-4" /> },
          { href: "/comparateurs/portage-salarial", label: "Le portage salarial", desc: "Sans compte pro ni comptabilité, 10 sociétés", icon: <CompassIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
