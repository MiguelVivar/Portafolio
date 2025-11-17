'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

interface Plan {
  nombre: string;
  descripcion: string;
  precio: string;
  caracteristicas: { nombre: string; incluido: boolean }[];
  destacado?: boolean;
  link: string;
}

const planes: Plan[] = [
  {
    nombre: 'Básico',
    descripcion: 'Ideal para emprendedores',
    precio: 'S/ 450',
    link: '/contacto',
    caracteristicas: [
      { nombre: 'Landing Page', incluido: true },
      { nombre: 'Diseño Responsive', incluido: true },
      { nombre: 'SEO Básico', incluido: true },
      { nombre: 'Formulario de Contacto', incluido: true },
      { nombre: 'Google Analytics', incluido: true },
      { nombre: 'Blog', incluido: false },
      { nombre: 'Panel Admin', incluido: false },
      { nombre: 'Integración APIs', incluido: false },
      { nombre: 'Soporte Prioritario', incluido: false },
    ],
  },
  {
    nombre: 'Profesional',
    descripcion: 'Para negocios en crecimiento',
    precio: 'S/ 950',
    link: '/contacto',
    destacado: true,
    caracteristicas: [
      { nombre: 'Sitio Multi-página', incluido: true },
      { nombre: 'Diseño Responsive', incluido: true },
      { nombre: 'SEO Avanzado', incluido: true },
      { nombre: 'Formularios Múltiples', incluido: true },
      { nombre: 'Google Analytics', incluido: true },
      { nombre: 'Blog con CMS', incluido: true },
      { nombre: 'Panel Admin Básico', incluido: true },
      { nombre: 'Integración APIs', incluido: false },
      { nombre: 'Soporte Prioritario', incluido: false },
    ],
  },
  {
    nombre: 'Enterprise',
    descripcion: 'Soluciones a gran escala',
    precio: 'S/ 1800+',
    link: '/contacto',
    caracteristicas: [
      { nombre: 'Aplicación Web Completa', incluido: true },
      { nombre: 'Diseño Responsive', incluido: true },
      { nombre: 'SEO Avanzado', incluido: true },
      { nombre: 'Sistema de Usuarios', incluido: true },
      { nombre: 'Analytics Avanzado', incluido: true },
      { nombre: 'CMS Completo', incluido: true },
      { nombre: 'Panel Admin Avanzado', incluido: true },
      { nombre: 'Integración APIs', incluido: true },
      { nombre: 'Soporte Prioritario 24/7', incluido: true },
    ],
  },
];

const PlanesComparacion: React.FC = () => {
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
          Compara <span className="text-emerald-400">Nuestros Planes</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a las necesidades de tu negocio
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planes.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative bg-neutral-800 rounded-xl p-6 border ${
              plan.destacado
                ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                : 'border-neutral-700'
            }`}
          >
            {/* Badge destacado */}
            {plan.destacado && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  MÁS POPULAR
                </span>
              </div>
            )}

            {/* Header del plan */}
            <div className="text-center mb-6 pb-6 border-b border-neutral-700">
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.nombre}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {plan.descripcion}
              </p>
              <div className="text-4xl font-bold text-emerald-400 mb-1">
                {plan.precio}
              </div>
            </div>

            {/* Lista de características */}
            <ul className="space-y-3 mb-6">
              {plan.caracteristicas.map((caracteristica, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3"
                >
                  {caracteristica.incluido ? (
                    <FiCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <FiX className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-sm ${
                      caracteristica.incluido
                        ? 'text-gray-300'
                        : 'text-gray-600'
                    }`}
                  >
                    {caracteristica.nombre}
                  </span>
                </li>
              ))}
            </ul>

            {/* Botón CTA */}
            <a
              href={plan.link}
              className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                plan.destacado
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-neutral-700 hover:bg-neutral-600 text-white'
              }`}
            >
              Comenzar ahora
            </a>
          </motion.div>
        ))}
      </div>

      {/* Nota adicional */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center text-gray-400 text-sm mt-8"
      >
        ¿Necesitas algo más específico?{' '}
        <a
          href="/contacto"
          className="text-emerald-400 hover:text-emerald-300 font-medium"
        >
          Contáctanos para una cotización personalizada
        </a>
      </motion.p>
    </section>
  );
};

export default PlanesComparacion;
