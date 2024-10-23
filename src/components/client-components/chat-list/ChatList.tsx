"use client";

import React from "react";
import dynamic from "next/dynamic";
import UserItem from "@/components/client-components/chat-list/UserItem";
import Input from "@/components/client-components/common-components/Input";
import { fetchFriendsListData } from "@/lib/redux/friends-list/friendsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { SearchIcon } from "@/utils/svgs";
import { isValidArray } from "@/utils/validate";
import { useParams, useRouter } from "next/navigation";
const ChatListNavBar = dynamic(
  () => import("@/components/client-components/chat-list/ChatListNavBar"),
  { ssr: false }
);

const ChatList = () => {
  const [filteredList, setFilteredList] = React.useState([]);
  const dispatch = useAppDispatch();
  const friendsList = useAppSelector((state) => state.friendsList);
  const router = useRouter();
  const params = useParams();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidArray(friendsList.data)) {
      const value = e.target.value;
      const filtered = friendsList.data.filter((friend: any) =>
        friend.friend_name.toLowerCase().includes(value.toLowerCase())
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
    dispatch(fetchFriendsListData());
  }, []);

  React.useEffect(() => {
    setFilteredList(friendsList.data);
  }, [friendsList]);

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
        {filteredList.length ? (
          filteredList?.map((data: any) => (
            <UserItem
              {...data}
              isActive={data.room_id === params.id}
              handleNavigation={handleNavigation}
              key={data?.room_id}
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
