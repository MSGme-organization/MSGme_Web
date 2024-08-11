import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const sender = await decodedToken(cookies().get("token")?.value);
  if (body.id) {
    const friend_request = await prisma.friend_request.create({
      data: {
        sender_id: sender.id,
        receiver_id: body.id,
      },
    });

    return response.success("Friend request sent successfully.", {
      friend_request,
    });
  } else {
    return response.dataInvalid("id is required.", {});
  }
};
