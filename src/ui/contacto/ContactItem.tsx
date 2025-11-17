import React from 'react';
import { motion } from 'framer-motion';

interface ContactItemProps {
  icono: React.ReactNode;
  titulo: string;
  detalle: string;
  enlace: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icono, titulo, detalle, enlace }) => {
  // Variables de animación para elementos
  const variantesElemento = {
    oculto: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  // Determinar si el elemento debe abrir en una nueva ventana
  const esEnlaceExterno = enlace.startsWith('http') || enlace.startsWith('https');

  return (
    <motion.a
      href={enlace}
      target={esEnlaceExterno ? "_blank" : undefined}
      rel={esEnlaceExterno ? "noopener noreferrer" : undefined}
      variants={variantesElemento}
      className="flex items-start gap-4 p-4 rounded-lg bg-neutral-700/30 border border-neutral-600/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 group w-full"
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mt-1 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 shrink-0">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icono}
        </motion.div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-gray-300 font-medium group-hover:text-emerald-200 transition-colors duration-300">
          {titulo}
        </h3>
        <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300 break-all">
          {detalle}
        </p>
        {esEnlaceExterno && (
          <div className="mt-2 text-xs flex items-center text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Abrir enlace</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </div>
        )}
      </div>
    </motion.a>
  );
};

export default ContactItem;
