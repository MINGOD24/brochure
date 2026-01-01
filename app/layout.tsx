import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Educational Organization - Courses & Programs",
  description: "Discover our comprehensive courses and programs. Learn from industry experts and advance your career with our educational offerings.",
  keywords: ["education", "courses", "learning", "training", "programs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
