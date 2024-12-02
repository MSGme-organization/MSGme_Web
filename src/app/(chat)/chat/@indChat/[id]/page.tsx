import React from "react";
import Chats from "./_client";
import { decodedToken } from "@/utils/helpers/token";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma/prisma";
import { getRecipientPublicKey } from "./_action";

const page = async ({ params }: { params: { id: string } }) => {
  const decodedUser = decodedToken(
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


