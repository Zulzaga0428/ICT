import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ICT Tool — Nart ICT Tool LLC",
  description:
    "Nart ICT Tool LLC: боловсрол, бизнес, хүмүүст зориулсан программ хангамж. Zulzaga EDU болон бусад бүтээгдэхүүн.",
};

export const viewport: Viewport = {
  themeColor: "#0d1324",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
