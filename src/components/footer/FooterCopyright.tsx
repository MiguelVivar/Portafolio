'use client'

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

interface FooterCopyrightProps {
  frases: string[];
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ frases }) => {
  const anioActual = useMemo(() => new Date().getFullYear(), []);

  const viewportConfig = useMemo(() => ({ 
    once: true 
  }), []);

  const textVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.7 }
    }
  }), []);

  const copyrightVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5 }
    }
  }), []);

  const typewriterContent = useMemo(() => (
    <motion.div
      variants={textVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="mt-3 md:mt-0 italic p-2 border-l-2 border-emerald-500/30 pl-3"
    >
      <TypewriterText phrases={frases} />
    </motion.div>
  ), [frases, textVariants, viewportConfig]);

  const copyrightContent = useMemo(() => (
    <motion.div
      variants={copyrightVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="flex items-center"
    >
      <div className="w-3 h-3 rounded-full bg-emerald-400/70 mr-2 shadow-lg shadow-emerald-400/30" />
      <p>© {anioActual} <span className="text-emerald-300/80 font-medium">Miguel Vivar</span>. Todos los derechos reservados.</p>
    </motion.div>
  ), [anioActual, copyrightVariants, viewportConfig]);

  return (
    <div className="bg-neutral-900/40 backdrop-blur-sm rounded-lg p-4">
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        {typewriterContent}
        {copyrightContent}
      </div>
    </div>
  );
};

export default React.memo(FooterCopyright);