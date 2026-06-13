import { ImageResponse } from "next/og";

export const alt =
  "Aarvion — Govern every AI agent before it touches production";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 80% -10%, rgba(34,211,238,0.18), transparent), #07090d",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#22d3ee",
              color: "#07090d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ color: "#e6edf3", fontSize: 34, fontWeight: 700 }}>
            Aarvion
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#e6edf3",
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Govern every AI agent before it touches production.
          </div>
          <div style={{ color: "#8b97a8", fontSize: 30, maxWidth: 940 }}>
            Runtime policy enforcement in &lt;5ms. Cryptographically signed
            audit in 90 seconds.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {["SOC 2", "ISO 27001", "GDPR", "HIPAA", "EU AI Act"].map((c) => (
            <div
              key={c}
              style={{
                color: "#8b97a8",
                fontSize: 22,
                border: "1px solid #2a3344",
                borderRadius: 8,
                padding: "8px 16px",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
