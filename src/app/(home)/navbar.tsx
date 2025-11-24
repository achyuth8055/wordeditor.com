'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Calculator, Keyboard, Clock, BarChart3, Home } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full px-6 gap-6">
      <div className="flex flex-col items-center shrink-0 sm:flex-row sm:gap-3">
        <Link href="/">
          <div className="w-9 h-9 bg-emerald-400 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">
            W
          </div>
        </Link>
        <h3 className="text-sm sm:text-xl font-semibold">Word Editor</h3>
      </div>
      
      {/* Quick Navigation Buttons */}
      <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="w-4 h-4" />
            Home
          </Button>
        </Link>
        <Link href="/tools/word-counter">
          <Button variant="ghost" size="sm" className="gap-2">
            <Calculator className="w-4 h-4" />
            Word Counter
          </Button>
        </Link>
        <Link href="/tools/typing-test">
          <Button variant="ghost" size="sm" className="gap-2">
            <Keyboard className="w-4 h-4" />
            Typing Test
          </Button>
        </Link>
        <Link href="/tools/text-analyzer">
          <Button variant="ghost" size="sm" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Text Analyzer
          </Button>
        </Link>
        <Link href="/documents">
          <Button variant="ghost" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </Button>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <Link href="/documents">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
