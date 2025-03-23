
import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Jamie L.',
    position: 'CS Student',
    school: 'Stanford University',
    quote: 'I spent months applying to internships with zero responses. With InternMate, I had three interviews in my first week and landed my dream position at Spotify!',
    color: 'bubble-purple'
  },
  {
    name: 'Raj P.',
    position: 'Business Major',
    school: 'NYU',
    quote: "The matching algorithm is scary good. Every internship suggestion actually fits what I'm looking for, no more scrolling through irrelevant listings!",
    color: 'bubble-teal'
  },
  {
    name: 'Taylor K.',
    position: 'Design Student',
    school: 'RISD',
    quote: "As a creative, I was struggling to find internships that matched my skills. InternMate connected me with a gaming studio I hadn't even heard of, and now I have my dream job!",
    color: 'bubble-orange'
  },
  {
    name: 'Marcus J.',
    position: 'Engineering Student',
    school: 'MIT',
    quote: 'The one-tap apply feature saved me so much time. No more filling out the same information over and over again. This app is a life-changer!',
    color: 'bubble-purple'
  },
  {
    name: 'Sofia R.',
    position: 'Marketing Major',
    school: 'UCLA',
    quote: 'I love how the app lets you chat directly with recruiters. I got to ask questions that helped me really understand the company culture before accepting my offer.',
    color: 'bubble-teal'
  }
];

const TestimonialCard: React.FC<{
  name: string;
  position: string;
  school: string;
  quote: string;
  color: string;
  index: number;
}> = ({ name, position, school, quote, color, index }) => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={testimonialRef}
      className="opacity-0 flex flex-col"
      style={{ 
        transitionDelay: `${index * 0.1}s`, 
        transitionDuration: '0.6s' 
      }}
    >
      <div className={color}>
        <p className="italic text-lg">"{quote}"</p>
      </div>
      <div className="mt-4 flex items-center">
        <div className="ml-4">
          <p className="font-bold">{name}</p>
          <p className="text-sm text-foreground/70">{position}, {school}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }
  }, [currentTestimonial]);

  return (
    <section id="testimonials" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg">Student Love<span className="text-internmate-purple">.</span></h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto mt-4">
            Here's what our users are saying
          </p>
        </div>
        
        {/* Mobile testimonials (slider) */}
        <div className="md:hidden relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${testimonials.length * 100}%` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ width: `${100 / testimonials.length}%` }} className="px-4">
                <TestimonialCard
                  name={testimonial.name}
                  position={testimonial.position}
                  school={testimonial.school}
                  quote={testimonial.quote}
                  color={testimonial.color}
                  index={index}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentTestimonial === index ? 'bg-internmate-purple' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop testimonials (grid) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              position={testimonial.position}
              school={testimonial.school}
              quote={testimonial.quote}
              color={testimonial.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
