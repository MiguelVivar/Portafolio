import { Metadata } from 'next';
import Error404 from "../ui/error404/Error404";

export const metadata: Metadata = {
  title: '404 - Página no encontrada | Miguel Vivar - Desarrollador Full Stack',
  description: 'La página que buscas no existe. Explora el portfolio de Miguel Vivar y descubre proyectos de desarrollo web con React, Next.js y TypeScript.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: '404 - Página no encontrada | Miguel Vivar',
    description: 'La página que buscas no existe. Explora mi portfolio de desarrollo web.',
    type: 'website',
  },
};

export default function Page() {
  return <Error404/>;
}
