import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const decodedUser: any = decodedToken(
      cookies().get("token")?.value as string
    );

    const user = await prisma.user.findFirst({
      where: { id: decodedUser.id },
    });

    cookies().set("currentUser", JSON.stringify(user));

    return response.success("fetched user data success.", {
      ...user,
      avatar: user?.avatar ? { url: user?.avatar } : null,
    });
  } catch (error: any) {
    return response.error(error.message);
  }
};
