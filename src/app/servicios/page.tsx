import { Metadata } from 'next';
import Servicios from '@/ui/servicios/Servicios';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = {
  ...generatePageMetadata('services'),
  alternates: {
    canonical: '/servicios',
  },
} as unknown as Metadata;

export default function ServiciosPage() {
  return <Servicios />;
}
