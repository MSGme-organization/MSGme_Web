"use client";

import { DEFAULT_PROFILE_IMG, users } from "@/utils/data";
import { Modal } from "flowbite-react";
import React from "react";
import Input from "../common-components/Input";
import { CloseIcon, SendIcon, ShareIcon } from "@/utils/svgs";
import { useAppSelector } from "@/lib/redux/hooks";
import { CldImage } from "next-cloudinary";
import { MessageType } from "../chat/Message";
import { getRecipientPublicKey } from "@/app/(chat)/chat/@indChat/[id]/_action";
import { deriveSharedSecret, encryptMessage } from "@/utils/messageE2EE";
import { useSocket } from "../context/SocketContext";
import { ChatListType } from "@/app/api/v1/(friends)/get-friends/route";

interface ForwardModalProps {
  forwardMsg: MessageType | null;
  setForwardMsg: React.Dispatch<React.SetStateAction<MessageType | null>>;
}

const ForwardModal: React.FC<ForwardModalProps> = ({
  forwardMsg,
  setForwardMsg,
}) => {
  const [search, setSearch] = React.useState<string>("");
  const [filteredArr, setFilteredArr] = React.useState<ChatListType[]>([]);
  const [buttonStatuses, setButtonStatuses] = React.useState<{
    [key: string]: boolean;
  }>({});
  const chatList = useAppSelector((state) => state.chatList);
  const socket = useSocket();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredArr(
      chatList.data.filter((chat) =>
        chat.chatName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSendMessage = async (roomId: string, userId: string) => {
    try {
      if (forwardMsg && roomId && socket) {
        const userPrivateKey: JsonWebKey = JSON.parse(
          localStorage.getItem("private_key") as string
        );
        const recipientPublicKey = await getRecipientPublicKey(
          forwardMsg.userId,
          roomId
        );
        if (recipientPublicKey) {
          const sharedSecret = await deriveSharedSecret(
            userPrivateKey,
            recipientPublicKey
          );
          const { encryptedData, iv } = await encryptMessage(
            sharedSecret,
            forwardMsg.message
          );
          const forwardMessageObject = {
            fullName: forwardMsg?.fullName,
            username: forwardMsg?.username,
            avatar: forwardMsg?.avatar,
            message: encryptedData,
            iv: iv,
            repliedMsgId: null,
            userId: forwardMsg.userId,
            isForward: true,
          };
          socket.emit("message-send", {
            messageObject: forwardMessageObject,
            roomId,
          });

          setButtonStatuses((prev) => ({ ...prev, [userId]: true }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ForwardUser = ({ user }) => {
    const buttonStatus = buttonStatuses[user.id] || false;
    return (
      <div className="w-full py-4 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <CldImage
            src={user?.friendAvatar || DEFAULT_PROFILE_IMG}
            alt={`${user?.friendName}'s avatar`}
            width={40}
            height={40}
            loading="lazy"
            className="rounded-full bg-green-300 aspect-square"
          />
          <p className="font-semibold">{user.chatName}</p>
        </div>
        {buttonStatus ? (
          <div className="bg-customGrey dark:bg-customGrey-blackBg px-4 text-white font-bold rounded-full text-[15px]">
            Sent
          </div>
        ) : (
          <button
            className="px-4 text-white font-bold rounded-full text-[15px]"
            onClick={async () => {
              await handleSendMessage(user.roomId, user.id);
            }}
          >
            {SendIcon()}
          </button>
        )}
      </div>
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
            {filteredArr.map((user) => (
              <ForwardUser key={user.id} user={user} />
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForwardModal;
