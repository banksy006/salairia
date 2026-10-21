"use client";

import { useState } from "react";
import Link from "next/link";
import { MailIcon } from "@/components/icons";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

type Etat = "idle" | "envoi" | "nouveau" | "en_attente" | "deja_confirme" | "erreur";

export default function NewsletterForm({
  categorie,
  titre,
  texte,
  page,
  compact = false,
}: {
  categorie: string;
  titre: string;
  texte: string;
  page: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<Etat>("idle");
  const [erreur, setErreur] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const site = (form.elements.namedItem("site") as HTMLInputElement | null)?.value ?? "";
    setEtat("envoi");
    setErreur("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, categorie, page, site }),
      });
      const data = (await res.json()) as { etat?: Etat; erreur?: string };
      if (!res.ok || !data.etat) {
        setErreur(data.erreur ?? "Une erreur est survenue.");
        setEtat("erreur");
        return;
      }
      setEtat(data.etat);
      if (data.etat === "nouveau") {
        window.plausible?.("Inscription newsletter", { props: { categorie } });
      }
    } catch {
      setErreur("Impossible de joindre le serveur. Vérifie ta connexion et réessaie.");
      setEtat("erreur");
    }
  }

  const fini = etat === "nouveau" || etat === "en_attente" || etat === "deja_confirme";

  return (
    <div
      className={`rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg ${
        compact ? "p-6" : "p-6 sm:p-8"
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:inline-flex">
          <MailIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold text-foreground sm:text-2xl">{titre}</p>
          <p className="mt-2 text-base text-foreground/80">{texte}</p>

          {fini ? (
            <p className="mt-5 rounded-xl border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm font-medium text-foreground">
              {etat === "deja_confirme"
                ? "Tu es déjà inscrit : rien à faire, tu recevras le mail le jour J."
                : "C'est noté ! Un mail de bienvenue vient de partir. Si tu ne le vois pas, regarde dans les spams."}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor={`nl-${categorie}`} className="sr-only">
                  Ton adresse email
                </label>
                <input
                  id={`nl-${categorie}`}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="ton@email.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 rounded-xl border-2 border-border bg-white px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring"
                />
                <input
                  type="text"
                  name="site"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <button
                  type="submit"
                  disabled={etat === "envoi"}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 disabled:opacity-60"
                >
                  {etat === "envoi" ? "Envoi…" : "Me prévenir"}
                </button>
              </div>
              {etat === "erreur" && (
                <p className="mt-3 text-sm font-medium text-destructive">{erreur}</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Un seul mail par événement, pas de publicité, désinscription en un
                clic. Ton adresse sert uniquement à t&apos;envoyer ces alertes ;{" "}
                <Link
                  href="/politique-confidentialite#newsletter"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  en savoir plus
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
