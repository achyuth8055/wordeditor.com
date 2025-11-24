'use client';

import { Navbar } from '../(home)/navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const DocumentsPage = () => {
  const router = useRouter();

  const createNewDocument = () => {
    // Generate a random ID for the new document
    const randomId = Math.random().toString(36).substring(2, 15);
    router.push(`/documents/${randomId}`);
  };

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

        {/* Create Document Section */}
        <div className="py-12">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-lg">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Create a New Document</h2>
              <p className="text-gray-700 mb-8 text-lg">
                Start editing with our powerful rich text editor. Your work is saved locally in your browser.
              </p>
              <Button onClick={createNewDocument} size="lg" className="text-lg px-8 py-6">
                Create Blank Document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
