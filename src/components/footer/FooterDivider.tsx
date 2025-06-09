import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FooterDivider: React.FC = () => {
  const viewportConfig = useMemo(() => ({ 
    once: true 
  }), []);

  const lineVariants = useMemo(() => ({
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1,
      transition: { duration: 0.7, delay: 0.4 }
    }
  }), []);

  const glowVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.8 }
    }
  }), []);

  const dotVariants = useMemo(() => ({
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { duration: 0.4, delay: 1 }
    }
  }), []);

  const dividerContent = useMemo(() => (
    <>
      <motion.div 
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent relative"
      />
      <motion.div
        variants={glowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-2 bg-emerald-400/20 filter blur-xl rounded-full"
      />
      <motion.div
        variants={dotVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-300/30 filter blur-sm rounded-full"
      />
    </>
  ), [lineVariants, glowVariants, dotVariants, viewportConfig]);

  return (
    <div className="relative py-2">
      {dividerContent}
    </div>
  );
};

export default React.memo(FooterDivider);