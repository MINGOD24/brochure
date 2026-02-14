import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const amina = localFont({
  src: [
    {
      path: "../../public/fonts/font/Amina-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/font/Amina-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/font/Amina-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/font/Amina-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-amina",
  fallback: ["Georgia", "serif"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "Jewish Heritage Education and Advocacy Center | JHEA",
  icons: {
    icon: "/favicon.svg",
  },
  description:
    "Based in Florida, the Jewish Heritage Education and Advocacy Center carries the message of the Jewish Museum of Chile across North America. We combat antisemitism and celebrate Jewish heritage through education.",
  keywords: [
    "Jewish heritage",
    "Holocaust education",
    "antisemitism",
    "Jewish Museum of Chile",
    "JHEA",
    "Jewish education",
    "cultural education",
  ],
  authors: [{ name: "Jewish Heritage Education and Advocacy Center" }],
  openGraph: {
    title: "Jewish Heritage Education and Advocacy Center",
    description:
      "Bringing memory to life through exhibitions, educational materials, and partnerships across North America.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jewish Heritage Education and Advocacy Center",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jewish Heritage Education and Advocacy Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewish Heritage Education and Advocacy Center",
    description:
      "Bringing memory to life through exhibitions, educational materials, and partnerships across North America.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${amina.variable}`}>
      <body className={`antialiased ${amina.className}`}>{children}</body>
    </html>
  );
}
