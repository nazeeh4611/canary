import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — interior design, renovation and fit-out in Ajman, UAE`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social image. Replace with a real project photograph when available. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f1ea",
          color: "#22231f",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          borderLeft: "24px solid #22231f",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#55564f", fontFamily: "sans-serif" }}>
          Interior Design · Renovation · Fit-Out · Joinery
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, lineHeight: 1, fontWeight: 700, letterSpacing: -4 }}>
            Canary<span style={{ color: "#d4a72c" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 24, color: "#4c4036" }}>Spaces with a sense of purpose.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#55564f", fontFamily: "sans-serif" }}>
          <span>Studio in Ajman · Projects across the UAE</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
