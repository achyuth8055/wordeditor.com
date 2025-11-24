'use client';

import { Navbar } from '../(home)/navbar';
import TemplatesGallery from '../(home)/templates-gallery';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
              <p className="text-sm text-gray-600 mt-1">Create and edit rich text documents</p>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="py-8">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose a template to get started</h2>
            <TemplatesGallery />
          </div>
        </div>

        {/* Create Blank Document Section */}
        <div className="max-w-screen-xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Or start from scratch</h3>
            <p className="text-gray-600 mb-4">Create a blank document and customize it your way</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
