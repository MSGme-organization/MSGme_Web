import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const decodedUser = decodedToken(cookies().get("token")?.value);

    const user = await prisma.user.findFirst({
      where: { id: decodedUser.id },
    });

    cookies().set("currentUser", JSON.stringify(user));
    return response.success("fetched user data success.", user)

  } catch (error: any) {
    return response.error(error.message)
  }
};
