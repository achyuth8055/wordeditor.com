import React from 'react';
import { useTextAnalysis } from '../hooks/useTextAnalysis';
import { TextAnalysis } from '../types';

interface WordCounterProps {
  text: string;
}

const StatCard: React.FC<{ icon: string; label: string; value: number }> = ({ icon, label, value }) => (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 rounded-lg border border-gray-200">
    <div className="flex items-center gap-2">
      <div className="bg-green-600 text-white p-2 rounded-lg">
        <i className={`fas ${icon} text-sm`}></i>
      </div>
      <div>
        <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

const LimitCard: React.FC<{ label: string; value: number; limit: number; color: string }> = ({
  label,
  value,
  limit,
  color,
}) => {
  const percentage = limit > 0 ? (value / limit) * 100 : 0;
  const isOverLimit = percentage > 100;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          isOverLimit ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        <span className="font-semibold text-gray-700">{value}</span> / {limit} characters
      </p>
    </div>
  );
};

export const WordCounter: React.FC<WordCounterProps> = ({ text }) => {
  const analysis: TextAnalysis = useTextAnalysis(text);

  const readingTime = Math.ceil(analysis.words / 200); // Average reading speed
  const estimatedSpeakingTime = Math.ceil(analysis.words / 130); // Average speaking speed

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">Text Statistics</h3>
        <div className="grid grid-cols-2 gap-2">
          <StatCard icon="fa-file-alt" label="Words" value={analysis.words} />
          <StatCard icon="fa-keyboard" label="Characters" value={analysis.characters} />
          <StatCard icon="fa-clock" label="Read Time" value={readingTime} />
          <StatCard icon="fa-microphone" label="Speak Time" value={estimatedSpeakingTime} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-2">Platform Character Limits</h3>
        <div className="space-y-2">
          <LimitCard
            label="Twitter/X"
            value={analysis.characters}
            limit={280}
            color="bg-sky-500"
          />
          <LimitCard
            label="Google Meta Description"
            value={analysis.characters}
            limit={300}
            color="bg-green-500"
          />
          <LimitCard
            label="Facebook"
            value={analysis.characters}
            limit={250}
            color="bg-blue-500"
          />
        </div>
      </div>

      {text && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <i className="fas fa-info-circle mr-2"></i>
            <strong>Average word length:</strong> {(analysis.characters / analysis.words).toFixed(1)} characters
          </p>
        </div>
      )}
    </div>
  );
};
