'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play } from 'lucide-react';

const sampleTexts = [
  'The quick brown fox jumps over the lazy dog near the riverbank.',
  'Pack my box with five dozen liquor jugs for the amazing expedition.',
  'How vexingly quick daft zebras jump through the misty forest.',
  'The five boxing wizards jump quickly into the ancient temple ruins.',
  'Sphinx of black quartz, judge my vow to explore the unknown.',
];

export const TypingTest = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const initializeTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setTargetText(randomText);
    setCurrentText('');
    setStarted(false);
    setFinished(false);
    setStartTime(0);
    setEndTime(0);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
  };

  useEffect(() => {
    initializeTest();
  }, []);

  const handleStart = () => {
    setStarted(true);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!started) {
      handleStart();
    }

    setCurrentText(value);

    // Calculate errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Calculate accuracy
    const acc = value.length > 0 ? ((value.length - errorCount) / value.length) * 100 : 100;
    setAccuracy(Math.max(0, acc));

    // Check if finished
    if (value === targetText) {
      const end = Date.now();
      setEndTime(end);
      setFinished(true);

      const timeInMinutes = (end - startTime) / 60000;
      const words = targetText.split(' ').length;
      const calculatedWpm = Math.round(words / timeInMinutes);
      setWpm(calculatedWpm);
    }
  };

  const handleReset = () => {
    initializeTest();
    inputRef.current?.focus();
  };

  const getCharacterClass = (index: number) => {
    if (index >= currentText.length) return 'text-gray-400';
    if (currentText[index] === targetText[index]) return 'text-green-600';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {!finished ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-sm text-gray-600">WPM</div>
              <div className="text-3xl font-bold text-emerald-600">
                {started && !finished
                  ? Math.round(
                      (currentText.split(' ').length / ((Date.now() - startTime) / 60000)) || 0
                    )
                  : 0}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600">Accuracy</div>
              <div className="text-3xl font-bold text-blue-600">{accuracy.toFixed(0)}%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-gray-600">Errors</div>
              <div className="text-3xl font-bold text-red-600">{errors}</div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Type the text below:</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-lg min-h-[80px]">
              {targetText.split('').map((char, index) => (
                <span key={index} className={getCharacterClass(index)}>
                  {char}
                </span>
              ))}
            </div>

            <textarea
              ref={inputRef}
              value={currentText}
              onChange={handleChange}
              placeholder="Start typing here..."
              className="w-full min-h-[120px] p-4 border-2 border-gray-300 rounded-lg font-mono text-lg focus:outline-none focus:border-emerald-500"
              disabled={finished}
            />

            <div className="flex gap-2 mt-4">
              {!started && (
                <Button onClick={handleStart}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Test
                </Button>
              )}
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                New Text
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-600 mb-4">Test Complete! 🎉</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div>
              <div className="text-5xl font-bold text-emerald-600">{wpm}</div>
              <div className="text-gray-600 mt-2">Words Per Minute</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600">{accuracy.toFixed(1)}%</div>
              <div className="text-gray-600 mt-2">Accuracy</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-600">
                {((endTime - startTime) / 1000).toFixed(1)}s
              </div>
              <div className="text-gray-600 mt-2">Time Taken</div>
            </div>
          </div>
          <Button onClick={handleReset} size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </Card>
      )}

      <Card className="p-6 bg-green-50">
        <h3 className="font-semibold mb-2">About Typing Test</h3>
        <p className="text-sm text-gray-700">
          Test your typing speed and accuracy with this interactive typing test. Your WPM (Words
          Per Minute) and accuracy are calculated in real-time. Practice regularly to improve your
          typing skills and increase your productivity.
        </p>
      </Card>
    </div>
  );
};
