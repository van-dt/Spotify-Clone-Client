"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import ListItem from "../../components/ListItem";
import { useContext, useEffect, useState } from "react";
import { AuthorData, CategoryData, SongData } from "../../types";
import { ToastContext } from "../../contexts/ToastContext";
import { fetchSecureApi } from "../../utils";
import SongContent from "../../components/SongContent";
import { UserContext } from "../../contexts/UserContext";
import AuthorContent from "../../components/AuthorContent";
import Footer from "../../components/Footer";
import CategoryContent from "../../components/CategoryContent";

export const revalidate = 0;

export default function Home() {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [authors, setAuthors] = useState<AuthorData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const { notify } = useContext(ToastContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songData = await fetchSecureApi<SongData[]>("get", "songs");
        if (songData) {
          setSongs(songData);
        }
        const authorData = await fetchSecureApi<AuthorData[]>("get", "author");
        if (authorData) {
          setAuthors(authorData);
        }
        const categoryData = await fetchSecureApi<CategoryData[]>(
          "get",
          "categories"
        );
        if (categoryData) {
          setCategories(categoryData);
        }
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [notify, user]);

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
          <SongContent songs={songs} />
        </div>
      </div>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Popular artists</h1>
        </div>
        <div>
          <AuthorContent authors={authors} />
        </div>
      </div>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Listen by categories
          </h1>
        </div>
        <div>
          <CategoryContent categories={categories} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
