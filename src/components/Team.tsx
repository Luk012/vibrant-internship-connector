import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const team = [
  {
    name: 'Darmar',
    role: 'Dot Connector',
    bio: "2nd Year Student at Erasmus University Rotterdam",
    color: 'bg-internmate-light-purple',
    textColor: 'text-internmate-purple',
    imagePath: 'darmar.png',
    linkedinUrl: 'https://www.linkedin.com/in/dmanghel/' // Replace with actual LinkedIn URL
  },
  {
    name: 'Stefan',
    role: 'Chronic Coder',
    bio: '2nd Year Student at École Polytechnique Fédérale de Lausanne',
    color: 'bg-internmate-light-teal',
    textColor: 'text-internmate-teal',
    imagePath: 'stefan.png',
    linkedinUrl: 'https://www.linkedin.com/in/staga/' // Replace with actual LinkedIn URL
  },
  {
    name: 'Luk',
    role: 'Dom Toretto (Drifting through departments)',
    bio: 'High School Senior',
    color: 'bg-internmate-light-orange',
    textColor: 'text-internmate-orange',
    imagePath: 'luk.png',
    linkedinUrl: 'https://www.linkedin.com/in/david-luca-moșu-b48a80274/' // Replace with actual LinkedIn URL
  },
  {
    name: 'Sebi',
    role: 'Container Captain (Navigating Docker Seas)',
    bio: '2nd Year Student at University of Bucharest',
    color: 'bg-internmate-light-blue',
    textColor: 'text-internmate-blue',
    imagePath: 'sebi.png',
    linkedinUrl: 'https://www.linkedin.com/in/andrei-sebastian-duță-061698277/' // Replace with actual LinkedIn URL
  }
];

const TeamMember: React.FC<{
  name: string;
  role: string;
  bio: string;
  color: string;
  textColor: string;
  imagePath: string;
  linkedinUrl: string;
  index: number;
}> = ({ name, role, bio, color, textColor, imagePath, linkedinUrl, index }) => {
  const memberRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isActive, setIsActive] = useState(false);
  const [firstPartRole, secondPartRole] = role.includes('(') ? [role.split('(')[0].trim(), `(${role.split('(')[1]}`] : [role, ''];

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

  // Handle click for mobile devices
  const handleClick = () => {
    if (isMobile) {
      setIsActive(!isActive);
    }
  };

  // Reset active state when clicking outside (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (memberRef.current && !memberRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobile]);

  // Handle LinkedIn button click without triggering the parent click handler
  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={memberRef}
      className={`relative group overflow-hidden rounded-2xl opacity-0 ${isMobile ? 'cursor-pointer' : ''}`}
      style={{
        transitionDelay: `${index * 0.15}s`,
        transitionDuration: '0.6s',
        height: 'h-full'
      }}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="w-full h-full">
        <img
          src={imagePath}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: "center 20%" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/api/placeholder/400/350";
          }}
        />
      </div>

      {/* Info overlay - shown on hover (desktop) or active state (mobile) */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center p-6 text-center transition-opacity duration-300 ${
          isMobile 
            ? isActive ? 'opacity-100' : 'opacity-0' 
            : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{ backgroundColor: '#FAE959' }}
      >
        <h3 className="text-2xl font-display font-bold text-black">{name}</h3>
        <div className="font-semibold mb-4 text-black">
          <div>{firstPartRole}</div>
          {secondPartRole && <div>{secondPartRole}</div>}
        </div>
        <p className="text-center text-black mb-6">{bio}</p>
        
        {/* LinkedIn Button */}
        <button 
          onClick={handleLinkedInClick}
          className="mt-4 bg-black text-yellit-primary py-2 px-4 rounded-lg font-medium flex items-center transition-all hover:bg-gray-800"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="mr-2"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          See LinkedIn
        </button>
      </div>
      
      {/* Mobile indicator that this is tappable (shown only on mobile when not active) */}
      {isMobile && !isActive && (
        <div className="absolute bottom-2 right-2 w-8 h-8 bg-yellit-primary rounded-full flex items-center justify-center animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
      )}
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white/50 backdrop-blur-sm">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg">Meet the Chefs<span className="text-internmate-purple">.</span></h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto mt-4">
            The ones who are cooking you'll get it!
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
              imagePath={member.imagePath}
              linkedinUrl={member.linkedinUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;