import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ShieldIcon, CalculatorIcon, ScaleIcon, InfoIcon } from "@/components/icons";
import { calculerPortage } from "@/lib/calculators/portage";
import { SALAIRE_2026 } from "@/lib/calculators/salaire-brut-net";

// Cas type commun aux guides portage : 500 €/j sur 18 jours.
const r = calculerPortage({
  tjm: 500,
  joursTravailles: 18,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
});
const BRUT_ANNUEL = r.salaireBrut * 12;
// Un trimestre de retraite se valide sur 150 h de SMIC horaire (CSS D351-2).
const SMIC_HORAIRE = SALAIRE_2026.SMIC_MENSUEL_BRUT / 151.67;
const BRUT_TRIMESTRE = SMIC_HORAIRE * 150;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "portage-salarial-retraite",
  titre: "Portage salarial et retraite : le seul statut d'indépendant au régime général",
  sousTitre: `Trimestres, points AGIRC-ARRCO, taux plein : le porté cotise exactement comme un salarié`,
  chapo: `C'est l'argument le moins connu et le plus solide du portage salarial : le salarié porté relève du régime général et de l'AGIRC-ARRCO, pas du régime des indépendants. Trimestres validés, points de retraite complémentaire accumulés sur tout le salaire, relevé de carrière identique à celui d'un cadre. La contrepartie est visible sur le bulletin — mais elle achète des droits que ni la micro-entreprise ni l'EURL ne procurent au même niveau. Voici le mécanisme, chiffré.`,
  filAriane: "Portage et retraite",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "regime", label: "Quel régime s'applique" },
    { id: "trimestres", label: "Valider ses trimestres" },
    { id: "points", label: "Les points complémentaires" },
    { id: "comparer", label: "Face aux autres statuts" },
  ],
  faq: [
    {
      q: "Le salarié porté cotise-t-il pour la retraite comme un salarié classique ?",
      r: `Oui, à l'identique. La société de portage est votre employeur : elle vous déclare au régime général de la Sécurité sociale pour la retraite de base et à l'AGIRC-ARRCO pour la complémentaire, exactement comme n'importe quelle entreprise. Votre relevé de carrière ne distingue pas les périodes en portage des périodes en CDI classique. C'est la différence structurelle avec la micro-entreprise, la SASU ou l'EURL — notre guide sur le choix du statut détaille les quatre régimes.`,
    },
    {
      q: "Combien faut-il facturer pour valider ses quatre trimestres ?",
      r: `Un trimestre se valide dès que le salaire brut soumis à cotisations atteint 150 fois le SMIC horaire, soit environ ${EUR.format(BRUT_TRIMESTRE)} bruts en 2026 — et quatre trimestres, le maximum annuel, à environ ${EUR.format(BRUT_TRIMESTRE * 4)} de brut sur l'année. Comme le brut en portage représente grossièrement la moitié du chiffre d'affaires facturé (après frais de gestion et charges patronales), il faut viser de l'ordre de ${EUR.format(BRUT_TRIMESTRE * 4 * 2)} de facturation annuelle pour sécuriser une année pleine. Un consultant à ${EUR.format(500 * 18 * 12)} de CA annuel est très largement au-dessus.`,
    },
    {
      q: "Les frais de gestion réduisent-ils mes droits à la retraite ?",
      r: `Mécaniquement oui, et c'est un point qu'on oublie : les frais de gestion sont prélevés sur le chiffre d'affaires avant le calcul du salaire brut. Un point de frais en moins, c'est du brut en plus, donc des points de retraite en plus. Sur notre cas type — ${EUR.format(r.caHT)} facturés, ${EUR.format(r.fraisGestion)} de frais à 8 % —, le brut ressort à ${EUR.format(r.salaireBrut)}. Le même consultant chez une société à 4 % aurait un brut supérieur, et donc des droits légèrement supérieurs. Notre comparateur chiffre l'écart société par société.`,
    },
    {
      q: "Et les frais professionnels non refacturables ?",
      r: "Même logique, plus marquée : chaque euro déduit en frais professionnels sort de l'assiette de cotisations. Vous gagnez du net immédiat (l'euro n'est ni chargé ni imposé) mais vous perdez de la retraite et des droits au chômage futurs. Pour un consultant en fin de carrière qui vise le taux plein, l'arbitrage penche vers un maximum de brut ; pour un jeune consultant qui a le temps, la trésorerie immédiate compte souvent davantage. C'est l'un des rares arbitrages vraiment personnels du portage.",
    },
    {
      q: "Peut-on cumuler portage salarial et retraite ?",
      r: "Oui, le portage est même l'une des formules les plus utilisées par les retraités qui poursuivent une activité de conseil. Deux régimes coexistent : le cumul emploi-retraite intégral, si vous avez liquidé toutes vos pensions au taux plein — vous percevez pension et salaire sans plafond ; ou le cumul plafonné, si ces conditions ne sont pas réunies. Depuis 2023, une reprise d'activité après liquidation peut ouvrir de nouveaux droits à une seconde pension, dans des conditions précises : faites vérifier votre cas par votre caisse avant de vous engager.",
    },
  ],
  sources: [
    { label: "Code de la sécurité sociale, art. D351-2 — validation des trimestres (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038837657" },
    { label: "L'Assurance retraite — le calcul de la retraite de base", href: "https://www.lassuranceretraite.fr/portail-info/hors-menu/coff/retraite-de-base.html" },
    { label: "AGIRC-ARRCO — acquisition et valeur du point", href: "https://www.agirc-arrco.fr/ma-retraite/valeur-du-point/" },
    { label: "Convention collective du portage salarial, IDCC 3219 (Légifrance)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
  ],
};

export const metadata: Metadata = {
  title: "Portage salarial et retraite : trimestres, points AGIRC-ARRCO, cumul (2026)",
  description: `Le salarié porté cotise au régime général et à l'AGIRC-ARRCO comme un salarié classique — contrairement au micro-entrepreneur ou au gérant d'EURL. Combien facturer pour valider 4 trimestres (~${EUR.format(BRUT_TRIMESTRE * 4 * 2)} de CA), l'effet des frais de gestion sur vos droits, et le cumul emploi-retraite.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Portage salarial et retraite : le seul statut d'indépendant au régime général",
    description: "Trimestres, points complémentaires et cumul emploi-retraite, chiffrés.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="regime" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          Régime général, pas régime des indépendants
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le salarié porté a un <strong>contrat de travail</strong> avec sa
            société de portage. Toute la conséquence retraite découle de là :
            il est affilié au <strong>régime général</strong> pour la retraite
            de base et à l&apos;<strong>AGIRC-ARRCO</strong> pour la
            complémentaire, avec les mêmes taux, les mêmes tranches et le même
            relevé de carrière qu&apos;un salarié d&apos;entreprise. Sur le
            bulletin, les lignes sont identiques à celles décrites dans notre{" "}
            <Link href="/guides/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
              guide du salaire brut et net
            </Link>
            .
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            C&apos;est un point de bascule dans le choix d&apos;un statut
            d&apos;indépendant. Le micro-entrepreneur cotise à la retraite via
            un pourcentage forfaitaire de son chiffre d&apos;affaires et valide
            structurellement moins de droits à revenu équivalent. Le gérant
            d&apos;EURL relève du régime des indépendants. Le président de SASU
            est, lui, assimilé salarié et cotise au régime général — mais{" "}
            <Link href="/guides/sasu-chomage-dirigeant" className="text-primary underline-offset-4 hover:underline">
              sans assurance chômage
            </Link>
            , là où le porté cotise aussi pour elle.
          </p>
        </div>
      </section>

      <section id="trimestres" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Valider ses trimestres : le seuil, en euros
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La règle ne dépend pas du temps travaillé mais du{" "}
            <strong>salaire brut soumis à cotisations</strong> : un trimestre
            est validé pour 150 fois le SMIC horaire, avec un maximum de quatre
            trimestres par année civile.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Trimestres visés</th>
                  <th className="px-5 py-4 text-right">Brut annuel nécessaire</th>
                  <th className="px-5 py-4 text-right">CA à facturer (ordre de grandeur)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((t) => (
                  <tr key={t} className={`border-b border-border last:border-b-0 ${t === 4 ? "bg-accent/5" : ""}`}>
                    <td className={`px-5 py-3 font-semibold text-foreground ${t === 4 ? "border-l-4 border-accent" : ""}`}>
                      {t} trimestre{t > 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums">{EUR.format(BRUT_TRIMESTRE * t)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">≈ {EUR.format(BRUT_TRIMESTRE * t * 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le SMIC horaire de 2026 étant de {EUR2.format(SMIC_HORAIRE)}, un
            trimestre se valide à environ {EUR.format(BRUT_TRIMESTRE)} de brut.
            La colonne « CA à facturer » applique le ratio observé en portage :
            le brut représente grossièrement la moitié du chiffre
            d&apos;affaires, une fois retirés les frais de gestion et les
            charges patronales. Sur notre cas type ({EUR.format(r.caHT)}{" "}
            facturés par mois), le brut annuel atteint{" "}
            <strong>{EUR.format(BRUT_ANNUEL)}</strong> : les quatre trimestres
            sont acquis dès les premiers mois de l&apos;année.
          </p>
          <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Le cas qui mérite attention :</strong>{" "}
              le consultant à temps partiel ou en démarrage. Avec quelques
              missions par an, on peut n&apos;acquérir qu&apos;un ou deux
              trimestres — un manque qui coûtera à la liquidation. Le seuil est
              annuel : mieux vaut concentrer sa facturation sur une année que
              l&apos;étaler sur deux à moitié.
            </p>
          </div>
        </div>
      </section>

      <section id="points" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          La retraite complémentaire : là où le portage prend l&apos;avantage
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La retraite de base est <strong>plafonnée</strong> : elle ne se
            calcule que sur la part du salaire inférieure au{" "}
            <Link href="/guides/plafond-securite-sociale-2027" className="text-primary underline-offset-4 hover:underline">
              plafond de la Sécurité sociale
            </Link>{" "}
            ({EUR.format(SALAIRE_2026.PASS_MENSUEL)} par mois en 2026).
            L&apos;AGIRC-ARRCO, elle, cotise sur l&apos;intégralité du salaire,
            avec des taux nettement plus élevés en tranche 2. Pour un
            consultant bien rémunéré, la complémentaire finit par représenter
            la moitié ou davantage de la pension totale — voir notre guide sur
            la{" "}
            <Link href="/guides/revalorisation-retraites-2027" className="text-primary underline-offset-4 hover:underline">
              revalorisation des retraites
            </Link>
            .
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Avec un brut de {EUR.format(r.salaireBrut)} par mois, notre
            consultant type cotise en tranche 1 <em>et</em> en tranche 2 :
            chaque euro au-delà du plafond génère des points à un taux
            supérieur. C&apos;est précisément ce que ne fait pas un
            micro-entrepreneur, dont les cotisations retraite sont un
            pourcentage plafonné du chiffre d&apos;affaires, sans mécanisme de
            tranche.
          </p>
        </div>
      </section>

      <section id="comparer" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que ça change face aux autres statuts
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Statut</th>
                <th className="px-5 py-4">Régime de retraite</th>
                <th className="px-5 py-4">Complémentaire</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Portage salarial", "Régime général (salarié)", "AGIRC-ARRCO, tranches 1 et 2", true],
                ["SASU (président)", "Régime général (assimilé salarié)", "AGIRC-ARRCO", false],
                ["EURL (gérant)", "Régime des indépendants (SSI)", "Complémentaire des indépendants", false],
                ["Micro-entreprise", "Régime des indépendants, cotisations forfaitaires sur le CA", "Complémentaire indépendants, droits réduits à revenu égal", false],
              ].map(([s, base, comp, best]) => (
                <tr key={s as string} className={`border-b border-border last:border-b-0 ${best ? "bg-accent/5" : ""}`}>
                  <td className={`px-5 py-3 font-semibold text-foreground ${best ? "border-l-4 border-accent" : ""}`}>{s}</td>
                  <td className="px-5 py-3 text-foreground/80">{base}</td>
                  <td className="px-5 py-3 text-foreground/80">{comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          La retraite n&apos;est évidemment pas le seul critère : le portage
          prélève davantage à court terme que la micro-entreprise, et son coût
          se mesure en net immédiat. Pour arbitrer sur vos propres chiffres, le{" "}
          <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
            comparateur des quatre statuts
          </Link>{" "}
          donne le net de chacun, et le{" "}
          <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
            simulateur de portage
          </Link>{" "}
          détaille le brut réellement soumis à cotisations selon la société
          choisie.
        </p>
      </section>
    </GuideShell>
  );
}
