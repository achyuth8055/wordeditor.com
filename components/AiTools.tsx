import React, { useState } from 'react';
import { summarizeText, translateText, academicMode } from '../services/geminiService';

interface AiToolsProps {
  text: string;
}

export const AiTools: React.FC<AiToolsProps> = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [targetLang, setTargetLang] = useState('Spanish');

  const handleAction = async (action: (text: string, lang?: string) => Promise<string>) => {
    if (!text.trim()) {
      setError('Please enter some text in the editor first.');
      return;
    }
    setLoading(true);
    setResult('');
    setError('');
    try {
      const response = await action(text, targetLang);
      setResult(response);
    } catch (e) {
      setError('An error occurred. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">AI Writing Assistant</h3>
      <p className="text-sm text-gray-500">Enhance your text with powerful AI tools.</p>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => handleAction(summarizeText)} disabled={loading} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors">
          Summarize
        </button>
        <button onClick={() => handleAction(academicMode)} disabled={loading} className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 disabled:bg-purple-300 transition-colors">
          Academic Mode
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <input
            type="text"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            placeholder="Enter target language..."
            className="w-full flex-grow border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
        />
        <button onClick={() => handleAction(translateText)} disabled={loading} className="w-full sm:w-auto flex-shrink-0 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:bg-teal-300 transition-colors">
          Translate
        </button>
      </div>

      {(loading || result || error) && (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 min-h-[150px]">
          {loading && <div className="flex justify-center items-center h-full"><i className="fas fa-spinner fa-spin text-2xl text-gray-500"></i></div>}
          {error && <p className="text-red-600">{error}</p>}
          {result && <p className="text-gray-700 whitespace-pre-wrap">{result}</p>}
        </div>
      )}
    </div>
  );
};
