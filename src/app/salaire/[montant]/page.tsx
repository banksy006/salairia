import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  PercentIcon,
  ScaleIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import {
  SALAIRE_2026,
  calculerBrutVersNet,
  type Statut,
} from "@/lib/calculators/salaire-brut-net";
import { calculerPercentile } from "@/lib/calculators/percentile-salaire";
import {
  TOUS_MONTANTS,
  estAnnuel,
  parseSlugMontant,
  slugMontant,
  voisins,
} from "@/lib/salaire-montants";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

// Tous les montants affichés sortent du simulateur brut/net (taux 2026).
function calc(montant: number, statut: Statut, tauxPAS = 0) {
  return calculerBrutVersNet({
    salaire: montant,
    mode: "brut-vers-net",
    periodicite: estAnnuel(montant) ? "annuel" : "mensuel",
    statut,
    tauxPAS,
  });
}

function donnees(montant: number) {
  const nonCadre = calc(montant, "non-cadre");
  const cadre = calc(montant, "cadre");
  const pct = calculerPercentile({
    salaireMensuelNet: nonCadre.netAvantImpotMensuel,
    csp: "Tous",
    age: "Tous",
  });
  const smicRatio = nonCadre.brutMensuel / SALAIRE_2026.SMIC_MENSUEL_BRUT;
  return { nonCadre, cadre, pct, smicRatio, annuel: estAnnuel(montant) };
}

export function generateStaticParams() {
  return TOUS_MONTANTS.map((m) => ({ montant: slugMontant(m) }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ montant: string }>;
}): Promise<Metadata> {
  const { montant: slug } = await params;
  const montant = parseSlugMontant(slug);
  if (!montant) return {};
  const d = donnees(montant);
  const periode = d.annuel ? "par an" : "par mois";
  const net = d.annuel ? d.nonCadre.netAvantImpotAnnuel : d.nonCadre.netAvantImpotMensuel;

  return {
    title: `${EUR.format(montant)} brut en net : ${EUR.format(net)} ${periode} (2026)`,
    description: `${EUR.format(montant)} bruts ${periode} font ${EUR.format(net)} nets avant impôt${
      Math.round(net - (d.annuel ? d.cadre.netAvantImpotAnnuel : d.cadre.netAvantImpotMensuel)) >= 1
        ? ` pour un non-cadre, ${EUR.format(d.annuel ? d.cadre.netAvantImpotAnnuel : d.cadre.netAvantImpotMensuel)} pour un cadre`
        : `, cadre comme non-cadre`
    }. Détail des cotisations ligne par ligne, net après impôt et coût employeur, avec les taux 2026.`,
    alternates: { canonical: `/salaire/${slug}` },
    openGraph: {
      title: `${EUR.format(montant)} brut en net : ${EUR.format(net)} ${periode}`,
      description: `Le calcul détaillé, cadre et non-cadre, avec les cotisations 2026.`,
      url: `/salaire/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ montant: string }>;
}) {
  const { montant: slug } = await params;
  const montant = parseSlugMontant(slug);
  if (!montant) notFound();
  const d = donnees(montant);
  const { nonCadre, cadre, pct } = d;
  const periode = d.annuel ? "par an" : "par mois";
  const netAffiche = d.annuel ? nonCadre.netAvantImpotAnnuel : nonCadre.netAvantImpotMensuel;
  const netCadreAffiche = d.annuel ? cadre.netAvantImpotAnnuel : cadre.netAvantImpotMensuel;
  // Sous le plafond de la Sécurité sociale, seule l'APEC (0,024 %) distingue
  // le cadre : l'écart est alors inférieur à l'euro et ne mérite pas deux
  // colonnes — les afficher laisserait croire à une erreur de calcul.
  const ecartCadre = netAffiche - netCadreAffiche;
  const cadreDistinct = Math.round(ecartCadre) >= 1;

  // Trois taux de PAS courants pour illustrer le net réellement versé.
  const scenariosPAS = [3, 7.5, 11].map((taux) => ({
    taux,
    ...calc(montant, "non-cadre", taux),
  }));

  const lignes = [
    { l: "Sécurité sociale (vieillesse)", v: nonCadre.totalSecu, h: "vieillesse plafonnée 6,90 % + déplafonnée 0,40 %" },
    { l: "Retraite complémentaire", v: nonCadre.totalRetraite, h: "AGIRC-ARRCO et contribution d'équilibre" },
    { l: "CSG et CRDS", v: nonCadre.totalCsgCrds, h: "9,70 % sur 98,25 % du brut" },
  ];

  const faq = [
    {
      q: `${EUR.format(montant)} brut, ça fait combien en net ?`,
      r: `Pour un salarié du secteur privé, ${EUR.format(montant)} bruts ${periode} donnent ${EUR.format(netAffiche)} nets avant impôt, soit un taux de cotisations salariales de ${(nonCadre.tauxEffectif * 100).toFixed(1)} %. ${
        cadreDistinct
          ? `Pour un cadre, le net descend à ${EUR.format(netCadreAffiche)} : s'ajoutent l'APEC et, au-delà du plafond de la Sécurité sociale, la contribution d'équilibre technique.`
          : `À ce niveau de salaire, le résultat est le même pour un cadre et un non-cadre : sous le plafond de la Sécurité sociale, la seule cotisation propre aux cadres est l'APEC (0,024 % du brut), soit quelques centimes par mois.`
      } Ces montants s'entendent avant prélèvement à la source — le net réellement versé dépend ensuite de votre taux personnalisé.`,
    },
    {
      q: `Quel est le net après impôt pour ${EUR.format(montant)} bruts ?`,
      r: `Tout dépend de votre taux de prélèvement à la source, qui reflète l'ensemble des revenus de votre foyer. Trois repères pour ce salaire : à 3 %, il reste ${EUR.format(d.annuel ? scenariosPAS[0].netApresAnnuel : scenariosPAS[0].netApresMensuel)} ${periode} ; à 7,5 %, ${EUR.format(d.annuel ? scenariosPAS[1].netApresAnnuel : scenariosPAS[1].netApresMensuel)} ; à 11 %, ${EUR.format(d.annuel ? scenariosPAS[2].netApresAnnuel : scenariosPAS[2].netApresMensuel)}. Votre taux exact figure sur votre dernier bulletin de paie et dans votre espace impots.gouv.fr.`,
    },
    {
      q: `Combien ce salaire coûte-t-il à l'employeur ?`,
      r: `Environ ${EUR.format(d.annuel ? nonCadre.coutEmployeurAnnuel : nonCadre.coutEmployeurMensuel)} ${periode} pour un non-cadre, charges patronales comprises. Autrement dit, entre ce que l'entreprise dépense et ce que vous touchez avant impôt, l'écart est d'environ ${EUR.format((d.annuel ? nonCadre.coutEmployeurAnnuel : nonCadre.coutEmployeurMensuel) - netAffiche)}. C'est ce chiffre — le coût employeur — qui sert de référence quand on négocie un passage en freelance ou en portage salarial, puisqu'il représente le budget réel que l'entreprise consacre à votre poste.`,
    },
    {
      q: `${EUR.format(montant)} bruts, c'est un bon salaire en France ?`,
      r: `Avec ${EUR.format(nonCadre.netAvantImpotMensuel)} nets mensuels, ce salaire se situe au ${pct.percentile}e percentile de la distribution française des salaires du privé — la médiane étant à ${EUR.format(pct.mediane)} nets par mois (INSEE, données 2024). ${pct.percentile >= 50 ? `Autrement dit, ${pct.percentile} % des salariés gagnent moins.` : `Autrement dit, ${100 - pct.percentile} % des salariés gagnent davantage.`} Rapporté au SMIC (${EUR2.format(SALAIRE_2026.SMIC_MENSUEL_BRUT)} bruts mensuels depuis juin 2026), cela représente ${d.smicRatio.toFixed(2)} fois le salaire minimum.`,
    },
    {
      q: `Le statut cadre change-t-il le net à brut égal ?`,
      r: `Trois éléments distinguent le statut cadre : l'APEC (0,024 % du brut, qui finance l'accompagnement des cadres), la contribution d'équilibre technique due au-delà du plafond de la Sécurité sociale (${EUR.format(SALAIRE_2026.PASS_MENSUEL)} par mois en 2026), et une prévoyance obligatoire d'au moins 1,50 % de la tranche 1 à la charge de l'employeur. ${
        cadreDistinct
          ? `Ici, le net d'un cadre est inférieur de ${EUR.format(ecartCadre)} — mais les droits associés, en prévoyance comme en retraite complémentaire, sont supérieurs.`
          : `Pour ${EUR.format(montant)} bruts ${periode}, le salaire reste sous le plafond : seule l'APEC s'applique, pour quelques centimes, et le net est donc identique dans les deux statuts. L'écart n'apparaît qu'au-delà de ${EUR.format(SALAIRE_2026.PASS_MENSUEL)} bruts mensuels.`
      }`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${EUR.format(montant)} brut en net`,
      description: `Conversion de ${EUR.format(montant)} bruts ${periode} en net, avec le détail des cotisations 2026.`,
      url: `${SITE_URL}/salaire/${slug}`,
      inLanguage: "fr-FR",
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      dateModified: "2026-08-29",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Brut en net", item: `${SITE_URL}/salaire` },
        { "@type": "ListItem", position: 3, name: `${EUR.format(montant)} brut en net`, item: `${SITE_URL}/salaire/${slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <Link href="/" className="transition hover:text-primary">Accueil</Link>
          <span aria-hidden>›</span>
          <Link href="/salaire" className="transition hover:text-primary">Brut en net</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">{EUR.format(montant)} brut</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          Taux 2026
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {EUR.format(montant)} brut en net
        </h1>

        {/* La réponse immédiatement, avant tout le reste. */}
        <div className={`mt-6 grid gap-4 ${cadreDistinct ? "sm:grid-cols-2" : ""}`}>
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
              {cadreDistinct ? "Non-cadre · net avant impôt" : "Net avant impôt"}
            </p>
            <p className="mt-2 text-5xl font-bold tabular-nums">{EUR.format(netAffiche)}</p>
            <p className="mt-1 text-sm opacity-80">
              {periode}
              {!cadreDistinct && " · identique en cadre et non-cadre"}
            </p>
          </div>
          {cadreDistinct && (
            <div className="rounded-2xl border border-border bg-white p-8 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cadre · net avant impôt</p>
              <p className="mt-2 text-5xl font-bold tabular-nums text-foreground">{EUR.format(netCadreAffiche)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{periode}</p>
            </div>
          )}
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80">
          {EUR.format(montant)} bruts {periode} laissent{" "}
          <strong>{EUR.format(netAffiche)} nets</strong> à un salarié non-cadre
          du privé, soit {(nonCadre.tauxEffectif * 100).toFixed(1)} % de
          cotisations salariales.{" "}
          {d.annuel
            ? `Sur douze mois, cela représente ${EUR.format(nonCadre.brutMensuel)} bruts et ${EUR.format(nonCadre.netAvantImpotMensuel)} nets par mois.`
            : `Sur l'année, cela représente ${EUR.format(nonCadre.brutAnnuel)} bruts et ${EUR.format(nonCadre.netAvantImpotAnnuel)} nets.`}{" "}
          Ces montants s&apos;entendent avant prélèvement à la source — le
          détail complet est ci-dessous.
        </p>

        <div className="mt-12 space-y-16">
          <section id="detail" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
              D&apos;où vient l&apos;écart : les cotisations ligne par ligne
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Poste</th>
                    <th className="px-5 py-4 text-right">Montant mensuel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-5 py-3 font-semibold text-foreground">Salaire brut</td>
                    <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(nonCadre.brutMensuel)}</td>
                  </tr>
                  {lignes.map((l) => (
                    <tr key={l.l} className="border-b border-border">
                      <td className="px-5 py-3 text-foreground/80">
                        {l.l}
                        <span className="block text-xs text-muted-foreground">{l.h}</span>
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-destructive">− {EUR2.format(l.v)}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-border bg-muted/40">
                    <td className="px-5 py-3 font-semibold text-foreground">
                      Total des cotisations salariales
                      <span className="block text-xs text-muted-foreground">soit {(nonCadre.tauxEffectif * 100).toFixed(1)} % du brut</span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold tabular-nums text-destructive">
                      − {EUR2.format(nonCadre.totalCotisationsSalariales)}
                    </td>
                  </tr>
                  <tr className="bg-accent/5">
                    <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">Net avant impôt</td>
                    <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">
                      {EUR.format(nonCadre.netAvantImpotMensuel)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
              Montants mensuels pour un non-cadre. Le mécanisme complet
              — tranches T1 et T2, plafond de la Sécurité sociale, assiette de
              la CSG — est expliqué dans notre{" "}
              <Link href="/guides/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
                guide du salaire brut et net
              </Link>
              .
            </p>
          </section>

          <section id="apres-impot" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
              Le net réellement versé, après prélèvement à la source
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {scenariosPAS.map((s) => (
                <div key={s.taux} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Taux de PAS {s.taux.toLocaleString("fr-FR")} %
                  </p>
                  <p className="mt-2 text-3xl font-bold tabular-nums text-primary">
                    {EUR.format(d.annuel ? s.netApresAnnuel : s.netApresMensuel)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    net {periode} · − {EUR.format(d.annuel ? s.montantPAS * 12 : s.montantPAS)} d&apos;impôt
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
              Votre taux dépend de l&apos;ensemble des revenus de votre foyer,
              pas de ce seul salaire. Il est actualisé chaque 1er septembre à
              partir de votre déclaration de printemps — et depuis 2025, les
              couples se voient appliquer le{" "}
              <Link href="/actualites/nouveau-taux-prelevement-source-septembre-2026" className="text-primary underline-offset-4 hover:underline">
                taux individualisé par défaut
              </Link>
              . Pour un calcul sur votre situation exacte, utilisez le{" "}
              <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
                simulateur net après impôt
              </Link>
              .
            </p>
          </section>

          <section id="situer" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
              Où se situe ce salaire en France
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { v: `${pct.percentile}e`, l: `percentile des salaires du privé (médiane : ${EUR.format(pct.mediane)} nets)` },
                { v: `${d.smicRatio.toFixed(2)}×`, l: `le SMIC (${EUR2.format(SALAIRE_2026.SMIC_MENSUEL_BRUT)} bruts mensuels)` },
                { v: EUR.format(d.annuel ? nonCadre.coutEmployeurAnnuel : nonCadre.coutEmployeurMensuel), l: `coût employeur ${periode}, charges patronales comprises` },
              ].map((c) => (
                <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
                  <p className="text-3xl font-bold tabular-nums text-primary">{c.v}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
              <p className="text-base leading-relaxed text-foreground/80">
                Le coût employeur est le chiffre à retenir si vous envisagez de
                passer indépendant : c&apos;est le budget réel que votre
                entreprise consacre à votre poste, et donc l&apos;ancrage
                naturel d&apos;une négociation de TJM. Notre{" "}
                <Link href="/simulateurs/salarie-ou-freelance" className="font-semibold text-primary underline-offset-4 hover:underline">
                  comparateur salarié ou freelance
                </Link>{" "}
                calcule exactement le tarif journalier qu&apos;il faudrait
                facturer pour retrouver ce net.
              </p>
            </div>
          </section>

          <section id="voisins" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Autres montants</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {voisins(montant).map((v) => (
                <Link
                  key={v}
                  href={`/salaire/${slugMontant(v)}`}
                  className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary"
                >
                  {EUR.format(v)} brut en net →
                </Link>
              ))}
              <Link
                href="/simulateurs/salaire-brut-net"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Calculer un autre montant →
              </Link>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
              Questions fréquentes
            </h2>
            <div className="mt-6 space-y-3">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-white p-6 shadow-md transition hover:shadow-lg">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-foreground">
                    {f.q}
                    <span aria-hidden className="mt-1 shrink-0 text-xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">{f.r}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="sources" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><ExternalLinkIcon className="w-4 h-4" /></IconBadge>
              Sources
            </h2>
            <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
              <ul className="space-y-3">
                <li><a href="https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">URSSAF — taux de cotisations et barèmes 2026<span aria-hidden> ↗</span></a></li>
                <li><a href="https://www.agirc-arrco.fr/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">AGIRC-ARRCO — taux de retraite complémentaire<span aria-hidden> ↗</span></a></li>
                <li><a href="https://www.insee.fr/fr/statistiques/8657156" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">INSEE — les salaires dans le secteur privé en 2024<span aria-hidden> ↗</span></a></li>
              </ul>
              <p className="mt-6 text-xs italic text-muted-foreground">
                Calculs indicatifs réalisés par notre simulateur avec les taux
                2026, pour un temps plein de 151,67 heures sans mutuelle ni
                prévoyance facultative. Votre bulletin réel peut différer selon
                votre convention collective et vos avantages. Une erreur ?{" "}
                <Link href="/contact" className="text-primary underline-offset-4 hover:underline">Signalez-la</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
