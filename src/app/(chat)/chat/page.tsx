"use client";

import ChatListNavBar from "@/components/client-components/ChatListNavBar";
import UserItem from "@/components/client-components/UserItem";
import { users } from "@/utils/data";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Chat = () => {
  const router = useRouter();
  const [filteredList, setFilteredList] = React.useState(users);
  const [searchString, setSearchString] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(true);
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
      {!isOpen && (
        <button
          className={`rounded-full p-1.5 bg-primary active:scale-90 absolute top-3 left-3 z-10`}
          onClick={handleOpen}
        >
          <Image src={"/svgs/bar.svg"} alt={"bar"} width={25} height={25} />
        </button>
      )}
      <div
        className={`w-full h-full overflow-y-scroll md:w-[20%] flex-1 min-w-[320px]  ${
          isOpen ? "" : "-translate-x-[100%] duration-90 transition-all hidden"
        }`}
      >
        <ChatListNavBar
          handleNavigation={handleNavigation}
          handleOpen={handleOpen}
        />
        <div className="p-4 sticky top-0 bg-white">
          <input
            onChange={handleFilter}
            value={searchString}
            placeholder="Search for groups and users"
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
          <p className="text-center text-gray-500 mt-4">No user found!</p>
        )}
      </div>
    </>
  );
};

export default Chat;
