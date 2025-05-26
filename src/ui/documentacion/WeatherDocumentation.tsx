'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCloud, 
  FaCopy, 
  FaCheck, 
  FaExternalLinkAlt, 
  FaCode,
  FaTerminal,
  FaThermometerHalf,
  FaWind,
  FaEye,
  FaKey,
  FaCog,
  FaExclamationTriangle
} from 'react-icons/fa';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { SiTypescript } from 'react-icons/si';
import Link from 'next/link';

const WeatherDocumentation: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeBlocks = {    usage: `// Implementación real completa utilizada en el proyecto
import { 
  getWeatherForIca, 
  getWeatherEmoji, 
  kelvinToCelsius,
  WeatherData
} from '@/lib/weatherApi';

// Obtener datos meteorológicos para Ica, Perú
async function fetchWeatherData() {
  const weatherData = await getWeatherForIca();

  if ('error' in weatherData) {
    // Manejo de errores específicos implementado
    console.error('Error de API:', weatherData.error);
    
    // Datos de respaldo utilizados en la terminal
    return {
      emoji: '☀️',
      description: 'Soleado',
      temp: 28,
      humidity: 45,
      windSpeed: 12,
      offline: true,
      errorMessage: weatherData.error
    };
  } else {
    // Procesamiento de datos reales de OpenWeatherMap
    const tempC = kelvinToCelsius(weatherData.main.temp);
    const feelsLikeC = kelvinToCelsius(weatherData.main.feels_like);
    const emoji = getWeatherEmoji(weatherData.weather[0].main);
    const windKmh = Math.round(weatherData.wind.speed * 3.6);
    
    console.log(\`\${emoji} \${weatherData.weather[0].description} - \${tempC}°C\`);
    console.log(\`Sensación térmica: \${feelsLikeC}°C\`);
    console.log(\`Humedad: \${weatherData.main.humidity}%\`);
    console.log(\`Viento: \${windKmh} km/h\`);
    console.log(\`Ciudad: \${weatherData.name}, \${weatherData.sys.country}\`);
    
    return {
      emoji,
      description: weatherData.weather[0].description,
      temp: tempC,
      feelsLike: feelsLikeC,
      humidity: weatherData.main.humidity,
      windSpeed: windKmh,
      city: weatherData.name,
      country: weatherData.sys.country,
      offline: false
    };
  }
}

// Uso en contexto real (como en TerminalContext.tsx)
fetchWeatherData().then(result => {
  if (result.offline) {
    console.log(\`⚠️ Modo offline: \${result.errorMessage}\`);
  }
  console.log(\`\${result.emoji} \${result.temp}°C\`);
});`,

    interface: `// Interface para los datos del clima
export interface WeatherData {
  main: {
    temp: number;        // Temperatura en Kelvin
    humidity: number;    // Humedad en porcentaje
    feels_like: number;  // Sensación térmica en Kelvin
  };
  weather: {
    main: string;        // Condición principal (Clear, Clouds, Rain, etc.)
    description: string; // Descripción detallada
    icon: string;        // Código del icono
  }[];
  wind: {
    speed: number;       // Velocidad del viento en m/s
  };
  name: string;          // Nombre de la ciudad
  sys: {
    country: string;     // Código del país
  };
}`,    functions: `// 3 funciones principales implementadas en weatherApi.ts

// 1. getWeatherForIca() - Función principal para datos climáticos
// Consulta específicamente Ica, Perú usando OpenWeatherMap API
const weather = await getWeatherForIca();
// Retorna: WeatherData | { error: string }

// 2. kelvinToCelsius(kelvin: number) - Conversor de temperatura
// Convierte automáticamente de Kelvin a Celsius con redondeo
const tempCelsius = kelvinToCelsius(305.15); // => 32°C

// 3. getWeatherEmoji(weatherCode: string) - Emojis visuales
// Mapea 15 condiciones climáticas a emojis específicos
const emoji = getWeatherEmoji('Clear'); // => ☀️
const emoji = getWeatherEmoji('Rain');  // => 🌧️
const emoji = getWeatherEmoji('Snow');  // => ❄️

// Ejemplo real de implementación completa:
import { getWeatherForIca, kelvinToCelsius, getWeatherEmoji } from '@/lib/weatherApi';

const weatherInfo = await getWeatherForIca();
if ('error' in weatherInfo) {
  console.error('Error API:', weatherInfo.error);
  // Manejo de error con datos de respaldo
} else {
  const temp = kelvinToCelsius(weatherInfo.main.temp);
  const feelsLike = kelvinToCelsius(weatherInfo.main.feels_like);
  const condition = weatherInfo.weather[0].main;
  const description = weatherInfo.weather[0].description;
  const emoji = getWeatherEmoji(condition);
  const windKmh = Math.round(weatherInfo.wind.speed * 3.6);
  
  console.log(\`\${emoji} \${description} - \${temp}°C\`);
  console.log(\`Sensación térmica: \${feelsLike}°C\`);
  console.log(\`Humedad: \${weatherInfo.main.humidity}%\`);
  console.log(\`Viento: \${windKmh} km/h\`);
}`,

    terminalIntegration: `// Integración en la Terminal (TerminalContext.tsx)
else if (cmd === "weather") {
  setLoading(true);
  
  // Importar módulo de clima dinámicamente
  import("@/lib/weatherApi").then(async (weatherModule) => {
    try {
      const weatherData = await weatherModule.getWeatherForIca();
      
      if ("error" in weatherData) {
        // Mostrar datos offline con error
        setHistory(prev => [...prev, {
          command: fullCmd,
          output: (
            <div className="space-y-2">
              <p className="text-emerald-300">🌤️ Clima en Ica, Perú:</p>
              <div className="bg-neutral-800 p-3 rounded">
                <p className="text-yellow-300">☀️ Soleado - 28°C</p>
                <p className="text-gray-300 text-sm">
                  Humedad: 45% | Viento: 12 km/h
                </p>
                <div className="mt-3 p-2 bg-red-900/30 border border-red-700 rounded">
                  <p className="text-red-400 text-xs font-semibold">
                    ⚠️ API Status: {weatherData.error}
                  </p>
                </div>
              </div>
            </div>
          )
        }]);
      } else {
        // Mostrar datos en tiempo real
        const tempC = weatherModule.kelvinToCelsius(weatherData.main.temp);
        const emoji = weatherModule.getWeatherEmoji(weatherData.weather[0].main);
        
        setHistory(prev => [...prev, {
          command: fullCmd,
          output: (
            <div className="space-y-2">
              <p className="text-emerald-300">🌤️ Clima en tiempo real - Ica, Perú:</p>
              <div className="bg-neutral-800 p-3 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <p className="text-yellow-300 font-semibold">
                    {weatherData.weather[0].description} - {tempC}°C
                  </p>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Sensación térmica: {weatherModule.kelvinToCelsius(weatherData.main.feels_like)}°C
                </p>
                <p className="text-gray-300 text-sm">
                  Humedad: {weatherData.main.humidity}% | 
                  Viento: {Math.round(weatherData.wind.speed * 3.6)} km/h
                </p>
              </div>
            </div>
          )
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  });
}`,    envSetup: `# Variables de entorno necesarias (.env.local)
NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_aqui`,

    weatherEmojis: `// 15 emojis implementados para condiciones climáticas
// Mapeo exacto usado en getWeatherEmoji()

const weatherEmojiMap = {
  'Clear': '☀️',        // Cielo despejado
  'Clouds': '☁️',       // Nuboso
  'Rain': '🌧️',        // Lluvia
  'Drizzle': '🌦️',     // Llovizna
  'Thunderstorm': '⛈️', // Tormenta eléctrica
  'Snow': '❄️',         // Nieve
  'Mist': '🌫️',        // Niebla ligera
  'Smoke': '🌫️',       // Humo
  'Haze': '🌫️',        // Neblina
  'Dust': '🌫️',        // Polvo
  'Fog': '🌫️',         // Niebla densa
  'Sand': '🌫️',        // Arena
  'Ash': '🌫️',         // Ceniza volcánica
  'Squall': '🌬️',      // Ráfaga de viento
  'Tornado': '🌪️'      // Tornado
  // Default: '🌡️' para condiciones no mapeadas
};

// Función real implementada:
export function getWeatherEmoji(weatherCode: string): string {
  return weatherEmojiMap[weatherCode] || '🌡️';
}`,

    apiEndpoints: `// Endpoint real utilizado en getWeatherForIca()
const API_BASE = 'https://api.openweathermap.org/data/2.5';
const CITY = 'Ica,pe';  // Ciudad fija: Ica, Perú
const LANG = 'es';      // Idioma: Español

// URL completa construida dinámicamente:
const apiUrl = \`\${API_BASE}/weather?q=\${CITY}&appid=\${apiKey}&lang=\${LANG}\`;

// Ejemplo real:
// https://api.openweathermap.org/data/2.5/weather?q=Ica,pe&appid=YOUR_KEY&lang=es

// Códigos de error manejados:
// 401: API key inválida
// 404: Ciudad no encontrada  
// 429: Límite de llamadas excedido
// 500: Error del servidor OpenWeatherMap`,

    errorHandling: `// Manejo completo de errores implementado en getWeatherForIca()

try {
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    // Error 401: API key inválida
    if (response.status === 401) {
      return { 
        error: 'API key inválida. Necesitas obtener una nueva clave en https://openweathermap.org/api'
      };
    }
    
    // Otros errores HTTP
    throw new Error(\`Error \${response.status}: \${response.statusText}\`);
  }
  
  const data: WeatherData = await response.json();
  return data;
  
} catch (error) {
  console.error('Error obteniendo datos del clima:', error);
  return { 
    error: 'No se pudo conectar con la API. Verifica tu conexión a internet.'
  };
}

// Verificación de API key
if (!apiKey) {
  return { 
    error: 'API key no configurada. Verifica tu archivo .env'
  };
}

// Datos de respaldo en terminal cuando hay error:
// ☀️ Soleado - 28°C
// Humedad: 45% | Viento: 12 km/h
// ⚠️ API Status: [error message]`
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
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
            <TiWeatherPartlySunny className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">OpenWeatherMap API</h2>
            <p className="text-gray-400">Datos meteorológicos en tiempo real para la terminal</p>
          </div>
        </div>
          <p className="text-gray-300 leading-relaxed">
          Esta integración utiliza la API real de OpenWeatherMap para obtener datos climáticos en tiempo real 
          específicamente de <span className="text-yellow-400 font-mono">Ica, Perú</span>. 
          Se implementa principalmente en la terminal interactiva del portafolio mediante el comando 
          <code className="bg-neutral-700 px-2 py-1 rounded text-yellow-400 mx-1">weather</code>, 
          proporcionando información meteorológica actualizada con datos de respaldo en caso de error de API.
          La implementación incluye 15 emojis específicos para diferentes condiciones climáticas y conversión automática de Kelvin a Celsius.
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
          Características
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaThermometerHalf className="text-red-400" />,
              title: "Temperatura Actual",
              description: "Temperatura en tiempo real con sensación térmica incluida"
            },
            {
              icon: <FaCloud className="text-blue-400" />,
              title: "Condiciones Climáticas",
              description: "Descripción detallada del clima actual con emojis visuales"
            },
            {
              icon: <FaWind className="text-cyan-400" />,
              title: "Datos de Viento",
              description: "Velocidad del viento convertida automáticamente a km/h"
            },
            {
              icon: <FaEye className="text-purple-400" />,
              title: "Humedad",
              description: "Porcentaje de humedad relativa del ambiente"
            },
            {
              icon: <FaTerminal className="text-green-400" />,
              title: "Integración Terminal",
              description: "Comando 'weather' disponible en la terminal interactiva"
            },
            {
              icon: <SiTypescript className="text-blue-500" />,
              title: "TypeScript",
              description: "Interfaces tipadas para todos los datos meteorológicos"
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

      {/* Interface TypeScript */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <SiTypescript className="text-blue-500" />
          Interface de Datos
        </h3>
        
        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">WeatherData interface</span>
            <button
              onClick={() => copyToClipboard(codeBlocks.interface, 'interface')}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === 'interface' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              {copiedCode === 'interface' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{codeBlocks.interface}</code>
          </pre>
        </div>
      </motion.section>

      {/* Funciones Disponibles */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCode className="text-emerald-400" />
          Funciones Disponibles
        </h3>
        
        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">weatherApi.ts</span>
            <button
              onClick={() => copyToClipboard(codeBlocks.functions, 'functions')}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === 'functions' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              {copiedCode === 'functions' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
            <code>{codeBlocks.functions}</code>
          </pre>
        </div>
      </motion.section>

      {/* Configuración */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaKey className="text-emerald-400" />
          Configuración
        </h3>
        
        <div className="space-y-6">
          {/* Paso 1: Obtener API Key */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-sm">1</span>
              Obtener API Key de OpenWeatherMap
            </h4>
            <div className="space-y-3 text-gray-300">
              <p>1. Ve a <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 inline-flex items-center gap-1">OpenWeatherMap API <FaExternalLinkAlt className="text-xs" /></a></p>
              <p>2. Crea una cuenta gratuita</p>
              <p>3. Obtén tu API key desde el dashboard</p>
              <p>4. El plan gratuito incluye 1,000 llamadas por día</p>
            </div>
          </div>

          {/* Paso 2: Configurar variables de entorno */}
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-sm">2</span>
              Configurar Variable de Entorno
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
            <p className="text-gray-400 text-sm mt-3">
              ⚠️ Nota: Usa <code className="bg-neutral-700 px-2 py-1 rounded text-yellow-400">NEXT_PUBLIC_</code> 
              porque la función se ejecuta en el cliente (terminal interactiva).
            </p>
          </div>
        </div>
      </motion.section>

      {/* Ejemplo de Uso */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCode className="text-emerald-400" />
          Ejemplo de Uso
        </h3>
        
        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Uso básico de la API</span>
            <button
              onClick={() => copyToClipboard(codeBlocks.usage, 'usage')}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === 'usage' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              {copiedCode === 'usage' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{codeBlocks.usage}</code>
          </pre>
        </div>
      </motion.section>      {/* Integración en Terminal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaTerminal className="text-emerald-400" />
          Integración en Terminal
        </h3>
        
        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">TerminalContext.tsx - Comando weather</span>
            <button
              onClick={() => copyToClipboard(codeBlocks.terminalIntegration, 'terminal')}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === 'terminal' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              {copiedCode === 'terminal' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
            <code>{codeBlocks.terminalIntegration}</code>
          </pre>
        </div>
      </motion.section>

      {/* Emojis del Clima */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.65 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <TiWeatherPartlySunny className="text-yellow-400" />
          Sistema de Emojis Climáticos
        </h3>
        
        <div className="space-y-6">
          <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">15 condiciones climáticas mapeadas</span>
              <button
                onClick={() => copyToClipboard(codeBlocks.weatherEmojis, 'emojis')}
                className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
              >
                {copiedCode === 'emojis' ? <FaCheck className="text-green-400" /> : <FaCopy />}
                {copiedCode === 'emojis' ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto max-h-80">
              <code>{codeBlocks.weatherEmojis}</code>
            </pre>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { emoji: '☀️', condition: 'Clear', desc: 'Despejado' },
              { emoji: '☁️', condition: 'Clouds', desc: 'Nuboso' },
              { emoji: '🌧️', condition: 'Rain', desc: 'Lluvia' },
              { emoji: '🌦️', condition: 'Drizzle', desc: 'Llovizna' },
              { emoji: '⛈️', condition: 'Thunderstorm', desc: 'Tormenta' },
              { emoji: '❄️', condition: 'Snow', desc: 'Nieve' },
              { emoji: '🌫️', condition: 'Mist', desc: 'Niebla' },
              { emoji: '🌫️', condition: 'Fog', desc: 'Niebla densa' },
              { emoji: '🌬️', condition: 'Squall', desc: 'Ráfaga' },
              { emoji: '🌪️', condition: 'Tornado', desc: 'Tornado' },
              { emoji: '🌡️', condition: 'Default', desc: 'Otro' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-neutral-800/30 rounded-lg p-4 border border-neutral-700/50 text-center hover:border-yellow-500/30 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="text-xs text-yellow-400 font-mono mb-1">{item.condition}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* API Endpoints */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCloud className="text-blue-400" />
          Endpoints de la API
        </h3>
        
        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">URLs y configuración real utilizada</span>
            <button
              onClick={() => copyToClipboard(codeBlocks.apiEndpoints, 'endpoints')}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === 'endpoints' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              {copiedCode === 'endpoints' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{codeBlocks.apiEndpoints}</code>
          </pre>
        </div>
      </motion.section>

      {/* Manejo de Errores */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaExclamationTriangle className="text-red-400" />
          Manejo de Errores y Datos de Respaldo
        </h3>
        
        <div className="bg-neutral-900/80 rounded-xl p-6 border border-neutral-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Implementación completa de error handling</span>
            <button
              onClick={() => copyToClipboard(codeBlocks.errorHandling, 'errors')}
              className="flex items-center gap-2 px-3 py-1 bg-emerald-400 hover:bg-emerald-700 rounded transition-colors text-sm text-white cursor-pointer"
            >
              {copiedCode === 'errors' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              {copiedCode === 'errors' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto max-h-96">
            <code>{codeBlocks.errorHandling}</code>
          </pre>
        </div>
      </motion.section>      {/* Límites de la API */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FaCloud className="text-orange-400" />
          Información de la API
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-800/30 rounded-lg p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FaKey className="text-yellow-400" />
              Plan Gratuito OpenWeatherMap
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• 1,000 llamadas por día</li>
              <li>• Datos actuales del clima</li>
              <li>• Actualización cada 10 minutos</li>
              <li>• No requiere tarjeta de crédito</li>
              <li>• Soporte para 200,000+ ciudades</li>
            </ul>
          </div>
          
          <div className="bg-neutral-800/30 rounded-lg p-6 border border-neutral-700/50">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FaThermometerHalf className="text-red-400" />
              Datos Específicos de Ica
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Temperatura actual y sensación térmica</li>
              <li>• Descripción en español (lang=es)</li>
              <li>• Humedad relativa del desierto</li>
              <li>• Velocidad del viento (convertida a km/h)</li>
              <li>• Coordenadas: Ica, Perú (pe)</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <FaEye className="text-cyan-400" />
            Implementación Específica del Proyecto
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="font-medium text-cyan-400 mb-2">Configuración Fija:</p>
              <ul className="space-y-1">
                <li>• Ciudad: <code className="bg-neutral-700 px-1 rounded text-yellow-400">Ica,pe</code></li>
                <li>• Idioma: <code className="bg-neutral-700 px-1 rounded text-yellow-400">es</code> (Español)</li>
                <li>• Unidades: Kelvin → Celsius automático</li>
                <li>• Viento: m/s → km/h automático</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-cyan-400 mb-2">Integración Terminal:</p>
              <ul className="space-y-1">
                <li>• Comando: <code className="bg-neutral-700 px-1 rounded text-yellow-400">weather</code></li>
                <li>• Carga asíncrona con loading state</li>
                <li>• Fallback automático en caso de error</li>
                <li>• Display visual con emojis</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Demo en vivo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/20"
      >        <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <FaTerminal className="text-yellow-400" />
          Demo en Vivo - Terminal Interactiva
        </h3>
        
        <p className="text-gray-300 mb-6">
          La implementación real está integrada en la terminal interactiva del portafolio. 
          El comando <code className="bg-neutral-700 px-2 py-1 rounded text-yellow-400">weather</code> 
          consulta los datos climáticos actuales de Ica, Perú usando OpenWeatherMap API con manejo automático de errores.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Ejemplo con datos reales */}
          <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-700">
            <p className="text-sm text-emerald-400 mb-3 font-semibold">✅ Cuando la API funciona correctamente:</p>
            <div className="font-mono text-sm space-y-1">
              <div><span className="text-emerald-400">miguel@vivar:~$</span> <span className="text-white">weather</span></div>
              <div className="text-emerald-300">🌤️ Obteniendo datos del clima para Ica, Perú...</div>
              <div className="text-gray-400">Conectando con OpenWeatherMap API...</div>
              <div className="text-emerald-300">🌤️ Clima en tiempo real - Ica, Perú:</div>
              <div className="bg-neutral-800 p-2 rounded mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">☀️</span>
                  <span className="text-yellow-300 font-semibold">cielo claro - 28°C</span>
                </div>
                <div className="text-gray-300 text-xs">Sensación térmica: 31°C</div>
                <div className="text-gray-300 text-xs">Humedad: 45% | Viento: 12 km/h</div>
              </div>
            </div>
          </div>

          {/* Ejemplo con datos de respaldo */}
          <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-700">
            <p className="text-sm text-red-400 mb-3 font-semibold">⚠️ Cuando hay problemas con la API:</p>
            <div className="font-mono text-sm space-y-1">
              <div><span className="text-emerald-400">miguel@vivar:~$</span> <span className="text-white">weather</span></div>
              <div className="text-emerald-300">🌤️ Clima en Ica, Perú:</div>
              <div className="bg-neutral-800 p-2 rounded mt-2 space-y-1">
                <div className="text-yellow-300">☀️ Soleado - 28°C</div>
                <div className="text-gray-300 text-xs">Humedad: 45% | Viento: 12 km/h</div>
                <div className="text-gray-300 text-xs">Perfecto para programar al aire libre 🌴</div>
                <div className="mt-2 p-2 bg-red-900/30 border border-red-700 rounded">
                  <div className="text-red-400 text-xs font-semibold">⚠️ API Status: API key no configurada</div>
                  <div className="text-gray-300 text-xs mt-1">
                    <div>💡 Para obtener datos en tiempo real:</div>
                    <div>1. Regístrate en: <span className="text-blue-400">https://openweathermap.org/api</span></div>
                    <div>2. Obtén tu API key gratuita</div>
                    <div>3. Actualiza NEXT_PUBLIC_OPENWEATHER_API_KEY en tu .env</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/20 mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <FaCode className="text-cyan-400" />
            Flujo de Datos en Tiempo Real
          </h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <span>1. Usuario ejecuta comando <code className="bg-neutral-700 px-1 rounded text-yellow-400">weather</code> en terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>2. Importación dinámica de <code className="bg-neutral-700 px-1 rounded text-yellow-400">@/lib/weatherApi</code></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>3. Llamada a <code className="bg-neutral-700 px-1 rounded text-yellow-400">getWeatherForIca()</code> con loading state</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>4. Fetch a OpenWeatherMap API con parámetros: <code className="bg-neutral-700 px-1 rounded text-yellow-400">q=Ica,pe&lang=es</code></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>5. Conversiones automáticas: Kelvin→Celsius, m/s→km/h, emoji mapping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>6. Render en terminal con formato visual y manejo de errores</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors font-medium"
          >
            <FaTerminal />
            Probar en Terminal
          </Link>
          <Link
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium border border-neutral-600"
          >
            <FaExternalLinkAlt />
            OpenWeatherMap API
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default WeatherDocumentation;
