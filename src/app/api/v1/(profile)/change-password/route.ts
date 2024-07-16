import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
  if (!body.currentPassword || !body.newPassword) {
    return response.dataInvalid(
      "currentPassword and newPassword are required."
    );
  }

  return null
};

export const POST = async (request: NextRequest) => {
  try {
    const decoded = decodedToken(cookies().get("token")?.value);
    const user = await prisma.user.findFirst({
      where: { id: decoded.id },
    });

    const body = await request.json();
    const validationError = await validateReq(body);
    if (validationError) {
      return validationError
    }

    const hash = crypto.createHash("sha1");
    hash.update(body.currentPassword);
    body.currentPassword = hash.digest("hex");

    if (body.currentPassword !== user?.password) {
      return response.dataInvalid("Invalid current password.");
    }
    const hash2 = crypto.createHash("sha1");
    hash2.update(body.newPassword);
    body.newPassword = hash2.digest("hex");

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: body.newPassword },
    });
    cookies().set("currentUser", JSON.stringify(user));

    return response.success("password changed successfully.", user);
  } catch (error: any) {
    return response.error(error.message);
  }
};
