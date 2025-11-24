import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToolbarButton } from './toolbar-button';
import { ChainedCommands } from '@tiptap/core';

export const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: 'Normal text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px', styleSize: '28px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
    { label: 'Heading 6', value: 6, fontSize: '16px' },
  ];

  const getCurrentHeadingLevel = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive('heading', { level })) {
        return level;
      }
    }
    return 0;
  };

  const currentHeadingLevel = getCurrentHeadingLevel();

  const resetFn = (chainCommands: ChainedCommands) => {
    return chainCommands.unsetFontSize().unsetLineHeight();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltipLabel="Text & Headings" className="min-w-[80px] px-1.5">
          <span className="truncate">{headings[currentHeadingLevel].label}</span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
        {headings.map((heading, index) => (
          <DropdownMenuItem
            key={heading.value}
            className={cn('focus:outline-none cursor-pointer', index === currentHeadingLevel && 'bg-accent')}
            style={{ fontSize: heading.styleSize ?? heading.fontSize, lineHeight: 1.2, height: 'auto' }}
            onSelect={() => {
              const chainCommands = editor?.chain();
              if (index === 0) {
                chainCommands?.focus().setParagraph().unsetFontSize();
                resetFn(chainCommands!).run();
              } else {
                chainCommands?.focus().setHeading({ level: heading.value as any });
                resetFn(chainCommands!).run();
              }
            }}
          >
            {heading.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
