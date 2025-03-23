
import React, { useEffect, useRef } from 'react';

const steps = [
  {
    title: "Tell us what you love",
    description: "Complete your profile with your skills, interests, and dream industries. No boring resumes here!",
    color: "bg-internmate-light-purple",
    textColor: "text-internmate-purple",
    icon: "❤️",
    shadowColor: "shadow-internmate-purple/20"
  },
  {
    title: "We sniff out the good stuff",
    description: "Our AI matchmaker finds internships that actually fit your vibe, skills, and career goals.",
    color: "bg-internmate-light-teal",
    textColor: "text-internmate-teal",
    icon: "🔍",
    shadowColor: "shadow-internmate-teal/20"
  },
  {
    title: "You get hired",
    description: "Apply with one tap, chat with employers, and land that perfect internship. It's that simple!",
    color: "bg-internmate-light-orange",
    textColor: "text-internmate-orange",
    icon: "🎯",
    shadowColor: "shadow-internmate-orange/20"
  }
];

const StepCard: React.FC<{
  step: number;
  title: string;
  description: string;
  color: string;
  textColor: string;
  icon: string;
  shadowColor: string;
}> = ({ step, title, description, color, textColor, icon, shadowColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`card ${color} ${shadowColor} opacity-0`}
      style={{ 
        transitionDelay: `${step * 0.2}s`, 
        transitionDuration: '0.8s' 
      }}
    >
      <div className="relative mb-6">
        <div className={`absolute -top-8 -left-6 w-16 h-16 rounded-full flex items-center justify-center ${textColor.replace('text', 'bg')} text-white font-bold text-xl`}>
          {step}
        </div>
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className={`heading-md ${textColor} mb-2`}>{title}</h3>
      </div>
      <p className="text-foreground/70 text-lg">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg">How InternMate works<span className="text-internmate-purple">.</span></h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto mt-4">
            Our three-step process makes finding internships actually fun
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={index + 1}
              title={step.title}
              description={step.description}
              color={step.color}
              textColor={step.textColor}
              icon={step.icon}
              shadowColor={step.shadowColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
