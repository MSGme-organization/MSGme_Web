import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    cookies().delete("currentUser");
    cookies().delete("token");
    return NextResponse.redirect(new URL("/login", request.url));
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
