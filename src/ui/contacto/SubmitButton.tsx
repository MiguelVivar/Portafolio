import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

interface SubmitButtonProps {
  enviando: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ enviando }) => {
  return (
    <motion.button 
      type="submit"
      disabled={enviando}
      className={`
        w-full sm:w-auto px-8 py-3 
        bg-gradient-to-r from-emerald-500 to-emerald-600 
        hover:from-emerald-600 hover:to-emerald-700 
        text-white font-medium rounded-lg 
        shadow-lg shadow-emerald-600/30 
        flex items-center justify-center gap-2
        transition-all duration-300
        ${enviando ? 'opacity-90 cursor-not-allowed' : 'hover:scale-105'}
      `}
      whileTap={{ scale: 0.98 }}
    >
      {enviando ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enviando...
        </span>
      ) : (
        <>
          <span>Enviar mensaje</span>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "mirror", 
              duration: 1.5,
              ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
              repeatDelay: 1
            }}
          >
            <FaPaperPlane />
          </motion.div>
        </>
      )}
    </motion.button>
  );
};

export default SubmitButton;
