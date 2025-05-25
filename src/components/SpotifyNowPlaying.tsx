'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpotify, FaHeadphones, FaPause, FaPlay, FaVolumeUp, FaExclamationTriangle } from 'react-icons/fa';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
  error?: string;
  timestamp?: string;
}

const formatTime = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// La URL base depende del entorno (desarrollo o producción)
const getApiUrl = () => {
  // Verifica si estamos en un entorno de GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  // Para GitHub Pages, usamos la URL absoluta del sitio desplegado
  if (isGitHubPages) {
    const baseUrl = window.location.origin;
    return `${baseUrl}/api/spotify`;
  }
  // En desarrollo y producción con Next.js, usamos la ruta relativa
  return '/api/spotify';
};

const SpotifyNowPlaying: React.FC = () => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clientProgress, setClientProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Función para obtener los datos de Spotify
    const fetchSpotifyData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching Spotify data from:", getApiUrl());
        const res = await fetch(getApiUrl(), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }
        
        const newData: SpotifyData = await res.json();
        console.log("Spotify data received:", newData);
        
        if (newData.error) {
          setError(newData.error);
          console.error("Spotify API error:", newData.error);
        } else {
          setData(newData);
          
          if (newData.isPlaying && newData.progress !== undefined && newData.duration !== undefined) {
            setProgress((newData.progress / newData.duration) * 100);
            setClientProgress(newData.progress);
          }
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setError('No se pudieron cargar los datos de Spotify');
        
        // Si estamos en GitHub Pages, intentemos usar una alternativa
        if (window.location.hostname.includes('github.io') && retryCount < 3) {
          setRetryCount(prev => prev + 1);
          setTimeout(fetchSpotifyData, 3000); // Reintentamos en 3 segundos
        }
      } finally {
        setLoading(false);
      }
    };

    // Obtenemos los datos inmediatamente
    fetchSpotifyData();

    // Actualizamos los datos cada 30 segundos
    const intervalId = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(intervalId);
  }, [retryCount]);

  // Efecto para simular el avance de la barra de progreso en tiempo real
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (data?.isPlaying && data.duration) {
      intervalId = setInterval(() => {
        setClientProgress(prev => {
          if (prev >= data.duration!) {
            clearInterval(intervalId);
            return prev;
          }
          const newProgress = prev + 1000;
          setProgress((newProgress / data.duration!) * 100);
          return newProgress;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [data]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center space-x-2 text-sm text-gray-400"
      >
        <div className="animate-pulse flex items-center space-x-2">
          <FaSpotify className="text-emerald-400" />
          <span>Conectando con Spotify...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col"
      >
        <div className="flex items-center space-x-2 text-sm text-red-400">
          <FaExclamationTriangle className="text-red-400" />
          <span>Error al conectar con Spotify</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {error}
        </p>
      </motion.div>
    );
  }

  if (!data || !data.isPlaying) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <FaHeadphones className="text-gray-400" />
          <span>No escucho nada ahora</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          La música aparecerá aquí cuando reproduzca algo en Spotify
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <div className="flex items-center mb-2">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="mr-2"
        >
          <FaSpotify className="text-lg text-green-500" />
        </motion.div>
        <span className="text-sm font-medium text-emerald-400">Escuchando ahora</span>
      </div>
      
      <motion.div 
        className="relative overflow-hidden rounded-lg transition-all duration-300 bg-gradient-to-br from-neutral-800 to-neutral-900"
        animate={{ height: isExpanded ? 'auto' : 'auto' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"
          style={{ scaleX: progress / 100, transformOrigin: 'left' }}
        />
        
        <div className="p-3">
          <div className="flex space-x-3 items-center">
            {/* Imagen del álbum con animación */}
            {data.albumImageUrl && (
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="relative w-14 h-14 min-w-[56px] rounded-md overflow-hidden shadow-lg"
              >
                <img 
                  src={data.albumImageUrl} 
                  alt={`${data.album} cover`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                
                <motion.div 
                  className="absolute bottom-1 right-1 bg-black/60 rounded-full p-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {data.isPlaying 
                    ? <FaPlay className="text-white text-[8px]" /> 
                    : <FaPause className="text-white text-[8px]" />
                  }
                </motion.div>
              </motion.div>
            )}
            
            {/* Información de la canción */}
            <div className="flex flex-col overflow-hidden flex-1">
              <a 
                href={data.songUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-white truncate hover:text-emerald-300 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {data.title}
              </a>
              <p className="text-gray-400 text-xs truncate">
                {data.artist}
              </p>
              
              {/* Información del tiempo */}
              <div className="flex justify-between items-center mt-1 text-[10px] text-gray-500">
                <span>
                  {data.progress !== undefined && formatTime(clientProgress)}
                </span>
                <span className="flex items-center">
                  <FaVolumeUp className="mr-1 text-gray-500" size={8} />
                  {data.duration !== undefined && formatTime(data.duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detalles expandidos */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-3 pb-3"
            >
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-800/50">
                <p>Álbum: {data.album}</p>
                <div className="mt-1 flex items-center">
                  <div className="mr-2 text-emerald-400">
                    <FaSpotify className="inline-block mr-1" size={10} />
                    <span className="text-[10px]">SPOTIFY</span>
                  </div>
                  <a 
                    href={data.songUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-emerald-400 transition-colors text-[10px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Abrir en Spotify
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SpotifyNowPlaying;