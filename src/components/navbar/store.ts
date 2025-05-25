import { atom } from 'nanostores';

// Estado para controlar el menú móvil
export const isMenuOpen = atom(false);

// Estado para detectar scroll
export const isScrolled = atom(false);

// Cache para evitar llamadas repetitivas
let scrollThreshold = 20;
let scrollTimer: NodeJS.Timeout | null = null;

// Función optimizada para alternar el menú
export function toggleMenu() {
  isMenuOpen.set(!isMenuOpen.get());
}

// Función optimizada para cerrar el menú (útil para enlaces)
export function closeMenu() {
  if (isMenuOpen.get()) {
    isMenuOpen.set(false);
  }
}

// Función optimizada para abrir el menú
export function openMenu() {
  if (!isMenuOpen.get()) {
    isMenuOpen.set(true);
  }
}

// Handler de scroll optimizado con throttling
const handleScroll = (() => {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const shouldBeScrolled = currentScrollY > scrollThreshold;
        
        // Solo actualizar si el estado realmente cambió
        if (isScrolled.get() !== shouldBeScrolled) {
          isScrolled.set(shouldBeScrolled);
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  };
})();

// Función optimizada para detectar scroll con mejor performance
export function setupScrollDetection(threshold: number = 20) {
  // Actualizar threshold si es diferente
  scrollThreshold = threshold;
  
  // Configurar estado inicial sin forzar un scroll
  const initialScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  isScrolled.set(initialScrollY > scrollThreshold);
  
  // Usar passive listeners para mejor performance
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  // Función de cleanup optimizada
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
    
    // Limpiar timers si existen
    if (scrollTimer) {
      clearTimeout(scrollTimer);
      scrollTimer = null;
    }
  };
}

// Función para resetear el estado (útil para testing o SSR)
export function resetScrollState() {
  isScrolled.set(false);
  
  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }
}

// Función para obtener el estado actual sin suscribirse (mejor performance)
export function getMenuState() {
  return isMenuOpen.get();
}

export function getScrollState() {
  return isScrolled.get();
}