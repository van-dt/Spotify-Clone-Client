import { SongData } from "../../../types";
import useOnPlay from "../../../hooks/useOnPlay";
import { FaPlay } from "react-icons/fa6";
import MediaItem from "../../../components/MediaItem";
import LikeButton from "../../../components/LikeButton";

interface SongPlaylistContentProps {
  songs: SongData[];
}

const SongPlaylistContent = ({ songs }: SongPlaylistContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      <div className="mt-1 mb-4 flex gap-x-4">
        <button
          className="transition rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate group-hover:translate-y-0 hover:scale-110"
          onClick={() => onPlay(songs[0].id)}
        >
          <FaPlay className="text-black" />
        </button>
      </div>
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={onPlay} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SongPlaylistContent;
