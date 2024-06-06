"use client";

import useOnPlay from "../hooks/useOnPlay";
import { SongData } from "../types";
import SongItem from "./SongItem";

interface SongContentProps {
  songs: SongData[];
}

const SongContent = ({ songs }: SongContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0)
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={(id: number) => {
            onPlay(id);
          }}
          data={song}
        />
      ))}
    </div>
  );
};

export default SongContent;
