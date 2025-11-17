import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding } from 'react-icons/fa';
import TimelineItem from './TimelineItem';

const TimelineExperience: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/30 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-500"
    >
      {/* Encabezado con efecto de resplandor */}
      <div className="relative mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-20"></div>
        <div className="relative bg-neutral-800 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-lg text-neutral-900 shadow-lg shadow-emerald-500/30 transform rotate-3">
            <FaBriefcase className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Experiencia Profesional</h3>
            <p className="text-gray-400 text-sm">Trayectoria laboral y proyectos</p>
          </div>
        </div>
      </div>
      
      {/* Línea de tiempo con indicadores animados */}
      <div className="relative pl-8 border-l-2 border-emerald-300/30 space-y-10">
        {/* Elementos decorativos en la línea de tiempo */}
        <motion.div 
          className="absolute -left-1.5 top-12 w-3 h-3 rounded-full bg-emerald-300/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -left-1 top-1/3 w-2 h-2 rounded-full bg-emerald-300/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div 
          className="absolute -left-1 bottom-1/3 w-2 h-2 rounded-full bg-emerald-300/30"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        
        {/* Asumarket */}
        <TimelineItem 
          icon={<FaBuilding className="text-emerald-300" />}
          title="Asumarket"
          subtitle="Desarrollador de Software"
          description={
            <>
              - Desarrollo agentes de automatización con n8n para la extracción, transformación y procesamiento de datos provenientes de múltiples fuentes.
              <br /><br />
              - Implemento procesos de scraping masivo, aplicando filtros de metadatos y controles de error para mejorar la precisión y confiabilidad de la información recolectada.
              <br /><br />
              - Construyo pipelines de procesamiento y almacenamiento en buckets, asegurando escalabilidad y disponibilidad de los datos.
              <br /><br />
              - Optimizo flujos repetitivos mediante agentes de IA y automatizaciones, reduciendo significativamente la carga manual y aumentando la eficiencia operativa.
            </>
          }
          date="Agosto 2025 - Presente"
        />
        
        {/* DeployGuru */}
        <TimelineItem 
          icon={<FaBuilding className="text-emerald-300" />}
          title="DeployGuru"
          subtitle="Desarrollador Full Stack Node.js"
          description={
            <>
              - Desarrollé scripts en Node.js para la extracción automatizada de correos y su integración al sistema.
              <br /><br />
              - Implementé procesos de scraping y parsing de correos, con validación de datos y control de errores para garantizar consistencia en la información transferida.
              <br /><br />
              - Diseñé pipelines de procesamiento y almacenamiento en MySQL, asegurando integridad y disponibilidad de la información.
              <br /><br />
              - Desarrollé en Node.js y Express, con autenticación segura mediante JWT y arquitectura modular para facilitar escalabilidad.
              <br /><br />
              - Optimicé procesos repetitivos mediante automatización, reduciendo la carga manual en la gestión de correos y mejorando la eficiencia operativa.
            </>
          }
          date="Agosto 2025 - Octubre 2025"
        />
      </div>
    </motion.div>
  );
};

export default TimelineExperience;