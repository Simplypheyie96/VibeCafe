import React from 'react';
import { Music2 } from 'lucide-react';

interface PlaylistButtonProps {
  name: string;
  service: 'spotify' | 'apple-music';
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function PlaylistButton({ name, service, isActive, onClick, style }: PlaylistButtonProps) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`group relative flex items-center justify-center transition-all duration-300 z-20 ${
        isActive ? 'scale-110' : 'hover:scale-105'
      }`}
      aria-label={`Open ${name} playlist`}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isActive
            ? service === 'spotify'
              ? 'bg-green-500/30 blur-xl'
              : 'bg-pink-500/30 blur-xl'
            : 'bg-white/5 blur-md group-hover:bg-white/10'
        }`}
      />

      {/* Main button */}
      <div
        className={`relative size-14 md:size-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive
            ? service === 'spotify'
              ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50'
              : 'bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/50'
            : 'bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/15 group-hover:border-white/30'
        }`}
      >
        <Music2
          className={`size-6 md:size-7 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
          }`}
          strokeWidth={2}
        />
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 size-4 bg-white rounded-full animate-pulse" />
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <span className="font-['Space_Grotesk',sans-serif] text-[11px] text-white">
            {name}
          </span>
        </div>
      </div>
    </button>
  );
}