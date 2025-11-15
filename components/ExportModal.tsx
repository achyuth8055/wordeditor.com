import React from 'react';
import { exportTXT, exportPDF } from '../services/exportService';

interface ExportModalProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ text, isOpen, onClose }) => {
  const [isExporting, setIsExporting] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleExport = async (format: 'txt' | 'pdf') => {
    if (!text.trim()) {
      setError('Please add some text before exporting');
      return;
    }

    setIsExporting(true);
    setError('');

    try {
      const timestamp = new Date().toLocaleDateString().replace(/\//g, '-');
      const filename = `document-${timestamp}`;

      if (format === 'txt') {
        exportTXT(text, `${filename}.txt`);
      } else {
        exportPDF(text, `${filename}.pdf`);
      }

      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed. Please try again.');
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-in fade-in scale-95">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Export Document</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <p className="text-gray-600 text-sm mb-6">
            Choose your preferred format to download the document.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => handleExport('txt')}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-file-alt"></i>
              <span>{isExporting ? 'Exporting...' : 'Export as TXT'}</span>
            </button>

            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-file-pdf"></i>
              <span>{isExporting ? 'Exporting...' : 'Export as PDF'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
