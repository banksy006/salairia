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
    lien: "/simulateurs/salaire-brut-net",
    lienLabel: "Calculer un salaire brut en net",
  },
  pass: {
    promesse: "Reçois le PASS 2027 dès la parution de l'arrêté",
    quand: "fin décembre 2026, dès l'arrêté au Journal officiel",
    sujet: "plafond de la Sécurité sociale 2027",
    lien: "/guides/plafond-securite-sociale-2027",
    lienLabel: "Revoir à quoi sert le plafond",
  },
  bareme: {
    promesse: "Reçois le barème 2027 définitif après le vote",
    quand: "fin décembre 2026, à la promulgation de la loi de finances",
    sujet: "barème de l'impôt 2027",
    lien: "/simulateurs/net-apres-impot",
    lienLabel: "Estimer ton net après impôt",
  },
  retraite: {
    promesse: "Reçois le montant revalorisé de ta pension en janvier",
    quand: "janvier 2027, avec les dates de virement de l'année",
    sujet: "revalorisation des retraites 2027",
    lien: "/guides/calendrier-paiement-retraite-2027",
    lienLabel: "Voir les dates de virement 2027",
  },
  general: {
    promesse: "Ce qui change pour ton argent, une fois par mois",
    quand: "une fois par mois, et le jour des grandes publications officielles",
    sujet: "actualité de la rémunération",
    lien: "/guides/ce-qui-change-1er-janvier-2027",
    lienLabel: "Ce qui change au 1er janvier 2027",
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
// Pas de double opt-in : le mail de bienvenue part tout de suite, pour que
// les adresses mal tapées rebondissent une par une à l'inscription plutôt
// qu'en masse le jour du premier envoi (le compte Resend est partagé).
export function lienDesinscription(email: string): string {
  return `${SITE_URL}/api/newsletter/desinscrire?t=${encodeURIComponent(signer("desinscrire", email))}`;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function envoyerBienvenue(email: string, categorie: Categorie) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY manquant");
  const from = process.env.NEWSLETTER_FROM ?? "Salairia <newsletter@salairia.com>";
  const cat = CATEGORIES[categorie];
  const desinscription = lienDesinscription(email);
  const lien = `${SITE_URL}${cat.lien}`;
  const general = categorie === "general";

  const texte = `C'est noté !

${general
    ? "Tu recevras un récapitulatif une fois par mois, et un mail le jour où un chiffre important devient officiel."
    : `Tu recevras le ${cat.sujet} dès qu'il sera officiel : ${cat.quand}.`}

Ce que contiendra le mail : le montant officiel, ce qu'il change concrètement, et le lien vers la source au Journal officiel. Rien d'autre : pas de publicité, pas de relance.

En attendant : ${cat.lienLabel} → ${lien}

Salairia — Votre rémunération, sans zone d'ombre
${SITE_URL}

Tu reçois ce mail parce que tu t'es inscrit sur salairia.com. Te désinscrire : ${desinscription}`;

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Bienvenue sur Salairia</title></head>
<body style="margin:0;padding:0;background:#F1F5F9;">
<div style="display:none;max-height:0;overflow:hidden;">${esc(general ? "Les chiffres officiels de ta rémunération, le jour J." : `Le ${cat.sujet}, dès qu'il sera officiel.`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F1F5F9;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;font-family:Inter,Arial,Helvetica,sans-serif;color:#0F172A;">
  <tr><td style="padding:0 4px 20px;">
    <a href="${SITE_URL}" style="text-decoration:none;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle" style="padding-right:10px;"><img src="${SITE_URL}/email/salairia-logo.png?v=2" width="32" height="32" alt="" style="display:block;border:0;width:32px;height:32px;"></td>
        <td valign="middle" style="font-size:20px;line-height:24px;font-weight:700;color:#1E40AF;">Salairia</td>
      </tr></table>
    </a>
  </td></tr>
  <tr><td style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="height:6px;background:#1E40AF;font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:32px 32px 8px;">
        <p style="margin:0 0 8px;font-size:12px;line-height:16px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#059669;">Inscription confirmée</p>
        <h1 style="margin:0 0 16px;font-size:26px;line-height:32px;font-weight:700;color:#0F172A;">C'est noté&nbsp;!</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#334155;">${esc(general
          ? "Tu recevras un récapitulatif une fois par mois, et un mail le jour où un chiffre important pour ta rémunération devient officiel."
          : `Tu recevras le ${cat.sujet} dès qu'il sera officiel. C'est tout ce que tu as demandé, et c'est tout ce qu'on t'enverra.`)}</p>
      </td></tr>
      <tr><td style="padding:0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EFF6FF;border-left:4px solid #1E40AF;border-radius:0 12px 12px 0;">
          <tr><td style="padding:16px 20px;">
            <p style="margin:0 0 4px;font-size:12px;line-height:16px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#1E40AF;">Prochain envoi</p>
            <p style="margin:0;font-size:16px;line-height:24px;font-weight:600;color:#0F172A;">${esc(cat.quand.charAt(0).toUpperCase() + cat.quand.slice(1))}</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:24px 32px 8px;">
        <p style="margin:0 0 12px;font-size:16px;line-height:24px;font-weight:600;color:#0F172A;">Ce que contiendra le mail</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:15px;line-height:22px;color:#334155;">
          <tr><td valign="top" style="padding:0 10px 8px 0;color:#059669;font-weight:700;">✓</td><td style="padding:0 0 8px;">le montant officiel, en brut et en net quand c'est utile&nbsp;;</td></tr>
          <tr><td valign="top" style="padding:0 10px 8px 0;color:#059669;font-weight:700;">✓</td><td style="padding:0 0 8px;">ce qu'il change concrètement pour toi&nbsp;;</td></tr>
          <tr><td valign="top" style="padding:0 10px 8px 0;color:#059669;font-weight:700;">✓</td><td style="padding:0 0 8px;">le lien vers la source au Journal officiel.</td></tr>
        </table>
        <p style="margin:8px 0 0;font-size:14px;line-height:20px;color:#475569;">Pas de publicité, pas de relance, pas de revente de ton adresse.</p>
      </td></tr>
      <tr><td style="padding:24px 32px 32px;">
        <p style="margin:0 0 12px;font-size:14px;line-height:20px;color:#475569;">En attendant&nbsp;:</p>
        <a href="${lien}" style="display:inline-block;padding:14px 22px;background:#059669;color:#FFFFFF;border-radius:12px;font-size:15px;line-height:20px;font-weight:600;text-decoration:none;">${esc(cat.lienLabel)} →</a>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 8px 0;font-size:12px;line-height:18px;color:#64748B;text-align:center;">
    <p style="margin:0 0 6px;"><strong style="color:#1E40AF;">Salairia</strong> · Votre rémunération, sans zone d'ombre · <a href="${SITE_URL}" style="color:#1E40AF;text-decoration:none;">salairia.com</a></p>
    <p style="margin:0;">Tu reçois ce mail parce que tu t'es inscrit sur salairia.com. <a href="${desinscription}" style="color:#64748B;text-decoration:underline;">Te désinscrire</a> en un clic.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: "contact@salairia.com",
      subject: general ? "Bienvenue : les chiffres officiels, le jour J" : `C'est noté : le ${cat.sujet} dès sa publication`,
      text: texte,
      html,
      headers: {
        "List-Unsubscribe": `<${desinscription}>, <mailto:contact@salairia.com?subject=desinscription>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });
  if (!res.ok) throw new Error(`Resend : ${res.status} ${await res.text()}`);
}
