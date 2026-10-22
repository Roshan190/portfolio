import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Roshan Shikhare, Senior Fullstack Engineer in Mumbai";
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
          background: "#07080c",
          color: "#efe7d8",
          padding: "56px 64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "180px",
              height: "12px",
              background: "#f0b45a",
              marginBottom: "36px",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#7ec8c3" }}>
            MUMBAI, INDIA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 560,
              letterSpacing: -3,
              lineHeight: 1,
              marginTop: 16,
            }}
          >
            Roshan Shikhare
          </div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 18, color: "#ffd89a" }}>
            Senior Fullstack Engineer
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26 }}>
          React · Next.js · Node.js · PostgreSQL · MongoDB
        </div>
      </div>
    ),
    { ...size },
  );
}
