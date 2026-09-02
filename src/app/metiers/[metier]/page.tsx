import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  ScaleIcon,
  TargetIcon,
  CompassIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import {
  METIERS,
  NIVEAUX,
  getMetier,
  median,
  netMensuel,
  coutEmployeurAnnuel,
  percentile,
  tjmEquivalent,
  memeCategorie,
  ANCRAGE_APEC,
} from "@/lib/metiers";

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const KEUR = (n: number) => `${Math.round(n / 1000)} k€`;

export function generateStaticParams() {
  return METIERS.map((m) => ({ metier: m.id }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string }>;
}): Promise<Metadata> {
  const { metier: slug } = await params;
  const m = getMetier(slug);
  if (!m) return {};
  const confirmeIdf = median(m.idf.confirme);
  const net = netMensuel(confirmeIdf);

  return {
    title: `Salaire ${m.label} en 2026 : fourchettes, net et TJM équivalent`,
    description: `Un ${m.label.toLowerCase()} confirmé gagne ${KEUR(m.idf.confirme[0] * 1000)} à ${KEUR(m.idf.confirme[1] * 1000)} bruts par an en Île-de-France, soit environ ${EUR.format(net)} nets par mois. Fourchettes par niveau et par région, conversion en net calculée, percentile INSEE et TJM freelance d'équivalence.`,
    alternates: { canonical: `/metiers/${slug}` },
    openGraph: {
      title: `Salaire ${m.label} en 2026`,
      description: `Fourchettes par niveau et région, net mensuel calculé, et le TJM à facturer pour gagner autant en freelance.`,
      url: `/metiers/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier: slug } = await params;
  const m = getMetier(slug);
  if (!m) notFound();

  const confirmeIdf = median(m.idf.confirme);
  const netConfirme = netMensuel(confirmeIdf);
  const pctConfirme = percentile(confirmeIdf);
  const tjmConfirme = tjmEquivalent(confirmeIdf);
  const ecartRegion =
    (median(m.idf.confirme) / median(m.province.confirme) - 1) * 100;
  const voisins = memeCategorie(slug);

  const faq = [
    {
      q: `Quel est le salaire d'un ${m.label.toLowerCase()} en 2026 ?`,
      r: `En Île-de-France, la fourchette va de ${KEUR(m.idf.junior[0] * 1000)} à ${KEUR(m.idf.junior[1] * 1000)} bruts annuels en début de carrière, ${KEUR(m.idf.confirme[0] * 1000)} à ${KEUR(m.idf.confirme[1] * 1000)} pour un profil confirmé, et jusqu'à ${KEUR(m.idf.expert[1] * 1000)} pour un expert. En province, comptez environ ${Math.round(ecartRegion)} % de moins à niveau équivalent. Un profil confirmé francilien au milieu de fourchette perçoit donc autour de ${EUR.format(netConfirme)} nets par mois avant impôt.`,
    },
    {
      q: `Combien cela fait-il en net par mois ?`,
      r: `Pour un cadre, comptez environ 78 % du brut après cotisations salariales. Sur le milieu de fourchette d'un profil confirmé en Île-de-France (${KEUR(confirmeIdf)} bruts annuels), cela donne ${EUR.format(netConfirme)} nets mensuels avant impôt sur le revenu. Le prélèvement à la source s'applique ensuite à votre taux personnalisé : à 11 %, il resterait environ ${EUR.format(netConfirme * 0.89)}. Notre simulateur brut/net fait la conversion sur votre salaire exact, dans les deux sens.`,
    },
    {
      q: `Ce salaire est-il bien positionné en France ?`,
      r: `Un ${m.label.toLowerCase()} confirmé en Île-de-France se situe autour du ${pctConfirme}e percentile de la distribution française des salaires du privé (INSEE, données 2024). Pour situer : la médiane nationale est à 2 190 € nets mensuels, et 80 % des cadres se situent entre ${ANCRAGE_APEC.fourchette80PctKEur[0]} et ${ANCRAGE_APEC.fourchette80PctKEur[1]} k€ bruts annuels selon le baromètre APEC 2025, dont la médiane cadres ressort à ${ANCRAGE_APEC.medianeCadresKEur} k€.`,
    },
    {
      q: `Quel TJM faut-il facturer pour gagner autant en freelance ?`,
      r: `Environ ${EUR.format(tjmConfirme)} par jour en portage salarial, sur la base de 18 jours facturés par mois et 150 € de frais professionnels mensuels — c'est le TJM qui reproduit exactement le net d'un profil confirmé francilien. Attention : ce montant reproduit le revenu, pas la protection. Il ne finance ni les intermissions, ni l'absence de garantie de revenu. Notre comparateur salarié ou freelance conseille d'y ajouter environ 25 % de marge de sécurité, soit ${EUR.format(tjmConfirme * 1.25)} par jour.`,
    },
    {
      q: `Combien ce poste coûte-t-il à l'employeur ?`,
      r: `Environ ${EUR.format(coutEmployeurAnnuel(confirmeIdf))} par an pour un profil confirmé francilien, charges patronales comprises — soit près de 1,45 fois le salaire brut. C'est le chiffre utile en négociation, et surtout si vous envisagez de basculer en indépendant chez le même client : c'est le budget réel que l'entreprise consacre au poste, et donc l'ancrage naturel d'une discussion de TJM.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Salaire ${m.label} en 2026`,
      description: `Fourchettes de rémunération par niveau d'expérience et par région, converties en net.`,
      author: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-09-01",
      dateModified: "2026-09-01",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/metiers/${slug}`,
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
        { "@type": "ListItem", position: 2, name: "Salaires par métier", item: `${SITE_URL}/metiers` },
        { "@type": "ListItem", position: 3, name: m.label, item: `${SITE_URL}/metiers/${slug}` },
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
          <Link href="/metiers" className="transition hover:text-primary">Salaires par métier</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">{m.label}</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          À jour septembre 2026 · {m.categorie}
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Salaire {m.label}
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          {KEUR(m.idf.confirme[0] * 1000)} à {KEUR(m.idf.confirme[1] * 1000)} bruts pour un profil confirmé en Île-de-France
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { v: EUR.format(netConfirme), l: "net mensuel avant impôt, profil confirmé IDF" },
            { v: `${pctConfirme}e`, l: "percentile des salaires du privé (INSEE 2024)" },
            { v: `${EUR.format(tjmConfirme)}/j`, l: "TJM à facturer pour gagner autant en freelance" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
              <p className="text-3xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-16">
          <section id="fourchettes" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
              Les fourchettes, du junior à l&apos;expert
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Niveau</th>
                    <th className="px-5 py-4 text-right">Île-de-France<span className="block text-[10px] font-normal normal-case">brut annuel</span></th>
                    <th className="px-5 py-4 text-right">Province<span className="block text-[10px] font-normal normal-case">brut annuel</span></th>
                    <th className="px-5 py-4 text-right">Net mensuel IDF<span className="block text-[10px] font-normal normal-case">milieu de fourchette</span></th>
                  </tr>
                </thead>
                <tbody>
                  {NIVEAUX.map((n) => {
                    const idf = m.idf[n.id];
                    const prov = m.province[n.id];
                    const actif = n.id === "confirme";
                    return (
                      <tr key={n.id} className={`border-b border-border last:border-b-0 ${actif ? "bg-accent/5" : ""}`}>
                        <td className={`px-5 py-3 font-semibold text-foreground ${actif ? "border-l-4 border-accent" : ""}`}>
                          {n.label}
                          <span className="block text-xs font-normal text-muted-foreground">{n.annees}</span>
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                          {KEUR(idf[0] * 1000)} – {KEUR(idf[1] * 1000)}
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums text-foreground/80">
                          {KEUR(prov[0] * 1000)} – {KEUR(prov[1] * 1000)}
                        </td>
                        <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">
                          {EUR.format(netMensuel(median(idf)))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
              L&apos;écart entre l&apos;Île-de-France et la province s&apos;établit
              autour de <strong>{Math.round(ecartRegion)} %</strong> à niveau
              équivalent pour ce métier — un écart à mettre en regard du coût du
              logement, que notre{" "}
              <Link href="/simulateurs/pouvoir-achat-ville" className="text-primary underline-offset-4 hover:underline">
                comparateur de pouvoir d&apos;achat par ville
              </Link>{" "}
              chiffre poste par poste. La conversion en net utilise les taux de
              cotisations cadres 2026 de notre{" "}
              <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
                simulateur brut/net
              </Link>
              .
            </p>
          </section>

          <section id="situer" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
              Où se situe ce métier dans les salaires français
            </h2>
            <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
              <p className="text-base leading-relaxed text-foreground/80">
                Un profil confirmé francilien à {KEUR(confirmeIdf)} bruts
                annuels perçoit {EUR.format(netConfirme)} nets par mois, ce qui
                le place au <strong>{pctConfirme}e percentile</strong> de la
                distribution française des salaires du privé — autrement dit,{" "}
                {pctConfirme >= 50
                  ? `${pctConfirme} % des salariés gagnent moins`
                  : `${100 - pctConfirme} % des salariés gagnent davantage`}
                . La médiane nationale se situe à 2 190 € nets mensuels
                (INSEE, données 2024).
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Repère complémentaire pour les cadres : selon le baromètre APEC
                2025 (enquête de juin 2025 auprès de 26 000 cadres du privé), la
                rémunération médiane des cadres s&apos;établit à{" "}
                {ANCRAGE_APEC.medianeCadresKEur} k€ bruts annuels, et 80 %
                d&apos;entre eux se situent entre{" "}
                {ANCRAGE_APEC.fourchette80PctKEur[0]} et{" "}
                {ANCRAGE_APEC.fourchette80PctKEur[1]} k€. Pour votre situation
                exacte, le simulateur{" "}
                <Link href="/simulateurs/ou-se-situe-mon-salaire" className="text-primary underline-offset-4 hover:underline">
                  « où se situe mon salaire »
                </Link>{" "}
                affine par âge et catégorie socioprofessionnelle.
              </p>
            </div>
          </section>

          <section id="freelance" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
              Le TJM freelance équivalent
            </h2>
            <div className="mt-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
              <p className="text-base leading-relaxed text-foreground/80">
                Question que se pose tout {m.label.toLowerCase()} en réflexion :
                combien faut-il facturer en indépendant pour ne rien perdre ?
                Nous l&apos;avons calculé par bissection, pour chaque niveau, en
                portage salarial sur 18 jours facturés par mois :
              </p>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
                <table className="w-full min-w-[34rem] text-left text-sm">
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Niveau (IDF)</th>
                      <th className="px-5 py-4 text-right">Net salarié / mois</th>
                      <th className="px-5 py-4 text-right">TJM pour égaler</th>
                      <th className="px-5 py-4 text-right">TJM conseillé<span className="block text-[10px] font-normal normal-case">+ 25 % de marge</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {NIVEAUX.map((n) => {
                      const b = median(m.idf[n.id]);
                      const t = tjmEquivalent(b);
                      return (
                        <tr key={n.id} className="border-b border-border last:border-b-0">
                          <td className="px-5 py-3 font-semibold text-foreground">{n.label}</td>
                          <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(netMensuel(b))}</td>
                          <td className="px-5 py-3 text-right font-bold tabular-nums text-foreground">{EUR.format(t)}</td>
                          <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">{EUR.format(t * 1.25)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                La colonne « TJM pour égaler » reproduit le net à l&apos;euro
                près. Celle de droite ajoute 25 % : c&apos;est ce que nous
                conseillons de viser réellement, car un indépendant finance
                lui-même ses intermissions, ses congés et l&apos;absence de
                garantie de revenu. Le détail de cet arbitrage est dans notre{" "}
                <Link href="/simulateurs/salarie-ou-freelance" className="font-semibold text-primary underline-offset-4 hover:underline">
                  comparateur salarié ou freelance
                </Link>
                , qui compare les quatre statuts sur vos chiffres.
              </p>
            </div>
          </section>

          <section id="negocier" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><TargetIcon className="w-4 h-4" /></IconBadge>
              Négocier avec ces chiffres
            </h2>
            <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
              <p className="text-base leading-relaxed text-foreground/80">
                Un poste de {m.label.toLowerCase()} confirmé coûte à
                l&apos;employeur environ{" "}
                <strong>{EUR.format(coutEmployeurAnnuel(confirmeIdf))} par an</strong>,
                charges patronales comprises, pour {KEUR(confirmeIdf)} de brut.
                Connaître ce chiffre change la conversation : vous ne demandez
                pas « plus », vous discutez d&apos;une enveloppe dont vous
                connaissez la taille.
              </p>
              <ul className="mt-5 space-y-3 text-base text-foreground/80">
                <li className="flex gap-3">
                  <span aria-hidden className="text-primary">→</span>
                  <span><strong>Situez-vous d&apos;abord</strong> dans la fourchette de votre niveau et de votre région, puis argumentez le déplacement — pas le montant absolu.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-primary">→</span>
                  <span><strong>Chiffrez le package complet</strong> : <Link href="/guides/13e-mois" className="text-primary underline-offset-4 hover:underline">13e mois</Link>, <Link href="/guides/titres-restaurant" className="text-primary underline-offset-4 hover:underline">titres-restaurant</Link>, <Link href="/guides/indemnite-teletravail" className="text-primary underline-offset-4 hover:underline">indemnité de télétravail</Link> et <Link href="/guides/mutuelle-entreprise" className="text-primary underline-offset-4 hover:underline">mutuelle</Link> pèsent souvent plus qu&apos;on ne le croit face au fixe.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-primary">→</span>
                  <span><strong>Anticipez la transparence salariale</strong> : la directive européenne imposera bientôt l&apos;affichage des fourchettes dans les offres et interdira de demander votre salaire actuel — notre <Link href="/guides/transparence-salaires" className="text-primary underline-offset-4 hover:underline">guide dédié</Link> détaille le calendrier.</span>
                </li>
              </ul>
              <Link
                href="/simulateurs/negociation-salariale"
                className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Simuler ma marge de négociation →
              </Link>
            </div>
          </section>

          {voisins.length > 0 && (
            <section id="voisins" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Autres métiers {m.categorie.toLowerCase()}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {voisins.map((v) => (
                  <li key={v.id}>
                    <Link
                      href={`/metiers/${v.id}`}
                      className="inline-flex rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary"
                    >
                      Salaire {v.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
              Sources et méthode
            </h2>
            <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
              <ul className="space-y-3">
                <li><a href="https://www.apec.fr" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">APEC — Baromètre 2025 de la rémunération des cadres<span aria-hidden> ↗</span></a></li>
                <li><a href="https://www.insee.fr/fr/statistiques/8657156" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">INSEE — Les salaires dans le secteur privé en 2024<span aria-hidden> ↗</span></a></li>
                <li><a href="https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">URSSAF — taux de cotisations 2026<span aria-hidden> ↗</span></a></li>
              </ul>
              <p className="mt-6 text-xs italic text-muted-foreground">
                Les fourchettes de brut sont des estimations de marché
                recoupées, ancrées sur le baromètre APEC 2025 (médiane cadres{" "}
                {ANCRAGE_APEC.medianeCadresKEur} k€) — ce ne sont pas des
                grilles APEC par métier, l&apos;APEC ne les publiant pas sous
                une forme exploitable. Utilisez-les comme ordre de grandeur
                avant une négociation, pas comme référentiel opposable à un
                employeur. Le net, le percentile, le coût employeur et le TJM
                d&apos;équivalence sont en revanche calculés par nos
                simulateurs avec les taux 2026. Une erreur ?{" "}
                <Link href="/contact" className="text-primary underline-offset-4 hover:underline">Signalez-la</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
