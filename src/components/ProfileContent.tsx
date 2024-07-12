"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ToastContext } from "../contexts/ToastContext";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TexArea";
import Image from "next/image";
import { fetchSecureApi } from "../utils";
import { UploadResponse, User } from "../types";

const ProfileContent = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const { user, getUser } = useContext(UserContext);
  const { notify } = useContext(ToastContext);

  const [img, setImg] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();

  const [userData, setUserData] = useState({
    fullName: user?.fullName ?? "",
    bio: user?.bio ?? "",
    avatarUrl: user?.avatarUrl ? `${apiUrl}${user.avatarUrl}` : "",
  });

  const updateUser = async () => {
    setIsLoading(true);

    const imageFile = fileImg;

    let imagePath = user?.avatarUrl;
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const uploadImageData = await fetchSecureApi<UploadResponse>(
        "post",
        "upload/image",
        formData
      );
      if (uploadImageData) {
        imagePath = `/upload/image/${uploadImageData.filename}`;
      }
    }

    try {
      const res = await fetchSecureApi<User>("put", `users/${user?.id}`, {
        ...userData,
        avatarUrl: imagePath,
      });
      console.log(res);

      if (res?.id) {
        console.log("ccc");
        notify("success", "Update profile successful");
        getUser();
      }
    } catch (error) {
      console.error("Login error", error);
      notify("error", "Something went wrong!");
    }

    setIsLoading(false);
  };

  const handleChooseImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file.type.indexOf("image/") === -1) {
        alert("File format not supported");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImg(result as string);
      };
      reader.readAsDataURL(files[0]);

      setFileImg(file);
    }
  };

  useEffect(() => {
    if (user?.avatarUrl) {
      setImg(`${apiUrl}${user.avatarUrl}`);
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-white">
      <main className="w-full py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-4 sm:max-w-xl sm:rounded-lg">
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <div className="w-40 h-40 relative">
                  <Image
                    src={
                      img ||
                      "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
                    }
                    alt="Avatar"
                    fill
                    className="object-cover w-full h-full rounded-full ring-2 ring-white"
                  />
                </div>

                <div className="flex flex-col space-y-5 sm:ml-8">
                  <div>
                    <input
                      type="file"
                      hidden
                      id="image"
                      onChange={handleChooseImg}
                    />
                    <label
                      htmlFor="image"
                      className="w-full rounded-full bg-green-500 border border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition cursor-pointer"
                    >
                      Change picture
                    </label>
                  </div>
                  <Button
                    className="bg-white"
                    onClick={() => setUserData({ ...userData, avatarUrl: "" })}
                  >
                    Delete picture
                  </Button>
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-14 text-white">
                <div className="mb-2 sm:mb-6">
                  <Input
                    id="fullName"
                    disabled={isLoading}
                    placeholder="Full Name"
                    value={userData.fullName}
                    onChange={(e) =>
                      setUserData({ ...userData, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2 sm:mb-6">
                  <TextArea
                    id="bio"
                    disabled={isLoading}
                    placeholder="Bio"
                    cols={4}
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={updateUser}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileContent;
