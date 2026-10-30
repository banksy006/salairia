import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import GuideCta from "@/components/guides/GuideCta";
import {
  IconBadge,
  BarChartIcon,
  CalculatorIcon,
  CalendarIcon,
  CompassIcon,
  ScaleIcon,
  TargetIcon,
  BriefcaseIcon,
  LightbulbIcon,
  ReceiptIcon,
  BuildingIcon,
} from "@/components/icons";
import { getMetier, NIVEAUX, median, netMensuel, coutEmployeurAnnuel, tjmEquivalent } from "@/lib/metiers";
import { calculerStatut, calculerTous, STATUT_LABELS, type StatutFreelance } from "@/lib/calculators/tjm-freelance";
import { MARGE_SECURITE_TJM } from "@/lib/calculators/salarie-freelance";
import { TJM_METIERS, type TjmMetier } from "@/data/tjm-metiers";

// Mêmes hypothèses que `tjmEquivalent` et le comparateur salarié/freelance,
// pour que le TJM d'équivalence et le net par statut parlent du même freelance.
const JOURS = 18;
const FRAIS_PRO = 150;
const JOURS_SCENARIOS = [12, 15, 18, 20];

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const KEUR = (n: number) => `${Math.round(n / 1000)} k€`;

export function tjmMetierChiffres(m: TjmMetier) {
  const metier = getMetier(m.metierId);
  if (!metier) throw new Error(`Métier inconnu : ${m.metierId}`);
  const brutConfirme = median(metier.idf.confirme);
  const netSalarie = netMensuel(brutConfirme);
  const tjmEgal = tjmEquivalent(brutConfirme);
  const tjmConseille = tjmEgal * (1 + MARGE_SECURITE_TJM);
  const coutJourSalarie = coutEmployeurAnnuel(brutConfirme) / (JOURS * 12);
  const statuts = calculerTous({ tjm: m.marche.confirme, joursTravailles: JOURS, fraisProMensuels: FRAIS_PRO, tauxPAS: 0 }).map((r) => ({
    ...r,
    eligible: !r.warnings.some((w) => w.severity === "danger"),
  }));
  const meilleur = statuts.filter((s) => s.eligible).reduce((a, b) => (b.netMensuel > a.netMensuel ? b : a));
  return { metier, brutConfirme, netSalarie, tjmEgal, tjmConseille, coutJourSalarie, statuts, meilleur };
}

export default function TjmMetierGuide({ m }: { m: TjmMetier }) {
  const { metier, brutConfirme, netSalarie, tjmEgal, tjmConseille, coutJourSalarie, statuts, meilleur } = tjmMetierChiffres(m);
  const autres = TJM_METIERS.filter((x) => x.slug !== m.slug);
  const portageJours = JOURS_SCENARIOS.map((j) => ({
    jours: j,
    r: calculerStatut("portage", { tjm: m.marche.confirme, joursTravailles: j, fraisProMensuels: FRAIS_PRO, tauxPAS: 0 }),
  }));
  const caConfirme = m.marche.confirme * JOURS * 12;
  // Le net en portage est linéaire dans le nombre de jours : on interpole
  // entre deux scénarios pour trouver où le freelance retombe au net salarié.
  const pente = (portageJours[3].r.netMensuel - portageJours[0].r.netMensuel) / (JOURS_SCENARIOS[3] - JOURS_SCENARIOS[0]);
  const joursSeuil = JOURS_SCENARIOS[0] + (netSalarie - portageJours[0].r.netMensuel) / pente;

  const meta: GuideMeta = {
    slug: m.slug,
    titre: `TJM ${m.nomTitre} freelance en 2026`,
    sousTitre: `${EUR.format(m.marche.confirme)} par jour sur le marché, ${EUR.format(tjmEgal)} pour égaler un salaire de confirmé — et ce que chaque statut en garde`,
    chapo: `Un ${m.nom} confirmé facture autour de ${EUR.format(m.marche.confirme)} par jour en 2026, entre ${EUR.format(m.marche.junior)} pour un junior et ${EUR.format(m.marche.senior)} pour un senior. Mais un TJM n'est pas un revenu : sur ${JOURS} jours facturés par mois, ${EUR.format(m.marche.confirme)} deviennent ${EUR.format(meilleur.netMensuel)} nets mensuels au mieux, selon le statut. Ce dossier part du salaire du métier, calcule le tarif qui le reproduit, puis compare micro-entreprise, portage salarial, SASU et EURL sur le TJM réel du marché.`,
    filAriane: `TJM ${m.nomTitre}`,
    datePublished: m.datePublished,
    dateModified: m.datePublished,
    tocItems: [
      { id: "marche", label: "TJM du marché" },
      { id: "equivalence", label: "Égaler le salaire" },
      { id: "statuts", label: "Net selon le statut" },
      { id: "jours", label: "Jours facturés" },
      { id: "negocier", label: "Négocier son TJM" },
      { id: "specificites", label: `Le marché ${m.nom}` },
    ],
    faq: [
      {
        q: `Quel est le TJM d'un ${m.nom} freelance en 2026 ?`,
        r: `Les baromètres Malt, Free-Work, Silkhom et Hays situent un ${m.nom} junior autour de ${EUR.format(m.marche.junior)} par jour, un confirmé autour de ${EUR.format(m.marche.confirme)} et un senior autour de ${EUR.format(m.marche.senior)}. Ce sont des médianes de marché : une mission en direct chez un grand compte, une expertise rare ou une mission courte se négocient au-dessus.`,
      },
      {
        q: `Quel TJM faut-il pour gagner autant qu'un ${m.nom} salarié ?`,
        r: `Un ${m.nom} confirmé en Île-de-France gagne environ ${KEUR(brutConfirme)} bruts par an, soit ${EUR.format(netSalarie)} nets par mois. Pour retrouver ce net en portage salarial sur ${JOURS} jours facturés par mois et ${FRAIS_PRO} € de frais professionnels mensuels, il faut facturer ${EUR.format(tjmEgal)} par jour. Nous conseillons d'y ajouter ${Math.round(MARGE_SECURITE_TJM * 100)} % de marge pour les intermissions et la protection perdue, soit ${EUR.format(tjmConseille)}.`,
      },
      {
        q: `Combien reste-t-il net sur ${EUR.format(m.marche.confirme)} par jour ?`,
        r: `Sur ${JOURS} jours par mois, soit ${EUR.format(caConfirme)} de chiffre d'affaires annuel : ${statuts
          .map((s) => `${STATUT_LABELS[s.statut]} ${s.eligible ? EUR.format(s.netMensuel) + " nets par mois" : "inapplicable (plafond de chiffre d'affaires dépassé)"}`)
          .join(", ")}. Calculs avant impôt sur le revenu, avec ${FRAIS_PRO} € de frais professionnels mensuels, 8 % de frais de gestion en portage et les frais de comptabilité en société.`,
      },
      {
        q: "Pourquoi le nombre de jours facturés compte-t-il autant que le TJM ?",
        r: `Parce que le revenu est le produit des deux. À ${EUR.format(m.marche.confirme)} par jour, passer de ${JOURS} à 15 jours facturés par mois — une intermission d'un mois par an plus les congés — fait tomber le net en portage de ${EUR.format(portageJours[2].r.netMensuel)} à ${EUR.format(portageJours[1].r.netMensuel)}. Un TJM négocié 50 € de plus pèse moins qu'une mission qui s'arrête un mois plus tôt.`,
      },
      ...m.faqMetier,
    ],
    sources: [
      { label: "Malt — baromètre des tarifs freelance", href: "https://www.malt.fr/t/barometre-tarifs" },
      { label: "Free-Work — grilles TJM par métier tech", href: "https://www.free-work.com/fr/tech-it" },
      { label: "Silkhom — baromètre TJM informatique et digital", href: "https://www.silkhom.com/barometre-des-tjm-informatique-electronique-digital/" },
      { label: "APEC — Baromètre 2025 de la rémunération des cadres", href: "https://www.apec.fr" },
      { label: "URSSAF — taux de cotisations 2026 (micro-entreprise, régime général)", href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes.html" },
      { label: "Code du travail — articles L1254-1 et suivants (portage salarial)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000030435227/" },
    ],
  };

  return (
    <GuideShell meta={meta}>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { v: `${EUR.format(m.marche.confirme)}/j`, l: `TJM médian d'un ${m.nom} confirmé (baromètres 2026)` },
          { v: `${EUR.format(tjmEgal)}/j`, l: `pour égaler ${EUR.format(netSalarie)} nets de salarié confirmé IDF` },
          { v: EUR.format(meilleur.netMensuel), l: `nets/mois au mieux à ${EUR.format(m.marche.confirme)}/j (${STATUT_LABELS[meilleur.statut]})` },
        ].map((c) => (
          <div key={c.l} className="rounded-2xl border border-border bg-white p-6 text-center shadow-md">
            <p className="text-3xl font-bold tabular-nums text-primary">{c.v}</p>
            <p className="mt-2 text-xs text-muted-foreground">{c.l}</p>
          </div>
        ))}
      </div>

      <GuideCta
        titre="Et sur tes chiffres ?"
        intro="Les grilles donnent l'ordre de grandeur. Trois outils pour passer à ton TJM, tes jours et ton statut."
        liens={[
          { href: "/simulateurs/tjm-freelance", label: "Calculer ton TJM", desc: "Le tarif à facturer pour viser un net donné", icon: <TargetIcon className="h-4 w-4" /> },
          { href: "/simulateurs/portage-salarial", label: "Simuler le portage", desc: "Du CA au net, frais de gestion compris", icon: <CalculatorIcon className="h-4 w-4" /> },
          { href: "/simulateurs/salarie-ou-freelance", label: "Salarié ou freelance ?", desc: "Même net, quatre statuts comparés", icon: <CompassIcon className="h-4 w-4" /> },
        ]}
      />

      <section id="marche" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><BarChartIcon className="w-4 h-4" /></IconBadge>
          Le TJM {m.nom} sur le marché en 2026
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Les baromètres des plateformes et des cabinets de recrutement
            convergent sur une grille en trois paliers pour un {m.nom}. Nous
            reprenons la ligne « {m.ligneBarometre} » de notre{" "}
            <Link href="/guides/tjm-freelance#metiers" className="text-primary underline-offset-4 hover:underline">
              grille de TJM par métier
            </Link>
            , qui agrège Malt, Free-Work, Silkhom et Hays.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { l: "Junior", a: "0 à 2 ans", v: m.marche.junior },
              { l: "Confirmé", a: "3 à 6 ans", v: m.marche.confirme, actif: true },
              { l: "Senior", a: "7 ans et plus", v: m.marche.senior },
            ].map((p) => (
              <div key={p.l} className={`rounded-xl border p-5 ${p.actif ? "border-accent bg-accent/5" : "border-border"}`}>
                <p className="text-sm font-semibold text-foreground">{p.l}</p>
                <p className="text-xs text-muted-foreground">{p.a}</p>
                <p className={`mt-3 text-3xl font-bold tabular-nums ${p.actif ? "text-accent" : "text-primary"}`}>{EUR.format(p.v)}</p>
                <p className="text-xs text-muted-foreground">par jour, hors taxes</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            Ces montants sont des médianes : la moitié des missions se
            négocient en dessous, l&apos;autre au-dessus. Sur {JOURS} jours
            facturés par mois, le palier confirmé représente{" "}
            <strong>{EUR.format(caConfirme)} de chiffre d&apos;affaires annuel</strong>
            {" "}— un chiffre qui n&apos;a rien à voir avec un revenu tant
            qu&apos;on n&apos;a pas choisi de statut.
          </p>
        </div>
      </section>

      <section id="equivalence" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Le TJM qui égale le salaire d&apos;un {m.nom}
        </h2>
        <div className="mt-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;autre façon de fixer un TJM part du salaire du métier. Un{" "}
            {m.nom} confirmé en Île-de-France gagne {KEUR(metier.idf.confirme[0] * 1000)} à{" "}
            {KEUR(metier.idf.confirme[1] * 1000)} bruts par an (voir{" "}
            <Link href={`/metiers/${metier.id}`} className="text-primary underline-offset-4 hover:underline">
              notre fiche salaire {m.nom}
            </Link>
            ), soit {EUR.format(netSalarie)} nets par mois au milieu de
            fourchette. Nous avons cherché, par bissection, le TJM qui
            reproduit exactement ce net en portage salarial sur {JOURS} jours
            facturés par mois et {FRAIS_PRO} € de frais professionnels
            mensuels — puis ajouté {Math.round(MARGE_SECURITE_TJM * 100)} % de marge
            pour les intermissions, les congés et la protection perdue.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Niveau (IDF)</th>
                  <th className="px-5 py-4 text-right">Net salarié / mois</th>
                  <th className="px-5 py-4 text-right">TJM pour égaler</th>
                  <th className="px-5 py-4 text-right">TJM conseillé<span className="block text-[10px] font-normal normal-case">+ {Math.round(MARGE_SECURITE_TJM * 100)} % de marge</span></th>
                  <th className="px-5 py-4 text-right">TJM du marché</th>
                </tr>
              </thead>
              <tbody>
                {NIVEAUX.filter((n) => n.id !== "expert").map((n) => {
                  const b = median(metier.idf[n.id]);
                  const t = tjmEquivalent(b);
                  const marche = n.id === "junior" ? m.marche.junior : n.id === "confirme" ? m.marche.confirme : m.marche.senior;
                  const actif = n.id === "confirme";
                  return (
                    <tr key={n.id} className={`border-b border-border last:border-b-0 ${actif ? "bg-accent/5" : ""}`}>
                      <td className={`px-5 py-3 font-semibold text-foreground ${actif ? "border-l-4 border-accent" : ""}`}>
                        {n.label}
                        <span className="block text-xs font-normal text-muted-foreground">{n.annees}</span>
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(netMensuel(b))}</td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums text-foreground">{EUR.format(t)}</td>
                      <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-accent">{EUR.format(t * (1 + MARGE_SECURITE_TJM))}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(marche)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            {m.marche.confirme >= tjmConseille ? (
              <>
                Lecture : le marché paie un {m.nom} confirmé{" "}
                <strong>{EUR.format(m.marche.confirme - tjmEgal)} par jour de plus</strong>{" "}
                que le strict équivalent de son salaire, et au-dessus du TJM
                conseillé avec marge. Le freelancing est rentable pour ce
                métier à condition de tenir le taux d&apos;occupation — c&apos;est
                l&apos;objet de la section sur les jours facturés.
              </>
            ) : m.marche.confirme >= tjmEgal ? (
              <>
                Lecture : le marché paie un {m.nom} confirmé{" "}
                <strong>{EUR.format(m.marche.confirme - tjmEgal)} par jour de plus</strong>{" "}
                que le strict équivalent de son salaire, mais en dessous du
                TJM conseillé avec marge. Le freelancing reproduit le revenu
                sans financer confortablement les intermissions : le taux
                d&apos;occupation devient la variable décisive.
              </>
            ) : (
              <>
                Lecture : le TJM médian du marché est{" "}
                <strong>inférieur au tarif qui égale le salaire</strong> d&apos;un
                {" "}{m.nom} confirmé. Au tarif médian, le freelancing fait perdre
                du net à expérience égale : il faut se placer au-dessus de la
                grille ou avoir une autre raison que l&apos;argent.
              </>
            )}
          </p>
        </div>
      </section>

      <section id="statuts" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><BriefcaseIcon className="w-4 h-4" /></IconBadge>
          Ce que {EUR.format(m.marche.confirme)} par jour deviennent en net, statut par statut
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Même TJM, mêmes {JOURS} jours facturés, mêmes {FRAIS_PRO} € de frais
            professionnels par mois : seul le statut change. Le calcul est
            celui de notre{" "}
            <Link href="/simulateurs/tjm-freelance" className="text-primary underline-offset-4 hover:underline">
              simulateur TJM
            </Link>{" "}
            — cotisations micro à 25,6 %, portage à 8 % de frais de gestion
            puis charges patronales et salariales, SASU et EURL en
            rémunération intégrale avec leurs frais de comptabilité. Un statut
            dont le plafond de chiffre d&apos;affaires est dépassé est marqué
            inapplicable et exclu du classement.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Statut</th>
                  <th className="px-5 py-4 text-right">CA annuel</th>
                  <th className="px-5 py-4 text-right">Prélèvements et frais</th>
                  <th className="px-5 py-4 text-right">Net mensuel<span className="block text-[10px] font-normal normal-case">avant impôt</span></th>
                </tr>
              </thead>
              <tbody>
                {[...statuts]
                  .sort((a, b) => Number(b.eligible) - Number(a.eligible) || b.netMensuel - a.netMensuel)
                  .map((s) => {
                    const best = s.statut === meilleur.statut;
                    return (
                      <tr key={s.statut} className={`border-b border-border last:border-b-0 ${best ? "bg-accent/5" : ""} ${s.eligible ? "" : "text-muted-foreground"}`}>
                        <td className={`px-5 py-3 font-semibold ${best ? "border-l-4 border-accent" : ""}`}>
                          {STATUT_LABELS[s.statut as StatutFreelance]}
                          {best && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Meilleur net</span>}
                          {!s.eligible && <span className="block text-xs font-normal">Inapplicable : {s.warnings.find((w) => w.severity === "danger")?.message}</span>}
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums">{EUR.format(s.caHT)}</td>
                        <td className="px-5 py-3 text-right tabular-nums">− {EUR.format(s.deductionsTotales)}</td>
                        <td className={`px-5 py-3 text-right text-lg font-bold tabular-nums ${s.eligible ? "text-primary" : "line-through"}`}>{EUR.format(s.netMensuel)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le net ne dit pas tout : le portage salarial est le seul statut qui
            cotise au chômage, la SASU permet de moduler salaire et
            dividendes, la micro-entreprise ne déduit aucun frais réel. Pour
            l&apos;arbitrage complet, notre{" "}
            <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
              comparateur de sociétés de portage
            </Link>{" "}
            et le guide{" "}
            <Link href="/guides/sasu-eurl" className="text-primary underline-offset-4 hover:underline">
              SASU ou EURL
            </Link>{" "}
            prennent le relais.
          </p>
        </div>
      </section>

      <section id="jours" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le vrai levier : les jours facturés
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Un mois compte 21 ou 22 jours ouvrés, un freelance en facture
            rarement plus de 18 une fois retirés congés, formation,
            prospection et intermissions. Voici ce que {EUR.format(m.marche.confirme)} par
            jour donnent en portage salarial selon le nombre de jours
            réellement facturés chaque mois :
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Jours facturés / mois</th>
                  <th className="px-5 py-4 text-right">CA annuel</th>
                  <th className="px-5 py-4 text-right">Net mensuel en portage</th>
                  <th className="px-5 py-4 text-right">Écart avec le salarié<span className="block text-[10px] font-normal normal-case">{EUR.format(netSalarie)} nets</span></th>
                </tr>
              </thead>
              <tbody>
                {portageJours.map(({ jours, r }) => {
                  const ecart = r.netMensuel - netSalarie;
                  return (
                    <tr key={jours} className={`border-b border-border last:border-b-0 ${jours === JOURS ? "bg-accent/5" : ""}`}>
                      <td className={`px-5 py-3 font-semibold text-foreground ${jours === JOURS ? "border-l-4 border-accent" : ""}`}>{jours} jours</td>
                      <td className="px-5 py-3 text-right tabular-nums text-foreground/80">{EUR.format(r.caHT)}</td>
                      <td className="px-5 py-3 text-right text-lg font-bold tabular-nums text-primary">{EUR.format(r.netMensuel)}</td>
                      <td className={`px-5 py-3 text-right tabular-nums font-semibold ${ecart >= 0 ? "text-accent" : "text-destructive"}`}>{ecart >= 0 ? "+" : "−"} {EUR.format(Math.abs(ecart))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            C&apos;est la lecture la plus utile de ce dossier : à{" "}
            {EUR.format(m.marche.confirme)} par jour en portage, le freelance
            retombe au net du salarié confirmé autour de{" "}
            <strong>{joursSeuil.toFixed(1).replace(".", ",")} jours facturés par mois</strong>
            {" "}— soit {Math.round(joursSeuil * 12)}{" "}jours dans l&apos;année.
            Deux mois d&apos;intermission ramènent une année à 18 jours facturés
            vers 15 jours de moyenne. Ce que le TJM gagne en négociation,
            l&apos;occupation peut le perdre deux fois plus vite.
          </p>
        </div>
      </section>

      <section id="negocier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><TargetIcon className="w-4 h-4" /></IconBadge>
          Négocier son TJM de {m.nom}
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;ancrage le plus solide en négociation est le coût d&apos;un
            salarié équivalent. Un {m.nom} confirmé coûte à son employeur{" "}
            <strong>{EUR.format(coutEmployeurAnnuel(brutConfirme))} par an</strong>{" "}
            charges patronales comprises, soit{" "}
            <strong>{EUR.format(coutJourSalarie)} par jour</strong> ramené
            à {JOURS}{" "}jours par mois, sans le recrutement, sans la période
            d&apos;essai, sans l&apos;engagement. Un TJM de{" "}
            {EUR.format(m.marche.confirme)}{" "}n&apos;est donc pas « cher »
            pour le client : il paie la flexibilité, l&apos;absence de charges et la
            possibilité d&apos;arrêter.
          </p>
          <ul className="mt-6 space-y-4">
            {m.leviers.map((l) => (
              <li key={l.t} className="flex gap-3">
                <span aria-hidden className="mt-1 shrink-0 text-primary"><LightbulbIcon className="h-4 w-4" /></span>
                <span className="text-base text-foreground/80"><strong className="text-foreground">{l.t}.</strong> {l.d}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/simulateurs/tjm-freelance"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Calculer mon TJM cible →
          </Link>
        </div>
      </section>

      <section id="specificites" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Le marché {m.nom} freelance en 2026
        </h2>
        <div className="mt-4 space-y-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          {m.contexte.map((p) => (
            <p key={p.slice(0, 40)} className="text-base leading-relaxed text-foreground/80">{p}</p>
          ))}
          <p className="text-xs italic text-muted-foreground">
            Les observations de marché de cette section (écarts par stack,
            par secteur, marges d&apos;intermédiation) sont des ordres de
            grandeur issus des baromètres cités et de retours de terrain, pas
            des chiffres calculés : utilisez-les pour situer une négociation.
          </p>
        </div>
      </section>

      {autres.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Autres dossiers TJM</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {autres.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/guides/${a.slug}`}
                  className="inline-flex rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary"
                >
                  TJM {a.nomTitre} →
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/metiers/${metier.id}`}
                className="inline-flex rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary"
              >
                Salaire {metier.label} →
              </Link>
            </li>
          </ul>
        </section>
      )}

      <GuideCta
        titre="Prêt à facturer ?"
        intro="Le statut choisi, il reste à choisir qui porte ton activité, qui tient ta compta et où atterrit ton chiffre d'affaires."
        accent
        liens={[
          { href: "/comparateurs/portage-salarial", label: "Comparer les sociétés de portage", desc: "Frais de gestion et net estimé, 10 sociétés", icon: <ScaleIcon className="h-4 w-4" /> },
          { href: "/comparateurs/comptabilite", label: "Choisir sa compta en ligne", desc: "Micro, SASU ou EURL, abonnements comparés", icon: <ReceiptIcon className="h-4 w-4" /> },
          { href: "/comparateurs/banques-pro", label: "Ouvrir un compte pro", desc: "Tarifs et services pour indépendants", icon: <BuildingIcon className="h-4 w-4" /> },
        ]}
      />

      <p className="text-sm text-muted-foreground">
        Dossier rédigé par{" "}
        <Link href="/a-propos" className="text-primary underline-offset-4 hover:underline">Nizar Laghrifi</Link>
        , fondateur de Salairia. Chiffres de salaire, de net et de TJM
        calculés par les simulateurs du site avec les taux 2026 ; voir la{" "}
        <Link href="/methodologie" className="text-primary underline-offset-4 hover:underline">méthodologie</Link>.
      </p>
    </GuideShell>
  );
}
