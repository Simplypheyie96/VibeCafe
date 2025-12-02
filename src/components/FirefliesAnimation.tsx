import React, { useEffect, useRef } from 'react';

interface FirefliesAnimationProps {
  isActive: boolean;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

export function FirefliesAnimation({ isActive }: FirefliesAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireflies: Firefly[] = [];
    const fireflyCount = 30;

    // Initialize fireflies
    for (let i = 0; i < fireflyCount; i++) {
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.7) {
        color = '255, 220, 100'; // Warm yellow
      } else {
        color = '150, 255, 150'; // Soft green
      }

      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 2,
        opacity: Math.random(),
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        color
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach(firefly => {
        // Update pulse
        firefly.pulsePhase += firefly.pulseSpeed;
        firefly.opacity = (Math.sin(firefly.pulsePhase) + 1) / 2 * 0.8 + 0.2;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          firefly.x,
          firefly.y,
          0,
          firefly.x,
          firefly.y,
          firefly.radius * 4
        );
        gradient.addColorStop(0, `rgba(${firefly.color}, ${firefly.opacity})`);
        gradient.addColorStop(0.5, `rgba(${firefly.color}, ${firefly.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${firefly.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(${firefly.color}, ${Math.min(firefly.opacity * 1.5, 1)})`;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move firefly
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        // Random direction changes
        if (Math.random() < 0.02) {
          firefly.vx = (Math.random() - 0.5) * 0.5;
          firefly.vy = (Math.random() - 0.5) * 0.5;
        }

        // Wrap around screen
        if (firefly.x < 0) firefly.x = canvas.width;
        if (firefly.x > canvas.width) firefly.x = 0;
        if (firefly.y < 0) firefly.y = canvas.height;
        if (firefly.y > canvas.height) firefly.y = 0;
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
