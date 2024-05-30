import React from "react";
import Image from "next/image";
import Reaction from "./Reaction";
import toast from "react-hot-toast";
import {
  BlockIcon,
  CopyIcon,
  FlagIcon,
  ForwardIcon,
  MuteIcon,
  ReplyIcon,
  ThreeDotsIcon,
} from "@/utils/svgs";
import Context from "../context-menu/Context";
import { useDetectClickOutside } from "react-detect-click-outside";

interface MessageProps {
  message: {
    username: string;
    message: string;
    issentbyme: boolean;
    avatar: string;
  };
  isUserSame: boolean;
}

interface ContextCord {
  top: number;
  left: number;
}

const Message: React.FC<MessageProps> = ({ message, isUserSame }) => {
  const [contextCord, setContextCord] = React.useState<ContextCord | null>(
    null
  );
  const ref = useDetectClickOutside({
    onTriggered: () => setContextCord(null),
  });

  const dpItems = [
    {
      label: "Reply",
      icon: ReplyIcon,
      fn: () => {
        console.log("Forward");
      },
    },
    {
      label: "Copy",
      icon: CopyIcon,
      fn: async () => {
        await navigator.clipboard.writeText(message.message);
        toast("Copied to clipboard", {
          duration: 0,
          position: "bottom-center",
        });
      },
    },
    {
      label: "Forward",
      icon: ForwardIcon,
      fn: () => {
        console.log("Forward");
      },
    },
    {
      label: "Mute",
      icon: MuteIcon,
      fn: () => {
        console.log("Delete");
      },
    },
    {
      label: "Block",
      icon: BlockIcon,
      fn: () => {
        console.log("Delete");
      },
    },
    {
      label: "Report",
      icon: FlagIcon,
      fn: () => {
        console.log("Delete");
      },
    },
  ];

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setContextCord({ top: e.clientY, left: e.clientX });
  };

  return (
    <div
      className={`flex flex-col w-full pb-1 px-4  ${
        message.issentbyme ? "items-end" : "items-start"
      } `}
    >
      <div className="flex py-2 items-center gap-2">
        {!isUserSame && !message.issentbyme && (
          <>
            <Image
              src={message.avatar}
              width={30}
              height={30}
              alt="user"
              className="rounded-full aspect-square"
            />
            <div className="flex">
              <p className="text-sm font-semibold">{message.username}</p>
              {/* <Menu
                position="right-start"
                renderTrigger={() => (
                  <span className="cursor-pointer">
                    <ThreeDotsIcon />
                  </span>
                )}
                dpItems={dpItems}
              /> */}
            </div>
          </>
        )}
      </div>
      <div
        className={`flex relative  w-full  ${
          message.issentbyme ? "justify-end" : "justify-start"
        }`}
      >
        {message.issentbyme && <Reaction position="left" />}
        <p
          onContextMenu={handleContextMenu}
          onDoubleClick={handleContextMenu}
          className={`text-[16px] font-[550]  p-3 w-fit max-w-[80%] shadow  md:max-w-[50%] relative active:scale-[.99] ${
            message.issentbyme
              ? "bg-primary text-white "
              : "bg-white text-black dark:border border-gray-700 dark:bg-customGrey-blackBg dark:text-white"
          } rounded-md`}
        >
          {message.message}
          {contextCord && (
            <Context
              contextRef={ref}
              items={dpItems}
              position={message.issentbyme ? "top-left" : "right-bottom"}
            />
          )}
        </p>
        {!message.issentbyme && <Reaction position="right" />}
      </div>
    </div>
  );
};

export default React.memo(Message, () => true);
