"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { FaStar, FaCode } from "react-icons/fa";
import Link from "next/link";
import { StaticImageData } from "next/image";
import ProjectHero from "./ProjectHero";
import ProjectFeatures from "./ProjectFeatures";
import ProjectTechnologies from "./ProjectTechnologies";
import ProjectGallery from "./ProjectGallery";
import RelatedProjects from "./RelatedProjects";

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

interface ProjectDetailPageProps {
  proyecto: Proyecto;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ proyecto }) => {
  return (
    <motion.div
      className="min-h-screen bg-neutral-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <ProjectHero proyecto={proyecto} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content Principal */}
          <motion.div
            className="lg:col-span-2 space-y-12"
            variants={itemVariants}
          >
            {/* Descripción Detallada */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">
                Acerca del Proyecto
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {proyecto.descripcion}
                </p>

                {/* Descripción adicional basada en el proyecto */}
                <div className="space-y-4 text-gray-300">
                  {getProjectDescription(proyecto)}
                </div>
              </div>
            </section>

            {/* Características */}
            <ProjectFeatures proyecto={proyecto} />

            {/* Galería de imágenes */}
            <ProjectGallery proyecto={proyecto} />
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {" "}
            {/* Información del Proyecto */}
            <div className="bg-neutral-800 border border-emerald-400/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Información del Proyecto
              </h3>
              <div className="space-y-4">
                {/* Estado */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Estado
                  </h4>{" "}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        proyecto.destacado ? "bg-emerald-400" : "bg-emerald-500"
                      }`}
                    />
                    <span className="text-white">
                      {proyecto.destacado ? "En desarrollo" : "Completado"}
                    </span>
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Categoría
                  </h4>
                  <div className="flex items-center gap-2">
                    <FaCode className="text-emerald-400" />
                    <span className="text-white">{proyecto.categoria}</span>
                  </div>
                </div>

                {/* Destacado */}
                {proyecto.destacado && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Destacado
                    </h4>{" "}
                    <div className="flex items-center gap-2">
                      <FaStar className="text-emerald-400" />
                      <span className="text-white">Proyecto Destacado</span>
                    </div>
                  </div>
                )}
              </div>{" "}
              {/* Enlaces del proyecto */}
              <div className="mt-6 pt-6 border-t border-emerald-400/20">
                <h4 className="text-sm font-semibold text-emerald-300 uppercase tracking-wide mb-4">
                  Enlaces
                </h4>
                <div className="flex flex-col gap-3">
                  {proyecto.enlaces.map((enlace, index) => (
                    <Link
                      key={index}
                      href={enlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 border ${
                        enlace.tipo === "github"
                          ? "bg-neutral-700 border-emerald-400/20 hover:bg-neutral-600 hover:border-emerald-400/40 text-white"
                          : "bg-emerald-500 border-emerald-400 hover:bg-emerald-400 text-neutral-900 font-bold"
                      }`}
                    >
                      {enlace.tipo === "github" ? (
                        <FiGithub className="text-lg" />
                      ) : (
                        <FiExternalLink className="text-lg" />
                      )}
                      <span className="font-medium">
                        {enlace.tipo === "github" ? "Ver Código" : "Ver Demo"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Tecnologías */}
            <ProjectTechnologies tecnologias={proyecto.tecnologias} />
          </motion.div>
        </div>

        {/* Proyectos Relacionados */}
        <motion.div className="mt-16" variants={itemVariants}>
          <RelatedProjects currentProject={proyecto} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Función para obtener descripción adicional basada en el proyecto
function getProjectDescription(proyecto: Proyecto) {
  const descriptions: { [key: number]: React.ReactNode[] } = {
    1: [
      <p key="1">
        Este portafolio personal fue diseñado con un enfoque en la experiencia
        del usuario y el rendimiento. Utiliza las últimas tecnologías de React y
        Next.js para ofrecer una navegación fluida y un diseño responsivo.
      </p>,
      <p key="2">
        Las animaciones están implementadas con Framer Motion, proporcionando
        transiciones suaves y elegantes que mejoran la interactividad sin
        comprometer el rendimiento.
      </p>,
    ],
    2: [
      <p key="1">
        Una aplicación web práctica que permite a los usuarios calcular de
        manera eficiente el total de consumo en restaurantes, incluyendo el
        cálculo automático de propinas basado en porcentajes personalizables.
      </p>,
      <p key="2">
        La interfaz intuitiva y responsiva garantiza una experiencia de usuario
        óptima en cualquier dispositivo.
      </p>,
    ],
    // Agregar más descripciones según sea necesario
  };

  return (
    descriptions[proyecto.id] || [
      <p key="default">
        Este proyecto demuestra el uso de tecnologías modernas para crear una
        solución eficiente y escalable. La arquitectura implementada garantiza
        un rendimiento óptimo y una experiencia de usuario excepcional.
      </p>,
    ]
  );
}

export default ProjectDetailPage;
