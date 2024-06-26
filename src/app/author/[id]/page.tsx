"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/src/contexts/UserContext";
import { ToastContext } from "@/src/contexts/ToastContext";
import { fetchSecureApi } from "@/src/utils";
import { AuthorData } from "@/types";
import BannerHeader from "@/src/components/BannerHeader";
import { BsFillPatchCheckFill } from "react-icons/bs";
import SongAuthorContent from "../components/SongAuthorContent";
import Footer from "@/src/components/Footer";

const AuthorDetail = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [author, setAuthor] = useState<AuthorData>();
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const authorData = await fetchSecureApi<AuthorData>(
          "get",
          `author/${id}`
        );
        if (authorData) setAuthor(authorData);
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [id, notify, user?.id]);

  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto relative">
      <BannerHeader
        banner={author?.banner ? `${apiUrl}${author.banner}` : undefined}
      >
        <div className="p-6 mb-[40vh]">
          <div className="mt-20">
            <div className="flex flex-col md:flex-row items-center gap-x-5">
              <div className="flex flex-col gap-y-2 mt-4 md:mt-0 absolute top-[20vh]">
                <div className="flex gap-x-3">
                  <BsFillPatchCheckFill size={24} color="#3d91f4" />
                  <p className="font-semibold text-sm pt-1">Verified Artist</p>
                </div>
                <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mt-2">
                  {author?.authorName}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </BannerHeader>
      {author?.songs ? (
        <div className="w-full absolute top-[50vh] min-h-[45vh] backdrop-blur-xl bg-gradient-to-t from-neutral-900">
          <SongAuthorContent songs={author.songs} />
          <Footer />
        </div>
      ) : (
        <div className="w-full absolute top-[50vh] min-h-[45vh] backdrop-blur-xl bg-gradient-to-t from-neutral-900 text-center">
          <p className="font-bold text-2xl h-[32vh] pt-32">No songs.</p>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AuthorDetail;
