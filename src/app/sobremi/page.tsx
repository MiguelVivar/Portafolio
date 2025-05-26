import { Metadata } from 'next';
import SobreMi from '@/ui/sobremi/SobreMi';

export const metadata: Metadata = {
  title: 'Sobre Mí | Miguel Vivar - Desarrollador Full Stack',
  description: 'Descubre mi experiencia como desarrollador Full Stack especializado en React, Next.js, TypeScript y Node.js. Conoce mi trayectoria profesional, formación y pasión por crear soluciones web innovadoras.',
  keywords: [
    'Miguel Vivar biografía',
    'experiencia desarrollador',
    'Full Stack developer España',
    'programador React',
    'desarrollador Next.js',
    'perfil profesional'
  ],
  openGraph: {
    title: 'Sobre Mí - Miguel Vivar',
    description: 'Conoce mi trayectoria como desarrollador Full Stack y mi pasión por crear soluciones web innovadoras.',
    type: 'profile',
    url: 'https://miguelvivar.vercel.app/sobremi',
  },
  alternates: {
    canonical: '/sobremi',
  },
};

export default function SobreMiPage() {
  return <SobreMi />;
}