"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import { useContext, useEffect, useState } from "react";
import { SongData } from "../types";
import { ToastContext } from "../contexts/ToastContext";
import { fetchSecureApi } from "../utils";
import PageContent from "../components/PageContent";

export const revalidate = 0;

export default function Home() {
  const [songs, setSongs] = useState<SongData[]>([]);
  const { notify } = useContext(ToastContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songData = await fetchSecureApi<SongData[]>("get", "songs");
        if (songData) {
          setSongs(songData);
        }
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [notify]);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto mx-2 lg:mx-0">
      <ToastContainer theme="dark" />
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
