'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Trash2 } from 'lucide-react';

interface KeywordCount {
  word: string;
  count: number;
  percentage: number;
}

export const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    avgWordLength: 0,
    avgSentenceLength: 0,
    readabilityScore: 0,
    readabilityLevel: '',
    keywords: [] as KeywordCount[],
    longestWord: '',
    shortestWord: '',
  });

  useEffect(() => {
    const analyzeText = () => {
      const trimmedText = text.trim();

      if (!trimmedText) {
        setAnalysis({
          words: 0,
          characters: 0,
          sentences: 0,
          paragraphs: 0,
          avgWordLength: 0,
          avgSentenceLength: 0,
          readabilityScore: 0,
          readabilityLevel: '',
          keywords: [],
          longestWord: '',
          shortestWord: '',
        });
        return;
      }

      // Basic stats
      const words = trimmedText.split(/\s+/).filter((word) => word.length > 0);
      const wordCount = words.length;
      const characters = text.length;
      const sentences = trimmedText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
      const sentenceCount = sentences.length;
      const paragraphs = trimmedText.split(/\n\n+/).filter((p) => p.trim().length > 0).length;

      // Average word length
      const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
      const avgWordLength = wordCount > 0 ? totalWordLength / wordCount : 0;

      // Average sentence length
      const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;

      // Flesch Reading Ease Score (simplified)
      const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
      const avgSyllablesPerWord = wordCount > 0 ? syllables / wordCount : 0;
      const readabilityScore =
        206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
      const readabilityLevel = getReadabilityLevel(readabilityScore);

      // Keyword density
      const wordFrequency: Record<string, number> = {};
      const stopWords = new Set([
        'the',
        'be',
        'to',
        'of',
        'and',
        'a',
        'in',
        'that',
        'have',
        'i',
        'it',
        'for',
        'not',
        'on',
        'with',
        'he',
        'as',
        'you',
        'do',
        'at',
        'this',
        'but',
        'his',
        'by',
        'from',
        'is',
        'was',
        'are',
        'been',
        'has',
        'had',
        'were',
      ]);

      words.forEach((word) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanWord.length > 3 && !stopWords.has(cleanWord)) {
          wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
        }
      });

      const keywords = Object.entries(wordFrequency)
        .map(([word, count]) => ({
          word,
          count,
          percentage: (count / wordCount) * 100,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Longest and shortest words
      const wordLengths = words.map((w) => w.replace(/[^a-zA-Z]/g, '')).filter((w) => w.length > 0);
      const longestWord =
        wordLengths.length > 0
          ? wordLengths.reduce((a, b) => (a.length > b.length ? a : b))
          : '';
      const shortestWord =
        wordLengths.length > 0
          ? wordLengths.reduce((a, b) => (a.length < b.length ? a : b))
          : '';

      setAnalysis({
        words: wordCount,
        characters,
        sentences: sentenceCount,
        paragraphs,
        avgWordLength,
        avgSentenceLength,
        readabilityScore,
        readabilityLevel,
        keywords,
        longestWord,
        shortestWord,
      });
    };

    analyzeText();
  }, [text]);

  const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  const getReadabilityLevel = (score: number): string => {
    if (score >= 90) return 'Very Easy (5th grade)';
    if (score >= 80) return 'Easy (6th grade)';
    if (score >= 70) return 'Fairly Easy (7th grade)';
    if (score >= 60) return 'Standard (8th-9th grade)';
    if (score >= 50) return 'Fairly Difficult (10th-12th grade)';
    if (score >= 30) return 'Difficult (College)';
    return 'Very Difficult (College graduate)';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const analysisReport = `
TEXT ANALYSIS REPORT
=====================

BASIC STATISTICS
- Words: ${analysis.words}
- Characters: ${analysis.characters}
- Sentences: ${analysis.sentences}
- Paragraphs: ${analysis.paragraphs}

ADVANCED METRICS
- Average Word Length: ${analysis.avgWordLength.toFixed(2)} characters
- Average Sentence Length: ${analysis.avgSentenceLength.toFixed(2)} words
- Readability Score: ${analysis.readabilityScore.toFixed(2)}
- Readability Level: ${analysis.readabilityLevel}
- Longest Word: ${analysis.longestWord}
- Shortest Word: ${analysis.shortestWord}

TOP KEYWORDS
${analysis.keywords.map((k) => `- ${k.word}: ${k.count} times (${k.percentage.toFixed(2)}%)`).join('\n')}

ORIGINAL TEXT
${text}
    `.trim();

    const blob = new Blob([analysisReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text-analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="readability">Readability</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-gray-600">Words</div>
              <div className="text-3xl font-bold text-emerald-600">{analysis.words}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600">Characters</div>
              <div className="text-3xl font-bold text-blue-600">{analysis.characters}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600">Sentences</div>
              <div className="text-3xl font-bold text-purple-600">{analysis.sentences}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600">Paragraphs</div>
              <div className="text-3xl font-bold text-orange-600">{analysis.paragraphs}</div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-sm text-gray-600">Avg Word Length</div>
              <div className="text-2xl font-semibold">
                {analysis.avgWordLength.toFixed(2)} chars
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600">Avg Sentence Length</div>
              <div className="text-2xl font-semibold">
                {analysis.avgSentenceLength.toFixed(2)} words
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-sm text-gray-600">Longest Word</div>
              <div className="text-xl font-semibold text-emerald-600">
                {analysis.longestWord || '-'}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600">Shortest Word</div>
              <div className="text-xl font-semibold text-blue-600">
                {analysis.shortestWord || '-'}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="readability" className="space-y-4">
          <Card className="p-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-emerald-600 mb-2">
                {analysis.readabilityScore > 0 ? analysis.readabilityScore.toFixed(1) : '0'}
              </div>
              <div className="text-xl text-gray-700 mb-4">Flesch Reading Ease Score</div>
              <div className="text-lg font-semibold text-gray-600">{analysis.readabilityLevel}</div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50">
            <h3 className="font-semibold mb-3">Understanding the Score</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• 90-100: Very Easy to read (5th grade level)</p>
              <p>• 80-90: Easy (6th grade)</p>
              <p>• 70-80: Fairly Easy (7th grade)</p>
              <p>• 60-70: Standard (8th-9th grade)</p>
              <p>• 50-60: Fairly Difficult (10th-12th grade)</p>
              <p>• 30-50: Difficult (College level)</p>
              <p>• 0-30: Very Difficult (College graduate level)</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top 10 Keywords</h3>
            {analysis.keywords.length > 0 ? (
              <div className="space-y-3">
                {analysis.keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                      <span className="font-medium text-lg">{keyword.word}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">{keyword.count}x</div>
                      <div className="text-sm text-gray-500">{keyword.percentage.toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No keywords found. Enter text to analyze.
              </p>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleCopy} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <Textarea
          placeholder="Enter or paste your text here for comprehensive analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[400px] text-base"
        />
      </div>

      <Card className="p-6 bg-red-50">
        <h3 className="font-semibold mb-2">About Text Analyzer</h3>
        <p className="text-sm text-gray-700">
          Comprehensive text analysis tool that provides detailed statistics including readability
          scores, keyword density, and advanced metrics. The Flesch Reading Ease score helps you
          understand how easy your text is to read. Perfect for content writers, SEO specialists,
          and anyone who wants to improve their writing.
        </p>
      </Card>
    </div>
  );
};
