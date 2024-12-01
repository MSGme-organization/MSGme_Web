import React from "react";
import Chats from "./_client";
import { decodedToken } from "@/utils/helpers/token";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma/prisma";

const page = async ({ params }: { params: { id: string } }) => {
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
        roomId={params.id}
        decodedUser={decodedUser}
      />
    );
  } else {
    return null;
  }
};

export default page;

const getRecipientPublicKey = async (currentUserId: string, roomId: string) => {
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
