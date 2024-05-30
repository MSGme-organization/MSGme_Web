"use client";

import ChatHeader from "@/components/client-components/chat/ChatHeader";
import Message from "@/components/client-components/chat/Message";
import { messages, users } from "@/utils/data";
import { TextInput } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Chats = ({ params }: { params: { id: string } }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const user = users.find((user) => user.id === parseInt(params.id));
  const router = useRouter();

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
              message={{
                ...message,
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
        <TextInput
          className="w-[95%]"
          style={{
            border: 0,
            fontWeight: "bold",
            boxShadow: "none",
            outlineColor: "#38C585",
          }}
          placeholder="Type here"
        />

        <button className="text-white flex w-[40px] justify-center items-center  rounded-full hover:outline-primary hover:outline">
          <Image src={"/svgs/send.svg"} width={30} height={30} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Chats;
