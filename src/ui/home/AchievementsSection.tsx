'use client'

import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCode, FaLightbulb } from 'react-icons/fa';

// Tipos optimizados
interface Achievement {
  id: number;
  iconType: 'trophy' | 'code' | 'lightbulb';
  title: string;
  value: string;
  description: string;
}

// Datos para la sección de logros (optimizado sin JSX elements)
const achievementsData: Achievement[] = [
  {
    id: 1,
    iconType: 'trophy',
    title: "Tercio Superior de la Promoción",
    value: "Ingeniería de Sistemas",
    description: "Primeros puestos en el transcurso de la carrera"
  },
  {
    id: 2,
    iconType: 'code',
    title: "Líneas de Código",
    value: "5K+",
    description: "Código limpio, eficiente y bien documentado"
  },
  {
    id: 3,
    iconType: 'lightbulb',
    title: "Soluciones Innovadoras",
    value: "15+",
    description: "Resolución de problemas complejos con soluciones creativas"
  }
];

// Mapa de iconos para evitar crear elementos JSX repetidamente
const iconMap = {
  trophy: FaTrophy,
  code: FaCode,
  lightbulb: FaLightbulb
} as const;

// Variantes de animación reutilizables
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { 
      delay: 0.2 + index * 0.2, 
      duration: 0.8,
      ease: "easeOut"
    }
  }),
  hover: { 
    y: -5,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const iconVariants = {
  hover: { 
    scale: 1.1,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

const valueVariants = {
  animate: (index: number) => ({
    scale: [1, 1.05, 1],
    transition: { 
      delay: 1 + index * 0.2, 
      duration: 1, 
      repeat: 2,
      ease: "easeInOut"
    }
  })
};

interface AchievementsSectionProps {
  showAchievements: boolean;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = memo(({ showAchievements }) => {
  // Memoizar las variantes de animación del header
  const headerAnimationProps = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 }
  }), []);

  const titleAnimationProps = useMemo(() => ({
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.2, duration: 0.8 }
  }), []);

  const dividerAnimationProps = useMemo(() => ({
    initial: { width: 0 },
    animate: { width: '6rem' },
    transition: { delay: 0.5, duration: 0.8 }
  }), []);

  const descriptionAnimationProps = useMemo(() => ({
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.4, duration: 0.8 }
  }), []);

  return (
    <section className="min-h-[50vh] flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 py-24">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          {...headerAnimationProps}
          className="text-center mb-16"
        >
          <motion.h2 
            {...titleAnimationProps}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Logros
          </motion.h2>
          <motion.div 
            {...dividerAnimationProps}
            className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mb-6 rounded-full"
          />
          <motion.p 
            {...descriptionAnimationProps}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Resultados concretos que demuestran mi compromiso con la excelencia y la innovación en cada proyecto.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementsData.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={index} 
              showAchievements={showAchievements} 
            />
          ))}
        </div>
      </div>
    </section>
  );
});

AchievementsSection.displayName = 'AchievementsSection';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  showAchievements: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = memo(({ achievement, index, showAchievements }) => {
  // Memoizar el componente de icono para evitar re-renderizados
  const IconComponent = useMemo(() => {
    const Icon = iconMap[achievement.iconType];
    return <Icon className="text-emerald-300" />;
  }, [achievement.iconType]);

  // Memoizar las props de animación
  const cardAnimationProps = useMemo(() => ({
    initial: cardVariants.hidden,
    animate: showAchievements ? cardVariants.visible(index) : cardVariants.hidden,
    whileHover: cardVariants.hover,
    custom: index
  }), [showAchievements, index]);

  const iconAnimationProps = useMemo(() => ({
    whileHover: iconVariants.hover,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }), []);

  const valueAnimationProps = useMemo(() => ({
    animate: valueVariants.animate(index),
    custom: index
  }), [index]);

  // Memoizar las clases CSS
  const cardClasses = useMemo(() => 
    "backdrop-blur-sm bg-neutral-800/30 rounded-xl border border-gray-700/30 p-6 flex flex-col items-center text-center hover:bg-neutral-800/50 hover:border-emerald-500/30 transition-all duration-300 shadow-lg",
    []
  );

  const iconContainerClasses = useMemo(() =>
    "w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 text-2xl mb-4 relative",
    []
  );

  const glowClasses = useMemo(() =>
    "absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-300/20 blur-md",
    []
  );

  const accentClasses = useMemo(() =>
    "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent",
    []
  );

  return (
    <motion.div
      {...cardAnimationProps}
      className={cardClasses}
    >
      <motion.div 
        {...iconAnimationProps}
        className={iconContainerClasses}
      >
        {/* Glow effect */}
        <div className={glowClasses} />
        
        {/* Icon */}
        <div className="relative z-10">
          {IconComponent}
        </div>
      </motion.div>
      
      <motion.h3 
        {...valueAnimationProps}
        className="text-xl font-bold text-emerald-300 mb-1"
      >
        {achievement.value}
      </motion.h3>
      
      <h4 className="text-lg font-medium text-white mb-2">
        {achievement.title}
      </h4>
      
      <p className="text-gray-300 text-sm">
        {achievement.description}
      </p>
      
      {/* Decorative accent */}
      <div className={accentClasses} />
    </motion.div>
  );
});

AchievementCard.displayName = 'AchievementCard';

export default AchievementsSection;