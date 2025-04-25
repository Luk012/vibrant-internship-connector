import React, { useEffect, useRef, useState } from 'react';
import PufferFish from './PufferFish';
import { X, Send } from 'lucide-react';

// Modal component for employer contact
const EmployerContactModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const modalRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact-employer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        setMessage('');
        // Close modal after 3 seconds on success
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-md transform transition-all"
      >
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-yellit-primary">Let's Talk</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h4>
              <p className="text-gray-600">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="employer-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email Address
                </label>
                <input
                  id="employer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="employer-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="employer-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your company and what you're looking for..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-primary focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send size={18} className="mr-2" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              
              {submitStatus === 'error' && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    return () => {
      if (phoneRef.current) {
        observer.unobserve(phoneRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 overflow-hidden">
        <div className="section-container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="heading-xl">
                <span className="text-yellit-primary">Want An Internship?</span> 
                <br /> 
                you'll get it!
              </h1>
              
              <p className="text-lg md:text-xl opacity-80 max-w-lg mx-auto lg:mx-0">
                you'll get it matches students with internships that actually fit their vibes. No more reading through long and heavy job descriptions, just swipe right on your future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="btn-primary">
                  Download App
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowEmployerModal(true)}
                >
                  For Employers
                </button>
              </div>
            </div>
            
            {/* Right side phone mockup - improved mobile positioning */}
            <div className="flex justify-center lg:justify-start mt-12 lg:mt-0 w-full">
              <div 
                ref={phoneRef} 
                className="relative opacity-0 w-full max-w-md mx-auto"
                style={{ transitionDelay: '0.2s', transitionDuration: '0.8s' }}
              >
                {/* Adjusted blur effect positions for better mobile display */}
                <div className="absolute -top-10 -left-6 w-24 h-24 md:w-32 md:h-32 bg-yellit-primary rounded-full blur-3xl opacity-30 animate-float"></div>
                <div className="absolute -bottom-10 -right-6 w-24 h-24 md:w-32 md:h-32 bg-yellit-secondary rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative bg-gradient-to-br from-yellit-primary to-yellit-secondary p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl w-full">
                  {/* Adjusted PufferFish positioning for mobile */}
                  <div className="absolute -top-16 md:-top-20 left-1/2 transform -translate-x-1/2 z-10 scale-90 md:scale-100">
                    <PufferFish size="md" />
                  </div>
                  
                  <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mt-6 w-full">
                    <div className="bg-yellit-primary py-4 md:py-6 px-4 md:px-6 text-foreground">
                      <div className="flex justify-between items-center mb-4 md:mb-6">
                        <div className="text-xs md:text-sm opacity-80">4:20 PM</div>
                        <div className="text-base md:text-lg font-bold flex items-center">
                          <span className="mr-2">you'll get it!</span>
                        </div>
                        <div className="text-xs md:text-sm opacity-80">85%</div>
                      </div>
                      <div className="text-center mb-3 md:mb-4">
                        <h3 className="text-lg md:text-xl font-bold mb-1">Match Alert! 🎉</h3>
                        <p className="text-xs md:text-sm opacity-80">New tech internship matches</p>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <div className="bg-yellit-light p-3 md:p-4 rounded-xl">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold">TechCorp</h4>
                            <p className="text-xs md:text-sm text-gray-600">Frontend Developer</p>
                          </div>
                          <div className="bg-yellit-primary text-foreground h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                            92%
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellit-light p-3 md:p-4 rounded-xl">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold">StartupXYZ</h4>
                            <p className="text-xs md:text-sm text-gray-600">UX Research</p>
                          </div>
                          <div className="bg-yellit-secondary text-foreground h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                            87%
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellit-light p-3 md:p-4 rounded-xl">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold">CreativeCo</h4>
                            <p className="text-xs md:text-sm text-gray-600">Design Intern</p>
                          </div>
                          <div className="bg-yellit-accent text-foreground h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                            81%
                          </div>
                        </div>
                      </div>
                      <button className="btn-primary w-full text-sm md:text-base">View all matches</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Contact Modal */}
      <EmployerContactModal 
        isOpen={showEmployerModal} 
        onClose={() => setShowEmployerModal(false)} 
      />
    </>
  );
};

export default Hero;