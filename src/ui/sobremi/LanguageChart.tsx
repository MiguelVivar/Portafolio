'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

interface LanguageChartProps {
  languages: LanguageData[];
  isLoading?: boolean;
}

// Paleta de colores moderna y vibrante para lenguajes
const languageColors: { [key: string]: string } = {
  // Lenguajes principales
  'JavaScript': '#FFD700', // Dorado brillante
  'TypeScript': '#00BFFF', // Azul cielo
  'Python': '#32CD32', // Verde lima
  'Java': '#FF4500', // Naranja rojizo
  'C++': '#9370DB', // Púrpura medio
  'C#': '#20B2AA', // Verde mar claro
  'PHP': '#FF69B4', // Rosa caliente
  'Ruby': '#FF1493', // Rosa profundo
  'Go': '#00CED1', // Turquesa oscuro
  'Rust': '#FF8C00', // Naranja oscuro
  'Swift': '#FF6347', // Tomate
  'Kotlin': '#BA55D3', // Orquídea medio
  'HTML': '#FF4500', // Naranja rojizo
  'CSS': '#1E90FF', // Azul dodger
  'SQL': '#4169E1', // Azul real
  'Shell': '#3CB371', // Verde mar medio
  'Dart': '#00FA9A', // Verde primavera medio
  'R': '#FF7F50', // Coral
  'Scala': '#DC143C', // Carmesí
  'Perl': '#8A2BE2', // Azul violeta
};

const LanguageChart: React.FC<LanguageChartProps> = ({ 
  languages, 
  isLoading = false 
}) => {
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  // Aplicar colores predefinidos a los lenguajes
  const languagesWithColors = languages.map(lang => ({
    ...lang,
    color: languageColors[lang.name] || lang.color // Usar color predefinido o mantener el existente
  }));

  const totalPercentage = languagesWithColors.reduce((sum, lang) => sum + lang.percentage, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300 h-full shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-4 mb-8 relative"
      >
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20 relative group">
          <FaCode className="text-2xl text-white relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Lenguajes más utilizados
          </h3>
          <p className="text-sm text-gray-400 mt-1">Distribución por porcentaje de código</p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i} 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="h-5 bg-neutral-700/50 rounded-lg animate-pulse" />
              <div className="h-3 bg-neutral-700/50 rounded-lg animate-pulse" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {languagesWithColors.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredLanguage(language.name)}
              onMouseLeave={() => setHoveredLanguage(null)}
            >
              {/* Language Name and Percentage */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-4 h-4 rounded-full shadow-lg relative"
                    style={{ 
                      backgroundColor: language.color,
                      boxShadow: `0 0 10px ${language.color}50`
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <AnimatePresence>
                      {hoveredLanguage === language.name && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -inset-1 rounded-full"
                          style={{ 
                            backgroundColor: language.color,
                            opacity: 0.2
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className="text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {language.name}
                  </span>
                </div>
                <motion.span 
                  className="text-base font-bold text-white bg-neutral-700/30 px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {language.percentage}%
                </motion.span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-700/30 rounded-full h-3 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${language.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut" 
                  }}
                  className="h-full rounded-full transition-all duration-300 relative"
                  style={{ 
                    background: `linear-gradient(90deg, ${language.color}, ${language.color}dd)`,
                    boxShadow: `0 0 10px ${language.color}30`
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredLanguage === language.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Total Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-6 mt-6 border-t border-neutral-700/50"
          >
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-400">Total</span>
              <motion.span 
                className="text-base font-bold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {totalPercentage}%
              </motion.span>
            </div>
          </motion.div>

          {/* Circular Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center mt-8"
          >
            <div className="relative w-56 h-56 bg-transparent">
              <svg className="w-56 h-56 transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                {/* Círculo de fondo */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-neutral-700/30"
                />
                
                {/* Segmentos principales con color sólido */}
                {languagesWithColors.map((language, index) => {
                  const previousPercentages = languagesWithColors
                    .slice(0, index)
                    .reduce((sum, lang) => sum + lang.percentage, 0);
                  
                  const circumference = 2 * Math.PI * 45;
                  const strokeDasharray = `${(language.percentage / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((previousPercentages / 100) * circumference);
                  
                  return (
                    <motion.g
                      key={language.name}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      {/* Segmento principal */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={language.color}
                        strokeWidth={hoveredSegment === index ? 12 : 8}
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        initial={{ strokeDasharray: `0 ${circumference}` }}
                        animate={{ 
                          strokeDasharray,
                          scale: hoveredSegment === index ? 1.02 : 1
                        }}
                        transition={{ 
                          duration: 2, 
                          delay: 0.5 + index * 0.2,
                          ease: "easeOut" 
                        }}
                      />

                      {/* Etiqueta de porcentaje */}
                      <motion.text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={language.color}
                        className="text-sm font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: hoveredSegment === index ? 1 : 0,
                          scale: hoveredSegment === index ? 1.2 : 1,
                          y: hoveredSegment === index ? -8 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {language.percentage}%
                      </motion.text>
                    </motion.g>
                  );
                })}
              </svg>
              
              {/* Centro del gráfico */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    {totalPercentage}%
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Total</div>
                </motion.div>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredSegment !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-neutral-800/95 backdrop-blur-md px-4 py-3 rounded-xl border border-neutral-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: languagesWithColors[hoveredSegment]?.color }}
                      />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {languagesWithColors[hoveredSegment].name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {languagesWithColors[hoveredSegment].percentage}% del código
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default LanguageChart;
