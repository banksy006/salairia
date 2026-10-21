import { NextResponse } from "next/server";
import { desinscrire, verifier } from "@/lib/newsletter";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("t") ?? "";
  let email: string | null = null;
  try {
    email = verifier("desinscrire", token);
  } catch (e) {
    console.error("[newsletter/desinscrire]", e);
    return NextResponse.redirect(`${SITE_URL}/newsletter?erreur=technique`, 303);
  }
  if (!email) {
    return NextResponse.redirect(`${SITE_URL}/newsletter?erreur=lien`, 303);
  }
  try {
    await desinscrire(email);
  } catch (e) {
    console.error("[newsletter/desinscrire]", e);
    return NextResponse.redirect(`${SITE_URL}/newsletter?erreur=technique`, 303);
  }
  return NextResponse.redirect(`${SITE_URL}/newsletter/desinscrite`, 303);
}

export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("t") ?? "";
  try {
    const email = verifier("desinscrire", token);
    if (!email) return new NextResponse(null, { status: 400 });
    await desinscrire(email);
    return new NextResponse(null, { status: 200 });
  } catch (e) {
    console.error("[newsletter/desinscrire POST]", e);
    return new NextResponse(null, { status: 500 });
  }
}
