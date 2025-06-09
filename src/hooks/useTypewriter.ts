'use client'

import { useState, useEffect, useCallback, useMemo } from 'react';

export function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 75, pauseTime = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  const currentWord = useMemo(() => words[wordIndex], [words, wordIndex]);

  const handleCursorBlink = useCallback(() => {
    setShowCursor(prev => !prev);
  }, []);

  const handleTextUpdate = useCallback(() => {
    if (isWaiting) return;

    if (isDeleting) {
      setText(prev => prev.substring(0, prev.length - 1));
      if (text === '') {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }
    } else {
      if (text.length < currentWord.length) {
        setText(currentWord.substring(0, text.length + 1));
      } else if (text === currentWord) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, pauseTime);
      }
    }
  }, [text, currentWord, isDeleting, isWaiting, words.length, pauseTime]);

  useEffect(() => {
    const cursorInterval = setInterval(handleCursorBlink, 530);
    return () => clearInterval(cursorInterval);
  }, [handleCursorBlink]);

  useEffect(() => {
    const timer = setTimeout(handleTextUpdate, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, isWaiting, handleTextUpdate, deletingSpeed, typingSpeed]);

  return { text, showCursor };
}