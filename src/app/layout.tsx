import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { TerminalProvider } from "@/components/terminal/TerminalContext";
import TerminalButton from "@/components/terminal/TerminalButton";
import JsonLd, { personSchema, websiteSchema } from "@/components/seo/JsonLd";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WebVitals, { PerformanceDebugger } from "@/components/analytics/WebVitals";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Terminal from "@/components/terminal/Terminal";

export const metadata: Metadata = {
  title: {
    default: "Miguel Vivar - Desarrollador Full Stack | Ingeniero de Software",
    template: "%s | Miguel Vivar - Full Stack Developer"
  },
  description:
    "Desarrollador Full Stack especializado en crear aplicaciones web modernas y escalables con React, Next.js, TypeScript y Node.js. Más de 3 años de experiencia en desarrollo web, consultoría tecnológica y arquitecturas cloud. Portafolio profesional con proyectos reales.",
  keywords: [
    "Miguel Vivar",
    "Desarrollador Full Stack",
    "Ingeniero de Software",
    "React Developer",
    "Next.js Developer", 
    "TypeScript Developer",
    "Node.js Developer",
    "JavaScript Expert",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer España",
    "Consultor Tecnológico",
    "Arquitecto Software",
    "Desarrollo Web Moderno",
    "Aplicaciones Escalables",
    "Performance Web",
    "SEO Technical",
    "Responsive Design",
    "API REST",
    "GraphQL",
    "MongoDB Expert",
    "PostgreSQL",
    "MySQL",
    "Python Developer",
    "Java Developer",
    "Git Expert",
    "Docker",
    "Cloud Architecture",
    "Vercel Expert",
    "Netlify",
    "Portfolio Profesional",
    "Freelancer España",
    "Remote Developer",
    "Agile Methodologies",
    "Scrum Master",
    "Web Performance Optimization",
    "Core Web Vitals",
    "Accessibility Expert",
    "UI/UX Implementation"
  ],
  authors: [{ name: "Miguel Vivar", url: "https://www.miguelvivar.engineer" }],
  creator: "Miguel Vivar",
  publisher: "Miguel Vivar",
  category: "Technology",
  classification: "Portfolio Website",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.miguelvivar.engineer"),
  alternates: {
    canonical: "/",
    languages: {
      'es-ES': '/',
      'en-US': '/en'
    }
  },
  openGraph: {
    title: "Miguel Vivar - Desarrollador Full Stack | Ingeniero de Software",
    description:
      "Desarrollador Full Stack especializado en crear aplicaciones web modernas y escalables. Portfolio profesional con proyectos reales usando React, Next.js, TypeScript y Node.js.",
    url: "https://www.miguelvivar.engineer",
    siteName: "Miguel Vivar - Portfolio Profesional",
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
    title: "Miguel Vivar - Desarrollador Full Stack | Ingeniero de Software", 
    description:
      "Desarrollador Full Stack especializado en crear aplicaciones web modernas y escalables. Portfolio con proyectos reales usando React, Next.js, TypeScript y Node.js.",
    images: ["/portafolio.png"],
    creator: "@miguelvivar",
    site: "@miguelvivar"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token_here", // Reemplazar con tu token real de Google Search Console
    yandex: "verification_token_here", // Opcional: Yandex verification
    yahoo: "verification_token_here", // Opcional: Yahoo verification
    other: {
      bing: ["verification_token_here"], // Opcional: Bing verification
    }
  },
  applicationName: "Miguel Vivar Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#3b82f6" },
    ],
  },
  manifest: "/manifest.json",
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
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="dark light" />
        <meta name="application-name" content="Miguel Vivar Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Miguel Vivar" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://www.miguelvivar.engineer/" />
        <link rel="author" href="/humans.txt" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="preconnect" href="https://i.scdn.co" />

        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/portafolio.png" as="image" />

        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="overflow-x-hidden">
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
        <TerminalProvider>
          <ToastProvider>
            <Navbar />
            <main id="main-content" className="overflow-x-hidden">
              {children}
            </main>
            <Footer frases={frases} />
            <TerminalButton />
            <Suspense fallback={null}>
              <Terminal />
            </Suspense>
            <WebVitals />
            <PerformanceDebugger />
            {process.env.NEXT_PUBLIC_GA_ID && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}
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
