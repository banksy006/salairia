import type { Metadata } from "next";
import TjmMetierGuide, { tjmMetierChiffres } from "@/components/guides/TjmMetierGuide";
import { getTjmMetier } from "@/data/tjm-metiers";

const m = getTjmMetier("tjm-data-scientist")!;
const { tjmEgal } = tjmMetierChiffres(m);
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export const metadata: Metadata = {
  title: `TJM ${m.nom} freelance 2026 : combien facturer`,
  description: `TJM ${m.nom} en 2026 : ${EUR.format(m.marche.junior)} à ${EUR.format(m.marche.senior)} par jour selon les baromètres, ${EUR.format(tjmEgal)} pour égaler un salaire de confirmé, et le net calculé en micro, portage, SASU ou EURL.`,
  alternates: { canonical: `/guides/${m.slug}` },
  openGraph: {
    title: `TJM ${m.nomTitre} freelance en 2026`,
    description: `Le TJM du marché, le tarif qui égale le salaire, et le net selon le statut.`,
    url: `/guides/${m.slug}`,
  },
};

export default function Page() {
  return <TjmMetierGuide m={m} />;
}
