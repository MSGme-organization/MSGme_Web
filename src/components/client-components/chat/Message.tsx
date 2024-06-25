import React, { useEffect, useState } from "react";
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
  ReplyMSG,
} from "@/utils/svgs";
import Context from "../context-menu/Context";
import { useDetectClickOutside } from "react-detect-click-outside";

interface MessageProps {
  message: {
    id: number;
    username: string;
    message: string;
    issentbyme: boolean;
    avatar: string;
    reaction: string | null | undefined;
    repliedMsg?: {
      message: string;
      avatar: string;
      username: string;
      id: number;
      issentbyme: boolean;
    };
    totalMsg: number;
  };
  index: number;
  isUserSame: boolean;
  handleReply: Function;
  handleForward: Function;
  gotoMSG: Function;
  handleMSGRef: Function;
  isContextActive: number | null;
  setContextActive: Function;
  searchString?: string | null | undefined;
  searchActiveIndex: number | null;
  highlightText: (text, index) => any;
}

interface ContextCord {
  top: number;
  left: number;
}

const Message: React.FC<MessageProps> = ({
  message,
  isUserSame,
  handleReply,
  handleForward,
  handleMSGRef,
  index,
  gotoMSG,
  isContextActive,
  setContextActive,
  searchString,
  highlightText,
  searchActiveIndex,
}) => {
  const [contextCord, setContextCord] = React.useState<ContextCord | null>(
    null
  );
  const ref = useDetectClickOutside({
    onTriggered: () => setContextCord(null),
  });
  const [isLast, setLast] = useState(false);
  const [emojiReaction, setEmojiReaction] = useState<null | string>(
    message.reaction || null
  );
  const dpItems = [
    {
      label: "Reply",
      icon: ReplyIcon,
      fn: () => handleReply(message),
    },
    {
      label: "Copy",
      icon: CopyIcon,
      fn: async () => {
        try {
          await navigator.clipboard.writeText(message.message);
          toast("Copied to clipboard", {
            duration: 0,
            position: "bottom-center",
          });
        } catch (err) {
          console.log(err);
          toast("Failed to copy", {
            duration: 0,
            position: "bottom-center",
          });
        }
      },
    },
    {
      label: "Forward",
      icon: ForwardIcon,
      fn: () => {
        handleForward(message);
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
    if (window.innerHeight - e.clientY <= 330) {
      setLast(true);
    }
    setContextCord({ top: e.clientY, left: e.clientX });
    setContextActive(message.id);
  };
  useEffect(() => {
    if (contextCord === null) {
      setContextActive(null);
      setLast(false);
    }
  }, [contextCord]);
  console.log("Message");
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
            </div>
          </>
        )}
      </div>
      <div
        className={`flex relative  w-full items-center  ${
          message.issentbyme ? "justify-end" : "justify-start"
        }`}
      >
        {message.issentbyme && (
          <Reaction setEmojiReaction={setEmojiReaction} position="left" />
        )}
        <div
          id={`msg-${index}`}
          ref={(el) => handleMSGRef(index, el)}
          className={`w-fit max-w-[80%] shadow md:max-w-[70%] relative transition-all duration-100 ${
            message.issentbyme
              ? "bg-primary text-white "
              : "bg-white text-black dark:border border-gray-700 dark:bg-customGrey-blackBg dark:text-white"
          } rounded-md`}
        >
          {message.repliedMsg && (
            <div className="w-full pb-0 p-3">
              <button
                className={`${
                  message.issentbyme
                    ? "bg-[#ffffff31] dark:bg-[#3741514b]"
                    : "bg-gray-200 dark:bg-gray-700"
                } text-black w-full dark:text-white mb-0 p-2 rounded-md border-s-[4px] border-[#0b6d40]`}
                onClick={() => {
                  gotoMSG(message.repliedMsg?.id);
                }}
              >
                <div className="flex items-center my-2 gap-2">
                  {ReplyMSG()}
                  {!message.repliedMsg.issentbyme && (
                    <Image
                      src={message.repliedMsg.avatar}
                      width={20}
                      height={20}
                      alt="user"
                      className="rounded-full aspect-square"
                    />
                  )}
                  <p className="text-[12px] font-semibold">
                    {message.repliedMsg.username}
                  </p>
                </div>
                <p className="text-[15px] font-semibold text-start">
                  {message.repliedMsg.message}
                </p>
              </button>
            </div>
          )}
          <p
            onContextMenu={handleContextMenu}
            onDoubleClick={handleContextMenu}
            className="text-[16px] font-[550] active:scale-[.99] p-3 relative"
          >
            <span
              className="select-none md:select-auto"
              dangerouslySetInnerHTML={{
                __html: highlightText(message.message, index),
              }}
            ></span>

            {emojiReaction === null ? null : (
              <span
                onClick={() => setEmojiReaction(null)}
                className={`absolute hover:scale-125 rounded-full bg-gray-50 dark:bg-gray-800 p-1 text-[12px] aspect-square border dark:border-gray-800 border-gray-100 ${
                  message.issentbyme ? "top-[90%] right-0" : "top-[90%] left-0"
                } cursor-pointer`}
              >
                {emojiReaction}
              </span>
            )}
          </p>
          {contextCord && isContextActive === message.id ? (
            <Context
              setContextCord={setContextCord}
              contextRef={ref}
              items={dpItems}
              position={message.issentbyme ? "top-left" : "right-bottom"}
              last={isLast}
            />
          ) : null}
        </div>
        {!message.issentbyme && (
          <Reaction setEmojiReaction={setEmojiReaction} position="right" />
        )}
      </div>
    </div>
  );
};

export default React.memo(Message);
