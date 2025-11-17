"use client";

import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import HeroHeader from "./HeroHeader";
import ProfileImage from "./ProfileImage";
import AnimateBackground from "../../components/AnimateBackground";
import TechStack from "./TechStack";
import AchievementsSection from "./AchievementsSection";
import FloatingIcons from "./FloatingIcons";

// Animation variants extracted for performance optimization
const heroTextVariants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const profileImageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const decorativeAccentVariants = {
  initial: { width: 0 },
  animate: {
    width: "40%",
    transition: { delay: 1, duration: 1 },
  },
};

const techStackSectionVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.9, duration: 0.8 },
  },
};

const glowVariants = {
  animate: {
    scale: [0.9, 0.95, 0.9],
    opacity: [0.5, 0.7, 0.5],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  },
};

interface HomeProps {
  roles: string[];
}

// eslint-disable-next-line react/display-name
const Home = memo<HomeProps>(({ roles }) => {
  // Estado para controlar el efecto parallax
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setShowAchievements] = useState(false);

  // Valores de movimiento para el efecto parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Memoized CSS classes for performance
  const mainClasses = useMemo(
    () => "flex flex-col min-h-screen overflow-x-hidden bg-neutral-900",
    []
  );

  const heroSectionClasses = useMemo(
    () =>
      "min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10",
    []
  );

  const containerClasses = useMemo(
    () => "w-full max-w-7xl mx-auto py-8 sm:py-24 relative z-10",
    []
  );

  const gridClasses = useMemo(
    () =>
      "flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16",
    []
  );

  const heroTextClasses = useMemo(
    () => "flex-1 space-y-6 sm:space-y-8 text-center md:text-left relative",
    []
  );

  const accentBorderClasses = useMemo(
    () =>
      "absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-60 hidden md:block",
    []
  );

  const decorativeAccentClasses = useMemo(
    () =>
      "h-0.5 bg-gradient-to-r from-emerald-300 to-transparent hidden md:block",
    []
  );

  const profileContainerClasses = useMemo(
    () => "flex-1 flex justify-center md:justify-end relative",
    []
  );

  const glowBackgroundClasses = useMemo(
    () =>
      "absolute inset-0 bg-emerald-400/5 rounded-full blur-2xl transform scale-90",
    []
  );

  const techStackSectionClasses = useMemo(
    () => "mt-12 md:mt-16 max-w-5xl mx-auto",
    []
  );

  const techCardClasses = useMemo(
    () =>
      "backdrop-blur-sm bg-neutral-800/30 p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-emerald-500/10 transition-shadow duration-500",
    []
  );

  const techHeaderClasses = useMemo(
    () => "flex items-center justify-center gap-3 mb-3",
    []
  );

  const techDividerClasses = useMemo(
    () => "h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/50",
    []
  );

  const techDividerReverseClasses = useMemo(
    () => "h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/50",
    []
  );

  const techTitleClasses = useMemo(
    () => "text-center text-emerald-300 font-semibold tracking-wide",
    []
  );

  const decorativeBlurClasses = useMemo(
    () =>
      "absolute top-20 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl",
    []
  );

  const gradientOverlayClasses = useMemo(
    () =>
      "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none",
    []
  );

  // Memoized event handlers for performance
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY > windowHeight * 0.5) {
      setShowAchievements(true);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calcular la posición relativa del mouse desde el centro
      const x = (clientX - centerX) / centerX;
      const y = (clientY - centerY) / centerY;

      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  // Efecto para detectar cuando el usuario ha scrolleado hasta la sección de logros
  useEffect(() => {
    // Efecto para seguimiento del cursor para parallax
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);
  // Transformaciones para el efecto parallax - hooks must be called directly
  const profileRotateX = useTransform(mouseY, [-1, 1], [5, -5]);
  const profileRotateY = useTransform(mouseX, [-1, 1], [-5, 5]);
  const heroTextX = useTransform(mouseX, [-1, 1], [10, -10]);
  const heroTextY = useTransform(mouseY, [-1, 1], [5, -5]);
  const negativeBackgroundX = useTransform(mouseX, [-1, 1], [-20, 20]);
  const negativeBackgroundY = useTransform(mouseY, [-1, 1], [-20, 20]);

  // Memoized style objects for profile transform
  const profileStyle = useMemo(
    () => ({
      rotateX: profileRotateX,
      rotateY: profileRotateY,
      perspective: 1000,
    }),
    [profileRotateX, profileRotateY]
  );

  const heroTextStyle = useMemo(
    () => ({
      x: heroTextX,
      y: heroTextY,
    }),
    [heroTextX, heroTextY]
  );

  const decorativeBlurStyle = useMemo(
    () => ({
      x: negativeBackgroundX,
      y: negativeBackgroundY,
    }),
    [negativeBackgroundX, negativeBackgroundY]
  );  return (
    <main className={mainClasses} data-home-loaded="true">
      {/* Fondo Animado */}
      <AnimateBackground />

      {/* Elementos decorativos que siguen al mouse */}
      <motion.div
        className={decorativeBlurClasses}
        style={decorativeBlurStyle}
      />

      {/* Iconos de Tecnologías Flotantes */}
      <FloatingIcons />

      {/* Hero con efecto 3d */}
      <section className={heroSectionClasses}>
        <div className={containerClasses}>
          <div className={gridClasses}>
            {/* Texto del Hero */}
            <motion.div
              variants={heroTextVariants}
              initial="initial"
              animate="animate"
              style={heroTextStyle}
              className={heroTextClasses}
            >
              {/* Borde de acento sutil */}
              <div className={accentBorderClasses} />

              <HeroHeader roles={roles} />

              {/* Acento decorativo adicional */}
              <motion.div
                variants={decorativeAccentVariants}
                initial="initial"
                animate="animate"
                className={decorativeAccentClasses}
              />
            </motion.div>

            {/* Sección de imagen de perfil con efecto de tarjeta 3D */}
            <motion.div
              variants={profileImageVariants}
              initial="initial"
              animate="animate"
              style={profileStyle}
              className={profileContainerClasses}
            >
              {/* Fondo brillante para el perfil */}
              <motion.div
                className={glowBackgroundClasses}
                variants={glowVariants}
                animate="animate"
              />

              <ProfileImage />
            </motion.div>
          </div>

          {/* Sección de imagen de perfil con efecto de tarjeta 3D */}
          <motion.div
            variants={techStackSectionVariants}
            initial="initial"
            animate="animate"
            className={techStackSectionClasses}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className={techCardClasses}
            >
              <div className={techHeaderClasses}>
                <div className={techDividerClasses} />
                <h3 className={techTitleClasses}>
                  Principales Tecnologías que domino
                </h3>
                <div className={techDividerReverseClasses} />
              </div>
              <TechStack />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección de Logros */}
      <AchievementsSection showAchievements={true} />
      <div className={gradientOverlayClasses} />
    </main>
  );
});

export default Home;

