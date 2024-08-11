import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const decodedUser = decodedToken(cookies().get("token")?.value);

    const user = await prisma.user.findFirst({
      where: { id: decodedUser.id },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        dob: true,
        bio: true,
      },
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
