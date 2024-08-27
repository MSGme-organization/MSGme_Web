import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
  if (!body.password) {
    return response.dataInvalid("Password is required.", {
      password: "Password is required.",
    });
  }
  return null;
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validationError = await validateReq(body);
    if (validationError) {
      return validationError;
    }
    const cookie: any = decodedToken(
      cookies().get("set-pass")?.value as string
    );

    if (cookie) {
      const user = await prisma.user.findFirst({
        where: { id: cookie?.userId },
      });

      if (!user) {
        return response.dataConflict("User Not found.");
      }

      const hash = crypto.createHash("sha1");
      hash.update(body.password);
      body.password = hash.digest("hex");

      await prisma.user.update({
        where: { id: user.id },
        data: { password: body.password },
      });

      cookies().delete("set-pass");

      return response.success("password changed successfully.", null);
    }
    return response.unAuthorized("you are not allowed to do this process.");
  } catch (error: any) {
    return response.error(error.message);
  }
};
