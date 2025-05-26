import { Metadata } from 'next';
import Proyectos from '@/ui/proyectos/Proyectos';

export const metadata: Metadata = {
  title: 'Mis Proyectos | Miguel Vivar - Desarrollador Full Stack',
  description: 'Explora mi portfolio de proyectos web desarrollados con React, Next.js, TypeScript y Node.js. Aplicaciones modernas, responsive y optimizadas que demuestran mis habilidades en desarrollo Full Stack.',
  keywords: [
    'proyectos Miguel Vivar',
    'portfolio desarrollador',
    'aplicaciones React',
    'proyectos Next.js',
    'desarrollo web España',
    'aplicaciones TypeScript',
    'proyectos Full Stack'
  ],
  openGraph: {
    title: 'Proyectos - Miguel Vivar Portfolio',
    description: 'Descubre mis proyectos de desarrollo web con tecnologías modernas como React, Next.js y TypeScript.',
    type: 'website',
    url: 'https://miguelvivar.vercel.app/proyectos',
    images: [
      {
        url: '/portafolio.png',
        width: 1200,
        height: 630,
        alt: 'Proyectos de Miguel Vivar - Desarrollador Full Stack',
      },
    ],
  },
  alternates: {
    canonical: '/proyectos',
  },
};

export default function ProyectosPage() {
  return <Proyectos />;
}