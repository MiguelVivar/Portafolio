'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isMenuOpen, toggleMenu } from './store';

const MobileToggle: React.FC = () => {
  const menuOpen = useStore(isMenuOpen);
  const [isHovered, setIsHovered] = useState(false);

  // Memoizar configuraciones de animación para evitar recreación
  const buttonAnimation = useMemo(() => ({
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 }
  }), []);

  const backgroundAnimation = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2 }
  }), []);

  const glowAnimation = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1.2 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 }
  }), []);

  // Memoizar animaciones de las líneas del hamburger
  const topLineAnimation = useMemo(() => ({
    top: menuOpen ? "50%" : "0%",
    rotate: menuOpen ? 45 : 0,
    translateY: menuOpen ? "-50%" : "0%",
    backgroundColor: isHovered ? "#6ee7b7" : menuOpen ? "#6ee7b7" : "#ffffff",
    transition: { duration: 0.3 }
  }), [menuOpen, isHovered]);

  const middleLineAnimation = useMemo(() => ({
    scaleX: menuOpen ? 0 : 1,
    opacity: menuOpen ? 0 : 1,
    backgroundColor: isHovered ? "#6ee7b7" : "#ffffff",
    transition: { duration: 0.3 }
  }), [menuOpen, isHovered]);

  const bottomLineAnimation = useMemo(() => ({
    bottom: menuOpen ? "50%" : "0%",
    rotate: menuOpen ? -45 : 0,
    translateY: menuOpen ? "50%" : "0%",
    backgroundColor: isHovered ? "#6ee7b7" : menuOpen ? "#6ee7b7" : "#ffffff",
    transition: { duration: 0.3 }
  }), [menuOpen, isHovered]);

  // Handlers optimizados con useCallback
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Memoizar aria-label para evitar recálculos
  const ariaLabel = useMemo(() => 
    menuOpen ? "Cerrar menú" : "Abrir menú", 
    [menuOpen]
  );
    return (
    <div className="lg:hidden flex items-center">
      <motion.button
        onClick={toggleMenu}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="relative z-50 focus:outline-none w-12 h-12 flex items-center justify-center rounded-full mr-4"
        {...buttonAnimation}
        aria-label={ariaLabel}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        {/* Fondo animado del botón optimizado */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-300/10"
              {...backgroundAnimation}
            />
          )}
        </AnimatePresence>
        
        {/* Efecto de resplandor en hover optimizado */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-300/5 blur-md -z-10"
              {...glowAnimation}
            />
          )}
        </AnimatePresence>
        
        <div className="relative w-6 h-4">
          {/* Línea superior */}
          <motion.span 
            className="absolute h-0.5 w-6 bg-current rounded-full"
            animate={topLineAnimation}
          />
          
          {/* Línea media */}
          <motion.span 
            className="absolute h-0.5 w-6 bg-current rounded-full top-1/2 -translate-y-1/2"
            animate={middleLineAnimation}
          />
          
          {/* Línea inferior */}
          <motion.span 
            className="absolute h-0.5 w-6 bg-current rounded-full"
            animate={bottomLineAnimation}
          />
        </div>
      </motion.button>
    </div>
  );
};

export default React.memo(MobileToggle);