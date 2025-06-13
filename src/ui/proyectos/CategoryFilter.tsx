import React from "react";
import { motion } from "framer-motion";

interface Categoria {
  id: string;
  nombre: string;
  icono: React.ReactNode;
}

interface CategoryFilterProps {
  categorias: Categoria[];
  categoriaActiva: string;
  setCategoriaActiva: (categoria: string) => void;
  conteo?: Record<string, number>; // Nuevo prop para el conteo
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categorias,
  categoriaActiva,
  setCategoriaActiva,
  conteo = {},
}) => {
  return (
    <motion.nav
      className="flex justify-center mb-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      role="navigation"
      aria-label="Filtrar proyectos por categoría"
    >
      <div
        className="flex flex-wrap justify-center gap-3 p-3 bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-lg"
        role="group"
      >
        {categorias.map((categoria) => (
          <motion.button
            key={categoria.id}
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 cursor-pointer ${
              categoriaActiva === categoria.id
                ? "bg-emerald-300 text-neutral-900 shadow-md shadow-emerald-500/20"
                : "text-gray-400 hover:text-white hover:bg-neutral-700/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={categoriaActiva === categoria.id ? "true" : "false"}
            aria-label={`Filtrar por ${categoria.nombre}${
              conteo && conteo[categoria.id] !== undefined
                ? `, ${conteo[categoria.id]} proyectos`
                : ""
            }`}
          >
            <span className="text-current" aria-hidden="true">
              {categoria.icono}
            </span>
            <span>{categoria.nombre}</span>

            {/* Mostrar conteo si está disponible */}
            {conteo && conteo[categoria.id] !== undefined && (
              <span
                className={`ml-1 inline-flex items-center justify-center rounded-full min-w-[20px] h-5 text-xs cursor-pointer ${
                  categoriaActiva === categoria.id
                    ? "bg-neutral-800/80 text-white"
                    : "bg-neutral-700 text-gray-300"
                }`}
                aria-label={`${conteo[categoria.id]} proyectos`}
              >
                {conteo[categoria.id]}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default CategoryFilter;
