import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

// Beta Tester Modal Component with Google Apps Script integration
const BetaTesterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const modalRef = useRef(null);

  // Google Apps Script URL for form submissions
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPJtAefgTMeEmQYm4WEoMiHCJzfktRfi3MAzW9awuoBSHMRyUbd8dCFyDW7R3qeMaC/exec';

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, modalRef]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setEmail('');
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create form data with correct parameter names
      const formData = new FormData();
      formData.append('email', email);
      formData.append('type', 'beta'); // Specify this is a beta sign-up
      
      // Send data to Google Apps Script
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Apps Script
      });
      
      // Since we're using no-cors, we can't read the response
      // Just assume it worked if no error was thrown
      setSubmitStatus('success');
      
      // Close modal after success message is shown
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-custom-black/70 flex items-center justify-center z-[100] p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-modal-fade-in-scale font-sans"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold font-display text-yellit-dark">Join Our Beta Program</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5 animate-bounce-subtle-once">🎉</div>
              <h4 className="text-2xl font-bold font-display text-gray-800 mb-2">You're In!</h4>
              <p className="text-gray-600 text-base">
                Thanks for signing up! We'll be in touch soon.
              </p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">😥</div>
              <h4 className="text-2xl font-bold font-display text-red-600 mb-2">Oops!</h4>
              <p className="text-gray-600 text-base mb-6">
                Something went wrong. Please try again.
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="w-full bg-yellit-secondary text-yellit-dark font-semibold py-3 px-6 rounded-lg transition-all hover:bg-yellit-accent focus:outline-none focus:ring-2 focus:ring-yellit-accent focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="beta-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email Address
                </label>
                <input
                  id="beta-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-secondary focus:border-yellit-secondary transition-shadow"
                  required
                />
                <p className="mt-2.5 text-sm text-gray-500">
                  Be first to try you'll get it and shape the future of internship matching!
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellit-primary text-yellit-dark font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center transition-all hover:bg-yellit-secondary focus:outline-none focus:ring-2 focus:ring-yellit-secondary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </>
                ) : "Join the Beta"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Employer Contact Modal with Google Apps Script integration
const EmployerContactModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const modalRef = useRef(null);

  // Google Apps Script URL for employer contacts
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyvdmbGD2FBlG6MiDVCffrS4y29vTBZXlRPcnKEeX2ozcS8XuILv7hByAKhj2_32-s/exec';

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, modalRef]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setEmail('');
        setMessage('');
        setErrorMessage('');
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    
    try {
      // Create form data with correct parameter names
      const formData = new FormData();
      formData.append('email', email);
      formData.append('msg', message); // Using 'msg' instead of 'message' as specified
      
      // Send data to Google Apps Script
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Required for Google Apps Script
      });
      
      // Since we're using no-cors, we can't read the response
      // Just assume it worked if no error was thrown
      setSubmitStatus('success');
      
      // Close modal after success message is shown
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-custom-black/70 flex items-center justify-center z-[100] p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-modal-fade-in-scale font-sans"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold font-display text-yellit-dark">Contact Us (Employers)</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5 animate-bounce-subtle-once">👍</div>
              <h4 className="text-2xl font-bold font-display text-gray-800 mb-2">Message Sent!</h4>
              <p className="text-gray-600 text-base">
                Thanks for reaching out! We'll get back to you soon.
              </p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">😥</div>
              <h4 className="text-2xl font-bold font-display text-red-600 mb-2">Oops!</h4>
              <p className="text-gray-600 text-base mb-2">
                {errorMessage || "Something went wrong while sending your message."}
              </p>
              <p className="text-gray-600 text-sm mb-6">Please try again.</p>
              <button
                onClick={() => {
                    setSubmitStatus(null);
                    setErrorMessage('');
                }}
                className="w-full bg-yellit-secondary text-yellit-dark font-semibold py-3 px-6 rounded-lg transition-all hover:bg-yellit-accent focus:outline-none focus:ring-2 focus:ring-yellit-accent focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="employer-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email Address
                </label>
                <input
                  id="employer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-secondary focus:border-yellit-secondary transition-shadow"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="employer-message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="employer-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us a bit about your company and hiring needs..."
                
                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-secondary focus:border-yellit-secondary transition-shadow"
                  required
                />
                <p className="mt-2.5 text-sm text-gray-500">
                  Let's connect to discuss how you'll get it can help you find top intern talent.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-custom-black text-yellit-primary font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellit-secondary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Hero Component
const HeroSection = () => {
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Desktop and mobile background paths
  const desktopBackgroundPath = '/hero-background.svg';
  const mobileBackgroundPath = '/hero-background-mobile.svg'; // Path to your mobile SVG

  // Effect to handle screen resize and set the appropriate background
  useEffect(() => {
    // Check if we're on the client-side
    if (typeof window !== 'undefined') {
      // Function to update based on screen size
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile
      };
      
      // Set initial value
      checkIsMobile();
      
      // Add event listener for resize
      window.addEventListener('resize', checkIsMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);

  // Choose the background based on device type
  const heroBackgroundImagePath = isMobile ? '/herobg2.svg' : '/hero-background.svg';

  return (
    <div 
      className="min-h-screen relative flex flex-col justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackgroundImagePath})`,
        backgroundSize: 'cover', 
        backgroundPosition: isMobile ? 'right center' : 'right center', // Adjust position for mobile
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Container for the text content, positioned on the left */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex items-center flex-grow py-12 sm:py-16 md:py-20">
        <main className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-start text-left"> 
          <div className="mb-6 md:mb-8">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-custom-black uppercase leading-tight">
              Want an internship?
            </h1>
            <div className="relative inline-block mt-2 mb-4 md:mt-4 md:mb-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 ease-in-out self-start">
              <div className="bg-custom-black px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 shadow-2xl">
                <h2 className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-yellit-primary uppercase leading-tight transform rotate-2">
                 you'll get it!
                </h2>
              </div>
            </div>
          </div>
          <p className="font-sans text-sm sm:text-base md:text-lg text-yellit-dark mb-8 md:mb-12 leading-relaxed">
            Your Future Internship is Waiting. Our Beta App Just Needs a Little Push (and Your Feedback).
          </p>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
            <button onClick={() => setShowBetaModal(true)} className="font-sans bg-custom-black text-yellit-primary py-3 px-6 md:py-3.5 md:px-10 rounded-lg font-semibold text-base sm:text-lg md:text-xl transition-all hover:bg-gray-800 w-full sm:w-auto text-center">
              Become a BETA TESTER
            </button>
            <button onClick={() => setShowEmployerModal(true)} className="font-sans bg-white text-custom-black py-3 px-6 md:py-3.5 md:px-10 rounded-lg font-semibold text-base sm:text-lg md:text-xl border-2 border-transparent hover:border-custom-black w-full sm:w-auto text-center">
              I'm an Employer
            </button>
          </div>
        </main>
      </div>
      
      {/* Modals */}
      <BetaTesterModal isOpen={showBetaModal} onClose={() => setShowBetaModal(false)} />
      <EmployerContactModal isOpen={showEmployerModal} onClose={() => setShowEmployerModal(false)} />
    </div>
  );
};

export default HeroSection;