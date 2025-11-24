'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DocumentInput } from './document-input';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSub,
  MenubarShortcut,
} from '@/components/ui/menubar';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  SaveIcon,
  StrikethroughIcon,
  TextIcon,
  Trash2Icon,
  UnderlineIcon,
  Undo2Icon,
  EraserIcon,
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { usePlatform } from '@/hooks/use-platform';
import { useEditorStore } from '@/store/use-editor-store';
import { memo, useState, useReducer } from 'react';
import { Avatars } from './avatars';
import { Inbox } from './inbox';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RemoveDialog } from '@/components/remove-dialog';
import { RenameDialog } from '@/components/rename-dialog';
import { UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RightUserAction = () => (
  <div className="RightUserActionComponent flex gap-3 items-center">
    <Avatars />
    <Inbox />
    <Button variant="ghost" size="icon" className="rounded-full">
      <UserIcon className="size-5" />
    </Button>
  </div>
);

const MemoRightUserAction = memo(RightUserAction);

interface NavbarProps {
  data: Doc<'documents'>;
}

export const Navbar = ({ data }: NavbarProps) => {
  const platform = usePlatform();
  const { editor } = useEditorStore();

  const router = useRouter();
  const createDocument = useMutation(api.documents.create);

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols }).run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onDownloadJson = () => {
    if (!editor) {
      return;
    }
    const blob = new Blob([JSON.stringify(editor.getJSON())], { type: 'application/json' });
    onDownload(blob, `${data.title}.json`); // TODO: Get filename
  };

  const onDownloadHtml = () => {
    if (!editor) {
      return;
    }
    const blob = new Blob([editor.getHTML()], { type: 'text/html' });
    onDownload(blob, `${data.title}.html`); // TODO: Get filename
  };

  // TODO: PDF export functionality not yet implemented
  const onDownloadPdf = () => {
    window.print();
  };

  const onDownloadText = () => {
    if (!editor) {
      return;
    }
    const blob = new Blob([editor.getText()], { type: 'text/plain' });
    onDownload(blob, `${data.title}.txt`); // TODO: Get filename
  };

  // const [currentMenubar, setCurrentMenubar] = useState<string | undefined>(undefined);
  // const onMenubarChange = (menu: string) => {
  //   setCurrentMenubar(menu);
  // };

  const onCreateDocument = () => {
    toast.promise(
      () =>
        createDocument({ title: 'Untitled Document' }).then(id => {
          router.push(`/documents/${id}`);
        }),
      {
        loading: 'Creating...',
        success: 'Created successfully',
        error: 'Creation failed',
      },
    );
  };

  const documentRemoveComplete = () => {
    router.replace('/');
  };

  return (
    <nav className="NavbarComponent flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <div className="w-8 h-8 bg-emerald-400 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-sm">
            W
          </div>
        </Link>
        <div className="flex flex-col gap-y-1">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar
              className="border-none bg-transparent shadow-none h-auto p-0"
            // value={currentMenubar}
            // onValueChange={onMenubarChange}
            >
              <MenubarMenu value="file">
                <MenubarTrigger className="font-normal">File</MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem onClick={onCreateDocument}>
                    <FilePlusIcon className="size-4 mr-2" />
                    New document
                  </MenubarItem>
                  <RenameDialog
                    documentId={data._id}
                    initialTitle={data.title}
                  // onOpenChange={open => !open && setCurrentMenubar(undefined)}
                  >
                    <MenubarItem onSelect={e => e.preventDefault()}>
                      <FilePenIcon className="size-4 mr-2" />
                      Rename...
                    </MenubarItem>
                  </RenameDialog>

                  <MenubarSeparator />

                  {/* <MenubarItem>
                    <SaveIcon className="size-4 mr-2" />
                    保存
                  </MenubarItem> */}
                  <MenubarSub>
                    <MenubarSubTrigger className="font-normal">
                      <FileIcon className="size-4 mr-2" />
                      Save as
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onDownloadJson}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON file
                      </MenubarItem>
                      <MenubarItem onClick={onDownloadHtml}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML file
                      </MenubarItem>
                      <MenubarItem onClick={onDownloadPdf}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF file
                      </MenubarItem>
                      <MenubarItem onClick={onDownloadText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text file
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print
                    <MenubarShortcut>{platform === 'mac' ? '⌘ P' : 'Ctrl P'}</MenubarShortcut>
                  </MenubarItem>
                  <RemoveDialog documentId={data._id} onComplete={documentRemoveComplete}>
                    <MenubarItem onSelect={e => e.preventDefault()}>
                      <Trash2Icon className="size-4 mr-2" />
                      Delete
                    </MenubarItem>
                  </RemoveDialog>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu value="edit">
                <MenubarTrigger className="font-normal">Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className="size-4 mr-2" />
                    Undo
                    <MenubarShortcut>{platform === 'mac' ? '⌘ Z' : 'Ctrl Z'}</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className="size-4 mr-2" />
                    Redo
                    <MenubarShortcut>{platform !== 'mac' ? 'Shift Ctrl Z' : 'Shift ⌘ Z'}</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu value="insert">
                <MenubarTrigger className="font-normal">Insert</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="font-normal">Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>1 x 1</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>2 x 2</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>3 x 3</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>4 x 4</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 5, cols: 5 })}>5 x 5</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu value="format">
                <MenubarTrigger className="font-normal">Format</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="font-normal">
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                        <BoldIcon className="size-4 mr-2" />
                        Bold
                        <MenubarShortcut>{platform === 'mac' ? '⌘ B' : 'Ctrl B'}</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                        <ItalicIcon className="size-4 mr-2" />
                        Italic
                        <MenubarShortcut>{platform === 'mac' ? '⌘ I' : 'Ctrl I'}</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline
                        <MenubarShortcut>{platform === 'mac' ? '⌘ U' : 'Ctrl U'}</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough &nbsp;&nbsp;
                        <MenubarShortcut>{platform === 'mac' ? '⌘ Shift S' : 'Ctrl_Shift S'}</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <EraserIcon className="size-4 mr-2" />
                    Clear text formatting &nbsp;&nbsp;
                    <MenubarShortcut>{platform !== 'mac' ? 'Shift Ctrl Z' : 'Shift ⌘ Z'}</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <MemoRightUserAction />
    </nav>
  );
};
