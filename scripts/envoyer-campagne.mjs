#!/usr/bin/env node
// Aperçu, test et envoi d'une campagne newsletter via /api/newsletter/envoyer.
//
//   node scripts/envoyer-campagne.mjs <campagne> --apercu
//   node scripts/envoyer-campagne.mjs <campagne> --test moi@exemple.fr
//   node scripts/envoyer-campagne.mjs <campagne> --liste abonnes.csv            (à blanc)
//   node scripts/envoyer-campagne.mjs <campagne> --liste abonnes.csv --envoyer  (envoi réel)
//
// Le jeton NEWSLETTER_ADMIN_TOKEN est lu dans .env.local (jamais commité).
// La liste est un export CSV de la table `abonnes` : toute adresse trouvée
// dans le fichier est retenue, une seule fois. Les adresses déjà servies sont
// consignées dans .newsletter/<campagne>.json : relancer le script n'envoie
// jamais deux fois le même mail à la même personne.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const campagne = args[0];
const option = (nom) => {
  const i = args.indexOf(nom);
  return i === -1 ? null : (args[i + 1] ?? "");
};
const drapeau = (nom) => args.includes(nom);

if (!campagne || campagne.startsWith("--")) {
  console.error("Usage : node scripts/envoyer-campagne.mjs <campagne> --apercu | --test <email> | --liste <csv> [--envoyer]");
  process.exit(1);
}

function lireEnv() {
  const chemin = resolve(".env.local");
  if (!existsSync(chemin)) return {};
  const env = {};
  for (const ligne of readFileSync(chemin, "utf8").split("\n")) {
    const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

const env = { ...lireEnv(), ...process.env };
const jeton = env.NEWSLETTER_ADMIN_TOKEN;
if (!jeton) {
  console.error("NEWSLETTER_ADMIN_TOKEN introuvable dans .env.local.");
  process.exit(1);
}
const base = drapeau("--local") ? "http://localhost:3000" : "https://salairia.com";
const url = `${base}/api/newsletter/envoyer`;
const entetes = { Authorization: `Bearer ${jeton}`, "Content-Type": "application/json" };

async function poster(destinataires, reel) {
  const res = await fetch(url, { method: "POST", headers: entetes, body: JSON.stringify({ campagne, destinataires, reel }) });
  if (res.status === 404) throw new Error("404 : jeton refusé, ou route pas encore déployée.");
  const json = await res.json();
  if (!res.ok) throw new Error(json.erreur ?? `HTTP ${res.status}`);
  return json;
}

if (drapeau("--apercu")) {
  const res = await fetch(`${url}?campagne=${encodeURIComponent(campagne)}`, { headers: entetes });
  if (!res.ok) {
    console.error(`Aperçu impossible : HTTP ${res.status}`);
    process.exit(1);
  }
  mkdirSync(".newsletter", { recursive: true });
  const fichier = `.newsletter/${campagne}.html`;
  writeFileSync(fichier, await res.text());
  console.log(`Objet : ${decodeURIComponent(res.headers.get("x-sujet") ?? "")}`);
  console.log(`Aperçu écrit dans ${fichier}`);
  process.exit(0);
}

const test = option("--test");
if (test) {
  const r = await poster([test], false);
  console.log(r.envoyes.length ? `Mail de test envoyé à ${r.envoyes[0]} (objet préfixé [TEST]).` : `Échec : ${r.echecs[0]?.erreur}`);
  process.exit(r.envoyes.length ? 0 : 1);
}

const liste = option("--liste");
if (!liste) {
  console.error("Indique --apercu, --test <email> ou --liste <csv>.");
  process.exit(1);
}

const trouves = readFileSync(liste, "utf8").match(/[^\s,;"'<>]+@[^\s,;"'<>]+\.[^\s,;"'<>]{2,}/g) ?? [];
const adresses = [...new Set(trouves.map((e) => e.toLowerCase()))];
mkdirSync(".newsletter", { recursive: true });
const journal = `.newsletter/${campagne}.json`;
const dejaServis = new Set(existsSync(journal) ? JSON.parse(readFileSync(journal, "utf8")) : []);
const aEnvoyer = adresses.filter((e) => !dejaServis.has(e));

console.log(`${adresses.length} adresses dans ${liste}, ${dejaServis.size} déjà servies, ${aEnvoyer.length} à envoyer.`);
if (!drapeau("--envoyer")) {
  console.log("Passage à blanc : rien n'est parti. Ajoute --envoyer pour l'envoi réel.");
  process.exit(0);
}

const LOT = 20;
let echecs = [];
for (let i = 0; i < aEnvoyer.length; i += LOT) {
  const lot = aEnvoyer.slice(i, i + LOT);
  const r = await poster(lot, true);
  for (const e of r.envoyes) dejaServis.add(e);
  writeFileSync(journal, JSON.stringify([...dejaServis], null, 1));
  echecs = echecs.concat(r.echecs);
  console.log(`Lot ${i / LOT + 1} : ${r.envoyes.length} envoyés, ${r.echecs.length} échecs.`);
}
console.log(`Terminé : ${dejaServis.size} servis au total, ${echecs.length} échecs.`);
for (const e of echecs) console.log(`  échec ${e.email} : ${e.erreur}`);
