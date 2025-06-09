'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GitHubStatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  suffix?: string;
  delay?: number;
  isLoading?: boolean;
}

const GitHubStatsCard: React.FC<GitHubStatsCardProps> = ({
  title,
  value,
  icon,
  color,
  suffix = '',
  delay = 0,
  isLoading = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      className="relative group"
    >
      <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">
        {/* Fondo Gradiente */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Estado de carga */}
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-6 w-6 bg-neutral-700 rounded animate-pulse"></div>
            <div className="h-4 bg-neutral-700 rounded animate-pulse"></div>
            <div className="h-8 bg-neutral-700 rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            {/* Icono */}
            <div className={`inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br ${color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>

            {/* Título */}
            <h3 className="text-sm font-medium text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
              {title}
            </h3>

            {/* Valor */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: delay + 0.3,
                type: "spring",
                stiffness: 200 
              }}
              className="text-2xl sm:text-3xl font-bold text-white"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay + 0.5 }}
              >
                {value.toLocaleString()}
              </motion.span>
              {suffix && (
                <span className="text-lg text-gray-400 ml-1">
                  {suffix}
                </span>
              )}
            </motion.div>

            {/* Animación de barra de progreso */}
            <div className="mt-3 h-1 bg-neutral-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.5, 
                  delay: delay + 0.6,
                  ease: "easeOut" 
                }}
                className={`h-full bg-gradient-to-r ${color} rounded-full`}
              />
            </div>
          </>
        )}

        {/* Efecto de borde al hacer hover */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-emerald-500/20 transition-all duration-300 pointer-events-none"></div>
        
        {/* Efecto de brillo */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

export default GitHubStatsCard;
