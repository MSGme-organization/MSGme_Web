"use client";

import Image from "next/image";
import React from "react";
import AddModal from "../modals/AddModal";

import { AvatarIcon, MoonIcon, PlusIcon, SunIcon } from "@/utils/svgs";
import { useThemeMode } from "flowbite-react";

interface Props {
  handleNavigation: (path: string) => void;
  handleActiveSection: (section: 0 | 1 | 2) => void;
  handleActiveChat: (chatID: number | null) => void;
}

const ChatListNavBar: React.FC<Props> = ({
  handleActiveSection,
  handleActiveChat,
}) => {
  const [showModal, setShowModal] = React.useState(false);
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
      fn: () => handleActiveSection(1),
    },
    {
      path: AvatarIcon,
      alt: "avtar",
      classes: "bg-primary text-white",
      fn: () => handleActiveSection(2),
    },
  ];

  const handleLogoClick = () => {
    handleActiveChat(null);
    handleActiveSection(0);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-4 h-[70px]">
        <div onClick={handleLogoClick}>
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
      <AddModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default React.memo(ChatListNavBar, () => true);
