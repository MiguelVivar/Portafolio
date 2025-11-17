import React from 'react';
import { motion } from 'framer-motion';

interface ValorData {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

interface ValueCardProps {
  valor: ValorData;
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ valor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)"
      }}
      className="bg-neutral-800 p-6 rounded-lg border-t-2 border-emerald-300 transition-all flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 bg-emerald-300/10 rounded-full flex items-center justify-center mb-4 text-emerald-300">
        {valor.icono}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">{valor.titulo}</h3>
      
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-300">{valor.descripcion}</p>
      </motion.div>
      
      <motion.div 
        className="w-16 h-1 bg-emerald-300/30 rounded-full mt-4"
        animate={{ 
          width: ["30%", "80%", "30%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number]
        }}
      />
    </motion.div>
  );
};

export default ValueCard;