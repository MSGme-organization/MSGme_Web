import React from "react";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Reaction from "./Reaction";
import Menu from "./Menu";
import toast from "react-hot-toast";

interface MessageProps {
  message: {
    username: string;
    message: string;
    issentbyme: boolean;
    avatar: string;
  };
  isUserSame: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isUserSame }) => {
  const dpItems = [
    {
      label: "Reply",
      icon: "/svgs/reply.svg",
      fn: () => {
        console.log("Forward");
      },
    },
    {
      label: "Copy",
      icon: "/svgs/copy.svg",
      fn: async () => {
        await navigator.clipboard.writeText(message.message);
        toast("Copied to clipboard", {
          duration: 0,
          position: "bottom-center",
        });
      },
    },
    {
      label: "Forward",
      icon: "/svgs/forward.svg",
      fn: () => {
        console.log("Forward");
      },
    },
    {
      label: "Mute",
      icon: "/svgs/mute.svg",
      fn: () => {
        console.log("Delete");
      },
    },
    {
      label: "Block",
      icon: "/svgs/block.svg",
      fn: () => {
        console.log("Delete");
      },
    },
    {
      label: "Report",
      icon: "/svgs/flag.svg",
      fn: () => {
        console.log("Delete");
      },
    },
  ];

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
              <Menu
                position="right-start"
                renderTrigger={() => (
                  <Image
                    className="cursor-pointer mx-2"
                    src={"/svgs/threeDots.svg"}
                    width={20}
                    height={20}
                    alt="menu"
                  />
                )}
                dpItems={dpItems}
              />
            </div>
          </>
        )}
      </div>
      <div
        className={`flex relative  w-full  ${
          message.issentbyme ? "justify-end" : "justify-start"
        }`}
      >
        {message.issentbyme && <Reaction position="left" />}
        <p
          onContextMenu={(e) => {
            e.preventDefault();
            console.log("right click");
          }}
          className={`text-[15px] font-[600] p-3 w-fit max-w-[80%] md:max-w-[50%] ${
            message.issentbyme ? "bg-primary text-white" : "bg-white text-black"
          } rounded-md`}
        >
          {message.message}
          <span></span>
        </p>
        {!message.issentbyme && <Reaction position="right" />}
      </div>
    </div>
  );
};

export default React.memo(Message, () => true);
