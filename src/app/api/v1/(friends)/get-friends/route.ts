import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const decodedUser: any = decodedToken(
      cookies().get("token")?.value as string
    );
    const friendsList = await prisma.friend_List.findMany({
      where: {
        OR: [{ user_id: decodedUser?.id }],
      },
    });
    return response.success("", { friendsList });
  } catch (error: any) {
    return response.error(error?.message);
  }
};
