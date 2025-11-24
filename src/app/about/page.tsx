'use client';

import { Navbar } from '../(home)/navbar';
import Link from 'next/link';
import { Target, Users, Award, Heart, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Word Editor Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering writers, students, and professionals with free, powerful text editing and analysis tools since 2024.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At Word Editor Tools, our mission is to provide accessible, high-quality text editing and analysis tools to everyone, completely free of charge. We believe that powerful writing tools shouldn&apos;t be locked behind paywalls or complicated software installations.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you&apos;re a student working on an essay, a professional crafting important documents, or a content creator optimizing your writing, our suite of tools is designed to make your work easier, faster, and more effective.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Efficient Tools</h3>
              <p className="text-gray-700">
                Our tools are built with performance in mind. Get instant results with real-time processing, whether you&apos;re counting words, analyzing readability, or testing your typing speed.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Focused</h3>
              <p className="text-gray-700">
                Your text never leaves your browser. All processing happens locally on your device, ensuring your content remains private and secure. We don&apos;t store or track your text data.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Built for Everyone</h3>
              <p className="text-gray-700">
                From students and educators to professional writers and content creators, our tools are designed to meet diverse needs with an intuitive, user-friendly interface.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Always Free</h3>
              <p className="text-gray-700">
                No hidden fees, no subscriptions, no credit cards. All our tools are completely free to use forever. We believe in making quality writing tools accessible to everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Our Tools */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Complete Tool Suite</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Word Counter - Count words, characters, and sentences instantly',
              'Character Counter - Detailed character analysis with breakdowns',
              'Typing Test - Measure and improve your typing speed',
              'Reading Time Calculator - Estimate reading duration',
              'Text Analyzer - Get readability scores and keyword density',
              'Case Converter - Transform text between different cases',
              'Text Diff Checker - Compare texts and highlight differences',
              'Placeholder Text Generator - Create sample text for designs',
              'Markdown Preview - Write and preview Markdown in real-time',
            ].map((tool, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">{tool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Accessibility</h3>
              <p className="text-gray-700">
                We believe powerful tools should be available to everyone, regardless of their budget or technical expertise.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Privacy</h3>
              <p className="text-gray-700">
                Your data is yours. We process everything locally and never store or share your content.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Innovation</h3>
              <p className="text-gray-700">
                We continuously improve and add new features based on user feedback and emerging needs.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Simplicity</h3>
              <p className="text-gray-700">
                Complex functionality with simple interfaces. Our tools are powerful yet easy to use.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl mb-6 text-white/90">
            Have questions, suggestions, or feedback? We&apos;d love to hear from you!
          </p>
          <Link href="/contact">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
