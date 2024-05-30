"use client";

import { AvatarIcon, BarIcon, MoonIcon, PlusIcon, SunIcon } from "@/utils/svgs";
import { useThemeMode } from "flowbite-react";
import Image from "next/image";
import React from "react";

const ChatListNavBar = ({
  handleNavigation,
  handleOpen,
}: {
  handleNavigation: (path: string) => void;
  handleOpen: () => void;
}) => {
  const theme = useThemeMode();
  const Icons = [
    {
      path: theme.computedMode === "light" ? SunIcon : MoonIcon,
      alt: "plus",
      classes: "bg-transparent text-black dark:text-white",
      fn: theme.toggleMode,
    },
    {
      path: PlusIcon,
      alt: "plus",
      classes: "bg-primary text-white",
      fn: () => console.log("plus"),
    },
    {
      path: AvatarIcon,
      alt: "avtar",
      classes: "bg-primary text-white",
      fn: () => handleNavigation("/chat/settings"),
    },
    {
      path: BarIcon,
      alt: "bar",
      classes: "bg-gray-200 hidden md:block dark:bg-customGrey-blackBg",
      fn: handleOpen,
    },
  ];
  return (
    <>
      <div className="w-full flex justify-between items-center p-4 h-[70px]">
        <div onClick={() => handleNavigation("/chat")}>
          <Image src="/Logo.png" alt="logo" width={95} height={95} />
        </div>
        <div className="flex gap-2">
          {Icons.map((icon, index) => (
            <button
              className={`rounded-full p-1.5 ${icon.classes} active:scale-90`}
              key={index}
              onClick={icon.fn}
            >
              {icon.path()}
            </button>
          ))}
        </div>
      </div>
      <hr className="border dark:border-customGrey-blackBg" />
    </>
  );
};

export default ChatListNavBar;
