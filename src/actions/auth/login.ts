"use server";
import { response } from "@/utils/helpers/response";
import { generateToken } from "@/utils/helpers/token";
import prisma from "@/lib/prisma/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";

type LoginType = {
  email: string;
  password: string;
};

const validateReq = async (body: LoginType) => {
  if (!body.email) {
    return {
      email: "email is required.",
    };
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
    return {
      email: "email is not valid.",
    };
  }
  if (!body.password) {
    return {
      password: "password is required.",
    };
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/.test(
      body.password
    )
  ) {
    return {
      password:
        "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character.",
    };
  }

  return null;
};

export const login = async (body: LoginType) => {
  try {
    const validationError = await validateReq(body);
    if (validationError) {
      return {
        message: "Validation error",
        data: validationError,
        status: 403,
      };
    }

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      return {
        message: "Invalid Credentials",
        data: {
          email: "Invalid Credentials.",
          password: "Invalid Credentials.",
        },
        status: 403,
      };
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

      return {
        message: "Logged in successfully",
        data: { user: userWithoutPassword },
        status: 200,
      };
    } else {
      return {
        message: "Invalid credentials",
        data: {
          email: "Invalid Credentials.",
          password: "Invalid credentials.",
        },
        status: 403,
      };
    }
  } catch (error: any) {
    return { message: error.message, data: null, status: 500 };
  }
};
