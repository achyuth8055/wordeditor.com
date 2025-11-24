'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeftRight } from 'lucide-react';

export const TextDiff = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const calculateDiff = () => {
    setShowDiff(true);
  };

  const getDiffStats = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    let additions = 0;
    let deletions = 0;
    let unchanged = 0;

    const maxLength = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        unchanged++;
      } else if (!line1) {
        additions++;
      } else if (!line2) {
        deletions++;
      } else {
        additions++;
        deletions++;
      }
    }

    return { additions, deletions, unchanged };
  };

  const renderDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);
    const diffLines = [];

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        diffLines.push({ type: 'unchanged', text: line1, lineNum: i + 1 });
      } else {
        if (line1) {
          diffLines.push({ type: 'deletion', text: line1, lineNum: i + 1 });
        }
        if (line2) {
          diffLines.push({ type: 'addition', text: line2, lineNum: i + 1 });
        }
      }
    }

    return diffLines;
  };

  const stats = getDiffStats();
  const diffLines = showDiff ? renderDiff() : [];

  return (
    <div className="space-y-6">
      {showDiff && (
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-gray-600">Additions</div>
            <div className="text-3xl font-bold text-green-600">+{stats.additions}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600">Deletions</div>
            <div className="text-3xl font-bold text-red-600">-{stats.deletions}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-600">Unchanged</div>
            <div className="text-3xl font-bold text-gray-600">{stats.unchanged}</div>
          </Card>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Original Text</Label>
          <Textarea
            placeholder="Enter original text..."
            value={text1}
            onChange={(e) => {
              setText1(e.target.value);
              setShowDiff(false);
            }}
            className="min-h-[300px] text-base font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label>Modified Text</Label>
          <Textarea
            placeholder="Enter modified text..."
            value={text2}
            onChange={(e) => {
              setText2(e.target.value);
              setShowDiff(false);
            }}
            className="min-h-[300px] text-base font-mono"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={calculateDiff} size="lg">
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          Compare Texts
        </Button>
      </div>

      {showDiff && diffLines.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Differences</h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-[500px] overflow-y-auto">
            {diffLines.map((line, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  line.type === 'addition'
                    ? 'bg-green-100 text-green-900'
                    : line.type === 'deletion'
                    ? 'bg-red-100 text-red-900'
                    : 'bg-white text-gray-700'
                }`}
              >
                <span className="inline-block w-8 text-gray-400">{line.lineNum}</span>
                <span className="font-semibold mr-2">
                  {line.type === 'addition' ? '+' : line.type === 'deletion' ? '-' : ' '}
                </span>
                {line.text || <span className="text-gray-400 italic">(empty line)</span>}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6 bg-cyan-50">
        <h3 className="font-semibold mb-2">About Text Difference Checker</h3>
        <p className="text-sm text-gray-700">
          Compare two versions of text to see what has changed. This tool highlights additions,
          deletions, and unchanged lines. Useful for reviewing edits, comparing document versions,
          code changes, and tracking text modifications.
        </p>
      </Card>
    </div>
  );
};
