import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE_URL } from "@/lib/site";

// Une catégorie = une promesse datée. Le lecteur s'inscrit pour recevoir UN
// chiffre précis le jour où il devient officiel ; la catégorie sert à lui
// envoyer le bon mail en décembre, pas à segmenter du marketing.
export const CATEGORIES = {
  smic: {
    promesse: "Reçois le SMIC 2027 le jour du décret",
    quand: "mi-décembre 2026, dès la publication au Journal officiel",
    sujet: "SMIC 2027",
  },
  pass: {
    promesse: "Reçois le PASS 2027 dès la parution de l'arrêté",
    quand: "fin décembre 2026, dès l'arrêté au Journal officiel",
    sujet: "plafond de la Sécurité sociale 2027",
  },
  bareme: {
    promesse: "Reçois le barème 2027 définitif après le vote",
    quand: "fin décembre 2026, à la promulgation de la loi de finances",
    sujet: "barème de l'impôt 2027",
  },
  retraite: {
    promesse: "Reçois le montant revalorisé de ta pension en janvier",
    quand: "janvier 2027, avec les dates de virement de l'année",
    sujet: "revalorisation des retraites 2027",
  },
  general: {
    promesse: "Ce qui change pour ton argent, une fois par mois",
    quand: "une fois par mois, et le jour des grandes publications officielles",
    sujet: "actualité de la rémunération",
  },
} as const;

export type Categorie = keyof typeof CATEGORIES;

export function isCategorie(v: unknown): v is Categorie {
  return typeof v === "string" && v in CATEGORIES;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliserEmail(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const email = v.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return null;
  return email;
}

function secret(): string {
  const s = process.env.NEWSLETTER_SECRET;
  if (!s) throw new Error("NEWSLETTER_SECRET manquant");
  return s;
}

// Jetons sans état : HMAC de « action:email ». Rien à stocker, rien à
// expirer — confirmer deux fois ou se désinscrire deux fois est sans effet.
export function signer(action: "confirmer" | "desinscrire", email: string): string {
  const payload = Buffer.from(`${action}:${email}`).toString("base64url");
  const mac = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

export function verifier(action: "confirmer" | "desinscrire", token: string): string | null {
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const attendu = createHmac("sha256", secret()).update(payload).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(attendu);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const decode = Buffer.from(payload, "base64url").toString();
  const prefix = `${action}:`;
  if (!decode.startsWith(prefix)) return null;
  const email = decode.slice(prefix.length);
  return normaliserEmail(email);
}

// Supabase : la table est fermée (RLS sans policy). Seules trois fonctions
// SECURITY DEFINER sont exposées à la clé publique, appelées ici en RPC.
async function rpc<T>(fn: string, args: Record<string, string>): Promise<T> {
  // Le dashboard Supabase affiche l'URL tantôt nue, tantôt suivie de
  // /rest/v1/ : on accepte les deux pour ne pas dépendre du copier-coller.
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const key = process.env.SUPABASE_ANON_KEY?.trim();
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY manquants");
  const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${fn} : ${res.status} ${await res.text()}`);
  return (await res.json()) as T;
}

export type EtatInscription = "nouveau" | "en_attente" | "deja_confirme";

export function inscrire(email: string, categorie: Categorie, page: string) {
  return rpc<EtatInscription>("newsletter_inscrire", {
    p_email: email,
    p_categorie: categorie,
    p_page: page,
  });
}

export function confirmer(email: string) {
  return rpc<boolean>("newsletter_confirmer", { p_email: email });
}

export function desinscrire(email: string) {
  return rpc<boolean>("newsletter_desinscrire", { p_email: email });
}

// Resend, appelé en REST pour ne pas ajouter de dépendance.
export async function envoyerConfirmation(email: string, categorie: Categorie) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY manquant");
  const from = process.env.NEWSLETTER_FROM ?? "Salairia <newsletter@salairia.com>";
  const cat = CATEGORIES[categorie];
  const lien = `${SITE_URL}/api/newsletter/confirmer?t=${encodeURIComponent(signer("confirmer", email))}`;

  const texte = `Bonjour,

Tu as demandé à recevoir le ${cat.sujet} dès qu'il sera officiel (${cat.quand}).

Pour confirmer ton inscription, clique sur ce lien :
${lien}

Sans confirmation de ta part, nous ne t'écrirons pas et ton adresse sera supprimée.

Salairia — votre rémunération, sans zone d'ombre
${SITE_URL}`;

  const html = `<p>Bonjour,</p>
<p>Tu as demandé à recevoir le <strong>${cat.sujet}</strong> dès qu'il sera officiel (${cat.quand}).</p>
<p><a href="${lien}" style="display:inline-block;padding:12px 20px;background:#1E40AF;color:#FAFAF9;border-radius:12px;text-decoration:none;font-weight:600">Confirmer mon inscription</a></p>
<p style="color:#475569;font-size:13px">Sans confirmation de ta part, nous ne t'écrirons pas et ton adresse sera supprimée.<br>Si le bouton ne fonctionne pas : <a href="${lien}">${lien}</a></p>
<p style="color:#475569;font-size:13px">Salairia — votre rémunération, sans zone d'ombre · <a href="${SITE_URL}">salairia.com</a></p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: "contact@salairia.com",
      subject: `Confirme ton inscription : ${cat.sujet}`,
      text: texte,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend : ${res.status} ${await res.text()}`);
}
