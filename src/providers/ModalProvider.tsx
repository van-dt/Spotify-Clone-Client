"use client";

import { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SignUpModal />
      <LoginModal />
    </>
  );
};

export default ModalProvider;
