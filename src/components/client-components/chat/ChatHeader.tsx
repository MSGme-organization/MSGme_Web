import {
  BackIcon,
  CloseIcon,
  FlagIcon,
  MuteIcon,
  SearchIcon,
  ShareIcon,
  ThreeDotsIcon,
} from "@/utils/svgs";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Input from "../common-components/Input";
import { DownArrow } from "../HomeLayout/Svgs";
import ShareModal from "../modals/ShareModal";

interface ChatHeaderProps {
  name: string | undefined;
  avatar: string | undefined;
  searchString?: string | null | undefined;
  handleSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
  downActiveIndex: () => void;
  upActiveIndex: () => void;
  searchActiveIndex: number;
  count: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatar,
  handleSearch,
  downActiveIndex,
  upActiveIndex,
  searchString,
  searchActiveIndex,
  count,
}) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
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
    setSearchOpen((prev) => {
      if (prev) {
        searchRef?.current?.blur();
        if (handleSearch) {
          const fakeEvent: React.ChangeEvent<HTMLInputElement> = {
            target: { value: "" },
          } as React.ChangeEvent<HTMLInputElement>;
          handleSearch(fakeEvent);
        }
      } else {
        searchRef?.current?.focus();
      }
      return !prev;
    });
  };

  return (
    <>
      <div
        className={`w-full sticky ${
          searchOpen ? "mb-[66px]" : "mb-0"
        } top-0 left-0 min-h-[70px] z-[2] flex items-center justify-around shadow border-b border-gray-100 dark:border-gray-600 dark:bg-customGrey-blackBg bg-white`}
      >
        <div className="w-full px-4 flex items-center justify-between z-[21]  dark:bg-customGrey-blackBg bg-white">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="md:hidden">
              <BackIcon />
            </button>
            <div className="flex items-center cursor-pointer">
              <Image
                width={40}
                height={40}
                src={avatar || ""}
                alt="avtar"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <h1 className="text-xl font-bold hover:opacity-70">{name}</h1>
              </div>
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
          className={`absolute w-full top-[100%] gap-2 left-0 z-[20] p-3 bg-white dark:bg-customGrey-blackBg flex justify-around items-center -translate-y-[100%] ${
            searchOpen ? "translate-y-[0%]" : ""
          }`}
        >
          <Input
            type="text"
            // ref={searchRef}
            onChange={handleSearch}
            value={searchString || ""}
            placeholder="search here"
            classes="flex-1 z-[20]"
          />
          <div className="text-textColor dark:text-textColor-dark text-nowrap">
            {count === 0 ? 0 : searchActiveIndex + 1} / {count}
          </div>
          <button className="p-2 rotate-180" onClick={upActiveIndex}>
            {DownArrow()}
          </button>
          <button className="p-2" onClick={downActiveIndex}>
            {DownArrow()}
          </button>
          <button className="p-2" onClick={handleSearchBar}>
            {CloseIcon()}
          </button>
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

export default React.memo(ChatHeader);
