'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { FileText, Calculator, Keyboard, Clock, BarChart3, Home } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full px-6 gap-6" role="navigation" aria-label="Main navigation">
      <div className="flex flex-col items-center shrink-0 sm:flex-row sm:gap-3">
        <Link href="/" aria-label="Go to homepage">
          <div className="w-9 h-9 bg-emerald-400 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">
            W
          </div>
        </Link>
        <h3 className="text-sm sm:text-xl font-semibold">Word Editor</h3>
      </div>
      
      {/* Quick Navigation Buttons */}
      <div className="hidden md:flex items-center gap-2 flex-1 justify-center" role="menubar" aria-label="Quick navigation">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2" aria-label="Navigate to home page">
            <Home className="w-4 h-4" aria-hidden="true" />
            Home
          </Button>
        </Link>
        <Link href="/tools/word-counter">
          <Button variant="ghost" size="sm" className="gap-2" aria-label="Navigate to Word Counter tool">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            Word Counter
          </Button>
        </Link>
        <Link href="/tools/typing-test">
          <Button variant="ghost" size="sm" className="gap-2" aria-label="Navigate to Typing Test tool">
            <Keyboard className="w-4 h-4" aria-hidden="true" />
            Typing Test
          </Button>
        </Link>
        <Link href="/tools/text-analyzer">
          <Button variant="ghost" size="sm" className="gap-2" aria-label="Navigate to Text Analyzer tool">
            <BarChart3 className="w-4 h-4" aria-hidden="true" />
            Text Analyzer
          </Button>
        </Link>
        <Link href="/documents">
          <Button variant="ghost" size="sm" className="gap-2" aria-label="Navigate to Documents page">
            <FileText className="w-4 h-4" aria-hidden="true" />
            Documents
          </Button>
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <Link href="/documents">
          <Button className="bg-emerald-500 hover:bg-emerald-600" aria-label="Get started with Word Editor">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
