import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "crypto";

export const GET = async (request: NextRequest) => {
  const data = await prisma.user.findMany();
  console.log(data);
  return NextResponse.json(data);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const feed = await prisma.user.findFirst({
    where: { username: body.username },
  });
  if (
    feed?.username === body.username &&
    feed?.password === hash("sha1", body.password)
  ) {
  }
  console.log(feed);

  return NextResponse.json(feed);
};
