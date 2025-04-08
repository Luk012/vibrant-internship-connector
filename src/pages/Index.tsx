import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import WhyUs from '../components/WhyUs';
import PufferfishSymbolismSection from '../components/PufferfishSymbolismSection';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <WhyUs />
      <PufferfishSymbolismSection />
  
      <Team />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;