
import React, { useState, useEffect, useRef } from 'react';

interface PufferFishProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const PufferFish: React.FC<PufferFishProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fishRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  
  // Size mapping
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64"
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
  
  // Calculate eye movement
  useEffect(() => {
    if (!fishRef.current || !leftEyeRef.current || !rightEyeRef.current) return;
    
    const fishRect = fishRef.current.getBoundingClientRect();
    const fishCenterX = fishRect.left + fishRect.width / 2;
    const fishCenterY = fishRect.top + fishRect.height / 2;
    
    // Calculate angle between fish center and mouse
    const deltaX = mousePosition.x - fishCenterX;
    const deltaY = mousePosition.y - fishCenterY;
    
    // Limit eye movement range (0.2 = 20% of eye container)
    const maxMovement = 0.2;
    
    // Normalize movement to be within -maxMovement to +maxMovement
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normalizedX = distance === 0 ? 0 : (deltaX / distance) * maxMovement;
    const normalizedY = distance === 0 ? 0 : (deltaY / distance) * maxMovement;
    
    // Apply transformation
    leftEyeRef.current.style.transform = `translate(${normalizedX * 100}%, ${normalizedY * 100}%)`;
    rightEyeRef.current.style.transform = `translate(${normalizedX * 100}%, ${normalizedY * 100}%)`;
    
  }, [mousePosition]);
  
  return (
    <div 
      ref={fishRef}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      {/* Main body */}
      <div className="absolute inset-0 bg-yellit-primary rounded-full border-4 border-black">
        {/* Spikes */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellit-primary border-4 border-black rotate-45"></div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellit-primary border-4 border-black rotate-45"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellit-primary border-4 border-black rotate-45"></div>
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellit-primary border-4 border-black rotate-45"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellit-primary border-4 border-black rotate-45"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellit-primary border-4 border-black rotate-45"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-yellit-primary border-4 border-black rotate-45"></div>
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellit-primary border-4 border-black rotate-45"></div>
        
        {/* Face */}
        <div className="absolute top-1/4 left-0 right-0 flex justify-center">
          {/* Eyebrow */}
          <div className="absolute w-3/4 h-5 border-b-4 border-black rounded-b-full -top-2"></div>
          
          {/* Eyes */}
          <div className="flex gap-3 items-center justify-center">
            {/* Left eye container */}
            <div className="relative w-8 h-8 bg-white rounded-full border-2 border-black overflow-hidden">
              {/* Left pupil */}
              <div 
                ref={leftEyeRef}
                className="absolute w-4 h-4 bg-black rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
              ></div>
            </div>
            
            {/* Right eye container */}
            <div className="relative w-8 h-8 bg-white rounded-full border-2 border-black overflow-hidden">
              {/* Right pupil */}
              <div
                ref={rightEyeRef}
                className="absolute w-4 h-4 bg-black rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
              ></div>
            </div>
          </div>
        </div>
        
        {/* Mouth */}
        <div className="absolute bottom-1/4 left-0 right-0 flex justify-center">
          <div className="w-10 h-4 border-t-4 border-black rounded-t-full"></div>
        </div>
        
        {/* Belly spot */}
        <div className="absolute bottom-1/6 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-yellit-light rounded-full"></div>
      </div>
    </div>
  );
};

export default PufferFish;
