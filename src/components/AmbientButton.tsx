import React from 'react';
import { CloudRain, Building2, Flame, Bird, Coffee, Snowflake, Sparkles, Leaf, Stars } from 'lucide-react';

interface AmbientButtonProps {
  type: 'rain' | 'city' | 'fire' | 'birds' | 'cafe' | 'snow' | 'fireflies' | 'leaves' | 'stars';
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function AmbientButton({ type, isActive, onClick, style }: AmbientButtonProps) {
  const icons = {
    rain: CloudRain,
    city: Building2, // City skyline / urban ambience
    fire: Flame,
    birds: Bird,
    cafe: Coffee, // Cafe murmuring / chatter
    snow: Snowflake,
    fireflies: Sparkles,
    leaves: Leaf,
    stars: Stars
  };

  const activeColors = {
    rain: {
      bg: 'rgba(59, 130, 246, 0.3)',
      border: 'rgba(59, 130, 246, 0.6)',
      glow: '0px_0px_16px_rgba(59,130,246,0.5)'
    },
    city: {
      bg: 'rgba(139, 92, 246, 0.3)',
      border: 'rgba(139, 92, 246, 0.6)',
      glow: '0px_0px_16px_rgba(139,92,246,0.5)'
    },
    fire: {
      bg: 'rgba(239, 68, 68, 0.3)',
      border: 'rgba(239, 68, 68, 0.6)',
      glow: '0px_0px_16px_rgba(239,68,68,0.5)'
    },
    birds: {
      bg: 'rgba(34, 197, 94, 0.3)',
      border: 'rgba(34, 197, 94, 0.6)',
      glow: '0px_0px_16px_rgba(34,197,94,0.5)'
    },
    cafe: {
      bg: 'rgba(245, 158, 11, 0.3)',
      border: 'rgba(245, 158, 11, 0.6)',
      glow: '0px_0px_16px_rgba(245,158,11,0.5)'
    },
    snow: {
      bg: 'rgba(147, 197, 253, 0.3)',
      border: 'rgba(147, 197, 253, 0.6)',
      glow: '0px_0px_16px_rgba(147,197,253,0.5)'
    },
    fireflies: {
      bg: 'rgba(250, 204, 21, 0.3)',
      border: 'rgba(250, 204, 21, 0.6)',
      glow: '0px_0px_16px_rgba(250,204,21,0.5)'
    },
    leaves: {
      bg: 'rgba(251, 146, 60, 0.3)',
      border: 'rgba(251, 146, 60, 0.6)',
      glow: '0px_0px_16px_rgba(251,146,60,0.5)'
    },
    stars: {
      bg: 'rgba(196, 181, 253, 0.3)',
      border: 'rgba(196, 181, 253, 0.6)',
      glow: '0px_0px_16px_rgba(196,181,253,0.5)'
    }
  };

  const Icon = icons[type];
  const colors = activeColors[type];

  return (
    <div className="size-[44px] md:size-[48px] z-40" style={style}>
      <button
        onClick={onClick}
        className={`ambient-button box-border flex h-[44px] md:h-[48px] w-[44px] md:w-[48px] items-center justify-center p-[6px] md:p-[8px] relative rounded-[14px] md:rounded-[16px] transition-all duration-300 cursor-pointer backdrop-blur-md active:scale-95 touch-manipulation ${
          isActive ? 'scale-105 active-button' : 'hover:scale-105'
        }`}
        style={{
          background: isActive ? colors.bg : 'rgba(255, 255, 255, 0.15)',
          border: isActive ? `1.5px solid ${colors.border}` : '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: isActive ? colors.glow.replace(/_/g, ' ') : '0px 4px 12px rgba(0, 0, 0, 0.2)',
          pointerEvents: 'auto',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {/* Icon - responsive size */}
        <Icon 
          className={`size-[20px] md:size-[24px] transition-all duration-300 ${
            isActive ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
          }`}
          strokeWidth={isActive ? 2.5 : 2}
        />
        
        {/* Active indicator pulse */}
        {isActive && (
          <div 
            className="absolute inset-0 rounded-[16px] animate-pulse"
            style={{
              background: `radial-gradient(circle at center, ${colors.bg}, transparent 70%)`,
              opacity: 0.5
            }}
          />
        )}
      </button>
    </div>
  );
}
