"use client";

import moment from "moment";
import Image from "next/image";
import React from "react";

interface Data {
  id: number;
  name: string;
  lastChat: string;
  lastChatTime: string;
  newUnreadChatCount: number;
  avatarImage: string;
  handleNavigation: (path: string) => void;
  isActive?: boolean;
}

const UserItem: React.FC<Data> = ({
  id,
  name,
  lastChat,
  lastChatTime,
  newUnreadChatCount,
  avatarImage,
  handleNavigation,
  isActive,
}) => {
  const hrsDiff = moment().diff(moment(lastChatTime).format(), "hours");
  const dayDiff = moment().diff(moment(lastChatTime).format(), "days");

  const handle = () => {
    handleNavigation(`/chat/${id}`);
  };
  return (
    <div
      className={`w-full flex border-r-4 items-center justify-between p-4 hover:bg-gray-100 hover:dark:bg-gray-700 select-none cursor-pointer hide-scrollbar   text-black dark:text-white ${
        isActive
          ? "bg-[#EEFFF7] dark:bg-[#8cf5c41e] dark:text-primary border-primary text-primary"
          : "bg-white dark:bg-customGrey-black border-transparent"
      }`}
      onClick={handle}
    >
      <div className="flex w-[90%] items-center ">
        <Image
          src={avatarImage}
          alt={`${name}'s avatar`}
          width={20}
          height={10}
          className=" max-w-[50px] w-[15%] rounded-full bg-green-300  aspect-square"
        />
        <div className="w-[70%] pl-2">
          <div className="font-bold">{name}</div>
          <p className="text-sm w-[90%] overflow-clip text-nowrap text-ellipsis">
            {lastChat}
          </p>
        </div>
      </div>
      <div className="w-[15%] flex flex-col justify-around gap-1 items-center">
        <p className="text-[10px] text-center font-[550]">
          {dayDiff <= 0
            ? hrsDiff > 0
              ? hrsDiff + "h"
              : "just Now"
            : dayDiff === 1
            ? "yesterday"
            : dayDiff + " days ago"}
        </p>
        {newUnreadChatCount > 0 && (
          <div className="bg-red-500 text-white text-[12px] rounded-full w-5 h-5 flex items-center justify-center">
            {newUnreadChatCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItem;
