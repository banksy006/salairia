import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "Salairia — simulateurs, comparatifs et guides de rémunération en France";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "À jour août 2026",
    title: "Sachez ce que vous touchez vraiment",
    subtitle:
      "9 simulateurs gratuits, comparatifs indépendants et guides sourcés — salariés, freelances, auto-entrepreneurs, dirigeants.",
  });
}
