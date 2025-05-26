'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import TimelineEducation from './TimelineEducation';
import TimelineExperience from './TimelineExperience';
import { FaGraduationCap, FaBriefcase, FaChevronDown } from 'react-icons/fa';

const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'education' | 'experience'>('both');
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Variantes para animaciones
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-10 mb-20 relative"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute -z-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[120px] top-1/4 left-0 transform -translate-x-1/2"></div>
      <div className="absolute -z-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] bottom-0 right-0 transform translate-x-1/4"></div>
      
      {/* Conectores decorativos verticales */}
      <div className="absolute left-1/2 top-32 bottom-20 w-px bg-gradient-to-b from-emerald-500/30 via-emerald-300/10 to-transparent hidden lg:block"></div>
      
      {/* Título con efectos mejorados */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <SectionTitle title="Mi" highlightedText="Trayectoria" />
        <p className="text-gray-300 text-lg max-w-2xl mx-auto text-center mt-4">
          Un recorrido por mi formación académica y experiencia profesional en el mundo del desarrollo.
        </p>
      </motion.div>
      
      {/* Tabs de navegación */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex justify-center gap-4 mb-10"
      >
        <motion.button
          variants={item}
          onClick={() => setActiveTab('both')}
          className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer ${
            activeTab === 'both' 
              ? 'bg-emerald-500 text-neutral-900 shadow-lg shadow-emerald-500/30' 
              : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
          }`}
        >
          <span>Todo</span>
        </motion.button>
        <motion.button
          variants={item}
          onClick={() => setActiveTab('education')}
          className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer ${
            activeTab === 'education' 
              ? 'bg-emerald-500 text-neutral-900 shadow-lg shadow-emerald-500/30' 
              : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
          }`}
        >
          <FaGraduationCap />
          <span>Educación</span>
        </motion.button>
        <motion.button
          variants={item}
          onClick={() => setActiveTab('experience')}
          className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer ${
            activeTab === 'experience' 
              ? 'bg-emerald-500 text-neutral-900 shadow-lg shadow-emerald-500/30' 
              : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
          }`}
        >
          <FaBriefcase />
          <span>Experiencia</span>
        </motion.button>
      </motion.div>
      
      {/* Contenedor principal con animación */}
      <motion.div
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0.7,
          height: isExpanded ? 'auto' : '250px'
        }}
        transition={{ duration: 0.5 }}
        className={`relative ${!isExpanded && 'overflow-hidden'}`}
      >
        {/* Diseño de timeline mejorado */}
        <div className="grid grid-cols-1 gap-8 relative">
          <div className={`grid ${activeTab === 'both' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8`}>
            {/* Educación */}
            {(activeTab === 'both' || activeTab === 'education') && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className={`${activeTab !== 'both' ? 'lg:mx-auto lg:max-w-2xl w-full' : ''}`}
              >
                <TimelineEducation />
              </motion.div>
            )}
            
            {/* Experiencia */}
            {(activeTab === 'both' || activeTab === 'experience') && (
              <motion.div
                initial={{ opacity: 0, x: activeTab === 'both' ? 30 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className={`${activeTab !== 'both' ? 'lg:mx-auto lg:max-w-2xl w-full' : ''}`}
              >
                <TimelineExperience />
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Gradiente de desvanecimiento cuando está colapsado */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent z-10"></div>
        )}
      </motion.div>
      
      {/* Botón para expandir/colapsar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 flex justify-center"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-emerald-300 hover:text-emerald-400 transition-colors"
        >
          <span>{isExpanded ? 'Mostrar menos' : 'Mostrar más'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown />
          </motion.div>
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Timeline;