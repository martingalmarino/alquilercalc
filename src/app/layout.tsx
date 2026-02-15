import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Calculadora de Alquiler Argentina 2026 | Aumento y Actualización | Alquileres+AR",
    template: "%s | Alquileres+AR",
  },
  description:
    "Calculadora de alquiler para Argentina 2026. Simulá el aumento de alquiler con ICL, IPC, UVA y más índices oficiales. Calculá cuánto aumenta el alquiler y proyectá toda la vida del contrato.",
  keywords: [
    "calculadora de alquiler",
    "calculadora aumento alquiler",
    "como calcular aumento de alquiler",
    "aumento alquiler 2026",
    "cuanto aumenta el alquiler",
    "simulador aumento alquiler",
    "actualizacion alquiler argentina",
    "indice alquiler hoy",
    "ICL hoy",
    "aumento alquiler ICL",
    "aumento alquiler IPC",
    "calculadora alquiler argentina",
  ],
  openGraph: {
    title: "Calculadora de Alquiler Argentina 2026 — Simulá tu Aumento | Alquileres+AR",
    description:
      "Calculá cuánto aumenta el alquiler en 2026 con datos oficiales del BCRA e INDEC. Simulador gratuito con ICL, IPC, UVA, Casa Propia y más.",
    type: "website",
    locale: "es_AR",
    siteName: "Alquileres+AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Alquiler Argentina 2026 | Alquileres+AR",
    description:
      "Simulá el aumento de alquiler con índices oficiales. Calculadora gratuita para inquilinos y propietarios.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://alquilercalc.vercel.app"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
