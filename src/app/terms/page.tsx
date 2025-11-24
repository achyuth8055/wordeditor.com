'use client';

import { Navbar } from '../(home)/navbar';
import Link from 'next/link';
import { FileText, AlertCircle, Scale, UserX, Shield } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-600">Last updated: November 24, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to Word Editor Tools (<strong>wordeditor.online</strong>). These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-900 font-semibold">
                <AlertCircle className="w-5 h-5 inline mr-2" />
                Please read these terms carefully before using our services.
              </p>
            </div>

            {/* Acceptance of Terms */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                By accessing and using wordeditor.online (the &quot;Website&quot;), you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of the Website after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* Use of Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserX className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Use of Services</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Permitted Use</h3>
              <p className="text-gray-700 mb-4">You may use our services for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Personal, educational, or commercial text editing and analysis</li>
                <li>Writing assistance and content creation</li>
                <li>Document preparation and optimization</li>
                <li>Learning and improving writing skills</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Prohibited Use</h3>
              <p className="text-gray-700 mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Use the services for any illegal or unauthorized purpose</li>
                <li>Attempt to hack, disrupt, or compromise the Website&apos;s security</li>
                <li>Use automated scripts or bots to scrape or overload our services</li>
                <li>Reproduce, duplicate, or copy any part of the Website without permission</li>
                <li>Upload or process content that is illegal, harmful, or infringes on others&apos; rights</li>
                <li>Transmit viruses, malware, or any malicious code</li>
                <li>Impersonate others or provide false information</li>
                <li>Interfere with other users&apos; use of the services</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Intellectual Property Rights</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Our Content</h3>
              <p className="text-gray-700 mb-4">
                The Website and its original content, features, and functionality are owned by Word Editor Tools and are protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Your Content</h3>
              <p className="text-gray-700 mb-4">
                You retain all rights to the text and content you input into our tools. Since all processing happens locally in your browser, we do not store, access, or claim any rights to your content.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Trademarks</h3>
              <p className="text-gray-700">
                &quot;Word Editor Tools&quot; and our logo are trademarks of wordeditor.online. You may not use these without our prior written consent.
              </p>
            </div>

            {/* User Accounts */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                Currently, most of our tools do not require account registration. For features that do require accounts (such as document saving), you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </div>

            {/* Privacy and Data */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data Processing</h2>
              <p className="text-gray-700 mb-4">
                Our handling of your personal information is governed by our <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>. Key points:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Text processing happens locally in your browser</li>
                <li>We do not store or access your text content</li>
                <li>We use cookies and analytics to improve our services</li>
                <li>We display advertisements through Google AdSense</li>
              </ul>
            </div>

            {/* Third-Party Links */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Links and Services</h2>
              <p className="text-gray-700 mb-4">
                Our Website may contain links to third-party websites or services (such as Paraphraser Pro, Image & PDF Tools) that are not owned or controlled by Word Editor Tools.
              </p>
              <p className="text-gray-700">
                We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be liable for any damage or loss caused by your use of third-party services.
              </p>
            </div>

            {/* Disclaimer of Warranties */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                The services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Word Editor Tools makes no warranties, expressed or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>The services will meet your requirements</li>
                <li>The services will be uninterrupted, timely, secure, or error-free</li>
                <li>The results obtained from using the services will be accurate or reliable</li>
                <li>Any errors in the services will be corrected</li>
              </ul>
              <p className="text-gray-700">
                You use the services at your own risk. We recommend verifying important results manually.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Word Editor Tools shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Loss of profits, data, use, or goodwill</li>
                <li>Service interruption or downtime</li>
                <li>Cost of substitute services</li>
                <li>Any damages resulting from your use of the services</li>
              </ul>
              <p className="text-gray-700">
                Our total liability for any claims shall not exceed the amount you paid to use our services (which is currently $0 as all services are free).
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify and hold harmless Word Editor Tools, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Your use or misuse of the services</li>
                <li>Your violation of these Terms and Conditions</li>
                <li>Your violation of any rights of another party</li>
                <li>Content you submit or process through our services</li>
              </ul>
            </div>

            {/* Service Availability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Service Availability</h2>
              <p className="text-gray-700">
                We strive to provide reliable services but do not guarantee uninterrupted availability. We reserve the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Modify, suspend, or discontinue any aspect of the services at any time</li>
                <li>Impose limits on certain features or restrict access to parts of the services</li>
                <li>Perform maintenance and updates without prior notice</li>
              </ul>
            </div>

            {/* Termination */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your access to the services immediately, without prior notice, for any reason, including if you breach these Terms. Upon termination, your right to use the services will cease immediately.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these Terms or your use of the services shall be resolved in appropriate courts.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
              <p className="text-gray-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </div>

            {/* Entire Agreement */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Entire Agreement</h2>
              <p className="text-gray-700">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Word Editor Tools regarding the use of our services and supersede any prior agreements.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Website:</strong> <a href="https://wordeditor.online" className="text-emerald-600 hover:underline">wordeditor.online</a></li>
                <li><strong>Contact:</strong> Use our <Link href="/contact" className="text-emerald-600 hover:underline">contact page</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/privacy">
            <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors">
              Privacy Policy
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </Link>
          <Link href="/">
            <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
