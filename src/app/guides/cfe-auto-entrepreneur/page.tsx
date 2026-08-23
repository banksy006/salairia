import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, ReceiptIcon, ShieldIcon, AlertTriangleIcon } from "@/components/icons";

const meta: GuideMeta = {
  slug: "cfe-auto-entrepreneur",
  titre: "CFE auto-entrepreneur : l'impôt oublié du 15 décembre",
  sousTitre: "Qui la paie, combien, et les trois exonérations qui font toute la différence",
  chapo: "La cotisation foncière des entreprises est l'impôt que presque tous les nouveaux micro-entrepreneurs découvrent trop tard : pas de courrier, un avis déposé en silence dans l'espace professionnel impots.gouv.fr, et une échéance unique le 15 décembre. Voici comment elle se calcule, qui en est exonéré, et les réflexes qui évitent la majoration.",
  filAriane: "CFE auto-entrepreneur",
  datePublished: "2026-08-23",
  dateModified: "2026-08-23",
  tocItems: [
    { id: "quoi", label: "Ce qu'est la CFE" },
    { id: "combien", label: "Combien elle coûte" },
    { id: "exonerations", label: "Les exonérations" },
    { id: "echeance", label: "Le 15 décembre" },
  ],
  faq: [
    {
      q: "Un auto-entrepreneur qui travaille de chez lui paie-t-il la CFE ?",
      r: "Oui, et c'est le malentendu le plus répandu. La CFE est due même sans local professionnel : travailler depuis son salon, chez ses clients ou en coworking ne dispense de rien. Dans ce cas, l'imposition est établie sur une base minimale fixée par la commune, dans des fourchettes définies par la loi selon votre chiffre d'affaires. La domiciliation fiscale de l'activité — souvent votre adresse personnelle — détermine la commune bénéficiaire et donc le montant.",
    },
    {
      q: "Combien coûte la CFE pour une micro-entreprise ?",
      r: "Pour une activité sans local, comptez généralement entre 250 et 600 € par an, mais tout dépend de votre commune : la base minimale légale (article 1647 D du CGI) va de 243 € à 579 € de base pour un CA jusqu'à 10 000 €, de 243 € à 1 158 € entre 10 000 et 32 600 €, et de 243 € à 2 433 € entre 32 600 et 100 000 € — base à laquelle s'applique ensuite le taux voté par la commune. Deux voisins avec le même chiffre d'affaires peuvent payer du simple au triple selon leur ville.",
    },
    {
      q: "Je viens de créer ma micro-entreprise : quand paierai-je ma première CFE ?",
      r: "Vous êtes totalement exonéré l'année de la création, quelle que soit sa date. Une entreprise créée en 2026 ne paie donc rien en décembre 2026 ; sa première CFE tombera le 15 décembre 2027, et encore : la base est réduite de moitié pour cette première année d'imposition. Une seule condition pratique : remplir la déclaration initiale 1447-C avant le 31 décembre de l'année de création, c'est elle qui déclenche correctement l'exonération.",
    },
    {
      q: "Existe-t-il une exonération pour les petits chiffres d'affaires ?",
      r: "Oui : les entreprises dont le chiffre d'affaires n'excède pas 5 000 € sur la période de référence sont exonérées de la base minimale de CFE. C'est le filet de sécurité des activités accessoires — un side business à quelques centaines d'euros par mois n'a pas vocation à payer 400 € de CFE. Attention à l'effet de seuil : à 5 100 € de CA, la cotisation est due en entier.",
    },
    {
      q: "Comment payer, et que se passe-t-il si j'oublie ?",
      r: "L'avis n'est jamais envoyé par courrier : il est déposé dans votre espace professionnel sur impots.gouv.fr courant novembre. Le paiement doit être dématérialisé — prélèvement à l'échéance (à activer avant le 30 novembre), mensualisation, ou paiement direct en ligne avant le 15 décembre à minuit. Un oubli entraîne une majoration de 5 % plus intérêts de retard. Le réflexe : créer son espace professionnel dès maintenant et activer le prélèvement automatique, l'oubli devient impossible.",
    },
  ],
  sources: [
    { label: "impots.gouv.fr — cotisation foncière des entreprises", href: "https://www.impots.gouv.fr/professionnel/cotisation-fonciere-des-entreprises-cfe" },
    { label: "CGI article 1647 D — base minimale de CFE (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048847276" },
    { label: "service-public.fr — cotisation foncière des entreprises (CFE)", href: "https://entreprendre.service-public.fr/vosdroits/F23547" },
    { label: "autoentrepreneur.urssaf.fr — la CFE en micro-entreprise", href: "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html" },
  ],
};

export const metadata: Metadata = {
  title: "CFE auto-entrepreneur 2026 : montant, exonérations, échéance du 15 décembre",
  description: "La CFE est due même sans local, mais trois exonérations existent : année de création, CA sous 5 000 €, et base réduite la première année d'imposition. Bases minimales de 243 à 2 433 € selon le CA, avis en ligne uniquement, paiement avant le 15 décembre.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "CFE auto-entrepreneur : l'impôt oublié du 15 décembre",
    description: "Qui la paie, combien, les trois exonérations, et comment éviter la majoration.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="quoi" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Ce qu&apos;est la CFE — et pourquoi personne ne la voit venir
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La cotisation foncière des entreprises est un impôt local, dû par
            toute entreprise au 1er janvier de l&apos;année d&apos;imposition —
            micro-entreprises comprises, <strong>avec ou sans local</strong>.
            Elle finance les communes, qui en votent le taux. Le régime micro
            n&apos;y échappe pas : les cotisations URSSAF que vous payez sur
            votre chiffre d&apos;affaires sont des cotisations{" "}
            <em>sociales</em> ; la CFE est un impôt <em>local</em>, distinct,
            qui s&apos;y ajoute.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Si elle surprend autant, c&apos;est par sa mécanique de
            notification : <strong>aucun courrier papier</strong>.
            L&apos;avis est déposé courant novembre dans l&apos;espace
            professionnel impots.gouv.fr — un espace que beaucoup de
            micro-entrepreneurs n&apos;ont jamais ouvert, puisque tout le
            reste (déclarations de CA, cotisations) se passe sur le site de
            l&apos;URSSAF. Résultat : chaque décembre, sa vague de majorations
            pour des cotisations jamais vues.
          </p>
        </div>
      </section>

      <section id="combien" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Combien elle coûte : la base minimale, commune par commune
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Sans local professionnel, la CFE est calculée sur une{" "}
          <strong>base minimale</strong> que chaque commune fixe dans les
          fourchettes légales de l&apos;article 1647 D du CGI, selon votre
          chiffre d&apos;affaires de N-2 :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Chiffre d&apos;affaires (N-2)</th>
                <th className="px-5 py-4 text-right">Base minimale (fourchette légale)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Jusqu'à 10 000 €", "243 € à 579 €"],
                ["10 001 € à 32 600 €", "243 € à 1 158 €"],
                ["32 601 € à 100 000 €", "243 € à 2 433 €"],
              ].map(([ca, base]) => (
                <tr key={ca} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{ca}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le montant final = base retenue par votre commune × taux communal.
          C&apos;est pour cela qu&apos;aucun site ne peut vous donner « le »
          montant de votre CFE : il dépend de deux décisions municipales. En
          pratique, pour une activité sans local, la facture se situe le plus
          souvent <strong>entre 250 et 600 € par an</strong> — vérifiable
          précisément sur votre avis, ou par une simulation dans votre espace
          professionnel. Pensez à intégrer cette charge fixe dans votre calcul
          de rentabilité : notre{" "}
          <Link href="/simulateurs/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
            simulateur auto-entrepreneur
          </Link>{" "}
          l&apos;accepte dans les frais professionnels annuels.
        </p>
      </section>

      <section id="exonerations" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Les trois exonérations à connaître
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">L&apos;année de création</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Exonération <strong>totale et automatique</strong>, quelle que
              soit la date de création dans l&apos;année. Créée en mars 2026,
              votre micro ne paie rien en décembre 2026. Condition pratique :
              déposer la déclaration initiale 1447-C avant le 31 décembre.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">La première année d&apos;imposition</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              L&apos;année suivant la création, la base d&apos;imposition est{" "}
              <strong>réduite de moitié</strong>. La première vraie CFE est
              donc allégée — la facture pleine n&apos;arrive qu&apos;en
              troisième année civile.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">CA ≤ 5 000 €</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Les activités dont le chiffre d&apos;affaires de la période de
              référence ne dépasse pas 5 000 € sont exonérées de la base
              minimale. Le filet des side businesses — avec un effet de seuil
              brutal juste au-dessus.
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          S&apos;y ajoutent des exonérations sectorielles permanentes
          (artisans travaillant seuls, certaines activités agricoles,
          artistes-auteurs…) et géographiques (QPV, zones de revitalisation
          rurale). Si vous pensez y avoir droit, la demande se fait auprès de
          votre service des impôts des entreprises — elle n&apos;est pas
          toujours automatique.
        </p>
      </section>

      <section id="echeance" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Le 15 décembre : la mécanique de l&apos;échéance
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Courant novembre</strong> : l&apos;avis apparaît dans votre espace professionnel impots.gouv.fr (à créer si ce n&apos;est pas déjà fait — comptez quelques jours pour l&apos;activation).</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Avant le 30 novembre</strong> : dernière fenêtre pour adhérer au prélèvement à l&apos;échéance, l&apos;option qui supprime tout risque d&apos;oubli.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>15 décembre à minuit</strong> : date limite de paiement, obligatoirement dématérialisé. Au-delà : majoration de 5 % plus intérêts de retard.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>Cas particulier</strong> : si votre CFE de l&apos;an dernier dépassait 3 000 €, un acompte de 50 % était dû dès le 15 juin.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Dernier point : la CFE est due par l&apos;entreprise{" "}
            <strong>existante au 1er janvier</strong>. Une cessation en cours
            d&apos;année ne l&apos;annule pas (un dégrèvement prorata temporis
            est possible sur demande) — et une radiation avant le 31 décembre
            évite celle de l&apos;année suivante. Un paramètre à intégrer si
            vous hésitez à fermer une micro dormante : notre guide{" "}
            <Link href="/guides/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
              auto-entrepreneur
            </Link>{" "}
            fait le tour des obligations du statut.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
