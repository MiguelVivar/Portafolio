"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiZap, FiSmartphone, FiGlobe } from "react-icons/fi";
import { FaCode, FaRocket, FaPalette, FaShieldAlt } from "react-icons/fa";
import { StaticImageData } from "next/image";

interface Proyecto {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  imagen: string | StaticImageData;
  tecnologias: { nombre: string; icono: React.ReactNode }[];
  enlaces: { tipo: string; url: string }[];
  destacado: boolean;
  estado: string;
  categoria: string;
}

interface ProjectFeaturesProps {
  proyecto: Proyecto;
}

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

const ProjectFeatures: React.FC<ProjectFeaturesProps> = ({ proyecto }) => {
  // Características base que todos los proyectos tienen
  const baseFeatures = [
    {
      icon: <FiSmartphone className="text-emerald-400" />,
      title: "Diseño Responsivo",
      description:
        "Optimizado para todos los dispositivos y tamaños de pantalla",
    },
    {
      icon: <FiZap className="text-yellow-400" />,
      title: "Alto Rendimiento",
      description: "Optimizado para velocidad de carga y experiencia fluida",
    },
    {
      icon: <FaCode className="text-blue-400" />,
      title: "Código Limpio",
      description: "Desarrollado siguiendo las mejores prácticas y estándares",
    },
    {
      icon: <FiGlobe className="text-green-400" />,
      title: "SEO Optimizado",
      description:
        "Estructura y metadatos optimizados para motores de búsqueda",
    },
  ];
  // Características específicas por proyecto
  const specificFeatures: {
    [key: number]: Array<{
      icon: React.ReactNode;
      title: string;
      description: string;
    }>;
  } = {
    1: [
      {
        icon: <FaPalette className="text-purple-400" />,
        title: "Animaciones Fluidas",
        description: "Transiciones elegantes con Framer Motion",
      },
      {
        icon: <FaRocket className="text-red-400" />,
        title: "Next.js 14",
        description: "Última versión con App Router y React Server Components",
      },
    ],
    2: [
      {
        icon: <FiCheck className="text-emerald-400" />,
        title: "Cálculos Precisos",
        description:
          "Algoritmos optimizados para cálculos de propinas y totales",
      },
      {
        icon: <FaShieldAlt className="text-blue-400" />,
        title: "Validación de Datos",
        description: "Validación en tiempo real de entradas del usuario",
      },
    ],
    5: [
      {
        icon: <FaShieldAlt className="text-blue-400" />,
        title: "Autenticación JWT",
        description: "Sistema seguro de autenticación y autorización",
      },
      {
        icon: <FaCode className="text-green-400" />,
        title: "API RESTful",
        description: "Arquitectura de API bien estructurada y documentada",
      },
    ],
    // Agregar más características específicas según sea necesario
  };

  const projectFeatures = specificFeatures[proyecto.id] || [];
  const allFeatures = [...baseFeatures, ...projectFeatures];

  return (
    <motion.section variants={itemVariants} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Características Principales
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-neutral-800 border border-emerald-400/10 rounded-lg p-6 hover:bg-neutral-700 hover:border-emerald-400/20 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-2xl">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>{" "}
      {/* Detalles técnicos adicionales */}
      <div className="bg-neutral-800 border border-emerald-400/10 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Detalles Técnicos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Metodología
            </h4>
            <p className="text-white">{getMethodology(proyecto.categoria)}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Arquitectura
            </h4>
            <p className="text-white">{getArchitecture(proyecto.categoria)}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Complejidad
            </h4>{" "}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(getComplexity(proyecto.categoria))].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                  />
                ))}
                {[...Array(5 - getComplexity(proyecto.categoria))].map(
                  (_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-neutral-600 rounded-full"
                    />
                  )
                )}
              </div>
              <span className="text-emerald-300 text-sm ml-2">
                {getComplexity(proyecto.categoria)}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Funciones auxiliares
function getMethodology(categoria: string): string {
  const methodologies: { [key: string]: string } = {
    "Front-End": "Component-based development",
    "Full-Stack": "Agile development with CI/CD",
    Software: "Object-oriented programming",
    "Back-End": "API-first development",
  };
  return methodologies[categoria] || "Modern development practices";
}

function getArchitecture(categoria: string): string {
  const architectures: { [key: string]: string } = {
    "Front-End": "SPA with component architecture",
    "Full-Stack": "Microservices architecture",
    Software: "MVC pattern",
    "Back-End": "RESTful API architecture",
  };
  return architectures[categoria] || "Scalable architecture";
}

function getComplexity(categoria: string): number {
  const complexities: { [key: string]: number } = {
    "Front-End": 3,
    "Full-Stack": 5,
    Software: 4,
    "Back-End": 4,
  };
  return complexities[categoria] || 3;
}

export default ProjectFeatures;
