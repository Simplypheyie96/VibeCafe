import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { InteractionIcon as InteractionIconType } from '../types';

interface InteractionIconProps {
  interaction: InteractionIconType;
  isActive: boolean;
  onToggle: () => void;
}

export function InteractionIcon({
  interaction,
  isActive,
  onToggle
}: InteractionIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap = {
    rain: 'CloudRain',
    fire: 'Flame',
    wind: 'Wind',
    chatter: 'Coffee',
    vinyl: 'Disc3',
    lamp: 'Lightbulb',
    neon: 'Zap'
  };

  const IconComponent = (LucideIcons as any)[iconMap[interaction.type]] || LucideIcons.Sparkles;

  return (
    <div
      className="absolute pointer-events-auto group cursor-pointer"
      style={{
        left: `${interaction.x}%`,
        top: `${interaction.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon container with glow - matching Figma design */}
      <div
        className={`glass glass-chip relative w-12 h-12 rounded-2xl transition-all duration-500 flex items-center justify-center ${
          isActive ? 'ring-2 ring-white/60 shadow-2xl shadow-white/40' : ''
        }`}
        style={{
          transform: isHovered ? 'scale(1.15)' : 'scale(1)'
        }}
      >
        <IconComponent
          className={`w-6 h-6 transition-all duration-300 ${
            isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/70'
          }`}
        />
        
        {/* Pulsing glow when active */}
        {isActive && (
          <div className="absolute inset-0 rounded-2xl bg-white/30 animate-ping" />
        )}
      </div>

      {/* Label tooltip */}
      {isHovered && (
        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap tooltip-surface px-4 py-2 animate-fade-in z-50">
          {interaction.label}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--tooltip-bg)] rotate-45 border-l border-t border-white/16" />
        </div>
      )}

      {/* Ambient glow */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-2xl blur-2xl -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%)'
          }}
        />
      )}
    </div>
  );
}
