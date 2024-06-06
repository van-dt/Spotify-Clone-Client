"use client";

import { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import UploadModal from "../components/UploadModal";

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
    </>
  );
};

export default ModalProvider;
