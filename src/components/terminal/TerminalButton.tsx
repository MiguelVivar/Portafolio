"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTerminal } from "react-icons/fa";
import { useTerminal } from "./TerminalContext";

const TerminalButton: React.FC = () => {
  const { toggleTerminal } = useTerminal();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={toggleTerminal}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-neutral-800 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 transition-all duration-300 group cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Abrir Terminal"
    >
      <FaTerminal
        className="text-emerald-400 group-hover:text-emerald-300 transition-colors"
        size={18}
      />

      {/* Efecto de resplandor en hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full -z-10 bg-emerald-500/20 blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.4 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        className="absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-xs text-emerald-300 
          rounded whitespace-nowrap border border-emerald-500/20"
      >
        Abrir Terminal
      </motion.div>
    </motion.button>
  );
};

export default TerminalButton;
