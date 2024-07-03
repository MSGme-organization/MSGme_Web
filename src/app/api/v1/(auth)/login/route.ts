import { generateToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { NextApiResponse } from "next";

export const GET = async (request: NextRequest) => {
  const data = await prisma.user.findMany();
  console.log(data);
  return NextResponse.json(data);
};

const validateReq = async (body: any) => {
  if (!body.email) {
    throw new Error("email is required");
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.email)) {
    throw new Error("email is not valid");
  }
  if (!body.password) {
    throw new Error("password is required");
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_/+]).{8,}$/.test(
      body.password
    )
  ) {
    throw new Error(
      "Password should contain - minimum 1 capital and 1 small alphabet ,\n- 1 digit,\n- 1 special character and minimum 8 character"
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    console.log("first");
    const body = await request.json();
    await validateReq(body);

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      throw new Error("User not exists with this email");
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
      return NextResponse.json(
        {
          message: "logged in successfully.",
          data: userWithoutPassword,
        },
        { status: 200, statusText: "logged in successfully." }
      );
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
        data: null,
      },
      { status: 500, statusText: error.message }
    );
  }
};
