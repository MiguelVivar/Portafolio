import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

// Variantes de animación para el contenedor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  }
};

// Variantes de animación para cada botón
const buttonVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

const NavButtons: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.a 
        href="/"
        className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base inline-flex items-center justify-center gap-2"
        variants={buttonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaHome className="text-xl" />
        Ir al inicio
      </motion.a>
      
      <motion.a 
        href="/proyectos"
        className="px-6 py-3 border-2 border-emerald-300 text-emerald-300 rounded-lg font-bold hover:bg-emerald-300 hover:text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 text-sm sm:text-base inline-flex items-center justify-center gap-2"
        variants={buttonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaProjectDiagram className="text-xl" />
        Ver proyectos
      </motion.a>
      
      <motion.a 
        href="/contacto"
        className="px-6 py-3 bg-emerald-300 text-neutral-800 rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 text-sm sm:text-base inline-flex items-center justify-center gap-2"
        variants={buttonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaEnvelope className="text-xl" />
        Contactar
      </motion.a>
    </motion.div>
  );
};

export default NavButtons;
