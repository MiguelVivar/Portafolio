'use client'

import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';

interface CallToActionProps {
  title: string;
  titlespan: string;
  description: string;
  buttonPrimaryText: string;
  buttonSecondaryText: string;
  buttonPrimaryIcon: React.ReactNode;
  buttonSecondaryIcon: React.ReactNode;
  buttonPrimaryLink?: string;
  buttonSecondaryLink?: string;
}

// Optimized animation variants - computed once and memoized
const animationVariants = {
  container: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  content: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  description: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay: 0.2 }
  },
  buttons: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.3 }
  },
  titleSpan: {
    transition: { 
      duration: 5,
      repeat: Infinity,
      ease: "linear" 
    }
  },
  buttonHover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  buttonTap: {
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

// Memoized decorative components to prevent re-renders
const BackgroundDecorations = memo(() => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 z-0" />
    <div className="absolute inset-0 bg-[url('/path-to-subtle-pattern.png')] opacity-5 mix-blend-soft-light z-0" />
    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] transform translate-x-1/4 -translate-y-1/4 z-0" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] transform -translate-x-1/4 translate-y-1/4 z-0" />
  </>
));
BackgroundDecorations.displayName = 'BackgroundDecorations';

const DecorativeLines = memo(() => (
  <>
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
  </>
));
DecorativeLines.displayName = 'DecorativeLines';

const CornerDecorations = memo(() => (
  <>
    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-lg" />
    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-emerald-500/30 rounded-tr-lg" />
    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-emerald-500/30 rounded-bl-lg" />
    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-emerald-500/30 rounded-br-lg" />
  </>
));
CornerDecorations.displayName = 'CornerDecorations';

// Optimized button component with reduced re-renders
interface OptimizedButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  icon: React.ReactNode;
  link?: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const OptimizedButton = memo<OptimizedButtonProps>(({ 
  type, 
  text, 
  icon, 
  link, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const isPrimary = type === 'primary';
  
  const buttonStyles = useMemo(() => ({
    container: `relative group ${isPrimary ? 'order-2 sm:order-1' : 'order-1 sm:order-2'}`,
    glow: `absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl blur transition duration-200 ${
      isPrimary 
        ? `opacity-70 group-hover:opacity-80 ${isHovered ? 'animate-pulse' : ''}` 
        : `opacity-30 group-hover:opacity-70 ${isHovered ? 'animate-pulse' : ''}`
    }`,
    button: isPrimary
      ? "relative px-7 py-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-neutral-900 rounded-lg font-bold flex items-center gap-3 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300"
      : "relative px-7 py-4 bg-neutral-800 border border-emerald-300/20 rounded-lg text-emerald-300 font-medium flex items-center gap-3 transition-all duration-300 group-hover:border-emerald-300/50"
  }), [isPrimary, isHovered]);

  const linkProps = useMemo(() => {
    const isExternalLink = link && (link.startsWith('http') || link.startsWith('mailto'));
    return isExternalLink 
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
  }, [link]);

  const iconAnimation = useMemo(() => ({
    rotate: isHovered ? [0, -10, 10, -10, 0] : 0
  }), [isHovered]);

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={animationVariants.buttonHover}
      whileTap={animationVariants.buttonTap}
      className={buttonStyles.container}
    >
      <div className={buttonStyles.glow} />
      <a 
        href={link || '#'}
        className={buttonStyles.button}
        {...linkProps}
      >
        <motion.span 
          animate={iconAnimation}
          transition={{ duration: 0.5 }}
          className="text-xl"
        >
          {icon}
        </motion.span>
        <span>{text}</span>
      </a>
    </motion.div>
  );
});
OptimizedButton.displayName = 'OptimizedButton';

const CallToAction: React.FC<CallToActionProps> = memo(({ 
  title, 
  titlespan, 
  description, 
  buttonPrimaryText, 
  buttonSecondaryText, 
  buttonPrimaryIcon, 
  buttonSecondaryIcon,
  buttonPrimaryLink,
  buttonSecondaryLink, 
}) => {
  const [hoveredButton, setHoveredButton] = useState<'primary' | 'secondary' | null>(null);
  
  const handlePrimaryHover = useCallback(() => setHoveredButton('primary'), []);
  const handleSecondaryHover = useCallback(() => setHoveredButton('secondary'), []);
  const handleMouseLeave = useCallback(() => setHoveredButton(null), []);

  const viewportConfig = useMemo(() => ({ 
    once: true, 
    margin: "-100px" 
  }), []);

  const titleSpanStyles = useMemo(() => ({
    backgroundSize: "200% auto"
  }), []);

  const titleSpanAnimation = useMemo(() => ({
    backgroundPosition: ["0% center", "100% center", "0% center"]
  }), []);

  const content = useMemo(() => (
    <div className="relative z-10 py-12 px-8 sm:px-12 text-center">
      <motion.div
        initial={animationVariants.content.initial}
        whileInView={animationVariants.content.animate}
        viewport={viewportConfig}
        transition={animationVariants.content.transition}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          <span className="text-white">{title}</span>{" "}
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400"
            animate={titleSpanAnimation}
            transition={animationVariants.titleSpan.transition}
            style={titleSpanStyles}
          >
            {titlespan}
          </motion.span>
          <span className="text-white">?</span>
        </h2>
        
        <motion.p 
          initial={animationVariants.description.initial}
          whileInView={animationVariants.description.animate}
          viewport={viewportConfig}
          transition={animationVariants.description.transition}
          className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          initial={animationVariants.buttons.initial}
          whileInView={animationVariants.buttons.animate}
          viewport={viewportConfig}
          transition={animationVariants.buttons.transition}
        >
          <OptimizedButton
            type="secondary"
            text={buttonSecondaryText}
            icon={buttonSecondaryIcon}
            link={buttonSecondaryLink || '#'}
            isHovered={hoveredButton === 'secondary'}
            onMouseEnter={handleSecondaryHover}
            onMouseLeave={handleMouseLeave}
          />
          
          <OptimizedButton
            type="primary"
            text={buttonPrimaryText}
            icon={buttonPrimaryIcon}
            link={buttonPrimaryLink}
            isHovered={hoveredButton === 'primary'}
            onMouseEnter={handlePrimaryHover}
            onMouseLeave={handleMouseLeave}
          />
        </motion.div>
      </motion.div>
    </div>
  ), [
    title,
    titlespan,
    description,
    buttonPrimaryText,
    buttonSecondaryText,
    buttonPrimaryIcon,
    buttonSecondaryIcon,
    buttonPrimaryLink,
    buttonSecondaryLink,
    hoveredButton,
    handlePrimaryHover,
    handleSecondaryHover,
    handleMouseLeave,
    viewportConfig,
    titleSpanStyles,
    titleSpanAnimation
  ]);

  return (
    <motion.div
      initial={animationVariants.container.initial}
      whileInView={animationVariants.container.animate}
      viewport={viewportConfig}
      transition={animationVariants.container.transition}
      className="relative overflow-hidden"
    >
      <BackgroundDecorations />
      <DecorativeLines />
      <CornerDecorations />
      {content}
    </motion.div>
  );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;