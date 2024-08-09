import { messages, users } from "@/utils/data";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import ForwardModal from "../modals/ForwardModal";
import Spinner from "../placeholder/Spinner";
import ChatHeader from "./ChatHeader";
import TextMessageField from "./TextMessageField";

const MsgList = dynamic(() => import("./MsgList"), {
  ssr: false,
  loading: Spinner,
});

interface Props {
  activeChat: number;
}

export interface Message {
  username: string;
  issentbyme: Boolean;
  message?: string;
  avatar?: string;
  reaction?: string;
  repliedMsg?: any;
  id: number;
}

const MsgSection: React.FC<Props> = ({ activeChat }) => {
  const [replyMsg, setReplyMsg] = React.useState<Message | null>(null);
  const [forwardMsg, setForwardMsg] = React.useState<Message | null>(null);
  const [searchString, setSearchString] = React.useState<string | null>(null);
  const [searchActiveIndex, setSearchActiveIndex] = React.useState<number>(0);
  const [isContextActive, setContextActive] = React.useState<number | null>(
    null
  );
  const [searchDivsLength, setSearchDivsLength] = React.useState(0);
  const [totalMessages, setMessages] = React.useState<Message[] | []>(messages);
  const ref = React.useRef<HTMLDivElement>(null);
  const msgRef = React.useRef<HTMLDivElement[]>([]);
  const searchDivs = React.useRef<HTMLDivElement[]>([]);
  const user = React.useMemo(
    () => users.find((user) => user.id === activeChat),
    [users, activeChat]
  );

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
          name={user?.name}
          handleSearch={handleSearch}
          searchString={searchString}
          avatar={user?.avatarImage}
          searchActiveIndex={searchActiveIndex}
          downActiveIndex={downActiveIndex}
          upActiveIndex={upActiveIndex}
          count={searchDivsLength}
        />

        <div className="flex-grow">
          <div
            className="bg-[#E9ECEF] dark:bg-customGrey-black text-black dark:text-white pb-6"
            id="msg-list"
          >
            <MsgList
              messages={totalMessages}
              searchString={searchString}
              gotoMSG={gotoMSG}
              handleMSGRef={handleMsgRef}
              handleReply={handleReply}
              highlightText={highlightText}
              handleForward={handleForward}
              isContextActive={isContextActive}
              searchActiveIndex={searchActiveIndex}
              setContextActive={setContextActive}
            />
          </div>
        </div>

        <TextMessageField
          setMessages={setMessages}
          setReplyMsg={setReplyMsg}
          replyMsg={replyMsg}
        />
      </div>
      <ForwardModal forwardMsg={forwardMsg} setForwardMsg={setForwardMsg} />
    </>
  );
};

export default MsgSection;
