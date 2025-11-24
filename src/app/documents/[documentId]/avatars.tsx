import { Separator } from '@/components/ui/separator';

/* eslint-disable @next/next/no-img-element */
const AVATAR_SIZE = 36;

interface AvatarProps {
  src: string;
  name: string;
}

const AvatarStack = () => {
  // Liveblocks removed - no collaborative avatars
  // Show single anonymous user
  return (
    <>
      <div className="AvatarStackComponent flex items-center">
        <div className="relative ml-2">
          <Avatar src="" name="You" />
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};

export const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
      className="AvatarComponent group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover rounded-full" />
      ) : (
        <div className="size-full flex items-center justify-center text-white font-semibold">
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
