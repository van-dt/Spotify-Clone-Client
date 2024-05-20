import { SongData } from "../types";
import { fetchSecureApi } from "./api";

export const getSongByTitle = async (title: string) => {
  const songs = await fetchSecureApi<SongData[]>("get", `songs?title=${title}`);
  return songs ?? [];
};
