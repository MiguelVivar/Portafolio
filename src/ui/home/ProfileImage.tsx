'use client';

import React, { useState, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaStar } from 'react-icons/fa';
import ProfilePicture from '../../assets/images/perfil.png';
import Image from 'next/image';

// Animation variants extracted for performance optimization
const glowVariants = {
  normal: {
    opacity: [0.4, 0.7, 0.4],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  hovered: {
    opacity: [0.5, 0.8, 0.5],
    scale: [0.98, 1.08, 0.98],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const borderVariants = {
  normal: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  },
  hovered: {
    rotate: 360,
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const secondaryBorderVariants = {
  normal: {
    rotate: -360,
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }
  },
  hovered: {
    rotate: -360,
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    rotate: [-1, 1, -1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const imageScaleVariants = {
  normal: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  hovered: {
    scale: [1, 1.07, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const accentVariants = {
  normal: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.6, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  hovered: {
    scale: [1, 1.3, 1],
    opacity: [0.5, 0.7, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const badgeVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 0.8, 
      duration: 0.5, 
      type: "spring" 
    }
  }
};

const checkIconVariants = {
  normal: {
    scale: [1, 1.2, 1],
    rotateZ: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 6
    }
  },
  hovered: {
    scale: [1, 1.3, 1],
    rotateZ: [0, 15, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

const starVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 1
    }
  },
  exit: { opacity: 0, scale: 0 }
};

const ProfileImage = memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoized CSS classes for performance
  const containerClasses = useMemo(() => 
    "relative", []
  );

  const glowClasses = useMemo(() => 
    "absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/30 to-emerald-300/30 blur-xl", []
  );

  const borderClasses = useMemo(() => 
    "absolute -inset-2 rounded-full border-2 border-dashed border-emerald-400/40", []
  );

  const secondaryBorderClasses = useMemo(() => 
    "absolute -inset-3 rounded-full border border-dotted border-emerald-300/30", []
  );

  const imageContainerClasses = useMemo(() => 
    "relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-emerald-400 shadow-xl shadow-emerald-500/30 transition-all duration-300", []
  );

  const imageClasses = useMemo(() => 
    "object-cover object-center w-full h-full", []
  );

  const accent1Classes = useMemo(() => 
    "absolute -top-1 -right-1 w-10 h-10 bg-emerald-400 rounded-full opacity-50 blur-sm", []
  );

  const accent2Classes = useMemo(() => 
    "absolute -bottom-2 -left-2 w-8 h-8 bg-emerald-400 rounded-full opacity-40 blur-sm", []
  );

  const badgeClasses = useMemo(() => 
    "absolute -bottom-3 -right-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-neutral-900 rounded-full p-3 shadow-lg", []
  );

  const checkIconClasses = useMemo(() => 
    "h-6 w-6", []
  );

  const starClasses = useMemo(() => 
    "absolute top-1/4 left-1/2 text-yellow-300", []
  );

  // Memoized event handlers for performance
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Memoized style objects
  const imageContainerStyle = useMemo(() => ({
    boxShadow: isHovered ? '0 25px 50px -12px rgba(16, 185, 129, 0.6)' : '',
    background: "linear-gradient(120deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)"
  }), [isHovered]);

  const imageStyle = useMemo(() => ({
    filter: isHovered ? 'brightness(1.05) contrast(1.05)' : 'none',
    transition: 'filter 0.5s ease-in-out'
  }), [isHovered]);

  const badgeStyle = useMemo(() => ({
    boxShadow: isHovered ? 
      '0 10px 15px -3px rgba(16, 185, 129, 0.5)' : 
      '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
  }), [isHovered]);

  // Memoized floating dots data
  const floatingDots = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      id: i,
      width: 6 + i * 2,
      height: 6 + i * 2,
      top: 15 + i * 12,
      left: i % 2 === 0 ? -12 : 112,
      className: `absolute rounded-full bg-gradient-to-br from-emerald-${300 + (i % 3) * 100} to-teal-${400 + (i % 2) * 100}`,
      duration: 3 + i,
      delay: i * 0.5
    })), []
  );

  // Memoized stars data
  const starsData = useMemo(() => 
    [...Array(3)].map((_, i) => ({
      id: `star-${i}`,
      x: (i - 1) * 30,
      y: -50 - i * 15,
      delay: i * 0.2,
      size: 3 + i
    })), []
  );
  return (
    <div 
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Efecto de brillo circular con comportamiento mejorado */}
      <motion.div 
        className={glowClasses}
        variants={glowVariants}
        animate={isHovered ? "hovered" : "normal"}
      />
      
      {/* Borde circular giratorio mejorado */}
      <motion.div 
        className={borderClasses}
        variants={borderVariants}
        animate={isHovered ? "hovered" : "normal"}
      />
      
      {/* Secondary rotating border in opposite direction */}
      <motion.div 
        className={secondaryBorderClasses}
        variants={secondaryBorderVariants}
        animate={isHovered ? "hovered" : "normal"}
      />
      
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className={imageContainerClasses}
        style={imageContainerStyle}
      >
        <motion.div
          variants={imageScaleVariants}
          animate={isHovered ? "hovered" : "normal"}
          className="w-full h-full"
        >
          <Image
            src={ProfilePicture.src}
            alt="Foto de perfil de Miguel Vivar"
            className={imageClasses}
            loading="eager"
            style={imageStyle}
            width={300}
            height={300}
          />
        </motion.div>
        
        {/* Enhanced decorative accent shapes */}
        <motion.div 
          className={accent1Classes}
          variants={accentVariants}
          animate={isHovered ? "hovered" : "normal"}
        />
        <motion.div 
          className={accent2Classes}
          variants={accentVariants}
          animate={isHovered ? "hovered" : "normal"}
          transition={{ delay: 1 }}
        />
        
        {/* Verified badge with enhanced animation */}
        <motion.div
          variants={badgeVariants}
          initial="initial"
          animate="animate"
          className={badgeClasses}
          style={badgeStyle}
        >
          <motion.div
            variants={checkIconVariants}
            animate={isHovered ? "hovered" : "normal"}
          >
            <FaCheck className={checkIconClasses} />
          </motion.div>
        </motion.div>
        
        {/* New feature: Floating stars on hover */}
        <AnimatePresence>
          {isHovered && starsData.map((star) => (
            <motion.div
              key={star.id}
              variants={starVariants}
              initial="initial"
              animate={{
                ...starVariants.animate,
                x: [0, star.x],
                y: [-20, star.y],
                transition: {
                  ...starVariants.animate.transition,
                  delay: star.delay
                }
              }}
              exit="exit"
              className={starClasses}
            >
              <FaStar className={`h-${star.size} w-${star.size}`} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Enhanced floating dots decoration with variable sizes and colors */}
      {floatingDots.map((dot) => (
        <motion.div
          key={dot.id}
          className={dot.className}
          style={{
            width: `${dot.width}px`,
            height: `${dot.height}px`,
            top: `${dot.top}%`,
            left: `${dot.left}%`,
            filter: 'blur(1px)'
          }}
          animate={{ 
            y: [0, -15 - dot.id * 2, 0],
            x: dot.id % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            opacity: isHovered ? [0.3, 0.9, 0.3] : [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut"
          }}
        />
      ))}    </div>
  );
});

ProfileImage.displayName = 'ProfileImage';

export default ProfileImage;