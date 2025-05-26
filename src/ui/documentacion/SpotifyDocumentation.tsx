'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSpotify, 
  FaPlay, 
  FaCopy, 
  FaCheck, 
  FaExternalLinkAlt, 
  FaCode,
  FaKey,
  FaCog,
  FaDatabase,
  FaShieldAlt
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';

const SpotifyDocumentation: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };
  const codeBlocks = {
    endpoint: `// Endpoint de la API
GET /api/spotify

// Respuesta cuando está reproduciendo música
{
  "isPlaying": true,
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "albumImageUrl": "https://i.scdn.co/image/...",
  "songUrl": "https://open.spotify.com/track/...",
  "progress": 120000,
  "duration": 355000,
  "timestamp": "2025-05-26T10:30:00Z"
}

// Respuesta cuando no está reproduciendo
{
  "isPlaying": false,
  "timestamp": "2025-05-26T10:30:00Z"
}

// Respuesta en caso de error
{
  "isPlaying": false,
  "error": "Error processing Spotify request",
  "details": "...",
  "timestamp": "2025-05-26T10:30:00Z"
}`,
      implementation: `'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpotify, FaHeadphones, FaPause, FaPlay, FaVolumeUp, FaExclamationTriangle } from 'react-icons/fa';
import Image from 'next/image';

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
  return \`\${minutes}:\${seconds < 10 ? '0' : ''}\${seconds}\`;
};

// Función para obtener la URL correcta del API
const getApiUrl = () => {
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (isGitHubPages) {
    return \`\${window.location.origin}/api/spotify\`;
  }
  return '/api/spotify';
};

const SpotifyNowPlaying: React.FC = () => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [clientProgress, setClientProgress] = useState(0);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(getApiUrl(), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          cache: 'no-store'
        });
        
        if (!res.ok) {
          throw new Error(\`API responded with status: \${res.status}\`);
        }
        
        const newData: SpotifyData = await res.json();
        
        if (newData.error) {
          setError(newData.error);
        } else {
          setData(newData);
          
          if (newData.isPlaying && newData.progress && newData.duration) {
            setProgress((newData.progress / newData.duration) * 100);
            setClientProgress(newData.progress);
          }
        }
      } catch (error) {
        setError('No se pudieron cargar los datos de Spotify');
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyData();
    // Actualización cada 30 segundos
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Progreso en tiempo real
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (data?.isPlaying && data.duration) {
      intervalId = setInterval(() => {
        setClientProgress(prev => {
          if (prev >= data.duration!) return prev;
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
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <FaSpotify className="text-emerald-400 animate-pulse" />
        <span>Conectando con Spotify...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 text-sm text-red-400">
          <FaExclamationTriangle className="text-red-400" />
          <span>Error al conectar con Spotify</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{error}</p>
      </div>
    );
  }

  if (!data || !data.isPlaying) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <FaHeadphones className="text-gray-400" />
          <span>No escucho nada ahora</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          La música aparecerá aquí cuando reproduzca algo en Spotify
        </p>
      </div>
    );
  }

  return (
    <motion.div className="flex flex-col">
      <div className="flex items-center mb-2">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="mr-2"
        >
          <FaSpotify className="text-lg text-green-500" />
        </motion.div>
        <span className="text-sm font-medium text-emerald-400">Escuchando ahora</span>
      </div>
      
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"
          style={{ transform: \`scaleX(\${progress / 100})\`, transformOrigin: 'left' }}
        />
        
        <div className="p-3">
          <div className="flex space-x-3 items-center">
            {data.albumImageUrl && (
              <div className="relative w-14 h-14 min-w-[56px] rounded-md overflow-hidden shadow-lg">
                <Image 
                  src={data.albumImageUrl} 
                  alt={\`\${data.album} cover\`}
                  className="w-full h-full object-cover"
                  width={56}
                  height={56}
                />
                <div className="absolute bottom-1 right-1 bg-black/60 rounded-full p-1">
                  <FaPlay className="text-white text-[8px]" />
                </div>
              </div>
            )}
            
            <div className="flex flex-col overflow-hidden flex-1">
              <a 
                href={data.songUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-white truncate hover:text-emerald-300 transition-colors text-sm"
              >
                {data.title}
              </a>
              <p className="text-gray-400 text-xs truncate">
                {data.artist}
              </p>
              
              <div className="flex justify-between items-center mt-1 text-[10px] text-gray-500">
                <span>
                  {data.progress && formatTime(clientProgress)}
                </span>
                <span className="flex items-center">
                  <FaVolumeUp className="mr-1" size={8} />
                  {data.duration && formatTime(data.duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpotifyNowPlaying;`,

    envSetup: `# Variables de entorno necesarias (.env.local)
SPOTIFY_CLIENT_ID=tu_client_id_aqui
SPOTIFY_CLIENT_SECRET=tu_client_secret_aqui  
SPOTIFY_REFRESH_TOKEN=tu_refresh_token_aqui`,    authentication: `// API Route: /app/api/spotify/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
  
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({
      isPlaying: false,
      error: 'Missing Spotify credentials',
    });
  }

  try {
    // 1. Obtener token de acceso usando refresh token
    const authResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': \`Basic \${Buffer.from(\`\${CLIENT_ID}:\${CLIENT_SECRET}\`).toString('base64')}\`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN
      })
    });

    const authData = await authResponse.json();

    // 2. Obtener estado actual de reproducción
    const nowPlayingResponse = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          'Authorization': \`Bearer \${authData.access_token}\`
        }
      }
    );

    // 3. Manejar respuestas vacías o errores
    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
      return NextResponse.json({
        isPlaying: false,
        timestamp: new Date().toISOString()
      });
    }

    const nowPlaying = await nowPlayingResponse.json();
    
    if (!nowPlaying.is_playing) {
      return NextResponse.json({
        isPlaying: false,
        timestamp: new Date().toISOString()
      });
    }

    // 4. Formatear respuesta
    return NextResponse.json({
      isPlaying: nowPlaying.is_playing,
      title: nowPlaying.item.name,
      artist: nowPlaying.item.artists.map(artist => artist.name).join(', '),
      album: nowPlaying.item.album.name,
      albumImageUrl: nowPlaying.item.album.images[0].url,
      songUrl: nowPlaying.item.external_urls.spotify,
      progress: nowPlaying.progress_ms,
      duration: nowPlaying.item.duration_ms,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return NextResponse.json({
      isPlaying: false,
      error: 'Error processing Spotify request',
      details: String(error)
    });
  }
}`
  };

  return (
    <div className="space-y-12">
      {/* Introducción */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 border border-neutral-700/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
            <FaSpotify className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Spotify Now Playing API</h2>
            <p className="text-gray-400">Integración en tiempo real con Spotify Web API</p>
          </div>
        </div>
          <p className="text-gray-300 leading-relaxed">
          Esta API permite obtener en tiempo real la canción que estoy escuchando actualmente en Spotify. 
          Utiliza OAuth 2.0 para la autenticación segura y se actualiza automáticamente cada 30 segundos. 
          La implementación está optimizada para funcionar tanto en desarrollo local como en GitHub Pages,
          con manejo robusto de errores y estados de conexión.
        </p>
      </motion.section>

      {/* Características */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCog className="text-emerald-400" />
          Características Principales
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[            {
              icon: <FaPlay className="text-green-400" />,
              title: "Tiempo Real",
              description: "Actualización automática cada 30 segundos con progreso de reproducción en vivo"
            },
            {
              icon: <FaShieldAlt className="text-blue-400" />,
              title: "Autenticación Segura",
              description: "OAuth 2.0 con refresh tokens para acceso continuo sin re-autorización"
            },
            {
              icon: <FaDatabase className="text-purple-400" />,
              title: "Datos Completos",
              description: "Información completa: canción, artista, álbum, imagen, progreso y enlaces"
            },
            {
              icon: <SiTypescript className="text-blue-500" />,
              title: "TypeScript",
              description: "Completamente tipado con interfaces para Spotify API y respuestas"
            },
            {
              icon: <SiNextdotjs className="text-white" />,
              title: "Next.js 15",
              description: "Implementado como API Route con App Router y manejo de errores robusto"
            },
            {
              icon: <FaCode className="text-emerald-400" />,
              title: "Multi-entorno",
              description: "Compatible con desarrollo local, Vercel y GitHub Pages automáticamente"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-800/30 rounded-lg p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-neutral-700/50 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Endpoint y Respuesta */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCode className="text-emerald-400" />
          Endpoint y Respuesta
        </h3>
        
        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">GET</span>
              <span className="text-gray-300 font-mono">/api/spotify</span>
            </div>
            <button
              onClick={() => copyToClipboard(codeBlocks.endpoint, 'endpoint')}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === 'endpoint' ? <FaCheck className="text-white" /> : <FaCopy />}
              {copiedCode === 'endpoint' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{codeBlocks.endpoint}</code>
          </pre>
        </div>
      </motion.section>

      {/* Configuración */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaKey className="text-emerald-400" />
          Configuración y Setup
        </h3>
        
        <div className="space-y-6">          {/* Paso 1: Spotify App */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-sm">1</span>
              Crear Aplicación en Spotify
            </h4>
            <div className="space-y-3 text-gray-300">
              <p>1. Ve a <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 inline-flex items-center gap-1">Spotify Developer Dashboard <FaExternalLinkAlt className="text-xs" /></a></p>
              <p>2. Crea una nueva aplicación con nombre descriptivo</p>
              <p>3. Obtén tu <code className="bg-neutral-700 px-2 py-1 rounded text-green-400">Client ID</code> y <code className="bg-neutral-700 px-2 py-1 rounded text-green-400">Client Secret</code></p>
              <p>4. En Settings, añade Redirect URI: <code className="bg-neutral-700 px-2 py-1 rounded text-purple-400">http://localhost:3000/callback</code></p>
              <p>5. Guarda los scopes necesarios: <code className="bg-neutral-700 px-2 py-1 rounded text-blue-400">user-read-currently-playing</code></p>
            </div>
          </div>

          {/* Paso 2: Variables de entorno */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-sm">2</span>
              Configurar Variables de Entorno
            </h4>
            <div className="bg-neutral-900/80 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">.env.local</span>
                <button
                  onClick={() => copyToClipboard(codeBlocks.envSetup, 'env')}
                  className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
                >
                  {copiedCode === 'env' ? <FaCheck className="text-green-400" /> : <FaCopy />}
                  {copiedCode === 'env' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{codeBlocks.envSetup}</code>
              </pre>
            </div>
          </div>          {/* Paso 3: Obtener Refresh Token */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-sm">3</span>
              Obtener Refresh Token
            </h4>
            <div className="space-y-3 text-gray-300">
              <p>Para obtener el refresh token necesitas completar el flujo OAuth una vez:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Crear URL de autorización: <code className="bg-neutral-700 px-2 py-1 rounded text-purple-400">https://accounts.spotify.com/authorize</code></li>
                <li>Incluir parámetros: client_id, response_type=code, redirect_uri, scope=user-read-currently-playing</li>
                <li>Autorizar y obtener el código de autorización desde la URL de callback</li>
                <li>Intercambiar el código por access_token y refresh_token usando POST a /api/token</li>
                <li>Guardar solo el <code className="bg-neutral-700 px-2 py-1 rounded text-green-400">refresh_token</code> en variables de entorno</li>
              </ol>
              <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  💡 <strong>Tip:</strong> El refresh_token no expira, solo necesitas obtenerlo una vez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>      {/* Implementación */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCode className="text-emerald-400" />
          Ejemplo de Implementación
        </h3>
        
        <div className="space-y-6">
          {/* Componente React */}
          <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">SpotifyNowPlaying.tsx - Componente React</span>
              <button
                onClick={() => copyToClipboard(codeBlocks.implementation, 'implementation')}
                className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
              >
                {copiedCode === 'implementation' ? <FaCheck className="text-green-400" /> : <FaCopy />}
                {copiedCode === 'implementation' ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
              <code>{codeBlocks.implementation}</code>
            </pre>
          </div>

          {/* Uso del componente */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-3">📍 Ubicación en el Proyecto</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• <strong>Componente:</strong> <code className="bg-neutral-700 px-2 py-1 rounded text-emerald-400">/src/components/SpotifyNowPlaying.tsx</code></p>
              <p>• <strong>API Route:</strong> <code className="bg-neutral-700 px-2 py-1 rounded text-blue-400">/src/app/api/spotify/route.ts</code></p>
              <p>• <strong>Usado en:</strong> <code className="bg-neutral-700 px-2 py-1 rounded text-purple-400">/src/ui/sobremi/ProfileSection.tsx</code></p>
              <p>• <strong>Página:</strong> Sección &quot;Sobre mí&quot; del portafolio (<code className="text-green-400">/sobremi</code>)</p>
            </div>
          </div>

          {/* Dependencias */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-3">📦 Dependencias Utilizadas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-400 font-medium">Principales:</p>
                <ul className="space-y-1 text-gray-300">
                  <li>• <code className="text-blue-400">next</code> ^15.2.4 - Framework</li>
                  <li>• <code className="text-blue-400">react</code> ^19.0.0 - UI Library</li>
                  <li>• <code className="text-purple-400">framer-motion</code> ^12.5.0 - Animaciones</li>
                  <li>• <code className="text-green-400">react-icons</code> ^5.5.0 - Iconos</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 font-medium">Features:</p>
                <ul className="space-y-1 text-gray-300">
                  <li>• TypeScript para tipado</li>
                  <li>• TailwindCSS para estilos</li>
                  <li>• Next.js Image para optimización</li>
                  <li>• Animaciones con Framer Motion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>      {/* API Route Implementation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaShieldAlt className="text-emerald-400" />
          API Route Implementation
        </h3>
        
        <div className="space-y-6">
          {/* Código del API Route */}
          <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">/app/api/spotify/route.ts - Implementación completa</span>
              <button
                onClick={() => copyToClipboard(codeBlocks.authentication, 'auth')}
                className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
              >
                {copiedCode === 'auth' ? <FaCheck className="text-green-400" /> : <FaCopy />}
                {copiedCode === 'auth' ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
              <code>{codeBlocks.authentication}</code>
            </pre>
          </div>

          {/* Características del API */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-4">🔧 Características del API Route</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="text-emerald-400 font-medium">Manejo de Errores</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Validación de variables de entorno</li>
                  <li>• Manejo de tokens expirados</li>
                  <li>• Respuestas consistentes en errores</li>
                  <li>• Logging detallado para debugging</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="text-blue-400 font-medium">Optimizaciones</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Headers de CORS configurados</li>
                  <li>• Cache-Control sin caché</li>
                  <li>• Respuestas TypeScript tipadas</li>
                  <li>• Formateo automático de artistas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Estados de respuesta */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-4">📊 Estados de Respuesta</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-green-400 font-medium">Reproduciendo:</span>
                <span className="text-gray-300 text-sm">Datos completos de la canción actual</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                <span className="text-gray-400 font-medium">Sin reproducir:</span>
                <span className="text-gray-300 text-sm">isPlaying: false con timestamp</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-red-400 font-medium">Error:</span>
                <span className="text-gray-300 text-sm">Mensaje de error con detalles para debugging</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>      {/* Demo en vivo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-8 border border-green-500/20"
      >
        <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <FaPlay className="text-green-400" />
          Demo en Vivo
        </h3>
        <p className="text-gray-300 mb-6">
          Esta API está funcionando en tiempo real en mi portafolio. Puedes verla en acción en la sección 
          &quot;Sobre mí&quot; donde se muestra la música que estoy escuchando actualmente en Spotify.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-emerald-400">✨ Características en Vivo</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 🎵 Actualización automática cada 30 segundos</li>
              <li>• 🎨 Animaciones fluidas con Framer Motion</li>
              <li>• 📱 Diseño responsive y optimizado</li>
              <li>• 🔄 Barra de progreso en tiempo real</li>
              <li>• 🖼️ Imagen del álbum optimizada con Next.js</li>
              <li>• 🔗 Enlaces directos a Spotify</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-blue-400">🚀 Optimizaciones</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 🌐 Compatible con GitHub Pages</li>
              <li>• ⚡ Sin caché para datos en tiempo real</li>
              <li>• 🛡️ Manejo robusto de errores</li>
              <li>• 📱 Estados de carga y error</li>
              <li>• 🎯 TypeScript para mejor desarrollo</li>
              <li>• 🎪 Estados expandibles interactivos</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <a
            href="/sobremi"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            <FaSpotify />
            Ver Demo en Vivo
          </a>
          <a
            href="/api/spotify"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium border border-neutral-600"
          >
            <FaExternalLinkAlt />
            Probar API
          </a>
          <a
            href="https://github.com/MiguelVivar/Portafolio/blob/main/src/app/api/spotify/route.ts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium border border-neutral-600"
          >
            <FaCode />
            Ver Código Fuente
          </a>
        </div>
      </motion.section>      {/* Información Técnica Adicional */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCog className="text-emerald-400" />
          Consideraciones Técnicas
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Despliegue */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Despliegue y Hosting
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Vercel:</strong> Soporte nativo para API Routes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>GitHub Pages:</strong> Detección automática de entorno</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Variables de entorno:</strong> Configuración segura</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Edge Runtime:</strong> Respuestas rápidas globalmente</span>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              Seguridad y Privacidad
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Tokens:</strong> Solo refresh token almacenado</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Alcance:</strong> Solo lectura de reproducción actual</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Datos:</strong> Sin persistencia en base de datos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>CORS:</strong> Headers configurados correctamente</span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              Rendimiento
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Cache:</strong> Sin caché para datos en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Imágenes:</strong> Optimización automática con Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Requests:</strong> Polling inteligente cada 30s</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Errores:</strong> Reintento automático en fallos</span>
              </div>
            </div>
          </div>

          {/* Limitaciones */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              Limitaciones Conocidas
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚠</span>
                <span><strong>API Limits:</strong> Respeta límites de Spotify API</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚠</span>
                <span><strong>Privacidad:</strong> Solo funciona si mi perfil es público</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚠</span>
                <span><strong>Delay:</strong> Máximo 30s de retraso en actualizaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚠</span>
                <span><strong>Tokens:</strong> Requiere renovación manual si expiran</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SpotifyDocumentation;
