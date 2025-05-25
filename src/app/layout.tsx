import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { TerminalProvider } from "@/components/terminal/TerminalContext";
import Terminal from "@/components/terminal/Terminal";
import TerminalButton from "@/components/terminal/TerminalButton";
import JsonLd, { personSchema, websiteSchema } from "@/components/seo/JsonLd";
import { ToastProvider } from "@/components/ui/ToastProvider";

import WebVitals, {
  PerformanceDebugger,
} from "@/components/analytics/WebVitals";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Miguel Vivar - Desarrollador Full Stack",
  description:
    "Desarrollador Full Stack especializado en crear aplicaciones web modernas con React, Next.js, TypeScript y Node.js. Portafolio de proyectos y experiencia profesional.",
  keywords: [
    "Miguel Vivar",
    "Desarrollador Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Frontend",
    "Backend",
    "Portafolio",
    "Web Developer",
  ],
  authors: [{ name: "Miguel Vivar" }],
  creator: "Miguel Vivar",
  publisher: "Miguel Vivar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://miguelvivar.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Miguel Vivar - Desarrollador Full Stack",
    description:
      "Desarrollador Full Stack especializado en crear aplicaciones web modernas con React, Next.js, TypeScript y Node.js.",
    url: "https://miguelvivar.github.io",
    siteName: "Miguel Vivar Portfolio",
    images: [
      {
        url: "/portafolio.png",
        width: 1200,
        height: 630,
        alt: "Miguel Vivar - Desarrollador Full Stack Portfolio",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Vivar - Desarrollador Full Stack",
    description:
      "Desarrollador Full Stack especializado en crear aplicaciones web modernas con React, Next.js, TypeScript y Node.js.",
    images: ["/portafolio.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token_here", // Agrega tu token de Google Search Console
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const frases = [
    "El código es poesía escrita con lógica, creatividad y pasión.",
    "La programación es el arte de crear soluciones a problemas complejos.",
    "La programación es el lenguaje que nos permite comunicarnos con la máquina.",
  ];
  return (
    <html lang="es" className="hydrated overflow-x-hidden">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="canonical" href="https://miguelvivar.github.io" />
        <link rel="preconnect" href="https://miguelvivar-api.vercel.app/"></link>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="overflow-x-hidden">
        {" "}
        <TerminalProvider>
          <ToastProvider>
            <Navbar />
            <main id="main-content" className="overflow-x-hidden">
              {children}
            </main>
            <Footer frases={frases} /> <TerminalButton />
            <Terminal />
            <WebVitals />
            <PerformanceDebugger />
            {process.env.NEXT_PUBLIC_GA_ID && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}{" "}
          </ToastProvider>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              // Control del scroll del body cuando el menú está abierto
              document.addEventListener('menu-toggle', (e) => {
                if (e.detail.isOpen) {
                  document.body.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'unset';
                }
              });
            `,
            }}
          />
        </TerminalProvider>
      </body>
    </html>
  );
}
