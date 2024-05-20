"use client";

import { usePathname } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { SongData } from "../types";
import { fetchSecureApi } from "../utils";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import usePlayer from "../hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  const [userSongs, setUserSongs] = useState<SongData[]>([]);
  const { notify } = useContext(ToastContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSongsData = await fetchSecureApi<SongData[]>(
          "get",
          "songs/users"
        );
        if (userSongsData) {
          setUserSongs(userSongsData);
        }
      } catch (error) {
        notify("error", "Something went wrong!");
      }
    };
    fetchData();
  }, [notify, user]);

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={userSongs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2 mr-1">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
