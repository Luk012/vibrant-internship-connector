import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h1 className="heading-lg mb-8">Terms of Service</h1>
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
              <p className="mb-4">
                These Terms of Service ("Terms") govern your access to and use of InternMate's website and mobile application (collectively, the "Platform"). Please read these Terms carefully before using our Platform.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Platform.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Eligibility</h2>
              <p className="mb-4">
                You must be at least 16 years old to use our Platform. By using our Platform, you represent and warrant that you meet this requirement.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Account Registration</h2>
              <p className="mb-4">
                To access certain features of our Platform, you must register for an account. When you register, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Provide accurate, current, and complete information</li>
                <li className="mb-2">Maintain and promptly update your account information</li>
                <li className="mb-2">Keep your password secure and confidential</li>
                <li className="mb-2">Be responsible for all activities that occur under your account</li>
              </ul>
              <p className="mb-4">
                We reserve the right to disable any account if we believe you have violated these Terms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Platform Use and Restrictions</h2>
              <p className="mb-4">
                You may use our Platform only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Use the Platform in any way that violates applicable laws or regulations</li>
                <li className="mb-2">Impersonate any person or entity or misrepresent your affiliation</li>
                <li className="mb-2">Engage in any conduct that restricts or inhibits anyone's use of the Platform</li>
                <li className="mb-2">Attempt to gain unauthorized access to any part of the Platform</li>
                <li className="mb-2">Use any robot, spider, or other automated device to access the Platform except for search engines and public archives</li>
                <li className="mb-2">Use the Platform to send unsolicited communications</li>
                <li className="mb-2">Harvest or collect email addresses or other contact information</li>
                <li className="mb-2">Use the Platform for any commercial purpose not expressly approved by us</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property Rights</h2>
              <p className="mb-4">
                The Platform and its content, features, and functionality are owned by InternMate and are protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">User Content</h2>
              <p className="mb-4">
                You retain any rights you may have in content you submit to the Platform ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content.
              </p>
              <p className="mb-4">
                You represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">You own or have the necessary rights to your User Content</li>
                <li className="mb-2">Your User Content does not violate the rights of any third party</li>
                <li className="mb-2">Your User Content complies with these Terms and applicable laws</li>
              </ul>
              <p className="mb-4">
                We reserve the right to remove any User Content that violates these Terms or that we find objectionable.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Links and Content</h2>
              <p className="mb-4">
                The Platform may contain links to third-party websites or services. We do not control or endorse these websites or services and are not responsible for their content, privacy policies, or practices.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimer of Warranties</h2>
              <p className="mb-4 uppercase">
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
              <p className="mb-4 uppercase">
                TO THE FULLEST EXTENT PERMITTED BY LAW, INTERNMATE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE PLATFORM.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless InternMate and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or relating to your use of the Platform or violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of Romania, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Dispute Resolution</h2>
              <p className="mb-4">
                Any dispute arising out of or relating to these Terms or the Platform shall be resolved by the courts of Romania.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to These Terms</h2>
              <p className="mb-4">
                We may update these Terms from time to time. The updated version will be indicated by an updated "Last Updated" date.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your access to the Platform immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Severability</h2>
              <p className="mb-4">
                If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Entire Agreement</h2>
              <p className="mb-4">
                These Terms constitute the entire agreement between you and InternMate regarding the Platform.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at legal@internmate.com.
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

export default TermsOfService;