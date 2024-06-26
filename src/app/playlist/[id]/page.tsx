"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PlaylistData, SongData } from "../../../types";
import { UserContext } from "../../../contexts/UserContext";
import { ToastContext } from "../../../contexts/ToastContext";
import { fetchSecureApi, getSongByTitle } from "../../../utils";
import BannerHeader from "../../../components/BannerHeader";
import Footer from "../../../components/Footer";
import SongPlaylistContent from "../components/SongPlaylistContent";
import Image from "next/image";
import SongPlaylistSearchContent from "../components/SongPlaylistSearchContent";
import { Button } from "@mui/material";

interface PlaylistDetailProps {
  searchParams: {
    title: string;
  };
}

const PlaylistDetail = ({ searchParams }: PlaylistDetailProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [playlist, setPlaylist] = useState<PlaylistData>();
  const [songs, setSongs] = useState<SongData[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  useEffect(() => {
    const fetchData = async () => {
      let songs = await getSongByTitle(searchParams.title);
      if (playlist?.songs) {
        const songPlaylistIds = playlist.songs.map((song) => song.id);
        songs = songs.filter((song) => !songPlaylistIds.includes(song.id));
      }
      setSongs(songs);
    };
    fetchData();
  }, [playlist?.songs, searchParams.title]);

  const addSongToPlaylist = async (songId: number) => {
    try {
      let res = await fetchSecureApi<{ song: SongData }>(
        "post",
        `playlists/add-song`,
        {
          songId,
          playlistId: +id,
        }
      );
      const newSong = res?.song;

      if (newSong && playlist?.songs) {
        const newPlaylist = {
          ...playlist,
          songs: [...playlist.songs, newSong],
        };
        setPlaylist(newPlaylist);
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const playlistData = await fetchSecureApi<PlaylistData>(
          "get",
          `playlists/${id}`
        );
        if (playlistData) setPlaylist(playlistData);
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [id, notify, user?.id]);

  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto relative">
      <BannerHeader
        banner={playlist?.banner ? `${apiUrl}${playlist.banner}` : undefined}
      >
        <div className="p-6 mb-[40vh]">
          <div className="mt-20">
            <div className="flex flex-col md:flex-row items-center gap-x-5">
              <div className="flex gap-x-5 mt-4 md:mt-0 absolute top-[20vh]">
                <div className="relative w-32 h-32 lg:w-44 lg:h-44 shadow-lg">
                  <Image
                    fill
                    alt="Playlist"
                    className="object-cover rounded-lg"
                    src={
                      playlist?.image
                        ? `${apiUrl}${playlist.image}`
                        : "/images/liked.png"
                    }
                  />
                </div>
                <div className="flex flex-col justify-end gap-y-2 mt-4 md:mt-0">
                  <p className="hidden md:block font-semibold text-sm">
                    Playlist
                  </p>
                  <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                    {playlist?.playlistName}
                  </h1>
                  <p className="hidden md:block font-bold text-base">
                    {user?.fullName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BannerHeader>
      {playlist?.songs.length ? (
        <div className="w-full absolute top-[50vh] min-h-[45vh] backdrop-blur-xl bg-gradient-to-t from-neutral-900">
          <SongPlaylistContent songs={playlist.songs} />
          <div className="mx-6 border-t border-neutral-400 mt-5 min-h-[13vh]">
            {isSearch ? (
              <SongPlaylistSearchContent
                id={id}
                songs={songs}
                setIsSearch={setIsSearch}
                addSongToPlaylist={addSongToPlaylist}
              />
            ) : (
              <div className="px-3 mt-6">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsSearch(true)}
                >
                  Find more
                </Button>
              </div>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <div className="w-full absolute top-[50vh] min-h-[45vh] backdrop-blur-xl bg-gradient-to-t from-neutral-900 text-center">
          <p className="font-bold text-2xl h-[32vh] pt-32">
            No songs in this playlist.
          </p>
          <div className="mx-6 border-t border-neutral-400 mt-5 min-h-[13vh]">
            {isSearch ? (
              <SongPlaylistSearchContent
                id={id}
                songs={songs}
                setIsSearch={setIsSearch}
                addSongToPlaylist={addSongToPlaylist}
              />
            ) : (
              <div className="px-3 mt-6">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsSearch(true)}
                >
                  Find more
                </Button>
              </div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;
