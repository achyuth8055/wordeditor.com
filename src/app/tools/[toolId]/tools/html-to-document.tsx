'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Trash2, FileText, Eye, Printer } from 'lucide-react';
import { toast } from 'sonner';

type ExportFormat = 'word' | 'pdf' | 'print';

export const HtmlToDocument = () => {
  const [html, setHtml] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');

  const handlePreview = () => {
    setPreviewHtml(html);
    toast.success('Preview updated!');
  };

  const stripHtmlTags = (html: string): string => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const handleExportWord = () => {
    if (!html) {
      toast.error('Please enter HTML content first!');
      return;
    }

    // Create Word document HTML structure
    const wordDocument = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:w="urn:schemas-microsoft-com:office:word" 
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>Document</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 8.5in 11in;
      margin: 1in;
    }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000000;
    }
    h1 { font-size: 20pt; font-weight: bold; margin-bottom: 12pt; }
    h2 { font-size: 16pt; font-weight: bold; margin-bottom: 10pt; }
    h3 { font-size: 14pt; font-weight: bold; margin-bottom: 8pt; }
    p { margin-bottom: 10pt; text-align: justify; }
    ul, ol { margin-left: 20pt; margin-bottom: 10pt; }
    li { margin-bottom: 5pt; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 10pt; }
    td, th { border: 1px solid #000000; padding: 5pt; }
    th { background-color: #f0f0f0; font-weight: bold; }
    a { color: #0563c1; text-decoration: underline; }
    img { max-width: 100%; height: auto; }
    blockquote { 
      margin: 10pt 20pt; 
      padding-left: 10pt; 
      border-left: 3pt solid #cccccc; 
      font-style: italic; 
    }
    code {
      font-family: 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 2pt 4pt;
      border-radius: 2pt;
    }
    pre {
      font-family: 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 10pt;
      border-radius: 4pt;
      overflow-x: auto;
      margin-bottom: 10pt;
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;

    // Create blob and download
    const blob = new Blob(['\ufeff', wordDocument], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.doc';
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Word document downloaded! (.doc format)');
  };

  const handleExportPDF = () => {
    if (!html) {
      toast.error('Please enter HTML content first!');
      return;
    }

    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to download PDF');
      return;
    }

    const printDocument = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Document PDF</title>
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }
    @media print {
      body { 
        margin: 0;
        padding: 0;
      }
      .no-print { display: none; }
    }
    body {
      font-family: 'Arial', sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { font-size: 24pt; margin-bottom: 15pt; page-break-after: avoid; }
    h2 { font-size: 18pt; margin-bottom: 12pt; page-break-after: avoid; }
    h3 { font-size: 14pt; margin-bottom: 10pt; page-break-after: avoid; }
    p { margin-bottom: 10pt; text-align: justify; }
    ul, ol { margin-left: 20pt; margin-bottom: 10pt; }
    table { 
      border-collapse: collapse; 
      width: 100%; 
      margin-bottom: 15pt;
      page-break-inside: avoid;
    }
    td, th { border: 1px solid #000; padding: 8pt; }
    th { background-color: #f0f0f0; font-weight: bold; }
    img { max-width: 100%; height: auto; page-break-inside: avoid; }
    pre, code { 
      font-family: 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 5pt;
      border-radius: 3pt;
    }
    blockquote {
      margin: 10pt 20pt;
      padding-left: 10pt;
      border-left: 3pt solid #ccc;
      font-style: italic;
    }
  </style>
</head>
<body>
  ${html}
  <div class="no-print" style="margin-top: 30px; padding: 20px; border-top: 2px solid #ccc; text-align: center;">
    <button onclick="window.print()" style="padding: 10px 20px; font-size: 14pt; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 5px;">
      Print / Save as PDF
    </button>
    <p style="margin-top: 10px; font-size: 10pt; color: #666;">
      Use Ctrl+P (Windows) or Cmd+P (Mac) to print or save as PDF
    </p>
  </div>
</body>
</html>`;

    printWindow.document.write(printDocument);
    printWindow.document.close();
    
    // Auto-print after content loads
    setTimeout(() => {
      printWindow.print();
    }, 500);
    
    toast.success('PDF print dialog opened!');
  };

  const handlePrint = () => {
    if (!html) {
      toast.error('Please enter HTML content first!');
      return;
    }
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Print Document</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          @media print { 
            body { padding: 0; }
          }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    
    toast.success('Print dialog opened!');
  };

  const handleClear = () => {
    setHtml('');
    setPreviewHtml('');
  };

  const loadSampleHtml = () => {
    const sample = `<h1>Sample Document</h1>
<p>This is a sample HTML document that you can convert to Word or PDF format.</p>

<h2>Features</h2>
<ul>
  <li>Convert HTML to Word (.doc)</li>
  <li>Convert HTML to PDF (via print)</li>
  <li>Preserve formatting and styles</li>
  <li>Support for tables, lists, and images</li>
</ul>

<h2>Getting Started</h2>
<p>Simply paste your HTML content and click the export button to download your document.</p>

<h3>Supported Elements</h3>
<p>This converter supports most common HTML elements including:</p>
<ol>
  <li>Headings (h1-h6)</li>
  <li>Paragraphs</li>
  <li>Lists (ordered and unordered)</li>
  <li>Tables</li>
  <li>Images</li>
  <li>Links</li>
  <li>Text formatting (bold, italic, underline)</li>
</ol>

<blockquote>
  <p>"Great tool for converting web content to documents!" - User Review</p>
</blockquote>`;
    
    setHtml(sample);
    setPreviewHtml(sample);
    toast.success('Sample HTML loaded!');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">HTML to Document Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert HTML content to Word documents (.doc) or PDF files
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                HTML Input
              </h2>
              <Button variant="outline" size="sm" onClick={loadSampleHtml}>
                Load Sample
              </Button>
            </div>
            
            <Textarea
              placeholder="Paste your HTML content here...

Example:
<h1>Title</h1>
<p>Your content here...</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />

            <div className="flex gap-2">
              <Button onClick={handlePreview} className="flex-1" disabled={!html}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="p-6">
          <Tabs defaultValue="preview" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Document Preview</h2>
              <TabsList>
                <TabsTrigger value="preview">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="preview" className="mt-0">
              <div
                className="min-h-[400px] p-6 border rounded-lg bg-white dark:bg-gray-900 overflow-auto prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: previewHtml || '<p class="text-gray-400">Preview will appear here...</p>' }}
              />
            </TabsContent>
          </Tabs>

          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={handleExportWord} disabled={!html} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download as Word (.doc)
            </Button>
            <Button onClick={handleExportPDF} disabled={!html} variant="outline" className="w-full">
              <Printer className="w-4 h-4 mr-2" />
              Export as PDF (Print)
            </Button>
            <Button onClick={handlePrint} disabled={!html} variant="outline" className="w-full">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </Card>
      </div>

      {/* Features Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">Export Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Word Document
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Download as .doc file compatible with Microsoft Word and other word processors
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Printer className="w-5 h-5" />
              PDF Export
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use browser&apos;s print function to save as PDF with full formatting preserved
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Copy className="w-5 h-5" />
              Direct Print
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Print directly to your connected printer with optimized page layout
            </p>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-lg font-semibold mb-3">💡 Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>For PDF export: Use Chrome or Edge for best results, then select &ldquo;Save as PDF&rdquo; in print dialog</li>
          <li>Word format (.doc) is compatible with Microsoft Word 2003 and newer versions</li>
          <li>Complex CSS styles may not be fully preserved in Word format</li>
          <li>Images should use absolute URLs for proper display in exported documents</li>
          <li>Tables and lists are fully supported in both export formats</li>
        </ul>
      </Card>
    </div>
  );
};
