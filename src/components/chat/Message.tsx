"use client";
import React, { useEffect, useState } from "react";
import Reaction from "./Reaction";
import { CldImage } from "next-cloudinary";
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
import { DEFAULT_PROFILE_IMG } from "@/utils/data";
import { isValidObject } from "@/utils/validate";

export type MessageType = {
  username: string;
  fullName: string;
  message: string ;
  avatar?: string;
  reaction?: string;
  repliedMsg?: MessageType | null;
  _id: string;
  iv: string;
};
interface MessageProps {
  message: MessageType;
  index: number;
  handleReply: Function;
  handleForward: Function;
  gotoMSG: Function;
  handleMSGRef: Function;
  isContextActive: string | null;
  setContextActive: Function;
  searchString?: string | null | undefined;
  searchActiveIndex: number | null;
  highlightText: (text, index) => any;
  decodedUsername: string;
}

interface ContextCord {
  top: number;
  left: number;
}

const Message: React.FC<MessageProps> = ({
  message,
  handleReply,
  handleForward,
  handleMSGRef,
  index,
  gotoMSG,
  isContextActive,
  setContextActive,
  highlightText,
  decodedUsername,
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
          await navigator.clipboard.writeText(message.message as string);
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
    setContextActive(message._id);
  };
  useEffect(() => {
    if (contextCord === null) {
      setContextActive(null);
      setLast(false);
    }
  }, [contextCord]);
  return (
    <div
      className={`flex flex-col w-full pb-1 px-4 mt-6 ${
        message.username === decodedUsername ? "items-end" : "items-start"
      } `}
    >
      {/* <div className="flex py-2 items-center gap-2">
        {!isUserSame && !(message.username === decodedUsername) && (
          <>
            <CldImage
              src={message?.avatar || DEFAULT_PROFILE_IMG}
              alt={`user's avatar`}
              width={30}
              height={30}
              loading="lazy"
              className="rounded-full aspect-square"
            />
            <div className="flex">
              <p className="text-sm font-semibold">{message.fullName}</p>
            </div>
          </>
        )}
      </div> */}
      <div
        className={`flex relative  w-full items-center  ${
          message.username === decodedUsername ? "justify-end" : "justify-start"
        }`}
      >
        {message.username === decodedUsername && (
          <Reaction setEmojiReaction={setEmojiReaction} position="left" />
        )}
        <div
          id={`msg-${index}`}
          ref={(el) => handleMSGRef(index, el)}
          className={`w-fit max-w-[80%] shadow md:max-w-[70%] relative transition-all duration-100 ${
            message.username === decodedUsername
              ? "bg-primary text-white "
              : "bg-white text-black dark:border border-gray-700 dark:bg-customGrey-blackBg dark:text-white"
          } rounded-md`}
        >
          {isValidObject(message.repliedMsg) && (
            <div className="w-full pb-0 p-3">
              <button
                className={`${
                  message.username === decodedUsername
                    ? "bg-[#ffffff31] dark:bg-[#3741514b]"
                    : "bg-gray-200 dark:bg-gray-700"
                } text-black w-full dark:text-white mb-0 p-2 rounded-md border-s-[4px] border-[#0b6d40]`}
                onClick={() => {
                  gotoMSG(message.repliedMsg?._id);
                }}
              >
                <div className="flex items-center my-2 gap-2">
                  {ReplyMSG()}
                  {/* {!(message.repliedMsg.username === decodedUsername) && (
                    <CldImage
                      src={message?.repliedMsg?.avatar || DEFAULT_PROFILE_IMG}
                      alt={`user's avatar`}
                      width={20}
                      height={20}
                      loading="lazy"
                      className="rounded-full aspect-square"
                    />
                  )} */}
                  <p className="text-[12px] font-semibold">
                    {message?.repliedMsg?.username}
                  </p>
                </div>
                <p className="text-[15px] font-semibold text-start">
                  {message?.repliedMsg?.message}
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
                  message.username === decodedUsername
                    ? "top-[90%] right-0"
                    : "top-[90%] left-0"
                } cursor-pointer`}
              >
                {emojiReaction}
              </span>
            )}
          </p>
          {contextCord && isContextActive === message._id ? (
            <Context
              setContextCord={setContextCord}
              contextRef={ref}
              items={dpItems}
              position={
                message.username === decodedUsername
                  ? "top-left"
                  : "right-bottom"
              }
              last={isLast}
            />
          ) : null}
        </div>
        {!(message.username === decodedUsername) && (
          <Reaction setEmojiReaction={setEmojiReaction} position="right" />
        )}
      </div>
    </div>
  );
};

export default React.memo(Message);
