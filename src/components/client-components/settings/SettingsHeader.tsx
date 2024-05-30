"use client";

import { BackIcon, LogoutIcon } from "@/utils/svgs";
import { useRouter } from "next/navigation";
import React from "react";

const SettingsHeader = ({
  showLogout,
  headerText,
}: {
  headerText: string;
  showLogout: Boolean | undefined;
}) => {
  const navigation = useRouter();
  return (
    <section className="w-full flex justify-between items-center p-4 h-[70px] text-black dark:text-white bg-white dark:bg-customGrey-black border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          className=" rounded-full bg-gray-50  p-2 flex justify-center items-center  active:scale-[.97]"
          onClick={() => navigation.back()}
        >
          {BackIcon()}
        </button>
        <p className="text-[20px] font-bold">{headerText}</p>
      </div>
      {showLogout && (
        <button className="bg-[#FFEEEE] text-[#E75F5F] font-semibold flex gap-1 p-3 py-2 rounded-full items-center active:scale-[.97]">
          <span>Logout</span>
          {LogoutIcon()}
        </button>
      )}
    </section>
  );
};

export default SettingsHeader;
