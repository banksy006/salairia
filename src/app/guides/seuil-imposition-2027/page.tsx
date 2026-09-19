import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, PercentIcon, CalculatorIcon, CalendarIcon, InfoIcon } from "@/components/icons";

// Paramètres de l'impôt 2026 (revenus 2025), loi de finances pour 2026.
// Sources : CGI art. 197 (barème, décote), art. 1657 (seuil de recouvrement),
// impots.gouv.fr. Vérifié le 19 septembre 2026.
const BAREME_2026 = [
  { jusqu: 11_600, taux: 0 },
  { jusqu: 29_579, taux: 0.11 },
  { jusqu: 84_577, taux: 0.3 },
  { jusqu: 181_917, taux: 0.41 },
  { jusqu: Infinity, taux: 0.45 },
];
const DECOTE_SEUL = 897;
const DECOTE_COUPLE = 1_483;
const DECOTE_TAUX = 0.4525;
const SEUIL_RECOUVREMENT = 61;
const ABATTEMENT = 0.1;

function impotBrut(revenuParPart: number, facteur: number): number {
  let impot = 0;
  let bas = 0;
  for (const t of BAREME_2026) {
    const haut = t.jusqu * facteur;
    if (revenuParPart > bas) impot += (Math.min(revenuParPart, haut) - bas) * t.taux;
    bas = haut;
  }
  return impot;
}

/** Impôt réellement mis en recouvrement, décote comprise. `facteur` indexe tous les seuils. */
function impotDu(revenu: number, parts: number, couple: boolean, facteur = 1): number {
  const brut = impotBrut(revenu / parts, facteur) * parts;
  const decote = Math.max(0, (couple ? DECOTE_COUPLE : DECOTE_SEUL) * facteur - DECOTE_TAUX * brut);
  const net = Math.max(0, brut - decote);
  return net < SEUIL_RECOUVREMENT ? 0 : net;
}

/** Plus haut revenu imposable qui ne déclenche aucun impôt (bissection à l'euro). */
function seuil(parts: number, couple: boolean, facteur = 1): number {
  let lo = 0;
  let hi = 200_000;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (impotDu(mid, parts, couple, facteur) === 0) lo = mid;
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
// Trois hypothèses d'indexation pour la LF 2027 : gel, +1 %, +2 %.
const SCENARIOS = [
  { label: "Gel du barème", facteur: 1 },
  { label: "Indexation +1 %", facteur: 1.01 },
  { label: "Indexation +2 %", facteur: 1.02 },
];

const S_SEUL = seuil(1, false);
const S_COUPLE = seuil(2, true);
const NET_SEUL_MENSUEL = S_SEUL / (1 - ABATTEMENT) / 12;
const NET_COUPLE_MENSUEL = S_COUPLE / (1 - ABATTEMENT) / 12;
const EX_REVENU = 20_000;
const EX_IMPOT_BRUT = impotBrut(EX_REVENU, 1);
const EX_DECOTE = Math.max(0, DECOTE_SEUL - DECOTE_TAUX * EX_IMPOT_BRUT);
const EX_IMPOT = impotDu(EX_REVENU, 1, false);

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "seuil-imposition-2027",
  titre: "À partir de quel revenu paie-t-on l'impôt en 2027 ?",
  sousTitre: `${EUR.format(S_SEUL)} pour un célibataire, ${EUR.format(S_COUPLE)} pour un couple — les seuils en vigueur, et ce que l'indexation 2027 y changera`,
  chapo: `Le seuil de non-imposition ne figure dans aucun texte : il résulte de trois mécanismes empilés — la tranche à 0 % du barème, la décote, et le seuil de recouvrement de ${SEUIL_RECOUVREMENT} €. Nous les avons recalculés pour six situations familiales. Un célibataire ne paie rien jusqu'à ${EUR.format(S_SEUL)} de revenu imposable, soit environ ${EUR.format(NET_SEUL_MENSUEL)} nets par mois ; un couple jusqu'à ${EUR.format(S_COUPLE)}. Ces seuils seront réindexés par la loi de finances pour 2027, votée fin décembre : voici ce que donnent trois hypothèses.`,
  filAriane: "Seuil d'imposition 2027",
  datePublished: "2026-09-19",
  dateModified: "2026-09-19",
  tocItems: [
    { id: "seuils", label: "Les seuils par situation" },
    { id: "mecanique", label: "Pourquoi ce n'est pas 11 600 €" },
    { id: "2027", label: "Ce que 2027 changera" },
    { id: "salaire", label: "Traduction en salaire net" },
  ],
  faq: [
    {
      q: "Quel revenu maximum pour ne pas payer d'impôt en 2027 ?",
      r: `Sur les paramètres en vigueur (impôt 2026 sur les revenus 2025), le revenu imposable maximal sans impôt est de ${EUR.format(S_SEUL)} pour un célibataire et de ${EUR.format(S_COUPLE)} pour un couple sans enfant — bien au-dessus de la tranche à 0 % (11 600 €), grâce à la décote et au seuil de recouvrement. Pour l'impôt 2027 (sur les revenus 2026), ces seuils dépendront de l'indexation votée dans la loi de finances fin décembre 2026 : à +1 %, le seuil du célibataire passerait autour de ${EUR.format(seuil(1, false, 1.01))} ; à +2 %, autour de ${EUR.format(seuil(1, false, 1.02))}. En cas de gel du barème, ils resteraient inchangés en euros — donc plus bas en pouvoir d'achat.`,
    },
    {
      q: "Pourquoi le seuil n'est-il pas simplement 11 600 € ?",
      r: `Parce que la tranche à 0 % n'est que la première marche. Au-dessus de 11 600 €, l'impôt brut calculé par le barème est ensuite réduit par la décote : ${EUR.format(DECOTE_SEUL)} moins 45,25 % de l'impôt brut pour une personne seule (${EUR.format(DECOTE_COUPLE)} pour un couple). Tant que l'impôt brut reste sous ${EUR.format(DECOTE_SEUL / DECOTE_TAUX)}, la décote le réduit, et sous un certain niveau elle l'annule presque. Enfin, un impôt inférieur à ${SEUIL_RECOUVREMENT} € n'est pas mis en recouvrement. Ces trois mécanismes combinés donnent ${EUR.format(S_SEUL)}, soit près de 6 000 € de plus que la tranche à 0 %.`,
    },
    {
      q: "Le seuil est-il exprimé en salaire net ou en revenu imposable ?",
      r: `En revenu net imposable, c'est-à-dire après l'abattement forfaitaire de 10 % pour frais professionnels appliqué aux salaires. Concrètement, un célibataire peut percevoir jusqu'à ${EUR.format(S_SEUL / (1 - ABATTEMENT))} de salaire net imposable dans l'année — environ ${EUR.format(NET_SEUL_MENSUEL)} par mois — sans payer d'impôt. Attention : le « net imposable » de votre bulletin est légèrement supérieur au net versé, parce que la CSG non déductible s'y ajoute. Notre guide sur le net imposable détaille l'écart.`,
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
    { label: "CGI, art. 197 — barème et décote de l'impôt sur le revenu (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050809514" },
    { label: "CGI, art. 1657 — seuil de mise en recouvrement (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006312817" },
    { label: "impots.gouv.fr — calcul de l'impôt d'après le barème", href: "https://www.impots.gouv.fr/particulier/questions/comment-calculer-mon-taux-dimposition-dapres-le-bareme-progressif" },
    { label: "service-public.fr — décote de l'impôt sur le revenu", href: "https://www.service-public.fr/particuliers/vosdroits/F1419" },
  ],
};

export const metadata: Metadata = {
  title: `Seuil d'imposition 2027 : ${EUR.format(S_SEUL)} célibataire, ${EUR.format(S_COUPLE)} couple — et ce que l'indexation changera`,
  description: `Le revenu maximal sans impôt, recalculé pour six situations familiales (barème, décote, seuil de recouvrement de ${SEUIL_RECOUVREMENT} €) : ${EUR.format(S_SEUL)} pour un célibataire, ${EUR.format(S_COUPLE)} pour un couple, ${EUR.format(seuil(3, true))} pour un couple avec deux enfants. Les trois hypothèses d'indexation pour la loi de finances 2027, et la traduction en salaire net mensuel.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "À partir de quel revenu paie-t-on l'impôt en 2027 ?",
    description: "Les seuils de non-imposition par situation familiale, calculés — et leur évolution 2027.",
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
          en appliquant les paramètres de l&apos;impôt 2026 : barème, quotient
          familial, décote, puis seuil de recouvrement.
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
                const s = seuil(f.parts, f.couple);
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
          Pourquoi le seuil n&apos;est pas 11 600 € : les trois étages
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { t: "1. La tranche à 0 %", d: "Les premiers 11 600 € par part ne sont pas taxés. Au-delà commence la tranche à 11 %. C'est le seuil que tout le monde connaît — et qui ne dit rien du montant final." },
            { t: "2. La décote", d: `L'impôt brut est réduit de ${EUR.format(DECOTE_SEUL)} − 45,25 % × impôt brut (personne seule) ou ${EUR.format(DECOTE_COUPLE)} − 45,25 % × impôt brut (couple). Elle s'annule quand l'impôt brut atteint ${EUR.format(DECOTE_SEUL / DECOTE_TAUX)} ou ${EUR.format(DECOTE_COUPLE / DECOTE_TAUX)}.` },
            { t: "3. Le seuil de recouvrement", d: `Un impôt inférieur à ${SEUIL_RECOUVREMENT} € n'est pas réclamé. Ce dernier étage ajoute quelques centaines d'euros de revenu au seuil, et explique les « seuils » légèrement différents publiés ici ou là.` },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-white p-6 shadow-md">
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-muted p-5">
          <p className="text-sm font-semibold text-foreground">Exemple : célibataire à {EUR.format(EX_REVENU)} de revenu imposable</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/80">
            <li>Impôt brut : 11 % × ({EUR.format(EX_REVENU)} − 11 600 €) = <strong>{EUR.format(EX_IMPOT_BRUT)}</strong></li>
            <li>Décote : {EUR.format(DECOTE_SEUL)} − 45,25 % × {EUR.format(EX_IMPOT_BRUT)} = <strong>{EUR.format(EX_DECOTE)}</strong></li>
            <li>Impôt dû : {EUR.format(EX_IMPOT_BRUT)} − {EUR.format(EX_DECOTE)} = <strong>{EUR.format(EX_IMPOT)}</strong> — soit un taux moyen de {((EX_IMPOT / EX_REVENU) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %</li>
          </ul>
          <p className="mt-3 text-sm text-foreground/80">
            Sans la décote, cet impôt serait de {EUR.format(EX_IMPOT_BRUT)} : la
            décote divise la facture par plus de deux à ce niveau de revenu.
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
          Ce que la loi de finances 2027 changera
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Chaque année, la loi de finances réindexe les tranches, la décote et le
          seuil de recouvrement sur l&apos;inflation prévisionnelle. Le projet
          de loi pour 2027 est présenté fin septembre 2026 et voté fin
          décembre ; il s&apos;appliquera à vos revenus 2026, déclarés au
          printemps 2027. Trois scénarios sont sur la table — un gel n&apos;est
          jamais exclu dans un contexte budgétaire tendu. Voici ce que chacun
          donnerait, à paramètres identiques par ailleurs :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Situation</th>
                {SCENARIOS.map((s) => (
                  <th key={s.label} className="px-5 py-4 text-right">{s.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FOYERS.map((f) => (
                <tr key={f.label} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{f.label}</td>
                  {SCENARIOS.map((s) => (
                    <td key={s.label} className="px-5 py-3 text-right tabular-nums text-foreground/80">
                      {EUR.format(seuil(f.parts, f.couple, s.facteur))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <InfoIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Ces colonnes sont des <strong>hypothèses de calcul</strong>, pas
              des prévisions : l&apos;indexation retenue sera connue avec le
              texte définitif. Un gel du barème ne change rien en euros, mais
              fait entrer dans l&apos;impôt les foyers dont le salaire a suivi
              l&apos;inflation — c&apos;est la « progression à froid ». Cette
              page sera mise à jour à la promulgation de la loi.
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
          peut donc afficher jusqu&apos;à{" "}
          <strong>{EUR.format(S_SEUL / (1 - ABATTEMENT))}</strong> de net
          imposable annuel — {EUR.format(NET_SEUL_MENSUEL)} par mois sur douze
          mois — sans être imposable ; un couple où les deux travaillent,
          jusqu&apos;à <strong>{EUR.format(S_COUPLE / (1 - ABATTEMENT))}</strong>{" "}
          à deux ({EUR.format(NET_COUPLE_MENSUEL)} par mois). Le 13ᵉ mois, les
          primes et les heures supplémentaires au-delà de leur exonération
          entrent dans ce total.
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
