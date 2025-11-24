'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, Trash2 } from 'lucide-react';

export const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      const trimmedText = text.trim();

      // Words
      const words = trimmedText
        ? trimmedText.split(/\s+/).filter((word) => word.length > 0).length
        : 0;

      // Characters
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;

      // Sentences
      const sentences = trimmedText
        ? trimmedText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
        : 0;

      // Paragraphs
      const paragraphs = trimmedText
        ? trimmedText.split(/\n\n+/).filter((p) => p.trim().length > 0).length
        : 0;

      // Reading time (average 200 words per minute)
      const readingTime = Math.ceil(words / 200);

      // Speaking time (average 130 words per minute)
      const speakingTime = Math.ceil(words / 130);

      setStats({
        words,
        characters,
        charactersNoSpaces,
        sentences,
        paragraphs,
        readingTime,
        speakingTime,
      });
    };

    calculateStats();
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text-document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Words</div>
          <div className="text-3xl font-bold text-emerald-600">{stats.words}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Characters</div>
          <div className="text-3xl font-bold text-blue-600">{stats.characters}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Sentences</div>
          <div className="text-3xl font-bold text-purple-600">{stats.sentences}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Paragraphs</div>
          <div className="text-3xl font-bold text-orange-600">{stats.paragraphs}</div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Reading Time</div>
          <div className="text-2xl font-semibold">{stats.readingTime} min</div>
          <div className="text-xs text-gray-500">~200 words/min</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Speaking Time</div>
          <div className="text-2xl font-semibold">{stats.speakingTime} min</div>
          <div className="text-xs text-gray-500">~130 words/min</div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleCopy} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <Textarea
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[400px] text-base"
        />
      </div>

      <Card className="p-6 bg-blue-50">
        <h3 className="font-semibold mb-2">About Word Counter</h3>
        <p className="text-sm text-gray-700">
          This tool counts words, characters, sentences, and paragraphs in real-time. It also
          estimates reading and speaking time based on average speeds. Perfect for writers,
          students, and content creators who need to meet word count requirements or track their
          writing progress.
        </p>
      </Card>
    </div>
  );
};
