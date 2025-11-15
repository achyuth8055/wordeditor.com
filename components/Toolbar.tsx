import React from 'react';

interface ToolButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ToolButton: React.FC<ToolButtonProps> = ({ icon, label, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={label}
    className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-md border border-gray-200 text-gray-600 hover:text-green-600 hover:border-green-400 hover:shadow-lg transition-all duration-200 group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-600 disabled:hover:border-gray-200 disabled:hover:shadow-md"
  >
    <i className={`fas ${icon} text-xl mb-1`}></i>
    <span className="text-xs font-medium hidden sm:block">{label}</span>
  </button>
);

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onExport?: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onUndo, onRedo, canUndo, canRedo, onExport }) => {
  return (
    <div className="hidden lg:flex flex-col items-start gap-4 sticky top-24">
      <ToolButton icon="fa-undo" label="Undo" onClick={onUndo} disabled={!canUndo} />
      <ToolButton icon="fa-redo" label="Redo" onClick={onRedo} disabled={!canRedo} />
      <div className="w-12 h-px bg-gray-200"></div>
      <ToolButton icon="fa-save" label="Save" />
      <ToolButton icon="fa-download" label="Export" onClick={onExport} />
      <ToolButton icon="fa-eye" label="Preview" />
    </div>
  );
};
