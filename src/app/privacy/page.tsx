'use client';

import { Navbar } from '../(home)/navbar';
import Link from 'next/link';
import { Shield, Eye, Lock, Database, Cookie, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Last updated: November 24, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Word Editor Tools (<strong>wordeditor.online</strong>), we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
            </p>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-8">
              <p className="text-emerald-900 font-semibold">
                <Lock className="w-5 h-5 inline mr-2" />
                Privacy First: Your text and data are processed locally in your browser and are never stored on our servers.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1 Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Text Content:</strong> When you use our text tools (Word Counter, Text Analyzer, etc.), all text processing happens locally in your browser. We do not store, transmit, or have access to your text content.</li>
                <li><strong>Contact Information:</strong> If you contact us through our contact form, we collect your name and email address solely for the purpose of responding to your inquiry.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">1.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Usage Data:</strong> We use Google Analytics to collect anonymous usage statistics including pages visited, time spent on site, and general geographic location (country/city level).</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution for optimization purposes.</li>
                <li><strong>IP Address:</strong> Temporarily processed for analytics and security purposes, but not stored permanently.</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>To provide and maintain our text editing tools and services</li>
                <li>To improve and optimize our website and user experience</li>
                <li>To analyze usage patterns and develop new features</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To detect and prevent fraud, abuse, or security issues</li>
                <li>To comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </div>

            {/* Data Processing */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Local Data Processing</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                All text processing for our tools (Word Counter, Character Counter, Typing Test, Text Analyzer, etc.) happens entirely in your web browser using JavaScript. This means:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Your text never leaves your device</li>
                <li>We cannot see, store, or access your content</li>
                <li>All calculations and analysis are performed locally</li>
                <li>Your privacy is protected by design</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Cookies and Tracking</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Google Analytics to understand how visitors use our site</li>
                <li><strong>Advertising Cookies:</strong> Google AdSense may use cookies to display relevant ads</li>
              </ul>
              <p className="text-gray-700">
                You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Third-Party Services</h2>
              </div>
              
              <p className="text-gray-700 mb-4">We use the following third-party services:</p>
              <ul className="list-disc pl-6 mb-4 space-y-3 text-gray-700">
                <li>
                  <strong>Google Analytics:</strong> To analyze website traffic and usage patterns. 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-1">
                    Google's Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Google AdSense:</strong> To display advertisements on our website. 
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-1">
                    Google's Ad Policy
                  </a>
                </li>
                <li>
                  <strong>External Links:</strong> Our site contains links to external services (Paraphraser Pro, Image & PDF Tools). We are not responsible for their privacy practices.
                </li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                Since we process text locally in your browser, we do not retain any of your text content. Analytics data is retained according to Google Analytics' standard retention policies. Contact information from inquiries is kept for up to 2 years or until you request deletion.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Disable cookies through your browser settings</li>
                <li>Object to processing of your personal data</li>
              </ul>
            </div>

            {/* Children's Privacy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are available to users of all ages. We do not knowingly collect personal information from children under 13 without parental consent. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </div>

            {/* International Users */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
              <p className="text-gray-700">
                Our website is accessible globally. If you access our services from outside your country, your information may be processed in different jurisdictions. By using our services, you consent to such transfers.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Website:</strong> <a href="https://wordeditor.online" className="text-emerald-600 hover:underline">wordeditor.online</a></li>
                <li><strong>Email:</strong> Contact us through our <Link href="/contact" className="text-emerald-600 hover:underline">contact page</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/terms">
            <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors">
              Terms of Service
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
