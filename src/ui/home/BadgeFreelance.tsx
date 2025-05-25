import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineCheckCircle } from 'react-icons/ai';

// Variantes de animación optimizadas y memoizadas
const badgeVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const iconVariants = {
  animate: {
    scale: [1, 1.15, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const underlineVariants = {
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: { delay: 1, duration: 0.8, ease: "easeOut" }
  }
};

const BadgeFreelance: React.FC = memo(() => {
  // Memoizar las clases CSS para evitar recálculos
  const badgeClasses = useMemo(() => 
    "inline-flex items-center gap-1.5 px-4 py-1 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-400/30 text-emerald-300 text-sm font-medium mb-4 hover:bg-emerald-500/20 transition-colors duration-300 shadow-lg shadow-emerald-700/10",
    []
  );

  const iconClasses = useMemo(() => 
    "text-emerald-400",
    []
  );

  const underlineClasses = useMemo(() =>
    "absolute -bottom-0.5 left-0 right-0 h-px bg-emerald-400/50",
    []
  );

  // Memoizar el componente de icono para evitar re-renderizados
  const CheckIcon = useMemo(() => 
    <AiOutlineCheckCircle className={iconClasses} />,
    [iconClasses]
  );

  return (
    <motion.div
      variants={badgeVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={badgeClasses}
    >
      <motion.span variants={iconVariants}>
        {CheckIcon}
      </motion.span>
      <span className="relative">
        Disponible para proyectos freelance
        <motion.span 
          variants={underlineVariants}
          initial="initial"
          animate="animate"
          className={underlineClasses}
        />
      </span>
    </motion.div>
  );
});

BadgeFreelance.displayName = 'BadgeFreelance';

export default BadgeFreelance;