"use client";

import Image from "next/image";
import React from "react";

const Icons = [
  {
    path: "/svgs/plus.svg",
    alt: "plus",
    classes: "bg-primary",
    fn: () => console.log("plus"),
  },
  {
    path: "/svgs/avtar.svg",
    alt: "avtar",
    classes: "bg-primary",
    fn: () => console.log("avtar"),
  },
  {
    path: "/svgs/bar.svg",
    alt: "bar",
    classes: "bg-gray-200",
    fn: () => console.log("bar"),
  },
];

const ChatListNavBar = ({
  handleNavigation,
}: {
  handleNavigation: (path: string) => void;
}) => {
  return (
    <>
      <div className="w-full flex justify-between items-center p-4">
        <div onClick={() => handleNavigation("/chat")}>
          <Image src="/Logo.png" alt="logo" width={95} height={95} />
        </div>
        <div className="flex gap-2">
          {Icons.map((icon, index) => (
            <button
              className={`rounded-full p-1.5 ${icon.classes} active:scale-90`}
              key={index}
              onClick={icon.fn}
            >
              <Image src={icon.path} alt={icon.alt} width={18} height={18} />
            </button>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default ChatListNavBar;
