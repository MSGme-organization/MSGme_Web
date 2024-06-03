"use client";

import ChatListNavBar from "@/components/client-components/chat-list/ChatListNavBar";
import UserItem from "@/components/client-components/chat-list/UserItem";
import { users } from "@/utils/data";
import { BarIcon, SearchIcon } from "@/utils/svgs";
import { TextInput } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Chat = () => {
  const [filteredList, setFilteredList] = React.useState(users);
  const [searchString, setSearchString] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(true);
  const router = useRouter();
  const params = useParams();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    searchString !== value && setSearchString(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleNavigation = (path: string, state: object = {}) => {
    router.push(path, state);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`w-full h-full overflow-y-scroll md:w-[25%] min-w-[320px] bg-white dark:bg-customGrey-black text-black dark:text-white ${
          isOpen ? "" : "-translate-x-[100%] duration-90 transition-all hidden"
        }`}
      >
        <ChatListNavBar
          handleNavigation={handleNavigation}
          handleOpen={handleOpen}
        />
        <div className="p-4 sticky top-0 bg-white dark:bg-customGrey-black">
          <TextInput
            onChange={handleFilter}
            rightIcon={SearchIcon}
            className="text-customGrey"
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
