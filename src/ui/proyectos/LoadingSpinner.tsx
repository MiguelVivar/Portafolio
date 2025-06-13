import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center py-20"
      role="status"
      aria-live="polite"
      aria-label="Cargando proyectos"
    >
      <motion.div
        className="w-12 h-12 border-4 border-emerald-300/30 border-t-emerald-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <span className="sr-only">Cargando proyectos, por favor espera...</span>
    </div>
  );
};

export default LoadingSpinner;
