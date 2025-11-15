
import React from 'react';
import { ToolTab } from './InnerNavbar';

const Logo: React.FC = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 7L12 12M22 7L12 12M12 22V12M17 4.5L7 9.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

interface HeaderProps {
  onNavClick?: (tab: ToolTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: ToolTab) => {
    e.preventDefault();
    onNavClick?.(tab);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">WordEditor.online</h1>     
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" onClick={(e) => handleNavClick(e, ToolTab.INFO)} className="text-gray-600 hover:text-green-600 transition-colors duration-200">About</a>
            <a href="#how-to" onClick={(e) => handleNavClick(e, ToolTab.INFO)} className="text-gray-600 hover:text-green-600 transition-colors duration-200">How to Use</a>
            <a href="#faqs" onClick={(e) => handleNavClick(e, ToolTab.INFO)} className="text-gray-600 hover:text-green-600 transition-colors duration-200">FAQs</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-gray-600 hover:text-gray-900">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};
