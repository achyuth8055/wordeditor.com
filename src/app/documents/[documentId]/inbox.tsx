import { BellIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const InboxMenu = () => {
  // Liveblocks removed - no notifications
  const inboxNotifications: any[] = [];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="InboxMenuComponent_Trigger">
          <Button variant="ghost" className="relative focus-visible:ring-0" size="icon">
            <BellIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">No notifications</div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

export const Inbox = () => {
  return <InboxMenu />;
};
