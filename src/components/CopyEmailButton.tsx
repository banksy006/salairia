"use client";

import { useState } from "react";

// Un lien mailto: ne fait rien quand aucun client mail n'est configuré dans
// le navigateur — cas fréquent sur Mac et sur les postes pro. Ce bouton
// garantit un chemin qui marche partout.
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copie l'adresse :", email);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-live="polite"
    >
      {copied ? "Adresse copiée ✓" : "Copier l'adresse"}
    </button>
  );
}
