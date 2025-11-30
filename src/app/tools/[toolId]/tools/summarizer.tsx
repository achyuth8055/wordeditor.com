'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Trash2, RefreshCw, FileText, List, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type SummaryLength = 'short' | 'medium' | 'long';
type SummaryFormat = 'paragraph' | 'bullets';

interface SummaryResult {
  original: string;
  oneSentence: string;
  paragraph: string;
  bulletPoints: string[];
  wordCount: number;
  compressionRatio: number;
}

export const Summarizer = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [length, setLength] = useState<SummaryLength>('medium');
  const [format, setFormat] = useState<SummaryFormat>('paragraph');
  const [sentenceCount, setSentenceCount] = useState([3]);
  const [isProcessing, setIsProcessing] = useState(false);

  const extractKeywords = (text: string, count: number): string[] => {
    const words = text.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 4);

    const stopWords = new Set([
      'about', 'above', 'after', 'again', 'against', 'all', 'also', 'among',
      'another', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before',
      'being', 'below', 'between', 'both', 'but', 'by', 'came', 'can', 'cannot',
      'come', 'could', 'did', 'do', 'does', 'doing', 'during', 'each', 'even',
      'every', 'for', 'from', 'further', 'get', 'got', 'has', 'had', 'have',
      'having', 'here', 'how', 'however', 'into', 'is', 'it', 'its', 'just',
      'like', 'made', 'make', 'many', 'may', 'more', 'most', 'much', 'must',
      'never', 'now', 'only', 'other', 'our', 'out', 'over', 'said', 'same',
      'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than', 'that',
      'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
      'through', 'too', 'under', 'upon', 'very', 'was', 'way', 'we', 'well',
      'were', 'what', 'when', 'where', 'which', 'while', 'who', 'why', 'will',
      'with', 'within', 'would', 'you', 'your',
    ]);

    const filteredWords = words.filter(word => !stopWords.has(word));
    
    const frequency: Record<string, number> = {};
    filteredWords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([word]) => word);
  };

  const scoreSentence = (sentence: string, keywords: string[]): number => {
    const words = sentence.toLowerCase().split(/\W+/);
    let score = 0;

    // Score based on keyword presence
    keywords.forEach(keyword => {
      if (words.includes(keyword)) {
        score += 3;
      }
    });

    // Prefer sentences with good length (not too short or long)
    const wordCount = words.length;
    if (wordCount >= 10 && wordCount <= 25) {
      score += 2;
    }

    // Prefer sentences at the beginning (usually more important)
    score += 1;

    return score;
  };

  const summarizeText = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const sentences = inputText
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 20);

      if (sentences.length === 0) {
        setIsProcessing(false);
        return;
      }

      // Extract keywords
      const keywords = extractKeywords(inputText, 10);

      // Score sentences
      const scoredSentences = sentences.map((sentence, index) => ({
        sentence,
        score: scoreSentence(sentence, keywords) - (index * 0.1), // Slight preference for earlier sentences
      }));

      scoredSentences.sort((a, b) => b.score - a.score);

      // Generate one-sentence summary (highest scoring)
      const oneSentence = scoredSentences[0].sentence + '.';

      // Generate paragraph summary based on length
      let summaryLength: number;
      switch (length) {
        case 'short':
          summaryLength = Math.min(2, sentences.length);
          break;
        case 'medium':
          summaryLength = Math.min(sentenceCount[0], sentences.length);
          break;
        case 'long':
          summaryLength = Math.min(Math.ceil(sentences.length * 0.5), sentences.length);
          break;
      }

      const selectedSentences = scoredSentences
        .slice(0, summaryLength)
        .sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));

      const paragraph = selectedSentences
        .map(s => s.sentence)
        .join('. ') + '.';

      // Generate bullet points (key points)
      const bulletPoints = scoredSentences
        .slice(0, Math.min(5, sentences.length))
        .map(s => {
          const sentence = s.sentence;
          // Simplify to key point
          return sentence.length > 80 
            ? sentence.substring(0, 77) + '...'
            : sentence;
        });

      const originalWords = inputText.split(/\s+/).length;
      const summaryWords = paragraph.split(/\s+/).length;
      const compressionRatio = ((1 - summaryWords / originalWords) * 100);

      setResult({
        original: inputText,
        oneSentence,
        paragraph,
        bulletPoints,
        wordCount: summaryWords,
        compressionRatio,
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
TEXT SUMMARY REPORT
===================

Original Word Count: ${result.original.split(/\s+/).length}
Summary Word Count: ${result.wordCount}
Compression Ratio: ${result.compressionRatio.toFixed(1)}%

ONE-SENTENCE SUMMARY:
${result.oneSentence}

PARAGRAPH SUMMARY:
${result.paragraph}

KEY POINTS:
${result.bulletPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

ORIGINAL TEXT:
${result.original}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-2">Summary Length</div>
          <Select value={length} onValueChange={(value) => setLength(value as SummaryLength)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (2-3 sentences)</SelectItem>
              <SelectItem value="medium">Medium (3-5 sentences)</SelectItem>
              <SelectItem value="long">Long (50% of original)</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-4">
          <div className="text-sm text-gray-600 mb-2">Output Format</div>
          <Select value={format} onValueChange={(value) => setFormat(value as SummaryFormat)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="bullets">Bullet Points</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">Sentences</div>
            <Badge variant="outline">{sentenceCount[0]}</Badge>
          </div>
          <Slider
            value={sentenceCount}
            onValueChange={setSentenceCount}
            min={2}
            max={10}
            step={1}
            disabled={length !== 'medium'}
          />
        </Card>
      </div>

      {result && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-gray-600">Original Words</div>
            <div className="text-3xl font-bold text-blue-600">
              {result.original.split(/\s+/).length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600">Summary Words</div>
            <div className="text-3xl font-bold text-emerald-600">{result.wordCount}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600">Compression</div>
            <div className="text-3xl font-bold text-purple-600">
              {result.compressionRatio.toFixed(0)}%
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600">Key Points</div>
            <div className="text-3xl font-bold text-orange-600">{result.bulletPoints.length}</div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Original Text
            </h3>
            <Badge variant="outline" className="text-xs">
              {inputText.split(/\s+/).filter(w => w).length} words
            </Badge>
          </div>
          <Textarea
            placeholder="Enter or paste your text here to summarize..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[300px] text-base"
          />
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={summarizeText} 
              disabled={!inputText.trim() || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Summary
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
            <h3 className="font-semibold">Summary Result</h3>
            {result && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleCopy(format === 'paragraph' ? result.paragraph : result.bulletPoints.join('\n• '))} 
                  variant="outline"
                  size="sm"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          
          {result ? (
            <Tabs defaultValue="quick" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="quick">Quick</TabsTrigger>
                <TabsTrigger value="detailed">Detailed</TabsTrigger>
                <TabsTrigger value="bullets">Bullets</TabsTrigger>
              </TabsList>

              <TabsContent value="quick" className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 mt-1" />
                    <h4 className="font-semibold text-sm text-emerald-900">One-Sentence Summary</h4>
                  </div>
                  <p className="text-sm text-gray-800">{result.oneSentence}</p>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg min-h-[200px]">
                  <div className="flex items-start gap-2 mb-3">
                    <FileText className="w-4 h-4 text-blue-600 mt-1" />
                    <h4 className="font-semibold text-sm text-blue-900">Paragraph Summary</h4>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {result.paragraph}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="bullets" className="space-y-4">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg min-h-[200px]">
                  <div className="flex items-start gap-2 mb-3">
                    <List className="w-4 h-4 text-purple-600 mt-1" />
                    <h4 className="font-semibold text-sm text-purple-900">Key Points</h4>
                  </div>
                  <ul className="space-y-2">
                    {result.bulletPoints.map((point, index) => (
                      <li key={index} className="flex gap-2 text-sm text-gray-800">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="min-h-[300px] flex items-center justify-center text-gray-400 border rounded-lg bg-gray-50">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Summary will appear here</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <strong>Note:</strong> This is a demonstration summarizer using extractive algorithms. 
          For production use, integrate with advanced AI APIs like OpenAI GPT, Anthropic Claude, 
          or Google Gemini for more sophisticated abstractive summarization.
        </AlertDescription>
      </Alert>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="font-semibold mb-2">About Summarizer</h3>
        <p className="text-sm text-gray-700 mb-3">
          Generate concise summaries from long texts in seconds. Perfect for quickly understanding 
          articles, documents, or any lengthy content while preserving the key information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
          <div>
            <p className="font-semibold mb-1">📝 Output Formats:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>One-sentence summary</li>
              <li>Paragraph summary</li>
              <li>Bullet point list</li>
              <li>Adjustable length</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">🎯 Perfect For:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Research papers</li>
              <li>News articles</li>
              <li>Long reports</li>
              <li>Meeting notes</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">⚡ Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Adjustable summary length</li>
              <li>Multiple formats</li>
              <li>Compression ratio tracking</li>
              <li>Key point extraction</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
