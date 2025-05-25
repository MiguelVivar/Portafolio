# Miguel Vivar - Advanced Portfolio Platform

<div align="center">

![Portfolio Preview](/public/portafolio.png)

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.5-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TSParticles](https://img.shields.io/badge/TSParticles-2.12-FF6B6B?style=for-the-badge)](https://particles.js.org/)

</div>

## 🚀 Descripción

**Portfolio Personal Versión 7.0.0** - Una plataforma web avanzada y completamente interactiva que combina tecnologías de vanguardia para crear una experiencia de usuario excepcional. Más que un simple portafolio, es una demostración técnica completa de desarrollo web moderno que incluye:

- **Sistema de Terminal Interactivo** con 25+ comandos funcionales incluyendo sistema de archivos simulado
- **Integración en tiempo real con APIs externas** (GitHub, Weather API, Spotify)
- **Sistema de análisis y monitoreo de rendimiento** con Vercel Analytics y Web Vitals
- **Motor de búsqueda global** con filtrado inteligente por categorías
- **Animaciones de partículas optimizadas** con TSParticles y Framer Motion
- **Arquitectura de componentes escalable** con gestión de estado usando Nanostores

## 🌐 Demostración

Visita mi portfolio en vivo: [miguelvivar.vercel.app](https://miguelvivar.vercel.app/)

## ✨ Características Técnicas Avanzadas

### 🖥️ Sistema de Terminal Interactivo
- **25+ comandos funcionales**: `help`, `nav`, `home`, `about`, `skills`, `projects`, `contact`, `socials`, `ls`, `dir`, `cd`, `pwd`, `cat`, `find`, `tree`, `git`, `npm`, `code`, `whoami`, `ps`, `date`, `weather`, `calc`, `quote`, `history`, `clear`, `exit`, `matrix`, `coffee`, `konami`, `fortune`, `sudo`, `joke`, `ascii`, `theme`, `game`, `guess`
- **Sistema de archivos simulado** con navegación completa y estructura de directorios realista
- **Autocompletado inteligente** con tecla Tab para navegación eficiente
- **Historial de comandos** navegable con flechas arriba/abajo
- **Comandos de Git y NPM simulados** con outputs realistas
- **Easter eggs y comandos divertidos** (Matrix, café, código Konami, chistes)
- **Mini-juegos integrados** como adivinanza de números
- **Calculadora matemática** con evaluación segura de expresiones
- **Sistema de ayuda contextual** con documentación completa categorizada

### 🔗 Integración de APIs en Tiempo Real
- **GitHub API**: Datos de usuario dinámicos, repositorios, estadísticas de contribuciones
- **Weather API**: Información meteorológica en tiempo real con geolocalización
- **Spotify API**: Reproducción actual de música con datos de artista y canción
- **Fallback inteligente** a datos simulados en caso de límites de API o errores
- **Cache y optimización** para reducir llamadas innecesarias a APIs
- **Manejo de errores robusto** con mensajes informativos al usuario

### 📊 Sistema de Analytics y Monitoreo
- **Vercel Analytics** integrado con eventos personalizados
- **Vercel Speed Insights** para monitoreo de rendimiento
- **Web Vitals tracking** en tiempo real (LCP, FID, CLS, TTFB)
- **Performance monitoring** automático con métricas detalladas
- **Google Analytics** con seguimiento de interacciones de usuario
- **Error tracking** y reporting para debugging proactivo

### 🔍 Motor de Búsqueda Global
- **Búsqueda global** a través de proyectos, habilidades y contenido
- **Filtrado por categorías** con resultados organizados
- **Búsqueda semántica** con coincidencias inteligentes
- **Navegación por teclado** completa (Enter, Escape, flechas)
- **Resultados en tiempo real** sin necesidad de envío de formulario
- **Highlighting de términos** de búsqueda en resultados

### ✨ Sistema de Animaciones y Efectos
- **Framer Motion 12.5** para animaciones fluidas y performantes
- **TSParticles Slim** con sistema de partículas interactivo optimizado
- **Canvas Confetti** para efectos de celebración y feedback
- **Animaciones de entrada** suaves y naturales en componentes
- **Efectos de hover** responsivos y accesibles
- **Respeto por preferencias de accesibilidad** (`prefers-reduced-motion`)

### 🎨 Partículas Interactivas y Background
- **TSParticles Slim** optimizado para mejor rendimiento
- **Configuración responsive** que se adapta al tamaño de pantalla
- **Efectos de parallax** sutiles para profundidad visual
- **Interacción con cursor** en dispositivos de escritorio
- **Optimización automática** basada en capacidad del dispositivo
- **Pausado inteligente** cuando no está visible para ahorrar recursos

### 🎯 Optimización de Rendimiento
- **Adaptive Quality System**: ajuste automático basado en FPS
- **Frame skipping** dinámico en dispositivos de bajo rendimiento
- **Intersection Observer** para pausar animaciones fuera de vista
- **Device detection** con optimizaciones específicas para móviles
- **Memory monitoring** y liberación automática de recursos
- **Lazy loading** de componentes pesados (TSParticles)

### 🔧 Arquitectura Técnica Moderna
- **App Router de Next.js 15** con renderizado híbrido optimizado
- **Server Components** para mejor rendimiento y SEO
- **Client Components** estratégicamente ubicados para interactividad
- **Nanostores** para gestión de estado global ligera y reactiva
- **Custom hooks** especializados para funcionalidades reutilizables
- **TypeScript estricto** con interfaces comprehensivas y type safety
- **Error boundaries** con recuperación elegante de errores
- **Lazy loading** de componentes y recursos pesados

### 📱 SEO y Accesibilidad
- **JSON-LD structured data** para rich snippets en Google
- **Meta tags dinámicos** por página con Open Graph
- **Sitemap XML automático** generado por Next.js
- **Robots.txt optimizado** para crawlers
- **WCAG compliance** con soporte para lectores de pantalla
- **Semantic HTML** con ARIA labels apropiados

### 🌐 Características Adicionales
- **Sistema de notificaciones** con Toast UI para feedback inmediato
- **Responsive design** mobile-first con breakpoints optimizados
- **Tema oscuro** elegante con transiciones suaves
- **Página 404 personalizada** con navegación automática inteligente
- **Loading states** sofisticados para mejor experiencia de usuario
- **Progressive enhancement** con degradación elegante
- **Integración de Spotify** mostrando música actual en reproducción
- **Formulario de contacto** funcional con validación y envío

## 🛠️ Stack Tecnológico Completo

### 🚀 Core Framework
- **Next.js 15.2.4**: Framework full-stack con App Router y renderizado híbrido
- **React 19.0.0**: Biblioteca de UI con Concurrent Features y Server Components
- **TypeScript 5**: Tipado estático avanzado con strict mode activado

### 🎨 Styling y UI
- **Tailwind CSS 4**: Framework utility-first con diseño responsivo moderno
- **Framer Motion 12.5.0**: Animaciones declarativas y transiciones fluidas
- **TSParticles Slim 2.12.0**: Sistema de partículas interactivo optimizado
- **React Icons 5.5.0**: Iconos SVG modernos y optimizados para rendimiento
- **Canvas Confetti 1.9.3**: Efectos visuales para celebraciones y feedback

### 📊 Analytics y Monitoreo
- **@vercel/analytics 1.5.0**: Analytics de rendimiento y métricas de usuario
- **@vercel/speed-insights 1.2.0**: Monitoreo de velocidad y optimización

### 🔧 Estado y Datos
- **Nanostores 1.0.1**: Estado global reactivo y minimalista
- **@nanostores/react 1.0.0**: Integración de Nanostores con React

### 🌐 SEO y Meta
- **Sitemap automático** generado por Next.js App Router
- **Robots.txt dinámico** optimizado para crawlers
- **JSON-LD structured data** para rich snippets en buscadores
- **Meta tags dinámicos** por página con Open Graph optimizado

### 🛠️ Herramientas de Desarrollo
- **ESLint 9**: Linting con reglas Next.js y TypeScript optimizadas
- **Tailwind CSS 4**: Procesamiento CSS de próxima generación
- **TypeScript 5**: Tipado estático avanzado con configuración estricta
- **@types/node 20**: Tipado completo para Node.js APIs
- **@types/react 19**: Tipado para React 19 y nuevas características

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/MiguelVivar/MiguelVivar.github.io.git
cd MiguelVivar.github.io
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**

```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

## 📁 Arquitectura del Proyecto

```
📦 Portfolio v6.0.0
├── 📂 public/                  # Assets estáticos optimizados
│   ├── 🖼️ images/             # Imágenes del portfolio
│   ├── 🎵 audio/              # Archivos de audio
│   ├── 📄 sitemap.xml         # SEO sitemap generado
│   └── 🤖 robots.txt          # Directivas para crawlers
│
├── 📂 src/                     # Código fuente principal
│   ├── 📂 app/                # Next.js App Router (v15)
│   │   ├── 🏠 page.tsx        # Página de inicio
│   │   ├── 🎨 globals.css     # Estilos globales + Tailwind CSS v4
│   │   ├── 📱 layout.tsx      # Layout raíz con providers
│   │   ├── 🚫 not-found.tsx   # Página 404 personalizada
│   │   ├── 🤖 robots.ts       # Configuración robots.txt
│   │   ├── 🗺️ sitemap.ts      # Generación de sitemap automático
│   │   ├── 🔌 api/            # API Routes
│   │   │   └── 🎵 spotify/    # Integración Spotify API
│   │   ├── 👤 sobremi/        # Sobre mí
│   │   ├── 🛠️ habilidades/    # Habilidades técnicas
│   │   ├── 💼 proyectos/      # Portfolio de proyectos
│   │   └── 📞 contacto/       # Formulario de contacto
│   │
│   ├── 📂 components/          # Componentes reutilizables
│   │   ├── 🖥️ terminal/       # Sistema de terminal interactivo
│   │   │   ├── Terminal.tsx   # Componente principal
│   │   │   ├── TerminalButton.tsx
│   │   │   ├── TerminalCommand.tsx
│   │   │   ├── TerminalContext.tsx # Estado del terminal
│   │   │   └── LoadingIndicator.tsx
│   │   │
│   │   ├── 📊 analytics/      # Monitoreo con Vercel Analytics
│   │   │   ├── GoogleAnalytics.tsx
│   │   │   └── WebVitals.tsx
│   │   │
│   │   ├── 🔍 search/         # Motor de búsqueda global
│   │   │   └── GlobalSearch.tsx
│   │   │
│   │   ├── 🧭 navbar/         # Sistema de navegación
│   │   │   ├── Navbar.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── DesktopMenu.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── ContactButton.tsx
│   │   │   └── SocialIcons.tsx
│   │   │
│   │   ├── 👣 footer/         # Footer con enlaces sociales
│   │   │   ├── Footer.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   └── TypewriterText.tsx
│   │   │
│   │   ├── 🌐 seo/            # SEO y metadata
│   │   │   └── JsonLd.tsx     # Structured data
│   │   │
│   │   ├── ✨ AnimateBackground.tsx # Partículas TSParticles Slim
│   │   ├── 📞 CallToAction.tsx     # Call-to-action components
│   │   └── 🎵 SpotifyNowPlaying.tsx # Integración Spotify
│   │
│   ├── 📂 data/               # Estructuras de datos
│   │   ├── 💼 proyectos.tsx   # Portfolio de proyectos
│   │   ├── 🛠️ habilidades.tsx # Habilidades técnicas
│   │   ├── 👤 sobremi.tsx     # Información personal
│   │   ├── 🌐 redes.tsx       # Enlaces sociales
│   │   ├── 💬 testimonios.tsx # Testimonios y reseñas
│   │   └── 📊 index.tsx       # Exportaciones centralizadas
│   │
│   ├── 📂 ui/                 # Componentes UI especializados
│   │   ├── 🏠 home/           # Componentes página inicio
│   │   ├── 👤 sobremi/        # Componentes sobre mí
│   │   ├── 🛠️ habilidades/    # Componentes habilidades
│   │   ├── 💼 proyectos/      # Componentes proyectos
│   │   ├── 📞 contacto/       # Componentes contacto
│   │   └── 🚫 error404/       # Componentes página 404
│   │
│   ├── 📂 assets/             # Recursos estáticos
│   │   └── 🖼️ images/         # Imágenes del proyecto
│   │       ├── logo.svg
│   │       ├── perfil.png
│   │       └── proyectos/     # Screenshots de proyectos
│   │
│   ├── 📂 lib/                # Utilidades y configuración
│   │   ├── 🐙 githubApi.ts    # GitHub API integration
│   │   └── 🌤️ weatherApi.ts   # Weather API integration
│   │
│   ├── 📂 hooks/              # Custom React hooks
│   │   ├── 💾 useLocalStorage.ts
│   │   └── ⌨️ useTypewriter.ts
│   │
│   └── 📂 public/             # Assets públicos
│       ├── 🎨 logo.svg        # Logo principal
│       └── 🖼️ portafolio.png  # Imagen de preview
│
├── 📋 package.json            # Dependencias y scripts
├── 📐 tsconfig.json           # Configuración TypeScript 5
├── 🎨 postcss.config.mjs      # Configuración PostCSS
├── ⚙️ next.config.ts          # Configuración Next.js 15
├── 🔍 eslint.config.mjs       # Configuración ESLint
└── 📖 README.md               # Documentación técnica
```

## 📱 Secciones Principales

- **Inicio** (`/`): Presentación personal y resumen profesional con animaciones atractivas
- **Sobre Mí** (`/sobremi`): Información detallada sobre mi trayectoria, formación y valores profesionales
- **Habilidades** (`/habilidades`): Tecnologías y herramientas que domino, organizadas por categorías y nivel de experiencia
- **Proyectos** (`/proyectos`): Portafolio de trabajos destacados con descripciones, tecnologías utilizadas y enlaces
- **Contacto** (`/contacto`): Formulario de contacto y enlaces directos a redes sociales y correo electrónico

## 🔧 Scripts y Desarrollo

### 📝 Comandos Principales
```bash
# 🚀 Desarrollo local con hot reload
npm run dev          # Inicia servidor con Turbopack (ultra-rápido)

# 🏗️ Construcción para producción
npm run build        # Build optimizado con Next.js 15
npm run start        # Servidor de producción (post-build)

# 🔍 Análisis y calidad de código
npm run lint         # ESLint con reglas Next.js + TypeScript
```

# 📊 Comandos de Desarrollo
# Comandos adicionales disponibles
npm run dev --help    # Ver opciones de desarrollo
npm run build --help  # Ver opciones de construcción
```

### 🛠️ Workflow de Desarrollo

1. **Desarrollo Local**
   - Turbopack para builds instantáneos
   - Hot Module Replacement (HMR) avanzado
   - TypeScript strict mode activado
   - ESLint en tiempo real

2. **Optimización de Producción**
   - Tree shaking automático
   - Code splitting por rutas
   - Image optimization con Next.js
   - Compresión gzip/brotli

3. **Monitoreo de Rendimiento**
   - Vercel Analytics integrado
   - Speed Insights para Core Web Vitals
   - Performance tracking en tiempo real
   - Optimización automática de Next.js

## 📱 Responsive Design

Diseño completamente adaptativo para todos los dispositivos:

- **Mobile-first approach** con breakpoints estratégicos
- **Adaptive particle system** que se ajusta según el dispositivo
- **Touch-optimized interactions** para interfaces táctiles
- **Progressive image loading** con lazy loading inteligente
- **Viewport-aware animations** que se pausan fuera de vista
- **Battery-conscious optimizations** para dispositivos móviles

## ⚡ Métricas de Rendimiento

### 🎯 Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 1.2s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

### 📊 Optimizaciones Implementadas
- **Next.js 15 optimizations**: App Router con Server Components
- **Image optimization**: Next.js Image component con lazy loading
- **Font optimization**: Sistema de fuentes optimizado
- **Vercel Analytics**: Monitoreo de rendimiento en tiempo real
- **Speed Insights**: Métricas de Core Web Vitals automáticas
- **Turbopack**: Build system ultra-rápido para desarrollo

## 📞 Contacto

- **Email**: [miguelvivarfarfan@gmail.com](mailto:miguelvivarfarfan@gmail.com)
- **LinkedIn**: [Miguel Vivar Farfan](https://www.linkedin.com/in/miguel-vivar-farfan/)
- **GitHub**: [@MiguelVivar](https://github.com/MiguelVivar)
- **Instagram**: [@mvivarf](https://www.instagram.com/mvivarf/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

⭐️ **Desarrollado por Miguel Vivar** ⭐️

**Última actualización:** Mayo 2025 | **Versión:** 7.0.0

*Portafolio moderno construido con Next.js 15, React 19 y TypeScript 5*

</div>
