'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Trash2, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type ParaphraseMode = 'standard' | 'fluency' | 'formal' | 'simple' | 'creative' | 'expand' | 'shorten';

interface ParaphraseResult {
  original: string;
  paraphrased: string;
  changes: { from: string; to: string }[];
  mode: ParaphraseMode;
}

export const Paraphraser = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<ParaphraseResult | null>(null);
  const [mode, setMode] = useState<ParaphraseMode>('standard');
  const [synonymIntensity, setSynonymIntensity] = useState([50]);
  const [isProcessing, setIsProcessing] = useState(false);

  const modeDescriptions: Record<ParaphraseMode, string> = {
    standard: 'Balanced rewriting maintaining original meaning',
    fluency: 'Improves flow and naturalness',
    formal: 'Converts to professional, academic tone',
    simple: 'Uses easier words and shorter sentences',
    creative: 'More expressive and varied language',
    expand: 'Adds detail and elaboration',
    shorten: 'Condenses while keeping key information',
  };

  // Simple synonym dictionary (in production, this would be an API call)
  const synonyms: Record<string, string[]> = {
    'good': ['excellent', 'great', 'fine', 'nice', 'positive', 'beneficial'],
    'bad': ['poor', 'negative', 'unfavorable', 'adverse', 'substandard'],
    'big': ['large', 'huge', 'substantial', 'considerable', 'significant'],
    'small': ['tiny', 'little', 'minor', 'compact', 'petite'],
    'important': ['significant', 'crucial', 'vital', 'essential', 'critical'],
    'help': ['assist', 'aid', 'support', 'facilitate', 'enable'],
    'show': ['demonstrate', 'display', 'exhibit', 'reveal', 'illustrate'],
    'make': ['create', 'produce', 'generate', 'construct', 'build'],
    'think': ['believe', 'consider', 'assume', 'suppose', 'contemplate'],
    'use': ['utilize', 'employ', 'apply', 'implement', 'leverage'],
    'get': ['obtain', 'acquire', 'receive', 'gain', 'secure'],
    'very': ['extremely', 'highly', 'remarkably', 'exceptionally', 'considerably'],
    'also': ['additionally', 'furthermore', 'moreover', 'likewise', 'similarly'],
    'because': ['since', 'as', 'due to', 'owing to', 'for the reason that'],
    'but': ['however', 'nevertheless', 'nonetheless', 'yet', 'although'],
    'many': ['numerous', 'multiple', 'various', 'several', 'abundant'],
    'different': ['various', 'diverse', 'distinct', 'alternative', 'separate'],
    'new': ['novel', 'fresh', 'recent', 'modern', 'innovative'],
    'old': ['aged', 'ancient', 'previous', 'former', 'vintage'],
    'easy': ['simple', 'straightforward', 'effortless', 'uncomplicated'],
    'hard': ['difficult', 'challenging', 'complex', 'demanding', 'arduous'],
    'fast': ['quick', 'rapid', 'swift', 'speedy', 'prompt'],
    'slow': ['sluggish', 'gradual', 'leisurely', 'unhurried'],
  };

  const paraphraseText = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      let paraphrased = inputText;
      const changes: { from: string; to: string }[] = [];

      // Apply mode-specific transformations
      switch (mode) {
        case 'formal':
          // Replace contractions
          paraphrased = paraphrased
            .replace(/don't/gi, 'do not')
            .replace(/can't/gi, 'cannot')
            .replace(/won't/gi, 'will not')
            .replace(/it's/gi, 'it is')
            .replace(/I'm/gi, 'I am')
            .replace(/you're/gi, 'you are')
            .replace(/they're/gi, 'they are');
          break;

        case 'simple':
          // Simplify complex words (basic examples)
          paraphrased = paraphrased
            .replace(/utilize/gi, 'use')
            .replace(/facilitate/gi, 'help')
            .replace(/implement/gi, 'use')
            .replace(/demonstrate/gi, 'show');
          break;

        case 'expand':
          // Add elaboration (simplified example)
          paraphrased = paraphrased
            .replace(/good/gi, 'quite good and beneficial')
            .replace(/important/gi, 'very important and significant')
            .replace(/helps/gi, 'provides assistance and helps');
          break;

        case 'shorten':
          // Remove filler words
          paraphrased = paraphrased
            .replace(/\b(really|very|quite|rather|somewhat)\s+/gi, '')
            .replace(/\b(just|actually|basically|literally)\s+/gi, '')
            .replace(/in order to/gi, 'to')
            .replace(/due to the fact that/gi, 'because');
          break;
      }

      // Apply synonym replacement based on intensity
      const words = paraphrased.split(/\b/);
      const intensity = synonymIntensity[0] / 100;

      words.forEach((word, index) => {
        const lowerWord = word.toLowerCase();
        if (synonyms[lowerWord] && Math.random() < intensity) {
          const alternatives = synonyms[lowerWord];
          const newWord = alternatives[Math.floor(Math.random() * alternatives.length)];
          
          // Preserve case
          const replacement = word[0] === word[0].toUpperCase() 
            ? newWord.charAt(0).toUpperCase() + newWord.slice(1)
            : newWord;

          if (word !== replacement) {
            changes.push({ from: word, to: replacement });
            words[index] = replacement;
          }
        }
      });

      paraphrased = words.join('');

      // Additional transformations for creative mode
      if (mode === 'creative') {
        paraphrased = paraphrased
          .replace(/\. /g, (match, offset) => {
            return Math.random() > 0.5 ? '; ' : match;
          });
      }

      setResult({
        original: inputText,
        paraphrased: paraphrased,
        changes: changes.slice(0, 10), // Show first 10 changes
        mode,
      });

      setIsProcessing(false);
    }, 1000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (!result) return;

    const report = `
PARAPHRASE REPORT
=================

Mode: ${mode.toUpperCase()}
Synonym Intensity: ${synonymIntensity[0]}%

ORIGINAL TEXT:
${result.original}

PARAPHRASED TEXT:
${result.paraphrased}

CHANGES MADE (${result.changes.length}):
${result.changes.map((c, i) => `${i + 1}. "${c.from}" → "${c.to}"`).join('\n')}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paraphrase-result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const highlightChanges = (text: string, isOriginal: boolean) => {
    if (!result || result.changes.length === 0) return text;

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    result.changes.forEach((change, idx) => {
      const searchWord = isOriginal ? change.from : change.to;
      const index = text.indexOf(searchWord, lastIndex);

      if (index !== -1) {
        // Add text before the change
        if (index > lastIndex) {
          parts.push(<span key={`text-${idx}`}>{text.substring(lastIndex, index)}</span>);
        }

        // Add highlighted change
        parts.push(
          <mark
            key={`mark-${idx}`}
            className={isOriginal ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
          >
            {searchWord}
          </mark>
        );

        lastIndex = index + searchWord.length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <>{parts}</>;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-1">Paraphrase Mode</div>
          <Select value={mode} onValueChange={(value) => setMode(value as ParaphraseMode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(modeDescriptions).map(([key, desc]) => (
                <SelectItem key={key} value={key}>
                  <div>
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">Synonym Intensity</div>
            <Badge variant="outline">{synonymIntensity[0]}%</Badge>
          </div>
          <Slider
            value={synonymIntensity}
            onValueChange={setSynonymIntensity}
            max={100}
            step={10}
            className="mb-2"
          />
          <div className="text-xs text-gray-500">
            Higher values replace more words with synonyms
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-blue-50">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Current Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>
            <p className="text-sm text-gray-700">{modeDescriptions[mode]}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Original Text</h3>
            <Badge variant="outline" className="text-xs">
              {inputText.split(/\s+/).filter(w => w).length} words
            </Badge>
          </div>
          <Textarea
            placeholder="Enter or paste your text here to paraphrase..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[300px] text-base"
          />
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={paraphraseText} 
              disabled={!inputText.trim() || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Paraphrase
                </>
              )}
            </Button>
            <Button onClick={handleClear} variant="outline" disabled={!inputText}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Paraphrased Result</h3>
            {result && (
              <Badge variant="outline" className="text-xs bg-green-50">
                {result.paraphrased.split(/\s+/).filter(w => w).length} words
              </Badge>
            )}
          </div>
          {result ? (
            <>
              <div className="min-h-[300px] p-4 border rounded-lg bg-gray-50 text-base whitespace-pre-wrap">
                {result.paraphrased}
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={() => handleCopy(result.paraphrased)} 
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Result
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="min-h-[300px] flex items-center justify-center text-gray-400 border rounded-lg bg-gray-50">
              <div className="text-center">
                <ArrowRight className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Paraphrased text will appear here</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {result && result.changes.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Changes Made ({result.changes.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {result.changes.map((change, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm"
              >
                <span className="text-red-600 line-through">{change.from}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="text-green-600 font-medium">{change.to}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <strong>Note:</strong> This is a demonstration paraphraser using basic algorithms. 
          For production use, integrate with advanced AI APIs like OpenAI GPT or Google Gemini 
          for more sophisticated paraphrasing capabilities.
        </AlertDescription>
      </Alert>

      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="font-semibold mb-2">About Paraphraser</h3>
        <p className="text-sm text-gray-700 mb-3">
          Rewrite your text in different styles while maintaining the original meaning. 
          Perfect for avoiding plagiarism, improving clarity, or adapting content for different audiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
          <div>
            <p className="font-semibold mb-1">🎯 Use Cases:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Academic writing</li>
              <li>Content creation</li>
              <li>Email rewriting</li>
              <li>SEO optimization</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">⚙️ Modes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Standard & Fluency</li>
              <li>Formal & Simple</li>
              <li>Creative & Expand</li>
              <li>Shorten</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">✨ Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Adjustable synonym intensity</li>
              <li>Side-by-side comparison</li>
              <li>Change tracking</li>
              <li>Multiple style options</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
