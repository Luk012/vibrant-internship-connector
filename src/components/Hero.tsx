
import React, { useEffect, useRef } from 'react';

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
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-internmate-light-purple text-internmate-purple rounded-full font-medium animate-pulse">
              Finding internships just got fun
            </div>
            
            <h1 className="heading-xl">
              <span className="text-internmate-purple">Internships?</span> 
              <br /> 
              We gotchu.
            </h1>
            
            <p className="text-lg md:text-xl opacity-80 max-w-lg mx-auto lg:mx-0">
              InternMate matches students with dream internships that actually fit their vibes. No more boring applications, just swipe right on your future.
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
          
          <div 
            ref={phoneRef} 
            className="relative opacity-0"
            style={{ transitionDelay: '0.2s', transitionDuration: '0.8s' }}
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-internmate-yellow rounded-full blur-3xl opacity-30 animate-float"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-internmate-pink rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative bg-gradient-to-br from-internmate-purple to-internmate-blue p-4 rounded-[3rem] shadow-2xl mx-auto max-w-xs">
              <div className="bg-white rounded-[2.5rem] overflow-hidden">
                <div className="bg-internmate-purple py-6 px-4 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm opacity-80">4:20 PM</div>
                    <div className="text-lg font-bold">InternMate</div>
                    <div className="text-sm opacity-80">85%</div>
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-1">Match Alert! 🎉</h3>
                    <p className="text-sm opacity-80">New tech internship matches</p>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-internmate-light-purple p-4 rounded-xl">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-bold">TechCorp</h4>
                        <p className="text-sm text-gray-600">Frontend Developer</p>
                      </div>
                      <div className="bg-internmate-purple text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                        92%
                      </div>
                    </div>
                  </div>
                  <div className="bg-internmate-light-teal p-4 rounded-xl">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-bold">StartupXYZ</h4>
                        <p className="text-sm text-gray-600">UX Research</p>
                      </div>
                      <div className="bg-internmate-teal text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                        87%
                      </div>
                    </div>
                  </div>
                  <div className="bg-internmate-light-orange p-4 rounded-xl">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-bold">CreativeCo</h4>
                        <p className="text-sm text-gray-600">Design Intern</p>
                      </div>
                      <div className="bg-internmate-orange text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                        81%
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary w-full">View all matches</button>
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
