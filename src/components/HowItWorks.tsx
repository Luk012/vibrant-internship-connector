import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    title: "Answer our introductory questions",
    description: "By answering our introductory questions (just press a button or select from a list) we are creating a baseline for your potential internship preferences. It takes maximum 4 minutes!",
    emoji: "❓"
  },
  {
    title: "Upload your Resume (Optional)",
    description: "After answering our questions, upload your resume. This will give you more accurate matches within the first couple of swipes. Not fully ready with your resume? Don't worry, you can always upload it later or change it.",
    emoji: "📄"
  },
  {
    title: "Swipe right on internships",
    description: "Swipe right on internships that catch your eye. Our matchmaker finds opportunities that actually fit your vibe, your skills, and career goals.",
    emoji: "👉"
  },
  {
    title: "Find your perfect match",
    description: "We will present you with a score for each match, based on your initial answers, CV, and job description. Based on that score, you can find internships that align with your interests and needs, and save time by applying just to the right matches.",
    emoji: "🎯"
  }
];

const StepCard = ({ step, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
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
      className="card bg-white shadow-sm"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${index * 0.2}s`
      }}
    >
      <div className="relative mb-6">
        <div
          className="absolute -top-8 -left-6 w-16 h-16 bg-yellit-primary rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            transitionDelay: `${index * 0.2 + 0.2}s`
          }}
        >
          {index + 1}
        </div>
        <div
          className="text-6xl mb-4 flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            transitionDelay: `${index * 0.2 + 0.3}s`
          }}
        >
          {step.emoji}
        </div>
        <h3
          className="heading-md text-yellit-primary mb-2 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            transitionDelay: `${index * 0.2 + 0.4}s`
          }}
        >
          {step.title}
        </h3>
      </div>
      <p
        className="text-foreground/70 text-lg"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
          transitionDelay: `${index * 0.2 + 0.5}s`
        }}
      >
        {step.description}
      </p>
    </div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  useEffect(() => {
    // Create a single observer for the section
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationStarted) {
          setAnimationStarted(true);
          startTypingAnimation();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [animationStarted]);
  
  const phrases = [
    "software developer",
    "data scientist",
    "UI/UX designer",
    "product manager",
    "marketing strategist"
  ];
  
  const startTypingAnimation = () => {
    const typingElement = titleRef.current;
    if (!typingElement) return;
    
    // Clear any previous content
    typingElement.textContent = "";
    
    const prefix = "You'll be a ";
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typingInterval;
    
    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Deleting text (only delete the job part, not the prefix)
        const currentText = currentPhrase.substring(0, charIndex - 1);
        typingElement.textContent = prefix + currentText;
        charIndex--;
        typingSpeed = 50; // faster when deleting
      } else {
        // Typing text
        typingElement.textContent = prefix + currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // slower when typing
      }
      
      // Add the exclamation point and highlight
      typingElement.innerHTML = typingElement.textContent + "<span class='text-yellit-primary'>!</span>";
      
      // If finished typing the phrase
      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1500; // pause at the end
        isDeleting = true;
      }
      // If finished deleting the phrase
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // move to next phrase
        typingSpeed = 200; // brief pause before starting new phrase
      }
      
      clearTimeout(typingInterval);
      typingInterval = setTimeout(type, typingSpeed);
    };
    
    // Start with the prefix immediately
    typingElement.textContent = prefix;
    typingElement.innerHTML = typingElement.textContent + "<span class='text-yellit-primary'>!</span>";
    
    // Start the typing animation (with a small delay)
    setTimeout(type, 500);
    
    // Cleanup function to clear interval if component unmounts
    return () => {
      clearTimeout(typingInterval);
    };
  };
  
  return (
    <section ref={sectionRef} id="how-it-works" className="py-24">
      <style>
        {`
          /* Card reveal animation - smoother with less bounce */
          @keyframes cardReveal {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .card-hidden {
            opacity: 0;
            transform: translateY(30px);
          }
          .animate-card-reveal {
            animation: cardReveal 0.6s ease-out forwards;
          }
          
          /* Pop in animation for numbers */
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop-in {
            opacity: 0;
            animation: popIn 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
          }
          
          /* Bounce in animation for emojis */
          @keyframes bounceIn {
            0% { transform: translateY(-100px); opacity: 0; }
            60% { transform: translateY(10px); }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-bounce-in {
            opacity: 0;
            animation: bounceIn 0.6s forwards;
          }
          
          /* Slide up animation */
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up {
            opacity: 0;
            animation: slideUp 0.5s forwards;
          }
          
          /* Fade in animation */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            opacity: 0;
            animation: fadeIn 0.8s forwards;
          }
          
          /* Cursor blink animation */
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
      <div className="section-container">
        <div className="text-center mb-20">
          <div className="mb-2">
            <h2
              ref={titleRef}
              className="heading-lg font-display inline-block min-h-[1.5em]"
            >
              You'll Get It<span className="text-yellit-primary">!</span>
            </h2>
          </div>
          <p
            ref={subtitleRef}
            className="text-3xl max-w-2xl mx-auto mt-6 animate-fade-in"
            style={{ animationDelay: '1.6s' }}
          >
            Here's how:
          </p>
        </div>
        
        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* First Row */}
          <StepCard step={steps[0]} index={0} />
          <StepCard step={steps[1]} index={1} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Second Row */}
          <StepCard step={steps[2]} index={2} />
          <StepCard step={steps[3]} index={3} />
        </div>
        
        <div className="text-center mt-16">
          <button
            ref={buttonRef}
            className="btn-primary opacity-0 animate-fade-in"
            style={{ animationDelay: '1.5s' }}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;