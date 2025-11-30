'use client';

import { useEffect, useRef } from 'react';

export const AnimatedHero3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // 3D animated particles
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      color: string;
      char: string;
    }> = [];

    const chars = ['W', 'O', 'R', 'D', 'E', 'D', 'I', 'T', 'O', 'R', '{', '}', '<', '>', '#', '*'];
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 500,
        size: Math.random() * 20 + 10,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: Math.random() * 1 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        // Update position with 3D effect
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.z += particle.speedZ;

        // Reset if out of bounds
        if (particle.z > 500) {
          particle.z = 0;
          particle.x = Math.random() * canvas.offsetWidth;
          particle.y = Math.random() * canvas.offsetHeight;
        }
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.speedY *= -1;

        // 3D perspective calculation
        const scale = 500 / (500 + particle.z);
        const x = particle.x * scale + (canvas.offsetWidth / 2) * (1 - scale);
        const y = particle.y * scale + (canvas.offsetHeight / 2) * (1 - scale);
        const size = particle.size * scale;
        const opacity = 1 - particle.z / 500;

        // Draw character with glow effect
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = `bold ${size}px Arial`;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 20;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.char, x, y);
        ctx.restore();
      });

      // Draw connecting lines between close particles
      ctx.save();
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

// Floating 3D Bitmoji-style Avatar
export const FloatingAvatar = () => {
  return (
    <div className="relative w-64 h-64 mx-auto animate-float">
      {/* Main avatar circle - solid color */}
      <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse-slow shadow-2xl"></div>
      
      {/* Orbiting elements */}
      <div className="absolute inset-0 animate-spin-slow">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full shadow-lg animate-bounce-slow"></div>
      </div>
      
      <div className="absolute inset-0 animate-spin-reverse" style={{ animationDuration: '10s' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-pink-500 rounded-full shadow-lg"></div>
      </div>
      
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '15s' }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full shadow-lg"></div>
      </div>
      
      {/* Center character/icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-24 h-24 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      
      {/* Floating particles */}
      <div className="absolute -top-4 -left-4 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
      <div className="absolute -top-2 -right-6 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};
