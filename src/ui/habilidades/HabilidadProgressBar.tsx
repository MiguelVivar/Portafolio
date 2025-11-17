import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  nivel: string;
  index: number;
}

const HabilidadProgressBar: React.FC<ProgressBarProps> = ({ nivel, index }) => {
  // Determinar el color y el ancho de la barra según el nivel
  const getProgressColor = (nivel: string) => {
    switch (nivel) {
      case 'Experto': return 'bg-emerald-300';
      case 'Avanzado': return 'bg-emerald-400';
      case 'Intermedio': return 'bg-emerald-500';
      default: return 'bg-emerald-600';
    }
  };

  const getProgressWidth = (nivel: string) => {
    switch (nivel) {
      case 'Experto': return '95%';
      case 'Avanzado': return '80%';
      case 'Intermedio': return '60%';
      default: return '40%';
    }
  };

  return (
    <motion.div 
      className="mt-4 w-full bg-neutral-700 rounded-full h-1.5"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
    >
      <motion.div 
        className={`h-1.5 rounded-full ${getProgressColor(nivel)}`}
        initial={{ width: 0 }}
        animate={{ width: getProgressWidth(nivel) }}
        transition={{ delay: 0.6 + (index * 0.1), duration: 0.8, ease: [0, 0, 0.58, 1] as [number, number, number, number] }}
      />
    </motion.div>
  );
};

export default HabilidadProgressBar;
