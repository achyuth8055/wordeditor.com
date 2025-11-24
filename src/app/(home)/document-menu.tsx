'use client';

/**
 * Dialog.Trigger does not work if trigger is Dropdown.Item #1836
 * https://github.com/radix-ui/primitives/issues/1836
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ExternalLinkIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Id } from '../../../convex/_generated/dataModel';
import { RemoveDialog } from '@/components/remove-dialog';
import { RenameDialog } from '@/components/rename-dialog';
import { useState } from 'react';

interface DocumentMenuProps {
  documentId: Id<'documents'>;
  title: string;
  onNewTab: (id: Id<'documents'>) => void;
}

export const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-0">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={e => {
          // Prevent click event from bubbling to DocumentRow component and triggering row click
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          Open in new tab
        </DropdownMenuItem>
        <RenameDialog documentId={documentId} initialTitle={title} onOpenChange={setOpen}>
          <DropdownMenuItem onSelect={e => e.preventDefault()}>
            <PencilIcon className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId} onOpenChange={setOpen}>
          <DropdownMenuItem
            onSelect={e => {
              /**
               * FIX: Prevent AlertDialog from closing immediately after opening
               * When a dropdown menu item is selected, the dropdown closes and by default also closes the Dialog
               */
              e.preventDefault();
            }}
          >
            <TrashIcon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </RemoveDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
