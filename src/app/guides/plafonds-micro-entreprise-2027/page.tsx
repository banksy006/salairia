import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ScaleIcon, CalendarIcon, PercentIcon, AlertTriangleIcon, ReceiptIcon } from "@/components/icons";
import { AE_2026 } from "@/lib/calculators/auto-entrepreneur";

// Fin du régime simplifié de TVA : loi de finances pour 2025, art. 38.
// Déclarations CA3 trimestrielles si CA + acquisitions taxables ≤ 1 000 000 €
// l'année précédente (1 100 000 € l'année en cours), mensuelles au-delà.
// Source : impots.gouv.fr, actualité du 22 septembre 2026. Vérifié le 8 octobre 2026.
const SEUIL_CA3_TRIMESTRIELLE = 1_000_000;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const PCT = (x: number) => `${(x * 100).toLocaleString("fr-FR")} %`;

const meta: GuideMeta = {
  slug: "plafonds-micro-entreprise-2027",
  titre: "Plafonds micro-entreprise 2027 : ce que le budget change, et ce qu'il ne change pas",
  sousTitre: `${EUR.format(AE_2026.PLAFOND_BNC)} et ${EUR.format(AE_2026.PLAFOND_BIC_VENTE)} figés jusqu'en 2028, taux et seuils de TVA inchangés — le vrai changement de 2027 est déclaratif`,
  chapo: "Les projets de loi de finances et de financement de la Sécurité sociale pour 2027, présentés le 1er octobre 2026, ne touchent ni aux plafonds de chiffre d'affaires, ni aux seuils de franchise de TVA, ni aux taux de cotisations du régime micro. Le seuil unique à 25 000 €, qui avait inquiété tant de freelances, a été définitivement abrogé en novembre 2025. Le changement qui attend vraiment les micro-entrepreneurs en 2027 est ailleurs : la fin du régime simplifié de TVA, qui fait passer ceux qui y sont soumis à des déclarations trimestrielles. Le point complet, texte par texte.",
  filAriane: "Plafonds micro 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-10-08",
  tocItems: [
    { id: "figes", label: "Les plafonds, figés jusqu'en 2028" },
    { id: "budget", label: "Ce que le budget 2027 prévoit" },
    { id: "tva", label: "Le vrai changement : la TVA" },
    { id: "precedent", label: "Le précédent de 2026" },
    { id: "anticiper", label: "Comment s'y préparer" },
  ],
  faq: [
    {
      q: "Les plafonds de la micro-entreprise vont-ils changer au 1er janvier 2027 ?",
      r: `Non. Les plafonds de chiffre d'affaires sont revalorisés tous les trois ans, dans la même proportion que le barème de l'impôt sur le revenu, et la période triennale en cours couvre 2026, 2027 et 2028 : ${EUR.format(AE_2026.PLAFOND_BNC)} pour les prestations de services et professions libérales, ${EUR.format(AE_2026.PLAFOND_BIC_VENTE)} pour la vente de marchandises. Le projet de loi de finances pour 2027 n'y touche pas. Prochaine revalorisation : au 1er janvier 2029.`,
    },
    {
      q: "Les taux de cotisations des micro-entrepreneurs augmentent-ils en 2027 ?",
      r: `Aucune hausse n'est programmée. Les taux 2026 restent en vigueur : ${PCT(AE_2026.TAUX_BIC_VENTE)} pour la vente, ${PCT(AE_2026.TAUX_BIC_SERVICES)} pour les services commerciaux, ${PCT(AE_2026.TAUX_BNC_REGIME_GENERAL)} pour les professions libérales relevant du régime général et ${PCT(AE_2026.TAUX_BNC_CIPAV)} pour la Cipav. La trajectoire de hausse du taux BNC, fixée par décret, s'est achevée au 1er janvier 2026 — un décret de septembre 2025 l'a arrêtée à 25,6 % au lieu des 26,1 % prévus —, et le projet de LFSS 2027 déposé le 1er octobre ne contient aucune mesure sur le régime micro-social. Un nouveau décret reste juridiquement possible, mais rien n'est annoncé.`,
    },
    {
      q: "Les seuils de franchise de TVA changent-ils en 2027 ?",
      r: `Non. Ils restent à ${EUR.format(AE_2026.FRANCHISE_TVA_SERVICES)} pour les services (tolérance ${EUR.format(AE_2026.FRANCHISE_TVA_SERVICES_TOLERANCE)}) et ${EUR.format(AE_2026.FRANCHISE_TVA_VENTE)} pour la vente (tolérance ${EUR.format(AE_2026.FRANCHISE_TVA_VENTE_TOLERANCE)}). Le seuil unique abaissé à 25 000 €, voté dans la loi de finances pour 2025 puis suspendu, n'est jamais entré en vigueur : la loi n° 2025-1044 du 3 novembre 2025 l'a abrogé et a pérennisé ces seuils. Le projet de loi de finances pour 2027 ne propose aucune modification de la franchise.`,
    },
    {
      q: "Qu'est-ce qui change pour la TVA des micro-entrepreneurs en 2027 ?",
      r: `Les déclarations, pas les seuils. Le régime simplifié de TVA — une déclaration annuelle CA12 et deux acomptes — est supprimé au 1er janvier 2027 par l'article 38 de la loi de finances pour 2025. Les micro-entrepreneurs redevables de la TVA, parce qu'ils ont dépassé la franchise ou y ont renoncé, basculent automatiquement au régime réel normal : une déclaration CA3 chaque trimestre tant que leur chiffre d'affaires reste sous ${EUR.format(SEUIL_CA3_TRIMESTRIELLE)}, la première portant sur le premier trimestre 2027. La dernière CA12, pour l'année 2026, est à déposer au plus tard le 4 mai 2027. Ceux qui restent en franchise ne sont pas concernés.`,
    },
    {
      q: "L'ACRE et le versement libératoire changent-ils en 2027 ?",
      r: "Le PLF et le PLFSS 2027 ne les modifient pas. Les paramètres en vigueur : ACRE réduite à 25 % d'exonération des cotisations la première année (contre 50 % auparavant), à demander dans les 60 jours du début d'activité ; versement libératoire de l'impôt à 1 %, 1,7 % ou 2,2 % du chiffre d'affaires selon l'activité, sous condition de revenu fiscal de référence. Les deux restent retouchables par amendement pendant l'examen des textes — l'ACRE a déjà été rabotée deux fois depuis 2020, ce qui invite à ne jamais construire un business plan sur sa pérennité.",
    },
  ],
  sources: [
    { label: "impots.gouv.fr — le régime simplifié de TVA est supprimé à compter du 1er janvier 2027", href: "https://www.impots.gouv.fr/actualite/le-regime-simplifie-dimposition-la-tva-est-supprime-compter-du-1er-janvier-2027" },
    { label: "Loi n° 2025-1044 du 3 novembre 2025 — seuils de franchise en base de TVA (Légifrance)", href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052485808" },
    { label: "Loi n° 2025-127 du 14 février 2025 de finances pour 2025, art. 38 (Légifrance)", href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000051168007" },
    { label: "Projet de loi de finances pour 2027, n° 3210 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3210_projet-loi.pdf" },
    { label: "Projet de loi de financement de la Sécurité sociale pour 2027, n° 3211 (Assemblée nationale)", href: "https://www.assemblee-nationale.fr/dyn/17/textes/l17b3211_projet-loi" },
    { label: "URSSAF — 2026 : modification des seuils de chiffre d'affaires", href: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/toutes-les-actualites/2026--modification-des-seuils-de.html" },
    { label: "URSSAF — taux de cotisations des auto-entrepreneurs", href: "https://www.urssaf.fr/accueil/actualites/taux-cotisations-autoentrepeneur.html" },
  ],
};

export const metadata: Metadata = {
  title: `Plafonds micro-entreprise 2027 : ${EUR.format(AE_2026.PLAFOND_BNC)} et ${EUR.format(AE_2026.PLAFOND_BIC_VENTE)}, ce que le budget change`,
  description: `Plafonds micro figés jusqu'en 2028 (${EUR.format(AE_2026.PLAFOND_BNC)} services, ${EUR.format(AE_2026.PLAFOND_BIC_VENTE)} vente), taux de cotisations et seuils de TVA inchangés par le PLF et le PLFSS 2027, seuil à 25 000 € abrogé. Ce qui change vraiment au 1er janvier 2027 : la fin du régime simplifié de TVA et les déclarations trimestrielles.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Plafonds micro-entreprise 2027 : ce que le budget change, et ce qu'il ne change pas",
    description: "Plafonds, taux et seuils de TVA inchangés — et la fin du régime simplifié de TVA au 1er janvier.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="figes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les plafonds, figés jusqu&apos;au 31 décembre 2028
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
          <strong>1er janvier 2029</strong>. L&apos;indexation de 2,1 % du
          barème proposée par le{" "}
          <Link href="/guides/bareme-impot-2027" className="text-primary underline-offset-4 hover:underline">
            projet de loi de finances 2027
          </Link>{" "}
          n&apos;a donc aucun effet sur ces montants : quiconque vous annonce
          de « nouveaux plafonds micro 2027 » confond avec autre chose — ou
          recycle un article de 2026.
        </p>
      </section>

      <section id="budget" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Ce que le budget 2027 prévoit pour les micro-entrepreneurs
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Nous avons lu les deux textes déposés à l&apos;Assemblée nationale le
          1er octobre 2026 — le projet de loi de finances et le projet de loi de
          financement de la Sécurité sociale. Pour le régime micro, le constat
          est net : <strong>aucun des trois paramètres sensibles ne bouge</strong>.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les taux de cotisations</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Aucune mesure dans le PLFSS 2027. Restent en vigueur :{" "}
              {PCT(AE_2026.TAUX_BIC_VENTE)} vente,{" "}
              {PCT(AE_2026.TAUX_BIC_SERVICES)} services,{" "}
              {PCT(AE_2026.TAUX_BNC_REGIME_GENERAL)} BNC,{" "}
              {PCT(AE_2026.TAUX_BNC_CIPAV)} Cipav. La hausse programmée du
              taux BNC s&apos;est achevée en 2026.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Les seuils de TVA</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Aucune mesure dans le PLF 2027. Seuils pérennisés par la loi du 3
              novembre 2025 : {EUR.format(AE_2026.FRANCHISE_TVA_SERVICES)}{" "}
              services, {EUR.format(AE_2026.FRANCHISE_TVA_VENTE)} vente. Le
              seuil unique à 25 000 € a été abrogé avant d&apos;avoir jamais
              été appliqué.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">ACRE, VL, CFE</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              L&apos;ACRE (25 % d&apos;exonération, demande sous 60 jours), le
              versement libératoire et les règles de{" "}
              <Link href="/guides/cfe-auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
                CFE
              </Link>{" "}
              ne sont pas modifiés par les projets de textes.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-amber-900">
          <p className="flex items-start gap-3 text-sm leading-relaxed">
            <AlertTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <span>
              Il s&apos;agit des textes <strong>tels que déposés</strong>. Le
              débat parlementaire peut ajouter des mesures par amendement
              jusqu&apos;au vote final : c&apos;est ainsi que le seuil à 25 000 €
              était apparu dans le budget 2025. Cette page est mise à jour à
              chaque étape, jusqu&apos;à la promulgation.
            </span>
          </p>
        </div>
      </section>

      <section id="tva" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Le vrai changement de 2027 : la fin du régime simplifié de TVA
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Voté dès la loi de finances pour 2025 (article 38), il entre en
            vigueur au <strong>1er janvier 2027</strong> : le régime simplifié
            de TVA — une déclaration annuelle CA12 et deux acomptes semestriels
            — disparaît. Tous les redevables qui en relevaient basculent
            automatiquement au régime réel normal, sans démarche à faire.
          </p>
          <ul className="mt-4 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Qui est concerné</strong> : les micro-entrepreneurs qui facturent la TVA, parce qu&apos;ils ont dépassé les seuils de franchise ou y ont renoncé. Ceux qui restent en franchise (mention « TVA non applicable, art. 293 B du CGI ») ne voient aucune différence.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Ce qui remplace la CA12</strong> : une déclaration CA3 chaque trimestre tant que le chiffre d&apos;affaires reste sous {EUR.format(SEUIL_CA3_TRIMESTRIELLE)} — autant dire tous les micro-entrepreneurs —, la première portant sur le premier trimestre 2027. L&apos;option pour une déclaration mensuelle reste possible sur demande.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>La transition</strong> : une dernière CA12 au titre de 2026, à déposer au plus tard le 4 mai 2027. Ensuite, la TVA se déclare et se paie au fil des trimestres, au plus près de l&apos;encaissement — ce qui lisse la trésorerie, au prix de quatre échéances au lieu d&apos;une.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Deuxième échéance à mettre en face : le 1er septembre 2027, les
            micro-entreprises devront <strong>émettre</strong> leurs factures
            au format électronique, après l&apos;obligation de réception entrée
            en vigueur en septembre 2026 — notre{" "}
            <Link href="/actualites/facturation-electronique-1er-septembre-2026" className="text-primary underline-offset-4 hover:underline">
              article sur la facturation électronique
            </Link>{" "}
            détaille le calendrier. 2027 est donc une année d&apos;outillage
            plus que de fiscalité.
          </p>
        </div>
      </section>

      <section id="precedent" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Le précédent de 2026 : à quoi ressemble une année de changement
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le 1er janvier 2026 illustre ce qu&apos;une année chargée peut
            faire au régime micro en une seule fois : hausse du taux BNC de
            24,6 % à {PCT(AE_2026.TAUX_BNC_REGIME_GENERAL)} (un point de marge
            nette en moins pour tous les freelances en prestation
            intellectuelle), relèvement triennal des plafonds, réforme de
            l&apos;ACRE (exonération divisée par deux, délai de demande de 60
            jours). Trois textes, trois effets directs sur le revenu —
            détaillés dans nos articles{" "}
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
            <strong>600 € de moins par an</strong>. 2027 s&apos;annonce, à
            l&apos;inverse, comme une année blanche sur les taux — ce qui ne
            dispense pas de refaire sa simulation en janvier, puisque le
            barème de l&apos;impôt, lui, est réindexé.
          </p>
        </div>
      </section>

      <section id="anticiper" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Comment s&apos;y préparer
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Jusqu&apos;à fin décembre 2026</strong> : surveiller les amendements — c&apos;est par là qu&apos;une mesure micro pourrait encore apparaître. Cette page et notre <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">récapitulatif du 1er janvier 2027</Link> sont mis à jour à chaque étape du vote.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Si vous facturez la TVA</strong> : préparez le passage aux déclarations trimestrielles — un outil de facturation qui suit la TVA collectée par trimestre, et une échéance dans votre agenda en avril 2027 pour la déclaration du premier trimestre. C&apos;est aussi le moment de choisir la plateforme qui servira à la facturation électronique.</span>
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
