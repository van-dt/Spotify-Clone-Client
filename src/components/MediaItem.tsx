"use client";

import Image from "next/image";
import { SongData } from "../types";

interface MediaItemProps {
  data: SongData;
  onClick?: (id: number) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = () => {
    if (onClick) return onClick(data.id);
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={
            data.imagePath ? `${apiUrl}${data.imagePath}` : "/images/liked.png"
          }
          alt="Song image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden text-left">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">
          {data.author?.authorName}
        </p>
      </div>
    </button>
  );
};

export default MediaItem;
