"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ProfilePicture from "../../assets/images/perfil.png";
import Link from "next/link";
import Image from "next/image";

const ProfileImage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const tiltX = (y - 0.5) * 5;
      const tiltY = (0.5 - x) * 5;
      
      containerRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Fondo con gradiente suave */}
      <div className="absolute -z-10 w-full h-full rounded-2xl bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-blue-600/20 blur-2xl"></div>

      <div className="relative z-10">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-neutral-900/90 backdrop-blur-sm border border-emerald-500/20"
          animate={{
            boxShadow: isHovered 
              ? "0 20px 40px -15px rgba(16, 185, 129, 0.3)" 
              : "0 10px 30px -10px rgba(16, 185, 129, 0.2)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Imagen principal */}
          <motion.div
            className="relative overflow-hidden"
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "brightness(1.1) contrast(1.05)" : "none"
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={ProfilePicture.src}
              alt="Foto de perfil de Miguel Vivar"
              className="object-cover w-full h-full"
              width={400}
              height={400}
              priority
            />

            {/* Overlay con gradiente */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent"
              animate={{
                opacity: isHovered ? 0.7 : 0.9
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Contenido */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6"
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0.9
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                y: isHovered ? 0 : 5,
                opacity: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                Miguel Vivar
              </h3>
              <p className="text-emerald-100/90 text-sm mb-4">
                Desarrollador Full Stack
              </p>
            </motion.div>

            {/* Botón de acción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-700/40"
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
          </motion.div>
        </motion.div>

        {/* Elementos decorativos */}
        <motion.div
          className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500/10 rounded-full border border-emerald-500/20"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            rotate: isHovered ? [0, 5, 0] : 0
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div
          className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full border border-teal-500/20"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            y: isHovered ? [0, -5, 0] : 0
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default ProfileImage; 