import React, { useState } from 'react';
import { summarizeText } from '../services/geminiService';

interface SummarizerProps {
  text: string;
}

export const Summarizer: React.FC<SummarizerProps> = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please enter some text in the editor first.');
      return;
    }
    setLoading(true);
    setResult('');
    setError('');
    try {
      const response = await summarizeText(text);
      setResult(response);
    } catch (e) {
      setError('Failed to summarize text. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert('Summary copied to clipboard!');
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-gray-800">AI Summarizer</h3>
      <p className="text-xs text-gray-500">Get a concise summary of your text using AI.</p>

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors font-medium flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Summarizing...
          </>
        ) : (
          <>
            <i className="fas fa-compress"></i>
            Summarize Text
          </>
        )}
      </button>

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-xs">{error}</p>
        </div>
      )}

      {result && (
        <div className="p-2 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-600 mb-2 font-semibold">Summary:</p>
          <p className="text-gray-800 whitespace-pre-wrap break-words leading-relaxed text-xs">{result}</p>
          <button
            onClick={copyToClipboard}
            className="mt-2 w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
          >
            <i className="fas fa-copy mr-2"></i>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};
