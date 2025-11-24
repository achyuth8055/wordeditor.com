'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';

// Make Convex optional - only initialize if URL is provided
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  // If no Convex URL, render children without provider
  if (!convex) {
    return <>{children}</>;
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
