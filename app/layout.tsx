import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vivassol.com.br"),
  title: {
    default: "Vivassol — Personalizados que brilham",
    template: "%s · Vivassol",
  },
  description:
    "Produtos personalizados para bebês e presentes únicos. Sua imaginação, feita à mão pela Vivassol.",
  keywords: [
    "personalizados",
    "body de bebê personalizado",
    "caneca personalizada",
    "presentes personalizados",
    "Vivassol",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Vivassol — Personalizados que brilham",
    description:
      "Produtos personalizados para bebês e presentes únicos. Sua imaginação, feita à mão.",
    url: "https://www.vivassol.com.br",
    siteName: "Vivassol",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Fonts via link — garante carregamento correto no GitHub Pages */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main className="pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
