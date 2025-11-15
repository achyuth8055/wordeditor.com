import React from 'react';
import { useTextAnalysis } from '../hooks/useTextAnalysis';

interface CompactStatsProps {
  text: string;
}

export const CompactStats: React.FC<CompactStatsProps> = ({ text }) => {
  const analysis = useTextAnalysis(text);
  const readingTime = Math.ceil(analysis.words / 200);
  const paragraphs = text.split('\n\n').filter(p => p.trim()).length;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-center">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 font-semibold uppercase">Words</span>
          <span className="text-lg sm:text-xl font-bold text-green-600">{analysis.words}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 font-semibold uppercase">Chars</span>
          <span className="text-lg sm:text-xl font-bold text-blue-600">{analysis.characters}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 font-semibold uppercase">Para</span>
          <span className="text-lg sm:text-xl font-bold text-purple-600">{paragraphs}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 font-semibold uppercase">Read</span>
          <span className="text-lg sm:text-xl font-bold text-orange-600">{readingTime}m</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 font-semibold uppercase">Avg</span>
          <span className="text-lg sm:text-xl font-bold text-red-600">
            {analysis.words > 0 ? (analysis.characters / analysis.words).toFixed(1) : '0'}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center hidden sm:flex">
          <span className="text-xs text-gray-500 font-semibold uppercase">Speak</span>
          <span className="text-lg sm:text-xl font-bold text-indigo-600">
            {Math.ceil(analysis.words / 130)}m
          </span>
        </div>
      </div>
    </div>
  );
};
