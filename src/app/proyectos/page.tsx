import { Metadata } from 'next';
import Proyectos from '@/ui/proyectos/Proyectos';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = {
  ...generatePageMetadata('projects'),
  alternates: {
    canonical: '/proyectos',
  },
} as unknown as Metadata;

export default function ProyectosPage() {
  return <Proyectos />;
}