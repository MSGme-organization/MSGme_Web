import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const decodedUser = decodedToken(cookies().get("token")?.value);
    const frdRequestData = await prisma.friend_request.findMany({
      where: {
        sender_id: decodedUser.id,
        receiver_id: body?.receiver_id,
      },
    });
    if (frdRequestData.length !== 0) {
      return response.dataConflict("Request already sent");
    }

    const payloadData = {
      sender_id: decodedUser.id,
      ...body,
    };

    const frdReqResponse = await prisma.friend_request.create({
      data: payloadData,
      select: { receiver: true, id: true },
    });
    const { username, first_name, last_name } = frdReqResponse.receiver;

    const receiverData = {
      username,
      first_name,
      last_name,
      id: frdReqResponse.id,
    };

    return response.success("Request sent Successfully", receiverData);
  } catch (error: any) {
    return response.error(error?.message);
  }
};
