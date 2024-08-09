import Message from "./Message";

interface Props {
  messages: any[];
  searchString?: string | null | undefined;
  gotoMSG: Function;
  handleMSGRef: Function;
  handleReply: Function;
  highlightText: (text, index) => any;
  handleForward: Function;
  isContextActive: number | null;
  searchActiveIndex: number | null;
  setContextActive: Function;
}

const MsgList: React.FC<Props> = ({
  messages,
  searchString,
  gotoMSG,
  handleMSGRef,
  handleReply,
  highlightText,
  handleForward,
  isContextActive,
  searchActiveIndex,
  setContextActive,
}) => {
  return messages.map((message, index) => (
    <Message
      searchString={searchString}
      index={index}
      gotoMSG={gotoMSG}
      handleMSGRef={handleMSGRef}
      handleReply={handleReply}
      highlightText={highlightText}
      handleForward={handleForward}
      isContextActive={isContextActive}
      searchActiveIndex={searchActiveIndex}
      setContextActive={setContextActive}
      message={{
        ...message,
        reaction: message.reaction || "",
        avatar: message.avatar || "",
        totalMsg: messages.length,
      }}
      key={index}
      isUserSame={
        index === 0 ? false : messages[index - 1].username === message.username
      }
    />
  ));
};

export default MsgList;
