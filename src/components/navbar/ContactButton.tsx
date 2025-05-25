'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdEmail } from 'react-icons/md';

interface ContactButtonProps {
  isActive: boolean;
}

// Pre-computed animation variants for better performance
const animationVariants = {
  container: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17 
    }
  },
  button: {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  },
  hoverEffect: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  sweepEffect: {
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "linear",
    }
  },
  iconAnimation: {
    transition: { 
      duration: 1, 
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
} as const;

// Memoized particle effects component
const ParticleEffects = memo(() => (
  <motion.div 
    className="absolute inset-0 pointer-events-none"
    initial={animationVariants.hoverEffect.initial}
    animate={animationVariants.hoverEffect.animate}
    exit={animationVariants.hoverEffect.exit}
  >
    <div className="absolute -inset-[100%] h-[500%] w-[200%] rotate-45 z-0">
      <div className="absolute h-2 w-2 rounded-full bg-emerald-300/50 animate-ping top-1/4 left-1/2 delay-75" />
      <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-300/60 animate-ping top-3/4 left-1/4 delay-200" />
      <div className="absolute h-2 w-2 rounded-full bg-emerald-300/40 animate-ping top-2/4 left-3/4" />
    </div>
  </motion.div>
));
ParticleEffects.displayName = 'ParticleEffects';

// Memoized hover background effect
const HoverBackground = memo(() => (
  <motion.div 
    className="absolute inset-0 bg-emerald-300/10"
    initial={animationVariants.hoverEffect.initial}
    animate={animationVariants.hoverEffect.animate}
    exit={animationVariants.hoverEffect.exit}
    transition={animationVariants.hoverEffect.transition}
  />
));
HoverBackground.displayName = 'HoverBackground';

// Memoized sweep effect component
const SweepEffect = memo(() => (
  <motion.div 
    className="absolute -inset-full h-full w-full z-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"
    animate={{
      x: ['200%', '-200%'],
    }}
    transition={animationVariants.sweepEffect.transition}
  />
));
SweepEffect.displayName = 'SweepEffect';

// Memoized icon component
interface AnimatedIconProps {
  isActive: boolean;
  isHovered: boolean;
}

const AnimatedIcon = memo<AnimatedIconProps>(({ isActive, isHovered }) => (
  <motion.div
    className="mr-1.5"
    animate={isHovered && !isActive ? { 
      y: [0, -2, 0, 2, 0], 
      rotate: [0, 5, 0, -5, 0] 
    } : {}}
    transition={isHovered ? animationVariants.iconAnimation.transition : {}}
  >
    <MdEmail className={`w-5 h-5 ${isActive ? 'text-neutral-800' : 'text-emerald-300 group-hover:text-emerald-400'}`} />
  </motion.div>
));
AnimatedIcon.displayName = 'AnimatedIcon';

const ContactButton: React.FC<ContactButtonProps> = memo(({ isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Memoized event handlers to prevent recreation on every render
  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  // Memoized computed styles based on isActive state
  const buttonStyles = useMemo(() => ({
    className: `relative px-4 py-2 text-xl font-bold rounded-lg transition-colors duration-300 flex items-center overflow-hidden group ${
      isActive
        ? 'bg-gradient-to-r from-emerald-400 to-emerald-300 text-neutral-800 shadow-lg shadow-emerald-500/30'
        : 'border-2 border-emerald-300/90 text-emerald-300 hover:border-emerald-300'
    }`,
    ariaCurrent: isActive ? "page" as const : undefined
  }), [isActive]);

  // Memoized text styles
  const textStyles = useMemo(() => 
    isActive ? 'text-neutral-800' : 'text-emerald-300 group-hover:text-emerald-100'
  , [isActive]);

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      initial={animationVariants.container.initial}
      animate={animationVariants.container.animate}
      transition={animationVariants.container.transition}
    >
      <motion.a 
        href="/contacto"
        className={buttonStyles.className}
        aria-current={buttonStyles.ariaCurrent}
        whileHover={animationVariants.button.hover}
        whileTap={animationVariants.button.tap}
      >
        {/* Hover background effect - only render when needed */}
        <AnimatePresence mode="wait">
          {isHovered && !isActive && <HoverBackground key="hover-bg" />}
        </AnimatePresence>
        
        {/* Particle effects - only render when hovered */}
        <AnimatePresence mode="wait">
          {isHovered && <ParticleEffects key="particles" />}
        </AnimatePresence>
        
        {/* Sweep effect - only render when not active */}
        {!isActive && <SweepEffect />}
        
        {/* Content */}
        <div className="relative z-10 flex items-center">
          <AnimatedIcon isActive={isActive} isHovered={isHovered} />
          <span className={textStyles}>
            Contacto
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
});

ContactButton.displayName = 'ContactButton';

export default ContactButton;