"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { ToastContext } from "../contexts/ToastContext";
import { LuImagePlus } from "react-icons/lu";
import Image from "next/image";
import { fetchSecureApi } from "../utils";
import { PlaylistData, UploadResponse } from "../types";
import useCreatePlaylistModal from "../hooks/useCreatePlaylistModel";

const CreatePlaylistModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useCreatePlaylistModal();
  const { notify } = useContext(ToastContext);

  const [img, setImg] = useState<string>("");
  const [fileImg, setFileImg] = useState<File>();

  const [banner, setBanner] = useState<string>("");
  const [fileBanner, setFileBanner] = useState<File>();

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

  const handleChooseBanner = (e: ChangeEvent<HTMLInputElement>) => {
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
        setBanner(result as string);
      };
      reader.readAsDataURL(files[0]);

      setFileBanner(file);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      playlistName: "",
      image: null,
      banner: null,
    },
  });

  const resetData = () => {
    setImg("");
    setFileImg(undefined);
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      resetData();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = fileImg;
      if (!imageFile) {
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

      const bannerFile = fileBanner;
      if (!bannerFile) {
        notify("error", "Missing fields");
        return;
      }

      const formBannerData = new FormData();
      formBannerData.append("image", bannerFile);
      const uploadBannerData = await fetchSecureApi<UploadResponse>(
        "post",
        "upload/image",
        formBannerData
      );
      let bannerPath = "";
      if (uploadBannerData) {
        bannerPath = `/upload/image/${uploadBannerData.filename}`;
      }

      const playlistData = await fetchSecureApi<PlaylistData>(
        "post",
        "playlists",
        {
          playlistName: values.playlistName,
          image: imagePath,
          banner: bannerPath,
        }
      );

      if (playlistData?.id) {
        setIsLoading(false);
        notify("success", "Playlist created!");
        setTimeout(() => {
          location.reload();
        }, 1500);
        reset();
      }
    } catch (error) {
      notify("error", "Something went wrong!");
    } finally {
      setIsLoading(false);
      reset();
      resetData();
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
      title="Create your playlist"
      description="Playlist according to your preferences"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="playlistName"
          disabled={isLoading}
          {...register("playlistName", { required: "Name is required." })}
          placeholder="Playlist name"
        />
        {errors?.title && (
          <p className="text-red-500 text-sm">* Title is required.</p>
        )}

        <div>
          <p className="mb-2">Playlist Image</p>
          <div className="mt-1 flex">
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

        <div>
          <p className="mb-2">Playlist Banner</p>
          <div className="mt-1 flex items-center justify-center">
            <label
              htmlFor="banner"
              className="relative w-full !h-[190px] flex justify-center items-center flex-col rounded-md border border-dashed border-green-500 cursor-pointer"
            >
              <LuImagePlus size={24} />
              <p>Select a banner file</p>
              {banner && (
                <Image
                  src={banner}
                  alt="file"
                  fill
                  className="absolute top-0 w-full h-full object-cover rounded-md"
                />
              )}
            </label>
            <input
              type="file"
              hidden
              id="banner"
              onChange={handleChooseBanner}
            />
          </div>
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default CreatePlaylistModel;
