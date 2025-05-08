import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Mission = () => {
  const missionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const isMobile = useIsMobile();
  
  const missionWords = {
    accessible: "Opening doors for students at all levels, regardless of background or experience",
    fun: "Making internship hunting exciting, not exhausting", 
    tailored: "Matching students with opportunities that fit their unique skills and dreams"
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (missionRef.current) {
      observer.observe(missionRef.current);
    }

    return () => {
      if (missionRef.current) {
        observer.unobserve(missionRef.current);
      }
    };
  }, []);

  const handleWordInteraction = (word) => {
    if (isMobile) {
      setHoveredWord(hoveredWord === word ? null : word);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#2A2A2A] text-white">
      <div 
        ref={missionRef} 
        className={`section-container max-w-4xl mx-auto text-center transition-all duration-1000 px-4 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="heading-lg mb-8 md:mb-12 text-white">Our Mission<span className="text-[#FAE959]">.</span></h2>
        
        <div className="relative p-6 md:p-10 rounded-xl bg-[#333333] shadow-xl">          
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed md:leading-relaxed">
            Our mission is to make internships{' '}
            <span 
              className={`text-[#FAE959] font-black cursor-pointer transition-all duration-300 ${hoveredWord === 'accessible' ? 'bg-[#444444] px-2 rounded-md' : ''}`}
              onMouseEnter={() => !isMobile && setHoveredWord('accessible')}
              onMouseLeave={() => !isMobile && setHoveredWord(null)}
              onClick={() => handleWordInteraction('accessible')}
            >
              accessible
            </span>{' '}
            for all experience levels,{' '}
            <span 
              className={`text-[#FAE959] font-black cursor-pointer transition-all duration-300 ${hoveredWord === 'fun' ? 'bg-[#444444] px-2 rounded-md' : ''}`}
              onMouseEnter={() => !isMobile && setHoveredWord('fun')}
              onMouseLeave={() => !isMobile && setHoveredWord(null)}
              onClick={() => handleWordInteraction('fun')}
            >
              fun
            </span>, and{' '}
            <span 
              className={`text-[#FAE959] font-black cursor-pointer transition-all duration-300 ${hoveredWord === 'tailored' ? 'bg-[#444444] px-2 rounded-md' : ''}`}
              onMouseEnter={() => !isMobile && setHoveredWord('tailored')}
              onMouseLeave={() => !isMobile && setHoveredWord(null)}
              onClick={() => handleWordInteraction('tailored')}
            >
              tailored
            </span>{' '}
            for every student who wants to apply{' '}
            <span className="text-white font-bold border-b-2 border-[#FAE959]">in the EU or the UK</span>.
          </p>
          
          {/* Word definition tooltip */}
          {hoveredWord && (
            <div className="mt-6 transition-all duration-300 animate-fade-in">
              <div className="bg-[#444444] p-4 rounded-md shadow-lg max-w-xl mx-auto">
                <p className="text-sm md:text-lg text-white">{missionWords[hoveredWord]}</p>
                {isMobile && (
                  <button 
                    className="mt-2 text-xs text-[#FAE959] bg-[#555555] px-2 py-1 rounded"
                    onClick={() => setHoveredWord(null)}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Mission;