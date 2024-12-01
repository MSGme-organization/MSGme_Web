"use client";

import React from "react";
import dynamic from "next/dynamic";
import UserItem from "@/components/chat-list/UserItem";
import Input from "@/components/common-components/Input";
import { fetchChatListData } from "@/lib/redux/chat-list/chatListSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { SearchIcon } from "@/utils/svgs";
import { isValidArray } from "@/utils/validate";
import { useParams, useRouter } from "next/navigation";
import { useSocket } from "../context/SocketContext";
const ChatListNavBar = dynamic(
  () => import("@/components/chat-list/ChatListNavBar"),
  { ssr: false }
);

const ChatList = () => {
  const socket = useSocket();
  const [filteredList, setFilteredList] = React.useState([]);
  const dispatch = useAppDispatch();
  const chatList = useAppSelector((state) => state.chatList);
  const router = useRouter();
  const params = useParams();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidArray(chatList.data)) {
      const value = e.target.value;
      const filtered = chatList.data.filter((chat: any) =>
        chat.chatName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  const handleNavigation = React.useCallback(
    (path: string, state: object = {}) => {
      router.push(path, state);
    },
    []
  );
  React.useEffect(() => {
    dispatch(fetchChatListData());
    socket?.off("reorder-friends").on("reorder-friends", (data) => {
      dispatch(fetchChatListData());
    });
    return () => {
      socket?.off("reorder-friends");
    };
  }, []);

  React.useEffect(() => {
    setFilteredList(chatList.data);
  }, [chatList]);

  return (
    <>
      <div className="w-full h-full overflow-y-scroll md:w-[20%] min-w-[320px] bg-white dark:bg-customGrey-black text-black dark:text-white">
        <ChatListNavBar handleNavigation={handleNavigation} />
        <div className="p-4 sticky top-0 bg-white dark:bg-customGrey-black">
          <Input
            type="text"
            RightIcon={SearchIcon}
            onChange={handleFilter}
            iconClass="right-2"
            classes="text-customGrey"
            placeholder="Search Chat here"
          />
        </div>
        <hr className="border dark:border-customGrey-blackBg" />
        {isValidArray(filteredList) ? (
          filteredList?.map((data: any) => (
            <UserItem
              {...data}
              isActive={data.roomId === params.id}
              handleNavigation={handleNavigation}
              key={data?.roomId}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-white mt-4">
            No user found!
          </p>
        )}
      </div>
    </>
  );
};

export default ChatList;
