import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Send, Mail, MessageCircle, HelpCircle, Bug, Lightbulb, Trash2, Users } from 'lucide-react';

const ContactSupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  // Google Apps Script URL for support contacts
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyvdmbGD2FBlG6MiDVCffrS4y29vTBZXlRPcnKEeX2ozcS8XuILv7hByAKhj2_32-s/exec';

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'support', label: 'Technical Support', icon: HelpCircle },
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'data-deletion', label: 'Data Deletion', icon: Trash2 },
    { value: 'partnership', label: 'Partnership', icon: Users }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      alert("Please fill in all required fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submitData = new FormData();
      submitData.append('email', email);
      submitData.append('msg', `Name: ${name}\nSubject: ${subject}\nCategory: ${formData.category || 'Not specified'}\n\nMessage:\n${message}`);
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: submitData,
        mode: 'no-cors'
      });
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
      
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-16">
              <h1 className="heading-lg mb-6">Contact & Support<span className="text-yellit-primary">.</span></h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions, suggestions, or need help? We're here for you! Send us a message and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              <div className="lg:col-span-2">
                <div ref={formRef} className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="text-green-600 mr-3">✓</div>
                        <div>
                          <h4 className="font-medium text-green-800">Message sent successfully!</h4>
                          <p className="text-green-700 text-sm">Thanks for reaching out! We'll get back to you within 24 hours.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="text-red-600 mr-3">✗</div>
                        <div>
                          <h4 className="font-medium text-red-800">Something went wrong</h4>
                          <p className="text-red-700 text-sm">Please try again or email us directly at contact@youllgetit.eu</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-primary focus:border-transparent transition-shadow"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-primary focus:border-transparent transition-shadow"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((cat) => {
                          const IconComponent = cat.icon;
                          return (
                            <label
                              key={cat.value}
                              className={`relative flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                formData.category === cat.value
                                  ? 'border-yellit-primary bg-yellit-primary/10'
                                  : 'border-gray-200 hover:border-yellit-primary/50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="category"
                                value={cat.value}
                                checked={formData.category === cat.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <IconComponent size={20} className={formData.category === cat.value ? 'text-yellit-primary' : 'text-gray-400'} />
                              <span className={`text-xs mt-1 text-center ${formData.category === cat.value ? 'text-yellit-primary font-medium' : 'text-gray-600'}`}>
                                {cat.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {formData.category === 'data-deletion' && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Data Deletion Request:</strong> Please include your email address and specify what data you'd like us to delete. We'll process your request in accordance with GDPR within 30 days.
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-primary focus:border-transparent transition-shadow"
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellit-primary focus:border-transparent transition-shadow resize-y"
                        placeholder="Tell us more about your question, issue, or suggestion..."
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-custom-black text-yellit-primary font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellit-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="space-y-8">
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Get in touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="text-yellit-primary mt-1 mr-3" size={18} />
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <a href="mailto:contact@youllgetit.eu" className="text-yellit-primary hover:underline">
                          contact@youllgetit.eu
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MessageCircle className="text-yellit-primary mt-1 mr-3" size={18} />
                      <div>
                        <p className="font-medium text-gray-800">Response Time</p>
                        <p className="text-gray-600 text-sm">Usually within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellit-primary/10 rounded-2xl p-6 border border-yellit-primary/20">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Need quick answers?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Check out our roadmap and mission to learn more about what we're building.
                  </p>
                  <div className="space-y-2">
                    <a href="/#roadmap" className="block text-yellit-primary hover:underline font-medium">
                      → View our roadmap
                    </a>
                    <a href="/#team" className="block text-yellit-primary hover:underline font-medium">
                      → Meet the team
                    </a>
                  </div>
                </div>

                <div className="bg-custom-black rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Join our Beta!</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Be among the first to try you'll get it and help shape the future of internship matching.
                  </p>
                  <a 
                    href="/#" 
                    className="inline-block bg-yellit-primary text-custom-black font-semibold py-2 px-4 rounded-lg hover:bg-yellit-secondary transition-colors"
                  >
                    Become a Beta Tester
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactSupportPage;