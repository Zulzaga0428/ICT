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

const description =
  "Nart ICT Tool LLC: боловсрол, бизнес, хүмүүст зориулсан программ хангамж. Zulzaga EDU болон бусад бүтээгдэхүүн.";

// Хуваалцах зураг нь app/opengraph-image.jpg, app/twitter-image.jpg (Next өөрөө холбоно)
export const metadata: Metadata = {
  metadataBase: new URL("https://icttool.net"),
  title: "ICT Tool — Nart ICT Tool LLC",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ICT Tool",
    title: "ICT Tool — Сургууль, бизнес, хүмүүст бодитоор ажилладаг технологи",
    description,
    locale: "mn_MN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICT Tool — Nart ICT Tool LLC",
    description,
  },
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
