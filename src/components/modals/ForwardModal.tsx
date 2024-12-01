"use client";

import { DEFAULT_PROFILE_IMG, users } from "@/utils/data";
import { Modal } from "flowbite-react";
import React from "react";
import Input from "../common-components/Input";
import { CloseIcon } from "@/utils/svgs";
import { useAppSelector } from "@/lib/redux/hooks";
import { CldImage } from "next-cloudinary";
import { MessageType } from "../chat/Message";

interface ForwardModalProps {
  forwardMsg: MessageType | null;
  setForwardMsg: React.Dispatch<React.SetStateAction<MessageType | null>>;
}

const ForwardModal: React.FC<ForwardModalProps> = ({
  forwardMsg,
  setForwardMsg,
}) => {
  const [search, setSearch] = React.useState<string>("");
  const [filteredArr, setFilteredArr] = React.useState([]);
  const chatList = useAppSelector((state) => state.chatList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredArr(
      chatList.data.filter((chat: any) =>
        chat.chatName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  React.useEffect(() => {
    setFilteredArr(chatList.data);
  }, [chatList]);

  return (
    <Modal
      position={"center"}
      show={Boolean(forwardMsg)}
      onClose={() => setForwardMsg(null)}
      dismissible
    >
      <Modal.Body className="dark:bg-customGrey-black bg-gray-50 text-black dark:text-white">
        <div className="p-2">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-black dark:text-white text-lg font-semibold">
              Forwarding Message...
            </h1>
            <button onClick={() => setForwardMsg(null)}> {CloseIcon()}</button>
          </div>
          <div className="py-4">
            <div className="bg-white text-black border-gray-700 dark:bg-customGrey-blackBg dark:text-white p-4 rounded-md mb-4">
              {forwardMsg && (
                <div className="w-full bg-gray-200 mb-4 dark:bg-customGrey-dark text-black dark:text-white rounded-md ">
                  <div className="border-l-[5px] flex justify-between items-center border-primary p-3 rounded-md  font-semibold">
                    <p> {forwardMsg.message}</p>
                  </div>
                </div>
              )}
              <div>
                <Input
                  autocomplete="off"
                  classes="border-none  outline-none focus:ring-0  shadow-none"
                  name="search"
                  placeholder="Type a message here (optional)"
                  type="text"
                  required={false}
                />
              </div>
            </div>
            <Input
              classes=""
              iconClass=""
              name="search"
              value={search}
              onChange={handleSearch}
              error={null}
              placeholder="Search for a user"
              type="text"
              required={true}
              LeftIcon={null}
              RightIcon={null}
              autocomplete="off"
            />
            {filteredArr.map((user: any) => (
              <div
                className="w-full py-4 flex justify-between items-center"
                key={user.id}
              >
                <div className="flex gap-5 items-center">
                  <CldImage
                    src={user?.friendAvatar || DEFAULT_PROFILE_IMG}
                    alt={`${user?.friendName}'s avatar`}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="rounded-full bg-green-300  aspect-square"
                  />
                  <p className="font-semibold">{user.chatName}</p>
                </div>
                <button className="bg-primary px-4 text-white font-bold rounded-full text-[15px]">
                  Send
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForwardModal;
