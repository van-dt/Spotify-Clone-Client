"use client";

import { useRouter } from "next/navigation";
import { PlaylistData } from "../../../types";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";

interface PlaylistContentProps {
  playlists: PlaylistData[];
}

const PlaylistContent = ({ playlists }: PlaylistContentProps) => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  if (playlists.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Playlist songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">{playlist.playlistName}</div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistContent;
