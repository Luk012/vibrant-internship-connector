import React from 'react';
import BoundedPufferfishEyeTracking from './BoundedPufferfishEyeTracking';

const PufferfishSymbolismSection: React.FC = () => {
  return (
    <section id="symbolism" className="py-24 relative">
      <div className="section-container">
        <div className="text-center mb-16">
        
          
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
              bodyPath="bodygood.svg"
              leftEyePath="left_eye.svg"
              rightEyePath="right_eye.svg"
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
              size="xl"
              eyeSensitivity={4}      // Reduced sensitivity for smaller movements
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Symbolism text */}
          <div className="space-y-6">
            <div className="card bg-internmate-light-purple shadow-internmate-purple/20 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="heading-md text-internmate-purple mb-2">Adaptability and Resilience</h3>
              <p className="text-foreground/70">Just like pufferfish expand when threatened, students navigating the competitive internship landscape must adapt and show resilience, ready to face challenges and leverage opportunities.</p>
            </div>
            
            <div className="card bg-internmate-light-teal shadow-internmate-teal/20 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="heading-md text-internmate-teal mb-2">Hidden Potential</h3>
              <p className="text-foreground/70">While pufferfish may seem small and unassuming, they can transform dramatically when needed. Similarly, students often possess abilities that can shine under the right circumstances, and our platform helps uncover and nurture that potential.</p>
            </div>
            
            <div className="card bg-internmate-light-orange shadow-internmate-orange/20 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="heading-md text-internmate-orange mb-2">Uniqueness</h3>
              <p className="text-foreground/70">Pufferfish are distinct in appearance and behavior, symbolizing how students need to stand out in a crowded field. With our matching system, students can use their unique strengths and apply for internships that align with their individual skills.</p>
            </div>

            <div className="card bg-internmate-light-orange shadow-internmate-orange/20 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="heading-md text-internmate-orange mb-2">Careful Navigation</h3>
              <p className="text-foreground/70">Just as pufferfish navigate their environment with care (or get all goofy and balloonish if they don’t), students must ensure an internship description aligns with their skills and goals. Our platform helps students save time by applying only to roles that are a perfect fit, maximizing their chances of passing the screening phase.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PufferfishSymbolismSection;