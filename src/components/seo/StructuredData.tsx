import Script from 'next/script'

interface BreadcrumbProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbProps) {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbList),
      }}
    />
  )
}

interface FAQProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQJsonLd({ faqs }: FAQProps) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  )
}

interface ProjectProps {
  name: string
  description: string
  url: string
  image: string
  technologies: string[]
  dateCreated: string
}

export function ProjectJsonLd({ name, description, url, image, technologies, dateCreated }: ProjectProps) {
  const projectData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    image,
    author: {
      '@type': 'Person',
      name: 'Miguel Vivar',
      url: 'https://miguelvivar.vercel.app',
    },
    programmingLanguage: technologies,
    dateCreated,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
  }

  return (
    <Script
      id={`project-${name.toLowerCase().replace(/\s+/g, '-')}-jsonld`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(projectData),
      }}
    />
  )
}

export function OrganizationJsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Miguel Vivar - Desarrollador Full Stack',
    description: 'Servicios de desarrollo web profesional especializado en React, Next.js, TypeScript y Node.js',
    url: 'https://miguelvivar.vercel.app',
    logo: 'https://miguelvivar.vercel.app/logo.svg',
    image: 'https://miguelvivar.vercel.app/portafolio.png',
    founder: {
      '@type': 'Person',
      name: 'Miguel Vivar',
    },
    sameAs: [
      'https://github.com/miguelvivar',
      'https://linkedin.com/in/miguelvivar',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    serviceType: [
      'Desarrollo Web',
      'Desarrollo Frontend',
      'Desarrollo Backend',
      'Desarrollo Full Stack',
      'Consultoría Tecnológica',
    ],
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
    />
  )
}
