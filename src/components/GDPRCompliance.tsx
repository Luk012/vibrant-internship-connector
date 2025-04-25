import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GDPRCompliance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-background">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h1 className="heading-lg mb-8">GDPR Compliance Statement</h1>
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mt-8 mb-4">Our Commitment to GDPR Compliance</h2>
              <p className="mb-4">
                At InternMate, we are committed to ensuring the privacy and protection of your personal data in compliance with the General Data Protection Regulation (GDPR) and relevant Romanian data protection laws.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Protection Principles</h2>
              <p className="mb-4">
                We adhere to the following principles when processing your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Lawfulness, Fairness, and Transparency:</strong> We process data lawfully, fairly, and in a transparent manner.</li>
                <li className="mb-2"><strong>Purpose Limitation:</strong> We collect data for specified, explicit, and legitimate purposes.</li>
                <li className="mb-2"><strong>Data Minimization:</strong> We limit data collection to what is necessary for the purposes for which it is processed.</li>
                <li className="mb-2"><strong>Accuracy:</strong> We take reasonable steps to ensure personal data is accurate and kept up to date.</li>
                <li className="mb-2"><strong>Storage Limitation:</strong> We retain data only for as long as necessary for the purposes for which it is processed.</li>
                <li className="mb-2"><strong>Integrity and Confidentiality:</strong> We process data in a manner that ensures appropriate security.</li>
                <li className="mb-2"><strong>Accountability:</strong> We are responsible for and can demonstrate compliance with these principles.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Legal Basis for Processing</h2>
              <p className="mb-4">
                We process personal data only when we have a valid legal basis under the GDPR, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Consent</li>
                <li className="mb-2">Contractual necessity</li>
                <li className="mb-2">Legal obligation</li>
                <li className="mb-2">Vital interests</li>
                <li className="mb-2">Public interest</li>
                <li className="mb-2">Legitimate interests</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Subject Rights</h2>
              <p className="mb-4">
                Under the GDPR, you have the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2"><strong>Right to Information:</strong> Receive clear information about how we use your data.</li>
                <li className="mb-2"><strong>Right of Access:</strong> Obtain confirmation that we are processing your data and access your personal data.</li>
                <li className="mb-2"><strong>Right to Rectification:</strong> Have inaccurate personal data corrected or completed if incomplete.</li>
                <li className="mb-2"><strong>Right to Erasure:</strong> Request deletion of your personal data in certain circumstances.</li>
                <li className="mb-2"><strong>Right to Restriction of Processing:</strong> Request restriction of processing in certain circumstances.</li>
                <li className="mb-2"><strong>Right to Data Portability:</strong> Receive your personal data in a structured, commonly used, machine-readable format.</li>
                <li className="mb-2"><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
                <li className="mb-2"><strong>Rights Related to Automated Decision Making and Profiling:</strong> Not be subject to decisions based solely on automated processing that produce legal effects.</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact our Data Protection Officer at dpo@internmate.com.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Protection Officer</h2>
              <p className="mb-4">
                Our Data Protection Officer can be contacted at:
              </p>
              <p className="mb-4">
                [Name of DPO]<br />
                InternMate SRL<br />
                [Your registered address]<br />
                [City, Postal Code]<br />
                Romania<br />
                Email: dpo@internmate.com
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">International Data Transfers</h2>
              <p className="mb-4">
                When we transfer personal data outside the European Economic Area (EEA), we ensure adequate protection through:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">EU Commission adequacy decisions</li>
                <li className="mb-2">Standard contractual clauses</li>
                <li className="mb-2">Binding corporate rules</li>
                <li className="mb-2">Other appropriate safeguards</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Breach Procedures</h2>
              <p className="mb-4">
                We have procedures in place to detect, report, and investigate personal data breaches. In case of a breach that is likely to result in a risk to your rights and freedoms, we will notify the Romanian National Authority for the Supervision of Personal Data Processing (ANSPDCP) and, in high-risk cases, the affected individuals.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Protection Impact Assessment</h2>
              <p className="mb-4">
                We conduct Data Protection Impact Assessments (DPIAs) when processing is likely to result in a high risk to individuals' rights and freedoms, particularly when using new technologies.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Records of Processing Activities</h2>
              <p className="mb-4">
                We maintain records of our data processing activities as required by Article 30 of the GDPR.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions about our GDPR compliance, please contact: Email: contact@youllgetit.eu
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

export default GDPRCompliance;