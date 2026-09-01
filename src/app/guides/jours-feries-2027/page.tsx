import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, ScaleIcon, LightbulbIcon, InfoIcon } from "@/components/icons";

// Dates légales 2027 (C. trav. L3133-1). Les jours de semaine sont calculés,
// pas saisis — impossible de se tromper de jour.
const FERIES_2027 = [
  { date: "2027-01-01", nom: "Jour de l'an" },
  { date: "2027-03-29", nom: "Lundi de Pâques" },
  { date: "2027-05-01", nom: "Fête du Travail" },
  { date: "2027-05-06", nom: "Ascension" },
  { date: "2027-05-08", nom: "Victoire de 1945" },
  { date: "2027-05-17", nom: "Lundi de Pentecôte" },
  { date: "2027-07-14", nom: "Fête nationale" },
  { date: "2027-08-15", nom: "Assomption" },
  { date: "2027-11-01", nom: "Toussaint" },
  { date: "2027-11-11", nom: "Armistice 1918" },
  { date: "2027-12-25", nom: "Noël" },
] as const;

const fmtJour = new Intl.DateTimeFormat("fr-FR", { weekday: "long", timeZone: "UTC" });
const fmtDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });
const feries = FERIES_2027.map((f) => {
  const d = new Date(`${f.date}T12:00:00Z`);
  const jour = fmtJour.format(d);
  return { ...f, jour, dateFr: fmtDate.format(d), weekend: jour === "samedi" || jour === "dimanche" };
});
const perdus = feries.filter((f) => f.weekend);

const meta: GuideMeta = {
  slug: "jours-feries-2027",
  titre: "Jours fériés 2027 : une année maigre pour les salariés",
  sousTitre: `${perdus.length} fériés sur 11 tombent un week-end — le calendrier complet, les ponts, et vos droits`,
  chapo: `2027 est une mauvaise année pour les salariés : sur les 11 jours fériés légaux, ${perdus.length} tombent un samedi ou un dimanche — ${perdus.map((f) => f.nom).join(", ")} — et sont perdus pour la plupart des contrats. Voici le calendrier complet avec les jours de semaine, les deux vrais ponts à poser, et ce que dit le droit : férié ne veut ni dire chômé, ni dire payé double.`,
  filAriane: "Jours fériés 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "calendrier", label: "Le calendrier 2027" },
    { id: "ponts", label: "Les ponts à poser" },
    { id: "droits", label: "Vos droits" },
    { id: "cas", label: "Les cas particuliers" },
  ],
  faq: [
    {
      q: "Quels jours fériés tombent un week-end en 2027 ?",
      r: `Quatre sur onze : le 1er mai (samedi), le 8 mai (samedi), le 15 août (dimanche) et Noël (samedi). Sauf disposition plus favorable de votre convention collective, un férié qui tombe un jour non travaillé est simplement perdu — aucun rattrapage légal n'est prévu. Certaines conventions (banque, métallurgie dans certains cas) accordent un jour de repos compensateur : c'est le texte de branche qui fait foi, pas le Code du travail.`,
    },
    {
      q: "Un jour férié est-il obligatoirement chômé et payé ?",
      r: "Un seul férié est obligatoirement chômé pour tous les salariés : le 1er mai. Les dix autres peuvent être travaillés si l'employeur le décide (sauf accord collectif contraire), et pour les moins de 18 ans le travail des fériés est interdit. Côté paie : le férié chômé est payé normalement dès trois mois d'ancienneté (mensualisation), sans condition d'ancienneté dans beaucoup de conventions. Le férié travaillé, lui, n'ouvre légalement droit à aucune majoration — sauf le 1er mai, payé double, et sauf convention collective plus généreuse.",
    },
    {
      q: "Quels sont les meilleurs ponts à poser en 2027 ?",
      r: "Deux valent vraiment le coup. L'Ascension, jeudi 6 mai : un seul jour de congé (vendredi 7) donne quatre jours consécutifs — d'autant que le 8 mai tombe le samedi suivant. L'Armistice, jeudi 11 novembre : même mécanique, un jour posé (vendredi 12) pour quatre jours de repos. Les lundis de Pâques (29 mars), de Pentecôte (17 mai) et la Toussaint (lundi 1er novembre) offrent des week-ends de trois jours sans rien poser. Le 14 juillet, mercredi, est le pire cas : il coupe la semaine sans pont raisonnable.",
    },
    {
      q: "Mon employeur peut-il m'imposer de poser un congé pour faire le pont ?",
      r: "Oui. Le pont n'est pas un droit : c'est l'employeur qui fixe l'ordre des départs en congés et il peut soit imposer un jour de congé collectif pour le pont (en respectant un délai de prévenance et après consultation du CSE le cas échéant), soit le refuser. La journée de pont imposée est décomptée des congés payés ou des RTT. À l'inverse, si l'entreprise ferme pour le pont sans imputer de congé, la journée doit être payée.",
    },
    {
      q: "Qu'en est-il de la journée de solidarité et du lundi de Pentecôte ?",
      r: "Depuis 2008, la journée de solidarité (7 heures travaillées non payées en plus, au financement de l'autonomie) n'est plus attachée au lundi de Pentecôte : l'employeur la fixe librement — souvent un RTT supprimé ou un férié travaillé. Beaucoup d'entreprises la positionnent toujours le lundi de Pentecôte (17 mai en 2027), c'est pourquoi ce férié reste travaillé dans une partie des boîtes. Vérifiez votre accord d'entreprise : c'est lui qui dit si votre Pentecôte est chômée, travaillée, ou « offerte ».",
    },
  ],
  sources: [
    { label: "Code du travail, art. L3133-1 — liste des fêtes légales (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020901" },
    { label: "Code du travail, art. L3133-4 à L3133-6 — le 1er mai (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006189689/" },
    { label: "service-public.fr — jours fériés et ponts dans le secteur privé", href: "https://www.service-public.fr/particuliers/vosdroits/F2405" },
    { label: "service-public.fr — journée de solidarité", href: "https://www.service-public.fr/particuliers/vosdroits/F32044" },
  ],
};

export const metadata: Metadata = {
  title: `Jours fériés 2027 : le calendrier complet — ${perdus.length} fériés perdus le week-end`,
  description: `Les 11 jours fériés 2027 avec leur jour de semaine : ${perdus.length} tombent un week-end (1er mai, 8 mai, 15 août, Noël). Les 2 vrais ponts (Ascension 6 mai, Armistice 11 novembre), vos droits — chômé, payé, majoré — et la journée de solidarité.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Jours fériés 2027 : une année maigre pour les salariés",
    description: "Le calendrier complet, les ponts à poser, et ce que dit vraiment le droit.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier 2027, jour par jour
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Fête</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Jour</th>
                <th className="px-5 py-4 text-right">Pour un salarié du lundi au vendredi</th>
              </tr>
            </thead>
            <tbody>
              {feries.map((f) => (
                <tr key={f.date} className={`border-b border-border last:border-b-0 ${f.weekend ? "opacity-60" : ""}`}>
                  <td className="px-5 py-3 font-semibold text-foreground">{f.nom}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-foreground/80">{f.dateFr} 2027</td>
                  <td className="px-5 py-3 capitalize text-foreground/80">{f.jour}</td>
                  <td className="px-5 py-3 text-right">
                    {f.weekend ? (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">perdu (week-end)</span>
                    ) : f.jour === "jeudi" ? (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">pont possible</span>
                    ) : f.jour === "lundi" ? (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">week-end de 3 jours</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">jour isolé</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Bilan pour un temps plein du lundi au vendredi :{" "}
          <strong>{11 - perdus.length} jours réellement chômés</strong> sur 11
          — contre 11 sur 11 dans une année parfaite. L&apos;Alsace-Moselle
          garde ses deux fériés supplémentaires (Vendredi saint, 26 mars, et
          Saint-Étienne, 26 décembre — un vendredi et un dimanche en 2027).
        </p>
      </section>

      <section id="ponts" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><LightbulbIcon className="w-4 h-4" /></IconBadge>
          Les ponts : où placer ses congés en 2027
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="font-semibold text-foreground">🥇 Ascension — jeudi 6 mai</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              <strong>1 jour posé (vendredi 7) = 4 jours de repos</strong>, du
              jeudi 6 au dimanche 9 mai. Le meilleur rendement de
              l&apos;année, dans la quinzaine la plus dense : lundi de Pâques
              le 29 mars, Pentecôte le 17 mai.
            </p>
          </div>
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="font-semibold text-foreground">🥈 Armistice — jeudi 11 novembre</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Même mécanique : <strong>1 jour posé (vendredi 12) = 4 jours</strong>.
              Et dix jours plus tôt, la Toussaint tombe un lundi — deux
              week-ends prolongés dans le même mois sans presque rien poser.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Trois week-ends de trois jours gratuits : lundi de Pâques (29 mars),
          lundi de Pentecôte (17 mai — si votre entreprise ne l&apos;a pas
          désigné journée de solidarité) et Toussaint (lundi 1er novembre). Le
          14 juillet, un mercredi, est le seul férié vraiment mal placé de
          l&apos;année.
        </p>
      </section>

      <section id="droits" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Férié ≠ chômé ≠ payé double : ce que dit le droit
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Seul le 1er mai est obligatoirement chômé</strong> (hors établissements qui ne peuvent pas interrompre le travail : hôpitaux, transports, hôtellerie). S&apos;il est travaillé, il est payé double — c&apos;est la seule majoration légale de tous les fériés.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Les dix autres fériés</strong> sont chômés ou travaillés selon l&apos;accord collectif ou la décision de l&apos;employeur. Travaillés, ils sont payés normalement, sans majoration légale — la majoration de 50 ou 100 % qu&apos;on croit universelle vient des conventions collectives, pas de la loi.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Férié chômé = salaire maintenu</strong> dès 3 mois d&apos;ancienneté (et sans condition dans la plupart des branches). Aucune récupération ne peut être exigée pour un férié chômé.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Férié pendant les congés payés</strong> : s&apos;il est chômé dans l&apos;entreprise, il n&apos;est pas décompté de vos congés — une semaine posée autour de l&apos;Ascension 2027 ne coûte que 4 jours de CP.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="cas" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Trois cas particuliers qui changent le calcul
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Temps partiel</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Un férié qui tombe votre jour non travaillé est perdu, sans
              compensation. En 2027, les fériés du jeudi pénalisent les
              salariés qui ne travaillent pas le jeudi — un paramètre à
              regarder au moment de choisir son jour libre.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Intérim et CDD courts</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Les fériés chômés sont payés sans condition d&apos;ancienneté
              pour les intérimaires, dès lors qu&apos;ils tombent pendant la
              mission. Un contrat qui enjambe la quinzaine de mai 2027 vaut
              trois jours payés non travaillés.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Freelances</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Aucun férié payé : chaque jour chômé est un jour non facturé.
              Les 7 fériés « utiles » de 2027 représentent environ 3 % du
              CA annuel d&apos;un indépendant à 18 jours/mois — déjà intégrés
              dans le calcul de notre{" "}
              <Link href="/simulateurs/salarie-ou-freelance" className="text-primary underline-offset-4 hover:underline">
                comparateur salarié/freelance
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
