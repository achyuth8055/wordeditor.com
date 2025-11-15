
import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { AiTools } from './AiTools';
import { TypingTest } from './TypingTest';
import { ExportTools } from './ExportTools';

interface SidebarProps {
  text: string;
}

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
      isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {label}
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ text }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.AI_TOOLS);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sticky top-24">
      <div className="flex items-center justify-center gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
        <TabButton label="AI Tools" isActive={activeTab === ActiveTab.AI_TOOLS} onClick={() => setActiveTab(ActiveTab.AI_TOOLS)} />
        <TabButton label="Typing Test" isActive={activeTab === ActiveTab.TYPING_TEST} onClick={() => setActiveTab(ActiveTab.TYPING_TEST)} />
        <TabButton label="Export" isActive={activeTab === ActiveTab.EXPORT} onClick={() => setActiveTab(ActiveTab.EXPORT)} />
      </div>

      <div className="min-h-[400px]">
        {activeTab === ActiveTab.AI_TOOLS && <AiTools text={text} />}
        {activeTab === ActiveTab.TYPING_TEST && <TypingTest />}
        {activeTab === ActiveTab.EXPORT && <ExportTools text={text} />}
      </div>
    </div>
  );
};
