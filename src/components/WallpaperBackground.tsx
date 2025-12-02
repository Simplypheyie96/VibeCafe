import { useState, useEffect, useRef } from 'react';
import { Scene } from '../types';

interface WallpaperBackgroundProps {
  scene: Scene;
  activeEffects: Set<string>;
  customMood: {
    brightness: number;
    saturation: number;
    motionIntensity: number;
  };
}

export function WallpaperBackground({
  scene,
  activeEffects,
  customMood
}: WallpaperBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStrength = customMood.motionIntensity / 100 * 20;
  const translateX = mousePosition.x * parallaxStrength;
  const translateY = mousePosition.y * parallaxStrength;

  const brightnessValue = 0.4 + (customMood.brightness / 100) * 0.8;
  const saturationValue = 0.6 + (customMood.saturation / 100) * 0.8;

  const hasRain = activeEffects.has('rain-effect');
  const hasFire = activeEffects.has('fireplace-glow');
  const hasNeon = activeEffects.has('neon-glow');
  const hasLamp = activeEffects.has('lamp-toggle');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Main wallpaper with parallax */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(1.15)`,
          filter: `brightness(${brightnessValue}) saturate(${saturationValue})`,
          opacity: isLoaded ? 1 : 0
        }}
      >
        <img
          src={scene.wallpaper}
          alt={scene.title}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Rain effect */}
      {hasRain && (
        <div className="absolute inset-0 pointer-events-none">
          <RainEffect />
        </div>
      )}

      {/* Fire glow effect */}
      {hasFire && (
        <div
          className="absolute inset-0 pointer-events-none animate-pulse"
          style={{
            background: 'radial-gradient(circle at 20% 60%, rgba(255, 120, 40, 0.25) 0%, transparent 40%)',
            animationDuration: '3s'
          }}
        />
      )}

      {/* Neon glow effect */}
      {hasNeon && (
        <>
          <div
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              background: 'radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 40%)',
              animationDuration: '2s'
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              background: 'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 35%)',
              animationDuration: '2.5s',
              animationDelay: '0.5s'
            }}
          />
        </>
      )}

      {/* Lamp brightness overlay */}
      {hasLamp && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(circle at 25% 50%, rgba(255, 220, 150, 0.2) 0%, transparent 50%)'
          }}
        />
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      />
    </div>
  );
}

// Rain animation component
function RainEffect() {
  const dropCount = 80;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: dropCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-gradient-to-b from-transparent via-white/50 to-transparent animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-Math.random() * 20}%`,
            height: `${30 + Math.random() * 40}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.4 + Math.random() * 0.4}s`
          }}
        />
      ))}
      
      {/* Rain ripples effect */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`ripple-${i}`}
          className="absolute rounded-full border border-white/20 animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );
}
