import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import BadgeFreelance from './BadgeFreelance';
import Greeting from './Greeting';
import TypewriterRole from './TypewriterRole';
import CTAButtons from './CTAButtons';

// Variantes de animación optimizadas
const titleVariants = {
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
    transition: { duration: 0.8, delay: 0.8, ease: "easeOut" }
  }
};

const descriptionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.5, ease: "easeOut" }
  }
};

interface HeroHeaderProps {
  roles: string[];
}

const HeroHeader: React.FC<HeroHeaderProps> = memo(({ roles }) => {
  // Memoizar las clases CSS para evitar recálculos
  const titleClasses = useMemo(() => 
    "text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight",
    []
  );

  const nameSpanClasses = useMemo(() =>
    "text-emerald-400 relative inline-block",
    []
  );

  const underlineClasses = useMemo(() =>
    "absolute -bottom-2 left-0 w-full h-1 bg-emerald-400/70 rounded-full",
    []
  );

  const descriptionClasses = useMemo(() =>
    "text-base sm:text-lg text-gray-300 max-w-2xl mx-auto md:mx-0 leading-relaxed backdrop-blur-sm py-2 border-l-2 border-emerald-500/30 pl-4",
    []
  );

  // Memoizar el contenido de descripción para evitar recrear el string
  const descriptionText = useMemo(() =>
    "Transformo ideas en soluciones digitales innovadoras, combinando diseño atractivo con tecnologías de vanguardia para crear experiencias web que destacan por su funcionalidad, rendimiento y estética.",
    []
  );  return (
    <>
      <BadgeFreelance />
      <Greeting />
      <motion.h1 
        variants={titleVariants}
        initial="initial"
        animate="animate"
        className={titleClasses}
      >
        Miguel <span className={nameSpanClasses}>
          Vivar
          <motion.span 
            variants={underlineVariants}
            initial="initial"
            animate="animate"
            className={underlineClasses}
          />
        </span>
      </motion.h1>
      
      <TypewriterRole roles={roles} />
      
      <motion.p 
        variants={descriptionVariants}
        initial="initial"
        animate="animate"
        className={descriptionClasses}
      >
        {descriptionText}
      </motion.p>
      
      <CTAButtons />
    </>
  );
});

HeroHeader.displayName = 'HeroHeader';

export default HeroHeader;