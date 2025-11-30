'use client';

import { Navbar } from './navbar';
import Link from 'next/link';
import { templates } from '@/constants/tempaltes';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatedHero3D, FloatingAvatar } from '@/components/animated-hero-3d';

const tools = [
  {
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
    href: '/tools/word-counter',
    color: 'bg-blue-500',
  },
  {
    title: 'Character Counter',
    description: 'Count characters with or without spaces in real-time',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    href: '/tools/character-counter',
    color: 'bg-purple-500',
  },
  {
    title: 'Typing Test',
    description: 'Test and improve your typing speed and accuracy',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    href: '/tools/typing-test',
    color: 'bg-green-500',
  },
  {
    title: 'Reading Time',
    description: 'Calculate how long it takes to read your content',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '/tools/reading-time',
    color: 'bg-orange-500',
  },
  {
    title: 'Text Analyzer',
    description: 'Analyze text for readability, keyword density, and more',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    href: '/tools/text-analyzer',
    color: 'bg-red-500',
  },
  {
    title: 'Case Converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, and more',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    href: '/tools/case-converter',
    color: 'bg-indigo-500',
  },
  {
    title: 'Text Diff Checker',
    description: 'Compare two texts and see the differences highlighted',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    href: '/tools/text-diff',
    color: 'bg-cyan-500',
  },
  {
    title: 'Placeholder Text Generator',
    description: 'Generate English placeholder text for your designs and mockups',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    href: '/tools/lorem-ipsum',
    color: 'bg-pink-500',
  },
  {
    title: 'Markdown Preview',
    description: 'Write and preview Markdown in real-time',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    href: '/tools/markdown-preview',
    color: 'bg-teal-500',
  },
  {
    title: 'Markdown Generator',
    description: 'Convert plain text to formatted Markdown syntax',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    href: '/tools/markdown-generator',
    color: 'bg-lime-500',
  },
  {
    title: 'Paraphraser Pro',
    description: 'Rephrase and rewrite text while maintaining meaning',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    href: 'https://paraphraserpro.com/',
    color: 'bg-violet-500',
    external: true,
  },
  {
    title: 'Text to HTML',
    description: 'Convert plain text to clean, semantic HTML code',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    href: '/tools/text-to-html',
    color: 'bg-yellow-500',
  },
  {
    title: 'HTML to Document',
    description: 'Convert HTML to Word (.doc) or PDF format',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    href: '/tools/html-to-document',
    color: 'bg-rose-500',
  },
  {
    title: 'Document Editor',
    description: 'Create and edit rich text documents with formatting',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    href: '/documents',
    color: 'bg-emerald-500',
  },
];

const faqs = [
  {
    question: 'What is Word Counter and how does it work?',
    answer: 'Word Counter is a free online tool that counts words, characters, sentences, and paragraphs in real-time. Simply paste your text, and it instantly analyzes your content, providing detailed statistics including reading time and speaking time estimates.'
  },
  {
    question: 'How accurate is the typing test?',
    answer: 'Our typing test is highly accurate, measuring your WPM (Words Per Minute) and accuracy in real-time. It uses standard text samples and calculates your typing speed based on industry-standard metrics used by typing tutors worldwide.'
  },
  {
    question: 'Can I use these text tools for free?',
    answer: 'Yes! All our text editing tools are completely free to use. There are no hidden fees, subscriptions, or limitations. You can use any tool as many times as you need without any restrictions.'
  },
  {
    question: 'How does the Text Analyzer calculate readability?',
    answer: 'The Text Analyzer uses the Flesch Reading Ease formula, which considers average sentence length and syllables per word. It provides a score from 0-100, where higher scores indicate easier readability. The tool also shows keyword density and other important metrics.'
  },
  {
    question: 'Is my text data secure and private?',
    answer: 'Absolutely! All text processing happens directly in your browser. Your text is never sent to our servers, stored, or shared with anyone. Your privacy and data security are our top priorities.'
  },
  {
    question: 'Can I use these tools on mobile devices?',
    answer: 'Yes! All our tools are fully responsive and work perfectly on smartphones, tablets, laptops, and desktop computers. The interface adapts to your screen size for the best user experience.'
  },
  {
    question: 'What is the Case Converter tool used for?',
    answer: 'The Case Converter helps you transform text between different formats: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case. It\'s perfect for programmers, writers, and anyone working with text formatting.'
  },
  {
    question: 'How does the Reading Time Calculator work?',
    answer: 'The Reading Time Calculator estimates how long it takes to read your content based on average reading speeds. It uses 200 words per minute for reading and 130 words per minute for speaking, with options to customize these speeds.'
  },
];

const blogPosts = [
  {
    title: 'How to Improve Your Typing Speed: 10 Proven Techniques',
    excerpt: 'Learn effective strategies to increase your typing speed and accuracy with our comprehensive guide. Practice regularly with our typing test tool and track your progress.',
    date: 'November 20, 2024',
    category: 'Productivity',
    slug: 'improve-typing-speed',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=400&fit=crop',
  },
  {
    title: 'Understanding Readability Scores: A Complete Guide',
    excerpt: 'Discover what readability scores mean and how they can improve your writing. Learn about the Flesch Reading Ease formula and how to optimize your content for your audience.',
    date: 'November 18, 2024',
    category: 'Content Writing',
    slug: 'understanding-readability-scores',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
  },
  {
    title: 'Best Practices for SEO Content: Word Count and Keyword Density',
    excerpt: 'Master the art of SEO writing with optimal word counts and keyword strategies. Use our Text Analyzer to ensure your content meets SEO best practices.',
    date: 'November 15, 2024',
    category: 'SEO',
    slug: 'seo-content-best-practices',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=400&fit=crop',
  },
  {
    title: 'Markdown Formatting Guide for Beginners',
    excerpt: 'Learn Markdown basics and advanced formatting with our comprehensive guide. Use our Markdown Preview tool to practice and see real-time results.',
    date: 'November 12, 2024',
    category: 'Tutorial',
    slug: 'markdown-formatting-guide',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  },
];

const Home = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const createDocument = (title: string, initialContent: string) => {
    setIsCreating(true);
    try {
      const randomId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem(
        `doc-${randomId}`,
        JSON.stringify({
          title,
          content: initialContent,
          updatedAt: new Date().toISOString(),
        })
      );
      router.push(`/documents/${randomId}`);
    } catch (error) {
      console.error('Error creating document:', error);
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
        <Navbar />
      </div>
      <div className="mt-16 flex-1">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          <AnimatedHero3D />
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <div className="max-w-screen-xl mx-auto px-6 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="animate-fade-in-up text-center lg:text-left">
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Free Online Text Editing & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
                    Analysis Tools
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Professional word counter, character counter, typing test, text analyzer, and more. 
                  Everything you need for text editing, writing, and content analysis - completely free and online.
                </p>
                <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                  <Link href="/tools/word-counter">
                    <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                      Try Word Counter
                    </button>
                </Link>
                <Link href="/documents">
                  <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                    Create Document
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right side - 3D Avatar Animation */}
            <div className="animate-fade-in flex items-center justify-center lg:justify-end" style={{animationDelay: '0.2s'}}>
              <FloatingAvatar />
            </div>
          </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-screen-xl mx-auto px-6 py-16 bg-white dark:bg-gray-900">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Text Tools for Every Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From counting words to analyzing readability, our suite of tools helps writers, students, 
              developers, and content creators work more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const isExternal = tool.external;
              const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
              
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  {...linkProps}
                  className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-2"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${tool.color} p-3 rounded-lg text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {tool.title}
                        {isExternal && (
                          <svg className="w-4 h-4 inline ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Try it now 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose Our Text Tools?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All processing happens instantly in your browser. No waiting, no delays - get results in real-time as you type.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">100% Private</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your text never leaves your device. All processing is done locally in your browser for maximum privacy and security.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Completely Free</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No subscriptions, no hidden fees, no limits. Use all tools as much as you want, forever free.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Perfect For Everyone
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Whether you&apos;re a student, professional, or content creator, our tools help you work smarter and faster
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Students & Writers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Meet essay requirements, track word counts, and improve writing quality</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Content Marketers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Optimize SEO content, analyze keyword density, and check readability scores</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Developers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Convert text cases, compare code, preview Markdown, and format text</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">Public Speakers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Calculate speaking time, practice with typing test, and prepare presentations</p>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Document Templates</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Start with professionally designed templates. Create documents instantly with localStorage - no signup required!
              </p>
            </div>
            {templates && templates.length > 0 ? (
              <Carousel>
                <CarouselContent>
                  {templates.map((template) => (
                    <CarouselItem key={template.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                      <div
                        onClick={() => !isCreating && createDocument(template.label, template.initialContent)}
                        className={cn(
                          'aspect-[3/4] flex flex-col gap-y-2 cursor-pointer transition hover:scale-105',
                          isCreating && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        <div className="bg-white dark:bg-gray-700 rounded-sm border dark:border-gray-600 overflow-hidden flex-1 h-48">
                          <img
                            src={template.imageUrl}
                            alt={template.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-center truncate dark:text-white">{template.label}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : null}
          </div>
        </div>

        {/* Blog Section */}
        <div className="max-w-screen-xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Expert tips, guides, and insights to improve your writing and productivity</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold text-white bg-emerald-600 px-3 py-1 rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-emerald-600 font-semibold hover:text-emerald-700 inline-flex items-center group">
                    Read More 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-emerald-50 dark:bg-gray-800 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-emerald-600 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of writers, students, and professionals using our free text tools every day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/tools/word-counter">
                <button className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  Get Started Free
                </button>
              </Link>
              <Link href="/documents">
                <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all transform hover:scale-105">
                  View All Tools
                </button>
              </Link>
            </div>
            <p className="text-white/75 text-sm mt-6">No credit card required • No signup needed • 100% free forever</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center font-bold">
                    W
                  </div>
                  <span className="font-bold text-lg">Word Editor</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Professional text editing and analysis tools for writers, students, and content creators.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Tools</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/tools/word-counter" className="hover:text-white">Word Counter</Link></li>
                  <li><Link href="/tools/character-counter" className="hover:text-white">Character Counter</Link></li>
                  <li><Link href="/tools/typing-test" className="hover:text-white">Typing Test</Link></li>
                  <li><Link href="/tools/text-analyzer" className="hover:text-white">Text Analyzer</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">More Tools</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/tools/case-converter" className="hover:text-white">Case Converter</Link></li>
                  <li><Link href="/tools/text-diff" className="hover:text-white">Text Diff</Link></li>
                  <li><Link href="/tools/lorem-ipsum" className="hover:text-white">Lorem Ipsum</Link></li>
                  <li><Link href="/tools/markdown-preview" className="hover:text-white">Markdown Preview</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                  <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">External Tools</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="https://paraphraserpro.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Paraphrasing Tool</a></li>
                  <li><a href="https://imageandpdf.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Image & PDF Tools</a></li>
                  <li><a href="https://imageandpdf.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Video Tools</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  © 2024 Word Editor Tools. All rights reserved.
                </p>
                <div className="flex gap-4 text-sm text-gray-400 dark:text-gray-500">
                  <Link href="/privacy" className="hover:text-white">Privacy</Link>
                  <Link href="/terms" className="hover:text-white">Terms</Link>
                  <Link href="/contact" className="hover:text-white">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
