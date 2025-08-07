#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const baseUrl = 'https://www.miguelvivar.engineer';
const currentDate = new Date().toISOString();

// URLs estáticas principales
const staticUrls = [
  {
    url: baseUrl,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: `${baseUrl}/sobremi/`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: `${baseUrl}/habilidades/`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: `${baseUrl}/proyectos/`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: `${baseUrl}/contacto/`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: `${baseUrl}/documentacion/`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    url: `${baseUrl}/api/`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.5'
  }
];

// Generar XML del sitemap
function generateSitemap(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(urlObj => {
    xml += '  <url>\n';
    xml += `    <loc>${urlObj.url}</loc>\n`;
    xml += `    <lastmod>${urlObj.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${urlObj.changefreq}</changefreq>\n`;
    xml += `    <priority>${urlObj.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

// Escribir el sitemap al archivo
const sitemapXml = generateSitemap(staticUrls);
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

console.log('✅ Sitemap generado exitosamente en public/sitemap.xml');
console.log(`📍 URLs incluidas: ${staticUrls.length}`);
console.log(`🕒 Fecha de generación: ${currentDate}`);

export { generateSitemap, staticUrls };
