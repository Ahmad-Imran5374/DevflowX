import { ImageResponse } from "next/og";

export const alt = "DevFlowX: Software, AI and automation studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #050816 0%, #0a1024 55%, #1a0f3d 100%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          DevFlow<span style={{ color: "#7c6cff" }}>X</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            Software, AI & automation,
          </div>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, color: "#5b8cff" }}>
            engineered for outcomes.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
