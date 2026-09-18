import React, { useState, useEffect } from 'react';

interface LeoAvatarProps {
  avatarUrl?: string;
  sizeClass?: string;
  textClass?: string;
  className?: string;
}

export const LeoAvatar: React.FC<LeoAvatarProps> = ({
  avatarUrl = '/leo_photo.jpg',
  sizeClass = 'w-11 h-11',
  textClass = 'text-xl',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const src = avatarUrl || '/leo_photo.jpg';

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`${sizeClass} rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black ${textClass} shadow-lg shadow-amber-500/20 border-2 border-amber-300 flex-shrink-0 ${className}`}
      >
        <span>LEO</span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-2xl overflow-hidden shadow-lg border-2 border-amber-400 flex-shrink-0 bg-slate-900 ring-2 ring-amber-500/20 ${className}`}
    >
      <img
        src={src}
        className="w-full h-full object-cover"
        alt="LEO 顾问个人照"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
