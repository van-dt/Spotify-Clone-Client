"use client";

import { useRouter } from "next/navigation";
import useLoginModal from "../hooks/useLoginModal";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchSecureApi } from "../utils";
import { CheckSongLike, SongLike } from "../types";
import { ToastContext } from "../contexts/ToastContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: number;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const LoginModal = useLoginModal();
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const songLike = await fetchSecureApi<CheckSongLike>(
          "get",
          `song-like/song/${songId}`
        );
        if (songLike) setIsLiked(songLike.isLiked);
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [notify, songId, user?.id]);

  const likeSong = async () => {
    try {
      const likeData = await fetchSecureApi<SongLike>("post", `song-like`, {
        songId,
      });
      if (likeData) setIsLiked(true);
    } catch (error) {
      notify("error", "Something went wrong!");
    }
  };

  const unlikeSong = async () => {
    try {
      const unlikeData = await fetchSecureApi<SongLike>(
        "delete",
        `song-like/${songId}`
      );
      if (unlikeData) setIsLiked(false);
    } catch (error) {
      notify("error", "Something went wrong!");
    }
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) LoginModal.onOpen();
    if (isLiked) {
      await unlikeSong();
    } else {
      await likeSong();
    }
    router.refresh();
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
