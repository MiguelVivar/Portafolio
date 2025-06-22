import { Metadata } from "next";
import { notFound } from "next/navigation";
import { proyectos } from "@/data/proyectos";
import ProjectDetailPage from "@/ui/proyectos/individual/ProjectDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generar metadata dinámica para cada proyecto
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = proyectos.find(p => p.slug === slug);
  
  if (!proyecto) {
    return {
      title: "Proyecto no encontrado - Miguel Vivar",
      description: "El proyecto solicitado no existe.",
    };
  }

  return {
    title: `${proyecto.titulo} - Miguel Vivar`,
    description: proyecto.descripcion,
    keywords: [
      proyecto.titulo,
      proyecto.categoria,
      ...proyecto.tecnologias.map(tech => tech.nombre),
      "Miguel Vivar",
      "Desarrollo web"
    ],
    openGraph: {
      title: `${proyecto.titulo} - Miguel Vivar`,
      description: proyecto.descripcion,
      images: [
        {
          url: typeof proyecto.imagen === 'string' ? proyecto.imagen : proyecto.imagen.src,
          width: 1200,
          height: 630,
          alt: `Captura de pantalla del proyecto ${proyecto.titulo}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${proyecto.titulo} - Miguel Vivar`,
      description: proyecto.descripcion,
      images: [typeof proyecto.imagen === 'string' ? proyecto.imagen : proyecto.imagen.src],
    },
  };
}

// Generar rutas estáticas para todos los proyectos
export async function generateStaticParams() {
  return proyectos.map((proyecto) => ({
    slug: proyecto.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const proyecto = proyectos.find(p => p.slug === slug);

  if (!proyecto) {
    notFound();
  }

  return <ProjectDetailPage proyecto={proyecto} />;
}
