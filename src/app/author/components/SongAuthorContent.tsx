"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { Chip } from "@mui/material";
import { SongData } from "../../../types";
import { UserContext } from "../../../contexts/UserContext";
import useOnPlay from "../../../hooks/useOnPlay";
import MediaItem from "../../../components/MediaItem";
import LikeButton from "../../../components/LikeButton";

interface SongAuthorContentProps {
  songs: SongData[];
}

const SongAuthorContent = ({ songs }: SongAuthorContentProps) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      <div className="mt-1 mb-4 flex gap-x-4">
        <button
          className="transition rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate group-hover:translate-y-0 hover:scale-110"
          onClick={() => onPlay(songs[0].id)}
        >
          <FaPlay className="text-black" />
        </button>
        <div className="pt-2 font-bold">
          <Chip
            label="Follow"
            variant="outlined"
            size="medium"
            color="secondary"
            onClick={() => {}}
          />
        </div>
      </div>
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={onPlay} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SongAuthorContent;
