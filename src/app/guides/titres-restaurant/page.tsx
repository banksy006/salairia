import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ReceiptIcon, ScaleIcon, CalendarIcon, AlertTriangleIcon } from "@/components/icons";

// Plafond d'exonération de la part patronale — LF 2026. Vérifié le 25 août 2026.
const PLAFOND_EXO = 7.32;
// Valeur du titre pour une exonération maximale selon la part employeur (50 à 60 %).
const TITRE_MAX_60 = PLAFOND_EXO / 0.6;
const TITRE_MAX_50 = PLAFOND_EXO / 0.5;
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "titres-restaurant",
  titre: "Titres-restaurant : plafonds 2026 et la question qui fâche pour 2027",
  sousTitre: `Exonération patronale jusqu'à ${EUR2.format(PLAFOND_EXO)} par titre — et la fin annoncée des courses en supermarché`,
  chapo: `Neuf millions de salariés utilisent des titres-restaurant, et deux échéances les concernent directement : le plafond d'exonération de la part patronale, porté à ${EUR2.format(PLAFOND_EXO)} par titre en 2026, et surtout la dérogation qui permet de payer toutes ses courses alimentaires en titres — prolongée jusqu'au 31 décembre 2026 seulement. Sans nouveau texte d'ici décembre, les caddies de supermarché redeviendront hors-jeu au 1er janvier 2027. Le point complet, côté salarié et côté employeur.`,
  filAriane: "Titres-restaurant",
  datePublished: "2026-08-25",
  dateModified: "2026-08-25",
  tocItems: [
    { id: "regles", label: "Les règles 2026" },
    { id: "valeur", label: "La valeur optimale d'un titre" },
    { id: "courses", label: "Courses : la fin annoncée" },
    { id: "droits", label: "Vos droits en pratique" },
  ],
  faq: [
    {
      q: "Quel est le plafond d'exonération des titres-restaurant en 2026 ?",
      r: `La participation de l'employeur est exonérée de cotisations sociales et d'impôt jusqu'à ${EUR2.format(PLAFOND_EXO)} par titre en 2026 (contre 7,26 € en 2025), à condition qu'elle représente entre 50 et 60 % de la valeur du titre. Concrètement, l'exonération maximale est atteinte avec un titre de ${EUR2.format(TITRE_MAX_60)} (employeur à 60 %) à ${EUR2.format(TITRE_MAX_50)} (employeur à 50 %). Au-delà, ou hors de la fourchette 50-60 %, l'excédent de part patronale est réintégré dans l'assiette des cotisations.`,
    },
    {
      q: "Pourra-t-on encore payer ses courses en titres-restaurant en 2027 ?",
      r: "Rien n'est moins sûr, et c'est LE dossier de la fin d'année. Par dérogation née pendant le Covid et prolongée plusieurs fois — la dernière fois jusqu'au 31 décembre 2026 —, les titres permettent d'acheter tous les produits alimentaires en grande surface, y compris non directement consommables (pâtes, riz, farine, conserves). Sans nouvelle prolongation votée d'ici décembre, retour au régime de base au 1er janvier 2027 : uniquement les préparations directement consommables, sandwichs, salades et plats préparés. Un projet de réforme pérenne du dispositif est régulièrement annoncé ; cette page sera mise à jour dès qu'un texte est adopté.",
    },
    {
      q: "Combien puis-je dépenser par jour en titres-restaurant ?",
      r: "Le plafond d'utilisation est de 25 € par jour depuis octobre 2022. Les titres sont utilisables les jours travaillés ; leur usage le dimanche et les jours fériés est en principe réservé aux salariés qui travaillent ces jours-là — la carte est paramétrée en conséquence. Un titre est attribué par jour de travail comprenant une pause repas : les jours de congé, d'arrêt maladie ou de déplacement avec repas remboursés aux frais réels n'y ouvrent pas droit.",
    },
    {
      q: "Le télétravail donne-t-il droit aux titres-restaurant ?",
      r: "Oui. Le principe d'égalité de traitement s'applique : un télétravailleur dont la journée comprend une pause repas a droit à son titre-restaurant dans les mêmes conditions que s'il était sur site. La jurisprudence l'a confirmé et le BOSS l'a intégré. Un employeur qui réserve les titres aux jours de présence sur site s'expose à un rappel — sauf accord collectif organisant un dispositif différent mais équivalent (indemnité repas, restaurant d'entreprise).",
    },
    {
      q: "L'employeur est-il obligé de proposer des titres-restaurant ?",
      r: "Non — aucun texte n'impose les titres-restaurant. L'obligation de l'employeur se limite à donner aux salariés un moyen de se restaurer (local de restauration au-delà de certains effectifs). Le titre-restaurant est un avantage facultatif, mais une fois mis en place, il doit bénéficier à tous les salariés placés dans une situation comparable, stagiaires et intérimaires compris. Sa valeur et la répartition employeur/salarié relèvent de la décision de l'entreprise ou de l'accord collectif, dans la fourchette légale de 50 à 60 %.",
    },
  ],
  sources: [
    { label: "URSSAF — les titres-restaurant (conditions d'exonération)", href: "https://www.urssaf.fr/accueil/employeur/verser-remuneration/titres-restaurant.html" },
    { label: "BOSS — avantages en nature et frais professionnels", href: "https://boss.gouv.fr/portail/accueil/avantages-en-nature-et-frais-pro.html" },
    { label: "service-public.fr — titres-restaurant : utilisation", href: "https://www.service-public.fr/particuliers/vosdroits/F21059" },
    { label: "economie.gouv.fr — prolongation de l'utilisation dérogatoire jusqu'au 31 décembre 2026", href: "https://www.economie.gouv.fr/actualites/titres-restaurant-produits-alimentaires" },
  ],
};

export const metadata: Metadata = {
  title: `Titres-restaurant 2026-2027 : plafond ${EUR2.format(PLAFOND_EXO)}, et la fin des courses en supermarché ?`,
  description: `Plafond d'exonération patronale à ${EUR2.format(PLAFOND_EXO)}/titre en 2026, titre optimal entre ${EUR2.format(TITRE_MAX_60)} et ${EUR2.format(TITRE_MAX_50)}, plafond d'usage de 25 €/jour — et la dérogation courses alimentaires qui expire le 31 décembre 2026. Droits du télétravailleur inclus.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Titres-restaurant : plafonds 2026 et la question qui fâche pour 2027",
    description: "Exonération, valeur optimale, télétravail — et la fin annoncée des courses en titres.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="regles" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Les règles 2026 en quatre chiffres
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: EUR2.format(PLAFOND_EXO), l: "part patronale exonérée, par titre (2026)" },
            { v: "50 – 60 %", l: "part de l'employeur dans la valeur du titre (condition d'exonération)" },
            { v: "25 €", l: "plafond d'utilisation par jour" },
            { v: "31/12/2026", l: "fin programmée de la dérogation « courses alimentaires »" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le titre-restaurant est cofinancé : l&apos;employeur prend 50 à
          60 %, le salarié le reste, prélevé sur la paie. La part patronale
          est exonérée de cotisations et d&apos;impôt dans la limite du
          plafond — c&apos;est ce qui en fait l&apos;un des avantages les plus
          efficaces fiscalement : pour l&apos;employeur, un euro de titre
          coûte moins cher qu&apos;un euro de salaire ; pour le salarié, il
          vaut un euro plein, net de tout.
        </p>
      </section>

      <section id="valeur" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          La valeur optimale d&apos;un titre — et ce qu&apos;elle vaut en salaire
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;exonération maximale est atteinte quand la part patronale
            touche le plafond de {EUR2.format(PLAFOND_EXO)} : cela correspond
            à un titre de <strong>{EUR2.format(TITRE_MAX_60)}</strong> si
            l&apos;employeur finance 60 %, et de{" "}
            <strong>{EUR2.format(TITRE_MAX_50)}</strong> s&apos;il finance
            50 %. C&apos;est pourquoi tant d&apos;entreprises calent leur
            titre entre 12 et 14,50 € : en dessous, elles laissent de
            l&apos;exonération sur la table ; au-dessus, l&apos;excédent
            patronal redevient du salaire chargé.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Côté salarié, l&apos;ordre de grandeur mérite d&apos;être connu
            pour les négociations : 18 titres mensuels à{" "}
            {EUR2.format(TITRE_MAX_60)} représentent ~{EUR2.format(18 * PLAFOND_EXO)}{" "}
            de part patronale nette par mois — soit l&apos;équivalent
            d&apos;environ 220 € de salaire brut, cotisations et impôt
            déduits. Un package « titre-resto généreux » n&apos;est pas un
            gadget ; notre{" "}
            <Link href="/simulateurs/negociation-salariale" className="text-primary underline-offset-4 hover:underline">
              simulateur de négociation
            </Link>{" "}
            aide à comparer les packages au-delà du seul fixe.
          </p>
        </div>
      </section>

      <section id="courses" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Courses en supermarché : la fin annoncée au 31 décembre 2026
        </h2>
        <div className="mt-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Depuis 2022, une dérogation permet de payer{" "}
            <strong>tous les produits alimentaires</strong> en
            titres-restaurant — y compris pâtes, riz, œufs, conserves, farine,
            tout ce qui n&apos;est pas « directement consommable ». Prolongée
            en janvier 2025 <strong>jusqu&apos;au 31 décembre 2026</strong>,
            elle expire dans quatre mois. Sans nouveau texte : retour au
            régime d&apos;origine au 1er janvier 2027 — plats préparés,
            sandwichs, salades, fruits et produits laitiers, mais plus de
            caddie complet. Pour les foyers qui utilisent leurs titres comme
            complément de budget courses (l&apos;usage réel majoritaire), le
            manque à gagner se chiffrerait en dizaines d&apos;euros par mois.
            Une réforme pérenne du dispositif est en discussion ; cette page
            sera mise à jour dès qu&apos;un texte est voté — c&apos;est
            l&apos;un des dossiers suivis dans notre{" "}
            <Link href="/guides/ce-qui-change-1er-janvier-2027" className="underline underline-offset-4">
              récapitulatif du 1er janvier 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="droits" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Vos droits en pratique
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Un titre par jour travaillé</strong> avec pause repas — télétravail compris, à égalité avec le présentiel. Pas de titre les jours de congé, d&apos;arrêt ou de déplacement défrayé.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>La péremption n&apos;est pas une perte sèche</strong> : les titres de l&apos;année expirent fin février de l&apos;année suivante, et les montants non utilisés des cartes doivent être réémis sur demande dans les 15 jours suivant la péremption.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Le salarié peut refuser</strong> les titres-restaurant (la part salariale est un prélèvement sur salaire consenti) — rarement pertinent vu l&apos;avantage net, sauf usage réellement nul.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>En cas de départ</strong>, les titres restants vous appartiennent ; l&apos;employeur rembourse la part salariale des titres non attribués. Un point souvent oublié dans les soldes de tout compte — comme le rappelle notre guide <Link href="/guides/indemnite-rupture-conventionnelle" className="text-primary underline-offset-4 hover:underline">rupture conventionnelle</Link>.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
