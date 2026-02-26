// src/shared/hooks/useIsMobile.js
import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el dispositivo es mobile
 * @param {number} breakpoint - Ancho máximo para considerar mobile (default: 768px)
 * @returns {boolean} - true si es mobile, false si es desktop
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check inicial
    checkIsMobile();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;