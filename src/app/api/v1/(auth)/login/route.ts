import { response } from "@/utils/helpers/response";
import { generateToken } from "@/utils/helpers/token";
import prisma from "@/lib/prisma/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const validateReq = async (body: any) => {
  if (!body.email) {
    return response.dataInvalid("email is required.", {
      email: "email is required.",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
    return response.dataInvalid("email is not valid.", {
      email: "email is not valid.",
    });
  }
  if (!body.password) {
    return response.dataInvalid("password is required.", {
      password: "password is required.",
    });
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/.test(
      body.password
    )
  ) {
    return response.dataInvalid(
      "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character.",
      {
        password:
          "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character.",
      }
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
      return response.dataInvalid("Invalid Credentials.", {
        email: "Invalid Credentials.",
        password: "Invalid Credentials.",
      });
    }

    if (
      user.password ===
      crypto.createHash("sha1").update(body.password).digest("hex")
    ) {
      cookies().set(
        "token",
        await generateToken({
          id: user.id,
          username: user.username,
          email: user.email,
        }),
        { secure: process.env.NODE_ENV === "production" }
      );

      const { password, ...userWithoutPassword } = user;
      cookies().set("currentUser", JSON.stringify(userWithoutPassword));
      return response.success("logged in successfully.", userWithoutPassword);
    } else {
      return response.dataInvalid("Invalid credentials.", {
        email: "Invalid Credentials.",
        password: "Invalid credentials.",
      });
    }
  } catch (error: any) {
    return response.error(error.message);
  }
};
