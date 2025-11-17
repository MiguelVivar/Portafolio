import React from 'react';
import { motion } from 'framer-motion';

const ErrorHeader: React.FC = () => {
  return (
    <>
      <motion.h1
        className="text-6xl sm:text-8xl font-bold text-white mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.7,
          type: "spring" as const,
          bounce: 0.4
        }}
      >
        ERROR {' '}
        <span className="text-white relative">
          4
          <motion.span 
            className="text-emerald-300 inline-block"
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: [0.42, 0, 0.58, 1] as [number, number, number, number], 
              delay: 1
            }}
          >
            0
          </motion.span>
          4
        </span>
      </motion.h1>
      
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold text-white mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Página no <span className="text-emerald-300">encontrada</span>
      </motion.h2>
    </>
  );
};

export default ErrorHeader;

