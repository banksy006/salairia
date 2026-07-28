import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Les simulateurs de rémunération Salairia";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Simulateurs",
    title: "Calculez votre rémunération réelle",
    subtitle:
      "Portage, TJM freelance, auto-entrepreneur, SASU/EURL, brut/net — avec les taux 2026 vérifiés.",
  });
}
