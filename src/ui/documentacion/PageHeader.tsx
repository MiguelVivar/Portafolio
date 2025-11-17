'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaCode, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { SiSpotify, SiGithub } from 'react-icons/si';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import Link from 'next/link';

interface PageHeaderProps {
  slug: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ slug }) => {
  const getApiInfo = () => {
    switch (slug) {
      case 'spotify':
        return {
          title: 'API Spotify Now Playing',
          subtitle: 'Integración en tiempo real con la API de Spotify',
          description: 'Aprende cómo implementar la funcionalidad para mostrar la música que estoy escuchando actualmente.',
          icon: <SiSpotify className="text-4xl text-green-500" />,
          color: 'from-green-500/20 to-emerald-500/20'
        };
      case 'github':
        return {
          title: 'API GitHub Analytics',
          subtitle: 'Estadísticas y métricas de repositorios en tiempo real',
          description: 'Documentación completa para obtener y mostrar datos de GitHub de forma eficiente.',
          icon: <SiGithub className="text-4xl text-white" />,
          color: 'from-gray-500/20 to-slate-500/20'
        };
      case 'weather':
        return {
          title: 'API OpenWeatherMap',
          subtitle: 'Datos meteorológicos en tiempo real',
          description: 'Integración con OpenWeatherMap para mostrar información del clima actual.',
          icon: <TiWeatherPartlySunny className="text-4xl text-yellow-500" />,
          color: 'from-yellow-500/20 to-orange-500/20'
        };
      default:
        return {
          title: 'Documentación API',
          subtitle: 'Guías y referencias técnicas',
          description: 'Documentación completa de las APIs implementadas en el portafolio.',
          icon: <FaBook className="text-4xl text-emerald-500" />,
          color: 'from-emerald-500/20 to-teal-500/20'
        };
    }
  };

  const apiInfo = getApiInfo();

  return (
    <div className="text-center">
      {/* Navegación de regreso */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-start mb-8"
      >
        <Link 
          href="/api"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:border-emerald-500/50 transition-all duration-300 text-gray-300 hover:text-white group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Volver a APIs</span>
        </Link>
      </motion.div>

      {/* Icono principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" as const, bounce: 0.3 }}
        className="relative mb-6"
      >
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${apiInfo.color} border border-white/10 shadow-2xl`}>
          {apiInfo.icon}
        </div>
        
        {/* Efectos de partículas */}
        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent blur-xl opacity-70 animate-pulse"></div>
      </motion.div>

      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
      >
        <span className="bg-gradient-to-r from-white via-emerald-300 to-teal-400 bg-clip-text text-transparent">
          {apiInfo.title}
        </span>
      </motion.h1>

      {/* Subtítulo */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl md:text-2xl font-semibold text-emerald-400 mb-4"
      >
        {apiInfo.subtitle}
      </motion.h2>

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
      >
        {apiInfo.description}
      </motion.p>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mt-6"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
          <FaCode className="text-xs" />
          API RESTful
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
          <FaBook className="text-xs" />
          Documentación Completa
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium">
          <FaExternalLinkAlt className="text-xs" />
          Ejemplos de Uso
        </span>
      </motion.div>
    </div>
  );
};

export default PageHeader;

