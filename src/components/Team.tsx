import React, { useEffect, useRef } from 'react';

const team = [
  {
    name: 'Darmar',
    role: 'Creative Diva',
    bio: "2nd Year Student at Erasmus University Rotterdam",
    color: 'bg-internmate-light-purple',
    textColor: 'text-internmate-purple',
    imagePath: 'darmar.png'
  },
  {
    name: 'Stefan',
    role: 'Chronic Coder',
    bio: '2nd Year Student at École Polytechnique Fédérale de Lausanne',
    color: 'bg-internmate-light-teal',
    textColor: 'text-internmate-teal',
    imagePath: 'stefan.png'
  },
  {
    name: 'Luk',
    role: 'Dom Toretto (Drifting through departments)',
    bio: 'High School Senior',
    color: 'bg-internmate-light-orange',
    textColor: 'text-internmate-orange',
    imagePath: 'luk.png'
  },
  {
    name: 'Sebi',
    role: 'Container Captain (Navigating Docker Seas)',
    bio: '2nd Year Student at University of Bucharest',
    color: 'bg-internmate-light-blue',
    textColor: 'text-internmate-blue',
    imagePath: 'sebi.png'
  }
];

const TeamMember: React.FC<{
  name: string;
  role: string;
  bio: string;
  color: string;
  textColor: string;
  imagePath: string;
  index: number;
}> = ({ name, role, bio, color, textColor, imagePath, index }) => {
  const memberRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={memberRef}
      className="relative group overflow-hidden rounded-2xl opacity-0"
      style={{
        transitionDelay: `${index * 0.15}s`,
        transitionDuration: '0.6s',
        height: 'h-full'
      }}
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

      {/* Hover overlay with solid color background and information */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center"
        style={{ backgroundColor: '#FAE959' }}
      >
        <h3 className="text-2xl font-display font-bold text-black">{name}</h3>
        <div className="font-semibold mb-4 text-black">
          <div>{firstPartRole}</div>
          {secondPartRole && <div>{secondPartRole}</div>}
        </div>
        <p className="text-center text-black">{bio}</p>
      </div>
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
            The awesome culinary team behind You'll Get It!
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
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;