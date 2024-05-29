"use client";

import Message from "@/components/client-components/chat/Message";
import { messages } from "@/utils/data";
import React from "react";

const Chats = () => {
  return (
    <div className="">
      {messages.map((message, index) => (
        <Message
          message={{
            ...message,
            avatar: message.avatar || "", // Assign an empty string if avatar is undefined
          }}
          key={index}
          isUserSame={
            index === 0
              ? false
              : messages[index - 1].username === message.username
          }
        />
      ))}
    </div>
  );
};

export default Chats;
