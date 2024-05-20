import { useContext } from "react";
import { SongData } from "../types";
import useLoginModal from "./useLoginModal";
import usePlayer from "./usePlayer";
import { UserContext } from "../contexts/UserContext";

const useOnPlay = (songs: SongData[]) => {
  const player = usePlayer();
  const loginModel = useLoginModal();

  const { user } = useContext(UserContext);

  const onPlay = (id: number) => {
    if (!user) return loginModel.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
