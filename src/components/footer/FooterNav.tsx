import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { IconType } from 'react-icons';

interface NavEnlace {
  href: string;
  label: string;
  icon: IconType;
}

interface FooterNavProps {
  enlaces: NavEnlace[];
}

const FooterNav: React.FC<FooterNavProps> = ({ enlaces }) => {
  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }), []);

  const underlineVariants = useMemo(() => ({
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { duration: 0.5, delay: 0.5 }
    }
  }), []);

  const viewportConfig = useMemo(() => ({ 
    once: true 
  }), []);

  const linkVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -10 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.3, 
        delay: 0.2 + (index * 0.05) 
      }
    })
  }), []);

  const iconVariants = useMemo(() => ({
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.2 }
    }
  }), []);

  const navLinks = useMemo(() => (
    <ul className="space-y-3 bg-neutral-900/30 backdrop-blur-sm p-4 rounded-lg border-l-2 border-emerald-500/40">
      {enlaces.map((enlace, index) => {
        const Icon = enlace.icon;
        
        return (
          <motion.li 
            key={enlace.href}
            custom={index}
            variants={linkVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="transform transition-transform duration-300 hover:translate-x-1"
          >
            <Link 
              href={enlace.href} 
              className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group"
            >
              <motion.div 
                className="mr-3 p-2 bg-neutral-800/80 rounded-md text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300"
                variants={iconVariants}
                whileHover="hover"
              >
                <Icon className="w-4 h-4" />
              </motion.div>
              <span className="font-medium">
                {enlace.label}
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  ), [enlaces, linkVariants, viewportConfig, iconVariants]);

  const titleContent = useMemo(() => (
    <h3 className="text-lg font-bold text-white relative inline-block">
      Enlaces Rápidos
      <motion.span 
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300"
        variants={underlineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      />
    </h3>
  ), [underlineVariants, viewportConfig]);

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-5"
    >
      {titleContent}
      {navLinks}
    </motion.div>
  );
};

export default React.memo(FooterNav);