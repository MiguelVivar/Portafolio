import { Metadata } from 'next';
import ApiPage from '@/ui/api/ApiPage';

export const metadata: Metadata = {
  title: 'API Documentation | Miguel Vivar - Desarrollador Full Stack',
  description: 'Documentación de las APIs y servicios desarrollados, incluyendo endpoints, ejemplos de uso y guías de implementación.',
  keywords: ['API', 'Documentación', 'REST API', 'Endpoints', 'Servicios Web', 'Miguel Vivar'],
  openGraph: {
    title: 'API Documentation | Miguel Vivar',
    description: 'Documentación completa de APIs y servicios web desarrollados',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Documentation | Miguel Vivar',
    description: 'Documentación completa de APIs y servicios web desarrollados',
  },
};

export default function Page() {
  return <ApiPage />;
}