'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Trash2, BookOpen, Clock, Brain, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface KeywordCount {
  word: string;
  count: number;
  percentage: number;
}

interface SentenceLengthData {
  length: number;
  count: number;
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
    fleschKincaidGrade: 0,
    readabilityLevel: '',
    keywords: [] as KeywordCount[],
    longestWord: '',
    shortestWord: '',
    readingTime: 0,
    speakingTime: 0,
    lexicalDensity: 0,
    sentenceLengthDistribution: [] as SentenceLengthData[],
    uniqueWords: 0,
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
          fleschKincaidGrade: 0,
          readabilityLevel: '',
          keywords: [],
          longestWord: '',
          shortestWord: '',
          readingTime: 0,
          speakingTime: 0,
          lexicalDensity: 0,
          sentenceLengthDistribution: [],
          uniqueWords: 0,
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

      // Flesch Reading Ease Score
      const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
      const avgSyllablesPerWord = wordCount > 0 ? syllables / wordCount : 0;
      const readabilityScore =
        206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
      const readabilityLevel = getReadabilityLevel(readabilityScore);

      // Flesch-Kincaid Grade Level
      const fleschKincaidGrade = 
        0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59;

      // Reading and speaking time
      const readingTime = Math.ceil(wordCount / 200); // avg 200 wpm
      const speakingTime = Math.ceil(wordCount / 130); // avg 130 wpm

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

      // Unique words and lexical density
      const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ''))).size;
      const lexicalDensity = wordCount > 0 ? (uniqueWords / wordCount) * 100 : 0;

      // Sentence length distribution
      const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
      const lengthCounts: Record<number, number> = {};
      
      sentenceLengths.forEach(len => {
        // Group into ranges
        const range = Math.floor(len / 5) * 5;
        lengthCounts[range] = (lengthCounts[range] || 0) + 1;
      });

      const sentenceLengthDistribution = Object.entries(lengthCounts)
        .map(([length, count]) => ({ length: parseInt(length), count }))
        .sort((a, b) => a.length - b.length)
        .slice(0, 6); // Top 6 ranges

      setAnalysis({
        words: wordCount,
        characters,
        sentences: sentenceCount,
        paragraphs,
        avgWordLength,
        avgSentenceLength,
        readabilityScore,
        fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
        readabilityLevel,
        keywords,
        longestWord,
        shortestWord,
        readingTime,
        speakingTime,
        lexicalDensity,
        sentenceLengthDistribution,
        uniqueWords,
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
- Unique Words: ${analysis.uniqueWords}

READABILITY METRICS
- Flesch Reading Ease Score: ${analysis.readabilityScore.toFixed(2)}
- Flesch-Kincaid Grade Level: ${analysis.fleschKincaidGrade.toFixed(2)}
- Readability Level: ${analysis.readabilityLevel}

TIME ESTIMATES
- Reading Time: ${analysis.readingTime} minutes (200 wpm)
- Speaking Time: ${analysis.speakingTime} minutes (130 wpm)

ADVANCED METRICS
- Average Word Length: ${analysis.avgWordLength.toFixed(2)} characters
- Average Sentence Length: ${analysis.avgSentenceLength.toFixed(2)} words
- Lexical Density: ${analysis.lexicalDensity.toFixed(2)}%
- Longest Word: ${analysis.longestWord}
- Shortest Word: ${analysis.shortestWord}

TOP KEYWORDS
${analysis.keywords.map((k) => `- ${k.word}: ${k.count} times (${k.percentage.toFixed(2)}%)`).join('\n')}

SENTENCE LENGTH DISTRIBUTION
${analysis.sentenceLengthDistribution.map(d => `- ${d.length}-${d.length + 4} words: ${d.count} sentences`).join('\n')}

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

  const chartData = analysis.sentenceLengthDistribution.map(item => ({
    range: `${item.length}-${item.length + 4}`,
    count: item.count,
  }));

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="readability">Readability</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                Reading Time
              </div>
              <div className="text-2xl font-semibold">{analysis.readingTime} min</div>
              <div className="text-xs text-gray-500">~200 words/min</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <BookOpen className="w-4 h-4" />
                Speaking Time
              </div>
              <div className="text-2xl font-semibold">{analysis.speakingTime} min</div>
              <div className="text-xs text-gray-500">~130 words/min</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Brain className="w-4 h-4" />
                Unique Words
              </div>
              <div className="text-2xl font-semibold">{analysis.uniqueWords}</div>
              <div className="text-xs text-gray-500">Total vocabulary</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                Lexical Density
              </div>
              <div className="text-2xl font-semibold">{analysis.lexicalDensity.toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Unique/total ratio</div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-emerald-600 mb-2">
                  {analysis.readabilityScore > 0 ? analysis.readabilityScore.toFixed(1) : '0'}
                </div>
                <div className="text-xl text-gray-700 mb-2">Flesch Reading Ease</div>
                <div className="text-lg font-semibold text-gray-600">{analysis.readabilityLevel}</div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {analysis.fleschKincaidGrade > 0 ? analysis.fleschKincaidGrade.toFixed(1) : '0'}
                </div>
                <div className="text-xl text-gray-700 mb-2">Flesch-Kincaid Grade</div>
                <div className="text-sm text-gray-600">
                  Grade {Math.round(analysis.fleschKincaidGrade)} reading level
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-blue-50">
            <h3 className="font-semibold mb-3">Understanding Readability Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-2">Flesch Reading Ease:</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• 90-100: Very Easy (5th grade)</p>
                  <p>• 80-90: Easy (6th grade)</p>
                  <p>• 70-80: Fairly Easy (7th grade)</p>
                  <p>• 60-70: Standard (8th-9th grade)</p>
                  <p>• 50-60: Fairly Difficult (10th-12th grade)</p>
                  <p>• 30-50: Difficult (College)</p>
                  <p>• 0-30: Very Difficult (Graduate)</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">Flesch-Kincaid Grade:</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Indicates the U.S. school grade level</p>
                  <p>• Grade 8 = 8th grade reading level</p>
                  <p>• Grade 12 = High school senior level</p>
                  <p>• Grade 16+ = College level</p>
                  <p className="mt-2 italic">Lower scores = easier to read</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recommendations</h3>
            <div className="space-y-2 text-sm">
              {analysis.readabilityScore < 60 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-medium text-yellow-800">Consider simplifying your text:</p>
                  <ul className="list-disc list-inside ml-2 mt-1 text-yellow-700">
                    <li>Use shorter sentences (aim for 15-20 words)</li>
                    <li>Replace complex words with simpler alternatives</li>
                    <li>Break long paragraphs into smaller ones</li>
                  </ul>
                </div>
              )}
              {analysis.readabilityScore >= 60 && analysis.readabilityScore < 80 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-green-800">Good readability!</p>
                  <p className="text-green-700 mt-1">Your text is at a standard reading level, suitable for most audiences.</p>
                </div>
              )}
              {analysis.readabilityScore >= 80 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-800">Excellent readability!</p>
                  <p className="text-blue-700 mt-1">Your text is very easy to read and accessible to a wide audience.</p>
                </div>
              )}
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

          <Card className="p-6 bg-purple-50">
            <h3 className="font-semibold mb-2">SEO Keyword Tips</h3>
            <p className="text-sm text-gray-700 mb-2">
              For optimal SEO, focus keywords should appear 2-3% of total words. Avoid keyword stuffing (over 5%).
            </p>
            {analysis.keywords.length > 0 && (
              <div className="text-xs text-gray-600 mt-3">
                <p><strong>Top keyword density:</strong> {analysis.keywords[0]?.percentage.toFixed(2)}%</p>
                {analysis.keywords[0]?.percentage > 5 && (
                  <p className="text-red-600 mt-1">⚠️ Warning: Possible keyword stuffing detected</p>
                )}
                {analysis.keywords[0]?.percentage >= 2 && analysis.keywords[0]?.percentage <= 3 && (
                  <p className="text-green-600 mt-1">✓ Optimal keyword density</p>
                )}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sentence Length Distribution</h3>
            {chartData.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="range" 
                      label={{ value: 'Words per sentence', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No data available. Enter text to see sentence length distribution.
              </p>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Vocabulary Richness</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Lexical Density</span>
                    <span className="text-sm font-semibold">{analysis.lexicalDensity.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all" 
                      style={{ width: `${Math.min(analysis.lexicalDensity, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {analysis.lexicalDensity < 40 && 'Low - Consider varying vocabulary'}
                    {analysis.lexicalDensity >= 40 && analysis.lexicalDensity < 60 && 'Good - Balanced vocabulary'}
                    {analysis.lexicalDensity >= 60 && 'High - Rich and varied vocabulary'}
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm"><span className="font-semibold">{analysis.uniqueWords}</span> unique words</p>
                  <p className="text-sm"><span className="font-semibold">{analysis.words}</span> total words</p>
                  <p className="text-sm"><span className="font-semibold">{analysis.words - analysis.uniqueWords}</span> repeated words</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3">Sentence Structure</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average length:</span>
                  <span className="font-semibold">{analysis.avgSentenceLength.toFixed(1)} words</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total sentences:</span>
                  <span className="font-semibold">{analysis.sentences}</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-600">
                    <strong>Recommendation:</strong>
                    {analysis.avgSentenceLength < 15 && ' Great! Short sentences improve readability.'}
                    {analysis.avgSentenceLength >= 15 && analysis.avgSentenceLength < 25 && ' Good sentence length for most content.'}
                    {analysis.avgSentenceLength >= 25 && ' Consider shortening sentences for better clarity.'}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-indigo-50">
            <h3 className="font-semibold mb-2">Writing Quality Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-2">Strengths:</p>
                <ul className="space-y-1 text-gray-700">
                  {analysis.lexicalDensity >= 50 && <li>✓ Rich vocabulary variety</li>}
                  {analysis.avgSentenceLength < 20 && <li>✓ Concise sentence structure</li>}
                  {analysis.readabilityScore >= 60 && <li>✓ Good readability level</li>}
                  {analysis.paragraphs > 1 && <li>✓ Well-structured paragraphs</li>}
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Areas to Improve:</p>
                <ul className="space-y-1 text-gray-700">
                  {analysis.lexicalDensity < 40 && <li>• Increase vocabulary variety</li>}
                  {analysis.avgSentenceLength >= 25 && <li>• Shorten sentences</li>}
                  {analysis.readabilityScore < 60 && <li>• Simplify language</li>}
                  {analysis.paragraphs === 1 && analysis.words > 100 && <li>• Break into paragraphs</li>}
                </ul>
              </div>
            </div>
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

      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <h3 className="font-semibold mb-2">About Text Analyzer</h3>
        <p className="text-sm text-gray-700 mb-3">
          Comprehensive text analysis tool that provides detailed statistics including readability
          scores, keyword density, and advanced metrics. Get insights with industry-standard formulas
          like Flesch Reading Ease and Flesch-Kincaid Grade Level.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
          <div>
            <p className="font-semibold mb-1">📊 Analytics:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Word & character counts</li>
              <li>Readability scores</li>
              <li>Keyword density analysis</li>
              <li>Vocabulary richness</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">⏱️ Time Estimates:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Reading time calculation</li>
              <li>Speaking time estimate</li>
              <li>Based on research averages</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">✍️ Perfect For:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Content writers & bloggers</li>
              <li>SEO specialists</li>
              <li>Students & academics</li>
              <li>Professional copywriters</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
