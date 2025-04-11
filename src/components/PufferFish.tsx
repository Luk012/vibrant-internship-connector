// In your PufferFish.tsx file
import React, { useState, useEffect, useRef } from 'react';
// If your SVG is in src/assets:
import PufferfishSVG from '/Users/luk012/Desktop/puffer.svg';

interface PufferFishProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const PufferFish: React.FC<PufferFishProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fishContainerRef = useRef<HTMLDivElement>(null);
  const fishBodyRef = useRef<HTMLDivElement>(null);
  
  // Size mapping
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-200 h-200"
  };
  
  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate body tilt only
  useEffect(() => {
    if (!fishContainerRef.current || !fishBodyRef.current) return;
    
    const fishRect = fishContainerRef.current.getBoundingClientRect();
    const fishCenterX = fishRect.left + fishRect.width / 2;
    const fishCenterY = fishRect.top + fishRect.height / 2;
    
    // Calculate angle between fish center and mouse
    const deltaX = mousePosition.x - fishCenterX;
    const deltaY = mousePosition.y - fishCenterY;
    
    // Calculate distance for normalization
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Body movement - subtle movement (5% of normalized direction)
    const maxBodyMovement = 0.15;
    const bodyMovementX = distance === 0 ? 0 : (deltaX / distance) * maxBodyMovement;
    const bodyMovementY = distance === 0 ? 0 : (deltaY / distance) * maxBodyMovement;
    
    // Apply transformation to body
    fishBodyRef.current.style.transform = `translate(${bodyMovementX * 40}px, ${bodyMovementY * 40}px)`;
    
  }, [mousePosition]);
  
  return (
    <div 
      ref={fishContainerRef}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      {/* Main body container with movement */}
      <div 
        ref={fishBodyRef}
        className="absolute inset-0 transition-transform duration-300 ease-out"
      >
        {/* Replace the custom-drawn pufferfish with your SVG */}
        <img 
          src="puffer.svg" // Or "/images/pufferfish.svg" if in public folder
          alt="Pufferfish" 
          className="w-full h-full scale-500"
        />
      </div>
    </div>
  );
};

export default PufferFish;