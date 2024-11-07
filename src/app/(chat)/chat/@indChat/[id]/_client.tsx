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

type ChatsProps = {
  roomId: string;
  messageList: MessageType[];
  decodedUsername: string;
  recipientPublicKey: JsonWebKey;
};

const Chats = ({
  roomId,
  messageList,
  decodedUsername,
  recipientPublicKey,
}: ChatsProps) => {
  const friendsList = useAppSelector((state) => state.friendsList);
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
  const [chatFriend, setChatFriend] = React.useState<any>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const msgRef = React.useRef<HTMLDivElement[]>([]);
  const searchDivs = React.useRef<HTMLDivElement[]>([]);
  const socket = useSocket();
  const handleMessageSend = async (message: { msg: string }) => {
    if (socket && (replyMsg !== null || message.msg)) {
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
          message.msg
        );
        const messageObject = {
          fullName: `${profile.first_name} ${profile.last_name}`,
          username: profile.username,
          avatar: profile.avatar?.url || "",
          message: encryptedData,
          iv: iv,
          repliedMsgId: replyMsg?._id,
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
        data.repliedMsg.message=decryptedReplyMessage
      }

      setMessages((prev) => [...prev, { ...data, message: decryptedMessage }]);
    }
  };

  const handleMsgRef = React.useCallback(
    (index: number, ref: HTMLDivElement) => {
      msgRef.current[index] = ref;
    },
    []
  );

  const gotoMSG = React.useCallback((index: number) => {
    if (msgRef.current[index]) {
      msgRef.current[index - 3 > 3 ? index - 3 : index - 1].scrollIntoView();
    }
  }, []);

  const handleReply = React.useCallback((msg: any) => {
    if (Object.keys(msg).includes("repliedMsg")) {
      delete msg["repliedMsg"];
    }
    setReplyMsg(msg);
  }, []);

  const handleForward = React.useCallback((msg: any) => {
    setForwardMsg(msg);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const focusToMsg = (index) => {
    const eleIndex = searchDivs.current[index]?.id.replace("msg-", "");
    if (parseInt(eleIndex) > 3) {
      const scrollEle = document.getElementById(
        `msg-${parseInt(eleIndex) === 0 ? eleIndex : parseInt(eleIndex) - 2}`
      );
      scrollEle?.scrollIntoView();
    } else {
      document.getElementById("chat")?.scroll({ top: 0 });
    }
    searchDivs.current[index]?.classList.add("search-focus-message");
    setTimeout(() => {
      searchDivs.current[index]?.classList.remove("search-focus-message");
    }, 1000);
  };

  const downActiveIndex = useCallback(() => {
    if (searchDivsLength !== 0 && searchDivsLength > searchActiveIndex) {
      setSearchActiveIndex((prev) => {
        if (prev === null || prev === searchDivs.current.length - 1) {
          return searchDivs.current.length - 1;
        }
        focusToMsg(prev + 1);
        return prev + 1;
      });
    }
  }, [searchDivsLength]);

  const upActiveIndex = useCallback(() => {
    if (searchDivsLength !== 0) {
      setSearchActiveIndex((prev) => {
        if (prev === null || prev === 0) {
          return 0;
        }
        focusToMsg(prev - 1);
        return prev - 1;
      });
    }
  }, [searchDivsLength]);

  let count = 0;

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
      count += text.match(regexp).length;
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
    const friend = friendsList.data.find(
      (friend: any) => friend.room_id === roomId
    );
    setChatFriend(friend);
  }, [friendsList]);

  React.useEffect(() => {
    const decryptMessageList = async () => {
      const userPrivateKey: JsonWebKey = JSON.parse(
        localStorage.getItem("private_key") as string
      );
      const sharedSecret = await deriveSharedSecret(
        userPrivateKey,
        recipientPublicKey
      );
      const decryptedMessageArray = await decryptMessageArray(
        messageList,
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
        ref={ref}
        className={`w-full ${
          isContextActive === null ? "overflow-y-scroll" : "overflow-y-hidden"
        } relative bg-white dark:bg-customGrey-black text-black dark:text-white h-[100dvh] flex flex-col`}
      >
        <ChatHeader
          name={chatFriend?.friend_name}
          handleSearch={handleSearch}
          searchString={searchString}
          avatar={chatFriend?.friend_avatar}
          searchActiveIndex={searchActiveIndex}
          downActiveIndex={downActiveIndex}
          upActiveIndex={upActiveIndex}
          count={searchDivsLength}
        />

        <div className="flex-grow bg-customGrey-light  dark:bg-customGrey-black">
          <div
            className="bg-customGrey-light dark:bg-customGrey-black text-black dark:text-white pb-6"
            id="msg-list"
          >
            {totalMessages.map((message: MessageType, index: number) => (
              <Message
                searchString={searchString}
                index={index}
                gotoMSG={gotoMSG}
                handleMSGRef={handleMsgRef}
                handleReply={handleReply}
                highlightText={highlightText}
                handleForward={handleForward}
                isContextActive={isContextActive}
                searchActiveIndex={searchActiveIndex}
                setContextActive={setContextActive}
                decodedUsername={decodedUsername}
                message={message}
                key={message._id}
              />
            ))}
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
