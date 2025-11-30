'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Copy, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

type MarkdownStyle = 'heading' | 'bold' | 'italic' | 'link' | 'list' | 'code' | 'blockquote' | 'table' | 'auto';

export default function MarkdownGenerator() {
  const [inputText, setInputText] = useState('');
  const [markdownStyle, setMarkdownStyle] = useState<MarkdownStyle>('auto');
  const [markdownOutput, setMarkdownOutput] = useState('');

  const escapeMarkdown = (text: string): string => {
    return text.replace(/([*_`[\]()#+\-.!])/g, '\\$1');
  };

  const generateHeadings = (text: string): string => {
    const lines = text.split('\n');
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return '';
      if (trimmed.length < 50 && !trimmed.includes('.')) {
        return `# ${trimmed}\n`;
      }
      return `${trimmed}\n`;
    }).join('\n');
  };

  const generateBold = (text: string): string => {
    const lines = text.split('\n');
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return '';
      return `**${trimmed}**\n`;
    }).join('\n');
  };

  const generateItalic = (text: string): string => {
    const lines = text.split('\n');
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return '';
      return `*${trimmed}*\n`;
    }).join('\n');
  };

  const generateLinks = (text: string): string => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '[$1]($1)');
  };

  const generateList = (text: string): string => {
    const lines = text.split('\n');
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return '';
      return `- ${trimmed}\n`;
    }).join('\n');
  };

  const generateCode = (text: string): string => {
    return `\`\`\`\n${text}\n\`\`\``;
  };

  const generateBlockquote = (text: string): string => {
    const lines = text.split('\n');
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.length === 0) return '';
      return `> ${trimmed}\n`;
    }).join('\n');
  };

  const generateTable = (text: string): string => {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return '';

    // Try to detect if it's comma or tab separated
    const firstLine = lines[0];
    const separator = firstLine.includes('\t') ? '\t' : ',';
    
    const rows = lines.map(line => 
      line.split(separator).map(cell => cell.trim())
    );

    if (rows.length === 0) return text;

    const colCount = Math.max(...rows.map(row => row.length));
    
    // Header row
    let markdown = '| ' + rows[0].join(' | ') + ' |\n';
    
    // Separator row
    markdown += '| ' + Array(colCount).fill('---').join(' | ') + ' |\n';
    
    // Data rows
    for (let i = 1; i < rows.length; i++) {
      markdown += '| ' + rows[i].join(' | ') + ' |\n';
    }
    
    return markdown;
  };

  const autoDetectAndGenerate = (text: string): string => {
    if (text.trim().length === 0) return '';

    let result = text;

    // Auto-detect URLs and convert to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(result)) {
      result = generateLinks(result);
    }

    // Auto-detect numbered or bulleted lists
    const listRegex = /^[\d\-*•]+[\.\)]\s/m;
    if (listRegex.test(result)) {
      const lines = result.split('\n');
      result = lines.map(line => {
        const trimmed = line.trim();
        if (listRegex.test(trimmed)) {
          return `- ${trimmed.replace(/^[\d\-*•]+[\.\)]\s/, '')}`;
        }
        return line;
      }).join('\n');
    }

    // Auto-detect headings (short lines without punctuation)
    const lines = result.split('\n');
    result = lines.map((line, index) => {
      const trimmed = line.trim();
      if (trimmed.length > 0 && trimmed.length < 60 && !trimmed.match(/[.!?,;:]$/) && index === 0) {
        return `# ${trimmed}`;
      }
      if (trimmed.length > 0 && trimmed.length < 60 && !trimmed.match(/[.!?,;:]$/) && lines[index - 1]?.trim() === '') {
        return `## ${trimmed}`;
      }
      return line;
    }).join('\n');

    // Add double line breaks for paragraphs
    result = result.replace(/\n(?!\n)/g, '\n\n');

    return result;
  };

  const generateMarkdown = () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text first');
      return;
    }

    let output = '';

    switch (markdownStyle) {
      case 'heading':
        output = generateHeadings(inputText);
        break;
      case 'bold':
        output = generateBold(inputText);
        break;
      case 'italic':
        output = generateItalic(inputText);
        break;
      case 'link':
        output = generateLinks(inputText);
        break;
      case 'list':
        output = generateList(inputText);
        break;
      case 'code':
        output = generateCode(inputText);
        break;
      case 'blockquote':
        output = generateBlockquote(inputText);
        break;
      case 'table':
        output = generateTable(inputText);
        break;
      case 'auto':
      default:
        output = autoDetectAndGenerate(inputText);
        break;
    }

    setMarkdownOutput(output);
    toast.success('Markdown generated successfully!');
  };

  const copyToClipboard = async () => {
    if (!markdownOutput) {
      toast.error('No markdown to copy');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(markdownOutput);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const downloadMarkdown = () => {
    if (!markdownOutput) {
      toast.error('No markdown to download');
      return;
    }

    const blob = new Blob([markdownOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Markdown file downloaded!');
  };

  const clearAll = () => {
    setInputText('');
    setMarkdownOutput('');
    toast.success('Cleared all content');
  };

  const loadSample = () => {
    const sample = `Getting Started with Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

Key Features:
1. Easy to learn
2. Plain text format
3. Widely supported

You can create headings, lists, links like https://example.com, bold text, italic text, and more.

Code Example:
function hello() {
  console.log("Hello, World!");
}

Remember: Markdown is designed to be easy to read and write.`;
    
    setInputText(sample);
    toast.success('Sample text loaded');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Markdown Generator</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Convert your plain text into formatted Markdown with multiple style options
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Input Text</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Paste or type your text here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="style-select" className="dark:text-white">Markdown Style</Label>
              <Select value={markdownStyle} onValueChange={(value) => setMarkdownStyle(value as MarkdownStyle)}>
                <SelectTrigger id="style-select" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectItem value="auto" className="dark:text-white">Auto Detect</SelectItem>
                  <SelectItem value="heading" className="dark:text-white">Headings</SelectItem>
                  <SelectItem value="bold" className="dark:text-white">Bold Text</SelectItem>
                  <SelectItem value="italic" className="dark:text-white">Italic Text</SelectItem>
                  <SelectItem value="link" className="dark:text-white">Convert URLs to Links</SelectItem>
                  <SelectItem value="list" className="dark:text-white">Bullet List</SelectItem>
                  <SelectItem value="code" className="dark:text-white">Code Block</SelectItem>
                  <SelectItem value="blockquote" className="dark:text-white">Blockquote</SelectItem>
                  <SelectItem value="table" className="dark:text-white">Table (CSV/TSV)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[400px] font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <div className="flex flex-wrap gap-2">
              <Button onClick={generateMarkdown} className="bg-emerald-500 hover:bg-emerald-600">
                <FileText className="w-4 h-4 mr-2" />
                Generate Markdown
              </Button>
              <Button onClick={loadSample} variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                Load Sample
              </Button>
              <Button onClick={clearAll} variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Markdown Output</CardTitle>
            <CardDescription className="dark:text-gray-300">
              Your generated Markdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="markdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2 dark:bg-gray-700">
                <TabsTrigger value="markdown" className="dark:text-white dark:data-[state=active]:bg-gray-600">Markdown</TabsTrigger>
                <TabsTrigger value="preview" className="dark:text-white dark:data-[state=active]:bg-gray-600">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="markdown" className="mt-4">
                <Textarea
                  value={markdownOutput}
                  readOnly
                  className="min-h-[400px] font-mono text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Generated markdown will appear here..."
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <div className="min-h-[400px] p-4 border rounded-md prose prose-sm max-w-none dark:prose-invert dark:bg-gray-700 dark:border-gray-600 overflow-auto">
                  {markdownOutput ? (
                    <div dangerouslySetInnerHTML={{ 
                      __html: markdownOutput
                        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>')
                        .replace(/^- (.+)$/gm, '<li>$1</li>')
                        .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
                        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
                        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
                        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                        .replace(/\n\n/g, '<br/><br/>')
                    }} />
                  ) : (
                    <p className="text-gray-400">Preview will appear here...</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                <Copy className="w-4 h-4 mr-2" />
                Copy Markdown
              </Button>
              <Button onClick={downloadMarkdown} variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Download .md
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">About Markdown Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 dark:text-gray-300">
          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Supported Markdown Styles:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Auto Detect:</strong> Automatically formats text with headings, lists, and links</li>
              <li><strong>Headings:</strong> Converts short lines to Markdown headings (# H1, ## H2)</li>
              <li><strong>Bold/Italic:</strong> Wraps text in **bold** or *italic* markers</li>
              <li><strong>Links:</strong> Converts URLs to clickable Markdown links</li>
              <li><strong>Lists:</strong> Creates bullet lists with dash markers</li>
              <li><strong>Code Blocks:</strong> Wraps text in code fences (```)</li>
              <li><strong>Blockquotes:</strong> Adds quote markers (&gt;) to lines</li>
              <li><strong>Tables:</strong> Converts CSV/TSV data to Markdown tables</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Tips:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>For tables, separate columns with commas or tabs</li>
              <li>Auto detect mode works best with structured content</li>
              <li>URLs are automatically converted to links in auto mode</li>
              <li>Use the preview tab to see how your Markdown will render</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
