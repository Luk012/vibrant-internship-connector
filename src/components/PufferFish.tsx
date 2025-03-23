
import React, { useState, useEffect } from 'react';

interface PufferFishProps {
  size?: number;
  className?: string;
}

const PufferFish: React.FC<PufferFishProps> = ({ size = 100, className = '' }) => {
  const [isInflated, setIsInflated] = useState(false);
  
  // Randomly puff up the fish every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsInflated(prev => !prev);
    }, Math.random() * 5000 + 2000); // Random interval between 2-7 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className={`relative cursor-pointer transition-transform duration-300 ${
        isInflated ? 'scale-110' : 'scale-100'
      } ${className}`}
      style={{ width: size, height: size }}
      onClick={() => setIsInflated(prev => !prev)}
    >
      <img 
        src="/lovable-uploads/3c40b2eb-fe7e-4b7b-9c53-3fd2a5b36836.png" 
        alt="Pufferfish Logo" 
        className={`w-full h-full transition-all duration-300 ${
          isInflated ? 'animate-wiggle' : ''
        }`}
      />
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isInflated ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-xs font-bold text-black bg-white/50 px-2 py-1 rounded-full">
          You'll Get It!
        </div>
      </div>
    </div>
  );
};

export default PufferFish;
