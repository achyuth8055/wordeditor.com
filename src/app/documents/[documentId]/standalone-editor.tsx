'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import LinkExtension from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/use-editor-store';
import { Navbar } from '../../(home)/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, Save } from 'lucide-react';
import NextLink from 'next/link';
import { Ruler } from './ruler';
import { Threads } from './threads';
import { Toolbar } from './toolbar';

interface StandaloneEditorProps {
  documentId: string;
}

export function StandaloneEditor({ documentId }: StandaloneEditorProps) {
  const [title, setTitle] = useState('Untitled Document');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { setEditor } = useEditorStore();

  // Load document from localStorage
  useEffect(() => {
    const savedDoc = localStorage.getItem(`doc-${documentId}`);
    if (savedDoc) {
      const parsed = JSON.parse(savedDoc);
      setTitle(parsed.title || 'Untitled Document');
      setContent(parsed.content || '');
    }
  }, [documentId]);

  const editor = useEditor({
    autofocus: 'end',
    editable: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px;',
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    extensions: [
      StarterKit.configure({
        history: {}, // Enable history with default options
      }),
      Placeholder.configure({
        placeholder: 'Start typing your document...',
      }),
      FontSizeExtension,
      LineHeightExtension,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Underline,
      Image,
      ImageResize,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      FontFamily,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      // Auto-save to localStorage
      const html = editor.getHTML();
      setContent(html);
      saveToLocalStorage(title, html);
    },
  });

  // Set editor in store for Toolbar to use
  useEffect(() => {
    if (editor) {
      setEditor(editor);
    }
    return () => {
      setEditor(null);
    };
  }, [editor, setEditor]);

  const saveToLocalStorage = (docTitle: string, docContent: string) => {
    localStorage.setItem(
      `doc-${documentId}`,
      JSON.stringify({
        title: docTitle,
        content: docContent,
        updatedAt: new Date().toISOString(),
      })
    );
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    saveToLocalStorage(newTitle, content);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    setIsSaving(true);
    saveToLocalStorage(title, content);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
        <Navbar />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NextLink href="/documents">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="size-5" />
              </Button>
            </NextLink>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="size-4 mr-2" />
              {isSaving ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        {editor && <Toolbar />}
      </div>

      <div className="pt-[140px] print:pt-0">
        <Ruler />
        <div className="flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-h-0">
          <EditorContent editor={editor} />
        </div>
        <Threads editor={editor} />
      </div>
    </div>
  );
}
