import React, { useState } from 'react';
import {
  formatTextByLevel,
  analyzeReadability,
  improveGrammar,
  generateOutline,
  detectTone,
  paraphraseText,
} from '../services/deepseekService';

interface AIToolsAdvancedProps {
  text: string;
}

type ToolType = 'format' | 'readability' | 'grammar' | 'outline' | 'tone' | 'paraphrase';
type FormatLevel = 'school' | 'college' | 'professional' | 'simple';

export const AIToolsAdvanced: React.FC<AIToolsAdvancedProps> = ({ text }) => {
  const [activeTool, setActiveTool] = useState<ToolType>('readability');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [formatLevel, setFormatLevel] = useState<FormatLevel>('college');

  const executeAction = async (tool: ToolType) => {
    if (!text.trim()) {
      setError('Please enter some text in the editor first.');
      return;
    }

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
      setError(e.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.type === 'text' && result?.content) {
      navigator.clipboard.writeText(result.content);
      alert('Content copied to clipboard!');
    }
  };

  const ToolButton: React.FC<{ id: ToolType; label: string; icon: string }> = ({
    id,
    label,
    icon,
  }) => (
    <button
      onClick={() => executeAction(id)}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
        activeTool === id
          ? 'bg-green-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <i className={`fas ${icon} text-sm`}></i>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-gray-800 mb-3">AI Tools</h3>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <ToolButton id="readability" label="Readability" icon="fa-chart-line" />
          <ToolButton id="format" label="Format" icon="fa-pen-fancy" />
          <ToolButton id="grammar" label="Grammar" icon="fa-spell-check" />
          <ToolButton id="tone" label="Tone" icon="fa-comments" />
          <ToolButton id="outline" label="Outline" icon="fa-list" />
          <ToolButton id="paraphrase" label="Rephrase" icon="fa-sync-alt" />
        </div>
      </div>

      {activeTool === 'format' && (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Format for:
          </label>
          <select
            value={formatLevel}
            onChange={(e) => setFormatLevel(e.target.value as FormatLevel)}
            disabled={loading}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="school">School Level (9-12)</option>
            <option value="college">College Level</option>
            <option value="professional">Professional</option>
            <option value="simple">Simple & Easy</option>
          </select>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <i className="fas fa-spinner fa-spin text-3xl text-green-600"></i>
          <span className="ml-3 text-gray-600 font-medium">Processing...</span>
        </div>
      )}

      {result && !loading && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {result.type === 'readability' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Readability Analysis</h4>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 font-semibold uppercase">Score</p>
                    <p className="text-2xl font-bold text-blue-700">{result.content.score}</p>
                    <p className="text-xs text-blue-600 mt-1">/100</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg col-span-2">
                    <p className="text-xs text-green-600 font-semibold uppercase">Grade Level</p>
                    <p className="text-lg font-bold text-green-700">
                      {result.content.grade_level}
                    </p>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{result.content.description}</p>
                </div>
              </div>
            </div>
          )}

          {result.type === 'tone' && (
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tone Analysis</h4>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg mb-3">
                  <p className="text-sm text-purple-600 font-semibold">Detected Tone:</p>
                  <p className="text-xl font-bold text-purple-700 capitalize">
                    {result.content.tone}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Confidence: {result.content.confidence}%
                  </p>
                </div>

                {result.content.suggestions?.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Suggestions:</p>
                    <ul className="space-y-2">
                      {result.content.suggestions.map((suggestion: string, idx: number) => (
                        <li key={idx} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-green-600 font-bold">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {result.type === 'text' && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-700 capitalize mb-2">
                {activeTool === 'grammar' && 'Corrected Text'}
                {activeTool === 'outline' && 'Generated Outline'}
                {activeTool === 'format' && `Text Formatted for ${formatLevel}`}
                {activeTool === 'paraphrase' && 'Rephrased Text'}
              </p>
              <div className="bg-gray-50 p-3 rounded-lg max-h-64 overflow-y-auto">
                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
                  {result.content}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className="w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <i className="fas fa-copy"></i>
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
