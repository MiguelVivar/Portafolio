import React from 'react';
import { motion } from 'framer-motion';

const ErrorAnimation: React.FC = () => {
  return (
    <motion.div 
      className="w-full max-w-md mx-auto mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <div className="relative h-64 sm:h-80">
        {/* Robot o personaje animado */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-40 h-40 sm:w-48 sm:h-48"
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: [0.42, 0, 0.58, 1] as [number, number, number, number] 
          }}
        >
          <div className="relative h-full w-full">
            {/* Cabeza del robot */}
            <motion.div 
              className="absolute h-20 sm:h-24 w-20 sm:w-24 bg-neutral-800 rounded-2xl top-0 left-1/2 transform -translate-x-1/2 border-2 border-emerald-300 shadow-lg shadow-emerald-300/20"
              animate={{ 
                rotateZ: [-3, 3, -3], 
              }}
              transition={{ repeat: Infinity, duration: 3, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
            >
              {/* Ojos */}
              <div className="absolute flex justify-center space-x-5 w-full top-5">
                <motion.div 
                  className="h-4 w-4 bg-emerald-300 rounded-full"
                  animate={{ 
                    opacity: [1, 0.6, 1],
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 5px 2px rgba(16, 185, 129, 0.4)", 
                      "0 0 8px 3px rgba(16, 185, 129, 0.6)", 
                      "0 0 5px 2px rgba(16, 185, 129, 0.4)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                ></motion.div>
                <motion.div 
                  className="h-4 w-4 bg-emerald-300 rounded-full"
                  animate={{ 
                    opacity: [1, 0.6, 1],
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 5px 2px rgba(16, 185, 129, 0.4)", 
                      "0 0 8px 3px rgba(16, 185, 129, 0.6)", 
                      "0 0 5px 2px rgba(16, 185, 129, 0.4)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", delay: 0.3 }}
                ></motion.div>
              </div>
              
              {/* Antenas */}
              <motion.div 
                className="absolute h-5 w-1.5 bg-emerald-300 -top-4 left-6 rounded-full"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              ></motion.div>
              <motion.div 
                className="absolute h-5 w-1.5 bg-emerald-300 -top-4 right-6 rounded-full"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}
              ></motion.div>
              
              {/* Boca */}
              <motion.div 
                className="absolute h-2 w-10 bg-emerald-300 rounded-md bottom-4 left-1/2 transform -translate-x-1/2"
                animate={{
                  width: ["40px", "24px", "40px"],
                  height: ["8px", "6px", "8px"]
                }}
                transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
              ></motion.div>
            </motion.div>
            
            {/* Cuerpo del robot */}
            <div className="absolute h-16 sm:h-18 w-16 sm:w-18 bg-neutral-800 bottom-10 left-1/2 transform -translate-x-1/2 rounded-xl border-2 border-emerald-300 shadow-lg shadow-emerald-300/20">
              {/* Luz del pecho */}
              <motion.div 
                className="absolute h-6 w-6 bg-emerald-300 rounded-full top-5 left-1/2 transform -translate-x-1/2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 10px 2px rgba(16, 185, 129, 0.5)", 
                    "0 0 20px 8px rgba(16, 185, 129, 0.7)", 
                    "0 0 10px 2px rgba(16, 185, 129, 0.5)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.div>
            </div>
            
            {/* Brazos */}
            <motion.div 
              className="absolute h-2.5 w-10 bg-neutral-700 top-24 -left-2 origin-right border border-emerald-300 rounded-md"
              animate={{ rotate: [-40, -10, -40] }}
              transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
            ></motion.div>
            <motion.div 
              className="absolute h-2.5 w-10 bg-neutral-700 top-24 -right-2 origin-left border border-emerald-300 rounded-md"
              animate={{ rotate: [40, 10, 40] }}
              transition={{ repeat: Infinity, duration: 3, repeatType: "reverse", delay: 0.5 }}
            ></motion.div>
            
            {/* Piernas */}
            <div className="absolute h-8 w-3.5 bg-neutral-700 bottom-0 left-1/3 transform -translate-x-1/2 border border-emerald-300 rounded-md"></div>
            <div className="absolute h-8 w-3.5 bg-neutral-700 bottom-0 right-1/3 transform translate-x-1/2 border border-emerald-300 rounded-md"></div>
          </div>
        </motion.div>
        
        {/* Círculo de base */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-emerald-900/30 rounded-full blur-sm"
          animate={{
            width: ["8rem", "7rem", "8rem"],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorAnimation;
