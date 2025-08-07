import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/temp/',
          '/*.json$',
          '/*.xml$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/temp/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/temp/',
        ],
      },
    ],
    sitemap: 'https://www.miguelvivar.engineer/sitemap.xml',
    host: 'https://www.miguelvivar.engineer',
  }
}
