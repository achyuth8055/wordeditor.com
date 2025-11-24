import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ImageIcon, Pencil, UploadIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ToolbarButton } from './toolbar-button';

export const ImageButton = () => {
  const { editor } = useEditorStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      document.activeElement instanceof HTMLElement && document.activeElement.blur();
      onChange(imageUrl);
      setImageUrl('');
      setDialogOpen(false);
    }
  };

  const onDropdownOpenChange = (_open: boolean) => {
    setDropdownOpen(_open);
  };

  const onDialogOpenChange = (_open: boolean) => {
    setDialogOpen(_open);
    if (!_open) {
      document.activeElement instanceof HTMLElement && document.activeElement.blur();
    }
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={onDropdownOpenChange}>
        <DropdownMenuTrigger asChild>
          <ToolbarButton tooltipLabel="Insert image">
            <ImageIcon className="size-4" />
          </ToolbarButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent onCloseAutoFocus={e => e.preventDefault()}>
          <DropdownMenuItem className="cursor-pointer" onClick={onUpload}>
            <UploadIcon className="size-4" />
            Upload image
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogOpen(true)}>
            <Pencil className="size-4" />
            Paste image link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={onDialogOpenChange}>
        <DialogContent onCloseAutoFocus={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Enter image link</DialogTitle>
          </DialogHeader>
          <DialogDescription>Enter the URL of the image, then click the confirm button to insert the image into the document</DialogDescription>
          <Input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
