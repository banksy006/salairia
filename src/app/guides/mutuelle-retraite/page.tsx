import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import { IconBadge, InfoIcon, ScaleIcon, ReceiptIcon, ShieldIcon, AlertTriangleIcon, CalculatorIcon, TargetIcon, CompassIcon, CalendarIcon, CoinIcon } from "@/components/icons";

// Maintien de la mutuelle d'entreprise au départ à la retraite (art. 4 de la
// loi n° 89-1009 du 31 décembre 1989, dite loi Évin). Source : Service-Public,
// fiche F20744, vérifiée le 26 novembre 2025, lue le 25 novembre 2026.
const EVIN = {
  DELAI_DEMANDE_MOIS: 6,
  DELAI_PROPOSITION_MOIS: 2,
  // Majoration maximale par rapport au tarif global des salariés actifs.
  PLAFONDS: [0, 0.25, 0.5],
} as const;

// Complémentaire santé solidaire, barème du 1er avril 2026, métropole.
// Source : Direction de la sécurité sociale, « Plafonds d'attribution de la
// complémentaire santé solidaire au 1er avril 2026 » (PDF), et Service-Public
// fiche F10027, vérifiée le 1er juillet 2026.
const C2S = {
  SEUL_GRATUIT: 10_421,
  SEUL_PAYANT: 14_069,
  COUPLE_GRATUIT: 15_632,
  COUPLE_PAYANT: 21_103,
  PARTICIPATION_60_69: 25,
  PARTICIPATION_70_PLUS: 30,
} as const;

// Prime mensuelle moyenne d'un contrat individuel, pour un assuré de
// référence, selon l'âge. Source : DREES, enquête auprès des organismes
// complémentaires, année 2023 (jeu de données « enquete-oc-depuis-2019 »,
// thème Primes, famille « Ensemble »), lu le 25 novembre 2026.
const PRIMES_DREES = [
  { age: 60, prime: 93.97 },
  { age: 65, prime: 100.37 },
  { age: 75, prime: 122.59 },
  { age: 85, prime: 140.09 },
] as const;

// Mutualité française, communiqué du 16 décembre 2025 : hausse moyenne des
// cotisations des mutuelles en 2026.
const HAUSSE_2026_INDIVIDUEL = 4.3;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const mensuel = (annuel: number) => Math.floor(annuel / 12);

// Exemple d'application du plafonnement : l'hypothèse (tarif global des
// actifs) est choisie pour l'illustration, les trois montants sont calculés.
const EXEMPLE_TARIF_ACTIFS = 80;
const exempleEvin = EVIN.PLAFONDS.map((p) => EXEMPLE_TARIF_ACTIFS * (1 + p));

const prime60 = PRIMES_DREES[0].prime;
const prime85 = PRIMES_DREES[3].prime;
const c2sAn70 = C2S.PARTICIPATION_70_PLUS * 12;

const meta: GuideMeta = {
  slug: "mutuelle-retraite",
  titre: "Mutuelle à la retraite 2027 : garder celle de l'entreprise, C2S ou contrat individuel",
  sousTitre: `Six mois pour demander le maintien du contrat d'entreprise, ${EUR.format(C2S.PARTICIPATION_70_PLUS)} par mois au plus avec la complémentaire santé solidaire`,
  chapo: `Le jour du départ à la retraite, la mutuelle d'entreprise s'arrête et la part payée par l'employeur disparaît avec elle. Trois solutions existent. La loi Évin permet de conserver le contrat de l'entreprise, à un tarif plafonné pendant trois ans, à condition de le demander dans les ${EVIN.DELAI_DEMANDE_MOIS} mois. La complémentaire santé solidaire couvre les retraités aux revenus modestes, gratuitement ou pour ${EUR.format(C2S.PARTICIPATION_60_69)} à ${EUR.format(C2S.PARTICIPATION_70_PLUS)} par mois selon l'âge. Reste le contrat individuel, dont la prime moyenne passe de ${EUR2.format(prime60)} par mois à 60 ans à ${EUR2.format(prime85)} à 85 ans selon la DREES. Ce guide donne les règles, les plafonds en vigueur et l'ordre dans lequel examiner ces trois options.`,
  filAriane: "Mutuelle à la retraite",
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  tocItems: [
    { id: "trois-options", label: "Les trois options" },
    { id: "loi-evin", label: "Garder la mutuelle d'entreprise" },
    { id: "c2s", label: "La complémentaire santé solidaire" },
    { id: "prix", label: "Le prix d'un contrat individuel" },
    { id: "choisir", label: "Dans quel ordre décider" },
  ],
  faq: [
    {
      q: "Peut-on garder la mutuelle de son entreprise quand on part à la retraite ?",
      r: `Oui. L'organisme assureur doit vous adresser une proposition de maintien des garanties à titre individuel au plus tard ${EVIN.DELAI_PROPOSITION_MOIS} mois après la fin de votre contrat de travail, et vous avez ${EVIN.DELAI_DEMANDE_MOIS} mois après cette fin de contrat pour l'accepter. Le maintien n'est pas limité dans le temps. Il porte sur les frais de santé, pas sur la prévoyance.`,
    },
    {
      q: "Combien coûte la mutuelle d'entreprise une fois à la retraite ?",
      r: "Le tarif est plafonné pendant trois ans par rapport au tarif global des salariés actifs, part patronale et part salariale réunies : il est égal à ce tarif la première année, supérieur de 25 % au maximum la deuxième, de 50 % au maximum la troisième. À partir de la quatrième année, l'organisme fixe librement la cotisation. Comme l'employeur ne participe plus, la somme que vous payez augmente dès la première année, même à tarif égal.",
    },
    {
      q: "Quel est le plafond de ressources de la complémentaire santé solidaire pour un retraité ?",
      r: `Depuis le 1er avril 2026, en métropole, une personne seule y a droit sans participation jusqu'à ${EUR.format(C2S.SEUL_GRATUIT)} de ressources annuelles, et avec participation jusqu'à ${EUR.format(C2S.SEUL_PAYANT)}. Pour deux personnes, les plafonds sont de ${EUR.format(C2S.COUPLE_GRATUIT)} et ${EUR.format(C2S.COUPLE_PAYANT)}. La participation est de ${EUR.format(C2S.PARTICIPATION_60_69)} par mois de 60 à 69 ans et de ${EUR.format(C2S.PARTICIPATION_70_PLUS)} par mois à partir de 70 ans.`,
    },
    {
      q: "Le bénéficiaire de l'ASPA a-t-il droit à la complémentaire santé solidaire ?",
      r: "Il n'y a pas d'attribution automatique, mais un accès facilité à la complémentaire santé solidaire avec participation, pour l'allocataire et son conjoint, à condition de ne pas avoir travaillé au cours des trois mois précédant la demande. Le renouvellement est ensuite automatique.",
    },
    {
      q: "Peut-on changer de mutuelle en cours d'année ?",
      r: "Oui. Un contrat de complémentaire santé souscrit à titre individuel peut être résilié librement, à tout moment, après un an d'engagement. Vous n'avez donc pas à attendre la date anniversaire pour changer de contrat une fois la première année écoulée.",
    },
    {
      q: "La portabilité de la mutuelle s'applique-t-elle au départ à la retraite ?",
      r: "Non. La portabilité, qui maintient gratuitement la couverture pendant douze mois au plus, est réservée aux fins de contrat qui ouvrent droit à l'assurance chômage. Le départ à la retraite relève d'un autre dispositif, le maintien à titre individuel et payant prévu par la loi Évin.",
    },
  ],
  sources: [
    { label: "Service-Public — mutuelle d'entreprise : que se passe-t-il à la fin du contrat de travail ? (fiche F20744, vérifiée le 26 novembre 2025)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F20744" },
    { label: "Service-Public — complémentaire santé solidaire (fiche F10027, vérifiée le 1er juillet 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10027" },
    { label: "Direction de la sécurité sociale — plafonds d'attribution et participations de la complémentaire santé solidaire au 1er avril 2026 (PDF)", href: "https://www.complementaire-sante-solidaire.gouv.fr/sites/default/files/2026-05/2026%20Plafonds%20&%20forfaits%20logement%20&%20cotisations%20C2S.pdf" },
    { label: "Service-Public — complémentaire santé : contrat responsable, résiliation (fiche F20314, vérifiée le 1er octobre 2026)", href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F20314" },
    { label: "DREES — enquête auprès des organismes complémentaires, primes selon l'âge (données 2023)", href: "https://data.drees.solidarites-sante.gouv.fr/explore/dataset/enquete-oc-depuis-2019/information/" },
    { label: "Mutualité française — communiqué du 16 décembre 2025 sur les cotisations 2026", href: "https://www.mutualite.fr/communiques-de-presse/depenses-de-sante-en-hausse-constante-et-nouvelle-taxe-des-contraintes-fortes-pour-les-mutuelles-et-leurs-adherents/" },
    { label: "Sénat — rapport n° 144 (2026-2027) sur le PLFSS 2027, article 12 (contribution des organismes complémentaires)", href: "https://www.senat.fr/rap/l26-144-2/l26-144-2_mono.html" },
  ],
};

export const metadata: Metadata = {
  title: "Mutuelle à la retraite 2027 : loi Évin, C2S, prix selon l'âge",
  description: `Garder la mutuelle d'entreprise (tarif plafonné 3 ans, à demander sous ${EVIN.DELAI_DEMANDE_MOIS} mois), complémentaire santé solidaire jusqu'à ${EUR.format(C2S.SEUL_PAYANT)} de ressources pour une personne seule, ou contrat individuel : ${EUR2.format(prime60)} par mois en moyenne à 60 ans, ${EUR2.format(prime85)} à 85 ans.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Mutuelle à la retraite : les trois options et leur prix",
    description: "Loi Évin, complémentaire santé solidaire, contrat individuel : les règles et les plafonds en vigueur.",
    url: `/guides/${meta.slug}`,
  },
};

const card = "rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8";
const para = "text-base leading-relaxed text-foreground/80";
const h2 = "flex items-center text-2xl font-bold text-foreground sm:text-3xl";

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <GuideCta
        titre="Ta pension, chiffres en main"
        intro="Le bon choix de mutuelle dépend d'abord de ce que tu touches vraiment. Trois pages pour le savoir."
        liens={[
          { href: "/guides/retraite-brut-net", label: "Ta retraite nette", desc: "CSG, CRDS, Casa : du brut au net", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/guides/revalorisation-retraites-2027", label: "La hausse de 2027", desc: "Taux de revalorisation et pensions concernées", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/calendrier-paiement-retraite-2027", label: "Les dates de versement", desc: "Base et complémentaire, mois par mois", icon: <CalendarIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="trois-options" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Trois options le jour du départ
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: `${EVIN.DELAI_DEMANDE_MOIS} mois`, t: "Garder le contrat d'entreprise", d: "Délai pour accepter la proposition de maintien de l'assureur. Tarif plafonné pendant trois ans, sans limite de durée ensuite." },
            { v: `${EUR.format(C2S.SEUL_PAYANT)} / an`, t: "Complémentaire santé solidaire", d: `Plafond de ressources pour une personne seule, avec participation. Gratuite jusqu'à ${EUR.format(C2S.SEUL_GRATUIT)}.` },
            { v: `${EUR2.format(prime60)} / mois`, t: "Contrat individuel", d: `Prime moyenne à 60 ans selon la DREES (données 2023). ${EUR2.format(prime85)} à 85 ans.` },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            Tant que vous êtes salarié, votre employeur paie au moins la
            moitié de la cotisation de la mutuelle d&apos;entreprise. À la
            retraite, cette participation s&apos;arrête : quelle que soit la
            solution retenue, vous payez seul. C&apos;est la raison pour
            laquelle la complémentaire santé devient, pour beaucoup de
            retraités, l&apos;une des premières lignes du budget.
          </p>
          <p className={`mt-4 ${para}`}>
            Aucune de ces trois options n&apos;est obligatoire : la
            complémentaire santé est facultative pour un retraité. Mais sans
            elle, le ticket modérateur, le forfait hospitalier et les
            dépassements restent à votre charge. Et une confusion est
            fréquente : la <strong>portabilité</strong>, qui prolonge
            gratuitement la couverture pendant douze mois, ne concerne que
            les fins de contrat ouvrant droit au chômage. Elle ne
            s&apos;applique pas à un départ à la retraite.
          </p>
        </div>
      </section>

      <section id="loi-evin" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Garder la mutuelle de l&apos;entreprise : la loi Évin
        </h2>
        <div className={`mt-6 ${card}`}>
          <p className={para}>
            L&apos;article 4 de la loi du 31 décembre 1989, dite loi Évin,
            donne à l&apos;ancien salarié qui part à la retraite le droit de
            conserver les garanties santé du contrat collectif, à titre
            individuel et payant. Le calendrier est précis :
            l&apos;organisme assureur doit vous envoyer une proposition de
            maintien <strong>au plus tard {EVIN.DELAI_PROPOSITION_MOIS} mois
            après la fin du contrat de travail</strong>, et vous devez la
            demander <strong>au plus tard {EVIN.DELAI_DEMANDE_MOIS} mois
            après cette date</strong>. Passé ce délai, le droit est perdu.
          </p>
          <p className={`mt-4 ${para}`}>
            Le maintien n&apos;est pas limité dans le temps. Il ne porte que
            sur les frais de santé, pas sur la prévoyance (incapacité, invalidité, décès).
          </p>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Année après le départ</th>
                <th className="px-5 py-4">Tarif maximum</th>
                <th className="px-5 py-4 text-right">Exemple : tarif global des actifs de {EUR.format(EXEMPLE_TARIF_ACTIFS)}{" "}par mois</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1re année", "Égal au tarif global des salariés actifs"],
                ["2e année", "Supérieur de 25 % au maximum"],
                ["3e année", "Supérieur de 50 % au maximum"],
              ].map(([k, v], i) => (
                <tr key={k} className="border-b border-border">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{v}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-semibold tabular-nums">{EUR.format(exempleEvin[i])}{" "}au plus</td>
                </tr>
              ))}
              <tr>
                <td className="px-5 py-3 font-semibold text-foreground">À partir de la 4e année</td>
                <td className="px-5 py-3 text-foreground/80">Fixé librement par l&apos;organisme</td>
                <td className="px-5 py-3 text-right text-muted-foreground">Pas de plafond</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          L&apos;exemple part d&apos;une hypothèse de tarif choisie pour
          l&apos;illustration ; les montants sont calculés à partir des
          plafonds légaux. Le tarif réel de votre contrat figure dans la
          proposition de l&apos;assureur.
        </p>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Le plafond se calcule sur le <strong>tarif global</strong>, part
            patronale et part salariale réunies. Si le contrat coûte{" "}
            {EUR.format(EXEMPLE_TARIF_ACTIFS)}{" "}par mois et que votre
            employeur en payait la moitié, vous passez de{" "}
            {EUR.format(EXEMPLE_TARIF_ACTIFS / 2)}{" "}à{" "}
            {EUR.format(exempleEvin[0])}{" "}dès la première année, puis
            jusqu&apos;à {EUR.format(exempleEvin[2])}{" "}la troisième. La
            quatrième année, plus rien n&apos;encadre la hausse : c&apos;est
            le moment de comparer.
          </p>
        </div>
      </section>

      <section id="c2s" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><CoinIcon className="w-4 h-4" /></IconBadge>
          La complémentaire santé solidaire, pour les petites pensions
        </h2>
        <p className={`mt-4 max-w-3xl ${para}`}>
          La complémentaire santé solidaire, ou C2S, est une complémentaire
          publique. Elle est gratuite sous un premier plafond de ressources,
          et payante, à un prix fixé par l&apos;État selon l&apos;âge, entre
          ce plafond et le même plafond majoré de 35 %.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Foyer (métropole)</th>
                <th className="px-5 py-4 text-right">Sans participation, jusqu&apos;à</th>
                <th className="px-5 py-4 text-right">Avec participation, jusqu&apos;à</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1 personne", C2S.SEUL_GRATUIT, C2S.SEUL_PAYANT],
                ["2 personnes", C2S.COUPLE_GRATUIT, C2S.COUPLE_PAYANT],
              ].map(([k, a, b]) => (
                <tr key={k as string} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">
                    <span className="font-semibold">{EUR.format(a as number)}{" "}par an</span>
                    <span className="block text-xs text-muted-foreground">soit {EUR.format(mensuel(a as number))}{" "}par mois</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">
                    <span className="font-semibold">{EUR.format(b as number)}{" "}par an</span>
                    <span className="block text-xs text-muted-foreground">soit {EUR.format(mensuel(b as number))}{" "}par mois</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Barème du 1er avril 2026, métropole. Les plafonds sont revalorisés
          chaque 1er avril ; ceux d&apos;outre-mer sont plus élevés.
        </p>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            Avec participation, la C2S coûte{" "}
            <strong>{EUR.format(C2S.PARTICIPATION_60_69)}{" "}par mois de 60 à
            69 ans</strong>{" "}et{" "}
            <strong>{EUR.format(C2S.PARTICIPATION_70_PLUS)}{" "}par mois à
            partir de 70 ans</strong>, par personne. L&apos;âge retenu est
            celui au 1er janvier de l&apos;année d&apos;attribution. À 70 ans
            et plus, cela représente {EUR.format(c2sAn70)}{" "}par an, contre{" "}
            {EUR.format(Math.round(PRIMES_DREES[2].prime * 12))}{" "}pour la
            prime moyenne d&apos;un contrat individuel à 75 ans.
          </p>
          <p className={`mt-4 ${para}`}>
            Les bénéficiaires de l&apos;
            <Link href="/guides/aspa-2027" className="text-primary underline-offset-4 hover:underline">allocation de solidarité aux personnes âgées</Link>
            {" "}n&apos;obtiennent pas la C2S automatiquement, mais ils
            disposent d&apos;un accès facilité à la C2S avec participation,
            pour eux et leur conjoint, à condition de ne pas avoir travaillé
            pendant les trois mois précédant la demande. Le renouvellement
            est ensuite automatique. La demande se fait auprès de votre
            caisse d&apos;assurance maladie.
          </p>
          <p className={`mt-4 ${para}`}>
            Le plafond avec participation,{" "}
            {EUR.format(mensuel(C2S.SEUL_PAYANT))}{" "}par mois pour une
            personne seule, est supérieur au montant du minimum vieillesse :
            une petite pension peut donc y donner droit. Vérifiez votre
            situation avant de signer un contrat individuel.
          </p>
        </div>
      </section>

      <section id="prix" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Ce que coûte un contrat individuel selon l&apos;âge
        </h2>
        <p className={`mt-4 max-w-3xl ${para}`}>
          La DREES, le service statistique du ministère de la Santé,
          interroge chaque année les organismes complémentaires sur leurs
          contrats les plus souscrits. Ses dernières données, qui portent sur
          2023, donnent la prime mensuelle moyenne d&apos;un contrat
          individuel selon l&apos;âge de l&apos;assuré.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[26rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Âge</th>
                <th className="px-5 py-4 text-right">Prime mensuelle moyenne</th>
                <th className="px-5 py-4 text-right">Sur un an</th>
              </tr>
            </thead>
            <tbody>
              {PRIMES_DREES.map((p) => (
                <tr key={p.age} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{p.age} ans</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right text-lg font-bold tabular-nums">{EUR2.format(p.prime)}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums text-muted-foreground">{EUR.format(Math.round(p.prime * 12))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Source : DREES, enquête auprès des organismes complémentaires,
          données 2023, contrats individuels, ensemble des organismes. Ce
          sont des moyennes de 2023 : les tarifs actuels sont plus élevés.
        </p>
        <div className={`mt-4 ${card}`}>
          <p className={para}>
            Entre 60 et 85 ans, la prime moyenne augmente de{" "}
            {Math.round((prime85 / prime60 - 1) * 100)} %. Les contrats
            individuels sont en effet tarifés selon l&apos;âge, ce que ne
            fait pas un contrat collectif d&apos;entreprise. Depuis ces
            relevés, les cotisations ont encore monté : la Mutualité
            française a annoncé une hausse moyenne de{" "}
            {HAUSSE_2026_INDIVIDUEL.toLocaleString("fr-FR")} % des contrats
            individuels des mutuelles pour 2026. Son enquête sur 2027
            n&apos;était pas publiée le 25 novembre 2026 ; elle paraît
            habituellement à la mi-décembre.
          </p>
          <p className={`mt-4 ${para}`}>
            Quel que soit le contrat, vérifiez qu&apos;il est{" "}
            <strong>responsable</strong>{" "}: c&apos;est la condition du
            « 100 % Santé »,
            c&apos;est-à-dire d&apos;équipements sans reste à charge en
            optique, en dentaire et en audiologie, dans la limite des paniers
            prévus. Pour un retraité, les aides auditives et les prothèses
            dentaires sont précisément les postes où cette garantie compte.
          </p>
          <p className={`mt-4 ${para}`}>
            Et rien n&apos;est figé : un contrat individuel peut être
            résilié librement, à tout moment, après un an d&apos;engagement.
            Une hausse de cotisation mal expliquée est une raison suffisante
            pour demander d&apos;autres devis.
          </p>
        </div>
        <div className="mt-4 flex gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Budget 2027 : le projet de loi de financement de la Sécurité
            sociale prévoyait de prolonger en 2027 la contribution
            exceptionnelle des organismes complémentaires, au taux de 2,05 %.
            Le texte n&apos;est pas définitif, et le gel des cotisations
            voté pour 2026 a été déclaré contraire à la Constitution le
            23 octobre 2026. Aucune règle n&apos;encadre donc, à ce jour, les
            hausses de 2027.
          </p>
        </div>
      </section>

      <section id="choisir" className="scroll-mt-24">
        <h2 className={h2}>
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Dans quel ordre décider
        </h2>
        <ol className="mt-6 space-y-4">
          {[
            { t: "Vérifier d'abord le droit à la C2S", d: `Si vos ressources annuelles ne dépassent pas ${EUR.format(C2S.SEUL_PAYANT)} pour une personne seule ou ${EUR.format(C2S.COUPLE_PAYANT)} pour un couple, aucune offre privée ne sera moins chère à garanties comparables. La réponse de la caisse d'assurance maladie tranche la question.` },
            { t: "Demander la proposition de maintien, même sans être décidé", d: `Vous avez ${EVIN.DELAI_DEMANDE_MOIS} mois. La proposition écrite de l'assureur donne le tarif exact des trois premières années : c'est la base de comparaison. Un contrat collectif n'est pas tarifé à l'âge, contrairement à un contrat individuel : l'écart se creuse avec les années.` },
            { t: "Comparer à garanties égales, pas à prix égal", d: "Regardez les postes qui vous concernent : hospitalisation et chambre particulière, dépassements d'honoraires, dentaire, optique, audiologie. Un contrat moins cher qui rembourse mal l'hospitalisation coûte davantage le jour où l'on en a besoin." },
            { t: "Refaire le point à la quatrième année", d: "C'est le moment où le plafonnement de la loi Évin s'arrête. Si la cotisation s'envole, la résiliation à tout moment vous permet de partir sans attendre l'échéance." },
          ].map((e, i) => (
            <li key={e.t} className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-md">
              <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
              <div>
                <p className="font-semibold text-foreground">{e.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{e.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <GuideCta
        accent
        titre="Le reste de ton budget de retraité"
        intro="La mutuelle est une dépense ; voici ce qui bouge du côté des revenus et des autres frais."
        liens={[
          { href: "/guides/aspa-2027", label: "ASPA 2027", desc: "Le minimum vieillesse : montants et plafonds", icon: <CoinIcon className="h-4 w-4" /> },
          { href: "/guides/pension-de-reversion-2027", label: "Pension de réversion", desc: "Plafond de ressources et montants 2027", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/guides/frais-bancaires", label: "Frais bancaires", desc: "Les plafonds légaux et comment payer moins", icon: <ReceiptIcon className="h-4 w-4" /> },
        ]}
      />
    </GuideShell>
  );
}
