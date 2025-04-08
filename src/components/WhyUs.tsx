import React, { useEffect, useRef, useState } from 'react';

// Define animation styles for the fade-in effect
const animationStyles = `
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

@keyframes shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}

.hover-shake:hover {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}
`;

const features = [
  {
    title: "Internship Only Platform",
    description: "We put students at centerstage with a platform exclusively focused on internships, not cluttered with other job types.",
    color: "bg-internmate-light-purple",
    textColor: "text-internmate-purple",
    icon: "🎓",
    shadowColor: "shadow-internmate-purple/20"
  },
  {
    title: "EU Focused",
    description: "Specialized in European opportunities, we connect you with internships across the EU that match your career goals.",
    color: "bg-internmate-light-teal",
    textColor: "text-internmate-teal",
    icon: "🇪🇺",
    shadowColor: "shadow-internmate-teal/20"
  },
  {
    title: "Smart Matching System",
    description: "Our AI-powered algorithm finds internships that match your skills, interests, and career aspirations with remarkable accuracy.",
    color: "bg-internmate-light-orange",
    textColor: "text-internmate-orange",
    icon: "🔍",
    shadowColor: "shadow-internmate-orange/20"
  },
  {
    title: "Entry Level Alternatives",
    description: "Can't find an internship? We suggest entry-level opportunities that can help you build valuable experience.",
    color: "bg-internmate-light-blue",
    textColor: "text-internmate-blue",
    icon: "🚀",
    shadowColor: "shadow-internmate-blue/20"
  }
];

const FeatureCard: React.FC<{
  title: string;
  description: string;
  color: string;
  textColor: string;
  icon: string;
  shadowColor: string;
  index: number;
}> = ({ title, description, color, textColor, icon, shadowColor, index }) => {
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
      className={`card ${color} ${shadowColor} opacity-0 cursor-pointer transition-all duration-500 
        hover:shadow-2xl hover:border-4 hover:border-internmate-purple hover:bg-white hover:-translate-y-5`}
      style={{ 
        transitionDelay: `${index * 0.2}s`, 
        transitionDuration: '0.8s' 
      }}
    >
      <div className="text-6xl mb-4 hover-shake transition-transform duration-300">{icon}</div>
      <h3 className={`heading-md ${textColor} mb-2 transition-all duration-300 hover:underline hover:text-internmate-purple`}>{title}</h3>
      <p className="text-foreground/70 text-lg transition-all duration-300 hover:font-semibold">{description}</p>
    </div>
  );
};

const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (titleRef.current) {
            titleRef.current.classList.add('animate-fade-in');
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      <section id="why-us" className="py-24 relative" ref={sectionRef}>
        <div className="section-container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-yellit-light text-yellit-dark rounded-full font-medium animate-pulse mb-4">
              What sets us apart
            </div>
            
            <h2 ref={titleRef} className="heading-lg opacity-0">
              Why Choose <span className="text-internmate-purple">Us</span><span className="text-internmate-purple">?</span>
            </h2>
            
            <p className="text-xl opacity-70 max-w-2xl mx-auto mt-4">
              We're not just another job board - we're your internship match-maker
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                textColor={feature.textColor}
                icon={feature.icon}
                shadowColor={feature.shadowColor}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUs;