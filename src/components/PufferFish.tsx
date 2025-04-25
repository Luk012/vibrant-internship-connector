import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// If your SVG is in src/assets:
import PufferfishSVG from '/puffer.svg';

// Path to the mobile SVG in public folder
const MOBILE_PUFFERFISH_SVG = '/puffer_mobile.svg';

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
  const isMobile = useIsMobile();

  // Size mapping
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-200 h-200"
  };

  // Track mouse position globally - only on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Calculate body tilt only - only on desktop
  useEffect(() => {
    if (isMobile || !fishContainerRef.current || !fishBodyRef.current) return;

    const fishRect = fishContainerRef.current.getBoundingClientRect();
    const fishCenterX = fishRect.left + fishRect.width / 2;
    const fishCenterY = fishRect.top + fishRect.height / 2;

    // Calculate angle between fish center and mouse
    const deltaX = mousePosition.x - fishCenterX;
    const deltaY = mousePosition.y - fishCenterY;

    // Calculate distance for normalization
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Body movement - subtle movement (15% of normalized direction)
    const maxBodyMovement = 0.15;
    const bodyMovementX = distance === 0 ? 0 : (deltaX / distance) * maxBodyMovement;
    const bodyMovementY = distance === 0 ? 0 : (deltaY / distance) * maxBodyMovement;

    // Apply transformation to body
    fishBodyRef.current.style.transform = `translate(${bodyMovementX * 40}px, ${bodyMovementY * 40}px)`;
  }, [mousePosition, isMobile]);

  // For mobile devices, render a static version
  if (isMobile) {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <img
          src={MOBILE_PUFFERFISH_SVG}
          alt="Pufferfish"
          className="w-full h-full"
        />
      </div>
    );
  }

  // For desktop, render the interactive version
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
          src={PufferfishSVG} // Using the imported SVG for desktop
          alt="Pufferfish"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default PufferFish;