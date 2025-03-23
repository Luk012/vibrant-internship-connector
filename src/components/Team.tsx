
import React, { useEffect, useRef } from 'react';
import PufferFish from './PufferFish';

const team = [
  {
    name: 'Mia',
    role: 'Founder & CEO',
    bio: "Former recruiter who got tired of seeing awesome students get overlooked. Now she's on a mission to fix the internship search forever.",
    color: 'bg-internmate-light-purple',
    textColor: 'text-internmate-purple',
    emoji: '👑'
  },
  {
    name: 'Alex',
    role: 'Backend Wizard',
    bio: 'Turns caffeine into code. Built our matching algorithm after failing to find an internship despite sending 200+ applications.',
    color: 'bg-internmate-light-teal',
    textColor: 'text-internmate-teal',
    emoji: '🧙‍♂️'
  },
  {
    name: 'Zoe',
    role: 'Design Queen',
    bio: 'Makes our app look pretty and work beautifully. Thinks job applications should be as fun as dating apps (but with better results).',
    color: 'bg-internmate-light-orange',
    textColor: 'text-internmate-orange',
    emoji: '🎨'
  },
  {
    name: 'Jamal',
    role: 'Growth Hacker',
    bio: 'College dropout turned marketing genius. Convinced 120+ universities to partner with us through pure charm and persistence.',
    color: 'bg-internmate-light-blue',
    textColor: 'text-internmate-blue',
    emoji: '📈'
  }
];

const TeamMember: React.FC<{
  name: string;
  role: string;
  bio: string;
  color: string;
  textColor: string;
  emoji: string;
  index: number;
}> = ({ name, role, bio, color, textColor, emoji, index }) => {
  const memberRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (memberRef.current) {
      observer.observe(memberRef.current);
    }

    return () => {
      if (memberRef.current) {
        observer.unobserve(memberRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={memberRef}
      className={`card ${color} opacity-0`}
      style={{ 
        transitionDelay: `${index * 0.15}s`, 
        transitionDuration: '0.6s' 
      }}
    >
      <div className="flex flex-col items-center">
        <div className={`w-24 h-24 ${textColor.replace('text', 'bg')} rounded-full flex items-center justify-center mb-4`}>
          <span className="text-5xl">{emoji}</span>
        </div>
        <h3 className="text-2xl font-display font-bold">{name}</h3>
        <p className={`${textColor} font-semibold mb-2`}>{role}</p>
        <p className="text-center text-foreground/70">{bio}</p>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white/50 backdrop-blur-sm relative overflow-hidden">
      {/* Animated puffer fish elements */}
      <div className="absolute -left-20 top-10 transform rotate-12 animate-float-slow">
        <PufferFish size={120} />
      </div>
      <div className="absolute right-10 bottom-10 transform -rotate-12 animate-bounce-slow">
        <PufferFish size={100} />
      </div>
      <div className="absolute right-40 top-16 transform rotate-45 animate-pulse-slow">
        <PufferFish size={80} />
      </div>
      
      {/* Main content */}
      <div className="section-container relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-20 z-10 animate-scale-slow">
            <PufferFish size={80} />
          </div>
          <h2 className="heading-lg">Meet the Team<span className="text-youllgetit">.</span></h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto mt-4">
            The cool humans behind You'll Get It
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              color={member.color}
              textColor={member.textColor}
              emoji={member.emoji}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
