"use client";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ToastContext } from "../../contexts/ToastContext";
import { fetchSecureApi } from "../../utils";
import { PlaylistData } from "../../types";
import Image from "next/image";
import Header from "../../components/Header";
import PlaylistContent from "./components/PlaylistContent";
import Button from "../../components/Button";
import useCreatePlaylistModal from "../../hooks/useCreatePlaylistModel";
import useLoginModal from "../../hooks/useLoginModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Playlist = () => {
  const createPlaylistModal = useCreatePlaylistModal();
  const loginModal = useLoginModal();
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  const onClick = () => {
    if (!user) {
      return loginModal.onOpen();
    }
    return createPlaylistModal.onOpen();
  };

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const playlistData = await fetchSecureApi<PlaylistData[]>(
          "get",
          `playlists`
        );
        if (playlistData) setPlaylists(playlistData);
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [notify, user?.id]);

  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <ToastContainer />
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative w-32 h-32 lg:w-44 lg:h-44">
              <Image
                fill
                alt="Playlist"
                className="object-cover"
                src="/images/liked.png"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                Your Playlist
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <Button className="w-40" onClick={onClick}>
          Create Playlist
        </Button>
        <div className="mt-8">
          <PlaylistContent playlists={playlists} />
        </div>
      </div>
    </div>
  );
};

export default Playlist;
