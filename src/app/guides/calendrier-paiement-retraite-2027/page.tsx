import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, InfoIcon, ScaleIcon, CoinIcon } from "@/components/icons";

// Règles de versement (lassuranceretraite.fr, agirc-arrco.fr, vérifiées le
// 19 septembre 2026) :
// - Assurance retraite (Cnav) et MSA : le 9 du mois suivant, à terme échu ;
//   si le 9 est un samedi, un dimanche ou un férié, le jour ouvré précédent
//   (calendrier officiel 2026 : 7 mai, 7 août, 8 janvier 2027).
// - Agirc-Arrco : le 1er jour ouvré du mois, à terme d'avance.
// Les dates 2027 sont calculées depuis ces règles et la liste des fériés.
const FERIES = new Set([
  "2026-11-01", "2026-11-11", "2026-12-25",
  "2027-01-01", "2027-03-29", "2027-05-01", "2027-05-06", "2027-05-08", "2027-05-17",
  "2027-07-14", "2027-08-15", "2027-11-01", "2027-11-11", "2027-12-25",
  "2028-01-01",
]);

const iso = (d: Date) => d.toISOString().slice(0, 10);
const ouvre = (d: Date) => d.getUTCDay() !== 0 && d.getUTCDay() !== 6 && !FERIES.has(iso(d));
const utc = (y: number, m: number, j: number) => new Date(Date.UTC(y, m, j, 12));

function cnav(y: number, m: number): Date {
  const d = utc(y, m, 9);
  while (!ouvre(d)) d.setUTCDate(d.getUTCDate() - 1);
  return d;
}
function agirc(y: number, m: number): Date {
  const d = utc(y, m, 1);
  while (!ouvre(d)) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

const fmtLong = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const fmtMois = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Une ligne par mois de pension : la base est payée le mois suivant, la
// complémentaire le mois même.
const LIGNES_2027 = Array.from({ length: 12 }, (_, m) => {
  const paieBase = m === 11 ? cnav(2028, 0) : cnav(2027, m + 1);
  const paieAgirc = agirc(2027, m);
  return {
    mois: cap(fmtMois.format(utc(2027, m, 1))),
    base: fmtLong.format(paieBase),
    baseDecale: paieBase.getUTCDate() !== 9,
    agirc: fmtLong.format(paieAgirc),
    agircDecale: paieAgirc.getUTCDate() !== 1,
  };
});
const LIGNES_FIN_2026 = [9, 10, 11].map((m) => {
  const paieBase = m === 11 ? cnav(2027, 0) : cnav(2026, m + 1);
  const paieAgirc = agirc(2026, m);
  return {
    mois: cap(fmtMois.format(utc(2026, m, 1))),
    base: fmtLong.format(paieBase),
    baseDecale: paieBase.getUTCDate() !== 9,
    agirc: fmtLong.format(paieAgirc),
    agircDecale: paieAgirc.getUTCDate() !== 1,
  };
});
const NB_DECALAGES_BASE = LIGNES_2027.filter((l) => l.baseDecale).length;
const NB_DECALAGES_AGIRC = LIGNES_2027.filter((l) => l.agircDecale).length;

const meta: GuideMeta = {
  slug: "calendrier-paiement-retraite-2027",
  titre: "Calendrier de paiement des retraites 2027 : toutes les dates de versement",
  sousTitre: `Assurance retraite le 9 du mois suivant, Agirc-Arrco le 1er jour ouvré — ${NB_DECALAGES_BASE + NB_DECALAGES_AGIRC} dates décalées en 2027 à cause des week-ends et fériés`,
  chapo: `Deux caisses, deux logiques : la pension de base (Assurance retraite, MSA) arrive le 9 du mois suivant, à terme échu ; la complémentaire Agirc-Arrco le premier jour ouvré du mois, à terme d'avance. Quand ces dates tombent un week-end ou un férié, le versement bouge — et 2027 en compte plusieurs. Voici le calendrier complet, calculé mois par mois depuis les règles officielles, avec les dernières échéances 2026, et ce qui explique un virement qui tarde.`,
  filAriane: "Calendrier retraites 2027",
  datePublished: "2026-09-19",
  dateModified: "2026-09-19",
  tocItems: [
    { id: "calendrier", label: "Le calendrier 2027" },
    { id: "fin-2026", label: "Les dernières dates 2026" },
    { id: "regles", label: "Les règles de versement" },
    { id: "retard", label: "Virement en retard ?" },
  ],
  faq: [
    {
      q: "À quelle date la retraite est-elle versée chaque mois en 2027 ?",
      r: `La pension de base de l'Assurance retraite est versée le 9 du mois suivant celui qu'elle rémunère : la pension de janvier 2027 arrive le ${LIGNES_2027[0].base} 2027. Quand le 9 tombe un samedi, un dimanche ou un jour férié, le paiement est avancé au jour ouvré précédent — c'est le cas ${NB_DECALAGES_BASE} fois en 2027. La complémentaire Agirc-Arrco est versée le premier jour ouvré du mois, pour le mois qui commence : le ${LIGNES_2027[0].agirc} 2027 pour janvier. Le tableau de cette page donne les 24 dates.`,
    },
    {
      q: "Pourquoi la pension de base et la complémentaire n'arrivent-elles pas le même jour ?",
      r: "Parce qu'elles ne sont pas payées au même rythme. L'Assurance retraite paie « à terme échu » : la pension du mois M est versée début M+1, une fois le mois accompli. L'Agirc-Arrco paie « à terme d'avance » : la pension du mois M est versée dès le début de M. Pour un retraité du privé, cela donne deux virements distincts, l'un vers le 1er, l'autre vers le 9 — et la sensation trompeuse d'un décalage entre les caisses, alors que chacune respecte son propre calendrier.",
    },
    {
      q: "Quand la revalorisation apparaît-elle sur le virement ?",
      r: `Pour l'Agirc-Arrco, la revalorisation décidée à l'automne s'applique aux pensions à compter du 1er novembre 2026 : elle est visible sur le virement du ${LIGNES_FIN_2026[1].agirc} 2026. Pour la pension de base, la revalorisation du 1er janvier 2027 concerne la pension de janvier — payée le ${LIGNES_2027[0].base} 2027 : le virement du 8 janvier, lui, rémunère décembre 2026 à l'ancien montant. Ce décalage d'un mois surprend chaque année ; notre guide sur la revalorisation des retraites 2027 détaille les deux mécaniques.`,
    },
    {
      q: "Mon virement n'est pas arrivé à la date prévue, que faire ?",
      r: "D'abord vérifier le délai bancaire : la caisse émet l'ordre de virement à la date indiquée, mais l'inscription sur le compte dépend de la banque et peut prendre un à deux jours ouvrés, davantage en fin de semaine. Ensuite, vérifier dans l'espace personnel (lassuranceretraite.fr, agirc-arrco.fr) qu'aucun document n'est en attente : un certificat de vie non retourné pour les résidents à l'étranger, un RIB non actualisé ou une déclaration de ressources manquante suspendent le paiement. Au-delà de trois jours ouvrés sans explication, contacter la caisse au 3960 (Assurance retraite) ou via la messagerie de l'espace personnel.",
    },
    {
      q: "Les autres régimes suivent-ils le même calendrier ?",
      r: "Non, chacun a le sien. La MSA (agricole) suit le même rythme que l'Assurance retraite, le 9 du mois suivant. Les pensions de l'État (fonctionnaires civils et militaires) sont versées en fin de mois, à terme échu, généralement entre le 28 et le 30. La CNRACL (territoriale et hospitalière) et l'Ircantec (contractuels de la fonction publique) paient également en fin de mois ou début du mois suivant. Les régimes de professions libérales et d'indépendants ont des calendriers propres, souvent mensuels ou trimestriels : la date figure dans l'espace personnel de chaque caisse.",
    },
  ],
  sources: [
    { label: "L'Assurance retraite — calendrier et modalités de paiement", href: "https://www.lassuranceretraite.fr/portail-info/home/retraite/paiements-retraite/calendrier-paiement-retraite.html" },
    { label: "Agirc-Arrco — le paiement de la retraite complémentaire", href: "https://www.agirc-arrco.fr/ma-retraite/paiement-retraite/" },
    { label: "service-public.fr — le calendrier des paiements des pensions de retraite", href: "https://www.service-public.gouv.fr/particuliers/actualites/A18602" },
    { label: "Code du travail, art. L3133-1 — jours fériés légaux (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020901" },
  ],
};

export const metadata: Metadata = {
  title: "Calendrier paiement retraite 2027 : dates de versement Assurance retraite et Agirc-Arrco",
  description: `Les 24 dates de versement 2027, calculées depuis les règles officielles : pension de base le 9 du mois suivant (avancée si week-end ou férié), Agirc-Arrco le 1er jour ouvré. ${NB_DECALAGES_BASE + NB_DECALAGES_AGIRC} dates décalées en 2027, les dernières échéances 2026, et que faire si le virement tarde.`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Calendrier de paiement des retraites 2027",
    description: "Toutes les dates de versement, Assurance retraite et Agirc-Arrco, mois par mois.",
    url: `/guides/${meta.slug}`,
  },
};

function Tableau({ lignes }: { lignes: typeof LIGNES_2027 }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-4">Pension du mois de</th>
            <th className="px-5 py-4">Assurance retraite / MSA</th>
            <th className="px-5 py-4">Agirc-Arrco</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((l) => (
            <tr key={l.mois} className="border-b border-border last:border-b-0">
              <td className="px-5 py-3 font-semibold text-foreground">{l.mois}</td>
              <td className="px-5 py-3 whitespace-nowrap text-foreground/80">
                {cap(l.base)}
                {l.baseDecale && <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">avancé</span>}
              </td>
              <td className="px-5 py-3 whitespace-nowrap text-foreground/80">
                {cap(l.agirc)}
                {l.agircDecale && <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">reporté</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Le calendrier 2027, mois par mois
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Chaque ligne indique la date à laquelle la caisse <strong>émet</strong>{" "}
          le virement. La pension de base du mois indiqué est payée le mois
          suivant ; la complémentaire Agirc-Arrco, le mois même. Les dates
          marquées « avancé » ou « reporté » tombent normalement un week-end ou
          un jour férié.
        </p>
        <Tableau lignes={LIGNES_2027} />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          À retenir pour 2027 : la pension de base est avancée{" "}
          {NB_DECALAGES_BASE} fois (le 9 tombe un dimanche en mai, un samedi
          en octobre, et un dimanche en janvier 2028 pour la pension de
          décembre), et la complémentaire reportée{" "}
          {NB_DECALAGES_AGIRC} fois — dont le 1er janvier, férié un vendredi,
          qui repousse le premier virement de l&apos;année au{" "}
          {LIGNES_2027[0].agirc}. Les dates sont calculées depuis les règles
          des caisses et la liste des fériés légaux ; les calendriers officiels
          2027 seront publiés en fin d&apos;année, et cette page ajustée si une
          date diffère.
        </p>
      </section>

      <section id="fin-2026" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CoinIcon className="w-4 h-4" /></IconBadge>
          Les dernières échéances 2026
        </h2>
        <Tableau lignes={LIGNES_FIN_2026} />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Deux virements à surveiller de près. Celui de l&apos;Agirc-Arrco du{" "}
          {LIGNES_FIN_2026[1].agirc} : c&apos;est le premier au montant
          revalorisé, si le conseil d&apos;administration décide d&apos;une
          hausse au 1er novembre — après une année 2025 sans revalorisation.
          Et celui de l&apos;Assurance retraite du {LIGNES_2027[0].base} 2027,
          qui paie janvier 2027 au montant revalorisé du 1er janvier. Les deux
          mécaniques, leurs bases de calcul et les ordres de grandeur attendus
          sont dans notre guide de la{" "}
          <Link href="/guides/revalorisation-retraites-2027" className="text-primary underline-offset-4 hover:underline">
            revalorisation des retraites 2027
          </Link>
          .
        </p>
      </section>

      <section id="regles" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Les règles derrière les dates
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Assurance retraite et MSA — le 9, à terme échu</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              La pension du mois M est mise en paiement le 9 du mois M+1. Si le
              9 est un samedi, un dimanche ou un férié, le versement est avancé
              au dernier jour ouvré précédent — jamais reporté après. Le
              calendrier 2026 en donne deux exemples : la pension d&apos;avril
              payée le 7 mai (le 8 mai étant férié et le 9 un samedi), celle de
              juillet le 7 août.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <p className="font-semibold text-foreground">Agirc-Arrco — le 1er jour ouvré, à terme d&apos;avance</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              La pension du mois M est versée le premier jour ouvré de M. Un
              1er du mois tombant un week-end ou un férié décale le paiement au
              jour ouvré suivant : lundi 4 mai 2026, lundi 3 août 2026, lundi
              2 novembre 2026. Les allocataires dont la pension est très faible
              peuvent être payés trimestriellement ou annuellement plutôt que
              chaque mois.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Le montant qui arrive sur le compte est le <strong>net</strong> de la
          pension : la CSG (à 0, 3,8, 6,6 ou 8,3 % selon le revenu fiscal de
          référence), la CRDS et la Casa sont prélevées par la caisse, ainsi que
          le prélèvement à la source de l&apos;impôt. Le passage du brut au net
          d&apos;une pension, différent de celui d&apos;un salaire, est détaillé
          dans notre guide{" "}
          <Link href="/guides/retraite-brut-net" className="text-primary underline-offset-4 hover:underline">
            retraite brut et net
          </Link>
          .
        </p>
      </section>

      <section id="retard" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Virement en retard : les quatre causes habituelles
        </h2>
        <ol className="mt-6 space-y-4">
          {[
            { t: "Le délai bancaire", x: "La date du calendrier est celle de l'émission du virement par la caisse. Selon la banque, l'inscription au compte prend un à deux jours ouvrés — davantage quand la date tombe un jeudi ou un vendredi. Un virement émis le 9 peut n'apparaître que le 11." },
            { t: "Un justificatif manquant", x: "Certificat d'existence non retourné (résidents hors de France), avis d'imposition non transmis pour le calcul du taux de CSG, RIB périmé après un changement de banque : la caisse suspend le paiement jusqu'à régularisation, et prévient par courrier ou dans l'espace personnel." },
            { t: "Une première pension", x: "Le premier versement après le départ en retraite intervient souvent avec un à trois mois de décalage, le temps de liquider les droits. Un acompte peut être demandé si le dossier traîne ; les mois manquants sont ensuite versés en rappel." },
            { t: "Une révision en cours", x: "Un changement de situation (reprise d'activité, modification de la CSG au 1er janvier, révision de la pension de réversion) peut retarder un versement le temps du recalcul. Le montant est régularisé sur le virement suivant." },
          ].map((e, i) => (
            <li key={e.t} className="flex gap-4 rounded-2xl border border-border bg-white p-5 shadow-md">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{i + 1}</span>
              <div>
                <p className="font-semibold text-foreground">{e.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{e.x}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80">
          Vous êtes encore en activité et préparez ce calendrier pour plus tard ?
          Le passage du salaire à la pension se prépare en amont — nos guides sur
          la{" "}
          <Link href="/guides/portage-salarial-retraite" className="text-primary underline-offset-4 hover:underline">
            retraite en portage salarial
          </Link>{" "}
          et sur le{" "}
          <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
            1er janvier 2027
          </Link>{" "}
          couvrent les échéances qui comptent.
        </p>
      </section>
    </GuideShell>
  );
}
