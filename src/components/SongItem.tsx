"use client";

import Image from "next/image";
import { SongData } from "../types";
import PlayButton from "./PlayButton";

interface SongItemProps {
  data: SongData;
  onClick: (id: number) => void;
}

const SongItem = ({ data, onClick }: SongItemProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <button
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          src={
            data.imagePath ? `${apiUrl}${data.imagePath}` : "/images/liked.png"
          }
          alt="Song image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1 text-left">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {data.author?.authorName}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </button>
  );
};

export default SongItem;
