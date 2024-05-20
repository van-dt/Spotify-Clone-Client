"use client";

import Link from "next/link";
import Modal from "./Modal";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FormEventHandler, useContext, useState } from "react";
import { validateEmail } from "../utils/text";
import useSignUpModal from "../hooks/useSignUpModal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SignUpData } from "../types";
import useLoginModal from "../hooks/useLoginModal";
import { ToastContext } from "../contexts/ToastContext";
import axios from "axios";
import { setCookie } from "cookies-next";
import { UserContext } from "../contexts/UserContext";

const SignUpModal = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isEmail, setIsEmail] = useState(false);
  const [hide, setHide] = useState(true);
  const { notify } = useContext(ToastContext);
  const { getUser } = useContext(UserContext);
  const { isOpen, onClose } = useSignUpModal();
  const { onOpen } = useLoginModal();

  const [userSignUpData, setUserSignUpData] = useState<SignUpData>({
    fullName: "",
    email: "",
    password: "",
    avatarUrl: undefined,
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isEmail) {
      notify("error", "Email is invalid");
    }
    try {
      const res = await axios.post(`${apiUrl}/auth/sign-up`, userSignUpData);
      const loginData = res.data.data;
      const token = loginData.token;
      setCookie("token", token);
      getUser();
      notify("success", "Register successful");
      onClose();
    } catch (error) {
      console.error("Register error", error);
      notify("error", "Something went wrong!");
    }
    setUserSignUpData({
      fullName: "",
      email: "",
      password: "",
      avatarUrl: undefined,
    });
  };

  return (
    <Modal
      title="Sign up"
      description="Sign up to start listening"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form className="mt-6 space-y-6 text-white" onSubmit={(e) => onSubmit(e)}>
        <input type="hidden" name="remember" value="true" />
        <div className="relative">
          <label htmlFor="full-name" className="text-sm font-bol tracking-wide">
            Full Name
          </label>
          <input
            id="full-name"
            className="mt-2 w-full text-base px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-green-500 text-neutral-900 rounded-md"
            type=""
            placeholder="Enter your full name"
            onChange={(e) => {
              setUserSignUpData({
                ...userSignUpData,
                fullName: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-8 content-center relative">
          {isEmail && (
            <div className="absolute right-0 bottom-0 mb-2 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          )}
          {!isEmail && userSignUpData.email && (
            <div className="absolute right-0 bottom-0 mb-2 mr-2">
              <IoIosCloseCircleOutline size={24} className="text-red-500" />
            </div>
          )}
          <label htmlFor="email" className="text-sm font-bol tracking-wide">
            Email
          </label>
          <input
            id="email"
            className="mt-2 w-full text-base px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-green-500 text-neutral-900 rounded-md"
            type=""
            placeholder="mail@gmail.com"
            onChange={(e) => {
              const newEmail = e.target.value;
              setIsEmail(validateEmail(newEmail));
              setUserSignUpData({
                ...userSignUpData,
                email: newEmail,
              });
            }}
          />
        </div>
        <div className="mt-8 content-center relative">
          {hide ? (
            <button
              className="absolute right-0 bottom-0 mb-2 mr-3 cursor-pointer"
              onClick={() => setHide(false)}
            >
              <FaRegEyeSlash size={22} className="text-green-500" />
            </button>
          ) : (
            <button
              className="absolute right-0 bottom-0 mb-2 mr-3 cursor-pointer"
              onClick={() => setHide(true)}
            >
              <FaRegEye size={22} className="text-green-500" />
            </button>
          )}

          <label htmlFor="password" className="text-sm font-bold tracking-wide">
            Password
          </label>
          <input
            id="password"
            className="mt-2 w-full text-base px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-green-500 text-neutral-900 rounded-md"
            type={hide ? "password" : "text"}
            placeholder="Enter your password"
            onChange={(e) => {
              setUserSignUpData({
                ...userSignUpData,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className="!mt-10">
          <button
            type="submit"
            className="w-full flex justify-center bg-green-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            SignUp
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>{`Already have an account?`}</span>
          <Link
            href="#"
            className="text-green-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onOpen();
            }}
          >
            Log in here
          </Link>
        </p>
      </form>
    </Modal>
  );
};

export default SignUpModal;
