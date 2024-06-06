"use client";

import { useContext, useEffect, useState } from "react";
import { SongData } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import { ToastContext } from "../../contexts/ToastContext";
import { fetchSecureApi } from "../../utils";
import Header from "../../components/Header";
import Image from "next/image";
import LikedContent from "./components/LikedContent";

const Liked = () => {
  const [songs, setSongs] = useState<SongData[]>([]);
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const likedSongs = await fetchSecureApi<SongData[]>(
          "get",
          `songs/liked`
        );
        if (likedSongs) setSongs(likedSongs);
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [notify, user?.id]);

  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
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
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
