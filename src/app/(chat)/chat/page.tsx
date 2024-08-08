"use client";

import ChatListNavBar from "@/components/client-components/chat-list/ChatListNavBar";
import UserItem from "@/components/client-components/chat-list/UserItem";
import Input from "@/components/client-components/common-components/Input";
import { searchUsers } from "@/query/search/searchUsers";
import { users } from "@/utils/data";
import { SearchIcon } from "@/utils/svgs";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Chat = () => {
  const [filteredList, setFilteredList] = React.useState(users);
  const [searchString, setSearchString] = React.useState("");
  const router = useRouter();
  const params = useParams();

  const searchQuery = useMutation({
    mutationFn: searchUsers,
    onSuccess: (res: any) => {
      console.log(res);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    searchString !== value && setSearchString(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
    searchQuery.mutate(value);
  };

  const handleNavigation = React.useCallback(
    (path: string, state: object = {}) => {
      router.push(path, state);
    },
    []
  );

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
          filteredList?.map((data, index) => (
            <UserItem
              {...data}
              isActive={data.id === Number(params.id)}
              handleNavigation={handleNavigation}
              key={index}
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

export default Chat;
