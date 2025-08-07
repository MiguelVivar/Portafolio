import { Metadata } from 'next';
import { generatePageMetadata } from '@/config/seo';
import ApiPage from '@/ui/api/ApiPage';

export const metadata: Metadata = {
  ...generatePageMetadata('api'),
  alternates: {
    canonical: '/api',
  },
} as unknown as Metadata;

export default function Page() {
  return <ApiPage />;
}