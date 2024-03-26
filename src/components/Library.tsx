"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import useLoginModal from "../hooks/useLoginModal";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUploadModal from "../hooks/useUploadModal";

const Library = () => {
  const loginModal = useLoginModal();
  const uploadModal = useUploadModal();
  const { user } = useContext(UserContext);

  const onClick = () => {
    if (!user) {
      return loginModal.onOpen();
    }
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex fex-col gap-y-2 mt-4 px-3">List of song!</div>
    </div>
  );
};

export default Library;
