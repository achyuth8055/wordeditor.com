import React, { useState, useEffect, useRef, useMemo } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Template {
  id: string;
  name: string;
  text: string;
  difficulty: Difficulty;
}

interface TestStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

const TEMPLATES: Record<Difficulty, Template[]> = {
  easy: [
    {
      id: 'easy1',
      name: 'Beginner 1',
      text: 'The quick brown fox jumps over the lazy dog. This is a common phrase used in typing tests. It contains every letter of the alphabet.',
      difficulty: 'easy',
    },
    {
      id: 'easy2',
      name: 'Beginner 2',
      text: 'Hello world. Welcome to the typing test. Practice makes perfect. Keep typing and improve your speed every day.',
      difficulty: 'easy',
    },
    {
      id: 'easy3',
      name: 'Beginner 3',
      text: 'The sun is shining brightly today. Birds are singing in the trees. It is a beautiful day outside.',
      difficulty: 'easy',
    },
    {
      id: 'easy4',
      name: 'Simple Words',
      text: 'I love to read books every day. Reading helps expand your vocabulary and knowledge. It is a wonderful habit to develop.',
      difficulty: 'easy',
    },
    {
      id: 'easy5',
      name: 'Daily Life',
      text: 'Wake up early in the morning. Have a healthy breakfast. Go for a walk in the park. Enjoy your day.',
      difficulty: 'easy',
    },
  ],
  medium: [
    {
      id: 'medium1',
      name: 'Technology',
      text: 'Technology is rapidly changing our world. Artificial intelligence and machine learning are becoming increasingly important. Developers must continuously learn new skills.',
      difficulty: 'medium',
    },
    {
      id: 'medium2',
      name: 'Programming',
      text: 'React is a JavaScript library for building user interfaces with reusable components. State management is crucial for complex applications. Props allow data to flow from parent to child components.',
      difficulty: 'medium',
    },
    {
      id: 'medium3',
      name: 'Web Development',
      text: 'Web development requires knowledge of HTML, CSS, and JavaScript. Understanding responsive design is essential for modern websites. Accessibility should always be considered.',
      difficulty: 'medium',
    },
    {
      id: 'medium4',
      name: 'Business Communication',
      text: 'Effective communication is the foundation of successful business. Clear messaging helps build stronger relationships with clients. Professional writing is an important skill to master.',
      difficulty: 'medium',
    },
    {
      id: 'medium5',
      name: 'Cloud Computing',
      text: 'Cloud computing has revolutionized how organizations store and process data. Services like AWS and Azure provide scalable solutions. Security and reliability are paramount in cloud infrastructure.',
      difficulty: 'medium',
    },
    {
      id: 'medium6',
      name: 'Data Science',
      text: 'Data science combines statistics, programming, and domain expertise. Machine learning models help predict future trends. Data visualization makes complex information easier to understand.',
      difficulty: 'medium',
    },
  ],
  hard: [
    {
      id: 'hard1',
      name: 'Advanced Vocabulary',
      text: 'Sophisticated algorithms and complex architectural paradigms necessitate comprehensive understanding of computational methodologies. Distributed systems require meticulous optimization.',
      difficulty: 'hard',
    },
    {
      id: 'hard2',
      name: 'Philosophy',
      text: 'The quintessential nature of human consciousness perpetuates philosophical inquiries throughout civilization. Existential paradigms fundamentally challenge our understanding.',
      difficulty: 'hard',
    },
    {
      id: 'hard3',
      name: 'Cryptography',
      text: 'Implementing asynchronous operations with probabilistic caching mechanisms requires profound comprehension. Cryptographic protocols necessitate rigorous validation.',
      difficulty: 'hard',
    },
    {
      id: 'hard4',
      name: 'Literature',
      text: 'Contemporary literature often explores the dichotomy between tradition and innovation. Authors employ sophisticated narrative techniques to convey profound thematic elements.',
      difficulty: 'hard',
    },
    {
      id: 'hard5',
      name: 'Scientific Discourse',
      text: 'Quantum mechanics fundamentally altered our comprehension of subatomic phenomena. Theoretical frameworks continue to evolve through rigorous experimentation and analysis.',
      difficulty: 'hard',
    },
  ],
};

export const TypingTest: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [typedText, setTypedText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [stats, setStats] = useState<TestStats | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResults, setShowResults] = useState(false);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const templates = useMemo(() => TEMPLATES[difficulty], [difficulty]);

  // Initialize with first template on mount and when difficulty changes
  useEffect(() => {
    if (templates.length > 0) {
      setSelectedTemplate(templates[0]);
      setTypedText('');
      setTimeLeft(60);
      setStats(null);
      setShowResults(false);
      setIsActive(false);
    }
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  // Focus text box on start
  useEffect(() => {
    if (isActive) {
      textBoxRef.current?.focus();
    }
  }, [isActive]);

  const finishTest = () => {
    if (!selectedTemplate) return;
    setIsActive(false);
    calculateStats();
    setShowResults(true);
  };

  const calculateStats = () => {
    if (!selectedTemplate) return;

    const sampleText = selectedTemplate.text;
    const elapsed = 60 - timeLeft;
    const minutes = Math.max(elapsed / 60, 0.016667);

    // Calculate character stats
    let correctChars = 0;
    for (let i = 0; i < typedText.length && i < sampleText.length; i++) {
      if (typedText[i] === sampleText[i]) {
        correctChars++;
      }
    }

    const totalChars = Math.max(typedText.length, sampleText.length);
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    const wordsTyped = typedText.length / 5;
    const wpm = Math.round(wordsTyped / minutes);

    setStats({
      wpm: Math.max(0, wpm),
      accuracy: Math.min(100, accuracy),
      correctChars,
      totalChars,
      timeElapsed: elapsed,
    });
  };

  const handleStart = () => {
    if (!selectedTemplate) return;
    setTypedText('');
    setTimeLeft(60);
    setStats(null);
    setShowResults(false);
    setIsActive(true);
  };

  const handleReset = () => {
    setTypedText('');
    setTimeLeft(60);
    setStats(null);
    setShowResults(false);
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isActive) return;

    if (!selectedTemplate) return;

    const sampleText = selectedTemplate.text;

    if (e.key === 'Backspace') {
      e.preventDefault();
      setTypedText(typedText.slice(0, -1));
    } else if (e.key.length === 1) {
      e.preventDefault();
      if (typedText.length < sampleText.length) {
        setTypedText(typedText + e.key);
      }
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    if (isActive) return;
    setDifficulty(newDifficulty);
    setTypedText('');
    setTimeLeft(60);
    setStats(null);
    setShowResults(false);
    setSelectedTemplate(TEMPLATES[newDifficulty][0]);
  };

  const handleTemplateChange = (template: Template) => {
    if (isActive) return;
    setSelectedTemplate(template);
    setTypedText('');
    setTimeLeft(60);
    setStats(null);
    setShowResults(false);
  };

  const getCharColor = (sampleChar: string, typedChar: string | undefined) => {
    if (!typedChar) return 'text-gray-600';
    return typedChar === sampleChar ? 'text-green-700' : 'text-red-600';
  };

  const getCharBg = (sampleChar: string, typedChar: string | undefined, idx: number) => {
    if (idx === typedText.length && isActive) return 'bg-blue-400';
    if (!typedChar) return '';
    return typedChar === sampleChar ? 'bg-green-100' : 'bg-red-100';
  };

  // Guard clause: don't render if template isn't loaded yet
  if (!selectedTemplate) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Top Stats Bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-2 sm:px-4 py-2 sm:py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-center sm:justify-start">
            <div className="text-center">
              <p className="text-xs font-semibold opacity-80">TIME</p>
              <p className={`text-xl sm:text-2xl font-bold ${timeLeft <= 10 && isActive ? 'animate-pulse' : ''}`}>
                {timeLeft}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold opacity-80">WPM</p>
              <p className="text-xl sm:text-2xl font-bold">
                {stats ? stats.wpm : isActive ? Math.round((typedText.length / 5) / ((60 - timeLeft) / 60 || 1)) : 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold opacity-80">ACCURACY</p>
              <p className="text-xl sm:text-2xl font-bold">
                {stats ? stats.accuracy : 0}%
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            {!isActive && stats === null && (
              <button
                onClick={handleStart}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-green-600 rounded font-bold hover:bg-green-50 transition-colors text-xs sm:text-sm"
              >
                Start
              </button>
            )}
            {isActive && (
              <button
                onClick={handleReset}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 transition-colors text-xs sm:text-sm"
              >
                Stop
              </button>
            )}
            {showResults && (
              <button
                onClick={handleStart}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-green-600 rounded font-bold hover:bg-green-50 transition-colors text-xs sm:text-sm"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Left Ad Space - Hidden on mobile */}
        <div className="hidden lg:flex w-20 lg:w-32 bg-white border-r border-gray-200 flex-shrink-0">
          {/* Your ads go here */}
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden gap-2 lg:gap-4 p-2 lg:p-4">
            {/* Left Sidebar - Difficulty & Templates */}
            <div className="w-full lg:w-48 bg-gray-50 rounded-lg border border-gray-200 flex flex-col overflow-hidden flex-shrink-0 max-h-40 lg:max-h-none">
              {/* Difficulty Selection */}
              <div className="p-2 lg:p-3 border-b border-gray-200 bg-gray-100">
                <h3 className="text-xs font-bold text-gray-700 mb-2">DIFFICULTY</h3>
                <div className="space-y-1 flex lg:flex-col gap-1 lg:gap-0">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => handleDifficultyChange(level)}
                      disabled={isActive}
                      className={`flex-1 lg:w-full py-1 lg:py-1.5 px-2 lg:px-3 rounded text-xs font-semibold transition-all ${
                        difficulty === level
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {level === 'easy' && '🟢'}
                      {level === 'medium' && '🟡'}
                      {level === 'hard' && '🔴'}
                      <span className="hidden sm:inline"> {level}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Templates - Hidden by default on mobile, scrollable */}
              <div className="hidden lg:flex flex-1 overflow-y-auto p-2 lg:p-3">
                <div className="w-full space-y-1">
                  <h3 className="text-xs font-bold text-gray-700 mb-2">LESSONS</h3>
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template)}
                      disabled={isActive}
                      className={`w-full p-2 rounded text-left text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedTemplate?.id === template.id
                          ? 'bg-green-100 border border-green-500 font-semibold text-gray-900'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <p className="font-semibold truncate">{template.name}</p>
                      <p className="text-gray-600 text-xs">{template.text.split(' ').length} words</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Text Display Area */}
            <div className="flex-1 flex flex-col gap-2 lg:gap-3 overflow-hidden">
              {/* Typing Area */}
              <div
                ref={textBoxRef}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 lg:p-6 border-2 border-gray-300 overflow-y-auto focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 cursor-text text-sm lg:text-xl"
              >
                <div className="leading-relaxed lg:leading-8 font-serif text-gray-800 break-words select-none">
                  {selectedTemplate.text.split('').map((char, idx) => {
                    const typedChar = typedText[idx];
                    const isCorrect = typedChar === char;
                    const isTyped = typedChar !== undefined;
                    const isCursor = idx === typedText.length && isActive;

                    return (
                      <span
                        key={idx}
                        className={`transition-colors ${getCharBg(char, typedChar, idx)} ${getCharColor(char, typedChar)} ${
                          isCursor ? 'animate-pulse' : ''
                        } ${!isTyped ? 'opacity-50' : 'opacity-100'} px-0.5`}
                      >
                        {char === ' ' ? '·' : char}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Results */}
              {showResults && stats && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 lg:p-4 rounded-lg border border-green-400 shadow-md">
                  <p className="text-xs lg:text-sm font-bold text-gray-900 mb-2 lg:mb-3">RESULTS</p>
                  <div className="grid grid-cols-4 gap-2 lg:gap-3">
                    <div className="text-center">
                      <p className="text-gray-600 text-xs font-semibold">WPM</p>
                      <p className="text-lg lg:text-xl font-bold text-green-600 mt-1">{stats.wpm}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-xs font-semibold">ACC</p>
                      <p className={`text-lg lg:text-xl font-bold mt-1 ${stats.accuracy >= 95 ? 'text-green-600' : stats.accuracy >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {stats.accuracy}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-xs font-semibold">CHARS</p>
                      <p className="text-lg lg:text-xl font-bold text-gray-700 mt-1">{stats.correctChars}/{stats.totalChars}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-xs font-semibold">TIME</p>
                      <p className="text-lg lg:text-xl font-bold text-gray-700 mt-1">{stats.timeElapsed}s</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Ad Space - Hidden on mobile */}
        <div className="hidden lg:flex w-20 lg:w-32 bg-white border-l border-gray-200 flex-shrink-0">
          {/* Your ads go here */}
        </div>
      </div>
    </div>
  );
};
