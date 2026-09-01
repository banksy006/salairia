import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, EuroIcon, InfoIcon, AlertTriangleIcon } from "@/components/icons";

const meta: GuideMeta = {
  slug: "calendrier-impots-2027",
  titre: "Calendrier des impôts 2027 : toutes les dates qui comptent",
  sousTitre: "De l'avance de janvier au solde de décembre — l'année fiscale d'un particulier, mois par mois",
  chapo: "L'année fiscale française est une horloge : avance de crédits d'impôt mi-janvier, déclaration au printemps, avis et remboursements l'été, nouveau taux de prélèvement au 1er septembre, solde à l'automne, modulation de l'avance en décembre. Les dates précises de 2027 seront publiées par la DGFiP au fil de l'année — voici le calendrier complet avec les dates de référence 2026, mis à jour à chaque annonce officielle.",
  filAriane: "Calendrier impôts 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "calendrier", label: "L'année mois par mois" },
    { id: "declaration", label: "La déclaration du printemps" },
    { id: "regularisation", label: "L'été et l'automne" },
    { id: "independants", label: "Le cas des indépendants" },
  ],
  faq: [
    {
      q: "Quand faudra-t-il déclarer ses revenus en 2027 ?",
      r: "Le service de déclaration en ligne ouvre traditionnellement la deuxième semaine d'avril, avec des dates limites échelonnées fin mai-début juin selon le département (trois zones), et une échéance plus précoce — autour du 20 mai — pour les déclarations papier. Les dates exactes de la campagne 2027 seront annoncées par la DGFiP en mars 2027 et reportées ici. La déclaration portera sur vos revenus 2026, et servira à calculer le solde de l'été 2027 ainsi que votre taux de prélèvement applicable de septembre 2027 à août 2028.",
    },
    {
      q: "Quelles sont les grandes dates fixes de l'année fiscale ?",
      r: "Cinq rendez-vous structurent l'année, quasiment invariables : l'avance de 60 % des crédits d'impôt récurrents vers le 15 janvier ; l'ouverture de la déclaration en avril ; la mise à disposition des avis et les remboursements fin juillet-début août ; l'application du nouveau taux de prélèvement à la source au 1er septembre ; et le prélèvement du solde à partir du 25 septembre environ, en une fois jusqu'à 300 €, en quatre mensualités au-delà. S'y ajoute la fenêtre de modulation de l'avance de crédits d'impôt, ouverte jusqu'à la mi-décembre.",
    },
    {
      q: "Mon taux de prélèvement changera-t-il en janvier 2027 ?",
      r: "Non — c'est l'idée reçue la plus tenace. Le taux appliqué en janvier 2027 reste celui calculé à partir de votre déclaration du printemps 2026, en vigueur depuis le 1er septembre 2026. Le barème voté dans la loi de finances 2027 ne modifie pas votre taux en janvier : il servira au calcul de l'impôt sur vos revenus 2026, lors de la déclaration du printemps. Seule exception : les grilles de taux neutre (salariés sans taux transmis), réajustées dès janvier. Si votre situation change (mariage, naissance, baisse de revenus), vous pouvez demander une actualisation du taux à tout moment.",
    },
    {
      q: "Et les impôts locaux — taxe foncière, CFE ?",
      r: "Ils suivent leur propre calendrier d'automne : avis de taxe foncière fin août-début septembre pour un paiement mi-octobre, taxe d'habitation sur les résidences secondaires en novembre pour un paiement mi-décembre, et CFE des indépendants mise en ligne courant novembre pour le 15 décembre. Aucun de ces avis n'arrive par courrier si vous avez opté pour le tout-en-ligne — le réflexe est de consulter son espace en ligne à ces périodes. Le détail CFE, l'impôt que tous les micro-entrepreneurs découvrent trop tard, est dans notre guide dédié.",
    },
    {
      q: "Comment être sûr de ne rien rater ?",
      r: "Trois habitudes suffisent. Un : vérifier son espace particulier impots.gouv.fr à cinq moments — janvier, avril, fin juillet, début septembre, novembre. Deux : activer les alertes e-mail de la DGFiP (messagerie sécurisée), qui préviennent à chaque document déposé. Trois : caler les deux actions à fenêtre courte — la déclaration de mai et la modulation de l'avance avant mi-décembre. Le reste (remboursements, prélèvements de solde, nouveau taux) est automatique et n'exige rien de vous, sinon de vérifier les montants.",
    },
  ],
  sources: [
    { label: "impots.gouv.fr — calendrier fiscal des particuliers", href: "https://www.impots.gouv.fr/particulier/calendrier-fiscal" },
    { label: "economie.gouv.fr — impôt sur le revenu : les dates clés", href: "https://www.economie.gouv.fr/particuliers/impots-et-fiscalite" },
    { label: "service-public.fr — déclaration des revenus", href: "https://www.service-public.fr/particuliers/vosdroits/F358" },
    { label: "impots.gouv.fr — gérer mon prélèvement à la source", href: "https://www.impots.gouv.fr/particulier/gerer-mon-prelevement-la-source" },
  ],
};

export const metadata: Metadata = {
  title: "Calendrier des impôts 2027 : déclaration, remboursement, solde — toutes les dates",
  description: "L'année fiscale 2027 mois par mois : avance de crédits d'impôt (~15 janvier), déclaration (avril-juin), remboursements (fin juillet), nouveau taux de PAS (1er septembre), solde (dès le 25 septembre), impôts locaux et CFE (octobre-décembre). Mis à jour à chaque annonce DGFiP.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Calendrier des impôts 2027 : toutes les dates qui comptent",
    description: "L'année fiscale complète d'un particulier, avec les fenêtres où il faut agir.",
    url: `/guides/${meta.slug}`,
  },
};

const CALENDRIER = [
  { mois: "Mi-janvier", quoi: "Avance de 60 % des crédits d'impôt récurrents (virement « AVANCE CREDIMPOT »).", action: false },
  { mois: "Avril", quoi: "Ouverture de la déclaration en ligne des revenus 2026 (dates exactes annoncées en mars).", action: true },
  { mois: "Fin mai – début juin", quoi: "Dates limites de déclaration, échelonnées par département (3 zones).", action: true },
  { mois: "Fin juillet", quoi: "Remboursements pour les foyers créditeurs (24 et 31 juillet en 2026) ; avis disponibles en ligne jusqu'à début septembre.", action: false },
  { mois: "1er septembre", quoi: "Nouveau taux de prélèvement à la source, issu de la déclaration du printemps.", action: false },
  { mois: "25 septembre", quoi: "Prélèvement du solde ≤ 300 € en une fois ; au-delà, étalement automatique en 4 mensualités jusqu'en décembre.", action: false },
  { mois: "Mi-octobre", quoi: "Paiement de la taxe foncière (avis dès fin août).", action: false },
  { mois: "Novembre", quoi: "Avis de CFE en ligne pour les indépendants ; taxe d'habitation sur les résidences secondaires.", action: false },
  { mois: "Mi-décembre", quoi: "Date limite pour moduler l'avance de crédits d'impôt de janvier · paiement de la CFE le 15 décembre.", action: true },
];

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          L&apos;année fiscale, mois par mois
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Période</th>
                <th className="px-5 py-4">Ce qui se passe</th>
                <th className="px-5 py-4 text-right">Vous devez agir ?</th>
              </tr>
            </thead>
            <tbody>
              {CALENDRIER.map((l) => (
                <tr key={l.mois} className="border-b border-border align-top last:border-b-0">
                  <td className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">{l.mois}</td>
                  <td className="px-5 py-3 text-foreground/80">{l.quoi}</td>
                  <td className="px-5 py-3 text-right">
                    {l.action ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">OUI</span>
                    ) : (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">automatique</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Sur neuf rendez-vous, <strong>trois seulement exigent une action</strong> :
          déclarer au printemps, respecter sa date limite, et — pour les foyers
          à crédits d&apos;impôt dont la situation a changé — moduler
          l&apos;avance avant mi-décembre. Tout le reste est automatique.
        </p>
      </section>

      <section id="declaration" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          La déclaration du printemps : la clé de voûte
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Tout le reste de l&apos;année découle de cette déclaration : elle
            fixe l&apos;impôt réel sur vos revenus 2026, déclenche le
            remboursement ou le solde de l&apos;été, détermine votre taux de
            prélèvement de septembre 2027 à août 2028, et sert de base à
            l&apos;avance de crédits d&apos;impôt de janvier 2028. Une erreur
            s&apos;y propage donc sur dix-huit mois — et une optimisation
            aussi.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Les points à soigner en 2027 : vérifier le pré-rempli (salaires,
            heures supplémentaires exonérées sur leur ligne dédiée — voir
            notre{" "}
            <Link href="/guides/heures-supplementaires" className="text-primary underline-offset-4 hover:underline">
              guide heures sup
            </Link>
            ), arbitrer{" "}
            <Link href="/guides/bareme-kilometrique" className="text-primary underline-offset-4 hover:underline">
              frais réels contre abattement de 10 %
            </Link>
            , déclarer les revenus d&apos;indépendant dans les bonnes cases
            micro, et pour les couples, choisir taux individualisé ou taux
            commun. Le barème applicable sera celui voté fin décembre 2026 —
            suivi dans notre page{" "}
            <Link href="/guides/bareme-impot-2027" className="text-primary underline-offset-4 hover:underline">
              barème 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="regularisation" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          L&apos;été et l&apos;automne : l&apos;heure des comptes
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Fin juillet, deux populations se séparent. Les{" "}
            <strong>remboursés</strong> — trop prélevés à la source ou
            détenteurs de crédits d&apos;impôt — reçoivent leur virement sans
            démarche (12,6 millions de foyers, 1 057 € en moyenne en 2026 :
            mécanique détaillée dans notre guide{" "}
            <Link href="/guides/remboursement-impot" className="text-primary underline-offset-4 hover:underline">
              remboursement d&apos;impôt
            </Link>
            ). Les <strong>débiteurs</strong> voient leur solde prélevé à
            partir du 25 septembre — en une fois jusqu&apos;à 300 €, sinon en
            quatre mensualités de septembre à décembre, d&apos;office.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Au même moment, le 1er septembre, votre taux de prélèvement est
            actualisé — avec, pour les couples, le taux individualisé par
            défaut (notre{" "}
            <Link href="/actualites/nouveau-taux-prelevement-source-septembre-2026" className="text-primary underline-offset-4 hover:underline">
              article de septembre 2026
            </Link>{" "}
            explique la bascule). L&apos;automne cumule donc nouveau taux,
            éventuel solde étalé et impôts locaux : c&apos;est la saison où le
            net « ressenti » baisse — d&apos;où l&apos;intérêt de simuler son
            vrai net de fin d&apos;année avec le{" "}
            <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
              simulateur net après impôt
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="independants" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Indépendants : trois échéances de plus
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Acomptes de PAS</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Sans employeur pour collecter, l&apos;impôt des BIC-BNC est
              prélevé par acomptes le 15 de chaque mois (ou par trimestre sur
              option, à formuler avant le 1er octobre pour l&apos;année
              suivante).
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Déclarations URSSAF</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Les micro-entrepreneurs déclarent leur CA chaque mois ou chaque
              trimestre — un calendrier parallèle au fiscal, avec ses propres
              pénalités de retard. Notre{" "}
              <Link href="/simulateurs/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
                simulateur auto-entrepreneur
              </Link>{" "}
              chiffre ce que chaque déclaration va prélever.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">CFE — 15 décembre</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              L&apos;avis arrive en ligne en novembre, sans courrier, pour un
              paiement au 15 décembre. L&apos;impôt le plus oublié des
              indépendants — le détail dans notre{" "}
              <Link href="/guides/cfe-auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
                guide CFE
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
