import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Satori (le moteur derrière ImageResponse) exige display:flex sur tout élément
// ayant plusieurs enfants — d'où les flex explicites partout ci-dessous.
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1E40AF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              background: "rgba(255,255,255,0.12)",
              borderRadius: 16,
              padding: "18px 20px",
            }}
          >
            <div style={{ width: 14, height: 26, borderRadius: 7, background: "rgba(255,255,255,0.55)" }} />
            <div style={{ width: 14, height: 40, borderRadius: 7, background: "rgba(255,255,255,0.8)" }} />
            <div style={{ width: 14, height: 56, borderRadius: 7, background: "#6EE7B7" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#FFFFFF", letterSpacing: -1 }}>
              Salairia
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
              Votre rémunération, sans zone d&apos;ombre
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: "#6EE7B7",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              marginTop: 22,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: 24,
            fontSize: 22,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <div style={{ display: "flex" }}>salairia.com</div>
          <div style={{ display: "flex" }}>Sources URSSAF · BOSS · INSEE · Legifrance</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
