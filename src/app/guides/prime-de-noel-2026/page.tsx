import type { Metadata } from "next";
import Link from "next/link";
import GuideShell, { type GuideMeta } from "@/components/GuideShell";
import { IconBadge, EuroIcon, CalendarIcon, InfoIcon, AlertTriangleIcon } from "@/components/icons";

// Montant de base inchangé depuis sa création — 152,45 € (ex-1 000 francs).
// Barème RSA : majoration selon la composition du foyer (coefficients officiels).
const BASE = 152.45;
const BAREME_RSA = [
  { foyer: "Personne seule", coef: 1 },
  { foyer: "Couple sans enfant · parent isolé + 1 enfant", coef: 1.5 },
  { foyer: "Couple + 1 enfant · parent isolé + 2 enfants", coef: 1.8 },
  { foyer: "Couple + 2 enfants", coef: 2.1 },
  { foyer: "Couple + 3 enfants", coef: 2.5 },
  { foyer: "Par enfant supplémentaire", coef: 0.4 },
];
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

const meta: GuideMeta = {
  slug: "prime-de-noel-2026",
  titre: "Prime de Noël 2026 : montant, bénéficiaires, date de versement",
  sousTitre: `${EUR2.format(BASE)} de base, versée mi-décembre — automatiquement, et pas pour tout le monde`,
  chapo: `Chaque décembre depuis 1998, l'État verse une prime de Noël aux foyers bénéficiaires de certains minima sociaux — 2,2 millions de ménages l'an dernier. Le montant de base n'a jamais bougé : ${EUR2.format(BASE)}, majorés selon la famille pour les allocataires du RSA. Qui la touche, qui ne la touche pas (les retraités et les salariés modestes en sont exclus), et le calendrier attendu pour 2026.`,
  filAriane: "Prime de Noël 2026",
  datePublished: "2026-08-25",
  dateModified: "2026-08-25",
  tocItems: [
    { id: "qui", label: "Qui la touche" },
    { id: "montants", label: "Les montants" },
    { id: "calendrier", label: "Le calendrier 2026" },
    { id: "exclus", label: "Qui n'y a pas droit" },
  ],
  faq: [
    {
      q: "Qui touche la prime de Noël ?",
      r: "Les foyers qui perçoivent, en novembre ou décembre, l'un de ces minima : le RSA (montant majoré selon la composition familiale), l'allocation de solidarité spécifique (ASS), l'allocation équivalent retraite (AER) ou la prime forfaitaire de reprise d'activité. Le versement est entièrement automatique — CAF, MSA ou France Travail selon votre situation — sans aucune démarche. Si vous êtes éligible et n'avez rien reçu fin décembre, contactez votre organisme payeur : c'est un incident de versement, pas une demande à faire.",
    },
    {
      q: "Quel est le montant de la prime de Noël en 2026 ?",
      r: `Le montant de base est de ${EUR2.format(BASE)} — inchangé depuis la création de la prime en 1998 (c'était 1 000 francs). Pour les bénéficiaires du RSA, il est majoré selon le foyer : ${EUR2.format(BASE * 1.5)} pour un couple sans enfant, ${EUR2.format(BASE * 2.1)} pour un couple avec deux enfants, par exemple. Pour l'ASS et l'AER, le montant reste forfaitaire — ${EUR2.format(BASE)} quelle que soit la famille. Les montants 2026 seront confirmés par le décret de décembre ; ils sont identiques d'année en année depuis plus de vingt-cinq ans.`,
    },
    {
      q: "Quand la prime de Noël 2026 sera-t-elle versée ?",
      r: "Le décret paraît généralement début décembre et le versement intervient à la mi-décembre — le 16 décembre en 2025. Comptez ensuite deux à cinq jours ouvrés selon les banques. Les personnes qui ouvrent un droit au RSA en décembre seulement sont payées en janvier, après le traitement de leur dossier. Cette page sera mise à jour dès la publication du décret 2026.",
    },
    {
      q: "La prime de Noël est-elle imposable ou saisissable ?",
      r: "Ni l'un ni l'autre : elle est exonérée d'impôt sur le revenu, de CSG et de CRDS, elle n'entre pas dans les ressources retenues pour le calcul des autres prestations, et elle est insaisissable — un huissier ne peut pas la prélever sur votre compte. Elle ne se déclare nulle part.",
    },
    {
      q: "Un salarié au SMIC ou un chômeur indemnisé y a-t-il droit ?",
      r: "Non, et c'est l'incompréhension la plus fréquente. La prime de Noël d'État est réservée aux minima sociaux cités : un salarié modeste, un allocataire de l'ARE « classique », un retraité au minimum vieillesse (ASPA) ou un bénéficiaire de l'AAH n'y ont pas droit. Ne la confondez pas non plus avec les primes de fin d'année versées par certains employeurs ou comités d'entreprise — un 13e mois ou une gratification de décembre relèvent du contrat de travail, pas de l'État. Notre guide sur le 13e mois fait le tri.",
    },
  ],
  sources: [
    { label: "info.gouv.fr — prime de Noël : montant, versement, bénéficiaires", href: "https://www.info.gouv.fr/actualite/prime-de-noel-2025-montant-date-de-versement-et-beneficiaires" },
    { label: "CAF — le versement de la prime de Noël", href: "https://www.caf.fr/allocataires/caf-du-nord/actualites-departementales/le-versement-de-la-prime-de-noel" },
    { label: "service-public.fr — prime de Noël", href: "https://www.service-public.fr/particuliers/vosdroits/F34952" },
    { label: "France Travail — allocations et aides", href: "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati.html" },
  ],
};

export const metadata: Metadata = {
  title: `Prime de Noël 2026 : ${EUR2.format(BASE)} de base, qui la touche et quand`,
  description: `La prime de Noël est versée mi-décembre aux foyers au RSA, à l'ASS ou à l'AER — automatiquement. Montant de base ${EUR2.format(BASE)} (inchangé depuis 1998), majorations familiales du RSA, calendrier 2026 et cas exclus (ARE, AAH, ASPA, salariés).`,
  alternates: { canonical: `/guides/${meta.slug}` },
  openGraph: {
    title: "Prime de Noël 2026 : montant, bénéficiaires, date",
    description: "Qui la touche, combien, quand — et qui n'y a pas droit contrairement aux idées reçues.",
    url: `/guides/${meta.slug}`,
  },
};

export default function Page() {
  return (
    <GuideShell meta={meta}>
      <section id="qui" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><EuroIcon className="w-4 h-4" /></IconBadge>
          Qui la touche : trois minima sociaux, versement automatique
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <p className="text-base leading-relaxed text-foreground/80">
            La prime est réservée aux foyers percevant, en novembre ou
            décembre, le <strong>RSA</strong>, l&apos;<strong>ASS</strong>{" "}
            (allocation de solidarité spécifique, versée aux chômeurs en fin
            de droits) ou l&apos;<strong>AER</strong> (allocation équivalent
            retraite, en extinction). Environ{" "}
            <strong>2,2 millions de foyers</strong> l&apos;ont reçue en 2025.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            Tout est automatique : la CAF ou la MSA paie les allocataires du
            RSA, France Travail paie les bénéficiaires de l&apos;ASS et de
            l&apos;AER. <strong>Aucun formulaire n&apos;existe</strong> — et
            c&apos;est un repère anti-arnaque utile : tout site, SMS ou mail
            qui propose de « demander votre prime de Noël » est frauduleux,
            sans exception.
          </p>
        </div>
      </section>

      <section id="montants" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><CalendarIcon className="w-4 h-4" /></IconBadge>
          Les montants : la grille RSA, le forfait ASS
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Composition du foyer (RSA)</th>
                <th className="px-5 py-4 text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {BAREME_RSA.map((l) => (
                <tr key={l.foyer} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3 text-foreground/80">{l.foyer}</td>
                  <td className="px-5 py-3 text-right font-bold tabular-nums text-primary">
                    {l.coef < 1 ? `+ ${EUR2.format(BASE * l.coef)}` : EUR2.format(BASE * l.coef)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">
          Pour l&apos;<strong>ASS et l&apos;AER</strong>, pas de majoration
          familiale : {EUR2.format(BASE)} par foyer, point. Le montant de base
          n&apos;a <strong>jamais été revalorisé depuis 1998</strong> — en
          euros constants, la prime a perdu environ un tiers de sa valeur.
          Chaque année, des amendements proposent de l&apos;indexer ; aucun
          n&apos;a abouti à ce jour.
        </p>
      </section>

      <section id="calendrier" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><InfoIcon className="w-4 h-4" /></IconBadge>
          Le calendrier attendu pour 2026
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-md">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <tbody>
              {[
                ["Début décembre 2026", "Publication du décret instituant la prime pour 2026 — c'est lui qui confirme montants et bénéficiaires. La prime est reconduite chaque année depuis 1998, mais elle reste juridiquement annuelle."],
                ["Mi-décembre 2026", "Versement par la CAF, la MSA et France Travail (le 16 décembre en 2025). Deux à cinq jours ouvrés de délai bancaire ensuite."],
                ["Janvier 2027", "Rattrapage pour les droits RSA ouverts en décembre et traités tardivement."],
              ].map(([d, t]) => (
                <tr key={d} className="border-b border-border last:border-b-0">
                  <td className="w-52 whitespace-nowrap px-5 py-3 font-semibold text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/80">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="exclus" className="scroll-mt-24">
        <h2 className="flex items-center text-2xl font-bold text-foreground sm:text-3xl">
          <IconBadge><AlertTriangleIcon className="w-4 h-4" /></IconBadge>
          Qui n&apos;y a pas droit — contrairement aux idées reçues
        </h2>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
          <ul className="space-y-3 text-base text-foreground/80">
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span><strong>Les allocataires de l&apos;ARE</strong> (chômage « classique ») : l&apos;assurance chômage n&apos;est pas un minimum social. Voir nos guides <Link href="/guides/portage-salarial-chomage" className="text-primary underline-offset-4 hover:underline">chômage et portage</Link> et <Link href="/guides/auto-entrepreneur-chomage" className="text-primary underline-offset-4 hover:underline">chômage et micro-entreprise</Link> pour ce que l&apos;ARE couvre réellement.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span><strong>Les bénéficiaires de l&apos;AAH et de l&apos;ASPA</strong> (minimum vieillesse) : régulièrement proposée par amendement, leur inclusion n&apos;a jamais été votée.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-destructive">❌</span>
              <span><strong>Les salariés modestes</strong>, même au SMIC : leur complément de revenu passe par la <Link href="/guides/prime-activite-2027" className="text-primary underline-offset-4 hover:underline">prime d&apos;activité</Link>, versée chaque mois — un dispositif bien plus substantiel que la prime de Noël, et massivement sous-demandé.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="text-primary">→</span>
              <span><strong>À ne pas confondre</strong> avec les primes de fin d&apos;année d&apos;employeur : <Link href="/guides/13e-mois" className="text-primary underline-offset-4 hover:underline">13e mois</Link> et <Link href="/guides/prime-partage-valeur" className="text-primary underline-offset-4 hover:underline">prime de partage de la valeur</Link> relèvent du contrat de travail — et obéissent à leurs propres règles.</span>
            </li>
          </ul>
        </div>
      </section>
    </GuideShell>
  );
}
