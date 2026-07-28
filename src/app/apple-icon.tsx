import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Les écrans d'accueil iOS n'acceptent pas de SVG : cette icône est générée en
// PNG à partir du même motif que src/app/icon.svg pour rester cohérente.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 14,
          background: "#1E40AF",
          paddingBottom: 56,
        }}
      >
        <div style={{ width: 22, height: 44, borderRadius: 11, background: "rgba(255,255,255,0.55)" }} />
        <div style={{ width: 22, height: 66, borderRadius: 11, background: "rgba(255,255,255,0.8)" }} />
        <div style={{ width: 22, height: 94, borderRadius: 11, background: "#6EE7B7" }} />
      </div>
    ),
    size,
  );
}
