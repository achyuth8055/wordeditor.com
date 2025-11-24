'use client';

import { Navbar } from '../(home)/navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Document editor requires Convex backend - showing info page
const DocumentsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-sm">
        <Navbar />
      </div>
      <div className="mt-16 flex-1">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-screen-xl mx-auto px-6 py-6 flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Document Editor</h1>
              <p className="text-sm text-gray-600 mt-1">Rich text document editor (Coming Soon)</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="py-8">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Document Editor Coming Soon</h2>
              <p className="text-gray-700 mb-6">
                The collaborative document editor with templates and real-time editing requires backend setup (Convex, Clerk, Liveblocks).
              </p>
              <p className="text-gray-600">
                Meanwhile, check out our 9 powerful text tools that work instantly without any setup!
              </p>
              <Link href="/">
                <Button className="mt-6">
                  Explore Text Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
