"use client";

import ChatHeader from "@/components/client-components/chat/ChatHeader";
import Message from "@/components/client-components/chat/Message";
import Input from "@/components/client-components/common-components/Input";
import { messages, users } from "@/utils/data";
import { CloseIcon } from "@/utils/svgs";
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

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] relative py-[70px] bg-white dark:bg-customGrey-black text-black dark:text-white">
      <ChatHeader
        name={user?.name}
        avatar={user?.avatarImage}
        router={router}
      />

      <div ref={ref} className="overflow-y-scroll h-[calc(100dvh-140px)]">
        <div className="bg-[#E9ECEF] dark:bg-customGrey-black text-black dark:text-white">
          {messages.map((message, index) => (
            <Message
              handleReply={handleReply}
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

      <div className="w-full p-4  h-[70px] absolute bottom-0 left-0 flex gap-4 shadow border-t border-gray-100 dark:border-gray-600">
        {replyMsg && (
          <div className="absolute top-0 -translate-y-[100%] w-full left-0 p-4 bg-white">
            <div className="border-l-[5px] flex justify-between items-center border-primary p-3 bg-gray-100 rounded-md font-semibold">
              <p> {replyMsg.message}</p>
              <button className="" onClick={()=>setReplyMsg(null)}>{CloseIcon()}</button>
            </div>
          </div>
        )}
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
  );
};

export default Chats;
