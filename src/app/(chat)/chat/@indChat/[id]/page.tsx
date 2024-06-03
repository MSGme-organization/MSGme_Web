"use client";

import UserItem from "@/components/client-components/chat-list/UserItem";
import ChatHeader from "@/components/client-components/chat/ChatHeader";
import Message from "@/components/client-components/chat/Message";
import Input from "@/components/client-components/common-components/Input";
import { messages, users } from "@/utils/data";
import { CloseIcon } from "@/utils/svgs";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Message {
  username: string;
  issentbyme: Boolean;
  message: string;
  avatar: string;
  reaction?: string;
}

const Chats = ({ params }: { params: { id: string } }) => {
  const [replyMsg, setReplyMsg] = React.useState<Message | null>(null);
  const [forwardMsg, setForwardMsg] = React.useState<Message | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const user = users.find((user) => user.id === parseInt(params.id));
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      msg: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleReply = (msg: any) => {
    setReplyMsg(msg);
  };

  const handleForward = (msg: any) => {
    setForwardMsg(msg);
  };

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="w-full overflow-y-scroll relative bg-white dark:bg-customGrey-black text-black dark:text-white h-[100dvh] flex flex-col"
      >
        <ChatHeader
          name={user?.name}
          avatar={user?.avatarImage}
          router={router}
        />

        <div className="flex-grow">
          <div className="bg-[#E9ECEF] dark:bg-customGrey-black text-black dark:text-white">
            {messages.map((message, index) => (
              <Message
                handleReply={handleReply}
                handleForward={handleForward}
                message={{
                  ...message,
                  reaction: message.reaction || "",
                  avatar: message.avatar || "",
                }}
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

        <div className="w-full p-4  sticky bottom-0 left-0 flex shadow border-t border-gray-100 dark:border-gray-600 flex-col bg-white dark:bg-customGrey-black">
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
          <div className="w-full flex gap-4">
            <Input
              label={""}
              type={"text"}
              required={false}
              classes={undefined}
              iconClass={undefined}
              LeftIcon={undefined}
              RightIcon={undefined}
              placeholder="Enter your Message Here"
              {...formik.getFieldProps("msg")}
              error={formik.errors.msg}
            />
            <button className="text-white flex w-[40px] justify-center items-center  rounded-full hover:outline-primary hover:outline">
              <Image src={"/svgs/send.svg"} width={30} height={30} alt="send" />
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={Boolean(forwardMsg)}
        onClose={() => setForwardMsg(null)}
        dismissible
      >
        <Modal.Header>
          <h1 className="font-semibold">Forward Message</h1>
        </Modal.Header>
        <Modal.Body className="dark:bg-customGrey-blackBg bg-gray-400 text-black dark:text-white">
          {forwardMsg && (
            <div className="w-full bg-white mb-4 dark:bg-customGrey-dark text-black dark:text-white rounded-md " >
              <div className="border-l-[5px] flex justify-between items-center border-primary p-3 rounded-md  font-semibold">
                <p> {forwardMsg.message}</p>
              </div>
            </div>
          )}
          {users.slice(0, 5).map((user, index) => (
            <div
              className="w-full px-4 py-3 flex justify-between items-center"
              key={index}
            >
              <div className="flex gap-5 items-center">
                <Image
                  src={user.avatarImage}
                  alt={`${user.name}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full bg-green-300  aspect-square"
                />
                <p className="font-semibold">{user.name}</p>
              </div>
              <button className="bg-primary px-4 text-white font-bold rounded-full text-[18px]">
                Send
              </button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Chats;
