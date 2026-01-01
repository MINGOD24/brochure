import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jewish Heritage Education and Advocacy Center | JHEAC",
  description:
    "Based in Florida, the Jewish Heritage Education and Advocacy Center carries the message of the Jewish Museum of Chile across North America. We combat antisemitism and celebrate Jewish heritage through education.",
  keywords: [
    "Jewish heritage",
    "Holocaust education",
    "antisemitism",
    "Jewish Museum of Chile",
    "JHEAC",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewish Heritage Education and Advocacy Center",
    description:
      "Bringing memory to life through exhibitions, educational materials, and partnerships across North America.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
