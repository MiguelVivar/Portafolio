import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

// Variantes de animación optimizadas
const containerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.3, ease: "easeOut" }
  }
};

const underlineVariants = {
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: { delay: 0.5, duration: 0.4, ease: "easeOut" }
  }
};

const waveVariants = {
  animate: {
    rotate: [0, 15, -5, 15, 0],
    scale: [1, 1.2, 1, 1.2, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1.5
    }
  }
};

const textVariants = {
  initial: { opacity: 0, x: -5 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { delay: 0.6, duration: 0.3, ease: "easeOut" }
  }
};

const Greeting: React.FC = memo(() => {
  // Memoizar las clases CSS para evitar recálculos
  const containerClasses = useMemo(() => 
    "text-lg sm:text-xl text-gray-200 mb-1 flex items-center gap-2 justify-center md:justify-start",
    []
  );

  const underlineClasses = useMemo(() =>
    "absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-transparent",
    []
  );

  const waveContainerClasses = useMemo(() =>
    "inline-block p-1 rounded-full shadow-lg",
    []
  );

  const textClasses = useMemo(() =>
    "bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent font-medium",
    []
  );

  // Memoizar las configuraciones de estilo para evitar recreación
  const waveStyle = useMemo(() => ({
    originX: 0.7,
    originY: 0.7
  }), []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={containerClasses}
    >
      <span className="relative">
        ¡Hola! 
        <motion.span 
          variants={underlineVariants}
          initial="initial"
          animate="animate"
          className={underlineClasses}
        />
      </span>
      <motion.div
        variants={waveVariants}
        animate="animate"
        style={waveStyle}
        className={waveContainerClasses}
      >
        👋
      </motion.div>
      <motion.span
        variants={textVariants}
        initial="initial"
        animate="animate"
        className={textClasses}
      >
        Soy      </motion.span>
    </motion.div>
  );
});

Greeting.displayName = 'Greeting';

export default Greeting;