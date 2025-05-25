'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  originalSize: number;
}

interface AnimateBackgroundProps {
  primaryColor?: string;
  secondaryColor?: string;
  particleDensity?: number;
  interactionRadius?: number;
  particleSpeed?: number;
  connectDistance?: number;
  responsive?: boolean;
}

// Hook optimizado para monitoreo de FPS
const useFpsMonitor = (callback: (fps: number) => void) => {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const active = useRef(true);
  useEffect(() => {
    const checkFps = () => {
      if (!active.current) return;

      const now = performance.now();
      const elapsed = now - lastTime.current;
      
      if (elapsed >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / elapsed);
        callback(fps);
        frameCount.current = 0;
        lastTime.current = now;
      }
      
      frameCount.current++;
    };
    
    const intervalId = setInterval(checkFps, 1000);
    
    return () => {
      active.current = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [callback]);
};

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
  
  // Cache para colores RGB
  const colorCache = useMemo(() => new Map<string, string>(), []);
  
  // Detección de preferencia de reducción de movimiento
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  
  // Función optimizada para convertir hex a RGB con cache
  const hexToRgb = useCallback((hex: string): string => {
    if (colorCache.has(hex)) {
      return colorCache.get(hex)!;
    }
    
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const result = `${r}, ${g}, ${b}`;
    colorCache.set(hex, result);
    return result;
  }, [colorCache]);
  
  // Detectar cuando el canvas está visible
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleInViewport.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);
    
    return () => {
      observer.unobserve(canvas);
    };
  }, []);
  
  // Monitor de FPS optimizado
  useFpsMonitor(useCallback((fps) => {
    if (fps < 25) {
      setPerformanceLevel('low');
      frameSkip.current = 3;
    } else if (fps < 45) {
      setPerformanceLevel('medium');
      frameSkip.current = 1;
    } else {
      setPerformanceLevel('high');
      frameSkip.current = 0;
    }
  }, []));

  // Detección de dispositivos de bajo rendimiento
  const checkDevicePerformance = useCallback(() => {
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
    
    if (isMobile || isLowEnd) {
      setPerformanceLevel('low');
    } else if (window.innerWidth <= 768) {
      setPerformanceLevel('medium');
    } else {
      setPerformanceLevel('high');
    }
  }, [responsive, prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      willReadFrequently: true,
      desynchronized: true
    });
    if (!ctx) return;
    
    // Optimizaciones de renderizado
    if (performanceLevel === 'high') {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    } else {
      ctx.imageSmoothingEnabled = false;
    }
    
    checkDevicePerformance();
    
    if (prefersReducedMotion) {
      return;
    }
    
    // Función para redimensionar canvas optimizada
    const resizeCanvas = () => {
      if (!canvas) return;
      
      const dpr = performanceLevel === 'low' ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      ctx.scale(dpr, dpr);
      initParticles();
    };
    
    // Inicialización optimizada de partículas
    const initParticles = () => {
      particles.current = [];
      
      let adjustedDensity = particleDensity;
      switch (performanceLevel) {
        case 'low':
          adjustedDensity = Math.max(particleDensity * 0.15, 8);
          break;
        case 'medium':
          adjustedDensity = particleDensity * 0.4;
          break;
        case 'high':
        default:
          adjustedDensity = Math.min(particleDensity, 120);
          break;
      }
      
      const maxParticles = performanceLevel === 'low' ? 20 : performanceLevel === 'medium' ? 60 : 120;
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 30000 * (adjustedDensity / 100)),
        Math.min(adjustedDensity, maxParticles)
      );
      
      // Pre-calcular valores aleatorios para mejor rendimiento
      const randomValues = new Float32Array(particleCount * 6);
      for (let i = 0; i < randomValues.length; i++) {
        randomValues[i] = Math.random();
      }
      
      let randomIndex = 0;
      
      for (let i = 0; i < particleCount; i++) {
        const baseSize = randomValues[randomIndex++] * 1.2 + 0.3;
        particles.current.push({
          x: randomValues[randomIndex++] * window.innerWidth,
          y: randomValues[randomIndex++] * window.innerHeight,
          size: baseSize,
          originalSize: baseSize,
          speedX: (randomValues[randomIndex++] - 0.5) * particleSpeed,
          speedY: (randomValues[randomIndex++] - 0.5) * particleSpeed,
          color: (randomValues[randomIndex++] > 0.75) ? primaryColor : secondaryColor,
          alpha: 0.3
        });
      }
    };
    
    // Función de manejo de eventos ultra-optimizada
    let throttleTimer: number | null = null;
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (throttleTimer) return;
      
      const throttleTime = performanceLevel === 'low' ? 100 : performanceLevel === 'medium' ? 50 : 16;
      
      throttleTimer = window.setTimeout(() => {
        throttleTimer = null;
        
        lastUpdateTime.current = performance.now();
        isActive.current = true;
        
        let clientX: number, clientY: number;
        
        if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          clientX = e.clientX;
          clientY = e.clientY;
        } else {
          return;
        }
        
        mousePosition.current.x = clientX;
        mousePosition.current.y = clientY;
      }, throttleTime);
    };
    
    // Animación ultra-optimizada con múltiples técnicas de rendimiento
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Frame skipping avanzado
      if (frameSkip.current > 0) {
        frameSkipCount.current = (frameSkipCount.current + 1) % (frameSkip.current + 1);
        if (frameSkipCount.current !== 0) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
      }
      
      // Skip if not visible
      if (!isVisibleInViewport.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Clear canvas with optimized method
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      const perfFactor = performanceLevel === 'low' ? 0.4 : performanceLevel === 'medium' ? 0.7 : 1;
      const actualConnectDistance = connectDistance * perfFactor;
      const particleArray = particles.current;
      const particleCount = particleArray.length;
      
      const currentTime = performance.now();
      const isInteractionActive = isActive.current && (currentTime - lastUpdateTime.current < 2500);
      const mouseX = mousePosition.current.x;
      const mouseY = mousePosition.current.y;
      const interactionRadiusSquared = interactionRadius * interactionRadius;
      
      // Batch operations for maximum performance
      ctx.save();
      
      // Actualizar y dibujar partículas en una sola pasada
      for (let i = 0; i < particleCount; i++) {
        const particle = particleArray[i];
        
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Interacción con mouse optimizada (evitar sqrt cuando sea posible)
        if (isInteractionActive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distanceSquared = dx * dx + dy * dy;
          
          if (distanceSquared < interactionRadiusSquared) {
            const distance = Math.sqrt(distanceSquared);
            const force = (interactionRadius - distance) / interactionRadius;
            const forceMultiplier = 0.015 * perfFactor;
            
            particle.speedX += (dx / distance) * force * forceMultiplier;
            particle.speedY += (dy / distance) * force * forceMultiplier;
            
            // Efecto de tamaño solo en alto rendimiento
            if (performanceLevel === 'high' && particle.size < particle.originalSize * 1.3) {
              particle.size = Math.min(particle.size * 1.003, particle.originalSize * 1.3);
            }
          } else if (performanceLevel === 'high' && particle.size > particle.originalSize) {
            particle.size = Math.max(particle.size * 0.997, particle.originalSize);
          }
        }
        
        // Aplicar fricción
        particle.speedX *= 0.995;
        particle.speedY *= 0.995;
        
        // Rebote en bordes optimizado
        if (particle.x <= 0 || particle.x >= window.innerWidth) {
          particle.speedX *= -0.8;
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        }
        
        if (particle.y <= 0 || particle.y >= window.innerHeight) {
          particle.speedY *= -0.8;
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        }
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      }
      
      ctx.restore();
      
      // Conexiones entre partículas (solo en modo medio/alto rendimiento)
      if (performanceLevel !== 'low' && particleCount > 1) {
        ctx.save();
        
        const connectionLimit = performanceLevel === 'medium' ? 1 : 3;
        const actualConnectDistanceSquared = actualConnectDistance * actualConnectDistance;
        
        // Pre-calcular colores RGB
        const primaryRgb = hexToRgb(primaryColor);
        const secondaryRgb = hexToRgb(secondaryColor);
        
        for (let i = 0; i < particleCount; i++) {
          const particle = particleArray[i];
          let connectionsDrawn = 0;
          
          // Optimización espacial: solo verificar partículas en un rango limitado
          const searchRange = Math.min(6, particleCount - i - 1);
          
          for (let j = 1; j <= searchRange && connectionsDrawn < connectionLimit; j++) {
            const otherIndex = i + j;
            if (otherIndex >= particleCount) break;
            
            const otherParticle = particleArray[otherIndex];
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distanceSquared = dx * dx + dy * dy;
            
            if (distanceSquared < actualConnectDistanceSquared) {
              const distance = Math.sqrt(distanceSquared);
              const opacity = (1 - distance / actualConnectDistance) * 0.1;
              const isPrimaryColor = particle.color === primaryColor || otherParticle.color === primaryColor;
              
              ctx.beginPath();
              ctx.strokeStyle = isPrimaryColor 
                ? `rgba(${primaryRgb}, ${opacity})`
                : `rgba(${secondaryRgb}, ${opacity * 0.6})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              
              connectionsDrawn++;
            }
          }
        }
        
        ctx.restore();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Throttled resize handler
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeCanvas, 150);
    };
    
    // Event listeners con opciones optimizadas
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    
    // Inicializar
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
      
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
    };
  }, [primaryColor, secondaryColor, particleDensity, interactionRadius, particleSpeed, connectDistance, responsive, performanceLevel, prefersReducedMotion, checkDevicePerformance, hexToRgb]);
  
  // Versión estática para usuarios que prefieren reducir movimiento
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    );
  }
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ 
        willChange: 'auto',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    />
  );
});

AnimateBackground.displayName = 'AnimateBackground';

export default AnimateBackground;