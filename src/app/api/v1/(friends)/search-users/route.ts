import { response } from "@/utils/helpers/response";
import { decodedToken } from "@/utils/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface UsersInterface {
  friend_request_sent?: any;
  friend_request_received?: any;
  id: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  userStatus?: "request" | "sent" | null;
}

export const GET = async (request: NextRequest) => {
  try {
    const search: string = request.nextUrl.searchParams.get("search") || "";
    const searchType: string =
      request.nextUrl.searchParams.get("searchType") || "";
    const decodedUser: any = decodedToken(
      cookies().get("token")?.value as string
    );

    let users: UsersInterface[] = [];

    const friends = await prisma.friend_List.findMany({
      where: {
        OR: [{ user_id: decodedUser.id }, { friend_id: decodedUser.id }],
      },
      select: {
        user_id: true,
        friend_id: true,
      },
    });

    const friendIds = friends.map((f) =>
      f.user_id === decodedUser.id ? f.friend_id : f.user_id
    );

    if (searchType === "sent") {
      users = await prisma.user.findMany({
        where: {
          AND: [
            { username: { contains: search, mode: "insensitive" } },
            {
              friend_request_received: {
                some: { sender_id: decodedUser?.id, status: "pending" },
              },
            },
            { id: { not: decodedUser.id } },
            { id: { notIn: friendIds } },
          ],
        },
        select: {
          username: true,
          bio: true,
          id: true,
          avatar: true,
          friend_request_received: {
            where: { sender_id: decodedUser?.id, status: "pending" },
            select: { id: true },
          },
        },
      });
    } else if (searchType === "requests") {
      users = await prisma.user.findMany({
        where: {
          AND: [
            { username: { contains: search, mode: "insensitive" } },
            {
              friend_request_sent: {
                some: { receiver_id: decodedUser?.id, status: "pending" },
              },
            },
            { id: { not: decodedUser.id } },
            { id: { notIn: friendIds } },
          ],
        },
        select: {
          username: true,
          bio: true,
          id: true,
          avatar: true,

          friend_request_sent: {
            where: { receiver_id: decodedUser?.id, status: "pending" },
            select: { id: true },
          },
        },
      });
    } else {
      users = await prisma.user.findMany({
        where: {
          AND: [
            { username: { contains: search, mode: "insensitive" } },
            { id: { not: decodedUser.id } },
            { id: { notIn: friendIds } },
          ],
        },
        take: search.trim() === "" ? 10 : 20,
        select: {
          username: true,
          bio: true,
          id: true,
          avatar: true,
          friend_request_sent: {
            where: { receiver_id: decodedUser?.id, status: "pending" },
            select: { id: true },
          },
          friend_request_received: {
            where: { sender_id: decodedUser?.id, status: "pending" },
            select: { id: true },
          },
        },
      });
    }

    const updatedUsers = users.map((user) => {
      let userStatus: "request" | "sent" | null = null;

      if (user.friend_request_sent && user.friend_request_sent.length > 0) {
        userStatus = "request";
      } else if (
        user.friend_request_received &&
        user.friend_request_received.length > 0
      ) {
        userStatus = "sent";
      }

      return {
        username: user.username,
        bio: user.bio,
        id: user.id,
        avatar: user.avatar,
        userStatus,
      };
    });

    return response.success("users search success", { users: updatedUsers });
  } catch (error: any) {
    return response.error(error?.message);
  }
};
