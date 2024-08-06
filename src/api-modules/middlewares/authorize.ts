import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../helpers/token";

export const authorize = async (req: NextRequest) => {
  try {
    if (cookies().get("token")?.value) {
      await verifyToken(cookies().get("token")?.value);

      return NextResponse.next();
    } else {
      return NextResponse.json(
        { message: "token not found!" },
        { status: 401}
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500}
    );
  }
};
