import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const decodedUser = decodedToken(cookies().get("token")?.value);
    const invitations = await prisma
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
      .friend_request.findMany({
        where: {
          OR: [{ sender_id: decodedUser.id }, { receiver_id: decodedUser.id }],
        },
        orderBy: { created_at: "desc" },
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

    return response.success("Invitation find operation success.", {
      invitations,
    });
  } catch (error: any) {
    return response.error(error?.message);
  }
};
