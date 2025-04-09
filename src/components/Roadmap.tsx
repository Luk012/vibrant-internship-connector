import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile'; // Using your existing hook

// Both paths point to the same SVG for now - you can change this later
const DESKTOP_SVG_PATH = 'Minimal Blue Pink White Roadmap Graph.svg'; 
const MOBILE_SVG_PATH = 'Minimal Blue Pink White Roadmap Graph.svg';

const Roadmap = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const roadmapRef = React.useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (roadmapRef.current) {
      observer.observe(roadmapRef.current);
    }

    return () => {
      if (roadmapRef.current) {
        observer.unobserve(roadmapRef.current);
      }
    };
  }, []);

  return (
    <section id="roadmap" className="py-24" style={{ backgroundColor: '#FAE959' }}>
      <div className="text-center mb-12 px-4">
        <h2 className="heading-lg">Our Roadmap<span className="text-white">.</span></h2>
        <p className="text-xl max-w-2xl mx-auto mt-4 text-gray-800">
          How we're building the future of internship matching
        </p>
      </div>
      
      {/* Full-width container for the SVG with preserved aspect ratio */}
      <div 
        ref={roadmapRef}
        className={`w-full transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Desktop Roadmap SVG - full width */}
        <div className="hidden md:block w-full">
          <img 
            src={DESKTOP_SVG_PATH} 
            alt="InternMate Roadmap" 
            className="w-full h-auto object-contain" 
          />
        </div>
        
        {/* Mobile Roadmap SVG - full width */}
        <div className={`md:hidden w-full ${isMobile ? 'block' : 'hidden'}`}>
          <img 
            src={MOBILE_SVG_PATH} 
            alt="InternMate Roadmap" 
            className="w-full h-auto object-contain" 
          />
        </div>
      </div>
      
      <div className="mt-12 text-center px-4">
        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
          We're constantly improving our platform to create better matches between students and internships. 
          Stay tuned for more exciting features coming soon!
        </p>
      </div>
    </section>
  );
};

export default Roadmap;