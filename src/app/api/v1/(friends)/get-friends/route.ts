import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const decodedUser = decodedToken(cookies().get("token")?.value);
    const friendsList = await prisma.friend_List.findMany({
      where: {
        OR: [{ user_id: decodedUser?.id }],
      },
      include: {
        user: true,
        to_friend_list: true,
      },
    });
    console.log("friendsList", friendsList);

    return response.success("", { friendsList: friendsList });
  } catch (error) {}
};
