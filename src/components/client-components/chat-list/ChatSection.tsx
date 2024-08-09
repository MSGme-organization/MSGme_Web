import { users } from "@/utils/data";
import { SearchIcon } from "@/utils/svgs";
import dynamic from "next/dynamic";
import React from "react";
import Input from "../common-components/Input";
import UserListPlaceholder from "../placeholder/UserListPlaceholder";
import ChatListNavBar from "./ChatListNavBar";

const UsersList = dynamic(() => import("./UsetList"), {
  ssr: false,
  loading: UserListPlaceholder,
});

interface Props {
  handleActiveSection: (section: 0 | 1 | 2 | 3 | 4) => void;
  handleNavigation: (path: string) => void;
  handleActiveChat: (chatID: number | null) => void;
  activeChat: number | null;
}

const ChatSection: React.FC<Props> = ({
  handleActiveSection,
  handleNavigation,
  handleActiveChat,
  activeChat,
}) => {
  const [searchString, setSearchString] = React.useState("");
  const [filteredList, setFilteredList] = React.useState(users);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    searchString !== value && setSearchString(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
    // searchQuery.mutate(value);
  };

  return (
    <>
      <ChatListNavBar
        handleActiveChat={handleActiveChat}
        handleActiveSection={handleActiveSection}
        handleNavigation={handleNavigation}
      />
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
      <UsersList
        list={filteredList}
        handleActiveChat={handleActiveChat}
        activeChat={activeChat}
      />
    </>
  );
};

export default React.memo(ChatSection);
