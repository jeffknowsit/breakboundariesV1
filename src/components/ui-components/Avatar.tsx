import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ src, alt, className = "h-10 w-10" }: AvatarProps) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className={`${className} rounded-full bg-gray-800 flex items-center justify-center overflow-hidden`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className={`${className} object-cover`}
          onError={() => setHasError(true)}
        />
      ) : (
        <User className="text-gray-400" size={20} />
      )}
    </div>
  );
};

export default Avatar; 