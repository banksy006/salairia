import { NextResponse } from "next/server";
import {
  confirmer,
  envoyerBienvenue,
  inscrire,
  isCategorie,
  normaliserEmail,
} from "@/lib/newsletter";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  // Champ invisible pour les humains : un robot qui le remplit reçoit un
  // succès factice et rien n'est enregistré.
  if (typeof body.site === "string" && body.site.length > 0) {
    return NextResponse.json({ etat: "nouveau" });
  }

  const email = normaliserEmail(body.email);
  if (!email) {
    return NextResponse.json({ erreur: "Cette adresse email ne semble pas valide." }, { status: 400 });
  }
  const categorie = isCategorie(body.categorie) ? body.categorie : "general";
  const page = typeof body.page === "string" ? body.page.slice(0, 200) : "";

  try {
    const etat = await inscrire(email, categorie, page);
    if (etat !== "deja_confirme") {
      // Simple opt-in : le formulaire et sa mention valent consentement.
      await confirmer(email);
      await envoyerBienvenue(email, categorie);
    }
    return NextResponse.json({ etat });
  } catch (e) {
    console.error("[newsletter]", e);
    return NextResponse.json(
      { erreur: "Impossible d'enregistrer ton inscription pour le moment. Réessaie dans quelques minutes." },
      { status: 502 },
    );
  }
}
