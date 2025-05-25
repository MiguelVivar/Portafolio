'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes, FaCode, FaUser, FaEnvelope, FaProjectDiagram, FaHistory, FaFilter, FaClock, FaStar, FaHashtag, FaArrowRight } from 'react-icons/fa'
import { proyectos } from '@/data/proyectos'
import { Habilidad as HabilidadType, categoriasHabilidades } from '@/data/habilidades'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'project' | 'skill' | 'page' | 'command'
  url: string
  icon: React.ReactNode
  category?: string
  tags?: string[]
  score?: number
  lastAccessed?: Date
  isStarred?: boolean
}

interface SearchHistory {
  query: string
  timestamp: Date
  resultCount: number
}

interface SearchCommand {
  id: string
  command: string
  description: string
  action: () => void
  icon: React.ReactNode
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [recentResults, setRecentResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Comandos de búsqueda especiales con protección para SSR
  const searchCommands: SearchCommand[] = useMemo(() => [
    {
      id: 'clear-history',
      command: '/clear',
      description: 'Limpiar historial de búsqueda',
      action: () => {
        setSearchHistory([])
        setRecentResults([])
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('search-history')
            localStorage.removeItem('recent-results')
          } catch (error) {
            console.error('Error clearing localStorage:', error)
          }
        }
      },
      icon: <FaTimes />
    },
    {
      id: 'go-home',
      command: '/home',
      description: 'Ir a página de inicio',
      action: () => {
        if (typeof window !== 'undefined') {
          window.location.href = '/'
        }
        setIsOpen(false)
      },
      icon: <FaUser />
    },
    {
      id: 'contact',
      command: '/contact',
      description: 'Ir a página de contacto',
      action: () => {
        if (typeof window !== 'undefined') {
          window.location.href = '/contacto'
        }
        setIsOpen(false)
      },
      icon: <FaEnvelope />
    }
  ], [])

  // Datos de búsqueda mejorados con protección para datos faltantes
  const searchData: SearchResult[] = useMemo(() => {
    const data: SearchResult[] = []
    
    // Páginas
    data.push(
      {
        id: 'home',
        title: 'Inicio',
        description: 'Página principal con información general y presentación profesional',
        type: 'page',
        url: '/',
        icon: <FaUser />,
        category: 'Navegación',
        tags: ['inicio', 'home', 'principal', 'presentación', 'perfil'],
        score: 0
      },
      {
        id: 'projects',
        title: 'Proyectos',
        description: 'Galería de proyectos desarrollados con diferentes tecnologías',
        type: 'page',
        url: '/proyectos',
        icon: <FaProjectDiagram />,
        category: 'Navegación',
        tags: ['proyectos', 'portfolio', 'trabajos', 'desarrollo', 'código'],
        score: 0
      },
      {
        id: 'skills',
        title: 'Habilidades',
        description: 'Tecnologías, herramientas y competencias técnicas',
        type: 'page',
        url: '/habilidades',
        icon: <FaCode />,
        category: 'Navegación',
        tags: ['habilidades', 'skills', 'tecnologías', 'competencias', 'conocimientos'],
        score: 0
      },
      {
        id: 'about',
        title: 'Sobre Mí',
        description: 'Mi historia, experiencia profesional y trayectoria',
        type: 'page',
        url: '/sobremi',
        icon: <FaUser />,
        category: 'Navegación',
        tags: ['sobre mi', 'about', 'experiencia', 'biografía', 'historia'],
        score: 0
      },
      {
        id: 'contact',
        title: 'Contacto',
        description: 'Formulario de contacto y redes sociales',
        type: 'page',
        url: '/contacto',
        icon: <FaEnvelope />,
        category: 'Navegación',
        tags: ['contacto', 'contact', 'email', 'mensaje', 'comunicación'],
        score: 0
      }
    )
    
    // Proyectos con información expandida y protección para datos faltantes
    if (Array.isArray(proyectos)) {
      const projectsData = proyectos.map(proyecto => ({
        id: `project-${proyecto.id || Math.random()}`,
        title: proyecto.titulo || 'Proyecto sin título',
        description: proyecto.descripcion || 'Sin descripción',
        type: 'project' as const,
        url: `/proyectos/${proyecto.id || ''}`,
        icon: <FaProjectDiagram />,
        category: proyecto.categoria || 'Proyecto',
        tags: [
          (proyecto.titulo || '').toLowerCase(),
          (proyecto.categoria || '').toLowerCase(),
          ...(proyecto.tecnologias || []).map(tech => (tech.nombre || '').toLowerCase()),
          'proyecto', 'development'
        ].filter(Boolean), // Filtrar valores vacíos
        score: 0,
        isStarred: Boolean(proyecto.destacado)
      }))
      data.push(...projectsData)
    }

    // Habilidades con información expandida y protección para datos faltantes
    if (Array.isArray(categoriasHabilidades)) {
      const skillsData = categoriasHabilidades.flatMap((categoria) => 
        (categoria.habilidades || []).map((habilidad: HabilidadType) => ({
          id: `skill-${habilidad.nombre || Math.random()}`,
          title: habilidad.nombre || 'Habilidad sin nombre',
          description: habilidad.descripcion || `Habilidad en ${habilidad.nombre || 'tecnología'} - Nivel: ${habilidad.nivel || 'No especificado'}`,
          type: 'skill' as const,
          url: '/habilidades',
          icon: <FaCode />,
          category: categoria.titulo || 'Sin categoría',
          tags: [
            (habilidad.nombre || '').toLowerCase(),
            (categoria.titulo || '').toLowerCase(),
            (habilidad.nivel || '').toLowerCase(),
            'habilidad', 'skill', 'tecnología'
          ].filter(Boolean), // Filtrar valores vacíos
          score: 0
        }))
      )
      data.push(...skillsData)
    }

    // Comandos
    const commandsData = searchCommands.map(cmd => ({
      id: cmd.id,
      title: cmd.command,
      description: cmd.description,
      type: 'command' as const,
      url: '',
      icon: cmd.icon,
      category: 'Comando',
      tags: [cmd.command, 'comando', 'command'],
      score: 0
    }))
    data.push(...commandsData)

    return data
  }, [searchCommands])

  // Cargar datos del localStorage al montar con protección para SSR
  useEffect(() => {
    // Proteger contra errores de SSR
    if (typeof window === 'undefined') return
    
    try {
      const savedHistory = localStorage.getItem('search-history')
      const savedRecents = localStorage.getItem('recent-results')
      
      if (savedHistory) {
        try {
          const history = JSON.parse(savedHistory).map((item: SearchHistory) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }))
          setSearchHistory(history)
        } catch (error) {
          console.error('Error loading search history:', error)
          // Limpiar datos corruptos
          localStorage.removeItem('search-history')
        }
      }
      
      if (savedRecents) {
        try {
          const recents = JSON.parse(savedRecents).map((item: SearchResult) => ({
            ...item,
            lastAccessed: item.lastAccessed ? new Date(item.lastAccessed) : undefined
          }))
          setRecentResults(recents)
        } catch (error) {
          console.error('Error loading recent results:', error)
          // Limpiar datos corruptos
          localStorage.removeItem('recent-results')
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
  }, [])

  // Algoritmo de búsqueda mejorado con scoring
  const calculateRelevanceScore = useCallback((item: SearchResult, searchQuery: string): number => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return 0

    let score = 0
    const title = item.title.toLowerCase()
    const description = item.description.toLowerCase()
    const tags = item.tags?.join(' ').toLowerCase() || ''

    // Coincidencia exacta en título (peso alto)
    if (title === query) score += 100
    else if (title.includes(query)) score += 80

    // Coincidencia al inicio del título
    if (title.startsWith(query)) score += 60

    // Coincidencia en descripción
    if (description.includes(query)) score += 40

    // Coincidencia en tags
    if (tags.includes(query)) score += 50

    // Bonus por tipo de contenido
    if (item.type === 'page') score += 10
    if (item.type === 'project' && item.isStarred) score += 15
    if (item.type === 'command' && query.startsWith('/')) score += 70

    // Bonus por acceso reciente
    if (item.lastAccessed) {
      const daysSinceAccess = (Date.now() - item.lastAccessed.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceAccess < 7) score += 20
    }

    // Coincidencias parciales en palabras
    const queryWords = query.split(' ')
    queryWords.forEach(word => {
      if (word.length > 2) {
        if (title.includes(word)) score += 15
        if (description.includes(word)) score += 10
        if (tags.includes(word)) score += 12
      }
    })

    return score
  }, [])
  // Función de búsqueda optimizada
  const performSearch = useCallback((searchQuery: string) => {
    setIsLoading(true)
    
    // Simular delay para mostrar loading state
    setTimeout(() => {
      if (!searchQuery.trim()) {
        setResults([])
        setIsLoading(false)
        return
      }

      const query = searchQuery.toLowerCase().trim()

      // Manejar comandos especiales
      if (query.startsWith('/')) {
        const matchingCommands = searchCommands.filter(cmd =>
          cmd.command.toLowerCase().includes(query)
        ).map(cmd => ({
          id: cmd.id,
          title: cmd.command,
          description: cmd.description,
          type: 'command' as const,
          url: '',
          icon: cmd.icon,
          category: 'Comando',
          tags: [cmd.command],
          score: calculateRelevanceScore({
            id: cmd.id,
            title: cmd.command,
            description: cmd.description,
            type: 'command',
            url: '',
            icon: cmd.icon,
            tags: [cmd.command]
          }, query)
        }))
        
        setResults(matchingCommands.slice(0, 5))
        setSelectedIndex(0)
        setIsLoading(false)
        return
      }

      // Búsqueda normal con scoring
      const scoredResults = searchData
        .map(item => ({
          ...item,
          score: calculateRelevanceScore(item, query)
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 10)

      setResults(scoredResults)
      setSelectedIndex(0)

      // Guardar en historial si hay resultados con protección para SSR
      if (scoredResults.length > 0 && typeof window !== 'undefined') {
        setSearchHistory(prev => {
          const newHistoryEntry: SearchHistory = {
            query: searchQuery,
            timestamp: new Date(),
            resultCount: scoredResults.length
          }
          
          const updatedHistory = [newHistoryEntry, ...prev.slice(0, 9)]
          try {
            localStorage.setItem('search-history', JSON.stringify(updatedHistory))
          } catch (error) {
            console.error('Error saving search history:', error)
          }
          return updatedHistory
        })
      }

      setIsLoading(false)
    }, 100)
  }, [searchData, calculateRelevanceScore, searchCommands])

  // Debounced search - usando useRef para evitar re-renders
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query)
    }, 200)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [query, performSearch])
  // Función para manejar selección de resultado con protección para SSR
  const handleResultSelect = useCallback((result: SearchResult) => {
    if (result.type === 'command') {
      const command = searchCommands.find(cmd => cmd.id === result.id)
      if (command) {
        command.action()
        return
      }
    }

    // Actualizar resultados recientes con protección para SSR
    const updatedResult = {
      ...result,
      lastAccessed: new Date()
    }
    
    setRecentResults(prev => {
      const updatedRecents = [
        updatedResult,
        ...prev.filter(r => r.id !== result.id).slice(0, 4)
      ]
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('recent-results', JSON.stringify(updatedRecents))
        } catch (error) {
          console.error('Error saving recent results:', error)
        }
      }
      return updatedRecents
    })

    // Navegar si no es comando y window está disponible
    if (result.url && typeof window !== 'undefined') {
      window.location.href = result.url
    }
    
    setIsOpen(false)
    setQuery('')
  }, [searchCommands])
  // Navegación por teclado mejorada
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Abrir buscador
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
        return
      }

      // Cerrar buscador
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        return
      }

      if (!isOpen) return

      // Obtener resultados filtrados localmente
      const localFilteredResults = activeFilter === 'all' ? results : results.filter(result => result.type === activeFilter)

      // Navegación en resultados
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < localFilteredResults.length - 1 ? prev + 1 : 0
        )
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : localFilteredResults.length - 1
        )
      }

      // Seleccionar resultado
      if (e.key === 'Enter' && localFilteredResults[selectedIndex]) {
        e.preventDefault()
        handleResultSelect(localFilteredResults[selectedIndex])
      }

      // Limpiar búsqueda
      if (e.key === 'Backspace' && e.ctrlKey) {
        e.preventDefault()
        setQuery('')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, handleResultSelect, results, activeFilter])

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Filtros de resultados
  const filteredResults = useMemo(() => {
    if (activeFilter === 'all') return results
    return results.filter(result => result.type === activeFilter)
  }, [results, activeFilter])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'text-blue-400'
      case 'skill': return 'text-emerald-400'
      case 'page': return 'text-purple-400'
      case 'command': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'project': return 'Proyecto'
      case 'skill': return 'Habilidad'
      case 'page': return 'Página'
      case 'command': return 'Comando'
      default: return 'Resultado'
    }
  }

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={`highlight-${index}`} className="bg-emerald-500/30 text-emerald-300 rounded px-1">
          {part}
        </mark>
      ) : (
        <span key={`text-${index}`}>{part}</span>
      )
    )
  }

  return (
    <>
      {/* Botón de búsqueda mejorado */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-3 px-4 py-2.5 bg-neutral-800/50 border border-neutral-700 rounded-xl text-gray-400 hover:text-white hover:border-emerald-500/50 hover:bg-neutral-800/80 transition-all duration-300 min-w-[200px]"
        aria-label="Abrir búsqueda global"
      >
        <FaSearch className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
        <span className="flex-1 text-left text-sm">Buscar en el sitio...</span>
        <div className="flex items-center gap-1">
          <kbd className="text-xs bg-neutral-700 px-2 py-1 rounded-md font-mono">
            Ctrl
          </kbd>
          <span className="text-xs text-neutral-500">+</span>
          <kbd className="text-xs bg-neutral-700 px-2 py-1 rounded-md font-mono">
            K
          </kbd>
        </div>
      </button>

      {/* Modal de búsqueda mejorado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-start justify-center pt-[8vh] px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full max-w-3xl bg-neutral-900/95 border border-neutral-700/50 rounded-2xl shadow-2xl backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header con búsqueda */}
                <div className="relative">
                  <div className="flex items-center gap-4 px-6 py-4 border-b border-neutral-700/50">
                    <FaSearch className={`w-5 h-5 transition-colors ${isLoading ? 'text-emerald-400 animate-pulse' : 'text-gray-400'}`} />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Buscar proyectos, habilidades, páginas... (usa / para comandos)"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 bg-transparent text-white text-lg placeholder-gray-400 outline-none"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery('')}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Filtros */}
                  {query && results.length > 0 && (
                    <div className="flex items-center gap-2 px-6 py-3 border-b border-neutral-800/50">
                      <FaFilter className="w-4 h-4 text-gray-400" />
                      <div className="flex gap-2">
                        {[
                          { key: 'all', label: 'Todos', count: results.length },
                          { key: 'page', label: 'Páginas', count: results.filter(r => r.type === 'page').length },
                          { key: 'project', label: 'Proyectos', count: results.filter(r => r.type === 'project').length },
                          { key: 'skill', label: 'Habilidades', count: results.filter(r => r.type === 'skill').length },
                          { key: 'command', label: 'Comandos', count: results.filter(r => r.type === 'command').length }
                        ].map(filter => filter.count > 0 && (
                          <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all ${
                              activeFilter === filter.key
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-neutral-800/50 text-gray-400 hover:text-white border border-transparent'
                            }`}
                          >
                            {filter.label} ({filter.count})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Contenido de resultados */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Estado de carga */}
                  {isLoading && (
                    <div className="px-6 py-8 text-center">
                      <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-gray-400">Buscando...</p>
                    </div>
                  )}

                  {/* Sin búsqueda - mostrar historial y recientes */}
                  {!query && !isLoading && (
                    <div className="p-6 space-y-6">
                      {/* Resultados recientes */}
                      {recentResults.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaClock className="w-4 h-4 text-gray-400" />
                            <h3 className="text-sm font-medium text-gray-300">Visitados recientemente</h3>
                          </div>
                          <div className="space-y-1">
                            {recentResults.slice(0, 3).map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultSelect(result)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors text-left"
                              >
                                <div className={`w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-800 ${getTypeColor(result.type)}`}>
                                  {result.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-white truncate">{result.title}</h4>
                                  <p className="text-sm text-gray-400 truncate">{result.description}</p>
                                </div>
                                <FaArrowRight className="w-4 h-4 text-gray-600" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Historial de búsquedas */}
                      {searchHistory.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaHistory className="w-4 h-4 text-gray-400" />
                            <h3 className="text-sm font-medium text-gray-300">Búsquedas recientes</h3>
                          </div>
                          <div className="space-y-1">
                            {searchHistory.slice(0, 5).map((historyItem, index) => (
                              <button
                                key={`${historyItem.query}-${index}`}
                                onClick={() => setQuery(historyItem.query)}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors text-left"
                              >
                                <FaSearch className="w-4 h-4 text-gray-500" />
                                <div className="flex-1">
                                  <span className="text-gray-300">{historyItem.query}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    {historyItem.resultCount} resultado{historyItem.resultCount !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sugerencias cuando no hay historial */}
                      {searchHistory.length === 0 && recentResults.length === 0 && (
                        <div className="text-center py-8">
                          <FaSearch className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-300 mb-2">Busca en mi portafolio</h3>
                          <p className="text-gray-400 mb-4">Encuentra proyectos, habilidades y más información</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {['React', 'Next.js', 'TypeScript', 'Python', '/contact'].map(suggestion => (
                              <button
                                key={suggestion}
                                onClick={() => setQuery(suggestion)}
                                className="px-3 py-1 bg-neutral-800/50 text-gray-400 rounded-lg hover:text-white hover:bg-neutral-700/50 transition-colors text-sm"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Resultados de búsqueda */}
                  {query && !isLoading && (
                    <>
                      {filteredResults.length === 0 ? (
                        <div className="px-6 py-8 text-center">
                          <FaSearch className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                          <h3 className="text-lg font-medium text-gray-300 mb-2">
                            No se encontraron resultados
                          </h3>
                          <p className="text-gray-400 mb-4">
                            Intenta con diferentes palabras clave o usa comandos con &quot;/&quot;
                          </p>
                          <button
                            onClick={() => setQuery('')}
                            className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors"
                          >
                            Limpiar búsqueda
                          </button>
                        </div>
                      ) : (
                        <div className="pb-2">
                          {filteredResults.map((result, index) => (
                            <motion.div
                              key={result.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <button
                                onClick={() => handleResultSelect(result)}
                                className={`w-full flex items-center gap-4 px-6 py-4 border-b border-neutral-800/30 last:border-b-0 transition-all duration-200 ${
                                  index === selectedIndex 
                                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                                    : 'hover:bg-neutral-800/30'
                                }`}
                              >
                                <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-800/80 ${getTypeColor(result.type)} relative`}>
                                  {result.icon}
                                  {result.isStarred && (
                                    <FaStar className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                  <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-semibold text-white truncate">
                                      {highlightText(result.title, query)}
                                    </h3>
                                    <span className={`text-xs px-2 py-1 rounded-full bg-neutral-800/80 border ${getTypeColor(result.type)} border-current/20`}>
                                      {getTypeLabel(result.type)}
                                    </span>
                                    {result.category && (
                                      <span className="text-xs text-gray-500">
                                        {result.category}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-400 truncate">
                                    {highlightText(result.description, query)}
                                  </p>
                                  {result.tags && result.tags.length > 0 && (
                                    <div className="flex items-center gap-1 mt-2">
                                      <FaHashtag className="w-3 h-3 text-gray-600" />
                                      <div className="flex gap-1 overflow-hidden">
                                        {result.tags.slice(0, 3).map(tag => (
                                          <span key={tag} className="text-xs text-gray-500 bg-neutral-800/50 px-2 py-0.5 rounded">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {result.score && result.score > 80 && (
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full" title="Alta relevancia" />
                                  )}
                                  <FaArrowRight className="w-4 h-4 text-gray-600" />
                                </div>
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Footer mejorado */}
                <div className="px-6 py-4 border-t border-neutral-700/50 bg-neutral-900/50">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">↑↓</kbd> Navegar
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">↵</kbd> Seleccionar
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">Ctrl+⌫</kbd> Limpiar
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {query && filteredResults.length > 0 && (
                        <span>{filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">ESC</kbd> Cerrar
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
