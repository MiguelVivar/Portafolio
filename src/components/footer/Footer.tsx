'use client'

import React from 'react';
import { motion } from 'framer-motion';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';
import SocialLinks from './SocialLinks';
import FooterDivider from './FooterDivider';
import FooterCopyright from './FooterCopyright';
import SpotifyNowPlaying from '../SpotifyNowPlaying';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaServer } from 'react-icons/fa';

interface FooterProps {
  frases: string[];
}
export default function Footer({ frases }: FooterProps) {  // Enlaces para el footer
  const enlaces = [
    { href: '/', label: 'Inicio', icon: FaHome },
    { href: '/sobremi', label: 'Sobre Mí', icon: FaUser },
    { href: '/habilidades', label: 'Habilidades', icon: FaCode },
    { href: '/proyectos', label: 'Proyectos', icon: FaProjectDiagram },
    { href: '/api', label: 'APIs', icon: FaServer },
    { href: '/contacto', label: 'Contacto', icon: FaEnvelope },
  ];

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10"
        >
          {/* Logo y descripción */}
          <FooterLogo />
          
          {/* Enlaces rápidos */}
          <FooterNav enlaces={enlaces} />
          
          {/* Sección de Spotify y redes sociales */}
          <div className="space-y-6">
            {/* Spotify Now Playing */}
            <div className="mb-6">
              <motion.div
                variants={containerVariants}
                className="bg-neutral-800/50 backdrop-blur-sm p-4 rounded-lg border-l-2 border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-shadow duration-300"
              >
                <SpotifyNowPlaying />
              </motion.div>
            </div>
            
            {/* Redes sociales */}
            <SocialLinks />
          </div>
        </motion.div>

        {/* Línea divisoria */}
        <FooterDivider />

        {/* Copyright y créditos */}
        <FooterCopyright frases={frases} />
      </div>
    </footer>
  );
}
