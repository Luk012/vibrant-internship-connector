
import React, { useState, useEffect, useCallback } from 'react';

interface PufferFishProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

const PufferFish: React.FC<PufferFishProps> = ({ 
  size = 100, 
  className = '',
  interactive = true 
}) => {
  const [isInflated, setIsInflated] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Controlled inflation with a purpose - gradually puff up when user interaction happens
  const handleMouseEnter = useCallback(() => {
    if (interactive) {
      setIsHovering(true);
      
      // Only inflate if not already inflated
      if (!isInflated) {
        // Small delay before inflating for a more natural feel
        setTimeout(() => setIsInflated(true), 300);
      }
    }
  }, [interactive, isInflated]);
  
  const handleMouseLeave = useCallback(() => {
    if (interactive) {
      setIsHovering(false);
      
      // Only deflate after some delay to make the animation feel more natural
      setTimeout(() => setIsInflated(false), 1000);
    }
  }, [interactive]);
  
  const handleClick = useCallback(() => {
    if (interactive) {
      // Toggle inflation state on click
      setIsInflated(prev => !prev);
    }
  }, [interactive]);
  
  // Randomized occasional animations to bring life to the page
  useEffect(() => {
    if (!interactive) return;
    
    // Occasional random puffing when not being interacted with
    const interval = setInterval(() => {
      if (!isHovering) {
        setIsInflated(prev => {
          // Only randomly puff up if currently deflated
          // And only 30% of the time to make it feel random
          return prev ? false : Math.random() > 0.7;
        });
      }
    }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds
    
    return () => clearInterval(interval);
  }, [isHovering, interactive]);
  
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-500 ease-in-out ${
        isInflated ? 'scale-110' : 'scale-100'
      } ${className}`}
      style={{ width: size, height: size }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src="/lovable-uploads/3c40b2eb-fe7e-4b7b-9c53-3fd2a5b36836.png" 
        alt="Pufferfish Logo" 
        className={`w-full h-full transition-all duration-500 ${
          isInflated ? 'animate-wiggle' : isHovering ? 'animate-pulse-slow' : ''
        }`}
      />
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
        isInflated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="text-xs font-bold text-black bg-youllgetit/80 px-3 py-1.5 rounded-full shadow-lg transform -translate-y-4">
          You'll Get It!
        </div>
      </div>
      
      {/* Bubble animation when inflated */}
      {isInflated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1 right-3 w-3 h-3 bg-youllgetit rounded-full opacity-70 animate-float-slow" 
              style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-3 left-2 w-2 h-2 bg-youllgetit rounded-full opacity-60 animate-float" 
              style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-2 right-4 w-2 h-2 bg-youllgetit rounded-full opacity-80 animate-float-slow" 
              style={{ animationDelay: '0.8s' }}></div>
        </div>
      )}
    </div>
  );
};

export default PufferFish;
