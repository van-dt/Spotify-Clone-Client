"use client";

import SearchPlaylistContent from "./SearchPlaylistContent";
import SearchPlaylistInput from "./SearchPlaylistInput";
import { SongData } from "../../../types";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";

interface SongPlaylistSearchContentProps {
  id: string;
  songs: SongData[];
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  addSongToPlaylist: (songId: number) => Promise<void>;
}

const SongPlaylistSearchContent = ({
  id,
  songs,
  setIsSearch,
  addSongToPlaylist,
}: SongPlaylistSearchContentProps) => {
  return (
    <div className="min-h-[20vh] py-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{`Let's find something for your playlist`}</h1>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setIsSearch(false)}
        >
          <GrClose className="text-xl" />
        </Button>
      </div>
      <div className="mt-4">
        <SearchPlaylistInput id={id} />
      </div>
      <SearchPlaylistContent
        songs={songs}
        addSongToPlaylist={addSongToPlaylist}
      />
    </div>
  );
};

export default SongPlaylistSearchContent;
