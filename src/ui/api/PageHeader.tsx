import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaCode, FaRocket, FaShieldAlt } from 'react-icons/fa';

// Variantes de animación optimizadas
const containerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const badgeVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      type: "spring" as const,
      stiffness: 300
    }
  }
};

const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay: 0.2
    }
  }
};

const dividerVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      delay: 0.4
    }
  }
};

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay: 0.6
    }
  }
};

const underlineVariants = {
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: { 
      duration: 0.8, 
      delay: 0.8,
      ease: [0, 0, 0.58, 1] as [number, number, number, number]
    }
  }
};

const PageHeader: React.FC = memo(() => {
  // Memoizar las clases CSS para evitar recálculos
  const badgeClasses = useMemo(() => 
    "bg-emerald-500/10 text-emerald-400 px-5 py-2 rounded-full text-sm font-medium border border-emerald-500/20 backdrop-blur-sm hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/10",
    []
  );

  const titleClasses = useMemo(() =>
    "text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 relative inline-block tracking-tight",
    []
  );

  const underlineClasses = useMemo(() =>
    "absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 rounded-full filter drop-shadow-lg",
    []
  );

  const descriptionClasses = useMemo(() =>
    "text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed backdrop-blur-sm py-3 border-l-2 border-emerald-500/30 pl-6 bg-neutral-800/20 rounded-r-lg",
    []
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mb-16 text-center relative flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute -z-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl top-0 left-1/2 transform -translate-x-1/2" />
      <div className="absolute -z-10 w-96 h-96 bg-teal-500/3 rounded-full blur-3xl top-10 right-0 transform translate-x-1/4" />

      {/* Badge principal con glow effect */}
      <motion.div
        variants={badgeVariants}
        className="inline-block mb-6 relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-20" />
        <span className={badgeClasses}>
          <FaServer className="w-4 h-4" />
          APIs & Servicios Web
          <motion.div
            className="absolute -inset-2 border border-emerald-300/20 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1] as [number, number, number, number]
            }}
          />
        </span>
      </motion.div>

      {/* Título principal con efectos mejorados */}
      <motion.h1 
        variants={titleVariants}
        className={titleClasses}
      >
        <span className="relative">
          Documentación de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-300">
            APIs
          </span>
          <motion.span 
            variants={underlineVariants}
            className={underlineClasses}
          />
        </span>
      </motion.h1>
      
      {/* Separador decorativo con múltiples elementos */}
      <motion.div 
        variants={dividerVariants}
        className="flex items-center justify-center mb-8 gap-4"
      >
        <motion.span 
          className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        
        <motion.div 
          className="flex items-center gap-3 bg-neutral-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
        >
          <FaCode className="text-emerald-400 w-4 h-4" />
          <FaRocket className="text-emerald-300 w-4 h-4" />
          <FaShieldAlt className="text-emerald-400 w-4 h-4" />
        </motion.div>
        
        <motion.span 
          className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>

      {/* Descripción mejorada con highlights */}
      <motion.p 
        variants={descriptionVariants}
        className={descriptionClasses}
      >
        Explora la documentación completa de las{" "}
        <span className="text-emerald-300 font-semibold relative">
          APIs y servicios web
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-300/30 rounded-full" />
        </span>{" "}
        que he desarrollado. Desde{" "}
        <span className="text-gray-200 font-medium">integraciones simples</span>{" "}
        hasta{" "}
        <span className="text-gray-200 font-medium">arquitecturas complejas</span>,
        cada endpoint está diseñado para ser{" "}
        <span className="text-emerald-200 font-medium">eficiente</span>,{" "}
        <span className="text-emerald-200 font-medium">seguro</span> y{" "}
        <span className="text-emerald-200 font-medium">fácil de usar</span>.
      </motion.p>

      {/* Elemento decorativo inferior */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-8 flex justify-center"
      >
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-300/60 rounded-full blur-sm" />
        </div>
      </motion.div>
    </motion.div>
  );
});

PageHeader.displayName = 'PageHeader';

export default PageHeader;



