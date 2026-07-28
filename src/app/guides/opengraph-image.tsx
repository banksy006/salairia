import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Les guides de rémunération Salairia";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Guides",
    title: "Comprendre avant de décider",
    subtitle:
      "Portage salarial, TJM, auto-entrepreneur, SASU vs EURL, fiche de paie — chaque chiffre relié à sa source officielle.",
  });
}
