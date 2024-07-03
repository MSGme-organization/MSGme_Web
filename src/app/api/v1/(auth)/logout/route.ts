import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    cookies().delete("currentUser");
    cookies().delete("token");
    return NextResponse.json(
      { message: "logout successFull.", data: null },
      { status: 200, statusText: "logged out successfully." }
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
