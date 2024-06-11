"use client";

import ChatHeader from "@/components/client-components/chat/ChatHeader";
import Message from "@/components/client-components/chat/Message";
import Picker from "emoji-picker-react";
import Input from "@/components/client-components/common-components/Input";
import ForwardModal from "@/components/client-components/modals/ForwardModal";
import { messages, users } from "@/utils/data";
import { CloseIcon, ReactionIcon } from "@/utils/svgs";
import { Dropdown } from "flowbite-react";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";

export interface Message {
  username: string;
  issentbyme: Boolean;
  message: string;
  avatar: string;
  reaction?: string;
}

const Chats = ({ params }: { params: { id: string } }) => {
  const [replyMsg, setReplyMsg] = React.useState<Message | null>(null);
  const [forwardMsg, setForwardMsg] = React.useState<Message | null>(null);
  const [isContextActive, setContextActive] = React.useState<number | null>(
    null
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const msgRef = React.useRef<HTMLDivElement[]>([]);
  const user = React.useMemo(
    () => users.find((user) => user.id === parseInt(params.id)),
    [users]
  );

  const formik = useFormik({
    initialValues: {
      msg: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleMsgRef = useCallback((index: number, ref: HTMLDivElement) => {
    msgRef.current[index] = ref;
  }, []);

  const gotoMSG = useCallback((index: number) => {
    console.log(index);
    if (msgRef.current[index]) {
      msgRef.current[index - 3 > 3 ? index - 3 : index - 1].scrollIntoView();
    }
  }, []);

  const handleReply = useCallback((msg: any) => {
    setReplyMsg(msg);
  }, []);

  const handleForward = useCallback((msg: any) => {
    setForwardMsg(msg);
  }, []);

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
    msgRef.current = msgRef.current.slice(0, messages.length);
  }, []);

  return (
    <>
      <div
        id="chat"
        ref={ref}
        className={`w-full ${
          isContextActive === null ? "overflow-y-scroll" : "overflow-y-hidden"
        } relative bg-white dark:bg-customGrey-black text-black dark:text-white h-[100dvh] flex flex-col`}
      >
        <ChatHeader name={user?.name} avatar={user?.avatarImage} />

        <div className="flex-grow">
          <div className="bg-[#E9ECEF] dark:bg-customGrey-black text-black dark:text-white pb-9">
            {messages.map((message, index) => (
              <Message
                index={index}
                gotoMSG={gotoMSG}
                handleMSGRef={handleMsgRef}
                handleReply={handleReply}
                handleForward={handleForward}
                isContextActive={isContextActive}
                setContextActive={setContextActive}
                message={useMemo(() => {
                  return {
                    ...message,
                    reaction: message.reaction || "",
                    avatar: message.avatar || "",
                    totalMsg: messages.length,
                  };
                }, [])}
                key={index}
                isUserSame={
                  index === 0
                    ? false
                    : messages[index - 1].username === message.username
                }
              />
            ))}
          </div>
        </div>

        <div className="w-full p-4  sticky bottom-0 left-0 flex shadow border-t border-gray-100 dark:border-gray-600 flex-col bg-white dark:bg-customGrey-black z-10">
          {replyMsg && (
            <div className="w-full mb-4 bg-white dark:bg-customGrey-black text-black dark:text-white">
              <div className="border-l-[5px] flex justify-between items-center border-primary p-3 bg-gray-100 dark:bg-customGrey-blackBg rounded-md font-semibold">
                <p> {replyMsg.message}</p>
                <button className="" onClick={() => setReplyMsg(null)}>
                  {CloseIcon()}
                </button>
              </div>
            </div>
          )}
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="w-full flex gap-4 items-center">
              <Dropdown
                label=""
                dismissOnClick={false}
                className="bg-transparent w-[95%] md:w-auto dark:bg-transparent shadow-none border-none p-0 flex justify-center"
                renderTrigger={() => (
                  <div className="h-[41px] w-[41px] ms-4 cursor-pointer active:scale-110 active:opacity-100 bg-gray-100 rounded-full p-2 dark:bg-customGrey-blackBg hover:bg-opacity-50">
                    <ReactionIcon />
                  </div>
                )}
              >
                <Dropdown.Item
                  className="w-full bg-transparent shadow-none p-0 border-none hover:bg-transparent"
                  style={{ backgroundColor: "transparent" }}
                >
                  <Picker
                    className="dark:bg-black dark:border-black"
                    style={{ width: "100%" }}
                    reactionsDefaultOpen={false}
                    searchDisabled={true}
                    onEmojiClick={(emoji) =>
                      formik.setFieldValue(
                        "msg",
                        formik.values.msg + emoji.emoji
                      )
                    }
                  />
                </Dropdown.Item>
              </Dropdown>
              <Input
                label={""}
                type={"text"}
                required={false}
                classes={"select-none"}
                iconClass={undefined}
                LeftIcon={undefined}
                RightIcon={undefined}
                placeholder="Enter your Message Here"
                {...formik.getFieldProps("msg")}
                error={formik.errors.msg}
                onChange={formik.handleChange}
                value={formik.values?.msg}
              />
              <button
                type="submit"
                className="text-white flex w-[40px] justify-center items-center  rounded-full hover:outline-primary hover:outline"
              >
                <Image
                  src={"/svgs/send.svg"}
                  width={30}
                  height={30}
                  alt="send"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
      <ForwardModal forwardMsg={forwardMsg} setForwardMsg={setForwardMsg} />
    </>
  );
};

export default Chats;
