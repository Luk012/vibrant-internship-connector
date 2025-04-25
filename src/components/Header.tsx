import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Update this path to the location of your SVG logo file
const LOGO_SVG_PATH = 'Untitled-3_copy.svg'; // Replace with your actual SVG path

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <a href="/" className="btn-primary">
            Sign Up
          </a>
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
            <a href="/#roadmap" className="font-medium hover:text-yellit-primary transition-colors">
            Roadmap
          </a>
            <a href="/" className="btn-primary inline-block text-center" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;