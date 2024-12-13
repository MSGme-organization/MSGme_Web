"use client";

import { CloseIcon, ReactionIcon } from "@/utils/svgs";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Input from "../common-components/Input";
import EmojiPicker from "../emoji/EmojiPicker";
import { MessageType } from "./Message";

type TextMessageFieldProps = {
  handleMessageSend: (msg: string) => void;
  replyMsg?: MessageType | null;
  setReplyMsg: (msg: null) => void;
};

const TextMessageField = ({
  handleMessageSend,
  setReplyMsg,
  replyMsg,
}: TextMessageFieldProps) => {
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (replyMsg || msg.trim()) {
      handleMessageSend(msg.trim());
      setMsg("");
    }
  };

  useEffect(() => {
    if (replyMsg) {
      inputRef.current?.focus();
    }
  }, [replyMsg]);

  const handleEmojiClick = useCallback((emoji: string) => {
    setMsg((prevMsg) => prevMsg + emoji);
  }, []);

  return (
    <div className="w-full p-4 sticky bottom-0 left-0 flex shadow border-t border-gray-100 dark:border-gray-600 flex-col bg-white dark:bg-customGrey-black z-10">
      {replyMsg && (
        <div className="w-full mb-4 bg-white dark:bg-customGrey-black text-black dark:text-white">
          <div className="border-l-[5px] flex justify-between items-center border-primary p-3 bg-gray-100 dark:bg-customGrey-blackBg rounded-md font-semibold">
            <p>{replyMsg.message}</p>
            <button onClick={() => setReplyMsg(null)}>{CloseIcon()}</button>
          </div>
        </div>
      )}
      <div className="w-full flex gap-4 items-center">
        <Dropdown
          label=""
          dismissOnClick={false}
          className="bg-transparent w-[95%] md:w-auto dark:bg-transparent shadow-none border-none p-0 flex justify-center"
          renderTrigger={() => (
            <div className="h-[41px] w-[41px] cursor-pointer active:scale-110 p-2 active:opacity-100 bg-gray-100 rounded-full dark:bg-customGrey-blackBg hover:bg-opacity-50">
              <ReactionIcon />
            </div>
          )}
        >
          <EmojiPicker handleClick={handleEmojiClick} />
          <Dropdown.Item
            className="w-full bg-transparent shadow-none p-0 border-none hover:bg-transparent position-relative"
            style={{ backgroundColor: "transparent" }}
          ></Dropdown.Item>
        </Dropdown>
        <div className="flex-grow">
          <Input
            ref={inputRef}
            label=""
            type="text"
            required={false}
            classes="select-none"
            iconClass={undefined}
            LeftIcon={undefined}
            RightIcon={undefined}
            placeholder="Enter your Message Here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white flex w-[40px] justify-center items-center rounded-full"
          onClick={handleSubmit}
        >
          <Image src="/svgs/send.svg" width={30} height={30} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(TextMessageField);
