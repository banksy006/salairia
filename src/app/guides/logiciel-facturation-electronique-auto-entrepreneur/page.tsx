import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import { IconBadge, InfoIcon, ScaleIcon, ReceiptIcon, CompassIcon, AlertTriangleIcon, CalendarIcon, CalculatorIcon, TargetIcon } from "@/components/icons";

// Tarifs et mentions relevés le 25 novembre 2026 sur la page tarifs publique de
// chaque éditeur (URL dans `source`). Prix HORS promotion : plusieurs éditeurs
// affichaient ce jour-là des remises temporaires (Black Friday), non retenues.
// `statut` reprend la formule de l'éditeur lui-même : seule la liste publiée
// par l'administration fiscale fait foi.
interface Outil {
  nom: string;
  gratuit: string | null;
  payant: string;
  prixPayantMensuelHT: number | null;
  statut: string;
  plateforme: "agréée" | "via partenaire" | "non précisé";
  aSavoir: string;
  source: string;
  lienPartenaire?: string;
}

const OUTILS: Outil[] = [
  {
    nom: "Tiime",
    gratuit: "Offre Free : factures et devis illimités",
    payant: "Initial, 9,99 € HT/mois facturé à l'année",
    prixPayantMensuelHT: 9.99,
    statut: "« Tiime est immatriculé plateforme agréée par la DGFIP »",
    plateforme: "agréée",
    aSavoir: "L'offre gratuite suppose de s'inscrire à la plateforme agréée de Tiime. Tarif réduit sur les douze premiers mois lors de notre relevé.",
    source: "https://www.tiime.fr/tarifs",
    // Lien tracké Affilae, partenariat Tiime accepté (novembre 2026).
    lienPartenaire:
      "https://lb.affilae.com/r/?p=651c0d1e40e2d575f87b3b27&af=1252&lp=https%3A%2F%2Fwww.tiime.fr%2Ffacturation-electronique-2026%3Futm_source%3Dother%26utm_medium%3Daffiliation%26utm_campaign%3DSalairia%26ae%3D1252%26program_id%3D651c0d1e40e2d575f87b3b27%26program_name%3DTiime",
  },
  {
    nom: "Indy",
    gratuit: "Offre Essentiel : devis et factures illimités, facturation électronique incluse",
    payant: "Plus, 9 € HT/mois à l'année (12 € au mois)",
    prixPayantMensuelHT: 9,
    statut: "« Indy est une Plateforme Agréée immatriculée par la DGFiP »",
    plateforme: "agréée",
    aSavoir: "Les offres supérieures ajoutent la comptabilité et les déclarations ; leurs prix variaient d'un bloc à l'autre de la page lors de notre relevé.",
    source: "https://www.indy.fr/tarifs/",
  },
  {
    nom: "Qonto Facturation",
    gratuit: "Outil de facturation gratuit : devis et factures illimités",
    payant: "Compte pro à partir de 9 € HT/mois",
    prixPayantMensuelHT: 9,
    statut: "« Qonto est une Plateforme Agréée par l'État »",
    plateforme: "agréée",
    aSavoir: "La facturation est utilisable sans le compte pro ; le compte pro, lui, est payant.",
    source: "https://qonto.com/fr/invoicing",
    // Lien tracké Affilae, partenariat Qonto France accepté.
    lienPartenaire:
      "https://lb.affilae.com/r/?p=5ce4f2a2b6302009e29d84f3&af=3483&lp=https%3A%2F%2Fqonto.com%2Ffr%3Futm_medium%3Daffilaefr%26utm_source%3Daffiliate%26utm_campaign%3Dsalairia",
  },
  {
    nom: "Abby",
    gratuit: "Offre Basique : devis et factures illimités, clients illimités",
    payant: "Start, 9 € HT/mois",
    prixPayantMensuelHT: 9,
    statut: "« Plateforme Agréée conforme à la réforme 2026 »",
    plateforme: "agréée",
    aSavoir: "Remises temporaires affichées sur tous les abonnements lors de notre relevé ; le mode de facturation du prix affiché (mensuel ou annuel) n'était pas précisé.",
    source: "https://abby.fr/tarifs",
  },
  {
    nom: "Henrri",
    gratuit: "Offre Pro : devis, clients et factures électroniques illimités",
    payant: "Expert, 5 € HT/mois à l'année",
    prixPayantMensuelHT: 5,
    statut: "« 100% conforme E-facture via une Plateforme Agréée partenaire »",
    plateforme: "via partenaire",
    aSavoir: "Henrri n'est pas lui-même plateforme agréée : il passe par une plateforme partenaire. Paiement en ligne facturé 1,2 % + 0,15 € par transaction.",
    source: "https://www.henrri.com/tarifs/",
  },
  {
    nom: "Pennylane",
    gratuit: null,
    payant: "Starter, 7 € HT/mois (compte pro Pennylane requis)",
    prixPayantMensuelHT: 7,
    statut: "« PA immatriculée »",
    plateforme: "agréée",
    aSavoir: "Pas d'offre gratuite, 15 jours d'essai. Jusqu'à 1 200 factures par an. Pensé pour les sociétés plus que pour la micro-entreprise.",
    source: "https://www.pennylane.com/fr/tarifs",
  },
  {
    nom: "Freebe",
    gratuit: null,
    payant: "Tarif unique, 12,50 €/mois (150 € TTC par an)",
    prixPayantMensuelHT: null,
    statut: "« Conformes à la facturation électronique 2026 »",
    plateforme: "non précisé",
    aSavoir: "Pas d'offre gratuite, 30 jours d'essai. La page tarifs ne dit pas si l'outil est plateforme agréée ou raccordé à l'une d'elles : à demander avant de s'abonner.",
    source: "https://www.freebe.me/tarifs",
  },
];

const gratuits = OUTILS.filter((o) => o.gratuit);
const agrees = OUTILS.filter((o) => o.plateforme === "agréée");
const partenaires = OUTILS.filter((o) => o.lienPartenaire);
const DATE_RELEVE = "25 novembre 2026";
const LISTE_OFFICIELLE = "https://www.impots.gouv.fr/liste-des-plateformes-de-dematerialisation-partenaires-pdp-immatriculees-sous-reserve";

const meta: GuideMeta = {
  slug: "logiciel-facturation-electronique-auto-entrepreneur",
  titre: "Logiciel de facturation électronique pour auto-entrepreneur : comparatif 2027",
  sousTitre: `${OUTILS.length} outils comparés, dont ${gratuits.length} avec une offre gratuite : prix, limites et statut de plateforme agréée`,
  chapo: `Depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques, et les micro-entreprises devront en émettre à partir du 1er septembre 2027. Un PDF envoyé par e-mail ne suffira plus : la facture doit passer par une plateforme agréée par l'administration fiscale. Bonne nouvelle pour un auto-entrepreneur, ${gratuits.length} des ${OUTILS.length} outils que nous avons relevés proposent une offre gratuite qui couvre l'essentiel. Voici ce que la réforme vous impose réellement, le tableau des prix relevés le ${DATE_RELEVE}, et les questions à poser avant de choisir.`,
  filAriane: "Logiciel de facturation électronique",
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  tocItems: [
    { id: "obligation", label: "Ce que la réforme impose" },
    { id: "comparatif", label: "Le comparatif" },
    { id: "agreee", label: "Plateforme agréée ou non" },
    { id: "choisir", label: "Comment choisir" },
  ],
  faq: [
    {
      q: "Un auto-entrepreneur est-il concerné par la facturation électronique ?",
      r: "Oui, pour ses échanges avec d'autres professionnels établis en France. Selon Service-Public, l'obligation de recevoir des factures électroniques s'applique à l'ensemble des entreprises depuis le 1er septembre 2026, et l'obligation d'en émettre s'appliquera aux PME et aux micro-entreprises le 1er septembre 2027. Les ventes et prestations aux particuliers relèvent d'un régime distinct de transmission de données.",
    },
    {
      q: "Existe-t-il un logiciel de facturation électronique gratuit ?",
      r: `Oui. Au ${DATE_RELEVE}, ${gratuits.map((o) => o.nom).join(", ")} affichaient une offre gratuite avec devis et factures illimités. Les offres payantes ajoutent surtout le rapprochement bancaire, la comptabilité ou les déclarations. Vérifiez les limites de l'offre gratuite sur la page tarifs de l'éditeur avant de vous engager.`,
    },
    {
      q: "Qu'est-ce qu'une plateforme agréée ?",
      r: "D'après l'administration fiscale, une plateforme agréée est une plateforme immatriculée par elle, par laquelle transitent les factures électroniques et les données de transaction et de paiement. Certains logiciels sont eux-mêmes plateforme agréée ; d'autres s'appuient sur une plateforme partenaire. Dans les deux cas, vos factures doivent passer par une plateforme figurant sur la liste officielle.",
    },
    {
      q: "Un PDF envoyé par e-mail est-il une facture électronique ?",
      r: "Non. Au sens de la réforme, une facture électronique est émise, transmise et reçue dans un format structuré, via une plateforme agréée. Un PDF simple envoyé par e-mail n'en est pas une pour les échanges entre professionnels concernés.",
    },
    {
      q: "Faut-il changer de logiciel avant septembre 2027 ?",
      r: "Pas nécessairement. Si votre outil actuel est plateforme agréée ou raccordé à l'une d'elles, vous n'avez rien à changer. Sinon, vous avez jusqu'au 1er septembre 2027 pour émettre vos factures au bon format. Mieux vaut choisir sans urgence, et tester l'outil sur quelques factures avant l'échéance.",
    },
  ],
  sources: [
    { label: "Service-Public Entreprendre — facturation électronique : calendrier (mis à jour le 27 février 2026)", href: "https://entreprendre.service-public.gouv.fr/actualites/A15683" },
    { label: "impots.gouv.fr — facturation électronique et plateformes agréées", href: "https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees" },
    { label: "impots.gouv.fr — liste officielle des plateformes immatriculées", href: LISTE_OFFICIELLE },
    ...OUTILS.map((o) => ({ label: `${o.nom} — page tarifs (relevée le ${DATE_RELEVE})`, href: o.source })),
  ],
};

export const metadata: Metadata = {
  title: "Logiciel de facturation électronique auto-entrepreneur : comparatif 2027",
  description: `${OUTILS.length} logiciels de facturation électronique comparés pour les auto-entrepreneurs : ${gratuits.length} offres gratuites, prix des offres payantes, statut de plateforme agréée. Ce que la réforme impose en 2026 et 2027, et comment choisir.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Facturation électronique : quel logiciel pour un auto-entrepreneur ?",
    description: "Les offres gratuites et payantes comparées, et ce que la réforme impose vraiment.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Tes chiffres d'abord"
        intro="Le bon outil dépend de ton volume de factures et de ton statut. Trois pages pour les poser."
        liens={[
          { href: "/simulateurs/auto-entrepreneur", label: "Ton revenu net en micro", desc: "Cotisations, ACRE, versement libératoire", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/plafonds-micro-entreprise-2027", label: "Les plafonds 2027", desc: "Chiffre d'affaires et franchise de TVA", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/compte-bancaire-auto-entrepreneur", label: "Le compte bancaire", desc: "Obligatoire ou non, et lequel choisir", icon: <ScaleIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="obligation" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Ce que la réforme vous impose, et quand
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <tbody>
              {[
                ["1er septembre 2026", "Recevoir", "Toutes les entreprises doivent pouvoir recevoir des factures électroniques. Les grandes entreprises et les entreprises de taille intermédiaire doivent aussi en émettre."],
                ["1er septembre 2027", "Émettre", "Les PME et les micro-entreprises doivent émettre leurs factures entre professionnels au format électronique."],
              ].map(([d, k, t]) => (
                <tr key={d} className="border-b border-border align-top last:border-b-0">
                  <td className="w-44 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="w-28 px-5 py-3 font-semibold text-primary">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La réforme concerne les opérations entre entreprises assujetties à
            la TVA et établies en France. La première étape est passée : depuis
            le 1er septembre 2026, vos fournisseurs peuvent vous adresser des
            factures électroniques, et vous devez être en mesure de les
            recevoir. La seconde vous concerne directement comme émetteur :
            à partir du <strong>1er septembre 2027</strong>, vos factures à
            des clients professionnels devront être émises dans un format
            structuré et transiter par une plateforme agréée.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Concrètement, un auto-entrepreneur a besoin de deux choses : un
            moyen de recevoir les factures de ses fournisseurs, et un outil
            capable d&apos;émettre les siennes au bon format. Un logiciel de
            facturation raccordé à une plateforme agréée couvre les deux. Le
            détail du calendrier et des formats est dans notre{" "}
            <Link href="/actualites/facturation-electronique-1er-septembre-2026" className="text-primary underline-offset-4 hover:underline">
              article sur la réforme
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="comparatif" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Le comparatif : {OUTILS.length} outils, prix relevés le {DATE_RELEVE}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Nous avons relevé les pages tarifs publiques de {OUTILS.length}{" "}
          outils utilisés par les indépendants. Le tableau donne l&apos;offre
          gratuite quand elle existe, la première offre payante, et ce que
          l&apos;éditeur déclare sur son statut de plateforme agréée. Les
          outils avec offre gratuite sont listés en premier.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Outil</th>
                <th className="px-5 py-4">Offre gratuite</th>
                <th className="px-5 py-4">Première offre payante</th>
                <th className="px-5 py-4">Plateforme agréée</th>
              </tr>
            </thead>
            <tbody>
              {OUTILS.map((o) => (
                <tr key={o.nom} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{o.nom}</td>
                  <td className="px-5 py-3 text-foreground/80">
                    {o.gratuit ? <><span className="font-semibold text-accent">Oui.</span> {o.gratuit}</> : "Non"}
                  </td>
                  <td className="px-5 py-3 text-foreground/80">{o.payant}</td>
                  <td className="px-5 py-3 text-foreground/80">
                    {o.plateforme === "agréée" ? "Oui, selon l'éditeur" : o.plateforme === "via partenaire" ? "Via une plateforme partenaire" : "Non précisé"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Prix hors promotion, relevés le {DATE_RELEVE}{" "}sur les pages tarifs
          publiques citées en source. Plusieurs éditeurs affichaient ce jour-là
          des remises temporaires, que nous n&apos;avons pas retenues. Le
          statut de plateforme agréée est celui que déclare l&apos;éditeur :
          vérifiez-le sur la liste officielle de l&apos;administration fiscale
          avant de vous engager.
        </p>

        <div className="mt-6 space-y-4">
          {OUTILS.map((o) => (
            <div key={o.nom} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-lg font-bold text-foreground">{o.nom}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                Ce que dit l&apos;éditeur : {o.statut}. {o.aSavoir}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
                {o.lienPartenaire && (
                  <a
                    href={o.lienPartenaire}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    data-partenaire={o.nom}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90"
                  >
                    Découvrir {o.nom}
                    <span aria-hidden>↗</span>
                  </a>
                )}
                <a
                  href={o.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-partenaire={o.nom}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Page tarifs officielle
                  <span aria-hidden>↗</span>
                </a>
              </div>
              {o.lienPartenaire && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Lien partenaire : Salairia peut être rémunéré si vous souscrivez, sans surcoût pour vous.
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {partenaires.map((o) => o.nom).join(" et ")} sont des partenaires de
          Salairia et leurs boutons sont signalés comme tels. L&apos;ordre du
          tableau ne dépend pas de ces partenariats : il suit l&apos;existence
          d&apos;une offre gratuite, puis le relevé.
        </p>
      </section>

      <section id="agreee" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Plateforme agréée ou simple logiciel : la différence
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;administration fiscale définit une plateforme agréée comme
            une plateforme qu&apos;elle a immatriculée. C&apos;est par elle
            que transitent les factures électroniques, ainsi que les données
            de transaction et de paiement. Tous les logiciels de facturation
            ne sont pas des plateformes agréées, et ce n&apos;est pas un
            problème en soi : un logiciel peut s&apos;appuyer sur une
            plateforme partenaire.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Sur les {OUTILS.length}{" "}outils relevés, {agrees.length}{" "}se
            déclarent eux-mêmes plateforme agréée, un passe par une plateforme
            partenaire, et un ne le précise pas sur sa page tarifs. Dans tous
            les cas, la question à poser est la même : « par quelle plateforme
            agréée mes factures transitent-elles, et figure-t-elle sur la
            liste officielle ? »
          </p>
        </div>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Nous reprenons les déclarations des éditeurs sans les avoir
            vérifiées une à une. La seule référence est la{" "}
            <a href={LISTE_OFFICIELLE} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              liste des plateformes immatriculées
            </a>{" "}
            publiée par l&apos;administration fiscale. Consultez-la avant de
            vous abonner. Informations indicatives, relevées à une date
            donnée.
          </p>
        </div>
      </section>

      <section id="choisir" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Comment choisir
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Quelques factures par mois</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Une offre gratuite suffit largement. Les {gratuits.length}{" "}
              offres gratuites relevées annoncent toutes des devis et factures
              illimités. Choisissez sur l&apos;ergonomie et sur le statut de
              la plateforme, pas sur le prix.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Vous voulez tout au même endroit</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Facturation, compte bancaire et suivi des encaissements dans un
              seul outil : c&apos;est le sens des offres payantes, autour de
              9 € HT par mois. Le gain est le temps de rapprochement, pas la
              conformité, que l&apos;offre gratuite assure déjà.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Vous avez un comptable</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Demandez-lui d&apos;abord quel outil il utilise : beaucoup de
              cabinets fournissent un accès à leur propre plateforme. Prendre
              le même évite une double saisie et des exports manuels.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base font-semibold text-foreground">Quatre questions avant de s&apos;abonner</p>
          <ul className="mt-3 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3"><span aria-hidden className="text-primary">1.</span><span>L&apos;outil est-il plateforme agréée, ou par quelle plateforme passe-t-il ?</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">2.</span><span>L&apos;offre gratuite couvre-t-elle la réception <strong>et</strong> l&apos;émission des factures électroniques, sans limite de volume ?</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">3.</span><span>Puis-je exporter mes factures et mes données si je change d&apos;outil ?</span></li>
            <li className="flex gap-3"><span aria-hidden className="text-primary">4.</span><span>Le prix affiché est-il mensuel ou annuel, et que devient-il après la période promotionnelle ?</span></li>
          </ul>
        </div>
      </section>

      <GuideCta
        titre="Et le reste de ton activité ?"
        intro="La facturation n'est qu'une pièce. Le statut et le compte bancaire pèsent davantage sur ton revenu."
        accent
        liens={[
          { href: "/simulateurs/tjm-freelance", label: "Comparer les statuts", desc: "Micro, portage, SASU, EURL sur tes chiffres", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/comparateurs/banques-pro", label: "Les comptes pro", desc: "Offres d'entrée, ligne à ligne", icon: <ScaleIcon className="h-4 w-4" /> },
          { href: "/guides/expert-comptable-sasu-prix", label: "Le prix d'un expert-comptable", desc: "Si tu passes en société", icon: <ReceiptIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
