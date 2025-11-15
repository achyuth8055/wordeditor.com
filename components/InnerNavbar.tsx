import React from 'react';

export enum ToolTab {
  WORD_COUNTER = 'word-counter',
  SUMMARIZER = 'summarizer',
  CASE_CONVERTER = 'case-converter',
  TYPING_TEST = 'typing-test',
  INFO = 'info',
}

interface InnerNavbarProps {
  activeTab: ToolTab;
  onTabChange: (tab: ToolTab) => void;
}

const NavItem: React.FC<{
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-green-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <i className={`fas ${icon} text-sm`}></i>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export const InnerNavbar: React.FC<InnerNavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 sticky top-16 z-10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          <NavItem
            icon="fa-file-alt"
            label="Word Counter"
            isActive={activeTab === ToolTab.WORD_COUNTER}
            onClick={() => onTabChange(ToolTab.WORD_COUNTER)}
          />
          <NavItem
            icon="fa-compress"
            label="Summarizer"
            isActive={activeTab === ToolTab.SUMMARIZER}
            onClick={() => onTabChange(ToolTab.SUMMARIZER)}
          />
          <NavItem
            icon="fa-font"
            label="Case Converter"
            isActive={activeTab === ToolTab.CASE_CONVERTER}
            onClick={() => onTabChange(ToolTab.CASE_CONVERTER)}
          />
          <NavItem
            icon="fa-keyboard"
            label="Typing Test"
            isActive={activeTab === ToolTab.TYPING_TEST}
            onClick={() => onTabChange(ToolTab.TYPING_TEST)}
          />
        </div>
      </div>
    </div>
  );
};
