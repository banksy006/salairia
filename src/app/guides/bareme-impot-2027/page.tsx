import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, PercentIcon, CalendarIcon, CalculatorIcon, InfoIcon } from "@/components/icons";

// Barème IR 2026 (revenus 2025), LF 2026 — seuils indexés de +0,9 %.
// Sources : loi de finances pour 2026 ; impots.gouv.fr. Vérifié le 23 août 2026.
const BAREME_2026 = [
  { jusqu: 11_600, taux: 0 },
  { jusqu: 29_579, taux: 11 },
  { jusqu: 84_577, taux: 30 },
  { jusqu: 181_917, taux: 41 },
  { jusqu: null, taux: 45 },
];
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "bareme-impot-2027",
  titre: "Barème de l'impôt 2027 : ce qu'on sait déjà",
  sousTitre: "Les tranches actuelles, la mécanique d'indexation, et le calendrier de la loi de finances",
  chapo: "Le barème qui s'appliquera à vos revenus 2026 — celui de la déclaration du printemps 2027 — sera voté avec la loi de finances pour 2027, fin décembre 2026. Les taux ne bougent presque jamais ; ce qui se joue chaque année, c'est l'indexation des seuils sur l'inflation. Voici le barème en vigueur, la mécanique, le calendrier — et cette page affichera les tranches 2027 dès leur publication au Journal officiel.",
  filAriane: "Barème impôt 2027",
  datePublished: "2026-08-23",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "actuel", label: "Le barème en vigueur" },
    { id: "mecanique", label: "Comment il fonctionne" },
    { id: "indexation", label: "L'indexation annuelle" },
    { id: "calendrier", label: "Le calendrier LF 2027" },
  ],
  faq: [
    {
      q: "Quelles seront les tranches d'imposition en 2027 ?",
      r: "Elles ne sont pas encore fixées : le barème applicable aux revenus 2026 sera voté dans la loi de finances pour 2027, présentée fin septembre 2026 et promulguée fin décembre. Les taux (0, 11, 30, 41 et 45 %) sont stables depuis 2020 ; la vraie variable est l'indexation des seuils, traditionnellement alignée sur l'inflation prévisionnelle hors tabac. Pour le barème 2026, cette indexation a été de +0,9 %. Cette page sera mise à jour avec les seuils exacts dès la publication de la loi au Journal officiel.",
    },
    {
      q: "Quel est le barème actuellement en vigueur ?",
      r: "Le barème 2026, appliqué aux revenus 2025 (par part de quotient familial) : 0 % jusqu'à 11 600 €, 11 % de 11 601 à 29 579 €, 30 % de 29 580 à 84 577 €, 41 % de 84 578 à 181 917 €, et 45 % au-delà. Attention à la lecture : ces seuils s'appliquent au revenu imposable par part — un couple avec deux enfants (3 parts) divise son revenu par 3 avant de le confronter au barème.",
    },
    {
      q: "Que se passe-t-il si le barème n'est pas indexé ?",
      r: "C'est le scénario dit du « gel du barème », régulièrement évoqué dans les débats budgétaires : sans indexation, l'inflation pousse mécaniquement des foyers dans des tranches supérieures sans gain de pouvoir d'achat réel — des centaines de milliers de foyers non imposables deviendraient imposables. Chaque automne, cette question est l'un des points chauds de la discussion parlementaire. Tant que la loi n'est pas promulguée (généralement fin décembre), aucun scénario n'est acquis.",
    },
    {
      q: "Être dans la tranche à 30 %, est-ce payer 30 % d'impôt ?",
      r: "Non — c'est le contresens le plus répandu sur l'impôt français. Le barème est progressif : chaque tranche ne taxe que la fraction du revenu qui s'y trouve. Un célibataire à 40 000 € imposables ne paie rien sur ses premiers 11 600 €, 11 % sur la portion suivante, et 30 % seulement sur ce qui dépasse 29 579 €. Son taux moyen réel ressort autour de 13 % — loin des 30 % de sa tranche marginale. La tranche marginale sert à raisonner (que rapporte une augmentation ? que coûte un retrait de PER ?), le taux moyen à mesurer ce que vous payez.",
    },
    {
      q: "Le nouveau barème change-t-il mon prélèvement à la source immédiatement ?",
      r: "Non. Le prélèvement à la source de janvier 2027 continuera d'utiliser votre taux calculé sur la déclaration du printemps 2026. Le barème 2027 ne jouera qu'à deux moments : la déclaration d'avril-juin 2027 (calcul de l'impôt réel sur vos revenus 2026, avec remboursement ou solde à la clé) et le taux appliqué à partir de septembre 2027. Les grilles de taux neutre, elles, sont réajustées dès janvier — notre simulateur net après impôt les intègre à chaque mise à jour.",
    },
  ],
  sources: [
    { label: "impots.gouv.fr — les tranches et taux de l'impôt sur le revenu", href: "https://www.impots.gouv.fr/particulier/questions/comment-calculer-mon-taux-dimposition-dapres-le-bareme-progressif" },
    { label: "service-public.fr — impôt sur le revenu : tranches et taux", href: "https://www.service-public.fr/particuliers/vosdroits/F1419" },
    { label: "CGI, art. 197 — barème de l'impôt (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000050809514" },
    { label: "economie.gouv.fr — le projet de loi de finances", href: "https://www.economie.gouv.fr/" },
  ],
};

export const metadata: Metadata = {
  title: "Barème impôt 2027 : tranches actuelles, indexation, calendrier de la loi de finances",
  description: "Le barème 2027 (revenus 2026) sera voté fin décembre 2026. En attendant : les tranches en vigueur (0 à 45 %, seuils indexés de +0,9 % en 2026), la mécanique du quotient familial et de la tranche marginale, et le calendrier. Page mise à jour à la publication de la LF 2027.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Barème de l'impôt 2027 : ce qu'on sait déjà",
    description: "Tranches actuelles, mécanique d'indexation, calendrier — mis à jour à la promulgation.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="actuel" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Le barème en vigueur (revenus 2025, déclarés en 2026)
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Fraction du revenu imposable (par part)</th>
                <th className="px-5 py-4 text-right">Taux</th>
              </tr>
            </thead>
            <tbody>
              {BAREME_2026.map((t, i) => {
                const prev = i === 0 ? 0 : BAREME_2026[i - 1].jusqu!;
                return (
                  <tr key={t.taux} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3 text-foreground/80">
                      {t.jusqu === null
                        ? `Au-delà de ${EUR.format(prev)}`
                        : i === 0
                          ? `Jusqu'à ${EUR.format(t.jusqu)}`
                          : `De ${EUR.format(prev + 1)} à ${EUR.format(t.jusqu)}`}
                    </td>
                    <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{t.taux} %</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Seuils issus de la loi de finances pour 2026 (indexation de{" "}
          <strong>+0,9 %</strong>), à lire <strong>par part de quotient
          familial</strong> : le revenu imposable du foyer est divisé par le
          nombre de parts avant confrontation au barème, puis l&apos;impôt par
          part est remultiplié — avec un plafonnement de l&apos;avantage par
          demi-part supplémentaire.
        </p>
      </section>

      <section id="mecanique" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Tranche marginale ≠ taux réel
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le barème est progressif : chaque taux ne s&apos;applique
            qu&apos;à la fraction de revenu comprise dans sa tranche. Un
            célibataire (1 part) à 40 000 € imposables paie 0 € sur ses
            11 600 premiers euros, 11 % sur les {EUR.format(29_579 - 11_600)}{" "}
            suivants, et 30 % sur les {EUR.format(40_000 - 29_579)} restants —
            soit un taux moyen d&apos;environ 13 %, très loin des « 30 % » de
            sa tranche.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Les deux notions servent à des choses différentes : le{" "}
            <strong>taux moyen</strong> mesure ce que vous payez ; la{" "}
            <strong>tranche marginale</strong> pilote vos décisions — ce que
            rapporte réellement une augmentation, ce que défiscalise un
            versement PER, ce que coûte un revenu exceptionnel. Notre{" "}
            <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
              simulateur net après impôt
            </Link>{" "}
            fait la traduction en net mensuel réel.
          </p>
        </div>
      </section>

      <section id="indexation" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          L&apos;indexation : le vrai enjeu de chaque automne
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les taux du barème n&apos;ont pas changé depuis 2020 (la tranche à
            14 % est devenue 11 %). L&apos;enjeu annuel est ailleurs : si les
            seuils ne suivent pas l&apos;inflation, un salaire simplement
            revalorisé du coût de la vie glisse vers les tranches supérieures
            — c&apos;est la « progression à froid ». L&apos;indexation
            n&apos;est <strong>pas automatique</strong> : elle doit être votée
            chaque année, et son ampleur (voire son gel) est un marqueur
            politique du budget. Pour 2026, elle a été de +0,9 %, calée sur
            l&apos;inflation prévisionnelle hors tabac.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            À surveiller aussi dans la même loi : la décote (qui annule ou
            réduit l&apos;impôt des foyers juste au-dessus du seuil
            d&apos;imposition), le plafond du quotient familial, et les seuils
            du taux neutre de prélèvement à la source — ceux que notre
            simulateur utilise pour les salariés qui n&apos;ont pas transmis
            de taux personnalisé.
          </p>
        </div>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier de la loi de finances 2027
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["Fin septembre 2026", "Présentation du projet de loi de finances 2027 en Conseil des ministres : première version chiffrée de l'indexation."],
                ["Octobre – décembre", "Débats parlementaires — le barème peut évoluer au fil des amendements, rien n'est définitif."],
                ["Fin décembre 2026", "Promulgation et publication au Journal officiel : les tranches 2027 deviennent officielles. Cette page est mise à jour ce jour-là."],
                ["Avril – juin 2027", "Déclaration des revenus 2026 : première application concrète du barème voté."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-52 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          En attendant, votre impôt courant reste piloté par votre taux de
          prélèvement à la source — recalculé au 1er septembre 2026, comme
          expliqué dans{" "}
          <Link href="/actualites/nouveau-taux-prelevement-source-septembre-2026" className="text-primary underline-offset-4 hover:underline">
            notre article dédié
          </Link>
          . Et si la déclaration 2026 vous a valu un remboursement ou un solde,
          le mécanisme est détaillé dans le guide{" "}
          <Link href="/guides/remboursement-impot" className="text-primary underline-offset-4 hover:underline">
            remboursement d&apos;impôt
          </Link>
          .
        </p>
      </section>
    </GuideShell>
  );
}
