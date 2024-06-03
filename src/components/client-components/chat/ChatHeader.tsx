import {
  BackIcon,
  CloseIcon,
  FlagIcon,
  MuteIcon,
  SearchIcon,
  ShareIcon,
  ThreeDotsIcon,
} from "@/utils/svgs";
import { Button, Dropdown, TextInput } from "flowbite-react";
import Image from "next/image";
import React from "react";
import ShareModal from "../modals/ShareModal";

interface ChatHeaderProps {
  name: string | undefined;
  avatar: string | undefined;
  router: any;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ name, avatar, router }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const dpItems = [
    {
      label: "Share",
      fn: () => setIsShareModalOpen(true),
      icon: ShareIcon,
    },
    {
      label: "Mute",
      fn: () => {},
      icon: MuteIcon,
    },
    {
      label: "Report",
      fn: () => {},
      icon: FlagIcon,
    },
  ];

  const handleSearchBar = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <>
      <div className="w-full sticky top-0 left-0 min-h-[70px] z-[2] flex items-center justify-around shadow border-b border-gray-100 dark:border-gray-600 dark:bg-customGrey-blackBg bg-white">
        <div className="w-full px-4 flex items-center justify-between z-[21]  dark:bg-customGrey-blackBg bg-white">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="md:hidden">
              <BackIcon />
            </button>
            <Image
              width={40}
              height={40}
              src={avatar || ""}
              alt="avtar"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-xl font-bold">{name}</h1>
            </div>
          </div>
          <div className="flex">
            <button
              className="text-black dark:text-white mx-4 rounded-md"
              onClick={handleSearchBar}
            >
              <SearchIcon />
            </button>
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <span className="cursor-pointer">
                  <ThreeDotsIcon />
                </span>
              )}
            >
              {dpItems.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={item.fn}
                  className="text-left w-full py-2 px-4 text-black flex gap-2 hover:bg-gray-100"
                >
                  {item.icon()}
                  <p className="ml-2 text-sm font-semibold">{item.label}</p>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
        </div>
        <div
          className={`absolute w-full top-[100%] left-0 z-[20] p-3 bg-white dark:bg-customGrey-blackBg flex justify-around items-center -translate-y-[100%] ${
            searchOpen ? "translate-y-[0%]" : ""
          }`}
        >
          <TextInput
            placeholder="search here"
            className="w-[95%] z-[20]"
            style={{
              boxShadow: "none",
              outlineWidth: 1,
              outlineColor: "#38C585",
            }}
          />
          <Button
            size={"sm"}
            style={{ boxShadow: "none" }}
            onClick={handleSearchBar}
          >
            {CloseIcon()}
          </Button>
        </div>
      </div>
      <ShareModal
        shareUrl="https://codesandbox.io/p/devbox/react-share-demo-forked-zj2hnj?file=%2Fsrc%2FApp.tsx%3A66%2C8-72%2C1&workspaceId=0b841d1a-100c-4fff-b923-571ba85af587"
        openModal={isShareModalOpen}
        setOpenModal={setIsShareModalOpen}
      />
    </>
  );
};

export default ChatHeader;
