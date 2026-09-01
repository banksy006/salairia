import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  IconBadge,
  CalendarIcon,
  CalculatorIcon,
  ShieldIcon,
  ScaleIcon,
  MessageCircleIcon,
  ExternalLinkIcon,
  AlertTriangleIcon,
} from "@/components/icons";
import { calculerPortage } from "@/lib/calculators/portage";
import societesData from "@/data/societes-portage.json";

interface Societe {
  id: string;
  nom: string;
  slug: string;
  creation: number;
  fraisGestion: string;
  fraisDetail: string;
  plafond: string | null;
  avisPlateforme: string;
  avisNote: number;
  avisNombre: number;
  labelPEPS: boolean;
  portesTotal: string;
  reseau: string;
  avanceSalaire: boolean;
  services: string[];
  idealPour: string;
  points_forts: string[];
  points_faibles: string[];
  site: string;
  tarifPublie: boolean;
  dateVerification: string;
  tauxEstimePct: number | null;
}

const societes = societesData as unknown as Societe[];
const get = (slug: string) => societes.find((s) => s.slug === slug);

// Cas de référence commun à toutes les fiches, pour que les nets soient
// comparables d'une société à l'autre : seul le taux de frais change.
const TJM = 500;
const JOURS = 18;
const CA_MENSUEL = TJM * JOURS;

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const PCT1 = (x: number) => x.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function simuler(taux: number) {
  return calculerPortage({
    tjm: TJM,
    joursTravailles: JOURS,
    tauxFraisGestion: taux,
    fraisProRefacturables: 0,
    fraisProNonRefacturables: 0,
    statut: "senior",
    tauxPAS: 0,
  });
}

/** Sociétés dont le taux est connu, triées par frais croissants. */
const avecTaux = societes
  .filter((s) => typeof s.tauxEstimePct === "number")
  .sort((a, b) => (a.tauxEstimePct as number) - (b.tauxEstimePct as number));

export function generateStaticParams() {
  return societes.map((s) => ({ societe: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ societe: string }>;
}): Promise<Metadata> {
  const { societe: slug } = await params;
  const s = get(slug);
  if (!s) return {};
  const net = s.tauxEstimePct !== null ? simuler(s.tauxEstimePct).salaireNetAvantImpot : null;

  return {
    title: `${s.nom} : frais, services et avis clients (2026)`,
    description: `${s.nom}, société de portage salarial créée en ${s.creation} : frais de gestion ${s.fraisGestion}, ${s.labelPEPS ? "label PEPS" : "sans label PEPS"}, note ${s.avisNote}/5 sur ${s.avisNombre} avis ${s.avisPlateforme}.${net ? ` Net calculé : ${EUR.format(net)} par mois pour ${EUR.format(CA_MENSUEL)} facturés.` : ""} Analyse indépendante Salairia.`,
    alternates: { canonical: `/comparateurs/portage-salarial/${slug}` },
    openGraph: {
      title: `${s.nom} : frais, services et avis clients`,
      description: `Frais ${s.fraisGestion}, ${s.portesTotal} consultants portés. Le net calculé sur un cas type.`,
      url: `/comparateurs/portage-salarial/${slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ societe: string }>;
}) {
  const { societe: slug } = await params;
  const s = get(slug);
  if (!s) notFound();

  const r = s.tauxEstimePct !== null ? simuler(s.tauxEstimePct) : null;
  // Position de la société dans le classement des frais, quand il est connu.
  const rang = s.tauxEstimePct !== null ? avecTaux.findIndex((x) => x.slug === s.slug) + 1 : null;
  const moinsCher = avecTaux[0];
  const netMoinsCher = simuler(moinsCher.tauxEstimePct as number).salaireNetAvantImpot;

  // Jump facture un abonnement fixe : on convertit en taux équivalent pour
  // rendre son modèle comparable au reste du marché.
  const abonnementMensuel = s.tauxEstimePct === null ? 99 : null;
  const tauxEquivalent = abonnementMensuel ? (abonnementMensuel / CA_MENSUEL) * 100 : null;

  const faq = [
    {
      q: `Quels sont les frais de gestion de ${s.nom} ?`,
      r: `${s.fraisGestion}. ${s.fraisDetail}${s.plafond ? ` Le plafonnement à ${s.plafond} est l'élément déterminant : au-delà d'un certain chiffre d'affaires, les frais cessent d'augmenter, ce qui rend l'offre nettement plus intéressante pour les hauts revenus.` : ""} ${s.tarifPublie ? "Ce tarif est affiché publiquement sur le site de la société." : "Ce tarif n'est pas affiché publiquement : il est communiqué lors du premier échange commercial et peut se négocier selon votre volume d'affaires."} Relevé le ${new Date(s.dateVerification).toLocaleDateString("fr-FR")} — vérifiez-le avant de signer, les grilles évoluent.`,
    },
    {
      q: `Combien reste-t-il en net avec ${s.nom} ?`,
      r: r
        ? `Sur un cas type de ${TJM} € de TJM sur ${JOURS} jours (soit ${EUR.format(CA_MENSUEL)} facturés dans le mois), notre simulateur calcule ${EUR.format(r.fraisGestion)} de frais de gestion, un salaire brut de ${EUR.format(r.salaireBrut)} et ${EUR.format(r.salaireNetAvantImpot)} nets avant impôt. À titre de comparaison, la société la moins chère de notre panel (${moinsCher.nom}, ${moinsCher.fraisGestion}) laisserait ${EUR.format(netMoinsCher)} — soit un écart de ${EUR.format(netMoinsCher - r.salaireNetAvantImpot)} par mois. Ces montants utilisent des taux de charges moyens de marché, pas la grille exacte de la société.`
        : `${s.nom} ne facture pas un pourcentage mais un abonnement fixe de ${abonnementMensuel} € HT par mois, indépendant du chiffre d'affaires. Sur notre cas type de ${EUR.format(CA_MENSUEL)} facturés, cela équivaut à ${PCT1(tauxEquivalent ?? 0)} % de commission — largement sous le marché. Mécanique inverse des autres : plus votre CA est élevé, plus le modèle est avantageux ; en dessous d'environ 3 000 € de CA mensuel, un pourcentage classique revient moins cher.`,
    },
    {
      q: `${s.nom} est-elle une société fiable ?`,
      r: `Quelques repères objectifs : créée en ${s.creation}, ${s.portesTotal} consultants accompagnés, ${s.labelPEPS ? "titulaire du label PEPS (délivré par la fédération professionnelle du portage salarial, il atteste du respect de la convention collective et de garanties financières)" : "non titulaire du label PEPS — ce qui ne présume pas de la qualité, mais retire un repère de vérification externe"}. Côté satisfaction, la note publique relevée est de ${s.avisNote}/5 sur ${s.avisNombre} avis ${s.avisPlateforme}. Salairia ne collecte pas d'avis : ce chiffre est repris de la plateforme citée, à la date de vérification, et doit être lu comme tel.`,
    },
    {
      q: `Pour quel profil ${s.nom} est-elle adaptée ?`,
      r: `${s.idealPour}. ${s.avanceSalaire ? "La société propose une avance sur salaire, ce qui compte quand un client paie à 45 ou 60 jours : vous êtes payé sans attendre l'encaissement de la facture." : "Elle ne propose pas d'avance sur salaire : votre versement dépend de l'encaissement effectif de la facture client, un délai à anticiper dans votre trésorerie."} Services inclus : ${s.services.join(", ").toLowerCase()}.`,
    },
    {
      q: `Comment changer de société de portage ?`,
      r: `Rien ne vous y attache durablement : le contrat de travail en portage se rompt comme un contrat classique (rupture conventionnelle, fin de CDD de mission, démission avec préavis). En pratique, le bon moment est entre deux missions — changer en cours de mission suppose de faire signer un nouveau contrat de prestation à votre client. Vérifiez avant de partir le solde de votre compte d'activité et la réserve financière constituée : elles vous reviennent.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${s.nom} : frais, services et avis clients`,
      description: `Analyse indépendante de ${s.nom} : frais de gestion, services, label PEPS et net calculé sur un cas type.`,
      author: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      publisher: { "@type": "Organization", name: "Salairia", url: SITE_URL },
      datePublished: "2026-08-29",
      dateModified: "2026-09-01",
      inLanguage: "fr-FR",
      url: `${SITE_URL}/comparateurs/portage-salarial/${slug}`,
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
        { "@type": "ListItem", position: 2, name: "Comparateurs", item: `${SITE_URL}/comparateurs` },
        { "@type": "ListItem", position: 3, name: "Portage salarial", item: `${SITE_URL}/comparateurs/portage-salarial` },
        { "@type": "ListItem", position: 4, name: s.nom, item: `${SITE_URL}/comparateurs/portage-salarial/${slug}` },
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
          <Link href="/comparateurs" className="transition hover:text-primary">Comparateurs</Link>
          <span aria-hidden>›</span>
          <Link href="/comparateurs/portage-salarial" className="transition hover:text-primary">Portage salarial</Link>
          <span aria-hidden>›</span>
          <span className="text-foreground">{s.nom}</span>
        </nav>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary">
          <CalendarIcon className="h-3.5 w-3.5" />
          Frais relevés le {new Date(s.dateVerification).toLocaleDateString("fr-FR")}
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {s.nom}
        </h1>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">
          Frais de {s.fraisGestion}
          {s.plafond ? `, plafonnés à ${s.plafond}` : ""} — ce que ça laisse en net
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {[
            { v: s.fraisGestion, l: "frais de gestion" },
            { v: `${s.creation}`, l: "année de création" },
            { v: s.portesTotal, l: "consultants portés" },
            { v: `${s.avisNote}/5`, l: `${s.avisNombre} avis ${s.avisPlateforme}` },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-white p-5 text-center shadow-md">
              <p className="text-2xl font-bold tabular-nums text-primary">{c.v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-16">
          <section id="net" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><CalculatorIcon className="w-4 h-4" /></IconBadge>
              Ce que {s.nom} laisse réellement en net
            </h2>
            {r ? (
              <>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
                  Cas type identique pour toutes nos fiches, afin que les
                  montants soient comparables : {TJM} € de TJM sur {JOURS} jours,
                  soit {EUR.format(CA_MENSUEL)} facturés dans le mois, sans frais
                  professionnels.
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
                  <table className="w-full min-w-[30rem] text-left text-sm">
                    <tbody>
                      {[
                        ["Chiffre d'affaires facturé", EUR.format(r.caHT), null],
                        [`Frais de gestion (${s.fraisGestion})`, `− ${EUR.format(r.fraisGestion)}`, "destructive"],
                        ["Charges patronales", `− ${EUR.format(r.chargesPatronales)}`, "destructive"],
                        ["Salaire brut", EUR.format(r.salaireBrut), null],
                        ["Charges salariales", `− ${EUR.format(r.chargesSalariales)}`, "destructive"],
                      ].map(([l, v, style]) => (
                        <tr key={l as string} className="border-b border-border">
                          <td className="px-5 py-3 text-foreground/80">{l}</td>
                          <td className={`px-5 py-3 text-right tabular-nums ${style === "destructive" ? "text-destructive" : "font-semibold text-foreground"}`}>{v}</td>
                        </tr>
                      ))}
                      <tr className="bg-accent/5">
                        <td className="border-l-4 border-accent px-5 py-3 font-semibold text-foreground">Net avant impôt</td>
                        <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">
                          {EUR.format(r.salaireNetAvantImpot)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
                  Avec {rang === 1 ? "les frais les plus bas de notre panel" : `le ${rang}e taux de frais le plus bas de notre panel`},{" "}
                  {s.nom} laisse <strong>{EUR.format(r.salaireNetAvantImpot)}</strong>{" "}
                  nets sur ce cas type
                  {rang !== 1 && (
                    <> — soit {EUR.format(netMoinsCher - r.salaireNetAvantImpot)} de moins par mois que {moinsCher.nom}, la moins chère du panel</>
                  )}
                  . Sur vos propres chiffres, le{" "}
                  <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
                    simulateur de portage
                  </Link>{" "}
                  compare les sociétés en direct.
                </p>
              </>
            ) : (
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
                <p className="text-base leading-relaxed text-foreground/80">
                  {s.nom} ne facture pas un pourcentage du chiffre d&apos;affaires
                  mais un <strong>abonnement fixe de {abonnementMensuel} € HT
                  par mois</strong>. La logique s&apos;inverse : sur notre cas
                  type de {EUR.format(CA_MENSUEL)} facturés, cela représente
                  l&apos;équivalent de{" "}
                  <strong>{PCT1(tauxEquivalent ?? 0)} % de commission</strong>,
                  très en dessous du marché — mais sur un CA de 3 000 € mensuels,
                  l&apos;équivalent grimpe à {PCT1((abonnementMensuel! / 3000) * 100)} %,
                  au niveau des offres classiques. Le point de bascule se situe
                  autour de 2 500 à 3 000 € de CA par mois.
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">
                  Notre{" "}
                  <Link href="/simulateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
                    simulateur de portage
                  </Link>{" "}
                  raisonne en pourcentage : pour reproduire ce modèle, saisissez
                  le taux équivalent à votre propre chiffre d&apos;affaires.
                </p>
              </div>
            )}
          </section>

          <section id="analyse" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
              Points forts et limites
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-accent bg-accent/5 p-6 shadow-md">
                <p className="font-semibold text-foreground">Ce qui la distingue</p>
                <ul className="mt-3 space-y-2 text-base text-foreground/80">
                  {s.points_forts.map((p) => (
                    <li key={p} className="flex gap-3"><span aria-hidden className="text-accent">✅</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
                <p className="font-semibold text-foreground">Ce qu&apos;il faut savoir avant de signer</p>
                <ul className="mt-3 space-y-2 text-base text-foreground/80">
                  {s.points_faibles.map((p) => (
                    <li key={p} className="flex gap-3"><span aria-hidden className="text-muted-foreground">→</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="services" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
              Services, garanties et couverture
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
              <table className="w-full min-w-[30rem] text-left text-sm">
                <tbody>
                  {[
                    ["Label PEPS", s.labelPEPS ? "Oui" : "Non", s.labelPEPS],
                    ["Avance sur salaire", s.avanceSalaire ? "Oui" : "Non", s.avanceSalaire],
                    ["Tarif affiché publiquement", s.tarifPublie ? "Oui" : "Non — communiqué en entretien", s.tarifPublie],
                    ["Réseau", s.reseau, null],
                    ["Profil visé", s.idealPour, null],
                    ["Services inclus", s.services.join(" · "), null],
                  ].map(([l, v, ok]) => (
                    <tr key={l as string} className="border-b border-border align-top last:border-b-0">
                      <td className="w-52 px-5 py-3 font-semibold text-foreground">{l}</td>
                      <td className="px-5 py-3 text-foreground/80">
                        {typeof ok === "boolean" && (
                          <span aria-hidden className={ok ? "text-accent" : "text-muted-foreground"}>{ok ? "✅ " : "— "}</span>
                        )}
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-r-lg border-l-4 border-primary bg-muted p-4">
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="text-foreground">Sur la note de {s.avisNote}/5 :</strong>{" "}
                elle est reprise de {s.avisPlateforme} ({s.avisNombre} avis), à
                la date de notre vérification. Salairia ne collecte ni ne publie
                d&apos;avis clients — nous rapportons ceux des plateformes
                tierces en les attribuant, sans les agréger en note maison.
              </p>
            </div>
          </section>

          <section id="comparer" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
              {s.nom} face aux autres sociétés
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Société</th>
                    <th className="px-5 py-4">Frais</th>
                    <th className="px-5 py-4 text-right">Net sur le cas type</th>
                  </tr>
                </thead>
                <tbody>
                  {avecTaux.map((x) => {
                    const net = simuler(x.tauxEstimePct as number).salaireNetAvantImpot;
                    const actif = x.slug === s.slug;
                    return (
                      <tr key={x.slug} className={`border-b border-border last:border-b-0 ${actif ? "bg-accent/5" : "hover:bg-muted/50"}`}>
                        <td className={`px-5 py-3 font-semibold text-foreground ${actif ? "border-l-4 border-accent" : ""}`}>
                          {actif ? x.nom : (
                            <Link href={`/comparateurs/portage-salarial/${x.slug}`} className="text-primary underline-offset-4 hover:underline">
                              {x.nom}
                            </Link>
                          )}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{x.fraisGestion}</td>
                        <td className="px-5 py-3 text-right font-bold tabular-nums">{EUR.format(net)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
              Le classement complet sur huit critères — frais, label, avance sur
              salaire, services, avis — est dans notre{" "}
              <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
                comparatif des sociétés de portage
              </Link>
              . Et si vous hésitez encore sur le statut lui-même, le{" "}
              <Link href="/simulateurs/salarie-ou-freelance" className="text-primary underline-offset-4 hover:underline">
                comparateur salarié ou freelance
              </Link>{" "}
              chiffre le portage face au CDI et aux autres statuts d&apos;indépendant.
            </p>
          </section>

          <section id="faq" className="scroll-mt-24">
            <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
              <IconBadge><MessageCircleIcon className="w-4 h-4" /></IconBadge>
              Questions fréquentes sur {s.nom}
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
                <li>
                  <a href={s.site} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    Site officiel de {s.nom}<span aria-hidden> ↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000034362668/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    Convention collective du portage salarial (IDCC 3219)<span aria-hidden> ↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.peps-syndicat.fr" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    PEPS — fédération des professionnels du portage salarial<span aria-hidden> ↗</span>
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-xs italic text-muted-foreground">
                Frais et informations relevés le{" "}
                {new Date(s.dateVerification).toLocaleDateString("fr-FR")} sur le
                site de la société et les plateformes d&apos;avis citées. Les
                grilles tarifaires évoluent sans préavis : vérifiez-les avant de
                signer. Les nets sont calculés par notre simulateur avec des
                taux de charges moyens de marché (43 % patronales, 22 %
                salariales), pas avec la grille exacte de la société — ils
                servent à comparer, pas à contractualiser. Salairia n&apos;est
                ni mandataire ni apporteur d&apos;affaires de {s.nom}. Une
                erreur ?{" "}
                <Link href="/contact" className="text-primary underline-offset-4 hover:underline">Signalez-la</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
