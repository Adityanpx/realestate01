'use client';

import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  onLoadingComplete 
}) => {
  // Don't render anything if not loading
  if (!isLoading) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      style={{ 
        backgroundColor: '#ffffff'
      }}
    >
      {/* Logo Container */}
      <div className="flex flex-col items-center space-y-8">
        {/* Building Logo */}
        <div className="relative logo-bounce">
          <img 
            src="/logo.png" 
            alt="Which Floor Logo" 
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
            onError={(e) => {
              // Fallback: If logo doesn't exist, show a building icon
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.innerHTML = '🏢';
                fallback.style.fontSize = '5rem';
                fallback.style.textAlign = 'center';
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        {/* Title Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">
          WHICH FLOOR
        </h2>

        {/* Progress Bar Container */}
        <div className="w-64 md:w-80">
          {/* Background of progress bar (light gray) */}
          <div 
            className="w-full bg-gray-200 rounded-full overflow-hidden"
            style={{ height: '6px' }}
          >
            {/* Progress bar (bright blue with CSS animation) */}
            <div 
              className="h-full rounded-full progress-animate"
              style={{
                backgroundColor: '#3B82F6', // Bright blue
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)', // Subtle glow
                width: '0%'
              }}
            />
          </div>
          
          {/* Progress text */}
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500 font-medium">
              Loading...
            </span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes logoBounce {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-5px); 
          }
        }
        
        @keyframes progressFill {
          0% { 
            width: 0%; 
          }
          100% { 
            width: 100%; 
          }
        }
        
        .logo-bounce {
          animation: logoBounce 2s ease-in-out infinite;
        }
        
        .progress-animate {
          animation: progressFill 2.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;