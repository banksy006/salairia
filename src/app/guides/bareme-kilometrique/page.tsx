import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalculatorIcon, ScaleIcon, InfoIcon, ReceiptIcon } from "@/components/icons";

// Barème kilométrique voitures — arrêté fiscal, inchangé depuis 2024.
// Source : BOFiP BOI-BAREME-000001 ; vérifié le 25 août 2026.
// Slug sans millésime : mis à jour chaque année à la parution de l'arrêté (~mars).
const BAREME = [
  { cv: "3 CV et moins", t1: 0.529, t2: 0.316, f2: 1_065, t3: 0.370 },
  { cv: "4 CV", t1: 0.606, t2: 0.340, f2: 1_330, t3: 0.407 },
  { cv: "5 CV", t1: 0.636, t2: 0.357, f2: 1_395, t3: 0.427 },
  { cv: "6 CV", t1: 0.665, t2: 0.374, f2: 1_457, t3: 0.447 },
  { cv: "7 CV et plus", t1: 0.697, t2: 0.394, f2: 1_515, t3: 0.470 },
] as const;
const MAJORATION_ELECTRIQUE = 0.20;

// Exemple fil rouge : 5 CV, 12 000 km/an (tranche intermédiaire).
const KM = 12_000;
const b5 = BAREME[2];
const exemple = KM * b5.t2 + b5.f2;
const exempleElec = exemple * (1 + MAJORATION_ELECTRIQUE);

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const NUM = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 3 });

const meta: GuideMeta = {
  slug: "bareme-kilometrique",
  titre: "Barème kilométrique : le tableau et le calcul",
  sousTitre: `12 000 km en 5 CV = ${EUR.format(exemple)} déductibles — ${EUR.format(exempleElec)} en électrique`,
  chapo: `Le barème kilométrique permet de déduire de son revenu imposable — ou de se faire rembourser par son entreprise — les trajets professionnels effectués avec son véhicule personnel. Le barème en vigueur est inchangé depuis 2024 ; les véhicules électriques bénéficient d'une majoration de 20 %. Voici le tableau complet, la mécanique des trois tranches, et le match frais réels contre déduction forfaitaire de 10 %.`,
  filAriane: "Barème kilométrique",
  datePublished: "2026-08-25",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "tableau", label: "Le tableau complet" },
    { id: "calcul", label: "Comment calculer" },
    { id: "arbitrage", label: "Frais réels ou 10 % ?" },
    { id: "usages", label: "Salarié, dirigeant, indépendant" },
  ],
  faq: [
    {
      q: "Comment fonctionne le calcul par tranches du barème kilométrique ?",
      r: `Le barème comporte trois formules selon la distance professionnelle annuelle : jusqu'à 5 000 km, un tarif au kilomètre simple ; de 5 001 à 20 000 km, un tarif réduit plus un forfait fixe ; au-delà de 20 000 km, un tarif intermédiaire. Contrairement à l'impôt sur le revenu, ce n'est pas un calcul par tranches successives : on applique une seule formule, celle de sa distance totale. Exemple en 5 CV pour ${KM.toLocaleString("fr-FR")} km : (${KM.toLocaleString("fr-FR")} × 0,357) + 1 395 = ${EUR.format(exemple)}.`,
    },
    {
      q: "Que couvre le barème, et que peut-on déduire en plus ?",
      r: "Le barème est réputé couvrir la dépréciation du véhicule, l'entretien, les réparations, les pneus, le carburant et l'assurance. On peut y ajouter les frais de péage et de stationnement professionnels, ainsi que les intérêts d'un crédit auto au prorata de l'usage professionnel — sur justificatifs. On ne peut rien déduire d'autre du véhicule lui-même : choisir le barème, c'est renoncer à déduire le carburant ou l'entretien en frais réels détaillés.",
    },
    {
      q: "Quelle est la règle pour les trajets domicile-travail ?",
      r: "Ils sont déductibles dans la limite de 40 km par trajet (80 km aller-retour). Au-delà, il faut justifier l'éloignement par des circonstances particulières — mutation du conjoint, impossibilité de se loger plus près, précarité de l'emploi. Un seul aller-retour par jour est admis, sauf contraintes particulières (horaires atypiques, personne à charge nécessitant une présence). Le kilométrage retenu se calcule sur le trajet le plus court raisonnable.",
    },
    {
      q: "La majoration de 20 % pour les électriques s'applique-t-elle à tout ?",
      r: "Elle s'applique au résultat du barème pour les véhicules 100 % électriques — pas aux hybrides, même rechargeables. Sur notre exemple à 12 000 km en 5 CV, elle porte la déduction de " + `${EUR.format(exemple)} à ${EUR.format(exempleElec)}. La logique : compenser un coût d'acquisition plus élevé alors que le barème valorise notamment la dépréciation. C'est l'un des rares avantages fiscaux de l'électrique côté salarié.`,
    },
    {
      q: "Le barème 2027 va-t-il augmenter ?",
      r: "L'arrêté est publié chaque année vers mars, pour la déclaration des revenus de l'année précédente. Le barème est gelé depuis 2024, après la hausse exceptionnelle de 10 % décidée en 2022 face à la flambée des carburants. Rien n'oblige l'administration à revaloriser : le gel est une forme d'économie budgétaire discrète, puisque l'inflation érode la valeur réelle de la déduction. Cette page sera mise à jour dès la parution de l'arrêté 2027 — c'est précisément son rôle.",
    },
  ],
  sources: [
    { label: "BOFiP — barème forfaitaire kilométrique (BOI-BAREME-000001)", href: "https://bofip.impots.gouv.fr/bofip/2185-PGP.html/identifiant=BOI-BAREME-000001-20250409" },
    { label: "impots.gouv.fr — frais réels : calcul des frais de véhicule", href: "https://www.impots.gouv.fr/particulier/questions/comment-calculer-mes-frais-kilometriques" },
    { label: "service-public.fr — simulateur de frais kilométriques", href: "https://www.service-public.fr/particuliers/vosdroits/R56419" },
    { label: "URSSAF — indemnités kilométriques (employeurs)", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/indemnites-kilometriques.html" },
  ],
};

export const metadata: Metadata = {
  title: `Barème kilométrique 2026 : tableau complet et calcul (${EUR.format(exemple)} pour 12 000 km en 5 CV)`,
  description: `Le barème kilométrique voiture en vigueur (inchangé depuis 2024) : les 5 puissances fiscales, les 3 tranches, la majoration de 20 % pour les électriques, la limite des 40 km domicile-travail, et l'arbitrage frais réels vs déduction forfaitaire de 10 %.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Barème kilométrique : le tableau et le calcul",
    description: "Tableau complet, mécanique des tranches, majoration électrique, et frais réels vs 10 %.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="tableau" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ReceiptIcon className="w-4 h-4" /></IconBadge>
          Le tableau complet (voitures)
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Puissance fiscale</th>
                <th className="px-5 py-4 text-right">Jusqu&apos;à 5 000 km</th>
                <th className="px-5 py-4 text-right">5 001 à 20 000 km</th>
                <th className="px-5 py-4 text-right">Au-delà de 20 000 km</th>
              </tr>
            </thead>
            <tbody>
              {BAREME.map((b) => (
                <tr key={b.cv} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{b.cv}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">d × {NUM(b.t1)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">(d × {NUM(b.t2)}) + {b.f2.toLocaleString("fr-FR")}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-foreground/80">d × {NUM(b.t3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          <em>d</em> = distance professionnelle annuelle en kilomètres. Les
          véhicules de plus de 7 CV utilisent la ligne 7 CV (plafonnement).
          Les <strong>véhicules 100 % électriques</strong> majorent le
          résultat de <strong>{MAJORATION_ELECTRIQUE * 100} %</strong> ; les
          hybrides n&apos;y ont pas droit. Des barèmes distincts existent pour
          les motos et cyclomoteurs.
        </p>
      </section>

      <section id="calcul" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
          Le calcul, pas à pas
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Cas type : une berline de 5 CV, {KM.toLocaleString("fr-FR")} km
            professionnels dans l&apos;année (soit ~26 km de trajet
            domicile-travail aller-retour sur 230 jours). La distance tombe
            dans la tranche intermédiaire, donc <strong>une seule
            formule</strong> s&apos;applique :
          </p>
          <div className="mt-4 rounded-xl bg-muted p-5 text-center">
            <p className="font-semibold tabular-nums text-foreground">
              ({KM.toLocaleString("fr-FR")} × 0,357) + 1 395 = <span className="text-primary">{EUR.format(exemple)}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              en 100 % électrique : {EUR.format(exemple)} × 1,20 = <strong>{EUR.format(exempleElec)}</strong>
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Ce montant se déduit du salaire imposable</strong> (case frais réels de la déclaration), pas de l&apos;impôt : le gain réel dépend de votre tranche marginale. À 30 %, {EUR.format(exemple)} déduits font ~{EUR.format(exemple * 0.3)} d&apos;impôt en moins.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>S&apos;ajoutent</strong> péages et stationnement professionnels sur justificatifs — conservez-les 3 ans, l&apos;administration peut les demander.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>Domicile-travail : 40 km maximum par trajet</strong> sans justification particulière, un aller-retour par jour. C&apos;est la limite qui écrête le plus de dossiers.</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="arbitrage" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Frais réels ou déduction forfaitaire de 10 % : le vrai match
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Par défaut, l&apos;administration applique à tous les salariés un
            abattement de <strong>10 % du salaire</strong> (plafonné à environ
            14 400 €). Opter pour les frais réels — dont le barème
            kilométrique est presque toujours la pièce maîtresse — n&apos;a de
            sens que si le total dépasse ces 10 %. La règle rapide :
          </p>
          <ul className="mt-4 space-y-2 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-accent">✅</span>
              <span>Salaire de 30 000 € → l&apos;abattement vaut 3 000 €. Nos {EUR.format(exemple)} de barème le battent nettement : <strong>frais réels gagnants</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span>Salaire de 55 000 € → abattement de 5 500 €. Le même kilométrage ne suffit plus, sauf à ajouter repas, double résidence ou gros trajets justifiés.</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            L&apos;option se fait chaque année, salarié par salarié au sein du
            foyer — un conjoint peut être aux frais réels et l&apos;autre aux
            10 %. Et elle oblige à réintégrer les remboursements de frais de
            l&apos;employeur dans le salaire imposable : faites le calcul
            complet avant de cocher.
          </p>
        </div>
      </section>

      <section id="usages" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Le même barème pour trois usages différents
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Salarié</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Déduction aux frais réels dans la déclaration de revenus, contre
              renoncement aux 10 %. C&apos;est l&apos;usage principal du
              barème — vérifiable avec le simulateur officiel (en sources).
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Dirigeant de société</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Un président de SASU qui utilise sa voiture personnelle pour la
              société peut se faire rembourser en indemnités kilométriques au
              barème : charge déductible pour la société, non imposable pour
              lui. Un des rares flux « gratuits » entre la société et le
              dirigeant — notre{" "}
              <Link href="/guides/salaire-president-sasu" className="text-primary underline-offset-4 hover:underline">
                guide rémunération du président
              </Link>{" "}
              le replace dans l&apos;ensemble.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Indépendant au réel</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              En BNC à la déclaration contrôlée, le barème peut remplacer les
              frais réels de véhicule. En micro-entreprise, en revanche,
              <strong> aucune déduction</strong> : l&apos;abattement
              forfaitaire couvre tout — l&apos;un des paramètres du choix de
              statut chiffrés par notre{" "}
              <Link href="/simulateurs/auto-entrepreneur" className="text-primary underline-offset-4 hover:underline">
                simulateur auto-entrepreneur
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </GuideShell>
  );
}
