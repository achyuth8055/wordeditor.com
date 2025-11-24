'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Trash2 } from 'lucide-react';

export const ReadingTime = () => {
  const [text, setText] = useState('');
  const [readingSpeed, setReadingSpeed] = useState(200);
  const [stats, setStats] = useState({
    words: 0,
    readingTime: 0,
    speakingTime: 0,
    readingTimeCustom: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      const trimmedText = text.trim();
      const words = trimmedText
        ? trimmedText.split(/\s+/).filter((word) => word.length > 0).length
        : 0;

      const readingTime = words > 0 ? words / 200 : 0;
      const speakingTime = words > 0 ? words / 130 : 0;
      const readingTimeCustom = words > 0 ? words / readingSpeed : 0;

      setStats({
        words,
        readingTime,
        speakingTime,
        readingTimeCustom,
      });
    };

    calculateStats();
  }, [text, readingSpeed]);

  const formatTime = (minutes: number) => {
    if (minutes < 1) {
      return `${Math.round(minutes * 60)} seconds`;
    }
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return secs > 0 ? `${mins} min ${secs} sec` : `${mins} min`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Reading Time</div>
          <div className="text-2xl font-bold text-emerald-600">{formatTime(stats.readingTime)}</div>
          <div className="text-xs text-gray-500">Average reader (200 wpm)</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Speaking Time</div>
          <div className="text-2xl font-bold text-blue-600">{formatTime(stats.speakingTime)}</div>
          <div className="text-xs text-gray-500">Average speaker (130 wpm)</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-600">Custom Speed</div>
          <div className="text-2xl font-bold text-purple-600">
            {formatTime(stats.readingTimeCustom)}
          </div>
          <div className="text-xs text-gray-500">{readingSpeed} words per minute</div>
        </Card>
      </div>

      <Card className="p-6">
        <Label htmlFor="reading-speed" className="text-sm font-medium">
          Custom Reading Speed (words per minute)
        </Label>
        <div className="flex items-center gap-4 mt-2">
          <Input
            id="reading-speed"
            type="number"
            min="50"
            max="1000"
            value={readingSpeed}
            onChange={(e) => setReadingSpeed(Number(e.target.value))}
            className="w-32"
          />
          <div className="text-sm text-gray-600">
            Adjust based on your reading speed (typical range: 150-300 wpm)
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-sm text-gray-600 mb-2">Total Words</div>
        <div className="text-4xl font-bold text-orange-600">{stats.words}</div>
      </Card>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleCopy} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <Textarea
          placeholder="Paste your text here to calculate reading time..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[400px] text-base"
        />
      </div>

      <Card className="p-6 bg-orange-50">
        <h3 className="font-semibold mb-2">About Reading Time Calculator</h3>
        <p className="text-sm text-gray-700">
          Calculate how long it takes to read your content. The average adult reads at about 200
          words per minute, while speaking typically occurs at 130 words per minute. You can
          customize the reading speed to match your audience. Perfect for blog posts, articles,
          presentations, and speeches.
        </p>
      </Card>
    </div>
  );
};
