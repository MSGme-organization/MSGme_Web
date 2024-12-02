"use client";

import ChatHeader from "@/components/chat/ChatHeader";
import Message, { MessageType } from "@/components/chat/Message";
import TextMessageField from "@/components/chat/TextMessageField";
import ForwardModal from "@/components/modals/ForwardModal";
import { useAppSelector } from "@/lib/redux/hooks";
import React, { useCallback } from "react";
import {
  decryptMessage,
  decryptMessageArray,
  deriveSharedSecret,
  encryptMessage,
} from "@/utils/messageE2EE";
import { useSocket } from "@/components/context/SocketContext";
import { getDayDiff, getDayLabel } from "@/utils/date";
import { deleteMessage, fetchMessage } from "@/query/message/messageAction";
import { updateRoomLastMessage } from "./_action";
import { DecodedUserType } from "@/utils/helpers/token";
import { ChatListType } from "@/app/api/v1/(friends)/get-friends/route";

type ChatsProps = {
  roomId: string;
  decodedUser: DecodedUserType;
  recipientPublicKey: JsonWebKey;
};

const Chats = ({ roomId, decodedUser, recipientPublicKey }: ChatsProps) => {
  const chatList = useAppSelector((state) => state.chatList);
  const profile = useAppSelector((state) => state.profile);
  const [replyMsg, setReplyMsg] = React.useState<MessageType | null>(null);
  const [forwardMsg, setForwardMsg] = React.useState<MessageType | null>(null);
  const [searchString, setSearchString] = React.useState<string | null>(null);
  const [searchActiveIndex, setSearchActiveIndex] = React.useState<number>(0);
  const [isContextActive, setContextActive] = React.useState<string | null>(
    null
  );
  const [searchDivsLength, setSearchDivsLength] = React.useState(0);
  const [totalMessages, setMessages] = React.useState<MessageType[] | []>([]);
  const [chatFriend, setChatFriend] = React.useState<ChatListType | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const msgRef = React.useRef<HTMLDivElement[]>([]);
  const searchDivs = React.useRef<HTMLDivElement[]>([]);
  const socket = useSocket();
  const handleMessageSend = async (message: string) => {
    if (socket && (replyMsg !== null || message)) {
      const userPrivateKey: JsonWebKey = JSON.parse(
        localStorage.getItem("private_key") as string
      );
      if (recipientPublicKey && userPrivateKey) {
        const sharedSecret = await deriveSharedSecret(
          userPrivateKey,
          recipientPublicKey
        );
        const { encryptedData, iv } = await encryptMessage(
          sharedSecret,
          message
        );
        const messageObject = {
          fullName: `${profile.firstName} ${profile.lastName}`,
          username: profile.username,
          avatar: profile.avatar?.url || "",
          message: encryptedData,
          iv: iv,
          repliedMsgId: replyMsg?._id,
          userId: decodedUser.id,
        };
        socket.emit("message-send", {
          messageObject: messageObject,
          roomId,
        });
        setReplyMsg(null);
      }
    }
  };

  const handleMessageReceive = async (data: MessageType) => {
    const userPrivateKey: JsonWebKey = JSON.parse(
      localStorage.getItem("private_key") as string
    );
    if (userPrivateKey && recipientPublicKey) {
      const sharedSecret = await deriveSharedSecret(
        userPrivateKey,
        recipientPublicKey
      );
      const decryptedMessage = await decryptMessage(
        sharedSecret,
        data.message as string,
        data?.iv as string
      );
      if (data.repliedMsg?.message) {
        const decryptedReplyMessage = await decryptMessage(
          sharedSecret,
          data.repliedMsg.message as string,
          data?.repliedMsg?.iv as string
        );
        data.repliedMsg.message = decryptedReplyMessage;
      }
      await updateRoomLastMessage(roomId, {
        message: decryptedMessage,
        createdAt: data.createdAt,
      });
      socket?.emit("reorder-list-request", roomId);
      setMessages((prev) => [...prev, { ...data, message: decryptedMessage }]);
    }
  };

  const handleMsgRef = React.useCallback(
    (index: number, ref: HTMLDivElement) => {
      msgRef.current[index] = ref;
    },
    []
  );
  const gotoMSG = React.useCallback((id: string) => {
    if (id) {
      const targetDiv = msgRef.current.find((value) => {
        return value.id === id;
      });
      focusToMsg(targetDiv);
    }
  }, []);

  const handleReply = React.useCallback((msg: MessageType) => {
    const { repliedMsg, ...restObj } = msg;
    setReplyMsg(restObj);
  }, []);

  const handleForward = React.useCallback((messageObject: MessageType) => {
    setForwardMsg({
      ...messageObject,
      fullName: `${profile.firstName} ${profile.lastName}`,
      username: profile.username,
      avatar: profile.avatar?.url || "",
      userId: decodedUser.id,
    });
  }, []);
  const handleDelete = React.useCallback(
    async (msgId: string) => {
      try {
        await deleteMessage(msgId);
        setMessages((prev) =>
          prev.filter((messageObject, index) => {
            if (
              messageObject._id === msgId &&
              totalMessages.length - 1 === index
            ) {
              if (index === 0) {
                updateRoomLastMessage(roomId, {
                  message: "",
                  createdAt: "",
                });
              } else {
                updateRoomLastMessage(roomId, {
                  message: totalMessages[index - 1].message,
                  createdAt: totalMessages[index - 1].createdAt,
                });
              }
              socket?.emit("reorder-list-request", roomId);
            }
            return messageObject._id !== msgId;
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [totalMessages]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const focusToMsg = (focusElement: HTMLDivElement | undefined) => {
    if (focusElement) {
      focusElement.scrollIntoView({ behavior: "smooth", block: "center" });
      focusElement?.classList.add("search-focus-message");
      setTimeout(() => {
        focusElement?.classList.remove("search-focus-message");
      }, 1000);
    }
  };

  const downActiveIndex = useCallback(() => {
    if (searchDivsLength !== 0 && searchDivsLength > searchActiveIndex) {
      setSearchActiveIndex((prev) => {
        if (prev === null || prev === searchDivs.current.length - 1) {
          focusToMsg(searchDivs.current[searchDivs.current.length - 1]);
          return searchDivs.current.length - 1;
        }
        focusToMsg(searchDivs.current[prev + 1]);
        return prev + 1;
      });
    }
  }, [searchDivsLength]);

  const upActiveIndex = useCallback(() => {
    if (searchDivsLength !== 0) {
      setSearchActiveIndex((prev) => {
        if (prev === null || prev === 0) {
          focusToMsg(searchDivs.current[0]);

          return 0;
        }
        focusToMsg(searchDivs.current[prev - 1]);
        return prev - 1;
      });
    }
  }, [searchDivsLength]);

  const highlightText = (text, index) => {
    if (
      searchString?.trim() !== "" &&
      text.toLowerCase()?.includes(searchString?.toLowerCase())
    ) {
      if (!searchDivs.current.includes(msgRef?.current[index])) {
        searchDivs.current.push(msgRef?.current[index]);
        setSearchDivsLength(searchDivs.current.length);
      }
      let regexp = new RegExp(searchString || "", "gi");
      return text.replace(regexp, "<mark>$&</mark>");
    } else {
      if (searchDivs.current.includes(msgRef?.current[index])) {
        const eleIndex = searchDivs.current.indexOf(msgRef?.current[index]);
        searchDivs.current.splice(eleIndex, 1);
        setSearchDivsLength(searchDivs.current.length);
      }
      return text;
    }
  };

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
    msgRef.current = msgRef.current.slice(0, totalMessages.length);
  }, [totalMessages]);

  React.useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [replyMsg]);

  React.useEffect(() => {
    if (searchDivsLength === 0) {
      setSearchActiveIndex(0);
    } else {
      setSearchActiveIndex(searchDivsLength - 1);
    }
  }, [searchDivsLength]);

  React.useEffect(() => {
    const friend = chatList.data.find((chat) => chat.roomId === roomId);
    setChatFriend(friend || null);
  }, [roomId, chatList]);

  React.useEffect(() => {
    const decryptMessageList = async () => {
      const response = await fetchMessage(roomId);
      const userPrivateKey: JsonWebKey = JSON.parse(
        localStorage.getItem("private_key") as string
      );
      const sharedSecret = await deriveSharedSecret(
        userPrivateKey,
        recipientPublicKey
      );
      const decryptedMessageArray = await decryptMessageArray(
        response?.data || [],
        sharedSecret
      );
      setMessages(decryptedMessageArray);
    };
    if (socket) {
      socket.emit("join-room", { id: roomId });
      socket.off("message-receive").on("message-receive", handleMessageReceive);
      socket
        .off("message-acknowledgment")
        .on("message-acknowledgment", handleMessageReceive);
    }
    decryptMessageList();
    return () => {
      if (socket) {
        socket.off("message-receive", handleMessageReceive);
        socket.off("message-acknowledgment", handleMessageReceive);
      }
    };
  }, [roomId, socket]);

  return (
    <>
      <div
        id="chat"
        className={`w-full relative bg-white dark:bg-customGrey-black text-black dark:text-white h-[100dvh] flex flex-col`}
      >
        <ChatHeader
          name={chatFriend?.chatName}
          handleSearch={handleSearch}
          searchString={searchString}
          avatar={chatFriend?.chatAvatar}
          searchActiveIndex={searchActiveIndex}
          downActiveIndex={downActiveIndex}
          upActiveIndex={upActiveIndex}
          count={searchDivsLength}
        />

        <div
          className={`  ${
            isContextActive === null ? "overflow-y-scroll" : "overflow-y-hidden"
          } flex-grow bg-customGrey-light  dark:bg-customGrey-black`}
          ref={ref}
        >
          <div
            className="bg-customGrey-light dark:bg-customGrey-black text-black dark:text-white pb-6"
            id="msg-list"
          >
            {totalMessages.map((message: MessageType, index: number) => {
              const prevMessageDate =
                index !== 0 ? totalMessages[index - 1].createdAt : null;

              const showDateLabel =
                index === 0 ||
                (prevMessageDate &&
                  getDayDiff(prevMessageDate, message.createdAt) !== 0);

              return (
                <React.Fragment key={message._id}>
                  {showDateLabel && (
                    <div className="flex items-center justify-center my-2">
                      <span className="bg-[#c6c4c4] dark:bg-customGrey-blackBg dark:text-[#ccc] max-w-20 w-full text-center rounded-sm font-medium text-xs py-[2px]">
                        {getDayLabel(message.createdAt)}
                      </span>
                    </div>
                  )}

                  <Message
                    searchString={searchString}
                    index={index}
                    gotoMSG={gotoMSG}
                    handleMSGRef={handleMsgRef}
                    handleReply={handleReply}
                    highlightText={highlightText}
                    handleForward={handleForward}
                    handleDelete={handleDelete}
                    isContextActive={isContextActive}
                    searchActiveIndex={searchActiveIndex}
                    setContextActive={setContextActive}
                    decodedUser={decodedUser}
                    message={message}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <TextMessageField
          handleMessageSend={handleMessageSend}
          setReplyMsg={setReplyMsg}
          replyMsg={replyMsg}
        />
      </div>
      <ForwardModal forwardMsg={forwardMsg} setForwardMsg={setForwardMsg} />
    </>
  );
};

export default React.memo(Chats);
