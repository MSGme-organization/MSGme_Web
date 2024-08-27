import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const decodedUser: any = decodedToken(
      cookies().get("token")?.value as string
    );

    if (body.requestStatus === "sent") {
      const payloadData = {
        sender_id: decodedUser.id,
        receiver_id: body.receiver_id,
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
        requestStatus: "sent",
      };
      return response.success("Request Sent Successfully", receiverData);
    } else {
      const payloadData = {
        sender_id: decodedUser.id,
        receiver_id: body.receiver_id,
      };

      const frdReqResponse = await prisma.friend_request.delete({
        where: {
          sender_id_receiver_id: payloadData,
        },
        select: {
          receiver: true,
        },
      });
      const { username, first_name, last_name } = frdReqResponse.receiver;

      const receiverData = {
        username,
        first_name,
        last_name,
        requestStatus: "unSent",
      };
      return response.success("Request Unsent Successfully", receiverData);
    }
  } catch (error: any) {
    return response.error(error?.message);
  }
};
