"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useLoginModal from "../hooks/useLoginModal";
import useSignUpModal from "../hooks/useSignUpModal";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaUserAlt } from "react-icons/fa";
import { setCookie } from "cookies-next";
import Image from "next/image";

interface BannerHeaderProps {
  children: React.ReactNode;
  className?: string;
  banner?: string;
}

const BannerHeader = ({ children, className, banner }: BannerHeaderProps) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const loginModal = useLoginModal();
  const signUpModal = useSignUpModal();

  const { user, getUser } = useContext(UserContext);

  const handleLogout = () => {
    setCookie("token", "");
    getUser();
    window.location.reload();
  };

  return (
    <div
      className={twMerge(
        `h-fit ${banner ?? "bg-gradient-to-b from-emerald-800"} p-6 relative`,
        className
      )}
    >
      {banner && (
        <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
          <Image
            src={banner}
            alt="banner"
            fill
            className="object-cover object-top opacity-70"
          />
        </div>
      )}
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center absolute top-6 left-6">
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>

          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4 absolute top-6 right-6">
          {user ? (
            <>
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => {
                  router.push("/profile");
                }}
                className="w-16 h-12 relative bg-white"
              >
                {user.avatarUrl ? (
                  <Image
                    src={`${apiUrl}${user.avatarUrl}`}
                    alt="Avatar"
                    fill
                    className="w-full h-full object-cover absolute rounded-full"
                  />
                ) : (
                  <FaUserAlt />
                )}
              </Button>
            </>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={signUpModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white px-6 py-2"
                  onClick={loginModal.onOpen}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default BannerHeader;
