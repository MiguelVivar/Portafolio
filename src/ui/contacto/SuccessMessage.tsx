'use client'

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface SuccessMessageProps {
  setEnviado: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ setEnviado }) => {
  // Efecto para mostrar confetti cuando se muestre el mensaje de éxito
  useEffect(() => {
    try {
      // Configuración del confetti
      const lanzarConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'],
        });
      };
      
      // Lanzar confetti al mostrar el mensaje
      lanzarConfetti();
      
      // Limpiar el timeout al desmontar
      const timeout = setTimeout(() => {
        lanzarConfetti();
      }, 700);
      
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Error al mostrar el confetti:", error);
      // El componente seguirá funcionando incluso si el confetti falla
    }
  }, []);

  return (
    <motion.div
      className="text-center py-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }}
    >
      <motion.div
        className="w-20 h-20 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <svg 
          className="w-10 h-10 text-emerald-400" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path 
            d="M7.5 13.5L4 10M7.5 13.5L16 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </svg>
      </motion.div>
      
      <motion.h3
        className="text-2xl font-bold text-emerald-300 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        ¡Mensaje enviado con éxito!
      </motion.h3>
      
      <motion.p 
        className="text-gray-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Gracias por contactarme. Te responderé a la brevedad posible.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button 
          onClick={() => setEnviado(false)} 
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:scale-105"
          whileTap={{ scale: 0.98 }}
        >
          Enviar otro mensaje
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessMessage;
