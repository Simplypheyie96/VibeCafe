import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import backgroundImg from 'figma:asset/718793307914dbf89f1f24aded5dc3a91340a13f.png';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress over 5 seconds
    const duration = 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Wait a bit before completing
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 800); // Wait for fade out animation
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#1a1614]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImg}
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1614]/50 via-[#1a1614]/70 to-[#1a1614]/85" />
      </div>

      {/* Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0
            }}
            animate={{
              y: -50,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Rotating Vinyl Record */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Vinyl Record SVG */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {/* Outer rim */}
            <circle cx="60" cy="60" r="58" fill="#0a0908" stroke="#1a1614" strokeWidth="2" />
            
            {/* Grooves */}
            {[...Array(8)].map((_, i) => {
              const radius = 48 - i * 5;
              return (
                <circle
                  key={i}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#2a2624"
                  strokeWidth="0.5"
                  opacity={0.6}
                />
              );
            })}
            
            {/* Label */}
            <circle cx="60" cy="60" r="20" fill="#d4a574" />
            <circle cx="60" cy="60" r="18" fill="#c19064" />
            
            {/* Label text effect */}
            <circle cx="60" cy="60" r="15" fill="none" stroke="#b8835a" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="12" fill="none" stroke="#b8835a" strokeWidth="0.5" />
            
            {/* Center hole */}
            <circle cx="60" cy="60" r="4" fill="#0a0908" />
            
            {/* Shine effect */}
            <path
              d="M 60 10 Q 70 30 60 50"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.1"
            />
          </motion.svg>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full" />
        </motion.div>

        {/* App Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-3xl tracking-wider text-amber-100/90 mb-1" style={{ fontWeight: 300 }}>
            VibeCafe
          </h1>
          <p className="text-sm text-amber-200/50 tracking-wide">
            preparing your space
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-64 flex flex-col items-center gap-3"
        >
          {/* Progress Bar */}
          <div className="w-full h-1 bg-amber-950/30 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-600/60 to-amber-400/60 rounded-full"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(217, 119, 6, 0.3)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Loading Dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-amber-400/60 rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs text-amber-200/40 tracking-widest uppercase"
        >
          Loading your vibe...
        </motion.p>
      </div>

      {/* Bottom Ambient Detail */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-amber-200/30 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="w-1 h-1 bg-amber-400/50 rounded-full" />
        <span className="tracking-wider">Lofi • Chill • Focus</span>
        <div className="w-1 h-1 bg-amber-400/50 rounded-full" />
      </motion.div>
    </motion.div>
  );
}
