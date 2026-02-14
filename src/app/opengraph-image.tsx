import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jewish Heritage Education and Advocacy Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a192f",
          color: "#ffffff",
          fontFamily: "serif",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Jewish Heritage
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Education and Advocacy
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 300,
            lineHeight: 1.2,
            opacity: 0.9,
          }}
        >
          Center
        </div>
      </div>
    ),
    { ...size }
  );
}
