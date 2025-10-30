import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ children, variant = 'racing' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const racingVariant = (
    <>
      {/* Dynamic Racing Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(255, 135, 0, 0.1) 45%, rgba(255, 135, 0, 0.1) 55%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(220, 20, 60, 0.1) 45%, rgba(220, 20, 60, 0.1) 55%, transparent 60%)
            `,
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      {/* Floating Racing Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`racing-${i}`}
          className="absolute w-2 h-16 bg-gradient-to-b from-orange-500/20 to-transparent rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
        />
      ))}

      {/* Carbon Fiber Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
            radial-gradient(circle at 6px 6px, rgba(255,135,0,0.1) 1px, transparent 0)
          `,
          backgroundSize: '12px 12px, 24px 24px'
        }}
      />

      {/* Interactive Spotlight */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 135, 0, 0.1), transparent 40%)`
        }}
      />
    </>
  );

  const nebulasVariant = (
    <>
      {/* Animated Nebula Clouds */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${300 + Math.random() * 200}px`,
            height: `${300 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              i % 3 === 0 ? 'rgba(255, 135, 0, 0.1)' :
              i % 3 === 1 ? 'rgba(220, 20, 60, 0.08)' :
              'rgba(0, 210, 190, 0.08)'
            }, transparent 70%)`
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Dynamic Gradient Mesh */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255, 135, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 135, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255, 135, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Base Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Animated Background Elements */}
      {variant === 'racing' ? racingVariant : nebulasVariant}
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;