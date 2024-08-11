import { response } from "@/api-modules/helpers/response";
import prisma from "@/lib/prisma/prisma";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const search: string = request.nextUrl.searchParams.get("search") || "";

    const users = await prisma.user.findMany({
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

    return response.success("users search success", { users });
  } catch (error: any) {
    return response.error(error?.message);
  }
};
