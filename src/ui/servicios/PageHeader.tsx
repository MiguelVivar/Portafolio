'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCode, FiZap, FiUsers, FiAward } from 'react-icons/fi';

const PageHeader: React.FC = () => {
  const stats = [
    { icono: <FiCode className="w-5 h-5" />, valor: '17+', label: 'Servicios' },
    { icono: <FiZap className="w-5 h-5" />, valor: '100%', label: 'Personalizado' },
    { icono: <FiUsers className="w-5 h-5" />, valor: '24/7', label: 'Soporte' },
    { icono: <FiAward className="w-5 h-5" />, valor: '5★', label: 'Calidad' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
        className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-emerald-500/20 text-emerald-400"
      >
        <FiBriefcase className="w-8 h-8" aria-hidden="true" />
      </motion.div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
        Servicios <span className="text-emerald-400">Profesionales</span>
      </h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
      >
        Soluciones tecnológicas de vanguardia para impulsar tu negocio
      </motion.p>

      {/* Estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-lg px-6 py-4 flex items-center gap-3 hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="text-emerald-400">
              {stat.icono}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">
                {stat.valor}
              </div>
              <div className="text-xs text-gray-400">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.header>
  );
};

export default PageHeader;

