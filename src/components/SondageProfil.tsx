"use client";

import { useState } from "react";

// Question en un clic pour savoir QUI lit une page (salarié, employeur, paie…).
// Réponse anonyme : un événement Plausible « Profil lecteur », sans cookie et
// sans rien écrire dans le navigateur. La question peut donc réapparaître à
// une visite suivante : Plausible compte des visiteurs uniques, ça ne fausse
// pas la répartition.
const PROFILS = [
  "Salarié",
  "Employeur ou dirigeant",
  "RH ou paie",
  "Indépendant",
  "En recherche d'emploi",
  "Retraité",
  "Étudiant ou apprenti",
] as const;

export default function SondageProfil({ page, question }: { page: string; question: string }) {
  const [repondu, setRepondu] = useState(false);

  function repondre(profil: string) {
    window.plausible?.("Profil lecteur", { props: { profil, page } });
    setRepondu(true);
  }

  return (
    <div className="rounded-2xl border border-border bg-muted/50 p-5">
      {repondu ? (
        <p className="text-sm font-medium text-foreground">Merci, c&apos;est noté.</p>
      ) : (
        <>
          <p className="text-sm font-semibold text-foreground">{question}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => repondre(p)}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-foreground transition hover:border-primary hover:text-primary focus:outline-none focus:ring-4 focus:ring-ring"
              >
                {p}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Réponse anonyme, sans cookie. Elle nous aide à écrire pour les bonnes personnes.
          </p>
        </>
      )}
    </div>
  );
}
