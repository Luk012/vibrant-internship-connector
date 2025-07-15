import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { X } from 'lucide-react';

/*
  ✅ IMPORT YOUR CARD IMAGES HERE
*/
import card1 from '/card1.png';
import card2 from '/card2.png';
import card3 from '/card1.png';
import card4 from '/card2.png';

const cardImages = [card1, card2, card3, card4];

// ==================================================================================
//  TINDER SWIPE ANIMATION COMPONENTS
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

        {/* Gradient Overlays */}
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
        // Pause before swiping
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) break;

        // Animate swipe right and wait for it to complete
        await animate(x, 250, { type: 'spring', stiffness: 100, damping: 20 });
        if (!isMounted) break;

        // ✅ THE FIX:
        // After the swipe out, update the cards and trigger the "swipe in" animation
        // for the new card *without* awaiting it.
        setCards(prev => [...prev.slice(1), prev[0]]);
        animate(x, 0, { type: 'spring', stiffness: 200, damping: 20 });

        // Pause again before the next swipe
        await new Promise(res => setTimeout(res, 1500));
        if (!isMounted) break;

        // Animate swipe left and wait for it to complete
        await animate(x, -250, { type: 'spring', stiffness: 100, damping: 20 });
        if (!isMounted) break;

        // Trigger the "swipe in" from the left for the next card
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
      {/* Background card stack */}
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
      
      {/* Top Card */}
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
//  MODAL COMPONENTS (Your Original Code)
// ==================================================================================

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
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('type', 'beta');
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      setSubmitStatus('success');
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 font-sans">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Join Our Beta Program</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X size={26} strokeWidth={2.5} />
          </button>
        </div>
        <div className="p-6">
          {submitStatus === 'success' ? (
             <div className="text-center py-8">
               <div className="text-6xl mb-5">🎉</div>
               <h4 className="text-2xl font-bold text-gray-800 mb-2">You're In!</h4>
               <p className="text-gray-600 text-base">
                 Thanks for signing up! We'll be in touch soon.
               </p>
             </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-5">😥</div>
              <h4 className="text-2xl font-bold text-red-600 mb-2">Oops!</h4>
              <p className="text-gray-600 text-base mb-6">
                Something went wrong. Please try again.
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="w-full bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition-all hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
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
                  className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-shadow"
                  required
                />
                <p className="mt-2.5 text-sm text-gray-500">
                  Be first to try you'll get it and shape the future of internship matching!
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-black font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center transition-all hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });
            setSubmitStatus('success');
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 font-sans">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl w-full max-w-lg shadow-xl"
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800">Contact Us (Employers)</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                         <X size={26} strokeWidth={2.5} />
                    </button>
                </div>
                <div className="p-6">
                    {submitStatus === 'success' ? (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-5">👍</div>
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h4>
                            <p className="text-gray-600 text-base">
                                Thanks for reaching out! We'll get back to you soon.
                            </p>
                        </div>
                    ) : submitStatus === 'error' ? (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-5">😥</div>
                            <h4 className="text-2xl font-bold text-red-600 mb-2">Oops!</h4>
                            <p className="text-gray-600 text-base mb-2">
                                {errorMessage || "Something went wrong while sending your message."}
                            </p>
                            <p className="text-gray-600 text-sm mb-6">Please try again.</p>
                            <button
                                onClick={() => {
                                    setSubmitStatus(null);
                                    setErrorMessage('');
                                }}
                                className="w-full bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition-all hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
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
                                    className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-shadow"
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
                                    rows="4"
                                    className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-shadow"
                                    required
                                />
                                <p className="mt-2.5 text-sm text-gray-500">
                                    Let's connect to discuss how you'll get it can help you find top intern talent.
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
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


// ==================================================================================
//  THE REDESIGNED HERO COMPONENT
// ==================================================================================

const HeroSection = () => {
  const [showBetaModal, setShowBetaModal] = useState(false);
  const [showEmployerModal, setShowEmployerModal] = useState(false);

  return (
    <div className="min-h-screen bg-#FAE959 text-black flex items-center justify-center font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-20 items-center">
          <main className="text-left flex flex-col items-start">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold uppercase tracking-tighter leading-none">
              WANT AN
              <br />
              INTERNSHIP?
            </h1>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold uppercase tracking-tighter leading-none mt-2" style={{color: '#FFD400'}}>
              YOU'LL GET IT!
            </h2>
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-md">
              Your future internship is waiting. Our Beta App just needs a little push (and your feedback).
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setShowBetaModal(true)}
                className="bg-black text-white py-3.5 px-8 rounded-xl font-semibold text-lg w-full sm:w-auto transition-transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Become a BETA TESTER
              </button>
              <button
                onClick={() => setShowEmployerModal(true)}
                className="bg-gray-100 text-black py-3.5 px-8 rounded-xl font-semibold text-lg w-full sm:w-auto transition-all hover:bg-gray-200 hover:scale-105"
              >
                I'm an Employer
              </button>
            </div>
          </main>
          <aside className="w-full flex justify-center items-center h-full">
            <CardStack />
          </aside>
        </div>
      </div>
      <BetaTesterModal isOpen={showBetaModal} onClose={() => setShowBetaModal(false)} />
      <EmployerContactModal isOpen={showEmployerModal} onClose={() => setShowEmployerModal(false)} />
    </div>
  );
};

export default HeroSection;