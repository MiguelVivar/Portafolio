import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SiAstro, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si';

// Tipos optimizados
interface FloatingIcon {
  id: number;
  iconType: 'react' | 'nextjs' | 'astro' | 'tailwind';
  color: string;
  size: string;
  position: string;
  duration: number;
}

// Mapa de iconos para evitar crear elementos JSX repetidamente
const iconComponentMap = {
  react: SiReact,
  nextjs: SiNextdotjs,
  astro: SiAstro,
  tailwind: SiTailwindcss,
} as const;

// Datos optimizados sin JSX elements
const floatingIconsData: FloatingIcon[] = [
  { 
    id: 1, 
    iconType: 'react', 
    color: "text-blue-400", 
    size: "w-8 h-8", 
    position: "top-[20%] left-[10%]", 
    duration: 15 
  },
  { 
    id: 2, 
    iconType: 'nextjs', 
    color: "text-white", 
    size: "w-6 h-6", 
    position: "top-[15%] right-[15%]", 
    duration: 12 
  },
  { 
    id: 3, 
    iconType: 'astro', 
    color: "text-amber-500", 
    size: "w-7 h-7", 
    position: "bottom-[25%] left-[15%]", 
    duration: 18 
  },
  { 
    id: 4, 
    iconType: 'tailwind', 
    color: "text-cyan-400", 
    size: "w-8 h-8", 
    position: "bottom-[20%] right-[10%]", 
    duration: 14 
  },
];

// Función para generar variantes de animación optimizadas
const createFloatingVariants = (id: number, duration: number) => ({
  animate: {
    y: ['-20px', '20px', '-20px'],
    rotate: [0, id % 2 === 0 ? 15 : -15, 0],
    transition: { 
      repeat: Infinity, 
      duration, 
      ease: "easeInOut" 
    }
  }
});

// Componente de icono flotante memoizado
interface FloatingIconItemProps {
  icon: FloatingIcon;
}

const FloatingIconItem: React.FC<FloatingIconItemProps> = memo(({ icon }) => {
  // Memoizar el componente de icono
  const IconComponent = useMemo(() => {
    const Icon = iconComponentMap[icon.iconType];
    return <Icon />;
  }, [icon.iconType]);

  // Memoizar las clases CSS
  const iconClasses = useMemo(() => 
    `absolute ${icon.position} ${icon.size} ${icon.color} opacity-30 flex items-center justify-center`,
    [icon.position, icon.size, icon.color]
  );

  // Memoizar las variantes de animación
  const animationVariants = useMemo(() => 
    createFloatingVariants(icon.id, icon.duration),
    [icon.id, icon.duration]
  );

  return (
    <motion.div
      className={iconClasses}
      variants={animationVariants}
      animate="animate"
    >
      {IconComponent}
    </motion.div>
  );
});

FloatingIconItem.displayName = 'FloatingIconItem';

const FloatingIcons: React.FC = memo(() => {
  // Memoizar la lista de iconos para evitar recrear el array en cada render
  const iconsList = useMemo(() => floatingIconsData, []);

  return (
    <>
      {iconsList.map(icon => (
        <FloatingIconItem
          key={icon.id}
          icon={icon}
        />
      ))}
    </>
  );
});

FloatingIcons.displayName = 'FloatingIcons';

export default FloatingIcons;