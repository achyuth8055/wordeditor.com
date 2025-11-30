'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Download, Trash2, Code, Eye, FileCode } from 'lucide-react';
import { toast } from 'sonner';

type ConversionType = 'basic' | 'formatted' | 'styled' | 'semantic';

export const TextToHtml = () => {
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');
  const [conversionType, setConversionType] = useState<ConversionType>('basic');

  const convertToHtml = (inputText: string, type: ConversionType): string => {
    if (!inputText) return '';

    let result = '';
    const lines = inputText.split('\n');

    switch (type) {
      case 'basic':
        // Simple paragraph conversion
        result = lines
          .filter(line => line.trim())
          .map(line => `<p>${escapeHtml(line)}</p>`)
          .join('\n');
        break;

      case 'formatted':
        // Convert with basic formatting detection
        result = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n';
        
        lines.forEach(line => {
          const trimmed = line.trim();
          if (!trimmed) {
            result += '  <br>\n';
          } else if (trimmed.startsWith('# ')) {
            result += `  <h1>${escapeHtml(trimmed.substring(2))}</h1>\n`;
          } else if (trimmed.startsWith('## ')) {
            result += `  <h2>${escapeHtml(trimmed.substring(3))}</h2>\n`;
          } else if (trimmed.startsWith('### ')) {
            result += `  <h3>${escapeHtml(trimmed.substring(4))}</h3>\n`;
          } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            result += `  <li>${escapeHtml(trimmed.substring(2))}</li>\n`;
          } else {
            result += `  <p>${escapeHtml(trimmed)}</p>\n`;
          }
        });
        
        result += '</body>\n</html>';
        break;

      case 'styled':
        // Convert with inline CSS styling
        result = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      color: #333;
    }
    h1, h2, h3 { color: #2c3e50; }
    p { margin-bottom: 15px; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
`;
        
        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed) {
            result += `  <p>${escapeHtml(trimmed)}</p>\n`;
          }
        });
        
        result += '</body>\n</html>';
        break;

      case 'semantic':
        // Convert with semantic HTML5 tags
        result = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <article>
    <header>
      <h1>${escapeHtml(lines[0] || 'Document Title')}</h1>
    </header>
    <section>
`;
        
        lines.slice(1).forEach(line => {
          const trimmed = line.trim();
          if (trimmed) {
            result += `      <p>${escapeHtml(trimmed)}</p>\n`;
          }
        });
        
        result += `    </section>
  </article>
</body>
</html>`;
        break;
    }

    return result;
  };

  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleConvert = () => {
    const converted = convertToHtml(text, conversionType);
    setHtml(converted);
    toast.success('Text converted to HTML successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    toast.success('HTML copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded!');
  };

  const handleClear = () => {
    setText('');
    setHtml('');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Text to HTML Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert plain text to clean, semantic HTML code instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                Plain Text Input
              </h2>
              <Select value={conversionType} onValueChange={(val) => setConversionType(val as ConversionType)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="formatted">Formatted</SelectItem>
                  <SelectItem value="styled">Styled</SelectItem>
                  <SelectItem value="semantic">Semantic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Textarea
              placeholder="Enter your plain text here...

Example:
# Main Title
This is a paragraph.

## Subtitle
- List item 1
- List item 2"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />

            <div className="flex gap-2">
              <Button onClick={handleConvert} className="flex-1" disabled={!text}>
                <Code className="w-4 h-4 mr-2" />
                Convert to HTML
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        <Card className="p-6">
          <Tabs defaultValue="code" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">HTML Output</h2>
              <TabsList>
                <TabsTrigger value="code">
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="code" className="mt-0">
              <Textarea
                value={html}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                placeholder="HTML output will appear here..."
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <div
                className="min-h-[400px] p-4 border rounded-lg bg-white dark:bg-gray-900 overflow-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleCopy} disabled={!html} variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copy HTML
            </Button>
            <Button onClick={handleDownload} disabled={!html} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download .html
            </Button>
          </div>
        </Card>
      </div>

      {/* Conversion Type Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">Conversion Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Basic</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Simple paragraph tags for each line
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Formatted</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Detects markdown-style headings and lists
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Styled</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Includes inline CSS styling
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Semantic</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Uses HTML5 semantic tags (article, section)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
