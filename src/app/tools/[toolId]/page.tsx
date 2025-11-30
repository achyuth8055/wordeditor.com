'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WordCounter } from './tools/word-counter';
import { CharacterCounter } from './tools/character-counter';
import { TypingTest } from './tools/typing-test';
import { ReadingTime } from './tools/reading-time';
import { TextAnalyzer } from './tools/text-analyzer';
import { CaseConverter } from './tools/case-converter';
import { TextDiff } from './tools/text-diff';
import { LoremIpsumGenerator } from './tools/lorem-ipsum';
import { MarkdownPreview } from './tools/markdown-preview';
import { GrammarChecker } from './tools/grammar-checker';
import { Paraphraser } from './tools/paraphraser';
import { Summarizer } from './tools/summarizer';
import { TextToHtml } from './tools/text-to-html';
import { HtmlToDocument } from './tools/html-to-document';
import MarkdownGenerator from './tools/markdown-generator';
import { Navbar } from '@/app/(home)/navbar';

const toolComponents: Record<string, { component: React.ComponentType; name: string }> = {
  'word-counter': { component: WordCounter, name: 'Word Counter' },
  'character-counter': { component: CharacterCounter, name: 'Character Counter' },
  'typing-test': { component: TypingTest, name: 'Typing Test' },
  'reading-time': { component: ReadingTime, name: 'Reading Time Calculator' },
  'text-analyzer': { component: TextAnalyzer, name: 'Text Analyzer' },
  'case-converter': { component: CaseConverter, name: 'Case Converter' },
  'text-diff': { component: TextDiff, name: 'Text Difference Checker' },
  'lorem-ipsum': { component: LoremIpsumGenerator, name: 'Lorem Ipsum Generator' },
  'markdown-preview': { component: MarkdownPreview, name: 'Markdown Preview' },
  'markdown-generator': { component: MarkdownGenerator, name: 'Markdown Generator' },
  'grammar-checker': { component: GrammarChecker, name: 'Grammar & Style Checker' },
  'paraphraser': { component: Paraphraser, name: 'AI Paraphraser' },
  'summarizer': { component: Summarizer, name: 'Text Summarizer' },
  'text-to-html': { component: TextToHtml, name: 'Text to HTML Converter' },
  'html-to-document': { component: HtmlToDocument, name: 'HTML to Word/PDF' },
};

export default function ToolPage() {
  const params = useParams();
  const toolId = params.toolId as string;
  const toolConfig = toolComponents[toolId];

  if (!toolConfig) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-sm border-b">
          <Navbar />
        </div>
        <div className="mt-16">
          <div className="max-w-screen-xl mx-auto px-6 py-12">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h2>
                <p className="text-gray-600 mb-8">The requested tool does not exist.</p>
                <Link href="/">
                  <Button>Back to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ToolComponent = toolConfig.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-sm border-b">
        <Navbar />
      </div>
      <div className="mt-16">
        <div className="bg-white border-b">
          <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{toolConfig.name}</h1>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <ToolComponent />
        </div>
      </div>
    </div>
  );
}
