import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, PercentIcon, ScaleIcon, InfoIcon, BuildingIcon } from "@/components/icons";
import { calculerPortage, comparerSocietes } from "@/lib/calculators/portage";
import societesData from "@/data/societes-portage.json";

const TJM = 500;
const JOURS = 18;
const inputs = {
  tjm: TJM,
  joursTravailles: JOURS,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior" as const,
  tauxPAS: 0,
};
const comp = comparerSocietes(inputs);
const meilleur = comp.reduce((a, b) => (b.netFinal > a.netFinal ? b : a));
const pire = comp.reduce((a, b) => (b.netFinal < a.netFinal ? b : a));
const ecartMensuel = meilleur.netFinal - pire.netFinal;
const ca = calculerPortage(inputs).caHT;

// Tableau des 10 sociétés : les frais sont modélisés selon le modèle tarifaire
// déclaré dans societes-portage.json (pourcentage, pourcentage plafonné,
// abonnement fixe), ce que `comparerSocietes` ne fait pas (taux simple
// uniquement, abonnements et sociétés sous alerte écartés).
type Modele = "pourcentage" | "plafonné" | "abonnement";
interface SocieteJson {
  slug: string;
  nom: string;
  fraisGestion: string;
  plafond: string | null;
  tauxEstimePct: number | null;
  tarifPublie: boolean;
  alerte: { titre: string } | null;
}
const CA_PALIERS = [5_000, 10_000, 15_000];
const lignesTableau = (societesData as SocieteJson[])
  .map((s) => {
    const montantFixe = s.plafond ? parseInt(s.plafond, 10) : null;
    const modele: Modele = s.tauxEstimePct === null ? "abonnement" : montantFixe ? "plafonné" : "pourcentage";
    const frais = (caMensuel: number): number => {
      if (modele === "abonnement") return montantFixe ?? 0;
      const proportionnel = caMensuel * ((s.tauxEstimePct ?? 0) / 100);
      return modele === "plafonné" ? Math.min(proportionnel, montantFixe ?? Infinity) : proportionnel;
    };
    const nets = CA_PALIERS.map((caMensuel) =>
      s.alerte
        ? null
        : calculerPortage(
            { ...inputs, tjm: caMensuel, joursTravailles: 1 },
            { tauxFraisGestionOverride: (frais(caMensuel) / caMensuel) * 100 },
          ).salaireNetAvantImpot,
    );
    return { slug: s.slug, nom: s.nom, modele, affiche: s.fraisGestion, publie: s.tarifPublie, exclue: s.alerte?.titre ?? null, nets };
  })
  .sort((a, b) => (b.nets[1] ?? -1) - (a.nets[1] ?? -1));
const maxParPalier = CA_PALIERS.map((_, i) => Math.max(...lignesTableau.map((l) => l.nets[i] ?? 0)));
const nbPubliees = lignesTableau.filter((l) => l.publie).length;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const meta: GuideMeta = {
  slug: "frais-gestion-portage-salarial",
  titre: "Frais de gestion en portage salarial",
  sousTitre: `Le tableau des 10 sociétés : jusqu'à ${EUR.format(ecartMensuel * 12)} d'écart par an sur votre net`,
  chapo: `Les frais de gestion sont la seule variable du portage que vous choisissez vraiment — les charges sociales, elles, sont les mêmes partout. Trois modèles coexistent : le pourcentage simple, le pourcentage plafonné et l'abonnement fixe. Le tableau ci-dessous donne, pour les 10 sociétés de notre comparatif, le modèle, les frais affichés et le net calculé à 5 000, 10 000 et 15 000 € de facturation mensuelle. À ${TJM} € de TJM, l'écart entre la société la moins chère et la plus chère atteint ${EUR.format(ecartMensuel)} nets par mois.`,
  filAriane: "Frais de gestion portage",
  datePublished: "2026-08-19",
  dateModified: "2026-11-05",
  tocItems: [
    { id: "tableau", label: "Le tableau des 10 sociétés" },
    { id: "couvrent", label: "Ce qu'ils couvrent" },
    { id: "impact", label: "L'impact chiffré" },
    { id: "modeles", label: "Les 3 modèles" },
    { id: "negocier", label: "Négocier ses frais" },
  ],
  faq: [
    {
      q: "Que couvrent réellement les frais de gestion ?",
      r: "L'administratif complet : établissement des bulletins de paie, déclarations sociales, facturation et relance de vos clients, contrat de travail, assurance responsabilité civile professionnelle, et l'accompagnement (conseiller, formations selon les sociétés). C'est le prix du statut salarié sans structure à gérer. Ce qu'ils ne couvrent jamais : vos cotisations sociales, qui s'appliquent après et représentent une part bien plus importante du CA.",
    },
    {
      q: "Des frais bas signifient-ils un service au rabais ?",
      r: "Pas mécaniquement, mais il faut vérifier ce qui sort du forfait. Certaines sociétés à taux réduit facturent en sus la mutuelle, les frais de sourcing, la mise à disposition d'outils, ou appliquent des frais sur les remboursements de frais professionnels. Le bon réflexe : demander une simulation écrite « tout compris » sur votre TJM et comparer le net final, pas le taux affiché. Notre comparatif signale les sociétés qui ne publient pas leur grille.",
    },
    {
      q: "Les frais de gestion sont-ils négociables ?",
      r: "Souvent, oui — surtout au-delà de 8 000 à 10 000 € de facturation mensuelle, où plusieurs sociétés appliquent des taux dégressifs par paliers. Un consultant à fort CA peut obtenir 1 à 2 points de moins que le taux affiché. À l'inverse, en dessous de 5 000 € mensuels, la marge de négociation est quasi nulle : vous êtes dans le cœur de cible tarifaire.",
    },
    {
      q: "Un taux plafonné est-il toujours plus intéressant ?",
      r: `Non — tout dépend de votre CA. Un plafond à 650 €/mois ne sert à rien si 5 % de votre facturation reste sous ce montant, c'est-à-dire en dessous de 13 000 € de CA mensuel. En dessous, comparez les taux effectifs ; au-dessus, le plafonnement devient un avantage qui croît avec votre facturation. L'abonnement fixe suit la même logique avec un point de bascule plus bas.`,
    },
    {
      q: "Pourquoi certaines sociétés ne publient-elles pas leurs frais ?",
      r: "Six des dix sociétés de notre comparatif ne publient aucune grille tarifaire : le taux s'obtient en échange commercial, ce qui leur permet de l'ajuster selon le profil. Ce n'est pas disqualifiant, mais cela impose de demander une proposition écrite avant de comparer — et notre comparatif signale explicitement ces sociétés pour que vous sachiez lesquelles exigent cette démarche.",
    },
  ],
  sources: [
    { label: "Grilles tarifaires publiques des sociétés (liens dans notre comparatif)", href: "https://salairia.com/comparateurs/portage-salarial" },
    { label: "Convention collective portage salarial (IDCC 3219)", href: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" },
    { label: "PEPS — syndicat professionnel du portage", href: "https://www.peps-syndicat.fr" },
  ],
};

export const metadata: Metadata = {
  title: "Frais de gestion portage salarial : le tableau des 10 sociétés (2026)",
  description: `Modèle tarifaire, frais affichés et net calculé à 5 000, 10 000 et 15 000 € de CA mensuel pour 10 sociétés de portage. À ${TJM} € de TJM, l'écart atteint ${EUR.format(ecartMensuel)} nets/mois.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Frais de gestion en portage : l'impact réel sur votre net",
    description: `Jusqu'à ${EUR.format(ecartMensuel * 12)} par an d'écart selon la société. Les trois modèles décryptés.`,
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="tableau" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><BuildingIcon className="w-4 h-4" /></IconBadge>
          Le tableau des 10 sociétés de portage
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Pour chaque société du{" "}
          <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">comparatif</Link>
          , le modèle de frais, le tarif affiché, et le net mensuel avant impôt
          calculé à trois niveaux de facturation. Les frais sont modélisés tels
          qu&apos;annoncés — pourcentage simple, pourcentage plafonné ou
          abonnement fixe —, à charges sociales identiques. Le meilleur net de
          chaque colonne est en vert.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-4">Société</th>
                <th className="px-4 py-4">Modèle</th>
                <th className="px-4 py-4">Frais affichés</th>
                <th className="px-4 py-4 text-center">Grille publiée</th>
                {CA_PALIERS.map((p) => (
                  <th key={p} className="px-4 py-4 text-right whitespace-nowrap">Net à {p.toLocaleString("fr-FR")} € de CA</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lignesTableau.map((l) => (
                <tr key={l.slug} className={`border-b border-border last:border-b-0 ${l.exclue ? "text-muted-foreground" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-foreground">
                    <Link href={`/comparateurs/portage-salarial/${l.slug}`} className="hover:text-primary hover:underline">{l.nom}</Link>
                    {l.exclue && <span className="mt-1 block text-xs font-normal text-destructive">{l.exclue} — exclue</span>}
                  </td>
                  <td className="px-4 py-3 capitalize text-foreground/80">{l.modele}</td>
                  <td className="px-4 py-3 text-foreground/80">{l.affiche}</td>
                  <td className="px-4 py-3 text-center text-foreground/80">{l.publie ? "oui" : "non"}</td>
                  {l.nets.map((n, i) => (
                    <td key={i} className={`px-4 py-3 text-right tabular-nums ${n !== null && n === maxParPalier[i] ? "font-bold text-accent" : "text-foreground"}`}>
                      {n === null ? "—" : EUR.format(n)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Hypothèses : statut senior, aucun frais professionnel, charges
          patronales 43 % et salariales 22 % (moyennes de marché), net avant
          impôt sur le revenu. Abonnement Jump retenu sur sa formule de base ;
          la taxe et l&apos;assurance de 1 % annoncées par Régie Portage ne sont
          pas modélisées. Grille publiée pour {nbPubliees} sociétés sur 10 ;
          pour les autres, taux estimé de marché, signalé comme tel dans le
          comparatif. Taux vérifiés entre juillet et octobre 2026.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Lecture : un abonnement à 99 € coûte moins qu&apos;un pourcentage à
          5 % dès 2 000 € de CA mensuel, et l&apos;écart grandit avec la
          facturation. Le plafonnement, lui, ne joue qu&apos;au-delà de 13 000 €
          de CA (650 € ÷ 5 %) : en dessous, une société plafonnée à 5 % se
          comporte comme un pourcentage simple à 5 %. Entre le modèle le moins
          cher et un pourcentage à 10 %, l&apos;écart atteint{" "}
          {EUR.format(maxParPalier[2] - Math.min(...lignesTableau.filter((l) => !l.exclue).map((l) => l.nets[2] ?? Infinity)))}{" "}
          nets par mois à 15 000 € de CA. Le tarif n&apos;est pas tout : les
          services inclus, l&apos;avance de salaire et la solidité financière de
          la société comptent autant — c&apos;est l&apos;objet du comparatif. Ce
          tableau peut être cité librement avec un lien vers cette page.
        </p>
      </section>

      <section id="couvrent" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que les frais de gestion couvrent — et ce qu&apos;ils ne couvrent pas
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les frais de gestion rémunèrent la société de portage pour tout ce
            qu&apos;elle fait à votre place : paie, déclarations sociales,
            facturation et recouvrement, contrat de travail, RC professionnelle,
            accompagnement. Ils sont prélevés <strong>en premier</strong>, sur
            le chiffre d&apos;affaires hors taxes, avant tout calcul de charges.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Erreur fréquente : croire que des frais à 5 % signifient garder
            95 %. Après les frais viennent les charges patronales puis
            salariales — au total, le net représente 45 à 50 % du CA selon la
            société. Les frais de gestion ne sont donc pas le plus gros
            prélèvement, mais ils sont <strong>le seul sur lequel vous avez la
            main</strong> : les charges sociales sont identiques partout.
          </p>
        </div>
      </section>

      <section id="impact" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          L&apos;impact chiffré, société par société
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Net mensuel calculé pour {EUR.format(ca)} de facturation ({TJM} € ×{" "}
          {JOURS} jours), à taux de charges identiques — seule la variable
          « frais de gestion » change. Sociétés dont le taux est modélisable,
          triées par net décroissant :
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Société</th>
                <th className="px-5 py-4 text-right">Frais de gestion</th>
                <th className="px-5 py-4 text-right">Net mensuel estimé</th>
                <th className="px-5 py-4 text-right">Écart vs le meilleur</th>
              </tr>
            </thead>
            <tbody>
              {[...comp].sort((a, b) => b.netFinal - a.netFinal).map((l) => (
                <tr key={l.societe.nom} className={`border-b border-border last:border-b-0 ${l.netFinal === meilleur.netFinal ? "bg-accent/5" : ""}`}>
                  <td className={`px-5 py-3 font-semibold text-foreground ${l.netFinal === meilleur.netFinal ? "border-l-4 border-accent" : ""}`}>{l.societe.nom}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{l.societe.tauxFraisGestion} %</td>
                  <td className="px-5 py-3 text-right text-lg font-bold tabular-nums">{EUR.format(l.netFinal)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">
                    {l.netFinal === meilleur.netFinal ? "—" : `− ${EUR.format(meilleur.netFinal - l.netFinal)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs italic text-muted-foreground">
          Taux publiés ou estimations de marché signalées comme telles dans
          notre comparatif. Les plafonnements et paliers dégressifs ne sont pas
          modélisés ici — ils renforcent l&apos;écart en faveur des sociétés
          plafonnées au-delà de 13 000 € de CA mensuel.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Sur un an, l&apos;écart entre les deux extrêmes représente{" "}
          <strong>{EUR.format(ecartMensuel * 12)}</strong> — l&apos;équivalent
          de plusieurs semaines de facturation. Le choix de la société n&apos;est
          pas un détail administratif.
        </p>
      </section>

      <section id="modeles" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les trois modèles de facturation
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Le pourcentage simple</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              4 à 10 % du CA, sans limite. Simple à comparer, linéaire avec
              votre activité. C&apos;est le modèle dominant — et le plus coûteux
              pour les gros facturants, puisque les frais montent sans fin avec
              le CA.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Le pourcentage plafonné</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Un taux, mais avec un maximum mensuel — 650 € ou 700 € chez les
              sociétés qui le pratiquent. Au-delà du CA de bascule (plafond ÷
              taux), chaque euro facturé supplémentaire ne paie plus de frais.
              Avantageux pour les TJM élevés.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">L&apos;abonnement fixe</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Un forfait mensuel — 99 € HT chez Jump — quel que soit le CA.
              Imbattable à forte facturation, moins pertinent à faible volume où
              le forfait pèse proportionnellement plus lourd qu&apos;un
              pourcentage.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les points de bascule dépendent de votre CA : en dessous d&apos;environ
          20 000 € annuels, le pourcentage reste compétitif ; entre 20 000 et
          150 000 €, l&apos;abonnement et le plafonné prennent l&apos;avantage
          progressivement. Le détail société par société — y compris services
          inclus et avis clients — est dans notre{" "}
          <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
            comparatif des 10 sociétés de portage
          </Link>
          .
        </p>
      </section>

      <section id="negocier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Négocier — et vérifier ce qui n&apos;est pas dans le taux
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Avant de signer, posez trois questions écrites : le taux est-il
            dégressif selon le CA ? Que facturez-vous en dehors des frais de
            gestion — mutuelle, gestion des frais professionnels, outils ? Et
            surtout : <strong>quel est mon net exact pour ce TJM, tout
            compris ?</strong> Une société sérieuse répond par une simulation
            détaillée. Comparez ensuite ce net final entre deux ou trois
            sociétés — c&apos;est le seul chiffre qui compte.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/comparateurs/portage-salarial" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
              Comparer les 10 sociétés →
            </Link>
            <Link href="/simulateurs/portage-salarial" className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary">
              Simuler mon net par taux de frais
            </Link>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
