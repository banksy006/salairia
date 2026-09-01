import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, ScaleIcon, ShieldIcon, AlertTriangleIcon, CompassIcon } from "@/components/icons";

const meta: GuideMeta = {
  slug: "portage-salarial-fonctionnaire",
  titre: "Portage salarial et fonction publique : ce qu'un agent peut vraiment faire",
  sousTitre: "Le cumul d'activités est possible, mais il passe par une autorisation — pas par un simple contrat",
  chapo: "Un fonctionnaire peut-il être salarié porté ? La réponse tient en une nuance : le statut général de la fonction publique pose un principe d'exclusivité, assorti de dérogations précises. Selon que vous êtes à temps plein, à temps partiel, en disponibilité ou sur le départ, la réponse change complètement — et une activité exercée sans autorisation expose à des sanctions disciplinaires et au reversement des sommes perçues.",
  filAriane: "Portage et fonction publique",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  tocItems: [
    { id: "principe", label: "Le principe d'exclusivité" },
    { id: "cas", label: "Les quatre situations" },
    { id: "procedure", label: "La procédure d'autorisation" },
    { id: "risques", label: "Ce que l'on risque" },
  ],
  faq: [
    {
      q: "Un fonctionnaire peut-il exercer en portage salarial ?",
      r: "Pas librement. Le statut général impose aux agents publics de consacrer l'intégralité de leur activité professionnelle à leurs fonctions, avec des dérogations limitativement énumérées par le code général de la fonction publique. Le portage salarial n'est pas interdit en soi, mais il constitue une activité accessoire soumise à autorisation préalable de l'autorité hiérarchique — et cette autorisation n'est accordée que si l'activité est compatible avec les fonctions exercées, ne porte pas atteinte au fonctionnement du service et ne place pas l'agent en situation de conflit d'intérêts.",
    },
    {
      q: "Quelles activités accessoires sont autorisées ?",
      r: "Le décret sur le cumul d'activités dresse une liste : expertise et consultation, enseignement et formation, activité à caractère sportif ou culturel, travaux de faible importance chez des particuliers, activité de conjoint collaborateur, aide à domicile à un ascendant ou descendant, entre autres. L'expertise-conseil et la formation, les deux activités les plus courantes en portage salarial, y figurent — c'est ce qui rend le montage possible, à condition qu'elles soient exercées à titre accessoire et non concurrent du service.",
    },
    {
      q: "Un agent à temps partiel a-t-il plus de latitude ?",
      r: "Oui. Un agent occupant un emploi à temps non complet ou exerçant à temps partiel, dont la durée de travail est inférieure ou égale à 70 % de la durée légale, peut exercer une activité privée lucrative — sous réserve d'en informer par écrit son autorité hiérarchique et que l'activité soit compatible avec ses fonctions. Le régime est nettement plus souple que celui du temps plein, où seule la liste des activités accessoires s'applique.",
    },
    {
      q: "Et si je quitte la fonction publique pour devenir consultant ?",
      r: "C'est la voie la plus claire. Deux options : la disponibilité pour convenances personnelles ou pour créer une entreprise, qui suspend votre lien avec l'administration tout en préservant votre droit à réintégration ; ou la démission. Dans les deux cas, si votre activité privée est en lien avec vos anciennes fonctions, votre projet doit être examiné au titre du contrôle déontologique — l'administration, et le cas échéant la Haute Autorité pour la transparence de la vie publique, vérifie l'absence de risque pénal et déontologique. Cette saisine est obligatoire, pas facultative.",
    },
    {
      q: "Puis-je facturer mon ancienne administration en portage ?",
      r: "C'est le point le plus sensible. Prendre ou recevoir un intérêt dans une entreprise que l'on a été chargé de surveiller ou avec laquelle on a conclu des contrats est pénalement sanctionné pendant trois ans après la cessation des fonctions. Facturer des prestations à son ancien service, ou à une structure dont on assurait le contrôle, entre potentiellement dans ce champ. Le contrôle déontologique préalable existe précisément pour trancher ces cas : ne vous en dispensez pas au motif que le portage salarial « n'est pas une entreprise » — c'est l'activité réelle qui compte, pas le véhicule juridique.",
    },
  ],
  sources: [
    { label: "Code général de la fonction publique, art. L121-3 et suivants — cumul d'activités (Légifrance)", href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000044416551/LEGISCTA000044423451/" },
    { label: "Décret n° 2020-69 du 30 janvier 2020 — contrôle déontologique (Légifrance)", href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041502419" },
    { label: "service-public.fr — cumul d'activités d'un agent public", href: "https://www.service-public.fr/particuliers/vosdroits/F32483" },
    { label: "HATVP — le contrôle déontologique des agents publics", href: "https://www.hatvp.fr/" },
  ],
};

export const metadata: Metadata = {
  title: "Portage salarial et fonctionnaire : cumul, autorisation, disponibilité",
  description: "Un agent public peut exercer en portage salarial, mais sous conditions : autorisation préalable pour une activité accessoire (expertise, formation), régime allégé sous 70 % de temps de travail, contrôle déontologique en cas de départ. Ce que l'on risque sans autorisation.",
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Portage salarial et fonction publique : ce qu'un agent peut vraiment faire",
    description: "Cumul d'activités, autorisation hiérarchique, disponibilité et contrôle déontologique.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="principe" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ScaleIcon className="w-4 h-4" /></IconBadge>
          Le principe : exclusivité, avec des portes de sortie
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            Le code général de la fonction publique pose une règle nette :
            l&apos;agent public consacre{" "}
            <strong>l&apos;intégralité de son activité professionnelle</strong>{" "}
            aux tâches qui lui sont confiées. Ce n&apos;est pas une clause
            d&apos;exclusivité négociable comme dans le privé : c&apos;est un
            principe statutaire, applicable aux fonctionnaires comme aux
            contractuels de droit public.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Les dérogations existent, mais elles sont{" "}
            <strong>limitativement énumérées</strong> et presque toutes
            soumises à autorisation ou déclaration préalable. Le portage
            salarial n&apos;est jamais interdit en tant que tel — il est
            simplement le véhicule d&apos;une activité qui, elle, doit entrer
            dans une case autorisée. C&apos;est le raisonnement inverse de
            celui qu&apos;on adopte spontanément : la question n&apos;est pas
            « ai-je le droit de faire du portage ? » mais « ai-je le droit
            d&apos;exercer cette activité ? ».
          </p>
        </div>
      </section>

      <section id="cas" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CompassIcon className="w-4 h-4" /></IconBadge>
          Les quatre situations, du plus contraint au plus libre
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Votre situation</th>
                <th className="px-5 py-4">Le portage est-il possible ?</th>
                <th className="px-5 py-4">Formalité</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Temps plein",
                  "Oui, si l'activité figure sur la liste des activités accessoires (expertise, consultation, enseignement, formation) et reste accessoire.",
                  "Autorisation préalable écrite de l'autorité hiérarchique.",
                  false,
                ],
                [
                  "Temps partiel ≤ 70 %",
                  "Oui, y compris pour une activité privée lucrative plus large, sous réserve de compatibilité avec les fonctions.",
                  "Information écrite de l'autorité hiérarchique.",
                  false,
                ],
                [
                  "Disponibilité",
                  "Oui, largement : le lien avec l'administration est suspendu, avec droit à réintégration.",
                  "Demande de disponibilité + contrôle déontologique si lien avec les anciennes fonctions.",
                  true,
                ],
                [
                  "Après démission",
                  "Oui, sans restriction statutaire — mais le contrôle déontologique et le délai de trois ans restent applicables.",
                  "Saisine préalable de l'administration si lien avec les anciennes fonctions.",
                  true,
                ],
              ].map(([s, p, f, best]) => (
                <tr key={s as string} className={`border-b border-border align-top last:border-b-0 ${best ? "bg-accent/5" : ""}`}>
                  <td className={`px-5 py-3 font-semibold text-foreground ${best ? "border-l-4 border-accent" : ""}`}>{s}</td>
                  <td className="px-5 py-3 text-foreground/80">{p}</td>
                  <td className="px-5 py-3 text-foreground/80">{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Les deux activités les plus fréquentes en portage —{" "}
          <strong>expertise-conseil</strong> et <strong>formation</strong> —
          figurent sur la liste des activités accessoires autorisées. C&apos;est
          ce qui rend le montage praticable pour un agent à temps plein, à
          condition que l&apos;activité reste réellement accessoire et sans
          concurrence avec le service.
        </p>
      </section>

      <section id="procedure" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><ShieldIcon className="w-4 h-4" /></IconBadge>
          La procédure : demander avant, pas après
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">1.</span>
              <span><strong>Demande écrite</strong> à l&apos;autorité hiérarchique, décrivant l&apos;activité envisagée, son employeur (la société de portage), sa durée, ses conditions de rémunération et son volume horaire.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">2.</span>
              <span><strong>Examen de trois critères</strong> : compatibilité avec les fonctions exercées, absence d&apos;atteinte au fonctionnement normal du service, absence de conflit d&apos;intérêts ou d&apos;atteinte à l&apos;indépendance de l&apos;agent.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">3.</span>
              <span><strong>Décision expresse</strong>, qui peut être assortie de réserves ou de limites de volume. L&apos;autorisation vaut pour l&apos;activité décrite : tout changement significatif suppose une nouvelle demande.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">4.</span>
              <span><strong>Contrôle déontologique</strong> si vous partez en disponibilité ou démissionnez pour exercer une activité en lien avec vos anciennes fonctions — l&apos;administration, et le cas échéant la HATVP, examine le dossier.</span>
            </li>
          </ul>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">
            La société de portage n&apos;a aucun rôle dans cette procédure et
            ne peut pas vous en dispenser : elle est votre employeur privé, pas
            votre interlocuteur statutaire. Un discours commercial qui minimise
            cette étape est un signal d&apos;alerte — notre{" "}
            <Link href="/comparateurs/portage-salarial" className="text-primary underline-offset-4 hover:underline">
              comparatif des sociétés
            </Link>{" "}
            aide à choisir sur des critères objectifs.
          </p>
        </div>
      </section>

      <section id="risques" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Ce que l&apos;on risque sans autorisation
        </h2>
        <div className="mt-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
          <p className="text-base leading-relaxed">
            Exercer une activité privée sans l&apos;autorisation requise expose
            à une <strong>sanction disciplinaire</strong> et au{" "}
            <strong>reversement des sommes perçues</strong>, par voie de
            retenue sur traitement. Les cas les plus graves — activité
            concurrente du service, prise illégale d&apos;intérêts — relèvent du
            juge pénal, avec un délai de trois ans après la cessation des
            fonctions pendant lequel prendre un intérêt dans une entreprise que
            l&apos;on a surveillée ou contractée reste sanctionnable.
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Ce guide décrit le cadre général : chaque versant de la fonction
          publique, chaque corps et chaque situation locale peuvent ajouter
          leurs règles. Avant d&apos;engager quoi que ce soit, adressez-vous à
          votre service des ressources humaines — c&apos;est gratuit, et
          c&apos;est la seule réponse opposable. Si votre projet est de quitter
          la fonction publique pour devenir indépendant, notre{" "}
          <Link href="/simulateurs/salarie-ou-freelance" className="text-primary underline-offset-4 hover:underline">
            comparateur salarié ou freelance
          </Link>{" "}
          chiffre l&apos;écart de revenu, et notre guide du{" "}
          <Link href="/guides/point-indice-fonction-publique" className="text-primary underline-offset-4 hover:underline">
            point d&apos;indice
          </Link>{" "}
          vous aide à évaluer précisément ce que vous quitteriez.
        </p>
      </section>
    </GuideShell>
  );
}
