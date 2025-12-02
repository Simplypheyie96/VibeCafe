import React, { useEffect, useRef } from 'react';

interface LeavesAnimationProps {
  isActive: boolean;
}

interface Leaf {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  swing: number;
  swingSpeed: number;
  color: string;
  opacity: number;
}

export function LeavesAnimation({ isActive }: LeavesAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const leaves: Leaf[] = [];
    const leafCount = 40;

    // Autumn color palette
    const colors = [
      'rgb(255, 140, 0)',   // Dark orange
      'rgb(255, 165, 0)',   // Orange
      'rgb(255, 69, 0)',    // Red-orange
      'rgb(220, 20, 60)',   // Crimson
      'rgb(178, 34, 34)',   // Firebrick
      'rgb(255, 215, 0)',   // Gold
      'rgb(184, 134, 11)',  // Dark goldenrod
    ];

    // Initialize leaves
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 6,
        speed: Math.random() * 1 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        swing: 0,
        swingSpeed: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.7
      });
    }

    let animationFrameId: number;

    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;

      // Draw leaf shape
      ctx.beginPath();
      ctx.moveTo(0, -leaf.size / 2);
      ctx.bezierCurveTo(
        leaf.size / 2, -leaf.size / 3,
        leaf.size / 2, leaf.size / 3,
        0, leaf.size / 2
      );
      ctx.bezierCurveTo(
        -leaf.size / 2, leaf.size / 3,
        -leaf.size / 2, -leaf.size / 3,
        0, -leaf.size / 2
      );
      ctx.fillStyle = leaf.color;
      ctx.fill();

      // Add a stem line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, leaf.size / 2);
      ctx.strokeStyle = 'rgba(101, 67, 33, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leaves.forEach(leaf => {
        drawLeaf(leaf);

        // Update position
        leaf.y += leaf.speed;
        leaf.swing += leaf.swingSpeed;
        leaf.x += Math.sin(leaf.swing) * 0.5;
        leaf.rotation += leaf.rotationSpeed;

        // Reset leaf when it goes off screen
        if (leaf.y > canvas.height + leaf.size) {
          leaf.y = -leaf.size;
          leaf.x = Math.random() * canvas.width;
        }
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
    />
  );
}
