import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "crypto";
import { lucia } from "@/lib/auth/lucia";

export const GET = async (request: NextRequest) => {
  const data = await prisma.user.findMany();
  console.log(data);
  // console.log(hash("sha1", "sahil"));
  //   return new Response("hello");
  return NextResponse.json(data);
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    body.password = hash("sha1", body.password);
    const feed = await prisma.user.create({ data: body });
    const session = await lucia.createSession(String(feed.id), {});
    return NextResponse.json({
      message: "Register successful",
      registerData: feed,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: String(error),
      },
      { status: 500 }
    );
  }
};
