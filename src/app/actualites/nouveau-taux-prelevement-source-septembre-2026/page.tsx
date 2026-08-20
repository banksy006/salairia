import type { Metadata } from "next";
import Link from "next/link";
import ArticleShell, { type ArticleMeta } from "@/components/ArticleShell";
import { IconBadge, CalendarIcon, PercentIcon, InfoIcon, AlertTriangleIcon } from "@/components/icons";
import data from "@/data/actualites.json";

const article = data.articles.find(
  (a) => a.slug === "nouveau-taux-prelevement-source-septembre-2026",
)! as ArticleMeta;

export const metadata: Metadata = {
  title: "Prélèvement à la source : nouveau taux au 1er septembre 2026",
  description:
    "Votre taux de PAS change au 1er septembre 2026, issu de la déclaration du printemps. Pour les couples mariés ou pacsés, le taux individualisé s'applique désormais par défaut. Comment vérifier, et comment revenir au taux commun.",
  alternates: { canonical: `/actualites/${article.slug}` },
  openGraph: {
    title: "Prélèvement à la source : nouveau taux au 1er septembre 2026",
    description:
      "Nouveau taux, individualisation automatique pour les couples, étalement du solde : ce qu'il faut vérifier sur son bulletin de septembre.",
    url: `/actualites/${article.slug}`,
    type: "article",
  },
};

export default function Page() {
  return (
    <ArticleShell article={article} filAriane="Nouveau taux de PAS">
      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Pourquoi votre taux change en septembre
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Le taux de prélèvement à la source appliqué de janvier à août repose
          sur votre déclaration de l&apos;année précédente. Au{" "}
          <strong>1er septembre</strong>, l&apos;administration bascule sur le
          taux calculé à partir de la déclaration que vous avez faite au
          printemps — celle qui porte sur vos revenus de l&apos;année passée.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          C&apos;est un ajustement annuel automatique : vous n&apos;avez rien à
          demander. Si vos revenus ont augmenté l&apos;an dernier, votre taux
          monte ; s&apos;ils ont baissé, il descend. Le bulletin de paie de
          septembre est donc le bon moment pour vérifier que le taux transmis à
          votre employeur correspond bien à celui affiché sur votre espace
          personnel impots.gouv.fr.
        </p>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><PercentIcon className="w-4 h-4" /></IconBadge>
          Couples mariés ou pacsés : le taux individualisé par défaut
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md">
          <p className="text-base leading-relaxed text-foreground/80">
            C&apos;est le changement de fond, entré en vigueur depuis septembre
            2025 : pour les couples soumis à imposition commune, le{" "}
            <strong>taux individualisé s&apos;applique automatiquement</strong>{" "}
            à chacun des conjoints, au lieu du taux unique du foyer.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Le point à comprendre pour ne pas s&apos;inquiéter :{" "}
            <strong>
              le montant total d&apos;impôt dû par le foyer ne change pas
            </strong>
            . Seule sa <em>répartition</em> entre les deux conjoints évolue.
            Chacun se voit appliquer un taux représentatif de ses propres
            revenus, au lieu d&apos;un taux moyen commun. Concrètement, dans un
            couple aux revenus inégaux, celui qui gagne le moins voit son
            prélèvement baisser et l&apos;autre le voit monter — la somme reste
            identique.
          </p>
          <div className="mt-5 rounded-r-lg border-l-4 border-primary bg-muted p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Vous préférez le taux commun ?</strong>{" "}
              Le choix reste ouvert : la bascule vers le taux du foyer se
              demande depuis votre espace particulier sur impots.gouv.fr,
              rubrique « Gérer mon prélèvement à la source ». C&apos;est une
              question d&apos;organisation au sein du couple, pas
              d&apos;optimisation fiscale — le total dû est le même dans les
              deux cas.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Le solde de plus de 300 € étalé de septembre à décembre
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          Si votre déclaration a fait apparaître un solde d&apos;impôt restant
          dû supérieur à <strong>300 €</strong>, il n&apos;est pas prélevé en
          une fois : il est automatiquement étalé en{" "}
          <strong>quatre prélèvements</strong>, de septembre à décembre 2026.
          Là encore, aucune démarche n&apos;est nécessaire — l&apos;étalement
          est appliqué d&apos;office. En dessous de 300 €, le solde est prélevé
          en une seule fois.
        </p>
      </section>

      <section>
        <h2 className="flex items-center text-2xl font-bold text-foreground">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Trois choses à vérifier sur le bulletin de septembre
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span>
                <strong>Le taux affiché</strong> correspond-il à celui de votre
                espace impots.gouv.fr ? Un décalage d&apos;un mois est normal
                (l&apos;employeur récupère le taux via la DSN) ; un écart
                persistant ne l&apos;est pas.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span>
                <strong>Le taux appliqué est-il le vôtre ou celui du foyer ?</strong>{" "}
                Si vous êtes en couple et que le montant vous surprend, c&apos;est
                très probablement l&apos;individualisation qui joue.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span>
                <strong>Votre situation a-t-elle changé depuis la déclaration ?</strong>{" "}
                Mariage, naissance, baisse de revenus : vous pouvez demander une
                actualisation du taux en cours d&apos;année plutôt
                qu&apos;attendre septembre prochain.
              </span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            Pour estimer ce que le nouveau taux change sur votre net réellement
            versé, notre{" "}
            <Link href="/simulateurs/net-apres-impot" className="text-primary underline-offset-4 hover:underline">
              simulateur net après impôt
            </Link>{" "}
            applique le barème 2026 à votre situation.
          </p>
        </div>
      </section>
    </ArticleShell>
  );
}
