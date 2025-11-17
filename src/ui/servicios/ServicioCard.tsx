'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Servicio } from '@/data/servicios';
import { FiStar, FiClock, FiCheck, FiX, FiArrowRight } from 'react-icons/fi';

interface ServicioCardProps {
  servicio: Servicio;
  index: number;
}

const ServicioCard: React.FC<ServicioCardProps> = ({ servicio, index }) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.05,
          type: "spring" as const,
          stiffness: 100
        }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.2 }
        }}
        className={`bg-neutral-800 rounded-lg p-6 border-l-4 ${
          servicio.destacado 
            ? 'border-emerald-400 shadow-lg shadow-emerald-500/10' 
            : 'border-neutral-700'
        } hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 relative group cursor-pointer`}
        onClick={() => setModalAbierto(true)}
      >
        {/* Badge de destacado */}
        {servicio.destacado && (
          <div className="absolute top-4 right-4">
            <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <FiStar className="w-3 h-3" aria-hidden="true" />
              <span>Destacado</span>
            </div>
          </div>
        )}

        {/* Icono del servicio */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="shrink-0 w-14 h-14 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300"
            role="img"
            aria-label={`Icono de ${servicio.titulo}`}
          >
            {servicio.icono}
          </motion.div>
        </div>

        {/* Título del servicio */}
        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
          {servicio.titulo}
        </h2>

        {/* Descripción */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 min-h-16">
          {servicio.descripcion}
        </p>

        {/* Tiempo de entrega */}
        {servicio.tiempoEntrega && (
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
            <FiClock className="w-4 h-4" />
            <span>{servicio.tiempoEntrega}</span>
          </div>
        )}

        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-700">
          <span className="text-2xl font-bold text-emerald-400">
            {servicio.precio}
          </span>
          <button className="text-emerald-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300">
            Ver más
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Efecto de brillo al hacer hover */}
        <motion.div 
          className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0, 0, 1, 1] as [number, number, number, number],
          }}
        />
      </motion.article>

      {/* Modal con información detallada */}
      <AnimatePresence>
        {modalAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setModalAbierto(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring" as const, duration: 0.5 }}
              className="bg-neutral-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="sticky top-0 bg-neutral-900 border-b border-neutral-700 p-6 flex items-start justify-between z-10">
                <div className="flex items-start gap-4 flex-1">
                  <div className="shrink-0 w-14 h-14 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    {servicio.icono}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {servicio.titulo}
                    </h3>
                    {servicio.destacado && (
                      <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                        <FiStar className="w-3 h-3" />
                        Destacado
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setModalAbierto(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  aria-label="Cerrar modal"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 space-y-6">
                {/* Descripción larga */}
                {servicio.descripcionLarga && (
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      {servicio.descripcionLarga}
                    </p>
                  </div>
                )}

                {/* Precio y tiempo */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-neutral-800 rounded-lg px-6 py-4 flex-1 min-w-[200px]">
                    <div className="text-gray-400 text-sm mb-1">Precio</div>
                    <div className="text-2xl font-bold text-emerald-400">
                      {servicio.precio}
                    </div>
                  </div>
                  {servicio.tiempoEntrega && (
                    <div className="bg-neutral-800 rounded-lg px-6 py-4 flex-1 min-w-[200px]">
                      <div className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        Tiempo de entrega
                      </div>
                      <div className="text-xl font-bold text-white">
                        {servicio.tiempoEntrega}
                      </div>
                    </div>
                  )}
                </div>

                {/* Características */}
                {servicio.caracteristicas && servicio.caracteristicas.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">
                      Características principales
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {servicio.caracteristicas.map((caracteristica, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <FiCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm">{caracteristica}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Incluye */}
                {servicio.incluye && servicio.incluye.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">
                      ¿Qué incluye?
                    </h4>
                    <div className="bg-neutral-800 rounded-lg p-4 space-y-2">
                      {servicio.incluye.map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <FiCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Beneficios */}
                {servicio.beneficios && servicio.beneficios.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">
                      Beneficios
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {servicio.beneficios.map((beneficio, idx) => (
                        <div 
                          key={idx}
                          className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 flex items-start gap-2"
                        >
                          <FiCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botón de acción */}
                <div className="pt-4 border-t border-neutral-700">
                  <a
                    href="/contacto"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Solicitar este servicio
                    <FiArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServicioCard;

