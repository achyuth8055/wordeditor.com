'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ErrorMessage } from './error-message';
import { toast } from 'sonner';

interface RenameDialogProps {
  documentId: Id<'documents'>;
  initialTitle: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const MAX_TITLE_LENGTH = 30;

export const RenameDialog = ({ documentId, initialTitle, children, onOpenChange }: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setError(`Title cannot exceed ${MAX_TITLE_LENGTH} characters`);
      return;
    }

    if (trimmedTitle.length === 0) {
      setError('Title cannot be empty');
      return;
    }

    setIsUpdating(true);
    setError('');

    update({ id: documentId, title: title.trim() })
      .then(() => {
        handleOpenChange(false);
        toast.success('Document renamed');
      })
      .catch(e => {
        toast.error(e.data || e.message || 'Rename failed');
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>Enter a new name for this document</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter new name" />
            {error && <ErrorMessage className="mt-4" message={error} />}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={isUpdating} onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating || !title.trim()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
