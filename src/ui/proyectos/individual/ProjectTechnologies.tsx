"use client";

import React from "react";
import { motion } from "framer-motion";
import TechnologyBadge from "../TechnologyBadge";

interface ProjectTechnologiesProps {
  tecnologias: { nombre: string; icono: React.ReactNode }[];
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      duration: 0.5,
    },
  },
};

const ProjectTechnologies: React.FC<ProjectTechnologiesProps> = ({
  tecnologias,
}) => {
  return (
    <div className="bg-neutral-800 border border-emerald-400/10 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">
        Tecnologías Utilizadas
      </h3>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-3">
          {tecnologias.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
            >
              <TechnologyBadge tech={tech} large />
            </motion.div>
          ))}
        </div>
        {/* Estadísticas de tecnologías */}
        <div className="mt-6 pt-6 border-t border-emerald-400/20">
          <h4 className="text-sm font-semibold text-emerald-300 uppercase tracking-wide mb-4">
            Stack Tecnológico
          </h4>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Frontend:</span>
              <div className="text-white mt-1">
                {getStackInfo(tecnologias, "frontend")}
              </div>
            </div>
            <div>
              <span className="text-gray-400">Backend:</span>
              <div className="text-white mt-1">
                {getStackInfo(tecnologias, "backend")}
              </div>
            </div>
            <div>
              <span className="text-gray-400">Database:</span>
              <div className="text-white mt-1">
                {getStackInfo(tecnologias, "database")}
              </div>
            </div>
            <div>
              <span className="text-gray-400">Tools:</span>
              <div className="text-white mt-1">
                {getStackInfo(tecnologias, "tools")}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Función para categorizar tecnologías
function getStackInfo(
  tecnologias: { nombre: string; icono: React.ReactNode }[],
  type: string
): string {
  const techNames = tecnologias.map((tech) => tech.nombre);

  const categories = {
    frontend: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Boostrap",
      "Pug",
    ],
    backend: ["NodeJS", "Express", "Java"],
    database: ["MongoDB", "MySQL", "PostgreSQL"],
    tools: ["JWT", "Voiceflow", "Heroku", "Railway", "Odoo"],
  };

  const categoryTechs = categories[type as keyof typeof categories] || [];
  const foundTechs = techNames.filter((tech) => categoryTechs.includes(tech));

  return foundTechs.length > 0 ? foundTechs.join(", ") : "N/A";
}

export default ProjectTechnologies;

