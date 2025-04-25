import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h1 className="heading-lg mb-8">Cookie Policy</h1>
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
              <p className="mb-4">
                This Cookie Policy explains how you'll get it ("we," "our," or "us") uses cookies and similar technologies on our website and mobile application (collectively, the "Platform").
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the Platform to function properly and cannot be switched off in our systems. They are usually set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Performance/Analytics Cookies</h3>
              <p className="mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Platform. They help us know which pages are the most and least popular and see how visitors move around the Platform.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Functionality Cookies</h3>
              <p className="mb-4">
                These cookies enable the Platform to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Targeting/Advertising Cookies</h3>
              <p className="mb-4">
                These cookies may be set through our Platform by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Cookies</h2>
              <p className="mb-4">
                We may allow third parties to place cookies on your device when you use our Platform. These third parties may include analytics providers, advertising networks, and social media platforms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Your Cookie Choices</h2>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impact your overall user experience.
              </p>
              <p className="mb-4">
                To opt out of being tracked by Google Analytics across all websites, visit http://tools.google.com/dlpage/gaoptout.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Cookie List</h2>
              <p className="mb-4">
                Below is a list of the cookies we use:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">Cookie Name</th>
                      <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">Type</th>
                      <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">Purpose</th>
                      <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">cookies-accepted</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Essential</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Stores your cookie consent preferences</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">session</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Essential</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Maintains your session state</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">_ga</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Analytics</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Google Analytics - Distinguishes users</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">2 years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">_gid</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Analytics</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Google Analytics - Distinguishes users</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">24 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">_gat</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Analytics</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">Google Analytics - Throttles request rate</td>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">1 minute</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Cookie Policy</h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time. The updated version will be indicated by an updated "Last Updated" date.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Cookie Policy, please contact us at contact@youllgetit.eu.
              </p>

              <p className="mb-4">
                <strong>Last Updated:</strong> April 9, 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;