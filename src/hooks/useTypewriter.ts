/**
 * useTypewriter - Hook optimizado para efecto de máquina de escribir
 * 
 * OPTIMIZACIONES IMPLEMENTADAS:
 * ✅ useRef para evitar closures obsoletos
 * ✅ useCallback para memoizar funciones
 * ✅ useMemo para memoizar arrays de palabras
 * ✅ Mejor gestión de timeouts y cleanup
 * ✅ Separación de lógica del cursor y typing
 * ✅ Refs para estado que no necesita re-render
 * 
 * MEJORAS DE RENDIMIENTO:
 * - Eliminación de dependencias innecesarias en useEffect
 * - Mejor control de memory leaks
 * - Reducción de re-computaciones costosas
 * - Optimización del parpadeo del cursor
 */
'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 75, pauseTime = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);  // Usar refs para evitar closures obsoletos y mejorar rendimiento
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isWaitingRef = useRef(false);
  
  // Simplificar la memoización para evitar advertencias
  const memoizedWords = useMemo(() => words, [words]);

  // Optimizar el parpadeo del cursor con mejor control
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    
    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, []);

  // Función optimizada para manejar el typing con useCallback
  const handleTyping = useCallback(() => {
    if (isWaitingRef.current) return;

    const currentWord = memoizedWords[wordIndex];
    
    if (isDeleting) {
      setText(prev => {
        const newText = prev.substring(0, prev.length - 1);
        if (newText === '') {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % memoizedWords.length);
        }
        return newText;
      });
    } else {
      setText(prev => {
        if (prev.length < currentWord.length) {
          return currentWord.substring(0, prev.length + 1);
        } else if (prev === currentWord) {
          isWaitingRef.current = true;
          setIsWaiting(true);
          
          // Usar setTimeout optimizado para la pausa
          timeoutRef.current = setTimeout(() => {
            isWaitingRef.current = false;
            setIsWaiting(false);
            setIsDeleting(true);
          }, pauseTime);
        }
        return prev;
      });
    }
  }, [wordIndex, isDeleting, memoizedWords, pauseTime]);

  // Efecto principal optimizado
  useEffect(() => {
    if (isWaiting) return;

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, isDeleting, isWaiting, handleTyping, typingSpeed, deletingSpeed]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  return { text, showCursor };
}