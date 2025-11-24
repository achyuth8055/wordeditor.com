import { Id } from '../../../../convex/_generated/dataModel';
import { Document } from './document';
import { api } from '../../../../convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { redirect } from 'next/navigation';

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<'documents'>;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  try {
    const preloadedDocument = await preloadQuery(api.documents.getById, { id: documentId });

    return <Document preloadedDocument={preloadedDocument} />;
  } catch (error) {
    redirect('/');
  }
};

export default DocumentIdPage;
