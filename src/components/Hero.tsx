import React, { useEffect, useRef } from 'react';
import PufferFish from './PufferFish';

const Hero: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    return () => {
      if (phoneRef.current) {
        observer.unobserve(phoneRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 overflow-hidden">
      <div className="section-container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-yellit-light text-yellit-dark rounded-full font-medium animate-pulse">
              Finding internships just got fun
            </div>
            
            <h1 className="heading-xl">
              <span className="text-yellit-primary">Internships?</span> 
              <br /> 
              You'll Get It!
            </h1>
            
            <p className="text-lg md:text-xl opacity-80 max-w-lg mx-auto lg:mx-0">
              You'll Get It matches students with dream internships that actually fit their vibes. No more boring applications, just swipe right on your future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-primary">
                Download App
              </button>
              <button className="btn-secondary">
                For Employers
              </button>
            </div>
          </div>
          
          {/* Right side phone mockup - improved mobile positioning */}
          <div className="flex justify-center lg:justify-start mt-12 lg:mt-0 w-full">
            <div 
              ref={phoneRef} 
              className="relative opacity-0 w-full max-w-md mx-auto"
              style={{ transitionDelay: '0.2s', transitionDuration: '0.8s' }}
            >
              {/* Adjusted blur effect positions for better mobile display */}
              <div className="absolute -top-10 -left-6 w-24 h-24 md:w-32 md:h-32 bg-yellit-primary rounded-full blur-3xl opacity-30 animate-float"></div>
              <div className="absolute -bottom-10 -right-6 w-24 h-24 md:w-32 md:h-32 bg-yellit-secondary rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative bg-gradient-to-br from-yellit-primary to-yellit-secondary p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl w-full">
                {/* Adjusted PufferFish positioning for mobile */}
                <div className="absolute -top-16 md:-top-20 left-1/2 transform -translate-x-1/2 z-10 scale-90 md:scale-100">
                  <PufferFish size="md" />
                </div>
                
                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mt-6 w-full">
                  <div className="bg-yellit-primary py-4 md:py-6 px-4 md:px-6 text-foreground">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                      <div className="text-xs md:text-sm opacity-80">4:20 PM</div>
                      <div className="text-base md:text-lg font-bold flex items-center">
                        <span className="mr-2">You'll Get It!</span>
                      </div>
                      <div className="text-xs md:text-sm opacity-80">85%</div>
                    </div>
                    <div className="text-center mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl font-bold mb-1">Match Alert! 🎉</h3>
                      <p className="text-xs md:text-sm opacity-80">New tech internship matches</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                    <div className="bg-yellit-light p-3 md:p-4 rounded-xl">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-bold">TechCorp</h4>
                          <p className="text-xs md:text-sm text-gray-600">Frontend Developer</p>
                        </div>
                        <div className="bg-yellit-primary text-foreground h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                          92%
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellit-light p-3 md:p-4 rounded-xl">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-bold">StartupXYZ</h4>
                          <p className="text-xs md:text-sm text-gray-600">UX Research</p>
                        </div>
                        <div className="bg-yellit-secondary text-foreground h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                          87%
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellit-light p-3 md:p-4 rounded-xl">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-bold">CreativeCo</h4>
                          <p className="text-xs md:text-sm text-gray-600">Design Intern</p>
                        </div>
                        <div className="bg-yellit-accent text-foreground h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                          81%
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary w-full text-sm md:text-base">View all matches</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;