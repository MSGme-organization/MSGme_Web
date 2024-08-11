import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const search: string = request.nextUrl.searchParams.get("search") || "";
    const mode: number = Number(request.nextUrl.searchParams.get("mode")) || 1;

    const user = await decodedToken(cookies().get("token")?.value);
    if (mode == 1) {
      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: search,
          },
          id: {
            not: user.id,
          },
          AND: [
            {
              id: {
                notIn: await prisma.friend_request
                  .findMany({
                    where: {
                      OR: [{ sender_id: user.id }, { receiver_id: user.id }],
                    },
                    select: {
                      sender_id: true,
                      receiver_id: true,
                    },
                  })
                  .then((requests) =>
                    requests.flatMap((request) => [
                      request.sender_id,
                      request.receiver_id,
                    ])
                  ),
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

      return response.success("users search success", { users });
    } else {
      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: search,
          },
          id: {
            not: user.id,
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
    }
  } catch (error: any) {
    return response.error(error?.message);
  }
};
