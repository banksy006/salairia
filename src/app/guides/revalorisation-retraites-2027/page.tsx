import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, PercentIcon, InfoIcon, ScaleIcon, CalculatorIcon } from "@/components/icons";
import { TAUX_REVALO_2027, GLISSEMENT_OCTOBRE_2026, DATE_PUBLICATION_INSEE } from "@/lib/revalorisation-2027";

// Revalorisation différenciée des pensions de base pour 2027 : PLFSS 2027,
// art. 35 (Assemblée nationale n° 3211, déposé le 1er octobre 2026). Seuils
// appréciés sur le montant mensuel total, au 31 décembre 2026, de toutes les
// pensions de l'assuré (base et complémentaires). Vérifié le 8 octobre 2026.
const SEUIL_PLEIN = 1_260;
const SEUIL_LISSAGE = 1_281;
const SEUIL_HAUT = 2_034;
// Abattement de 10 % sur les pensions : plafond actuel par foyer et sous-plafond
// proposé par le PLF 2027, art. 3, dès l'imposition des revenus 2026.
const PLAFOND_ABATTEMENT_ACTUEL = 4_439;
const PLAFOND_ABATTEMENT_PLF = 3_000;
// Agirc-Arrco : +1,4 % au 1er novembre 2026, décidé par le conseil
// d'administration du 14 octobre 2026 (communiqué de presse PDF du même
// jour, lu le 3 novembre 2026). Formule de référence de l'accord de 2023 :
// 2,0 % d'inflation hors tabac − 0,4 pt = 1,6 %, marge ±0,4 pt plafonnée par
// le salaire moyen (+1,9 %) → fourchette 1,2 à 1,9 % ; le conseil a retenu
// 1,4 %. Valeur de service du point : 1,4386 € depuis le 1er novembre 2024
// (inchangée en 2025), la nouvelle valeur est dérivée du taux ci-dessous.
const AGIRC_HAUSSE = 0.014;
const AGIRC_POINT_AVANT = 1.4386;
const AGIRC_POINT_APRES = Math.round(AGIRC_POINT_AVANT * (1 + AGIRC_HAUSSE) * 10_000) / 10_000;
const EUR4 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 4, maximumFractionDigits: 4 });

// Barème proposé par le PLF 2027 (art. 2) pour l'impôt sur les revenus 2026,
// décote « couple » comprise — utilisé pour l'exemple de l'abattement.
const BAREME_2027_PLF = [
  { jusqu: 11_844, taux: 0 },
  { jusqu: 30_200, taux: 0.11 },
  { jusqu: 86_353, taux: 0.3 },
  { jusqu: 185_737, taux: 0.41 },
  { jusqu: Infinity, taux: 0.45 },
];
const DECOTE_COUPLE_2027 = 1_513;

function impotCouple(revenuImposable: number): number {
  const parPart = revenuImposable / 2;
  let brut = 0;
  let bas = 0;
  for (const t of BAREME_2027_PLF) {
    if (parPart > bas) brut += (Math.min(parPart, t.jusqu) - bas) * t.taux;
    bas = t.jusqu;
  }
  brut *= 2;
  const net = Math.max(0, brut - Math.max(0, DECOTE_COUPLE_2027 - 0.4525 * brut));
  return net < 61 ? 0 : Math.round(net);
}

// Couple de retraités : 1 800 € de pensions imposables chacun par mois.
const PENSIONS_COUPLE = 2 * 1_800 * 12;
const abattement = (plafond: number) => Math.min(PENSIONS_COUPLE * 0.1, plafond);
const IMPOT_ACTUEL = impotCouple(PENSIONS_COUPLE - abattement(PLAFOND_ABATTEMENT_ACTUEL));
const IMPOT_PLF = impotCouple(PENSIONS_COUPLE - abattement(PLAFOND_ABATTEMENT_PLF));

// Trois profils : ce que vaut chaque point de revalorisation sur la pension de
// base, et ce que le texte en laisse par défaut.
const PROFILS = [
  { label: "Petite pension", base: 850, compl: 300 },
  { label: "Non-cadre, carrière complète", base: 1_200, compl: 600 },
  { label: "Ancien cadre", base: 1_400, compl: 1_400 },
].map((p) => {
  const total = p.base + p.compl;
  return { ...p, total, parPoint: p.base * 0.01, hausse: p.base * TAUX_REVALO_2027, agirc: p.compl * AGIRC_HAUSSE, plein: total <= SEUIL_PLEIN };
});

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const PCT1 = (x: number) => (x * 100).toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const TAUX = PCT1(TAUX_REVALO_2027);

const meta: GuideMeta = {
  slug: "revalorisation-retraites-2027",
  titre: "Revalorisation des retraites 2027 : +1,8 %, et le gel supprimé par le Sénat",
  sousTitre: `+${TAUX} % pour toutes les pensions de base si le vote du Sénat tient : il a supprimé le 16 novembre le gel prévu au-dessus de ${EUR.format(SEUIL_PLEIN)}. Le texte n'est pas encore définitif`,
  chapo: `Chaque automne, la même question : de combien les retraites vont-elles augmenter ? L'inflation qui sert de base au calcul est connue : appliquée aux indices publiés par l'INSEE le ${DATE_PUBLICATION_INSEE}, la règle légale donne +${TAUX} %. Le gouvernement voulait réserver cette hausse aux retraités dont l'ensemble des pensions ne dépasse pas ${EUR.format(SEUIL_PLEIN)} par mois et geler les autres. Le Sénat a supprimé cette mesure le 16 novembre 2026, à l'unanimité des votants, après que les députés l'avaient retirée en commission. Le budget n'est pas encore adopté : voici où en est le texte, et ce que chaque scénario change pour vous. La complémentaire Agirc-Arrco, elle, a augmenté de 1,4 % au 1er novembre.`,
  filAriane: "Retraites 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-11-26",
  tocItems: [
    { id: "deux", label: "Les deux revalorisations" },
    { id: "base", label: "Le gel prévu, puis supprimé" },
    { id: "complementaire", label: "L'Agirc-Arrco" },
    { id: "impot", label: "L'abattement de 10 %" },
    { id: "concret", label: "Ce que ça change, profil par profil" },
  ],
  faq: [
    {
      q: "Les retraites vont-elles augmenter en janvier 2027 ?",
      r: `Toutes, si la suppression votée par le Sénat le 16 novembre 2026 est maintenue : les pensions de base suivront alors la règle légale, soit +${TAUX} % selon notre calcul. Le texte initial du gouvernement, lui, prévoyait autre chose. Son article 35 dérogeait à l'indexation automatique : les pensions de base seraient revalorisées sur l'inflation si le total mensuel de vos pensions — base et complémentaires — ne dépasse pas ${EUR.format(SEUIL_PLEIN)} au 31 décembre 2026. Entre ${EUR.format(SEUIL_PLEIN)} et ${EUR.format(SEUIL_LISSAGE)}, une hausse réduite, fixée par décret, évite un effet de seuil. Au-delà, le coefficient serait fixé à 1 — c'est-à-dire aucune hausse — tant qu'un décret n'en décide pas autrement. Le budget n'est pas définitif : la commission mixte paritaire a échoué le 26 novembre 2026, une nouvelle lecture s'ouvre à l'Assemblée nationale, qui aura le dernier mot.`,
    },
    {
      q: "Comment savoir si je suis sous le seuil de 1 260 € ?",
      r: "Le texte retient le montant mensuel total, au 31 décembre 2026, de toutes les pensions de vieillesse servies par les régimes légaux ou légalement obligatoires : votre retraite de base, mais aussi l'Agirc-Arrco ou l'Ircantec, les pensions de réversion, ainsi que leurs majorations et accessoires — à l'exception de la majoration pour tierce personne. C'est donc le cumul qui compte, pas la seule pension de base. Selon l'exposé des motifs, le seuil de 1 281 € correspond au niveau de pension garanti après une carrière complète.",
    },
    {
      q: "Le gel des pensions peut-il encore revenir ?",
      r: `Oui, mais il a perdu beaucoup de terrain. Le 16 novembre 2026, le Sénat a supprimé l'article 35 par 329 voix pour, aucune contre et 15 abstentions, avec l'accord du gouvernement ; il a adopté l'ensemble du texte le 18 novembre. À l'Assemblée nationale, l'article avait déjà été retiré en commission, et le texte rejeté en séance le 23 octobre avant d'arriver aux dépenses. Reste la suite de la procédure : la commission mixte paritaire réunie le 26 novembre n'a pas trouvé de texte commun. Chaque chambre relit donc le texte, en commençant par l'Assemblée nationale, dont la commission des affaires sociales l'examine dès la semaine suivante, et l'Assemblée tranchera en dernier. Le gouvernement peut aussi recourir au 49.3 avec un texte de son choix ; et si le budget était appliqué par ordonnance, passé le délai constitutionnel du 26 novembre, ce serait a priori sur la base du texte initial, qui contient le gel. Enfin, la suppression a une contrepartie annoncée : les sénateurs entendent la financer, dans le projet de loi de finances, par la suppression totale de l'abattement fiscal de 10 % des retraités. Le précédent rassure : le budget 2026 prévoyait déjà un gel, abandonné au Parlement, et les pensions de base avaient été revalorisées de 0,9 % au 1er janvier 2026.`,
    },
    {
      q: "L'Agirc-Arrco est-elle concernée par ce gel ?",
      r: "Non : l'article 35 vise les régimes de base. La complémentaire Agirc-Arrco est pilotée par les partenaires sociaux, qui fixent la valeur du point au 1er novembre dans le cadre de leur accord — l'inflation prévue, minorée le cas échéant d'un facteur de soutenabilité pouvant aller jusqu'à 0,4 point. Réuni le 14 octobre 2026, le conseil d'administration a décidé une hausse de 1,4 % au 1er novembre 2026 — 0,2 point sous la formule de référence de 1,6 % (2 % d'inflation prévue moins 0,4 point de soutenabilité), après une année 2025 sans revalorisation. En revanche, le montant de votre Agirc-Arrco compte dans le total qui détermine si votre pension de base est revalorisée.",
    },
    {
      q: "Les retraités paieront-ils plus d'impôt en 2027 ?",
      r: `Une partie d'entre eux. L'article 3 du projet de loi de finances plafonnerait à ${EUR.format(PLAFOND_ABATTEMENT_PLF)} par foyer l'abattement de 10 % sur les pensions de retraite, contre ${EUR.format(PLAFOND_ABATTEMENT_ACTUEL)} aujourd'hui, dès l'imposition des revenus 2026. La mesure est sans effet en dessous d'environ 30 000 € de pensions annuelles par foyer ; elle toucherait 4,6 millions de foyers selon l'évaluation du gouvernement. Les pensions d'invalidité et les pensions alimentaires ne sont pas concernées.`,
    },
  ],
  sources: [
    { label: "Public Sénat — budget 2027 de la Sécurité sociale : échec de la commission mixte paritaire (26 novembre 2026)", href: "https://www.publicsenat.fr/actualites/politique/budget-2027-de-la-securite-sociale-echec-de-la-tentative-de-compromis-entre-deputes-et-senateurs" },
    { label: "Projet de loi de financement de la Sécurité sociale pour 2027, n° 3211, art. 35 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi" },
    { label: "Projet de loi de finances pour 2027, n° 3210, art. 3 — abattement des retraités (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf" },
    { label: "INSEE — prix à la consommation d'octobre 2026, résultats définitifs (Informations rapides n° 271, 13 novembre 2026)", href: "https://www.insee.fr/fr/statistiques/9131332" },
    { label: "INSEE — série 011814056, indice des prix hors tabac (base 2025)", href: "https://www.insee.fr/fr/statistiques/serie/011814056" },
    { label: "Public Sénat — budget 2027 de la Sécurité sociale : les modifications à retenir après le passage au Sénat (18 novembre 2026)", href: "https://www.publicsenat.fr/actualites/politique/budget-2027-de-la-securite-sociale-les-modifications-a-retenir-apres-le-passage-du-projet-de-loi-au-senat" },
    { label: "Sénat — scrutin n° 111 du 16 novembre 2026 : suppression de l'article 35 (329 pour, 0 contre, 15 abstentions)", href: "https://www.senat.fr/scrutin-public/2026/scr2026-111.html" },
    { label: "NosParlementaires — calendrier d'examen du PLFSS 2027 (mis à jour le 20 novembre 2026)", href: "https://nosparlementaires.fr/actualites/plfss-2027-calendrier-examen-date-par-date" },
    { label: "Code de la sécurité sociale, art. L161-25 — revalorisation sur l'inflation (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033715437" },
    { label: "Agirc-Arrco — actualité du 14 octobre 2026 : revalorisation de +1,4 % au 1er novembre 2026", href: "https://www.agirc-arrco.fr/nous-connaitre/nos-actualites/retraites-complementaires-agirc-arrco-une-revalorisation-de-14-au-1er-novembre-2026/" },
    { label: "Agirc-Arrco — communiqué de presse du 14 octobre 2026 (PDF) : fourchette 1,2 à 1,9 %, valeur d'achat renvoyée à l'accord 2027-2030", href: "https://www.agirc-arrco.fr/storage/261014_Communique-de-presse_Revalorisation-valeur-du-point-Agirc-Arrco.pdf" },
    { label: "service-public.fr — montant et revalorisation de la retraite", href: "https://www.service-public.fr/particuliers/vosdroits/N381" },
  ],
};

export const metadata: Metadata = {
  title: "Revalorisation des retraites 2027 : +1,8 %, le Sénat supprime le gel des pensions",
  description: `Inflation de référence : +${TAUX} % au 1er janvier 2027. Le Sénat a supprimé le 16 novembre le gel des pensions au-dessus de ${EUR.format(SEUIL_PLEIN)} prévu par le gouvernement ; le texte n'est pas définitif. L'Agirc-Arrco a décidé +1,4 % au 1er novembre. Abattement de 10 % plafonné à ${EUR.format(PLAFOND_ABATTEMENT_PLF)}. Mécanisme, seuils et effet chiffré par profil.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Retraites 2027 : +1,8 %, et le gel supprimé par le Sénat",
    description: "Ce que change le vote du Sénat du 16 novembre, et ce qui peut encore bouger d'ici la fin du budget.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="deux" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Deux revalorisations, deux logiques
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4">Pension de base (CNAV…)</th>
                <th className="px-5 py-4">Complémentaire Agirc-Arrco</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Date", "1er janvier 2027", "1er novembre 2026"],
                ["Qui décide", "La loi — mais le PLFSS 2027 déroge à l'indexation automatique pour 2027", "Le conseil d'administration paritaire du régime"],
                ["Sur quelle base", `Inflation moyenne hors tabac, novembre 2025 → octobre 2026 : +${TAUX} % (calcul Salairia sur les indices INSEE du ${DATE_PUBLICATION_INSEE})`, "Inflation prévue, minorée d'un facteur de soutenabilité (jusqu'à −0,4 pt)"],
                ["Ce qui est décidé", `Rien de définitif. Le gouvernement proposait un gel au-delà de ${EUR.format(SEUIL_LISSAGE)}/mois ; le Sénat l'a supprimé le 16 novembre. Sans gel : +${TAUX} % pour tous`, "+1,4 % au 1er novembre 2026, décidé le 14 octobre (formule de référence : 1,6 %)"],
                ["Précédents récents", "Gel proposé pour 2026 puis abandonné : +0,9 % au 1er janvier 2026", "0 % en novembre 2025"],
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
      </section>

      <section id="base" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Le texte du gouvernement : une revalorisation à trois étages
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: `≤ ${EUR.format(SEUIL_PLEIN)}`, t: "Revalorisation pleine", d: `La pension de base suit le coefficient légal : l'inflation moyenne hors tabac de novembre 2025 à octobre 2026, soit +${TAUX} % d'après les indices INSEE.` },
            { v: `${EUR.format(SEUIL_PLEIN)} – ${EUR.format(SEUIL_LISSAGE)}`, t: "Hausse réduite", d: "Quatre paliers (1 265, 1 270, 1 275 et 1 281 €) avec un coefficient réduit fixé par décret, pour éviter qu'un euro de pension en plus fasse perdre toute la hausse." },
            { v: `> ${EUR.format(SEUIL_LISSAGE)}`, t: "Gel par défaut", d: `Coefficient fixé à 1, sauf décret prévoyant une hausse partielle — éventuellement dégressive jusqu'à ${EUR.format(SEUIL_HAUT)}, puis plus faible encore au-delà.` },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="text-xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Dans le texte du gouvernement, le seuil s&apos;apprécie sur le{" "}
            <strong>montant mensuel total de toutes vos pensions</strong> au 31
            décembre 2026 — base, complémentaires et réversion comprises —,
            pas sur la seule pension de base. La lettre du texte vise un
            montant mensuel, et non les sommes versées en décembre. Il ne
            précise pas comment seraient traitées les pensions payées par
            trimestre ou une fois par an, comme certaines pensions de
            l&apos;Ircantec : ce point relèverait des caisses de retraite ou
            d&apos;un décret si le gel était rétabli. Dans ce texte, les éventuels décrets ne pouvaient qu&apos;améliorer la
            revalorisation, jamais faire baisser une pension, et pouvaient
            s&apos;appliquer rétroactivement au 1er janvier 2027. Le
            gouvernement chiffrait l&apos;économie à 4 milliards d&apos;euros
            en 2027 si les pensions au-delà de {EUR.format(SEUIL_LISSAGE)}{" "}
            restaient gelées toute l&apos;année.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            <strong>Le Sénat a supprimé cette mesure le 16 novembre 2026</strong>,
            par 329 voix pour et aucune contre, avec l&apos;accord du
            gouvernement. Les députés l&apos;avaient déjà retirée en commission.
            Le budget n&apos;est pas encore adopté : la commission mixte
            paritaire du 26 novembre a échoué, une nouvelle lecture
            commence à l&apos;Assemblée nationale, qui aura le dernier mot,
            et le gouvernement peut toujours recourir au 49.3. Les sénateurs ont aussi annoncé une contrepartie : financer
            cette suppression en supprimant totalement l&apos;abattement fiscal
            de 10 % des retraités dans le projet de loi de finances, ce qui
            alourdirait l&apos;impôt des retraités imposables. Le budget 2026 avait connu le même sort : un gel proposé,
            puis abandonné, et des pensions revalorisées de 0,9 % au 1er
            janvier 2026. Nous suivons ce dossier
            jusqu&apos;au vote dans notre{" "}
            <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
              récapitulatif du 1er janvier 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="complementaire" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          L&apos;Agirc-Arrco : un régime qui décide, pas une formule qui s&apos;applique
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La complémentaire des salariés du privé fonctionne par{" "}
            <strong>points</strong> : la pension = nombre de points × valeur
            de service du point. Chaque automne, syndicats et patronat fixent
            cette valeur pour le 1er novembre, dans le cadre de leur accord :
            référence à l&apos;inflation prévisionnelle, minorée le cas échéant
            d&apos;un <strong>facteur de soutenabilité</strong> allant
            jusqu&apos;à 0,4 point, pour préserver les réserves du régime.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La conséquence pratique : l&apos;Agirc-Arrco peut décider{" "}
            <strong>zéro</strong> — elle l&apos;a fait en novembre 2025. Pour
            2026, son conseil d&apos;administration a tranché le 14 octobre :{" "}
            <strong>+1,4 % au 1er novembre</strong>, soit 0,2 point sous la
            formule de référence (2 % d&apos;inflation prévue moins 0,4 point),
            dans une fourchette que l&apos;accord bornait entre 1,2 et 1,9 %.
            La valeur de service du point passe ainsi de{" "}
            {EUR4.format(AGIRC_POINT_AVANT)}{" "}à{" "}
            <strong>{EUR4.format(AGIRC_POINT_APRES)}</strong> (1,4386 × 1,014),
            après deux ans sans hausse — visible depuis le virement du 2 novembre.
            L&apos;article 35 du PLFSS ne la concerne pas. Rappel utile : la
            valeur d&apos;<em>achat</em> du point (pour les actifs qui cotisent)
            évolue séparément — une hausse de la première n&apos;améliore pas le
            rendement de la seconde. Fait nouveau : le conseil n&apos;a pas
            fixé la valeur d&apos;achat 2027 en octobre comme d&apos;habitude ;
            elle sera arrêtée dans la négociation de l&apos;accord 2027-2030.
          </p>
        </div>
      </section>

      <section id="impot" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Côté impôt : l&apos;abattement de 10 % plafonné à {EUR.format(PLAFOND_ABATTEMENT_PLF)}
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les pensions de retraite bénéficient d&apos;un abattement de 10 %
            avant le calcul de l&apos;impôt, plafonné aujourd&apos;hui à{" "}
            {EUR.format(PLAFOND_ABATTEMENT_ACTUEL)}{" "}par foyer. Le projet de loi
            de finances (article 3) ajouterait un sous-plafond de{" "}
            <strong>{EUR.format(PLAFOND_ABATTEMENT_PLF)}</strong> pour les
            pensions de retraite, dès l&apos;impôt payé en 2027 sur les revenus
            2026. Sans effet en dessous d&apos;environ 30 000 € de pensions
            annuelles par foyer ; 4,6 millions de foyers concernés selon
            l&apos;évaluation préalable.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Exemple : un couple de retraités percevant chacun 1 800 € de
            pensions imposables par mois, soit {EUR.format(PENSIONS_COUPLE)}{" "}par
            an. Son abattement passerait de{" "}
            {EUR.format(abattement(PLAFOND_ABATTEMENT_ACTUEL))}{" "}à{" "}
            {EUR.format(abattement(PLAFOND_ABATTEMENT_PLF))}. Avec le barème
            proposé pour 2027, son impôt passerait de{" "}
            {EUR.format(IMPOT_ACTUEL)}{" "}à <strong>{EUR.format(IMPOT_PLF)}</strong>,
            soit {EUR.format(IMPOT_PLF - IMPOT_ACTUEL)}{" "}de plus — la décote, qui
            se réduit quand l&apos;impôt augmente, amplifie l&apos;effet à ce
            niveau de revenu.
          </p>
        </div>
      </section>

      <section id="concret" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que ça change, profil par profil
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          L&apos;INSEE a publié le {DATE_PUBLICATION_INSEE} le dernier indice
          qui manquait. Appliquée à ces indices, la règle légale donne{" "}
          <strong>+{TAUX} %</strong> sur la pension de base. Voici ce que cela
          représente pour trois profils, et ce que le texte du gouvernement
          leur laisse par défaut :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Profil</th>
                <th className="px-5 py-4 text-right">Base + complémentaire</th>
                <th className="px-5 py-4 text-right">Agirc-Arrco +1,4 % (nov. 2026)</th>
                <th className="px-5 py-4 text-right">Hausse pleine (+{TAUX} %)</th>
                <th className="px-5 py-4 text-right">Si le gel revenait</th>
              </tr>
            </thead>
            <tbody>
              {PROFILS.map((p) => (
                <tr key={p.label} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{p.label}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                    {EUR.format(p.base)} + {EUR.format(p.compl)}
                    <span className="block text-xs text-muted-foreground">total {EUR.format(p.total)}</span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-accent">+{EUR2.format(p.agirc)} / mois</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">+{EUR2.format(p.hausse)} / mois</td>
                  <td className="px-5 py-3 text-right">
                    {p.plein ? (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">hausse pleine</span>
                    ) : (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">gel sauf décret</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Lecture : si la suppression votée par le Sénat tient, les trois
            profils reçoivent la hausse pleine. Si le gel du gouvernement
            revenait, le profil non-cadre, dont le total des pensions dépasse
            le seuil, perdrait {EUR2.format(PROFILS[1].hausse)}{" "}par mois, soit{" "}
            {EUR.format(PROFILS[1].hausse * 12)}{" "}sur l&apos;année. Le gel ne fait
            pas baisser la pension en euros, mais il la fait baisser en pouvoir
            d&apos;achat du montant de l&apos;inflation.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Ne confondez pas ce taux avec les +
            {PCT1(GLISSEMENT_OCTOBRE_2026)} % d&apos;inflation sur un an annoncés
            pour octobre : la loi ne retient pas le dernier mois, mais la
            moyenne des douze derniers indices, qui lisse la poussée récente
            des prix de l&apos;énergie. Le coefficient officiel sera publié par
            la CNAV ; nous l&apos;afficherons dès sa parution.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Deux rappels pour lire son relevé : les montants s&apos;entendent{" "}
            <strong>bruts</strong> — CSG (taux selon le revenu fiscal de
            référence), CRDS et Casa s&apos;appliquent ensuite, comme expliqué
            dans notre guide{" "}
            <Link href="/guides/retraite-brut-net" className="text-primary underline-offset-4 hover:underline">
              retraite brut et net
            </Link>{" "}
            ; et le versement de janvier de la base arrive début février
            (paiement à terme échu), là où l&apos;Agirc-Arrco paie d&apos;avance
            début novembre — toutes les dates sont dans notre{" "}
            <Link href="/guides/calendrier-paiement-retraite-2027" className="text-primary underline-offset-4 hover:underline">
              calendrier de paiement 2027
            </Link>
            . Pour les actifs qui préparent leur propre retraite, le paramètre
            qui pilote la pension par points est le{" "}
            <Link href="/guides/plafond-securite-sociale-2027" className="text-primary underline-offset-4 hover:underline">
              plafond de la Sécurité sociale
            </Link>
            .
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
