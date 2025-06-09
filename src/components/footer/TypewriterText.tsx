'use client'

import React, { useMemo } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 75,
  pauseTime = 1500
}) => {
  const { text, showCursor } = useTypewriter(phrases, typingSpeed, deletingSpeed, pauseTime);

  const cursorStyle = useMemo(() => 
    `absolute ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`,
    [showCursor]
  );

  const textContent = useMemo(() => (
    <div className="inline relative">
      <span>&quot;{text}&quot;</span>
      <span className={cursorStyle}>|</span>
    </div>
  ), [text, cursorStyle]);

  return textContent;
};

export default React.memo(TypewriterText);