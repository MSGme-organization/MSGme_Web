"use client";

import ChatHeader from "@/components/client-components/chat/ChatHeader";
import Message from "@/components/client-components/chat/Message";
import Input from "@/components/client-components/common-components/Input";
import ForwardModal from "@/components/client-components/modals/ForwardModal";
import { messages, users } from "@/utils/data";
import { CloseIcon } from "@/utils/svgs";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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
  const ref = React.useRef<HTMLDivElement>(null);
  const msgRef = React.useRef<HTMLDivElement[]>([]);
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

  const handleMsgRef = (index: number, ref: HTMLDivElement) => {
    msgRef.current[index] = ref;
  };

  const gotoMSG = (index: number) => {
    console.log(index);
    if (msgRef.current[index]) {
      msgRef.current[index - 3 > 3 ? index - 3 : index - 1].scrollIntoView();
    }
  };

  const handleReply = (msg: any) => {
    setReplyMsg(msg);
  };

  const handleForward = (msg: any) => {
    setForwardMsg(msg);
  };

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
    msgRef.current = msgRef.current.slice(0, messages.length);
  }, []);

  return (
    <>
      <div
        id="chat"
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
                index={index}
                gotoMSG={gotoMSG}
                handleMSGRef={handleMsgRef}
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
      <ForwardModal forwardMsg={forwardMsg} setForwardMsg={setForwardMsg} />
    </>
  );
};

export default Chats;
