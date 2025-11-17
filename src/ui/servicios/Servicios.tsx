'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicios, categorias, procesoTrabajo, garantias, faqServicios } from '@/data/servicios';
import PageHeader from './PageHeader';
import ServicioCard from './ServicioCard';
import CallToAction from '@/components/CallToAction';
import { FiMail, FiSearch, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
// import PlanesComparacion from './PlanesComparacion';
// import TestimoniosServicios from './TestimoniosServicios';

const Servicios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [faqAbierto, setFaqAbierto] = useState<number | null>(null);

  // Filtrar servicios según búsqueda y categoría
  const serviciosFiltrados = servicios.filter(servicio => {
    const coincideBusqueda = servicio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const coincideCategoria = categoriaActiva === 'todos' || servicio.categoria === categoriaActiva;
    
    return coincideBusqueda && coincideCategoria;
  });

  const toggleFaq = (index: number) => {
    setFaqAbierto(faqAbierto === index ? null : index);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24 relative">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        <PageHeader />

        {/* Filtros por categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  categoriaActiva === categoria.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white'
                }`}
              >
                {categoria.icono}
                <span className="hidden sm:inline">{categoria.nombre}</span>
                <span className="sm:hidden">{categoria.nombre.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Barra de búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative">
            <FiSearch 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              aria-label="Buscar servicios"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Limpiar búsqueda"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Contador de resultados */}
        {(searchTerm || categoriaActiva !== 'todos') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <p className="text-gray-400">
              {serviciosFiltrados.length === 0 
                ? 'No se encontraron servicios'
                : `${serviciosFiltrados.length} ${serviciosFiltrados.length === 1 ? 'servicio encontrado' : 'servicios encontrados'}`
              }
            </p>
          </motion.div>
        )}

        {/* Grid de servicios */}
        <AnimatePresence mode="wait">
          {serviciosFiltrados.length > 0 ? (
            <motion.section
              key="servicios-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {serviciosFiltrados.map((servicio, index) => (
                <ServicioCard 
                  key={servicio.id} 
                  servicio={servicio} 
                  index={index}
                />
              ))}
            </motion.section>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12 mb-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-neutral-800 text-gray-400">
                <FiSearch className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No se encontraron servicios
              </h3>
              <p className="text-gray-400 mb-4">
                Intenta con otros términos de búsqueda o categoría
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoriaActiva('todos');
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                Ver todos los servicios
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proceso de Trabajo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Cómo <span className="text-emerald-400">trabajamos</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Un proceso estructurado y transparente para garantizar el éxito de tu proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {procesoTrabajo.map((paso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:border-emerald-500 transition-all duration-300 h-full">
                  {/* Número */}
                  <div className="text-5xl font-bold text-emerald-500/20 mb-4">
                    {paso.numero}
                  </div>
                  
                  {/* Icono */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                    {paso.icono}
                  </div>

                  {/* Contenido */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>

                {/* Flecha conectora (solo en desktop) */}
                {index < procesoTrabajo.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-emerald-500 z-10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Garantías */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Garantías y <span className="text-emerald-400">Beneficios</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tu tranquilidad es nuestra prioridad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {garantias.map((garantia, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-linear-to-br from-neutral-800 to-neutral-800/50 rounded-lg p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                  {garantia.icono}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {garantia.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {garantia.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Componentes opcionales - Descomenta para activar */}
        {/* <PlanesComparacion /> */}
        {/* <TestimoniosServicios /> */}

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Preguntas <span className="text-emerald-400">Frecuentes</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Respuestas a las dudas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqServicios.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-700/50 transition-colors duration-300"
                >
                  <span className="font-semibold text-white pr-4">
                    {faq.pregunta}
                  </span>
                  {faqAbierto === index ? (
                    <FiChevronUp className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {faqAbierto === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-gray-400 leading-relaxed border-t border-neutral-700 pt-4">
                        {faq.respuesta}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CallToAction
            title="¿Listo para "
            titlespan="iniciar tu proyecto?"
            description="Contacta conmigo para discutir tus necesidades y encontrar la mejor solución para tu negocio"
            buttonPrimaryText="Solicitar Servicio"
            buttonSecondaryText="Ver Proyectos"
            buttonPrimaryIcon={<FiMail className="w-5 h-5" />}
            buttonSecondaryIcon={<FiSearch className="w-5 h-5" />}
            buttonPrimaryLink="/contacto"
            buttonSecondaryLink="/proyectos"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Servicios;
