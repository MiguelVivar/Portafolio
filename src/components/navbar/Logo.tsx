'use client';

import React, { useState, useCallback, useMemo } from 'react';
import LogoImg from '../../assets/images/logo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
  const [hoverLogo, setHoverLogo] = useState(false);
  
  // Memoizar variants para evitar recreación en cada render
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  // Memoizar animaciones para evitar recreación constante
  const glowVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }), []);

  const rotationAnimation = useMemo(() => ({
    rotate: hoverLogo ? 360 : 0,
    transition: { duration: 1, ease: "easeInOut" }
  }), [hoverLogo]);

  const subtleRotationAnimation = useMemo(() => ({
    animate: { rotate: [0, 5, 0, -5, 0] },
    transition: { 
      duration: 6, 
      repeat: Infinity,
      ease: "easeInOut" 
    }
  }), []);

  const shineAnimation = useMemo(() => ({
    animate: { x: [-100, 100] },
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      repeatType: "loop" as const,
      repeatDelay: 3
    }
  }), []);

  const textColorAnimation = useMemo(() => ({
    color: hoverLogo ? "#6ee7b7" : "#ffffff",
    transition: { duration: 0.3 }
  }), [hoverLogo]);

  const textShadowAnimation = useMemo(() => ({
    textShadow: hoverLogo 
      ? "0 0 8px rgba(110, 231, 183, 0.5)"
      : "0 0 0px rgba(110, 231, 183, 0)",
    transition: { duration: 0.3 }
  }), [hoverLogo]);

  const underlineAnimation = useMemo(() => ({
    scaleX: hoverLogo ? 1 : 0,
    opacity: hoverLogo ? 1 : 0,
    transition: { duration: 0.3 }
  }), [hoverLogo]);

  // Usar useCallback para evitar recreación de handlers
  const handleHoverStart = useCallback(() => {
    setHoverLogo(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoverLogo(false);
  }, []);
  return (
    <motion.div
      variants={itemVariants}
      className="text-emerald-300 font-bold relative z-10"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <Link href="/" className="flex items-center group" aria-label="Inicio">
        <div className="relative">
          {/* Glow effect optimizado */}
          <AnimatePresence mode="wait">
            {hoverLogo && (
              <motion.div 
                {...glowVariants}
                className="absolute -inset-2 bg-emerald-300/20 rounded-full blur-md -z-10"
              />
            )}
          </AnimatePresence>
          
          <motion.div 
            className="relative w-10 h-10 overflow-hidden rounded-full"
            animate={rotationAnimation}
          >
            {/* Subtle rotation animation optimizada */}
            <motion.div {...subtleRotationAnimation}>
              <Image 
                src={LogoImg.src}
                alt="Logo Miguel Vivar" 
                width={40}
                height={40}
                className="object-contain w-full h-full"
                priority
                quality={85}
              />
            </motion.div>
            
            {/* Shine effect optimizado */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              {...shineAnimation}
            />
          </motion.div>
        </div>
        
        <div className="ml-3 hidden sm:block">
          <motion.p 
            className="text-lg font-bold"
            animate={textColorAnimation}
          >
            Miguel <motion.span 
              className="text-emerald-300"
              animate={textShadowAnimation}
            >
              Vivar
            </motion.span>
          </motion.p>
          
          {/* Underline animation optimizada */}
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={underlineAnimation}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default React.memo(Logo);