import React, { useState } from 'react';

interface CaseConverterProps {
  text: string;
}

type CaseType = 'uppercase' | 'lowercase' | 'capitalize' | 'title' | 'sentence';

export const CaseConverter: React.FC<CaseConverterProps> = ({ text }) => {
  const [convertedText, setConvertedText] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('uppercase');

  const convertCase = (caseType: CaseType) => {
    if (!text.trim()) {
      alert("Please enter some text in the editor first.");
      return;
    }

    let result = '';
    
    switch (caseType) {
      case 'uppercase':
        result = text.toUpperCase();
        break;
      case 'lowercase':
        result = text.toLowerCase();
        break;
      case 'capitalize':
        result = text
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'title':
        result = text
          .split(' ')
          .map(word => {
            if (word.length > 0) {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return word;
          })
          .join(' ');
        break;
      case 'sentence':
        result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        break;
      default:
        result = text;
    }

    setConvertedText(result);
    setSelectedCase(caseType);
  };

  const copyToClipboard = () => {
    if (convertedText) {
      navigator.clipboard.writeText(convertedText);
      alert('Converted text copied to clipboard!');
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-gray-800">Text Case Converter</h3>
      <p className="text-xs text-gray-500">Convert your text to different cases.</p>

      <div className="grid grid-cols-2 gap-1">
        <button
          onClick={() => convertCase('uppercase')}
          className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
            selectedCase === 'uppercase'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          UPPER
        </button>
        <button
          onClick={() => convertCase('lowercase')}
          className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
            selectedCase === 'lowercase'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          lower
        </button>
        <button
          onClick={() => convertCase('capitalize')}
          className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
            selectedCase === 'capitalize'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Capt.
        </button>
        <button
          onClick={() => convertCase('title')}
          className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
            selectedCase === 'title'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Title
        </button>
        <button
          onClick={() => convertCase('sentence')}
          className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors col-span-2 ${
            selectedCase === 'sentence'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sentence case
        </button>
      </div>

      {convertedText && (
        <div className="mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-600 mb-1">Converted Text:</p>
          <p className="text-gray-800 whitespace-pre-wrap break-words text-xs">{convertedText}</p>
          <button
            onClick={copyToClipboard}
            className="mt-2 w-full bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};
