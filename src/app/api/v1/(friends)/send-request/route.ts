import { response } from "@/utils/helpers/response";
import { decodedToken } from "@/utils/helpers/token";
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
        senderId: decodedUser.id,
        receiverId: body.receiverId,
      };

      const frdReqResponse = await prisma.friendRequest.create({
        data: payloadData,
        select: { receiver: true, id: true },
      });
      const { username, firstName, lastName } = frdReqResponse.receiver;

      const receiverData = {
        username,
        firstName,
        lastName,
        id: frdReqResponse.id,
        requestStatus: "sent",
      };
      return response.success("Request Sent Successfully", receiverData);
    } else {
      const payloadData = {
        senderId: decodedUser.id,
        receiverId: body.receiverId,
      };

      const frdReqResponse = await prisma.friendRequest.delete({
        where: {
          senderId_receiverId: payloadData,
        },
        select: {
          receiver: true,
        },
      });
      const { username, firstName, lastName } = frdReqResponse.receiver;

      const receiverData = {
        username,
        firstName,
        lastName,
        requestStatus: "unSent",
      };
      return response.success("Request Unsent Successfully", receiverData);
    }
  } catch (error: any) {
    return response.error(error?.message);
  }
};
