"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useUploadModal from "../hooks/useUploadModal";
import Modal from "./Modal";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { ToastContext } from "../contexts/ToastContext";
import { LuImagePlus } from "react-icons/lu";
import Image from "next/image";
import { fetchSecureApi } from "../utils";
import { SongData, UploadResponse } from "../types";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useUploadModal();
  const { notify } = useContext(ToastContext);

  const [img, setImg] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      song: null,
      image: null,
      author: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log("values", values);

    try {
      setIsLoading(true);

      const imageFile = fileImg;
      const songFile = values.song?.[0];
      if (!imageFile || !songFile) {
        notify("error", "Missing fields");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);
      const uploadImageData = await fetchSecureApi<UploadResponse>(
        "post",
        "upload/image",
        formData
      );
      let imagePath = "";
      if (uploadImageData) {
        imagePath = `/upload/image/${uploadImageData.filename}`;
      }

      const songFormData = new FormData();
      songFormData.append("song", songFile);
      const uploadSongData = await fetchSecureApi<UploadResponse>(
        "post",
        "upload/song",
        songFormData
      );
      let songPath = "";
      if (uploadSongData) {
        songPath = `/upload/song/${uploadSongData.filename}`;
      } else {
        notify("error", "Song file is not uploaded!");
        return;
      }

      const songData = await fetchSecureApi<SongData>("post", "songs", {
        title: values.title,
        author: values.author,
        songPath,
        imagePath,
      });

      if (songData?.id) {
        router.refresh();
        setIsLoading(false);
        notify("success", "Song created!");
        reset();
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    } finally {
      setIsLoading(false);
      reset();
      onClose();
    }
  };

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  return (
    <Modal
      title="Add a song"
      description="Upload a mp3 file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: "Title is required." })}
          placeholder="Song title"
        />
        {errors?.title && (
          <p className="text-red-500 text-sm">* Title is required.</p>
        )}

        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: "Author is required." })}
          placeholder="Song author"
        />
        {errors?.author && (
          <p className="text-red-500 text-sm">* Author is required.</p>
        )}

        <div>
          <div className="pb-1 mb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song")}
            className="cursor-pointer"
          />
        </div>
        <div>
          <div className="mt-1 flex items-center justify-center">
            <label
              htmlFor="image"
              className="relative w-[50%] !h-[190px] flex justify-center items-center flex-col rounded-md border border-dashed border-green-500 cursor-pointer"
            >
              <LuImagePlus size={24} />
              <p>Select a image file</p>
              {img && (
                <Image
                  src={img}
                  alt="file"
                  fill
                  className="absolute top-0 w-full h-full object-cover rounded-md"
                />
              )}
            </label>
            <input type="file" hidden id="image" onChange={handleChooseImg} />
          </div>
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
