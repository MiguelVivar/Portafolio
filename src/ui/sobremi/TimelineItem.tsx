'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description?: string | React.ReactNode;
  date: string;
  link?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  description, 
  date,
  link
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Círculo conector con efecto de pulso */}
      <div className="-left-[25px] top-0 w-4 h-4 bg-emerald-300 rounded-full z-10 shadow-lg shadow-emerald-500/30 relative">
        <motion.div
          animate={{ 
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.7, 0, 0.7] : 0.7
          }}
          transition={{ 
            duration: 1.5, 
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop" 
          }}
          className="absolute inset-0 rounded-full bg-emerald-300/50"
        />
      </div>
      
      {/* Contenido con efectos mejorados */}
      <motion.div
        whileHover={{ 
          scale: 1.02, 
          x: 5,
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.15)' 
        }}
        transition={{ duration: 0.3 }}
        className="bg-neutral-700/70 backdrop-blur-sm p-5 rounded-lg border border-neutral-600/30 hover:border-emerald-500/30 transition-all duration-300 group relative overflow-hidden"
      >
        {/* Gradiente sutil en hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Elemento decorativo */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-300"></div>
        
        <div className="relative z-10">
          {/* Encabezado */}
          <div className="flex items-center gap-3 mb-3">
            <motion.div 
              animate={{ 
                rotate: isHovered ? [0, -10, 0] : 0 
              }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center text-xl bg-neutral-800 border border-emerald-500/20 text-emerald-400 w-10 h-10 rounded-lg group-hover:bg-emerald-500/10 transition-all duration-300"
            >
              {icon}
            </motion.div>
            <motion.h4 
              className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors duration-300"
            >
              {title}
            </motion.h4>
          </div>
          
          {/* Subtítulo */}
          <p className="text-gray-300">{subtitle}</p>
          
          {/* Descripción */}
          {description && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-sm text-gray-400 mt-3 border-l-2 border-emerald-500/30 pl-3"
            >
              {description}
            </motion.p>
          )}
          
          {/* Fecha */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-600/30">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaCalendarAlt className="text-emerald-300/70" />
              <span>{date}</span>
            </div>
            
            {/* Enlace opcional */}
            {link && (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-emerald-300 text-sm flex items-center gap-1 hover:text-emerald-400 transition-colors"
              >
                <span>Ver más</span>
                <FaArrowRight className="text-xs" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineItem;