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

    const frdRequestData = await prisma.friend_request.delete({
      where: {
        sender_id_receiver_id: {
          sender_id: body.receiver_id,
          receiver_id: decodedUser.id,
        },
      },
    });
    if (body.request_response === "1") {
      const newRoomPayload = {
        members: 2,
      };
      const newRoomData = await prisma.room.create({
        data: newRoomPayload,
      });

      const FriendListPayload = {
        user_id: frdRequestData.sender_id,
        friend_id: frdRequestData.receiver_id,
        isBlocked: false,
        room_id: newRoomData.id,
      };
      await prisma.friend_List.create({
        data: FriendListPayload,
      });
    }
    return response.success(
      body.request_response === "1"
        ? "Friend Request Accepted"
        : "Friend Request Rejected",
      ""
    );
  } catch (error: any) {
    console.log(error);
    return response.error(error?.message);
  }
};
