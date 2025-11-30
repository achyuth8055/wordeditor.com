'use client';

import { ReactNode, useEffect } from 'react';
import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import FullscreenLoader from '@/components/fullscreen-loader';

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const roomId = params.documentId as string;

  useEffect(() => {
    // Pre-connect to Liveblocks for faster room entry
    if (roomId) {
      console.log('Initializing collaboration for room:', roomId);
    }
  }, [roomId]);

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: null,
      }}
      initialStorage={{
        content: '',
        version: 0,
        leftMargin: 56,
        rightMargin: 56,
      }}
    >
      <ClientSideSuspense fallback={<FullscreenLoader label="Connecting to collaboration server..." />}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
