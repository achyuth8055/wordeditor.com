'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Sparkles } from 'lucide-react';
import { AiAssistant } from '../ai-assistant';
import { useEditorStore } from '@/store/use-editor-store';

export const AiButton = () => {
  const { editor } = useEditorStore();

  const handleInsertContent = (content: string) => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;

    if (hasSelection) {
      // Replace selected text
      editor.chain().focus().deleteSelection().insertContent(content).run();
    } else {
      // Insert at cursor position
      editor.chain().focus().insertContent(content).run();
    }
  };

  const getSelectedText = () => {
    if (!editor) return '';
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, ' ');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <Sparkles className="size-4 text-purple-500" />
          <span className="text-purple-600 dark:text-purple-400 font-medium">AI Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-white">AI Writing Assistant</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Use AI to improve, expand, translate, or rewrite your content
          </DialogDescription>
        </DialogHeader>
        <AiAssistant 
          onInsertContent={handleInsertContent} 
          selectedText={getSelectedText()}
        />
      </DialogContent>
    </Dialog>
  );
};
