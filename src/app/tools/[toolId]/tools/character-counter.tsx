'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, Trash2 } from 'lucide-react';

export const CharacterCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    noSpaces: 0,
    letters: 0,
    numbers: 0,
    punctuation: 0,
    spaces: 0,
    lines: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      const total = text.length;
      const noSpaces = text.replace(/\s/g, '').length;
      const letters = (text.match(/[a-zA-Z]/g) || []).length;
      const numbers = (text.match(/[0-9]/g) || []).length;
      const punctuation = (text.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g) || []).length;
      const spaces = (text.match(/\s/g) || []).length;
      const lines = text.split('\n').length;

      setStats({
        total,
        noSpaces,
        letters,
        numbers,
        punctuation,
        spaces,
        lines,
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
    a.download = 'character-count.txt';
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
          <div className="text-sm text-gray-600">Total Characters</div>
          <div className="text-3xl font-bold text-emerald-600">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Without Spaces</div>
          <div className="text-3xl font-bold text-blue-600">{stats.noSpaces}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Letters</div>
          <div className="text-3xl font-bold text-purple-600">{stats.letters}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Numbers</div>
          <div className="text-3xl font-bold text-orange-600">{stats.numbers}</div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Punctuation</div>
          <div className="text-2xl font-semibold">{stats.punctuation}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Spaces</div>
          <div className="text-2xl font-semibold">{stats.spaces}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Lines</div>
          <div className="text-2xl font-semibold">{stats.lines}</div>
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
          placeholder="Type or paste your text here to count characters..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[400px] text-base"
        />
      </div>

      <Card className="p-6 bg-purple-50">
        <h3 className="font-semibold mb-2">About Character Counter</h3>
        <p className="text-sm text-gray-700">
          Count characters, letters, numbers, punctuation marks, and more. This tool provides
          detailed character analysis including counts with and without spaces. Useful for social
          media posts, SMS messages, meta descriptions, and any content with character limits.
        </p>
      </Card>
    </div>
  );
};
