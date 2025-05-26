import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function feed(): MetadataRoute.Sitemap {
  const baseUrl = 'https://miguelvivar.vercel.app'
  const now = new Date()
  
  // Este sería un feed RSS básico para proyectos/actualizaciones
  return [
    {
      url: `${baseUrl}/proyectos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobremi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/habilidades`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
