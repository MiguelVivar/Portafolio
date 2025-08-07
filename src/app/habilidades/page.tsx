import { Metadata } from 'next';
import Habilidades from '@/ui/habilidades/Habilidades';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = {
  ...generatePageMetadata('skills'),
  alternates: {
    canonical: '/habilidades',
  },
} as unknown as Metadata;

export default function HabilidadesPage() {
  return <Habilidades />;
}