
import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { 
    value: 35000, 
    label: 'internship matches made', 
    color: 'bg-internmate-light-purple',
    textColor: 'text-internmate-purple',
    icon: '🚀'
  },
  { 
    value: 120, 
    label: 'universities onboard', 
    color: 'bg-internmate-light-teal',
    textColor: 'text-internmate-teal',
    icon: '🎓'
  },
  { 
    value: 98.4, 
    label: 'user satisfaction', 
    color: 'bg-internmate-light-orange',
    textColor: 'text-internmate-orange',
    icon: '😍'
  },
  { 
    value: 250, 
    label: 'partner companies', 
    color: 'bg-internmate-light-pink',
    textColor: 'text-internmate-pink',
    icon: '🏢'
  }
];

const StatCard: React.FC<{
  targetValue: number;
  label: string;
  color: string;
  textColor: string;
  icon: string;
  suffix?: string;
}> = ({ targetValue, label, color, textColor, icon, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [targetValue, isVisible]);

  return (
    <div 
      ref={cardRef}
      className={`card ${color} transform transition-all duration-700 hover:scale-105 opacity-0 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
    >
      <div className="text-5xl mb-2 transform transition-all duration-500 hover:animate-bounce">{icon}</div>
      <div className={`${textColor} font-display font-bold text-5xl mb-1`}>
        {displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-foreground/70 text-lg">{label}</div>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section id="stats" className="py-24 bg-white/50 backdrop-blur-sm">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg">The numbers don't lie<span className="text-internmate-purple">.</span></h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto mt-4">
            We've helped thousands of students land their dream internships
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              targetValue={stat.value}
              label={stat.label}
              color={stat.color}
              textColor={stat.textColor}
              icon={stat.icon}
              suffix={stat.label === 'user satisfaction' ? '%' : '+'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
