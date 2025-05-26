import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaSpotify,
  FaGithub,
  FaCloud,
  FaArrowLeft,
  FaArrowRight,
  FaBook,
  FaCode,
} from "react-icons/fa";

interface DocsNavigationProps {
  currentSlug: string;
}

const docsPages = [
  {
    slug: "spotify",
    title: "Spotify API",
    icon: <FaSpotify className="text-green-500" />,
    description: "Integración con Spotify",
  },
  {
    slug: "github",
    title: "GitHub API",
    icon: <FaGithub className="text-gray-300" />,
    description: "Analytics de repositorios",
  },
  {
    slug: "weather",
    title: "Weather API",
    icon: <FaCloud className="text-blue-400" />,
    description: "Datos meteorológicos",
  },
];

const DocsNavigation: React.FC<DocsNavigationProps> = ({ currentSlug }) => {
  const currentIndex = docsPages.findIndex((page) => page.slug === currentSlug);
  const previousPage = currentIndex > 0 ? docsPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < docsPages.length - 1 ? docsPages[currentIndex + 1] : null;

  return (
    <div className="space-y-6">
      {/* Link to main portfolio documentation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-4"
      >
        <Link
          href="/documentacion"
          className="flex items-center gap-3 text-white hover:text-emerald-300 transition-colors duration-300"
        >
          <FaBook className="text-emerald-400 text-xl" />
          <div>
            <div className="font-semibold">Documentación Técnica Completa</div>
            <div className="text-sm text-gray-400">
              Arquitectura, terminal, APIs y guías de desarrollo
            </div>
          </div>
          <FaCode className="text-emerald-400 ml-auto" />
        </Link>
      </motion.div>

      {/* Quick navigation links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-neutral-800 rounded-lg p-6 border border-neutral-700"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Documentación de APIs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {docsPages.map((page) => (
            <Link
              key={page.slug}
              href={`/documentacion/${page.slug}`}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                page.slug === currentSlug
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                  : "bg-neutral-700 border-neutral-600 text-gray-300 hover:bg-neutral-600 hover:border-neutral-500"
              }`}
            >
              <div className="flex items-center gap-3">
                {page.icon}
                <div>
                  <div className="font-medium text-sm">{page.title}</div>
                  <div className="text-xs opacity-75">{page.description}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Previous/Next navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-between items-center"
      >
        {previousPage ? (
          <Link
            href={`/documentacion/${previousPage.slug}`}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white px-4 py-3 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-all duration-300"
          >
            <FaArrowLeft className="text-sm" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Anterior</div>
              <div className="text-sm font-medium">{previousPage.title}</div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {nextPage ? (
          <Link
            href={`/documentacion/${nextPage.slug}`}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white px-4 py-3 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-all duration-300"
          >
            <div className="text-right">
              <div className="text-xs text-gray-400">Siguiente</div>
              <div className="text-sm font-medium">{nextPage.title}</div>
            </div>
            <FaArrowRight className="text-sm" />
          </Link>
        ) : (
          <div></div>
        )}
      </motion.div>
    </div>
  );
};

export default DocsNavigation;
