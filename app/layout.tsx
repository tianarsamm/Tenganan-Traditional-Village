import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";
import { batikSans, cabinetGrotesk } from '@/lib/fonts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Desa Adat Tenganan | Wisata & Tenun",
    template: "%s | Desa Adat Tenganan",
  },
  description:
    "Jelajahi keindahan budaya, wisata, dan kain tenun khas Desa Adat Tenganan.",
  alternates: {
    canonical: "/",
  },
  keywords: ["Tenganan", "Desa Adat Tenganan", "tenun gringsing", "wisata Bali"],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Desa Adat Tenganan",
    title: "Desa Adat Tenganan | Wisata & Tenun",
    description: "Jelajahi keindahan budaya, wisata, dan kain tenun khas Desa Adat Tenganan.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Desa Adat Tenganan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Adat Tenganan | Wisata & Tenun",
    description: "Jelajahi keindahan budaya, wisata, dan kain tenun khas Desa Adat Tenganan.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${batikSans.variable} ${cabinetGrotesk.variable}`}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}