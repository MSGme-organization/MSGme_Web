"use server";

import { MessageType } from "@/components/chat/Message";
import prisma from "@/lib/prisma/prisma";

type LastMessageType = Pick<MessageType, "message" | "createdAt">;

export const updateRoomLastMessage = async (
  roomId: string,
  messageObj: LastMessageType
) => {
  try {
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        lastMessage: messageObj?.message || "",
        lastMsgTimestamp: messageObj?.createdAt || null,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
