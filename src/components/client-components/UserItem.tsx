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
}

const UserItem: React.FC<Data> = ({
  id,
  name,
  lastChat,
  lastChatTime,
  newUnreadChatCount,
  avatarImage,
  handleNavigation,
}) => {
  const hrsDiff = moment().diff(moment(lastChatTime), "hours");
  const dayDiff = moment().diff(moment(lastChatTime), "days");

  const handle = () => {
    handleNavigation(`/chat/${id}`, {
      id,
      name,
      lastChat,
      lastChatTime,
      newUnreadChatCount,
      avatarImage,
    });
  };

  return (
    <div
      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 select-none cursor-pointer"
      onClick={handle}
    >
      <div className="flex w-[90%]">
        <Image
          src={avatarImage}
          alt={`${name}'s avatar`}
          width={20}
          height={10}
          className="w-[15%] max-h-12 rounded-full bg-green-300 object-contain"
        />
        <div className="w-[85%] pl-2">
          <div className="font-bold">{name}</div>
          <p className="text-sm text-gray-500 w-[90%] overflow-clip text-nowrap text-ellipsis">
            {lastChat}
          </p>
        </div>
      </div>
      <div className="w-[10%] flex flex-col justify-center items-center">
        <p className="text-[10px] text-gray-400 text-center">
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
