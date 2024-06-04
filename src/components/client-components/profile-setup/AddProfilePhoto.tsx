"use client";
import { PencilIcon, ProfileIcon, UploadIcon } from "@/utils/svgs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
type Props = {
  handleDecrement: () => void;
};

const AddProfilePhoto = ({ handleDecrement }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(null as any);
  const router = useRouter();
  const handleSelect = (e: any) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
  };
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleContinue = () => {
    router.push("/chat");
  };

  return (
    <div className="mt-14">
      <div className="text-center flex flex-col items-center justify-center">
        <p className="font-bold text-[28px] w-[100%] max-w-[284px]">
          Add Profile Photo
        </p>
        <p className="font-regular text-[14px] w-[100%] max-w-[284px]">
          By upload a profile photo will increasing the trust for the
          participant
        </p>
      </div>

      <div className="flex w-[100%]  justify-center items-center mt-3">
        <div
          className="flex relative text-customGrey justify-center items-center cursor-pointer max-w-[150px] rounded-full h-[150px] w-[100%]"
          onClick={handleClick}
        >
          <input ref={inputRef} onChange={handleSelect} type="file" hidden />
          {image ? (
            <Image
              src={image}
              alt="profile"
              className="rounded-full"
              width={150}
              height={150}
            />
          ) : (
            ProfileIcon()
          )}
          <div className=" absolute w-[35px] h-[35px] right-2 bottom-2">
            {image ? PencilIcon() : UploadIcon()}
          </div>
        </div>
      </div>

      <div className="mb-4 mt-8 flex justify-center items-center gap-6">
        <button
          className="text-nowrap rounded-[8px] bg-customGrey-light dark:bg-customGrey-dark text-textColor dark:text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%] max-w-[249px]"
          onClick={handleDecrement}
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          type="submit"
          className="text-nowrap rounded-[8px] bg-primary text-textColor-dark py-4 px-6 font-bold text-[16px] w-[100%] max-w-[249px]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AddProfilePhoto;
