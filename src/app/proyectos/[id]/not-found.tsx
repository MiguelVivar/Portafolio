'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { 
  FiArrowLeft, 
  FiSearch, 
  FiCode, 
  FiGithub, 
  FiExternalLink,
  FiRefreshCw,
  FiHome,
  FiLayers,
  FiZap
} from "react-icons/fi";

// Animación de partículas de fondo
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];
    
    // Crear partículas
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 1 }}
    />
  );
};

// Componente de código animado
const AnimatedCode = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    "const project = findById(params.id);",
    "if (!project) {",
    "  return <NotFound />;",
    "}",
    "// Proyecto no encontrado 😢"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % codeLines.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [codeLines.length]);
  
  return (
    <div className="bg-neutral-800/50 border border-emerald-400/20 rounded-lg p-4 font-mono text-sm max-w-md mx-auto mb-8 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3 text-emerald-400">
        <FiCode size={16} />
        <span className="text-xs font-semibold">404.tsx</span>
      </div>
      {codeLines.map((line, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ${
            index === currentLine 
              ? 'text-emerald-300 transform translate-x-2' 
              : 'text-gray-500'
          }`}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

// Tarjetas de sugerencias
const SuggestionCard = ({ icon: Icon, title, description, href, primary = false }: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
  href: string;
  primary?: boolean;
}) => (
  <Link href={href}>
    <div className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
      primary 
        ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/30 hover:border-emerald-400/50' 
        : 'bg-neutral-800/50 border border-neutral-700/50 hover:border-emerald-400/30'
    } backdrop-blur-sm`}>
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
          primary ? 'bg-emerald-500 text-neutral-900' : 'bg-neutral-700 text-emerald-400'
        } group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={20} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </Link>
);

// Componente principal mejorado
export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Gradientes de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl w-full">
          {/* Encabezado principal */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <h1 className={`text-8xl md:text-9xl font-black bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-6 ${
                glitchActive ? 'animate-pulse' : ''
              }`}>
                404
              </h1>
              {glitchActive && (
                <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500 opacity-20 animate-ping">
                  404
                </div>
              )}
            </div>
            
            <div className="space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Proyecto en el 
                <span className="text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text"> vacío digital</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                El proyecto que buscas parece haberse perdido en el ciberespacio. 
                Pero no te preocupes, hay muchas otras creaciones esperando ser descubiertas.
              </p>
            </div>
            
            <AnimatedCode />
          </div>
          
          {/* Botones de acción principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-neutral-900 px-8 py-4 rounded-xl transition-all duration-300 font-bold hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              Volver a Proyectos
              <FiZap className="group-hover:rotate-12 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-neutral-800/80 border border-emerald-400/30 hover:bg-neutral-700/80 hover:border-emerald-400/50 text-emerald-300 px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105"
            >
              <FiHome className="group-hover:scale-110 transition-transform duration-300" />
              Inicio
            </Link>
          </div>
          
          {/* Grid de sugerencias */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <SuggestionCard
              icon={FiLayers}
              title="Explorar Proyectos"
              description="Descubre todos los proyectos del portafolio con tecnologías modernas y soluciones innovadoras."
              href="/proyectos"
              primary
            />
            
            <SuggestionCard
              icon={FiCode}
              title="Ver Habilidades"
              description="Conoce las tecnologías, frameworks y herramientas que domino como desarrollador."
              href="/habilidades"
            />
            
            <SuggestionCard
              icon={FiGithub}
              title="Documentación"
              description="Accede a la documentación técnica y guías de implementación de los proyectos."
              href="/documentacion"
            />
            
            <SuggestionCard
              icon={FiSearch}
              title="API Endpoints"
              description="Explora las APIs disponibles y sus funcionalidades para integración."
              href="/api"
            />
            
            <SuggestionCard
              icon={FiExternalLink}
              title="Sobre Mí"
              description="Conoce más sobre mi experiencia, trayectoria y pasión por el desarrollo."
              href="/sobremi"
            />
            
            <SuggestionCard
              icon={FiRefreshCw}
              title="Contacto"
              description="¿Tienes alguna pregunta o proyecto en mente? ¡Hablemos!"
              href="/contacto"
            />
          </div>
          
          {/* Mensaje adicional */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <FiCode size={16} />
              <span>Error 404: Proyecto no encontrado en la base de datos</span>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              Tip: Verifica que el ID del proyecto sea correcto o navega desde la página de proyectos
            </div>
          </div>
        </div>
      </div>
      
      {/* Efectos adicionales */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
    </div>
  );
}
