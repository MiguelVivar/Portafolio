"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import ProfilePicture from "../../assets/images/perfil.webp";
import Link from "next/link";
import Image from "next/image";

const ProfileImage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const imageClasses = useMemo(() => 
    "object-cover object-center w-full h-full", []
  );
  const imageStyle = useMemo(() => ({
    filter: isHovered ? 'brightness(1.05) contrast(1.05)' : 'none',
    transition: 'filter 0.5s ease-in-out'
  }), [isHovered]);

  // Animación automática para cuando no hay interacción
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        controls.start({
          filter: [
            "brightness(1) contrast(1)",
            "brightness(1.05) contrast(1.02)",
            "brightness(1) contrast(1)",
          ],
          transition: { duration: 3, ease: "easeInOut" },
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, controls]);

  // Actualiza la posición del mouse relativa al contenedor para efectos de iluminación
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });

      // Efecto 3D suave basado en la posición del mouse
      const tiltX = (y - 0.5) * 10; // -5 a 5 grados
      const tiltY = (0.5 - x) * 10; // -5 a 5 grados

      containerRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
  };

  // Restablecer la posición cuando el mouse sale
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (containerRef.current) {
      containerRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  // Genera puntos aleatorios para el efecto de partículas
  const particleCount = 12; // Aumentado el número de partículas
  const [particles] = useState(
    Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 6,
      duration: 15 + Math.random() * 30,
      delay: Math.random() * 5,
    }))
  );

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto perspective-1000 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Fondo con gradiente avanzado y efecto blur - Mejorado */}
      <div className="absolute -z-10 w-full h-full rounded-full bg-gradient-to-tr from-emerald-600/40 via-teal-500/25 to-blue-600/40 blur-3xl transform -translate-x-1/4 scale-[1.4] animate-pulse"></div>

      {/* Efectos visuales adicionales en el fondo */}
      <div className="absolute -z-9 w-[120%] h-[120%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute w-full h-full rounded-full bg-gradient-to-tr from-purple-500/20 to-pink-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>

      {/* Capa con efecto de brillo que sigue al cursor - Mejorado */}
      <motion.div
        className="absolute -z-5 w-full h-full opacity-80 rounded-full"
        animate={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x * 100}% ${
                mousePosition.y * 100
              }%, rgba(16, 185, 129, 0.6) 0%, transparent 70%)`
            : `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.3 }}
        style={{ filter: "blur(20px)" }}
      />

      {/* Partículas decorativas mejoradas */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute z-5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.6,
            filter: "blur(1px)",
            boxShadow: "0 0 8px 2px rgba(16, 185, 129, 0.3)",
          }}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Segundo círculo decorativo en dirección opuesta */}
      <motion.div
        className="absolute -z-1 w-[100%] h-[100%] border border-emerald-400/30 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: -360,
          borderWidth: isHovered ? [1, 2, 1] : 1,
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
        }}
        transition={{
          rotate: {
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          },
          borderWidth: {
            duration: 2,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
          },
          opacity: {
            duration: 2,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
          },
        }}
      />

      <motion.div
        className="relative z-10 mx-auto"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative group">
          <motion.div
            variants={{
              hovered: { scale: 1.03, rotateY: 5, rotateX: -5 },
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
          >
            {/* Efecto de neón iluminado - Mejorado */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 rounded-xl blur opacity-40"
              variants={{
                hovered: { opacity: 0.8, scale: 1.05, filter: "blur(8px)" },
              }}
              initial={{ opacity: 0.4, filter: "blur(5px)" }}
              animate={
                isHovered
                  ? "hovered"
                  : { opacity: [0.4, 0.6, 0.4], filter: "blur(5px)" }
              }
              transition={{
                duration: isHovered ? 0.3 : 3,
                repeat: isHovered ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Máscara con forma de polígono irregular para un aspecto más moderno */}
            <div
              className="relative overflow-hidden bg-neutral-900 border border-emerald-500/40"
              style={{
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)",
                borderRadius: "12px",
                boxShadow: isHovered
                  ? "0 20px 40px -15px rgba(16, 185, 129, 0.3), inset 0 0 0 1px rgba(16, 185, 129, 0.2)"
                  : "0 10px 30px -10px rgba(16, 185, 129, 0.2), inset 0 0 0 1px rgba(16, 185, 129, 0.1)",
              }}
            >
              {/* Imagen - Mejorada con animaciones */}
              <motion.div
                className="overflow-hidden"
                variants={{
                  hovered: { scale: 1.08 },
                }}
                initial={{ scale: 1 }}
                animate={isHovered ? "hovered" : { scale: [1, 1.02, 1] }}
                transition={{
                  duration: isHovered ? 0.5 : 5,
                  repeat: isHovered ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={ProfilePicture.src}
                  alt="Foto de perfil de Miguel Vivar"
                  className={imageClasses}
                  loading="eager"
                  style={imageStyle}
                  width={300}
                  height={300}
                />
              </motion.div>

              {/* Overlay con mejor gradiente - Mejorado */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, 
                    rgba(10, 10, 15, 0.9) 0%, 
                    rgba(10, 10, 15, 0.7) 25%, 
                    rgba(10, 10, 15, 0.3) 50%, 
                    rgba(10, 10, 15, 0.1) 75%, 
                    rgba(10, 10, 15, 0) 100%)`,
                }}
                variants={{
                  hovered: {
                    opacity: 0.7,
                    background: `linear-gradient(to top, 
                      rgba(10, 10, 15, 0.85) 0%, 
                      rgba(10, 10, 15, 0.6) 30%, 
                      rgba(10, 10, 15, 0.2) 60%, 
                      rgba(10, 10, 15, 0) 100%)`,
                  },
                }}
                initial={{ opacity: 0.9 }}
                animate={isHovered ? "hovered" : { opacity: 0.9 }}
                transition={{ duration: 0.5 }}
              />

              {/* Texto con mejor animación y diseño - Mejorado */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-5 text-white"
                variants={{
                  hovered: { y: 0, opacity: 1 },
                }}
                initial={{ y: 10, opacity: 0.8 }}
                animate={isHovered ? "hovered" : { y: 5, opacity: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  variants={{
                    hovered: { x: 0, opacity: 1, scale: 1.05 },
                  }}
                  initial={{ x: -5, opacity: 0.8, scale: 1 }}
                  animate={
                    isHovered ? "hovered" : { x: -5, opacity: 0.8, scale: 1 }
                  }
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        className="absolute -top-4 -left-1 text-xs text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        Hola, soy
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <h3 className="text-xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                    Miguel Vivar
                  </h3>
                </motion.div>
                <motion.div
                  variants={{
                    hovered: { x: 0, opacity: 1 },
                  }}
                  initial={{ x: -10, opacity: 0.7 }}
                  animate={isHovered ? "hovered" : { x: -10, opacity: 0.7 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <p className="text-sm text-emerald-100/90">
                    Desarrollador Full Stack
                  </p>
                </motion.div>

                {/* Botón de acción que aparece al hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-4"
                    >
                      <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-medium py-1.5 px-3 rounded-md transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-700/40"
                      >
                        <span>Trabajemos juntos</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Línea decorativa animada - Mejorada */}
              <motion.div
                className="absolute bottom-[5.5rem] left-0 h-[2px] bg-gradient-to-r from-emerald-500/10 via-emerald-400 to-emerald-500/10"
                style={{ width: "30%" }}
                variants={{
                  hovered: { width: "70%", x: 0, opacity: 0.9 },
                }}
                initial={{ width: "30%", x: -5, opacity: 0.4 }}
                animate={
                  isHovered
                    ? "hovered"
                    : { width: "30%", x: -5, opacity: [0.4, 0.6, 0.4] }
                }
                transition={{
                  duration: isHovered ? 0.5 : 3,
                  repeat: isHovered ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Elementos decorativos flotantes - Mejorados */}
          <motion.div
            className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-500/10 rounded-full border border-emerald-500/40"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 10, 0],
              y: [0, -3, 0],
              boxShadow: isHovered
                ? [
                    "0 0 5px rgba(16, 185, 129, 0.3)",
                    "0 0 15px rgba(16, 185, 129, 0.5)",
                    "0 0 5px rgba(16, 185, 129, 0.3)",
                  ]
                : "0 0 5px rgba(16, 185, 129, 0.3)",
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              boxShadow: { duration: 2, repeat: isHovered ? Infinity : 0 },
            }}
          />

          <motion.div
            className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr from-emerald-500/15 to-teal-500/10 rounded-full border border-teal-500/30"
            animate={{
              scale: [1, 1.2, 1],
              y: [0, -5, 0],
              opacity: isHovered ? [0.6, 0.9, 0.6] : [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          />

          {/* Elemento decorativo adicional - Mejorado */}
          <motion.div
            className="absolute -bottom-4 right-10 w-12 h-12 bg-cyan-500/15 rounded-full border border-cyan-500/40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
              filter: isHovered
                ? ["blur(3px)", "blur(1px)", "blur(3px)"]
                : "blur(2px)",
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 2,
              filter: { duration: 3, repeat: isHovered ? Infinity : 0 },
            }}
          />

          {/* Nuevo elemento decorativo que aparece solo al hacer hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, top: "50%" }}
                animate={{ opacity: 1, scale: 1, top: "-10%" }}
                exit={{ opacity: 0, scale: 0.8, top: "50%" }}
                transition={{ duration: 0.4 }}
                className="absolute -right-8 w-12 h-12 rounded-full"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  className="text-emerald-400"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 16.8V14M17.4 12a5.6 5.6 0 11-11.2 0 5.6 5.6 0 0111.2 0z"></path>
                    <path d="M16 16l4 4M13.8 6.5h.01"></path>
                    <path d="M8.8 6.5h.01"></path>
                  </g>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileImage;
