'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ErrorHeader from './ErrorHeader';
import ErrorDescription from './ErrorDescription';
import NavButtons from './NavButtons';
import ErrorAnimation from './ErrorAnimation';
import AutoRedirect from './AutoRedirect';
import ParticleBackground from './ParticleBackground';

const Error404: React.FC = () => {
  const [showSearch] = useState(false);
  
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24 overflow-hidden relative">
      {/* Fondo de partículas */}
      <ParticleBackground />
      
      {/* Patrón de fondo adicional */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}></div>
      </div>
      
      {/* Contenido principal */}
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          {/* Animación de robot */}
          <ErrorAnimation />
          
          {/* Título y descripción */}
          <motion.div
            className="p-6 rounded-xl backdrop-blur-sm bg-neutral-900/60 max-w-4xl mx-auto border border-emerald-900/30 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ErrorHeader />
            <ErrorDescription />
            
            {/* Campo de búsqueda */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: showSearch ? 'auto' : 0, 
                opacity: showSearch ? 1 : 0 
              }}
              className="overflow-hidden transition-all duration-300 mb-6"
            >
              <div className="mt-6 max-w-md mx-auto">
                <label htmlFor="search" className="sr-only">Buscar en el sitio</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    id="search" 
                    name="search" 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    placeholder="Buscar en el sitio..." 
                    type="search" 
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-300 hover:text-emerald-400"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Botones de navegación */}
            <NavButtons />
            
            {/* Componente de redirección automática */}
            <AutoRedirect />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Elemento decorativo - líneas cybernetisches */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-emerald-900/20 via-emerald-300/30 to-emerald-900/20"></div>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-300/50"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 0%'],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 5,
          ease: [0, 0, 1, 1] as [number, number, number, number]
        }}
        style={{ 
          backgroundSize: '200% 100%',
          backgroundImage: 'linear-gradient(to right, transparent, #10b981, transparent)'
        }}
      ></motion.div>
    </main>
  );
};

export default Error404;
