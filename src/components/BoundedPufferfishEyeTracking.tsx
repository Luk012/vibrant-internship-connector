import React, { useState, useEffect, useRef } from 'react';

interface BoundedPufferfishProps {
  bodyPath: string;
  leftEyePath: string;
  rightEyePath: string;
  
  leftEyePosition?: { 
    left: string;
    top: string;
    width: string;
    height: string;
  };
  rightEyePosition?: { 
    left: string;
    top: string;
    width: string;
    height: string;
  };
  
  // Eye boundary constraints
  eyeBounds?: {
    maxHorizontal: number;   // Maximum horizontal movement (pixels)
    maxVertical: number;     // Maximum vertical movement (pixels)
    maxDownward: number;     // Maximum downward movement (pixels)
    curveIntensity: number;  // How strongly eyes follow the curve (0-1)
  };
  
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  eyeSensitivity?: number;
}

const BoundedPufferfishEyeTracking: React.FC<BoundedPufferfishProps> = ({
  bodyPath,
  leftEyePath,
  rightEyePath,
  leftEyePosition = { left: '40%', top: '48%', width: '6%', height: '6%' },
  rightEyePosition = { left: '60%', top: '48%', width: '6%', height: '6%' },
  eyeBounds = {
    maxHorizontal: 6,      // Default max horizontal movement (pixels)
    maxVertical: 4,        // Default max vertical movement (pixels)
    maxDownward: 8,        // Default max downward movement (pixels)
    curveIntensity: 0.7    // Default curve intensity
  },
  className = "",
  size = "md",
  eyeSensitivity = 5
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  
  // Size mapping
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]"
  };
  
  // Track mouse movements
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Apply constrained eye movement
  useEffect(() => {
    if (!containerRef.current || !leftEyeRef.current || !rightEyeRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Adjust movement based on container size and sensitivity
    const adjustedMaxH = eyeBounds.maxHorizontal * (rect.width / 300) * (eyeSensitivity / 5);
    const adjustedMaxV = eyeBounds.maxVertical * (rect.height / 300) * (eyeSensitivity / 5);
    const adjustedMaxDown = eyeBounds.maxDownward * (rect.height / 300) * (eyeSensitivity / 5);
    
    // Calculate container center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get mouse position relative to container center (-1 to 1 range)
    const mouseX = (mousePosition.x - centerX) / (rect.width / 2);
    const mouseY = (mousePosition.y - centerY) / (rect.height / 2);
    
    // Clamp to (-1, 1)
    const clampedX = Math.max(-1, Math.min(1, mouseX));
    const clampedY = Math.max(-1, Math.min(1, mouseY));
    
    // Calculate eye positions with constraints to keep under eyelid curve
    const calculateEyePosition = () => {
      // Horizontal movement with bounds
      const rawX = clampedX * adjustedMaxH;
      
      // Apply curve constraint - as eyes move horizontally, they also move vertically
      // This creates the curved path that follows the eyelid shape
      
      // 1. Calculate curve height based on horizontal position (parabolic curve)
      // When cursor is at center (x=0), eyes are at highest point
      // As cursor moves away from center, eyes drop in arc shape
      const arcFactor = 1 - (Math.abs(clampedX) ** 1.5);  // Non-linear curve - steeper near edges
      const curveHeight = arcFactor * adjustedMaxV * eyeBounds.curveIntensity;
      
      // 2. Calculate basic vertical position based on mouse Y
      // Apply different limits for upward vs downward movement
      const isLookingDown = clampedY > 0;
      
      // Determine vertical limit based on direction
      // When looking down, allow more movement
      const vertLimit = isLookingDown 
        ? adjustedMaxDown * (1 - Math.abs(clampedX) * 0.3)  // Less reduction at edges for downward
        : adjustedMaxV * (1 - Math.abs(clampedX) * 0.5);    // More reduction at edges for upward
      
      // Calculate vertical position with boosted downward movement
      const verticalFactor = Math.max(-0.2, clampedY);  // Allow slight upward if looking up
      const yPosition = verticalFactor * vertLimit;
      
      // 3. Combine curve and vertical position, ensuring proper eyelid following
      // When looking down, reduce curve influence to allow more downward movement
      const curveInfluence = isLookingDown ? 0.7 : 1.0;
      const yOffset = (-curveHeight * curveInfluence) + yPosition;
      
      // Return final constrained position
      return {
        x: rawX,
        y: yOffset
      };
    };
    
    // Get position and apply to both eyes
    const eyePos = calculateEyePosition();
    
    // Apply transforms
    leftEyeRef.current.style.transform = `translate(${eyePos.x}px, ${eyePos.y}px)`;
    rightEyeRef.current.style.transform = `translate(${eyePos.x}px, ${eyePos.y}px)`;
    
  }, [mousePosition, eyeSensitivity, eyeBounds]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      {/* Base layer with SVG body */}
      <div className="w-full h-full">
        <img 
          src={bodyPath} 
          alt="Pufferfish body" 
          className="w-full h-full"
        />
      </div>
      
      {/* Left eye with precise positioning */}
      <div 
        ref={leftEyeRef}
        className="absolute" 
        style={{
          left: leftEyePosition.left,
          top: leftEyePosition.top,
          width: leftEyePosition.width,
          height: leftEyePosition.height,
          transition: 'transform 100ms ease-out'
        }}
      >
        <img 
          src={leftEyePath} 
          alt="Left eye" 
          className="w-full h-full"
        />
      </div>
      
      {/* Right eye with precise positioning */}
      <div 
        ref={rightEyeRef}
        className="absolute" 
        style={{
          left: rightEyePosition.left,
          top: rightEyePosition.top,
          width: rightEyePosition.width,
          height: rightEyePosition.height,
          transition: 'transform 100ms ease-out'
        }}
      >
        <img 
          src={rightEyePath} 
          alt="Right eye" 
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default BoundedPufferfishEyeTracking;