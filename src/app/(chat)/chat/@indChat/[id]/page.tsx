import React from "react";
import Chats from "./_client";
import { fetchMessage } from "@/query/message/fetchMessage";
import { decodedToken } from "@/utils/helpers/token";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma/prisma";

const page = async ({ params }: { params: { id: string } }) => {
  const response = await fetchMessage(params.id);
  const decodedUser: any = decodedToken(
    cookies().get("token")?.value as string
  );
  const recipientPublicKey = await getRecipientPublicKey(
    decodedUser?.id,
    params.id
  );
  if (recipientPublicKey) {
    return (
      <Chats
        recipientPublicKey={recipientPublicKey}
        messageList={response?.data}
        roomId={params.id}
        decodedUsername={decodedUser?.username || ""}
      />
    );
  } else {
    return null;
  }
};

export default page;

const getRecipientPublicKey = async (currentUserId: string, roomId: string) => {
  try {
    const friendRelation = await prisma.friend_List.findFirst({
      where: {
        room_id: roomId,
        OR: [{ user_id: currentUserId }, { friend_id: currentUserId }],
      },
    });

    if (!friendRelation) {
      console.log("Friend relation not found for the given room ID.");
      return null;
    }

    const recipientUserId =
      friendRelation.user_id === currentUserId
        ? friendRelation.friend_id
        : friendRelation.user_id;

    const recipient = await prisma.user.findUnique({
      where: { id: recipientUserId },
      select: { public_key: true },
    });

    if (!recipient || !recipient.public_key) {
      console.log("Recipient public key not found.");
      return null;
    }

    return recipient.public_key as JsonWebKey;
  } catch (error) {
    console.error("Error fetching recipient public key:", error);
    return null;
  }
};
