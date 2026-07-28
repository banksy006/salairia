import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Les comparatifs indépendants Salairia";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparatifs",
    title: "Comparez sans zone d'ombre",
    subtitle:
      "Sociétés de portage, banques pro, comptabilité — classées sur des critères objectifs, jamais sur la rémunération d'affiliation.",
  });
}
