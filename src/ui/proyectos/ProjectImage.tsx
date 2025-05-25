import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ProjectImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt, className = "" }) => {
  return (
    <div className="relative h-48 w-full overflow-hidden">
      <Image 
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${className}`}
        width={500}
        height={500}
        loading='lazy'
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" aria-hidden="true"></div>
    </div>
  );
};

export default ProjectImage;