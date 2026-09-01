import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, CalendarIcon, PercentIcon, InfoIcon, ScaleIcon } from "@/components/icons";

const meta: GuideMeta = {
  slug: "revalorisation-retraites-2027",
  titre: "Revalorisation des retraites 2027 : les deux hausses à ne pas confondre",
  sousTitre: "Agirc-Arrco au 1er novembre 2026, pensions de base au 1er janvier 2027 — deux dates, deux mécaniques, deux montants",
  chapo: "Chaque automne, la même confusion : « les retraites augmentent-elles en novembre ou en janvier ? » Les deux — mais pas les mêmes. La complémentaire Agirc-Arrco est revalorisée au 1er novembre, sur décision des partenaires sociaux ; la pension de base au 1er janvier, automatiquement, sur l'inflation. Pour un retraité du privé, la hausse réelle est la moyenne pondérée des deux. Voici les mécaniques, les estimations disponibles à date, et le calendrier des annonces.",
  filAriane: "Retraites 2027",
  datePublished: "2026-08-25",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "deux", label: "Les deux revalorisations" },
    { id: "base", label: "La base : mécanique et estimation" },
    { id: "complementaire", label: "L'Agirc-Arrco" },
    { id: "concret", label: "Ce que ça change sur une pension" },
  ],
  faq: [
    {
      q: "De combien les retraites vont-elles augmenter en 2027 ?",
      r: "Aucun chiffre n'est définitif à ce jour — méfiez-vous des montants affirmés sans réserve. Pour les pensions de base (1er janvier 2027), la revalorisation légale suit l'inflation moyenne hors tabac constatée de novembre 2025 à octobre 2026 : les projections disponibles tournent autour de +1,6 %, chiffre qui ne sera définitif qu'avec les données d'inflation d'octobre, publiées mi-novembre. Pour l'Agirc-Arrco (1er novembre 2026), les partenaires sociaux décident dans un cadre fixé par leur accord : les estimations évoquent environ +1,4 %, après une année 2025 sans revalorisation. Cette page est mise à jour à chaque annonce officielle.",
    },
    {
      q: "Pourquoi la pension de base et la complémentaire n'augmentent-elles pas pareil ?",
      r: "Parce que personne ne décide de la même façon. La pension de base est revalorisée automatiquement par application du Code de la sécurité sociale : inflation moyenne sur douze mois, point final — sauf lorsque le législateur y déroge par une loi de finances (gel, décalage de date, hausse partielle : c'est arrivé plusieurs fois). L'Agirc-Arrco est un régime paritaire géré par les syndicats et le patronat : la valeur du point est fixée chaque automne par leur conseil d'administration, selon un accord qui prévoit l'inflation moins un « facteur de soutenabilité » pouvant aller jusqu'à 0,4 point, avec liberté d'appréciation. Résultat : deux pourcentages différents presque chaque année.",
    },
    {
      q: "Quelle part de ma retraite dépend de chaque régime ?",
      r: "Pour un salarié du privé, la pension de base (CNAV) est plafonnée — elle se calcule sur les salaires dans la limite du plafond de la Sécurité sociale — tandis que l'Agirc-Arrco couvre aussi la part des salaires au-delà. Conséquence : plus votre carrière a été rémunérée au-dessus du plafond, plus l'Agirc-Arrco pèse. Ordres de grandeur : autour de 30 % de la pension totale pour un non-cadre, 40 à 60 % pour un cadre. La revalorisation de novembre compte donc davantage pour les anciens cadres, celle de janvier pour les petites pensions.",
    },
    {
      q: "Les retraites peuvent-elles être gelées ou sous-indexées en 2027 ?",
      r: "C'est juridiquement possible et politiquement récurrent : la revalorisation légale de la base peut être modifiée par la loi de financement de la Sécurité sociale, votée en décembre — décalages de date (2014, 2019), revalorisation différenciée selon le montant de pension (2020), gel partiel : tous ces précédents existent. Le PLFSS 2027, présenté fin septembre 2026, est le texte à surveiller. Côté Agirc-Arrco, le régime a déjà appliqué zéro revalorisation en novembre 2025 : la décision de novembre 2026 n'est pas davantage garantie.",
    },
    {
      q: "Et les indépendants, les fonctionnaires, les régimes spéciaux ?",
      r: "La revalorisation du 1er janvier s'applique aux pensions de base de la quasi-totalité des régimes alignés (salariés, indépendants via la SSI, agricoles) ainsi qu'aux pensions civiles et militaires de l'État. Les complémentaires, elles, suivent chacune leur gouvernance : l'Agirc-Arrco pour les salariés du privé, la complémentaire des indépendants (revalorisée par la même LFSS ou par le conseil de la SSI), la RAFP pour les fonctionnaires. Un ancien indépendant vérifiera donc deux lignes différentes de son relevé, comme un ancien salarié.",
    },
  ],
  sources: [
    { label: "Code de la sécurité sociale, art. L161-25 — revalorisation sur l'inflation (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033715437" },
    { label: "Agirc-Arrco — la valeur du point", href: "https://www.agirc-arrco.fr/ma-retraite/valeur-du-point/" },
    { label: "L'Assurance retraite — la revalorisation des pensions", href: "https://www.lassuranceretraite.fr/" },
    { label: "service-public.fr — montant et revalorisation de la retraite", href: "https://www.service-public.fr/particuliers/vosdroits/N381" },
  ],
};

export const metadata: Metadata = {
  title: "Revalorisation des retraites 2027 : Agirc-Arrco en novembre, base en janvier",
  description: "Deux hausses distinctes : l'Agirc-Arrco au 1er novembre 2026 (décision paritaire, ~+1,4 % estimé) et les pensions de base au 1er janvier 2027 (inflation nov. 2025-oct. 2026, ~+1,6 % projeté). Mécaniques, calendrier des annonces, et ce que ça change sur une pension type.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Retraites 2027 : les deux hausses à ne pas confondre",
    description: "Novembre pour la complémentaire, janvier pour la base — mécaniques et estimations.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="deux" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Deux revalorisations, deux logiques
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">&nbsp;</th>
                <th className="px-5 py-4">Pension de base (CNAV…)</th>
                <th className="px-5 py-4">Complémentaire Agirc-Arrco</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Date", "1er janvier 2027", "1er novembre 2026"],
                ["Qui décide", "Automatique (loi) — sauf dérogation votée en LFSS", "Le conseil d'administration paritaire du régime"],
                ["Sur quelle base", "Inflation moyenne hors tabac, novembre 2025 → octobre 2026", "Inflation prévue, minorée d'un facteur de soutenabilité (jusqu'à −0,4 pt)"],
                ["Estimation à date", "≈ +1,6 % (projection, définitif mi-novembre)", "≈ +1,4 % (évoqué, décision à l'automne)"],
                ["Précédents récents", "Décalages et hausses différenciées votés plusieurs fois", "0 % en novembre 2025"],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-b border-border align-top last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-foreground">{k}</td>
                  <td className="px-5 py-3 text-foreground/80">{a}</td>
                  <td className="px-5 py-3 text-foreground/80">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="base" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          La base : une formule, une fenêtre de douze mois
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            L&apos;article L161-25 du Code de la sécurité sociale indexe les
            pensions de base sur{" "}
            <strong>l&apos;évolution moyenne annuelle des prix hors
            tabac</strong>, mesurée sur les douze mois de novembre à octobre.
            C&apos;est une moyenne lissée, pas l&apos;inflation instantanée :
            quand les prix ralentissent, la revalorisation reflète encore en
            partie les hausses passées — et inversement. Le chiffre définitif
            tombe donc mécaniquement <strong>mi-novembre</strong>, avec la
            publication de l&apos;indice d&apos;octobre par l&apos;INSEE.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La réserve habituelle : cette automaticité cède devant une loi.
            Les LFSS ont plusieurs fois décalé la date, différencié la hausse
            selon le niveau de pension ou sous-indexé — le PLFSS 2027,
            présenté fin septembre, est donc le texte à lire avant de tenir
            +1,6 % pour acquis. Nous suivons ce dossier dans notre{" "}
            <Link href="/guides/ce-qui-change-1er-janvier-2027" className="text-primary underline-offset-4 hover:underline">
              récapitulatif du 1er janvier 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="complementaire" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          L&apos;Agirc-Arrco : un régime qui décide, pas une formule qui s&apos;applique
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La complémentaire des salariés du privé fonctionne par{" "}
            <strong>points</strong> : la pension = nombre de points × valeur
            de service du point. Chaque automne, syndicats et patronat fixent
            cette valeur pour le 1er novembre, dans le cadre de leur accord
            quadriennal : référence à l&apos;inflation prévisionnelle,
            minorée le cas échéant d&apos;un{" "}
            <strong>facteur de soutenabilité</strong> allant jusqu&apos;à 0,4
            point, pour préserver les réserves du régime.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            La conséquence pratique : l&apos;Agirc-Arrco peut décider{" "}
            <strong>zéro</strong> — elle l&apos;a fait en novembre 2025 — là
            où la base suivait l&apos;inflation. Pour 2026, les discussions
            évoquent environ +1,4 % au 1er novembre ; la décision officielle
            tombe à l&apos;automne et sera intégrée ici. Rappel utile : la
            valeur d&apos;<em>achat</em> du point (pour les actifs qui
            cotisent) évolue séparément — une hausse de la première
            n&apos;améliore pas le rendement de la seconde.
          </p>
        </div>
      </section>

      <section id="concret" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Ce que ça change sur une pension type
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Prenons une pension nette de 1 800 € composée de 1 200 € de base
            et 600 € d&apos;Agirc-Arrco (profil non-cadre de carrière
            complète). Avec les estimations actuelles — à confirmer — la
            hausse totale serait d&apos;environ{" "}
            <strong>27 € par mois</strong> : ~8 € dès novembre 2026 (+1,4 %
            sur la complémentaire), puis ~19 € en janvier 2027 (+1,6 % sur la
            base). Pour un ancien cadre à 2 800 € dont 1 400 €
            d&apos;Agirc-Arrco, l&apos;ordre de grandeur monte à ~42 €,
            davantage porté par la complémentaire.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Deux rappels pour lire son relevé de janvier : les montants
            s&apos;entendent <strong>bruts</strong> — CSG (taux selon le
            revenu fiscal de référence), CRDS et Casa s&apos;appliquent
            ensuite, et un franchissement de seuil de CSG peut absorber une
            partie de la hausse ; et le versement de janvier de la base
            arrive début février (paiement à terme échu), là où
            l&apos;Agirc-Arrco paie d&apos;avance début novembre. Pour les
            actifs qui lisent cette page en préparant leur propre retraite,
            le paramètre qui pilote votre future pension par points est le{" "}
            <Link href="/guides/plafond-securite-sociale-2027" className="text-primary underline-offset-4 hover:underline">
              plafond de la Sécurité sociale
            </Link>{" "}
            — et votre relevé de carrière se construit sur le brut calculé
            par notre{" "}
            <Link href="/simulateurs/salaire-brut-net" className="text-primary underline-offset-4 hover:underline">
              simulateur brut/net
            </Link>
            .
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
