'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { History, Clock, User, RotateCcw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Version {
  id: string;
  timestamp: Date;
  author: {
    name: string;
    avatar: string;
  };
  changes: string;
  preview: string;
}

export function VersionHistory() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock version history - in production, this would come from Liveblocks or your database
  const versions: Version[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      author: { name: 'You', avatar: '' },
      changes: 'Added introduction paragraph',
      preview: 'Welcome to Word Editor. This is a collaborative...',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      author: { name: 'John Doe', avatar: '' },
      changes: 'Updated formatting and styles',
      preview: 'Welcome to Word Editor. This is a collaborative...',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      author: { name: 'You', avatar: '' },
      changes: 'Created document',
      preview: 'Untitled Document',
    },
  ];

  const handleRestore = (versionId: string) => {
    // In production, this would restore the document to the selected version
    console.log('Restoring version:', versionId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label="View version history">
          <History className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">History</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Version History
          </DialogTitle>
          <DialogDescription>
            View and restore previous versions of this document
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                      {version.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {version.author.name}
                        </span>
                        {index === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(version.timestamp, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  {index !== 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestore(version.id)}
                      className="gap-2"
                      aria-label={`Restore version from ${formatDistanceToNow(version.timestamp, { addSuffix: true })}`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Restore
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {version.changes}
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded p-3 text-sm text-gray-600 dark:text-gray-400 italic">
                    &ldquo;{version.preview}&rdquo;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
          <User className="w-4 h-4" />
          <span>
            <strong>Tip:</strong> All changes are automatically saved and versioned. You can restore any previous version anytime.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
