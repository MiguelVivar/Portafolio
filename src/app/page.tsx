import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Dynamic import with loading optimization
const Home = dynamic(() => import('../ui/home/Home'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ),
  ssr: true, // Enable SSR for better SEO
});

// Memoized roles array to prevent unnecessary re-renders
const ROLES: string[] = [
  "Front-End",
  "Back-End", 
  "Full-Stack",
  "de Software"
];

// Optimized metadata for Next.js App Router
export const metadata: Metadata = {
  title: 'Miguel Vivar - Desarrollador Web',
  description: 'Desarrollador Full-Stack especializado en tecnologías modernas. Experiencia en React, Next.js, Node.js y más.',
  keywords: ['Miguel Vivar', 'Desarrollador Web', 'Full-Stack', 'React', 'Next.js', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Miguel Vivar' }],
  creator: 'Miguel Vivar',
  publisher: 'Miguel Vivar',
  openGraph: {
    title: 'Miguel Vivar - Desarrollador Web',
    description: 'Desarrollador Full-Stack especializado en tecnologías modernas',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Miguel Vivar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miguel Vivar - Desarrollador Web',
    description: 'Desarrollador Full-Stack especializado en tecnologías modernas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

// Performance optimized Page component
export default function Page() {
  // Memoize roles to prevent unnecessary re-renders
  const memoizedRoles = useMemo(() => ROLES, []);

  return <Home roles={memoizedRoles} />;
}
