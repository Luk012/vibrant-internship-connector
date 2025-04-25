import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AIUsagePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h1 className="heading-lg mb-8">AI Usage Policy</h1>
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
              <p className="mb-4">
                At InternMate, we use artificial intelligence (AI) technologies to enhance our services. This policy explains how we use AI, the data involved, and your rights related to AI-assisted processing.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use AI</h2>
              <p className="mb-4">
                Our Platform uses AI for the following purposes:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">
                  <strong>Internship Matching:</strong> We analyze your profile, preferences, and qualifications to match you with relevant internship opportunities. Our AI system considers factors such as your skills, education, career goals, and previous experience to provide personalized internship recommendations.
                </li>
                <li className="mb-2">
                  <strong>Content Processing:</strong> We process and categorize internship listings to improve searchability and relevance. Our AI helps classify internship opportunities by industry, required skills, location, and other key attributes to make them easier to find.
                </li>
                <li className="mb-2">
                  <strong>User Experience Optimization:</strong> We analyze usage patterns to improve the functionality and user experience of our Platform. This helps us identify which features are most valuable and how we can better serve our users.
                </li>
              </ol>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Used for AI Processing</h2>
              <p className="mb-4">
                Our AI systems process the following types of data:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">
                  <strong>User-Provided Information:</strong> Profile data, qualifications, preferences, and other information you provide when creating and using your account. This includes your educational background, skills, work experience, career interests, and preferences for internship opportunities.
                </li>
                <li className="mb-2">
                  <strong>Internship Information:</strong> Data about internship opportunities collected from publicly available sources. This includes details such as job descriptions, required qualifications, company information, location, and application deadlines.
                </li>
                <li className="mb-2">
                  <strong>Usage Data:</strong> Information about how you interact with our Platform, such as search queries, time spent on different sections, interactions with internship listings, and application behavior. This data is always anonymized for analytical purposes.
                </li>
              </ol>

              <h2 className="text-2xl font-bold mt-8 mb-4">Our AI Principles</h2>
              <p className="mb-4">
                We adhere to the following principles in our AI usage:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">
                  <strong>Transparency:</strong> We are open about when and how we use AI. We believe you should know when you're interacting with or being impacted by AI systems.
                </li>
                <li className="mb-2">
                  <strong>Fairness:</strong> We design our AI systems to avoid unfair bias and discrimination. We regularly audit our algorithms and data to identify and mitigate potential biases, particularly in our matching processes.
                </li>
                <li className="mb-2">
                  <strong>Human Oversight:</strong> Our AI systems are subject to human oversight and review. While AI handles much of the data processing, humans review the system's performance and make improvements.
                </li>
                <li className="mb-2">
                  <strong>Data Minimization:</strong> We limit the data processed by our AI systems to what is necessary. We don't collect or process data beyond what's needed to provide and improve our services.
                </li>
                <li className="mb-2">
                  <strong>Security:</strong> We implement appropriate technical and organizational measures to secure AI systems and the data they process. We use industry-standard security practices to protect your information.
                </li>
              </ol>

              <h2 className="text-2xl font-bold mt-8 mb-4">Automated Decision-Making</h2>
              <p className="mb-4">
                Some aspects of our service involve automated decision-making, such as suggesting internship matches. In accordance with Article 22 of the GDPR:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">
                  <strong>Scope:</strong> We use automated processing to suggest internships based on your profile, but final decisions on applications remain with you and the internship providers. Our AI system recommends opportunities, but does not make final decisions about hiring or rejections.
                </li>
                <li className="mb-2">
                  <strong>Safeguards:</strong> We implement suitable measures to safeguard your rights, freedoms, and legitimate interests. This includes ensuring that our matching algorithms don't systematically disadvantage any particular groups.
                </li>
                <li className="mb-2">
                  <strong>Human Intervention:</strong> You have the right to obtain human intervention, express your point of view, and contest any automated decisions by contacting us at ai@internmate.com. If you believe our AI system has made an error in its recommendations, our team is available to review and address your concerns.
                </li>
              </ol>

              <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
              <p className="mb-4">
                In addition to the rights outlined in our Privacy Policy, you have specific rights related to AI processing:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">
                  <strong>Right to Explanation:</strong> You can request meaningful information about the logic involved in automated decisions affecting you. We'll explain in clear terms how our AI makes recommendations based on your profile.
                </li>
                <li className="mb-2">
                  <strong>Right to Object:</strong> You can object to AI-assisted processing of your personal data in certain circumstances. If you have legitimate grounds relating to your particular situation, you can contact us to object to this processing.
                </li>
                <li className="mb-2">
                  <strong>Right to Human Review:</strong> You can request human review of decisions made solely by automated means that have legal or similarly significant effects. Our team will manually review any automated decisions upon your request.
                </li>
              </ol>

              <h2 className="text-2xl font-bold mt-8 mb-4">Continuous Improvement</h2>
              <p className="mb-4">
                We continuously monitor and evaluate our AI systems to ensure they operate as intended and to identify and address any unintended consequences or biases. We regularly update our algorithms based on new information, user feedback, and technology advancements to improve accuracy and fairness.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">AI and Web Scraping</h2>
              <p className="mb-4">
                Our AI systems may process internship data collected through automated means from publicly available sources. We conduct this collection in accordance with our Web Scraping Disclosure, respecting robots.txt files and website terms of service. The collected data is limited to relevant internship information and does not include personal data of individuals.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this AI Usage Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Last Updated" date at the top of this policy. We encourage you to review this policy periodically to stay informed about how we use AI technologies.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about our AI usage or wish to exercise your rights related to AI processing, please contact: contact@youllgetit.eu
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

export default AIUsagePolicy;