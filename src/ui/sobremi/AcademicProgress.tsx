'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaBookOpen, FaTrophy } from 'react-icons/fa';
import { CarreraData } from '@/data/sobremi';

interface AcademicProgressProps {
  carrera: CarreraData;
}

const AcademicProgress: React.FC<AcademicProgressProps> = ({ carrera }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mt-20 mb-20"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6"
        >
          <FaGraduationCap className="text-white text-2xl" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Progreso <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">Académico</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Mi trayectoria universitaria en {carrera.carrera}
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 shadow-2xl"
        >
          {/* Header de la carrera */}
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {carrera.carrera}
            </h3>
            <p className="text-gray-400 text-lg">{carrera.universidad}</p>
            <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{carrera.fechaInicio} - {carrera.fechaEstimadaFinalizacion}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTrophy />
                <span className="text-emerald-400 font-semibold">{carrera.estadoActual}</span>
              </div>
            </div>
          </div>

          {/* Barra de progreso principal */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FaBookOpen className="text-emerald-400" />
                <span className="text-white font-semibold">Progreso General</span>
              </div>
              <span className="text-emerald-400 font-bold text-lg">
                {carrera.porcentajeCompletado}%
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-neutral-700 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${carrera.porcentajeCompletado}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.8, ease: [0, 0, 0.58, 1] as [number, number, number, number] }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative overflow-hidden"
                >
                  {/* Efecto de brillo animado */}
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Información de ciclos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-neutral-700/30 rounded-xl p-6 text-center border border-neutral-600/50"
            >
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {carrera.cicloActual}
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                Ciclo Actual
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-neutral-700/30 rounded-xl p-6 text-center border border-neutral-600/50"
            >
              <div className="text-3xl font-bold text-teal-400 mb-2">
                {carrera.ciclosTotales}
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                Ciclos Totales
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-neutral-700/30 rounded-xl p-6 text-center border border-neutral-600/50"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {carrera.ciclosTotales - carrera.cicloActual}
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                Ciclos Restantes
              </div>
            </motion.div>
          </div>

          {/* Visualización de progreso por ciclos */}
          <div className="mt-8">
            <h4 className="text-white font-semibold mb-4 text-center">
              Progreso por Ciclos
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: carrera.ciclosTotales }, (_, i) => i + 1).map((ciclo) => (
                <motion.div
                  key={ciclo}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 1.5 + (ciclo * 0.1),
                    type: "spring" as const,
                    stiffness: 100
                  }}
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold
                    border-2 transition-all duration-300
                    ${ciclo < carrera.cicloActual 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400 text-white shadow-lg' 
                      : ciclo === carrera.cicloActual
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-neutral-700/50 border-neutral-600 text-gray-400'
                    }
                  `}
                >
                  {ciclo}
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded"></div>
                <span className="text-gray-300">Completado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-gray-300">En curso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-neutral-600 rounded"></div>
                <span className="text-gray-300">Pendiente</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AcademicProgress;

