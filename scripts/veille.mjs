#!/usr/bin/env node
// Veille réglementaire : repère ce qui a bougé depuis la dernière exécution
// sur les sujets des pages « chiffre daté » (SMIC, PASS, barème, retraites…).
//
//   node scripts/veille.mjs               nouveautés depuis la dernière fois
//   node scripts/veille.mjs --tout        ignore l'historique (tout réafficher)
//   node scripts/veille.mjs --sans-serper flux officiels uniquement, 0 crédit
//
// Deux sources : les flux RSS officiels (gratuits) et la recherche d'actualités
// serper.dev (un crédit par sujet, clé SERPER_API_KEY dans .env.local).
// La liste des sujets et les pages à relire sont dans docs/veille/sujets.json.
// L'historique des liens déjà vus est local (.veille/, non commité).
//
// Le script DÉTECTE, il ne prouve rien : un titre de presse n'est pas une
// source. Avant de modifier une page, vérifier le texte officiel
// (docs/GUARDRAILS.md).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const args = new Set(process.argv.slice(2));
const config = JSON.parse(readFileSync("docs/veille/sujets.json", "utf8"));

function lireEnv() {
  if (!existsSync(".env.local")) return {};
  const env = {};
  for (const ligne of readFileSync(".env.local", "utf8").split("\n")) {
    const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}
const cle = args.has("--sans-serper") ? null : (process.env.SERPER_API_KEY ?? lireEnv().SERPER_API_KEY ?? null);

mkdirSync(".veille", { recursive: true });
const fichierVus = ".veille/vus.json";
const vus = new Set(!args.has("--tout") && existsSync(fichierVus) ? JSON.parse(readFileSync(fichierVus, "utf8")) : []);

// Un article ne remonte que s'il parle d'un changement : texte publié,
// montant, date d'effet. Les articles de fond et les marronniers sont écartés.
const SIGNAL = /d[ée]cret|arr[êe]t[ée]|journal officiel|revaloris|hausse|augment|baisse|gel[ée ]|officiel|annonc|au 1er|à compter du|entre en vigueur|vot[ée]|adopt[ée]|promulgu|liquidation|redressement|nouveau montant|nouveaux montants|passe à|passera à/i;
const sansAccent = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const contient = (texte, mots) => mots.some((m) => sansAccent(texte).includes(sansAccent(m)));
const decoder = (s) =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&rsquo;|&#8217;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

async function actualites(sujet) {
  const res = await fetch("https://google.serper.dev/news", {
    method: "POST",
    headers: { "X-API-KEY": cle, "Content-Type": "application/json" },
    // qdr:d3 = trois derniers jours : couvre un week-end sans exécution.
    body: JSON.stringify({ q: sujet.requete, gl: "fr", hl: "fr", num: 20, tbs: "qdr:d3" }),
  });
  if (!res.ok) throw new Error(`Serper ${res.status}`);
  const json = await res.json();
  return (json.news ?? []).map((n) => ({ titre: n.title ?? "", extrait: n.snippet ?? "", lien: n.link, source: n.source ?? "", date: n.date ?? "" }));
}

async function flux(f) {
  const res = await fetch(f.url, { headers: { "User-Agent": "Mozilla/5.0 (veille Salairia)" }, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const champ = (bloc, nom) => decoder(bloc.match(new RegExp(`<${nom}[^>]*>([\\s\\S]*?)</${nom}>`))?.[1] ?? "");
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, bloc]) => ({
    titre: champ(bloc, "title"),
    extrait: champ(bloc, "description").slice(0, 300),
    lien: champ(bloc, "link"),
    source: f.nom,
    date: champ(bloc, "pubDate").slice(0, 16),
  }));
}

const trouvailles = new Map(config.sujets.map((s) => [s.id, []]));
const erreurs = [];
const ajouter = (sujet, item, officiel) => {
  if (!item.lien || vus.has(item.lien)) return;
  const texte = `${item.titre} ${item.extrait}`;
  if (!contient(texte, sujet.motsCles)) return;
  // Les flux officiels publient aussi des pages de fond mises à jour : même filtre.
  if (!SIGNAL.test(texte)) return;
  const liste = trouvailles.get(sujet.id);
  if (!liste.some((x) => x.lien === item.lien)) liste.push({ ...item, officiel });
};

for (const f of config.fluxOfficiels) {
  try {
    const items = await flux(f);
    for (const item of items) for (const sujet of config.sujets) ajouter(sujet, item, true);
  } catch (e) {
    erreurs.push(`Flux ${f.nom} : ${e.message}`);
  }
}

if (cle) {
  for (const sujet of config.sujets) {
    try {
      for (const item of await actualites(sujet)) ajouter(sujet, item, false);
    } catch (e) {
      erreurs.push(`Actualités « ${sujet.libelle} » : ${e.message}`);
    }
  }
} else {
  erreurs.push("Pas de clé SERPER_API_KEY : recherche d'actualités ignorée, flux officiels seulement.");
}

const jour = new Date().toISOString().slice(0, 10);
const lignes = [`# Veille du ${jour}`, ""];
let total = 0;
for (const sujet of config.sujets) {
  const liste = trouvailles.get(sujet.id);
  if (liste.length === 0) continue;
  total += liste.length;
  // Plusieurs médias sur le même sujet le même jour = signal fort.
  const fort = liste.length >= 4 || liste.some((x) => x.officiel);
  lignes.push(`## ${sujet.libelle} — ${liste.length} nouveauté${liste.length > 1 ? "s" : ""}${fort ? " — SIGNAL FORT" : ""}`, "");
  for (const x of liste.sort((a, b) => Number(b.officiel) - Number(a.officiel)).slice(0, 8)) {
    lignes.push(`- ${x.officiel ? "[OFFICIEL] " : ""}${x.titre} (${x.source}${x.date ? `, ${x.date}` : ""})`, `  ${x.lien}`);
  }
  if (liste.length > 8) lignes.push(`- … et ${liste.length - 8} autres`);
  lignes.push("", `Pages à relire : ${sujet.pages.join(" · ")}`, "");
}
if (total === 0) lignes.push("Rien de nouveau sur les sujets surveillés.", "");
if (erreurs.length) lignes.push("## Incidents", "", ...erreurs.map((e) => `- ${e}`), "");

const rapport = lignes.join("\n");
writeFileSync(`.veille/rapport-${jour}.md`, rapport);
for (const liste of trouvailles.values()) for (const x of liste) vus.add(x.lien);
// On garde les 5 000 liens les plus récents : assez pour ne rien resignaler.
writeFileSync(fichierVus, JSON.stringify([...vus].slice(-5000)));
console.log(rapport);
