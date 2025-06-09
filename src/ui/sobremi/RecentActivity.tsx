'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGitAlt, FaBook, FaStar, FaCodeBranch, FaGithub } from 'react-icons/fa';
import { BiGitCommit } from 'react-icons/bi';

interface ActivityItem {
  type: 'commit' | 'repository' | 'star' | 'fork';
  message: string;
  date: string;
  repository?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ 
  activities, 
  isLoading = false 
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return <BiGitCommit className="text-lg" />;
      case 'repository':
        return <FaBook className="text-lg" />;
      case 'star':
        return <FaStar className="text-lg" />;
      case 'fork':
        return <FaCodeBranch className="text-lg" />;
      default:
        return <FaGitAlt className="text-lg" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'commit':
        return 'from-green-500 to-green-600';
      case 'repository':
        return 'from-blue-500 to-blue-600';
      case 'star':
        return 'from-yellow-500 to-yellow-600';
      case 'fork':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return date.toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300 h-full shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden flex flex-col"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-4 mb-6 relative"
      >
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20 relative group">
          <FaGitAlt className="text-2xl text-white relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Actividad Reciente
          </h3>
          <p className="text-sm text-gray-400 mt-1">Últimas contribuciones y actividades</p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="space-y-4 flex-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i} 
              className="flex gap-3 p-3 rounded-lg animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="w-8 h-8 bg-neutral-700/50 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-neutral-700/50 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-700/50 rounded w-1/2"></div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 5, scale: 1.02 }}
              className="flex items-start gap-3 p-4 rounded-xl hover:bg-neutral-700/30 transition-all duration-300 group cursor-pointer relative overflow-hidden backdrop-blur-sm"
            >
              {/* Icono de la actividad */}
              <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${getActivityColor(activity.type)} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}>
                {getActivityIcon(activity.type)}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>

              {/* Contenido de la actividad */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                  {activity.message}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  {activity.repository && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {activity.repository}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatDate(activity.date)}
                  </span>
                </div>
              </div>

              {/* Indicador de tiempo */}
              <div className="flex-shrink-0">
                <motion.div 
                  className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 pt-6 border-t border-neutral-700/50"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {activities.length} actividades recientes
          </span>
          <motion.a
            href="https://github.com/MiguelVivar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
          >
            Ver más en GitHub
            <FaGithub className="text-xs" />
          </motion.a>
        </div>
      </motion.div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(64, 64, 64, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </motion.div>
  );
};

export default RecentActivity;
