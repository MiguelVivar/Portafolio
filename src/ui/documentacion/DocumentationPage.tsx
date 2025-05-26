'use client';

import { motion } from 'framer-motion';
import AnimateBackground from '@/components/AnimateBackground';
import CallToAction from '@/components/CallToAction';
import PageHeader from './PageHeader';
import SpotifyDocumentation from './SpotifyDocumentation';
import GithubDocumentation from './GithubDocumentation';
import WeatherDocumentation from './WeatherDocumentation';
import DocsNavigation from './DocsNavigation';
import { FaCode } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';

interface DocumentationPageProps {
  slug: string;
}

const DocumentationPage: React.FC<DocumentationPageProps> = ({ slug }) => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24 relative">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0">
        <AnimateBackground />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <PageHeader slug={slug} />          {/* Contenido de documentación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            {slug === 'spotify' && <SpotifyDocumentation />}
            {slug === 'github' && <GithubDocumentation />}
            {slug === 'weather' && <WeatherDocumentation />}
          </motion.div>

          {/* Enlace a documentación completa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <FaCode className="mx-auto text-3xl text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Documentación Técnica Completa
              </h3>
              <p className="text-gray-400 mb-4">
                Explora la documentación completa del portafolio, incluyendo arquitectura, 
                sistema de terminal, componentes y guías de desarrollo.
              </p>
              <Link 
                href="/documentacion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 font-semibold"
              >
                <FaCode />
                Ver Documentación Completa
              </Link>
            </div>
          </motion.div>

          {/* Navegación entre documentos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <DocsNavigation currentSlug={slug} />
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <div className="my-12">
          <CallToAction 
            title="¿Necesitas ayuda con la"
            titlespan=' implementación?'
            description="Contáctame para soporte personalizado y optimización de tu integración."
            buttonPrimaryIcon={<MdEmail />}
            buttonPrimaryText="Contactar"
            buttonPrimaryLink="/contacto"
            buttonSecondaryIcon={<FaCode />}
            buttonSecondaryText="Ver proyectos"
            buttonSecondaryLink="/proyectos"
          />
        </div>
      </div>
    </main>
  );
};

export default DocumentationPage;
