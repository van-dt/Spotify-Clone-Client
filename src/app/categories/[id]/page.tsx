"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CategoryData } from "@/types";
import { UserContext } from "@/src/contexts/UserContext";
import { ToastContext } from "@/src/contexts/ToastContext";
import { fetchSecureApi } from "@/src/utils";
import Header from "@/src/components/Header";
import Image from "next/image";
import Footer from "@/src/components/Footer";
import SongContent from "@/src/components/SongContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryDetail = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [category, setCategory] = useState<CategoryData>();
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const categoryData = await fetchSecureApi<CategoryData>(
          "get",
          `categories/${id}`
        );
        if (categoryData) setCategory(categoryData);
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [id, notify, user?.id]);

  return (
    <div className="bg-neutral-900  rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <ToastContainer />
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative w-32 h-32 lg:w-44 lg:h-44">
              <Image
                fill
                alt="Playlist"
                className="object-cover rounded-md"
                src={
                  category?.image
                    ? `${apiUrl}${category.image}`
                    : "/images/liked.png"
                }
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                {category?.categoryName}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      {category?.songs ? (
        <div className="mt-8 mb-7 px-6">
          <div className="mb-10">
            <SongContent songs={category.songs} />
          </div>
          <Footer />
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
          No songs.
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
