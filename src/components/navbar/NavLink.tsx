'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon: Icon, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoizar configuraciones de animación para evitar recreación
  const containerAnimation = useMemo(() => ({
    whileHover: { y: -2 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }), []);

  const backgroundAnimation = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2 }
  }), []);

  const activeGlowAnimation = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  }), []);

  // Memoizar animación del indicador activo
  const indicatorAnimation = useMemo(() => ({
    initial: isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 },
    animate: isActive || isHovered 
      ? { scaleX: 1, opacity: 1 } 
      : { scaleX: 0, opacity: 0 },
    transition: { duration: 0.3 }
  }), [isActive, isHovered]);

  // Memoizar animación del icono
  const iconAnimation = useMemo(() => 
    isHovered ? { 
      y: [0, -1, 0, 1, 0], 
      rotate: [0, 5, 0, -5, 0],
      scale: [1, 1.1, 1, 1.1, 1],
      transition: { 
        duration: 1, 
        repeat: Infinity,
        repeatType: "loop" as const
      }
    } : {},
    [isHovered]
  );

  // Handlers optimizados con useCallback
  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Memoizar clases CSS dinámicas
  const linkClassName = useMemo(() => 
    "relative px-3 py-2 text-xl font-bold group flex items-center z-10",
    []
  );

  const spanClassName = useMemo(() => 
    `transition-colors duration-300 flex items-center ${
      isActive 
        ? 'text-emerald-300' 
        : 'text-gray-400 group-hover:text-emerald-300'
    }`,
    [isActive]
  );

  const iconClassName = useMemo(() => 
    `w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-gray-400 group-hover:text-emerald-300'}`,
    [isActive]
  );

  // Memoizar layoutId para evitar recálculos
  const layoutId = useMemo(() => `top-glow-${href}`, [href]);
    return (
    <motion.div
      className="relative"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      {...containerAnimation}
    >
      {/* Efectos de fondo que no interferirán con el clic - optimizado */}
      <AnimatePresence mode="wait">
        {isHovered && !isActive && (
          <motion.div 
            className="absolute inset-0 bg-emerald-300/5 rounded-lg pointer-events-none"
            {...backgroundAnimation}
          />
        )}
      </AnimatePresence>
      
      {/* Indicador activo mejorado - optimizado */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent rounded-full pointer-events-none"
        {...indicatorAnimation}
      />
      
      {/* Brillo superior en enlaces activos - optimizado */}
      {isActive && (
        <motion.div 
          className="absolute -top-1 left-3 right-3 h-px bg-emerald-300/30 pointer-events-none"
          layoutId={layoutId}
        />
      )}
      
      {/* Efecto de resplandor - optimizado */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            {...activeGlowAnimation}
            className="absolute inset-0 rounded-lg bg-emerald-300/5 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Link principal que ahora puede recibir clics - optimizado */}
      <Link 
        href={href}
        className={linkClassName}
        aria-current={isActive ? "page" : undefined}
      >
        <span className={spanClassName}>
          <motion.div
            animate={iconAnimation}
            className="mr-1.5"
          >
            <Icon className={iconClassName} />
          </motion.div>
          {label}
        </span>
      </Link>
    </motion.div>
  );
};

export default React.memo(NavLink);