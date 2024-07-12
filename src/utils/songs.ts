import { SongData } from "../types";
import { fetchPublicApi } from "./api";

export const getSongByTitle = async (title: string) => {
  const songs = await fetchPublicApi<SongData[]>("get", `songs?title=${title}`);
  return songs ?? [];
};
