import { response } from "@/api-modules/helpers/response";
import { generateToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
  if (!body.email) {
    return response.dataInvalid("email is required.");
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
    return response.dataInvalid("email is not valid.");
  }
  if (!body.password) {
    return response.dataInvalid("password is required.");
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/.test(
      body.password
    )
  ) {
    return response.dataInvalid(
      "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character."
    );
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

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      return response.dataInvalid("Invalid Credentials.");
    }

    if (
      user.password ===
      crypto.createHash("sha1").update(body.password).digest("hex")
    ) {
      cookies().set(
        "token",
        generateToken({
          id: user.id,
          username: user.username,
          email: user.email,
        }),
        { secure: true }
      );
      const { password, ...userWithoutPassword } = user;
      cookies().set("currentUser", JSON.stringify(userWithoutPassword), {
        secure: true,
      });
      return response.success("logged in successfully.", userWithoutPassword);
    } else {
      return response.dataInvalid("Invalid credentials.");
    }
  } catch (error: any) {
    return response.error(error.message);
  }
};
