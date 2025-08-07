import { Metadata } from 'next';
import { generatePageMetadata } from '@/config/seo';
import PortfolioDocumentation from '@/ui/documentacion/PortfolioDocumentation';

export const metadata: Metadata = {
  ...generatePageMetadata('documentation'),
  alternates: {
    canonical: '/documentacion',
  },
} as unknown as Metadata;

export default function DocumentationPage() {
  return <PortfolioDocumentation />;
}