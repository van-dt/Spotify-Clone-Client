"use client";

import { useContext, useEffect, useState } from "react";
import usePlayer from "../hooks/usePlayer";
import { SongData } from "../types";
import { fetchSecureApi } from "../utils";
import { ToastContext } from "../contexts/ToastContext";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const [song, setSong] = useState<SongData | null>(null);

  const [isRandom, setIsRandom] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const { notify } = useContext(ToastContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songData = await fetchSecureApi<SongData>(
          "get",
          `songs/${player.activeId}`
        );
        if (songData) {
          setSong(songData);
        } else {
          setSong(null);
        }
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [notify, player.activeId]);

  return (
    <>
      {song && (
        <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
          <PlayerContent
            key={song.songPath}
            song={song}
            isLoop={isLoop}
            setIsLoop={setIsLoop}
            isRandom={isRandom}
            setIsRandom={setIsRandom}
          />
        </div>
      )}
    </>
  );
};

export default Player;
