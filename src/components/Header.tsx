import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Update this path to the location of your SVG logo file
const LOGO_SVG_PATH = 'Untitled-3_copy.svg'; // Replace with your actual SVG path

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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBetaModal, setShowBetaModal] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo SVG instead of text */}
        <a href="/" className="flex items-center">
          <img
            src={LOGO_SVG_PATH}
            alt="You'll Get It!"
            className="h-16 w-auto"
          />
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="/" className="font-medium hover:text-yellit-primary transition-colors">
            Home
          </a>
          <a href="/#how-it-works" className="font-medium hover:text-yellit-primary transition-colors">
            How It Works
          </a>
          <a href="/#team" className="font-medium hover:text-yellit-primary transition-colors">
            Team
          </a>
          <a href="/#roadmap" className="font-medium hover:text-yellit-primary transition-colors">
            Roadmap
          </a>
          <button 
            onClick={() => setShowBetaModal(true)} 
            className="font-sans bg-custom-black text-yellit-primary py-2 px-6 rounded-lg font-semibold transition-all hover:bg-gray-800"
          >
            Become a BETA TESTER
          </button>
        </nav>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white">
          <nav className="flex flex-col space-y-4">
            <a href="/" className="font-medium hover:text-yellit-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="/#how-it-works" className="font-medium hover:text-yellit-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </a>
            <a href="/#team" className="font-medium hover:text-yellit-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Team
            </a>
            <a href="/#roadmap" className="font-medium hover:text-yellit-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Roadmap
            </a>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setShowBetaModal(true);
              }} 
              className="font-sans bg-custom-black text-yellit-primary py-2 px-6 rounded-lg font-semibold transition-all hover:bg-gray-800 text-center w-full"
            >
              Become a BETA TESTER
            </button>
          </nav>
        </div>
      )}
      
      {/* Beta Tester Modal */}
      <BetaTesterModal isOpen={showBetaModal} onClose={() => setShowBetaModal(false)} />
    </header>
  );
};

export default Header;