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

export const getRecipientPublicKey = async (
  currentUserId: string,
  roomId: string
) => {
  try {
    const friendRelation = await prisma.friendList.findFirst({
      where: {
        roomId: roomId,
        OR: [{ userId: currentUserId }, { friendId: currentUserId }],
      },
    });

    if (!friendRelation) {
      console.log("Friend relation not found for the given room ID.");
      return null;
    }

    const recipientUserId =
      friendRelation.userId === currentUserId
        ? friendRelation.friendId
        : friendRelation.userId;

    const recipient = await prisma.user.findUnique({
      where: { id: recipientUserId },
      select: { publicKey: true },
    });

    if (!recipient || !recipient.publicKey) {
      console.log("Recipient public key not found.");
      return null;
    }

    return recipient.publicKey as JsonWebKey;
  } catch (error) {
    console.error("Error fetching recipient public key:", error);
    return null;
  }
};
