import React, { useState, useEffect } from 'react';
import { CaseConverter as CaseConverterComponent } from './CaseConverter';
import { CompactStatsWithAI } from './CompactStatsWithAI';

export const CaseConverterPage: React.FC = () => {
  const [text, setText] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('caseconverter-text');
    if (saved) setText(saved);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('caseconverter-text', text);
  }, [text]);

  const handleClear = () => {
    if (text && window.confirm('Are you sure you want to clear all text?')) {
      setText('');
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(text + clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-2 lg:gap-4 p-2 lg:p-4 overflow-hidden">
      {/* Left Ad Space - Hidden on mobile */}
      <div className="hidden lg:flex w-20 lg:w-32 bg-white border border-gray-200 rounded-lg flex-shrink-0">
        {/* Ad space */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-2 lg:gap-4 overflow-hidden">
        {/* Text Editor */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Stats Bar */}
          <div className="p-2 lg:p-3 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white flex-shrink-0">
            <CompactStatsWithAI text={text} />
          </div>

          {/* Editor Area */}
          <div className="flex-grow overflow-y-auto p-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here... Your work is automatically saved."
              className="w-full h-full min-h-[300px] lg:min-h-[400px] resize-none border-0 focus:ring-0 p-2 lg:p-4 text-sm lg:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="p-2 lg:p-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 lg:gap-4 text-xs text-gray-500">
              {text && (
                <>
                  <span className="hidden md:inline">Last updated: just now</span>
                  <span className="hidden md:inline">•</span>
                  <span>Draft saved</span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handlePaste}
                title="Paste from clipboard"
                className="p-1.5 sm:p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-semibold text-xs lg:text-sm"
              >
                Paste
              </button>
              <button
                onClick={handleClear}
                title="Clear all text"
                disabled={!text}
                className="p-1.5 sm:p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xs lg:text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Case Converter Panel */}
        <div className="w-full lg:w-72 flex-shrink-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-y-auto p-2 lg:p-3">
          <CaseConverterComponent text={text} />
        </div>
      </div>

      {/* Right Ad Space - Hidden on mobile */}
      <div className="hidden lg:flex w-20 lg:w-32 bg-white border border-gray-200 rounded-lg flex-shrink-0">
        {/* Ad space */}
      </div>
    </div>
  );
};
