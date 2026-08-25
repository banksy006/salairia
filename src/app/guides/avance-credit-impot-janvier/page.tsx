import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, EuroIcon, CalendarIcon, AlertTriangleIcon, InfoIcon } from "@/components/icons";

const meta: GuideMeta = {
  slug: "avance-credit-impot-janvier",
  titre: "Avance de crédits d'impôt de janvier : le virement que personne ne comprend",
  sousTitre: "60 % de vos crédits récurrents, versés mi-janvier — et à rembourser l'été si vos dépenses ont baissé",
  chapo: "Chaque mi-janvier, la DGFiP verse à des millions de foyers un virement « AVANCE CREDIMPOT » qui surprend autant qu'il fait plaisir : 60 % des réductions et crédits d'impôt récurrents — emploi à domicile, garde d'enfants, dons — calculés sur la déclaration du printemps précédent. Le piège est symétrique : si vos dépenses ont chuté entre-temps, l'avance est trop grosse et devra être rendue l'été suivant. Voici la mécanique complète, et la fenêtre de fin d'année pour ajuster.",
  filAriane: "Avance crédits d'impôt",
  datePublished: "2026-08-25",
  dateModified: "2026-08-25",
  tocItems: [
    { id: "mecanique", label: "La mécanique des 60 %" },
    { id: "concernes", label: "Quels crédits sont concernés" },
    { id: "piege", label: "Le piège du trop-perçu" },
    { id: "moduler", label: "Moduler avant mi-décembre" },
  ],
  faq: [
    {
      q: "Qu'est-ce que le virement « AVANCE CREDIMPOT » reçu en janvier ?",
      r: "C'est une avance de trésorerie sur vos réductions et crédits d'impôt récurrents, versée par la DGFiP autour du 15 janvier. Le prélèvement à la source ne tenant pas compte de vos crédits d'impôt, vous les avanceriez toute l'année sans ce mécanisme : l'administration verse donc 60 % du montant constaté sur votre dernière déclaration, et régularise le solde — les 40 % restants, ajustés à vos dépenses réelles — l'été suivant, après la déclaration. Aucune démarche n'est nécessaire pour le recevoir.",
    },
    {
      q: "Quels crédits et réductions d'impôt ouvrent droit à l'avance ?",
      r: "Les dispositifs récurrents par nature : crédit d'impôt pour l'emploi d'un salarié à domicile (ménage, soutien scolaire, jardinage), frais de garde des jeunes enfants (crèche, assistante maternelle), dons aux associations et organismes d'intérêt général, cotisations syndicales, dépenses d'accueil en Ehpad, et l'investissement locatif type Pinel/Denormandie. En sont exclus les crédits ponctuels — dont le crédit d'impôt pour la transition énergétique historique — et, naturellement, tout dispositif utilisé pour la première fois cette année, que l'administration ne peut pas connaître.",
    },
    {
      q: "J'ai employé quelqu'un à domicile pour la première fois en 2026 : aurai-je l'avance en janvier 2027 ?",
      r: "Non — c'est l'angle mort du système. L'avance de janvier 2027 est calculée sur la déclaration faite au printemps 2026, qui porte sur vos dépenses 2025. Vos dépenses 2026 n'y figurent pas : vous percevrez l'intégralité du crédit à l'été 2027, puis entrerez dans le cycle de l'avance en janvier 2028. Exception notable : pour l'emploi à domicile via Cesu ou une plateforme agréée, le service « avance immédiate » permet de déduire le crédit en temps réel, mois par mois — il court-circuite tout le mécanisme.",
    },
    {
      q: "Mes dépenses ont baissé : que se passe-t-il si je ne fais rien ?",
      r: "L'avance de janvier sera calculée sur vos anciennes dépenses, donc trop élevée — et l'été suivant, la régularisation transformera le trop-perçu en somme à rembourser, prélevée avec votre solde d'impôt à partir de septembre. Exemple : 3 000 € de crédit en 2025, avance de 1 800 € en janvier 2027 ; si vos dépenses 2026 sont tombées à 1 000 € (crédit : 500 €), vous devrez rendre 1 300 €. Pour l'éviter, vous pouvez réduire ou renoncer à l'avance depuis votre espace particulier — la fenêtre est ouverte jusqu'à la mi-décembre.",
    },
    {
      q: "Comment moduler ou refuser l'avance ?",
      r: "Dans votre espace particulier sur impots.gouv.fr : « Gérer mon prélèvement à la source », rubrique « Gérer vos avances de réductions et crédits d'impôt ». Vous pouvez diminuer le montant ou le passer à zéro — jamais l'augmenter. L'opération est à faire avant la mi-décembre pour prendre effet sur l'avance de janvier suivant. C'est l'un des réflexes de fin d'année les plus rentables pour qui a arrêté une garde d'enfant, réduit l'emploi à domicile ou espacé ses dons.",
    },
  ],
  sources: [
    { label: "economie.gouv.fr — l'avance de réductions et crédits d'impôt", href: "https://www.economie.gouv.fr/particuliers/avance-reductions-credits-impot" },
    { label: "impots.gouv.fr — gérer mon prélèvement à la source", href: "https://www.impots.gouv.fr/particulier/gerer-mon-prelevement-la-source" },
    { label: "URSSAF — l'avance immédiate de crédit d'impôt (emploi à domicile)", href: "https://www.urssaf.fr/accueil/services/services-particuliers/avance-immediate.html" },
    { label: "service-public.fr — crédit d'impôt pour l'emploi d'un salarié à domicile", href: "https://www.service-public.fr/particuliers/vosdroits/F12" },
  ],
};

export const metadata: Metadata = {
  title: "Avance de crédits d'impôt de janvier : 60 %, pour qui, et le piège du trop-perçu",
  description: "Le virement « AVANCE CREDIMPOT » de mi-janvier : 60 % des crédits récurrents (emploi à domicile, garde d'enfants, dons) calculés sur la dernière déclaration. Qui le reçoit, pourquoi il peut falloir le rembourser, et comment le moduler avant mi-décembre.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "L'avance de crédits d'impôt de janvier, expliquée",
    description: "60 % d'avance, régularisation l'été — et la fenêtre de modulation de décembre.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="mecanique" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          La mécanique des 60 %
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le prélèvement à la source calcule votre impôt{" "}
            <strong>avant</strong> réductions et crédits : sans correctif,
            vous financeriez vos crédits d&apos;impôt jusqu&apos;à l&apos;été
            suivant. D&apos;où l&apos;avance : mi-janvier, la DGFiP verse{" "}
            <strong>60 % du montant des crédits récurrents constatés sur
            votre dernière déclaration</strong>. Le solde arrive l&apos;été,
            une fois vos dépenses réelles déclarées — c&apos;est la moitié du
            « double virement » que reçoivent chaque année les foyers
            concernés, l&apos;autre étant le{" "}
            <Link href="/guides/remboursement-impot" className="text-primary underline-offset-4 hover:underline">
              remboursement d&apos;impôt de juillet
            </Link>
            .
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le calendrier complet du cycle : dépenses en année N →
            déclaration au printemps N+1 → solde du crédit à l&apos;été N+1 →
            avance de 60 % en janvier N+2, calculée sur ces mêmes dépenses.
            L&apos;avance est donc toujours <strong>en retard d&apos;un an
            sur votre vie réelle</strong> — toute la suite découle de ce
            décalage.
          </p>
        </div>
      </section>

      <section id="concernes" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce qui est couvert, ce qui ne l&apos;est pas
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
            <p className="font-semibold text-foreground">Dans l&apos;avance</p>
            <ul className="mt-3 space-y-2 text-base text-foreground/80">
              <li>✅ Emploi d&apos;un salarié à domicile</li>
              <li>✅ Frais de garde d&apos;enfants de moins de 6 ans</li>
              <li>✅ Dons aux associations et organismes</li>
              <li>✅ Cotisations syndicales</li>
              <li>✅ Dépenses d&apos;hébergement en Ehpad</li>
              <li>✅ Investissement locatif (Pinel, Denormandie…)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Hors avance</p>
            <ul className="mt-3 space-y-2 text-base text-foreground/80">
              <li>❌ Crédits ponctuels et dispositifs non récurrents</li>
              <li>❌ Toute dépense engagée pour la première fois cette année</li>
              <li>❌ La réduction d&apos;impôt liée au quotient familial (elle joue dans le taux de PAS, pas ici)</li>
              <li>❌ L&apos;emploi à domicile déjà servi par l&apos;« avance immédiate » Urssaf — le crédit est alors consommé en temps réel</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="piege" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le piège : l&apos;avance trop grosse se rembourse
        </h2>
        <div className="mt-4 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            L&apos;avance étant calée sur le passé, tout changement de vie la
            fausse : garde d&apos;enfant terminée (entrée à l&apos;école),
            emploi à domicile arrêté, dons exceptionnels non reconduits,
            dernière annuité d&apos;un Pinel. Dans tous ces cas, janvier vous
            verse 60 % d&apos;un crédit qui n&apos;existe plus — et{" "}
            <strong>l&apos;été suivant, la régularisation réclame la
            différence</strong>, ajoutée à votre solde d&apos;impôt et
            prélevée à partir de septembre (en quatre fois au-delà de 300 €).
            Ce n&apos;est ni une pénalité ni une erreur : c&apos;est le
            fonctionnement normal du système, mais il transforme un cadeau de
            janvier en mauvaise surprise de septembre pour qui ne
            l&apos;anticipe pas. Le détail du calendrier de régularisation
            est dans notre guide{" "}
            <Link href="/guides/remboursement-impot" className="underline underline-offset-4">
              remboursement d&apos;impôt
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="moduler" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Moduler avant mi-décembre : le réflexe de fin d&apos;année
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Faites le point en novembre</strong> : vos dépenses ouvrant droit à crédit ont-elles baissé par rapport à l&apos;an dernier ? Si oui, calculez le crédit attendu (50 % des dépenses pour l&apos;emploi à domicile et la garde, 66 % pour la plupart des dons).</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Avant la mi-décembre</strong>, réduisez ou annulez l&apos;avance dans votre espace impots.gouv.fr (« Gérer vos avances de réductions et crédits d&apos;impôt »). À la baisse uniquement — le système ne permet jamais d&apos;augmenter.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Si vos dépenses ont augmenté</strong>, rien à faire : l&apos;avance sera simplement trop faible, et le complément arrivera avec le solde de l&apos;été. Un manque à gagner de trésorerie, pas une perte.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>Employeurs à domicile</strong> : activer l&apos;avance immédiate Urssaf supprime le sujet à la racine — le crédit est déduit chaque mois de ce que vous payez, sans avance ni régularisation.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Cette échéance de mi-décembre figure dans notre{" "}
            <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
              récapitulatif du 1er janvier 2027
            </Link>{" "}
            — et pour mesurer l&apos;effet de vos crédits sur votre impôt
            total, le{" "}
            <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
              simulateur net après impôt
            </Link>{" "}
            donne la base de calcul.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
