'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Play, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const sampleTextsByDifficulty = {
  beginner: [
    'The cat sat on the mat. The dog ran in the park. The sun is bright today.',
    'I like to read books. My favorite color is blue. The sky looks beautiful.',
    'She went to the store. He played with his toy. We ate lunch together.',
    'The bird flew away fast. The tree is very tall. The flowers smell nice.',
    'They are good friends here. The car is red and new. The moon shines at night.',
  ],
  intermediate: [
    'The quick brown fox jumps over the lazy dog near the riverbank.',
    'Pack my box with five dozen liquor jugs for the amazing expedition.',
    'How vexingly quick daft zebras jump through the misty forest.',
    'The five boxing wizards jump quickly into the ancient temple ruins.',
    'Sphinx of black quartz, judge my vow to explore the unknown.',
    'Programming requires patience, practice, and persistence to master effectively.',
    'Innovation drives technology forward, creating opportunities for global advancement.',
    'The symphony orchestra performed a magnificent concert in the grand hall.',
  ],
  advanced: [
    'Conscientious programmers meticulously debug complex algorithms to ensure optimal performance and reliability.',
    'The juxtaposition of contemporary architectural designs with historical structures creates fascinating urban landscapes.',
    'Philosophical discourse regarding existentialism encompasses profound contemplations about human consciousness and purpose.',
    'Sophisticated artificial intelligence algorithms revolutionize computational linguistics and natural language processing capabilities.',
    'The entrepreneur\'s unprecedented philanthropic endeavors significantly transformed underprivileged communities worldwide.',
    'Quantum mechanics fundamentally challenges our conventional understanding of physical reality and causality.',
    'Multidisciplinary research initiatives facilitate groundbreaking discoveries across diverse scientific domains.',
  ],
};

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export const TypingTest = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [pasteAttempted, setPasteAttempted] = useState(false);
  const [focusLost, setFocusLost] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const initializeTest = () => {
    const texts = sampleTextsByDifficulty[difficulty];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setTargetText(randomText);
    setCurrentText('');
    setStarted(false);
    setFinished(false);
    setStartTime(0);
    setEndTime(0);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setPasteAttempted(false);
    setFocusLost(false);
  };

  useEffect(() => {
    initializeTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const handleStart = () => {
    setStarted(true);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setPasteAttempted(true);
    setTimeout(() => setPasteAttempted(false), 3000);
  };

  const handleBlur = () => {
    if (started && !finished) {
      setFocusLost(true);
    }
  };

  const handleFocus = () => {
    setFocusLost(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!started) {
      handleStart();
    }
    
    // Track keystrokes for more accurate WPM
    if (e.key.length === 1 || e.key === 'Backspace') {
      setTotalKeystrokes(prev => prev + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!started) {
      handleStart();
    }

    // Prevent going beyond target length
    if (value.length > targetText.length) {
      return;
    }

    setCurrentText(value);

    // Calculate errors and correct keystrokes
    let errorCount = 0;
    let correctCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === targetText[i]) {
        correctCount++;
      } else {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setCorrectKeystrokes(correctCount);

    // Calculate accuracy
    const acc = value.length > 0 ? (correctCount / value.length) * 100 : 100;
    setAccuracy(Math.max(0, acc));

    // Check if finished
    if (value === targetText) {
      const end = Date.now();
      setEndTime(end);
      setFinished(true);

      const timeInMinutes = (end - startTime) / 60000;
      // WPM calculation: (characters typed / 5) / time in minutes
      const characters = targetText.length;
      const calculatedWpm = Math.round((characters / 5) / timeInMinutes);
      setWpm(calculatedWpm);
    }
  };

  const handleReset = () => {
    initializeTest();
    inputRef.current?.focus();
  };

  const getCharacterClass = (index: number) => {
    if (index >= currentText.length) return 'text-gray-400';
    if (currentText[index] === targetText[index]) return 'text-green-600 font-semibold';
    return 'text-red-600 bg-red-100 font-semibold underline decoration-wavy';
  };

  const progress = (currentText.length / targetText.length) * 100;
  const currentWpm = started && !finished
    ? Math.round(((currentText.length / 5) / ((Date.now() - startTime) / 60000)) || 0)
    : 0;

  return (
    <div className="space-y-6">
      {pasteAttempted && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Pasting text is not allowed! Please type manually to get accurate results.
          </AlertDescription>
        </Alert>
      )}

      {focusLost && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Focus lost! Click on the text area to continue typing.
          </AlertDescription>
        </Alert>
      )}

      {!started && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Select Difficulty</h3>
            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Beginner:</strong> Simple short sentences, common words</p>
            <p><strong>Intermediate:</strong> Standard sentences with varied vocabulary</p>
            <p><strong>Advanced:</strong> Complex sentences with sophisticated vocabulary</p>
          </div>
        </Card>
      )}

      {!finished ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-gray-600">WPM</div>
              <div className="text-3xl font-bold text-emerald-600">
                {currentWpm}
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
            <Card className="p-4">
              <div className="text-sm text-gray-600">Progress</div>
              <div className="text-3xl font-bold text-purple-600">{progress.toFixed(0)}%</div>
            </Card>
          </div>

          {started && (
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Completion Progress</span>
                <span className="text-sm text-gray-600">{currentText.length}/{targetText.length} characters</span>
              </div>
              <Progress value={progress} className="h-3" />
            </Card>
          )}

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Type the text below:</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-lg min-h-[80px] leading-relaxed">
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
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder="Start typing here..."
              className="w-full min-h-[120px] p-4 border-2 border-gray-300 rounded-lg font-mono text-lg focus:outline-none focus:border-emerald-500 disabled:bg-gray-100"
              disabled={finished}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
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
                {started ? 'Restart' : 'New Text'}
              </Button>
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-600 mb-4">Test Complete! 🎉</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
            <div>
              <div className="text-5xl font-bold text-emerald-600">{wpm}</div>
              <div className="text-gray-600 mt-2">Words Per Minute</div>
              <div className="text-xs text-gray-500 mt-1">
                {wpm < 40 && '(Keep practicing!)'}
                {wpm >= 40 && wpm < 60 && '(Good!)'}
                {wpm >= 60 && wpm < 80 && '(Great!)'}
                {wpm >= 80 && '(Excellent!)'}
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600">{accuracy.toFixed(1)}%</div>
              <div className="text-gray-600 mt-2">Accuracy</div>
              <div className="text-xs text-gray-500 mt-1">
                {accuracy >= 95 ? '(Excellent!)' : accuracy >= 85 ? '(Good!)' : '(Needs work)'}
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-600">
                {((endTime - startTime) / 1000).toFixed(1)}s
              </div>
              <div className="text-gray-600 mt-2">Time Taken</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600">{totalKeystrokes}</div>
              <div className="text-gray-600 mt-2">Total Keystrokes</div>
              <div className="text-xs text-gray-500 mt-1">
                {correctKeystrokes} correct
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Performance Breakdown</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-gray-600">Characters Typed: <span className="font-semibold">{currentText.length}</span></p>
                <p className="text-gray-600">Correct Characters: <span className="font-semibold text-green-600">{correctKeystrokes}</span></p>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Errors Made: <span className="font-semibold text-red-600">{errors}</span></p>
                <p className="text-gray-600">Difficulty: <span className="font-semibold capitalize">{difficulty}</span></p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={handleReset} size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={() => {
              handleReset();
              if (difficulty === 'beginner') setDifficulty('intermediate');
              else if (difficulty === 'intermediate') setDifficulty('advanced');
            }} variant="outline" size="lg">
              {difficulty === 'advanced' ? 'Try Beginner' : 'Increase Difficulty'}
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-emerald-50">
        <h3 className="font-semibold mb-2">About Typing Test</h3>
        <p className="text-sm text-gray-700 mb-3">
          Test your typing speed and accuracy with this interactive typing test. Your WPM (Words
          Per Minute) and accuracy are calculated in real-time using industry-standard formulas.
          Practice regularly to improve your typing skills and increase your productivity.
        </p>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Anti-Cheat Features:</strong></p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Paste prevention - must type manually</li>
            <li>Focus tracking - alerts when you leave the input field</li>
            <li>Character-by-character validation for accurate error detection</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};
