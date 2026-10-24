"use client";

import { useEffect } from "react";

// Compte à part les clics vers les partenaires (événement Plausible
// « Clic partenaire »), que Plausible mélange sinon aux liens sortants
// vers l'URSSAF ou impots.gouv. Un seul écouteur global : les pages
// comparateurs restent des Server Components.
export default function PartenaireClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[data-partenaire], a[data-affiliate]",
      );
      if (!a) return;
      const partenaire =
        a.dataset.partenaire || new URL(a.href, location.href).hostname.replace(/^www\./, "");
      window.plausible?.("Clic partenaire", {
        props: { partenaire, page: location.pathname },
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
