import { Metadata } from 'next';
import SobreMi from '@/ui/sobremi/SobreMi';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = {
  ...generatePageMetadata('about'),
  alternates: {
    canonical: '/sobremi',
  },
} as unknown as Metadata;

export default function SobreMiPage() {
  return <SobreMi />;
}