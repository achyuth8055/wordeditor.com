import React from 'react';

// This tells TypeScript that `jspdf` will be available on the window object.
declare global {
  interface Window {
    jspdf: any;
  }
}

interface ExportToolsProps {
  text: string;
}

export const ExportTools: React.FC<ExportToolsProps> = ({ text }) => {

  const handleExport = (format: 'txt' | 'doc') => {
    if (!text.trim()) {
      alert("There's nothing to export!");
      return;
    }
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `document.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const handleCopyToClipboard = () => {
    if (!text.trim()) {
      alert("There's nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  const handlePdfExport = () => {
    if (!text.trim()) {
      alert("There's nothing to export!");
      return;
    }

    if (typeof window.jspdf === 'undefined') {
      alert('PDF generation library is not available. Please check your internet connection and try again.');
      console.error('jsPDF is not loaded.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const margin = 15;
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = doc.internal.pageSize.getWidth() - margin * 2;
    
    doc.setFontSize(12);
    const lineHeight = doc.getLineHeight();

    const lines = doc.splitTextToSize(text, textWidth);
    
    let cursorY = margin;

    lines.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    doc.save('document.pdf');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Export & Share</h3>
      <p className="text-sm text-gray-500">Save your work or share it with others.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => handleExport('txt')} className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
          <i className="fas fa-file-alt text-blue-500 text-2xl"></i>
          <span className="font-semibold">Save as .txt</span>
        </button>
        <button onClick={() => handleExport('doc')} className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
          <i className="fas fa-file-word text-blue-700 text-2xl"></i>
          <span className="font-semibold">Save as .doc</span>
        </button>
        <button onClick={handlePdfExport} className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
          <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
          <span className="font-semibold">Export to PDF</span>
        </button>
        <button onClick={handleCopyToClipboard} className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
          <i className="fas fa-copy text-green-500 text-2xl"></i>
          <span className="font-semibold">Copy to Clipboard</span>
        </button>
      </div>
    </div>
  );
};