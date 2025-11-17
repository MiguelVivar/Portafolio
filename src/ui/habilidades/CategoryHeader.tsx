'use client';

import React, { type JSX } from 'react';
import { motion } from 'framer-motion';

interface Habilidad {
  nivel: string;
  // Add other properties you might need
}

interface CategoryHeaderProps {
  categoria: {
    titulo: string;
    icono: JSX.Element;
    habilidades: Habilidad[];
  };
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoria }) => {
  const getTotalHabilidades = () => {
    return categoria.habilidades.length;
  };

  const getNivelCount = (nivel: string) => {
    return categoria.habilidades.filter(h => h.nivel === nivel).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="relative z-10">
        <motion.div 
          className="flex items-center mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center bg-neutral-800 p-3 rounded-lg shadow-md border-l-4 border-emerald-500">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mr-3"
            >
              {categoria.icono}
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                {categoria.titulo}
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" as const, stiffness: 500 }}
                  className="ml-3 bg-emerald-500 text-xs rounded-full px-2 py-1 text-black font-bold"
                >
                  {getTotalHabilidades()}
                </motion.span>
              </h2>
              
              <div className="flex gap-2 mt-1">
                {getNivelCount("Avanzado") > 0 && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs bg-emerald-500/20 text-emerald-300 rounded-full px-2 py-0.5"
                  >
                    {getNivelCount("Avanzado")} Avanzado
                  </motion.span>
                )}
                
                {getNivelCount("Intermedio") > 0 && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs bg-emerald-400/20 text-emerald-300 rounded-full px-2 py-0.5"
                  >
                    {getNivelCount("Intermedio")} Intermedio
                  </motion.span>
                )}
                
                {getNivelCount("Básico") > 0 && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs bg-emerald-300/20 text-emerald-300 rounded-full px-2 py-0.5"
                  >
                    {getNivelCount("Básico")} Básico
                  </motion.span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="h-px bg-gradient-to-r from-emerald-500 via-emerald-300 to-transparent mb-8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default CategoryHeader;
