"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

interface ProjectGalleryProps {
  proyecto: Proyecto;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ proyecto }) => {
  // Para propósitos de demostración, usaremos la imagen principal
  // En un proyecto real, tendrías múltiples imágenes
  const galleryImages = [
    {
      src: proyecto.imagen,
      alt: `Vista principal de ${proyecto.titulo}`,
      caption: "Vista principal de la aplicación",
    },
    // Puedes agregar más imágenes aquí en el futuro
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Capturas de Pantalla
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {" "}
            <div className="relative overflow-hidden rounded-lg bg-neutral-800 border border-emerald-400/10">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={500}
                className="w-full h-auto object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-emerald-300">
                  <p className="text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>{" "}
      {/* Información adicional sobre las capturas */}
      <div className="bg-neutral-800 border border-emerald-400/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          Sobre las Capturas
        </h3>
        <p className="text-gray-300">
          Las capturas muestran la interfaz principal del proyecto, destacando
          el diseño responsivo y las características clave implementadas. Cada
          elemento ha sido cuidadosamente diseñado para proporcionar la mejor
          experiencia de usuario posible.
        </p>
      </div>
    </section>
  );
};

export default ProjectGallery;
