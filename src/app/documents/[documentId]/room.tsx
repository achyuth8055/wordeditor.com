'use client';

import { ReactNode } from 'react';

export function Room({ children }: { children: ReactNode }) {
  // Liveblocks removed - real-time collaboration disabled
  // App works without Liveblocks account for local development
  return <>{children}</>;
}
