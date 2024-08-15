import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const decodedUser = decodedToken(cookies().get("token")?.value);

    const frdRequestData = await prisma.friend_request.update({
      data: { status: body.request_response === "0" ? "rejected" : "accepted" },
      where: { id: body.request_id },
    });
    if (body.request_response === "1") {
      const newRoomPayload = {
        members: 2,
      };

      // const newRoomData = await prisma.room.create({
      //   data: newRoomPayload,
      // });

      // const FriendListPayload = {
      //   user_id: frdRequestData.sender_id,
      //   friend_id: frdRequestData.receiver_id,
      //   isBlocked: false,
      //   room_id: newRoomData.id,
      // };
      // const frdListData = await prisma.friend_List.create({
      //   data: FriendListPayload,
      // });
    }
    return response.success(
      body.request_response === "1"
        ? "Friend Request Accepted"
        : "Friend Request Rejected",
      ""
    );
  } catch (error: any) {
    return response.error(error?.message);
  }
};
