import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
// Method 1: Using the image tag approach
// No import needed

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 glass' : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center">
            {/* Using img tag to avoid TypeScript errors */}
            <img 
              src="public/Untitled-3 copy.svg" 
              alt="InternMate Logo" 
              className="h-16" 
            />
          </a>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#how-it-works" className="font-medium hover:text-internmate-purple transition-colors">
              How It Works
            </a>
            <a href="#stats" className="font-medium hover:text-internmate-purple transition-colors">
              Stats
            </a>
            <a href="#team" className="font-medium hover:text-internmate-purple transition-colors">
              Team
            </a>
            <a href="#testimonials" className="font-medium hover:text-internmate-purple transition-colors">
              Testimonials
            </a>
            <button className="btn-primary">Get the App</button>
          </nav>
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-internmate-purple" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass">
          <div className="px-4 py-6 space-y-4">
            <a 
              href="#how-it-works" 
              className="block py-2 font-medium hover:text-internmate-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#stats" 
              className="block py-2 font-medium hover:text-internmate-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Stats
            </a>
            <a 
              href="#team" 
              className="block py-2 font-medium hover:text-internmate-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </a>
            <a 
              href="#testimonials" 
              className="block py-2 font-medium hover:text-internmate-purple transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <button className="btn-primary w-full">Get the App</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;