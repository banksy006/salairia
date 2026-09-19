import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, GraduationCapIcon, CalculatorIcon, CalendarIcon, ScaleIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// Plafond horaire de la Sécurité sociale 2026 : 30 € (arrêté du 19 décembre
// 2025, plafonds 2026). En pratique, il correspond au plafond annuel divisé
// par 1 607 heures, arrondi à l'euro. Gratification minimale = 15 % de ce
// plafond (C. éduc. D124-6). Sources : urssaf.fr, service-public.fr.
// Vérifié le 19 septembre 2026.
const PLAFOND_HORAIRE_SS = 30;
const TAUX_GRATIFICATION = 0.15;
const HEURES_PAR_PLAFOND = 1_607;
const GRATIF_HORAIRE = PLAFOND_HORAIRE_SS * TAUX_GRATIFICATION;
// Seuil de déclenchement : plus de deux mois, soit 44 jours ou 308 heures
// sur la même année d'enseignement (C. éduc. L124-6).
const SEUIL_HEURES = 308;
const SEUIL_JOURS = 44;
const HEURES_JOUR = 7;
const SMIC_ANNUEL = SALAIRE_2026.SMIC_MENSUEL_BRUT * 12;

// Pour que le plafond horaire passe à 31 € en 2027, le PASS annuel doit
// atteindre 30,5 × 1 607 : on en déduit la hausse minimale nécessaire.
const PASS_POUR_31 = 30.5 * HEURES_PAR_PLAFOND;
const HAUSSE_POUR_31 = (PASS_POUR_31 / SALAIRE_2026.PASS_ANNUEL - 1) * 100;

const MOIS_TYPES = [
  { jours: 20, label: "Mois court (20 jours ouvrés)" },
  { jours: 21, label: "Mois moyen (21 jours)" },
  { jours: 22, label: "Mois long (22 jours)" },
  { jours: 23, label: "Mois maximal (23 jours)" },
];

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const PCT1 = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const meta: GuideMeta = {
  slug: "gratification-stage-2027",
  titre: "Gratification de stage 2027 : montant, calcul, et ce qui changera au 1er janvier",
  sousTitre: `${EUR2.format(GRATIF_HORAIRE)} de l'heure en 2026, soit ${EUR.format(GRATIF_HORAIRE * 22 * HEURES_JOUR)} pour un mois de 22 jours — et pourquoi le montant 2027 dépend d'un seul chiffre`,
  chapo: `La gratification minimale d'un stagiaire n'est pas un salaire et ne suit pas le SMIC : elle vaut 15 % du plafond horaire de la Sécurité sociale, soit ${EUR2.format(GRATIF_HORAIRE)} par heure en 2026. Son montant 2027 sera donc connu avec l'arrêté fixant le plafond 2027, fin décembre — et une particularité arithmétique fait qu'il pourrait ne pas bouger du tout. Voici le calcul exact, les montants mensuels, les règles de déclenchement, et les deux scénarios pour l'an prochain.`,
  filAriane: "Gratification stage 2027",
  datePublished: "2026-09-19",
  dateModified: "2026-09-19",
  tocItems: [
    { id: "montant", label: "Le montant 2026" },
    { id: "calcul", label: "Le calcul mois par mois" },
    { id: "regles", label: "Quand elle est due" },
    { id: "2027", label: "Ce que 2027 changera" },
  ],
  faq: [
    {
      q: "Quel est le montant de la gratification de stage en 2026 ?",
      r: `${EUR2.format(GRATIF_HORAIRE)} par heure de présence effective, soit 15 % du plafond horaire de la Sécurité sociale (${EUR.format(PLAFOND_HORAIRE_SS)} en 2026). Pour un stage à temps plein de 7 heures par jour, cela représente ${EUR.format(GRATIF_HORAIRE * HEURES_JOUR)} par jour, et entre ${EUR.format(GRATIF_HORAIRE * HEURES_JOUR * 20)} et ${EUR.format(GRATIF_HORAIRE * HEURES_JOUR * 23)} par mois selon le nombre de jours ouvrés. C'est un minimum légal : la convention de branche ou l'organisme d'accueil peuvent prévoir davantage, et beaucoup de grandes entreprises versent entre 800 et 1 500 € aux stagiaires de fin d'études.`,
    },
    {
      q: "Quel sera le montant de la gratification en 2027 ?",
      r: `Il dépendra du plafond horaire de la Sécurité sociale 2027, fixé par arrêté fin décembre 2026 en même temps que le plafond annuel. Comme ce plafond horaire est arrondi à l'euro, deux issues seulement sont possibles : s'il reste à ${EUR.format(PLAFOND_HORAIRE_SS)}, la gratification demeure à ${EUR2.format(GRATIF_HORAIRE)} ; s'il passe à ${EUR.format(PLAFOND_HORAIRE_SS + 1)}, elle monte à ${EUR2.format((PLAFOND_HORAIRE_SS + 1) * TAUX_GRATIFICATION)}. D'après nos calculs, le passage à ${EUR.format(PLAFOND_HORAIRE_SS + 1)} suppose une revalorisation du plafond annuel d'au moins ${PCT1(HAUSSE_POUR_31)} %. Cette page sera mise à jour dès la publication de l'arrêté.`,
    },
    {
      q: "À partir de quelle durée la gratification est-elle obligatoire ?",
      r: `Dès que le stage dépasse deux mois — consécutifs ou non — au sein du même organisme et sur la même année d'enseignement, ce que la loi traduit en ${SEUIL_JOURS} jours de présence, soit ${SEUIL_HEURES} heures sur la base de 7 heures par jour. Au-delà de ce seuil, la gratification est due dès le premier jour du stage, pas seulement à partir du troisième mois. En dessous, elle est facultative. Les administrations et les associations sont soumises à la même obligation que les entreprises.`,
    },
    {
      q: "La gratification est-elle soumise aux cotisations et à l'impôt ?",
      r: `Jusqu'au minimum légal (15 % du plafond horaire), la gratification est exonérée de toutes cotisations sociales, pour le stagiaire comme pour l'organisme : c'est la « franchise de cotisations ». Seule la fraction éventuelle au-delà de ${EUR2.format(GRATIF_HORAIRE)} de l'heure est soumise aux cotisations de droit commun. Côté impôt, les gratifications sont exonérées dans la limite du SMIC annuel, soit ${EUR.format(SMIC_ANNUEL)} pour 2026 : un stagiaire n'a en pratique rien à déclarer, sauf s'il cumule plusieurs stages généreusement rémunérés.`,
    },
    {
      q: "Un stagiaire a-t-il droit aux tickets-restaurant et au remboursement des transports ?",
      r: "Oui, aux mêmes conditions que les salariés de l'organisme. Le remboursement de 50 % de l'abonnement de transport en commun est obligatoire, et si l'entreprise dispose d'un restaurant d'entreprise ou distribue des titres-restaurant, le stagiaire y accède comme les autres. Ces avantages s'ajoutent à la gratification et ne peuvent pas être déduits du minimum légal. En revanche, le stagiaire n'a pas de congés payés au sens strict : pour un stage de plus de deux mois, la convention doit prévoir des congés et autorisations d'absence, rémunérés ou non.",
    },
  ],
  sources: [
    { label: "Code de l'éducation, art. L124-6 et D124-6 à D124-8 — gratification des stagiaires (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006071191/LEGISCTA000029233912/" },
    { label: "URSSAF — la gratification des stagiaires", href: "https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries/statuts-particuliers/stagiaire.html" },
    { label: "service-public.fr — gratification et avantages du stagiaire", href: "https://www.service-public.fr/particuliers/vosdroits/F32131" },
    { label: "URSSAF — plafonds de la Sécurité sociale 2026", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/plafonds-securite-sociale.html" },
  ],
};

export const metadata: Metadata = {
  title: `Gratification stage 2027 : ${EUR2.format(GRATIF_HORAIRE)}/h en 2026, calcul mensuel et scénarios 2027`,
  description: `La gratification minimale vaut 15 % du plafond horaire de la Sécurité sociale : ${EUR2.format(GRATIF_HORAIRE)} par heure, ${EUR.format(GRATIF_HORAIRE * 22 * HEURES_JOUR)} pour 22 jours. Seuil de 2 mois (${SEUIL_HEURES} h), franchise de cotisations, exonération d'impôt — et pourquoi le montant 2027 ne peut prendre que deux valeurs.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Gratification de stage 2027 : montant, calcul et scénarios",
    description: "15 % du plafond horaire de la Sécurité sociale, calculé mois par mois — et l'échéance du 1er janvier.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="montant" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><GraduationCapIcon className="w-4 h-4" /></IconBadge>
          Le montant en vigueur, et d&apos;où il vient
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: EUR2.format(GRATIF_HORAIRE), l: "par heure de présence — minimum légal 2026" },
            { v: EUR.format(GRATIF_HORAIRE * HEURES_JOUR), l: "par jour de 7 heures" },
            { v: EUR.format(GRATIF_HORAIRE * HEURES_JOUR * 22), l: "pour un mois de 22 jours ouvrés" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          La formule tient en une ligne : <strong>15 % du plafond horaire de la
          Sécurité sociale</strong>. Ce plafond horaire vaut{" "}
          {EUR.format(PLAFOND_HORAIRE_SS)} en 2026 ; 15 % de{" "}
          {EUR.format(PLAFOND_HORAIRE_SS)} font {EUR2.format(GRATIF_HORAIRE)}.
          Il n&apos;y a donc aucun lien avec le SMIC — un stagiaire à temps
          plein touche environ{" "}
          {Math.round(((GRATIF_HORAIRE * 151.67) / SALAIRE_2026.SMIC_MENSUEL_BRUT) * 100)} % du
          SMIC brut — ni avec l&apos;inflation directement : la gratification
          suit le plafond, qui suit lui-même le salaire moyen. Nous détaillons
          cette mécanique dans le guide du{" "}
          <Link href="/guides/plafond-securite-sociale-2027" className="text-primary underline-offset-4 hover:underline">
            plafond de la Sécurité sociale 2027
          </Link>
          .
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ce montant est un plancher. Rien n&apos;interdit de verser plus, et
          les conventions collectives de certaines branches (banque, assurance,
          conseil) fixent des minima supérieurs pour les stagiaires de niveau
          master. Seule contrainte pour l&apos;organisme : au-delà du minimum
          légal, la fraction supplémentaire est soumise aux cotisations
          sociales — ce qui explique pourquoi tant d&apos;offres s&apos;alignent
          exactement sur {EUR2.format(GRATIF_HORAIRE)}.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le calcul mois par mois
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La gratification est due pour les <strong>heures de présence
          effective</strong> : elle varie donc d&apos;un mois à l&apos;autre avec
          le nombre de jours ouvrés, et elle est réduite au prorata en cas
          d&apos;absence non rémunérée. Sur la base de 7 heures par jour :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Mois</th>
                <th className="px-5 py-4 text-right">Heures</th>
                <th className="px-5 py-4 text-right">Gratification minimale</th>
              </tr>
            </thead>
            <tbody>
              {MOIS_TYPES.map((m) => (
                <tr key={m.jours} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{m.label}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{m.jours * HEURES_JOUR} h</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{EUR2.format(GRATIF_HORAIRE * m.jours * HEURES_JOUR)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Beaucoup de conventions de stage prévoient un versement mensuel
          lissé, par exemple sur 151,67 heures ({EUR2.format(GRATIF_HORAIRE * 151.67)}),
          avec régularisation en fin de stage. C&apos;est autorisé, à condition
          que le total versé sur la durée du stage ne soit pas inférieur au
          minimum calculé sur les heures réelles. Un stage de six mois à temps
          plein représente en pratique entre {EUR.format(GRATIF_HORAIRE * HEURES_JOUR * 20 * 6)}{" "}
          et {EUR.format(GRATIF_HORAIRE * HEURES_JOUR * 22 * 6)} au total.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ce montant est <strong>net</strong> : jusqu&apos;au minimum légal,
          aucune cotisation salariale n&apos;est prélevée, et la gratification
          n&apos;est pas soumise à la CSG. Le stagiaire perçoit donc exactement
          la somme calculée — à la différence d&apos;un{" "}
          <Link href="/guides/salaire-apprenti" className="text-primary underline-offset-4 hover:underline">
            apprenti
          </Link>
          , dont le brut est un pourcentage du SMIC et dont le net dépend du
          niveau de rémunération.
        </p>
      </section>

      <section id="regles" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Quand la gratification est obligatoire
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { t: "Le seuil des deux mois", d: `Obligatoire dès que la durée dépasse deux mois dans le même organisme et sur la même année d'enseignement : ${SEUIL_JOURS} jours de présence ou ${SEUIL_HEURES} heures, consécutifs ou non. Deux stages de six semaines chez le même employeur dans la même année franchissent le seuil.` },
            { t: "Due dès le premier jour", d: "Quand le seuil est franchi, la gratification couvre toute la durée du stage, rétroactivement s'il le faut — pas seulement les jours au-delà des deux mois. Une convention qui prévoit « gratification à partir du 3e mois » est irrégulière." },
            { t: "Même règle partout", d: "Entreprises, associations, administrations, établissements publics : l'obligation est identique. Seuls les stages à l'étranger relèvent des règles du pays d'accueil, et les stages hors cursus (sans convention tripartite) sont interdits." },
            { t: "Ce qu'elle n'est pas", d: "Ni un salaire, ni une période d'essai déguisée. Le stagiaire ne remplace pas un salarié absent, n'occupe pas un poste permanent et n'est pas soumis aux heures supplémentaires. Le dépassement de ces limites expose l'organisme à une requalification en contrat de travail." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Durée maximale : six mois par organisme et par année d&apos;enseignement,
          sauf dérogation pour les formations qui prévoient une période longue
          en milieu professionnel. Un délai de carence égal au tiers de la durée
          du stage précédent s&apos;impose avant d&apos;accueillir un nouveau
          stagiaire sur le même poste — une règle conçue précisément pour
          empêcher les « postes de stagiaires » permanents.
        </p>
      </section>

      <section id="2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Ce que 2027 changera — deux valeurs possibles, pas plus
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le plafond horaire de la Sécurité sociale est <strong>arrondi à
          l&apos;euro</strong>. Conséquence : la gratification n&apos;évolue pas
          continûment, elle saute par paliers de{" "}
          {EUR2.format(TAUX_GRATIFICATION)} (15 % d&apos;un euro). En 2026, le
          passage du plafond de 29 à {EUR.format(PLAFOND_HORAIRE_SS)} l&apos;a
          fait grimper de 4,35 à {EUR2.format(GRATIF_HORAIRE)}. En 2027, deux
          issues seulement :
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Scénario 1 — plafond horaire inchangé</p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-primary">{EUR2.format(GRATIF_HORAIRE)}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Si le plafond annuel 2027 progresse de moins de {PCT1(HAUSSE_POUR_31)} %,
              le plafond horaire reste arrondi à {EUR.format(PLAFOND_HORAIRE_SS)} et
              la gratification ne bouge pas d&apos;un centime.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Scénario 2 — plafond horaire à {EUR.format(PLAFOND_HORAIRE_SS + 1)}</p>
            <p className="mt-2 text-3xl font-bold tabular-nums text-primary">{EUR2.format((PLAFOND_HORAIRE_SS + 1) * TAUX_GRATIFICATION)}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Si le plafond annuel atteint au moins {EUR.format(PASS_POUR_31)}{" "}
              (+{PCT1(HAUSSE_POUR_31)} % sur {EUR.format(SALAIRE_2026.PASS_ANNUEL)}),
              l&apos;arrondi bascule et la gratification gagne{" "}
              {EUR2.format(TAUX_GRATIFICATION)} de l&apos;heure — soit environ{" "}
              {EUR.format(TAUX_GRATIFICATION * HEURES_JOUR * 22)} par mois.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Le seuil de {PCT1(HAUSSE_POUR_31)} % est une déduction arithmétique
              de la règle d&apos;arrondi, pas une prévision sur la revalorisation
              du plafond. Celle-ci suit l&apos;évolution du salaire moyen par
              tête et sera connue avec l&apos;arrêté de fin décembre 2026 —
              nous mettrons cette page à jour le jour même, comme les autres
              échéances suivies dans notre récapitulatif de{" "}
              <Link href="/guides/ce-qui-change-1er-janvier-2027" className="underline underline-offset-4">
                ce qui change au 1er janvier 2027
              </Link>
              .
            </span>
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le stage se termine, l&apos;embauche se négocie ? Les fourchettes par
          métier et par niveau — junior compris — sont dans nos{" "}
          <Link href="/metiers" className="text-primary underline-offset-4 hover:underline">
            pages salaires par métier
          </Link>
          , et le{" "}
          <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">
            simulateur de négociation
          </Link>{" "}
          situe une proposition dans le marché avant de la signer.
        </p>
      </section>
    </GuideShell>
  );
}
