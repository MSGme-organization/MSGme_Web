import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { FriendRequestStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const statusType: {
  [key: number]: FriendRequestStatus;
} = {
  1: "accepted",
  2: "rejected",
  3: "pending",
};

export const PUT = async (req: NextRequest) => {
  try {
    const body: {
      id: string;
      status: 1 | 2 | 3;
    } = await req.json();
    const decodedUser = await decodedToken(cookies().get("token")?.value);
    if (body.id && body.status) {
      const status: FriendRequestStatus = statusType[body.status];
      if (status) {
        const updated = await prisma
          .$extends({
            result: {
              friend_request: {
                isSentBySelf: {
                  compute(data) {
                    return data.sender_id === decodedUser.id;
                  },
                },
              },
            },
          })
          .friend_request.update({
            where: { id: body.id },
            data: { status },
            include: {
              sender: {
                select: {
                  avatar: true,
                  id: true,
                  username: true,
                  bio: true,
                },
              },
              receiver: {
                select: {
                  avatar: true,
                  id: true,
                  username: true,
                  bio: true,
                },
              },
            },
          });

        return response.success("status updated successfully.", updated);
      } else {
        return response.dataInvalid("status is invalid", {});
      }
    } else {
      return response.dataInvalid("request id is required", {});
    }
  } catch (err: any) {
    return response.error(err.message);
  }
};
