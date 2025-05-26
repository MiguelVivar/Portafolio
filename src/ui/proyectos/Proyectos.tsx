"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { proyectos, categorias } from "../../data/proyectos";
import PageHeader from "./PageHeader";
import CategoryFilter from "./CategoryFilter";
import LoadingSpinner from "./LoadingSpinner";
import ProjectCard from "./ProjectCard";
import AnimatedBackground from "../../components/AnimateBackground";
import CallToAction from "../../components/CallToAction";
import {
  FaGithub,
  FaThList,
  FaThLarge,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";
import {
  FiMail,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

// Variantes de animación
const contenedorVariantes = {
  oculto: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  salida: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Opciones de ordenación
const sortOptions = [
  { id: "destacados", label: "Destacados primero", icon: <FaSortAmountDown /> },
  { id: "titulo_asc", label: "A-Z", icon: <FaSortAlphaDown /> },
  { id: "titulo_desc", label: "Z-A", icon: <FaSortAlphaUp /> },
  { id: "recientes", label: "Más recientes", icon: <FaSortAmountUpAlt /> },
];

const Proyectos: React.FC = () => {
  // Estados
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [proyectosMostrados, setProyectosMostrados] = useState(proyectos);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [proyectosPorPagina, setProyectosPorPagina] = useState(6);
  const [vistaGrid, setVistaGrid] = useState(true);
  const [ordenActivo, setOrdenActivo] = useState("destacados");

  // Contar proyectos por categoría para mostrar en filtros
  const proyectosPorCategoria = useMemo(() => {
    const conteo = categorias.reduce((acc, categoria) => {
      if (categoria.id === "todos") {
        acc[categoria.id] = proyectos.length;
      } else {
        acc[categoria.id] = proyectos.filter(
          (p) => p.categoria === categoria.id
        ).length;
      }
      return acc;
    }, {} as Record<string, number>);

    return conteo;
  }, []);

  // Aplicar filtros y búsqueda a los proyectos
  useEffect(() => {
    setCargando(true);

    // Filtrar por búsqueda y categoría
    let proyectosFiltrados = proyectos;

    // Filtrar por categoría
    if (categoriaActiva !== "todos") {
      proyectosFiltrados = proyectosFiltrados.filter(
        (proyecto) => proyecto.categoria === categoriaActiva
      );
    }

    // Filtrar por término de búsqueda
    if (busqueda.trim() !== "") {
      const terminoBusqueda = busqueda.toLowerCase();
      proyectosFiltrados = proyectosFiltrados.filter(
        (proyecto) =>
          proyecto.titulo.toLowerCase().includes(terminoBusqueda) ||
          proyecto.descripcion.toLowerCase().includes(terminoBusqueda) ||
          proyecto.tecnologias.some((tech) =>
            tech.nombre.toLowerCase().includes(terminoBusqueda)
          )
      );
    }

    // Aplicar ordenación
    switch (ordenActivo) {
      case "destacados":
        proyectosFiltrados = [
          ...proyectosFiltrados.filter((p) => p.destacado),
          ...proyectosFiltrados.filter((p) => !p.destacado),
        ];
        break;
      case "titulo_asc":
        proyectosFiltrados = [...proyectosFiltrados].sort((a, b) =>
          a.titulo.localeCompare(b.titulo)
        );
        break;
      case "titulo_desc":
        proyectosFiltrados = [...proyectosFiltrados].sort((a, b) =>
          b.titulo.localeCompare(a.titulo)
        );
        break;
      case "recientes":
        proyectosFiltrados = [...proyectosFiltrados].sort(
          (a, b) => b.id - a.id
        );
        break;
    }

    // Simular tiempo de carga para una mejor experiencia visual
    const tiempoEspera = setTimeout(() => {
      setProyectosMostrados(proyectosFiltrados);
      setCargando(false);
      // Reset a la primera página cuando cambian los filtros
      setPaginaActual(1);
    }, 300);

    return () => clearTimeout(tiempoEspera);
  }, [categoriaActiva, busqueda, ordenActivo]);

  // Calcular paginación
  const indexUltimoProyecto = paginaActual * proyectosPorPagina;
  const indexPrimerProyecto = indexUltimoProyecto - proyectosPorPagina;
  const proyectosActuales = proyectosMostrados.slice(
    indexPrimerProyecto,
    indexUltimoProyecto
  );
  const totalPaginas = Math.ceil(
    proyectosMostrados.length / proyectosPorPagina
  );

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina);
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        {/* Encabezado de la página */}
        <PageHeader />
        {/* Barra de herramientas superior */}
        <section
          className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8"
          aria-label="Herramientas de filtrado y búsqueda"
        >
          {/* Buscador */}
          <div className="w-full md:w-96 relative">
            <label htmlFor="search-projects" className="sr-only">
              Buscar proyectos por título, descripción o tecnología
            </label>
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-projects"
              type="text"
              placeholder="Buscar proyectos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-300/50 transition-all"
              aria-describedby="search-description"
            />
            <div id="search-description" className="sr-only">
              Busca proyectos por título, descripción o tecnología utilizada
            </div>
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Limpiar búsqueda"
                title="Limpiar búsqueda"
              >
                &times;
              </button>
            )}
          </div>
          {/* Controles de visualización */}
          <div className="flex items-center gap-4">
            {" "}
            {/* Selector de ordenación */}
            <div className="relative group">
              <button
                className="text-white bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg flex items-center gap-2 cursor-pointer"
                aria-label={`Ordenar por: ${
                  sortOptions.find((opt) => opt.id === ordenActivo)?.label
                }`}
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span aria-hidden="true">
                  {sortOptions.find((opt) => opt.id === ordenActivo)?.icon}
                </span>
                <span className="hidden sm:inline">Ordenar</span>
              </button>
              <div
                className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg overflow-hidden z-10 hidden group-hover:block"
                role="menu"
                aria-label="Opciones de ordenación"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setOrdenActivo(option.id)}
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-700 flex items-center gap-2 cursor-pointer ${
                      ordenActivo === option.id
                        ? "text-emerald-300"
                        : "text-white"
                    }`}
                    role="menuitem"
                    aria-current={ordenActivo === option.id ? "true" : "false"}
                  >
                    <span aria-hidden="true">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Toggle vista grid/lista */}
            <button
              onClick={() => setVistaGrid(!vistaGrid)}
              className="text-white bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg cursor-pointer"
              aria-label={
                vistaGrid
                  ? "Cambiar a vista de lista"
                  : "Cambiar a vista de cuadrícula"
              }
              {...(vistaGrid
                ? { "aria-pressed": "true" }
                : { "aria-pressed": "false" })}
              title={
                vistaGrid
                  ? "Cambiar a vista de lista"
                  : "Cambiar a vista de cuadrícula"
              }
            >
              <span aria-hidden="true">
                {vistaGrid ? <FaThList /> : <FaThLarge />}
              </span>
            </button>
            {/* Selector de proyectos por página */}
            <label htmlFor="items-per-page" className="sr-only">
              Proyectos por página
            </label>
            <select
              id="items-per-page"
              value={proyectosPorPagina}
              onChange={(e) => setProyectosPorPagina(Number(e.target.value))}
              className="text-white bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg border border-neutral-700 cursor-pointer"
              aria-label={`Mostrar ${proyectosPorPagina} proyectos por página`}
            >
              <option value="3">3 por página</option>
              <option value="6">6 por página</option>
              <option value="9">9 por página</option>
              <option value="12">12 por página</option>
            </select>
          </div>
        </section>
        {/* Filtro de categorías */}
        <CategoryFilter
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          setCategoriaActiva={setCategoriaActiva}
          conteo={proyectosPorCategoria}
        />{" "}
        {/* Estado de carga */}
        {cargando ? (
          <LoadingSpinner />
        ) : (
          <AnimatePresence mode="wait">
            <motion.section
              key={`${categoriaActiva}-${vistaGrid}-${paginaActual}`}
              className={
                vistaGrid
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-4"
              }
              variants={contenedorVariantes}
              initial="oculto"
              animate="visible"
              exit="salida"
              aria-label={`Lista de proyectos (${proyectosActuales.length} de ${proyectosMostrados.length})`}
              role="region"
            >
              {proyectosActuales.length === 0 ? (
                <motion.div
                  className="col-span-full text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  role="status"
                  aria-live="polite"
                >
                  <div
                    className="text-emerald-300 text-6xl mb-4"
                    aria-hidden="true"
                  >
                    🔍
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No se encontraron proyectos
                  </h3>
                  <p className="text-gray-400">
                    {busqueda
                      ? `No hay resultados para "${busqueda}" en esta categoría`
                      : "No hay proyectos en esta categoría"}
                  </p>
                  {busqueda && (
                    <button
                      onClick={() => setBusqueda("")}
                      className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                      aria-label="Limpiar término de búsqueda"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </motion.div>
              ) : (
                proyectosActuales.map((proyecto, index) => (
                  <ProjectCard
                    key={proyecto.id || proyecto.titulo}
                    proyecto={proyecto}
                    index={index}
                    listView={!vistaGrid}
                  />
                ))
              )}
            </motion.section>
          </AnimatePresence>
        )}{" "}
        {/* Paginación */}
        {!cargando && proyectosMostrados.length > proyectosPorPagina && (
          <motion.nav
            className="flex flex-col items-center mt-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Navegación de páginas"
            role="navigation"
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-1">              {/* Primera página */}
              <motion.button
                onClick={() => cambiarPagina(1)}
                disabled={paginaActual === 1}
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 transition-all transform active:scale-95 cursor-pointer"
                aria-label="Ir a la primera página"
                title="Primera página"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronsLeft className="text-lg" aria-hidden="true" />
              </motion.button>              {/* Página anterior */}
              <motion.button
                onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 transition-all transform active:scale-95 cursor-pointer"
                aria-label="Ir a la página anterior"
                title="Página anterior"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronLeft className="text-lg" aria-hidden="true" />
              </motion.button>

              {/* Números de página */}
              <div className="flex">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                  .filter((page) => {
                    // Mostrar siempre primera, última y páginas cercanas a la actual
                    return (
                      page === 1 ||
                      page === totalPaginas ||
                      Math.abs(page - paginaActual) <= 1
                    );
                  })
                  .map((page, i, arr) => {
                    // Si hay un salto en la secuencia, mostrar puntos suspensivos
                    if (i > 0 && page - arr[i - 1] > 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <span
                            className="h-10 w-8 flex items-center justify-center text-gray-400"
                            aria-hidden="true"
                          >
                            •••
                          </span>                          <motion.button
                            key={page}
                            onClick={() => cambiarPagina(page)}
                            className={`h-10 w-10 rounded-lg flex items-center justify-center font-medium transition-all duration-300 cursor-pointer ${
                              paginaActual === page
                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                                : "bg-neutral-800 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                            }`}
                            aria-label={`Ir a la página ${page}`}
                            aria-current={
                              paginaActual === page ? "page" : "false"
                            }
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {page}
                          </motion.button>
                        </React.Fragment>
                      );
                    }                    return (
                      <motion.button
                        key={page}
                        onClick={() => cambiarPagina(page)}
                        className={`h-10 w-10 rounded-lg flex items-center justify-center font-medium transition-all duration-300 cursor-pointer ${
                          paginaActual === page
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                            : "bg-neutral-800 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
                        }`}
                        aria-label={`Ir a la página ${page}`}
                        aria-current={paginaActual === page ? "page" : "false"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {page}
                      </motion.button>
                    );
                  })}
              </div>              {/* Página siguiente */}
              <motion.button
                onClick={() =>
                  cambiarPagina(Math.min(totalPaginas, paginaActual + 1))
                }
                disabled={paginaActual === totalPaginas}
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 transition-all transform active:scale-95 cursor-pointer"
                aria-label="Ir a la página siguiente"
                title="Página siguiente"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronRight className="text-lg" aria-hidden="true" />
              </motion.button>              {/* Última página */}
              <motion.button
                onClick={() => cambiarPagina(totalPaginas)}
                disabled={paginaActual === totalPaginas}
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-neutral-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 transition-all transform active:scale-95 cursor-pointer"
                aria-label="Ir a la última página"
                title="Última página"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronsRight className="text-lg" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Indicador de página móvil */}
            <div
              className="text-gray-400 text-sm font-medium"
              aria-live="polite"
            >
              Página <span className="text-emerald-400">{paginaActual}</span> de{" "}
              <span className="text-white">{totalPaginas}</span>
            </div>
          </motion.nav>
        )}{" "}
        {/* Resumen de resultados */}
        {!cargando && (
          <motion.div
            className="text-center text-sm mt-4 flex flex-wrap justify-center gap-2 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            role="status"
            aria-live="polite"
          >
            <span className="px-3 py-1 bg-neutral-800/50 rounded-full text-gray-300">
              Mostrando{" "}
              <span className="font-medium text-emerald-400">
                {proyectosActuales.length}
              </span>{" "}
              de{" "}
              <span className="font-medium text-white">
                {proyectosMostrados.length}
              </span>{" "}
              proyectos
            </span>

            {busqueda && (
              <span className="px-3 py-1 bg-emerald-900/20 border border-emerald-500/20 rounded-full text-emerald-300 flex items-center gap-1.5">
                <FiSearch className="text-xs" aria-hidden="true" />
                <span>Filtrando: &quot;{busqueda}&quot;</span>
              </span>
            )}
          </motion.div>
        )}
        {/* Sección de llamada a la acción */}
        <div className="mt-16">
          <CallToAction
            title="¿Interesado en"
            titlespan="colaborar"
            description="Siempre estoy abierto a nuevos proyectos y desafíos. Si tienes una idea o necesitas ayuda con tu proyecto, ¡contáctame!"
            buttonSecundaryIcon={<FaGithub className="text-xl" />}
            buttonSecondaryText="Ver GitHub"
            buttonPrimaryIcon={<FiMail className="text-xl" />}
            buttonPrimaryText="Contactar"
          />
        </div>
        {/* Fondo animado */}
        <AnimatedBackground />
      </div>
    </main>
  );
};

export default Proyectos;
