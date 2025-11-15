import React, { useState, useCallback } from 'react';
import { useTextAnalysis } from '../hooks/useTextAnalysis';
import {
  formatTextByLevel,
  analyzeReadability,
  improveGrammar,
  generateOutline,
  detectTone,
  paraphraseText,
} from '../services/deepseekService';

interface CompactStatsWithAIProps {
  text: string;
}

type ToolType = 'readability' | 'format' | 'grammar' | 'tone' | 'outline' | 'paraphrase';
type FormatLevel = 'school' | 'college' | 'professional' | 'simple';

export const CompactStatsWithAI: React.FC<CompactStatsWithAIProps> = ({ text }) => {
  const analysis = useTextAnalysis(text);
  const readingTime = Math.ceil(analysis.words / 200);
  const paragraphs = text.split('\n\n').filter(p => p.trim()).length;

  const [activeTool, setActiveTool] = useState<ToolType | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [formatLevel, setFormatLevel] = useState<FormatLevel>('college');

  const executeAction = useCallback(async (tool: ToolType) => {
    if (!text.trim()) {
      setError('Please enter some text first.');
      return;
    }

    // Prevent duplicate requests
    if (loading) return;

    setLoading(true);
    setResult(null);
    setError('');
    setActiveTool(tool);

    try {
      let response;

      switch (tool) {
        case 'format':
          response = await formatTextByLevel(text, formatLevel);
          setResult({ type: 'text', content: response });
          break;

        case 'readability':
          response = await analyzeReadability(text);
          setResult({ type: 'readability', content: response });
          break;

        case 'grammar':
          response = await improveGrammar(text);
          setResult({ type: 'text', content: response });
          break;

        case 'outline':
          response = await generateOutline(text);
          setResult({ type: 'text', content: response });
          break;

        case 'tone':
          response = await detectTone(text);
          setResult({ type: 'tone', content: response });
          break;

        case 'paraphrase':
          response = await paraphraseText(text);
          setResult({ type: 'text', content: response });
          break;

        default:
          setError('Unknown tool');
      }
    } catch (e: any) {
      console.error(`Error in ${tool}:`, e);
      setError(
        e.message?.includes('API key')
          ? 'API key not configured. Please check your environment variables.'
          : e.message || `Error processing ${tool}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  }, [text, loading, formatLevel]);

  const copyToClipboard = useCallback(() => {
    if (result?.type === 'text' && result?.content) {
      navigator.clipboard.writeText(result.content)
        .then(() => {
          // Show brief success feedback
          const originalError = error;
          setError('Copied to clipboard!');
          setTimeout(() => setError(originalError), 2000);
        })
        .catch(() => setError('Failed to copy to clipboard'));
    }
  }, [result, error]);

  const AIToolButton: React.FC<{ id: ToolType; label: string; icon: string }> = ({
    id,
    label,
    icon,
  }) => (
    <button
      onClick={() => executeAction(id)}
      disabled={loading}
      title={label}
      className={`flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap ${
        activeTool === id
          ? 'bg-green-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <i className={`fas ${icon} text-xs`}></i>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="space-y-2">
      {/* Stats Row */}
      <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-2 sm:p-3">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Words</span>
            <span className="text-sm sm:text-base font-bold text-green-600">{analysis.words}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Chars</span>
            <span className="text-sm sm:text-base font-bold text-blue-600">{analysis.characters}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Para</span>
            <span className="text-sm sm:text-base font-bold text-purple-600">{paragraphs}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Read</span>
            <span className="text-sm sm:text-base font-bold text-orange-600">{readingTime}m</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500 font-semibold uppercase">Avg</span>
            <span className="text-sm sm:text-base font-bold text-red-600">
              {analysis.words > 0 ? (analysis.characters / analysis.words).toFixed(1) : '0'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center hidden sm:flex">
            <span className="text-xs text-gray-500 font-semibold uppercase">Speak</span>
            <span className="text-sm sm:text-base font-bold text-indigo-600">
              {Math.ceil(analysis.words / 130)}m
            </span>
          </div>
        </div>
      </div>

      {/* AI Tools Row */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase hidden sm:inline">AI:</span>
          <AIToolButton id="readability" label="Readability" icon="fa-chart-line" />
          <AIToolButton id="format" label="Format" icon="fa-pen-fancy" />
          <AIToolButton id="grammar" label="Grammar" icon="fa-spell-check" />
          <AIToolButton id="tone" label="Tone" icon="fa-comments" />
          <AIToolButton id="outline" label="Outline" icon="fa-list" />
          <AIToolButton id="paraphrase" label="Rephrase" icon="fa-sync-alt" />
        </div>
      </div>

      {/* Format Level Selector */}
      {activeTool === 'format' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
          <select
            value={formatLevel}
            onChange={(e) => setFormatLevel(e.target.value as FormatLevel)}
            disabled={loading}
            className="w-full text-xs sm:text-sm p-1.5 border border-blue-300 rounded bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="school">School (9-12)</option>
            <option value="college">College</option>
            <option value="professional">Professional</option>
            <option value="simple">Simple</option>
          </select>
        </div>
      )}

      {/* Results */}
      {error && (
        <div className={`rounded-lg p-2 sm:p-3 ${error.includes('Copied') ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`${error.includes('Copied') ? 'text-green-700' : 'text-red-700'} text-xs sm:text-sm`}>
            <i className={`fas ${error.includes('Copied') ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-1`}></i>
            {error}
          </p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-3 bg-gray-50 border border-gray-200 rounded-lg">
          <i className="fas fa-spinner fa-spin text-lg text-green-600 mr-2"></i>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">Processing...</span>
        </div>
      )}

      {result && !loading && (
        <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3">
          {result.type === 'readability' && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded text-center">
                  <p className="text-xs text-blue-600 font-semibold">Score</p>
                  <p className="text-lg sm:text-xl font-bold text-blue-700">{result.content.score}</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="text-xs text-green-600 font-semibold">Grade</p>
                  <p className="text-xs sm:text-sm font-bold text-green-700 line-clamp-2">
                    {result.content.grade_level}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-700 line-clamp-2">{result.content.description}</p>
            </div>
          )}

          {result.type === 'tone' && (
            <div className="space-y-2">
              <div className="bg-purple-50 p-2 rounded">
                <p className="text-xs text-purple-600 font-semibold">Tone</p>
                <p className="text-sm font-bold text-purple-700 capitalize">
                  {result.content.tone} ({result.content.confidence}%)
                </p>
              </div>
              {result.content.suggestions?.length > 0 && (
                <div className="text-xs">
                  <p className="font-semibold text-gray-700 mb-1">Tips:</p>
                  <ul className="space-y-0.5">
                    {result.content.suggestions.slice(0, 2).map((s: string, i: number) => (
                      <li key={i} className="text-gray-700 line-clamp-1">• {s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {result.type === 'text' && (
            <div className="space-y-2">
              <div className="bg-gray-100 p-2 rounded max-h-32 overflow-y-auto">
                <p className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed line-clamp-6">
                  {result.content}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                disabled={loading}
                className="w-full bg-green-600 text-white px-2 py-1.5 rounded text-xs font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
              >
                <i className="fas fa-copy"></i>
                Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
