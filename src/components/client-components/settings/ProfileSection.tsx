import { EditIcon } from "@/utils/svgs";
import Image from "next/image";
import React from "react";

const ProfileSection = () => {
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
        <p className="text-[20px] font-semibold">Happy Patel</p>
      </div>
      <div className="w-[5%]">
        <button className="text-gray-400 dark:text-gray-50">
          {EditIcon()}
        </button>
      </div>
    </section>
  );
};

export default ProfileSection;
