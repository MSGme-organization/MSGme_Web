import { decodedToken } from "@/api-modules/helpers/token";
import prisma from "@/lib/prisma/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const decodedUser = decodedToken(cookies().get("token")?.value);

    const user = await prisma.user.findFirst({
      where: { id: decodedUser.id },
    });

    cookies().set("currentUser", JSON.stringify(user));

    return NextResponse.json(
      {
        message: "fetched user data success.",
        data: user,
      },
      { status: 200, statusText: "fetched user data success." }
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
