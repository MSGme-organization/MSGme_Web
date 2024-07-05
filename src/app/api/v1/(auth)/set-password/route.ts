import { response } from "@/api-modules/helpers/response";
import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
  if (!body.password) {
    return response.dataInvalid("Password is required.");
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    await validateReq(body);
    const cookie = decodedToken(cookies().get("set_pass")?.value);
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
  } catch (error: any) {
    return response.error(error.message);
  }
};
