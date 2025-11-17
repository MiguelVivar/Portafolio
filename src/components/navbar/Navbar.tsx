'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isMenuOpen, isScrolled, setupScrollDetection } from './store';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import DesktopMenu from './DesktopMenu';
import MobileToggle from './MobileToggle';
import MobileMenu from './MobileMenu';
import GlobalSearch from '@/components/search/GlobalSearch';
import { FaHome, FaUser, FaProjectDiagram, FaCode, FaBriefcase } from 'react-icons/fa';

const Navbar: React.FC = () => {
  // Usar los estados globales
  const menuOpen = useStore(isMenuOpen);
  const scrolled = useStore(isScrolled);
  // Controles para animaciones adicionales
  const controls = useAnimation();
  // Efecto de hover para la barra
  const [hovered, setHovered] = useState(false);
  // Obtener la ruta actual usando el hook de Next.js
  const pathname = usePathname();
  
  // Memoizar array de enlaces para evitar recreación
  const links = useMemo(() => [
    { href: '/', label: 'Inicio', icon: FaHome },
    { href: '/sobremi', label: 'Sobre Mí', icon: FaUser },
    { href: '/habilidades', label: 'Habilidades', icon: FaCode },
    { href: '/proyectos', label: 'Proyectos', icon: FaProjectDiagram },
    { href: '/servicios', label: 'Servicios', icon: FaBriefcase }
  ], []);

  // Memoizar la ruta normalizada
  const normalizedPath = useMemo(() => 
    pathname.endsWith('/') && pathname !== '/' 
      ? pathname.slice(0, -1)
      : pathname,
    [pathname]
  );

  // Memoizar variantes de animación
  const navVariants = useMemo(() => ({
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }), []);

  // Memoizar configuraciones de animación del scroll
  const scrollAnimationConfig = useMemo(() => ({
    scrolled: {
      scale: 0.99,
      transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 }
    },
    notScrolled: {
      scale: 1,
      transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 25 }
    }
  }), []);

  // Memoizar animación del brillo inferior
  const bottomGlowAnimation = useMemo(() => ({
    initial: { scaleX: 0, opacity: 0 },
    animate: { scaleX: 1, opacity: 1 },
    exit: { scaleX: 0, opacity: 0 },
    transition: { duration: 0.4 }
  }), []);

  // Memoizar clases CSS dinámicas
  const navClassName = useMemo(() => 
    `relative rounded-xl border transition-all duration-500 ${
      scrolled 
        ? 'border-neutral-800/70 bg-gradient-to-b from-neutral-900/95 to-neutral-900/90 backdrop-blur-md shadow-lg shadow-emerald-500/10' 
        : 'border-neutral-800/40 bg-gradient-to-b from-neutral-900/80 to-neutral-900/70 backdrop-blur-sm'
    } ${hovered ? 'shadow-xl shadow-emerald-500/20' : ''}`,
    [scrolled, hovered]
  );

  const topGlowClassName = useMemo(() => 
    `absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent transition-opacity duration-300 ${
      scrolled ? 'opacity-90' : 'opacity-40'
    }`,
    [scrolled]
  );

  // Handlers optimizados con useCallback
  const handleHoverStart = useCallback(() => {
    setHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHovered(false);
  }, []);
  // Configurar detección de scroll (optimizado)
  useEffect(() => {
    const cleanup = setupScrollDetection();
    return cleanup;
  }, []);

  // Efecto optimizado para animar la barra cuando se hace scroll
  useEffect(() => {
    const config = scrolled ? scrollAnimationConfig.scrolled : scrollAnimationConfig.notScrolled;
    controls.start(config);
  }, [scrolled, controls, scrollAnimationConfig]);

  // Efecto optimizado para eventos custom de menú
  useEffect(() => {
    const event = new CustomEvent('menu-toggle', { 
      detail: { isOpen: menuOpen }
    });
    document.dispatchEvent(event);
  }, [menuOpen]);

  const navContent = useMemo(() => (
    <div className="max-w-360 mx-auto px-4 lg:px-6">
      <div className="flex items-center justify-between h-16">
        <Logo />
        <DesktopMenu links={links} currentPath={normalizedPath} />
        <GlobalSearch />
        <MobileToggle />
      </div>
      
      <MobileMenu 
        links={links} 
        currentPath={normalizedPath}
        isOpen={menuOpen} 
      />
    </div>
  ), [links, normalizedPath, menuOpen]);

  const bottomGlow = useMemo(() => (
    <AnimatePresence mode="wait">
      {hovered && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent"
          {...bottomGlowAnimation}
        />
      )}
    </AnimatePresence>
  ), [hovered, bottomGlowAnimation]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.nav 
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className={navClassName}
      >
        {/* Efecto de brillo en la parte superior optimizado */}
        <div className={topGlowClassName}></div>
        
        {navContent}
        
        {bottomGlow}
      </motion.nav>
    </motion.div>
  );
};

export default React.memo(Navbar);