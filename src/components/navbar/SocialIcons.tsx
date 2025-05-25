import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SocialIcons: React.FC = () => {
  // Memoizar la configuración de animación del contenedor
  const containerAnimation = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.8 }
  }), []);

  // Memoizar los datos de los enlaces sociales para evitar recreación
  const socialLinks = useMemo(() => [
    {
      href: "https://github.com/MiguelVivar",
      label: "GitHub",
      icon: FaGithub,
      id: "github"
    },
    {
      href: "https://www.linkedin.com/in/miguel-vivar-farfan/",
      label: "LinkedIn", 
      icon: FaLinkedin,
      id: "linkedin"
    },
    {
      href: "mailto:miguelvivarfarfan@gmail.com",
      label: "Email",
      icon: MdEmail,
      id: "email"
    }
  ], []);

  // Memoizar la clase CSS del enlace para evitar concatenación repetitiva
  const linkClassName = useMemo(() => 
    "hover:text-emerald-300 transition-colors transform hover:scale-110 flex items-center justify-center",
    []
  );

  // Memoizar la clase CSS del icono
  const iconClassName = useMemo(() => "w-7 h-7", []);  return (
    <motion.div
      {...containerAnimation}
      className="flex space-x-6 mt-8 text-gray-400"
    >
      {socialLinks.map(({ href, label, icon: Icon, id }) => (
        <a 
          key={id}
          href={href}
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={label}
          className={linkClassName}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </motion.div>
  );
};

export default React.memo(SocialIcons);