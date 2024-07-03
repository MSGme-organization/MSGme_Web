import { generateToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { emailFetch, userNameFetch } from "@/utils/user_fetch";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const data = await prisma.user.findMany({
    select: { id: true, username: true, email: true },
  });
  console.log(data);
  return NextResponse.json(data);
};

const validateReq = async (body: any) => {
  if (!body.username) {
    throw new Error("username is required");
  }
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

  if ((await userNameFetch(body.username)) || (await emailFetch(body.email))) {
    throw new Error("User already exist");
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    await validateReq(body);

    const hash = crypto.createHash("sha1");
    hash.update(body.password);
    body.password = hash.digest("hex");

    const user = await prisma.user.create({
      data: body,
      select: { id: true, username: true, email: true },
    });

    cookies().set("currentUser", JSON.stringify(user), { secure: true });
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
    return NextResponse.json(
      {
        message: "signed up successfully.",
        data: userWithoutPassword,
      },
      { status: 200, statusText: "signed up successfully." }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        data: null,
      },
      { status: 500 }
    );
  }
};
