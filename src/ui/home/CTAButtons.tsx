import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaEnvelope } from 'react-icons/fa';

// Variantes de animación optimizadas
const containerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.6, ease: "easeOut" }
  }
};

const primaryGlowVariants = {
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: { 
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const downloadIconVariants = {
  animate: {
    y: [0, -3, 0],
    transition: { 
      duration: 1.5, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const contactGlowVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// URLs y configuraciones estáticas
const LINKS = {
  projects: "/proyectos",
  cv: "https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2",
  contact: "/contacto"
} as const;

const CTAButtons: React.FC = memo(() => {
  // Memoizar las clases CSS para evitar recálculos
  const containerClasses = useMemo(() => 
    "flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8 justify-center md:justify-start",
    []
  );

  const primaryButtonClasses = useMemo(() =>
    "group relative px-6 py-3 bg-neutral-800 border-2 border-emerald-400 text-emerald-300 rounded-lg font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center overflow-hidden z-10",
    []
  );

  const primaryGlowClasses = useMemo(() =>
    "absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-300 opacity-70 blur-lg group-hover:opacity-100 transition-all duration-500",
    []
  );

  const primaryOverlayClasses = useMemo(() =>
    "absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    []
  );

  const secondaryButtonClasses = useMemo(() =>
    "group px-6 py-3 border-2 border-emerald-400/70 text-emerald-300 rounded-lg font-bold hover:bg-emerald-400/10 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-sm shadow-md",
    []
  );

  const contactGlowClasses = useMemo(() =>
    "absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-70 blur-sm",
    []
  );

  const contactButtonClasses = useMemo(() =>
    "relative px-6 py-3 bg-emerald-500 text-neutral-900 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center gap-2",
    []
  );

  // Memoizar los iconos para evitar re-renderizados
  const ArrowIcon = useMemo(() => 
    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />,
    []
  );

  const DownloadIcon = useMemo(() => 
    <FaDownload className="w-4 h-4" />,
    []
  );

  const EnvelopeIcon = useMemo(() => 
    <FaEnvelope className="w-4 h-4" />,
    []
  );  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={containerClasses}
    >
      {/* Botón Principal - Ver Proyectos */}
      <motion.div className="relative group">
        <motion.span 
          variants={primaryGlowVariants}
          className={primaryGlowClasses}
        />
        <a 
          href={LINKS.projects}
          className={primaryButtonClasses}
        >
          <span className="relative z-10">Ver Proyectos</span>
          <motion.div 
            className={primaryOverlayClasses}
            style={{ mixBlendMode: 'overlay' }}
          />
          {ArrowIcon}
        </a>
      </motion.div>
      
      {/* Botón Secundario - Descargar CV */}
      <motion.div className="relative">
        <a 
          href={LINKS.cv}
          className={secondaryButtonClasses}
          target='_blank'
          rel="noopener noreferrer"
        >
          <span>Descargar CV</span>
          <motion.div variants={downloadIconVariants}>
            {DownloadIcon}
          </motion.div>
        </a>
      </motion.div>
      
      {/* Botón de Contacto */}
      <motion.div className="relative">
        <motion.span 
          variants={contactGlowVariants}
          className={contactGlowClasses}
        />
        <a 
          href={LINKS.contact}
          className={contactButtonClasses}
        >
          <span>Contactar</span>
          {EnvelopeIcon}
        </a>
      </motion.div>
    </motion.div>
  );
});

CTAButtons.displayName = 'CTAButtons';

export default CTAButtons;