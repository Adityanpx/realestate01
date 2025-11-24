'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, Sparkles, Star, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    direction: number;
  }>>([]);

  const handleToggle = () => {
    if (isTransitioning || isAnimating) return;
    
    setIsAnimating(true);
    
    // Generate new particles for the animation
    const newParticles = Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30) * (Math.PI / 180); // 30 degrees apart in radians
      const distance = 20 + Math.random() * 15; // Distance from center
      const center = 50; // Center percentage
      
      return {
        id: i,
        x: center + Math.cos(angle) * distance + (Math.random() - 0.5) * 10,
        y: center + Math.sin(angle) * distance + (Math.random() - 0.5) * 10,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 0.3,
        direction: Math.random() > 0.5 ? 1 : -1,
      };
    });
    
    setParticles(newParticles);
    toggleTheme();
    
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  // Enhanced sparkle effects with more variation (deterministic)
  const enhancedSparkles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const patterns = [
        { x: 20, y: 30, delay: 0, size: 1.5 },
        { x: 80, y: 25, delay: 0.1, size: 2 },
        { x: 15, y: 70, delay: 0.2, size: 1.8 },
        { x: 75, y: 65, delay: 0.3, size: 2.2 },
        { x: 50, y: 15, delay: 0.15, size: 1.6 },
        { x: 25, y: 50, delay: 0.25, size: 1.9 },
        { x: 70, y: 80, delay: 0.35, size: 2.1 },
        { x: 45, y: 85, delay: 0.05, size: 1.7 },
      ];
      
      const pattern = patterns[i];
      return {
        id: i,
        x: pattern.x,
        y: pattern.y,
        delay: pattern.delay,
        size: pattern.size,
      };
    });
  }, []);

  // Wave effect particles (deterministic)
  const waveParticles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const angle = (i * 22.5) * (Math.PI / 180); // 22.5 degrees apart
      const distances = [65, 75, 70, 80, 68, 78, 72, 82, 69, 79, 71, 81, 67, 77, 73, 83];
      const sizes = [1.2, 1.8, 1.5, 2.0, 1.3, 1.9, 1.6, 2.1, 1.4, 1.7, 1.1, 2.2, 1.0, 1.6, 1.3, 1.8];
      
      return {
        id: i,
        angle,
        distance: distances[i] || 70,
        size: sizes[i] || 1.5,
        delay: i * 0.02,
      };
    });
  }, []);

  return (
    <motion.button
      onClick={handleToggle}
      disabled={isTransitioning || isAnimating}
      className="relative w-10 h-10 rounded-full overflow-hidden group disabled:opacity-50 cursor-pointer shadow-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
      }}
      whileTap={{ 
        scale: 0.9,
        rotate: -2,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        rotate: { duration: 0.2 }
      }}
    >
      {/* Enhanced background gradient with multiple layers */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        animate={{ 
          scale: isAnimating ? [1, 1.15, 1.05, 1] : 1,
          rotate: isAnimating ? [0, 180, 360] : 0,
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut" 
        }}
      >
        {/* Base gradient layer */}
        <div className={`absolute inset-0 rounded-full ${
          theme === 'light' 
            ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500' 
            : 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
        }`} />
        
        {/* Inner glow layer */}
        <motion.div 
          className={`absolute inset-1 rounded-full ${
            theme === 'light'
              ? 'bg-gradient-to-br from-yellow-300 to-orange-400'
              : 'bg-gradient-to-br from-slate-600 to-slate-800'
          }`}
          animate={{
            opacity: isAnimating ? [0.7, 1, 0.8, 0.9] : 0.8,
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        
        {/* Pulse effect layer */}
        <motion.div 
          className={`absolute inset-0 rounded-full ${
            theme === 'light'
              ? 'bg-gradient-to-r from-yellow-400/30 to-orange-500/30'
              : 'bg-gradient-to-r from-slate-700/30 to-slate-900/30'
          }`}
          animate={{
            scale: isAnimating ? [1, 1.2, 1.1] : 1,
            opacity: isAnimating ? [0.3, 0.6, 0.4] : 0.3,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.div>

      {/* Enhanced border effects */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        animate={{
          borderColor: theme === 'light' 
            ? ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)']
            : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)'],
          boxShadow: theme === 'light'
            ? ['0 0 0 rgba(250, 204, 21, 0)', '0 0 20px rgba(250, 204, 21, 0.5)', '0 0 0 rgba(250, 204, 21, 0)']
            : ['0 0 0 rgba(250, 204, 21, 0)', '0 0 15px rgba(250, 204, 21, 0.3)', '0 0 0 rgba(250, 204, 21, 0)'],
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Enhanced inner content with multiple icons */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                opacity: 0, 
                rotate: -120, 
                scale: 0.3,
                filter: "blur(4px)"
              }}
              animate={{ 
                opacity: 1, 
                rotate: 0, 
                scale: 1,
                filter: "blur(0px)"
              }}
              exit={{ 
                opacity: 0, 
                rotate: 120, 
                scale: 0.3,
                filter: "blur(4px)"
              }}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 200
              }}
            >
              <Sun className="w-6 h-6 text-white drop-shadow-lg" />
              {/* Sun rays */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-3 bg-white/60"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 -12px',
                      transform: `rotate(${i * 45}deg) translateY(-8px)`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.02 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ 
                opacity: 0, 
                rotate: -120, 
                scale: 0.3,
                filter: "blur(4px)"
              }}
              animate={{ 
                opacity: 1, 
                rotate: 0, 
                scale: 1,
                filter: "blur(0px)"
              }}
              exit={{ 
                opacity: 0, 
                rotate: 120, 
                scale: 0.3,
                filter: "blur(4px)"
              }}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 200
              }}
            >
              <Moon className="w-6 h-6 text-white drop-shadow-lg" />
              {/* Moon craters */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    top: `${30 + i * 15}%`,
                    left: `${40 + i * 10}%`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced sparkle effects */}
      <AnimatePresence>
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {enhancedSparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                className="absolute rounded-full"
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                  width: `${sparkle.size}px`,
                  height: `${sparkle.size}px`,
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0, 
                  rotate: 0,
                  filter: "blur(2px)"
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                  filter: ["blur(2px)", "blur(0px)", "blur(2px)"]
                }}
                transition={{
                  duration: 0.8,
                  delay: sparkle.delay,
                  ease: "easeOut"
                }}
              >
                <Star className="w-full h-full text-white" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Wave particle effects */}
      <AnimatePresence>
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {waveParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos(Math.PI - particle.angle) * particle.distance,
                  y: Math.sin(Math.PI - particle.angle) * particle.distance,
                }}
                transition={{
                  duration: 0.6,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Enhanced hover ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
        whileHover={{ 
          scale: 1.2,
          opacity: [0, 0.3, 0.1],
        }}
        transition={{ 
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Enhanced loading indicator */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5, repeat: Infinity }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magnetic hover effect indicators */}
      <motion.div
        className="absolute inset-0 rounded-full"
        whileHover={{
          boxShadow: theme === 'light' 
            ? '0 0 30px rgba(250, 204, 21, 0.4), inset 0 0 30px rgba(250, 204, 21, 0.1)'
            : '0 0 20px rgba(250, 204, 21, 0.3), inset 0 0 20px rgba(250, 204, 21, 0.05)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;