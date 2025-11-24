'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Id } from '../../convex/_generated/dataModel';

// Mock document structure
interface Document {
  _id: Id<'documents'>;
  _creationTime: number;
  title: string;
  initialContent?: string;
  ownerId: string;
  organizationId?: string;
}

// Mock database
const mockDB = {
  documents: [] as Document[],
};

// Load from localStorage on init
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('mock-convex-documents');
  if (stored) {
    try {
      mockDB.documents = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load documents from localStorage', e);
    }
  }
}

// Save to localStorage
function saveToLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mock-convex-documents', JSON.stringify(mockDB.documents));
  }
}

// Mock Convex context
interface MockConvexContextType {
  query: (queryFn: any, args?: any) => any;
  mutation: (mutationFn: any) => (...args: any[]) => Promise<any>;
}

const MockConvexContext = createContext<MockConvexContextType | null>(null);

export function MockConvexProvider({ children }: { children: React.ReactNode }) {
  const [, forceUpdate] = useState(0);

  const query = useCallback((queryFn: any, args?: any) => {
    const fnName = queryFn._name || '';

    if (fnName.includes('documents.get')) {
      const search = args?.search?.toLowerCase() || '';
      return mockDB.documents.filter((doc) => 
        search ? doc.title.toLowerCase().includes(search) : true
      );
    }

    if (fnName.includes('documents.getById')) {
      return mockDB.documents.find((doc) => doc._id === args?.id) || null;
    }

    if (fnName.includes('documents.getByIds')) {
      return (args?.ids || []).map((id: Id<'documents'>) => {
        const doc = mockDB.documents.find((d) => d._id === id);
        return doc ? { id: doc._id, name: doc.title } : { id, name: '[Deleted/Not Found]' };
      });
    }

    return null;
  }, []);

  const mutation = useCallback((mutationFn: any) => {
    return async (...args: any[]) => {
      const fnName = mutationFn._name || '';
      const mutationArgs = args[0] || {};

      if (fnName.includes('documents.create')) {
        const newDoc: Document = {
          _id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` as Id<'documents'>,
          _creationTime: Date.now(),
          title: mutationArgs.title || 'Untitled Document',
          initialContent: mutationArgs.initialContent,
          ownerId: 'anonymous-user',
          organizationId: undefined,
        };
        mockDB.documents.unshift(newDoc);
        saveToLocalStorage();
        forceUpdate((n) => n + 1);
        return newDoc._id;
      }

      if (fnName.includes('documents.updateById')) {
        const doc = mockDB.documents.find((d) => d._id === mutationArgs.id);
        if (doc && mutationArgs.title !== undefined) {
          doc.title = mutationArgs.title;
          saveToLocalStorage();
          forceUpdate((n) => n + 1);
        }
        return mutationArgs.id;
      }

      if (fnName.includes('documents.removeById')) {
        const index = mockDB.documents.findIndex((d) => d._id === mutationArgs.id);
        if (index !== -1) {
          mockDB.documents.splice(index, 1);
          saveToLocalStorage();
          forceUpdate((n) => n + 1);
        }
        return mutationArgs.id;
      }

      return null;
    };
  }, []);

  return (
    <MockConvexContext.Provider value={{ query, mutation }}>
      {children}
    </MockConvexContext.Provider>
  );
}

// Mock hooks
export function useQuery(queryFn: any, args?: any) {
  const context = useContext(MockConvexContext);
  if (!context) return null;
  return context.query(queryFn, args);
}

export function useMutation(mutationFn: any) {
  const context = useContext(MockConvexContext);
  if (!context) return async () => null;
  return context.mutation(mutationFn);
}

export function useConvexAuth() {
  return {
    isLoading: false,
    isAuthenticated: true,
  };
}

export function usePaginatedQuery(queryFn: any, args?: any) {
  const context = useContext(MockConvexContext);
  const results = context?.query(queryFn, args) || [];
  
  return {
    results,
    status: 'Exhausted' as const,
    loadMore: () => {},
  };
}

export function Authenticated({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Unauthenticated({ children }: { children: React.ReactNode }) {
  return null;
}

export function AuthLoading({ children }: { children: React.ReactNode }) {
  return null;
}
