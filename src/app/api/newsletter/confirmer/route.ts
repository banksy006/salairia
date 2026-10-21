import { NextResponse } from "next/server";
import { confirmer, verifier } from "@/lib/newsletter";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("t") ?? "";
  let email: string | null = null;
  try {
    email = verifier("confirmer", token);
  } catch (e) {
    console.error("[newsletter/confirmer]", e);
    return NextResponse.redirect(`${SITE_URL}/newsletter?erreur=technique`, 303);
  }
  if (!email) {
    return NextResponse.redirect(`${SITE_URL}/newsletter?erreur=lien`, 303);
  }
  try {
    await confirmer(email);
  } catch (e) {
    console.error("[newsletter/confirmer]", e);
    return NextResponse.redirect(`${SITE_URL}/newsletter?erreur=technique`, 303);
  }
  return NextResponse.redirect(`${SITE_URL}/newsletter/confirmee`, 303);
}
