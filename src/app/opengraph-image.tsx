import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jewish Heritage Education and Advocacy Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a192f",
        }}
      >
        <img
          src={`${baseUrl}/favicon.svg`}
          width={400}
          height={400}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
