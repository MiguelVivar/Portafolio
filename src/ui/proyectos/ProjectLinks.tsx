import Link from 'next/link';
import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectLinksProps {
  enlaces: Array<{
    tipo: string;
    url: string;
  }>;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ enlaces }) => {
  return (
    <nav className="flex space-x-3" aria-label="Enlaces del proyecto">
      {enlaces.map((enlace, index) => (
        <Link 
          key={index} 
          href={enlace.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/50 rounded px-2 py-1 ${enlace.tipo === 'github' ? 'text-gray-400 hover:text-white' : 'text-emerald-300 hover:text-emerald-400'}`}
          aria-label={enlace.tipo === 'github' ? 'Ver código fuente en GitHub' : 'Ver demostración en vivo'}
        >
          {enlace.tipo === 'github' ? (
            <>
              <FaGithub className="text-lg" aria-hidden="true" />
              <span>Código</span>
            </>
          ) : (
            <>
              <FaExternalLinkAlt className="text-lg" aria-hidden="true" />
              <span>Demo</span>
            </>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default ProjectLinks;