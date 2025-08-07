'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimateBackground from '@/components/AnimateBackground';
import CallToAction from '@/components/CallToAction';
import {
  FaCode,
  FaTerminal,
  FaRocket,
  FaDatabase,
  FaCloud,
  FaMobile,
  FaChartLine,
  FaGithub,
  FaExternalLinkAlt,
  FaBook,
  FaTools,
  FaCog,
  FaLightbulb,
  FaServer,
  FaPalette,
  FaShieldAlt,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
  SiFramer,
  SiSpotify,
  SiGithub
} from 'react-icons/si';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children, icon }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-16 scroll-mt-24"
  >
    <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        {icon && <div className="text-2xl text-emerald-400">{icon}</div>}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </motion.section>
);

const CodeBlock: React.FC<{ children: string; language?: string }> = ({ children, language = "bash" }) => (
  <div className="bg-neutral-900/80 border border-neutral-700/50 rounded-lg p-4 overflow-x-auto">
    <pre className="text-gray-300 text-sm">
      <code className={`language-${language}`}>{children}</code>
    </pre>
  </div>
);

const TechBadge: React.FC<{ icon: React.ReactNode; name: string; description?: string }> = ({ icon, name, description }) => (
  <div className="flex items-center gap-3 p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg hover:border-emerald-500/30 transition-all duration-300">
    <div className="text-xl">{icon}</div>
    <div>
      <div className="font-semibold text-white">{name}</div>
      {description && <div className="text-sm text-gray-400">{description}</div>}
    </div>
  </div>
);

const CommandCard: React.FC<{ command: string; description: string; example?: string }> = ({ command, description, example }) => (
  <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <code className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-sm font-mono">{command}</code>
    </div>
    <p className="text-gray-400 text-sm mb-2">{description}</p>
    {example && (
      <div className="mt-3">
        <div className="text-xs text-gray-500 mb-1">Ejemplo:</div>
        <code className="text-xs text-gray-300 bg-neutral-800/50 px-2 py-1 rounded">{example}</code>
      </div>
    )}
  </div>
);

const PortfolioDocumentation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigation = [
    { id: 'overview', label: 'Resumen General', icon: <FaBook /> },
    { id: 'architecture', label: 'Arquitectura', icon: <FaCode /> },
    { id: 'terminal', label: 'Sistema Terminal', icon: <FaTerminal /> },
    { id: 'apis', label: 'APIs & Servicios', icon: <FaServer /> },
    { id: 'components', label: 'Componentes UI', icon: <FaPalette /> },
    { id: 'development', label: 'Desarrollo', icon: <FaTools /> },
    { id: 'deployment', label: 'Despliegue', icon: <FaRocket /> },
    { id: 'performance', label: 'Rendimiento', icon: <FaChartLine /> }
  ];

  return (
    <main className="min-h-screen bg-neutral-900 pt-24 relative">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0">
        <AnimateBackground />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 shadow-2xl mb-6">
              <FaCode className="text-4xl text-emerald-400" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                Documentación Técnica
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Documentación completa del portafolio web de Miguel Vivar.
              Arquitectura, implementación y guías técnicas detalladas.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://www.miguelvivar.engineer"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 font-semibold"
              >
                <FaExternalLinkAlt /> Ver Portfolio
              </Link>
              <Link
                href="https://github.com/MiguelVivar/Portafolio"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-all duration-300 font-semibold"
              >
                <FaGithub /> Código Fuente
              </Link>
            </div>
          </motion.div>

          {/* Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-2xl">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${activeSection === item.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-neutral-700/50'
                    }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>          {/* Contenido Principal */}
          <div className="space-y-16">

            {/* Resumen General */}
            {activeSection === 'overview' && (
              <Section id="overview" title="Resumen General" icon={<FaBook />}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Información del Proyecto</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-neutral-900/50 rounded-lg">
                        <span className="text-gray-400">Versión:</span>
                        <span className="text-white font-mono">v7.5.1</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-900/50 rounded-lg">
                        <span className="text-gray-400">Dominio:</span>
                        <span className="text-emerald-400 font-mono">miguelvivar.engineer</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-900/50 rounded-lg">
                        <span className="text-gray-400">Framework:</span>
                        <span className="text-white">Next.js 15</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-900/50 rounded-lg">
                        <span className="text-gray-400">Runtime:</span>
                        <span className="text-white">React 19</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-900/50 rounded-lg">
                        <span className="text-gray-400">Lenguaje:</span>
                        <span className="text-white">TypeScript 5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Características Principales</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                        <FaTerminal className="text-emerald-400" />
                        <span className="text-gray-300">Sistema de terminal interactivo con 25+ comandos</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                        <FaCloud className="text-blue-400" />
                        <span className="text-gray-300">Integración con APIs externas en tiempo real</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                        <FaMobile className="text-purple-400" />
                        <span className="text-gray-300">Diseño completamente responsivo</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                        <FaChartLine className="text-yellow-400" />
                        <span className="text-gray-300">Analytics y monitoreo de rendimiento</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                        <FaLightbulb className="text-orange-400" />
                        <span className="text-gray-300">Animaciones fluidas y experiencia moderna</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            )}            {/* Arquitectura */}
            {activeSection === 'architecture' && (
              <Section id="architecture" title="Arquitectura del Proyecto" icon={<FaCode />}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Stack Tecnológico</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <TechBadge icon={<SiNextdotjs className="text-white" />} name="Next.js 15" description="Framework React con SSR/SSG" />
                      <TechBadge icon={<SiReact className="text-blue-400" />} name="React 19" description="Biblioteca de interfaz de usuario" />
                      <TechBadge icon={<SiTypescript className="text-blue-500" />} name="TypeScript 5" description="JavaScript con tipado estático" />
                      <TechBadge icon={<SiTailwindcss className="text-cyan-400" />} name="Tailwind CSS" description="Framework de utilidades CSS" />
                      <TechBadge icon={<SiFramer className="text-pink-400" />} name="Framer Motion" description="Biblioteca de animaciones" />
                      <TechBadge icon={<SiVercel className="text-white" />} name="Vercel" description="Plataforma de despliegue" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Estructura del Proyecto</h3>
                    <CodeBlock language="bash">{`📦 Portafolio/
├── 📁 src/
│   ├── 📁 app/                    # App Router (Next.js 13+)
│   │   ├── 📁 api/               # API Routes
│   │   ├── 📁 documentacion/     # Páginas de documentación
│   │   └── 📄 layout.tsx         # Layout principal
│   ├── 📁 components/            # Componentes reutilizables
│   │   ├── 📁 terminal/          # Sistema de terminal
│   │   ├── 📁 weather/           # Componentes del clima
│   │   └── 📁 github/            # Componentes de GitHub
│   ├── 📁 ui/                    # Componentes de interfaz específicos
│   ├── 📁 lib/                   # Utilidades y configuraciones
│   ├── 📁 data/                  # Datos estáticos y configuración
│   └── 📁 types/                 # Definiciones de tipos TypeScript
├── 📁 public/                    # Archivos estáticos
├── 📄 package.json               # Dependencias y scripts
├── 📄 next.config.js             # Configuración de Next.js
├── 📄 tailwind.config.js         # Configuración de Tailwind
└── 📄 tsconfig.json              # Configuración de TypeScript`}</CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Patrones de Diseño</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-2">Context API Pattern</h4>
                        <p className="text-gray-400 text-sm">
                          Gestión de estado global para el sistema de terminal usando React Context.
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-2">Component Composition</h4>
                        <p className="text-gray-400 text-sm">
                          Componentes modulares y reutilizables con props bien definidas.
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-2">API Layer Abstraction</h4>
                        <p className="text-gray-400 text-sm">
                          Capa de abstracción para todas las integraciones de APIs externas.
                        </p>
                      </div>
                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-2">Server Components</h4>
                        <p className="text-gray-400 text-sm">
                          Uso estratégico de Server Components para optimizar el rendimiento.
                        </p>
                      </div>
                    </div>                </div>
                </div>
              </Section>
            )}

            {/* Sistema Terminal */}
            {activeSection === 'terminal' && (
              <Section id="terminal" title="Sistema de Terminal Interactivo" icon={<FaTerminal />}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Descripción General</h3>
                    <p className="text-gray-300 mb-6">
                      El sistema de terminal es el corazón interactivo del portafolio, proporcionando una interfaz
                      de línea de comandos completa con más de 25 comandos funcionales, simulación de sistema de
                      archivos y características avanzadas como autocompletado e historial.
                    </p>

                    <div className="bg-neutral-900/50 border border-neutral-700/30 rounded-lg p-6">
                      <h4 className="font-semibold text-emerald-400 mb-3">Características Técnicas</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          Más de 2000 líneas de código TypeScript
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          25+ comandos únicos implementados
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          Sistema de archivos virtual completo
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          Autocompletado inteligente con Tab
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          Historial de comandos navegable
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          Simulación de Git y herramientas de desarrollo
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Comandos Disponibles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Navegación y Sistema */}
                      <CommandCard
                        command="ls"
                        description="Lista archivos y directorios"
                        example="ls -la"
                      />
                      <CommandCard
                        command="cd"
                        description="Cambia de directorio"
                        example="cd /projects"
                      />
                      <CommandCard
                        command="pwd"
                        description="Muestra directorio actual"
                      />
                      <CommandCard
                        command="mkdir"
                        description="Crea nuevos directorios"
                        example="mkdir new-project"
                      />
                      <CommandCard
                        command="touch"
                        description="Crea archivos vacíos"
                        example="touch index.html"
                      />
                      <CommandCard
                        command="cat"
                        description="Muestra contenido de archivos"
                        example="cat README.md"
                      />

                      {/* Herramientas de Desarrollo */}
                      <CommandCard
                        command="git"
                        description="Simulación de comandos Git"
                        example="git status"
                      />
                      <CommandCard
                        command="npm"
                        description="Gestión de paquetes Node.js"
                        example="npm install"
                      />
                      <CommandCard
                        command="yarn"
                        description="Alternativa a npm"
                        example="yarn add package"
                      />
                      <CommandCard
                        command="code"
                        description="Abre archivos en VS Code (simulado)"
                        example="code ."
                      />
                      <CommandCard
                        command="python"
                        description="Ejecuta scripts Python básicos"
                        example="python hello.py"
                      />
                      <CommandCard
                        command="node"
                        description="Ejecuta código JavaScript"
                        example="node app.js"
                      />

                      {/* APIs y Servicios */}
                      <CommandCard
                        command="weather"
                        description="Obtiene información del clima"
                        example="weather Ica"
                      />
                      <CommandCard
                        command="github"
                        description="Estadísticas de GitHub"
                        example="github repos"
                      />
                      <CommandCard
                        command="spotify"
                        description="Música actual en Spotify"
                      />

                      {/* Utilidades */}
                      <CommandCard
                        command="calc"
                        description="Calculadora avanzada"
                        example="calc 2 + 2 * 3"
                      />
                      <CommandCard
                        command="date"
                        description="Fecha y hora actual"
                      />
                      <CommandCard
                        command="whoami"
                        description="Información del usuario"
                      />
                      <CommandCard
                        command="history"
                        description="Historial de comandos"
                      />
                      <CommandCard
                        command="clear"
                        description="Limpia la terminal"
                      />
                      <CommandCard
                        command="help"
                        description="Lista de comandos disponibles"
                      />

                      {/* Easter Eggs */}
                      <CommandCard
                        command="matrix"
                        description="Efecto Matrix (Easter Egg)"
                      />
                      <CommandCard
                        command="joke"
                        description="Chiste aleatorio de programación"
                      />
                      <CommandCard
                        command="quote"
                        description="Cita inspiracional aleatoria"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Implementación Técnica</h3>
                    <div className="space-y-4">
                      <div className="bg-neutral-900/50 border border-neutral-700/30 rounded-lg p-6">
                        <h4 className="font-semibold text-emerald-400 mb-3">Arquitectura del Terminal</h4>
                        <CodeBlock language="typescript">{`// Estructura principal del contexto del terminal
interface TerminalContextType {
  output: TerminalOutput[];
  input: string;
  history: string[];
  historyIndex: number;
  currentDirectory: string;
  fileSystem: FileSystemNode;
  environmentVariables: Record<string, string>;
  processes: Process[];
  aliases: Record<string, string>;
}

// Procesamiento de comandos
const executeCommand = async (command: string): Promise<TerminalOutput[]> => {
  const [cmd, ...args] = command.trim().split(' ');
  const commandHandler = commands[cmd];
  
  if (commandHandler) {
    return await commandHandler(args, context);
  }
  
  return [{ 
    type: 'error', 
    content: \`Command '\${cmd}' not found. Type 'help' for available commands.\`
  }];
};`}</CodeBlock>
                      </div>

                      <div className="bg-neutral-900/50 border border-neutral-700/30 rounded-lg p-6">
                        <h4 className="font-semibold text-emerald-400 mb-3">Sistema de Archivos Virtual</h4>
                        <CodeBlock language="typescript">{`// Estructura del sistema de archivos
interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FileSystemNode>;
  permissions?: string;
  size?: number;
  lastModified?: Date;
}

// Navegación por el sistema de archivos
const navigateToPath = (path: string): FileSystemNode | null => {
  const parts = path.split('/').filter(p => p !== '');
  let current = fileSystem;
  
  for (const part of parts) {
    if (part === '..') {
      // Lógica para retroceder
      continue;
    }
    if (current.children?.[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  
  return current;
};`}</CodeBlock>
                      </div>
                    </div>                </div>
                </div>
              </Section>
            )}

            {/* APIs y Servicios */}
            {activeSection === 'apis' && (
              <Section id="apis" title="APIs y Servicios Externos" icon={<FaServer />}>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-gray-500/10 to-slate-500/10 border border-gray-500/20 rounded-xl">
                      <SiGithub className="text-3xl text-white mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">GitHub API</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Estadísticas en tiempo real de repositorios y actividad de desarrollo.
                      </p>
                      <Link
                        href="/documentacion/github"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm"
                      >
                        Ver documentación <FaExternalLinkAlt className="text-xs" />
                      </Link>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                      <TiWeatherPartlySunny className="text-3xl text-yellow-400 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">OpenWeatherMap</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Información meteorológica en tiempo real para Ica, Perú.
                      </p>
                      <Link
                        href="/documentacion/weather"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm"
                      >
                        Ver documentación <FaExternalLinkAlt className="text-xs" />
                      </Link>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                      <SiSpotify className="text-3xl text-green-400 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Spotify API</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        &quot;Now Playing&quot; - música actual y estadísticas de escucha.
                      </p>
                      <Link
                        href="/documentacion/spotify"
                        className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm"
                      >
                        Ver documentación <FaExternalLinkAlt className="text-xs" />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Gestión de APIs</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-emerald-400">Características Implementadas</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-center gap-2">
                            <FaShieldAlt className="text-emerald-400 text-sm" />
                            Manejo seguro de tokens y claves API
                          </li>
                          <li className="flex items-center gap-2">
                            <FaDatabase className="text-blue-400 text-sm" />
                            Cache inteligente para optimizar requests
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCog className="text-yellow-400 text-sm" />
                            Retry automático y manejo de errores
                          </li>
                          <li className="flex items-center gap-2">
                            <FaChartLine className="text-purple-400 text-sm" />
                            Rate limiting y throttling
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Implementación de Cache</h4>
                        <CodeBlock language="typescript">{`// Sistema de cache para APIs
class APICache {
  private cache = new Map<string, CacheEntry>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutos

  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: Date.now() });
    
    return data;
  }
}`}</CodeBlock>
                      </div>
                    </div>                </div>
                </div>
              </Section>
            )}

            {/* Componentes UI */}
            {activeSection === 'components' && (
              <Section id="components" title="Sistema de Componentes UI" icon={<FaPalette />}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Arquitectura de Componentes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-2">Componentes Base</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• AnimateBackground</li>
                          <li>• CallToAction</li>
                          <li>• LoadingSpinner</li>
                          <li>• ErrorBoundary</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-2">Terminal UI</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Terminal</li>
                          <li>• TerminalContext</li>
                          <li>• CommandInput</li>
                          <li>• OutputRenderer</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-2">Páginas Específicas</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Inicio</li>
                          <li>• Sobre Mí</li>
                          <li>• Habilidades</li>
                          <li>• Proyectos</li>
                          <li>• Contacto</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Sistema de Animaciones</h3>
                    <div className="bg-neutral-900/50 border border-neutral-700/30 rounded-lg p-6">
                      <h4 className="font-semibold text-emerald-400 mb-3">Framer Motion Integration</h4>
                      <CodeBlock language="typescript">{`// Configuración de animaciones globales
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Componente animado típico
const AnimatedSection: React.FC = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);`}</CodeBlock>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Diseño Responsivo</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Breakpoints Tailwind</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                            <span className="text-gray-400">sm:</span>
                            <span className="text-white">640px+</span>
                          </div>
                          <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                            <span className="text-gray-400">md:</span>
                            <span className="text-white">768px+</span>
                          </div>
                          <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                            <span className="text-gray-400">lg:</span>
                            <span className="text-white">1024px+</span>
                          </div>
                          <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                            <span className="text-gray-400">xl:</span>
                            <span className="text-white">1280px+</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Estrategias Responsivas</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            Mobile-first design approach
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            Grid systems adaptativos
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            Typography scales fluidas
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            Navegación adaptativa
                          </li>
                        </ul>
                      </div>
                    </div>                </div>
                </div>
              </Section>
            )}

            {/* Desarrollo */}
            {activeSection === 'development' && (
              <Section id="development" title="Flujo de Desarrollo" icon={<FaTools />}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Scripts de Desarrollo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Comandos Principales</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                            <code className="text-emerald-300">npm run dev</code>
                            <p className="text-gray-400 text-sm mt-1">Servidor de desarrollo con Turbopack</p>
                          </div>
                          <div className="p-3 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                            <code className="text-emerald-300">npm run build</code>
                            <p className="text-gray-400 text-sm mt-1">Build de producción optimizado</p>
                          </div>
                          <div className="p-3 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                            <code className="text-emerald-300">npm run lint</code>
                            <p className="text-gray-400 text-sm mt-1">Análisis de código con ESLint</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Herramientas de Calidad</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-center gap-2">
                            <SiTypescript className="text-blue-400" />
                            TypeScript para tipado estático
                          </li>
                          <li className="flex items-center gap-2">
                            <FaCode className="text-yellow-400" />
                            ESLint para análisis de código
                          </li>
                          <li className="flex items-center gap-2">
                            <FaTools className="text-purple-400" />
                            Prettier para formateo automático
                          </li>
                          <li className="flex items-center gap-2">
                            <FaRocket className="text-green-400" />
                            Turbopack para builds rápidos
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Configuración del Entorno</h3>
                    <div className="bg-neutral-900/50 border border-neutral-700/30 rounded-lg p-6">
                      <h4 className="font-semibold text-emerald-400 mb-3">Variables de Entorno</h4>
                      <CodeBlock language="bash">{`# .env.local
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_weather_api_key
GITHUB_TOKEN=your_github_token
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# Configuración de Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id`}</CodeBlock>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Estructura de Dependencias</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Dependencias Principales</h4>
                        <CodeBlock language="json">{`{
  "next": "^15.0.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5",
  "framer-motion": "^11.11.17",
  "tailwindcss": "^3.4.1",
  "@vercel/analytics": "^1.3.1"
}`}</CodeBlock>
                      </div>

                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Herramientas de Desarrollo</h4>
                        <CodeBlock language="json">{`{
  "eslint": "^8",
  "eslint-config-next": "^15.0.3",
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "autoprefixer": "^10.4.20",
  "postcss": "^8"
}`}</CodeBlock>
                      </div>
                    </div>                </div>
                </div>
              </Section>
            )}

            {/* Despliegue */}
            {activeSection === 'deployment' && (
              <Section id="deployment" title="Despliegue y Producción" icon={<FaRocket />}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Plataforma Vercel</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Configuración de Despliegue</h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <SiVercel className="text-white" />
                              <span className="font-semibold text-white">Vercel Platform</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                              Despliegue automático desde GitHub con optimizaciones integradas.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                              <span className="text-gray-400">Dominio:</span>
                              <span className="text-emerald-400">miguelvivar.engineer</span>
                            </div>
                            <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                              <span className="text-gray-400">Build Time:</span>
                              <span className="text-white">~45s</span>
                            </div>
                            <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                              <span className="text-gray-400">Framework:</span>
                              <span className="text-white">Next.js</span>
                            </div>
                            <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                              <span className="text-gray-400">Node Version:</span>
                              <span className="text-white">18.x</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-emerald-400 mb-3">Optimizaciones</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                            <FaRocket className="text-blue-400" />
                            <span className="text-gray-300">Edge Runtime para APIs críticas</span>
                          </li>
                          <li className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                            <FaDatabase className="text-green-400" />
                            <span className="text-gray-300">Compresión automática de assets</span>
                          </li>
                          <li className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                            <FaCloud className="text-purple-400" />
                            <span className="text-gray-300">CDN global para contenido estático</span>
                          </li>
                          <li className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
                            <FaChartLine className="text-yellow-400" />
                            <span className="text-gray-300">Analytics integrado</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Configuración Next.js</h3>
                    <CodeBlock language="javascript">{`import type { NextConfig } from "next";
                    
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://randomuser.me/api/portraits/**/**'), new URL('https://i.scdn.co/image/**')],
  },
};

export default nextConfig;`}</CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Monitoreo y Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-3">Vercel Analytics</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li>• Métricas de rendimiento en tiempo real</li>
                          <li>• Core Web Vitals automáticos</li>
                          <li>• Análisis de audiencia y comportamiento</li>
                          <li>• Monitoreo de errores y uptime</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <h4 className="font-semibold text-emerald-400 mb-3">Métricas Clave</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Lighthouse Score:</span>
                            <span className="text-green-400">95+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">First Paint:</span>
                            <span className="text-green-400">&lt;1.2s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">LCP:</span>
                            <span className="text-green-400">&lt;2.5s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">CLS:</span>
                            <span className="text-green-400">&lt;0.1</span>
                          </div>
                        </div>
                      </div>
                    </div>                </div>
                </div>
              </Section>
            )}

            {/* Rendimiento */}
            {activeSection === 'performance' && (
              <Section id="performance" title="Optimización de Rendimiento" icon={<FaChartLine />}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">Estrategias de Optimización</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <FaRocket className="text-2xl text-blue-400 mb-3" />
                        <h4 className="font-semibold text-white mb-2">Code Splitting</h4>
                        <p className="text-gray-400 text-sm">
                          Carga dinámica de componentes con React.lazy() y Suspense.
                        </p>
                      </div>

                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <FaDatabase className="text-2xl text-green-400 mb-3" />
                        <h4 className="font-semibold text-white mb-2">Caching Inteligente</h4>
                        <p className="text-gray-400 text-sm">
                          Sistema de cache en múltiples niveles para APIs y assets.
                        </p>
                      </div>

                      <div className="p-4 bg-neutral-900/50 border border-neutral-700/30 rounded-lg">
                        <FaCloud className="text-2xl text-purple-400 mb-3" />
                        <h4 className="font-semibold text-white mb-2">Edge Computing</h4>
                        <p className="text-gray-400 text-sm">
                          Funciones serverless optimizadas en el edge de Vercel.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Técnicas Implementadas</h3>
                    <div className="space-y-6">
                      <div className="bg-neutral-900/50 border border-neutral-700/30 rounded-lg p-6">
                        <h4 className="font-semibold text-emerald-400 mb-3">Image Optimization</h4>
                        <CodeBlock language="typescript">{`// Optimización automática de imágenes con Next.js
import Image from 'next/image';

const OptimizedImage: React.FC<ImageProps> = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    priority={props.priority}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);`}</CodeBlock>
                      </div>

                      <div className="bg-neutral-900/50 border border-neutral-700/30 rounded-lg p-6">
                        <h4 className="font-semibold text-emerald-400 mb-3">Bundle Analysis</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-white mb-2">Tamaños de Bundle</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                                <span className="text-gray-400">First Load JS:</span>
                                <span className="text-green-400">85.2 kB</span>
                              </div>
                              <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                                <span className="text-gray-400">Route (gzipped):</span>
                                <span className="text-green-400">12.4 kB</span>
                              </div>
                              <div className="flex justify-between p-2 bg-neutral-800/50 rounded">
                                <span className="text-gray-400">Framework:</span>
                                <span className="text-yellow-400">45.1 kB</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-white mb-2">Optimizaciones</h5>
                            <ul className="space-y-2 text-gray-300 text-sm">
                              <li>• Tree shaking automático</li>
                              <li>• Compresión gzip/brotli</li>
                              <li>• Minificación avanzada</li>
                              <li>• Eliminación de código muerto</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Métricas de Rendimiento</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-400 mb-1">96</div>
                        <div className="text-sm text-gray-400">Performance</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400 mb-1">100</div>
                        <div className="text-sm text-gray-400">Accessibility</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-1">95</div>
                        <div className="text-sm text-gray-400">Best Practices</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">100</div>
                        <div className="text-sm text-gray-400">SEO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            )}
            {/* Call to Action Final */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20"
            >
              <CallToAction
                title='¿Quieres saber más'
                titlespan='sobre mi trabajo?'
                description='Descubre mis proyectos más recientes y aprende sobre las tecnologías que utilizo.'
                buttonPrimaryIcon={<FaGithub />}
                buttonPrimaryText='Github'
                buttonPrimaryLink='https://github.com/MiguelVivar'
                buttonSecondaryIcon={<MdEmail />}
                buttonSecondaryText='Contactar'
                buttonSecondaryLink='/contacto'
              />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PortfolioDocumentation;
