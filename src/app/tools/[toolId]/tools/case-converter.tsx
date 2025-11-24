'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';

export const CaseConverter = () => {
  const [text, setText] = useState('');

  const convertToUpperCase = () => {
    setText(text.toUpperCase());
  };

  const convertToLowerCase = () => {
    setText(text.toLowerCase());
  };

  const convertToTitleCase = () => {
    const titleCased = text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    setText(titleCased);
  };

  const convertToSentenceCase = () => {
    const sentenceCased = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setText(sentenceCased);
  };

  const convertToCamelCase = () => {
    const camelCased = text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
    setText(camelCased);
  };

  const convertToSnakeCase = () => {
    const snakeCased = text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join('_');
    setText(snakeCased);
  };

  const convertToKebabCase = () => {
    const kebabCased = text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join('-');
    setText(kebabCased);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Text Transformations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button onClick={convertToUpperCase} variant="outline" className="w-full">
            UPPER CASE
          </Button>
          <Button onClick={convertToLowerCase} variant="outline" className="w-full">
            lower case
          </Button>
          <Button onClick={convertToTitleCase} variant="outline" className="w-full">
            Title Case
          </Button>
          <Button onClick={convertToSentenceCase} variant="outline" className="w-full">
            Sentence case
          </Button>
          <Button onClick={convertToCamelCase} variant="outline" className="w-full">
            camelCase
          </Button>
          <Button onClick={convertToSnakeCase} variant="outline" className="w-full">
            snake_case
          </Button>
          <Button onClick={convertToKebabCase} variant="outline" className="w-full">
            kebab-case
          </Button>
        </div>
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
          placeholder="Enter your text here to convert between different cases..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[400px] text-base"
        />
      </div>

      <Card className="p-6 bg-indigo-50">
        <h3 className="font-semibold mb-2">About Case Converter</h3>
        <p className="text-sm text-gray-700">
          Easily convert text between different cases: UPPERCASE, lowercase, Title Case, Sentence
          case, camelCase, snake_case, and kebab-case. Perfect for programmers, content writers, and
          anyone working with text formatting.
        </p>
      </Card>
    </div>
  );
};
