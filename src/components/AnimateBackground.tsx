'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react';

// Interfaz para definir las propiedades de las partículas
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

// Propiedades configurables para el componente
interface AnimateBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  particleDensity?: number; // Cantidad de partículas (0-100)
  interactionRadius?: number; // Radio de interacción con el cursor
  particleSpeed?: number; // Velocidad base de las partículas
  connectDistance?: number; // Distancia máxima para conectar partículas
  responsive?: boolean; // Reducir efectos en dispositivos de bajo rendimiento
}

// Función para medir FPS y ajustar la calidad automáticamente
const useFpsMonitor = (callback: (fps: number) => void) => {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const active = useRef(true);

  useEffect(() => {
    const checkFps = () => {
      if (!active.current) return;

      const now = performance.now();
      const elapsed = now - lastTime.current;
      
      if (elapsed >= 1000) { // Cada segundo
        const fps = Math.round((frameCount.current * 1000) / elapsed);
        callback(fps);
        frameCount.current = 0;
        lastTime.current = now;
      }
      
      frameCount.current++;
      requestAnimationFrame(checkFps);
    };
    
    requestAnimationFrame(checkFps);
    
    return () => {
      active.current = false;
    };
  }, [callback]);
};

// eslint-disable-next-line react/display-name
const AnimateBackground: React.FC<AnimateBackgroundProps> = React.memo(({
  primaryColor = '#10b981',
  secondaryColor = '#f3f4f6',
  particleDensity = 100,
  interactionRadius = 120,
  particleSpeed = 0.3,
  connectDistance = 100,
  responsive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isActive = useRef(false);
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('medium');
  const animationRef = useRef<number>(0);
  const lastUpdateTime = useRef<number>(0);
  const frameSkip = useRef<number>(0);
  const frameSkipCount = useRef<number>(0);
  const isVisibleInViewport = useRef<boolean>(true);
  
  // Detección de preferencia de reducción de movimiento
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  
  // Detectar cuando el canvas está visible en el viewport para optimizar recursos
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleInViewport.current = entry.isIntersecting;
      },
      { threshold: 0.1 } // 10% visible es suficiente para activar
    );
    
    observer.observe(canvasRef.current);
    
    return () => {
      if (canvasRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);
  
  // Monitor de FPS para ajustar dinámicamente la calidad
  useFpsMonitor((fps) => {
    if (fps < 30) {
      setPerformanceLevel('low');
      frameSkip.current = 2; // Renderizar cada 3 frames
    } else if (fps < 50) {
      setPerformanceLevel('medium');
      frameSkip.current = 1; // Renderizar cada 2 frames
    } else {
      setPerformanceLevel('high');
      frameSkip.current = 0; // Renderizar todos los frames
    }
  });

  // Función para detectar dispositivos de bajo rendimiento
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkDevicePerformance = () => {
    if (!responsive || prefersReducedMotion) {
      setPerformanceLevel('low');
      return;
    }
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    const isLowEnd = Boolean(
      navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    );
    
    // Determinar nivel de rendimiento inicial
    if (isMobile || isLowEnd) {
      setPerformanceLevel('low');
    } else if (window.innerWidth <= 768) {
      setPerformanceLevel('medium');
    } else {
      setPerformanceLevel('high');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Opción para mejorar rendimiento en WebGL si está disponible
    if ('imageSmoothingEnabled' in ctx) {
      ctx.imageSmoothingEnabled = performanceLevel === 'high';
    }
    
    checkDevicePerformance();
    
    // Si el usuario prefiere reducir el movimiento, no inicializar animaciones
    if (prefersReducedMotion) {
      return;
    }
    
    // Ajustar el canvas al tamaño de la ventana con un throttle en el evento resize
    const resizeCanvas = () => {
      if (!canvas) return;
      
      // Usar devicePixelRatio para screens de alta densidad, pero limitado en dispositivos de bajo rendimiento
      const dpr = performanceLevel === 'low' ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      // Escalar el contexto según el devicePixelRatio
      ctx.scale(dpr, dpr);
      
      initParticles();
    };
    
    // Throttle function para eventos frecuentes (resize, mouse)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    function throttle(func: Function, limit: number) {
      let lastCall = 0;
      return function (this: unknown, ...args: unknown[]) {
        const now = Date.now();
        if (now - lastCall > limit) {
          lastCall = now;
          func.apply(this, args);
        }
      };
    }
    
    const throttledResize = throttle(resizeCanvas, 250);
    
    // Inicializar partículas
    const initParticles = () => {
      particles.current = [];
      
      // Ajustar cantidad de partículas según el nivel de rendimiento
      let adjustedDensity = particleDensity;
      switch (performanceLevel) {
        case 'low':
          adjustedDensity = particleDensity * 0.3;
          break;
        case 'medium':
          adjustedDensity = particleDensity * 0.6;
          break;
        case 'high':
        default:
          // Usar valor original
          break;
      }
      
      // Limitar el número total de partículas
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 20000 * (adjustedDensity / 100)),
        adjustedDensity
      );
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * particleSpeed,
          speedY: (Math.random() - 0.5) * particleSpeed,
          color: i % 5 === 0 ? primaryColor : secondaryColor,
          alpha: 0.3 // Valor constante de opacidad
        });
      }
    };
    
    // Función para manejar eventos de mouse/táctiles con throttling
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const currentTime = Date.now();
      
      // Más throttling en dispositivos de bajo rendimiento
      const throttleTime = performanceLevel === 'low' ? 50 : performanceLevel === 'medium' ? 25 : 16;
      if (currentTime - lastUpdateTime.current < throttleTime) return;
      
      lastUpdateTime.current = currentTime;
      isActive.current = true;
      
      let clientX, clientY;
      
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      mousePosition.current = {
        x: clientX,
        y: clientY
      };
    };
    
    // Animar las partículas con optimización de renderizado
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Saltarse frames según el nivel de rendimiento
      if (frameSkip.current > 0) {
        frameSkipCount.current = (frameSkipCount.current + 1) % (frameSkip.current + 1);
        if (frameSkipCount.current !== 0) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
      }
      
      // No renderizar si no está visible en el viewport
      if (!isVisibleInViewport.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Factor de rendimiento para cálculos físicos
      const perfFactor = performanceLevel === 'low' ? 0.7 : performanceLevel === 'medium' ? 0.9 : 1;
      
      // Ajustar distancias de conexión según rendimiento
      const actualConnectDistance = connectDistance * perfFactor;
      
      // Dibujar y actualizar cada partícula
      particles.current.forEach((particle, index) => {
        // Dibujar la partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Interacción con el ratón/táctil solo si está activo
        if (isActive.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactionRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (interactionRadius - distance) / interactionRadius;
            
            // Ajustar fuerza según rendimiento
            const forceMultiplier = 0.03 * perfFactor;
            particle.speedX += forceDirectionX * force * forceMultiplier;
            particle.speedY += forceDirectionY * force * forceMultiplier;
            
            // Efecto de tamaño cuando el cursor está cerca
            if (performanceLevel === 'high') {
              particle.size = Math.min(particle.size * 1.01, 3);
            }
          } else if (performanceLevel === 'high') {
            // Volver gradualmente al tamaño original sólo en modo alto rendimiento
            particle.size = Math.max(particle.size * 0.99, 0.5 + Math.random() * 2);
          }
        }
        
        // Añadir fricción para evitar aceleraciones infinitas
        particle.speedX *= 0.98;
        particle.speedY *= 0.98;
        
        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.speedX = -particle.speedX * 0.9;
        }
        
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.speedY = -particle.speedY * 0.9;
        }
        
        // Conectar partículas cercanas con líneas - optimizado por nivel de rendimiento
        if (performanceLevel !== 'low') {
          // En modo bajo rendimiento, omitir conexiones o reducir drásticamente
          const connectionLimit = performanceLevel === 'medium' ? 3 : 8;
          let connectionsDrawn = 0;
          
          for (let i = index + 1; i < particles.current.length && connectionsDrawn < connectionLimit; i++) {
            const otherParticle = particles.current[i];
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < actualConnectDistance) {
              const isPrimaryColor = particle.color === primaryColor || otherParticle.color === primaryColor;
              
              ctx.beginPath();
              ctx.strokeStyle = isPrimaryColor 
                ? `rgba(${hexToRgb(primaryColor)}, ${(1 - distance / actualConnectDistance) * 0.2})`
                : `rgba(${hexToRgb(secondaryColor)}, ${(1 - distance / actualConnectDistance) * 0.1})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              
              connectionsDrawn++;
            }
          }
        }
      });
      
      // Desactivar estado activo gradualmente si no hay interacción
      if (Date.now() - lastUpdateTime.current > 2000) {
        isActive.current = false;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Función para convertir colores hex a rgb para las líneas con transparencia
    const hexToRgb = (hex: string): string => {
      // Eliminar # si existe
      hex = hex.replace(/^#/, '');
      
      // Convertir abreviaciones a forma completa
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      
      // Extraer componentes
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    };
    
    // Eventos táctiles y de mouse con diferentes throttling según rendimiento
    const throttleTime = performanceLevel === 'low' ? 50 : performanceLevel === 'medium' ? 30 : 16;
    const throttledPointerMove = throttle(handlePointerMove, throttleTime);
    
    window.addEventListener('resize', throttledResize);
    window.addEventListener('mousemove', throttledPointerMove);
    window.addEventListener('touchmove', throttledPointerMove);
    window.addEventListener('touchstart', throttledPointerMove);
    
    // Iniciar animación
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('mousemove', throttledPointerMove);
      window.removeEventListener('touchmove', throttledPointerMove);
      window.removeEventListener('touchstart', throttledPointerMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [primaryColor, secondaryColor, particleDensity, interactionRadius, particleSpeed, connectDistance, responsive, performanceLevel, prefersReducedMotion, checkDevicePerformance]);
  
  // Si el usuario prefiere reducir el movimiento, mostrar una versión estática simplificada
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>
    );
  }
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
});

export default AnimateBackground;