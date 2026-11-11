import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { envoyerMail, normaliserEmail } from "@/lib/newsletter";
import { CAMPAGNES, isCampagne } from "@/lib/newsletter-campagnes";

export const runtime = "nodejs";
export const maxDuration = 60;

// Route d'administration : aperçu et envoi d'une campagne. Fermée (404) tant
// que NEWSLETTER_ADMIN_TOKEN n'est pas défini ou que le jeton ne correspond
// pas. La liste des destinataires est fournie par l'appelant (export de la
// table `abonnes`) : la clé publique Supabase ne peut pas lire la table, et
// c'est voulu.
const MAX_TEST = 3;
const MAX_REEL = 40;
// Resend limite à 2 requêtes par seconde.
const PAUSE_MS = 600;

function autorise(req: Request): boolean {
  const attendu = process.env.NEWSLETTER_ADMIN_TOKEN;
  if (!attendu) return false;
  const recu = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const a = Buffer.from(recu);
  const b = Buffer.from(attendu);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!autorise(req)) return new NextResponse(null, { status: 404 });
  const campagne = new URL(req.url).searchParams.get("campagne");
  if (!isCampagne(campagne)) return NextResponse.json({ erreur: "Campagne inconnue." }, { status: 400 });
  const mail = CAMPAGNES[campagne].construire("apercu@salairia.com");
  return new NextResponse(mail.html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Sujet": encodeURIComponent(mail.sujet) },
  });
}

export async function POST(req: Request) {
  if (!autorise(req)) return new NextResponse(null, { status: 404 });
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }
  if (!isCampagne(body.campagne)) return NextResponse.json({ erreur: "Campagne inconnue." }, { status: 400 });
  const reel = body.reel === true;
  const brut = Array.isArray(body.destinataires) ? body.destinataires : [];
  const destinataires = [...new Set(brut.map(normaliserEmail).filter((e): e is string => e !== null))];
  const max = reel ? MAX_REEL : MAX_TEST;
  if (destinataires.length === 0 || destinataires.length > max) {
    return NextResponse.json({ erreur: `Entre 1 et ${max} destinataires par appel.` }, { status: 400 });
  }

  const { construire } = CAMPAGNES[body.campagne];
  const envoyes: string[] = [];
  const echecs: { email: string; erreur: string }[] = [];
  for (const [i, email] of destinataires.entries()) {
    if (i > 0) await new Promise((r) => setTimeout(r, PAUSE_MS));
    try {
      const mail = construire(email);
      await envoyerMail({ email, ...mail, sujet: reel ? mail.sujet : `[TEST] ${mail.sujet}` });
      envoyes.push(email);
    } catch (e) {
      console.error("[newsletter/envoyer]", email, e);
      echecs.push({ email, erreur: e instanceof Error ? e.message : "erreur inconnue" });
    }
  }
  return NextResponse.json({ campagne: body.campagne, reel, envoyes, echecs });
}
