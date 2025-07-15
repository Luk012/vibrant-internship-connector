import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// ==================================================================================
//  STEP DEFINITIONS & CARD IMAGES
// ==================================================================================

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

/*
  ✅ IMPORT YOUR CARD IMAGES HERE
  (Using placeholder paths)
*/
import card1 from '/card1.png';
import card2 from '/card2.png';
import card3 from '/card3.png'; // Example: reusing images
import card4 from '/card4.png'; // Example: reusing images

const cardImages = [card1, card2, card3, card4];


// ==================================================================================
//  SWIPE CARD ANIMATION COMPONENTS
// ==================================================================================

const TinderCard = forwardRef(({ image, x }, ref) => {
  const rotate = useTransform(x, [-250, 250], [-25, 25]);
  const greenOpacity = useTransform(x, [20, 150], [0, 1]);
  const redOpacity = useTransform(x, [-20, -150], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, rotate }}
      className="absolute w-full h-full"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
        <img
          src={image}
          alt="Internship card"
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: 'cover' }}
        />
        <motion.div
          style={{ opacity: greenOpacity }}
          className="absolute inset-0 h-full w-full bg-gradient-to-br from-green-400/80 to-emerald-500/10 pointer-events-none"
        />
        <motion.div
          style={{ opacity: redOpacity }}
          className="absolute inset-0 h-full w-full bg-gradient-to-bl from-red-400/80 to-rose-500/10 pointer-events-none"
        />
      </div>
    </motion.div>
  );
});

const CardStack = () => {
  const [cards, setCards] = useState(cardImages);
  const x = useMotionValue(0);

  useEffect(() => {
    let isMounted = true;

    const swipeLoop = async () => {
      while (isMounted) {
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) break;

        await animate(x, 250, { type: 'spring', stiffness: 100, damping: 20 });
        if (!isMounted) break;
        
        setCards(prev => [...prev.slice(1), prev[0]]);
        animate(x, 0, { type: 'spring', stiffness: 200, damping: 20 });

        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) break;

        await animate(x, -250, { type: 'spring', stiffness: 100, damping: 20 });
        if (!isMounted) break;

        setCards(prev => [...prev.slice(1), prev[0]]);
        animate(x, 0, { type: 'spring', stiffness: 200, damping: 20 });
      }
    };

    swipeLoop();

    return () => {
      isMounted = false;
      x.stop();
    };
  }, [x]);


  return (
    <div className="relative w-60 h-[400px] md:w-96 md:h-[600px]">
      {cards.slice(1).reverse().map((card, index) => {
        const trueIndex = cards.length - 1 - index;
        return (
            <motion.div
              key={`${card}-${index}-bg`}
              style={{ 
                backgroundImage: `url(${card})`,
                zIndex: -trueIndex,
              }}
              className="absolute w-full h-full bg-cover bg-center rounded-2xl"
              initial={{ scale: 1, y: 0 }}
              animate={{
                scale: 1 - trueIndex * 0.04,
                y: -trueIndex * 25,
              }}
              transition={{type: 'spring', stiffness: 100, damping: 20}}
            />
        );
      })}
      
      {cards.length > 0 && (
        <TinderCard
          key={cards[0]}
          image={cards[0]}
          x={x}
        />
      )}
    </div>
  );
};


// ==================================================================================
//  INFORMATION CARD COMPONENT
// ==================================================================================

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
        transitionDelay: `${index * 0.1}s`
      }}
    >
      <div className="relative mb-6">
        <div
          className="absolute -top-8 -left-6 w-16 h-16 bg-yellit-primary rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            transitionDelay: `${index * 0.1 + 0.05}s`
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
            transitionDelay: `${index * 0.15 + 0.05}s`
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
            transitionDelay: `${index * 0.2 + 0.05}s`
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
          transitionDelay: `${index * 0.2 + 0.05}s`
        }}
      >
        {step.description}
      </p>
    </div>
  );
};


// ==================================================================================
//  MAIN HOW-IT-WORKS SECTION
// ==================================================================================

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  useEffect(() => {
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
        const currentText = currentPhrase.substring(0, charIndex - 1);
        typingElement.textContent = prefix + currentText;
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = prefix + currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      typingElement.innerHTML = typingElement.textContent + "<span class='text-yellit-primary'>!</span>";
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 200;
      }
      
      clearTimeout(typingInterval);
      typingInterval = setTimeout(type, typingSpeed);
    };
    
    typingElement.textContent = prefix;
    typingElement.innerHTML = typingElement.textContent + "<span class='text-yellit-primary'>!</span>";
    
    setTimeout(type, 500);
    
    return () => clearTimeout(typingInterval);
  };
  
  return (
    <section ref={sectionRef} id="how-it-works" className="py-24">
      {/* You can keep the styles here or move them to a global CSS file */}
      <style>{`
        /* Add any necessary keyframes or styles from the original component if needed */
        @keyframes blink { 
          50% { opacity: 0; }
        }
      `}</style>
      
      <div className="section-container">
        {/* --- Header Text --- */}
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
        
        {/* --- Swipe Card Animation --- */}
        <div className="flex justify-center my-20">
          <CardStack />
        </div>
        
        {/* --- Informational Step Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <StepCard step={steps[0]} index={0} />
          <StepCard step={steps[1]} index={1} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StepCard step={steps[2]} index={2} />
          <StepCard step={steps[3]} index={3} />
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;