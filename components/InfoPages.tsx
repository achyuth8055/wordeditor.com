import React, { useState } from 'react';

type InfoTab = 'about' | 'how-to' | 'faqs';

export const InfoPages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InfoTab>('about');

  const TabButton: React.FC<{ tab: InfoTab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === tab
          ? 'bg-green-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Tab Navigation */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-3 overflow-x-auto">
          <TabButton tab="about" label="About" />
          <TabButton tab="how-to" label="How to Use" />
          <TabButton tab="faqs" label="FAQs" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ABOUT SECTION */}
          {activeTab === 'about' && (
            <div id="about" className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">About WordEditor.online</h1>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-green-900 mb-3">Your All-in-One Text Processing Suite</h2>
                <p className="text-gray-700 leading-relaxed">
                  WordEditor.online is a comprehensive online text processing platform designed to help writers, students, professionals, and content creators enhance their writing quality and productivity. Our suite of tools provides everything you need to improve your written communication.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    ✨ Word Counter Tool
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Get detailed text statistics including word count, character count, reading time, speaking time, and character limits for popular social media platforms.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    📝 Typing Test
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Improve your typing speed with our interactive 60-second typing test. Track your WPM (words per minute), accuracy, and progress across different difficulty levels.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    🤖 AI Summarizer
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Use AI-powered summarization to condense long texts into concise summaries, perfect for research, content creation, and information processing.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    🔤 Case Converter
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Convert text between different cases: UPPERCASE, lowercase, Capitalize, Title Case, and Sentence case with a single click.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Why Choose WordEditor.online?</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>✓ Free and easy to use - no account required</li>
                  <li>✓ AI-powered tools for enhanced writing quality</li>
                  <li>✓ Fast, reliable, and privacy-focused</li>
                  <li>✓ Works on all devices - desktop, tablet, and mobile</li>
                  <li>✓ Real-time results and instant feedback</li>
                  <li>✓ Perfect for students, professionals, and content creators</li>
                </ul>
              </div>
            </div>
          )}

          {/* HOW TO USE SECTION */}
          {activeTab === 'how-to' && (
            <div id="how-to" className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">How to Use WordEditor.online</h1>

              <div className="space-y-6">
                {/* Word Counter Guide */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Word Counter Tool</h2>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1. Navigate to Word Counter:</strong> Click the "Word Counter" tab in the navigation bar</li>
                    <li><strong>2. Paste or Type Text:</strong> Enter your text in the editor area, or click "Paste" to paste from clipboard</li>
                    <li><strong>3. View Statistics:</strong> Instantly see word count, character count, reading time, and more in the right panel</li>
                    <li><strong>4. Check Platform Limits:</strong> See how your text fits within Twitter, Facebook, and Google Meta Description character limits</li>
                    <li><strong>5. Save Your Work:</strong> Your text is automatically saved to your browser's local storage</li>
                  </ol>
                </div>

                {/* Typing Test Guide */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Typing Test</h2>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1. Select Difficulty:</strong> Choose Easy, Medium, or Hard difficulty level</li>
                    <li><strong>2. Pick a Lesson:</strong> Select from various typing lessons and templates (on desktop view)</li>
                    <li><strong>3. Click Start:</strong> Press the "Start" button to begin your 60-second typing test</li>
                    <li><strong>4. Type Carefully:</strong> Type the displayed text accurately - each keystroke is tracked</li>
                    <li><strong>5. View Results:</strong> After 60 seconds, see your WPM (Words Per Minute), accuracy percentage, and character count</li>
                    <li><strong>6. Retry:</strong> Click "Retry" to practice again and improve your speed</li>
                  </ol>
                </div>

                {/* Summarizer Guide */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Summarizer Tool</h2>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1. Navigate to Summarizer:</strong> Click the "Summarizer" tab</li>
                    <li><strong>2. Input Your Text:</strong> Paste or type the text you want to summarize</li>
                    <li><strong>3. Click Summarize:</strong> Press the "Summarize Text" button in the right panel</li>
                    <li><strong>4. View Summary:</strong> Get an AI-generated concise summary of your text</li>
                    <li><strong>5. Copy Result:</strong> Click "Copy to Clipboard" to copy the summary for use elsewhere</li>
                  </ol>
                </div>

                {/* Case Converter Guide */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Converter Tool</h2>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1. Navigate to Case Converter:</strong> Click the "Case Converter" tab</li>
                    <li><strong>2. Enter Your Text:</strong> Paste or type the text in the editor</li>
                    <li><strong>3. Select Case Type:</strong> Choose from:
                      <ul className="ml-4 mt-2 space-y-1">
                        <li>• UPPERCASE - converts all letters to uppercase</li>
                        <li>• lowercase - converts all letters to lowercase</li>
                        <li>• Capitalize - capitalizes first letter of each word</li>
                        <li>• Title Case - proper title formatting</li>
                        <li>• Sentence case - capitalizes first letter only</li>
                      </ul>
                    </li>
                    <li><strong>4. Copy Result:</strong> Click "Copy to Clipboard" to use the converted text</li>
                  </ol>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Pro Tips:</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Your work is automatically saved, so you won't lose any text</li>
                  <li>• Use the Paste button for quick clipboard operations</li>
                  <li>• AI tools work best with substantial text (50+ words)</li>
                  <li>• Practice typing regularly to improve your WPM score</li>
                </ul>
              </div>
            </div>
          )}

          {/* FAQS SECTION */}
          {activeTab === 'faqs' && (
            <div id="faqs" className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>

              <div className="space-y-4">
                {[
                  {
                    q: "Is WordEditor.online free to use?",
                    a: "Yes! WordEditor.online is completely free. All tools and features are available at no cost, and no account or login is required."
                  },
                  {
                    q: "Do I need to create an account?",
                    a: "No account is needed. Simply visit our website and start using the tools immediately. Your work is saved locally in your browser."
                  },
                  {
                    q: "Is my data private and secure?",
                    a: "Yes, your privacy is important to us. All text processing is done on your device or through secure AI services. Your data is not stored on our servers."
                  },
                  {
                    q: "Can I use these tools on mobile?",
                    a: "Absolutely! All our tools are fully responsive and work perfectly on smartphones, tablets, and desktop computers."
                  },
                  {
                    q: "What does WPM mean in the typing test?",
                    a: "WPM stands for Words Per Minute. It's calculated as (total characters typed ÷ 5) ÷ minutes elapsed. This is the standard formula for measuring typing speed."
                  },
                  {
                    q: "How is accuracy calculated in the typing test?",
                    a: "Accuracy is the percentage of correctly typed characters compared to the total number of characters in the sample text. 100% accuracy means you typed everything perfectly."
                  },
                  {
                    q: "What is the reading time calculation based on?",
                    a: "Reading time is calculated at an average reading speed of 200 words per minute, which is the standard adult reading pace."
                  },
                  {
                    q: "Can I export my text?",
                    a: "You can copy text to your clipboard using the 'Copy' or 'Paste' buttons. The text editors automatically save to your browser's local storage."
                  },
                  {
                    q: "How accurate is the AI summarizer?",
                    a: "The AI summarizer uses advanced language models to create accurate summaries. However, always review AI-generated content for your specific use case."
                  },
                  {
                    q: "Do the tools work offline?",
                    a: "Text processing tools (Word Counter, Case Converter) work offline. AI tools (Summarizer) require an internet connection to function."
                  },
                  {
                    q: "Can I use these tools for SEO purposes?",
                    a: "Yes! Our Word Counter shows Google Meta Description limits, and the text tools help optimize your content for search engines and social media platforms."
                  },
                  {
                    q: "Is there a file size limit?",
                    a: "There's no strict file size limit, but very large documents may impact performance. For best results, keep texts under 50,000 characters."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{faq.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Still Have Questions?</h3>
                <p className="text-gray-700 mb-4">
                  Can't find the answer you're looking for? We're here to help! Feel free to reach out with any questions or suggestions for new features.
                </p>
                <a
                  href="mailto:support@wordeditor.online"
                  className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
