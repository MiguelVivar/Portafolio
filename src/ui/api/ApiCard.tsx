import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaPlay, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaCog
} from 'react-icons/fa';

interface Api {
  id: number;
  title: string;
  description: string;
  endpoint: string;
  method: string;
  status: 'active' | 'development' | 'deprecated';
  category: string;
  technologies: Array<{
    name: string;
    icon: React.ReactNode;
  }>;
  features: string[];
  documentation?: string;
  github?: string;
  demo?: string;
  lastUpdated: string;
  responseTime?: string;
  usage?: string;
}

interface ApiCardProps {
  api: Api;
}

const ApiCard: React.FC<ApiCardProps> = ({ api }) => {
  const getStatusIcon = () => {
    switch (api.status) {
      case 'active':
        return <FaCheckCircle className="text-green-500" />;
      case 'development':
        return <FaCog className="text-yellow-500 animate-spin" />;
      case 'deprecated':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (api.status) {
      case 'active':
        return 'Activa';
      case 'development':
        return 'En Desarrollo';
      case 'deprecated':
        return 'Deprecated';
      default:
        return 'Estado Desconocido';
    }
  };

  const getStatusColor = () => {
    switch (api.status) {
      case 'active':
        return 'border-green-500';
      case 'development':
        return 'border-yellow-500';
      case 'deprecated':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  };

  const getMethodColor = () => {
    switch (api.method) {
      case 'GET':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'POST':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'PUT':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'DELETE':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`bg-neutral-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 border-t-2 ${getStatusColor()} h-full flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              {api.title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getMethodColor()}`}>
                {api.method}
              </span>
              <code className="text-xs text-gray-400 bg-neutral-700 px-2 py-1 rounded">
                {api.endpoint}
              </code>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {getStatusIcon()}
            <span className="text-gray-400">{getStatusText()}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {api.description}
        </p>

        {/* Tecnologías */}
        <div className="mb-4">
          <h4 className="text-emerald-300 font-medium text-sm mb-2">Tecnologías</h4>
          <div className="flex flex-wrap gap-2">
            {api.technologies.slice(0, 3).map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-neutral-700 px-2 py-1 rounded text-xs text-gray-300"
              >
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
            {api.technologies.length > 3 && (
              <div className="flex items-center gap-1 bg-neutral-700 px-2 py-1 rounded text-xs text-gray-400">
                +{api.technologies.length - 3} más
              </div>
            )}
          </div>
        </div>

        {/* Características principales */}
        <div className="mb-4">
          <h4 className="text-emerald-300 font-medium text-sm mb-2">Características</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            {api.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Información adicional */}
        <div className="text-xs text-gray-500 space-y-1">
          {api.responseTime && (
            <div className="flex items-center justify-between">
              <span>Tiempo de respuesta:</span>
              <span className="text-emerald-400 font-medium">{api.responseTime}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Última actualización:</span>
            <span className="text-gray-400">{api.lastUpdated}</span>
          </div>
          {api.usage && (
            <div className="flex items-center justify-between">
              <span>Uso:</span>
              <span className="text-gray-400">{api.usage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer con acciones */}
      <div className="p-4 bg-neutral-900/50 border-t border-neutral-700">
        <div className="flex items-center gap-2">
          {api.demo && (
            <a
              href={api.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded text-xs font-medium transition-colors duration-300 flex items-center justify-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <FaPlay className="w-3 h-3" />
              Probar
            </a>
          )}
          
          {api.github && (
            <a
              href={api.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-700 hover:bg-neutral-600 text-gray-300 hover:text-white px-3 py-2 rounded text-xs font-medium transition-colors duration-300 flex items-center justify-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="w-3 h-3" />
              Código
            </a>
          )}
          
          {api.documentation && (
            <a
              href={api.documentation}
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-medium transition-colors duration-300 flex items-center justify-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              Documentación
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ApiCard;
