import { ImageResponse } from "next/og";

export const alt = "Aarvion — The runtime that takes enterprise agents from pilot to production";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const steps = ["Route", "Policy", "Authority", "Review", "Act"];

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
            "linear-gradient(135deg, #fbfaf6 0%, #f6f3ec 55%, #dce2ff 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 150,
            background: "linear-gradient(90deg, #2b3f86, #162250)",
            clipPath: "polygon(0 55%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#162250",
              color: "#fbfaf6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ color: "#0a0f18", fontSize: 32, fontWeight: 700 }}>Aarvion</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              color: "#0a0f18",
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2.5,
              maxWidth: 980,
            }}
          >
            The runtime that takes enterprise agents from pilot to production.
          </div>
          <div style={{ color: "#535a66", fontSize: 28, maxWidth: 900, lineHeight: 1.35 }}>
            Route every step. Gate every consequential action. Keep a signed
            record of who allowed what.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {steps.map((step, index) => (
            <div
              key={step}
              style={{
                color: index === steps.length - 1 ? "#fbfaf6" : "#162250",
                background: index === steps.length - 1 ? "#162250" : "#fbfaf6",
                fontSize: 22,
                fontWeight: 700,
                border: "1px solid #cbc5b8",
                borderRadius: 999,
                padding: "10px 20px",
              }}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
