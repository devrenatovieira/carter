import React, { Suspense } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import CartHydrator from "@/components/CartHydrator";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import LoadingOverlay from "@/components/LoadingOverlay";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Providers from "./providers";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const text = Manrope({
  subsets: ["latin"],
  variable: "--font-text",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "Carter | Shopay-Canvi",
    template: "%s | Carter"
  },
  description: "Carter - curadoria manauara com checkout externo via Shopay-Canvi.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Carter | Shopay-Canvi",
    description: "Curadoria manauara com pagamento processado pelo parceiro Shopay-Canvi."
  },
  twitter: {
    card: "summary_large_image",
    title: "Carter | Shopay-Canvi",
    description: "Curadoria manauara com pagamento processado pelo parceiro Shopay-Canvi."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${text.variable}`}>
      <body className="min-h-screen bg-[var(--surface)] antialiased">
        <Providers>
          <CartHydrator />
          <AnalyticsScripts />
          <Header />
          <Suspense fallback={null}>
            <LoadingOverlay />
            <AnalyticsTracker />
          </Suspense>
          <main className="container pt-24 pb-8 md:pt-28 md:pb-12">{children}</main>
          <Footer />
          <ConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
