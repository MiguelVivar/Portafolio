"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { proyectos } from "@/data/proyectos";
import ProjectCard from "../ProjectCard";
import { StaticImageData } from "next/image";

interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string | StaticImageData;
  tecnologias: { nombre: string; icono: React.ReactNode }[];
  enlaces: { tipo: string; url: string }[];
  destacado: boolean;
  categoria: string;
}

interface RelatedProjectsProps {
  currentProject: Proyecto;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.6,
    },
  },
};

const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  currentProject,
}) => {
  // Filtrar proyectos relacionados (misma categoría, excluyendo el actual)
  const relatedProjects = proyectos
    .filter(
      (proyecto) =>
        proyecto.id !== currentProject.id &&
        proyecto.categoria === currentProject.categoria
    )
    .slice(0, 3); // Máximo 3 proyectos relacionados

  // Si no hay proyectos de la misma categoría, mostrar otros proyectos destacados
  const fallbackProjects = proyectos
    .filter(
      (proyecto) => proyecto.id !== currentProject.id && proyecto.destacado
    )
    .slice(0, 3);

  const projectsToShow =
    relatedProjects.length > 0 ? relatedProjects : fallbackProjects;

  if (projectsToShow.length === 0) {
    return null;
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Proyectos Relacionados
          </h2>
          <p className="text-gray-400">
            {relatedProjects.length > 0
              ? `Otros proyectos de ${currentProject.categoria}`
              : "Otros proyectos destacados"}
          </p>
        </div>
        <Link
          href="/proyectos"
          className="bg-emerald-500 hover:bg-emerald-400 text-neutral-900 px-6 py-3 rounded-lg transition-all duration-300 font-bold hover:scale-105"
        >
          Ver Todos
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {projectsToShow.map((proyecto, index) => (
          <motion.div
            key={proyecto.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProjectCard proyecto={proyecto} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action si hay más proyectos */}
      {proyectos.length > 4 && (
        <motion.div className="text-center pt-8" variants={itemVariants}>
          <p className="text-gray-400 mb-4">¿Te gustaría ver más proyectos?</p>{" "}
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 bg-neutral-800 border border-emerald-400/30 hover:bg-neutral-700 hover:border-emerald-400/50 text-emerald-300 px-6 py-3 rounded-lg transition-all duration-300"
          >
            <span>Explorar Portafolio Completo</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      )}
    </motion.section>
  );
};

export default RelatedProjects;
