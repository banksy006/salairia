import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, CalendarIcon, PercentIcon, InfoIcon } from "@/components/icons";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// Valeur mensuelle du point d'indice majoré, gelée depuis le 1er juillet 2023.
// Sources : décret n° 2023-519 du 28 juin 2023 ; DGAFP. Vérifié le 29 août 2026.
const POINT_MENSUEL = 4.92278;
const POINT_ANNUEL = POINT_MENSUEL * 12;

// Exemples d'indices majorés couvrant le spectre des carrières.
const EXEMPLES = [
  { im: 366, profil: "Début de catégorie C" },
  { im: 400, profil: "Catégorie C confirmée" },
  { im: 450, profil: "Catégorie B en milieu de carrière" },
  { im: 500, profil: "Catégorie B en fin de grade" },
  { im: 600, profil: "Catégorie A (attaché, professeur certifié)" },
  { im: 800, profil: "Catégorie A en fin de carrière" },
];

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const brut = (im: number) => im * POINT_MENSUEL;

const meta: GuideMeta = {
  slug: "point-indice-fonction-publique",
  titre: "Point d'indice de la fonction publique : valeur, calcul et gel",
  sousTitre: `${EUR2.format(POINT_MENSUEL)} par point et par mois — inchangé depuis le 1er juillet 2023`,
  chapo: `Le traitement d'un fonctionnaire ne se négocie pas : il se calcule. Indice majoré multiplié par la valeur du point, point final. Cette valeur est gelée à ${EUR2.format(POINT_MENSUEL)} depuis le 1er juillet 2023 — trois années consécutives sans revalorisation, alors que les prix, eux, ont continué de monter. Voici la formule exacte, ce qu'elle donne pour six niveaux de carrière, et l'état des discussions pour 2027.`,
  filAriane: "Point d'indice",
  datePublished: "2026-08-29",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "valeur", label: "La valeur du point" },
    { id: "calcul", label: "Calculer son traitement" },
    { id: "gel", label: "Trois ans de gel" },
    { id: "2027", label: "Ce qui peut changer en 2027" },
  ],
  faq: [
    {
      q: "Quelle est la valeur du point d'indice de la fonction publique ?",
      r: `${EUR2.format(POINT_MENSUEL)} bruts par point et par mois, soit ${EUR2.format(POINT_ANNUEL)} en valeur annuelle. Cette valeur est identique dans les trois versants — fonction publique d'État, territoriale et hospitalière — et n'a pas bougé depuis le 1er juillet 2023, date de la dernière revalorisation (+1,5 %). Le gel a été confirmé pour 2026, ce qui en fait la troisième année consécutive sans hausse.`,
    },
    {
      q: "Comment calculer son traitement brut à partir de son indice ?",
      r: `La formule est simple : traitement brut mensuel = indice majoré × ${EUR2.format(POINT_MENSUEL)}. Un agent à l'indice majoré 400 perçoit donc ${EUR.format(brut(400))} bruts par mois, un agent à l'IM 600 ${EUR.format(brut(600))}. Attention à ne pas confondre l'indice brut (celui de la grille statutaire, souvent le plus visible) et l'indice majoré (celui qui sert au calcul) : une table de correspondance officielle relie les deux. C'est l'indice majoré, et lui seul, qui figure sur votre bulletin de paie et qu'il faut utiliser.`,
    },
    {
      q: "Le traitement indiciaire, est-ce tout mon salaire ?",
      r: "Non, et c'est une source fréquente de confusion. Le traitement indiciaire est le socle, auquel s'ajoutent selon les situations : l'indemnité de résidence, le supplément familial de traitement, et surtout le régime indemnitaire (RIFSEEP dans l'État, primes diverses ailleurs), qui peut représenter de 10 % à plus de 40 % de la rémunération selon le corps et le poste. Deux agents au même indice peuvent donc avoir des fiches de paie sensiblement différentes. C'est aussi pourquoi le gel du point pèse inégalement : il ne touche que la partie indiciaire.",
    },
    {
      q: "Pourquoi le point d'indice est-il gelé depuis 2023 ?",
      r: "C'est un levier budgétaire massif : la masse salariale publique représente plus de 300 milliards d'euros par an, et un point de revalorisation coûte environ 2 milliards. Dans un contexte de réduction du déficit, les gouvernements successifs ont privilégié des mesures ciblées — revalorisations de grilles, points d'indice supplémentaires pour les bas salaires, primes — plutôt qu'une hausse générale de la valeur du point. Le gel a été confirmé lors du Conseil supérieur de la fonction publique territoriale de décembre 2025 pour l'année 2026.",
    },
    {
      q: "Le point d'indice va-t-il augmenter en 2027 ?",
      r: "Aucun calendrier officiel de dégel n'a été annoncé à ce jour. Le sujet dépend du projet de loi de finances 2027, présenté fin septembre 2026, et des négociations salariales de la fonction publique. Les organisations syndicales demandent une indexation sur l'inflation ; le débat porte plutôt, côté gouvernement, sur des mesures ciblées. Cette page sera mise à jour dès qu'un texte ou une annonce officielle intervient — comme les autres échéances suivies dans notre récapitulatif du 1er janvier 2027.",
    },
  ],
  sources: [
    { label: "Décret n° 2023-519 du 28 juin 2023 — valeur du point (Légifrance)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047747449" },
    { label: "DGAFP — rémunération dans la fonction publique", href: "https://www.fonction-publique.gouv.fr/etre-agent-public/ma-remuneration" },
    { label: "service-public.fr — traitement indiciaire d'un fonctionnaire", href: "https://www.service-public.fr/particuliers/vosdroits/F465" },
    { label: "INSEE — indice des prix à la consommation", href: "https://www.insee.fr/fr/statistiques/serie/001763852" },
  ],
};

export const metadata: Metadata = {
  title: `Point d'indice fonction publique : ${EUR2.format(POINT_MENSUEL)}, gelé depuis 2023`,
  description: `La valeur du point d'indice majoré est de ${EUR2.format(POINT_MENSUEL)} bruts par mois, inchangée depuis le 1er juillet 2023. La formule de calcul du traitement, six exemples chiffrés de l'IM 366 à l'IM 800, l'effet du gel sur le pouvoir d'achat et l'état des discussions pour 2027.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Point d'indice fonction publique : valeur, calcul et gel",
    description: "La formule, six exemples chiffrés, et ce qui peut changer en 2027.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="valeur" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          La valeur du point, et ce qu&apos;elle recouvre
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: EUR2.format(POINT_MENSUEL), l: "valeur mensuelle du point d'indice majoré" },
            { v: EUR2.format(POINT_ANNUEL), l: "valeur annuelle correspondante" },
            { v: "1er juillet 2023", l: "date de la dernière revalorisation (+1,5 %)" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Cette valeur unique s&apos;applique aux <strong>trois versants</strong>{" "}
          de la fonction publique — État, territoriale, hospitalière — et à
          l&apos;ensemble des corps et cadres d&apos;emplois. C&apos;est ce qui
          fait du point d&apos;indice le paramètre le plus structurant de la
          rémunération publique : un seul chiffre, environ 5,7 millions
          d&apos;agents concernés.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Calculer son traitement : une multiplication
        </h2>
        <div className="mt-4 rounded-xl bg-muted p-5 text-center">
          <p className="text-lg font-semibold text-foreground">
            Traitement brut mensuel = indice majoré × {EUR2.format(POINT_MENSUEL)}
          </p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Indice majoré</th>
                <th className="px-5 py-4">Profil indicatif</th>
                <th className="px-5 py-4 text-right">Traitement brut mensuel</th>
                <th className="px-5 py-4 text-right">Rapport au SMIC</th>
              </tr>
            </thead>
            <tbody>
              {EXEMPLES.map((e) => (
                <tr key={e.im} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold tabular-nums text-foreground">IM {e.im}</td>
                  <td className="px-5 py-3 text-foreground/80">{e.profil}</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{EUR.format(brut(e.im))}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">
                    {(brut(e.im) / SALAIRE_2026.SMIC_MENSUEL_BRUT).toFixed(2)}×
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Deux précautions de lecture. D&apos;abord, ne confondez pas{" "}
          <strong>indice brut</strong> (celui des grilles statutaires) et{" "}
          <strong>indice majoré</strong> (celui du calcul) : seul le second sert
          ici, et il figure sur votre bulletin. Ensuite, ce traitement n&apos;est
          que le socle : primes, indemnité de résidence et supplément familial
          s&apos;y ajoutent. Pour convertir ce brut en net, notre{" "}
          <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
            simulateur brut/net
          </Link>{" "}
          donne un ordre de grandeur — les taux de cotisation des agents
          titulaires diffèrent toutefois de ceux du privé (retraite
          additionnelle RAFP, pas de cotisation chômage).
        </p>
      </section>

      <section id="gel" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Trois ans de gel : ce que ça représente
        </h2>
        <div className="mt-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Depuis le 1er juillet 2023, la valeur du point n&apos;a pas bougé
            — 2024, 2025 et 2026 sans revalorisation, le gel de 2026 ayant été
            confirmé en décembre 2025. Pendant ce temps, les prix ont continué
            de progresser : pour un agent dont l&apos;indice n&apos;a pas changé
            sur la période, les estimations situent la{" "}
            <strong>perte de pouvoir d&apos;achat entre 8 et 10 %</strong>. À
            l&apos;IM 400, cela représente l&apos;équivalent de{" "}
            {EUR.format(brut(400) * 0.09)} de traitement mensuel évaporé par
            l&apos;inflation.
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Une nuance importante : geler le point ne signifie pas que{" "}
          <em>toutes</em> les rémunérations publiques stagnent. Les
          gouvernements ont privilégié des mesures ciblées — revalorisation de
          grilles indiciaires, attribution de points supplémentaires aux bas
          salaires pour rester au-dessus du SMIC, extension du régime
          indemnitaire. Un agent qui a changé d&apos;échelon ou bénéficié
          d&apos;une refonte de grille a pu voir son traitement augmenter malgré
          le gel. Celui dont l&apos;indice n&apos;a pas bougé, non.
        </p>
      </section>

      <section id="2027" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce qui peut changer en 2027
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Aucun calendrier de dégel n&apos;a été annoncé à ce jour, et toute
            page qui affiche un pourcentage pour 2027 l&apos;invente. Ce qui est
            certain, c&apos;est le circuit de décision : la valeur du point est
            fixée par <strong>décret</strong>, sans indexation automatique — à
            la différence du{" "}
            <Link href="/guides/smic-2027" className="text-primary underline-offset-4 hover:underline">
              SMIC
            </Link>{" "}
            (indexé sur l&apos;inflation) ou du{" "}
            <Link href="/guides/plafond-securite-sociale-2027" className="text-primary underline-offset-4 hover:underline">
              plafond de la Sécurité sociale
            </Link>{" "}
            (indexé sur le salaire moyen). C&apos;est une décision politique
            pure, arbitrée dans le projet de loi de finances.
          </p>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Fin septembre 2026</strong> : présentation du PLF 2027 — c&apos;est là qu&apos;apparaîtrait une éventuelle enveloppe de revalorisation.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Automne 2026</strong> : rendez-vous salarial de la fonction publique et instances consultatives (CSFPT, CSFPE).</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Décembre 2026</strong> : promulgation de la loi de finances, puis publication du décret si dégel il y a.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Cette page affichera la nouvelle valeur dès la parution du décret au
            Journal officiel. Les autres paramètres qui bougeront au 1er janvier
            — SMIC, plafond Sécu, barème de l&apos;impôt — sont suivis dans notre{" "}
            <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
              récapitulatif du 1er janvier 2027
            </Link>
            .
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
