'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Eye, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## Features
- **Bold text**
- *Italic text*
- ~~Strikethrough~~
- \`Inline code\`

### Code Block
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Links and Images
[Visit our website](https://example.com)

### Lists
1. First item
2. Second item
3. Third item

- Unordered item
- Another item
  - Nested item

### Blockquote
> This is a blockquote
> It can span multiple lines

### Table
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
  };

  const renderMarkdown = (text: string) => {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, '<del class="line-through">$1</del>');

    // Inline code
    html = html.replace(
      /`(.+?)`/g,
      '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>'
    );

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
    );

    // Blockquotes
    html = html.replace(
      /^> (.+$)/gim,
      '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700">$1</blockquote>'
    );

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]+?)```/g,
      '<pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>'
    );

    // Unordered lists
    html = html.replace(/^\* (.+$)/gim, '<li class="ml-6 list-disc">$1</li>');
    html = html.replace(/^- (.+$)/gim, '<li class="ml-6 list-disc">$1</li>');

    // Ordered lists
    html = html.replace(/^\d+\. (.+$)/gim, '<li class="ml-6 list-decimal">$1</li>');

    // Line breaks
    html = html.replace(/\n\n/g, '<br /><br />');
    html = html.replace(/\n/g, '<br />');

    return html;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="split" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="split">
            <Eye className="w-4 h-4 mr-2" />
            Split View
          </TabsTrigger>
          <TabsTrigger value="edit">
            <Code className="w-4 h-4 mr-2" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="split" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Markdown Input</h3>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[500px] text-base font-mono"
                placeholder="Enter markdown here..."
              />
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Live Preview</h3>
              <div
                className="prose max-w-none min-h-[500px] p-4 bg-gray-50 rounded-lg overflow-auto"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Markdown Editor</h3>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[600px] text-base font-mono"
              placeholder="Enter markdown here..."
            />
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div
              className="prose max-w-none min-h-[600px]"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
            />
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2">
        <Button onClick={handleCopy} variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Copy Markdown
        </Button>
      </div>

      <Card className="p-6 bg-teal-50">
        <h3 className="font-semibold mb-2">About Markdown Preview</h3>
        <p className="text-sm text-gray-700">
          Write and preview Markdown in real-time. Supports headings, bold, italic, links, lists,
          code blocks, blockquotes, and more. Perfect for writing documentation, README files, blog
          posts, and any content that uses Markdown formatting.
        </p>
      </Card>
    </div>
  );
};
