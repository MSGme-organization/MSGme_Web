"use client";

import React from "react";
import Image from "next/image";
import Picker from "emoji-picker-react";
import Message from "@/components/client-components/chat/Message";
import ChatHeader from "@/components/client-components/chat/ChatHeader";
import Input from "@/components/client-components/common-components/Input";
import ForwardModal from "@/components/client-components/modals/ForwardModal";

import { CloseIcon, ReactionIcon } from "@/utils/svgs";
import { messages, users } from "@/utils/data";
import { Dropdown } from "flowbite-react";
import { useFormik } from "formik";

export interface Message {
  username: string;
  issentbyme: Boolean;
  message?: string;
  avatar?: string;
  reaction?: string;
  repliedMsg?: any;
  id: number;
}

const Chats = ({ params }: { params: { id: string } }) => {
  const [replyMsg, setReplyMsg] = React.useState<Message | null>(null);
  const [forwardMsg, setForwardMsg] = React.useState<Message | null>(null);
  const [isContextActive, setContextActive] = React.useState<number | null>(
    null
  );
  const [totalMessages, setMessages] = React.useState<Message[] | []>(messages);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const msgRef = React.useRef<HTMLDivElement[]>([]);
  const user = React.useMemo(
    () => users.find((user) => user.id === parseInt(params.id)),
    [users]
  );

  const formik = useFormik({
    initialValues: {
      msg: "",
    },
    onSubmit: (values, { resetForm }) => {
      if (replyMsg !== null || values.msg) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev[prev.length - 1].id + 1,
            username: "Me",
            issentbyme: true,
            message: values.msg,
            repliedMsg: replyMsg,
          },
        ]);
        setReplyMsg(null);
        resetForm();
      }
    },
  });

  const handleMsgRef = React.useCallback(
    (index: number, ref: HTMLDivElement) => {
      msgRef.current[index] = ref;
    },
    []
  );

  const gotoMSG = React.useCallback((index: number) => {
    if (msgRef.current[index]) {
      msgRef.current[index - 3 > 3 ? index - 3 : index - 1].scrollIntoView();
    }
  }, []);

  const handleReply = React.useCallback((msg: any) => {
    if (Object.keys(msg).includes("repliedMsg")) {
      delete msg["repliedMsg"];
    }
    setReplyMsg(msg);
  }, []);

  const handleForward = React.useCallback((msg: any) => {
    setForwardMsg(msg);
  }, []);

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
    msgRef.current = msgRef.current.slice(0, totalMessages.length);
  }, [totalMessages]);

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
    if (replyMsg && inputRef.current) inputRef.current.focus();
  }, [replyMsg]);

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
          <div className="bg-[#E9ECEF] dark:bg-customGrey-black text-black dark:text-white pb-6">
            {totalMessages.map((message, index) => (
              <Message
                index={index}
                gotoMSG={gotoMSG}
                handleMSGRef={handleMsgRef}
                handleReply={handleReply}
                handleForward={handleForward}
                isContextActive={isContextActive}
                setContextActive={setContextActive}
                message={{
                  ...message,
                  reaction: message.reaction || "",
                  avatar: message.avatar || "",
                  totalMsg: totalMessages.length,
                }}
                key={index}
                isUserSame={
                  index === 0
                    ? false
                    : totalMessages[index - 1].username === message.username
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
                  <div className="h-[41px] w-[41px] cursor-pointer active:scale-110 p-2 active:opacity-100 bg-gray-100 rounded-full  dark:bg-customGrey-blackBg hover:bg-opacity-50">
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
              <div className="flex-grow">
                <Input
                  inputRef={inputRef}
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
              </div>
              <button
                type="submit"
                className="text-white flex w-[40px] justify-center items-center  rounded-full "
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

export default React.memo(Chats, (prevProps, nextProps) => {
  return prevProps.params.id === nextProps.params.id;
});
