import React, { useState } from 'react';
import { Header } from './components/Header';
import { InnerNavbar, ToolTab } from './components/InnerNavbar';
import { TypingTest } from './components/TypingTest';
import { WordCounterPage } from './components/WordCounterPage';
import { SummarizerPage } from './components/SummarizerPage';
import { CaseConverterPage } from './components/CaseConverterPage';
import { InfoPages } from './components/InfoPages';
import { Background } from './components/Background';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolTab>(ToolTab.WORD_COUNTER);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-x-hidden flex flex-col">
      <Background />
      <Header onNavClick={setActiveTab} />
      <InnerNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="w-full z-10 relative flex-1 overflow-hidden">
        {activeTab === ToolTab.TYPING_TEST && (
          <div className="w-full h-full">
            <TypingTest />
          </div>
        )}
        {activeTab === ToolTab.WORD_COUNTER && (
          <div className="w-full h-full">
            <WordCounterPage />
          </div>
        )}
        {activeTab === ToolTab.SUMMARIZER && (
          <div className="w-full h-full">
            <SummarizerPage />
          </div>
        )}
        {activeTab === ToolTab.CASE_CONVERTER && (
          <div className="w-full h-full">
            <CaseConverterPage />
          </div>
        )}
        {activeTab === ToolTab.INFO && (
          <div className="w-full h-full">
            <InfoPages />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
