import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

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
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
