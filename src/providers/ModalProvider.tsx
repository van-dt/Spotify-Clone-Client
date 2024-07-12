"use client";

import { useEffect, useState } from "react";
import LoginModal from "@/src/components/LoginModal";
import SignUpModal from "@/src/components/SignUpModal";
import UploadModal from "@/src/components/UploadModal";
import SubscribeModel from "@/src/components/SubscribeModel";
import CreatePlaylistModel from "../components/CreatePlaylistModel";
import UpdatePlaylistModel from "../components/UpdatePlaylistModel";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return <></>;
  }

  return (
    <>
      <SignUpModal />
      <LoginModal />
      <UploadModal />
      <SubscribeModel />
      <CreatePlaylistModel />
      <UpdatePlaylistModel />
    </>
  );
};

export default ModalProvider;
