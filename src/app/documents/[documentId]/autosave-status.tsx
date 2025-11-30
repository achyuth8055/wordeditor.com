'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudOff, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type SaveStatus = 'saved' | 'saving' | 'error';

export function AutosaveStatus() {
  const [status, setStatus] = useState<SaveStatus>('saved');
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  useEffect(() => {
    // In production, this would listen to Liveblocks save events
    // For now, simulate autosave every 3 seconds
    const interval = setInterval(() => {
      setStatus('saving');
      setTimeout(() => {
        setStatus('saved');
        setLastSaved(new Date());
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusDisplay = () => {
    switch (status) {
      case 'saving':
        return (
          <div className="flex items-center gap-2 text-gray-500 text-xs" role="status" aria-live="polite">
            <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
            <span>Saving...</span>
          </div>
        );
      case 'saved':
        return (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs" role="status" aria-live="polite">
            <Cloud className="w-3 h-3" aria-hidden="true" />
            <span>Saved {formatDistanceToNow(lastSaved, { addSuffix: true })}</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs" role="alert" aria-live="assertive">
            <CloudOff className="w-3 h-3" aria-hidden="true" />
            <span>Save failed</span>
          </div>
        );
    }
  };

  return (
    <div className="AutosaveStatusComponent">
      {getStatusDisplay()}
    </div>
  );
}
