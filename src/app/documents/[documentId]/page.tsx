import { StandaloneEditor } from './standalone-editor';

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return <StandaloneEditor documentId={documentId} />;
};

export default DocumentIdPage;
