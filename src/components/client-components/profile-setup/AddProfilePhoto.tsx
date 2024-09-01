"use client";
import { editProfile } from "@/query/profile/editprofile";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateProfileData } from "@/lib/redux/profile/profileSlice";
import { DEFAULT_PROFILE_IMG } from "@/utils/data";
import { PencilIcon, ProfileIcon, UploadIcon } from "@/utils/svgs";
import { errorToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Loading from "../loader/Loading";

type Props = {
  handleDecrement: () => void;
};

const AddProfilePhoto = ({ handleDecrement }: Props) => {
  const data = useAppSelector((state) => state.profile);
  const [image, setImage] = useState(data.avatar);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSelect = (e: any) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImageFile(imageFile);
    setImage(imageUrl);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const dataQuery = useMutation({
    mutationFn: editProfile,
    onSuccess: (res: any) => {
      dispatch(updateProfileData(res.data.data));
      router.push("/chat");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });

  const handleContinue = async () => {
    if (imageFile) {
      const formdata = new FormData();
      formdata.append("avatar", imageFile || "");
      formdata.append("step", "3");
      dataQuery.mutate(formdata);
    } else {
      router.push("/chat");
    }
  };

  return (
    <Loading isLoading={dataQuery.isPending}>
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
              <CldImage
                width={150}
                height={150}
                src={image || DEFAULT_PROFILE_IMG}
                alt="profile image"
                className="rounded-full aspect-square object-contain"
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
    </Loading>
  );
};

export default AddProfilePhoto;
