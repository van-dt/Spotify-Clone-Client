"use client";

import { Chip } from "@mui/material";
import MediaItem from "../../../components/MediaItem";
import useOnPlay from "../../../hooks/useOnPlay";
import { SongData } from "../../../types";

interface SearchPlaylistContentProps {
  songs: SongData[];
  addSongToPlaylist: (songId: number) => Promise<void>;
}

const SearchPlaylistContent = ({
  songs,
  addSongToPlaylist,
}: SearchPlaylistContentProps) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full mt-8">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={onPlay} data={song} />
          </div>
          <div className="pt-2 font-bold">
            <Chip
              label="Add"
              variant="outlined"
              size="medium"
              color="secondary"
              onClick={() => addSongToPlaylist(song.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPlaylistContent;
