"use client";

import ChatListNavBar from "@/components/client-components/ChatListNavBar";
import UserItem from "@/components/client-components/UserItem";
import { users } from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Chat = () => {
  const router = useRouter();
  const handle = () => {
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  };

  const handleNavigation = (path: string, state: object = {}) => {
    router.push(path, state);
  };

  return (
    <div className="w-full flex-1">
      <ChatListNavBar handleNavigation={handleNavigation} />
      <div className="p-4 sticky top-0 bg-white">
        <input
          placeholder="search for groups and users"
          className="border-none bg-gray-100 w-full p-2 rounded-md placeholder:text-gray-400 focus:outline-none focus:outline-gray-300 focus:outline-1"
        />
        <Image
          src={"/svgs/search.svg"}
          className="absolute top-4 translate-y-[50%] right-7"
          alt="search"
          width={20}
          height={20}
        />
      </div>
      <hr />
      {users.map((data, index) => (
        <UserItem {...data} handleNavigation={handleNavigation} key={index} />
      ))}
    </div>
  );
};

export default Chat;
