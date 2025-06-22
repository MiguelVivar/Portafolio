"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { VoluntariadoData } from "@/data/sobremi";
import {
  FaCalendarAlt,
  FaHeart,
  FaUsers,
  FaExternalLinkAlt,
  FaStar,
  FaBolt,
} from "react-icons/fa";
import SectionTitle from "./SectionTitle";

interface VolunteeringSectionProps {
  voluntariados: VoluntariadoData[];
}

const VolunteeringSection: React.FC<VolunteeringSectionProps> = ({
  voluntariados,
}) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Estados para efectos avanzados
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Pre-calculamos las transformaciones fuera del render
  const rotateY = useTransform(springX, [-50, 50], [-5, 5]);
  const rotateX = useTransform(springY, [-50, 50], [5, -5]);

  // Efectos de transformación para cursor
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((event.clientX - centerX) / 10);
    mouseY.set((event.clientY - centerY) / 10);
  };

  // Estadísticas de impacto
  const impactStats = [
    {
      number: "2",
      label: "Organizaciones",
      icon: <FaUsers className="text-lg" />,
    },
    {
      number: "500+",
      label: "Personas Impactadas",
      icon: <FaStar className="text-lg" />,
    },
    {
      number: "2",
      label: "Eventos Organizados",
      icon: <FaBolt className="text-lg" />,
    },
  ];

  // Variantes de animación mejoradas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Fondo mejorado con más elementos decorativos */}
      <div className="absolute -z-10 w-96 h-96 bg-emerald-500/8 rounded-full blur-[140px] top-0 right-0 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute -z-10 w-80 h-80 bg-teal-500/6 rounded-full blur-[120px] bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute -z-10 w-64 h-64 bg-emerald-400/4 rounded-full blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Partículas flotantes */}
      <div className="absolute -z-5 inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle
            title="Mis"
            highlightedText="Voluntariados"
            description="Mi compromiso con la comunidad tecnológica a través de la participación activa en eventos y organizaciones que impulsan la innovación y el crecimiento profesional"
          />
        </motion.div>
        {/* Estadísticas de impacto */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              className="text-center group"
            >
              <div className="bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group-hover:bg-neutral-800/60">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-bold text-white group-hover:text-emerald-100 transition-colors">
                    {stat.number}
                  </span>
                </div>
                <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors text-sm">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>{" "}
        {/* Grid de voluntariados con efectos avanzados */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {voluntariados.map((voluntariado, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => {
                setHoveredCard(null);
                mouseX.set(0);
                mouseY.set(0);
              }}
              onClick={() =>
                setSelectedCard(selectedCard === index ? null : index)
              }
              className="group relative"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {" "}
              <motion.div
                className="relative bg-neutral-800/30 backdrop-blur-md rounded-3xl p-8 border border-neutral-700/30 hover:border-emerald-500/50 transition-all duration-700 h-full overflow-hidden"
                style={{
                  rotateX: hoveredCard === index ? rotateX : 0,
                  rotateY: hoveredCard === index ? rotateY : 0,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient overlay dinámico */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-teal-500/6 to-emerald-600/8 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-700"></div>

                {/* Brillo animado */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={
                    hoveredCard === index ? { x: "200%" } : { x: "-100%" }
                  }
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Header de la tarjeta mejorado */}
                <div className="flex items-start gap-5 mb-8 relative z-10">
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-500/30 shadow-xl backdrop-blur-sm relative overflow-hidden"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.4)",
                    }}
                  >
                    {/* Efecto de brillo en el icono */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="text-emerald-200 relative z-10">
                      {voluntariado.icono}
                    </div>
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors duration-500"
                      whileHover={{ x: 4 }}
                    >
                      {voluntariado.organizacion}
                    </motion.h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-emerald-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="font-semibold text-emerald-300/90 text-sm lg:text-base">
                          {voluntariado.rol}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-neutral-400">
                        <FaCalendarAlt className="text-sm text-emerald-400" />
                        <span className="text-sm">{voluntariado.periodo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción mejorada */}
                <motion.p
                  className="text-neutral-300 mb-8 leading-relaxed relative z-10 text-sm lg:text-base"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {voluntariado.descripcion}
                </motion.p>

                {/* Lista de actividades con animaciones */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                      Actividades principales
                    </h4>
                    <motion.div
                      className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"
                      initial={{ width: 0 }}
                      animate={
                        hoveredCard === index ? { width: "100%" } : { width: 0 }
                      }
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <ul className="space-y-3">
                    {voluntariado.actividades.map((actividad, actIndex) => (
                      <motion.li
                        key={actIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + actIndex * 0.05,
                        }}
                        whileHover={{ x: 8, color: "#ffffff" }}
                        className="flex items-start gap-4 text-neutral-300 group/item"
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 mt-2 flex-shrink-0"
                          whileHover={{ scale: 1.5, rotate: 180 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        />
                        <span className="text-sm leading-relaxed group-hover/item:text-white transition-colors duration-300">
                          {actividad}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Efecto de borde brillante */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-emerald-500/0 group-hover:ring-emerald-500/30 transition-all duration-700"></div>

                {/* Resplandor sutil */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-700 -z-10"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>{" "}
        {/* Call to action mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.div
            className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-neutral-800/50 to-neutral-800/30 backdrop-blur-md rounded-full border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 group cursor-pointer relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Efecto de brillo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaHeart className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 text-xl" />
            </motion.div>

            <motion.a
              className="text-neutral-300 group-hover:text-white transition-colors duration-300 font-medium relative z-10 flex items-center gap-2"
              href="https://www.linkedin.com/in/miguel-vivar-farfan/"
              target="_blank"
            >
              Comprometido con el crecimiento de la comunidad tech
              <motion.div
                className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
                whileHover={{ x: 4 }}
              >
                <FaExternalLinkAlt className="text-sm" />
              </motion.div>
            </motion.a>
          </motion.div>
          {/* Línea decorativa animada */}
          <motion.div
            className="mt-8 mx-auto h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          />{" "}
        </motion.div>
      </div>
    </section>
  );
};

export default VolunteeringSection;
