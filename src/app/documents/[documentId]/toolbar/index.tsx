'use client';

import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/store/use-editor-store';
import {
  BoldIcon,
  ItalicIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  CodeIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  EraserIcon,
} from 'lucide-react';
import { ToolbarButton } from './toolbar-button';
import { FontFamilyButton } from './font-family-button';
import { HeadingLevelButton } from './heading-level-button';
import { TextColorButton } from './text-color-button';
import { HighlightColorButton } from './highlight-color-button';
import { LinkButton } from './link-button';
import { ImageButton } from './image-button';
import { AlignButton } from './align-button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ListButton } from './list-button';
import { FontSzeButton } from './font-size-button';
import { LineHeightButton } from './line-height-button';

export const Toolbar = () => {
  const { editor } = useEditorStore();

  if (!editor) {
    return null;
  }

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => {
          /**
           * chain 是 tiptap 提供的链式调用方法，开始一个命令链，允许多个命令按顺序执行，所有命令会作为一个原子操作执行
           * focus 让编辑器获得焦点
           * undo 执行撤销操作，恢复到上一个历史状态，Tiptap 自动维护编辑历史栈
           * run 执行整个命令链，必须调用 run() 命令链才会生效
           */
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => {
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: 'Clear Format',
        icon: EraserIcon,
        onClick: () => {
          // 删除当前选择中的所有标记
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck') ?? 'false';
          editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
          editor?.commands.focus();
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold') ?? false,
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic') ?? false,
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline') ?? false,
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
      {
        label: 'Strikethrough',
        icon: StrikethroughIcon,
        isActive: editor?.isActive('strike') ?? false,
        onClick: () => {
          editor?.chain().focus().toggleStrike().run();
        },
      },
      // {
      //   label: '高亮',
      //   icon: HighlighterIcon,
      //   isActive: editor?.isActive('highlight') ?? false,
      //   onClick: () => {
      //     editor?.chain().focus().toggleHighlight().run();
      //   },
      // },
      {
        label: 'Code',
        icon: CodeIcon,
        isActive: editor?.isActive('code') ?? false,
        onClick: () => {
          editor?.chain().focus().toggleCode().run();
        },
      },
    ],
    // Comment feature requires Liveblocks collaboration (disabled)
    // [
    //   {
    //     label: 'Comment',
    //     icon: MessageSquarePlusIcon,
    //     isActive: editor?.isActive('pendingComment') ?? false,
    //     onClick: () => editor?.chain().focus().addPendingComment().run(),
    //   },
    // ],
  ];

  return (
    <div className="ToolbarComponent bg-[#f1f4f9] px-2.5 py-0.5 rounded-3xl flex justify-center items-center gap-x-0.5 overflow-x-auto">
      <TooltipProvider delayDuration={300}>
        {sections[0].map(item => (
          <ToolbarButton key={item.label} tooltipLabel={item.label} {...item}>
            <item.icon className="size-4" />
          </ToolbarButton>
        ))}

        <Separator orientation="vertical" className="h-5 bg-neutral-300 mx-1.5" />

        <HeadingLevelButton />

        <FontSzeButton />

        <FontFamilyButton />

        <TextColorButton />

        <HighlightColorButton />

        <Separator orientation="vertical" className="h-5 bg-neutral-300 mx-1.5" />

        <LinkButton />

        <ImageButton />

        <Separator orientation="vertical" className="h-5 bg-neutral-300 mx-1.5" />

        <AlignButton />

        <ListButton />

        <LineHeightButton />

        <Separator orientation="vertical" className="h-5 bg-neutral-300 mx-1.5" />

        {sections[1] && sections[1].map(item => (
          <ToolbarButton key={item.label} tooltipLabel={item.label} {...item}>
            <item.icon className="size-4" />
          </ToolbarButton>
        ))}
      </TooltipProvider>
    </div>
  );
};
