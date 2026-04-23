import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "6lFbiKsed5RFyXQnOwjLibnAXYtIkTQl5WzukTYDntY",
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
      <head>
        <script
          async
          src="https://plausible.io/js/pa-iN3gYWKkim1fpgOaRe5iy.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()',
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
