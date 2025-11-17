'use client'

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';
import SocialLinks from './SocialLinks';
import FooterDivider from './FooterDivider';
import FooterCopyright from './FooterCopyright';
import SpotifyNowPlaying from '../SpotifyNowPlaying';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaBriefcase, FaEnvelope, FaServer } from 'react-icons/fa';

interface FooterProps {
  frases: string[];
}

const Footer: React.FC<FooterProps> = ({ frases }) => {
  const enlaces = useMemo(() => [
    { href: '/', label: 'Inicio', icon: FaHome },
    { href: '/sobremi', label: 'Sobre Mí', icon: FaUser },
    { href: '/habilidades', label: 'Habilidades', icon: FaCode },
    { href: '/proyectos', label: 'Proyectos', icon: FaProjectDiagram },
    { href: '/servicios', label: 'Servicios', icon: FaBriefcase },
    { href: '/api', label: 'APIs', icon: FaServer },
    { href: '/contacto', label: 'Contacto', icon: FaEnvelope },
  ], []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  }), []);

  const viewportConfig = useMemo(() => ({ 
    once: true, 
    amount: 0.3 
  }), []);

  const spotifyContainer = useMemo(() => (
    <div className="mb-6">
      <motion.div
        variants={containerVariants}
        className="bg-neutral-800/50 backdrop-blur-sm p-4 rounded-lg border-l-2 border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-shadow duration-300"
      >
        <SpotifyNowPlaying />
      </motion.div>
    </div>
  ), [containerVariants]);

  const socialSection = useMemo(() => (
    <div className="space-y-6">
      {spotifyContainer}
      <SocialLinks />
    </div>
  ), [spotifyContainer]);

  const mainContent = useMemo(() => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={viewportConfig}
      className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10"
    >
      <FooterLogo />
      <FooterNav enlaces={enlaces} />
      {socialSection}
    </motion.div>
  ), [containerVariants, viewportConfig, enlaces, socialSection]);

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {mainContent}
        <FooterDivider />
        <FooterCopyright frases={frases} />
      </div>
    </footer>
  );
};

export default React.memo(Footer);
