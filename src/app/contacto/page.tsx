import { Metadata } from 'next';
import Contacto from '@/ui/contacto/Contacto';
import { generatePageMetadata } from '@/config/seo';

export const metadata: Metadata = {
  ...generatePageMetadata('contact'),
  alternates: {
    canonical: '/contacto',
  },
} as unknown as Metadata;

export default function ContactoPage() {
  return <Contacto />;
}