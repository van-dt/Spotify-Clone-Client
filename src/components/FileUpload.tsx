import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";

const FileUpload = () => {
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
  return (
    <div className="mt-8">
      <label
        htmlFor="image"
        className="relative w-[50%] !h-[100px] flex justify-center items-center flex-col rounded-md border border-dashed border-green-500 cursor-pointer"
      >
        <LuImagePlus size={24} />
        <p>Avatar</p>
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
  );
};

export default FileUpload;
