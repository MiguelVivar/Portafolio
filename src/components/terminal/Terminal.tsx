'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaMinus } from 'react-icons/fa';
import { useTerminal } from './TerminalContext';
import TerminalCommand from './TerminalCommand';
import LoadingIndicator from './LoadingIndicator';

// Lista de comandos para autocompletado
const COMMANDS = [
  // Navegación
  'help', 'nav', 'portfolio',
  // Comandos directos de navegación
  'home', 'inicio', 'about', 'sobremi', 'sobre-mi', 'projects', 'proyectos', 'skills', 'habilidades', 'contact', 'contacto',
  // Información personal
  'socials',
  // Sistema de archivos
  'ls', 'dir', 'cd', 'pwd', 'cat', 'find', 'tree',
  // Comandos de desarrollo
  'git', 'npm', 'code', 'whoami', 'ps',
  // Easter eggs y diversión
  'matrix', 'coffee', 'café', 'konami', 'fortune', 'sudo', 'joke', 'ascii', 'theme',
  // Juegos
  'game', 'guess',
  // Utilidades
  'date', 'weather', 'calc', 'quote', 'history', 'clear', 'exit'
];

const Terminal: React.FC = () => {
  const { history, isOpen, handleCommand, closeTerminal, currentPath } = useTerminal();
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [minimized, setMinimized] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Enfocar el input cuando se abre la terminal
  useEffect(() => {
    if (isOpen && inputRef.current && !minimized) {
      inputRef.current.focus();
    }
  }, [isOpen, minimized]);

  // Hacer scroll al fondo cuando se añade un nuevo comando
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [history]);

  // Manejar el envío de comandos
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    handleCommand(input);
    setCommandHistory(prev => [input, ...prev]);
    setHistoryIndex(-1);
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Autocompletado y navegación del historial
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Tecla Tab para autocompletado
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
        setSuggestions([]);
        setShowSuggestions(false);
      } else if (suggestions.length > 0) {
        setShowSuggestions(true);
      }
    }
    // Teclas de flecha para navegar por el historial
    else if (e.key === 'ArrowUp' && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(newIndex >= 0 ? commandHistory[newIndex] : '');
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Generar sugerencias basadas en el input actual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim()) {
      const filtered = COMMANDS.filter(cmd => cmd.startsWith(value.toLowerCase()));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
    
    setShowSuggestions(false);
  };

  // Seleccionar una sugerencia
  const selectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 right-0 z-50 p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`flex flex-col rounded-lg overflow-hidden border border-emerald-500/30
          ${minimized ? 'w-64' : 'w-full md:w-[600px] lg:w-[700px]'} 
          ${minimized ? 'h-12' : 'h-96'} 
          shadow-lg shadow-emerald-500/10 backdrop-blur-md`}
          layoutId="terminal-window"
        >
          {/* Barra de título */}
          <motion.div 
            className="flex justify-between items-center px-4 py-2 bg-neutral-800/90 border-b border-emerald-500/30"
          >
            <div className="flex items-center gap-2">
              <FaTerminal className="text-emerald-400" />
              <span className="text-emerald-300 font-medium">Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setMinimized(prev => !prev)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={minimized ? "Maximizar" : "Minimizar"}
              >
                <FaMinus size={14} />
              </button>
              <button 
                onClick={closeTerminal}
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Cerrar"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </motion.div>

          {/* Contenido de la terminal */}
          <AnimatePresence>
            {!minimized && (
              <motion.div 
                className="flex-1 bg-neutral-900/90 p-4 overflow-hidden flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Área de historial */}
                <div 
                  ref={terminalContentRef}
                  className="flex-1 overflow-y-auto font-mono text-sm pr-2 space-y-3"
                >
                  {history.map((item, index) => (
                    <TerminalCommand
                      key={index}
                      command={item.command}
                      output={item.output}
                      isError={item.isError}
                    />
                  ))}
                </div>                {/* Prompt de entrada */}
                <div className="mt-2 pt-2 border-t border-neutral-700/50">
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-green-400 font-semibold">miguel@vivar</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400 font-mono">{currentPath}</span>
                      <span className="text-emerald-400 font-bold">$</span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent outline-none border-none text-gray-100 font-mono text-sm"
                        autoComplete="off"
                        autoFocus
                        placeholder="Escribe un comando..."
                      />
                      
                      {/* Sugerencias de autocompletado */}
                      <AnimatePresence>
                        {showSuggestions && suggestions.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute bottom-full mb-1 left-0 bg-neutral-800 border border-neutral-600 rounded shadow-xl z-10 overflow-hidden"
                          >
                            {suggestions.map((suggestion) => (
                              <div
                                key={suggestion}
                                onClick={() => selectSuggestion(suggestion)}
                                className="px-3 py-1 hover:bg-emerald-700/20 cursor-pointer text-emerald-300"
                              >
                                {suggestion}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </div>              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Indicador de carga para comandos asíncronos */}
          <LoadingIndicator />
        </motion.div>
        
        {/* Pista de ayuda */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-2 text-xs text-center text-neutral-400"
        >
          Presiona <kbd className="px-1 py-0.5 bg-neutral-800 rounded text-xs text-emerald-300 border border-neutral-700">Tab</kbd> para autocompletar
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Terminal;