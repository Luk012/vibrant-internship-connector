import React from 'react';
import BoundedPufferfishEyeTracking from './BoundedPufferfishEyeTracking';

const PufferfishSymbolismSection: React.FC = () => {
  return (
    <section id="symbolism" className="py-24 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-yellit-light text-yellit-dark rounded-full font-medium animate-pulse mb-4">
            Our mascot
          </div>
          
          <h2 className="heading-lg">
            The <span className="text-internmate-purple">Pufferfish</span> Symbolism
          </h2>
          
          <p className="text-xl opacity-70 max-w-2xl mx-auto mt-4">
            Why did we choose a pufferfish as our mascot? There's more to it than meets the eye!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive pufferfish with bounded eye tracking */}
          <div className="flex justify-center">
            <BoundedPufferfishEyeTracking
              bodyPath="public/bodygood.svg"
              leftEyePath="public/left eye.svg"
              rightEyePath="public/right eye.svg"
              leftEyePosition={{
                left: '0%',
                top: '0%',
                width: '100%',
                height: '100%'
              }}
              rightEyePosition={{
                left: '0%',
                top: '0%',
                width: '100%',
                height: '100%'
              }}
              eyeBounds={{
                maxHorizontal: 10,      // Restrict horizontal movement (pixels)
                maxVertical: 5,        // Restrict vertical movement (pixels)
                maxDownward: 15,        // Allow more downward movement (pixels)
                curveIntensity: 0.8    // Control how strongly eyes follow curve (0-1)
              }}
              size="lg"
              eyeSensitivity={4}      // Reduced sensitivity for smaller movements
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Symbolism text */}
          <div className="space-y-6">
            <div className="card bg-internmate-light-purple shadow-internmate-purple/20 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="heading-md text-internmate-purple mb-2">Adaptability</h3>
              <p className="text-foreground/70">Just like pufferfish can adapt to threats by inflating themselves, our platform adapts to your unique skills and interests to find the perfect internship match.</p>
            </div>
            
            <div className="card bg-internmate-light-teal shadow-internmate-teal/20 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="heading-md text-internmate-teal mb-2">Standing Out</h3>
              <p className="text-foreground/70">Pufferfish are distinctive and memorable. We help you stand out in the competitive internship market with a platform designed exclusively for students.</p>
            </div>
            
            <div className="card bg-internmate-light-orange shadow-internmate-orange/20 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="heading-md text-internmate-orange mb-2">Protection</h3>
              <p className="text-foreground/70">We provide a safe environment for students to explore internship opportunities, with verified companies and transparent application processes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PufferfishSymbolismSection;