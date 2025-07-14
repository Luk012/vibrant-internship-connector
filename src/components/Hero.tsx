import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { X } from 'lucide-react';

// --- BRUTALIST BUTTON ICON COMPONENTS ---

const GooglePlayBrutalistIcon = () => (
  <div className="brutalist-logo">
    <svg
      viewBox="0 0 512 512"
      className="brutalist-svg"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"
      ></path>
    </svg>
  </div>
);

const AppleBrutalistIcon = () => (
  <div className="brutalist-logo">
    <svg
      fill="currentColor"
      viewBox="-52.01 0 560.035 560.035"
      xmlns="http://www.w3.org/2000/svg"
      className="brutalist-svg"
    >
      <path
        d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"
      ></path>
    </svg>
  </div>
);

const BrutalistButton = ({ href, icon, textLine1, textLine2 }) => (
  <a href={href} className="brutalist-button">
    {icon}
    <div className="button-text">
      <span>{textLine1}</span>
      <span>{textLine2}</span>
    </div>
  </a>
);

// --- MODAL COMPONENTS (Restored) ---
const BetaTesterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const modalRef = useRef(null);
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPJtAefgTMeEmQYm4WEoMiHCJzfktRfi3MAzW9awuoBSHMRyUbd8dCFyDW7R3qeMaC/exec';

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
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
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('type', 'beta');
      await fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
      setSubmitStatus('success');
      setTimeout(() => onClose(), 2500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
      <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-modal-fade-in-scale font-sans">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold font-display text-yellit-dark">Join Our Beta Program</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
            <X size={26} strokeWidth={2.5} />
          </button>
        </div>
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">🎉</div>
              <h4 className="text-2xl font-bold font-display text-gray-800 mb-2">You're In!</h4>
              <p className="text-gray-600 text-base">Thanks for signing up! We'll be in touch soon.</p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">😥</div>
              <h4 className="text-2xl font-bold font-display text-red-600 mb-2">Oops!</h4>
              <p className="text-gray-600 text-base mb-6">Something went wrong. Please try again.</p>
              <button onClick={() => setSubmitStatus(null)} className="w-full bg-yellit-secondary text-yellit-dark font-semibold py-3 px-6 rounded-lg">Try Again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="beta-email" className="block text-sm font-medium text-gray-700 mb-2">Your Email Address</label>
                <input id="beta-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-3.5 border border-gray-300 rounded-lg" required />
                <p className="mt-2.5 text-sm text-gray-500">Be first to try you'll get it and shape the future of internship matching!</p>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-yellit-primary text-yellit-dark font-semibold py-3.5 px-6 rounded-lg disabled:opacity-70">
                {isSubmitting ? 'Signing up...' : "Join the Beta"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const EmployerContactModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const modalRef = useRef(null);
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyvdmbGD2FBlG6MiDVCffrS4y29vTBZXlRPcnKEeX2ozcS8XuILv7hByAKhj2_32-s/exec';

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
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
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('msg', message);
      await fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
      setSubmitStatus('success');
      setTimeout(() => onClose(), 2500);
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
      <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-modal-fade-in-scale font-sans">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold font-display text-yellit-dark">Contact Us (Employers)</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
             <X size={26} strokeWidth={2.5} />
          </button>
        </div>
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">👍</div>
              <h4 className="text-2xl font-bold font-display text-gray-800 mb-2">Message Sent!</h4>
              <p className="text-gray-600 text-base">Thanks for reaching out! We'll get back to you soon.</p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">😥</div>
              <h4 className="text-2xl font-bold font-display text-red-600 mb-2">Oops!</h4>
              <p className="text-gray-600 text-base mb-2">{errorMessage || "Something went wrong."}</p>
              <button onClick={() => setSubmitStatus(null)} className="w-full bg-yellit-secondary text-yellit-dark font-semibold py-3 px-6 rounded-lg">Try Again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="employer-email" className="block text-sm font-medium text-gray-700 mb-2">Your Email Address</label>
                <input id="employer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full p-3.5 border border-gray-300 rounded-lg" required />
              </div>
              <div className="mb-6">
                <label htmlFor="employer-message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea id="employer-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your company..." className="w-full p-3.5 border border-gray-300 rounded-lg" required />
                <p className="mt-2.5 text-sm text-gray-500">Let's connect to discuss how you'll get it can help you find top intern talent.</p>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-black text-yellit-primary font-semibold py-3.5 px-6 rounded-lg disabled:opacity-70">
                {isSubmitting ? 'Sending...' : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ANIMATED TITLE ---
const AnimatedTitle = forwardRef((props, ref) => (
  <div ref={ref} className="relative inline-block mt-2 mb-4 md:mt-4 md:mb-6 cursor-pointer">
    <h2 className="animated-title-text font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-black leading-tight animate-fade-in-up">
      you'll get it!
    </h2>
  </div>
));

// --- MAIN HERO COMPONENT ---
const HeroSection = () => {
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animatedTitleRef = useRef(null);

  const heroBackgroundImagePath = isMobile ? '/herobg2.svg' : '/hero-background.svg';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);

  return (
    <div
      className="min-h-screen relative flex flex-col justify-center overflow-hidden font-sans"
      style={{
        backgroundImage: `url(${heroBackgroundImagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex items-center flex-grow py-12 sm:py-16 md:py-20">
        <main className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl flex flex-col items-start text-left">
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-custom-black leading-tight lowercase">
              want an internship?
            </h1>
            <AnimatedTitle ref={animatedTitleRef} />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-yellit-dark mb-8 md:mb-12 leading-relaxed lowercase">
            your future internship is waiting. our beta app just needs a little push (and your feedback).
          </p>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full mb-8">
            <button onClick={() => setShowBetaModal(true)} className="bg-black text-yellit-primary py-3 px-6 md:py-3.5 md:px-10 rounded-lg font-semibold text-base sm:text-lg md:text-xl transition-all hover:bg-gray-800 w-full sm:w-auto text-center lowercase">
              become a beta tester
            </button>
            <button onClick={() => setShowEmployerModal(true)} className="bg-white text-black py-3 px-6 md:py-3.5 md:px-10 rounded-lg font-semibold text-base sm:text-lg md:text-xl border-2 border-transparent hover:border-black w-full sm:w-auto text-center lowercase">
              i'm an employer
            </button>
          </div>

          {/* --- BRUTALIST DOWNLOAD BUTTONS --- */}
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-6 w-full">
            <BrutalistButton 
              href="#_googleplay"
              icon={<GooglePlayBrutalistIcon />}
              textLine1="GET IT ON"
              textLine2="Google Play"
            />
            <BrutalistButton 
              href="#_appstore"
              icon={<AppleBrutalistIcon />}
              textLine1="Download on the"
              textLine2="App Store"
            />
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
