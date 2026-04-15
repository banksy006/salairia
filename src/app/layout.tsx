import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salairia.fr"),
  title: {
    default: "Salairia — Votre rémunération, sans zone d'ombre",
    template: "%s · Salairia",
  },
  description:
    "Simulateurs gratuits, guides clairs et comparatifs neutres pour salariés, freelances, dirigeants et auto-entrepreneurs. Comprenez et optimisez votre rémunération.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Salairia",
    title: "Salairia — Votre rémunération, sans zone d'ombre",
    description:
      "Simulateurs gratuits, guides clairs et comparatifs neutres pour salariés, freelances, dirigeants et auto-entrepreneurs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
