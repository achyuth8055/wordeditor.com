'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Keyboard } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ['Ctrl', 'H'], description: 'Go to Home', category: 'Navigation' },
  { keys: ['Ctrl', 'D'], description: 'Go to Documents', category: 'Navigation' },
  { keys: ['Ctrl', '?'], description: 'Show keyboard shortcuts', category: 'Navigation' },
  
  // Tools
  { keys: ['Ctrl', 'Shift', 'W'], description: 'Word Counter', category: 'Tools' },
  { keys: ['Ctrl', 'Shift', 'T'], description: 'Typing Test', category: 'Tools' },
  { keys: ['Ctrl', 'Shift', 'A'], description: 'Text Analyzer', category: 'Tools' },
  { keys: ['Ctrl', 'Shift', 'G'], description: 'Grammar Checker', category: 'Tools' },
  { keys: ['Ctrl', 'Shift', 'P'], description: 'Paraphraser', category: 'Tools' },
  { keys: ['Ctrl', 'Shift', 'S'], description: 'Summarizer', category: 'Tools' },
  
  // General
  { keys: ['Ctrl', 'K'], description: 'Search / Command palette (future)', category: 'General' },
  { keys: ['Ctrl', ','], description: 'Settings (future)', category: 'General' },
  { keys: ['Esc'], description: 'Close dialog / Cancel', category: 'General' },
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Show shortcuts dialog
      if (ctrlKey && e.key === '?') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Navigation shortcuts
      if (ctrlKey && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            window.location.href = '/';
            break;
          case 'd':
            e.preventDefault();
            window.location.href = '/documents';
            break;
        }
      }

      // Tool shortcuts
      if (ctrlKey && e.shiftKey) {
        switch (e.key.toUpperCase()) {
          case 'W':
            e.preventDefault();
            window.location.href = '/tools/word-counter';
            break;
          case 'T':
            e.preventDefault();
            window.location.href = '/tools/typing-test';
            break;
          case 'A':
            e.preventDefault();
            window.location.href = '/tools/text-analyzer';
            break;
          case 'G':
            e.preventDefault();
            window.location.href = '/tools/grammar-checker';
            break;
          case 'P':
            e.preventDefault();
            window.location.href = '/tools/paraphraser';
            break;
          case 'S':
            e.preventDefault();
            window.location.href = '/tools/summarizer';
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMac]);

  const formatKey = (key: string) => {
    if (key === 'Ctrl') return isMac ? '⌘' : 'Ctrl';
    if (key === 'Shift') return '⇧';
    if (key === 'Alt') return isMac ? '⌥' : 'Alt';
    if (key === 'Esc') return 'Esc';
    return key;
  };

  const categories = [...new Set(shortcuts.map(s => s.category))];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Boost your productivity with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter(s => s.category === category)
                  .map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {shortcut.description}
                      </span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <Badge
                            key={keyIndex}
                            variant="secondary"
                            className="font-mono text-xs px-2 py-1"
                          >
                            {formatKey(key)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Press <Badge variant="secondary" className="mx-1">
              {formatKey('Ctrl')} ?
            </Badge> anytime to view these shortcuts
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
