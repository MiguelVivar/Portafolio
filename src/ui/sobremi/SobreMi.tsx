"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  certificados,
  idiomas,
  valores,
  carrera,
  voluntariados,
  setupData,
} from "../../data/sobremi";
import PageHeader from "./PageHeader";
import ProfileSection from "./ProfileSection";
import ProfileImage from "./ProfileImage";
import GitHubDashboard from "./GitHubDashboard";
import Timeline from "./Timeline";
import CertificatesSection from "./CertificatesSection";
import LanguagesSection from "./LanguagesSection";
import ValuesSection from "./ValuesSection";
import AcademicProgress from "./AcademicProgress";
import VolunteeringSection from "./VolunteeringSection";
import SetupSection from "./SetupSection";
import CallToAction from "../../components/CallToAction";
import AnimatedBackground from "../../components/AnimateBackground";
import { FaFileAlt, FaChevronDown } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SobreMi: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    setIsVisible(true);

    // Añadir parallax scroll para elementos al hacer scroll
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll(".parallax-element");
      scrollElements.forEach((element) => {
        const speed = element.getAttribute("data-speed") || "0.1";
        const yPos = -window.scrollY * parseFloat(speed);
        element.setAttribute("style", `transform: translateY(${yPos}px)`);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    const contentElement = document.getElementById("profile-section");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 pt-16 relative overflow-hidden">
      {/* Banner Hero mejorado */}
      <motion.section
        style={{ opacity, scale }}
        className="relative h-[80vh] w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="z-10 text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white">
            Mi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
              Historia
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Descubre mi viaje profesional, aprendizajes y lo que me apasiona del
            mundo del desarrollo web
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#profile-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToContent();
              }}
              className="inline-flex items-center gap-2 text-white hover:text-emerald-300 transition-colors"
            >
              <span>Descubre más</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaChevronDown />
              </motion.div>
            </a>
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-900 to-transparent z-10"></div>
      </motion.section>

      <div
        className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
        id="profile-section"
      >
        {/* Encabezado principal */}
        <PageHeader
          title="Sobre"
          highlightedText="Mí"
          description="Conoce más sobre mi trayectoria, experiencia y pasión por el desarrollo web"
        />
        {/* Sección Principal con tarjetas modernas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 relative"
        >
          {/* Elementos decorativos de fondo */}
          <div
            className="absolute -z-10 w-72 h-72 bg-emerald-500/30 rounded-full blur-[100px] top-1/3 -left-20 parallax-element"
            data-speed="0.05"
          ></div>
          <div
            className="absolute -z-10 w-64 h-64 bg-teal-500/20 rounded-full blur-[80px] bottom-10 right-10 parallax-element"
            data-speed="0.08"
          ></div>
          <ProfileSection />
          <ProfileImage />
        </motion.div>
        {/* GitHub Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <GitHubDashboard />
        </motion.div>
        {/* Sección de Trayectoria con efectos de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Timeline />
        </motion.div>
        {/* Sección de Progreso Académico */}
        <AcademicProgress carrera={carrera} />
        {/* Sección de Certificados con diseño de tarjetas mejorado */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <CertificatesSection certificados={certificados} />
        </motion.div>
        {/* Sección de Idiomas con mejor visualización */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <LanguagesSection idiomas={idiomas} />
        </motion.div>{" "}
        {/* Sección de Valores con animaciones mejoradas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <ValuesSection valores={valores} />
        </motion.div>{" "}
        {/* Sección de Voluntariados */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <VolunteeringSection voluntariados={voluntariados} />
        </motion.div>
        {/* Sección de Setup de Desarrollo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <SetupSection setupData={setupData} />
        </motion.div>
        {/* Sección de Llamada a la Acción con mejor diseño */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-0 relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 -z-10"></div>

          <CallToAction
            title="¿Listo para"
            titlespan="colaborar?"
            description="Estoy disponible para nuevos proyectos y oportunidades. Si tienes una idea o necesitas ayuda con tu proyecto, ¡contáctame!"
            buttonSecondaryIcon={<FaFileAlt className="text-xl" />}
            buttonSecondaryText="Descargar CV"
            buttonSecondaryLink="https://docs.google.com/document/d/1Jo8Nd2-7r0L_dINTaHM88493LuKsEhfAAyRfLTMVv8s/edit?tab=t.0#heading=h.cgr1jzl3ngp2"
            buttonPrimaryIcon={<MdEmail className="text-xl" />}
            buttonPrimaryText="Contáctame"
            buttonPrimaryLink="/contacto"
          />
        </motion.div>
        {/* Fondo animado mejorado */}
        <AnimatedBackground />
      </div>
    </main>
  );
};

export default SobreMi;
