"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { SongData } from "../types";
import MediaItem from "./MediaItem";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { LiaRandomSolid } from "react-icons/lia";
import { SlLoop } from "react-icons/sl";
import Slider from "./Slider";
import usePlayer from "../hooks/usePlayer";
import useSound from "use-sound";
import LikeButton from "./LikeButton";
import PlaySlider from "./PlaySlider";

interface PlayerContentProps {
  song: SongData;
  isLoop: boolean;
  setIsLoop: Dispatch<SetStateAction<boolean>>;
  isRandom: boolean;
  setIsRandom: Dispatch<SetStateAction<boolean>>;
}

const PlayerContent = ({
  song,
  isLoop,
  setIsLoop,
  isRandom,
  setIsRandom,
}: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const intervalRef = useRef<any | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [play, { pause, sound, duration }] = useSound(
    `${apiUrl}${song.songPath}`,
    {
      volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: "mp3",
    }
  );

  const onPlayRandom = () => {
    const max = player.ids.length;
    const index = Math.floor(Math.random() * max);
    const randomSong = player.ids[index];
    player.setId(randomSong);
  };

  const onPlayLoop = () => {
    sound.seek(0);
    play();
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    if (isRandom) {
      onPlayRandom();
      return;
    }
    if (isLoop) {
      onPlayLoop();
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;
    if (isRandom) {
      onPlayRandom();
      return;
    }
    if (isLoop) {
      onPlayLoop();
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) play();
    else pause();
  };

  const toggleMute = () => {
    if (volume === 0) setVolume(1);
    else setVolume(0);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (sound) {
          const currentTime = sound.seek();
          setPosition(Math.round(currentTime));
        }
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, sound]);

  const handleSeek = (value: number) => {
    if (sound) {
      sound.seek(value);
      setPosition(value);
    }
  };

  return (
    <div className="grid grid-cols md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
        <div className="flex md:hidden col-auto w-full justify-end items-center">
          <button
            onClick={handlePlay}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </button>
        </div>
      </div>

      <div>
        <div className="hidden h-[50%] md:flex justify-center items-center w-full max-w-[772px] gap-x-6 mt-1">
          <LiaRandomSolid
            color={isRandom ? "#22c55e" : "#a3a3a3"}
            size={25}
            className="cursor-pointer hover:text-white transition"
            onClick={() => setIsRandom(!isRandom)}
          />
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <button
            onClick={handlePlay}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </button>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <SlLoop
            color={isLoop ? "#22c55e" : "#a3a3a3"}
            size={20}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={() => setIsLoop(!isRandom)}
          />
        </div>

        <div>
          <PlaySlider
            duration={Math.round(duration / 1e3)}
            position={position}
            handleSeek={handleSeek}
          />
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
