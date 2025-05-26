import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocumentationPage from '@/ui/documentacion/DocumentationPage';

// Configurar metadatos dinámicos
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  
  const titles: Record<string, string> = {
    spotify: 'Documentación API Spotify | Miguel Vivar',
    github: 'Documentación API GitHub | Miguel Vivar',
    weather: 'Documentación API Clima | Miguel Vivar'
  };

  const descriptions: Record<string, string> = {
    spotify: 'Documentación completa de la API de Spotify Now Playing. Aprende cómo implementar la integración con Spotify para mostrar la música actual.',
    github: 'Documentación de la API de GitHub Analytics. Guía completa para obtener estadísticas y métricas de repositorios.',
    weather: 'Documentación de la API del Clima. Implementación de OpenWeatherMap API para obtener datos meteorológicos en tiempo real.'
  };

  if (!titles[slug]) {
    return {
      title: 'Documentación no encontrada | Miguel Vivar',
      description: 'La documentación solicitada no está disponible.'
    };
  }

  return {
    title: titles[slug],
    description: descriptions[slug],
    keywords: ['API', 'Documentación', 'Tutorial', slug, 'Miguel Vivar'],
    openGraph: {
      title: titles[slug],
      description: descriptions[slug],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[slug],
      description: descriptions[slug],
    },
  };
}

// Generar rutas estáticas
export function generateStaticParams() {
  return [
    { slug: 'spotify' },
    { slug: 'github' },
    { slug: 'weather' }
  ];
}

export default async function ApiDocumentationPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Verificar que el slug sea válido
  const validSlugs = ['spotify', 'github', 'weather'];
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return <DocumentationPage slug={slug} />;
}
