import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jewish Heritage Education and Advocacy Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const baseUrl = "https://www.jheacenter.com";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1F3FAE",
      }}
    >
      <img
        src={`${baseUrl}/favicon.svg`}
        width={1200}
        height={630}
        alt=""
        style={{ objectFit: "cover" }}
      />
    </div>,
    { ...size },
  );
}
