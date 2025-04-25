import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const FooterWithButtons = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowCookieBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookies-accepted', 'false');
    setShowCookieBanner(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Reset submission status when user changes input
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4 md:flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700 mb-4 md:mb-0 md:mr-8">
            <p className="mb-1 font-medium">We use cookies to improve your experience.</p>
            <p>
              By continuing to use our site, you consent to our use of cookies in accordance with our{' '}
              <a href="/terms" className="text-yellit-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/cookie-policy" className="text-yellit-primary hover:underline">
                Cookie Policy
              </a>.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={acceptCookies}
              className="btn-primary text-sm py-2"
            >
              Accept
            </button>
            <button
              onClick={declineCookies}
              className="btn-secondary text-sm py-2"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Main Footer with white background */}
      <footer className="bg-white text-gray-800 py-16 border-t border-gray-200">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-yellit-primary">You'll Get It!</h3>
              <p className="opacity-80">
                Matching students with internships that actually make sense for their future.
              </p>
              <div className="flex space-x-4 pt-2">
                {/* Social media icons */}
                <a href="#" className="text-gray-500 hover:text-yellit-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellit-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellit-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellit-primary transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">Legal Documents</h4>
              <div className="flex flex-col space-y-3">
                <a href="/terms" className="inline-block">
                  <button className="w-full bg-white border border-gray-300 text-yellit-primary font-medium rounded-lg py-2 px-4 hover:bg-gray-50 hover:border-yellit-primary transition-colors">
                    Terms of Service
                  </button>
                </a>
                <a href="/cookie-policy" className="inline-block">
                  <button className="w-full bg-white border border-gray-300 text-yellit-primary font-medium rounded-lg py-2 px-4 hover:bg-gray-50 hover:border-yellit-primary transition-colors">
                    Cookie Policy
                  </button>
                </a>
                <a href="/gdpr" className="inline-block">
                  <button className="w-full bg-white border border-gray-300 text-yellit-primary font-medium rounded-lg py-2 px-4 hover:bg-gray-50 hover:border-yellit-primary transition-colors">
                    GDPR Compliance
                  </button>
                </a>
                <a href="/ai-usage" className="inline-block">
                  <button className="w-full bg-white border border-gray-300 text-yellit-primary font-medium rounded-lg py-2 px-4 hover:bg-gray-50 hover:border-yellit-primary transition-colors">
                    AI Usage Policy
                  </button>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">Company Info</h4>
              <ul className="space-y-2 text-gray-600">
                <li>YOU'LL GET IT S.R.L.</li>
                <li>Reg. No: J2025027781008</li>
                <li>CUI: 51649682</li>
                <li>EUID: ROONRC.J2025027781008</li>
                <li>
                  <a href="mailto:contact@youllgetit.eu" className="hover:text-yellit-primary transition-colors">
                    contact@youllgetit.eu
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">Stay updated</h4>
              <p className="text-gray-600">
                Subscribe to our newsletter for internship tips and app updates.
              </p>
              <form onSubmit={handleSubmit} className="mt-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full py-3 px-4 rounded-full bg-gray-100 border ${
                      submitStatus === 'error' ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellit-primary/50`}
                    disabled={isSubmitting}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-1 top-1 bg-yellit-primary text-white p-2 rounded-full hover:bg-yellit-secondary transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
                {submitStatus === 'success' && (
                  <p className="mt-2 text-sm text-green-600">Thank you for subscribing!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-2 text-sm text-red-600">Failed to subscribe. Please try again later.</p>
                )}
              </form>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-lg font-medium text-gray-700">Still scrolling? Just download the app already 👀</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-yellit-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellit-secondary transition-colors">
                App Store
              </button>
              <button className="bg-yellit-secondary text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellit-primary transition-colors">
                Google Play
              </button>
            </div>
          </div>

          {/* Legal links section as per Romanian law requirements */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
              <h5 className="font-bold text-gray-800 mb-2">ALTERNATIVE DISPUTE RESOLUTION</h5>
              <a href="https://reclamatiisal.anpc.ro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white hover:bg-gray-100 border border-gray-300 rounded-md p-3 transition-colors">
                <div className="flex items-center">
                  <img src="/images/anpc-logo.png" alt="ANPC Logo" className="h-8 mr-3" onError={(e) => e.currentTarget.style.display = 'none'} />
                  <span className="text-yellit-primary font-medium">DETAILS</span>
                </div>
              </a>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 bg-gray-50">
              <h5 className="font-bold text-gray-800 mb-2">ONLINE DISPUTE RESOLUTION</h5>
              <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white hover:bg-gray-100 border border-gray-300 rounded-md p-3 transition-colors">
                <div className="flex items-center">
                  <span className="text-yellit-primary font-medium">DETAILS</span>
                </div>
              </a>
            </div>
          </div>

          {/* Romanian legal information block - translated to English */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h5 className="font-bold text-sm text-gray-800 mb-2">COMPANY INFORMATION as per Article 110 (4) of Law no. 265/2022</h5>
            <div className="text-xs text-gray-600 space-y-1">
              <p className="font-semibold">YOU'LL GET IT S.R.L.</p>
              <p><span className="font-medium">Trade Register Number:</span> J2025027781008, assigned on 16.04.2025</p>
              <p><span className="font-medium">European Unique Identifier (EUID):</span> ROONRC.J2025027781008</p>
              <p><span className="font-medium">Unique Registration Code:</span> 51649682</p>
              <p><span className="font-medium">Registration Certificate:</span> B5281191, issued on 22.04.2025, delivered on 22.04.2025</p>
              <p><span className="font-medium">Registered Office Address:</span> Bucharest, Sector 1, GHEORGHE SIMIONESCU, No. 19, Apartment B26</p>
              <p><span className="font-medium">Email Address:</span> contact@youllgetit.eu</p>
              <p><span className="font-medium">Company Status:</span> Active</p>
              <p><span className="font-medium">Legal Form:</span> Limited Liability Company</p>
              <p><span className="font-medium">Date of Last Trade Register Entry:</span> 22.04.2025</p>
              <p><span className="font-medium">Company Duration:</span> Unlimited</p>
              <p><span className="font-medium">Subscribed Share Capital:</span> 2000 LEI, fully paid</p>
              <p><span className="font-medium">Number of Social Parts:</span> 2000</p>
              <p><span className="font-medium">Value of One Social Part:</span> 1 LEI</p>
            </div>
          </div>

          <p className="mt-8 text-sm text-center text-gray-500">
            © {new Date().getFullYear()} you'll get it. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default FooterWithButtons;