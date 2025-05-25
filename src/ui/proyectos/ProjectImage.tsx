import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ProjectImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt }) => {
  return (
    <div className="relative h-48 w-full overflow-hidden">
      <Image 
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        width={500}
        height={500}
        loading='lazy'
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
    </div>
  );
};

export default ProjectImage;