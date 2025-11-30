import { Separator } from '@/components/ui/separator';
import { useOthers, useSelf } from '@liveblocks/react/suspense';

/* eslint-disable @next/next/no-img-element */
const AVATAR_SIZE = 36;
const MAX_SHOWN_USERS = 3;

interface AvatarProps {
  src: string;
  name: string;
  color?: string;
}

const AvatarStack = () => {
  const others = useOthers();
  const self = useSelf();
  
  const allUsers = [
    ...(self ? [{ id: self.id, info: self.info, connectionId: self.connectionId }] : []),
    ...others.map(other => ({ id: other.id, info: other.info, connectionId: other.connectionId }))
  ];

  const shownUsers = allUsers.slice(0, MAX_SHOWN_USERS);
  const remainingUsers = allUsers.length - MAX_SHOWN_USERS;

  return (
    <>
      <div className="AvatarStackComponent flex items-center">
        {shownUsers.map((user, index) => (
          <div key={user.connectionId} className="relative ml-2" style={{ zIndex: shownUsers.length - index }}>
            <Avatar 
              src={user.info?.avatar || ''} 
              name={user.info?.name || 'Anonymous'} 
              color={user.info?.color}
            />
          </div>
        ))}
        {remainingUsers > 0 && (
          <div className="relative ml-2">
            <div
              style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
              }}
              className="flex items-center justify-center rounded-full bg-gray-600 text-white text-xs font-semibold border-4 border-white"
            >
              +{remainingUsers}
            </div>
          </div>
        )}
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

export const Avatar = ({ src, name, color }: AvatarProps) => {
  return (
    <div
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        backgroundColor: color || '#9ca3af',
      }}
      className="AvatarComponent group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full"
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover rounded-full" />
      ) : (
        <div className="size-full flex items-center justify-center text-white font-semibold text-sm">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-1.5 text-white text-xs rounded-sm mt-2 z-10 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>
    </div>
  );
};

export const Avatars = () => {
  return <AvatarStack />;
};
