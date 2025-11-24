'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy, RefreshCw } from 'lucide-react';

const englishWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'very', 'great', 'high', 'such', 'follow', 'act', 'why', 'ask', 'men', 'change',
  'went', 'light', 'kind', 'off', 'need', 'house', 'picture', 'try', 'again', 'animal',
  'point', 'mother', 'world', 'near', 'build', 'self', 'earth', 'father', 'head', 'stand',
  'own', 'page', 'should', 'country', 'found', 'answer', 'school', 'grow', 'study', 'still',
  'learn', 'plant', 'cover', 'food', 'sun', 'four', 'between', 'state', 'keep', 'eye',
  'never', 'last', 'let', 'thought', 'city', 'tree', 'cross', 'farm', 'hard', 'start',
  'might', 'story', 'saw', 'far', 'sea', 'draw', 'left', 'late', 'run', 'while',
  'press', 'close', 'night', 'real', 'life', 'few', 'north', 'book', 'carry', 'took',
  'science', 'eat', 'room', 'friend', 'began', 'idea', 'fish', 'mountain', 'stop', 'once',
  'base', 'hear', 'horse', 'cut', 'sure', 'watch', 'color', 'face', 'wood', 'main',
];

export const LoremIpsumGenerator = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [generatedText, setGeneratedText] = useState('');

  const generateWord = () => {
    return englishWords[Math.floor(Math.random() * englishWords.length)];
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const words = [];
    for (let i = 0; i < length; i++) {
      words.push(generateWord());
    }
    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3;
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generateText = () => {
    let result = '';

    if (type === 'words') {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(generateWord());
      }
      result = words.join(' ');
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      result = sentences.join(' ');
    } else {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      result = paragraphs.join('\n\n');
    }

    setGeneratedText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Generator Settings</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Generate</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
                <SelectItem value="words">Words</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Count</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={generateText}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate
          </Button>
          {generatedText && (
            <Button onClick={handleCopy} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          )}
        </div>
      </Card>

      {generatedText && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Generated Text</h3>
          <Textarea
            value={generatedText}
            readOnly
            className="min-h-[400px] text-base"
          />
        </Card>
      )}

      <Card className="p-6 bg-pink-50">
        <h3 className="font-semibold mb-2">About Placeholder Text Generator</h3>
        <p className="text-sm text-gray-700">
          Generate placeholder text in paragraphs, sentences, or words using common English words. 
          Perfect for mockups, prototypes, and design previews when you need realistic filler content
          that resembles natural English text.
        </p>
      </Card>
    </div>
  );
};
