import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface UsersInterface {
  id: string;
  username: string;
  bio: string | null;
  avatar: string | null;
}

export const GET = async (request: NextRequest) => {
  try {
    const search: string = request.nextUrl.searchParams.get("search") || "";
    const searchType: string =
      request.nextUrl.searchParams.get("searchType") || "";
    const decodedUser = decodedToken(cookies().get("token")?.value);

    let users: UsersInterface[] = [];
    if (searchType === "sent") {
      users = await prisma.user.findMany({
        where: {
          AND: [
            {
              username: {
                contains: search,
              },
            },
            {
              friend_request_received: {
                some: {
                  sender_id: decodedUser?.id,
                  status: "pending",
                },
              },
            },
          ],
        },
        select: {
          username: true,
          bio: true,
          id: true,
          avatar: true,
        },
      });
    } else if (searchType === "requests") {
      users = await prisma.user.findMany({
        where: {
          AND: [
            {
              username: {
                contains: search,
              },
            },
            {
              friend_request_sent: {
                some: {
                  receiver_id: decodedUser?.id,
                  status: "pending",
                },
              },
            },
          ],
        },
        select: {
          username: true,
          bio: true,
          id: true,
          avatar: true,
        },
      });

      console.log("requests", users);
    } else {
      users = await prisma.user.findMany({
        where: {
          username: {
            contains: search,
          },
        },
        select: {
          username: true,
          bio: true,
          id: true,
          avatar: true,
        },
      });
    }

    return response.success("users search success", { users });
  } catch (error: any) {
    return response.error(error?.message);
  }
};
