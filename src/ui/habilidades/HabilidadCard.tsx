'use client'

import React, { useState, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HabilidadProgressBar from './HabilidadProgressBar';
import SkillLevel from './SkillLevel';
import { obtenerDescripcionNivel } from '../../data/habilidades';
import { FiPlus, FiMinus, FiExternalLink, FiCheck } from 'react-icons/fi';

// Tipo para la habilidad
interface Habilidad {
  nombre: string;
  nivel: string;
  icono: JSX.Element;
  descripcion?: string;
  proyectosRelacionados?: string[];
  recursos?: {
    nombre: string;
    url: string;
  }[];
}

interface HabilidadCardProps {
  habilidad: Habilidad;
  index: number;
}

const HabilidadCard: React.FC<HabilidadCardProps> = ({ habilidad, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Lista de ejemplos de proyectos si no se proporcionan específicamente
  const proyectosEjemplo = [
    "Portfolio Web",
    "Administrador de Tareas",
    "E-commerce",
    "App de Notas"
  ];

  // Lista de recursos de aprendizaje genéricos si no se proporcionan específicamente
  const recursosEjemplo = [
    { nombre: "Documentación oficial", url: "#" },
    { nombre: "Tutorial básico", url: "#" }
  ];

  // Seleccionar algunos proyectos de ejemplo si no hay específicos
  const proyectosMostrados = habilidad.proyectosRelacionados || 
                            proyectosEjemplo.slice(0, 2 + (index % 2));
  
  // Seleccionar recursos de ejemplo si no hay específicos
  const recursosMostrados = habilidad.recursos || recursosEjemplo;

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: "spring",
            duration: 0.5,
          }
        }
      }}
      className={`bg-neutral-800 p-6 rounded-lg border-t-2 border-emerald-300 group relative overflow-hidden transition-all duration-300 ${
        isExpanded ? "shadow-xl shadow-emerald-500/30" : "hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105"
      }`}
      whileHover={{ 
        y: isExpanded ? 0 : -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: isExpanded ? 1 : 0.98 }}
    >
      {/* Efecto de brillo */}
      <motion.div 
        className="absolute -inset-full h-full w-full z-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
        animate={{
          x: ['200%', '-200%'],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Efecto de resplandor al pasar el ratón */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isExpanded 
          ? "from-emerald-500/10 to-emerald-500/5" 
          : "from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10"
        } transition-all duration-500 rounded-lg`}></div>
      
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ 
          duration: 0.3,
          delay: index * 0.1,
          ease: "easeOut"
        }}
      >
        <motion.div 
          className="flex justify-between items-center mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 + (index * 0.1) }}
        >
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2">
            <motion.span 
              className="text-emerald-300 text-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2 + (index * 0.1),
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              {habilidad.icono}
            </motion.span>
            {habilidad.nombre}
          </h3>
          
          <SkillLevel nivel={habilidad.nivel} index={index} />
        </motion.div>
        
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + (index * 0.1) }}
        >
          {habilidad.descripcion || obtenerDescripcionNivel(habilidad.nivel)}
        </motion.p>
        
        {/* Barra de progreso de habilidad */}
        <HabilidadProgressBar nivel={habilidad.nivel} index={index} />
        
        {/* Botón para expandir/contraer */}
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full mt-4 py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-all cursor-pointer ${
            isExpanded 
              ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30" 
              : "bg-neutral-700/50 text-gray-300 hover:bg-neutral-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? (
            <>
              <FiMinus size={16} />
              <span>Ver menos</span>
            </>
          ) : (
            <>
              <FiPlus size={16} />
              <span>Ver más detalles</span>
            </>
          )}
        </motion.button>
        
        {/* Contenido expandido */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 border-t border-neutral-700 pt-4"
            >
              {/* Proyectos relacionados */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Proyectos relacionados
                </h4>
                <ul className="pl-4 space-y-1">
                  {proyectosMostrados.map((proyecto, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-gray-400 text-sm flex items-center"
                    >
                      <FiCheck className="text-emerald-400 mr-2" size={12} />
                      {proyecto}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Recursos de aprendizaje */}
              <div>
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  Recursos
                </h4>
                <ul className="pl-4 space-y-2">
                  {recursosMostrados.map((recurso, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <a 
                        href={recurso.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center group"
                      >
                        <FiExternalLink className="mr-1 group-hover:translate-x-0.5 transition-transform" size={12} />
                        {recurso.nombre}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default HabilidadCard;