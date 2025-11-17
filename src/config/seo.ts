// Configuración SEO centralizada para todo el sitio
export const siteConfig = {
  // Información básica del sitio
  name: "Miguel Vivar - Portfolio Profesional",
  title: "Miguel Vivar - Desarrollador Full Stack | Ingeniero de Software",
  description: "Desarrollador Full Stack especializado en crear aplicaciones web modernas y escalables con React, Next.js, TypeScript y Node.js. Más de 3 años de experiencia en desarrollo web, consultoría tecnológica y arquitecturas cloud.",
  url: "https://www.miguelvivar.engineer",
  ogImage: "https://www.miguelvivar.engineer/portafolio.png",
  
  // Información del autor
  author: {
    name: "Miguel Vivar",
    email: "miguelvivarfarfan@gmail.com",
    twitter: "@miguelvivar",
    github: "https://github.com/MiguelVivar",
    linkedin: "https://www.linkedin.com/in/miguel-vivar-farfan/",
  },
  
  // Keywords principales
  keywords: [
    // Información personal y profesional
    "Miguel Vivar",
    "Miguel Vivar Farfán", 
    "Desarrollador Full Stack",
    "Ingeniero de Software",
    "Web Developer España",
    "Freelancer España",
    "Remote Developer",
    "Consultor Tecnológico",
    "Arquitecto Software",
    
    // Tecnologías Frontend
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer", 
    "JavaScript Expert",
    "Frontend Developer",
    "React.js",
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Responsive Design",
    "UI/UX Implementation",
    "Component Architecture",
    
    // Tecnologías Backend
    "Node.js Developer",
    "Backend Developer",
    "Express.js",
    "API REST",
    "GraphQL",
    "Microservices",
    "Server-Side Rendering",
    
    // Bases de Datos
    "MongoDB Expert",
    "PostgreSQL",
    "MySQL",
    "Database Design",
    "Database Optimization",
    
    // Otros lenguajes y tecnologías
    "Python Developer",
    "Java Developer",
    "PHP Developer",
    "C# Developer",
    
    // DevOps y Herramientas
    "Git Expert",
    "GitHub Actions",
    "Docker",
    "Cloud Architecture",
    "Vercel Expert",
    "Netlify",
    "CI/CD",
    "AWS",
    "Azure",
    
    // Metodologías y Soft Skills
    "Agile Methodologies",
    "Scrum Master",
    "Code Review",
    "Technical Leadership",
    "Mentoring",
    
    // Especialidades
    "Web Performance Optimization",
    "Core Web Vitals",
    "SEO Technical",
    "Accessibility Expert",
    "PWA Development",
    "Mobile-First Design",
    "Cross-Browser Compatibility",
    
    // Servicios
    "Desarrollo Web Moderno",
    "Aplicaciones Escalables", 
    "Consultoría Tecnológica",
    "Code Audit",
    "Performance Audit",
    "Technical Consultation",
    "Custom Web Applications",
    "E-commerce Solutions",
    "Portfolio Development",
    
    // Ubicación y contexto
    "Developer Spain",
    "Desarrollador España",
    "Spanish Developer",
    "European Developer",
    "Remote Work",
    "Freelance Developer",
  ],
  
  // Enlaces sociales
  links: {
    twitter: "https://twitter.com/miguelvivar",
    github: "https://github.com/MiguelVivar", 
    linkedin: "https://www.linkedin.com/in/miguel-vivar-farfan/",
    instagram: "https://www.instagram.com/mvivarf/",
    email: "mailto:miguelvivarfarfan@gmail.com",
  },
  
  // Configuración de Open Graph
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    siteName: "Miguel Vivar - Portfolio Profesional",
  },
  
  // Configuración de Twitter Cards
  twitter: {
    card: "summary_large_image",
    creator: "@miguelvivar",
    site: "@miguelvivar",
  },
  
  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} as const;

// Metadatos por página
export const pageMetadata = {
  home: {
    title: "Inicio",
    description: "Bienvenido al portfolio profesional de Miguel Vivar, desarrollador Full Stack especializado en tecnologías web modernas.",
    keywords: [...siteConfig.keywords, "inicio", "home", "portfolio", "presentación"] as string[],
  },
  
  about: {
    title: "Sobre Mí",
    description: "Conoce más sobre Miguel Vivar, su trayectoria profesional, formación académica y valores como desarrollador Full Stack.",
    keywords: [...siteConfig.keywords, "sobre mi", "about", "biografía", "experiencia", "formación"] as string[],
  },
  
  skills: {
    title: "Habilidades Técnicas",
    description: "Descubre las tecnologías y herramientas que domina Miguel Vivar: React, Next.js, TypeScript, Node.js y más.",
    keywords: [...siteConfig.keywords, "habilidades", "skills", "tecnologías", "herramientas", "competencias"] as string[],
  },
  
  projects: {
    title: "Proyectos",
    description: "Explora el portfolio de proyectos de Miguel Vivar: aplicaciones web, sistemas completos y soluciones tecnológicas.",
    keywords: [...siteConfig.keywords, "proyectos", "projects", "portfolio", "aplicaciones", "desarrollo"] as string[],
  },
  
  services: {
    title: "Servicios",
    description: "Servicios profesionales de desarrollo web, aplicaciones móviles, automatización con IA, cloud computing y consultoría tecnológica.",
    keywords: [...siteConfig.keywords, "servicios", "services", "desarrollo web", "aplicaciones móviles", "automatización", "IA", "cloud", "consultoría"] as string[],
  },
  
  contact: {
    title: "Contacto", 
    description: "¿Tienes un proyecto en mente? Contacta con Miguel Vivar para consultoría tecnológica y desarrollo web profesional.",
    keywords: [...siteConfig.keywords, "contacto", "contact", "consultoría", "colaboración", "presupuesto"] as string[],
  },
  
  documentation: {
    title: "Documentación",
    description: "Documentación técnica del portfolio y guías de uso de las APIs integradas.",
    keywords: [...siteConfig.keywords, "documentación", "documentation", "apis", "guías"] as string[],
  },
  
  api: {
    title: "API Documentation",
    description: "Documentación de las APIs disponibles en el portfolio de Miguel Vivar.",
    keywords: [...siteConfig.keywords, "api", "documentación", "endpoints", "integración"] as string[],
  },
} as const;

// Función helper para generar metadatos de página
export function generatePageMetadata(page: keyof typeof pageMetadata) {
  const pageData = pageMetadata[page];
  return {
    title: `${pageData.title} | ${siteConfig.title}`,
    description: pageData.description,
    keywords: [...pageData.keywords], // Convertir a mutable array
    openGraph: {
      ...siteConfig.openGraph,
      title: `${pageData.title} | ${siteConfig.name}`,
      description: pageData.description,
      url: `${siteConfig.url}/${page === 'home' ? '' : page}`,
    },
    twitter: {
      ...siteConfig.twitter,
      title: `${pageData.title} | ${siteConfig.name}`,
      description: pageData.description,
    },
  };
}

// Schema.org types para structured data
export const schemaTypes = {
  person: "Person",
  website: "WebSite", 
  organization: "ProfessionalService",
  softwareApplication: "SoftwareApplication",
  course: "Course",
  article: "Article",
  breadcrumbList: "BreadcrumbList",
  faqPage: "FAQPage",
} as const;
