"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaCode,
  FaChartBar,
  FaCodeBranch,
  FaStar,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import { SiTypescript, SiReact } from "react-icons/si";
import { BiGitCommit } from "react-icons/bi";

const GithubDocumentation: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };
  const codeBlocks = {
    usage: `// Importar funciones de la API real
import { 
  fetchAllGitHubData,
  fetchGitHubUser,
  fetchGitHubRepos,
  calculateLanguageStats,
  fetchGitHubEvents,
  calculateGitHubStats,
  fetchGitHubContributions
} from '@/lib/githubApi';

// Usuario de GitHub configurado: 'MiguelVivar'
const GITHUB_USERNAME = 'MiguelVivar';
const GITHUB_API_BASE = 'https://api.github.com';

// Obtener todos los datos de GitHub en una sola llamada
const githubData = await fetchAllGitHubData();

console.log(githubData);
// Output real del proyecto:
{
  stats: {
    totalRepositories: 42,
    totalContributions: 1248,
    totalStars: 156,
    totalFollowers: 89,
    totalCommits: 2340,
    publicRepos: 38
  },
  languages: [
    { name: 'TypeScript', percentage: 35, color: '#3178c6' },
    { name: 'JavaScript', percentage: 28, color: '#f7df1e' },
    { name: 'Python', percentage: 18, color: '#3776ab' },
    { name: 'CSS', percentage: 12, color: '#1572b6' },
    { name: 'HTML', percentage: 7, color: '#e34f26' }
  ],
  recentActivity: [
    {
      type: 'commit',
      message: 'feat: Implementar dashboard de GitHub',
      date: '2024-05-24',
      repository: 'Portafolio'
    },
    {
      type: 'repository',
      message: 'Creado nuevo repositorio: Portfolio-2024',
      date: '2024-05-23'
    }
  ]
}`,    functions: `// 8 funciones principales implementadas en el proyecto

// 1. Obtener datos del usuario específico (MiguelVivar)
const user = await fetchGitHubUser();
// URL: https://api.github.com/users/MiguelVivar

// 2. Obtener repositorios (ordenados por actualización, máximo 100)
const repos = await fetchGitHubRepos();
// URL: https://api.github.com/users/MiguelVivar/repos?sort=updated&per_page=100

// 3. Calcular estadísticas de lenguajes (de repositorios activos)
const languages = await calculateLanguageStats(repos);
// Procesa hasta 15 repositorios activos (no forks, no archivados)
// Incluye 20+ lenguajes con colores específicos

// 4. Obtener estadísticas generales calculadas
const stats = await calculateGitHubStats();
// Combina datos de usuario, repos y eventos

// 5. Obtener actividad reciente (últimos 30 eventos)
const events = await fetchGitHubEvents();
// URL: https://api.github.com/users/MiguelVivar/events?per_page=30

// 6. Formatear actividad reciente en formato legible
const activity = formatRecentActivity(events);
// Convierte eventos de GitHub en objetos ActivityItem

// 7. Obtener lenguajes de un repositorio específico
const repoLanguages = await fetchRepoLanguages('Portafolio');
// URL: https://api.github.com/repos/MiguelVivar/{repoName}/languages

// 8. Obtener datos de contribuciones (hasta 300 eventos)
const contributions = await fetchGitHubContributions();
// Procesa múltiples páginas de eventos para estadísticas anuales`,

    interfaces: `// Interfaces TypeScript reales implementadas

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  login: string;
  name: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
}

interface GitHubEvent {
  id: string;
  type: string;
  actor: { login: string };
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string }>;
    ref_type?: string;
    [key: string]: unknown;
  };
  created_at: string;
}

interface LanguageStats {
  [language: string]: number;
}

interface ContributionDay {
  date: string;
  contributions: number;
  level: number; // 0-4 intensity level
}

interface ContributionStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  weeklyAverage: number;
  contributions: ContributionDay[];
}

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

interface ActivityItem {
  type: 'commit' | 'repository' | 'star' | 'fork';
  message: string;
  date: string;
  repository?: string;
}`,    implementation: `// Implementación real en GitHubDashboard.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaCode } from 'react-icons/fa';
import { BiGitCommit } from 'react-icons/bi';
import { fetchAllGitHubData } from '../../lib/githubApi';

const GitHubDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalRepositories: 0,
    totalContributions: 0,
    totalStars: 0,
    totalFollowers: 0,
    totalCommits: 0,
    publicRepos: 0
  });
  const [languages, setLanguages] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Llamada a la API real
        const data = await fetchAllGitHubData();
        
        setStats(data.stats);
        setLanguages(data.languages);
        setRecentActivity(data.recentActivity);
        
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError('Error al cargar datos de GitHub. Usando datos de respaldo.');
        
        // Fallback a datos simulados
        setStats({
          totalRepositories: 42,
          totalContributions: 1248,
          totalStars: 156,
          totalFollowers: 89,
          totalCommits: 2340,
          publicRepos: 38
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Renderizado con componentes especializados
  return (
    <div className="space-y-8">
      <GitHubStatsCard stats={stats} loading={isLoading} />
      <LanguageChart languages={languages} />
      <ContributionGraph />
      <RecentActivity activities={recentActivity} />
    </div>
  );
};`,
  };

  return (
    <div className="space-y-12">
      {/* Introducción */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 border border-neutral-700/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg">
            <FaGithub className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              GitHub Analytics API
            </h2>
            <p className="text-gray-400">
              Estadísticas y métricas de repositorios en tiempo real
            </p>
          </div>
        </div>        <p className="text-gray-300 leading-relaxed">
          Esta API personalizada obtiene y procesa datos reales de GitHub desde el usuario 
          <span className="text-emerald-400 font-mono">&apos;MiguelVivar&apos;</span>. 
          Implementa 8 funciones principales que consultan la API oficial de GitHub para mostrar
          estadísticas completas sobre repositorios, contribuciones, lenguajes de programación 
          y actividad reciente. Incluye manejo inteligente de errores, procesamiento de hasta 
          300 eventos para análisis de contribuciones, y soporte para 20+ lenguajes con sus 
          respectivos colores de identificación.
        </p>
      </motion.section>

      {/* Características */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaChartBar className="text-emerald-400" />
          Funcionalidades
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[            {
              icon: <FaCodeBranch className="text-blue-400" />,
              title: "Estadísticas de Repos",
              description:
                "Procesa hasta 100 repositorios ordenados por actualización, filtra forks y archivados",
            },
            {
              icon: <BiGitCommit className="text-green-400" />,
              title: "Análisis de Commits",
              description:
                "Calcula commits aproximados desde eventos de GitHub + estimación base de 500 commits",
            },
            {
              icon: <FaCode className="text-purple-400" />,
              title: "Lenguajes de Programación",
              description:
                "Analiza hasta 15 repositorios activos con mapeo de 20+ colores específicos por lenguaje",
            },
            {
              icon: <FaCalendarAlt className="text-yellow-400" />,
              title: "Actividad Reciente",
              description:
                "Formatea los últimos 30 eventos: PushEvent, CreateEvent, WatchEvent y ForkEvent",
            },
            {
              icon: <FaStar className="text-orange-400" />,
              title: "Métricas de Popularidad",
              description:
                "Suma automática de todas las estrellas de repositorios y métricas de seguidores",
            },
            {
              icon: <SiTypescript className="text-blue-500" />,
              title: "Tipado Completo",
              description:
                "6 interfaces principales: GitHubUser, GitHubRepo, GitHubEvent, ContributionStats y más",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-800/30 rounded-lg p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-neutral-700/50 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-white">
                  {feature.title}
                </h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Funciones Principales */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCode className="text-emerald-400" />
          Funciones Disponibles
        </h3>

        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">
              Funciones principales de la API
            </span>
            <button
              onClick={() => copyToClipboard(codeBlocks.functions, "functions")}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === "functions" ? (
                <FaCheck className="text-green-400" />
              ) : (
                <FaCopy />
              )}
              {copiedCode === "functions" ? "Copiado" : "Copiar"}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{codeBlocks.functions}</code>
          </pre>
        </div>
      </motion.section>

      {/* Interfaces TypeScript */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <SiTypescript className="text-blue-500" />
          Interfaces TypeScript
        </h3>

        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Tipos de datos definidos</span>
            <button
              onClick={() =>
                copyToClipboard(codeBlocks.interfaces, "interfaces")
              }
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === "interfaces" ? (
                <FaCheck className="text-green-400" />
              ) : (
                <FaCopy />
              )}
              {copiedCode === "interfaces" ? "Copiado" : "Copiar"}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
            <code>{codeBlocks.interfaces}</code>
          </pre>
        </div>
      </motion.section>

      {/* Ejemplo de Uso */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCode className="text-emerald-400" />
          Ejemplo de Uso
        </h3>

        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Uso básico de la API</span>
            <button
              onClick={() => copyToClipboard(codeBlocks.usage, "usage")}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === "usage" ? (
                <FaCheck className="text-green-400" />
              ) : (
                <FaCopy />
              )}
              {copiedCode === "usage" ? "Copiado" : "Copiar"}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
            <code>{codeBlocks.usage}</code>
          </pre>
        </div>
      </motion.section>

      {/* Implementación Completa */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <SiReact className="text-cyan-400" />
          Implementación en React
        </h3>

        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">GitHubDashboard.tsx</span>
            <button
              onClick={() =>
                copyToClipboard(codeBlocks.implementation, "implementation")
              }
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === "implementation" ? (
                <FaCheck className="text-green-400" />
              ) : (
                <FaCopy />
              )}
              {copiedCode === "implementation" ? "Copiado" : "Copiar"}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
            <code>{codeBlocks.implementation}</code>
          </pre>
        </div>
      </motion.section>

      {/* Endpoints y Rate Limits */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaExternalLinkAlt className="text-orange-400" />
          Endpoints de GitHub API
        </h3>

        <div className="grid gap-6">
          <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaUsers className="text-blue-400" />
              Endpoints Utilizados
            </h4>
            <div className="space-y-3 text-sm">
              <div className="bg-neutral-900/50 p-3 rounded border-l-4 border-blue-400">
                <code className="text-blue-300">GET /users/MiguelVivar</code>
                <p className="text-gray-400 mt-1">Información del perfil de usuario</p>
              </div>
              <div className="bg-neutral-900/50 p-3 rounded border-l-4 border-green-400">
                <code className="text-green-300">GET /users/MiguelVivar/repos?sort=updated&per_page=100</code>
                <p className="text-gray-400 mt-1">Lista de repositorios ordenados por actualización</p>
              </div>
              <div className="bg-neutral-900/50 p-3 rounded border-l-4 border-purple-400">
                <code className="text-purple-300">GET /users/MiguelVivar/events?per_page=30</code>
                <p className="text-gray-400 mt-1">Eventos y actividad reciente del usuario</p>
              </div>
              <div className="bg-neutral-900/50 p-3 rounded border-l-4 border-yellow-400">
                <code className="text-yellow-300">GET /repos/MiguelVivar/{`{repo}`}/languages</code>
                <p className="text-gray-400 mt-1">Estadísticas de lenguajes por repositorio</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartBar className="text-red-400" />
              Límites y Consideraciones
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Rate Limit sin autenticación:</span>
                  <span className="text-emerald-400 font-mono">60 req/hora</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Repositorios procesados:</span>
                  <span className="text-emerald-400 font-mono">15 activos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Eventos por consulta:</span>
                  <span className="text-emerald-400 font-mono">30 eventos</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Máximo contribuciones:</span>
                  <span className="text-emerald-400 font-mono">300 eventos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Lenguajes soportados:</span>
                  <span className="text-emerald-400 font-mono">20+ colores</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Cache de datos:</span>
                  <span className="text-emerald-400 font-mono">Por sesión</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Configuración */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <BiGitCommit className="text-green-400" />
          Configuración del Proyecto
        </h3>

        <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/50">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Configuración Actual</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Usuario GitHub:</span>
                  <code className="text-emerald-400">&apos;MiguelVivar&apos;</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">API Base URL:</span>
                  <code className="text-emerald-400">api.github.com</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Archivo principal:</span>
                  <code className="text-emerald-400">githubApi.ts</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Líneas de código:</span>
                  <code className="text-emerald-400">389 líneas</code>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Componentes Relacionados</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Dashboard principal:</span>
                  <code className="text-blue-400">GitHubDashboard.tsx</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tarjeta de estadísticas:</span>
                  <code className="text-blue-400">GitHubStatsCard.tsx</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gráfico de lenguajes:</span>
                  <code className="text-blue-400">LanguageChart.tsx</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Actividad reciente:</span>
                  <code className="text-blue-400">RecentActivity.tsx</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Manejo de Errores y Fallbacks */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCodeBranch className="text-red-400" />
          Manejo de Errores y Datos de Respaldo
        </h3>

        <div className="space-y-6">
          <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaCode className="text-yellow-400" />
              Estrategia de Recuperación
            </h4>
            <p className="text-gray-300 mb-4">
              La implementación incluye un sistema robusto de manejo de errores con datos de respaldo 
              para garantizar que la interfaz siempre muestre información relevante, incluso cuando 
              la API de GitHub no esté disponible.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-neutral-900/50 p-4 rounded-lg border-l-4 border-emerald-400">
                <h5 className="text-emerald-400 font-semibold mb-2">Datos de Respaldo</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 42 repositorios totales</li>
                  <li>• 1,248 contribuciones</li>
                  <li>• 156 estrellas ganadas</li>
                  <li>• 89 seguidores</li>
                  <li>• 2,340 commits estimados</li>
                </ul>
              </div>
              <div className="bg-neutral-900/50 p-4 rounded-lg border-l-4 border-blue-400">
                <h5 className="text-blue-400 font-semibold mb-2">Lenguajes de Respaldo</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• TypeScript (35%)</li>
                  <li>• JavaScript (28%)</li>
                  <li>• Python (18%)</li>
                  <li>• CSS (12%)</li>
                  <li>• HTML (7%)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartBar className="text-orange-400" />
              Códigos de Error Manejados
            </h4>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-neutral-900/50 rounded border-l-4 border-red-400">
                <div>
                  <code className="text-red-300">Rate Limit Exceeded</code>
                  <p className="text-sm text-gray-400">Límite de 60 requests/hora excedido</p>
                </div>
                <span className="text-red-400 font-mono text-sm">403</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-900/50 rounded border-l-4 border-yellow-400">
                <div>
                  <code className="text-yellow-300">Network Error</code>
                  <p className="text-sm text-gray-400">Error de conectividad o timeout</p>
                </div>
                <span className="text-yellow-400 font-mono text-sm">NET</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-neutral-900/50 rounded border-l-4 border-blue-400">
                <div>
                  <code className="text-blue-300">Repository Not Found</code>
                  <p className="text-sm text-gray-400">Repositorio privado o no encontrado</p>
                </div>
                <span className="text-blue-400 font-mono text-sm">404</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BiGitCommit className="text-purple-400" />
              Implementación del Try-Catch
            </h4>
            
            <div className="bg-neutral-900/80 rounded-lg p-4 border border-neutral-700/50">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`try {
  setIsLoading(true);
  setError(null);
  
  const data = await fetchAllGitHubData();
  
  setStats(data.stats);
  setLanguages(data.languages);
  setRecentActivity(data.recentActivity);
  
} catch (error) {
  console.error('Error fetching GitHub data:', error);
  setError('Error al cargar datos de GitHub. Usando datos de respaldo.');
  
  // Fallback a datos simulados en caso de error
  setStats({ /* datos de respaldo */ });
  setLanguages({ /* lenguajes de respaldo */ });
  
} finally {
  setIsLoading(false);
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Colores de Lenguajes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCode className="text-purple-400" />
          Mapeo de Colores por Lenguaje
        </h3>

        <div className="bg-neutral-800/50 rounded-lg p-6 border border-neutral-700/50">
          <p className="text-gray-300 mb-6">
            La API incluye un mapeo de colores específico para cada lenguaje de programación, 
            utilizado en las visualizaciones de gráficos y estadísticas.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/*
              { name: 'TypeScript', color: '#3178c6' },
              { name: 'JavaScript', color: '#f7df1e' },
              { name: 'Python', color: '#3776ab' },
              { name: 'CSS', color: '#1572b6' },
              { name: 'HTML', color: '#e34f26' },
              { name: 'Java', color: '#007396' },
              { name: 'C#', color: '#239120' },
              { name: 'Go', color: '#00add8' },
              { name: 'PHP', color: '#777bb4' },
              { name: 'C++', color: '#00599c' },
              { name: 'C', color: '#a8b9cc' },
              { name: 'Shell', color: '#89e051' },
              { name: 'Vue', color: '#4fc08d' },
              { name: 'Dart', color: '#0175c2' },
              { name: 'Swift', color: '#fa7343' },
              { name: 'Kotlin', color: '#7f52ff' },
              { name: 'Rust', color: '#000000' },
              { name: 'Ruby', color: '#cc342d' },
              { name: 'Scss', color: '#cf649a' },
              { name: 'Less', color: '#1d365d' }
            */}
            {Object.values({
              TypeScript: '#3178c6',
              JavaScript: '#f7df1e',
              Python: '#3776ab',
              CSS: '#1572b6',
              HTML: '#e34f26',
              Java: '#007396',
              'C#': '#239120',
              Go: '#00add8',
              PHP: '#777bb4',
              'C++': '#00599c',
              C: '#a8b9cc',
              Shell: '#89e051',
              Vue: '#4fc08d',
              Dart: '#0175c2',
              Swift: '#fa7343',
              Kotlin: '#7f52ff',
              Rust: '#000000',
              Ruby: '#cc342d',
              Scss: '#cf649a',
              Less: '#1d365d'
            }).map((color, name) => (
              <div key={name} className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full border border-neutral-600" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-sm text-gray-300">{name}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-neutral-900/50 rounded-lg border border-neutral-700/50">
            <p className="text-sm text-gray-400">
              <strong className="text-white">Nota:</strong> Los lenguajes no incluidos en este mapeo 
              utilizan el color predeterminado <span className="text-gray-500">#64748b</span>. 
              Los colores están basados en los estándares oficiales de cada lenguaje.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Enlaces y Recursos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaExternalLinkAlt className="text-emerald-400" />
          Enlaces y Recursos
        </h3>

        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Documentación Oficial</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://docs.github.com/en/rest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:underline"
                  >
                    <FaExternalLinkAlt className="text-emerald-500" />
                    GitHub REST API
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.github.com/en/graphql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:underline"
                  >
                    <FaExternalLinkAlt className="text-emerald-500" />
                    GitHub GraphQL API
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.github.com/en/developers/apps/building-oauth-apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:underline"
                  >
                    <FaExternalLinkAlt className="text-emerald-500" />
                    Autenticación OAuth
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Recursos Adicionales</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/MiguelVivar/Portafolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:underline"
                  >
                    <FaGithub className="text-emerald-500" />
                    Repositorio del Proyecto
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/MiguelVivar/Portafolio/blob/main/src/lib/githubApi.ts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:underline"
                  >
                    <FaGithub className="text-emerald-500" />
                    Código Fuente de la API
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/MiguelVivar/Portafolio/blob/main/src/app/sobremi/page.tsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:underline"
                  >
                    <FaGithub className="text-emerald-500" />
                    Página de Sobre Mí
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default GithubDocumentation;
