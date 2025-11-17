'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SetupData } from '../../data/sobremi';
import SectionTitle from './SectionTitle';

interface SetupSectionProps {
  setupData: SetupData;
}

const SetupSection: React.FC<SetupSectionProps> = ({ setupData }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.58, 1] as [number, number, number, number]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.58, 1] as [number, number, number, number]
      }
    }
  };

  const SetupCard: React.FC<{ item: { titulo: string; descripcion: string; icono: React.ReactNode } }> = ({ item }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
      
      {/* Borde brillante */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Contenido principal */}
      <div className="relative bg-neutral-800/90 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-6 h-full group-hover:border-emerald-500/30 transition-all duration-300">
        {/* Icono */}
        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className="text-white">
            {item.icono}
          </div>
        </div>
        
        {/* Contenido */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
          {item.titulo}
        </h3>
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {item.descripcion}
        </p>
        
        {/* Decoración inferior */}
        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 relative">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10"
      >
        {/* Título de la sección */}
        <motion.div variants={itemVariants}>
          <SectionTitle 
            title="Mi Setup de"
            highlightedText="Desarrollo"
            description="Las herramientas, hardware y metodologías que uso para crear experiencias digitales excepcionales"
          />
        </motion.div>

        {/* Hardware Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              💻 <span className="text-emerald-400">Hardware</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Mi estación de trabajo optimizada para desarrollo y diseño
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {setupData.hardware.map((item, index) => (
              <SetupCard key={index} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Software Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              🛠️ <span className="text-emerald-400">Software</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Las herramientas de software que uso en mi día a día
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {setupData.software.map((item, index) => (
              <SetupCard key={index} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Workflow Section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              ⚡ <span className="text-emerald-400">Workflow</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Metodologías y procesos que sigo para mantener calidad y eficiencia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {setupData.workflow.map((item, index) => (
              <SetupCard key={index} item={item} />
            ))}
          </div>
        </motion.div>

        {/* Decoración adicional */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            Siempre aprendiendo y mejorando mi setup
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SetupSection;
