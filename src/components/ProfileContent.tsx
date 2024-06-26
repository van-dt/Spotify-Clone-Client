"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TexArea";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";

const ProfileContent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [router, user]);

  return (
    <div className="w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-white">
      <main className="w-full py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-4 sm:max-w-xl sm:rounded-lg">
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <div className="w-40 h-40 relative">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt="Avatar"
                      fill
                      className="object-cover w-full h-full rounded-full ring-2 ring-white"
                    />
                  ) : (
                    <FaUserAlt />
                  )}
                </div>

                <div className="flex flex-col space-y-5 sm:ml-8">
                  <Button>Change picture</Button>
                  <Button className="bg-white"> Delete picture</Button>
                </div>
              </div>

              <div className="items-center mt-8 sm:mt-14 text-white">
                <div className="mb-2 sm:mb-6">
                  <Input
                    id="fullName"
                    disabled={isLoading}
                    placeholder="Full Name"
                  />
                </div>

                <div className="mb-2 sm:mb-6">
                  <TextArea
                    id="bio"
                    disabled={isLoading}
                    placeholder="Bio"
                    cols={4}
                  />
                </div>

                <div className="flex justify-end">
                  <Button>Save</Button>
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
