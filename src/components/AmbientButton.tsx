import React from 'react';
import { CloudRain, Building2, Flame, Bird, Coffee, Snowflake, Zap, Leaf, Stars } from 'lucide-react';

interface AmbientButtonProps {
  type: 'rain' | 'city' | 'fire' | 'birds' | 'cafe' | 'snow' | 'fireflies' | 'leaves' | 'stars';
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const icons = {
  rain: CloudRain,
  city: Building2,
  fire: Flame,
  birds: Bird,
  cafe: Coffee,
  snow: Snowflake,
  fireflies: Zap,
  leaves: Leaf,
  stars: Stars,
};

const activeColors = {
  rain:      { bg: 'rgba(59, 130, 246, 0.3)',  border: 'rgba(59, 130, 246, 0.6)',  glow: '0px 0px 16px rgba(59,130,246,0.5)' },
  city:      { bg: 'rgba(139, 92, 246, 0.3)',  border: 'rgba(139, 92, 246, 0.6)',  glow: '0px 0px 16px rgba(139,92,246,0.5)' },
  fire:      { bg: 'rgba(239, 68, 68, 0.3)',   border: 'rgba(239, 68, 68, 0.6)',   glow: '0px 0px 16px rgba(239,68,68,0.5)' },
  birds:     { bg: 'rgba(34, 197, 94, 0.3)',   border: 'rgba(34, 197, 94, 0.6)',   glow: '0px 0px 16px rgba(34,197,94,0.5)' },
  cafe:      { bg: 'rgba(245, 158, 11, 0.3)',  border: 'rgba(245, 158, 11, 0.6)',  glow: '0px 0px 16px rgba(245,158,11,0.5)' },
  snow:      { bg: 'rgba(147, 197, 253, 0.3)', border: 'rgba(147, 197, 253, 0.6)', glow: '0px 0px 16px rgba(147,197,253,0.5)' },
  fireflies: { bg: 'rgba(250, 204, 21, 0.3)',  border: 'rgba(250, 204, 21, 0.6)',  glow: '0px 0px 16px rgba(250,204,21,0.5)' },
  leaves:    { bg: 'rgba(251, 146, 60, 0.3)',  border: 'rgba(251, 146, 60, 0.6)',  glow: '0px 0px 16px rgba(251,146,60,0.5)' },
  stars:     { bg: 'rgba(196, 181, 253, 0.3)', border: 'rgba(196, 181, 253, 0.6)', glow: '0px 0px 16px rgba(196,181,253,0.5)' },
};

/** Full label for assistive tech and the desktop hover tooltip. */
const labels = {
  rain: 'Rain sounds',
  city: 'City ambience',
  fire: 'Fire crackling',
  birds: 'Bird sounds',
  cafe: 'Cafe murmur',
  snow: 'Snowfall',
  fireflies: 'Fireflies',
  leaves: 'Falling leaves',
  stars: 'Starry night',
};

/**
 * Short label printed under the icon on mobile. The hover tooltip is the only
 * thing naming these controls on desktop, and touch devices never fire hover --
 * so on mobile the name is always visible instead of never.
 */
const shortLabels = {
  rain: 'Rain',
  city: 'City',
  fire: 'Fire',
  birds: 'Birds',
  cafe: 'Cafe',
  snow: 'Snow',
  fireflies: 'Fireflies',
  leaves: 'Leaves',
  stars: 'Stars',
};

export function AmbientButton({ type, isActive, onClick, style }: AmbientButtonProps) {
  const Icon = icons[type];
  const colors = activeColors[type];
  const label = labels[type];

  return (
    <div className="group relative flex flex-col items-center gap-1.5 z-40" style={style}>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-pressed={isActive}
        title={label}
        className={`ambient-button box-border flex size-[48px] items-center justify-center relative rounded-[16px] transition-all duration-300 cursor-pointer backdrop-blur-md active:scale-95 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${
          isActive ? 'scale-105 active-button' : 'hover:scale-105'
        }`}
        style={{
          background: isActive ? colors.bg : 'rgba(255, 255, 255, 0.15)',
          border: isActive ? `1.5px solid ${colors.border}` : '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: isActive ? colors.glow : '0px 4px 12px rgba(0, 0, 0, 0.2)',
          pointerEvents: 'auto',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <Icon
          className={`size-[22px] transition-all duration-300 text-white ${
            isActive
              ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]'
              : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
          }`}
          strokeWidth={isActive ? 2.5 : 2}
        />

        {isActive && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[16px] animate-pulse"
            style={{
              background: `radial-gradient(circle at center, ${colors.bg}, transparent 70%)`,
              opacity: 0.5,
            }}
          />
        )}
      </button>

      {/* Always-on label, mobile only. */}
      <span
        aria-hidden="true"
        className={`ambient-label text-[10px] leading-none tracking-[0.02em] transition-colors duration-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
          isActive ? 'text-white' : 'text-white/70'
        }`}
      >
        {shortLabels[type]}
      </span>

      {/* Hover tooltip, desktop only -- suppressed where hover isn't real. */}
      <span
        aria-hidden="true"
        className="ambient-tooltip pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[100]"
      >
        {label}
      </span>
    </div>
  );
}
