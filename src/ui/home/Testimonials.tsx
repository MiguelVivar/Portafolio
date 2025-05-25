'use client'

import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

// Tipos de datos optimizados
interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
}

// Datos de testimonios movidos fuera del componente para evitar recreación
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "1",
    role: "1",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 2,
    name: "2",
    role: "2",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    name: "3",
    role: "3",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

// Constantes de configuración memoizadas
const AUTOPLAY_INTERVAL = 6000;
const ANIMATION_DURATION = 0.5;

// Variantes de animación memoizadas fuera del componente
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1 }
  }
};

const titleVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { delay: 0.2, duration: 0.8 }
  }
};

const dividerVariants = {
  hidden: { width: 0 },
  visible: { 
    width: '6rem',
    transition: { delay: 0.5, duration: 0.8 }
  }
};

const descriptionVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { delay: 0.4, duration: 0.8 }
  }
};

const testimonialVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

// Componente de encabezado optimizado y memoizado
const TestimonialHeader = memo(() => {
  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-12"
    >
      <motion.h2 
        variants={titleVariants}
        className="text-3xl sm:text-4xl font-bold text-white mb-4"
      >
        Lo que <span className="text-emerald-400">Dicen de Mí</span>
      </motion.h2>
      <motion.div 
        variants={dividerVariants}
        className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mb-6 rounded-full"
      />
      <motion.p 
        variants={descriptionVariants}
        className="text-gray-300 max-w-2xl mx-auto"
      >
        Opiniones de clientes y colaboradores con quienes he trabajado en diversos proyectos.
      </motion.p>
    </motion.div>
  );
});

TestimonialHeader.displayName = 'TestimonialHeader';

// Componente de avatar optimizado con lazy loading
const TestimonialAvatar = memo(({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div 
      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-emerald-400/50 shadow-md"
      animate={{ 
        scale: [1, 1.05, 1],
        borderColor: [
          'rgba(52, 211, 153, 0.5)', 
          'rgba(52, 211, 153, 0.8)', 
          'rgba(52, 211, 153, 0.5)'
        ] 
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Image 
        src={testimonial.image} 
        alt={testimonial.name}
        className="w-full h-full object-cover"
        loading="lazy"
        width={100}
        height={100}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      
      {/* Glow effect optimizado */}
      <motion.div
        className="absolute inset-0 bg-emerald-400/10"
        animate={{ 
          boxShadow: [
            "inset 0 0 15px 5px rgba(52, 211, 153, 0.1)",
            "inset 0 0 20px 5px rgba(52, 211, 153, 0.2)",
            "inset 0 0 15px 5px rgba(52, 211, 153, 0.1)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
});

TestimonialAvatar.displayName = 'TestimonialAvatar';

// Componente de contenido de testimonio optimizado
const TestimonialContent = memo(({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex-1 text-center sm:text-left">
      <p className="text-gray-200 italic mb-4 leading-relaxed">
        &quot;{testimonial.text}&quot;
      </p>
      <h4 className="text-lg font-semibold text-emerald-300">
        {testimonial.name}
      </h4>
      <p className="text-sm text-gray-400">
        {testimonial.role}
      </p>
    </div>
  );
});

TestimonialContent.displayName = 'TestimonialContent';

// Componente de testimonio principal memoizado
const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      key={testimonial.id}
      variants={testimonialVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: ANIMATION_DURATION }}
      className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
    >
      <TestimonialAvatar testimonial={testimonial} />
      <TestimonialContent testimonial={testimonial} />
    </motion.div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

// Componente de botón de navegación optimizado
const NavigationButton = memo(({ 
  direction, 
  onClick, 
  icon 
}: { 
  direction: 'prev' | 'next';
  onClick: () => void;
  icon: React.ReactNode;
}) => {
  const className = `w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors duration-300 backdrop-blur-sm shadow-lg ${
    direction === 'prev' ? '-ml-5' : '-mr-5'
  }`;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      aria-label={`${direction === 'prev' ? 'Testimonio anterior' : 'Siguiente testimonio'}`}
    >
      {icon}
    </motion.button>
  );
});

NavigationButton.displayName = 'NavigationButton';

// Componente de indicadores de puntos optimizado
const IndicatorDots = memo(({ 
  total, 
  current, 
  onSelect 
}: { 
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) => {
  const dots = useMemo(() => 
    Array.from({ length: total }, (_, index) => index), 
    [total]
  );

  return (
    <div className="flex justify-center mt-6 gap-2">
      {dots.map((index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            current === index 
              ? 'bg-emerald-400 w-6' 
              : 'bg-emerald-400/30 hover:bg-emerald-400/50'
          }`}
          aria-label={`Ver testimonio ${index + 1}`}
        />
      ))}
    </div>
  );
});

IndicatorDots.displayName = 'IndicatorDots';

// Componente principal optimizado
const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Memoización de testimonio actual
  const currentTestimonial = useMemo(
    () => testimonials[current],
    [current]
  );

  // Memoización de cantidad total
  const totalTestimonials = useMemo(
    () => testimonials.length,
    []
  );

  // Callbacks memoizados para evitar recreación
  const handleMouseEnter = useCallback(() => {
    setAutoplay(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setAutoplay(true);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrent(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
  }, [totalTestimonials]);

  const goToNext = useCallback(() => {
    setCurrent(prev => (prev + 1) % totalTestimonials);
  }, [totalTestimonials]);

  const handleDotSelect = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Autoplay optimizado con cleanup
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % totalTestimonials);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [autoplay, totalTestimonials]);

  // Preload de imágenes para mejor rendimiento
  useEffect(() => {
    testimonials.forEach(testimonial => {
      const img = new window.Image();
      img.src = testimonial.image;
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto py-16">
      <TestimonialHeader />
      
      <div 
        className="relative max-w-4xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Elementos decorativos memoizados */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-emerald-400/30 -mt-4 -ml-4" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-emerald-400/30 -mb-4 -mr-4" />
        
        {/* Iconos de citas memoizados */}
        <FaQuoteLeft className="absolute top-4 left-4 text-4xl text-emerald-500/20" />
        <FaQuoteRight className="absolute bottom-4 right-4 text-4xl text-emerald-500/20" />
        
        <div className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-neutral-800/30 border border-gray-700/30 shadow-lg p-8 min-h-[20rem] flex items-center">
          <AnimatePresence mode="wait">
            <TestimonialCard testimonial={currentTestimonial} />
          </AnimatePresence>
        </div>
        
        {/* Botones de navegación optimizados */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-2">
          <NavigationButton 
            direction="prev" 
            onClick={goToPrev} 
            icon={<FaChevronLeft />} 
          />
          <NavigationButton 
            direction="next" 
            onClick={goToNext} 
            icon={<FaChevronRight />} 
          />
        </div>
        
        {/* Indicadores de puntos optimizados */}
        <IndicatorDots 
          total={totalTestimonials}
          current={current}
          onSelect={handleDotSelect}
        />
      </div>
    </div>
  );
};

export default memo(Testimonials);
