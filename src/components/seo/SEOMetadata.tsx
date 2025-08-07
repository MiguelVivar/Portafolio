import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title = "Miguel Vivar - Desarrollador Full Stack | Ingeniero de Software",
  description = "Desarrollador Full Stack especializado en crear aplicaciones web modernas y escalables con React, Next.js, TypeScript y Node.js. Más de 3 años de experiencia en desarrollo web.",
  keywords = [],
  image = "/portafolio.png",
  url = "https://www.miguelvivar.engineer",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Miguel Vivar",
  section,
  tags = [],
}: SEOProps): Metadata {
  const fullImageUrl = image.startsWith('http') ? image : `https://www.miguelvivar.engineer${image}`;
  
  return {
    title,
    description,
    keywords: [
      'Miguel Vivar',
      'Desarrollador Full Stack',
      'React Developer',
      'Next.js Developer',
      'TypeScript Developer',
      'Node.js Developer',
      'JavaScript Expert',
      'Frontend Developer',
      'Backend Developer',
      'Web Developer España',
      'Consultor Tecnológico',
      'Ingeniero de Software',
      ...keywords,
    ],
    authors: [{ name: author, url: 'https://www.miguelvivar.engineer' }],
    creator: author,
    publisher: author,
    metadataBase: new URL('https://www.miguelvivar.engineer'),
    alternates: {
      canonical: new URL(url).pathname,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Miguel Vivar - Portfolio Profesional',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@miguelvivar',
      site: '@miguelvivar',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'verification_token_here', // Reemplazar con el token real
    },
    category: 'Technology',
    classification: 'Portfolio Website',
    referrer: 'origin-when-cross-origin',
    colorScheme: 'dark light',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
      { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
    ],
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/logo.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.json',
  };
}

// Metadatos específicos para proyectos
export function generateProjectMetadata(
  projectName: string,
  description: string,
  technologies: string[],
  image?: string
): Metadata {
  return generateSEOMetadata({
    title: `${projectName} | Miguel Vivar - Portfolio`,
    description: `${description} Proyecto desarrollado con ${technologies.join(', ')}.`,
    keywords: [
      projectName,
      'proyecto',
      'portfolio',
      'desarrollo web',
      ...technologies,
    ],
    image: image || `/proyectos/${projectName.toLowerCase().replace(/\s+/g, '-')}.png`,
    url: `https://www.miguelvivar.engineer/proyectos/${projectName.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'article',
    section: 'Proyectos',
    tags: technologies,
  });
}

// Metadatos para artículos de blog (cuando los tengas)
export function generateArticleMetadata(
  title: string,
  description: string,
  publishedTime: string,
  modifiedTime?: string,
  tags: string[] = [],
  image?: string
): Metadata {
  return generateSEOMetadata({
    title: `${title} | Miguel Vivar Blog`,
    description,
    keywords: ['blog', 'tutorial', 'desarrollo web', ...tags],
    image: image || '/blog-default.png',
    url: `https://www.miguelvivar.engineer/blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'article',
    publishedTime,
    modifiedTime,
    section: 'Blog',
    tags,
  });
}

export default generateSEOMetadata;
