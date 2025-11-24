'use server';

import { Id } from '../../../../convex/_generated/dataModel';

export async function getUsers() {
  // Return a mock anonymous user
  return [
    {
      id: 'anonymous-user',
      name: 'Anonymous User',
      avatar: '',
      color: '#3b82f6',
    },
  ];
}

export async function getDocuments(ids: Id<'documents'>[]) {
  // Return mock document data since we're running without Convex
  return ids.map(id => ({
    id,
    name: 'Document',
  }));
}
