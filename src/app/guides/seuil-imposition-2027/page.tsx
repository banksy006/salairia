import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, PercentIcon, CalculatorIcon, CalendarIcon, InfoIcon } from "@/components/icons";

interface Params {
  bareme: { jusqu: number; taux: number }[];
  decoteSeul: number;
  decoteCouple: number;
}

// Paramètres de l'impôt 2026 (revenus 2025), loi de finances pour 2026.
// Sources : CGI art. 197 (barème, décote), art. 1657 (seuil de recouvrement),
// impots.gouv.fr. Vérifié le 19 septembre 2026.
const P_2026: Params = {
  bareme: [
    { jusqu: 11_600, taux: 0 },
    { jusqu: 29_579, taux: 0.11 },
    { jusqu: 84_577, taux: 0.3 },
    { jusqu: 181_917, taux: 0.41 },
    { jusqu: Infinity, taux: 0.45 },
  ],
  decoteSeul: 897,
  decoteCouple: 1_483,
};
// Paramètres PROPOSÉS pour l'impôt 2027 (revenus 2026) : projet de loi de
// finances pour 2027, art. 2, H — barème relevé de 2,1 %, décote à 915 € et
// 1 513 €. Assemblée nationale n° 3210, déposé le 1er octobre 2026. Vérifié le
// 8 octobre 2026. Le seuil de recouvrement de 61 € n'est pas indexé.
const P_2027_PLF: Params = {
  bareme: [
    { jusqu: 11_844, taux: 0 },
    { jusqu: 30_200, taux: 0.11 },
    { jusqu: 86_353, taux: 0.3 },
    { jusqu: 185_737, taux: 0.41 },
    { jusqu: Infinity, taux: 0.45 },
  ],
  decoteSeul: 915,
  decoteCouple: 1_513,
};
const DECOTE_TAUX = 0.4525;
const SEUIL_RECOUVREMENT = 61;
const ABATTEMENT = 0.1;

function impotBrut(revenuParPart: number, p: Params): number {
  let impot = 0;
  let bas = 0;
  for (const t of p.bareme) {
    if (revenuParPart > bas) impot += (Math.min(revenuParPart, t.jusqu) - bas) * t.taux;
    bas = t.jusqu;
  }
  return impot;
}

/** Impôt réellement mis en recouvrement, décote comprise. */
function impotDu(revenu: number, parts: number, couple: boolean, p: Params): number {
  const brut = impotBrut(revenu / parts, p) * parts;
  const decote = Math.max(0, (couple ? p.decoteCouple : p.decoteSeul) - DECOTE_TAUX * brut);
  const net = Math.max(0, brut - decote);
  return net < SEUIL_RECOUVREMENT ? 0 : net;
}

/** Plus haut revenu imposable qui ne déclenche aucun impôt (bissection à l'euro). */
function seuil(parts: number, couple: boolean, p: Params): number {
  let lo = 0;
  let hi = 200_000;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (impotDu(mid, parts, couple, p) === 0) lo = mid;
    else hi = mid;
  }
  return lo;
}

const FOYERS = [
  { label: "Célibataire, sans enfant", parts: 1, couple: false },
  { label: "Parent isolé, 1 enfant", parts: 2, couple: false },
  { label: "Couple, sans enfant", parts: 2, couple: true },
  { label: "Couple, 1 enfant", parts: 2.5, couple: true },
  { label: "Couple, 2 enfants", parts: 3, couple: true },
  { label: "Couple, 3 enfants", parts: 4, couple: true },
];

const S_SEUL = seuil(1, false, P_2027_PLF);
const S_COUPLE = seuil(2, true, P_2027_PLF);
const S_SEUL_2026 = seuil(1, false, P_2026);
const S_COUPLE_2026 = seuil(2, true, P_2026);
const NET_SEUL_MENSUEL = S_SEUL / (1 - ABATTEMENT) / 12;
const NET_COUPLE_MENSUEL = S_COUPLE / (1 - ABATTEMENT) / 12;
const EX_REVENU = 20_000;
const EX_IMPOT_BRUT = impotBrut(EX_REVENU, P_2027_PLF);
const EX_DECOTE = Math.max(0, P_2027_PLF.decoteSeul - DECOTE_TAUX * EX_IMPOT_BRUT);
const EX_IMPOT = impotDu(EX_REVENU, 1, false, P_2027_PLF);

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "seuil-imposition-2027",
  titre: "À partir de quel revenu paie-t-on l'impôt en 2027 ?",
  sousTitre: `${EUR.format(S_SEUL)} pour un célibataire, ${EUR.format(S_COUPLE)} pour un couple — les seuils recalculés avec le barème du projet de loi de finances 2027`,
  chapo: `Le seuil de non-imposition ne figure dans aucun texte : il résulte de trois mécanismes empilés — la tranche à 0 % du barème, la décote, et le seuil de recouvrement de ${SEUIL_RECOUVREMENT} €. Nous les avons recalculés pour six situations familiales avec les paramètres du projet de loi de finances pour 2027, déposé le 1er octobre 2026, qui s'appliqueront à vos revenus de 2026. Un célibataire ne paierait rien jusqu'à ${EUR.format(S_SEUL)} de revenu imposable, soit environ ${EUR.format(NET_SEUL_MENSUEL)} nets imposables par mois ; un couple jusqu'à ${EUR.format(S_COUPLE)}. Ces montants restent ceux d'un projet, jusqu'au vote définitif.`,
  filAriane: "Seuil d'imposition 2027",
  datePublished: "2026-09-19",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "seuils", label: "Les seuils par situation" },
    { id: "mecanique", label: "Pourquoi ce n'est pas 11 844 €" },
    { id: "2027", label: "Ce que le PLF 2027 change" },
    { id: "salaire", label: "Traduction en salaire net" },
  ],
  faq: [
    {
      q: "Quel revenu maximum pour ne pas payer d'impôt en 2027 ?",
      r: `Avec les paramètres du projet de loi de finances pour 2027 — barème relevé de 2,1 %, décote à 915 € et 1 513 € —, le revenu imposable 2026 maximal sans impôt serait de ${EUR.format(S_SEUL)} pour un célibataire et de ${EUR.format(S_COUPLE)} pour un couple sans enfant, contre ${EUR.format(S_SEUL_2026)} et ${EUR.format(S_COUPLE_2026)} pour l'impôt 2026. C'est bien au-dessus de la tranche à 0 % (11 844 € par part), grâce à la décote et au seuil de recouvrement. Ces montants deviendront définitifs avec le vote de la loi de finances ; un gel du barème les laisserait à leur niveau de 2026.`,
    },
    {
      q: "Pourquoi le seuil n'est-il pas simplement 11 844 € ?",
      r: `Parce que la tranche à 0 % n'est que la première marche. Au-dessus de 11 844 €, l'impôt brut calculé par le barème est ensuite réduit par la décote : ${EUR.format(P_2027_PLF.decoteSeul)} moins 45,25 % de l'impôt brut pour une personne seule (${EUR.format(P_2027_PLF.decoteCouple)} pour un couple), selon le projet. Tant que l'impôt brut reste sous ${EUR.format(P_2027_PLF.decoteSeul / DECOTE_TAUX)}, la décote le réduit, et sous un certain niveau elle l'annule presque. Enfin, un impôt inférieur à ${SEUIL_RECOUVREMENT} € n'est pas mis en recouvrement. Ces trois mécanismes combinés donnent ${EUR.format(S_SEUL)}, soit environ 6 000 € de plus que la tranche à 0 %.`,
    },
    {
      q: "Le seuil est-il exprimé en salaire net ou en revenu imposable ?",
      r: `En revenu net imposable, c'est-à-dire après l'abattement forfaitaire de 10 % pour frais professionnels appliqué aux salaires. Concrètement, un célibataire pourrait percevoir jusqu'à ${EUR.format(S_SEUL / (1 - ABATTEMENT))} de salaire net imposable en 2026 — environ ${EUR.format(NET_SEUL_MENSUEL)} par mois — sans payer d'impôt en 2027. Attention : le « net imposable » de votre bulletin est légèrement supérieur au net versé, parce que la CSG non déductible s'y ajoute. Notre guide sur le net imposable détaille l'écart.`,
    },
    {
      q: "Être non imposable, est-ce la même chose qu'avoir un taux de prélèvement à la source de 0 % ?",
      r: "En principe oui : si votre impôt sur les revenus de l'année de référence est nul, votre taux personnalisé est de 0 % et rien n'est prélevé sur votre salaire. Mais le décalage temporel joue : le taux appliqué de septembre 2026 à août 2027 repose sur vos revenus 2025. Une hausse de salaire en 2026 qui vous fait franchir le seuil ne se traduira par un prélèvement qu'à partir de la régularisation de l'été 2027 — d'où, parfois, un solde à payer en septembre. Vous pouvez actualiser votre taux dans l'espace particulier d'impots.gouv.fr pour éviter la mauvaise surprise.",
    },
    {
      q: "Quels avantages sont liés au fait d'être non imposable ?",
      r: "Plusieurs dispositifs prennent en compte non pas le fait d'être imposable, mais le revenu fiscal de référence (RFR), qui figure sur l'avis d'imposition — que vous payiez ou non de l'impôt. Le RFR conditionne notamment l'exonération ou le taux réduit de CSG sur les pensions de retraite, certaines exonérations de taxe foncière, le chèque énergie ou les tarifs sociaux. Être sous le seuil d'imposition ne garantit donc pas mécaniquement ces avantages : chacun a son propre plafond de RFR. L'avis d'imposition, même à zéro, reste un document à conserver.",
    },
  ],
  sources: [
    { label: "Projet de loi de finances pour 2027, n° 3210, art. 2 — barème et décote proposés (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf" },
    { label: "CGI, art. 197 — barème et décote de l'impôt sur le revenu (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050809514" },
    { label: "CGI, art. 1657 — seuil de mise en recouvrement (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006312817" },
    { label: "impots.gouv.fr — calcul de l'impôt d'après le barème", href: "https://www.impots.gouv.fr/particulier/questions/comment-calculer-mon-taux-dimposition-dapres-le-bareme-progressif" },
    { label: "service-public.fr — décote de l'impôt sur le revenu", href: "https://www.service-public.fr/particuliers/vosdroits/F1419" },
  ],
};

export const metadata: Metadata = {
  title: `Seuil d'imposition 2027 : ${EUR.format(S_SEUL)} célibataire, ${EUR.format(S_COUPLE)} couple (barème du PLF)`,
  description: `Le revenu maximal sans impôt en 2027, recalculé avec le barème du projet de loi de finances (+2,1 %, décote à 915 €) pour six situations familiales : ${EUR.format(S_SEUL)} pour un célibataire, ${EUR.format(S_COUPLE)} pour un couple, ${EUR.format(seuil(3, true, P_2027_PLF))} pour un couple avec deux enfants. Comparaison avec 2026 et traduction en salaire net mensuel.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "À partir de quel revenu paie-t-on l'impôt en 2027 ?",
    description: "Les seuils de non-imposition par situation familiale, recalculés avec le barème du PLF 2027.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="seuils" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Le revenu maximal sans impôt, par situation familiale
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les montants ci-dessous sont des <strong>revenus nets imposables
          annuels</strong> — la ligne « revenu imposable » de votre avis, après
          abattement de 10 %. Ils sont calculés par bissection, à l&apos;euro,
          en appliquant les paramètres du projet de loi de finances pour 2027 :
          barème, quotient familial, décote, puis seuil de recouvrement. Ils
          concernent l&apos;impôt payé en 2027 sur les revenus de 2026.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Situation</th>
                <th className="px-5 py-4 text-right">Parts</th>
                <th className="px-5 py-4 text-right">Revenu imposable max.</th>
                <th className="px-5 py-4 text-right">≈ net imposable / mois</th>
              </tr>
            </thead>
            <tbody>
              {FOYERS.map((f) => {
                const s = seuil(f.parts, f.couple, P_2027_PLF);
                return (
                  <tr key={f.label} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3 font-semibold text-foreground">{f.label}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{f.parts.toLocaleString("fr-FR")}</td>
                    <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{EUR.format(s)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(s / (1 - ABATTEMENT) / 12)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Le plafonnement du quotient familial ne joue pas à ces niveaux de
          revenu : l&apos;avantage procuré par les demi-parts supplémentaires
          reste très en dessous du plafond légal. Le parent isolé bénéficie
          d&apos;une part entière pour son premier enfant, mais de la décote
          « personne seule » — d&apos;où un seuil inférieur à celui du couple
          malgré le même nombre de parts.
        </p>
      </section>

      <section id="mecanique" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Pourquoi le seuil n&apos;est pas 11 844 € : les trois étages
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { t: "1. La tranche à 0 %", d: "Les premiers 11 844 € par part ne seraient pas taxés (11 600 € pour l'impôt 2026). Au-delà commence la tranche à 11 %. C'est le seuil que tout le monde connaît — et qui ne dit rien du montant final." },
            { t: "2. La décote", d: `L'impôt brut est réduit de ${EUR.format(P_2027_PLF.decoteSeul)} − 45,25 % × impôt brut (personne seule) ou ${EUR.format(P_2027_PLF.decoteCouple)} − 45,25 % × impôt brut (couple), selon le projet. Elle s'annule quand l'impôt brut atteint ${EUR.format(P_2027_PLF.decoteSeul / DECOTE_TAUX)} ou ${EUR.format(P_2027_PLF.decoteCouple / DECOTE_TAUX)}.` },
            { t: "3. Le seuil de recouvrement", d: `Un impôt inférieur à ${SEUIL_RECOUVREMENT} € n'est pas réclamé. Ce montant n'est pas indexé. Ce dernier étage ajoute quelques centaines d'euros de revenu au seuil, et explique les « seuils » légèrement différents publiés ici ou là.` },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-5">
          <p className="text-sm font-semibold text-foreground">Exemple : célibataire à {EUR.format(EX_REVENU)} de revenu imposable 2026</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/80">
            <li>Impôt brut : 11 % × ({EUR.format(EX_REVENU)} − 11 844 €) = <strong>{EUR.format(EX_IMPOT_BRUT)}</strong></li>
            <li>Décote : {EUR.format(P_2027_PLF.decoteSeul)} − 45,25 % × {EUR.format(EX_IMPOT_BRUT)} = <strong>{EUR.format(EX_DECOTE)}</strong></li>
            <li>Impôt dû : {EUR.format(EX_IMPOT_BRUT)} − {EUR.format(EX_DECOTE)} = <strong>{EUR.format(EX_IMPOT)}</strong> — soit un taux moyen de {((EX_IMPOT / EX_REVENU) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %</li>
          </ul>
          <p className="mt-3 text-sm text-foreground/80">
            Sans la décote, cet impôt serait de {EUR.format(EX_IMPOT_BRUT)} : la
            décote en efface plus de la moitié à ce niveau de revenu.
            C&apos;est ce qui rend la « zone d&apos;entrée » dans l&apos;impôt si
            progressive — et si mal comprise.
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les taux et tranches complets, ainsi que la lecture correcte de la
          tranche marginale, sont détaillés dans notre guide sur le{" "}
          <Link href="/guides/bareme-impot-2027" className="text-primary underline-offset-4 hover:underline">
            barème de l&apos;impôt 2027
          </Link>
          . Pour convertir un salaire brut en net imposable, le{" "}
          <Link href="/guides/net-imposable" className="text-primary underline-offset-4 hover:underline">
            guide du net imposable
          </Link>{" "}
          explique pourquoi le montant de votre bulletin dépasse votre net versé.
        </p>
      </section>

      <section id="2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Ce que le projet de loi de finances 2027 change
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le projet de loi déposé le 1er octobre 2026 relève toutes les tranches
          du barème de 2,1 % — l&apos;inflation prévue pour 2026 — et porte la
          décote de 897 à 915 € pour une personne seule, de 1 483 à 1 513 € pour
          un couple. Le seuil de recouvrement de {SEUIL_RECOUVREMENT} € ne bouge
          pas. Effet sur le revenu maximal sans impôt :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Situation</th>
                <th className="px-5 py-4 text-right">Impôt 2026 (en vigueur)</th>
                <th className="px-5 py-4 text-right">Impôt 2027 (PLF)</th>
                <th className="px-5 py-4 text-right">Écart</th>
              </tr>
            </thead>
            <tbody>
              {FOYERS.map((f) => {
                const avant = seuil(f.parts, f.couple, P_2026);
                const apres = seuil(f.parts, f.couple, P_2027_PLF);
                return (
                  <tr key={f.label} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3 font-semibold text-foreground">{f.label}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(avant)}</td>
                    <td className="px-5 py-3 text-right font-bold tabular-nums text-primary">{EUR.format(apres)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-accent">+{EUR.format(apres - avant)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              La colonne « 2027 » applique un <strong>projet de loi</strong> :
              le Parlement peut modifier l&apos;indexation par amendement. Un
              gel du barème ramènerait les seuils au niveau de la colonne 2026
              — et ferait entrer dans l&apos;impôt les foyers dont le revenu a
              suivi l&apos;inflation : environ 500 000 selon le gouvernement.
              Cette page sera mise à jour à la promulgation de la loi.
            </span>
          </p>
        </div>
      </section>

      <section id="salaire" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Traduction en salaire : jusqu&apos;à combien par mois ?
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le seuil s&apos;applique au revenu <em>après</em> l&apos;abattement
          forfaitaire de 10 % pour frais professionnels. Un célibataire salarié
          pourrait donc afficher jusqu&apos;à{" "}
          <strong>{EUR.format(S_SEUL / (1 - ABATTEMENT))}</strong> de net
          imposable sur l&apos;année 2026 — {EUR.format(NET_SEUL_MENSUEL)} par
          mois sur douze mois — sans être imposable en 2027 ; un couple où les
          deux travaillent, jusqu&apos;à{" "}
          <strong>{EUR.format(S_COUPLE / (1 - ABATTEMENT))}</strong> à deux
          ({EUR.format(NET_COUPLE_MENSUEL)} par mois). Le 13ᵉ mois, les primes
          et les heures supplémentaires au-delà de leur exonération entrent
          dans ce total.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Deux précisions qui changent le résultat. D&apos;abord, le net
          imposable est supérieur au net versé, d&apos;environ 3 % à ces
          niveaux : la CSG non déductible et la CRDS y sont réintégrées. Ensuite,
          si vos frais réels dépassent 10 % de votre salaire — longs trajets
          domicile-travail, notamment — l&apos;option pour les frais réels abaisse
          votre revenu imposable, et donc relève votre marge avant impôt. Le{" "}
          <Link href="/guides/bareme-kilometrique" className="text-primary underline-offset-4 hover:underline">
            barème kilométrique
          </Link>{" "}
          en est l&apos;outil principal.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Pour vérifier votre propre situation, le{" "}
          <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
            simulateur net après impôt
          </Link>{" "}
          applique le prélèvement à la source à votre salaire, et le{" "}
          <Link href="/guides/remboursement-impot" className="text-primary underline-offset-4 hover:underline">
            guide du remboursement d&apos;impôt
          </Link>{" "}
          explique pourquoi, sous le seuil, vous pouvez recevoir un virement de
          l&apos;administration l&apos;été suivant.
        </p>
      </section>
    </GuideShell>
  );
}
