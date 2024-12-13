import { response } from "@/utils/helpers/response";
import { decodedToken } from "@/utils/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

interface UsersInterface {
  friendRequestSent?: any;
  friendRequestReceived?: any;
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

    const friends = await prisma.friendList.findMany({
      where: {
        OR: [{ userId: decodedUser.id }, { friendId: decodedUser.id }],
      },
      select: {
        userId: true,
        friendId: true,
      },
    });

    const friendIds = friends.map((f) =>
      f.userId === decodedUser.id ? f.friendId : f.userId
    );

    if (searchType === "sent") {
      users = await prisma.user.findMany({
        where: {
          AND: [
            { username: { contains: search, mode: "insensitive" } },
            {
              friendRequestReceived: {
                some: { senderId: decodedUser?.id, status: "pending" },
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
          friendRequestReceived: {
            where: { senderId: decodedUser?.id, status: "pending" },
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
              friendRequestSent: {
                some: { receiverId: decodedUser?.id, status: "pending" },
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

          friendRequestSent: {
            where: { receiverId: decodedUser?.id, status: "pending" },
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
        take: search.trim() === "" ? 0 : 20,
        select: {
          username: true,
          bio: true,
          id: true,
          avatar: true,
          friendRequestSent: {
            where: { receiverId: decodedUser?.id, status: "pending" },
            select: { id: true },
          },
          friendRequestReceived: {
            where: { senderId: decodedUser?.id, status: "pending" },
            select: { id: true },
          },
        },
      });
    }

    const updatedUsers = users.map((user) => {
      let userStatus: "request" | "sent" | null = null;

      if (user.friendRequestSent && user.friendRequestSent.length > 0) {
        userStatus = "request";
      } else if (
        user.friendRequestReceived &&
        user.friendRequestReceived.length > 0
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
