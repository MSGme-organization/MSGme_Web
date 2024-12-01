import { response } from "@/utils/helpers/response";
import { decodedToken } from "@/utils/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const decodedUser: any = decodedToken(
      cookies().get("token")?.value as string
    );

    const frdRequestData = await prisma.friendRequest.delete({
      where: {
        senderId_receiverId: {
          senderId: body.receiverId,
          receiverId: decodedUser.id,
        },
      },
    });
    if (body.requestResponse === "1") {
      const newRoomPayload = {
        members: 2,
      };
      const newRoomData = await prisma.room.create({
        data: newRoomPayload,
      });

      const FriendListPayload = {
        userId: frdRequestData.senderId,
        friendId: frdRequestData.receiverId,
        isBlocked: false,
        roomId: newRoomData.id,
      };
      await prisma.friendList.create({
        data: FriendListPayload,
      });
    }
    return response.success(
      body.requestResponse === "1"
        ? "Friend Request Accepted"
        : "Friend Request Rejected",
      ""
    );
  } catch (error: any) {
    console.log(error);
    return response.error(error?.message);
  }
};
