"use client";

import { useState } from "react";
import Link from "next/link";

// Question en un clic pour savoir QUI lit une page, puis deux liens adaptés au
// profil choisi. Pas de redirection : le lecteur reste sur la page qu'il est
// venu lire, et choisit s'il veut aller plus loin.
// Mesure : événement Plausible « Profil lecteur » (props profil, page), anonyme,
// sans cookie ni stockage navigateur. Les clics sur les suggestions se lisent
// dans Plausible comme des pages vues ordinaires.
type Suggestion = { href: string; label: string };

const PROFILS: { profil: string; suggestions: Suggestion[] }[] = [
  {
    profil: "Salarié",
    suggestions: [
      { href: "/simulateurs/salaire-brut-net", label: "Convertir ton brut en net" },
      { href: "/simulateurs/ou-se-situe-mon-salaire", label: "Situer ton salaire parmi les Français" },
    ],
  },
  {
    profil: "Employeur ou dirigeant",
    suggestions: [
      { href: "/simulateurs/salaire-brut-net", label: "Calculer le coût employeur d'un salaire" },
      { href: "/guides/ce-qui-change-1er-janvier-2027", label: "Ce qui change pour la paie au 1er janvier" },
    ],
  },
  {
    profil: "RH ou paie",
    suggestions: [
      { href: "/guides/ce-qui-change-1er-janvier-2027", label: "Tous les changements du 1er janvier 2027" },
      { href: "/guides/plafond-securite-sociale-2027", label: "Le plafond de la Sécurité sociale 2027" },
    ],
  },
  {
    profil: "Indépendant",
    suggestions: [
      { href: "/simulateurs/tjm-freelance", label: "Calculer ton TJM selon ton statut" },
      { href: "/comparateurs/portage-salarial", label: "Comparer les sociétés de portage" },
    ],
  },
  {
    profil: "En recherche d'emploi",
    suggestions: [
      { href: "/simulateurs/negociation-salariale", label: "Préparer ta négociation de salaire" },
      { href: "/simulateurs/ou-se-situe-mon-salaire", label: "Connaître le salaire médian en France" },
    ],
  },
  {
    profil: "Retraité",
    suggestions: [
      { href: "/guides/calendrier-paiement-retraite-2027", label: "Les dates de versement des retraites 2027" },
      { href: "/guides/revalorisation-retraites-2027", label: "La revalorisation des pensions en 2027" },
    ],
  },
  {
    profil: "Étudiant ou apprenti",
    suggestions: [
      { href: "/guides/salaire-apprenti-2027", label: "Le salaire d'un apprenti en 2027" },
      { href: "/guides/gratification-stage-2027", label: "La gratification de stage 2027" },
    ],
  },
];

export default function SondageProfil({ page, question }: { page: string; question: string }) {
  const [choix, setChoix] = useState<(typeof PROFILS)[number] | null>(null);

  function repondre(p: (typeof PROFILS)[number]) {
    window.plausible?.("Profil lecteur", { props: { profil: p.profil, page } });
    setChoix(p);
  }

  // Ne propose pas la page en cours de lecture.
  const suggestions = choix?.suggestions.filter((s) => s.href !== page) ?? [];

  return (
    <div className="rounded-2xl border border-border bg-muted/50 p-5">
      {choix ? (
        <>
          <p className="text-sm font-semibold text-foreground">Merci ! Ça pourrait t&apos;être utile :</p>
          <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="block rounded-xl border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-primary transition hover:border-primary"
                >
                  {s.label} →
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="text-sm font-semibold text-foreground">{question}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILS.map((p) => (
              <button
                key={p.profil}
                type="button"
                onClick={() => repondre(p)}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-foreground transition hover:border-primary hover:text-primary focus:outline-none focus:ring-4 focus:ring-ring"
              >
                {p.profil}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Réponse anonyme, sans cookie. On te propose ensuite deux pages utiles pour ta situation.
          </p>
        </>
      )}
    </div>
  );
}
