"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
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

interface ProjectHeroProps {
  proyecto: Proyecto;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ proyecto }) => {
  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src={proyecto.imagen}
          alt={`Captura de pantalla del proyecto ${proyecto.titulo}`}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-900" />
      </div>

      {/* Contenido del hero */}
      <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegación superior */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {" "}
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 bg-neutral-800/80 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-lg hover:bg-neutral-700/80 hover:border-emerald-400/50 transition-all duration-300"
          >
            <FiArrowLeft />
            <span>Volver a Proyectos</span>
          </Link>
        </motion.div>

        {/* Información del proyecto */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {" "}
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-500 text-neutral-900 px-3 py-1 rounded-full text-sm font-bold">
              {proyecto.categoria}
            </span>
            {proyecto.destacado && (
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-neutral-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                <FaStar className="text-xs" />
                Destacado
              </span>
            )}
          </div>
          {/* Título y descripción */}
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {proyecto.titulo}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              {proyecto.descripcion}
            </p>
          </div>{" "}
          {/* Tecnologías principales */}
          <div className="flex flex-wrap gap-3">
            {proyecto.tecnologias.slice(0, 4).map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-neutral-800/60 backdrop-blur-sm border border-emerald-400/20 text-emerald-300 px-3 py-2 rounded-lg hover:border-emerald-400/40 transition-all duration-300"
              >
                <span className="text-lg text-emerald-400">{tech.icono}</span>
                <span className="font-medium">{tech.nombre}</span>
              </div>
            ))}
            {proyecto.tecnologias.length > 4 && (
              <div className="flex items-center justify-center bg-neutral-800/60 backdrop-blur-sm border border-emerald-400/20 text-emerald-300 px-3 py-2 rounded-lg">
                <span className="font-medium">
                  +{proyecto.tecnologias.length - 4} más
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHero;
