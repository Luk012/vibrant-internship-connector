
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedIntro: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000); // After animation finishes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 bg-internmate-light-purple z-50 flex items-center justify-center overflow-hidden ${animationComplete ? 'animate-fade-out pointer-events-none' : ''}`}>
      <div className="relative w-full max-w-md">
        <motion.div
          className="absolute"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="pufferfish w-24 h-24 animate-swim">
            <div className="pufferfish-body"></div>
            <div className="pufferfish-spikes"></div>
            <div className="pufferfish-face"></div>
            <div className="pufferfish-fin left"></div>
            <div className="pufferfish-fin right"></div>
            <div className="pufferfish-tail"></div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-internmate-purple mb-2">
            You'll Get It!
          </h1>
          <p className="text-xl text-internmate-purple/80">
            Finding internships just got fun
          </p>
        </motion.div>

        <motion.div
          className="absolute -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="bubble-animation"
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedIntro;
