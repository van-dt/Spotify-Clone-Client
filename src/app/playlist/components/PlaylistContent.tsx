"use client";

import { useRouter } from "next/navigation";
import { PlaylistData } from "../../../types";
import PlaylistItem from "../../../components/PlaylistItem";

interface PlaylistContentProps {
  playlists: PlaylistData[];
}

const PlaylistContent = ({ playlists }: PlaylistContentProps) => {
  const router = useRouter();

  if (playlists.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Playlist songs.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          onClick={(id: number) => {
            router.push(`/playlist/${id}`);
          }}
          data={playlist}
        />
      ))}
    </div>
  );
};

export default PlaylistContent;
