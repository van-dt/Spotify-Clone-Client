"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import useLoginModal from "../hooks/useLoginModal";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUploadModal from "../hooks/useUploadModal";
import { SongData } from "../types";
import MediaItem from "./MediaItem";
import useOnPlay from "../hooks/useOnPlay";
import { Button } from "@mui/material";
import { FaPlay } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface LibraryProps {
  songs: SongData[];
}

const Library = ({ songs }: LibraryProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const uploadModal = useUploadModal();
  const { user } = useContext(UserContext);

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return loginModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="px-3 mt-3">
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<FaPlay />}
          onClick={() => router.push("/playlist")}
        >
          Playlist
        </Button>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs?.length ? (
          <>
            {songs.map((song) => (
              <MediaItem
                key={song.id}
                onClick={(id: number) => onPlay(id)}
                data={song}
              />
            ))}
          </>
        ) : (
          <div>No Song in library</div>
        )}
      </div>
    </div>
  );
};

export default Library;
