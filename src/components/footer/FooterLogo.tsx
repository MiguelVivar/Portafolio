'use client';

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import LogoImg from '../../assets/images/logo.svg';
import Link from 'next/link';
import Image from 'next/image';

const FooterLogo: React.FC = () => {
  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }), []);

  const logoAnimation = useMemo(() => ({
    rotate: [0, 360],
    scale: [1, 1.1],
    transition: { duration: 0.6, ease: "easeInOut" }
  }), []);

  const textAnimation = useMemo(() => ({
    color: ["#ffffff", "#6ee7b7"],
    transition: { duration: 0.3 }
  }), []);

  const arrowAnimation = useMemo(() => ({
    x: [0, 3],
    transition: { duration: 0.3 }
  }), []);

  const handleMouseEnter = useCallback(() => {
    const logoElement = document.querySelector('.logo-container');
    if (logoElement) {
      logoElement.classList.add('hover');
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const logoElement = document.querySelector('.logo-container');
    if (logoElement) {
      logoElement.classList.remove('hover');
    }
  }, []);

  const logoContent = useMemo(() => (
    <motion.div 
      className="relative w-12 h-12 mr-3 logo-container"
      animate={logoAnimation}
    >
      <div className="absolute inset-0 bg-emerald-400/20 rounded-full filter blur-md" />
      <Image 
        src={LogoImg.src}
        alt="Logo Miguel Vivar" 
        className="w-full h-full object-contain relative z-10"
        width={48}
        height={48}
        priority
      />
    </motion.div>
  ), [logoAnimation]);

  const nameContent = useMemo(() => (
    <div>
      <motion.span 
        className="text-2xl font-bold block"
        animate={textAnimation}
      >
        Miguel <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-500">Vivar</span>
      </motion.span>
      <span className="text-xs text-emerald-300/80 font-medium">Desarrollador Full-Stack</span>
    </div>
  ), [textAnimation]);

  const descriptionContent = useMemo(() => (
    <p className="text-gray-300/80 leading-relaxed text-sm backdrop-blur-sm bg-neutral-900/20 p-4 rounded-lg border border-neutral-800/50">
      Desarrollador Full-Stack especializado en crear experiencias web únicas y funcionales,
      combinando diseño atractivo con tecnologías modernas para construir soluciones 
      digitales que causan impacto.
    </p>
  ), []);

  const ctaContent = useMemo(() => (
    <div className="pt-1">
      <a 
        href="/contacto" 
        className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent hover:from-emerald-500 hover:to-emerald-300 transition-all duration-300 group font-medium"
      >
        <span>Trabajemos juntos</span>
        <motion.div animate={arrowAnimation}>
          <FaArrowRight className="w-4 h-4 ml-2 text-emerald-400 group-hover:text-emerald-300" />
        </motion.div>
      </a>
    </div>
  ), [arrowAnimation]);

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-5"
    >
      <Link 
        href="/" 
        className="flex items-center group" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoContent}
        {nameContent}
      </Link>
      {descriptionContent}
      {ctaContent}
    </motion.div>
  );
};

export default React.memo(FooterLogo);