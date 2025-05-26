'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from './PageHeader';
import ApiCard from './ApiCard';
import CallToAction from '@/components/CallToAction';
import AnimateBackground from '@/components/AnimateBackground';
import { 
  FaCode, 
  FaDatabase, 
  FaLock, 
  FaCog,
  FaMusic,
  FaGithub,
  FaTerminal
} from 'react-icons/fa';
import { 
  SiTypescript,
  SiNodedotjs,
  SiSpotify
} from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';

// Tipos de datos
interface Api {
  id: number;
  title: string;
  description: string;
  endpoint: string;
  method: string;
  status: 'active' | 'development' | 'deprecated';
  category: string;
  technologies: Array<{
    name: string;
    icon: React.ReactNode;
  }>;
  features: string[];
  documentation?: string;
  github?: string;
  demo?: string;
  lastUpdated: string;
  responseTime?: string;
  usage?: string;
}

// Datos de las APIs
const apisData: Api[] = [
  {
    id: 1,
    title: 'Spotify Now Playing',
    description: 'API Route de Next.js que obtiene la canción que estoy escuchando actualmente en Spotify usando OAuth 2.0 y refresh tokens.',
    endpoint: '/api/spotify',
    method: 'GET',
    status: 'active',
    category: 'entertainment',
    technologies: [
      { name: 'Next.js 15', icon: <SiNodedotjs className="text-green-500" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
      { name: 'Spotify Web API', icon: <SiSpotify className="text-green-500" /> }
    ],
    features: [
      'Obtención en tiempo real con refresh tokens',
      'Manejo automático de autenticación OAuth 2.0',
      'Información completa de la canción y artista',
      'Estado de reproducción y progreso',
      'Metadatos del álbum con imágenes',
      'URLs directas a Spotify',
      'Manejo de errores robusto'
    ],
    documentation: '/documentacion/spotify',
    github: 'https://github.com/MiguelVivar/MiguelVivar.github.io',
    demo: '/api/spotify',
    lastUpdated: '2025-05-26',
    responseTime: '~200ms',
    usage: 'Widget en vivo en sobre mí y el footer del portafolio'
  },
  {
    id: 2,
    title: 'GitHub Analytics API',
    description: 'Librería de funciones TypeScript que consume la API de GitHub para obtener estadísticas detalladas mi perfil.',
    endpoint: '@/lib/githubApi',
    method: 'Functions',
    status: 'active',
    category: 'analytics',
    technologies: [
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
      { name: 'GitHub REST API', icon: <FaGithub className="text-white" /> },
      { name: 'Next.js', icon: <SiNodedotjs className="text-green-500" /> }
    ],
    features: [
      'Estadísticas completas de repositorios',
      'Análisis de lenguajes de programación con porcentajes',
      'Actividad reciente de commits y eventos',
      'Cálculo de contribuciones y rachas',
      'Datos de followers y estrellas',
      'Filtrado de repositorios (sin forks archivados)',
      'Mapeo de colores por lenguaje'
    ],
    documentation: '/documentacion/github',
    github: 'https://github.com/MiguelVivar/MiguelVivar.github.io',
    lastUpdated: '2025-05-26',
    responseTime: '~300ms',
    usage: 'Dashboard de estadísticas en sobre mí'
  },
  {
    id: 3,
    title: 'OpenWeatherMap Integration',
    description: 'Integración con OpenWeatherMap API para mostrar datos meteorológicos en tiempo real de Ica, Perú.',
    endpoint: '@/lib/weatherApi',
    method: 'Functions',
    status: 'active',
    category: 'utility',
    technologies: [
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
      { name: 'OpenWeatherMap API', icon: <FaTerminal className="text-blue-400" /> },
      { name: 'Next.js', icon: <SiNodedotjs className="text-green-500" /> }
    ],
    features: [
      'Datos meteorológicos actuales de Ica, Perú',
      'Conversión automática de Kelvin a Celsius',
      'Emojis dinámicos según condiciones climáticas',
      'Información de humedad y viento',
      'Integración en terminal interactiva',
      'Manejo de errores con datos offline',
      'Soporte para español'
    ],
    documentation: '/documentacion/weather',
    github: 'https://github.com/MiguelVivar/MiguelVivar.github.io',
    lastUpdated: '2025-05-26',
    responseTime: '~150ms',
    usage: 'Comando "weather" en la terminal del portafolio'
  }
];

// Categorías para filtrado
const categories = [
  { id: 'all', name: 'Todas', icon: <FaCode /> },
  { id: 'entertainment', name: 'Entretenimiento', icon: <FaMusic /> },
  { id: 'analytics', name: 'Analytics', icon: <FaDatabase /> },
  { id: 'utility', name: 'Utilidades', icon: <FaCog /> },
  { id: 'security', name: 'Seguridad', icon: <FaLock /> }
];

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const ApiPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedApi, setSelectedApi] = useState<Api | null>(null);

  // Filtrar APIs según la categoría seleccionada
  const filteredApis = useMemo(() => {
    if (selectedCategory === 'all') return apisData;
    return apisData.filter(api => api.category === selectedCategory);
  }, [selectedCategory]);

  // Estadísticas generales
  const stats = useMemo(() => ({
    total: apisData.length,
    active: apisData.filter(api => api.status === 'active').length,
    development: apisData.filter(api => api.status === 'development').length,
    avgResponseTime: '150ms'
  }), []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24 relative">
      {/* Fondo animado */}
      <AnimateBackground />
      
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 relative z-10">
        {/* Header de la página */}
        <PageHeader />

        {/* Estadísticas generales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-neutral-800 rounded-lg p-4 border-l-4 border-emerald-500">
            <h3 className="text-emerald-400 text-sm font-medium">Total APIs</h3>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4 border-l-4 border-green-500">
            <h3 className="text-green-400 text-sm font-medium">Activas</h3>
            <p className="text-2xl font-bold text-white">{stats.active}</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4 border-l-4 border-yellow-500">
            <h3 className="text-yellow-400 text-sm font-medium">En Desarrollo</h3>
            <p className="text-2xl font-bold text-white">{stats.development}</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-4 border-l-4 border-blue-500">
            <h3 className="text-blue-400 text-sm font-medium">Tiempo Promedio</h3>
            <p className="text-2xl font-bold text-white">{stats.avgResponseTime}</p>
          </div>
        </motion.div>

        {/* Sección de Documentación Técnica Completa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <FaCode className="text-3xl text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">
                    Documentación Técnica Completa
                  </h2>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Explora la documentación completa del portafolio, incluyendo la arquitectura del proyecto, 
                  el sistema de terminal interactivo con más de 25 comandos, componentes UI, y guías 
                  detalladas de desarrollo y despliegue.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaTerminal className="text-emerald-400" />
                    <span className="text-sm">Sistema Terminal con 25+ comandos</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCode className="text-blue-400" />
                    <span className="text-sm">Arquitectura Next.js 15 + TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaDatabase className="text-purple-400" />
                    <span className="text-sm">Integración con APIs externas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCog className="text-yellow-400" />
                    <span className="text-sm">Guías de desarrollo y deploy</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/documentacion"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105"
                >
                  <FaCode className="text-xl" />
                  <div className="text-left">
                    <div className="font-bold">Ver Documentación</div>
                    <div className="text-sm opacity-90">Guía técnica completa</div>
                  </div>
                </Link>
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-2">También disponible:</div>
                  <div className="flex gap-2">
                    <Link 
                      href="/documentacion/github"
                      className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-gray-300 hover:text-white rounded-lg text-xs transition-all duration-300"
                    >
                      GitHub API
                    </Link>
                    <Link 
                      href="/documentacion/weather"
                      className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-gray-300 hover:text-white rounded-lg text-xs transition-all duration-300"
                    >
                      Weather API
                    </Link>
                    <Link 
                      href="/documentacion/spotify"
                      className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 text-gray-300 hover:text-white rounded-lg text-xs transition-all duration-300"
                    >
                      Spotify API
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-emerald-300'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Grid de APIs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <AnimatePresence mode="wait">
            {filteredApis.map((api) => (
              <motion.div
                key={api.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => setSelectedApi(api)}
              >
                <ApiCard api={api} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-neutral-800 rounded-lg p-6 border-l-4 border-emerald-500 mb-12"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <FaTerminal className="text-emerald-400 mr-2" />
            Información General
          </h2>          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <h3 className="font-semibold text-emerald-300 mb-2">Tecnologías Principales</h3>
              <ul className="space-y-1 text-sm">
                <li>• Next.js 15 & React</li>
                <li>• TypeScript</li>
                <li>• Spotify Web API</li>
                <li>• GitHub REST API</li>
                <li>• OpenWeatherMap API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-300 mb-2">Características</h3>
              <ul className="space-y-1 text-sm">
                <li>• OAuth 2.0 & refresh tokens</li>
                <li>• Integración en tiempo real</li>
                <li>• Error handling robusto</li>
                <li>• Datos meteorológicos locales</li>
                <li>• Analytics de GitHub automatizados</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <CallToAction 
            title='¿Necesitas una' 
            titlespan='API personalizada?' 
            description='Desarrollo APIs robustas, escalables y bien documentadas para tus proyectos.' 
            buttonPrimaryIcon={<MdEmail className="text-xl" />} 
            buttonPrimaryText='Contáctame' 
            buttonPrimaryLink='/contacto'
            buttonSecondaryIcon={<FaGithub className="text-xl" />} 
            buttonSecondaryText='Ver en GitHub'
            buttonSecondaryLink='https://github.com/MiguelVivar'
          />
      </div>

      {/* Modal de detalle (placeholder - podrías implementar más tarde) */}
      <AnimatePresence>
        {selectedApi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApi(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-neutral-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">{selectedApi.title}</h2>
                <button
                  onClick={() => setSelectedApi(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-300 mb-4">{selectedApi.description}</p>
              <div className="bg-neutral-900 rounded-lg p-4 mb-4">
                <code className="text-emerald-400">
                  {selectedApi.method} {selectedApi.endpoint}
                </code>
              </div>              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-emerald-300 mb-2">Características</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {selectedApi.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-300 mb-2">Tecnologías</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApi.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-neutral-700 px-2 py-1 rounded text-xs text-gray-300 flex items-center gap-1"
                      >
                        {tech.icon}
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {selectedApi.documentation && (
                  <a
                    href={selectedApi.documentation}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                  >
                    <FaCode className="w-4 h-4" />
                    Ver Documentación
                  </a>
                )}
                {selectedApi.demo && (
                  <a
                    href={selectedApi.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                  >
                    <FaTerminal className="w-4 h-4" />
                    Probar API
                  </a>
                )}
                {selectedApi.github && (
                  <a
                    href={selectedApi.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-700 hover:bg-neutral-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    Ver Código
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ApiPage;
