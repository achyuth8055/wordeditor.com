'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Copy, Download, Trash2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GrammarIssue {
  id: string;
  type: 'grammar' | 'spelling' | 'punctuation' | 'style' | 'clarity';
  message: string;
  suggestion: string;
  position: { start: number; end: number };
  severity: 'error' | 'warning' | 'info';
  explanation: string;
}

type Tone = 'formal' | 'casual' | 'neutral';

export const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [correctedText, setCorrectedText] = useState('');
  const [tone, setTone] = useState<Tone>('neutral');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [autoCorrect, setAutoCorrect] = useState(false);

  useEffect(() => {
    if (text) {
      const detectedIssues = analyzeText(text, tone);
      setIssues(detectedIssues);
      
      if (autoCorrect) {
        let corrected = text;
        detectedIssues.forEach(issue => {
          const before = corrected.substring(0, issue.position.start);
          const after = corrected.substring(issue.position.end);
          corrected = before + issue.suggestion + after;
        });
        setCorrectedText(corrected);
      } else {
        setCorrectedText(text);
      }
    } else {
      setIssues([]);
      setCorrectedText('');
    }
  }, [text, tone, autoCorrect]);

  const analyzeText = (inputText: string, selectedTone: Tone): GrammarIssue[] => {
    const foundIssues: GrammarIssue[] = [];

    // Common grammar rules
    const grammarRules = [
      {
        pattern: /\b(their|there|they're)\b/gi,
        check: (match: string, context: string) => {
          const lowerMatch = match.toLowerCase();
          // Simple context-based suggestions
          if (lowerMatch === 'their' && /\bis\b|\bare\b/i.test(context)) {
            return { correct: false, suggestion: 'there', message: 'Incorrect usage of "their"' };
          }
          return { correct: true, suggestion: '', message: '' };
        },
      },
      {
        pattern: /\b(your|you're)\b/gi,
        check: (match: string, context: string) => {
          const lowerMatch = match.toLowerCase();
          if (lowerMatch === 'your' && /\s+(happy|going|doing|feeling)\b/i.test(context)) {
            return { correct: false, suggestion: "you're", message: 'Did you mean "you\'re" (you are)?' };
          }
          return { correct: true, suggestion: '', message: '' };
        },
      },
      {
        pattern: /\b(its|it's)\b/gi,
        check: (match: string, context: string) => {
          const lowerMatch = match.toLowerCase();
          if (lowerMatch === 'its' && /\s+(been|going|time)\b/i.test(context)) {
            return { correct: false, suggestion: "it's", message: 'Did you mean "it\'s" (it is/has)?' };
          }
          return { correct: true, suggestion: '', message: '' };
        },
      },
    ];

    // Double spaces
    let match;
    const doubleSpaceRegex = /  +/g;
    while ((match = doubleSpaceRegex.exec(inputText)) !== null) {
      foundIssues.push({
        id: `space-${match.index}`,
        type: 'style',
        message: 'Multiple consecutive spaces',
        suggestion: ' ',
        position: { start: match.index, end: match.index + match[0].length },
        severity: 'info',
        explanation: 'Use only one space between words',
      });
    }

    // Sentence capitalization
    const sentenceRegex = /([.!?]\s+)([a-z])/g;
    while ((match = sentenceRegex.exec(inputText)) !== null) {
      const letterIndex = match.index + match[1].length;
      foundIssues.push({
        id: `cap-${letterIndex}`,
        type: 'grammar',
        message: 'Sentence should start with capital letter',
        suggestion: match[2].toUpperCase(),
        position: { start: letterIndex, end: letterIndex + 1 },
        severity: 'error',
        explanation: 'Start sentences with uppercase letters',
      });
    }

    // Missing punctuation at end
    if (inputText.trim() && !/[.!?]$/.test(inputText.trim())) {
      const trimmedLength = inputText.trimEnd().length;
      foundIssues.push({
        id: 'end-punct',
        type: 'punctuation',
        message: 'Missing punctuation at end of text',
        suggestion: '.',
        position: { start: trimmedLength, end: trimmedLength },
        severity: 'warning',
        explanation: 'End sentences with proper punctuation',
      });
    }

    // Repeated words
    const repeatedWordRegex = /\b(\w+)\s+\1\b/gi;
    while ((match = repeatedWordRegex.exec(inputText)) !== null) {
      foundIssues.push({
        id: `repeat-${match.index}`,
        type: 'style',
        message: `Repeated word: "${match[1]}"`,
        suggestion: match[1],
        position: { start: match.index, end: match.index + match[0].length },
        severity: 'warning',
        explanation: 'Avoid repeating the same word consecutively',
      });
    }

    // Common spelling mistakes
    const commonMisspellings: Record<string, string> = {
      'recieve': 'receive',
      'occured': 'occurred',
      'seperate': 'separate',
      'definately': 'definitely',
      'alot': 'a lot',
      'untill': 'until',
      'wich': 'which',
      'wierd': 'weird',
      'thier': 'their',
      'freind': 'friend',
    };

    Object.entries(commonMisspellings).forEach(([wrong, correct]) => {
      const misspellRegex = new RegExp(`\\b${wrong}\\b`, 'gi');
      while ((match = misspellRegex.exec(inputText)) !== null) {
        foundIssues.push({
          id: `spell-${match.index}`,
          type: 'spelling',
          message: `Possible spelling error: "${match[0]}"`,
          suggestion: correct,
          position: { start: match.index, end: match.index + match[0].length },
          severity: 'error',
          explanation: `Did you mean "${correct}"?`,
        });
      }
    });

    // Tone-based suggestions
    if (selectedTone === 'formal') {
      // Detect informal contractions
      const contractions = ["don't", "can't", "won't", "shouldn't", "couldn't", "wouldn't", "isn't", "aren't"];
      contractions.forEach(contraction => {
        const regex = new RegExp(`\\b${contraction}\\b`, 'gi');
        while ((match = regex.exec(inputText)) !== null) {
          const expanded = contraction.replace("n't", ' not').replace("'", ' ');
          foundIssues.push({
            id: `formal-${match.index}`,
            type: 'style',
            message: `Avoid contractions in formal writing`,
            suggestion: expanded,
            position: { start: match.index, end: match.index + match[0].length },
            severity: 'info',
            explanation: `Consider using "${expanded}" for formal tone`,
          });
        }
      });
    }

    // Passive voice detection (simplified)
    const passiveRegex = /\b(am|is|are|was|were|be|been|being)\s+\w+ed\b/gi;
    while ((match = passiveRegex.exec(inputText)) !== null) {
      foundIssues.push({
        id: `passive-${match.index}`,
        type: 'clarity',
        message: 'Possible passive voice',
        suggestion: 'Consider active voice',
        position: { start: match.index, end: match.index + match[0].length },
        severity: 'info',
        explanation: 'Active voice is often clearer and more direct',
      });
    }

    return foundIssues;
  };

  const applyFix = (issue: GrammarIssue) => {
    const before = text.substring(0, issue.position.start);
    const after = text.substring(issue.position.end);
    setText(before + issue.suggestion + after);
  };

  const applyAllFixes = () => {
    let corrected = text;
    // Apply fixes from end to start to maintain positions
    const sortedIssues = [...issues].sort((a, b) => b.position.start - a.position.start);
    
    sortedIssues.forEach(issue => {
      const before = corrected.substring(0, issue.position.start);
      const after = corrected.substring(issue.position.end);
      corrected = before + issue.suggestion + after;
    });
    
    setText(corrected);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText);
  };

  const handleDownload = () => {
    const report = `
GRAMMAR CHECK REPORT
===================

Issues Found: ${issues.length}

${issues.map((issue, i) => `
${i + 1}. ${issue.type.toUpperCase()} - ${issue.severity.toUpperCase()}
   Message: ${issue.message}
   Suggestion: ${issue.suggestion}
   Explanation: ${issue.explanation}
`).join('\n')}

ORIGINAL TEXT:
${text}

CORRECTED TEXT:
${correctedText}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grammar-check-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setText('');
  };

  const issuesByType = {
    grammar: issues.filter(i => i.type === 'grammar'),
    spelling: issues.filter(i => i.type === 'spelling'),
    punctuation: issues.filter(i => i.type === 'punctuation'),
    style: issues.filter(i => i.type === 'style'),
    clarity: issues.filter(i => i.type === 'clarity'),
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'destructive';
      case 'warning': return 'default';
      case 'info': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Total Issues</div>
          <div className="text-3xl font-bold text-purple-600">{issues.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Grammar</div>
          <div className="text-3xl font-bold text-red-600">{issuesByType.grammar.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Spelling</div>
          <div className="text-3xl font-bold text-orange-600">{issuesByType.spelling.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Style</div>
          <div className="text-3xl font-bold text-blue-600">{issuesByType.style.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Clarity</div>
          <div className="text-3xl font-bold text-green-600">{issuesByType.clarity.length}</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Writing Tone</label>
            <Select value={tone} onValueChange={(value) => setTone(value as Tone)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal - Professional writing</SelectItem>
                <SelectItem value="casual">Casual - Conversational tone</SelectItem>
                <SelectItem value="neutral">Neutral - Balanced approach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={applyAllFixes} disabled={issues.length === 0}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Apply All Fixes
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Your Text</h3>
            <Textarea
              placeholder="Enter or paste your text here to check grammar, spelling, and style..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[400px] text-base"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handleCopy} variant="outline" size="sm" disabled={!text}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm" disabled={!text}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button onClick={handleClear} variant="outline" size="sm" disabled={!text}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center justify-between">
              <span>Detected Issues</span>
              {issues.length === 0 && text && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  No issues found!
                </Badge>
              )}
            </h3>
            <ScrollArea className="h-[400px] pr-4">
              {issues.length > 0 ? (
                <div className="space-y-3">
                  {issues.map((issue) => (
                    <Card
                      key={issue.id}
                      className={`p-4 cursor-pointer hover:border-primary transition-colors ${
                        selectedIssueId === issue.id ? 'border-primary' : ''
                      }`}
                      onClick={() => setSelectedIssueId(issue.id)}
                    >
                      <div className="flex items-start gap-2">
                        {getSeverityIcon(issue.severity)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={getSeverityColor(issue.severity) as any} className="text-xs">
                              {issue.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mb-1">{issue.message}</p>
                          <p className="text-xs text-gray-600 mb-2">{issue.explanation}</p>
                          <div className="bg-gray-50 p-2 rounded text-xs">
                            <span className="line-through text-red-600">
                              {text.substring(issue.position.start, issue.position.end)}
                            </span>
                            {' → '}
                            <span className="text-green-600 font-medium">{issue.suggestion}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-2 h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              applyFix(issue);
                            }}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Apply Fix
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  {text ? (
                    <div>
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
                      <p className="font-medium">Great work!</p>
                      <p className="text-sm">No grammar or style issues detected.</p>
                    </div>
                  ) : (
                    <p>Enter text to check for grammar and style issues.</p>
                  )}
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </div>

      <Card className="p-6 bg-blue-50">
        <h3 className="font-semibold mb-2">About Grammar Checker</h3>
        <p className="text-sm text-gray-700 mb-3">
          Our advanced grammar checker analyzes your text for grammar, spelling, punctuation, style, and clarity issues.
          Get instant suggestions with explanations to improve your writing quality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <p className="font-semibold mb-1">Features:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Grammar and spelling correction</li>
              <li>Punctuation checking</li>
              <li>Style and clarity suggestions</li>
              <li>Tone adjustment (formal/casual/neutral)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">Use Cases:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Academic papers and essays</li>
              <li>Professional emails and reports</li>
              <li>Blog posts and articles</li>
              <li>Social media content</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
