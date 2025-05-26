'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { categoriasHabilidades } from '../../data/habilidades';
import PageHeader from './PageHeader';
import CategoryHeader from './CategoryHeader';
import HabilidadCard from './HabilidadCard';
import AnimatedBackground from '../../components/AnimateBackground';
import { motion, AnimatePresence } from 'framer-motion';
import CallToAction from '../../components/CallToAction';
import { FiFolder, FiMail, FiSearch, FiFilter, FiBarChart2, FiX, FiChevronUp } from 'react-icons/fi';

const Habilidades: React.FC = () => {
  // Estados para los filtros y la búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Lista de niveles disponibles
  const niveles = ['Básico', 'Intermedio', 'Avanzado'];

  // Seguimiento del desplazamiento para el botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lista de todas las categorías disponibles
  const categorias = useMemo(() => {
    return ['Todas', ...categoriasHabilidades.map(cat => cat.titulo)];
  }, []);

  // Cálculo de estadísticas de habilidades
  const estadisticasHabilidades = useMemo(() => {
    const total = categoriasHabilidades.reduce((acc, cat) => acc + cat.habilidades.length, 0);
    const porNivel = {
      'Avanzado': categoriasHabilidades.reduce((acc, cat) => 
        acc + cat.habilidades.filter(h => h.nivel === 'Avanzado').length, 0),
      'Intermedio': categoriasHabilidades.reduce((acc, cat) => 
        acc + cat.habilidades.filter(h => h.nivel === 'Intermedio').length, 0),
      'Básico': categoriasHabilidades.reduce((acc, cat) => 
        acc + cat.habilidades.filter(h => h.nivel === 'Básico').length, 0)
    };
    
    return { total, porNivel };
  }, []);

  // Filtrado de habilidades según los filtros aplicados
  const categoriasFiltradas = useMemo(() => {
    if (selectedCategory === 'Todas' && selectedLevel === 'Todos' && !searchTerm) {
      return categoriasHabilidades;
    }

    return categoriasHabilidades
      .map(categoria => {
        // Filtrar primero por categoría
        if (selectedCategory !== 'Todas' && categoria.titulo !== selectedCategory) {
          return null;
        }

        // Luego filtrar las habilidades por nivel y término de búsqueda
        const habilidadesFiltradas = categoria.habilidades.filter(habilidad => {
          const matchesLevel = selectedLevel === 'Todos' || habilidad.nivel === selectedLevel;
          const matchesSearch = !searchTerm || 
            habilidad.nombre.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesLevel && matchesSearch;
        });

        // Si no hay habilidades que coincidan, no mostrar la categoría
        if (habilidadesFiltradas.length === 0) {
          return null;
        }

        // Devolver una nueva categoría con las habilidades filtradas
        return {
          ...categoria,
          habilidades: habilidadesFiltradas
        };
      })
      .filter(Boolean); // Eliminar las categorías que no tienen habilidades que coincidan
  }, [selectedCategory, selectedLevel, searchTerm]);

  // Función para volver al principio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-900 pt-24 relative">
      <div className="w-full max-w-7xl mx-auto py-8 sm:py-12">
        <PageHeader />

        {/* Dashboard de estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-800 rounded-lg p-6 mb-8 border-l-4 border-emerald-500"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <FiBarChart2 className="text-emerald-400 mr-2" /> 
            Estadísticas de Habilidades
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-neutral-700/50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm">Total de Habilidades</p>
              <p className="text-3xl font-bold text-white">{estadisticasHabilidades.total}</p>
            </div>
            
            {Object.entries(estadisticasHabilidades.porNivel).map(([nivel, cantidad]) => (
              <div 
                key={nivel}
                className="bg-neutral-700/50 rounded-lg p-4 text-center"
              >
                <p className="text-gray-400 text-sm">Nivel {nivel}</p>
                <p className="text-3xl font-bold text-white">{cantidad}</p>
                <div className="w-full bg-neutral-600 rounded-full h-1.5 mt-2">
                  <div 
                    className={`h-1.5 rounded-full ${
                      nivel === 'Avanzado' ? 'bg-emerald-500' : 
                      nivel === 'Intermedio' ? 'bg-emerald-400' : 'bg-emerald-300'
                    }`}
                    style={{ width: `${(cantidad / estadisticasHabilidades.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Controles de filtrado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            {/* Barra de búsqueda */}
            <div className="relative flex-grow max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                  onClick={() => setSearchTerm('')}
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* Botón de filtros en móvil */}
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden flex items-center justify-center px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white hover:bg-neutral-700"
            >
              <FiFilter className="mr-2" />
              Filtros
            </button>

            {/* Filtros en desktop */}
            <div className="hidden md:flex md:items-center gap-4">
              <div className="flex items-center">
                <label htmlFor="category-filter" className="text-gray-400 mr-2 text-sm">Categoría:</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label htmlFor="level-filter" className="text-gray-400 mr-2 text-sm">Nivel:</label>
                <select
                  id="level-filter"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Todos">Todos</option>
                  {niveles.map((nivel) => (
                    <option key={nivel} value={nivel}>{nivel}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Panel de filtros móvil */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-neutral-800 border border-neutral-700 rounded-lg p-4 mb-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="mobile-category-filter" className="text-gray-400 mb-2 text-sm">Categoría:</label>
                    <select
                      id="mobile-category-filter"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-neutral-700 border-none rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="mobile-level-filter" className="text-gray-400 mb-2 text-sm">Nivel:</label>
                    <select
                      id="mobile-level-filter"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="bg-neutral-700 border-none rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Todos">Todos</option>
                      {niveles.map((nivel) => (
                        <option key={nivel} value={nivel}>{nivel}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de filtros activos */}
          {(selectedCategory !== 'Todas' || selectedLevel !== 'Todos' || searchTerm) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center gap-2 my-4"
            >
              <span className="text-sm text-gray-400">Filtros activos:</span>
              
              {selectedCategory !== 'Todas' && (
                <span className="bg-emerald-500/20 text-emerald-300 text-xs rounded-full px-3 py-1 flex items-center">
                  {selectedCategory}
                  <button 
                    onClick={() => setSelectedCategory('Todas')}
                    className="ml-2 hover:text-white"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
              
              {selectedLevel !== 'Todos' && (
                <span className="bg-emerald-500/20 text-emerald-300 text-xs rounded-full px-3 py-1 flex items-center">
                  Nivel: {selectedLevel}
                  <button 
                    onClick={() => setSelectedLevel('Todos')}
                    className="ml-2 hover:text-white"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
              
              {searchTerm && (
                <span className="bg-emerald-500/20 text-emerald-300 text-xs rounded-full px-3 py-1 flex items-center">
                  &quot;{searchTerm}&quot;
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-white"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              )}
              
              <button 
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSelectedLevel('Todos');
                  setSearchTerm('');
                }}
                className="text-xs text-gray-400 hover:text-emerald-300 underline ml-2"
              >
                Limpiar filtros
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Mensaje de no resultados */}
        {categoriasFiltradas.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <FiSearch className="text-5xl text-neutral-700 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron habilidades</h3>
            <p className="text-gray-400 mb-4">Prueba con otros términos de búsqueda o filtros</p>
            <button 
              onClick={() => {
                setSelectedCategory('Todas');
                setSelectedLevel('Todos');
                setSearchTerm('');
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Mostrar todas las habilidades
            </button>
          </motion.div>
        )}

        {/* Lista de habilidades por categoría */}
        <AnimatePresence>
          <div className="space-y-16">
            {categoriasFiltradas.map((categoria, indiceCategoria) => (
              <motion.div
                key={categoria?.titulo || `category-${indiceCategoria}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: indiceCategoria * 0.2 }}
                className="mb-12"
              >
                {/* Non-null assertion to tell TypeScript this will never be null */}
                <CategoryHeader categoria={categoria!} />

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {categoria!.habilidades.map((habilidad, index) => (
                    <HabilidadCard 
                      key={habilidad.nombre} 
                      habilidad={habilidad} 
                      index={index} 
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Botón para volver arriba */}
        <AnimatePresence>
          {scrollPosition > 500 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-colors z-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <CallToAction 
          title='¿Interesado en mis' 
          titlespan='habilidades' 
          description='Estoy constantemente aprendiendo y mejorando mis habilidades. Si quieres saber más sobre mi trabajo o tienes un proyecto en mente, ¡contáctame!' 
          buttonSecundaryIcon={<FiFolder className="h-5 w-5" />} 
          buttonSecondaryText='Ver Proyectos' 
          buttonPrimaryIcon={<FiMail className="h-5 w-5" />} 
          buttonPrimaryText='Contactar' 
        />
        <AnimatedBackground />
      </div>
    </main>
  );
};

export default Habilidades;