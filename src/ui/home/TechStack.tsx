import React, { memo, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs,
  FaGithub
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiAstro,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFramer,
  SiVercel,
  SiGit
} from 'react-icons/si';

// Tipos de datos optimizados
type Category = 'frontend' | 'backend' | 'language' | 'tool';

interface Technology {
  name: string;
  icon: React.ReactNode;
  category: Category;
  description: string;
}

interface CategoryFilter {
  id: string;
  name: string;
}

// Define las tecnologías con sus íconos correspondientes y categorías (fuera del componente para evitar recreación)
const technologies: Technology[] = [
  { 
    name: 'React', 
    icon: <FaReact className="text-blue-400" />,
    category: 'frontend',
    description: 'Biblioteca JavaScript para construir interfaces de usuario'
  },
  { 
    name: 'Next.js', 
    icon: <SiNextdotjs className="text-white" />,
    category: 'frontend',
    description: 'Framework React para aplicaciones web'
  },
  { 
    name: 'Astro', 
    icon: <SiAstro className="text-orange-500" />,
    category: 'frontend',
    description: 'Framework para sitios web centrado en el contenido'
  },
  { 
    name: 'TypeScript', 
    icon: <SiTypescript className="text-blue-500" />,
    category: 'language',
    description: 'Superset tipado de JavaScript'
  },
  { 
    name: 'JavaScript', 
    icon: <SiJavascript className="text-yellow-400" />,
    category: 'language',
    description: 'Lenguaje de programación de alto nivel'
  },
  { 
    name: 'HTML5', 
    icon: <SiHtml5 className="text-red-500" />,
    category: 'frontend',
    description: 'Lenguaje de marcado para la web'
  },
  { 
    name: 'CSS3', 
    icon: <SiCss3 className="text-blue-600" />,
    category: 'frontend',
    description: 'Lenguaje de estilos para diseño web'
  },
  { 
    name: 'Node.js', 
    icon: <FaNodeJs className="text-green-500" />,
    category: 'backend',
    description: 'Entorno de ejecución para JavaScript'
  },
  { 
    name: 'Tailwind CSS', 
    icon: <SiTailwindcss className="text-cyan-400" />,
    category: 'frontend',
    description: 'Framework CSS de utilidades'
  },
  { 
    name: 'Framer Motion', 
    icon: <SiFramer className="text-purple-500" />,
    category: 'frontend',
    description: 'Biblioteca para animaciones en React'
  },
  { 
    name: 'Git', 
    icon: <SiGit className="text-red-600" />,
    category: 'tool',
    description: 'Sistema de control de versiones'
  },
  { 
    name: 'GitHub', 
    icon: <FaGithub className="text-white" />,
    category: 'tool',
    description: 'Plataforma de desarrollo colaborativo'
  },
  { 
    name: 'Vercel', 
    icon: <SiVercel className="text-white" />,
    category: 'tool',
    description: 'Plataforma para despliegue de aplicaciones'
  }
];

// Filtros para categorías (fuera del componente para evitar recreación)
const categories: CategoryFilter[] = [
  { id: 'all', name: 'Todas' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'language', name: 'Lenguajes' },
  { id: 'tool', name: 'Herramientas' }
];

// Variantes para animaciones (fuera del componente para evitar recreación)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Componente de tarjeta de tecnología optimizado con memo
const TechCard = memo(({ 
  tech, 
  isHovered, 
  onHoverStart, 
  onHoverEnd 
}: {
  tech: Technology;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  return (
    <motion.div 
      variants={itemVariants}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2 }
      }}
      className={`relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
        isHovered 
          ? 'bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 border-emerald-500/50'
          : 'bg-neutral-800/50 border-neutral-700/30'
      } border backdrop-blur-sm overflow-hidden group`}
    >
      {/* Efecto de halo en hover optimizado */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%)'
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Icono con animación optimizada */}
      <motion.div
        animate={
          isHovered 
            ? { 
                y: [0, -5, 0],
                scale: [1, 1.2, 1],
                transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5 } 
              }
            : undefined
        }
        className="text-3xl mb-2"
      >
        {tech.icon}
      </motion.div>
      
      {/* Nombre de tecnología */}
      <p className="text-sm font-medium text-gray-200 text-center mb-1">
        {tech.name}
      </p>
      
      {/* Descripción con animación fade in optimizada */}
      <AnimatePresence>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gray-400 text-center mt-1 overflow-hidden"
          >
            {tech.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

TechCard.displayName = 'TechCard';

// Componente de filtro de categoría optimizado con memo
const CategoryButton = memo(({ 
  category, 
  isActive, 
  onClick 
}: {
  category: CategoryFilter;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
        isActive
          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
          : 'bg-neutral-800/50 text-gray-400 hover:text-gray-300 border-neutral-700/50'
      } border backdrop-blur-sm`}
    >
      {category.name}
    </motion.button>
  );
});

CategoryButton.displayName = 'CategoryButton';

// Componente CTA separado y memoizado para mejor rendimiento
const CTAButton = memo(() => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="flex justify-center mt-10"
    >
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute h-10 w-40 bg-emerald-500/20 rounded-full blur-xl -z-10"
      />
      <motion.a 
        href="/habilidades" 
        whileHover={{ 
          scale: 1.03,
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
        }}
        whileTap={{ scale: 0.97 }}
        className="relative group px-8 py-3 bg-neutral-800/80 text-emerald-400 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-emerald-500/10 border border-emerald-500/30 overflow-hidden"
      >
        {/* Efecto de destello optimizado */}
        <motion.span 
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.08), transparent)',
            transform: 'translateX(-100%)'
          }}
          animate={{ 
            x: ['0%', '200%']
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatDelay: 0.5 
          }}
        />
        
        {/* Icono principal optimizado */}
        <motion.div
          whileHover={{ 
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
          className="bg-emerald-500/20 p-2 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h.008v.008H19.5V12Z" />
          </svg>
        </motion.div>
        
        {/* Texto optimizado */}
        <div>
          <span className="text-gray-200 group-hover:text-emerald-300 transition-colors duration-300">Ver todas mis </span>
          <span className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">habilidades</span>
        </div>
        
        {/* Flecha optimizada */}
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-4 h-4 opacity-70"
          animate={{ x: [0, 3, 0] }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </motion.svg>
      </motion.a>
    </motion.div>
  );
});

CTAButton.displayName = 'CTAButton';

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Memoización del filtrado de tecnologías para evitar recálculos innecesarios
  const filteredTechnologies = useMemo(() => {
    if (activeCategory === 'all') return technologies;
    return technologies.filter(tech => tech.category === activeCategory);
  }, [activeCategory]);

  // Callbacks memoizados para evitar recreación en cada render
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const handleTechHoverStart = useCallback((techName: string) => {
    setHoveredTech(techName);
  }, []);

  const handleTechHoverEnd = useCallback(() => {
    setHoveredTech(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full space-y-6"
    >
      {/* Título con efecto optimizado */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-center mb-6 text-gray-100 relative"
      >
        <span className="relative z-10">Stack Tecnológico</span>
        <motion.span
          className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-emerald-500/30 to-blue-500/30"
          style={{ y: '70%', filter: 'blur(8px)', zIndex: 0 }}
        />
      </motion.h2>
      
      {/* Filtros de categoría optimizados */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onClick={() => handleCategoryChange(category.id)}
          />
        ))}
      </motion.div>

      {/* Grid de tecnologías optimizado con AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {filteredTechnologies.map((tech) => (
            <TechCard
              key={tech.name}
              tech={tech}
              isHovered={hoveredTech === tech.name}
              onHoverStart={() => handleTechHoverStart(tech.name)}
              onHoverEnd={handleTechHoverEnd}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Indicador de interacción optimizado */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1"
      >
        <span>Pasa el cursor sobre las tecnologías para ver más detalles</span>
        <motion.div
          animate={{ 
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ↑
        </motion.div>
      </motion.div>

      {/* Botón CTA optimizado */}
      <CTAButton />
    </motion.div>
  );
};

export default memo(TechStack);
