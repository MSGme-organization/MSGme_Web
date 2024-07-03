import { useAppSelector } from "@/redux/hooks";
import { EditIcon } from "@/utils/svgs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileSection = () => {
  const router = useRouter();
  const data = useAppSelector((state) => state.profile);

  return (
    <section className="w-full flex justify-between items-center p-4 h-[100px] text-black dark:text-white bg-white dark:bg-customGrey-black border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 w-[95%]">
        <Image
          src="https://picsum.photos/200/300"
          alt="user"
          width={60}
          height={60}
          className="rounded-full aspect-square"
        />
        <p className="text-[20px] font-semibold">{data.username}</p>
      </div>
      <div className="w-[5%]">
        <button
          className="text-gray-400 dark:text-gray-50"
          onClick={() => router.push("/chat/settings/edit-profile")}
        >
          {EditIcon()}
        </button>
      </div>
    </section>
  );
};

export default ProfileSection;
