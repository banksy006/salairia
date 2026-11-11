import "server-only";
import { SITE_URL } from "@/lib/site";
import { esc, lienDesinscription } from "@/lib/newsletter";
import { SMIC_DEC_2026, smicEnVigueur, smicDecembre2026, gainSmicDecembre } from "@/lib/smic-annonce";

// Une campagne = un mail daté, écrit une fois, envoyé à une catégorie
// d'abonnés par POST /api/newsletter/envoyer. Les chiffres viennent des mêmes
// modules que les pages : le mail ne peut pas contredire le site.

export interface Mail {
  sujet: string;
  texte: string;
  html: string;
}

const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const EUR2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
// Certains clients mail affichent mal l'espace fine insécable d'Intl : on la
// remplace par une espace insécable simple.
const propre = (s: string) => s.replace(/ /g, " ");
const e0 = (n: number) => propre(EUR.format(n));
const e2 = (n: number) => propre(EUR2.format(n));

function coque(o: { titre: string; apercu: string; surtitre: string; h1: string; corps: string; email: string }): string {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(o.titre)}</title></head>
<body style="margin:0;padding:0;background:#F1F5F9;">
<div style="display:none;max-height:0;overflow:hidden;">${esc(o.apercu)}</div>
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
        <p style="margin:0 0 8px;font-size:12px;line-height:16px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#059669;">${esc(o.surtitre)}</p>
        <h1 style="margin:0 0 16px;font-size:26px;line-height:32px;font-weight:700;color:#0F172A;">${esc(o.h1)}</h1>
      </td></tr>
      ${o.corps}
    </table>
  </td></tr>
  <tr><td style="padding:20px 8px 0;font-size:12px;line-height:18px;color:#64748B;text-align:center;">
    <p style="margin:0 0 6px;"><strong style="color:#1E40AF;">Salairia</strong> · Votre rémunération, sans zone d'ombre · <a href="${SITE_URL}" style="color:#1E40AF;text-decoration:none;">salairia.com</a></p>
    <p style="margin:0;">Tu reçois ce mail parce que tu t'es inscrit sur salairia.com pour recevoir le SMIC. <a href="${lienDesinscription(o.email)}" style="color:#64748B;text-decoration:underline;">Te désinscrire</a> en un clic.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function smicDecembre2026Annonce(email: string): Mail {
  const avant = smicEnVigueur;
  const apres = smicDecembre2026;
  const gain = gainSmicDecembre;
  const hausse = (SMIC_DEC_2026.HAUSSE * 100).toLocaleString("fr-FR", { minimumFractionDigits: 1 });
  const page = `${SITE_URL}/guides/smic-2027`;
  const simulateur = `${SITE_URL}/simulateurs/salaire-brut-net`;

  const ligne = (l: string, a: string, b: string, dernier = false) => {
    const bord = dernier ? "" : "border-bottom:1px solid #E2E8F0;";
    return `<tr>
      <td style="padding:12px 16px;font-size:14px;line-height:20px;color:#334155;${bord}">${l}</td>
      <td align="right" style="padding:12px 16px;font-size:14px;line-height:20px;color:#64748B;white-space:nowrap;${bord}">${a}</td>
      <td align="right" style="padding:12px 16px;font-size:15px;line-height:20px;font-weight:700;color:#0F172A;white-space:nowrap;${bord}">${b}</td>
    </tr>`;
  };
  const entete = "padding:10px 16px;font-size:11px;line-height:16px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#64748B;background:#F1F5F9;";
  const puce = (titre: string, texte: string) =>
    `<tr><td valign="top" style="padding:0 10px 10px 0;color:#059669;font-weight:700;">✓</td><td style="padding:0 0 10px;"><strong>${titre}</strong> ${texte}</td></tr>`;

  const corps = `
      <tr><td style="padding:0 32px 8px;">
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#334155;">Tu t'étais inscrit pour recevoir le SMIC 2027. Il arrive un mois plus tôt que prévu&nbsp;: le ministre du Travail a annoncé le 9&nbsp;novembre une hausse de <strong>${hausse}&nbsp;% dès le 1er&nbsp;décembre 2026</strong>, en avance sur la revalorisation de janvier.</p>
      </td></tr>
      <tr><td style="padding:0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1E40AF;border-radius:12px;">
          <tr><td style="padding:22px 24px;">
            <p style="margin:0 0 6px;font-size:12px;line-height:16px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#BFDBFE;">SMIC net mensuel au 1er décembre 2026</p>
            <p style="margin:0;font-size:36px;line-height:42px;font-weight:700;color:#FFFFFF;">≈&nbsp;${e0(apres.net)}</p>
            <p style="margin:6px 0 0;font-size:14px;line-height:20px;color:#DBEAFE;">soit environ ${e0(gain.netMensuel)} nets de plus par mois à temps plein</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:20px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E2E8F0;border-radius:12px;">
          <tr>
            <td style="${entete}border-radius:12px 0 0 0;">Temps plein, 35 h</td>
            <td align="right" style="${entete}">Aujourd'hui</td>
            <td align="right" style="${entete}border-radius:0 12px 0 0;">1er déc.</td>
          </tr>
          ${ligne("Brut de l'heure", e2(avant.horaire), e2(apres.horaire))}
          ${ligne("Brut par mois", e2(avant.mensuel), e2(apres.mensuel))}
          ${ligne("Net par mois, avant impôt", e2(avant.net), `≈&nbsp;${e0(apres.net)}`, true)}
        </table>
      </td></tr>
      <tr><td style="padding:20px 32px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFFBEB;border-left:4px solid #F59E0B;border-radius:0 12px 12px 0;">
          <tr><td style="padding:14px 18px;">
            <p style="margin:0;font-size:14px;line-height:21px;color:#78350F;"><strong>À savoir&nbsp;:</strong> le décret n'est pas encore paru au Journal officiel. Seuls le taux de ${hausse}&nbsp;% et la date sont annoncés&nbsp;; les montants ci-dessus sont calculés par Salairia à partir de ce taux. Le taux horaire officiel sera celui du décret.</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:24px 32px 8px;">
        <p style="margin:0 0 12px;font-size:16px;line-height:24px;font-weight:600;color:#0F172A;">Ce que ça change pour toi</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:15px;line-height:22px;color:#334155;">
          ${puce("Sur le bulletin de décembre.", "Le nouveau taux vaut pour les heures travaillées à partir du 1er&nbsp;décembre. Rien à demander, l'employeur doit l'appliquer.")}
          ${puce("À temps partiel ou en apprentissage.", `Le gain suit tes heures (${e2(gain.horaire)} bruts de plus par heure) ou ton pourcentage du SMIC.`)}
          ${puce("Au 1er janvier 2027.", "Pas de seconde hausse attendue&nbsp;: celle de décembre remplace celle de janvier, sauf si le minimum légal calculé fin novembre dépasse ce niveau.")}
        </table>
      </td></tr>
      <tr><td style="padding:16px 32px 8px;">
        <a href="${page}" style="display:inline-block;padding:14px 22px;background:#059669;color:#FFFFFF;border-radius:12px;font-size:15px;line-height:20px;font-weight:600;text-decoration:none;">Lire le détail et les sources →</a>
      </td></tr>
      <tr><td style="padding:8px 32px 32px;">
        <p style="margin:0 0 8px;font-size:14px;line-height:21px;color:#475569;">Ton salaire n'est pas au SMIC&nbsp;? <a href="${simulateur}" style="color:#1E40AF;">Calcule ton net à partir de ton brut</a>.</p>
        <p style="margin:0;font-size:14px;line-height:21px;color:#475569;">Tu recevras un second et dernier mail le jour où le décret sera publié, avec le montant officiel au centime et le lien vers le Journal officiel.</p>
      </td></tr>`;

  const texte = `SMIC : +${hausse} % dès le 1er décembre 2026

Tu t'étais inscrit pour recevoir le SMIC 2027. Il arrive un mois plus tôt que prévu : le ministre du Travail a annoncé le 9 novembre une hausse de ${hausse} % dès le 1er décembre 2026, en avance sur la revalorisation de janvier.

Temps plein, 35 heures :
- Brut de l'heure : ${e2(avant.horaire)} aujourd'hui, ${e2(apres.horaire)} au 1er décembre
- Brut par mois : ${e2(avant.mensuel)} aujourd'hui, ${e2(apres.mensuel)} au 1er décembre
- Net par mois avant impôt : ${e2(avant.net)} aujourd'hui, environ ${e0(apres.net)} au 1er décembre (environ ${e0(gain.netMensuel)} de plus)

À savoir : le décret n'est pas encore paru au Journal officiel. Seuls le taux de ${hausse} % et la date sont annoncés ; les montants ci-dessus sont calculés par Salairia à partir de ce taux. Le taux horaire officiel sera celui du décret.

Ce que ça change pour toi :
- Sur le bulletin de décembre : le nouveau taux vaut pour les heures travaillées à partir du 1er décembre. Rien à demander, l'employeur doit l'appliquer.
- À temps partiel ou en apprentissage : le gain suit tes heures (${e2(gain.horaire)} bruts de plus par heure) ou ton pourcentage du SMIC.
- Au 1er janvier 2027 : pas de seconde hausse attendue, sauf si le minimum légal calculé fin novembre dépasse ce niveau.

Le détail et les sources : ${page}
Calculer ton net à partir de ton brut : ${simulateur}

Tu recevras un second et dernier mail le jour où le décret sera publié, avec le montant officiel au centime.

Salairia — Votre rémunération, sans zone d'ombre
${SITE_URL}

Tu reçois ce mail parce que tu t'es inscrit sur salairia.com pour recevoir le SMIC. Te désinscrire : ${lienDesinscription(email)}`;

  return {
    sujet: `SMIC : +${hausse} % dès le 1er décembre, environ ${e0(apres.net)} nets`,
    texte: propre(texte),
    html: coque({
      titre: "SMIC : la hausse du 1er décembre 2026",
      apercu: `De ${e2(avant.horaire)} à ${e2(apres.horaire)} de l'heure. Le décret reste à paraître : ce qui est sûr, ce qui est calculé.`,
      surtitre: "Annoncé le 9 novembre 2026",
      h1: `Le SMIC augmente de ${hausse} % dès le 1er décembre`,
      corps,
      email,
    }),
  };
}

export const CAMPAGNES = {
  "smic-decembre-2026-annonce": { categorie: "smic", construire: smicDecembre2026Annonce },
} as const;

export type Campagne = keyof typeof CAMPAGNES;

export function isCampagne(v: unknown): v is Campagne {
  return typeof v === "string" && v in CAMPAGNES;
}
