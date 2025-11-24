'use client';

import { Navbar } from '../(home)/navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { templates } from '@/constants/tempaltes';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const DocumentsPage = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const createDocument = (title: string, initialContent: string) => {
    setIsCreating(true);
    try {
      // Generate a random ID for the new document
      const randomId = Math.random().toString(36).substring(2, 15);
      // Save the initial content to localStorage
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

        {/* Templates Gallery */}
        <div className="py-8 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a template to get started</h2>
            {templates && templates.length > 0 ? (
              <Carousel>
                <CarouselContent>
                  {templates.map((template) => (
                  <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div
                      onClick={() => !isCreating && createDocument(template.label, template.initialContent)}
                      className={cn(
                        'aspect-[3/4] flex flex-col gap-y-2.5 cursor-pointer transition hover:scale-105',
                        isCreating && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <div className="bg-white rounded-sm border overflow-hidden flex-1">
                        <img
                          src={template.imageUrl}
                          alt={template.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium text-center">{template.label}</p>
                    </div>
                  </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <p className="text-center text-gray-500">No templates available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
