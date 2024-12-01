"use client";
import React, { useEffect, useState } from "react";
import Reaction from "./Reaction";
import { CldImage } from "next-cloudinary";
import toast from "react-hot-toast";
import {
  CopyIcon,
  DeleteIcon,
  ForwardIcon,
  ReplyIcon,
  ReplyMSG,
} from "@/utils/svgs";
import Context from "../context-menu/Context";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DEFAULT_PROFILE_IMG } from "@/utils/data";
import { isValidArray, isValidObject } from "@/utils/objectsValidate";
import { getFormatTime } from "@/utils/date";
import ReactionsCard from "../emoji/ReactionsCard";
import { Popover } from "flowbite-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { useSocket } from "../context/SocketContext";

export type DecodedUserType = {
  id: string;
  username: string;
  email: string;
};

export type MessageType = {
  username: string;
  userId: string;
  fullName: string;
  message: string;
  avatar?: string;
  reactions?: Reaction[];
  repliedMsg?: MessageType | null;
  _id: string;
  iv: string;
  roomId: string;
  createdAt: string;
};
type MessageProps = {
  message: MessageType;
  index: number;
  handleReply: Function;
  handleForward: (messageObj: MessageType) => void;
  handleDelete: (msgId: string) => Promise<void>;
  gotoMSG: (msgId: string) => void;
  handleMSGRef: Function;
  isContextActive: string | null;
  setContextActive: Function;
  searchString?: string | null | undefined;
  searchActiveIndex: number | null;
  highlightText: (text: string, index: number) => any;
  decodedUser: DecodedUserType;
};

export type Reaction = {
  emoji: string;
  userId: string;
  username: string;
  avatar?: string;
  timestamp: Date | string;
  _id?: string;
};
type ContextCord = {
  top: number;
  left: number;
};

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
  handleDelete,
  decodedUser,
}) => {
  const [contextCord, setContextCord] = React.useState<ContextCord | null>(
    null
  );
  const socket = useSocket();
  const ref = useDetectClickOutside({
    onTriggered: () => setContextCord(null),
  });
  const [isLast, setLast] = useState(false);
  const [emojiReaction, setEmojiReaction] = useState<Reaction[]>(
    message.reactions || []
  );
  const profile = useAppSelector((state) => state.profile);
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
      label: "Delete",
      icon: DeleteIcon,
      fn: () => {
        handleDelete(message._id);
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

  const handleAddReaction = async (emoji: string) => {
    try {
      socket?.emit("message-reaction-add", {
        reactionObj: {
          emoji,
          userId: decodedUser.id,
          username: decodedUser.username,
          avatar: profile.avatar?.url || "",
          timestamp: new Date(),
        },
        messageId: message._id,
        roomId: message.roomId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeReaction = async () => {
    try {
      if (isValidArray(emojiReaction)) {
        const userReaction = emojiReaction.find(
          (emojiObj) => emojiObj.userId === decodedUser.id
        );

        if (userReaction) {
          socket?.emit("message-reaction-remove", {
            reactionObj: userReaction,
            messageId: message._id,
            roomId: message.roomId,
          });
        }
      }
    } catch (error) {
      console.error("Error removing reaction:", error);
    }
  };

  useEffect(() => {
    if (contextCord === null) {
      setContextActive(null);
      setLast(false);
    }
  }, [contextCord]);

  useEffect(() => {
    socket
      ?.off(`reaction-add-${message._id}`)
      .on(`reaction-add-${message._id}`, (data) => {
        setEmojiReaction(data);
      });
    socket
      ?.off(`reaction-add-ack-${message._id}`)
      .on(`reaction-add-ack-${message._id}`, (data) => {
        setEmojiReaction(data);
      });
    socket
      ?.off(`reaction-remove-${message._id}`)
      .on(`reaction-remove-${message._id}`, (data) => {
        if (data) {
          setEmojiReaction(data);
        }
      });
    socket
      ?.off(`reaction-remove-ack-${message._id}`)
      .on(`reaction-remove-ack-${message._id}`, (data) => {
        if (data) {
          setEmojiReaction(data);
        }
      });
    return () => {
      socket?.off(`reaction-add-${message._id}`);
      socket?.off(`reaction-add-ack-${message._id}`);
      socket?.off(`reaction-remove-${message._id}`);
      socket?.off(`reaction-remove-ack-${message._id}`);
    };
  }, []);
  return (
    <div
      className={`flex flex-col w-full pb-1 px-4 mt-6 ${
        message.username === decodedUser.username ? "items-end" : "items-start"
      } `}
    >
      {/* <div className="flex py-2 items-center gap-2">
        {!isUserSame && !(message.username === decodedUser.username) && (
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
          message.username === decodedUser.username
            ? "justify-end"
            : "justify-start"
        }`}
      >
        {message.username === decodedUser.username && (
          <Reaction handleReaction={handleAddReaction} position="left" />
        )}
        <div
          id={message._id}
          ref={(el) => handleMSGRef(index, el)}
          className={`w-fit max-w-[80%] shadow md:max-w-[70%] relative transition-all duration-100 min-w-32 ${
            message.username === decodedUser.username
              ? "bg-primary text-white "
              : "bg-white text-black dark:border border-gray-700 dark:bg-customGrey-blackBg dark:text-white"
          } rounded-md`}
        >
          {isValidObject(message.repliedMsg) && (
            <div className="w-full pb-0 p-3">
              <button
                className={`${
                  message.username === decodedUser.username
                    ? "bg-[#ffffff31] dark:bg-[#3741514b]"
                    : "bg-gray-200 dark:bg-gray-700"
                } text-black w-full dark:text-white mb-0 p-2 rounded-md border-s-[4px] border-[#0b6d40]`}
                onClick={() => {
                  gotoMSG(message.repliedMsg?._id || "");
                }}
              >
                <div className="flex items-center my-2 gap-2">
                  {ReplyMSG()}
                  {/* {!(message.repliedMsg.username === decodedUser.username) && (
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
          <div
            onContextMenu={handleContextMenu}
            onDoubleClick={handleContextMenu}
            className="text-[16px] font-[550] active:scale-[.99] p-3 relative"
          >
            <p
              className="select-none md:select-auto break-words w-full"
              dangerouslySetInnerHTML={{
                __html: highlightText(message.message, index),
              }}
            ></p>

            {isValidArray(emojiReaction) ? (
              <Popover
                placement={
                  message.username === decodedUser.username ? "left" : "right"
                }
                content={
                  <ReactionsCard
                    emojiReaction={emojiReaction}
                    removeReaction={removeReaction}
                  />
                }
                arrow={false}
              >
                <div
                  className={`absolute p-1 text-[12px] aspect-square  ${
                    message.username === decodedUser.username
                      ? "top-[90%] left-0"
                      : "top-[90%] right-0"
                  } cursor-pointer`}
                >
                  {emojiReaction?.map((emoji, index) => {
                    return (
                      <span
                        className="rounded-full bg-gray-50 dark:bg-gray-800 border dark:border-gray-800 border-gray-100"
                        key={index}
                      >
                        {emoji.emoji}
                      </span>
                    );
                  })}
                </div>
              </Popover>
            ) : null}
          </div>
          {contextCord && isContextActive === message._id ? (
            <Context
              setContextCord={setContextCord}
              contextRef={ref}
              items={
                decodedUser.id === message.userId
                  ? dpItems
                  : dpItems.slice(0, dpItems.length - 1)
              }
              position={
                message.username === decodedUser.username
                  ? "top-left"
                  : "right-bottom"
              }
              last={isLast}
            />
          ) : null}
        </div>
        {!(message.username === decodedUser.username) && (
          <Reaction handleReaction={handleAddReaction} position="right" />
        )}
      </div>
      <div className="text-[#736d6d] font-semibold text-xs bg-transparent mt-2 px-2">
        {getFormatTime(message.createdAt)}
      </div>
    </div>
  );
};

export default React.memo(Message);
