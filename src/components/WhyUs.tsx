import React from 'react';

const features = [
  {
    title: "Internship Only Platform",
    description: "We put students at centerstage with a platform exclusively focused on internships, not cluttered with other job types.",
    color: "bg-internmate-light-purple",
    textColor: "text-internmate-purple",
    icon: "🎓"
  },
  {
    title: "EU Focused",
    description: "Focused on European opportunities, we connect you with internships across Europe that match your career goals.",
    color: "bg-internmate-light-teal",
    textColor: "text-internmate-teal",
    icon: "🇪🇺"
  },
  {
    title: "Smart Matching System",
    description: "Our AI-powered algorithm accurately finds internships that match your skills, interests, and career aspirations.",
    color: "bg-internmate-light-orange",
    textColor: "text-internmate-orange",
    icon: "🔍"
  },
  {
    title: "Entry Level Alternatives",
    description: "We are especially looking for internships that are entry level in order to ensure accessibility to students with different levels of experience.",
    color: "bg-internmate-light-blue",
    textColor: "text-internmate-blue",
    icon: "🚀"
  }
];

const FeatureCard = ({ title, description, color, textColor, icon }) => {
  return (
    <div 
      className={`card ${color} will-change-transform hover:-translate-y-2 hover:shadow-lg transition-transform duration-300 cursor-pointer`}
    >
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h3 className={`heading-md ${textColor} mb-2`}>{title}</h3>
      <p className="text-foreground/70 text-lg">{description}</p>
    </div>
  );
};

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          
          
          <h2 className="heading-lg">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;