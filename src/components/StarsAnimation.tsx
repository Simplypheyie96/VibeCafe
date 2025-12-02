import React, { useEffect, useRef } from 'react';

interface StarsAnimationProps {
  isActive: boolean;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  maxOpacity: number;
}

export function StarsAnimation({ isActive }: StarsAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Star[] = [];
    const starCount = 150;

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        maxOpacity: Math.random() * 0.5 + 0.5
      });
    }

    let animationFrameId: number;

    const drawStar = (star: Star) => {
      // Update twinkle
      star.twinklePhase += star.twinkleSpeed;
      star.opacity = ((Math.sin(star.twinklePhase) + 1) / 2) * star.maxOpacity;

      // Draw star with glow
      const gradient = ctx.createRadialGradient(
        star.x,
        star.y,
        0,
        star.x,
        star.y,
        star.radius * 3
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
      gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(200, 220, 255, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw bright center
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.opacity * 1.5, 1)})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      // Add cross sparkle for brighter stars
      if (star.opacity > 0.7 && star.radius > 1) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.6})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(star.x - star.radius * 2, star.y);
        ctx.lineTo(star.x + star.radius * 2, star.y);
        ctx.moveTo(star.x, star.y - star.radius * 2);
        ctx.lineTo(star.x, star.y + star.radius * 2);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        drawStar(star);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
