'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiUser } from 'react-icons/fi';

interface Testimonio {
  nombre: string;
  empresa: string;
  cargo: string;
  testimonio: string;
  servicio: string;
  rating: number;
  avatar?: string;
}

const testimonios: Testimonio[] = [
  {
    nombre: 'Carlos Rodríguez',
    empresa: 'TechStart Solutions',
    cargo: 'CEO',
    testimonio: 'Excelente trabajo en nuestra landing page. La velocidad de carga y el diseño superaron nuestras expectativas. El SEO implementado ha mejorado significativamente nuestra visibilidad.',
    servicio: 'Landing Page',
    rating: 5,
  },
  {
    nombre: 'María González',
    empresa: 'Digital Marketing Pro',
    cargo: 'Directora de Marketing',
    testimonio: 'La automatización con IA que implementaron nos ha ahorrado más de 20 horas semanales. El ROI fue visible en el primer mes. Altamente recomendado para empresas que buscan eficiencia.',
    servicio: 'Automatización con IA',
    rating: 5,
  },
  {
    nombre: 'Luis Fernández',
    empresa: 'E-Commerce Plus',
    cargo: 'Fundador',
    testimonio: 'Migraron nuestra infraestructura a la nube sin ningún downtime. El proceso fue transparente y profesional. Los costos de hosting se redujeron un 40%.',
    servicio: 'Migración Cloud',
    rating: 5,
  },
  {
    nombre: 'Ana Martínez',
    empresa: 'Consultora Empresarial',
    cargo: 'Gerente General',
    testimonio: 'El sitio corporativo que desarrollaron refleja perfectamente nuestra marca. El panel de administración es intuitivo y la capacitación fue excelente. Muy satisfechos.',
    servicio: 'Sitio Web Corporativo',
    rating: 5,
  },
];

const TestimoniosServicios: React.FC = () => {
  const [testimonioActual, setTestimonioActual] = useState(0);

  const siguiente = () => {
    setTestimonioActual((prev) => (prev + 1) % testimonios.length);
  };

  const anterior = () => {
    setTestimonioActual((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Lo que dicen <span className="text-emerald-400">nuestros clientes</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Testimonios reales de empresas que han confiado en nuestros servicios
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Testimonio principal */}
        <div className="bg-neutral-800 rounded-xl p-8 md:p-12 border border-neutral-700 min-h-[350px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonioActual}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonios[testimonioActual].rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonio */}
              <blockquote className="text-gray-300 text-lg leading-relaxed mb-8 flex-1">
                &ldquo;{testimonios[testimonioActual].testimonio}&rdquo;
              </blockquote>

              {/* Info del cliente */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <FiUser className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">
                    {testimonios[testimonioActual].nombre}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonios[testimonioActual].cargo} en{' '}
                    {testimonios[testimonioActual].empresa}
                  </div>
                  <div className="text-emerald-400 text-xs font-medium mt-1">
                    Servicio: {testimonios[testimonioActual].servicio}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles de navegación */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={anterior}
            className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 hover:border-emerald-500 text-white hover:text-emerald-400 transition-all duration-300 flex items-center justify-center"
            aria-label="Testimonio anterior"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          {/* Indicadores */}
          <div className="flex gap-2">
            {testimonios.map((_, index) => (
              <button
                key={index}
                onClick={() => setTestimonioActual(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === testimonioActual
                    ? 'bg-emerald-400 w-8'
                    : 'bg-neutral-700 hover:bg-neutral-600'
                }`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={siguiente}
            className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 hover:border-emerald-500 text-white hover:text-emerald-400 transition-all duration-300 flex items-center justify-center"
            aria-label="Siguiente testimonio"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimoniosServicios;
