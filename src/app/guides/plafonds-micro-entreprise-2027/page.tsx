import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ScaleIcon, CalendarIcon, PercentIcon, AlertTriangleIcon } from "@/components/icons";
import { AE_2026 } from "@/lib/calculators/auto-entrepreneur";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const PCT = (x: number) => `${(x * 100).toLocaleString("fr-FR")} %`;

const meta: GuideMeta = {
  slug: "plafonds-micro-entreprise-2027",
  titre: "Plafonds micro-entreprise 2027 : ce qui est figé, ce qui peut bouger",
  sousTitre: `${EUR.format(AE_2026.PLAFOND_BNC)} et ${EUR.format(AE_2026.PLAFOND_BIC_VENTE)} : les plafonds de CA sont fixés jusqu'en 2028 — mais pas le reste`,
  chapo: "Contrairement au SMIC ou au barème de l'impôt, les plafonds de chiffre d'affaires de la micro-entreprise ne changent pas chaque 1er janvier : ils sont revalorisés tous les trois ans, et la période 2026-2028 est déjà fixée. La vraie question pour 2027 est ailleurs — dans les taux de cotisations, que la loi de financement de la Sécurité sociale peut modifier chaque année, et dans les seuils de TVA. Le point complet sur ce qui est verrouillé et ce qui reste ouvert.",
  filAriane: "Plafonds micro 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-08-25",
  tocItems: [
    { id: "figes", label: "Ce qui est figé jusqu'en 2028" },
    { id: "mobile", label: "Ce qui peut bouger en 2027" },
    { id: "precedent", label: "Le précédent de 2026" },
    { id: "anticiper", label: "Comment anticiper" },
  ],
  faq: [
    {
      q: "Les plafonds de la micro-entreprise vont-ils changer au 1er janvier 2027 ?",
      r: `Non. Les plafonds de chiffre d'affaires sont revalorisés tous les trois ans, dans la même proportion que le barème de l'impôt sur le revenu, et la période triennale en cours couvre 2026, 2027 et 2028 : ${EUR.format(AE_2026.PLAFOND_BNC)} pour les prestations de services et professions libérales, ${EUR.format(AE_2026.PLAFOND_BIC_VENTE)} pour la vente de marchandises. Prochaine revalorisation : au 1er janvier 2029. Ce qui peut changer en 2027, ce sont les taux de cotisations (par la LFSS) et les seuils de franchise de TVA (par la loi de finances).`,
    },
    {
      q: "Quels sont les taux de cotisations actuels, et peuvent-ils augmenter en 2027 ?",
      r: `Les taux 2026 : ${PCT(AE_2026.TAUX_BIC_VENTE)} pour la vente, ${PCT(AE_2026.TAUX_BIC_SERVICES)} pour les services commerciaux, ${PCT(AE_2026.TAUX_BNC_REGIME_GENERAL)} pour les professions libérales non réglementées (BNC) et ${PCT(AE_2026.TAUX_BNC_CIPAV)} pour les activités relevant de la Cipav. Oui, ils peuvent bouger : le taux BNC est passé de 23,1 % à 24,6 % en 2025 puis à 25,6 % en 2026, par paliers programmés pour financer la retraite complémentaire des indépendants. Le projet de LFSS 2027, présenté fin septembre 2026, dira s'il y a une nouvelle marche — cette page sera mise à jour à ce moment-là.`,
    },
    {
      q: "Et les seuils de franchise de TVA ?",
      r: `En 2026 : ${EUR.format(AE_2026.FRANCHISE_TVA_SERVICES)} pour les services (tolérance ${EUR.format(AE_2026.FRANCHISE_TVA_SERVICES_TOLERANCE)}) et ${EUR.format(AE_2026.FRANCHISE_TVA_VENTE)} pour la vente (tolérance ${EUR.format(AE_2026.FRANCHISE_TVA_VENTE_TOLERANCE)}). Ces seuils relèvent de la loi de finances et ont fait l'objet de vifs débats — le projet d'un seuil unique abaissé à 25 000 € a été proposé puis suspendu en 2025. Le sujet peut revenir dans le PLF 2027 : c'est le principal risque réglementaire à surveiller pour les micro-entrepreneurs en services entre 25 000 et 37 500 € de CA.`,
    },
    {
      q: "Dépasser le plafond en 2027, qu'est-ce que ça déclenche exactement ?",
      r: "Le régime micro tolère un dépassement sur une année : vous conservez le statut si votre CA de l'année précédente reste sous le plafond. C'est le dépassement deux années civiles consécutives qui fait basculer au régime réel (entreprise individuelle classique) au 1er janvier suivant. La TVA suit une logique différente et plus rapide : au-delà du seuil de tolérance, la TVA est due dès le premier jour du mois de dépassement — en cours d'année. Beaucoup confondent les deux mécanismes ; notre simulateur auto-entrepreneur affiche des alertes distinctes pour chacun.",
    },
    {
      q: "L'ACRE et le versement libératoire changent-ils en 2027 ?",
      r: "Rien n'est annoncé à date. Les paramètres 2026 : ACRE réduite à 25 % d'exonération des cotisations la première année (contre 50 % auparavant), à demander dans les 60 jours du début d'activité ; versement libératoire de l'impôt à 1 %, 1,7 % ou 2,2 % du CA selon l'activité, sous condition de revenu fiscal de référence. Ces deux dispositifs relèvent de textes que la LFSS et la LF peuvent retoucher chaque année — l'ACRE a déjà été rabotée deux fois depuis 2020, ce qui invite à ne jamais construire un business plan sur sa pérennité.",
    },
  ],
  sources: [
    { label: "URSSAF — 2026 : modification des seuils de chiffre d'affaires", href: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/toutes-les-actualites/2026--modification-des-seuils-de.html" },
    { label: "CGI, art. 50-0 — régime micro-BIC (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048844580" },
    { label: "CGI, art. 293 B — franchise en base de TVA (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051222513" },
    { label: "URSSAF — taux de cotisations des auto-entrepreneurs", href: "https://www.urssaf.fr/accueil/actualites/taux-cotisations-autoentrepeneur.html" },
  ],
};

export const metadata: Metadata = {
  title: `Plafonds micro-entreprise 2027 : ${EUR.format(AE_2026.PLAFOND_BNC)} et ${EUR.format(AE_2026.PLAFOND_BIC_VENTE)}, figés jusqu'en 2028`,
  description: `Les plafonds de CA micro sont triennaux et fixés pour 2026-2028 : ils ne changeront pas en 2027. Ce qui peut bouger : les taux de cotisations (précédent : BNC passé à ${PCT(AE_2026.TAUX_BNC_REGIME_GENERAL)} en 2026) et les seuils de franchise TVA. Mécanismes de dépassement expliqués.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Plafonds micro-entreprise 2027 : ce qui est figé, ce qui peut bouger",
    description: "Plafonds triennaux verrouillés jusqu'en 2028, taux de cotisations et TVA à surveiller.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="figes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Ce qui est figé jusqu&apos;au 31 décembre 2028
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Activité</th>
                <th className="px-5 py-4 text-right">Plafond de CA (2026-2028)</th>
                <th className="px-5 py-4 text-right">Abattement fiscal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Vente de marchandises (BIC)", EUR.format(AE_2026.PLAFOND_BIC_VENTE), "71 %"],
                ["Prestations de services commerciales (BIC)", EUR.format(AE_2026.PLAFOND_BIC_SERVICES), "50 %"],
                ["Professions libérales (BNC)", EUR.format(AE_2026.PLAFOND_BNC), "34 %"],
              ].map(([a, p, ab]) => (
                <tr key={a} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{a}</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{p}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{ab}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La revalorisation des plafonds est <strong>triennale</strong>,
          indexée sur le barème de l&apos;impôt : dernière en date au 1er
          janvier 2026 (les services sont passés de 77 700 € à{" "}
          {EUR.format(AE_2026.PLAFOND_BNC)}), prochaine au{" "}
          <strong>1er janvier 2029</strong>. Quiconque vous annonce de
          « nouveaux plafonds micro 2027 » confond avec autre chose — ou
          recycle un article de 2026.
        </p>
      </section>

      <section id="mobile" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Ce qui peut bouger en 2027 — et par quel texte
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les taux de cotisations</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Fixés par décret dans le cadre de la LFSS, votée en décembre.
              Taux 2026 : {PCT(AE_2026.TAUX_BIC_VENTE)} vente,{" "}
              {PCT(AE_2026.TAUX_BIC_SERVICES)} services,{" "}
              {PCT(AE_2026.TAUX_BNC_REGIME_GENERAL)} BNC,{" "}
              {PCT(AE_2026.TAUX_BNC_CIPAV)} Cipav. Le BNC a déjà pris deux
              marches (2025, 2026) — une troisième n&apos;est pas exclue.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les seuils de TVA</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Loi de finances. Seuils 2026 :{" "}
              {EUR.format(AE_2026.FRANCHISE_TVA_SERVICES)} services /{" "}
              {EUR.format(AE_2026.FRANCHISE_TVA_VENTE)} vente. Le projet de
              seuil unique à 25 000 €, suspendu en 2025, peut resurgir au PLF
              2027 — le point le plus chaud à surveiller.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">ACRE, VL, CFE</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              L&apos;ACRE (25 % d&apos;exonération, demande sous 60 jours), le
              versement libératoire et les fourchettes de{" "}
              <Link href="/guides/cfe-auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
                CFE
              </Link>{" "}
              sont retouchables chaque année. Rien d&apos;annoncé à date.
            </p>
          </div>
        </div>
      </section>

      <section id="precedent" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Le précédent de 2026 : à quoi ressemble une année de changement
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le 1er janvier 2026 illustre exactement ce qu&apos;une LFSS et une
            LF peuvent faire au régime micro en une seule fois : hausse du
            taux BNC de 24,6 % à {PCT(AE_2026.TAUX_BNC_REGIME_GENERAL)} (un
            point de marge net en moins pour tous les freelances en
            prestation intellectuelle), relèvement triennal des plafonds,
            réforme de l&apos;ACRE (exonération divisée par deux, délai de
            demande de 60 jours). Trois textes, trois effets directs sur le
            revenu — détaillés dans nos articles{" "}
            <Link href="/actualites/cotisations-auto-entrepreneur-hausse-2026" className="text-primary underline-offset-4 hover:underline">
              hausse des cotisations
            </Link>{" "}
            et{" "}
            <Link href="/actualites/acre-2026-exoneration-reduite-delai-60-jours" className="text-primary underline-offset-4 hover:underline">
              réforme de l&apos;ACRE
            </Link>
            .
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Ordre de grandeur : pour un consultant BNC à 60 000 € de CA, le
            point de cotisation supplémentaire de 2026 représente{" "}
            <strong>600 € de moins par an</strong>. Une marche équivalente en
            2027 aurait le même coût. C&apos;est ce genre d&apos;écart —
            silencieux, sans courrier — qui justifie de refaire sa simulation
            chaque janvier.
          </p>
        </div>
      </section>

      <section id="anticiper" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Comment anticiper sans paniquer
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Fin septembre 2026</strong> : lecture des projets de LFSS et LF 2027 — les hausses de taux y figurent en clair. Cette page et notre <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">récapitulatif du 1er janvier 2027</Link> seront mis à jour dès la présentation.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Si vous êtes entre 25 000 et 37 500 € de CA en services</strong> : c&apos;est vous que le débat TVA concerne. Préparez le scénario « assujetti » (facturation TTC, déclarations, récupération de TVA sur vos achats) sans l&apos;activer — un après-midi de préparation, zéro engagement.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Si vous frôlez le plafond de CA</strong> : le sujet n&apos;est pas 2027 (plafonds figés) mais votre trajectoire — au-delà de {EUR.format(AE_2026.PLAFOND_BNC)} durablement, la vraie question est le passage en société. Notre <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">comparateur de statuts</Link> chiffre le point de bascule, et le <Link href="/simulateurs/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">simulateur auto-entrepreneur</Link> vous alerte sur chaque seuil au fil de l&apos;eau.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
