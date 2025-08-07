interface JsonLdProps {
  data: object
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Miguel Vivar",
  "alternateName": "Miguel Vivar Farfán",
  "jobTitle": "Desarrollador Full Stack | Ingeniero de Software",
  "description": "Desarrollador Full Stack especializado en crear aplicaciones web modernas y escalables con React, Next.js, TypeScript, Node.js y arquitecturas cloud. Más de 3 años de experiencia en desarrollo web.",
  "url": "https://www.miguelvivar.engineer",
  "image": "https://www.miguelvivar.engineer/portafolio.png",
  "email": "miguelvivarfarfan@gmail.com",
  "telephone": "+34-XXX-XXX-XXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ES",
    "addressRegion": "España"
  },
  "sameAs": [
    "https://www.linkedin.com/in/miguel-vivar-farfan/",
    "https://github.com/MiguelVivar",
    "https://www.instagram.com/mvivarf/",
    "https://twitter.com/miguelvivar",
    "https://dev.to/miguelvivar"
  ],
  "knowsAbout": [
    "JavaScript",
    "TypeScript", 
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Framer Motion",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Python",
    "Java",
    "Git",
    "GitHub",
    "Vercel",
    "Netlify",
    "Docker",
    "API REST",
    "GraphQL",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Web Performance Optimization",
    "SEO",
    "Responsive Design",
    "Accesibilidad Web",
    "Metodologías Ágiles",
    "Scrum"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Desarrollador Full Stack",
    "description": "Desarrollo de aplicaciones web completas usando tecnologías modernas como React, Next.js, TypeScript y Node.js",
    "occupationLocation": {
      "@type": "Country",
      "name": "España"
    }
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Universidad Nacional San Luis Gonzaga"
  },
  "award": [
    "Certificado en Desarrollo Web Moderno",
    "Especialización en React y Node.js"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Miguel Vivar - Portfolio Profesional",
  "alternateName": "Miguel Vivar Engineer",
  "description": "Portafolio profesional de Miguel Vivar, desarrollador Full Stack especializado en React, Next.js, TypeScript y Node.js. Descubre mis proyectos, habilidades y experiencia en desarrollo web moderno.",
  "url": "https://www.miguelvivar.engineer",
  "author": {
    "@type": "Person",
    "name": "Miguel Vivar",
    "@id": "https://www.miguelvivar.engineer/#person"
  },
  "publisher": {
    "@type": "Person", 
    "name": "Miguel Vivar",
    "@id": "https://www.miguelvivar.engineer/#person"
  },
  "inLanguage": "es-ES",
  "copyrightYear": new Date().getFullYear(),
  "copyrightHolder": {
    "@type": "Person",
    "name": "Miguel Vivar"
  },
  "genre": "Portfolio",
  "keywords": "desarrollador full stack, react, nextjs, typescript, nodejs, portfolio, españa",
  "about": {
    "@type": "Thing",
    "name": "Desarrollo Web Full Stack",
    "description": "Servicios de desarrollo web profesional y consultoría tecnológica"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.miguelvivar.engineer/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
