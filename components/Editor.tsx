
import React from 'react';
import { CompactStatsWithAI } from './CompactStatsWithAI';

interface EditorProps {
  text: string;
  onTextChange: (text: string) => void;
  onExport?: () => void;
}

export const Editor: React.FC<EditorProps> = ({ text, onTextChange, onExport }) => {
  const handleClear = () => {
    if (text && window.confirm('Are you sure you want to clear all text?')) {
      onTextChange('');
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      onTextChange(text + clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Compact Stats with AI Tools */}
      <div className="p-2 sm:p-3 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <CompactStatsWithAI text={text} />
      </div>

      {/* Editor Area */}
      <div className="flex-grow p-1">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Start typing or paste your text here... Your work is automatically saved."
          className="w-full h-full min-h-[400px] resize-none border-0 focus:ring-0 p-3 sm:p-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Footer Actions */}
      <div className="p-2 sm:p-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
        <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
          {text && (
            <>
              <span>Last updated: just now</span>
              <span>•</span>
              <span>Draft saved</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onExport}
            title="Export document"
            className="p-1.5 sm:p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <i className="fas fa-download text-sm"></i>
          </button>
          <button
            onClick={handlePaste}
            title="Paste from clipboard"
            className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="fas fa-paste text-sm"></i>
          </button>
          <button
            onClick={handleClear}
            title="Clear all text"
            disabled={!text}
            className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-trash text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
