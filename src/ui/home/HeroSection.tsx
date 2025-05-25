import React, { memo, useMemo } from 'react';
import { motion, MotionValue } from 'framer-motion';
import HeroHeader from './HeroHeader';
import ProfileImage from './ProfileImage';
import TechStack from './TechStack';

// Animation variants extracted for performance optimization
const heroTextVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const profileImageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const decorativeAccentVariants = {
  initial: { width: 0 },
  animate: { 
    width: "40%",
    transition: { delay: 1, duration: 1, ease: "easeOut" }
  }
};

const glowVariants = {
  animate: {
    scale: [0.9, 0.95, 0.9],
    opacity: [0.5, 0.7, 0.5],
    transition: { 
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const borderGlowVariants = {
  animate: {
    boxShadow: [
      "0 0 10px 5px rgba(52, 211, 153, 0.1)",
      "0 0 20px 10px rgba(52, 211, 153, 0.15)",
      "0 0 10px 5px rgba(52, 211, 153, 0.1)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

const techStackVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 0.9, duration: 0.8, ease: "easeOut" }
  }
};

const techCardVariants = {
  whileHover: { 
    scale: 1.01,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

interface HeroSectionProps {
  roles: string[];
  heroTextX: MotionValue<number>;
  heroTextY: MotionValue<number>;
  profileRotateX: MotionValue<number>;
  profileRotateY: MotionValue<number>;
}

const HeroSection = memo<HeroSectionProps>(({ 
  roles, 
  heroTextX, 
  heroTextY, 
  profileRotateX, 
  profileRotateY 
}) => {
  // Memoized CSS classes for performance
  const sectionClasses = useMemo(() => 
    "min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10", 
    []
  );

  const containerClasses = useMemo(() => 
    "w-full max-w-7xl mx-auto py-16 sm:py-24 relative z-10", 
    []
  );

  const gridClasses = useMemo(() => 
    "flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16", 
    []
  );

  const heroTextClasses = useMemo(() => 
    "flex-1 space-y-6 sm:space-y-8 text-center md:text-left relative", 
    []
  );

  const accentBorderClasses = useMemo(() => 
    "absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-60 hidden md:block", 
    []
  );

  const decorativeAccentClasses = useMemo(() => 
    "h-0.5 bg-gradient-to-r from-emerald-300 to-transparent hidden md:block", 
    []
  );

  const profileContainerClasses = useMemo(() => 
    "flex-1 flex justify-center md:justify-end relative", 
    []
  );

  const glowBackgroundClasses = useMemo(() => 
    "absolute inset-0 bg-emerald-400/5 rounded-full blur-2xl transform scale-90", 
    []
  );

  const borderClasses = useMemo(() => 
    "absolute inset-0 rounded-full border-2 border-emerald-300/30", 
    []
  );

  const techStackSectionClasses = useMemo(() => 
    "mt-12 md:mt-16 max-w-5xl mx-auto", 
    []
  );

  const techCardClasses = useMemo(() => 
    "backdrop-blur-sm bg-neutral-800/30 p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-emerald-500/10 transition-shadow duration-500", 
    []
  );

  const techHeaderClasses = useMemo(() => 
    "flex items-center justify-center gap-3 mb-3", 
    []
  );

  const techDividerClasses = useMemo(() => 
    "h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/50", 
    []
  );

  const techDividerReverseClasses = useMemo(() => 
    "h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/50", 
    []
  );

  const techTitleClasses = useMemo(() => 
    "text-center text-emerald-300 font-semibold tracking-wide", 
    []
  );

  // Memoized style objects for profile transform
  const profileStyle = useMemo(() => ({
    rotateX: profileRotateX,
    rotateY: profileRotateY,
    perspective: 1000
  }), [profileRotateX, profileRotateY]);

  const heroTextStyle = useMemo(() => ({
    x: heroTextX,
    y: heroTextY
  }), [heroTextX, heroTextY]);

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        <div className={gridClasses}>
          {/* Hero text section with subtle movement */}
          <motion.div 
            variants={heroTextVariants}
            initial="initial"
            animate="animate"
            style={heroTextStyle}
            className={heroTextClasses}
          >
            {/* Subtle accent border */}
            <div className={accentBorderClasses} />
            
            <HeroHeader roles={roles} />
            
            {/* Additional decorative accent */}
            <motion.div 
              variants={decorativeAccentVariants}
              initial="initial"
              animate="animate"
              className={decorativeAccentClasses}
            />
          </motion.div>

          {/* Profile image section with 3D card effect */}
          <motion.div 
            variants={profileImageVariants}
            initial="initial"
            animate="animate"
            style={profileStyle}
            className={profileContainerClasses}
          >
            {/* Glowing background for profile */}
            <motion.div 
              className={glowBackgroundClasses}
              variants={glowVariants}
              animate="animate"
            />
            
            {/* Animated border */}
            <motion.div 
              className={borderClasses}
              variants={borderGlowVariants}
              animate="animate"
            />
            
            <ProfileImage />
          </motion.div>
        </div>
        
        {/* Floating tech badges at bottom */}
        <motion.div 
          variants={techStackVariants}
          initial="initial"
          animate="animate"
          className={techStackSectionClasses}
        >
          <motion.div 
            variants={techCardVariants}
            whileHover="whileHover"
            className={techCardClasses}
          >
            <div className={techHeaderClasses}>
              <div className={techDividerClasses} />
              <h3 className={techTitleClasses}>Tecnologías que domino</h3>
              <div className={techDividerReverseClasses} />
            </div>
            <TechStack />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;